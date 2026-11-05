import React from 'react';
import { Sun, Moon, Sparkles, Layers } from 'lucide-react';

interface NavbarProps {
  isDark: boolean;
  onToggleDark: () => void;
  activeSection: string;
  onNavigate: (section: string) => void;
  selectedTemplateName: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  isDark,
  onToggleDark,
  activeSection,
  onNavigate,
  selectedTemplateName,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Single text element) */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-sm shadow-sm">
            SW
          </div>
          <button
            onClick={() => onNavigate('templates')}
            className="text-lg font-bold tracking-tight text-slate-900 dark:text-white whitespace-nowrap hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors text-left"
          >
            Studio Workspace
          </button>
        </div>

        {/* Zone 2: 4 Clean Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-300">
          <button
            onClick={() => onNavigate('templates')}
            className={`whitespace-nowrap transition-colors hover:text-slate-900 dark:hover:text-white ${
              activeSection === 'templates' ? 'text-indigo-600 dark:text-indigo-400 font-semibold' : ''
            }`}
          >
            Starters
          </button>
          <button
            onClick={() => onNavigate('features')}
            className={`whitespace-nowrap transition-colors hover:text-slate-900 dark:hover:text-white ${
              activeSection === 'features' ? 'text-indigo-600 dark:text-indigo-400 font-semibold' : ''
            }`}
          >
            Feature Architect
          </button>
          <button
            onClick={() => onNavigate('preview')}
            className={`whitespace-nowrap transition-colors hover:text-slate-900 dark:hover:text-white ${
              activeSection === 'preview' ? 'text-indigo-600 dark:text-indigo-400 font-semibold' : ''
            }`}
          >
            Interactive Demo
          </button>
          <button
            onClick={() => onNavigate('tokens')}
            className={`whitespace-nowrap transition-colors hover:text-slate-900 dark:hover:text-white ${
              activeSection === 'tokens' ? 'text-indigo-600 dark:text-indigo-400 font-semibold' : ''
            }`}
          >
            Design Tokens
          </button>
        </nav>

        {/* Zone 3: Primary Action & Theme Toggle */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onToggleDark}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            className="p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <button
            type="button"
            onClick={() => onNavigate('brief')}
            className="px-3 sm:px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 rounded-lg shadow-sm transition-colors whitespace-nowrap"
          >
            <span className="sm:hidden">Brief</span>
            <span className="hidden sm:inline">Generate Brief</span>
          </button>
        </div>
      </div>
    </header>
  );
};
