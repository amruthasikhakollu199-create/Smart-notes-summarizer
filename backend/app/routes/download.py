from fastapi import APIRouter, HTTPException
from fastapi.responses import StreamingResponse
import io

from app.models.requests import DownloadRequest
from app.services.pdf_generator import generate_summary_pdf

router = APIRouter()


@router.post("/download-pdf")
async def download_summary_pdf(request: DownloadRequest):
    """
    Generate and download PDF summary.
    """
    try:
        print("🔥 DOWNLOAD ROUTE HIT")

        pdf_bytes = generate_summary_pdf(request)

        return StreamingResponse(
            io.BytesIO(pdf_bytes),
            media_type="application/pdf",
            headers={
                "Content-Disposition": 'attachment; filename="study-notes-summary.pdf"'
            }
        ) 
    except Exception as e:
     import traceback

     traceback.print_exc()
     print("PDF ERROR:", repr(e))

     raise HTTPException(
         status_code=500,
         detail=f"Failed to generate PDF: {str(e)}"
     )
