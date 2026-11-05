import React from 'react';
import {
  MapPin,
  Lightbulb,
  MessagesSquare,
  Highlighter,
  Wand2,
  HeartPulse,
  Cat,
  CalendarCheck,
  Calculator,
  LogOut,
  User,
  Sparkles,
  BookOpen,
  X,
  Flame,
  Fish,
  BrainCircuit,
} from 'lucide-react';
import { ActiveTabId } from './HeaderNav';
import { MiloState } from '../utils/vuLogic';
import { StudentSession } from '../utils/studentAuth';

interface SidebarNavProps {
  activeTab: ActiveTabId;
  onSelectTab: (tab: ActiveTabId) => void;
  milo: MiloState;
  studentSession: StudentSession | null;
  onLogout: () => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
}

interface NavItem {
  id: ActiveTabId;
  label: string;
  urduLabel?: string;
  icon: React.ReactNode;
  badge?: string;
  color: string;
}

export const SidebarNav: React.FC<SidebarNavProps> = ({
  activeTab,
  onSelectTab,
  milo,
  studentSession,
  onLogout,
  isOpenMobile,
  onCloseMobile,
}) => {
  const academicNavItems: NavItem[] = [
    {
      id: 'centers',
      label: 'Exam Centers',
      urduLabel: 'سینٹرز ریویو',
      icon: <MapPin className="w-4 h-4" />,
      color: 'text-sky-500 dark:text-sky-400',
    },
    {
      id: 'concepts',
      label: 'Concept Finder',
      urduLabel: 'کونسپٹ فائنڈر',
      icon: <Lightbulb className="w-4 h-4" />,
      color: 'text-amber-500 dark:text-amber-400',
    },
    {
      id: 'discussions',
      label: 'Doubt Board',
      urduLabel: 'طلبہ سوالات',
      icon: <MessagesSquare className="w-4 h-4" />,
      badge: 'Active',
      color: 'text-emerald-500 dark:text-emerald-400',
    },
    {
      id: 'highlights',
      label: 'Handouts Notes',
      urduLabel: 'ہینڈ آؤٹس ہائی لائٹر',
      icon: <Highlighter className="w-4 h-4" />,
      color: 'text-indigo-500 dark:text-indigo-400',
    },
    {
      id: 'humanizer',
      label: 'AI Humanizer',
      urduLabel: 'ہیومنائزر اسائنمنٹ',
      icon: <Wand2 className="w-4 h-4" />,
      badge: 'AI',
      color: 'text-violet-500 dark:text-violet-400',
    },
    {
      id: 'quiz',
      label: 'AI Quiz Solver & Extension',
      urduLabel: 'کوئز سولور ایکسٹینشن',
      icon: <BrainCircuit className="w-4 h-4" />,
      badge: 'LMS Pack',
      color: 'text-amber-500 dark:text-amber-400',
    },
  ];

  const utilityNavItems: NavItem[] = [
    {
      id: 'health',
      label: 'Remote Health Desk',
      urduLabel: 'ہیلتھ ڈیسک',
      icon: <HeartPulse className="w-4 h-4" />,
      color: 'text-rose-500 dark:text-rose-400',
    },
    {
      id: 'milo',
      label: 'Cat Milo Companion',
      urduLabel: 'کیٹ میلو گیم',
      icon: <Cat className="w-4 h-4" />,
      badge: `${milo.streakDays}d 🔥`,
      color: 'text-amber-500 dark:text-amber-400',
    },
    {
      id: 'schedule',
      label: 'Study Planner',
      urduLabel: 'اسٹڈی پلانر',
      icon: <CalendarCheck className="w-4 h-4" />,
      color: 'text-teal-500 dark:text-teal-400',
    },
    {
      id: 'gpa',
      label: 'VU GPA Calculator',
      urduLabel: 'جی پی اے کیلکولیٹر',
      icon: <Calculator className="w-4 h-4" />,
      color: 'text-cyan-500 dark:text-cyan-400',
    },
  ];

  const handleTabClick = (id: ActiveTabId) => {
    onSelectTab(id);
    onCloseMobile();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-xs lg:hidden transition-opacity"
          onClick={onCloseMobile}
          aria-hidden="true"
        />
      )}

      {/* Sidebar Panel */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:h-[calc(100vh-4rem)] lg:sticky lg:top-16 ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Mobile Header */}
        <div className="p-4 flex items-center justify-between border-b border-slate-200 dark:border-slate-800 lg:hidden">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-xs shadow-xs">
              VU
            </div>
            <span className="font-bold text-sm text-slate-900 dark:text-white">
              Student Navigation
            </span>
          </div>
          <button
            type="button"
            onClick={onCloseMobile}
            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Content (Scrollable) */}
        <div className="flex-1 overflow-y-auto px-3.5 py-4 space-y-6">
          {/* Section: Academic Features */}
          <div className="space-y-1">
            <div className="px-3 pb-1.5 flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Academic & Exam Portal
              </span>
              <BookOpen className="w-3 h-3 text-slate-400" />
            </div>

            {academicNavItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleTabClick(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer text-left ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-500/20'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/80 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className={isActive ? 'text-white' : item.color}>{item.icon}</span>
                    <span className="truncate">{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Section: Productivity & Health */}
          <div className="space-y-1">
            <div className="px-3 pb-1.5 flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Wellbeing & Tools
              </span>
              <Sparkles className="w-3 h-3 text-slate-400" />
            </div>

            {utilityNavItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleTabClick(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer text-left ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-500/20'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/80 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className={isActive ? 'text-white' : item.color}>{item.icon}</span>
                    <span className="truncate">{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Milo Mini Status Box */}
          <div className="p-3 rounded-xl bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/20 border border-amber-200/80 dark:border-amber-800/60 text-amber-950 dark:text-amber-200 text-xs space-y-2">
            <div className="flex items-center justify-between font-bold">
              <span className="flex items-center gap-1.5">
                <Cat className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                <span>Milo Status</span>
              </span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-200/60 dark:bg-amber-900/60 font-mono">
                Lvl {milo.level}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-1.5 text-[11px]">
              <div className="flex items-center gap-1 text-slate-700 dark:text-slate-300">
                <Flame className="w-3.5 h-3.5 text-orange-500" />
                <span>{milo.streakDays} Day Streak</span>
              </div>
              <div className="flex items-center gap-1 text-slate-700 dark:text-slate-300">
                <Fish className="w-3.5 h-3.5 text-blue-500" />
                <span>{milo.kibbleTreats} Kibbles</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Student Profile Card & Logout */}
        <div className="p-3.5 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 space-y-2">
          {studentSession ? (
            <div className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 shadow-xs flex items-center justify-between gap-2">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 flex items-center justify-center shrink-0">
                  <User className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
                    {studentSession.name}
                  </p>
                  <p className="text-[10px] font-mono text-indigo-600 dark:text-indigo-400 truncate">
                    {studentSession.vuId}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={onLogout}
                className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer"
                title="Lock portal / Log out"
                aria-label="Log out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="text-center text-[11px] text-slate-500">
              Virtual University Portal
            </div>
          )}
        </div>
      </aside>
    </>
  );
};
