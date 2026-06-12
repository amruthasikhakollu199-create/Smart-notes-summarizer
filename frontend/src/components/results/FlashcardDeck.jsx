import React, { useState } from "react";
import FlashcardItem from "./FlashcardItem";

export default function FlashcardDeck({ flashcards }) {
  const [idx, setIdx] = useState(0);

  if (!flashcards?.length) return null;

  const prev = () => setIdx((i) => (i - 1 + flashcards.length) % flashcards.length);
  const next = () => setIdx((i) => (i + 1) % flashcards.length);
  const card = flashcards[idx];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/80">
        <div className="flex items-center gap-2">
          <span className="text-base">🃏</span>
          <h3 className="font-semibold text-gray-900 dark:text-white text-sm">Flashcards</h3>
        </div>
        <span className="text-sm font-mono text-gray-500 dark:text-gray-400">
          {idx + 1} / {flashcards.length}
        </span>
      </div>

      <div className="p-5">
        {/* key prop resets flip state on navigation */}
        <FlashcardItem key={idx} question={card.question} answer={card.answer} />

        {/* Navigation */}
        <div className="flex items-center justify-between mt-4">
          <button
            onClick={prev}
            className="px-4 py-2 rounded-xl text-sm font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            ← Prev
          </button>

          {/* Dot indicators */}
          <div className="flex gap-1.5 flex-wrap justify-center max-w-[200px]">
            {flashcards.map((_, i) => (
              <button
                key={i}
                onClick={() => setIdx(i)}
                className={`h-2 rounded-full transition-all duration-200 ${
                  i === idx
                    ? "w-4 bg-primary-500"
                    : "w-2 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="px-4 py-2 rounded-xl text-sm font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
}
