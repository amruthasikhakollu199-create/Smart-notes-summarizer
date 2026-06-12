import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "/api",
  timeout: 90000, // 90s — Gemini AI calls can take a while
  headers: { "Content-Type": "application/json" },
});

export default api;
