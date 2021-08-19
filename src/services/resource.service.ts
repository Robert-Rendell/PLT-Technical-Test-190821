import * as fs from 'fs';

import { Service } from "typedi";

@Service()
export class ResourceService {
  static TRANSACTIONS = '../resources/transactions.json';
  static STOCK = '../resources/stock.json';

  public getTextFromFile(filePath: string): string {
    // POTENTIAL IMPROVEMENT - use async/await version of readFile and handle the promise
    return fs.readFileSync(filePath, 'utf8');
  }
}
