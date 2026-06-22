import React from "react";
import { Link } from "react-router-dom";

const FEATURES = [
  {
    icon: "📝",
    title: "Paste Notes",
    desc: "Type or paste any text — lecture notes, articles, or study material.",
  },
  {
    icon: "📄",
    title: "Upload PDF",
    desc: "Upload a PDF and extract its text automatically for instant summarization.",
  },
  {
    icon: "⚡",
    title: "3 Summary Modes",
    desc: "Choose Short, Medium, or Detailed summaries based on how much depth you need.",
  },
  {
    icon: "📌",
    title: "Key Points",
    desc: "Get the most important takeaways extracted into a clean numbered list.",
  },
  {
    icon: "🏷️",
    title: "Keywords",
    desc: "Identify core concepts and terms at a glance. Click any keyword to copy it.",
  },
  {
    icon: "🃏",
    title: "Flashcards",
    desc: "Auto-generated Q&A flashcards for active recall — flip to reveal the answer.",
  },
];

const STEPS = [
  { icon: "📥", step: 1, title: "Add Your Content", desc: "Paste text or upload a PDF file." },
  { icon: "⚙️", step: 2, title: "Pick a Mode", desc: "Choose how detailed you want the summary." },
  { icon: "✨", step: 3, title: "Study Smarter", desc: "Get your summary, key points, keywords & flashcards instantly." },
];

export default function HomePage() {
  return (
    <div>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative px-4 pt-20 pb-24 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 -z-10" />
        <div className="absolute -top-32 right-0 w-96 h-96 bg-primary-200/40 dark:bg-primary-900/20 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 -left-16 w-72 h-72 bg-purple-200/40 dark:bg-purple-900/20 rounded-full blur-3xl -z-10" />

        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-sm font-medium mb-8 border border-primary-200 dark:border-primary-800">
            <span>✨</span>
            <span>Powered by Llama 3.3 / Groq</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight mb-6 tracking-tight">
            Turn Notes Into
            <span className="block bg-gradient-to-r from-primary-600 to-purple-600 dark:from-primary-400 dark:to-purple-400 bg-clip-text text-transparent">
              Smart Study Material
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl mx-auto mb-10">
            Paste your notes or upload a PDF and get AI-powered summaries, key points,
            keywords, and flashcards — all in one click.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/summarizer"
              id="cta-start-btn"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-primary-600 hover:bg-primary-700 text-white font-semibold text-lg transition-all duration-200 shadow-lg shadow-primary-600/30 hover:-translate-y-0.5 hover:shadow-xl"
            >
              ✨ Start Summarizing
            </Link>
            <a
              href="#features"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200"
            >
              See Features ↓
            </a>
          </div>
        </div>
      </section>

      {/* ── Features ─────────────────────────────────────────────────────── */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Everything You Need to Study Smarter
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-lg max-w-xl mx-auto">
              One tool. No sign-up required. Completely free.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map((f, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-800 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <div className="text-4xl mb-4">{f.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{f.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ─────────────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary-50/50 to-purple-50/50 dark:from-gray-900 dark:to-gray-950">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              How It Works
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-lg">Ready in 3 simple steps</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {STEPS.map((s, i) => (
              <div key={i} className="flex flex-col items-center text-center">
                <div className="relative w-16 h-16 rounded-2xl bg-white dark:bg-gray-800 shadow-md flex items-center justify-center text-3xl mb-5 border border-gray-100 dark:border-gray-700">
                  {s.icon}
                  <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary-600 text-white text-xs font-bold flex items-center justify-center">
                    {s.step}
                  </div>
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{s.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/summarizer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-primary-600 hover:bg-primary-700 text-white font-semibold text-lg transition-all duration-200 shadow-lg shadow-primary-600/30 hover:-translate-y-0.5"
            >
              Try It Now — Free ✨
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
