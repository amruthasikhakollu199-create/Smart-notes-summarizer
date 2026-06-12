import React, { useState } from "react";
import { downloadSummaryPdf } from "../../services/downloadService";
import Spinner from "../ui/Spinner";

export default function DownloadPdfButton({ summaryData, title }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleDownload = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await downloadSummaryPdf(summaryData, title || "Study Notes Summary");
    } catch {
      setError("Download failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-end gap-1">
      <button
        onClick={handleDownload}
        disabled={isLoading}
        className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium bg-primary-600 hover:bg-primary-700 active:bg-primary-800 text-white shadow-sm transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <><Spinner size="sm" /> Generating...</>
        ) : (
          <>⬇️ Download PDF</>
        )}
      </button>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
