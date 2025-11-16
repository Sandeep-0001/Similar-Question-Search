import React from "react";

export default function Navbar() {
  return (
    <nav className="border-b border-slate-800 bg-slate-900/90 backdrop-blur supports-backdrop-filter:bg-slate-900/70">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-center">
        <div className="flex items-center justify-center gap-8">
          <a
            href="https://campus-to-corporate.vercel.app"
            className="text-lg font-semibold tracking-wide text-slate-50"
          >
            CampusToCorporate
          </a>
          <div className="hidden md:flex items-center gap-4 text-xs md:text-sm">
            <a
              href="https://campus-to-corporate.vercel.app/leaderboard"
              className="transition-colors text-slate-300 hover:text-cyan-300"
            >
              Leaderboard
            </a>
            <a
              href="https://contest-board.vercel.app"
              className="transition-colors text-slate-300 hover:text-cyan-300"
            >
              Contests
            </a>
            <a
              href="https://code-analyser-beta.vercel.app"
              className="transition-colors text-slate-300 hover:text-cyan-300"
            >
              Code Analyser
            </a>
            <a
              href="https://similar-question-search.vercel.app"
              className="transition-colors text-slate-300 hover:text-cyan-300"
            >
              Similar Qs
            </a>
            <a
              href="https://gla-notes.vercel.app"
              className="transition-colors text-slate-300 hover:text-cyan-300"
            >
              Notes
            </a>
            <a
              href="https://companywise-sheet.vercel.app"
              className="transition-colors text-slate-300 hover:text-cyan-300"
            >
              Company Sheets
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
