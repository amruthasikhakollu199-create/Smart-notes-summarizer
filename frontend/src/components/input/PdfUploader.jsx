import React, { useState, useRef } from "react";
import { extractPdf } from "../../services/summaryService";
import { formatFileSize } from "../../utils/formatters";
import { MAX_PDF_SIZE_BYTES, MAX_PDF_SIZE_MB } from "../../utils/constants";
import Spinner from "../ui/Spinner";

export default function PdfUploader({ onTextExtracted }) {
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [fileInfo, setFileInfo] = useState(null);
  const [error, setError] = useState(null);
  const inputRef = useRef(null);

  const handleFile = async (file) => {
    setError(null);
    if (!file.name.toLowerCase().endsWith(".pdf")) {
      setError("Only PDF files are supported.");
      return;
    }
    if (file.size > MAX_PDF_SIZE_BYTES) {
      setError(`File too large. Maximum size is ${MAX_PDF_SIZE_MB}MB.`);
      return;
    }
    setIsLoading(true);
    setFileInfo({ name: file.name, size: file.size });
    try {
      const result = await extractPdf(file);
      onTextExtracted(result.text, result.page_count);
    } catch (err) {
      setError(err.response?.data?.detail || "Failed to extract PDF text. Please try another file.");
      setFileInfo(null);
    } finally {
      setIsLoading(false);
    }
  };

  const onDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  return (
    <div className="flex flex-col gap-3">
      <div
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={onDrop}
        onClick={() => inputRef.current?.click()}
        className={`flex flex-col items-center justify-center gap-4 min-h-[220px] p-8 rounded-xl border-2 border-dashed cursor-pointer transition-all duration-200 ${
          isDragging
            ? "border-primary-500 bg-primary-50 dark:bg-primary-900/10 scale-[1.01]"
            : "border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 hover:border-primary-400 dark:hover:border-primary-600 hover:bg-gray-50 dark:hover:bg-gray-750"
        }`}
      >
        <input ref={inputRef} type="file" accept=".pdf" className="hidden" onChange={(e) => { const f = e.target.files[0]; if (f) handleFile(f); }} />

        {isLoading ? (
          <div className="flex flex-col items-center gap-3">
            <Spinner size="lg" className="text-primary-500" />
            <p className="text-sm text-gray-500 dark:text-gray-400">Extracting text from PDF...</p>
          </div>
        ) : fileInfo ? (
          <div className="flex flex-col items-center gap-2 text-center">
            <span className="text-4xl">✅</span>
            <p className="font-semibold text-gray-900 dark:text-white text-sm">{fileInfo.name}</p>
            <p className="text-xs text-gray-500">{formatFileSize(fileInfo.size)}</p>
            <p className="text-xs text-green-600 dark:text-green-400 mt-1">Text extracted! Switch to Paste Notes tab to see it.</p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3 text-center pointer-events-none">
            <span className="text-5xl">📄</span>
            <div>
              <p className="text-base font-medium text-gray-700 dark:text-gray-200">
                Drop your PDF here, or <span className="text-primary-600 dark:text-primary-400 underline">browse</span>
              </p>
              <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">PDF files only · max {MAX_PDF_SIZE_MB}MB</p>
            </div>
          </div>
        )}
      </div>

      {error && (
        <div className="flex items-start gap-2 p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
          <span className="text-red-500 flex-shrink-0">⚠️</span>
          <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
        </div>
      )}
    </div>
  );
}
