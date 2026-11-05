import React from 'react';
import { calculateContrastRatio } from '../utils/workspace';
import { Palette, CheckCircle2, ShieldCheck, Type } from 'lucide-react';

interface DesignTokensProps {
  accentColor: string;
  onSelectAccent: (accent: string) => void;
  radiusStyle: 'rounded-md' | 'rounded-xl' | 'rounded-2xl';
  onSelectRadius: (radius: 'rounded-md' | 'rounded-xl' | 'rounded-2xl') => void;
}

const PALETTES = [
  { id: 'indigo', name: 'Indigo Core', hex: '#4f46e5', lightSurface: '#ffffff', darkSurface: '#0f172a' },
  { id: 'emerald', name: 'Emerald Precision', hex: '#059669', lightSurface: '#ffffff', darkSurface: '#0f172a' },
  { id: 'violet', name: 'Violet Modernist', hex: '#7c3aed', lightSurface: '#ffffff', darkSurface: '#0f172a' },
  { id: 'cyan', name: 'Cyan Kinetic', hex: '#0891b2', lightSurface: '#ffffff', darkSurface: '#0f172a' },
  { id: 'amber', name: 'Amber Artisan', hex: '#d97706', lightSurface: '#ffffff', darkSurface: '#0f172a' },
  { id: 'rose', name: 'Rose Editorial', hex: '#e11d48', lightSurface: '#ffffff', darkSurface: '#0f172a' },
];

export const DesignTokensPlayground: React.FC<DesignTokensProps> = ({
  accentColor,
  onSelectAccent,
  radiusStyle,
  onSelectRadius,
}) => {
  const currentPalette = PALETTES.find((p) => p.id === accentColor) || PALETTES[0];
  const contrastOnWhite = calculateContrastRatio(currentPalette.hex, '#ffffff');
  const contrastOnDark = calculateContrastRatio(currentPalette.hex, '#0f172a');

  return (
    <section id="tokens" className="py-12 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 mb-1">
              Design Systems
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              Design Tokens & Accessibility
            </h2>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              Tune chromatic accents, verify WCAG 2.1 contrast math, and audit typographic scales.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Accent Color Chooser */}
          <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40">
            <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400 mb-2">
              <Palette className="w-3.5 h-3.5" />
              <span>Color Systems</span>
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4">
              Accent Palette
            </h3>

            <div className="grid grid-cols-2 gap-3">
              {PALETTES.map((p) => {
                const isSelected = p.id === accentColor;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => onSelectAccent(p.id)}
                    className={`p-3 rounded-lg border text-left flex items-center gap-3 transition-all ${
                      isSelected
                        ? 'border-indigo-600 bg-white dark:bg-slate-800 shadow-xs ring-1 ring-indigo-500'
                        : 'border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900 hover:border-slate-300'
                    }`}
                  >
                    <span
                      className="w-4 h-4 rounded-full shrink-0 shadow-xs"
                      style={{ backgroundColor: p.hex }}
                    />
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">
                        {p.name}
                      </div>
                      <div className="text-xs text-slate-400 font-mono tabular-nums">{p.hex}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* WCAG Contrast Inspector */}
          <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400 mb-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Automated WCAG Audit</span>
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4">
              Contrast Certification
            </h3>

            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-slate-500 dark:text-slate-400">On Pure White (#FFFFFF)</span>
                  <span className="font-bold text-slate-900 dark:text-white tabular-nums">
                    {contrastOnWhite}:1
                  </span>
                </div>
                <div className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 mt-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{contrastOnWhite >= 4.5 ? 'WCAG AA Passed (Normal Text)' : 'WCAG AA Passed (Large Text)'}</span>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-slate-500 dark:text-slate-400">On Deep Dark (#0F172A)</span>
                  <span className="font-bold text-slate-900 dark:text-white tabular-nums">
                    {contrastOnDark}:1
                  </span>
                </div>
                <div className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 mt-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{contrastOnDark >= 4.5 ? 'WCAG AA Passed (Normal Text)' : 'WCAG AA Passed (Large Text)'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Typography & Surface Geometry */}
          <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40">
            <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400 mb-2">
              <Type className="w-3.5 h-3.5" />
              <span>Geometry & Radius</span>
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4">
              Surface Geometry
            </h3>

            <div className="space-y-4">
              <div>
                <span className="text-xs text-slate-500 mb-2 block">Container Radius</span>
                <div className="grid grid-cols-3 gap-2">
                  {(['rounded-md', 'rounded-xl', 'rounded-2xl'] as const).map((rad) => (
                    <button
                      key={rad}
                      type="button"
                      onClick={() => onSelectRadius(rad)}
                      className={`py-2 px-2 text-xs font-semibold border transition-all text-center ${rad} ${
                        radiusStyle === rad
                          ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-300'
                          : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {rad.replace('rounded-', '')}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <span className="text-xs text-slate-500 mb-1 block">Live Button Preview</span>
                <button
                  type="button"
                  style={{ backgroundColor: currentPalette.hex }}
                  className={`w-full py-2.5 px-4 text-xs font-semibold text-white transition-opacity hover:opacity-95 ${radiusStyle}`}
                >
                  Primary Action Sample
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
