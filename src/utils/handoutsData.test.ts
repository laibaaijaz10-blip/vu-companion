import test from 'node:test';
import assert from 'node:assert/strict';
import { exportHighlightsToMarkdown, HandoutHighlightItem } from './handoutsData.ts';

test('exportHighlightsToMarkdown generates formatted markdown with course groups', () => {
  const items: HandoutHighlightItem[] = [
    {
      id: 'h1',
      courseCode: 'CS402',
      lectureNumber: 'Lecture 15',
      colorType: 'definition',
      selectedText: 'Kleene closure L* contains null string Lambda',
      personalNote: 'Very important for Midterm Q1',
      createdAt: 'Today',
    },
    {
      id: 'h2',
      courseCode: 'CS402',
      lectureNumber: 'Lecture 15',
      colorType: 'warning',
      selectedText: 'Non-regular languages are not closed under intersection',
      createdAt: 'Today',
    },
  ];

  const md = exportHighlightsToMarkdown(items);
  assert.ok(md.includes('CS402 Revision Highlights'));
  assert.ok(md.includes('Kleene closure'));
  assert.ok(md.includes('Very important for Midterm Q1'));
});
