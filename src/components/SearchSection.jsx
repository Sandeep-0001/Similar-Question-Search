import React, { useState } from 'react';
import { Search } from 'lucide-react';

// NEW: Ultra-polished professional UI with glassmorphism, neon glow, smooth animations
export const SearchSection = ({ onSearch, isLoading }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onSearch(input.trim());
      setInput('');
    }
  };

  const handleExample = (example) => {
    setInput(example);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-10">
      {/* Header */}
      <div className="text-center space-y-4 animate-fade-in">
        <p className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-400/30 px-4 py-1.5 text-[11px] tracking-widest text-blue-200 font-medium shadow-sm backdrop-blur-md">
          <span className="h-1.5 w-1.5 rounded-full bg-blue-400 animate-ping" />
          Similar Question Search
        </p>

        <h1 className="text-5xl md:text-7xl font-extrabold bg-gradient-to-r from-white via-blue-200 to-purple-300 bg-clip-text text-transparent drop-shadow-xl leading-tight">
          Explore Smart
          <span className="block mt-1 bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-300 bg-clip-text text-transparent">
            Similar Problems
          </span>
        </h1>

        <p className="mx-auto max-w-2xl text-sm md:text-base text-slate-200/90 leading-relaxed">
          Paste a LeetCode URL or type a problem name and get instant suggestions to speed up your preparation.
        </p>
      </div>

      {/* Search Card */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-950/80 px-4 py-5 md:px-6 md:py-6 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block text-left text-xs font-medium tracking-[0.18em] text-zinc-400 uppercase">
            Problem Name / LeetCode URL
          </label>

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="e.g., https://leetcode.com/problems/two-sum/ or two-sum"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isLoading}
                className="h-11 w-full rounded-lg border border-zinc-800 bg-zinc-900 px-3.5 text-sm md:text-base text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-600/60 focus:border-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="inline-flex justify-center items-center px-6 py-2.5 rounded-lg text-sm md:text-base font-medium text-white bg-blue-600 hover:bg-blue-500 focus:ring-2 focus:ring-blue-600/60 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Search size={18} className="mr-2" />
              {isLoading ? 'Searching…' : 'Find Similar'}
            </button>
          </div>
        </form>

        {/* Examples */}
        <div className="pt-4 mt-5 border-t border-zinc-800">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <p className="text-xs md:text-sm text-zinc-400">
              Try a quick example:
            </p>

            <div className="flex flex-wrap gap-2">
              {['two-sum', '3sum', '4sum', 'valid-parentheses', 'longest-substring'].map((example) => (
                <button
                  key={example}
                  type="button"
                  onClick={() => handleExample(example)}
                  className="px-3 py-1.5 rounded-full text-xs md:text-sm bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-300 hover:text-zinc-50 transition-colors"
                >
                  {example}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchSection;
