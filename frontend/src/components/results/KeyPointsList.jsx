import React from "react";

export default function KeyPointsList({ keyPoints }) {
  if (!keyPoints?.length) return null;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="flex items-center gap-2 px-5 py-3.5 border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/80">
        <span className="text-base">📌</span>
        <h3 className="font-semibold text-gray-900 dark:text-white text-sm">Key Points</h3>
        <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-orange-100 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300">
          {keyPoints.length}
        </span>
      </div>
      <ul className="p-5 space-y-3">
        {keyPoints.map((point, i) => (
          <li key={i} className="flex items-start gap-3">
            <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center mt-0.5">
              <span className="text-xs font-bold text-primary-600 dark:text-primary-400">{i + 1}</span>
            </div>
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{point}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
