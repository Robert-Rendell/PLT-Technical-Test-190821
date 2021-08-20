import json

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


# Checking manually (+ for refund, - for order)
print(f"transactions['LTV719449/39/39'] = {transactions['LTV719449/39/39']}")
# [(10, 'refund'), (7, 'order'), (5, 'order'), (1, 'order'), (9, 'order'), (7, 'order'), (5, 'order'), (0, 'order'), (9, 'refund')]
print(f"stock['LTV719449/39/39'] = {stock['LTV719449/39/39']}")                                           
# 8525