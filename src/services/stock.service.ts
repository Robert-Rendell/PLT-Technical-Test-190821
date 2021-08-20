import Container, { Service } from 'typedi';
import { SkuDoesNotExistError } from '../errors/sku-does-not-exist';

import { IStockLevelCalculator } from "../interfaces/stock-level-calculator.interface";
import { StockLevel } from "../models/stock-level";
import { Stock } from '../models/stock';
import { Transaction, TransactionType } from '../models/transaction';
import { ConfigService } from './config.service';
import { ResourceService } from './resource.service';
import { ApplicationConfig } from '../models/application-config';

@Service()
export class StockService implements IStockLevelCalculator {
  constructor(
    private configService: ConfigService,
    private resourceService: ResourceService
  ) {}

  /**
   * Takes a SKU input and returns a StockLevel object containing the current quantity of that sku
   */
  public async getStockLevel(sku: string): Promise<StockLevel> {
    const appConfig: ApplicationConfig = this.configService.getApplicationConfig();
    const stockLevel: StockLevel = {
      qty: Stock.StartingQuantity,
      sku,
    };

    // REQUIREMENT - must read from the `stock` and `transactions` files on each invocation (totals cannot be precomputed)
    const initialStockRaw = this.resourceService.getTextFromFile(appConfig.stockFile);
    const transactionsRaw = this.resourceService.getTextFromFile(appConfig.transactionsFile);
    const initialStock: Stock[] = JSON.parse(initialStockRaw);
    const transactions: Transaction[] = JSON.parse(transactionsRaw);
  
    const initialStockForSku: Stock | undefined = initialStock.find((s: Stock) => s.sku === sku)

    // REQUIREMENT - must throw an error where the SKU does not exist in the `transactions.json` and `stock.json` file
    const isInTransactions = Boolean(transactions.find((t: Transaction) => t.sku === sku));
    const isInInitialStock = Boolean(initialStockForSku);
    if (!isInInitialStock && !isInTransactions) throw new SkuDoesNotExistError(sku);

    // set initial stock for sku that we are looking for
    stockLevel.qty = initialStockForSku?.stock || Stock.StartingQuantity;
  
    // assuming the transactions are in order in the transactions.json:
    transactions.forEach((t: Transaction) => this.actionTransaction(t, sku, stockLevel));

    return stockLevel;
  }

  /**
   * Mutator method - mutates stockLevel concrete object
   */
  private actionTransaction(t: Transaction, sku: string, stockLevel: StockLevel): void {
    if (t.sku === sku) {
      switch (t.type) {
        case TransactionType.Order:
          stockLevel.qty -= t.qty;
          break;
        case TransactionType.Refund:
          if (this.configService.featuresEnabled().restockOnRefund) {
            stockLevel.qty += t.qty;
          }
          break;
        default:
          console.error(`Unmapped transaction type ${t.type}`)
      }
    }
  }
}
