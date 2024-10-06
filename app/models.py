# app/models.py
from pydantic import BaseModel
from typing import List, Optional
class RecipeSearchRequest(BaseModel):
    query: Optional[str] = None
    ingredients: Optional[List[str]] = None
    category: Optional[str] = None
    min_calories: Optional[int] = None
    max_calories: Optional[int] = None
    min_protein: Optional[float] = None  # New filter for protein
    max_protein: Optional[float] = None  # New filter for protein
    min_sodium: Optional[float] = None   # New filter for sodium
    max_sodium: Optional[float] = None   # New filter for sodium
    min_rating: Optional[float] = None   # New filter for rating

class RecipeResponse(BaseModel):
    title: str
    description: Optional[str] = None  # Make description optional
    ingredients: List[str]
    directions: List[str]
    calories: float
    protein: float
    fat: float
    sodium: float
    rating: float
