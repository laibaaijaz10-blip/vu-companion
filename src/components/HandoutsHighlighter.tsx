import React, { useState, useEffect } from 'react';
import {
  Highlighter,
  BookOpen,
  FileDown,
  Copy,
  Check,
  Trash2,
  Tag,
  Sparkles,
  Layers,
  ChevronRight,
  Filter,
  PlusCircle,
  AlertCircle,
  HelpCircle,
  Flame,
} from 'lucide-react';
import {
  HandoutHighlightItem,
  HighlightColorType,
  SAMPLE_HANDOUTS,
  HIGHLIGHT_STYLE_CONFIG,
  exportHighlightsToMarkdown,
} from '../utils/handoutsData';

interface HandoutsHighlighterProps {
  onNoteAddedReward?: () => void;
}

export const HandoutsHighlighter: React.FC<HandoutsHighlighterProps> = ({ onNoteAddedReward }) => {
  // Current active handout text and meta
  const [selectedCourse, setSelectedCourse] = useState<string>('CS402');
  const [lectureNumber, setLectureNumber] = useState<string>('Lecture 15');
  const [handoutText, setHandoutText] = useState<string>(SAMPLE_HANDOUTS[0].content);

  // Active color tool for highlighting
  const [activeColor, setActiveColor] = useState<HighlightColorType>('definition');

  // Selected text from mouse selection
  const [currentSelection, setCurrentSelection] = useState<string>('');
  const [customNote, setCustomNote] = useState<string>('');

  // Mode: Reader vs Flashcards
  const [viewMode, setViewMode] = useState<'reader' | 'flashcards'>('reader');
  const [activeFlashcardIndex, setActiveFlashcardIndex] = useState<number>(0);
  const [isFlashcardFlipped, setIsFlashcardFlipped] = useState<boolean>(false);

  // Saved highlights in localStorage
  const [highlights, setHighlights] = useState<HandoutHighlightItem[]>(() => {
    try {
      const saved = localStorage.getItem('vu_handout_highlights_v2');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    // Pre-populate with initial highlights so student sees immediate value
    return [
      {
        id: 'hl-1',
        courseCode: 'CS402',
        lectureNumber: 'Lecture 15',
        colorType: 'definition',
        selectedText: 'The Kleene star operator generates an infinite set of strings formed by concatenating zero or more words of the language, meaning the null string Lambda (Λ) is always included in L*.',
        personalNote: 'Crucial for Midterm Q1 - null string Lambda always in L*',
        createdAt: 'Oct 24, 2026',
      },
      {
        id: 'hl-2',
        courseCode: 'CS402',
        lectureNumber: 'Lecture 15',
        colorType: 'warning',
        selectedText: 'Note that non-regular languages are NOT closed under intersection or complementation, whereas regular languages are closed under union, concatenation, and Kleene star.',
        personalNote: 'Frequent MCQ trap in VU Final term!',
        createdAt: 'Oct 24, 2026',
      },
      {
        id: 'hl-3',
        courseCode: 'CS201',
        lectureNumber: 'Lecture 19',
        colorType: 'formula',
        selectedText: 'int *ptr = new int[50]; // Allocates contiguous array of 50 integers ... delete[] ptr;',
        personalNote: 'Must use delete[] with square brackets for arrays',
        createdAt: 'Oct 25, 2026',
      },
    ];
  });

  const [copiedSummary, setCopiedSummary] = useState<boolean>(false);
  const [filterCourse, setFilterCourse] = useState<string>('all');
  const [filterType, setFilterType] = useState<string>('all');

  // Persist highlights
  useEffect(() => {
    try {
      localStorage.setItem('vu_handout_highlights_v2', JSON.stringify(highlights));
    } catch {
      // ignore
    }
  }, [highlights]);

  // Load sample handout
  const handleLoadSample = (sample: typeof SAMPLE_HANDOUTS[0]) => {
    setSelectedCourse(sample.courseCode);
    setLectureNumber(sample.lectureNumber);
    setHandoutText(sample.content);
    setCurrentSelection('');
  };

  // Capture selection in reader
  const handleMouseUp = () => {
    const selection = window.getSelection();
    if (selection) {
      const text = selection.toString().trim();
      if (text.length > 5) {
        setCurrentSelection(text);
      }
    }
  };

  // Add highlight
  const handleAddHighlight = () => {
    if (!currentSelection.trim()) return;

    const newItem: HandoutHighlightItem = {
      id: `hl-${Date.now()}`,
      courseCode: selectedCourse.toUpperCase().trim() || 'VU-GENERAL',
      lectureNumber: lectureNumber.trim() || 'General Handout',
      colorType: activeColor,
      selectedText: currentSelection.trim(),
      personalNote: customNote.trim() ? customNote.trim() : undefined,
      createdAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    };

    setHighlights((prev) => [newItem, ...prev]);
    setCurrentSelection('');
    setCustomNote('');

    if (onNoteAddedReward) {
      onNoteAddedReward();
    }
  };

  // Delete highlight
  const handleDeleteHighlight = (id: string) => {
    setHighlights((prev) => prev.filter((h) => h.id !== id));
  };

  // Export highlights
  const handleCopyMarkdown = () => {
    const md = exportHighlightsToMarkdown(filteredHighlights);
    navigator.clipboard.writeText(md);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2500);
  };

  const handleDownloadMarkdown = () => {
    const md = exportHighlightsToMarkdown(filteredHighlights);
    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `VU_${selectedCourse}_Revision_Notes.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Filtered highlights for notebook
  const filteredHighlights = highlights.filter((h) => {
    if (filterCourse !== 'all' && h.courseCode !== filterCourse) return false;
    if (filterType !== 'all' && h.colorType !== filterType) return false;
    return true;
  });

  const uniqueCourses = Array.from(new Set(highlights.map((h) => h.courseCode)));

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
              <Highlighter className="w-3.5 h-3.5" />
              <span>VU Handouts Active Reader & Notes Generator</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              Handouts Highlight & Revision Maker
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-2xl">
              Paste or load VU handout chapters, highlight definitions, exam formulas, and past-paper traps.
              Automatically compiles clean revision flashcards and Markdown study cheat-sheets!
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setViewMode('reader')}
              className={`px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                viewMode === 'reader'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Handout Reader</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setViewMode('flashcards');
                setIsFlashcardFlipped(false);
                setActiveFlashcardIndex(0);
              }}
              className={`px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                viewMode === 'flashcards'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Flashcards ({highlights.length})</span>
            </button>
          </div>
        </div>
      </div>

      {viewMode === 'reader' ? (
        /* Workspace: Reader & Highlights */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Handout Reader (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 space-y-4 shadow-xs">
              {/* Handout metadata input & presets */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={selectedCourse}
                    onChange={(e) => setSelectedCourse(e.target.value.toUpperCase())}
                    placeholder="Course (CS402)"
                    className="w-24 px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-xs font-bold uppercase text-slate-900 dark:text-white"
                  />
                  <input
                    type="text"
                    value={lectureNumber}
                    onChange={(e) => setLectureNumber(e.target.value)}
                    placeholder="e.g. Lecture 15"
                    className="w-32 px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-xs text-slate-900 dark:text-white"
                  />
                </div>

                <div className="flex items-center gap-1.5 text-xs">
                  <span className="text-slate-400 text-[11px]">Load Samples:</span>
                  {SAMPLE_HANDOUTS.map((s) => (
                    <button
                      key={s.courseCode}
                      type="button"
                      onClick={() => handleLoadSample(s)}
                      className={`px-2 py-1 rounded text-[11px] font-medium border transition-colors cursor-pointer ${
                        selectedCourse === s.courseCode
                          ? 'bg-indigo-50 dark:bg-indigo-950 border-indigo-300 dark:border-indigo-700 text-indigo-700 dark:text-indigo-300 font-bold'
                          : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      {s.courseCode}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Highlighting Tool Bar */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  Active Highlighter Tool:
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {(Object.keys(HIGHLIGHT_STYLE_CONFIG) as HighlightColorType[]).map((key) => {
                    const cfg = HIGHLIGHT_STYLE_CONFIG[key];
                    const isActive = activeColor === key;
                    return (
                      <button
                        key={key}
                        type="button"
                        onClick={() => setActiveColor(key)}
                        className={`flex items-center gap-1.5 p-2 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                          isActive
                            ? `${cfg.bgLight} ${cfg.textLight} ${cfg.borderLight} ${cfg.bgDark} ${cfg.textDark} ring-2 ring-indigo-500`
                            : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        <span>{cfg.badgeEmoji}</span>
                        <span className="truncate">{cfg.label.split('/')[0]}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Handout Reading Container */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <BookOpen className="w-3.5 h-3.5 text-slate-400" />
                    <span>Select any text below with your mouse to highlight:</span>
                  </span>
                  <span>{handoutText.split(/\s+/).filter(Boolean).length} words</span>
                </div>

                <div
                  onMouseUp={handleMouseUp}
                  className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-950 text-slate-800 dark:text-slate-200 text-sm leading-relaxed whitespace-pre-wrap select-text max-h-[420px] overflow-y-auto font-serif"
                >
                  {handoutText}
                </div>
              </div>

              {/* Selection Action Bar (appears when text is selected) */}
              {currentSelection && (
                <div className="p-3.5 rounded-xl border border-indigo-200 dark:border-indigo-800 bg-indigo-50/60 dark:bg-indigo-950/40 space-y-2.5 animate-in fade-in">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-indigo-950 dark:text-indigo-200 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                      <span>Text Selected for Highlighting:</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => setCurrentSelection('')}
                      className="text-slate-400 hover:text-slate-600 text-xs"
                    >
                      Cancel
                    </button>
                  </div>

                  <p className="text-xs italic text-slate-700 dark:text-slate-300 bg-white/70 dark:bg-slate-900/70 p-2.5 rounded border border-slate-200 dark:border-slate-700 line-clamp-3">
                    "{currentSelection}"
                  </p>

                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={customNote}
                      onChange={(e) => setCustomNote(e.target.value)}
                      placeholder="Add personal note / exam memory tip (optional)..."
                      className="flex-1 px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white placeholder-slate-400"
                    />

                    <button
                      type="button"
                      onClick={handleAddHighlight}
                      className="px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      <PlusCircle className="w-3.5 h-3.5" />
                      <span>Save Note</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Direct Paste or Edit Handout */}
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                <details className="text-xs text-slate-500">
                  <summary className="cursor-pointer font-medium hover:text-indigo-600 transition-colors">
                    + Paste custom Handout lecture text from PDF
                  </summary>
                  <div className="pt-2 space-y-2">
                    <textarea
                      rows={5}
                      value={handoutText}
                      onChange={(e) => setHandoutText(e.target.value)}
                      placeholder="Paste text from your VULMS downloaded handout PDF here..."
                      className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 p-2.5 text-xs text-slate-900 dark:text-white"
                    />
                  </div>
                </details>
              </div>
            </div>
          </div>

          {/* Right Column: Revision Notebook & Saved Cards (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 space-y-4 shadow-xs">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <Tag className="w-4 h-4 text-indigo-500" />
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    Revision Notebook ({filteredHighlights.length})
                  </h3>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={handleCopyMarkdown}
                    className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs flex items-center gap-1 cursor-pointer"
                    title="Copy Markdown Summary"
                  >
                    {copiedSummary ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>

                  <button
                    type="button"
                    onClick={handleDownloadMarkdown}
                    className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs flex items-center gap-1 cursor-pointer"
                    title="Download Notes (.md)"
                  >
                    <FileDown className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Filters */}
              <div className="flex items-center gap-2 text-xs">
                <select
                  value={filterCourse}
                  onChange={(e) => setFilterCourse(e.target.value)}
                  className="px-2 py-1 rounded-md border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-300 text-xs"
                >
                  <option value="all">All Courses</option>
                  {uniqueCourses.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>

                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="px-2 py-1 rounded-md border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-300 text-xs"
                >
                  <option value="all">All Note Types</option>
                  <option value="definition">🟡 Definitions</option>
                  <option value="formula">🟢 Formulas & Code</option>
                  <option value="pastpaper">🟣 Past Papers</option>
                  <option value="warning">🔴 Warnings</option>
                </select>
              </div>

              {/* Highlights List */}
              <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
                {filteredHighlights.length > 0 ? (
                  filteredHighlights.map((item) => {
                    const cfg = HIGHLIGHT_STYLE_CONFIG[item.colorType];
                    return (
                      <div
                        key={item.id}
                        className={`p-3.5 rounded-xl border ${cfg.borderLight} ${cfg.bgLight} ${cfg.bgDark} space-y-2 relative group transition-all`}
                      >
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="font-bold flex items-center gap-1">
                            <span>{cfg.badgeEmoji}</span>
                            <span className={`${cfg.textLight} ${cfg.textDark}`}>{cfg.label}</span>
                          </span>

                          <div className="flex items-center gap-2">
                            <span className="text-slate-500 font-mono text-[10px]">
                              {item.courseCode} · {item.lectureNumber}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleDeleteHighlight(item.id)}
                              className="text-slate-400 hover:text-rose-600 transition-colors p-1"
                              title="Delete note"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        </div>

                        <p className={`text-xs ${cfg.textLight} ${cfg.textDark} leading-relaxed font-serif italic pl-2 border-l-2 ${cfg.borderLight}`}>
                          “{item.selectedText}”
                        </p>

                        {item.personalNote && (
                          <div className="pt-1.5 border-t border-slate-200/60 dark:border-slate-700/60 text-[11px] text-slate-700 dark:text-slate-300 flex items-start gap-1">
                            <span className="font-semibold text-slate-500">Memo:</span>
                            <span className="font-medium italic">{item.personalNote}</span>
                          </div>
                        )}
                      </div>
                    );
                  })
                ) : (
                  <div className="py-12 text-center text-slate-400 space-y-2">
                    <Highlighter className="w-8 h-8 mx-auto text-slate-300 dark:text-slate-700" />
                    <p className="text-xs">No highlights match the filter.</p>
                    <p className="text-[11px] text-slate-400">
                      Select text in the left panel to save your first revision point!
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Flashcards Revision Mode */
        <div className="max-w-2xl mx-auto space-y-6">
          {highlights.length > 0 ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>
                  Card {activeFlashcardIndex + 1} of {highlights.length}
                </span>
                <span className="font-mono text-indigo-600 dark:text-indigo-400 font-bold">
                  {highlights[activeFlashcardIndex].courseCode} · {highlights[activeFlashcardIndex].lectureNumber}
                </span>
              </div>

              {/* Flashcard Body */}
              <div
                onClick={() => setIsFlashcardFlipped((prev) => !prev)}
                className="cursor-pointer min-h-[260px] p-8 rounded-2xl border-2 border-indigo-200 dark:border-indigo-800 bg-white dark:bg-slate-900 shadow-md flex flex-col items-center justify-center text-center space-y-4 transition-all hover:border-indigo-400"
              >
                <div className="text-xs uppercase font-bold tracking-wider text-slate-400">
                  {isFlashcardFlipped ? '💡 Explanation & Handout Text' : '❓ Concept / Highlight Question'}
                </div>

                <div className="text-base sm:text-lg font-serif italic text-slate-900 dark:text-white max-w-lg leading-relaxed">
                  “{isFlashcardFlipped
                    ? highlights[activeFlashcardIndex].selectedText
                    : highlights[activeFlashcardIndex].personalNote ||
                      highlights[activeFlashcardIndex].selectedText.slice(0, 90) + '...'}”
                </div>

                <p className="text-xs text-indigo-600 dark:text-indigo-400 font-medium">
                  {isFlashcardFlipped ? 'Click to flip back' : 'Click card to reveal full handout note'}
                </p>
              </div>

              {/* Navigation Controls */}
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  disabled={activeFlashcardIndex === 0}
                  onClick={() => {
                    setActiveFlashcardIndex((prev) => Math.max(0, prev - 1));
                    setIsFlashcardFlipped(false);
                  }}
                  className="px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-800 disabled:opacity-30 text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                >
                  Previous Card
                </button>

                <button
                  type="button"
                  onClick={() => setIsFlashcardFlipped((prev) => !prev)}
                  className="px-4 py-2 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 text-xs font-bold hover:bg-indigo-100 cursor-pointer"
                >
                  Flip Card 🔄
                </button>

                <button
                  type="button"
                  disabled={activeFlashcardIndex >= highlights.length - 1}
                  onClick={() => {
                    setActiveFlashcardIndex((prev) => Math.min(highlights.length - 1, prev + 1));
                    setIsFlashcardFlipped(false);
                  }}
                  className="px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-800 disabled:opacity-30 text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                >
                  Next Card
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-16 text-slate-400">
              <Layers className="w-10 h-10 mx-auto text-slate-300 dark:text-slate-700 mb-2" />
              <p className="text-sm font-medium">No highlights available for flashcards.</p>
              <button
                type="button"
                onClick={() => setViewMode('reader')}
                className="mt-3 px-4 py-2 rounded-lg bg-indigo-600 text-white text-xs font-semibold"
              >
                Go to Handouts Reader
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
