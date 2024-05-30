import csv

# Function to read product data from a CSV file with a specified delimiter
def read_product_data(csv_file, delimiter=';'):
    products = {}
    with open(csv_file, 'r', newline='', encoding='utf-8') as file:
        csvreader = csv.DictReader(file, delimiter=delimiter)
        
        # Normalize column names by stripping leading/trailing spaces
        fieldnames = [field.strip() for field in csvreader.fieldnames]
        csvreader.fieldnames = fieldnames
        
        for row in csvreader:
            ean = row['EAN'].strip() if 'EAN' in row and row['EAN'] else None
            url = row['URL'].strip() if 'URL' in row and row['URL'] else None
            if ean and url:
                products[ean] = url
    
    print(f"Read {len(products)} products from {csv_file}")
    return products

# Paths to the input CSV files
csv_file1 = 'sk_old.csv'
csv_file2 = 'sk_new.csv'

# Read product data from both CSV files
products1 = read_product_data(csv_file1, delimiter=';')
products2 = read_product_data(csv_file2, delimiter=';')

# Match products by EAN
matched_products = []
for ean, url1 in products1.items():
    if ean in products2:
        url2 = products2[ean]
        matched_products.append((url1, url2, 1))

# Write matched products to a new CSV file
output_file = 'matched_products.csv'
with open(output_file, 'w', newline='', encoding='utf-8') as csvfile:
    csvwriter = csv.writer(csvfile, delimiter=';')
    csvwriter.writerow(['fromUrl', 'toUrl', 'automatic'])  # Write header
    for match in matched_products:
        csvwriter.writerow(match)

print(f'Matched products have been written to {output_file}')
