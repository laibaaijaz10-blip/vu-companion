import React, { useState } from 'react';
import { MiloState, feedMilo } from '../utils/vuLogic';
import {
  Cat,
  Flame,
  Award,
  Sparkles,
  Heart,
  Utensils,
  BookOpen,
  Calendar,
  AlertCircle,
  HelpCircle,
} from 'lucide-react';

interface CatMiloProps {
  milo: MiloState;
  onUpdateMilo: (updated: MiloState) => void;
  onJumpToStudy: () => void;
}

export const CatMiloGamification: React.FC<CatMiloProps> = ({
  milo,
  onUpdateMilo,
  onJumpToStudy,
}) => {
  const [feedNotification, setFeedNotification] = useState<string | null>(null);
  const [isEating, setIsEating] = useState(false);

  const getMiloTitle = (level: number) => {
    if (level >= 10) return 'Professor Meow, Ph.D.';
    if (level >= 7) return 'VU Gold Medalist Cat';
    if (level >= 5) return "Dean's List Scholar";
    if (level >= 3) return 'Handouts Master';
    if (level >= 2) return 'Diligent Bookworm';
    return 'Freshman Study Kitten';
  };

  const handleFeed = () => {
    const res = feedMilo(milo);
    if (res.success) {
      setIsEating(true);
      onUpdateMilo(res.state);
      setFeedNotification(res.message);
      setTimeout(() => {
        setIsEating(false);
        setFeedNotification(null);
      }, 2500);
    } else {
      setFeedNotification(res.message);
      setTimeout(() => setFeedNotification(null), 3000);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-amber-950 via-slate-900 to-indigo-950 text-white shadow-sm border border-slate-800">
        <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 mb-1">
          <Cat className="w-4 h-4" />
          <span>Gamer Companion & Study Streak Gamification</span>
          <span aria-hidden="true">·</span>
          <span>Never Skip a Study Day</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
          Cat Milo — Your Virtual Study Pet
        </h2>
        <p className="mt-1 text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
          Milo is a gamer companion! Whenever you study lectures, solve concepts, or finish quizzes, Milo earns fish treats (🐟).
          Lekin agar aapne ek din bhi parhai skip ki, to Milo ko khana nahi mile ga aur streak toot jaye gi!
        </p>
      </div>

      {/* Main Grid: Virtual Cat Showcase (Left 6 Cols) & Gamer Stats & Rules (Right 6 Cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Cat Stage & Interaction Card (6 Cols) */}
        <div className="lg:col-span-6 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col items-center text-center justify-between space-y-6">
          <div className="w-full flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 text-xs">
            <span className="font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1">
              <Award className="w-4 h-4" />
              <span>{getMiloTitle(milo.level)}</span>
            </span>
            <span className="font-semibold text-slate-500 tabular-nums">
              Level {milo.level} ({milo.xp}/{milo.xpToNextLevel} XP)
            </span>
          </div>

          {/* Interactive Illustrated Cat Milo Avatar */}
          <div className="relative py-4">
            {/* Thought / Speech Bubble */}
            <div className="mb-4 inline-block px-4 py-2 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-800 dark:text-slate-200 shadow-xs animate-bounce">
              {isEating
                ? 'Nom nom nom! 🐟 So tasty! Purrrr~ ❤️'
                : milo.mood === 'hungry'
                ? 'Meeooww! 😿 Milo is hungry! Please study a lecture to feed me!'
                : milo.mood === 'ecstatic'
                ? 'Purrr! 😻 You are doing awesome in your VU courses!'
                : 'Meow! 😸 Ready for CS & Math study sprint!'}
            </div>

            {/* Cat Mascot SVG Drawing with Animation */}
            <div
              className={`w-48 h-48 sm:w-56 sm:h-56 mx-auto rounded-3xl bg-amber-50/80 dark:bg-amber-950/20 border-2 border-amber-200 dark:border-amber-900/60 flex items-center justify-center p-4 transition-transform duration-300 ${
                isEating ? 'scale-105 rotate-1' : 'hover:scale-102'
              }`}
            >
              <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-md">
                {/* Cat Ears */}
                <polygon points="50,60 80,15 95,65" fill="#f59e0b" stroke="#d97706" strokeWidth="4" />
                <polygon points="58,55 80,25 90,60" fill="#fde68a" />
                <polygon points="150,60 120,15 105,65" fill="#f59e0b" stroke="#d97706" strokeWidth="4" />
                <polygon points="142,55 120,25 110,60" fill="#fde68a" />

                {/* Cat Head */}
                <ellipse cx="100" cy="95" rx="58" ry="50" fill="#f59e0b" stroke="#d97706" strokeWidth="4" />

                {/* Face Patches */}
                <ellipse cx="70" cy="85" rx="18" ry="14" fill="#fbbf24" opacity="0.4" />
                <ellipse cx="130" cy="85" rx="18" ry="14" fill="#fbbf24" opacity="0.4" />

                {/* Eyes */}
                {milo.mood === 'hungry' ? (
                  // Sad watery eyes
                  <>
                    <ellipse cx="78" cy="90" rx="9" ry="12" fill="#1e293b" />
                    <circle cx="76" cy="86" r="3" fill="#ffffff" />
                    <ellipse cx="122" cy="90" rx="9" ry="12" fill="#1e293b" />
                    <circle cx="120" cy="86" r="3" fill="#ffffff" />
                  </>
                ) : isEating || milo.mood === 'ecstatic' ? (
                  // Happy curved eyes ^ ^
                  <>
                    <path d="M 68 92 Q 78 80 88 92" fill="none" stroke="#1e293b" strokeWidth="4" strokeLinecap="round" />
                    <path d="M 112 92 Q 122 80 132 92" fill="none" stroke="#1e293b" strokeWidth="4" strokeLinecap="round" />
                  </>
                ) : (
                  // Standard alert shiny cat eyes
                  <>
                    <circle cx="78" cy="90" r="9" fill="#1e293b" />
                    <circle cx="75" cy="87" r="3.5" fill="#ffffff" />
                    <circle cx="122" cy="90" r="9" fill="#1e293b" />
                    <circle cx="119" cy="87" r="3.5" fill="#ffffff" />
                  </>
                )}

                {/* Pink Nose */}
                <polygon points="96,104 104,104 100,110" fill="#ec4899" />

                {/* Mouth */}
                <path d="M 100 110 Q 94 118 86 114" fill="none" stroke="#78350f" strokeWidth="3" strokeLinecap="round" />
                <path d="M 100 110 Q 106 118 114 114" fill="none" stroke="#78350f" strokeWidth="3" strokeLinecap="round" />

                {/* Whiskers */}
                <line x1="45" y1="98" x2="68" y2="102" stroke="#78350f" strokeWidth="2.5" strokeLinecap="round" />
                <line x1="45" y1="108" x2="68" y2="108" stroke="#78350f" strokeWidth="2.5" strokeLinecap="round" />
                <line x1="132" y1="102" x2="155" y2="98" stroke="#78350f" strokeWidth="2.5" strokeLinecap="round" />
                <line x1="132" y1="108" x2="155" y2="108" stroke="#78350f" strokeWidth="2.5" strokeLinecap="round" />

                {/* Cat Graduation / Study Cap */}
                <polygon points="100,28 140,42 100,56 60,42" fill="#1e1b4b" stroke="#312e81" strokeWidth="2" />
                <line x1="140" y1="42" x2="148" y2="60" stroke="#fbbf24" strokeWidth="3" />
                <circle cx="148" cy="62" r="3" fill="#fbbf24" />

                {/* Paws on Book */}
                <rect x="65" y="145" width="70" height="25" rx="5" fill="#3b82f6" />
                <path d="M 65 157 L 135 157" stroke="#ffffff" strokeWidth="2" strokeDasharray="3,3" />
                <ellipse cx="80" cy="144" rx="10" ry="8" fill="#fde68a" stroke="#d97706" strokeWidth="2" />
                <ellipse cx="120" cy="144" rx="10" ry="8" fill="#fde68a" stroke="#d97706" strokeWidth="2" />
              </svg>
            </div>
          </div>

          {/* Action Row */}
          <div className="w-full space-y-3">
            {feedNotification && (
              <div className="p-3 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-200 text-xs font-semibold animate-in fade-in">
                {feedNotification}
              </div>
            )}

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                type="button"
                onClick={handleFeed}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-amber-600 hover:bg-amber-700 shadow-xs flex items-center justify-center gap-2 transition-transform active:scale-95"
              >
                <Utensils className="w-4 h-4" />
                <span>Feed Milo (-1 🐟 Treat)</span>
              </button>

              <button
                type="button"
                onClick={onJumpToStudy}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 flex items-center justify-center gap-2"
              >
                <BookOpen className="w-4 h-4 text-indigo-500" />
                <span>Study to Earn 🐟</span>
              </button>
            </div>

            <span className="text-[11px] text-slate-400 block">
              You have <strong className="text-amber-600 dark:text-amber-400">{milo.kibbleTreats} Fish Treats</strong> stored in your pantry bowl.
            </span>
          </div>
        </div>

        {/* Companion Vitals, Streak & Game Rules (6 Cols) */}
        <div className="lg:col-span-6 space-y-4">
          {/* Vitals Box */}
          <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center justify-between">
              <span>Milo's Vitals & Mood</span>
              <span className="text-xs font-normal text-slate-500">
                Mood: <strong className="text-emerald-600 dark:text-emerald-400 capitalize">{milo.mood}</strong>
              </span>
            </h3>

            {/* Hunger Bar */}
            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-slate-600 dark:text-slate-400 font-medium flex items-center gap-1.5">
                  <Utensils className="w-3.5 h-3.5 text-amber-500" />
                  <span>Hunger Saturation</span>
                </span>
                <span className="font-bold text-slate-900 dark:text-white tabular-nums">
                  {milo.hunger}%
                </span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-300 ${
                    milo.hunger > 60 ? 'bg-amber-500' : milo.hunger > 30 ? 'bg-amber-600' : 'bg-red-500'
                  }`}
                  style={{ width: `${milo.hunger}%` }}
                />
              </div>
            </div>

            {/* Happiness Bar */}
            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-slate-600 dark:text-slate-400 font-medium flex items-center gap-1.5">
                  <Heart className="w-3.5 h-3.5 text-pink-500" />
                  <span>Happiness Level</span>
                </span>
                <span className="font-bold text-slate-900 dark:text-white tabular-nums">
                  {milo.happiness}%
                </span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                <div
                  className="h-full rounded-full bg-pink-500 transition-all duration-300"
                  style={{ width: `${milo.happiness}%` }}
                />
              </div>
            </div>

            {/* Level XP Bar */}
            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-slate-600 dark:text-slate-400 font-medium flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
                  <span>XP to Next Degree</span>
                </span>
                <span className="font-bold text-slate-900 dark:text-white tabular-nums">
                  {milo.xp} / {milo.xpToNextLevel} XP
                </span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                <div
                  className="h-full rounded-full bg-indigo-600 transition-all duration-300"
                  style={{ width: `${Math.min(100, (milo.xp / milo.xpToNextLevel) * 100)}%` }}
                />
              </div>
            </div>

            {/* Streak Counter Badge */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-orange-100 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400">
                  <Flame className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-900 dark:text-white">
                    {milo.streakDays}-Day Active Study Streak
                  </span>
                  <p className="text-[11px] text-slate-500">
                    Last studied: {milo.lastStudyDate || 'Today'}
                  </p>
                </div>
              </div>
              <span className="text-xs font-bold text-orange-600 dark:text-orange-400 tabular-nums">
                🔥 {milo.streakDays} Days
              </span>
            </div>
          </div>

          {/* Gamification Rules & Penalty System Card */}
          <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5 text-indigo-500" />
              <span>How The Study Streak Game Works</span>
            </h4>

            <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 flex items-start gap-2">
                <span className="font-bold text-indigo-600 shrink-0">1.</span>
                <span>
                  <strong>Complete a 25-minute Pomodoro</strong> on the Health Desk to earn <strong>+2 Fish Treats (🐟)</strong>.
                </span>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 flex items-start gap-2">
                <span className="font-bold text-indigo-600 shrink-0">2.</span>
                <span>
                  <strong>Resolve an exam doubt</strong> in Concept Finder or check off a study plan to earn <strong>+1 Fish Treat (🐟)</strong>.
                </span>
              </div>

              <div className="p-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/40 text-rose-900 dark:text-rose-200 flex items-start gap-2">
                <span className="font-bold text-rose-600 shrink-0">⚠️</span>
                <span>
                  <strong>The Skip Day Rule:</strong> If you skip studying for an entire calendar day, Milo gets no food, his hunger drops by 40%, and your study streak resets to Day 1!
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
