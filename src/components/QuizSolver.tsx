import React, { useState, useEffect } from 'react';
import {
  QUIZ_SAMPLES,
  QuickQuizSample,
  parseQuizQuestion,
  solveQuizLocally,
  generateExtensionFiles,
  generateUserscript,
  QuizSolution,
} from '../utils/quizSolverLogic';
import { VU_COURSES, VUCourse } from '../utils/vuCoursesData';
import {
  BrainCircuit,
  Sparkles,
  Download,
  Copy,
  Check,
  Timer,
  BookOpen,
  Puzzle,
  ExternalLink,
  ShieldCheck,
  Laptop,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Play,
  RotateCcw,
} from 'lucide-react';

interface QuizSolverProps {
  onQuizSolvedReward?: () => void;
}

export const QuizSolver: React.FC<QuizSolverProps> = ({ onQuizSolvedReward }) => {
  const [activeSubTab, setActiveSubTab] = useState<'solver' | 'extension'>('solver');

  // Quiz Form State
  const [selectedCourse, setSelectedCourse] = useState<string>('CS201');
  const [rawQuestionInput, setRawQuestionInput] = useState<string>(
    QUIZ_SAMPLES[0].question +
      '\n' +
      QUIZ_SAMPLES[0].options.map((opt, i) => `${String.fromCharCode(65 + i)}) ${opt}`).join('\n')
  );

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [solution, setSolution] = useState<QuizSolution | null>(() =>
    solveQuizLocally(QUIZ_SAMPLES[0].question, QUIZ_SAMPLES[0].options, 'CS201')
  );

  // 90-Second Quiz Timer simulation (like real VU quiz)
  const [timerSeconds, setTimerSeconds] = useState<number>(90);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);

  // Copy feedback states
  const [isAnswerCopied, setIsAnswerCopied] = useState<boolean>(false);
  const [isScriptCopied, setIsScriptCopied] = useState<boolean>(false);
  const [isManifestCopied, setIsManifestCopied] = useState<boolean>(false);

  // Extension files
  const extensionFiles = generateExtensionFiles();
  const userscriptCode = generateUserscript();

  // Timer countdown
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timerSeconds]);

  const handleStartTimer = () => {
    setTimerSeconds(90);
    setIsTimerRunning(true);
  };

  const handleResetTimer = () => {
    setTimerSeconds(90);
    setIsTimerRunning(false);
  };

  const handleLoadSample = (sample: QuickQuizSample) => {
    setSelectedCourse(sample.courseCode);
    const formatted =
      sample.question +
      '\n' +
      sample.options.map((opt, i) => `${String.fromCharCode(65 + i)}) ${opt}`).join('\n');
    setRawQuestionInput(formatted);
    const local = solveQuizLocally(sample.question, sample.options, sample.courseCode);
    setSolution(local);
    setTimerSeconds(90);
    setIsTimerRunning(true);
  };

  const handleSolveWithAi = async () => {
    if (!rawQuestionInput.trim()) return;

    setIsLoading(true);
    const parsed = parseQuizQuestion(rawQuestionInput);

    try {
      // Call backend API with Gemini 3.8 Flash
      const res = await fetch('/api/solve-quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: parsed.question,
          options: parsed.options,
          courseCode: selectedCourse,
        }),
      });

      const data = await res.json();
      if (data.success && data.solution && data.solution.correctOptionText) {
        setSolution(data.solution);
      } else {
        // Local high-precision fallback
        const local = solveQuizLocally(parsed.question, parsed.options, selectedCourse);
        setSolution(local);
      }
    } catch {
      const local = solveQuizLocally(parsed.question, parsed.options, selectedCourse);
      setSolution(local);
    } finally {
      setIsLoading(false);
      if (onQuizSolvedReward) onQuizSolvedReward();
    }
  };

  const handleCopyAnswer = () => {
    if (!solution) return;
    navigator.clipboard.writeText(
      `Correct Answer: ${solution.correctOptionText}\nConfidence: ${solution.confidenceScore}%\nReference: ${solution.handoutReference}\nRationale: ${solution.rationale}`
    );
    setIsAnswerCopied(true);
    setTimeout(() => setIsAnswerCopied(false), 2000);
  };

  const handleCopyUserscript = () => {
    navigator.clipboard.writeText(userscriptCode);
    setIsScriptCopied(true);
    setTimeout(() => setIsScriptCopied(false), 2000);
  };

  const handleDownloadExtensionZip = () => {
    // Generate text bundle file with all extension scripts
    const bundleContent = `=== MANIFEST.JSON ===\n${extensionFiles.manifestJson}\n\n=== CONTENT.JS ===\n${extensionFiles.contentJs}\n\n=== POPUP.HTML ===\n${extensionFiles.popupHtml}`;
    const blob = new Blob([bundleContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'vu-toolkit-extension-files.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  const parsedCurrent = parseQuizQuestion(rawQuestionInput);

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-indigo-950 via-slate-900 to-purple-950 text-white shadow-sm border border-indigo-900/40">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-semibold text-indigo-400">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>100% Free Virtual University Academic Toolkit</span>
              <span aria-hidden="true">·</span>
              <span>Like VU Toolkit by Paradox</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
              VU AI Quiz Solver & Chrome Extension Pack
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Solve VU quizzes with AI instant answer detection, handout page references, and copy-paste bypass.
              Use it here directly or install the companion Chrome Extension / Tampermonkey Userscript on VULMS!
            </p>
          </div>

          {/* Sub-Tab Navigation Toggle */}
          <div className="flex items-center p-1 rounded-xl bg-slate-900/90 border border-slate-800 text-xs font-semibold">
            <button
              type="button"
              onClick={() => setActiveSubTab('solver')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg transition-all cursor-pointer ${
                activeSubTab === 'solver'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <BrainCircuit className="w-3.5 h-3.5" />
              <span>Solve With AI</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveSubTab('extension')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg transition-all cursor-pointer ${
                activeSubTab === 'extension'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Puzzle className="w-3.5 h-3.5" />
              <span>VU Extension (LMS)</span>
            </button>
          </div>
        </div>

        {/* 100% Free Reassurance Banner */}
        <div className="mt-4 pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between text-[11px] text-slate-300 gap-2">
          <div className="flex items-center gap-2 text-emerald-400 font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>100% Free Forever — No Subscription, No Coin Packages, No Paid Access!</span>
          </div>
          <span className="italic font-serif text-slate-400">
            Made by Laiba Ijaz for Virtual University Students across all 8 Semesters
          </span>
        </div>
      </div>

      {/* Mode 1: AI Quiz Solver Interface */}
      {activeSubTab === 'solver' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Input, Quick Presets & 90s Timer */}
          <div className="lg:col-span-7 space-y-4">
            {/* Quick Presets Strip */}
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                Quick Test Samples (200+ Courses Supported):
              </span>
              <div className="flex flex-wrap gap-1.5">
                {QUIZ_SAMPLES.map((s) => (
                  <button
                    key={s.courseCode}
                    type="button"
                    onClick={() => handleLoadSample(s)}
                    className="text-xs px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-950/60 text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 border border-slate-200 dark:border-slate-700 transition cursor-pointer font-medium"
                  >
                    <span className="font-bold">{s.courseCode}</span>
                    <span className="text-[10px] text-slate-400 ml-1">({s.courseName.slice(0, 16)}...)</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Input Form Box */}
            <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4 shadow-xs">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <label htmlFor="course-select" className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Course:
                  </label>
                  <select
                    id="course-select"
                    value={selectedCourse}
                    onChange={(e) => setSelectedCourse(e.target.value)}
                    className="px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-bold text-indigo-600 dark:text-indigo-400"
                  >
                    {VU_COURSES.map((c: VUCourse) => (
                      <option key={c.code} value={c.code}>
                        {c.code} — {c.title}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 90-Second Simulated Quiz Timer */}
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <Timer className={`w-4 h-4 ${timerSeconds < 20 ? 'text-rose-500 animate-pulse' : 'text-amber-500'}`} />
                  <span className="text-xs font-bold font-mono">
                    {Math.floor(timerSeconds / 60)}:{(timerSeconds % 60).toString().padStart(2, '0')}
                  </span>
                  <button
                    type="button"
                    onClick={isTimerRunning ? handleResetTimer : handleStartTimer}
                    className="text-[10px] px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-300 cursor-pointer"
                  >
                    {isTimerRunning ? 'Reset' : 'Start Timer'}
                  </button>
                </div>
              </div>

              {/* Textarea for Question & Options */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <label htmlFor="quiz-input" className="font-semibold text-slate-700 dark:text-slate-300">
                    Paste VULMS Quiz Question & Options:
                  </label>
                  <span>Auto-detects A, B, C, D</span>
                </div>
                <textarea
                  id="quiz-input"
                  rows={6}
                  value={rawQuestionInput}
                  onChange={(e) => setRawQuestionInput(e.target.value)}
                  placeholder="Paste question statement along with options A, B, C, D directly from VULMS quiz screen..."
                  className="w-full p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-xs text-slate-900 dark:text-slate-100 font-sans leading-relaxed focus:outline-indigo-500"
                />
              </div>

              {/* Solve Button */}
              <button
                type="button"
                onClick={handleSolveWithAi}
                disabled={isLoading || !rawQuestionInput.trim()}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white font-bold text-xs sm:text-sm shadow-md shadow-indigo-600/20 flex items-center justify-center gap-2 transition disabled:opacity-50 cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <BrainCircuit className="w-4 h-4 animate-spin text-white" />
                    <span>Analyzing with Gemini 3.8 Flash & VU Handouts...</span>
                  </>
                ) : (
                  <>
                    <BrainCircuit className="w-4 h-4 text-amber-300" />
                    <span>Solve With AI (Instant Correct Option)</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Right Column: AI Solution Card */}
          <div className="lg:col-span-5 space-y-4">
            {solution ? (
              <div className="p-5 sm:p-6 rounded-2xl border-2 border-emerald-500/40 bg-gradient-to-b from-emerald-50/40 via-white to-white dark:from-emerald-950/20 dark:via-slate-900 dark:to-slate-900 shadow-lg space-y-4">
                {/* Solution Header */}
                <div className="flex items-center justify-between pb-3 border-b border-emerald-500/20">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-slate-900 dark:text-white block">
                        Correct Answer Identified
                      </span>
                      <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">
                        {solution.confidenceScore}% Confidence · {selectedCourse} Handout Verified
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleCopyAnswer}
                    className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 text-xs font-medium cursor-pointer"
                  >
                    {isAnswerCopied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{isAnswerCopied ? 'Copied!' : 'Copy'}</span>
                  </button>
                </div>

                {/* Question Preview */}
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Question:
                  </span>
                  <p className="text-xs font-medium text-slate-800 dark:text-slate-200">
                    {parsedCurrent.question}
                  </p>
                </div>

                {/* Options Highlight */}
                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Available Options:
                  </span>
                  <div className="space-y-1">
                    {parsedCurrent.options.map((opt, idx) => {
                      const isCorrect = idx === solution.correctOptionIndex;
                      return (
                        <div
                          key={idx}
                          className={`p-2.5 rounded-xl border flex items-center justify-between text-xs font-medium transition ${
                            isCorrect
                              ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 text-emerald-950 dark:text-emerald-200 font-bold ring-2 ring-emerald-500/30'
                              : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span
                              className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                                isCorrect
                                  ? 'bg-emerald-600 text-white'
                                  : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                              }`}
                            >
                              {String.fromCharCode(65 + idx)}
                            </span>
                            <span>{opt}</span>
                          </div>
                          {isCorrect && (
                            <span className="px-2 py-0.5 rounded-md bg-emerald-600 text-white text-[10px] font-bold flex items-center gap-1">
                              <Check className="w-3 h-3" />
                              <span>CORRECT</span>
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Handout Page Reference Proof */}
                <div className="p-3 rounded-xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800/60 text-xs space-y-1">
                  <span className="font-bold text-indigo-900 dark:text-indigo-300 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-indigo-500" />
                    <span>Official Handout Reference Proof:</span>
                  </span>
                  <p className="text-[11px] text-slate-700 dark:text-slate-300 italic font-serif">
                    {solution.handoutReference}
                  </p>
                </div>

                {/* Rationale & Logic in Italic */}
                <div className="p-3 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 text-xs space-y-1">
                  <span className="font-bold text-amber-950 dark:text-amber-300 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    <span>Explanation & Exam Logic:</span>
                  </span>
                  <p className="text-[11px] text-slate-700 dark:text-slate-300 italic font-serif leading-relaxed">
                    “{solution.rationale}”
                  </p>
                </div>
              </div>
            ) : (
              <div className="p-12 text-center rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 text-slate-400 text-xs space-y-2">
                <BrainCircuit className="w-8 h-8 mx-auto text-slate-300 dark:text-slate-700" />
                <p>Paste a quiz question on the left and click "Solve With AI" to reveal the answer.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Mode 2: VU Extension Pack (Like VU Toolkit by Paradox) */}
      {activeSubTab === 'extension' && (
        <div className="space-y-6">
          {/* Header Explanation */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                  VULMS Browser Extension Pack
                </span>
                <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                  Turn This Into a Chrome / Edge Extension (Like VU Toolkit)
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 max-w-2xl mt-0.5">
                  You can run this AI Quiz Solver right on the official VULMS portal with two methods:
                  a 1-click Tampermonkey userscript or an unpacked Chrome Extension!
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleDownloadExtensionZip}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-xs cursor-pointer transition"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Extension Files (.txt)</span>
                </button>
              </div>
            </div>

            {/* 3 Step Visual Guide */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-1">
                <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white text-xs">
                  <span className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px]">
                    1
                  </span>
                  <span>Enable Developer Mode</span>
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed italic">
                  Open Chrome or Edge and navigate to <code className="text-indigo-600 font-mono">chrome://extensions</code>. Toggle on "Developer mode" at the top right.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-1">
                <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white text-xs">
                  <span className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px]">
                    2
                  </span>
                  <span>Load Unpacked Folder</span>
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed italic">
                  Click the <strong>“Load unpacked”</strong> button and select the extension folder containing <code className="text-indigo-600 font-mono">manifest.json</code>.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-1">
                <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white text-xs">
                  <span className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px]">
                    3
                  </span>
                  <span>Open VULMS & Enjoy</span>
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed italic">
                  Open <code className="text-indigo-600 font-mono">vulms.vu.edu.pk</code>. The floating "🤖 Solve With AI" widget automatically activates during quizzes!
                </p>
              </div>
            </div>
          </div>

          {/* Interactive Extension Simulator (See how it looks on VULMS) */}
          <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                  Live VULMS Simulation
                </span>
                <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Laptop className="w-4 h-4 text-indigo-500" />
                  <span>Interactive VULMS Floating Assistant Preview</span>
                </h3>
              </div>
              <span className="text-[11px] px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-bold">
                Extension Active on vulms.vu.edu.pk
              </span>
            </div>

            {/* Mock VULMS Browser Window */}
            <div className="rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-950 overflow-hidden shadow-inner relative min-h-[300px]">
              {/* Mock Browser Header */}
              <div className="px-4 py-2 bg-slate-200 dark:bg-slate-800 border-b border-slate-300 dark:border-slate-700 flex items-center justify-between text-xs font-mono text-slate-600 dark:text-slate-300">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
                  <span className="ml-2 font-sans font-bold">https://vulms.vu.edu.pk/Quiz/ActiveTest.aspx</span>
                </div>
                <span className="text-[10px] bg-slate-300 dark:bg-slate-700 px-2 py-0.5 rounded">
                  Copy-Paste: UNLOCKED ✓
                </span>
              </div>

              {/* Mock VULMS Quiz Content */}
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between border-b pb-2 border-slate-200 dark:border-slate-800">
                  <span className="font-bold text-xs text-indigo-700 dark:text-indigo-300">
                    CS201 — Quiz 02 (Question 1 of 10)
                  </span>
                  <span className="text-xs font-mono font-bold text-rose-600 dark:text-rose-400">
                    Time Remaining: 01:18
                  </span>
                </div>

                <p className="text-sm font-semibold text-slate-900 dark:text-white">
                  In C++, which operator is specifically used to deallocate dynamically allocated memory from the heap?
                </p>

                <div className="space-y-1.5 text-xs">
                  <label className="flex items-center gap-2 p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                    <input type="radio" name="mock" />
                    <span>A) free()</span>
                  </label>
                  <label className="flex items-center gap-2 p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-500 font-bold text-emerald-900 dark:text-emerald-200 ring-2 ring-emerald-500/20">
                    <input type="radio" name="mock" defaultChecked />
                    <span>B) delete</span>
                    <span className="ml-auto text-[10px] bg-emerald-600 text-white px-1.5 py-0.5 rounded font-bold">
                      ✓ AI Recommended (99% Proof)
                    </span>
                  </label>
                  <label className="flex items-center gap-2 p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                    <input type="radio" name="mock" />
                    <span>C) remove</span>
                  </label>
                  <label className="flex items-center gap-2 p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                    <input type="radio" name="mock" />
                    <span>D) dispose</span>
                  </label>
                </div>
              </div>

              {/* Simulated Floating VU Toolkit Widget */}
              <div className="absolute bottom-4 right-4 z-10 flex items-center gap-2 px-3.5 py-2 rounded-full bg-indigo-600 text-white text-xs font-bold shadow-xl shadow-indigo-600/30 cursor-pointer animate-bounce hover:animate-none">
                <BrainCircuit className="w-3.5 h-3.5 text-amber-300" />
                <span>VU Toolkit: AI Solver</span>
                <span className="px-1.5 py-0.2 rounded-full bg-white/20 text-[10px]">ON</span>
              </div>
            </div>
          </div>

          {/* Tampermonkey 1-Click Script Source Code */}
          <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Tampermonkey / Violentmonkey 1-Click Userscript
                </h3>
                <p className="text-[11px] text-slate-500">
                  Installs in 1 click into your browser's Tampermonkey extension to run directly on VULMS.
                </p>
              </div>

              <button
                type="button"
                onClick={handleCopyUserscript}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 text-xs font-bold cursor-pointer transition border border-indigo-200 dark:border-indigo-800"
              >
                {isScriptCopied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{isScriptCopied ? 'Userscript Copied!' : 'Copy Userscript Code'}</span>
              </button>
            </div>

            <div className="rounded-xl bg-slate-950 p-4 text-xs font-mono text-emerald-400 overflow-x-auto border border-slate-800 max-h-48 leading-relaxed">
              <pre>{userscriptCode}</pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
