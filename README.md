# Getting started
- Download and install Node 14 LTS
- navigate inside my project root folder run the following command:
  `npm i`

# Running the project
  `npm start`
- This will run index.ts which is configured using the index.ts module level variable "targetSku"

  `npm test`
- This will run the unit tests for the project

  `npm run lint`
- This runs eslint against my project
 

# Technical Test 
## User story:
- As an interviewer I want a function which is able to:
  - return the current stock levels for a given SKU
    (by combining the data in these two files).

## Requirements:
  [x] must match the following signature: `(sku: string) => Promise<{ sku: string, qty: number }>`.
  [x] must read from the `stock` and `transactions` files on each invocation (totals cannot be precomputed)
  [x] must throw an error where the SKU does not exist in the `transactions.json` and `stock.json` file
  [x] Transactions may exist for SKUs which are not present in `stock.json`. It should be assumed that the starting quantity for these is 0.
  [x] Functionality can be split into many files to help keep the project clear and organised 
  [x] all code adequately unit tested

Ambiguity (questions for product owner / business analyst):
  [x] refunds - in the transactions.json there are refunds and orders
              - should refunds be added back into the stock?
              - for the sake of this technical test I have assumed the product owner has
                given sign off for refunds to be added back into the stock
                but with the added benefit of a feature flag

## Issues with technical test:
It’s worth noting that through more thorough unit testing I discovered an issue with the technical test:

It's due to stock levels not being high enough for demand. 
In this situation I'd speak to Product owner. 
We could implement a safety check for this but it is currently not part of the acceptance criteria

The issue can be seen with this SKU id:
==== Checking NJL093603/01/73 ====
transactions['NJL093603/01/73'] = [(1, 'order'), (4, 'order'), (4, 'order'), (10, 'refund'), (6, 'order'), (9, 'refund'), (7, 'order'), (8, 'order'), (0, 'refund'), (8, 'order'), (9, 'refund'), (9, 'order'), (9, 'order'), (3, 'refund'), (4, 'order'), (7, 'order'), (10, 'order'), (10, 'order')]
Initial stock value / stock['NJL093603/01/73'] = 0
Totals for orders: 87
Totals for refunds: 31
Grand total (with refunds): 0 - 87 + 31 = -56
Grand total (without refunds): 0 - 87 = -87
