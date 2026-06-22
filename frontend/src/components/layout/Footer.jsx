import React from "react";

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xl">🧠</span>
            <span className="text-gray-600 dark:text-gray-400 text-sm">
              Smart Notes AI — Powered by Groq
            </span>
          </div>
          <p className="text-gray-400 dark:text-gray-500 text-sm">
            College Portfolio Project · Built with React &amp; FastAPI
          </p>
        </div>
      </div>
    </footer>
  );
}
