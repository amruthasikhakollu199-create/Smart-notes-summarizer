import React from "react";
import { SUMMARY_MODES } from "../../utils/constants";

export default function SummaryModeSelector({ mode, onChange }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Summary Length</label>
      <div className="grid grid-cols-3 gap-2">
        {SUMMARY_MODES.map((m) => (
          <button
            key={m.id}
            onClick={() => onChange(m.id)}
            className={`flex flex-col items-center gap-1 p-3 rounded-xl border text-center transition-all duration-200 ${
              mode === m.id
                ? "border-primary-500 bg-primary-50 dark:bg-primary-900/20 shadow-sm"
                : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-primary-300 dark:hover:border-primary-700"
            }`}
          >
            <span className="text-xl">{m.icon}</span>
            <span className={`text-sm font-semibold ${mode === m.id ? "text-primary-700 dark:text-primary-300" : "text-gray-700 dark:text-gray-200"}`}>
              {m.label}
            </span>
            <span className="text-xs text-gray-400 dark:text-gray-500">{m.description}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
