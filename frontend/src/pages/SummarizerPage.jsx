import React, { useState } from "react";
import { useSummarizer } from "../hooks/useSummarizer";
import InputTabs from "../components/input/InputTabs";
import NotesPasteInput from "../components/input/NotesPasteInput";
import PdfUploader from "../components/input/PdfUploader";
import SummaryModeSelector from "../components/input/SummaryModeSelector";
import SummaryOutput from "../components/results/SummaryOutput";
import KeyPointsList from "../components/results/KeyPointsList";
import KeywordTags from "../components/results/KeywordTags";
import FlashcardDeck from "../components/results/FlashcardDeck";
import DownloadPdfButton from "../components/actions/DownloadPdfButton";
import Button from "../components/ui/Button";
import Spinner from "../components/ui/Spinner";

export default function SummarizerPage() {
  const [activeTab, setActiveTab] = useState("text");
  const [text, setText] = useState("");
  const [noteTitle, setNoteTitle] = useState("");

  const { result, isLoading, error, mode, setMode, run, reset } = useSummarizer();

  const handlePdfExtracted = (extractedText) => {
    setText(extractedText);
    setActiveTab("text"); // switch so user sees extracted content
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === "pdf") setText("");
  };

  const handleReset = () => {
    reset();
    setText("");
    setNoteTitle("");
    setActiveTab("text");
  };

  const hasEnoughText = text.trim().length >= 50;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page header */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-1">
          🧠 Smart Notes Summarizer
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          Paste your notes or upload a PDF — get instant AI-powered study material.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* ── LEFT: Input Panel ──────────────────────────────────────────── */}
        <div className="flex flex-col gap-5 lg:sticky lg:top-24">
          {/* Optional title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Note Title <span className="text-gray-400 font-normal">(optional)</span>
            </label>
            <input
              type="text"
              value={noteTitle}
              onChange={(e) => setNoteTitle(e.target.value)}
              placeholder="e.g. Biology Ch.5 — Photosynthesis"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-600 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
            />
          </div>

          {/* Input tabs */}
          <div>
            <InputTabs activeTab={activeTab} onChange={handleTabChange} />
            {activeTab === "text" ? (
              <NotesPasteInput value={text} onChange={setText} />
            ) : (
              <PdfUploader onTextExtracted={handlePdfExtracted} />
            )}
          </div>

          {/* Summary mode selector */}
          <SummaryModeSelector mode={mode} onChange={setMode} />

          {/* Error message */}
          {error && (
            <div className="flex items-start gap-3 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
              <span className="text-xl flex-shrink-0">⚠️</span>
              <div>
                <p className="text-sm font-semibold text-red-700 dark:text-red-400">Error</p>
                <p className="text-sm text-red-600 dark:text-red-300 mt-0.5">{error}</p>
              </div>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex gap-3">
            <Button
              onClick={() => run(text)}
              isLoading={isLoading}
              disabled={!hasEnoughText || isLoading}
              size="lg"
              className="flex-1"
            >
              {isLoading ? "Summarizing..." : "✨ Summarize Notes"}
            </Button>
            {(result || text) && (
              <Button variant="secondary" size="lg" onClick={handleReset}>
                Reset
              </Button>
            )}
          </div>

          {/* Loading hint */}
          {isLoading && (
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <Spinner size="sm" className="text-primary-500" />
              <span>Gemini AI is thinking... this may take 15–30 seconds.</span>
            </div>
          )}
        </div>

        {/* ── RIGHT: Results Panel ───────────────────────────────────────── */}
        <div className="flex flex-col gap-5">
          {/* Empty state */}
          {!result && !isLoading && (
            <div className="flex flex-col items-center justify-center min-h-[420px] rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-700 p-8 text-center">
              <span className="text-6xl mb-4">🎯</span>
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Your Results Will Appear Here
              </h3>
              <p className="text-gray-400 dark:text-gray-500 text-sm max-w-xs">
                Add notes on the left and click{" "}
                <span className="font-medium text-gray-500 dark:text-gray-400">Summarize Notes</span>{" "}
                to generate your AI study material.
              </p>
            </div>
          )}

          {/* Loading state */}
          {isLoading && (
            <div className="flex flex-col items-center justify-center min-h-[420px] rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 gap-4">
              <Spinner size="lg" className="text-primary-500" />
              <div className="text-center">
                <p className="text-base font-semibold text-gray-700 dark:text-gray-300">
                  Generating Study Material
                </p>
                <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
                  Gemini AI is analyzing your notes...
                </p>
              </div>
            </div>
          )}

          {/* Results */}
          {result && !isLoading && (
            <div className="flex flex-col gap-5 animate-fade-in">
              <SummaryOutput
                summary={result.summary}
                mode={result.mode}
                wordCount={result.word_count}
              />
              <KeyPointsList keyPoints={result.key_points} />
              <KeywordTags keywords={result.keywords} />
              <FlashcardDeck flashcards={result.flashcards} />

              {/* Download */}
              <div className="flex justify-end pt-2 pb-4">
                <DownloadPdfButton
                  summaryData={result}
                  title={noteTitle || "Study Notes Summary"}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
