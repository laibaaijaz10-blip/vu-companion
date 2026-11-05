import React, { useState } from 'react';
import {
  VU_MAJORS,
  CourseItem,
  filterCoursesBySemesterAndMajor,
  generateDeepConceptExplanation,
  DeepConceptExplanation,
} from '../utils/conceptGenerator';
import {
  Lightbulb,
  Sparkles,
  Copy,
  Check,
  Code2,
  BookmarkCheck,
  FileText,
  Layers,
  GraduationCap,
  ArrowRight,
  HelpCircle,
  FlaskConical,
  Atom,
  ChevronRight,
  AlertCircle,
  BookOpen,
} from 'lucide-react';

interface ConceptFinderProps {
  onConceptResolved: (topic: string) => void;
}

export const ConceptFinder: React.FC<ConceptFinderProps> = ({ onConceptResolved }) => {
  // Semester filter (1 to 8 or 'all')
  const [selectedSemester, setSelectedSemester] = useState<number | 'all'>('all');
  // Major department filter
  const [selectedMajorId, setSelectedMajorId] = useState<string>('cs-it');

  // Input states: student types course code and topic freely
  const [courseCodeInput, setCourseCodeInput] = useState<string>('BIO5101');
  const [topicInput, setTopicInput] = useState<string>('Carbohydrates (Structure, Synthesis & Classification)');
  const [doubtInput, setDoubtInput] = useState<string>('What are they, how do they form, and what are their major classes?');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  // Active deep concept explanation state
  const [explanation, setExplanation] = useState<DeepConceptExplanation>(() =>
    generateDeepConceptExplanation(
      'edu-others',
      'BIO5101',
      'Carbohydrates',
      7
    )
  );

  // Optional AI server markdown response if Gemini API key is configured
  const [aiCustomMarkdown, setAiCustomMarkdown] = useState<string | null>(null);

  const activeMajor = VU_MAJORS.find((m) => m.id === selectedMajorId) || VU_MAJORS[0];
  const suggestedCourses = filterCoursesBySemesterAndMajor(selectedSemester, selectedMajorId);

  // Quick preset topics for immediate demonstration across disciplines
  const quickDemonstrations = [
    {
      label: 'BIO5101: Carbohydrates (What, How, Majors)',
      code: 'BIO5101',
      topic: 'Carbohydrates (Structure, Synthesis & Classification)',
      doubt: 'What are they, how are they formed, and what are their major classes?',
      majorId: 'edu-others',
      sem: 7,
    },
    {
      label: 'CS402: Theory of Automata (DFA to NFA)',
      code: 'CS402',
      topic: 'Deterministic Finite Automata (DFA) & State Transitions',
      doubt: 'How does transition table work and what are the major state types?',
      majorId: 'cs-it',
      sem: 4,
    },
    {
      label: 'CS403: Database Normalization (3NF & BCNF)',
      code: 'CS403',
      topic: 'Database Normalization (1NF, 2NF, 3NF & BCNF)',
      doubt: 'Why do we normalize and how to identify transitive dependency?',
      majorId: 'cs-it',
      sem: 4,
    },
    {
      label: 'MGT201: Capital Budgeting & NPV',
      code: 'MGT201',
      topic: 'Capital Budgeting & Net Present Value (NPV)',
      doubt: 'How to calculate NPV and why is cash flow discounted?',
      majorId: 'mgmt-business',
      sem: 3,
    },
    {
      label: 'MTH501: Linear Algebra & Vector Spaces',
      code: 'MTH501',
      topic: 'Vector Spaces & Linear Independence',
      doubt: 'What is basis and how to verify linear independence?',
      majorId: 'math-stats',
      sem: 5,
    },
  ];

  const handleSelectSuggestedCourse = (course: CourseItem) => {
    setCourseCodeInput(course.code);
    setTopicInput(`Core Handouts Concept for ${course.code}`);
  };

  const handleApplyPreset = (preset: typeof quickDemonstrations[0]) => {
    setCourseCodeInput(preset.code);
    setTopicInput(preset.topic);
    setDoubtInput(preset.doubt);
    setSelectedMajorId(preset.majorId);
    setSelectedSemester(preset.sem);
    setAiCustomMarkdown(null);
    const deep = generateDeepConceptExplanation(preset.majorId, preset.code, preset.topic, preset.sem);
    setExplanation(deep);
    onConceptResolved(preset.topic);
  };

  const handleResolveConcept = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!courseCodeInput.trim() || !topicInput.trim()) return;

    setIsLoading(true);
    setAiCustomMarkdown(null);

    // Try server-side Gemini API route first if configured
    try {
      const res = await fetch('/api/concept-clear', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          courseCode: courseCodeInput.trim().toUpperCase(),
          topic: topicInput.trim(),
          doubt: doubtInput.trim(),
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.success && data.explanation) {
          setAiCustomMarkdown(data.explanation);
          onConceptResolved(topicInput);
          setIsLoading(false);
          return;
        }
      }
    } catch {
      // Seamlessly fall back to high-fidelity offline curriculum engine
    }

    // High fidelity offline deep concept generator
    const generated = generateDeepConceptExplanation(
      selectedMajorId,
      courseCodeInput.trim(),
      topicInput.trim() + (doubtInput.trim() ? ` (${doubtInput.trim()})` : ''),
      selectedSemester === 'all' ? '1-8' : selectedSemester
    );

    setExplanation(generated);
    onConceptResolved(topicInput);
    setIsLoading(false);
  };

  const handleCopy = async () => {
    const text = `=====================================================
VU DEEP CONCEPT REPORT: [${explanation.courseCode}] ${explanation.topic}
Semester: ${explanation.semesterNumber} | Department: ${explanation.majorName}
=====================================================

1. 📌 WHAT IS IT? (Kia Hai?)
Definition:
${explanation.whatIsIt.definition}

Technical/Chemical Specification:
${explanation.whatIsIt.chemicalOrTechnicalForm}

Key Characteristics:
${explanation.whatIsIt.keyCharacteristics.map((c) => `• ${c}`).join('\n')}

2. 💡 WHY DOES IT MATTER? (Kyun Zaroori Hai?)
Purpose: ${explanation.whyItMatters.purpose}
Biological/System Role: ${explanation.whyItMatters.biologicalOrSystemRole}
Real-World Impact: ${explanation.whyItMatters.realWorldValue}

3. ⚙️ HOW DOES IT FORM / WORK? (Kese Banta Hai / Kaam Karta Hai?)
Formation Process: ${explanation.howItWorksOrForms.formationProcess}
Mechanism / Formula / Code:
${explanation.howItWorksOrForms.mechanismOrSyntax}

Step-by-Step Flow:
${explanation.howItWorksOrForms.stepByStepFlow.map((s) => `• ${s}`).join('\n')}

4. 🗂️ MAJOR TYPES & CLASSIFICATIONS:
${explanation.majorTypesAndClassifications.categoryName}
${explanation.majorTypesAndClassifications.types.map((t) => `• ${t.name}\n  Details: ${t.description}\n  Examples: ${t.examples}`).join('\n\n')}

5. 🗣️ ASAAN ALFAAZ & ROZMARRAH KI MISAAL (Roman Urdu):
${explanation.romanUrduAnalogy.title}
${explanation.romanUrduAnalogy.analogyText}
Takeaway: ${explanation.romanUrduAnalogy.dailyLifeExample}

6. 🎯 VU EXAM MIDTERM/FINALTERM PAST PAPERS SECRET:
Common Questions: ${explanation.vuExamPastPaperSecret.commonQuestionTypes}
5-Marks Long Question: ${explanation.vuExamPastPaperSecret.fiveMarksTopic}
MCQ Trick: ${explanation.vuExamPastPaperSecret.mcqTrick}
=====================================================`;

    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner with Pedagogical Promise */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-950 via-slate-900 to-indigo-950 text-white shadow-sm border border-slate-800">
        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-emerald-400 mb-1.5">
          <Sparkles className="w-4 h-4" />
          <span>In-Depth Conceptual Clarity: WHAT · WHY · HOW · MAJOR TYPES</span>
          <span aria-hidden="true" className="text-slate-500">·</span>
          <span>All 8 Semesters & 200+ Courses Supported</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
          Concept Finder — Depth Mein Jao, Video Lecture Rewatch Mat Karo!
        </h2>
        <p className="mt-1 text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
          Kissi bhi concept k lie 50-minute ka lecture dobara dekhne ki zaroorat nahi. Concept Finder har topic ko
          gehraai (depth) mein khol kar samjhata hai: <strong className="text-white">Kia Hai (What)</strong>,{' '}
          <strong className="text-white">Kyun Hai (Why)</strong>,{' '}
          <strong className="text-white">Kese Banta Hai (How)</strong>, aur{' '}
          <strong className="text-white">Inki Major Classifications Kia Hain</strong>, sath mein asaan Roman Urdu misaal aur VU past paper secrets!
        </p>

        {/* Quick Demo Presets Strip */}
        <div className="mt-4 pt-3 border-t border-slate-800/80 flex flex-wrap items-center gap-2">
          <span className="text-[11px] text-slate-400 font-semibold flex items-center gap-1">
            <FlaskConical className="w-3.5 h-3.5 text-emerald-400" />
            <span>Try Instant Examples:</span>
          </span>
          {quickDemonstrations.map((preset) => (
            <button
              key={preset.code}
              type="button"
              onClick={() => handleApplyPreset(preset)}
              className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors flex items-center gap-1"
            >
              <span>{preset.label}</span>
              <ChevronRight className="w-3 h-3 text-slate-400" />
            </button>
          ))}
        </div>
      </div>

      {/* 8-Semester Selector Strip */}
      <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
            <GraduationCap className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span>Select Your Semester (1 to 8):</span>
          </span>
          <span className="text-[11px] text-slate-400">
            {selectedSemester === 'all' ? 'All Semesters (1 to 8)' : `Focusing on Semester ${selectedSemester}`}
          </span>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-9 gap-1.5 text-xs font-semibold">
          <button
            type="button"
            onClick={() => setSelectedSemester('all')}
            className={`py-2 px-2.5 rounded-lg border text-center transition-colors ${
              selectedSemester === 'all'
                ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-indigo-400'
            }`}
          >
            All (1 - 8)
          </button>

          {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
            <button
              key={sem}
              type="button"
              onClick={() => setSelectedSemester(sem)}
              className={`py-2 px-2 rounded-lg border text-center transition-colors ${
                selectedSemester === sem
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-indigo-400'
              }`}
            >
              Sem {sem}
            </button>
          ))}
        </div>
      </div>

      {/* Major Departments Cards Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {VU_MAJORS.map((m) => {
          const isSelected = m.id === selectedMajorId;
          return (
            <button
              key={m.id}
              type="button"
              onClick={() => setSelectedMajorId(m.id)}
              className={`p-3 rounded-xl border text-left transition-all ${
                isSelected
                  ? 'border-indigo-600 dark:border-indigo-500 bg-indigo-50/50 dark:bg-indigo-950/40 shadow-xs ring-1 ring-indigo-500'
                  : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300'
              }`}
            >
              <span className="text-xs font-bold text-slate-900 dark:text-white block leading-tight">
                {m.name}
              </span>
              <span className="mt-1 text-[10px] text-slate-500 dark:text-slate-400 line-clamp-1">
                {m.description}
              </span>
            </button>
          );
        })}
      </div>

      {/* Main Grid: Input Form (Left 5 Cols) + Depth Explanation (Right 7 Cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Form (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          <form
            onSubmit={handleResolveConcept}
            className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4"
          >
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <Lightbulb className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <span>Enter Course & Deep Question</span>
              </h3>
              <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-bold">
                {activeMajor.name}
              </span>
            </div>

            {/* Course Code Input */}
            <div>
              <label htmlFor="course-code-input" className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                Course Code (Type any course freely):
              </label>
              <input
                id="course-code-input"
                type="text"
                required
                placeholder="e.g. BIO5101, CS402, CS403, CS515, MGT201, MTH501..."
                value={courseCodeInput}
                onChange={(e) => setCourseCodeInput(e.target.value.toUpperCase())}
                className="w-full px-3 py-2 text-xs font-mono font-bold uppercase rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 focus:outline-indigo-500"
              />

              {/* Quick Suggestion Chips from Selected Semester & Major */}
              {suggestedCourses.length > 0 && (
                <div className="mt-2 space-y-1">
                  <span className="text-[10px] text-slate-400 block">
                    Available in {selectedSemester === 'all' ? 'All Semesters' : `Sem ${selectedSemester}`}:
                  </span>
                  <div className="flex flex-wrap gap-1 max-h-24 overflow-y-auto pr-1">
                    {suggestedCourses.map((c) => (
                      <button
                        key={`${c.code}-${c.semester}`}
                        type="button"
                        onClick={() => handleSelectSuggestedCourse(c)}
                        className={`text-[10px] px-2 py-0.5 rounded-md border transition-colors ${
                          courseCodeInput === c.code
                            ? 'bg-indigo-600 text-white border-indigo-600 font-bold'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-indigo-400'
                        }`}
                        title={c.title}
                      >
                        {c.code}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Concept / Topic Input */}
            <div>
              <label htmlFor="topic-input" className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                Concept / Topic:
              </label>
              <input
                id="topic-input"
                type="text"
                required
                placeholder="e.g. Carbohydrates, DFA to NFA, Normalization, Capital Budgeting..."
                value={topicInput}
                onChange={(e) => setTopicInput(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-indigo-500"
              />
            </div>

            {/* Specific Confusion Input */}
            <div>
              <label htmlFor="doubt-input" className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                What do you want explained? (Optional):
              </label>
              <textarea
                id="doubt-input"
                rows={2}
                placeholder="e.g. Inki majors kia hain? Kese banti hain aur why do we need them?"
                value={doubtInput}
                onChange={(e) => setDoubtInput(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-indigo-500"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors shadow-xs flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isLoading ? (
                <span>Generating Deep In-Depth Analysis...</span>
              ) : (
                <>
                  <Lightbulb className="w-4 h-4" />
                  <span>Explain in Depth (What · Why · How)</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Educational Note Box */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 space-y-1">
            <span className="font-bold text-slate-900 dark:text-slate-200 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
              <span>VU Student Note:</span>
            </span>
            <p>
              Har concept ko 4 buniyaadi hisson mein baanta gaya hai taake aap handouts ki ratta-bazi k baghair
              exam aur practical dono mein 100% concepts clear kar sakein.
            </p>
          </div>
        </div>

        {/* Right Output Card (7 Cols) */}
        <div className="lg:col-span-7">
          <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-6">
            {/* Header with Title and Copy */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400 mb-1">
                  <span>{explanation.courseCode}</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-slate-500 font-sans font-normal">
                    {explanation.majorName} (Sem {explanation.semesterNumber})
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                  {explanation.topic}
                </h3>
              </div>

              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors self-start sm:self-auto shrink-0"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied Full Notes' : 'Copy Full In-Depth Notes'}</span>
              </button>
            </div>

            {/* AI Custom Response view if provided */}
            {aiCustomMarkdown ? (
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed whitespace-pre-wrap">
                {aiCustomMarkdown}
              </div>
            ) : (
              <div className="space-y-6">
                {/* 1. 📌 WHAT IS IT? (Kia Hai?) */}
                <div className="space-y-2.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-indigo-500" />
                    <span>1. 📌 WHAT IS IT? (Kia Hai?)</span>
                  </span>
                  <div className="p-4 rounded-xl bg-indigo-50/40 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/50 space-y-3">
                    <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed">
                      {explanation.whatIsIt.definition}
                    </p>
                    <div className="p-3 rounded-lg bg-white dark:bg-slate-950 border border-indigo-200 dark:border-indigo-900 text-xs font-mono text-indigo-900 dark:text-indigo-300">
                      <span className="font-bold text-[10px] uppercase text-indigo-500 block mb-0.5">
                        Technical / Chemical Formulation:
                      </span>
                      {explanation.whatIsIt.chemicalOrTechnicalForm}
                    </div>
                    <div>
                      <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1">
                        Key Characteristics:
                      </span>
                      <ul className="space-y-1 text-xs text-slate-600 dark:text-slate-300">
                        {explanation.whatIsIt.keyCharacteristics.map((char, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <span className="text-indigo-600 font-bold shrink-0">✔</span>
                            <span>{char}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* 2. 💡 WHY DOES IT MATTER? (Kyun Zaroori Hai?) */}
                <div className="space-y-2.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
                    <HelpCircle className="w-4 h-4 text-amber-500" />
                    <span>2. 💡 WHY DOES IT MATTER? (Kyun Zaroori Hai?)</span>
                  </span>
                  <div className="p-4 rounded-xl bg-amber-50/40 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/50 space-y-2.5 text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed">
                    <div>
                      <strong className="text-amber-900 dark:text-amber-300 font-semibold block text-xs">
                        Fundamental Purpose:
                      </strong>
                      <p className="mt-0.5">{explanation.whyItMatters.purpose}</p>
                    </div>
                    <div>
                      <strong className="text-amber-900 dark:text-amber-300 font-semibold block text-xs">
                        Biological or Systemic Role:
                      </strong>
                      <p className="mt-0.5">{explanation.whyItMatters.biologicalOrSystemRole}</p>
                    </div>
                    <div className="pt-2 border-t border-amber-200/60 dark:border-amber-900/40 text-xs text-amber-800 dark:text-amber-200">
                      <strong>Real-World Impact: </strong>
                      {explanation.whyItMatters.realWorldValue}
                    </div>
                  </div>
                </div>

                {/* 3. ⚙️ HOW DOES IT FORM / WORK? (Kese Banta Hai / Kaam Karta Hai?) */}
                <div className="space-y-2.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-violet-600 dark:text-violet-400 flex items-center gap-1.5">
                    <Code2 className="w-4 h-4 text-violet-500" />
                    <span>3. ⚙️ HOW DOES IT FORM / WORK? (Kese Banta Hai / Kaam Karta Hai?)</span>
                  </span>
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-3">
                    <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed">
                      {explanation.howItWorksOrForms.formationProcess}
                    </p>

                    {/* Syntax / Mechanism Code Block */}
                    <div className="p-3.5 rounded-xl bg-slate-950 text-slate-200 font-mono text-xs overflow-x-auto leading-relaxed border border-slate-800">
                      <span className="text-[10px] text-slate-400 uppercase font-sans block mb-1 font-semibold">
                        Mechanism / Formula / Synthesis Flow:
                      </span>
                      <pre className="whitespace-pre-wrap">{explanation.howItWorksOrForms.mechanismOrSyntax}</pre>
                    </div>

                    {/* Step-by-Step Flow List */}
                    <div>
                      <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1.5">
                        Step-by-Step Sequential Flow:
                      </span>
                      <div className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                        {explanation.howItWorksOrForms.stepByStepFlow.map((step, idx) => (
                          <div key={idx} className="flex items-start gap-2 p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                            <span className="w-5 h-5 rounded-full bg-violet-100 dark:bg-violet-900/60 text-violet-700 dark:text-violet-300 text-[10px] font-bold flex items-center justify-center shrink-0">
                              {idx + 1}
                            </span>
                            <span className="leading-tight pt-0.5">{step}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* 4. 🗂️ MAJOR TYPES & CLASSIFICATIONS (Inki Majors / Types Kia Hain?) */}
                <div className="space-y-2.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
                    <Layers className="w-4 h-4 text-blue-500" />
                    <span>4. 🗂️ MAJOR TYPES & CLASSIFICATIONS (Inki Majors / Types Kia Hain?)</span>
                  </span>
                  <div className="p-4 rounded-xl bg-blue-50/40 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/50 space-y-3">
                    <h4 className="text-xs font-bold text-blue-950 dark:text-blue-200">
                      {explanation.majorTypesAndClassifications.categoryName}
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {explanation.majorTypesAndClassifications.types.map((type, i) => (
                        <div
                          key={i}
                          className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-blue-200/70 dark:border-blue-900/60 space-y-1"
                        >
                          <span className="text-xs font-bold text-indigo-700 dark:text-indigo-400 block">
                            {type.name}
                          </span>
                          <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
                            {type.description}
                          </p>
                          <div className="mt-1.5 pt-1.5 border-t border-slate-100 dark:border-slate-800 text-[10px] text-slate-500 dark:text-slate-400">
                            <strong className="text-slate-700 dark:text-slate-300">Examples: </strong>
                            <span>{type.examples}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 5. 🗣️ ASAAN ALFAAZ & ROZMARRAH KI MISAAL (In-Depth Roman Urdu) */}
                <div className="space-y-2.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-emerald-500" />
                    <span>5. 🗣️ ASAAN ALFAAZ & ROZMARRAH KI MISAAL (In-Depth Roman Urdu)</span>
                  </span>
                  <div className="p-4 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/60 text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed space-y-3">
                    <h4 className="font-bold text-emerald-900 dark:text-emerald-300 text-xs flex items-center gap-1.5">
                      <Atom className="w-3.5 h-3.5" />
                      <span>{explanation.romanUrduAnalogy.title}</span>
                    </h4>
                    <blockquote className="whitespace-pre-line leading-relaxed font-serif italic text-emerald-950 dark:text-emerald-100 text-xs sm:text-sm pl-3 border-l-2 border-emerald-500 py-1 bg-emerald-100/30 dark:bg-emerald-900/20 rounded-r-lg">
                      “{explanation.romanUrduAnalogy.analogyText}”
                    </blockquote>
                    <div className="p-3 rounded-lg bg-emerald-100/70 dark:bg-emerald-900/30 text-emerald-950 dark:text-emerald-200 text-xs">
                      <strong className="not-italic">Rozmarrah Formula Takeaway: </strong>
                      <em className="italic font-serif">{explanation.romanUrduAnalogy.dailyLifeExample}</em>
                    </div>
                  </div>
                </div>

                {/* 6. 🎯 VU EXAM MIDTERM/FINALTERM PAST PAPERS SECRET */}
                <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 text-xs text-amber-950 dark:text-amber-200 space-y-2">
                  <span className="font-bold flex items-center gap-1.5 text-amber-900 dark:text-amber-300 text-xs uppercase tracking-wider">
                    <BookmarkCheck className="w-4 h-4" />
                    <span>6. 🎯 VU Midterm & Finalterm Past Papers Secret</span>
                  </span>
                  <div className="space-y-1.5 leading-relaxed">
                    <p>
                      <strong className="not-italic font-bold">Common Question Types: </strong>
                      <em className="italic font-serif">{explanation.vuExamPastPaperSecret.commonQuestionTypes}</em>
                    </p>
                    <p>
                      <strong className="not-italic font-bold">5-Marks Long Question Blueprint: </strong>
                      <em className="italic font-serif">{explanation.vuExamPastPaperSecret.fiveMarksTopic}</em>
                    </p>
                    <p className="p-2 rounded bg-amber-100/80 dark:bg-amber-900/40 text-amber-950 dark:text-amber-100 font-medium">
                      <strong className="not-italic font-bold">⚠️ MCQ Trap from Past Papers: </strong>
                      <em className="italic font-serif">{explanation.vuExamPastPaperSecret.mcqTrick}</em>
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
