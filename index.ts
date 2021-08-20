import 'reflect-metadata';
import { Container } from "typedi";
import { StockService } from "./src/services/stock.service";

Container.reset();

/**
 * Desired input
 */
const targetSku = 'LTV719449/39/39';

(async () => {
  let failed = false;
  const stockService = Container.get(StockService);
  const stockLevel = await stockService.getStockLevel(targetSku)
                                       .catch((e) => { 
                                         console.error("Error: " + e.message);
                                         failed = true; 
                                       });
  
  if (!failed) console.log(`Stock level for SKU (${targetSku}) is: ${stockLevel?.qty}`)
})();
