export interface Features {
  /**
   * Ambiguity in technical test (questions for product owner / business analyst):
   * refunds - in the transactions.json there are refunds and orders
   *          - should refunds be added back into the stock?
   *          - for the sake of this technical test I have imagined the product owner has
   *            given sign off for refunds to be added back into the stock
   *            but with the added benefit of a feature flag to disable it if need be
   *            (maybe it's also the case that the Product Owner isn't 100% on whether
   *            business will want this yet)
   */
  restockOnRefund: boolean;
}
