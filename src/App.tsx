import React, { useState, useEffect } from 'react';
import { HeaderNav, ActiveTabId } from './components/HeaderNav';
import { SidebarNav } from './components/SidebarNav';
import { StudentLoginScreen } from './components/StudentLoginScreen';
import { DaroodShareefBanner } from './components/DaroodShareefBanner';
import { ExamCenterNavigator } from './components/ExamCenterNavigator';
import { ConceptFinder } from './components/ConceptFinder';
import { DiscussionBoard } from './components/DiscussionBoard';
import { HandoutsHighlighter } from './components/HandoutsHighlighter';
import { AssignmentHumanizer } from './components/AssignmentHumanizer';
import { RemoteHealthDesk } from './components/RemoteHealthDesk';
import { CatMiloGamification } from './components/CatMiloGamification';
import { StudyPlanner } from './components/StudyPlanner';
import { VUGpaCalculator } from './components/VUGpaCalculator';
import { QuizSolver } from './components/QuizSolver';
import { INITIAL_EXAM_CENTERS, ExamCenter, ExamCenterReview } from './utils/vuExamCentersData';
import {
  MiloState,
  DEFAULT_MILO_STATE,
  awardMiloStudyReward,
  evaluateDailyStreak,
} from './utils/vuLogic';
import { StudentSession } from './utils/studentAuth';
import { Sparkles } from 'lucide-react';

export default function App() {
  const [isDark, setIsDark] = useState<boolean>(() => {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Student Authentication Session state
  const [studentSession, setStudentSession] = useState<StudentSession | null>(() => {
    try {
      const saved = localStorage.getItem('vu_student_session');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.isLoggedIn) return parsed;
      }
    } catch {
      // ignore
    }
    return null;
  });

  const [activeTab, setActiveTab] = useState<ActiveTabId>('centers');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState<boolean>(false);

  // Centers State with LocalStorage persistence
  const [centers, setCenters] = useState<ExamCenter[]>(() => {
    try {
      const saved = localStorage.getItem('vu_exam_centers_v1');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return INITIAL_EXAM_CENTERS;
  });

  // Cat Milo State with LocalStorage persistence & daily streak evaluation
  const [milo, setMilo] = useState<MiloState>(() => {
    try {
      const saved = localStorage.getItem('vu_milo_companion_v1');
      if (saved) {
        const parsed = JSON.parse(saved);
        return evaluateDailyStreak(parsed);
      }
    } catch {
      // ignore
    }
    return DEFAULT_MILO_STATE;
  });

  // Toast feedback message
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Sync dark theme to HTML root
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  // Persist centers
  useEffect(() => {
    try {
      localStorage.setItem('vu_exam_centers_v1', JSON.stringify(centers));
    } catch {
      // ignore
    }
  }, [centers]);

  // Persist Milo
  useEffect(() => {
    try {
      localStorage.setItem('vu_milo_companion_v1', JSON.stringify(milo));
    } catch {
      // ignore
    }
  }, [milo]);

  // Handle Logout / Lock Portal
  const handleLogout = () => {
    try {
      localStorage.removeItem('vu_student_session');
    } catch {
      // ignore
    }
    setStudentSession(null);
    showToast('Portal locked. Please log in again to continue studying.');
  };

  // Handle adding exam center review
  const handleAddCenterReview = (
    centerId: string,
    reviewData: Omit<ExamCenterReview, 'id' | 'date'>
  ) => {
    const today = new Date().toLocaleDateString('en-US', {
      month: 'short',
      year: 'numeric',
    });

    const newReview: ExamCenterReview = {
      ...reviewData,
      id: `rev-${Date.now()}`,
      date: `${today} Review`,
    };

    setCenters((prev) =>
      prev.map((c) => {
        if (c.id === centerId) {
          const updatedReviews = [newReview, ...c.reviews];
          const newTotalReviews = c.totalReviews + 1;
          const avgRating =
            updatedReviews.reduce((sum, r) => sum + r.rating, 0) / updatedReviews.length;
          return {
            ...c,
            rating: Math.round(avgRating * 10) / 10,
            totalReviews: newTotalReviews,
            reviews: updatedReviews,
          };
        }
        return c;
      })
    );

    // Reward Cat Milo
    setMilo((prev) => awardMiloStudyReward(prev, 'task_completed'));
    showToast('✓ Review submitted successfully! Cat Milo earned +1 Fish Kibble 🐟');
  };

  // Concept resolved reward
  const handleConceptResolved = (topic: string) => {
    setMilo((prev) => awardMiloStudyReward(prev, 'concept'));
    showToast(`✓ Concept "${topic.slice(0, 30)}" resolved! Cat Milo earned +1 Fish Kibble 🐟`);
  };

  // Health desk study session completed reward
  const handleStudySessionCompleted = () => {
    setMilo((prev) => awardMiloStudyReward(prev, 'pomodoro'));
    showToast('🎉 Focus Sprint Completed! Cat Milo earned +2 Fish Kibbles 🐟');
  };

  // Study task checked reward
  const handleTaskCompleted = (taskTitle: string) => {
    setMilo((prev) => awardMiloStudyReward(prev, 'task_completed'));
    showToast(`✓ Goal "${taskTitle.slice(0, 25)}" finished! Cat Milo earned +1 Fish Kibble 🐟`);
  };

  // Discussion activity reward
  const handleDoubtActivity = () => {
    setMilo((prev) => awardMiloStudyReward(prev, 'task_completed'));
    showToast('💬 Question / Solution posted! Cat Milo earned +1 Fish Kibble 🐟');
  };

  // Handout note added reward
  const handleHandoutNoteAdded = () => {
    setMilo((prev) => awardMiloStudyReward(prev, 'concept'));
    showToast('📝 Handout highlight saved! Cat Milo earned +1 Fish Kibble 🐟');
  };

  // Assignment humanized reward
  const handleAssignmentHumanized = () => {
    setMilo((prev) => awardMiloStudyReward(prev, 'pomodoro'));
    showToast('✨ Assignment Humanized! Cat Milo earned +2 Fish Kibbles 🐟');
  };

  // Quiz solved reward
  const handleQuizSolved = () => {
    setMilo((prev) => awardMiloStudyReward(prev, 'concept'));
    showToast('⚡ Quiz MCQ Solved! Cat Milo earned +1 Fish Kibble 🐟');
  };

  const getPageTitle = (tab: ActiveTabId): string => {
    switch (tab) {
      case 'centers':
        return 'Exam Centers Portal';
      case 'concepts':
        return '200+ Courses Concept Finder';
      case 'discussions':
        return 'Student Doubt & Discussion Board';
      case 'highlights':
        return 'Handouts Highlighter & Study Notes';
      case 'humanizer':
        return 'AI Assignment Humanizer';
      case 'quiz':
        return 'VU AI Quiz Solver & Extension Pack';
      case 'health':
        return 'Remote Health Desk';
      case 'milo':
        return 'Cat Milo Gamified Companion';
      case 'schedule':
        return 'Study Schedule Planner';
      case 'gpa':
        return 'Virtual University GPA Calculator';
      default:
        return 'Virtual University Student Portal';
    }
  };

  // If student is not logged in, render the Lock Screen first
  if (!studentSession || !studentSession.isLoggedIn) {
    return <StudentLoginScreen onLoginSuccess={setStudentSession} />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors font-sans antialiased">
      {/* Top Header Navigation */}
      <HeaderNav
        isDark={isDark}
        onToggleDark={() => setIsDark((prev) => !prev)}
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        milo={milo}
        studentSession={studentSession}
        onToggleMobileSidebar={() => setIsMobileSidebarOpen((prev) => !prev)}
        onLogout={handleLogout}
      />

      {/* Main 2-Column Layout: Left Sidebar + Right Feature Workspace */}
      <div className="flex-1 flex w-full max-w-7xl mx-auto">
        {/* Left Side Navigation Bar */}
        <SidebarNav
          activeTab={activeTab}
          onSelectTab={setActiveTab}
          milo={milo}
          studentSession={studentSession}
          onLogout={handleLogout}
          isOpenMobile={isMobileSidebarOpen}
          onCloseMobile={() => setIsMobileSidebarOpen(false)}
        />

        {/* Right Main Content Panel */}
        <main className="flex-1 min-w-0 px-4 sm:px-6 lg:px-8 py-6">
          {/* Complete Written Darood Shareef rendered before every page content */}
          <DaroodShareefBanner pageTitle={getPageTitle(activeTab)} />

          {/* Active Tool / Feature Panel */}
          {activeTab === 'centers' && (
            <ExamCenterNavigator
              centers={centers}
              onAddReview={handleAddCenterReview}
              studentSession={studentSession}
            />
          )}

          {activeTab === 'concepts' && (
            <ConceptFinder onConceptResolved={handleConceptResolved} />
          )}

          {activeTab === 'discussions' && (
            <DiscussionBoard onDoubtActivityReward={handleDoubtActivity} />
          )}

          {activeTab === 'highlights' && (
            <HandoutsHighlighter onNoteAddedReward={handleHandoutNoteAdded} />
          )}

          {activeTab === 'humanizer' && (
            <AssignmentHumanizer onHumanizedReward={handleAssignmentHumanized} />
          )}

          {activeTab === 'quiz' && (
            <QuizSolver onQuizSolvedReward={handleQuizSolved} />
          )}

          {activeTab === 'health' && (
            <RemoteHealthDesk onStudySessionCompleted={handleStudySessionCompleted} />
          )}

          {activeTab === 'milo' && (
            <CatMiloGamification
              milo={milo}
              onUpdateMilo={setMilo}
              onJumpToStudy={() => setActiveTab('concepts')}
            />
          )}

          {activeTab === 'schedule' && (
            <StudyPlanner onTaskCompleted={handleTaskCompleted} />
          )}

          {activeTab === 'gpa' && <VUGpaCalculator />}
        </main>
      </div>

      {/* Global Notification Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-xl bg-slate-900 text-white border border-slate-700 shadow-xl text-xs font-semibold flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Footer */}
      <footer className="mt-auto py-6 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs text-slate-500 dark:text-slate-400 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-800 dark:text-slate-200">VU Companion</span>
            <span aria-hidden="true">·</span>
            <span className="italic font-serif text-indigo-600 dark:text-indigo-400">
              Made by Laiba Ijaz for VU Students
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-slate-500 text-[11px]">
            <span>Semesters 1 to 8</span>
            <span aria-hidden="true">·</span>
            <span>200+ Courses</span>
            <span aria-hidden="true">·</span>
            <span>Exam Centers</span>
            <span aria-hidden="true">·</span>
            <span>Doubt Board</span>
            <span aria-hidden="true">·</span>
            <span>Handouts Highlighter</span>
            <span aria-hidden="true">·</span>
            <span>AI Humanizer</span>
            <span aria-hidden="true">·</span>
            <span>AI Quiz Solver (LMS Extension)</span>
            <span aria-hidden="true">·</span>
            <span>Cat Milo</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
