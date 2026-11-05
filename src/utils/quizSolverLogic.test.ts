import test from 'node:test';
import assert from 'node:assert/strict';
import {
  parseQuizQuestion,
  solveQuizLocally,
  generateExtensionFiles,
  generateUserscript,
  QUIZ_SAMPLES,
} from './quizSolverLogic.ts';

test('parseQuizQuestion splits question and options cleanly', () => {
  const raw = `In C++, what operator is used to deallocate dynamic memory?
A) free()
B) delete
C) remove
D) dispose`;

  const parsed = parseQuizQuestion(raw);
  assert.match(parsed.question, /deallocate dynamic memory/i);
  assert.strictEqual(parsed.options.length, 4);
  assert.strictEqual(parsed.options[1], 'delete');
});

test('solveQuizLocally identifies correct C++ dynamic memory deallocation operator', () => {
  const q = 'In C++, which operator is specifically used to deallocate dynamically allocated memory from the heap?';
  const opts = ['free()', 'delete', 'remove', 'dispose'];
  const solution = solveQuizLocally(q, opts, 'CS201');

  assert.strictEqual(solution.correctOptionIndex, 1);
  assert.strictEqual(solution.correctOptionText, 'delete');
  assert.ok(solution.confidenceScore >= 95);
  assert.match(solution.handoutReference, /CS201 Handouts/i);
  assert.match(solution.rationale, /delete/i);
});

test('solveQuizLocally identifies correct 2NF partial dependency rule', () => {
  const q = 'Which normal form eliminates partial dependency of non-prime attributes?';
  const opts = ['1NF', '2NF', '3NF', 'BCNF'];
  const solution = solveQuizLocally(q, opts, 'CS403');

  assert.strictEqual(solution.correctOptionIndex, 1);
  assert.strictEqual(solution.correctOptionText, '2NF');
});

test('generateExtensionFiles returns valid Manifest v3 and content script', () => {
  const files = generateExtensionFiles();
  assert.ok(files.manifestJson.includes('"manifest_version": 3'));
  assert.ok(files.manifestJson.includes('vulms.vu.edu.pk'));
  assert.ok(files.contentJs.includes('VU Toolkit'));
  assert.ok(files.popupHtml.includes('VU Toolkit'));
});

test('generateUserscript produces clean Tampermonkey script targeting VULMS', () => {
  const script = generateUserscript();
  assert.ok(script.includes('// ==UserScript=='));
  assert.ok(script.includes('@match        *://vulms.vu.edu.pk/*'));
  assert.ok(script.includes('AI Quiz Solver'));
});

test('QUIZ_SAMPLES contains diverse valid curriculum questions', () => {
  assert.ok(QUIZ_SAMPLES.length >= 5);
  const codes = QUIZ_SAMPLES.map((s) => s.courseCode);
  assert.ok(codes.includes('CS201'));
  assert.ok(codes.includes('CS402'));
  assert.ok(codes.includes('MGT201'));
  assert.ok(codes.includes('BIO5101'));
});
