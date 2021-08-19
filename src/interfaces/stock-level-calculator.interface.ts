export interface IStockLevelCalculator {
  getStockLevel: (sku: string) => Promise<{ sku: string, qty: number }>
}
