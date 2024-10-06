# app/config.py
from opensearchpy import OpenSearch

def get_opensearch_client():
    # Set up OpenSearch client (modify as per your setup)
    client = OpenSearch(
        hosts=[{'host': 'localhost', 'port': 9200}],
        http_auth=('admin', 'Rishabh@13'),  # Change credentials as per your setup
        use_ssl=False,  # Modify if you're using SSL
        verify_certs=False
    )
    return client




