from fastapi import APIRouter, UploadFile, File, HTTPException
from app.models.responses import ExtractResponse
from app.services.pdf_extractor import extract_text_from_pdf
from app.utils.config import settings

router = APIRouter()

MAX_SIZE_BYTES = settings.max_pdf_size_mb * 1024 * 1024


@router.post("/api/extract-pdf", response_model=ExtractResponse)
async def extract_pdf(file: UploadFile = File(...)):
    """
    Extract text content from an uploaded PDF file.
    Maximum file size: configurable via MAX_PDF_SIZE_MB in .env
    """
    if not file.filename or not file.filename.lower().endswith(".pdf"):
        raise HTTPException(
            status_code=400,
            detail="Only PDF files are supported. Please upload a .pdf file."
        )

    contents = await file.read()

    if len(contents) > MAX_SIZE_BYTES:
        raise HTTPException(
            status_code=413,
            detail=f"File too large. Maximum size is {settings.max_pdf_size_mb}MB."
        )

    if len(contents) == 0:
        raise HTTPException(status_code=400, detail="Uploaded file is empty.")

    try:
        result = await extract_text_from_pdf(contents)

        if not result["text"].strip():
            raise HTTPException(
                status_code=422,
                detail="Could not extract text from this PDF. It may be scanned or image-based."
            )

        return ExtractResponse(**result)
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to process PDF: {str(e)}"
        )
