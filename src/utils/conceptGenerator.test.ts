import test from 'node:test';
import assert from 'node:assert/strict';
import {
  VU_MAJORS,
  SEMESTER_COURSES,
  filterCoursesBySemesterAndMajor,
  generateConceptExplanation,
  generateDeepConceptExplanation,
} from './conceptGenerator';

test('VU_MAJORS contains all required majors', () => {
  assert.equal(VU_MAJORS.length, 6);
  assert.ok(VU_MAJORS.some((m) => m.id === 'cs-it'));
  assert.ok(VU_MAJORS.some((m) => m.id === 'mgmt-business'));
  assert.ok(VU_MAJORS.some((m) => m.id === 'psych-soc'));
  assert.ok(VU_MAJORS.some((m) => m.id === 'math-stats'));
  assert.ok(VU_MAJORS.some((m) => m.id === 'eng-lit'));
  assert.ok(VU_MAJORS.some((m) => m.id === 'edu-others'));
});

test('SEMESTER_COURSES spans from Semester 1 to Semester 8', () => {
  for (let sem = 1; sem <= 8; sem++) {
    const semCourses = SEMESTER_COURSES.filter((c) => c.semester === sem);
    assert.ok(semCourses.length > 0, `Semester ${sem} must contain courses`);
  }

  // Check specific user requested courses
  assert.ok(SEMESTER_COURSES.some((c) => c.code === 'CS402'));
  assert.ok(SEMESTER_COURSES.some((c) => c.code === 'CS403'));
  assert.ok(SEMESTER_COURSES.some((c) => c.code === 'CS515'));
  assert.ok(SEMESTER_COURSES.some((c) => c.code === 'CS609'));
  assert.ok(SEMESTER_COURSES.some((c) => c.code === 'CS620'));
  assert.ok(SEMESTER_COURSES.some((c) => c.code === 'MGT201'));
  assert.ok(SEMESTER_COURSES.some((c) => c.code === 'MGT510'));
  assert.ok(SEMESTER_COURSES.some((c) => c.code === 'PSY512'));
  assert.ok(SEMESTER_COURSES.some((c) => c.code === 'MTH5101'));
  assert.ok(SEMESTER_COURSES.some((c) => c.code === 'BIO5105'));
});

test('filterCoursesBySemesterAndMajor filters accurately', () => {
  const sem1 = filterCoursesBySemesterAndMajor(1, 'all');
  assert.ok(sem1.length >= 8);
  assert.ok(sem1.every((c) => c.semester === 1));

  const csSem4 = filterCoursesBySemesterAndMajor(4, 'cs-it');
  assert.ok(csSem4.some((c) => c.code === 'CS402'));
  assert.ok(csSem4.some((c) => c.code === 'CS403'));
});

test('generateConceptExplanation creates rich Roman Urdu analogies and exam secrets', () => {
  const explanation = generateConceptExplanation('cs-it', 'CS403', 'Database Normalization', 4);

  assert.equal(explanation.courseCode, 'CS403');
  assert.ok(explanation.romanUrdu.includes('Roman Urdu'));
  assert.ok(explanation.snippetOrFormula);
  assert.ok(explanation.examTip.includes('Midterm / Finalterm'));
});

test('generateDeepConceptExplanation delivers deep What, Why, How, Classifications, and Roman Urdu for Carbohydrates', () => {
  const deep = generateDeepConceptExplanation('edu-others', 'BIO5101', 'Carbohydrates', 7);

  assert.equal(deep.courseCode, 'BIO5101');
  assert.ok(deep.whatIsIt.definition.includes('polyhydroxy aldehydes'));
  assert.ok(deep.whatIsIt.chemicalOrTechnicalForm.includes('Cn(H2O)n'));
  assert.ok(deep.whyItMatters.biologicalOrSystemRole.includes('Glucose'));
  assert.ok(deep.howItWorksOrForms.formationProcess.includes('Photosynthesis'));
  assert.ok(deep.howItWorksOrForms.stepByStepFlow.length >= 3);
  assert.equal(deep.majorTypesAndClassifications.types.length, 4);
  assert.ok(deep.majorTypesAndClassifications.types.some((t) => t.name.includes('Monosaccharides')));
  assert.ok(deep.majorTypesAndClassifications.types.some((t) => t.name.includes('Polysaccharides')));
  assert.ok(deep.romanUrduAnalogy.analogyText.includes('petrol'));
  assert.ok(deep.vuExamPastPaperSecret.fiveMarksTopic.includes('Cellulose'));
});

