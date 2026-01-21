import React, { useState } from 'react';
import { Zap, BookOpen, Search, Sparkles, TrendingUp, Target, ArrowRight } from 'lucide-react';

const difficultyColors = {
  Easy: 'bg-gradient-to-r from-emerald-500/20 to-green-500/20 text-emerald-300 border-emerald-400/30 shadow-[0_0_20px_rgba(16,185,129,0.3)]',
  Medium: 'bg-gradient-to-r from-amber-500/20 to-yellow-500/20 text-amber-300 border-amber-400/30 shadow-[0_0_20px_rgba(245,158,11,0.3)]',
  Hard: 'bg-gradient-to-r from-red-500/20 to-rose-500/20 text-red-300 border-red-400/30 shadow-[0_0_20px_rgba(239,68,68,0.3)]',
};

export function SimilarQuestionsView({ question, isLoading, onSelectSimilar, onSearch }) {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleSearchClick = () => {
    const trimmed = query.trim();
    if (!trimmed) return;
    onSearch(trimmed);
  };

  return (
    <div className="space-y-6 md:space-y-8 px-4 sm:px-6">

      {/* 🔍 PREMIUM SEARCH BAR SECTION */}
      <div className="relative group">
        {/* Glow effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-2xl md:rounded-3xl blur-xl opacity-75 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        <div className="relative rounded-2xl md:rounded-3xl border border-slate-700/50 bg-gradient-to-br from-slate-900/90 via-slate-800/50 to-slate-900/90 backdrop-blur-xl p-4 sm:p-6 md:p-8 lg:p-9">
          <label className="text-xs md:text-sm tracking-[0.3em] text-slate-400 font-bold uppercase">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Problem Name / LeetCode URL
            </span>
          </label>

          {/* Input + Button */}
          <div className="mt-4 flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <div className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-slate-500 group-hover:text-blue-400 transition-colors duration-300">
                <Search size={20} />
              </div>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder="e.g., https://leetcode.com/problems/two-sum/ or two-sum"
                disabled={isLoading}
                className={`w-full h-12 sm:h-14 pl-10 sm:pl-12 pr-4 sm:pr-5 rounded-xl sm:rounded-2xl border ${isFocused ? 'border-blue-500/50 bg-slate-800/50' : 'border-slate-700/50 bg-slate-900/50'} text-sm sm:text-base text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 backdrop-blur-sm`}
              />
              
              {/* Animated border gradient */}
              <div className={`absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 ${isFocused ? 'opacity-100' : ''} transition-opacity duration-300 pointer-events-none`}></div>
            </div>

            <button
              type="button"
              onClick={handleSearchClick}
              disabled={isLoading}
              className="group relative px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
            >
              <span className="relative z-10 flex items-center gap-2">
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Searching…
                  </>
                ) : (
                  <>
                    Find Similar
                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
                  </>
                )}
              </span>
              
              {/* Button glow effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300"></div>
            </button>
          </div>

          {/* Enhanced Quick examples */}
          <div className="mt-6 flex flex-col items-start sm:flex-row sm:items-center flex-wrap gap-2 sm:gap-3 text-xs sm:text-sm md:text-base text-slate-400">
            <span className="font-medium">Quick examples:</span>

            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {["two-sum", "3sum", "4sum", "valid-parentheses", "longest-substring"].map((x, index) => (
                <button
                  key={x}
                  onClick={() => {
                    setQuery(x);
                    if (!isLoading) {
                      onSearch(x);
                    }
                  }}
                  className="group relative px-2.5 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl bg-gradient-to-r from-slate-800/50 to-slate-700/50 hover:from-blue-900/50 hover:to-purple-900/50 border border-slate-600/30 hover:border-blue-500/30 text-slate-300 hover:text-slate-100 transition-all duration-300 transform hover:scale-105 hover:shadow-lg text-xs sm:text-sm md:text-base"
                  style={{
                    animationDelay: `${index * 100}ms`
                  }}
                >
                  <span className="relative z-10">{x}</span>
                  <div className="absolute inset-0 rounded-lg sm:rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

  
      {isLoading && (
        <div className="flex flex-col items-center justify-center py-12 sm:py-16 md:py-20 space-y-4">
          <div className="relative">
            <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 border-2 border-slate-700 border-t-blue-500 rounded-full animate-spin"></div>
            <div className="absolute inset-0 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 border-2 border-slate-700 border-t-purple-500 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
          </div>
          <p className="text-sm sm:text-base text-slate-400 font-medium animate-pulse">Finding similar problems...</p>
        </div>
      )}

      {!isLoading && question && (
        <>
          {/* Premium Question Header */}
          <div className="relative group">
            {/* Glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-2xl md:rounded-3xl blur-xl opacity-75 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="relative rounded-2xl md:rounded-3xl border border-slate-700/50 bg-gradient-to-br from-slate-900/90 via-slate-800/50 to-slate-900/90 backdrop-blur-xl p-4 sm:p-6 md:p-8 lg:p-9">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 md:gap-6">
                <div className="space-y-3 md:space-y-4">
                  <div className="inline-flex items-center gap-2 md:gap-3 rounded-full bg-gradient-to-r from-slate-800/50 to-slate-700/50 border border-slate-600/30 px-3 md:px-4 py-1.5 md:py-2 text-[10px] md:text-[11px] tracking-[0.2em] text-slate-300 uppercase font-bold backdrop-blur-sm">
                    <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-blue-400" />
                    LEETCODE PROBLEM
                  </div>

                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-black bg-gradient-to-br from-white via-blue-100 to-purple-200 bg-clip-text text-transparent leading-tight px-1">
                    {question.title}
                  </h1>

                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                    <p className="text-xs sm:text-sm md:text-base text-slate-400 font-medium">
                      Problem Slug:
                    </p>
                    <span className="inline-flex rounded-full bg-gradient-to-r from-slate-800/50 to-slate-700/50 px-3 md:px-4 py-1.5 md:py-2 text-[10px] md:text-[12px] font-mono border border-slate-600/30 text-slate-300 shadow-inner backdrop-blur-sm">
                      {question.slug}
                    </span>
                  </div>
                </div>
                
                <div className="flex flex-col md:items-end gap-3 md:gap-4">
                  <div className="flex items-center gap-2 md:gap-3">
                    <div className="flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-400/30 px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm font-bold text-blue-300 backdrop-blur-sm">
                      <Target size={14} md:size={16} />
                      {question.similar?.length || 0} Similar
                    </div>
                  </div>

                  <span
                    className={`inline-flex px-4 md:px-6 py-2 md:py-3 rounded-full border text-xs md:text-sm font-bold tracking-wide items-center gap-2 md:gap-3 ${difficultyColors[question.difficulty]}`}
                  >
                    <Zap size={14} md:size={18} />
                    {question.difficulty}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Premium Similar Questions */}
          <div className="relative group">
            {/* Glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-2xl md:rounded-3xl blur-xl opacity-75 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="relative rounded-2xl md:rounded-3xl border border-slate-700/50 bg-gradient-to-br from-slate-900/90 via-slate-800/50 to-slate-900/90 backdrop-blur-xl p-4 sm:p-6 md:p-8 lg:p-9">
              <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-8">
                <div className="flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-xl md:rounded-2xl bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-400/30 text-yellow-300 backdrop-blur-sm">
                  <TrendingUp size={18} md:size={24} />
                </div>

                <div className="flex-1">
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-black bg-gradient-to-br from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
                    Similar Questions
                  </h2>
                  <p className="text-xs sm:text-sm md:text-base text-slate-400 font-medium mt-1">
                    Click any question to explore related problems and expand your practice.
                  </p>
                </div>
              </div>

              {question.similar?.length > 0 ? (
                <div className="grid gap-3 md:gap-4">
                  {question.similar.map((similar, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => onSelectSimilar(similar.slug)}
                      className="group w-full flex items-start gap-3 md:gap-5 p-4 md:p-6 rounded-xl md:rounded-2xl bg-gradient-to-r from-slate-800/30 to-slate-700/30 border border-slate-600/30 hover:border-blue-500/50 hover:bg-gradient-to-r hover:from-blue-900/20 hover:to-purple-900/20 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl"
                    >
                      <div className="flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-lg md:rounded-xl text-white text-sm md:text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 group-hover:from-blue-500 group-hover:to-purple-500 transition-all duration-300 shadow-lg flex-shrink-0">
                        {idx + 1}
                      </div>

                      <div className="flex-1 min-w-0 space-y-1.5 md:space-y-2">
                        <p className="truncate text-sm sm:text-base md:text-lg font-bold text-slate-100 group-hover:text-blue-300 transition-colors duration-300">
                          {similar.title}
                        </p>
                        <p className="text-[10px] sm:text-[12px] text-slate-500 font-mono truncate bg-slate-800/50 px-2 sm:px-3 py-0.5 sm:py-1 rounded-lg border border-slate-600/30 inline-block">
                          {similar.slug}
                        </p>
                      </div>

                      <div className="flex flex-col items-end gap-2 md:gap-3 flex-shrink-0">
                        <span
                          className={`px-2.5 md:px-4 py-1 md:py-2 rounded-full text-[10px] md:text-[12px] font-bold border ${difficultyColors[similar.difficulty]}`}
                        >
                          {similar.difficulty}
                        </span>

                        <span className="hidden sm:inline-flex items-center gap-1.5 md:gap-2 text-[10px] md:text-[12px] text-slate-400 font-medium group-hover:text-blue-400 transition-colors duration-300">
                          <BookOpen size={12} md:size={16} />
                          View Graph
                          <ArrowRight size={10} md:size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center py-12 sm:py-16 text-slate-400">
                  <div className="flex h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 items-center justify-center rounded-xl md:rounded-2xl bg-gradient-to-r from-slate-800/50 to-slate-700/50 border border-slate-600/30 mb-3 sm:mb-4 backdrop-blur-sm">
                    <BookOpen size={24} sm:size={28} md:size={32} className="opacity-60" />
                  </div>
                  <p className="text-base sm:text-lg font-medium">No similar questions found.</p>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">Try searching for a different problem.</p>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default SimilarQuestionsView;
