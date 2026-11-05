/**
 * Pure domain logic for VU Student Portal:
 * 1. Official VU GPA & CGPA Calculator
 * 2. Cat Milo Virtual Companion & Study Gamification State Machine
 * 3. Exam Centers Filtering & Review Averages
 * 4. Course Directory Filtering across 200+ courses
 */

import { ExamCenter } from './vuExamCentersData';
import { VUCourse, VU_COURSES } from './vuCoursesData';

export interface VUGpaEntry {
  courseCode: string;
  credits: number;
  marksOrGrade: number | string; // 0-100 or letter grade 'A', 'B+', etc.
}

export interface MiloState {
  level: number;
  xp: number;
  xpToNextLevel: number;
  hunger: number; // 0 - 100 (100 is fully fed)
  happiness: number; // 0 - 100
  streakDays: number;
  kibbleTreats: number;
  lastStudyDate: string; // YYYY-MM-DD
  lastFedDate: string; // YYYY-MM-DD
  mood: 'ecstatic' | 'purring' | 'content' | 'hungry' | 'sleepy';
}

/**
 * Returns VU Grade Points for marks or letter grade according to official VU Handbook
 */
export function getVUGradePoints(val: number | string): { gradePoint: number; letterGrade: string } {
  if (typeof val === 'string') {
    const clean = val.trim().toUpperCase();
    switch (clean) {
      case 'A+':
      case 'A':
        return { gradePoint: 4.0, letterGrade: 'A' };
      case 'A-':
        return { gradePoint: 3.66, letterGrade: 'A-' };
      case 'B+':
        return { gradePoint: 3.33, letterGrade: 'B+' };
      case 'B':
        return { gradePoint: 3.0, letterGrade: 'B' };
      case 'B-':
        return { gradePoint: 2.66, letterGrade: 'B-' };
      case 'C+':
        return { gradePoint: 2.33, letterGrade: 'C+' };
      case 'C':
        return { gradePoint: 2.0, letterGrade: 'C' };
      case 'C-':
        return { gradePoint: 1.66, letterGrade: 'C-' };
      case 'D+':
        return { gradePoint: 1.3, letterGrade: 'D+' };
      case 'D':
        return { gradePoint: 1.0, letterGrade: 'D' };
      case 'F':
      default:
        return { gradePoint: 0.0, letterGrade: 'F' };
    }
  }

  const marks = Math.round(Number(val));
  if (marks >= 85) return { gradePoint: 4.0, letterGrade: 'A' };
  if (marks >= 80) return { gradePoint: 3.66, letterGrade: 'A-' };
  if (marks >= 75) return { gradePoint: 3.33, letterGrade: 'B+' };
  if (marks >= 71) return { gradePoint: 3.0, letterGrade: 'B' };
  if (marks >= 68) return { gradePoint: 2.66, letterGrade: 'B-' };
  if (marks >= 64) return { gradePoint: 2.33, letterGrade: 'C+' };
  if (marks >= 61) return { gradePoint: 2.0, letterGrade: 'C' };
  if (marks >= 58) return { gradePoint: 1.66, letterGrade: 'C-' };
  if (marks >= 54) return { gradePoint: 1.3, letterGrade: 'D+' };
  if (marks >= 50) return { gradePoint: 1.0, letterGrade: 'D' };
  return { gradePoint: 0.0, letterGrade: 'F' };
}

/**
 * Calculates Semester GPA and Total Earned Quality Points based on VU rules
 */
export function calculateVUGpa(entries: VUGpaEntry[]): {
  gpa: number;
  totalCredits: number;
  totalQualityPoints: number;
  passedCredits: number;
} {
  if (!entries || entries.length === 0) {
    return { gpa: 0, totalCredits: 0, totalQualityPoints: 0, passedCredits: 0 };
  }

  let totalCredits = 0;
  let totalQualityPoints = 0;
  let passedCredits = 0;

  for (const entry of entries) {
    const credits = Math.max(1, Number(entry.credits) || 3);
    const { gradePoint } = getVUGradePoints(entry.marksOrGrade);
    const qualityPoints = credits * gradePoint;

    totalCredits += credits;
    totalQualityPoints += qualityPoints;
    if (gradePoint > 0) {
      passedCredits += credits;
    }
  }

  const gpa = totalCredits > 0 ? Math.round((totalQualityPoints / totalCredits) * 100) / 100 : 0;
  return {
    gpa,
    totalCredits,
    totalQualityPoints: Math.round(totalQualityPoints * 100) / 100,
    passedCredits,
  };
}

/**
 * Initial state for Cat Milo
 */
export const DEFAULT_MILO_STATE: MiloState = {
  level: 1,
  xp: 40,
  xpToNextLevel: 100,
  hunger: 80,
  happiness: 85,
  streakDays: 3,
  kibbleTreats: 4,
  lastStudyDate: new Date().toISOString().split('T')[0],
  lastFedDate: new Date().toISOString().split('T')[0],
  mood: 'purring',
};

/**
 * Handles studying activity that rewards Milo with XP & Kibble
 */
export function awardMiloStudyReward(
  current: MiloState,
  action: 'pomodoro' | 'concept' | 'task_completed',
  todayStr: string = new Date().toISOString().split('T')[0]
): MiloState {
  const kibbleBonus = action === 'pomodoro' ? 2 : 1;
  const xpBonus = action === 'pomodoro' ? 35 : action === 'task_completed' ? 25 : 15;

  let newXp = current.xp + xpBonus;
  let newLevel = current.level;
  let newXpToNext = current.xpToNextLevel;

  while (newXp >= newXpToNext) {
    newXp -= newXpToNext;
    newLevel += 1;
    newXpToNext = Math.round(newXpToNext * 1.25);
  }

  let newStreak = current.streakDays;
  if (current.lastStudyDate !== todayStr) {
    // New day study activity!
    newStreak += 1;
  }

  const newHappiness = Math.min(100, current.happiness + 5);

  return {
    ...current,
    level: newLevel,
    xp: newXp,
    xpToNextLevel: newXpToNext,
    kibbleTreats: current.kibbleTreats + kibbleBonus,
    happiness: newHappiness,
    streakDays: newStreak,
    lastStudyDate: todayStr,
    mood: newHappiness > 80 ? 'ecstatic' : 'purring',
  };
}

/**
 * Feeds Cat Milo with an earned kibble treat
 */
export function feedMilo(
  current: MiloState,
  todayStr: string = new Date().toISOString().split('T')[0]
): { state: MiloState; success: boolean; message: string } {
  if (current.kibbleTreats <= 0) {
    return {
      state: current,
      success: false,
      message: 'No kibble treats left! Complete a study pomodoro, task, or concept review to earn more fish treats for Milo.',
    };
  }

  const newHunger = Math.min(100, current.hunger + 30);
  const newHappiness = Math.min(100, current.happiness + 25);
  let newXp = current.xp + 20;
  let newLevel = current.level;
  let newXpToNext = current.xpToNextLevel;

  if (newXp >= newXpToNext) {
    newXp -= newXpToNext;
    newLevel += 1;
    newXpToNext = Math.round(newXpToNext * 1.25);
  }

  return {
    state: {
      ...current,
      level: newLevel,
      xp: newXp,
      xpToNextLevel: newXpToNext,
      hunger: newHunger,
      happiness: newHappiness,
      kibbleTreats: current.kibbleTreats - 1,
      lastFedDate: todayStr,
      mood: 'ecstatic',
    },
    success: true,
    message: 'Milo happily ate the delicious fish treat and purrs with joy! (+20 XP, +30 Hunger, +25 Happiness)',
  };
}

/**
 * Evaluates daily streak. If student skipped more than 1 day, streak resets and Milo gets hungry.
 */
export function evaluateDailyStreak(current: MiloState, todayStr: string = new Date().toISOString().split('T')[0]): MiloState {
  if (!current.lastStudyDate) return current;

  const today = new Date(todayStr);
  const lastStudy = new Date(current.lastStudyDate);
  const diffTime = Math.abs(today.getTime() - lastStudy.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays > 1) {
    // Skipped a day! Milo missed food and streak breaks
    const decayedHunger = Math.max(20, current.hunger - 40);
    const decayedHappiness = Math.max(30, current.happiness - 35);
    return {
      ...current,
      streakDays: 1, // reset streak
      hunger: decayedHunger,
      happiness: decayedHappiness,
      mood: 'hungry',
    };
  }

  return current;
}

/**
 * Filter and sort exam centers
 */
export function filterExamCenters(
  centers: ExamCenter[],
  query: string,
  cityFilter: string,
  minRating: number = 0,
  sortBy: 'rating' | 'reviews' | 'name' = 'rating',
  hardwareFilter: 'all' | 'ac_chilled' | 'keyboard_smooth' | 'mouse_smooth' | 'pc_fast' = 'all'
): ExamCenter[] {
  return centers
    .filter((center) => {
      const matchCity = cityFilter === 'all' || center.city.toLowerCase() === cityFilter.toLowerCase();
      const matchRating = center.rating >= minRating;
      const cleanQ = query.trim().toLowerCase();
      const matchQuery =
        !cleanQ ||
        center.name.toLowerCase().includes(cleanQ) ||
        center.city.toLowerCase().includes(cleanQ) ||
        center.code.toLowerCase().includes(cleanQ) ||
        center.address.toLowerCase().includes(cleanQ);

      let matchHardware = true;
      if (hardwareFilter === 'ac_chilled') {
        matchHardware = Boolean(
          center.facilities.acSpeed?.includes('High Speed') ||
          center.facilities.acCooling?.includes('Chilled')
        );
      } else if (hardwareFilter === 'keyboard_smooth') {
        matchHardware = Boolean(
          center.facilities.keyboardCondition?.includes('100%') ||
          center.facilities.keyboardsQuality === 'Responsive & Smooth'
        );
      } else if (hardwareFilter === 'mouse_smooth') {
        matchHardware = Boolean(
          center.facilities.mouseCondition?.includes('Smooth Laser') ||
          center.facilities.miceQuality === 'Optical Smooth'
        );
      } else if (hardwareFilter === 'pc_fast') {
        matchHardware = Boolean(
          center.facilities.computerPerformance?.includes('Fast') ||
          center.facilities.computerPerformance?.includes('SSD')
        );
      }

      return matchCity && matchRating && matchQuery && matchHardware;
    })
    .sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'reviews') return b.totalReviews - a.totalReviews;
      return a.name.localeCompare(b.name);
    });
}

/**
 * Searches the 200+ VU Courses database
 */
export function searchVUCourses(
  query: string,
  facultyFilter: string = 'all'
): VUCourse[] {
  const cleanQ = query.trim().toLowerCase();
  return VU_COURSES.filter((course) => {
    const matchFaculty = facultyFilter === 'all' || course.faculty === facultyFilter;
    if (!matchFaculty) return false;
    if (!cleanQ) return true;

    return (
      course.code.toLowerCase().includes(cleanQ) ||
      course.title.toLowerCase().includes(cleanQ) ||
      (course.keyTopics && course.keyTopics.some((t) => t.toLowerCase().includes(cleanQ)))
    );
  });
}
