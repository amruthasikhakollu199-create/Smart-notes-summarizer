from pydantic import BaseModel, Field, validator
from typing import Literal, List, Optional


class SummarizeRequest(BaseModel):
    """Request body for the /api/summarize endpoint."""
    text: str = Field(..., min_length=50, description="Text to summarize. Minimum 50 characters.")
    mode: Literal["short", "medium", "detailed"] = Field(
        default="medium",
        description="Summary depth: short (2-3 sentences), medium (1 paragraph), detailed (3-5 paragraphs)"
    )
    title: str = Field(default="", description="Optional title for the notes")

    class Config:
        json_schema_extra = {
            "example": {
                "text": "Your notes or article text goes here...",
                "mode": "medium",
                "title": "Biology Chapter 5"
            }
        }


class FlashcardInput(BaseModel):
    """A single flashcard input item."""
    question: str = Field(default="")
    answer: str = Field(default="")


class DownloadRequest(BaseModel):
    """Request body for the /api/download-pdf endpoint.

    All fields are optional (with safe defaults) so that partially-filled
    payloads never cause a ValidationError — the PDF generator handles
    empty/missing sections gracefully.
    """
    title: Optional[str] = Field(default="Study Notes Summary", description="Title for the PDF document")
    summary: str = Field(default="", description="The AI-generated summary text")
    key_points: List[str] = Field(default_factory=list, description="List of key points")
    keywords: List[str] = Field(default_factory=list, description="List of keywords")
    flashcards: List[FlashcardInput] = Field(default_factory=list, description="Flashcard Q&A pairs")
    mode: str = Field(default="medium", description="Summary mode used")

    @validator("summary", pre=True, always=True)
    def coerce_summary(cls, v):
        """Accept None and coerce to empty string — avoids crashes on missing summary."""
        return v or ""

    @validator("key_points", "keywords", pre=True, always=True)
    def coerce_list(cls, v):
        """Accept None and coerce to empty list."""
        return v or []

    @validator("flashcards", pre=True, always=True)
    def coerce_flashcards(cls, v):
        """Accept None and coerce to empty list."""
        return v or []

    @validator("mode", pre=True, always=True)
    def coerce_mode(cls, v):
        """Accept None or empty string and default to 'medium'."""
        return v or "medium"

    @validator("title", pre=True, always=True)
    def coerce_title(cls, v):
        """Accept None and replace with default title."""
        return v or "Study Notes Summary"

    class Config:
        json_schema_extra = {
            "example": {
                "title": "Biology Chapter 5",
                "summary": "This chapter covers photosynthesis...",
                "key_points": ["Chlorophyll absorbs light", "ATP is produced"],
                "keywords": ["photosynthesis", "chlorophyll", "ATP"],
                "flashcards": [{"question": "What is photosynthesis?", "answer": "The process by which plants..."}],
                "mode": "medium"
            }
        }
