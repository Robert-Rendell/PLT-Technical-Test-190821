export class SkuDoesNotExistError extends Error {
  constructor(sku: string) {
    super(`SKU does not exist: ${sku}`)
  }
}