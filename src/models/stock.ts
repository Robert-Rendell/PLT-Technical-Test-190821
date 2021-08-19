export class Stock {
  /**
   * REQUIREMENT -
   * Transactions may exist for SKUs which are not present in `stock.json`.
   * It should be assumed that the starting quantity for these is 0.
   */
  static StartingQuantity = 0;

  constructor(public sku: string, public stock: number = Stock.StartingQuantity) {
    this.sku = sku;
    this.stock = stock;
  }
}
