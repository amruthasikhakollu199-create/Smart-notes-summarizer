import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "/api",
  timeout: 180000, // 3 minutes — Render free tier cold start can take up to 90s + AI response time
  headers: { "Content-Type": "application/json" },
});

export default api;
