import test from 'node:test';
import assert from 'node:assert/strict';
import {
  getVUGradePoints,
  calculateVUGpa,
  DEFAULT_MILO_STATE,
  awardMiloStudyReward,
  feedMilo,
  evaluateDailyStreak,
  filterExamCenters,
  searchVUCourses,
} from './vuLogic';
import { INITIAL_EXAM_CENTERS } from './vuExamCentersData';

test('getVUGradePoints maps official VU marks and letters accurately', () => {
  assert.equal(getVUGradePoints(92).gradePoint, 4.0);
  assert.equal(getVUGradePoints(85).gradePoint, 4.0);
  assert.equal(getVUGradePoints(81).gradePoint, 3.66);
  assert.equal(getVUGradePoints(76).gradePoint, 3.33);
  assert.equal(getVUGradePoints(72).gradePoint, 3.0);
  assert.equal(getVUGradePoints(65).gradePoint, 2.33);
  assert.equal(getVUGradePoints(52).gradePoint, 1.0);
  assert.equal(getVUGradePoints(45).gradePoint, 0.0);
  assert.equal(getVUGradePoints('A').gradePoint, 4.0);
  assert.equal(getVUGradePoints('B+').gradePoint, 3.33);
  assert.equal(getVUGradePoints('F').gradePoint, 0.0);
});

test('calculateVUGpa computes accurate semester GPA based on quality points', () => {
  const result = calculateVUGpa([
    { courseCode: 'CS201', credits: 3, marksOrGrade: 85 }, // 4.0 * 3 = 12
    { courseCode: 'CS201P', credits: 1, marksOrGrade: 80 }, // 3.66 * 1 = 3.66
    { courseCode: 'MTH101', credits: 3, marksOrGrade: 72 }, // 3.0 * 3 = 9
    { courseCode: 'ENG101', credits: 3, marksOrGrade: 65 }, // 2.33 * 3 = 6.99
  ]);

  // Total credits: 3 + 1 + 3 + 3 = 10
  // Total Quality Points: 12 + 3.66 + 9 + 6.99 = 31.65
  // GPA: 31.65 / 10 = 3.165 -> 3.17
  assert.equal(result.totalCredits, 10);
  assert.equal(result.passedCredits, 10);
  assert.ok(result.gpa >= 3.15 && result.gpa <= 3.18);
});

test('Cat Milo awards study kibbles and levels up with XP', () => {
  const base = { ...DEFAULT_MILO_STATE, level: 1, xp: 90, xpToNextLevel: 100, kibbleTreats: 0 };
  const rewarded = awardMiloStudyReward(base, 'pomodoro', '2026-11-04');

  // Earns 2 kibbles for pomodoro, +35 XP -> total 125 XP, levels up to level 2!
  assert.equal(rewarded.kibbleTreats, 2);
  assert.equal(rewarded.level, 2);
  assert.equal(rewarded.xp, 25);
  assert.equal(rewarded.mood, 'ecstatic');
});

test('feedMilo consumes kibble and increases hunger satisfaction', () => {
  const stateWithKibble = { ...DEFAULT_MILO_STATE, hunger: 50, kibbleTreats: 2 };
  const res = feedMilo(stateWithKibble);

  assert.equal(res.success, true);
  assert.equal(res.state.kibbleTreats, 1);
  assert.equal(res.state.hunger, 80);

  // Feeding when 0 kibble returns failure
  const emptyKibble = { ...DEFAULT_MILO_STATE, kibbleTreats: 0 };
  const failRes = feedMilo(emptyKibble);
  assert.equal(failRes.success, false);
});

test('evaluateDailyStreak resets streak if student skipped > 1 day', () => {
  const yesterday = { ...DEFAULT_MILO_STATE, streakDays: 5, lastStudyDate: '2026-11-03' };
  const todayEval = evaluateDailyStreak(yesterday, '2026-11-04');
  assert.equal(todayEval.streakDays, 5); // Still intact

  // Skipped from 2026-11-01 to 2026-11-04
  const oldStudy = { ...DEFAULT_MILO_STATE, streakDays: 8, lastStudyDate: '2026-11-01' };
  const brokenStreak = evaluateDailyStreak(oldStudy, '2026-11-04');
  assert.equal(brokenStreak.streakDays, 1);
  assert.equal(brokenStreak.mood, 'hungry');
});

test('filterExamCenters correctly filters by city and rating', () => {
  const lahoreCenters = filterExamCenters(INITIAL_EXAM_CENTERS, '', 'Lahore', 0);
  assert.ok(lahoreCenters.length >= 2);
  assert.ok(lahoreCenters.every((c) => c.city === 'Lahore'));

  const topRated = filterExamCenters(INITIAL_EXAM_CENTERS, '', 'all', 4.5);
  assert.ok(topRated.every((c) => c.rating >= 4.5));

  const cliftonSearch = filterExamCenters(INITIAL_EXAM_CENTERS, 'Clifton', 'all', 0);
  assert.equal(cliftonSearch.length, 1);
  assert.equal(cliftonSearch[0].code, 'KHI-01');

  // Test new hardware filters: AC speed and PC fast
  const chilledAcCenters = filterExamCenters(INITIAL_EXAM_CENTERS, '', 'all', 0, 'rating', 'ac_chilled');
  assert.ok(chilledAcCenters.length > 0);
  assert.ok(chilledAcCenters.every((c) => c.facilities.acSpeed?.includes('High Speed') || c.facilities.acCooling?.includes('Chilled')));

  const fastPcCenters = filterExamCenters(INITIAL_EXAM_CENTERS, '', 'all', 0, 'rating', 'pc_fast');
  assert.ok(fastPcCenters.length > 0);
  assert.ok(fastPcCenters.every((c) => c.facilities.computerPerformance?.includes('Fast') || c.facilities.computerPerformance?.includes('SSD')));
});

test('searchVUCourses searches through 200+ course codes and topics', () => {
  const cs301 = searchVUCourses('CS301');
  assert.ok(cs301.length > 0);
  assert.equal(cs301[0].code, 'CS301');

  const calculus = searchVUCourses('Calculus');
  assert.ok(calculus.length >= 2); // MTH101 and MTH301

  const treesTopic = searchVUCourses('Binary Search Trees');
  assert.ok(treesTopic.some((c) => c.code === 'CS301'));
});
