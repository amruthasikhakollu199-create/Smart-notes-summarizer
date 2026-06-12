import fitz  # PyMuPDF
import re


async def extract_text_from_pdf(file_bytes: bytes) -> dict:
    """
    Extract all text from a PDF file given its raw bytes.
    Returns text content, page count, and character count.
    """
    try:
        # Open PDF from bytes — no temp file needed
        doc = fitz.open(stream=file_bytes, filetype="pdf")
        page_count = len(doc)
        text_parts = []

        for page_num in range(page_count):
            page = doc[page_num]
            page_text = page.get_text("text")
            if page_text.strip():
                text_parts.append(page_text)

        doc.close()

        full_text = "\n\n".join(text_parts)
        full_text = _clean_text(full_text)

        return {
            "text": full_text,
            "page_count": page_count,
            "char_count": len(full_text),
        }

    except Exception as e:
        raise RuntimeError(f"Failed to extract PDF text: {str(e)}")


def _clean_text(text: str) -> str:
    """Remove excessive whitespace from extracted PDF text."""
    text = re.sub(r"\n{3,}", "\n\n", text)
    lines = [line.rstrip() for line in text.split("\n")]
    return "\n".join(lines).strip()
