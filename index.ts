import { Container } from "typedi";
import { ResourceService } from "./src/services/resource.service";
import { StockService } from "./src/services/stock.service";

/**
 * Desired input
 */
const targetSku = 'LTV719449/39/39';

(async () => {
  ResourceService.TRANSACTIONS = "./resources/transactions.json";
  ResourceService.STOCK = "./resources/stock.json";

  const stockService = Container.get(StockService);
  const stockLevel = await stockService.getStockLevel(targetSku);
  
  console.log(`Stock level for SKU (${targetSku}) is: ${stockLevel.qty}`)
})();