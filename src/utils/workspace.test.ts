import test from 'node:test';
import assert from 'node:assert/strict';
import {
  TEMPLATES,
  AVAILABLE_FEATURES,
  calculateProjectScope,
  calculateContrastRatio,
  generateBuildPrompt,
} from './workspace';

test('TEMPLATES contains valid starter templates', () => {
  assert.ok(TEMPLATES.length >= 5);
  const saas = TEMPLATES.find((t) => t.id === 'saas-dashboard');
  assert.ok(saas);
  assert.equal(saas?.highlightColor, 'indigo');
  assert.ok(saas?.metrics.length > 0);
});

test('calculateProjectScope computes complexity correctly', () => {
  // Light scope
  const light = calculateProjectScope(['dark-mode']);
  assert.equal(light.complexityLabel, 'Light');
  assert.equal(light.totalModules, 1);
  assert.ok(light.estimatedComponents >= 4);

  // Advanced scope
  const advanced = calculateProjectScope(['realtime-charts', 'data-grid', 'role-access']);
  assert.equal(advanced.complexityLabel, 'Advanced');
  assert.equal(advanced.totalModules, 3);
  assert.ok(advanced.readinessScore > 50);

  // Enterprise scope
  const enterprise = calculateProjectScope([
    'realtime-charts',
    'data-grid',
    'kanban-board',
    'role-access',
    'canvas-renderer',
  ]);
  assert.equal(enterprise.complexityLabel, 'Enterprise');
  assert.ok(enterprise.recommendedStack.includes('HTML5 Canvas Engine'));
});

test('calculateContrastRatio computes standard WCAG ratios accurately', () => {
  // Black on white is 21:1
  const blackWhite = calculateContrastRatio('#000000', '#ffffff');
  assert.equal(blackWhite, 21);

  // Same color is 1:1
  const same = calculateContrastRatio('#ffffff', '#ffffff');
  assert.equal(same, 1);

  // Slate-900 (#0f172a) on white (#ffffff)
  const darkOnLight = calculateContrastRatio('#0f172a', '#ffffff');
  assert.ok(darkOnLight >= 14);
});

test('generateBuildPrompt outputs clean structured brief', () => {
  const prompt = generateBuildPrompt({
    templateName: 'SaaS Analytics & Ops Engine',
    featureIds: ['realtime-charts', 'data-grid'],
    accentColor: 'indigo',
    customNotes: 'Include dark mode toggle',
  });

  assert.ok(prompt.includes('Build the "SaaS Analytics & Ops Engine" application.'));
  assert.ok(prompt.includes('Interactive Charts & Telemetry'));
  assert.ok(prompt.includes('Virtual Data Grid & Sorting'));
  assert.ok(prompt.includes('Primary Design Accent: indigo'));
  assert.ok(prompt.includes('Specific Requirements: Include dark mode toggle'));
});
