from fpdf import FPDF
from datetime import datetime
import logging

logger = logging.getLogger(__name__)


class SummaryPDF(FPDF):
    """Custom PDF class with a styled header and footer."""

    def header(self):
        self.set_fill_color(79, 70, 229)   # Indigo
        self.rect(0, 0, 210, 18, "F")
        self.set_font("Helvetica", "B", 12)
        self.set_text_color(255, 255, 255)
        self.set_xy(10, 4)
        self.cell(0, 10, "Smart Notes Summarizer - Study Assistant", align="L")
        self.ln(20)
        self.set_text_color(0, 0, 0)

    def footer(self):
        self.set_y(-15)
        self.set_font("Helvetica", "I", 8)
        self.set_text_color(150, 150, 150)
        date_str = datetime.now().strftime("%B %d, %Y")
        self.cell(0, 10, f"Generated on {date_str}  |  Page {self.page_no()}", align="C")


def generate_summary_pdf(data) -> bytes:
    """
    Generate a styled PDF from summary data.
    `data` is a DownloadRequest pydantic model instance.

    Returns valid PDF bytes in all cases (empty sections, missing flashcards, etc.)
    """
    logger.info("PDF generation starting")
    print("[PDF GENERATION START]")

    pdf = SummaryPDF()
    pdf.set_auto_page_break(auto=True, margin=22)
    pdf.add_page()

    # ── Title ─────────────────────────────────────────────────────────────
    title = (data.title or "Study Notes Summary").strip() or "Study Notes Summary"
    pdf.set_font("Helvetica", "B", 20)
    pdf.set_text_color(30, 30, 30)
    pdf.multi_cell(0, 10, title, align="C", new_x="LMARGIN", new_y="NEXT")
    pdf.ln(3)

    mode_label = (data.mode or "medium").capitalize()
    pdf.set_font("Helvetica", "I", 10)
    pdf.set_text_color(120, 120, 120)
    pdf.cell(0, 6, f"Summary Mode: {mode_label}")
    pdf.ln(10)

    # ── Summary ───────────────────────────────────────────────────────────
    _divider(pdf)
    pdf.ln(5)
    _section(pdf, "Summary")
    pdf.set_font("Helvetica", "", 11)
    pdf.set_text_color(40, 40, 40)
    summary_text = (data.summary or "").strip() or "(No summary provided)"
    pdf.multi_cell(0, 7, summary_text, new_x="LMARGIN", new_y="NEXT")
    pdf.ln(8)

    # ── Key Points ────────────────────────────────────────────────────────
    key_points = data.key_points or []
    if key_points:
        _divider(pdf)
        pdf.ln(5)
        _section(pdf, "Key Points")
        pdf.set_font("Helvetica", "", 11)
        pdf.set_text_color(40, 40, 40)
        for i, point in enumerate(key_points, 1):
            point_text = str(point).strip()
            if point_text:
                pdf.cell(10, 7, f"{i}.", align="R")
                pdf.multi_cell(0, 7, f"  {point_text}", new_x="LMARGIN", new_y="NEXT")
        pdf.ln(8)

    # ── Keywords ──────────────────────────────────────────────────────────
    keywords = data.keywords or []
    if keywords:
        _divider(pdf)
        pdf.ln(5)
        _section(pdf, "Keywords")
        pdf.set_font("Helvetica", "", 11)
        pdf.set_text_color(79, 70, 229)
        keyword_str = "   |   ".join(str(k).strip() for k in keywords if str(k).strip())
        if keyword_str:
            pdf.multi_cell(0, 7, keyword_str, new_x="LMARGIN", new_y="NEXT")
        pdf.ln(8)

    # ── Flashcards ────────────────────────────────────────────────────────
    flashcards = data.flashcards or []
    if flashcards:
        _divider(pdf)
        pdf.ln(5)
        _section(pdf, "Flashcards")

        for i, card in enumerate(flashcards, 1):
            # Support both Pydantic model instances and plain dicts
            if hasattr(card, "question"):
                question = str(card.question or "").strip()
                answer = str(card.answer or "").strip()
            elif isinstance(card, dict):
                question = str(card.get("question", "")).strip()
                answer = str(card.get("answer", "")).strip()
            else:
                continue

            pdf.set_font("Helvetica", "B", 10)
            pdf.set_text_color(79, 70, 229)
            pdf.cell(0, 6, f"Card {i}")
            pdf.ln(6)

            pdf.set_font("Helvetica", "B", 10)
            pdf.set_text_color(30, 30, 30)
            pdf.cell(14, 6, "Q:", align="R")
            pdf.set_font("Helvetica", "", 10)
            pdf.multi_cell(0, 6, question or "(empty)", new_x="LMARGIN", new_y="NEXT")

            pdf.set_font("Helvetica", "B", 10)
            pdf.set_text_color(79, 70, 229)
            pdf.cell(14, 6, "A:", align="R")
            pdf.set_font("Helvetica", "", 10)
            pdf.set_text_color(40, 40, 40)
            pdf.multi_cell(0, 6, answer or "(empty)", new_x="LMARGIN", new_y="NEXT")
            pdf.ln(3)

    # ── Finalise ──────────────────────────────────────────────────────────
    pdf_output = pdf.output()

    # fpdf2 returns bytearray; convert to bytes for StreamingResponse
    if isinstance(pdf_output, (bytearray, memoryview)):
        pdf_bytes = bytes(pdf_output)
    elif isinstance(pdf_output, str):
        pdf_bytes = pdf_output.encode("latin-1")
    else:
        pdf_bytes = pdf_output  # already bytes

    logger.info("PDF generation succeeded, size=%d bytes", len(pdf_bytes))
    print(f"[PDF GENERATION SUCCESS] - {len(pdf_bytes)} bytes")

    return pdf_bytes


def _section(pdf: FPDF, title: str):
    pdf.set_font("Helvetica", "B", 13)
    pdf.set_text_color(30, 30, 30)
    pdf.cell(0, 8, title)
    pdf.ln(10)


def _divider(pdf: FPDF):
    pdf.set_draw_color(210, 210, 210)
    pdf.set_line_width(0.3)
    pdf.line(10, pdf.get_y(), 200, pdf.get_y())
