# app/services.py
from opensearchpy import OpenSearch
from app.config import get_opensearch_client
import logging

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

client = get_opensearch_client()

def search_recipes(query_params):
    # Log incoming query parameters
    logger.info("Incoming Query Parameters: %s", query_params)
    
    search_query = {
        "query": {
            "bool": {
                "must": [],
                "filter": []
            }
        }
    }

    # Search for keyword in title, directions, ingredients, and description
    if query_params.query:
        search_query["query"]["bool"]["must"].append({
            "multi_match": {
                "query": query_params.query,
                "fields": ["title", "directions", "ingredients", "desc"]
            }
        })

    # Log the search query for debugging
    logger.debug("Search Query: %s", search_query)

    # Filter by ingredients
    if query_params.ingredients:
        for ingredient in query_params.ingredients:
            search_query["query"]["bool"]["filter"].append({
                "term": {"ingredients": ingredient}
            })
    
    # Filter by category
    if query_params.category:
        search_query["query"]["bool"]["filter"].append({
            "term": {"categories": query_params.category}
        })

    # Filter by calorie range
    if query_params.min_calories or query_params.max_calories:
        calorie_filter = {"range": {"calories": {}}}
        if query_params.min_calories:
            calorie_filter["range"]["calories"]["gte"] = query_params.min_calories
        if query_params.max_calories:
            calorie_filter["range"]["calories"]["lte"] = query_params.max_calories
        search_query["query"]["bool"]["filter"].append(calorie_filter)

    # Filter by protein range
    if query_params.min_protein or query_params.max_protein:
        protein_filter = {"range": {"protein": {}}}
        if query_params.min_protein:
            protein_filter["range"]["protein"]["gte"] = query_params.min_protein
        if query_params.max_protein:
            protein_filter["range"]["protein"]["lte"] = query_params.max_protein
        search_query["query"]["bool"]["filter"].append(protein_filter)

    # Filter by sodium range
    if query_params.min_sodium or query_params.max_sodium:
        sodium_filter = {"range": {"sodium": {}}}
        if query_params.min_sodium:
            sodium_filter["range"]["sodium"]["gte"] = query_params.min_sodium
        if query_params.max_sodium:
            sodium_filter["range"]["sodium"]["lte"] = query_params.max_sodium
        search_query["query"]["bool"]["filter"].append(sodium_filter)

    # Filter by rating
    if query_params.min_rating:
        rating_filter = {"range": {"rating": {"gte": query_params.min_rating}}}
        search_query["query"]["bool"]["filter"].append(rating_filter)

    # Execute the search query
    response = client.search(index="recipe_indexing", body=search_query)
    logger.info("Search executed successfully, found %d hits", len(response["hits"]["hits"]))
    
    return response["hits"]["hits"]
