import React, { useState, useEffect } from 'react';
import {
  CalendarCheck,
  Sparkles,
  CheckCircle2,
  Clock,
  BookOpen,
  Calendar,
  RotateCcw,
  Copy,
  Check,
  Plus,
  Trash2,
  ChevronRight,
  Flame,
  Award,
} from 'lucide-react';

export interface PlannedDay {
  id: string;
  dayNumber: number;
  dateLabel: string;
  handoutRange: string;
  suggestedSlot: string;
  tasks: string[];
  completed: boolean;
}

export interface GeneratedPlan {
  courseName: string;
  handoutTarget: string;
  dailyHours: string;
  totalDays: number;
  strategy: 'sprint' | 'balanced' | 'deep';
  createdAt: string;
  days: PlannedDay[];
}

interface StudyPlannerProps {
  onTaskCompleted: (taskTitle: string) => void;
}

export const StudyPlanner: React.FC<StudyPlannerProps> = ({ onTaskCompleted }) => {
  // Input fields for student to generate their schedule
  const [courseInput, setCourseInput] = useState<string>('CS201 / Introduction to Programming');
  const [handoutInput, setHandoutInput] = useState<string>('Lessons 1 to 22 (140 Pages - Midterm Syllabus)');
  const [timingInput, setTimingInput] = useState<string>('Evening 8:00 PM - 10:30 PM (2.5 Hours/day)');
  const [daysCount, setDaysCount] = useState<number>(7);
  const [strategy, setStrategy] = useState<'sprint' | 'balanced' | 'deep'>('sprint');
  const [copied, setCopied] = useState<boolean>(false);

  // Active generated plan (persisted in localStorage)
  const [plan, setPlan] = useState<GeneratedPlan | null>(() => {
    try {
      const saved = localStorage.getItem('vu_custom_study_plan_v2');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }

    // Default initial smart plan
    return generatePlanFromInputs(
      'CS201 / Introduction to Programming',
      'Lessons 1 to 22 (140 Pages - Midterm Syllabus)',
      'Evening 8:00 PM - 10:30 PM (2.5 Hours/day)',
      7,
      'sprint'
    );
  });

  // Save to localStorage whenever plan changes
  useEffect(() => {
    if (plan) {
      try {
        localStorage.setItem('vu_custom_study_plan_v2', JSON.stringify(plan));
      } catch {
        // ignore
      }
    }
  }, [plan]);

  function generatePlanFromInputs(
    course: string,
    handouts: string,
    timing: string,
    totalDays: number,
    chosenStrategy: 'sprint' | 'balanced' | 'deep'
  ): GeneratedPlan {
    const cleanCourse = course.trim() || 'My Course Handouts';
    const cleanHandouts = handouts.trim() || 'Core Syllabus Lessons';
    const cleanTiming = timing.trim() || '2 Hours Daily Study Slot';
    const daysArr: PlannedDay[] = [];

    // Extract approximate page or lesson count if numbers are found
    const numberMatches = handouts.match(/\d+/g);
    let totalUnits = 22; // default
    if (numberMatches && numberMatches.length > 0) {
      const lastNum = parseInt(numberMatches[numberMatches.length - 1], 10);
      if (lastNum > 0) totalUnits = lastNum;
    }

    const unitsPerDay = Math.max(1, Math.ceil(totalUnits / Math.max(1, totalDays - 1)));

    for (let i = 1; i <= totalDays; i++) {
      const startUnit = (i - 1) * unitsPerDay + 1;
      const endUnit = Math.min(totalUnits, i * unitsPerDay);

      let dayTitle = '';
      let tasksList: string[] = [];

      if (i === totalDays) {
        // Final day is dedicated revision & past papers
        dayTitle = `Final Review: Handouts Lessons 1 - ${totalUnits} & Past Papers Blitz`;
        tasksList = [
          `Review all underlined terms & bold definitions across Handouts.`,
          `Attempt 30 past paper MCQs (Midterm / Finalterm files).`,
          `Formula sheet & code syntax dry-run.`,
        ];
      } else {
        dayTitle = `Handouts Lessons ${startUnit} to ${endUnit}`;
        if (chosenStrategy === 'sprint') {
          tasksList = [
            `Read & highlight Handouts Lessons ${startUnit} to ${endUnit}.`,
            `Clear confusing concepts using Concept Finder (Depth Engine).`,
            `Solve lesson-end self-assessment questions.`,
          ];
        } else if (chosenStrategy === 'deep') {
          tasksList = [
            `Detailed reading of Lessons ${startUnit} to ${endUnit} (Definitions & Formulas).`,
            `Write one-page quick summary notes for exam day.`,
            `Search past paper 5-mark subjective questions for these topics.`,
          ];
        } else {
          tasksList = [
            `Read Handouts Lessons ${startUnit} to ${endUnit}.`,
            `Note down key diagrams and syntax examples.`,
            `Short 15-minute quick recall test.`,
          ];
        }
      }

      daysArr.push({
        id: `day-${i}-${Date.now()}`,
        dayNumber: i,
        dateLabel: `Day ${i}`,
        handoutRange: dayTitle,
        suggestedSlot: cleanTiming,
        tasks: tasksList,
        completed: false,
      });
    }

    return {
      courseName: cleanCourse,
      handoutTarget: cleanHandouts,
      dailyHours: cleanTiming,
      totalDays,
      strategy: chosenStrategy,
      createdAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      days: daysArr,
    };
  }

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    const newPlan = generatePlanFromInputs(
      courseInput,
      handoutInput,
      timingInput,
      daysCount,
      strategy
    );
    setPlan(newPlan);
  };

  const handleToggleDay = (dayId: string) => {
    if (!plan) return;

    setPlan((prev) => {
      if (!prev) return prev;
      const updatedDays = prev.days.map((d) => {
        if (d.id === dayId) {
          const nextCompleted = !d.completed;
          if (nextCompleted) {
            onTaskCompleted(`Completed ${d.dateLabel}: ${d.handoutRange}`);
          }
          return { ...d, completed: nextCompleted };
        }
        return d;
      });
      return { ...prev, days: updatedDays };
    });
  };

  const handlePreset = (presetCourse: string, presetHandouts: string, presetTiming: string, presetDays: number) => {
    setCourseInput(presetCourse);
    setHandoutInput(presetHandouts);
    setTimingInput(presetTiming);
    setDaysCount(presetDays);
    const newPlan = generatePlanFromInputs(
      presetCourse,
      presetHandouts,
      presetTiming,
      presetDays,
      'sprint'
    );
    setPlan(newPlan);
  };

  const handleCopyPlan = async () => {
    if (!plan) return;
    const text = `=====================================================
VU HANDOUTS STUDY PLAN: ${plan.courseName}
Target Scope: ${plan.handoutTarget}
Daily Study Slot: ${plan.dailyHours}
Duration: ${plan.totalDays} Days | Created: ${plan.createdAt}
=====================================================
${plan.days
  .map(
    (d) => `\n[${d.completed ? 'COMPLETED' : 'PENDING'}] ${d.dateLabel} — ${d.handoutRange}
Timing Slot: ${d.suggestedSlot}
Action Items:
${d.tasks.map((t) => `  • ${t}`).join('\n')}`
  )
  .join('\n')}
=====================================================`;

    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const completedDaysCount = plan?.days.filter((d) => d.completed).length || 0;
  const totalDaysCount = plan?.days.length || 0;
  const progressPercent = totalDaysCount > 0 ? Math.round((completedDaysCount / totalDaysCount) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 text-white shadow-sm border border-slate-800">
        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-blue-400 mb-1.5">
          <CalendarCheck className="w-4 h-4" />
          <span>VU Handouts Study Schedule Generator</span>
          <span aria-hidden="true" className="text-slate-500">·</span>
          <span>No Confusing LMS Integration Needed</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
          Apna Handouts Schedule Khud Banayein!
        </h2>
        <p className="mt-1 text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
          Kissi fake LMS login ya mock assignments ki confusion nahi! Sirf apna course, daily study timing, aur
          handouts target (pages ya lessons) enter karein. Button click karein aur foran personalized day-by-day timetable hasil karein.
        </p>

        {/* Quick Launch Presets */}
        <div className="mt-4 pt-3 border-t border-slate-800/80 flex flex-wrap items-center gap-2">
          <span className="text-[11px] text-slate-400 font-semibold flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>Quick Presets:</span>
          </span>
          <button
            type="button"
            onClick={() => handlePreset('CS201 / Programming', 'Lessons 1 to 22 (Midterm Syllabus)', 'Night 8:00 PM - 11:00 PM (3 Hours)', 7)}
            className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors flex items-center gap-1"
          >
            <span>🚀 7-Day Midterm Sprint (22 Lessons)</span>
          </button>
          <button
            type="button"
            onClick={() => handlePreset('MTH101 / Calculus', '150 Handout Pages (Differential & Geometry)', 'Evening 6:00 PM - 8:00 PM (2 Hours)', 14)}
            className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors flex items-center gap-1"
          >
            <span>📘 14-Day Full Handouts (150 Pages)</span>
          </button>
          <button
            type="button"
            onClick={() => handlePreset('MGT201 / Finance', 'Lessons 1 to 10 (Accounting Core)', 'Morning 6:00 AM - 10:00 AM (4 Hours)', 3)}
            className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors flex items-center gap-1"
          >
            <span>⚡ 3-Day Weekend Crash Course</span>
          </button>
        </div>
      </div>

      {/* Main Split: Generator Form (Left 5 Cols) + Generated Plan (Right 7 Cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Input Form */}
        <div className="lg:col-span-5 space-y-4">
          <form
            onSubmit={handleGenerate}
            className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4 shadow-sm"
          >
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Calendar className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <span>Enter Your Timing & Handouts</span>
              </h3>
              <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-bold bg-indigo-50 dark:bg-indigo-950 px-2 py-0.5 rounded">
                Custom Schedule
              </span>
            </div>

            {/* Course / Subject Name */}
            <div>
              <label htmlFor="course-name-input" className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                Course Code / Name (Apna Subject):
              </label>
              <input
                id="course-name-input"
                type="text"
                required
                placeholder="e.g. CS201, MGT201, BIO5101, MTH101, or any course"
                value={courseInput}
                onChange={(e) => setCourseInput(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-indigo-500 font-medium"
              />
            </div>

            {/* Handouts Range / Scope */}
            <div>
              <label htmlFor="handout-range-input" className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                Handouts Target (Kitne Pages / Lessons parhne hain?):
              </label>
              <input
                id="handout-range-input"
                type="text"
                required
                placeholder="e.g. Lessons 1 to 22 (Midterm) ya 120 Pages"
                value={handoutInput}
                onChange={(e) => setHandoutInput(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-indigo-500 font-medium"
              />
            </div>

            {/* Daily Timing / Slots */}
            <div>
              <label htmlFor="timing-input" className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                Daily Study Timing (Kis waqt aur kitne ghante parhna hai?):
              </label>
              <input
                id="timing-input"
                type="text"
                required
                placeholder="e.g. Evening 8:00 PM - 10:30 PM (2.5 Hours/day)"
                value={timingInput}
                onChange={(e) => setTimingInput(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-indigo-500 font-medium"
              />
            </div>

            {/* Duration / Days count & Strategy */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="days-count-input" className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  Target Days:
                </label>
                <select
                  id="days-count-input"
                  value={daysCount}
                  onChange={(e) => setDaysCount(Number(e.target.value))}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-indigo-500"
                >
                  <option value={3}>3 Days (Weekend Sprint)</option>
                  <option value={5}>5 Days (Week Sprint)</option>
                  <option value={7}>7 Days (1 Week Plan)</option>
                  <option value={10}>10 Days (Fast Pace)</option>
                  <option value={14}>14 Days (2 Weeks Balanced)</option>
                  <option value={21}>21 Days (3 Weeks Steady)</option>
                  <option value={30}>30 Days (Full Month Prep)</option>
                </select>
              </div>

              <div>
                <label htmlFor="strategy-input" className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  Study Pace:
                </label>
                <select
                  id="strategy-input"
                  value={strategy}
                  onChange={(e) => setStrategy(e.target.value as any)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-indigo-500"
                >
                  <option value="sprint">Sprint (Fast + Revision)</option>
                  <option value="balanced">Balanced (Steady)</option>
                  <option value="deep">Deep Dive (Notes + MCQs)</option>
                </select>
              </div>
            </div>

            {/* Primary Action Button */}
            <button
              type="submit"
              className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors shadow-xs flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>✨ Generate Custom Study Plan (Plan Banayein)</span>
            </button>
          </form>

          {/* Gamification Tip Box */}
          <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/60 text-xs text-amber-900 dark:text-amber-200 space-y-1.5">
            <span className="font-bold flex items-center gap-1.5 text-amber-800 dark:text-amber-300">
              <Award className="w-4 h-4" />
              <span>Cat Milo Gamification Reward:</span>
            </span>
            <p className="leading-relaxed">
              Plan ke har din parhne k baad tick (✔) karein. Har din complete hone par Cat Milo ko <strong>+1 Fish Kibble (🐟)</strong> milay ga aur aapka daily study streak continue rahay ga!
            </p>
          </div>
        </div>

        {/* Right: Generated Plan Schedule View */}
        <div className="lg:col-span-7 space-y-4">
          {plan ? (
            <div className="p-5 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-5">
              {/* Header Card */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 dark:text-indigo-400 mb-0.5">
                    <span>{plan.courseName}</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-slate-400 font-normal">{plan.totalDays} Days Plan</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                    {plan.handoutTarget}
                  </h3>
                  <div className="mt-1 flex items-center gap-2 text-xs text-slate-500">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>Slot: {plan.dailyHours}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
                  <button
                    type="button"
                    onClick={handleCopyPlan}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied' : 'Copy Plan'}</span>
                  </button>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span>Study Progress: {completedDaysCount} of {totalDaysCount} Days Completed</span>
                  </span>
                  <span className="text-indigo-600 dark:text-indigo-400 font-bold tabular-nums">
                    {progressPercent}%
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-indigo-500 to-emerald-500 transition-all duration-300"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              {/* Day-by-Day Schedule List */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-indigo-500" />
                  <span>Your Day-by-Day Handouts Roadmap:</span>
                </h4>

                {plan.days.map((day) => (
                  <div
                    key={day.id}
                    className={`p-4 rounded-xl border transition-all flex items-start gap-3.5 ${
                      day.completed
                        ? 'border-emerald-200 dark:border-emerald-950/60 bg-emerald-50/30 dark:bg-emerald-950/10'
                        : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 shadow-xs'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => handleToggleDay(day.id)}
                      aria-label={`Mark ${day.dateLabel} ${day.completed ? 'incomplete' : 'complete'}`}
                      className={`mt-0.5 w-5 h-5 rounded-md flex items-center justify-center shrink-0 transition-colors ${
                        day.completed
                          ? 'bg-emerald-600 text-white'
                          : 'border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-indigo-500'
                      }`}
                    >
                      {day.completed && <CheckCircle2 className="w-3.5 h-3.5" />}
                    </button>

                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
                          {day.dateLabel}
                        </span>
                        <span className="text-slate-300 dark:text-slate-700">·</span>
                        <span className="text-xs font-bold text-slate-900 dark:text-white">
                          {day.handoutRange}
                        </span>
                        {day.completed && (
                          <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950 px-1.5 py-0.2 rounded">
                            Done (+1 🐟 Milo)
                          </span>
                        )}
                      </div>

                      <div className="text-[11px] text-slate-500 flex items-center gap-1.5 mb-2">
                        <Clock className="w-3 h-3 text-slate-400 shrink-0" />
                        <span>{day.suggestedSlot}</span>
                      </div>

                      <ul className="space-y-1 text-xs text-slate-600 dark:text-slate-300">
                        {day.tasks.map((task, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <span className="text-indigo-500 shrink-0 font-bold">·</span>
                            <span>{task}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="p-8 text-center rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 text-slate-400 text-xs">
              No study plan generated yet. Fill in your handouts target and timing on the left to create your plan!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
