import { StockService } from "./src/stock.service";

(async () => {
  StockService.TRANSACTIONS = "./resources/transactions.json";
  StockService.STOCK = "./resources/stock.json";

  const targetSku = 'LTV719449/39/39';
  const stockService = new StockService();
  const stockLevel = await stockService.getStockLevel(targetSku);
  
  console.log(`Stock level for SKU (${targetSku}) is: ${stockLevel.qty}`)
})();