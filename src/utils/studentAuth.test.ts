import test from 'node:test';
import assert from 'node:assert/strict';
import {
  validateStudentCredentials,
  DAROOD_SHAREEF,
} from './studentAuth.ts';

test('validateStudentCredentials validates student name', () => {
  const emptyName = validateStudentCredentials('', 'BC210401234', '123456');
  assert.strictEqual(emptyName.isValid, false);
  assert.match(emptyName.error || '', /full name/i);

  const shortName = validateStudentCredentials('A', 'BC210401234', '123456');
  assert.strictEqual(shortName.isValid, false);
});

test('validateStudentCredentials validates VU Student ID format', () => {
  const invalidId = validateStudentCredentials('Laiba Ijaz', 'XYZ', 'pass123');
  assert.strictEqual(invalidId.isValid, false);
  assert.match(invalidId.error || '', /Invalid VU ID format/i);

  const emptyId = validateStudentCredentials('Laiba Ijaz', '', 'pass123');
  assert.strictEqual(emptyId.isValid, false);

  const validBc = validateStudentCredentials('Laiba Ijaz', 'BC210401234', 'pass123');
  assert.strictEqual(validBc.isValid, true);

  const validMc = validateStudentCredentials('Ahmed Khan', 'mc200204567', 'pass123');
  assert.strictEqual(validMc.isValid, true);
});

test('validateStudentCredentials validates password length', () => {
  const shortPass = validateStudentCredentials('Laiba Ijaz', 'BC210401234', '123');
  assert.strictEqual(shortPass.isValid, false);
  assert.match(shortPass.error || '', /at least 4 characters/i);
});

test('DAROOD_SHAREEF contains full written Arabic, Urdu, English, and blessings note', () => {
  assert.ok(DAROOD_SHAREEF.arabic.length > 50, 'Arabic text must be complete');
  assert.ok(DAROOD_SHAREEF.arabic.includes('اَللّٰھُمَّ صَلِّ عَلٰی مُحَمَّدٍ'), 'Arabic must contain first half');
  assert.ok(DAROOD_SHAREEF.arabic.includes('اَللّٰھُمَّ بَارِكْ عَلٰی مُحَمَّدٍ'), 'Arabic must contain second half');
  assert.ok(DAROOD_SHAREEF.urdu.length > 50, 'Urdu translation must be complete');
  assert.ok(DAROOD_SHAREEF.english.length > 50, 'English translation must be complete');
  assert.ok(DAROOD_SHAREEF.fazilat.length > 20, 'Fazilat note must be present');
});
