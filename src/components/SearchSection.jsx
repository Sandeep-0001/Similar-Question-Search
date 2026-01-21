import React, { useState } from 'react';
import { Search, Sparkles, ArrowRight } from 'lucide-react';

// Premium professional UI with glassmorphism, neon glow, smooth animations
export const SearchSection = ({ onSearch, isLoading }) => {
  const [input, setInput] = useState('');
  const [isFocused, setIsFocused] = useState(false);

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
    <div className="w-full max-w-4xl mx-auto space-y-8 md:space-y-12 px-4 sm:px-6">
      {/* Header */}
      <div className="text-center space-y-4 md:space-y-6 animate-fade-in">
        <div className="inline-flex items-center gap-2 md:gap-3 rounded-full bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 border border-blue-400/30 px-4 md:px-6 py-2 md:py-2.5 text-[10px] md:text-[11px] tracking-widest text-blue-200 font-medium shadow-lg backdrop-blur-md animate-glow hover:shadow-xl hover:shadow-blue-500/25 transition-all duration-300">
          <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-blue-400 animate-pulse" />
          <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent font-bold">
            AI-POWERED SEARCH
          </span>
          <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-purple-400 animate-pulse delay-1000" />
        </div>

        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black bg-gradient-to-br from-white via-blue-100 to-purple-200 bg-clip-text text-transparent drop-shadow-2xl leading-tight px-2 animate-fade-in">
          <span className="block bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
            Find Similar
          </span>
          <span className="block mt-1 md:mt-2 bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-400 bg-clip-text text-transparent animate-slide-up">
            Problems Instantly
          </span>
        </h1>

        <p className="mx-auto max-w-3xl text-sm md:text-lg lg:text-xl text-slate-300/90 leading-relaxed font-light px-4 animate-fade-in-delay">
          <span className="block">
            Transform your coding practice with <span className="font-semibold bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">intelligent problem recommendations</span>.
          </span>
          <span className="block mt-2 md:mt-3 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent font-medium">
            Paste a LeetCode URL or type a problem name to discover related challenges.
          </span>
        </p>
      </div>

      {/* Premium Search Card */}
      <div className="relative group">
        {/* Glow effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-3xl blur-xl opacity-75 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        <div className="relative rounded-2xl md:rounded-3xl border border-slate-700/50 bg-gradient-to-br from-slate-900/90 via-slate-800/50 to-slate-900/90 backdrop-blur-xl px-4 sm:px-6 md:px-8 lg:px-10 py-6 md:py-8 lg:py-10 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <label className="block text-left text-xs font-bold tracking-[0.3em] text-slate-400 uppercase">
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Problem Name / LeetCode URL
              </span>
            </label>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <div className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-slate-500 group-hover:text-blue-400 transition-colors duration-300">
                  <Search size={20} />
                </div>
                <input
                  type="text"
                  placeholder="e.g., https://leetcode.com/problems/two-sum/ or two-sum"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  disabled={isLoading}
                  className={`h-12 sm:h-14 w-full rounded-xl sm:rounded-2xl border ${isFocused ? 'border-blue-500/50 bg-slate-800/50' : 'border-slate-700/50 bg-slate-900/50'} pl-10 sm:pl-12 pr-4 sm:pr-5 text-sm sm:text-base md:text-lg text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 backdrop-blur-sm`}
                />
                
                {/* Animated border gradient */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 ${isFocused ? 'opacity-100' : ''} transition-opacity duration-300 pointer-events-none`}></div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="group relative inline-flex justify-center items-center px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl text-sm sm:text-base md:text-lg font-bold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 focus:ring-4 focus:ring-blue-500/30 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25 w-full sm:w-auto"
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
          </form>

          {/* Enhanced Examples */}
          <div className="pt-6 mt-8 border-t border-slate-700/50">
            <div className="flex flex-col space-y-3 md:flex-row md:items-center md:justify-between md:space-y-0 gap-4">
              <p className="text-xs sm:text-sm md:text-base text-slate-400 font-medium">
                Quick examples:
              </p>

              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {['two-sum', '3sum', '4sum', 'valid-parentheses', 'longest-substring'].map((example, index) => (
                  <button
                    key={example}
                    type="button"
                    onClick={() => handleExample(example)}
                    className="group relative px-2.5 sm:px-3 md:px-4 py-1.5 sm:py-2 md:py-2.5 rounded-lg sm:rounded-xl text-xs sm:text-sm md:text-base bg-gradient-to-r from-slate-800/50 to-slate-700/50 hover:from-blue-900/50 hover:to-purple-900/50 border border-slate-600/30 hover:border-blue-500/30 text-slate-300 hover:text-slate-100 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                    style={{
                      animationDelay: `${index * 100}ms`
                    }}
                  >
                    <span className="relative z-10">{example}</span>
                    <div className="absolute inset-0 rounded-lg sm:rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchSection;
