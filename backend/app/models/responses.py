from pydantic import BaseModel
from typing import List


class Flashcard(BaseModel):
    """A single flashcard with a question and answer."""
    question: str
    answer: str


class SummaryResponse(BaseModel):
    """Full AI summary response returned to the frontend."""
    summary: str
    key_points: List[str]
    keywords: List[str]
    flashcards: List[Flashcard]
    mode: str
    word_count: int

    class Config:
        json_schema_extra = {
            "example": {
                "summary": "This text covers...",
                "key_points": ["Key point 1", "Key point 2"],
                "keywords": ["term1", "term2"],
                "flashcards": [{"question": "What is...?", "answer": "It is..."}],
                "mode": "medium",
                "word_count": 85
            }
        }


class ExtractResponse(BaseModel):
    """Response from PDF text extraction."""
    text: str
    page_count: int
    char_count: int
