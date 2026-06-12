import { useState } from "react";
import { summarizeText } from "../services/summaryService";

export function useSummarizer() {
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [mode, setMode] = useState("medium");

  const run = async (text) => {
    if (!text?.trim()) {
      setError("Please enter some text or upload a PDF first.");
      return;
    }
    if (text.trim().length < 50) {
      setError("Text is too short. Please provide at least 50 characters.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await summarizeText(text, mode);
      setResult(data);
    } catch (err) {
      const message =
        err.response?.data?.detail ||
        err.message ||
        "Something went wrong. Please try again.";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
    setResult(null);
    setError(null);
  };

  return { result, isLoading, error, mode, setMode, run, reset };
}
