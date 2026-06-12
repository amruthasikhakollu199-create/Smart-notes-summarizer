"""
Prompt templates for each summary mode.
Each prompt instructs Gemini to return ONLY valid JSON — no markdown, no extra text.
"""

_BASE = """
You are an expert academic study assistant. Carefully analyze the text below and respond with ONLY a valid JSON object.

IMPORTANT RULES:
- Output ONLY the JSON object, nothing else
- Do NOT use markdown code blocks or backticks
- Do NOT include any text before or after the JSON
- All string values must be properly escaped
- Flashcard questions should test understanding, not just definition recall

Required JSON structure (ALL keys mandatory):
{{
  "summary": "<summary text here>",
  "key_points": ["<point 1>", "<point 2>", ...],
  "keywords": ["<keyword 1>", "<keyword 2>", ...],
  "flashcards": [
    {{"question": "<question>", "answer": "<answer>"}},
    ...
  ]
}}

Text to analyze:
\"\"\"
{text}
\"\"\"
"""

_SHORT = (
    "Create a SHORT summary with:\n"
    "- summary: 2-3 concise sentences covering only the main idea\n"
    "- key_points: exactly 3-5 of the most important bullet points\n"
    "- keywords: exactly 5 key terms or concepts\n"
    "- flashcards: exactly 5 Q&A pairs testing core concepts\n\n"
)

_MEDIUM = (
    "Create a MEDIUM summary with:\n"
    "- summary: 1 solid paragraph (5-8 sentences) covering main ideas and key details\n"
    "- key_points: 5-7 important points with enough detail to be useful\n"
    "- keywords: exactly 8 key terms, concepts, or important phrases\n"
    "- flashcards: exactly 8 Q&A pairs covering important concepts\n\n"
)

_DETAILED = (
    "Create a DETAILED summary with:\n"
    "- summary: 3-5 paragraphs providing a thorough overview including main ideas, "
    "supporting details, examples, and conclusions\n"
    "- key_points: 8-10 comprehensive points with context\n"
    "- keywords: exactly 12 key terms, concepts, formulas, or important phrases\n"
    "- flashcards: exactly 10 comprehensive Q&A pairs for deep understanding\n\n"
)


def get_prompt(mode: str, text: str) -> str:
    """
    Returns the complete prompt for the given summary mode.

    Args:
        mode: "short", "medium", or "detailed"
        text: The text to summarize

    Returns:
        Complete prompt string ready to send to Gemini
    """
    instructions = {
        "short": _SHORT,
        "medium": _MEDIUM,
        "detailed": _DETAILED,
    }
    instruction = instructions.get(mode, _MEDIUM)
    # Safety: cap text at 50,000 chars to stay within Gemini context window
    return instruction + _BASE.format(text=text[:50000])
