import React, { useState } from 'react';
import { Zap, BookOpen, Search } from 'lucide-react';

const difficultyColors = {
  Easy: 'bg-green-500/15 text-green-300 border-green-400/30 shadow-[0_0_15px_rgba(34,197,94,0.3)]',
  Medium: 'bg-yellow-500/15 text-yellow-300 border-yellow-400/30 shadow-[0_0_15px_rgba(234,179,8,0.3)]',
  Hard: 'bg-red-500/15 text-red-300 border-red-400/30 shadow-[0_0_15px_rgba(239,68,68,0.3)]',
};

export function SimilarQuestionsView({ question, isLoading, onSelectSimilar, onSearch }) {
  const [query, setQuery] = useState("");

  const handleSearchClick = () => {
    const trimmed = query.trim();
    if (!trimmed) return;
    onSearch(trimmed);
  };

  return (
    <div className="space-y-8">

      {/* 🔍 SEARCH BAR SECTION */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-950/80 p-6 md:p-7 wrap-break-word">
        <label className="text-xs md:text-sm tracking-[0.18em] text-zinc-400 font-medium uppercase">
          Problem Name / LeetCode URL
        </label>

        {/* Input + Button */}
        <div className="mt-4 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g., https://leetcode.com/problems/two-sum/ or two-sum"
              disabled={isLoading}
              className="w-full h-11 pl-10 pr-3.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-600/60 disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>

          <button
            type="button"
            onClick={handleSearchClick}
            disabled={isLoading}
            className="px-6 h-11 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-500 focus:ring-2 focus:ring-blue-600/60 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Searching…" : "Find Similar"}
          </button>
        </div>

        {/* Quick examples */}
        <div className="mt-5 flex items-center flex-wrap gap-2 text-xs md:text-sm text-zinc-400">
          <span>Try a quick example:</span>

          {["two-sum", "3sum", "4sum", "valid-parentheses", "longest-substring"].map((x) => (
            <button
              key={x}
              onClick={() => {
                setQuery(x);
                if (!isLoading) {
                  onSearch(x);
                }
              }}
              className="px-3 py-1.5 rounded-full bg-zinc-900 border border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-zinc-50 transition-colors"
            >
              {x}
            </button>
          ))}
        </div>
      </div>

  
      {isLoading && (
        <div className="flex justify-center items-center py-16">
          <div className="h-10 w-10 border-2 border-zinc-700 border-t-blue-500 rounded-full animate-spin" />
        </div>
      )}

      {!isLoading && question && (
        <>
          {/* Question Header */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-950/80 p-6 md:p-7 wrap-break-word">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-5">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 rounded-full bg-zinc-900 border border-zinc-700 px-3 py-1 text-[11px] tracking-[0.2em] text-zinc-400 uppercase">
                  LEETCODE PROBLEM
                </div>

                <h1 className="text-2xl md:text-3xl font-semibold text-zinc-50">
                  {question.title}
                </h1>

                <p className="text-xs md:text-sm text-zinc-400">
                  Problem Slug:
                  <span className="ml-2 rounded-full bg-zinc-900/60 px-2 py-0.5 text-[11px] font-mono border border-zinc-700/60 text-zinc-300 shadow-inner">
                    {question.slug}
                  </span>
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="rounded-full bg-zinc-900 px-3 py-1.5 text-xs text-zinc-300 border border-zinc-700">
                  {question.similar?.length || 0} Similar
                </span>

                <span
                  className={`px-4 py-1.5 rounded-full border text-xs font-semibold tracking-wide flex items-center gap-2 ${difficultyColors[question.difficulty]}`}
                >
                  <Zap size={16} />
                  {question.difficulty}
                </span>
              </div>
            </div>
          </div>

          {/* Similar Questions */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-950/80 p-6 md:p-7 wrap-break-word">
            <div className="flex items-center gap-3 mb-5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-900 border border-zinc-700 text-yellow-300">
                <Zap size={18} />
              </div>

              <div className="flex-1">
                <h2 className="text-lg md:text-xl font-semibold text-zinc-50">Similar Questions</h2>
                <p className="text-xs md:text-sm text-zinc-400">Click a question to open related problems.</p>
              </div>
            </div>

            {question.similar?.length > 0 ? (
              <div className="grid gap-3">
                {question.similar.map((similar, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => onSelectSimilar(similar.slug)}
                    className="group w-full flex items-start gap-4 p-4 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-blue-500/60 hover:bg-zinc-800 transition-colors"
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg text-white text-sm font-semibold bg-blue-600 group-hover:bg-blue-500 transition-colors">
                      {idx + 1}
                    </div>

                    <div className="flex-1 min-w-0 space-y-1">
                      <p className="truncate text-sm md:text-base font-medium text-zinc-50 group-hover:text-blue-300 transition-colors">
                        {similar.title}
                      </p>
                      <p className="text-[11px] text-zinc-500 font-mono truncate">{similar.slug}</p>
                    </div>

                    <div className="flex flex-col items-end gap-2">
                      <span
                        className={`px-3 py-1 rounded-full text-[11px] font-semibold border ${difficultyColors[similar.difficulty]}`}
                      >
                        {similar.difficulty}
                      </span>

                      <span className="hidden md:inline-flex items-center gap-1 text-[11px] text-zinc-400">
                        <BookOpen size={14} /> View Graph
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center py-12 text-zinc-400">
                <BookOpen size={40} className="opacity-40 mb-3" />
                No similar questions found.
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default SimilarQuestionsView;
