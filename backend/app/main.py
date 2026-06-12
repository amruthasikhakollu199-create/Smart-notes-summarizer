from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import summarize, extract, download

app = FastAPI(
    title="Smart Notes Summarizer API",
    description="AI-powered study assistant backend using Google Gemini",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# CORS — allows the React frontend (localhost:5173) to call this API
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register all route groups under /api prefix
app.include_router(summarize.router, prefix="/api", tags=["Summary"])
app.include_router(extract.router, prefix="/api", tags=["PDF Extract"])
app.include_router(download.router, prefix="/api", tags=["Download"])


@app.get("/api/health", tags=["Health"])
async def health_check():
    """Check if the backend server is running."""
    return {"status": "ok", "message": "Smart Notes Summarizer is running!"}
