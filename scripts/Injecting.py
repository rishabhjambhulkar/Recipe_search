import requests
from requests.auth import HTTPBasicAuth

# Load your JSON data from the file
with open('C:\\Users\\jambh\\Desktop\\Job hunt\\rapidious\\archive\\main_recipe.json', 'r') as file:
    bulk_data = file.read()

# Define the OpenSearch URL
url = "http://localhost:9200/recipe_indexing/_bulk"

# Set the headers
headers = {
    "Content-Type": "application/json"
}

# Define your credentials
username = "admin"
password = "Rishabh@13"

# Send the POST request with Basic Auth
response = requests.post(url, headers=headers, data=bulk_data, auth=HTTPBasicAuth(username, password))

# Print the response
print(response.json())
