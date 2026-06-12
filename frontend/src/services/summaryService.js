import api from "./api";

export async function summarizeText(text, mode = "medium") {
  const response = await api.post("/summarize", { text, mode });
  return response.data;
}

export async function extractPdf(file) {
  const formData = new FormData();
  formData.append("file", file);
  const response = await api.post("/extract-pdf", formData, {
    headers: { "Content-Type": "multipart/form-data" },
    timeout: 30000,
  });
  return response.data;
}
