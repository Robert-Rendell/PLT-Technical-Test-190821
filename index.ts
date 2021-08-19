import { Container } from "typedi";
import { StockService } from "./src/services/stock.service";

/**
 * Desired input
 */
const targetSku = 'LTV719449/39/39';

(async () => {
  StockService.TRANSACTIONS = "./resources/transactions.json";
  StockService.STOCK = "./resources/stock.json";

  const stockService = Container.get(StockService);
  const stockLevel = await stockService.getStockLevel(targetSku);
  
  console.log(`Stock level for SKU (${targetSku}) is: ${stockLevel.qty}`)
})();