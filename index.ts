import 'reflect-metadata';
import { Container } from "typedi";
import { ConfigService } from './src/services/config.service';
import { StockService } from "./src/services/stock.service";

/**
 * Desired SKU input
 */
const targetSku = 'LTV719449/39/39';

const configService = Container.get(ConfigService);
configService.setFeatureFlags({
  restockOnRefund: true, // Set this to false if you don't want refunds to be added back into the resellable stock
});

if (configService.getFeatureFlags().restockOnRefund) {
  console.log('The program will add refunds back into the sellable stock')
} else {
  console.log('The program will NOT add refunds back into the sellable stock')
}

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
