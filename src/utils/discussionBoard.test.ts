import test from 'node:test';
import assert from 'node:assert/strict';
import { INITIAL_DISCUSSIONS, filterDiscussions } from './discussionBoardData.ts';

test('filterDiscussions filters by course code accurately', () => {
  const cs402Posts = filterDiscussions(INITIAL_DISCUSSIONS, { courseCode: 'CS402' });
  assert.equal(cs402Posts.length, 1);
  assert.equal(cs402Posts[0].courseCode, 'CS402');
});

test('filterDiscussions filters by semester', () => {
  const sem1Posts = filterDiscussions(INITIAL_DISCUSSIONS, { semester: 1 });
  assert.equal(sem1Posts.length, 1);
  assert.equal(sem1Posts[0].courseCode, 'MTH101');
});

test('filterDiscussions sorts by top upvotes', () => {
  const topPosts = filterDiscussions(INITIAL_DISCUSSIONS, { statusTab: 'top' });
  assert.ok(topPosts[0].upvotes >= topPosts[1].upvotes);
});
