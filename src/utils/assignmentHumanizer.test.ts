import test from 'node:test';
import assert from 'node:assert/strict';
import {
  detectAiMarkers,
  calculateAiLikenessScore,
  humanizeStudentTextLocally,
  AI_CLICHE_PATTERNS,
} from './assignmentHumanizerLogic.ts';

test('detectAiMarkers finds common ChatGPT cliches', () => {
  const sample = 'In today\'s fast-paced world, we must delve into the multifaceted tapestry of AI.';
  const markers = detectAiMarkers(sample);
  assert.ok(markers.length >= 2, 'Should identify at least 2 AI markers');
  const phrases = markers.map((m) => m.phrase.toLowerCase());
  assert.ok(phrases.includes('delve into'), 'Should flag "delve into"');
  assert.ok(phrases.includes('tapestry of'), 'Should flag "tapestry of"');
});

test('calculateAiLikenessScore rates robotic text higher than natural text', () => {
  const roboticText = `In today's fast-paced world, dynamic memory allocation serves as a testament to computing power. It is important to note that engineers must delve into heap memory to unleash potential. Furthermore, pointers play a crucial role. Moreover, a multifaceted approach is pivotal. In conclusion, this serves as a beacon of hope.`;
  const naturalText = `In this assignment, we analyzed how heap memory is allocated using C++ new and delete operators. We verified pointer addresses in memory and checked for dangling pointers.`;

  const roboticScore = calculateAiLikenessScore(roboticText);
  const naturalScore = calculateAiLikenessScore(naturalText);

  assert.ok(roboticScore > naturalScore, `Robotic score (${roboticScore}) should be significantly higher than natural (${naturalScore})`);
  assert.ok(roboticScore >= 60, 'Robotic text should score high on AI likelihood');
});

test('humanizeStudentTextLocally replaces cliches and reduces AI score', () => {
  const text = `It is important to note that we must delve into the multifaceted problems. Furthermore, this serves as a testament to our team. In conclusion, we succeeded.`;
  const result = humanizeStudentTextLocally(text, {
    tone: 'undergraduate',
    removeCliches: true,
    varySentenceLength: true,
    activeVoice: true,
    studentTransitions: true,
  });

  assert.ok(!result.humanizedText.toLowerCase().includes('delve into'), 'Should eliminate "delve into"');
  assert.ok(!result.humanizedText.toLowerCase().includes('a testament to'), 'Should eliminate "a testament to"');
  assert.ok(result.humanizedAiScore < result.originalAiScore, 'Humanized score must be lower than original score');
  assert.ok(result.changesAppliedCount > 0, 'Changes count should be positive');
});
