import React, { useState } from "react";

export default function FlashcardItem({ question, answer }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="flashcard-container w-full"
      style={{ height: "200px" }}
      onClick={() => setFlipped((f) => !f)}
    >
      <div className={`flashcard-inner w-full h-full cursor-pointer ${flipped ? "flipped" : ""}`}>
        {/* Front — Question */}
        <div className="flashcard-face bg-gradient-to-br from-primary-500 to-primary-700 text-white shadow-lg">
          <p className="absolute top-3 left-0 right-0 text-center text-xs font-semibold uppercase tracking-widest opacity-60">
            Question
          </p>
          <p className="text-sm sm:text-base font-medium leading-relaxed px-2">{question}</p>
          <p className="absolute bottom-3 left-0 right-0 text-center text-xs opacity-50">
            Tap to reveal answer
          </p>
        </div>

        {/* Back — Answer */}
        <div className="flashcard-face flashcard-back bg-gradient-to-br from-gray-50 to-white dark:from-gray-700 dark:to-gray-800 border border-gray-200 dark:border-gray-600 shadow-lg">
          <p className="absolute top-3 left-0 right-0 text-center text-xs font-semibold uppercase tracking-widest text-primary-500 dark:text-primary-400">
            Answer
          </p>
          <p className="text-sm sm:text-base text-gray-800 dark:text-gray-100 leading-relaxed px-2">
            {answer}
          </p>
          <p className="absolute bottom-3 left-0 right-0 text-center text-xs text-gray-400 dark:text-gray-500">
            Tap to flip back
          </p>
        </div>
      </div>
    </div>
  );
}
