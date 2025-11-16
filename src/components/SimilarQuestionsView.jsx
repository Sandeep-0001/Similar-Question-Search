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
    <div className="space-y-10 animate-fade-in">

      {/* 🔍 SEARCH BAR SECTION */}
      <div className="relative bg-zinc-950/60 backdrop-blur-2xl rounded-3xl p-8 pb-10 border border-zinc-800 shadow-[0_25px_70px_rgba(0,0,0,0.45)] overflow-hidden wrap-break-word">
        {/* Glow */}
        <div className="absolute -top-10 -left-10 h-40 w-40 bg-blue-500/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-14 -right-14 h-44 w-44 bg-purple-500/20 rounded-full blur-3xl" />

        <label className="text-sm tracking-widest text-zinc-400 font-medium">
          PROBLEM NAME / LEETCODE URL
        </label>

        {/* Input + Button */}
        <div className="mt-4 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g., https://leetcode.com/problems/two-sum/ or two-sum"
              disabled={isLoading}
              className="w-full h-12 pl-12 pr-4 rounded-xl bg-zinc-900/80 border border-zinc-700 text-zinc-200 placeholder:text-zinc-500 shadow-inner focus:ring-2 focus:ring-blue-500/40 disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>

          <button
            type="button"
            onClick={handleSearchClick}
            disabled={isLoading}
            className="px-6 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-medium shadow-[0_0_20px_rgba(59,130,246,0.6)] hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Searching…" : "Find Similar"}
          </button>
        </div>

        {/* Quick examples */}
        <div className="mt-6 flex items-center flex-wrap gap-3 text-sm text-zinc-400">
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
              className="px-4 py-1.5 rounded-full bg-zinc-900/70 border border-zinc-700 text-zinc-300 hover:border-blue-500/50 hover:text-blue-300 transition-all"
            >
              {x}
            </button>
          ))}
        </div>
      </div>

  
      {isLoading && (
        <div className="flex justify-center items-center py-20">
          <div className="relative flex h-14 w-14 items-center justify-center">
            <div className="absolute h-14 w-14 rounded-full border-2 border-zinc-700 border-t-blue-500 animate-spin drop-shadow-[0_0_12px_rgba(59,130,246,0.7)]" />
            <div className="h-7 w-7 rounded-full bg-blue-500/25 animate-pulse" />
          </div>
        </div>
      )}

      {!isLoading && question && (
        <>
          {/* Question Header */}
          <div className="relative bg-zinc-950/60 backdrop-blur-2xl rounded-3xl p-8 border border-zinc-800 shadow-[0_25px_70px_rgba(0,0,0,0.45)] overflow-hidden wrap-break-word">
            <div className="absolute -top-10 -left-10 h-40 w-40 bg-blue-500/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-14 -right-14 h-44 w-44 bg-purple-500/20 rounded-full blur-3xl" />

            <div className="relative flex flex-col md:flex-row md:items-start md:justify-between gap-5">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 rounded-full bg-zinc-900/70 border border-zinc-700 px-4 py-1 text-[11px] tracking-widest text-zinc-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  LEETCODE PROBLEM
                </div>

                <h1 className="text-3xl md:text-4xl font-bold text-white drop-shadow">
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
                <span className="rounded-full bg-zinc-900/70 px-4 py-1.5 text-xs text-zinc-300 border border-zinc-700">
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
          <div className="relative bg-zinc-950/60 backdrop-blur-2xl rounded-3xl p-8 border border-zinc-800 shadow-[0_25px_70px_rgba(0,0,0,0.45)] overflow-hidden wrap-break-word">
            <div className="flex items-center gap-4 mb-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border border-yellow-500/40 text-yellow-300 shadow-[0_0_15px_rgba(234,179,8,0.3)]">
                <Zap size={22} />
              </div>

              <div className="flex-1">
                <h2 className="text-2xl font-semibold text-white">Similar Questions</h2>
                <p className="text-xs md:text-sm text-zinc-400">Click to explore more related problems.</p>
              </div>
            </div>

            {question.similar?.length > 0 ? (
              <div className="grid gap-3">
                {question.similar.map((similar, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => onSelectSimilar(similar.slug)}
                    className="group w-full flex items-start gap-5 p-5 rounded-2xl bg-zinc-900/70 border border-zinc-800 hover:border-blue-500/50 hover:bg-zinc-800/80 transition-all"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl text-white font-semibold bg-gradient-to-br from-blue-500/80 to-indigo-500/80 shadow-[0_0_30px_rgba(59,130,246,0.6)] group-hover:scale-110 transition-transform">
                      {idx + 1}
                    </div>

                    <div className="flex-1 min-w-0 space-y-1">
                      <p className="truncate text-base font-medium text-white group-hover:text-blue-300 transition-colors">
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
              <div className="flex flex-col items-center py-14 text-zinc-400">
                <BookOpen size={48} className="opacity-40 mb-4" />
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
