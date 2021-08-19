import * as fs from 'fs';
import { Service } from 'typedi';

import { IStockLevelCalculator } from "./interfaces/stock-level-calculator.interface";
import { StockLevel } from "./models/stock-level";

@Service()
export class StockLevelCalculatorService implements IStockLevelCalculator {
  public getStockLevel(sku: string): Promise<StockLevel> {
    const stockLevel: StockLevel = {
      qty: 0,
      sku: '',
    };

    // REQUIREMENT - must read from the `stock` and `transactions` files on each invocation (totals cannot be precomputed)
    fs.readFileSync('../resources/stock.json', 'utf8');

    return Promise.resolve(stockLevel);
  }
}
