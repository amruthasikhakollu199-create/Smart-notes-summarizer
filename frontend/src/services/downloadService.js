import api from "./api";

export async function downloadSummaryPdf(summaryData, title = "Study Notes Summary") {
  const payload = {
    title,
    summary: summaryData.summary,
    key_points: summaryData.key_points,
    keywords: summaryData.keywords,
    flashcards: summaryData.flashcards,
    mode: summaryData.mode,
  };

  const response = await api.post("/download-pdf", payload, {
    responseType: "blob",
  });

  // Trigger browser file download
  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "study-notes-summary.pdf");
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(url);
}
