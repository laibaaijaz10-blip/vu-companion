import React, { useState } from 'react';
import { calculateVUGpa, VUGpaEntry, getVUGradePoints } from '../utils/vuLogic';
import { VU_COURSES } from '../utils/vuCoursesData';
import {
  Calculator,
  Plus,
  Trash2,
  Award,
  AlertTriangle,
  HelpCircle,
  TrendingUp,
  RotateCcw,
} from 'lucide-react';

export const VUGpaCalculator: React.FC = () => {
  const [entries, setEntries] = useState<VUGpaEntry[]>([
    { courseCode: 'CS201', credits: 3, marksOrGrade: 'A' },
    { courseCode: 'CS201P', credits: 1, marksOrGrade: 'A-' },
    { courseCode: 'CS301', credits: 3, marksOrGrade: 'B+' },
    { courseCode: 'MTH101', credits: 3, marksOrGrade: 'B' },
    { courseCode: 'ENG101', credits: 3, marksOrGrade: 'A-' },
  ]);

  const [priorCgpa, setPriorCgpa] = useState<string>('3.20');
  const [priorCredits, setPriorCredits] = useState<string>('30');

  const gpaResult = calculateVUGpa(entries);

  // Cumulative CGPA calculation
  const parsedPriorCgpa = parseFloat(priorCgpa) || 0;
  const parsedPriorCredits = parseFloat(priorCredits) || 0;

  const totalAllCredits = parsedPriorCredits + gpaResult.totalCredits;
  const totalAllQualityPoints = parsedPriorCgpa * parsedPriorCredits + gpaResult.totalQualityPoints;
  const cumulativeCgpa =
    totalAllCredits > 0 ? Math.round((totalAllQualityPoints / totalAllCredits) * 100) / 100 : 0;

  const handleAddRow = () => {
    setEntries((prev) => [
      ...prev,
      { courseCode: `CS${Math.floor(Math.random() * 400 + 200)}`, credits: 3, marksOrGrade: 'B' },
    ]);
  };

  const handleRemoveRow = (index: number) => {
    setEntries((prev) => prev.filter((_, i) => i !== index));
  };

  const handleUpdateEntry = (index: number, field: keyof VUGpaEntry, value: any) => {
    setEntries((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item))
    );
  };

  const handleReset = () => {
    setEntries([
      { courseCode: 'CS201', credits: 3, marksOrGrade: 'A' },
      { courseCode: 'CS201P', credits: 1, marksOrGrade: 'A-' },
      { courseCode: 'CS301', credits: 3, marksOrGrade: 'B+' },
      { courseCode: 'MTH101', credits: 3, marksOrGrade: 'B' },
    ]);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-950 via-slate-900 to-indigo-950 text-white shadow-sm border border-slate-800">
        <div className="flex items-center gap-2 text-xs font-semibold text-purple-400 mb-1">
          <Calculator className="w-4 h-4" />
          <span>Official 4.0 Quality Point Scale</span>
          <span aria-hidden="true">·</span>
          <span>Semester & Cumulative CGPA Predictor</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
          VU Official GPA / CGPA Calculator
        </h2>
        <p className="mt-1 text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
          Virtual University grading formula (85%+ = 4.0, 80-84% = 3.66, 75-79% = 3.33, etc.) k mutabiq apna
          semester GPA aur total CGPA accurately calculate karein.
        </p>
      </div>

      {/* Main Grid: Calculator Table (Left 7 Cols) & KPI Card (Right 5 Cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Course Rows Form (7 Cols) */}
        <div className="lg:col-span-7 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Current Semester Courses ({entries.length})
            </h3>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleReset}
                className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 flex items-center gap-1"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
              <button
                type="button"
                onClick={handleAddRow}
                className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Course</span>
              </button>
            </div>
          </div>

          <div className="space-y-2">
            {entries.map((entry, idx) => {
              const { gradePoint, letterGrade } = getVUGradePoints(entry.marksOrGrade);
              const qualityPoints = Math.round(Number(entry.credits) * gradePoint * 100) / 100;

              return (
                <div
                  key={idx}
                  className="p-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/30 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 text-xs"
                >
                  <div className="flex items-center gap-2 flex-1">
                    <input
                      type="text"
                      value={entry.courseCode}
                      onChange={(e) => handleUpdateEntry(idx, 'courseCode', e.target.value.toUpperCase())}
                      placeholder="Course Code"
                      className="w-24 px-2 py-1.5 font-mono font-bold rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 uppercase text-xs"
                    />

                    <select
                      value={entry.credits}
                      onChange={(e) => handleUpdateEntry(idx, 'credits', Number(e.target.value))}
                      className="px-2 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-medium"
                    >
                      <option value="1">1 Credit</option>
                      <option value="2">2 Credits</option>
                      <option value="3">3 Credits</option>
                      <option value="4">4 Credits</option>
                    </select>

                    <select
                      value={entry.marksOrGrade}
                      onChange={(e) => handleUpdateEntry(idx, 'marksOrGrade', e.target.value)}
                      className="px-2 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold"
                    >
                      <option value="A">A (4.00 · 85%+)</option>
                      <option value="A-">A- (3.66 · 80-84%)</option>
                      <option value="B+">B+ (3.33 · 75-79%)</option>
                      <option value="B">B (3.00 · 71-74%)</option>
                      <option value="B-">B- (2.66 · 68-70%)</option>
                      <option value="C+">C+ (2.33 · 64-67%)</option>
                      <option value="C">C (2.00 · 61-63%)</option>
                      <option value="C-">C- (1.66 · 58-60%)</option>
                      <option value="D+">D+ (1.30 · 54-57%)</option>
                      <option value="D">D (1.00 · 50-53%)</option>
                      <option value="F">F (0.00 · Fail)</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-3 text-slate-600 dark:text-slate-400">
                    <span className="tabular-nums font-semibold text-slate-900 dark:text-white">
                      QP: {qualityPoints.toFixed(2)}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleRemoveRow(idx)}
                      disabled={entries.length <= 1}
                      className="p-1 text-slate-400 hover:text-rose-500 disabled:opacity-30"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Cumulative Predictor Inputs */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block mb-2">
              Previous Semesters Standing (Optional for Cumulative CGPA):
            </span>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <label className="text-slate-600 dark:text-slate-400 block mb-1">
                  Previous Cumulative CGPA:
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  max="4"
                  value={priorCgpa}
                  onChange={(e) => setPriorCgpa(e.target.value)}
                  placeholder="e.g. 3.25"
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200"
                />
              </div>

              <div>
                <label className="text-slate-600 dark:text-slate-400 block mb-1">
                  Previous Total Credit Hours:
                </label>
                <input
                  type="number"
                  min="0"
                  value={priorCredits}
                  onChange={(e) => setPriorCredits(e.target.value)}
                  placeholder="e.g. 36"
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Results Card (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-6">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Award className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <span>Calculated Academic Standing</span>
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900">
                <span className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold block">
                  Semester GPA
                </span>
                <div className="mt-1 text-3xl font-black text-indigo-700 dark:text-indigo-300 tabular-nums">
                  {gpaResult.gpa.toFixed(2)}
                </div>
                <span className="text-[11px] text-slate-500 mt-1 block">
                  {gpaResult.passedCredits} / {gpaResult.totalCredits} credits passed
                </span>
              </div>

              <div className="p-4 rounded-xl bg-purple-50/60 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-900">
                <span className="text-xs text-purple-600 dark:text-purple-400 font-semibold block">
                  Projected CGPA
                </span>
                <div className="mt-1 text-3xl font-black text-purple-700 dark:text-purple-300 tabular-nums">
                  {cumulativeCgpa.toFixed(2)}
                </div>
                <span className="text-[11px] text-slate-500 mt-1 block">
                  Total {totalAllCredits} credit hours
                </span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 text-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Total Quality Points (QP):</span>
                <span className="font-bold text-slate-900 dark:text-white tabular-nums">
                  {gpaResult.totalQualityPoints.toFixed(2)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">VU Academic Status:</span>
                <span
                  className={`font-bold ${
                    gpaResult.gpa >= 3.5
                      ? 'text-emerald-600 dark:text-emerald-400'
                      : gpaResult.gpa >= 2.0
                      ? 'text-indigo-600 dark:text-indigo-400'
                      : 'text-rose-600 dark:text-rose-400'
                  }`}
                >
                  {gpaResult.gpa >= 3.5
                    ? "Rector's Merit List Candidate"
                    : gpaResult.gpa >= 2.0
                    ? 'Good Academic Standing'
                    : 'Academic Probation Warning'}
                </span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 text-xs text-amber-900 dark:text-amber-200">
              💡 <strong>VU Rule:</strong> To earn your Bachelor degree, you must maintain a minimum cumulative CGPA of 2.00 (Master programs require 2.50).
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
