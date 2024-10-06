# app/routes.py
from fastapi import APIRouter, Depends, HTTPException
from app.models import RecipeSearchRequest, RecipeResponse
from app.services import search_recipes
from typing import List
import logging

logger = logging.getLogger(__name__)

router = APIRouter()

@router.post("/recipes/search", response_model=List[RecipeResponse])
async def search_recipes_endpoint(request: RecipeSearchRequest):
    try:
       # Get the request body as JSON
        logger.info(f"Incoming request body: {request}")
        print(request)
        results = search_recipes(request)
        # Transform OpenSearch results to the desired response model
        recipes = []
        for result in results:
            source = result["_source"]
            recipe = RecipeResponse(
                title=source["title"],
                description=source["desc"],
                ingredients=source["ingredients"],
                directions=source["directions"],
                calories=source["calories"],
                protein=source["protein"],
                fat=source["fat"],
                sodium=source["sodium"],
                rating=source["rating"]
            )
            recipes.append(recipe)
        return recipes
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
