/**
 * REQUIREMENT - The function must match the following signature: `(sku: string) => Promise<{ sku: string, qty: number }>`.
 */
export interface IStockLevelCalculator {
  getStockLevel: (sku: string) => Promise<{ sku: string, qty: number }>
}
