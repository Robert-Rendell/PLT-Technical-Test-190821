export class Stock {
  /**
   * REQUIREMENT -
   * Transactions may exist for SKUs which are not present in `stock.json`.
   * It should be assumed that the starting quantity for these is 0.
   */
  static StartingQuantity = 0;

  public sku: string;
  public stock = Stock.StartingQuantity;

  constructor(sku: string, stock: number) {
    this.sku = sku;
    this.stock = stock;
  }
}
