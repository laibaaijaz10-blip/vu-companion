import React from 'react';
import { AVAILABLE_FEATURES, FeatureOption, ScopeAssessment } from '../utils/workspace';
import { Check, Plus, Sliders, Shield, Database, Layout, Sparkles } from 'lucide-react';

interface FeatureMatrixProps {
  selectedFeatures: string[];
  onToggleFeature: (featureId: string) => void;
  scope: ScopeAssessment;
  onResetFeatures: () => void;
}

const CATEGORY_LABELS: Record<FeatureOption['category'], { label: string; icon: React.ReactNode }> = {
  core: { label: 'Core Workflows', icon: <Layout className="w-3.5 h-3.5" /> },
  data: { label: 'Data & Telemetry', icon: <Database className="w-3.5 h-3.5" /> },
  security: { label: 'Access & Governance', icon: <Shield className="w-3.5 h-3.5" /> },
  design: { label: 'UI & Theming', icon: <Sparkles className="w-3.5 h-3.5" /> },
};

export const FeatureMatrix: React.FC<FeatureMatrixProps> = ({
  selectedFeatures,
  onToggleFeature,
  scope,
  onResetFeatures,
}) => {
  return (
    <section id="features" className="py-12 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left 2 Cols: Feature selection list */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between gap-4 mb-6">
              <div>
                <div className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 mb-1">
                  Architecture Configuration
                </div>
                <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                  Feature Architect & Capabilities
                </h2>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                  Select and configure modules to formulate your application architecture.
                </p>
              </div>

              <button
                type="button"
                onClick={onResetFeatures}
                className="text-xs font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
              >
                Reset Default
              </button>
            </div>

            <div className="space-y-3">
              {AVAILABLE_FEATURES.map((feature) => {
                const isChecked = selectedFeatures.includes(feature.id);
                const catMeta = CATEGORY_LABELS[feature.category];

                return (
                  <div
                    key={feature.id}
                    onClick={() => onToggleFeature(feature.id)}
                    className={`p-4 rounded-xl border cursor-pointer transition-all flex items-start gap-4 ${
                      isChecked
                        ? 'border-indigo-600/60 dark:border-indigo-500/60 bg-indigo-50/30 dark:bg-indigo-950/20'
                        : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900'
                    }`}
                  >
                    <button
                      type="button"
                      aria-label={`Toggle feature ${feature.name}`}
                      aria-checked={isChecked}
                      role="checkbox"
                      className={`mt-0.5 w-5 h-5 rounded flex items-center justify-center shrink-0 transition-colors ${
                        isChecked
                          ? 'bg-indigo-600 text-white'
                          : 'border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800'
                      }`}
                    >
                      {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </button>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 font-medium">
                          {catMeta.icon}
                          <span>{catMeta.label}</span>
                        </span>
                        <span className="text-xs text-slate-300 dark:text-slate-700">·</span>
                        <span className="text-xs text-slate-400 dark:text-slate-500 tabular-nums">
                          Weight: {feature.weight}
                        </span>
                      </div>
                      <h3 className="text-sm font-semibold text-slate-900 dark:text-white leading-tight">
                        {feature.name}
                      </h3>
                      <p className="mt-1 text-xs text-slate-600 dark:text-slate-300 leading-normal">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right 1 Col: Live Scope Calculator */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 transition-colors">
              <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400 mb-2">
                <Sliders className="w-3.5 h-3.5" />
                <span>Scope Estimator</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Project Blueprint Specs
              </h3>

              <div className="mt-6 space-y-4">
                <div>
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-slate-600 dark:text-slate-400 font-medium">Readiness Index</span>
                    <span className="font-bold text-slate-900 dark:text-white tabular-nums">
                      {scope.readinessScore}%
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                    <div
                      className="h-full bg-indigo-600 dark:bg-indigo-500 rounded-full transition-all duration-300"
                      style={{ width: `${scope.readinessScore}%` }}
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200 dark:border-slate-800 grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-xs text-slate-500 dark:text-slate-400">Total Modules</span>
                    <div className="text-xl font-bold text-slate-900 dark:text-white tabular-nums">
                      {scope.totalModules}
                    </div>
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 dark:text-slate-400">Complexity</span>
                    <div className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
                      {scope.complexityLabel}
                    </div>
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 dark:text-slate-400">Est. Components</span>
                    <div className="text-xl font-bold text-slate-900 dark:text-white tabular-nums">
                      ~{scope.estimatedComponents}
                    </div>
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 dark:text-slate-400">Target Framework</span>
                    <div className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                      React 19 SPA
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
                  <span className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-2 block">
                    Recommended Tech Stack
                  </span>
                  <div className="flex flex-wrap gap-2 text-xs text-slate-700 dark:text-slate-300">
                    {scope.recommendedStack.map((tech, idx) => (
                      <span
                        key={idx}
                        className="py-1 px-2 rounded-md bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
