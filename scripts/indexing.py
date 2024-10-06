import json

# Load your JSON data from the file
with open('clean_recipe.json', 'r') as f:
    # Read all lines and load them as separate JSON objects
    recipes = [json.loads(line) for line in f]

# Prepare bulk format
bulk_data = []

for index, recipe in enumerate(recipes, start=1):
    # Create the index line
    index_line = {"index": {"_id": str(index)}}
    
    # Add to bulk data
    bulk_data.append(index_line)
    
    # Add the recipe data
    bulk_data.append(recipe)

# Write the bulk data to a file for OpenSearch ingestion
with open('main_recipe.json', 'w') as f:
    for item in bulk_data:
        f.write(json.dumps(item) + '\n')

print("Bulk data has been written to 'main_recipe.json' for OpenSearch ingestion.")