"""
run.py — Smart Notes Summarizer Backend Starter

Usage:
    python run.py

Starts the FastAPI server with auto-reload. No need to remember uvicorn commands.
"""

import uvicorn

if __name__ == "__main__":
    print("")
    print("🧠 Smart Notes Summarizer — Backend Server")
    print("=" * 45)
    print("✅  Server starting up...")
    print("📖  API Docs:  http://localhost:8000/docs")
    print("🔗  API Base:  http://localhost:8000/api")
    print("🛑  Press Ctrl+C to stop the server")
    print("")

    uvicorn.run(
        "app.main:app",     # String path required for --reload to work
        host="0.0.0.0",     # Accessible from localhost
        port=8000,          # Default FastAPI port
        reload=True,        # Auto-restarts when you save any .py file
        reload_dirs=["app"] # Only watch the app/ folder for changes
    )
