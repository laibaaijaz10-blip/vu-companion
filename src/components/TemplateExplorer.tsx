import React from 'react';
import { ProjectTemplate, TEMPLATES } from '../utils/workspace';
import { CheckCircle2, ChevronRight, BarChart3, ShoppingBag, Kanban, Activity, Gamepad2 } from 'lucide-react';

interface TemplateExplorerProps {
  selectedTemplate: ProjectTemplate;
  onSelectTemplate: (template: ProjectTemplate) => void;
  onJumpToPreview: () => void;
}

const ICONS_BY_ID: Record<string, React.ReactNode> = {
  'saas-dashboard': <BarChart3 className="w-5 h-5" />,
  'ecommerce-boutique': <ShoppingBag className="w-5 h-5" />,
  'workflow-kanban': <Kanban className="w-5 h-5" />,
  'science-telemetry': <Activity className="w-5 h-5" />,
  'casual-game': <Gamepad2 className="w-5 h-5" />,
};

export const TemplateExplorer: React.FC<TemplateExplorerProps> = ({
  selectedTemplate,
  onSelectTemplate,
  onJumpToPreview,
}) => {
  return (
    <section id="starters" className="py-12 bg-slate-50 dark:bg-slate-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 mb-1">
              Curated Foundations
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              Application Blueprints
            </h2>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              Select a starter architecture to inspect its data structures, components, and live demo.
            </p>
          </div>
          <button
            type="button"
            onClick={onJumpToPreview}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 self-start md:self-auto"
          >
            <span>Launch Live Preview</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TEMPLATES.map((tmpl) => {
            const isSelected = tmpl.id === selectedTemplate.id;
            return (
              <div
                key={tmpl.id}
                onClick={() => onSelectTemplate(tmpl)}
                className={`relative flex flex-col justify-between p-6 rounded-xl border bg-white dark:bg-slate-900 cursor-pointer transition-all duration-200 ${
                  isSelected
                    ? 'border-indigo-600 dark:border-indigo-500 shadow-md ring-1 ring-indigo-600 dark:ring-indigo-500'
                    : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-sm'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`p-2 rounded-lg text-slate-700 dark:text-slate-200 ${
                          isSelected
                            ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400'
                            : 'bg-slate-100 dark:bg-slate-800'
                        }`}
                      >
                        {ICONS_BY_ID[tmpl.id]}
                      </div>
                      <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                        {tmpl.category}
                      </span>
                    </div>
                    {isSelected && (
                      <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Active</span>
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-snug">
                    {tmpl.name}
                  </h3>

                  <p className="mt-2 text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                    {tmpl.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <div className="grid grid-cols-3 gap-2 text-center">
                    {tmpl.metrics.map((m, idx) => (
                      <div key={idx} className="flex flex-col">
                        <span className="text-xs text-slate-400 dark:text-slate-500">{m.label}</span>
                        <span className="text-sm font-semibold text-slate-800 dark:text-slate-200 tabular-nums">
                          {m.value}
                        </span>
                      </div>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectTemplate(tmpl);
                    }}
                    className={`mt-4 w-full py-2 px-3 text-xs font-semibold rounded-lg transition-colors ${
                      isSelected
                        ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                    }`}
                  >
                    {isSelected ? 'Selected Starter' : 'Switch to Starter'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
