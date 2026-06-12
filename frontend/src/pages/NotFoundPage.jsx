import React from "react";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-16">
      <span className="text-8xl mb-6">🔍</span>
      <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
        Page Not Found
      </h1>
      <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-sm text-lg">
        The page you're looking for doesn't exist. Head back home!
      </p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-semibold transition-colors shadow-lg"
      >
        ← Back to Home
      </Link>
    </div>
  );
}
