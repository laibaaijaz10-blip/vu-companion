import React from 'react';
import {
  Sun,
  Moon,
  Cat,
  Menu,
  Sparkles,
  Lock,
} from 'lucide-react';
import { MiloState } from '../utils/vuLogic';
import { StudentSession } from '../utils/studentAuth';

export type ActiveTabId =
  | 'centers'
  | 'concepts'
  | 'discussions'
  | 'highlights'
  | 'humanizer'
  | 'health'
  | 'milo'
  | 'schedule'
  | 'gpa'
  | 'quiz';

interface HeaderNavProps {
  isDark: boolean;
  onToggleDark: () => void;
  activeTab: ActiveTabId;
  onSelectTab: (tab: ActiveTabId) => void;
  milo: MiloState;
  studentSession: StudentSession | null;
  onToggleMobileSidebar: () => void;
  onLogout: () => void;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  isDark,
  onToggleDark,
  onSelectTab,
  milo,
  studentSession,
  onToggleMobileSidebar,
  onLogout,
}) => {
  return (
    <header className="sticky top-0 z-30 w-full border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md transition-colors shadow-xs">
      <div className="w-full px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3">
        {/* Left: Hamburger menu (mobile) + Portal Logo */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onToggleMobileSidebar}
            className="lg:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
            aria-label="Open sidebar navigation"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-xs shadow-xs">
              VU
            </div>
            <div>
              <span className="font-extrabold text-sm sm:text-base tracking-tight text-slate-900 dark:text-white block leading-tight">
                VU Companion
              </span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 hidden sm:block">
                All 200+ Courses & Semesters 1–8
              </span>
            </div>
          </div>
        </div>

        {/* Center: "Made by Laiba Ijaz for VU Students" in italic font (as explicitly requested by user) */}
        <div className="flex items-center justify-center text-center px-2 py-1 rounded-full bg-indigo-50/80 dark:bg-indigo-950/50 border border-indigo-200/60 dark:border-indigo-800/60 shadow-2xs">
          <div className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-indigo-700 dark:text-indigo-300">
            <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-pulse shrink-0" />
            <span className="italic font-serif tracking-wide select-none">
              Made by Laiba Ijaz for VU Students
            </span>
          </div>
        </div>

        {/* Right: Student chip, Milo quick badge, Theme switch */}
        <div className="flex items-center gap-2">
          {studentSession && (
            <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-mono">
              <span className="font-bold text-slate-900 dark:text-white truncate max-w-[100px]">
                {studentSession.name}
              </span>
              <span className="text-indigo-600 dark:text-indigo-400">({studentSession.vuId})</span>
            </div>
          )}

          <button
            type="button"
            onClick={() => onSelectTab('milo')}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-200 text-xs font-semibold hover:bg-amber-100 dark:hover:bg-amber-900/60 transition-colors cursor-pointer"
            title="Cat Milo Study Streak"
          >
            <Cat className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
            <span className="hidden sm:inline">Milo</span>
            <span className="tabular-nums font-bold">🔥 {milo.streakDays}d</span>
          </button>

          <button
            type="button"
            onClick={onToggleDark}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            className="p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          <button
            type="button"
            onClick={onLogout}
            className="p-2 text-slate-500 hover:text-rose-600 dark:text-slate-400 dark:hover:text-rose-400 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            title="Lock Portal (Logout)"
            aria-label="Lock Portal"
          >
            <Lock className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
