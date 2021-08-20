import json

def setup():
  t = json.loads(open("./resources/transactions.json", "r").read())
  s = json.loads(open("./resources/stock.json", "r").read())

  transaction_keys = set([])

  for a in t:
    for b in list(a.keys()):
      transaction_keys.add(b)

  print(f"Possible set of transaction unique keys: {transaction_keys}")
  # {'sku', 'qty', 'type'}

  transaction_type_keys = set([])
  for a in t:
    transaction_type_keys.add(a['type'])     

  print(f"Possible set of transaction type unique keys: {transaction_type_keys}")
  # {'order', 'refund'}

  stock_keys = set([])
  for a in s: 
    for b in list(a.keys()):
      stock_keys.add(b)

  print(f"Possible set of stock unique keys: {stock_keys}")
  # {'sku', 'stock'}

  # Getting all transactions in a dictionary
  transactions = {}

  for tx in t:          
    sku = tx['sku']   
    qty = tx['qty'] 
    type = tx['type']
    if transactions.get(sku):
      transactions[sku].append((qty, type))
    else:
      transactions[sku] = [(qty, type)]      

  # Getting all initial stock values in a dictionary
  stock = { sx['sku']: sx['stock'] for sx in s }

  print(f"All SKUs (transactions): {transactions.keys()}")
  print(f"All SKUs (stocks): {stock.keys()}")
  print(f"Stock SKU length = {len(stock.keys())} vs. transaction SKU length = {len(transactions.keys())}")
  print(f"Transactions without initial stock = {set(transactions.keys()).difference(set(stock.keys()))}")
  return transactions, stock

def calculate_totals(transactions, sku):
  total_refund = 0
  total_order = 0
  others = 0
  transactions_for_sku = transactions.get(sku)
  if len(transactions_for_sku) > 0:
    for t in transactions_for_sku:
      qty, order = t
      if order == 'refund':
        total_refund = total_refund + qty
      elif order == 'order':
        total_order = total_order + qty
      else:
        others = others + 1
  else:
    print(f"No transactions for SKU ({sku})")
  return total_order, total_refund, others

def check_sku_manually(sku):
  global transactions
  global stock
  print(f"==== Checking {sku} ====")
  stock_sku = stock.get(sku) or 0
  # eg. LTV719449/39/39
  # Checking manually (+ for refund, - for order)
  print(f"transactions['{sku}'] = {transactions[sku]}")
  # eg. [(10, 'refund'), (7, 'order'), (5, 'order'), (1, 'order'), (9, 'order'), (7, 'order'), (5, 'order'), (0, 'order'), (9, 'refund')]
  print(f"Initial stock value / stock['{sku}'] = {stock_sku}")                                           
  # eg. 8525
  total_refund = 0
  total_order = 0
  others = 0
  total_order, total_refund, others = calculate_totals(transactions, sku)
  print(f"Totals for orders: {total_order}")
  print(f"Totals for refunds: {total_refund}")
  print(f"Grand total (with refunds): {stock_sku} - {total_order} + {total_refund} = {stock_sku - total_order + total_refund}")
  print(f"Grand total (without refunds): {stock_sku} - {total_order} = {stock_sku - total_order}")

def main():
  global transactions
  global stock

  skus_to_check = [
    'LTV719449/39/39',
    'SXV420098/71/68',
    'NJL093603/01/73',
  ]
  transactions, stock = setup()

  for sku in skus_to_check:
    check_sku_manually(sku)

if __name__ == "__main__":
  main()
