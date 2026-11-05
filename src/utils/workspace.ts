/**
 * Core domain logic for Studio Workspace project scaffolding,
 * scope estimation, design token contrast, and brief generation.
 */

export interface ProjectTemplate {
  id: string;
  name: string;
  category: string;
  tagline: string;
  description: string;
  defaultFeatures: string[];
  metrics: { label: string; value: string }[];
  highlightColor: string;
}

export interface FeatureOption {
  id: string;
  name: string;
  description: string;
  category: 'core' | 'data' | 'design' | 'security';
  weight: number;
}

export const TEMPLATES: ProjectTemplate[] = [
  {
    id: 'saas-dashboard',
    name: 'SaaS Analytics & Ops Engine',
    category: 'Productivity & Analytics',
    tagline: 'High-performance metrics dashboard with data grids and telemetry',
    description: 'Real-time telemetry, revenue cohort graphs, team activity feed, and automated data export pipelines.',
    defaultFeatures: ['realtime-charts', 'data-grid', 'role-access', 'dark-mode'],
    metrics: [
      { label: 'Latency Target', value: '<120ms' },
      { label: 'Data Points', value: '50k/sec' },
      { label: 'Coverage', value: '99.9%' },
    ],
    highlightColor: 'indigo',
  },
  {
    id: 'ecommerce-boutique',
    name: 'Artisan Commerce & Catalog',
    category: 'E-Commerce & Retail',
    tagline: 'Refined lifestyle storefront with fast cart and fluid product zoom',
    description: 'Curated editorial product presentation, inventory filters, currency switcher, and seamless bag management.',
    defaultFeatures: ['product-grid', 'cart-drawer', 'search-filter', 'image-lightbox'],
    metrics: [
      { label: 'Catalog Size', value: '1.2k items' },
      { label: 'Conversion', value: '3.8%' },
      { label: 'Checkout', value: '2-step' },
    ],
    highlightColor: 'emerald',
  },
  {
    id: 'workflow-kanban',
    name: 'Sprint & Flow Coordinator',
    category: 'Project Management',
    tagline: 'Drag-and-drop sprint board with swimlanes, milestones and filters',
    description: 'Task organization, milestone deadlines, label taxonomy, and exportable weekly velocity reports.',
    defaultFeatures: ['kanban-board', 'timeline-view', 'priority-matrix', 'search-filter'],
    metrics: [
      { label: 'Velocity', value: '42 pts' },
      { label: 'WIP Limit', value: '5 active' },
      { label: 'Sync Cycle', value: 'Real-time' },
    ],
    highlightColor: 'violet',
  },
  {
    id: 'science-telemetry',
    name: 'Bio-Telemetry & Lab Console',
    category: 'Science & Biotech',
    tagline: 'Multi-channel sensor monitor with spectral plots and threshold alerts',
    description: 'Tabular experiment logs, spectrophotometer curves, threshold alarms, and sample audit histories.',
    defaultFeatures: ['realtime-charts', 'audit-log', 'tabular-data', 'alert-manager'],
    metrics: [
      { label: 'Sensors', value: '16 probes' },
      { label: 'Sample Rate', value: '100 Hz' },
      { label: 'Precision', value: '±0.02 pH' },
    ],
    highlightColor: 'cyan',
  },
  {
    id: 'casual-game',
    name: 'Canvas Arcade & Puzzle Lab',
    category: 'Interactive & Games',
    tagline: 'Physics-driven puzzle arena with high scores and sound effects',
    description: 'Fluid 60fps canvas animations, procedural level generator, responsive touch controls, and leaderboard.',
    defaultFeatures: ['canvas-renderer', 'high-scores', 'sound-fx', 'keyboard-controls'],
    metrics: [
      { label: 'Frame Rate', value: '60 FPS' },
      { label: 'Level Count', value: '24 stages' },
      { label: 'Audio Tracks', value: 'Procedural' },
    ],
    highlightColor: 'amber',
  },
];

export const AVAILABLE_FEATURES: FeatureOption[] = [
  { id: 'realtime-charts', name: 'Interactive Charts & Telemetry', description: 'Dynamic SVG line, bar and area charts with smooth hover tooltips', category: 'data', weight: 3 },
  { id: 'data-grid', name: 'Virtual Data Grid & Sorting', description: 'Fast multi-column sortable table with column filters and CSV export', category: 'data', weight: 3 },
  { id: 'kanban-board', name: 'Interactive Drag & Drop Board', description: 'Status columns with draggable cards, badges, and quick-add modal', category: 'core', weight: 4 },
  { id: 'cart-drawer', name: 'Cart Slide-over & Line Items', description: 'Persistent cart state, quantity incrementors, and subtotal math', category: 'core', weight: 2 },
  { id: 'search-filter', name: 'Faceted Multi-field Search', description: 'Instant client-side keyword filtering and active category chips', category: 'core', weight: 2 },
  { id: 'dark-mode', name: 'Dual Light/Dark Theme', description: 'Seamless theme switcher with synchronized contrast tokens', category: 'design', weight: 1 },
  { id: 'role-access', name: 'Role-Based Access Simulation', description: 'Admin, editor, and viewer state toggle with permission guards', category: 'security', weight: 3 },
  { id: 'audit-log', name: 'Activity Log & Event History', description: 'Chronological timeline of user interactions and state modifications', category: 'security', weight: 2 },
  { id: 'canvas-renderer', name: 'Hardware-Accelerated 2D Canvas', description: 'Custom animation loop with particle effects and bounding box collisions', category: 'core', weight: 4 },
  { id: 'tabular-data', name: 'Tabular Scientific Figures', description: 'Strict tabular figures alignment with scientific notation support', category: 'data', weight: 2 },
  { id: 'alert-manager', name: 'Threshold Alert Notifications', description: 'Configurable warning parameters with animated status toast tray', category: 'core', weight: 2 },
];

export interface ScopeAssessment {
  totalModules: number;
  complexityLabel: 'Light' | 'Balanced' | 'Advanced' | 'Enterprise';
  readinessScore: number; // 0 - 100
  estimatedComponents: number;
  recommendedStack: string[];
}

export function calculateProjectScope(selectedFeatureIds: string[], baseTemplateId?: string): ScopeAssessment {
  const selected = AVAILABLE_FEATURES.filter((f) => selectedFeatureIds.includes(f.id));
  const rawWeight = selected.reduce((sum, f) => sum + f.weight, 0);

  let complexityLabel: ScopeAssessment['complexityLabel'] = 'Light';
  if (rawWeight >= 14) {
    complexityLabel = 'Enterprise';
  } else if (rawWeight >= 9) {
    complexityLabel = 'Advanced';
  } else if (rawWeight >= 5) {
    complexityLabel = 'Balanced';
  }

  const estimatedComponents = Math.max(4, Math.round(selected.length * 1.75) + 3);
  const readinessScore = Math.min(100, Math.max(30, 45 + selected.length * 7 + (baseTemplateId ? 15 : 0)));

  const recommendedStack: string[] = ['React 19', 'Tailwind CSS v4', 'TypeScript'];
  if (selectedFeatureIds.includes('realtime-charts') || selectedFeatureIds.includes('data-grid')) {
    recommendedStack.push('Lucide Icons');
  }
  if (selectedFeatureIds.includes('canvas-renderer')) {
    recommendedStack.push('HTML5 Canvas Engine');
  }
  if (selectedFeatureIds.includes('dark-mode')) {
    recommendedStack.push('CSS Variables Theme Engine');
  }

  return {
    totalModules: selected.length,
    complexityLabel,
    readinessScore,
    estimatedComponents,
    recommendedStack,
  };
}

/**
 * Calculates relative luminance for WCAG 2.1 contrast calculations.
 */
function getLuminance(hex: string): number {
  const cleanHex = hex.replace('#', '');
  const r = parseInt(cleanHex.substring(0, 2), 16) / 255;
  const g = parseInt(cleanHex.substring(2, 4), 16) / 255;
  const b = parseInt(cleanHex.substring(4, 6), 16) / 255;

  const toLinear = (c: number) => (c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4));
  return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
}

/**
 * Returns WCAG contrast ratio between two hex colors (e.g. 7.2).
 */
export function calculateContrastRatio(hex1: string, hex2: string): number {
  try {
    const l1 = getLuminance(hex1);
    const l2 = getLuminance(hex2);
    const lighter = Math.max(l1, l2);
    const darker = Math.min(l1, l2);
    const ratio = (lighter + 0.05) / (darker + 0.05);
    return Math.round(ratio * 10) / 10;
  } catch {
    return 4.5;
  }
}

/**
 * Formats a clean, structured build prompt for the agent.
 */
export function generateBuildPrompt(params: {
  templateName: string;
  featureIds: string[];
  accentColor: string;
  customNotes?: string;
}): string {
  const { templateName, featureIds, accentColor, customNotes } = params;
  const featureNames = AVAILABLE_FEATURES.filter((f) => featureIds.includes(f.id)).map((f) => f.name);

  return [
    `Build the "${templateName}" application.`,
    `Selected Modules & Features:`,
    ...featureNames.map((name, i) => `  ${i + 1}. ${name}`),
    `Primary Design Accent: ${accentColor}`,
    customNotes?.trim() ? `Specific Requirements: ${customNotes.trim()}` : null,
    `Please ensure complete working handlers, high legibility, and responsive layout.`,
  ]
    .filter(Boolean)
    .join('\n');
}
