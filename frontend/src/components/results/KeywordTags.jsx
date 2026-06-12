import React from "react";
import { useClipboard } from "../../hooks/useClipboard";

const TAG_COLORS = [
  "bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 hover:bg-purple-200 dark:hover:bg-purple-900/40",
  "bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-900/40",
  "bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300 hover:bg-green-200 dark:hover:bg-green-900/40",
  "bg-orange-100 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300 hover:bg-orange-200 dark:hover:bg-orange-900/40",
  "bg-pink-100 dark:bg-pink-900/20 text-pink-700 dark:text-pink-300 hover:bg-pink-200 dark:hover:bg-pink-900/40",
  "bg-cyan-100 dark:bg-cyan-900/20 text-cyan-700 dark:text-cyan-300 hover:bg-cyan-200 dark:hover:bg-cyan-900/40",
  "bg-indigo-100 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-200 dark:hover:bg-indigo-900/40",
];

export default function KeywordTags({ keywords }) {
  const { copy } = useClipboard();

  if (!keywords?.length) return null;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="flex items-center gap-2 px-5 py-3.5 border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/80">
        <span className="text-base">🏷️</span>
        <h3 className="font-semibold text-gray-900 dark:text-white text-sm">Keywords</h3>
        <span className="text-xs text-gray-400">(click to copy)</span>
      </div>
      <div className="p-5 flex flex-wrap gap-2">
        {keywords.map((kw, i) => (
          <button
            key={i}
            onClick={() => copy(kw)}
            title={`Copy "${kw}"`}
            className={`px-3 py-1.5 rounded-full text-sm font-medium cursor-pointer transition-all duration-150 active:scale-95 ${TAG_COLORS[i % TAG_COLORS.length]}`}
          >
            {kw}
          </button>
        ))}
      </div>
    </div>
  );
}
