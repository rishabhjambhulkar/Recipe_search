from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import router
import logging
# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


app = FastAPI()

@app.middleware("http")
async def log_requests(request, call_next):
    # logger.info(f"Incoming request: {request.method} {request.url} | Headers: {request.headers}")
    response = await call_next(request)
    return response

# Add CORS middleware
origins = [
    "http://localhost:3000",  # React app's origin
    # Add other origins as needed
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Allows specific origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods (GET, POST, etc.)
    allow_headers=["*"],  # Allows all headers
)

# Include recipe search routes
app.include_router(router)

@app.get("/")
async def root():
    return {"message": "Welcome to the Recipe Search API!"}

# Run the server using Uvicorn
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)