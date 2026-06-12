from fastapi import APIRouter, HTTPException
from app.models.requests import SummarizeRequest
from app.models.responses import SummaryResponse
from app.services.gemini_service import generate_summary

router = APIRouter()


@router.post("/summarize", response_model=SummaryResponse)
async def summarize_text(request: SummarizeRequest):
    """
    Summarize text using Google Gemini API.
    Returns summary, key points, keywords, and flashcards.
    """
    if not request.text.strip():
        raise HTTPException(status_code=400, detail="Text cannot be empty.")

    if len(request.text.strip()) < 50:
        raise HTTPException(
            status_code=400,
            detail="Text is too short. Please provide at least 50 characters."
        )

    try:
        result = await generate_summary(request.text, request.mode)
        return result
    except ValueError as e:
        raise HTTPException(status_code=422, detail=str(e))
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"AI summarization failed: {str(e)}"
        )
