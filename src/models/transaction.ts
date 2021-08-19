export interface Transaction {
  sku: string,
  qty: number,
  type: TransactionType,
}

export enum TransactionType {
  Order = 'order',
  Refund = 'refund',
}