from groq import AsyncGroq, APIError
import json
import re
import logging
from app.utils.config import settings
from app.utils.prompts import get_prompt
from app.models.responses import SummaryResponse, Flashcard

logger = logging.getLogger(__name__)


def _get_client():
    api_key = settings.groq_api_key
    if not api_key or api_key in ("gsk_placeholder", "your_groq_api_key_here"):
        raise ValueError("GROQ_API_KEY is not configured or is a placeholder. Please set a valid Groq API Key.")
    return AsyncGroq(api_key=api_key)


async def generate_summary(text: str, mode: str) -> SummaryResponse:
    """
    Call Groq API to generate a structured summary.
    Returns summary, key points, keywords, and flashcards.
    """
    if not text.strip():
        raise ValueError("Input text cannot be empty.")

    client = _get_client()
    prompt = get_prompt(mode=mode, text=text)

    try:
        completion = await client.chat.completions.create(
            model=settings.groq_model,
            messages=[
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            temperature=0.4,
            response_format={"type": "json_object"}
        )
    except APIError as e:
        logger.error(f"Groq API Error: {str(e)}", exc_info=True)
        raise RuntimeError(f"Groq API Error: {str(e)}")
    except Exception as e:
        logger.error(f"Failed to communicate with Groq: {str(e)}", exc_info=True)
        raise RuntimeError(f"Failed to communicate with AI Service: {str(e)}")

    raw_response = completion.choices[0].message.content
    if not raw_response:
        raise ValueError("Groq returned an empty response. Please try again.")

    data = _parse_groq_response(raw_response)

    # Build typed Flashcard objects
    flashcards = []
    for fc in data.get("flashcards", []):
        if isinstance(fc, dict) and "question" in fc and "answer" in fc:
            flashcards.append(Flashcard(
                question=str(fc["question"]),
                answer=str(fc["answer"])
            ))

    summary_text = data.get("summary", "")

    return SummaryResponse(
        summary=summary_text,
        key_points=data.get("key_points", []),
        keywords=data.get("keywords", []),
        flashcards=flashcards,
        mode=mode,
        word_count=len(summary_text.split())
    )


def _parse_groq_response(raw_text: str) -> dict:
    """
    Extract and parse JSON from Groq's response.
    Handles markdown code fences and extra surrounding text.
    """
    cleaned = raw_text.strip()

    # Strip markdown code fences (```json...``` or ```...```)
    if cleaned.startswith("```"):
        cleaned = re.sub(r"^```(?:json)?\n?", "", cleaned)
        cleaned = re.sub(r"\n?```$", "", cleaned)
        cleaned = cleaned.strip()

    # Try direct parse first
    try:
        return json.loads(cleaned)
    except json.JSONDecodeError:
        pass

    # Try to find a JSON object anywhere in the text
    json_match = re.search(r"\{[\s\S]*\}", cleaned)
    if json_match:
        try:
            return json.loads(json_match.group())
        except json.JSONDecodeError:
            pass

    raise ValueError(
        "Could not parse AI response. "
        "The model returned an unexpected format. Please try again."
    )
