from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import router as routes_router
from db import Base, engine

app = FastAPI(title="Police AI API", description="API for the Police AI investigation platform")

# Configure CORS
origins = [
    "http://localhost:3000",
    "http://localhost:8080" 
    # Add your production domains here
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routes
app.include_router(routes_router)

# Create tables
Base.metadata.create_all(bind=engine)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
    
    