import React from "react";

const MIN_CHARS = 50;

export default function NotesPasteInput({ value, onChange }) {
  const len = value.length;
  const isTooShort = len > 0 && len < MIN_CHARS;
  const isReady = len >= MIN_CHARS;

  return (
    <div className="flex flex-col gap-2">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={`Paste your notes, article, or any text here...\n\nMinimum ${MIN_CHARS} characters required.`}
        rows={12}
        className={`w-full p-4 rounded-xl border text-sm resize-none leading-relaxed bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200 ${
          isTooShort ? "border-amber-300 dark:border-amber-700" : "border-gray-200 dark:border-gray-700"
        }`}
      />
      <div className="flex items-center justify-between text-xs">
        {isTooShort ? (
          <span className="text-amber-500 dark:text-amber-400">Need {MIN_CHARS - len} more characters</span>
        ) : isReady ? (
          <span className="text-green-500 dark:text-green-400">✓ Ready to summarize</span>
        ) : (
          <span className="text-gray-400">Minimum {MIN_CHARS} characters</span>
        )}
        <span className="font-mono text-gray-400">{len.toLocaleString()} chars</span>
      </div>
      {value && (
        <button onClick={() => onChange("")} className="self-end text-xs text-gray-400 hover:text-red-500 transition-colors">
          Clear ✕
        </button>
      )}
    </div>
  );
}
