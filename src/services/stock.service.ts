import * as fs from 'fs';

import { Service } from 'typedi';
import { SkuDoesNotExistError } from '../errors/sku-does-not-exist';

import { IStockLevelCalculator } from "../interfaces/stock-level-calculator.interface";
import { StockLevel } from "../models/stock-level";
import { Stock } from '../models/stock';
import { Transaction, TransactionType } from '../models/transaction';
import { ConfigService } from './config.service';

@Service()
export class StockService implements IStockLevelCalculator {
  static TRANSACTIONS = '../resources/transactions.json';
  static STOCK = '../resources/stock.json';

  constructor(private configService: ConfigService) {}

  public async getStockLevel(sku: string): Promise<StockLevel> {
    const stockLevel: StockLevel = {
      qty: 0,
      sku,
    };

    // REQUIREMENT - must read from the `stock` and `transactions` files on each invocation (totals cannot be precomputed)
    const initialStockRaw = fs.readFileSync(StockService.STOCK, 'utf8');
    const transactionsRaw = fs.readFileSync(StockService.TRANSACTIONS, 'utf8');
    // POTENTIAL IMPROVEMENT - move the two above lines to separate services
    // POTENTIAL IMPROVEMENT - use async/await version of readFile and handle the promise

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
    transactions.forEach((t: Transaction) => {
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
    });

    return stockLevel;
  }
}
