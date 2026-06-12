import React from "react";
import { useClipboard } from "../../hooks/useClipboard";

export default function SummaryOutput({ summary, mode, wordCount }) {
  const { copied, copy } = useClipboard();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/80">
        <div className="flex items-center gap-2">
          <span className="text-base">📝</span>
          <h3 className="font-semibold text-gray-900 dark:text-white text-sm">Summary</h3>
          <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 capitalize">
            {mode}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-gray-400">{wordCount} words</span>
          <button
            onClick={() => copy(summary)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
              copied
                ? "bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400"
                : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
            }`}
          >
            {copied ? "✓ Copied!" : "📋 Copy"}
          </button>
        </div>
      </div>
      {/* Content */}
      <div className="p-5">
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm whitespace-pre-line">
          {summary}
        </p>
      </div>
    </div>
  );
}
