import React, { useState } from 'react';
import {
  StudentSession,
  validateStudentCredentials,
  DAROOD_SHAREEF,
} from '../utils/studentAuth';
import { Lock, User, KeyRound, ArrowRight, ShieldCheck, Sparkles, BookOpen, Eye, EyeOff } from 'lucide-react';

interface StudentLoginScreenProps {
  onLoginSuccess: (session: StudentSession) => void;
}

export const StudentLoginScreen: React.FC<StudentLoginScreenProps> = ({ onLoginSuccess }) => {
  const [name, setName] = useState<string>('');
  const [vuId, setVuId] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const validation = validateStudentCredentials(name, vuId, password);
    if (!validation.isValid) {
      setErrorMessage(validation.error || 'Please check your inputs.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const session: StudentSession = {
        name: name.trim(),
        vuId: vuId.trim().toUpperCase(),
        isLoggedIn: true,
        loginTime: new Date().toISOString(),
      };

      try {
        localStorage.setItem('vu_student_session', JSON.stringify(session));
      } catch {
        // ignore
      }

      onLoginSuccess(session);
      setIsSubmitting(false);
    }, 400);
  };

  const handleDemoFill = () => {
    setName('Laiba Ijaz');
    setVuId('BC210401234');
    setPassword('vuStudent2026!');
    setErrorMessage(null);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 py-8 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-950 text-white relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-emerald-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-lg relative z-10 space-y-6">
        {/* Top Header & Branding */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-400/20 text-indigo-300 text-xs font-semibold">
            <Lock className="w-3.5 h-3.5 text-indigo-400" />
            <span>Virtual University Student Secure Portal</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            VU Academic Toolkit
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 italic font-serif">
            Made by Laiba Ijaz for VU Students
          </p>
        </div>

        {/* Durood-e-Ibrahimi Card on Login Gate */}
        <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-100 shadow-lg text-center space-y-2">
          <div className="flex items-center justify-center gap-1.5 text-emerald-400 text-xs font-bold">
            <BookOpen className="w-3.5 h-3.5" />
            <span>آغاز با درودِ پاک — Durood-e-Ibrahimi</span>
          </div>
          <p
            dir="rtl"
            className="text-xs sm:text-sm leading-relaxed text-emerald-200 font-serif"
            style={{ fontFamily: "'Amiri', 'Traditional Arabic', serif" }}
          >
            اَللّٰھُمَّ صَلِّ عَلٰی مُحَمَّدٍ وَّعَلٰی اٰلِ مُحَمَّدٍ كَمَا صَلَّيْتَ عَلٰى اِبْرَاھِيْمَ وَعَلٰى اٰلِ اِبْرَاھِيْمَ اِنَّكَ حَمِيْدٌ مَّجِيْدٌ
          </p>
          <p className="text-[11px] text-emerald-300/80">
            Recite Durood Shareef with devotion for ease and barakah in your studies.
          </p>
        </div>

        {/* Login Form Box */}
        <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl backdrop-blur-md space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-indigo-400" />
              <h2 className="text-base font-bold text-white">Student Login Gate</h2>
            </div>
            <button
              type="button"
              onClick={handleDemoFill}
              className="text-xs font-medium text-indigo-400 hover:text-indigo-300 flex items-center gap-1 cursor-pointer hover:underline"
            >
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>Demo Fill</span>
            </button>
          </div>

          {errorMessage && (
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-medium animate-in fade-in">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Student Name */}
            <div className="space-y-1.5">
              <label htmlFor="student-name" className="block text-xs font-semibold text-slate-300">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  id="student-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Laiba Ijaz"
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-sm text-white placeholder-slate-500 outline-none transition"
                />
              </div>
            </div>

            {/* VU Student ID */}
            <div className="space-y-1.5">
              <label htmlFor="student-vuid" className="block text-xs font-semibold text-slate-300">
                VU Student ID (Roll No.)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 font-mono text-xs">
                  VU#
                </div>
                <input
                  id="student-vuid"
                  type="text"
                  required
                  value={vuId}
                  onChange={(e) => setVuId(e.target.value.toUpperCase())}
                  placeholder="e.g. BC210401234 or MC200204567"
                  className="w-full pl-12 pr-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-sm text-white placeholder-slate-500 outline-none font-mono uppercase transition"
                />
              </div>
              <p className="text-[11px] text-slate-400">
                Format: BC / MC / BS followed by your numeric student digits.
              </p>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label htmlFor="student-password" className="block text-xs font-semibold text-slate-300">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <KeyRound className="w-4 h-4" />
                </div>
                <input
                  id="student-password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your student portal password"
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-950 border border-slate-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-sm text-white placeholder-slate-500 outline-none transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-200 transition cursor-pointer"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-2 py-3 px-4 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white font-bold text-sm shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 cursor-pointer transition disabled:opacity-50"
            >
              <span>{isSubmitting ? 'Authenticating...' : 'Unlock VU Student Portal'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Note */}
          <div className="text-center pt-2">
            <span className="text-[11px] text-slate-400">
              For Virtual University students across all 8 Semesters & 200+ Courses.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
