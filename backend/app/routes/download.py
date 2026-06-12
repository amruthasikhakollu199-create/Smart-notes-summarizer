from fastapi import APIRouter, HTTPException
from fastapi.responses import StreamingResponse
import io
import traceback
import logging

from app.models.requests import DownloadRequest
from app.services.pdf_generator import generate_summary_pdf

logger = logging.getLogger(__name__)
router = APIRouter()


@router.post("/download-pdf")
async def download_summary_pdf(request: DownloadRequest):
    """
    Generate and download a PDF study-notes summary.
    Accepts a DownloadRequest body and streams back a PDF file.
    """
    # ── 1. Route hit confirmation ─────────────────────────────────────────
    print("🔥 DOWNLOAD ROUTE HIT")
    logger.info("POST /api/download-pdf — route hit")

    # ── 2. Request payload validation log ────────────────────────────────
    print(
        f"📦 PAYLOAD — title={request.title!r}  mode={request.mode!r}  "
        f"summary_len={len(request.summary or '')}  "
        f"key_points={len(request.key_points)}  "
        f"keywords={len(request.keywords)}  "
        f"flashcards={len(request.flashcards)}"
    )
    logger.info(
        "Request payload validated: title=%r mode=%r summary_chars=%d "
        "key_points=%d keywords=%d flashcards=%d",
        request.title, request.mode,
        len(request.summary or ""),
        len(request.key_points),
        len(request.keywords),
        len(request.flashcards),
    )

    try:
        # ── 3. PDF generation start ───────────────────────────────────────
        print("🚀 PDF GENERATION START")
        logger.info("PDF generation starting")

        pdf_bytes = generate_summary_pdf(request)

        # ── 4. PDF generation success ─────────────────────────────────────
        print(f"✅ PDF GENERATION SUCCESS — {len(pdf_bytes)} bytes")
        logger.info("PDF generation succeeded: %d bytes", len(pdf_bytes))

        if not pdf_bytes:
            raise ValueError("generate_summary_pdf() returned empty bytes")

        return StreamingResponse(
            io.BytesIO(pdf_bytes),
            media_type="application/pdf",
            headers={
                "Content-Disposition": 'attachment; filename="study-notes-summary.pdf"',
                "Content-Length": str(len(pdf_bytes)),
            },
        )

    except Exception as e:
        # ── 5. PDF generation failure ─────────────────────────────────────
        traceback.print_exc()
        print("PDF ERROR:", repr(e))
        logger.error("PDF generation failed: %s", repr(e), exc_info=True)

        raise HTTPException(
            status_code=500,
            detail=f"Failed to generate PDF: {repr(e)}",
        )