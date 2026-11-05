import React, { useState } from 'react';
import { DAROOD_SHAREEF } from '../utils/studentAuth';
import { Heart, Sparkles, Check, Copy, ChevronDown, ChevronUp, BookOpen } from 'lucide-react';

interface DaroodShareefBannerProps {
  pageTitle?: string;
}

export const DaroodShareefBanner: React.FC<DaroodShareefBannerProps> = ({ pageTitle }) => {
  const [hasRecited, setHasRecited] = useState<boolean>(false);
  const [recitedCount, setRecitedCount] = useState<number>(0);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState<boolean>(true);

  const handleRecited = () => {
    setHasRecited(true);
    setRecitedCount((prev) => prev + 1);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(
      `${DAROOD_SHAREEF.arabic}\n\nاردو ترجمہ:\n${DAROOD_SHAREEF.urdu}\n\nEnglish Translation:\n${DAROOD_SHAREEF.english}`
    );
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  return (
    <section
      aria-label="Darood Shareef Recitation Banner"
      className="mb-6 rounded-2xl bg-gradient-to-br from-emerald-900 via-teal-900 to-slate-900 text-white shadow-xl border border-emerald-500/30 overflow-hidden relative"
    >
      {/* Decorative Islamic geometric background overlay */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

      {/* Top Banner Header */}
      <div className="relative px-5 py-3.5 bg-emerald-950/60 border-b border-emerald-500/20 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-300">
            <BookOpen className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
                برکتِ علم و مطالعہ
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-medium">
                Durood-e-Ibrahimi
              </span>
              {pageTitle && (
                <span className="hidden sm:inline-block text-[11px] text-slate-300">
                  · Before opening {pageTitle}
                </span>
              )}
            </div>
            <h2 className="text-sm sm:text-base font-bold text-white tracking-wide">
              {DAROOD_SHAREEF.title}
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-200 text-xs font-medium transition-colors cursor-pointer"
            title="Copy full written Darood Shareef"
          >
            {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{isCopied ? 'Copied' : 'Copy'}</span>
          </button>

          <button
            type="button"
            onClick={() => setIsExpanded((prev) => !prev)}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-200 text-xs transition-colors cursor-pointer"
            aria-label={isExpanded ? 'Collapse Darood Shareef' : 'Expand Darood Shareef'}
          >
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Main Darood Content */}
      {isExpanded && (
        <div className="relative p-5 sm:p-7 space-y-5">
          {/* Complete Written Arabic Text */}
          <div className="p-4 sm:p-6 rounded-xl bg-black/30 border border-emerald-500/20 shadow-inner">
            <p
              dir="rtl"
              className="font-serif text-lg sm:text-2xl md:text-3xl leading-loose sm:leading-loose text-center text-emerald-100 font-semibold tracking-wide select-all"
              style={{ fontFamily: "'Amiri', 'Traditional Arabic', 'Scheherazade New', serif" }}
            >
              {DAROOD_SHAREEF.arabic}
            </p>
          </div>

          {/* Urdu Translation */}
          <div className="space-y-1.5 text-right" dir="rtl">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
              اردو ترجمہ و مفہوم:
            </span>
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-sans">
              {DAROOD_SHAREEF.urdu}
            </p>
          </div>

          {/* English Translation & Fazilat */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3 border-t border-emerald-500/20 text-xs sm:text-sm">
            <div className="space-y-1">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
                English Translation:
              </span>
              <p className="text-slate-300 leading-relaxed">
                {DAROOD_SHAREEF.english}
              </p>
            </div>

            <div className="space-y-1 bg-emerald-950/40 p-3 rounded-lg border border-emerald-500/20">
              <span className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                فضیلت برائے طلبہ (Virtual University Students):
              </span>
              <p className="text-slate-200 text-xs leading-relaxed" dir="rtl">
                {DAROOD_SHAREEF.fazilat}
              </p>
            </div>
          </div>

          {/* Action Row: Recitation Button */}
          <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs text-emerald-300">
              <Heart className="w-4 h-4 fill-emerald-400 text-emerald-400" />
              <span>
                {recitedCount > 0
                  ? `ماشاءاللہ! You have recited this ${recitedCount} time${recitedCount > 1 ? 's' : ''}`
                  : 'Recite with sincere heart before starting your VU lecture or study session'}
              </span>
            </div>

            <button
              type="button"
              onClick={handleRecited}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold shadow-md transition-all cursor-pointer ${
                hasRecited
                  ? 'bg-emerald-500 hover:bg-emerald-600 text-white'
                  : 'bg-emerald-400 hover:bg-emerald-300 text-emerald-950'
              }`}
            >
              <Check className="w-4 h-4" />
              <span>
                {hasRecited ? 'Recited Again (صلی اللہ علیہ وسلم)' : 'I Have Recited (صلی اللہ علیہ وسلم)'}
              </span>
              {recitedCount > 0 && (
                <span className="px-1.5 py-0.5 rounded-full bg-black/20 text-[10px]">
                  {recitedCount}
                </span>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Minimized view indicator if collapsed */}
      {!isExpanded && (
        <div className="px-5 py-2.5 flex items-center justify-between text-xs text-emerald-300 bg-emerald-950/30">
          <span dir="rtl" className="font-serif text-sm">
            اَللّٰھُمَّ صَلِّ عَلٰی مُحَمَّدٍ وَّعَلٰی اٰلِ مُحَمَّدٍ...
          </span>
          <button
            type="button"
            onClick={() => setIsExpanded(true)}
            className="text-xs text-emerald-400 hover:underline cursor-pointer font-medium"
          >
            Show Full Text & Translation
          </button>
        </div>
      )}
    </section>
  );
};
