import React from 'react';
import { Sparkles, ArrowRight, Code2, Compass } from 'lucide-react';

interface HeroSectionProps {
  onExplore: () => void;
  onCustomPrompt: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onExplore, onCustomPrompt }) => {
  return (
    <section className="relative pt-12 pb-14 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400 mb-3">
            <span>Project Canvas</span>
            <span aria-hidden="true">·</span>
            <span>Ready for Instructions</span>
            <span aria-hidden="true" className="hidden sm:inline">·</span>
            <span className="hidden sm:inline">TypeScript & Tailwind v4</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 dark:text-white leading-tight">
            Hello! What would you like to build today?
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            Your development environment is active and connected. You can select one of the curated application
            starters below, explore the architecture matrix, or describe your custom product idea in the chat.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={onExplore}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 rounded-lg shadow-sm transition-colors"
            >
              <Compass className="w-4 h-4" />
              <span>Explore Starters</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={onCustomPrompt}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-700 transition-colors"
            >
              <Code2 className="w-4 h-4" />
              <span>Assemble Feature Spec</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
