import google.generativeai as genai
import json
import re
from app.utils.config import settings
from app.utils.prompts import get_prompt
from app.models.responses import SummaryResponse, Flashcard

# Configure Gemini with API key once at module load
genai.configure(api_key=settings.gemini_api_key)


async def generate_summary(text: str, mode: str) -> SummaryResponse:
    """
    Call Google Gemini API to generate a structured summary.
    Returns summary, key points, keywords, and flashcards.
    """
    model = genai.GenerativeModel(
        model_name=settings.gemini_model,
        generation_config=genai.types.GenerationConfig(
            temperature=0.4,
            top_p=0.95,
            top_k=40,
        )
    )

    prompt = get_prompt(mode=mode, text=text)

    # Call Gemini (synchronous SDK wrapped in async route)
    response = model.generate_content(prompt)

    if not response.text:
        raise ValueError("Gemini returned an empty response. Please try again.")

    data = _parse_gemini_response(response.text)

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


def _parse_gemini_response(raw_text: str) -> dict:
    """
    Extract and parse JSON from Gemini's response.
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
