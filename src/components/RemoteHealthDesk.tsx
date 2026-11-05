import React, { useState, useEffect } from 'react';
import {
  HeartPulse,
  Clock,
  Eye,
  Droplets,
  Activity,
  Play,
  Pause,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Smile,
  Volume2,
  VolumeX,
} from 'lucide-react';

interface RemoteHealthDeskProps {
  onStudySessionCompleted: () => void;
}

export const RemoteHealthDesk: React.FC<RemoteHealthDeskProps> = ({
  onStudySessionCompleted,
}) => {
  // Timer State (25 min study = 1500 sec, 5 min break = 300 sec)
  const [timerMode, setTimerMode] = useState<'study' | 'short_break' | 'long_break'>('study');
  const [timeLeft, setTimeLeft] = useState<number>(25 * 60);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [breakAlertActive, setBreakAlertActive] = useState<boolean>(false);

  // Health Metrics
  const [waterGlasses, setWaterGlasses] = useState<number>(4);
  const [completedStretches, setCompletedStretches] = useState<string[]>([]);
  const [isEyeSessionOpen, setIsEyeSessionOpen] = useState<boolean>(false);
  const [eyeCountdown, setEyeCountdown] = useState<number>(20);

  // Play chime sound safely using Web Audio API (no external file dependencies)
  const playChime = () => {
    if (!soundEnabled) return;
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.3); // A5
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.8);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.8);
    } catch {
      // AudioContext not available in silent mode
    }
  };

  useEffect(() => {
    let interval: any = null;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
      playChime();
      if (timerMode === 'study') {
        setBreakAlertActive(true);
        onStudySessionCompleted(); // Rewards Cat Milo!
      } else {
        alert('Break completed! Ready to continue your VU study session?');
      }
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft, timerMode]);

  // Eye countdown loop
  useEffect(() => {
    let eyeInterval: any = null;
    if (isEyeSessionOpen && eyeCountdown > 0) {
      eyeInterval = setInterval(() => {
        setEyeCountdown((c) => c - 1);
      }, 1000);
    } else if (eyeCountdown === 0 && isEyeSessionOpen) {
      playChime();
    }
    return () => clearInterval(eyeInterval);
  }, [isEyeSessionOpen, eyeCountdown]);

  const switchMode = (mode: 'study' | 'short_break' | 'long_break') => {
    setTimerMode(mode);
    setIsRunning(false);
    if (mode === 'study') setTimeLeft(25 * 60);
    else if (mode === 'short_break') setTimeLeft(5 * 60);
    else setTimeLeft(15 * 60);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const stretches = [
    {
      id: 'neck',
      title: 'Cervical Neck Release',
      duration: '30s',
      instruction: 'Gently tuck your chin in and tilt head left then right. Relieves laptop screen strain.',
    },
    {
      id: 'shoulder',
      title: 'Shoulder Blade Retraction',
      duration: '45s',
      instruction: 'Pull shoulder blades backward as if squeezing a pencil between them. Counteracts desk hunching.',
    },
    {
      id: 'wrist',
      title: 'Keyboard Typing Wrist Stretch',
      duration: '30s',
      instruction: 'Extend arm with palm facing forward; gently pull back fingers with other hand. Essential for CS coding & MathType exams.',
    },
    {
      id: 'spine',
      title: 'Seated Spinal Twist',
      duration: '40s',
      instruction: 'Sit upright, place right hand on left knee, gently rotate torso. Keeps lower back relaxed during marathon sessions.',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-teal-950 via-slate-900 to-indigo-950 text-white shadow-sm border border-slate-800">
        <div className="flex items-center gap-2 text-xs font-semibold text-teal-400 mb-1">
          <HeartPulse className="w-4 h-4" />
          <span>Ergonomics & Mental Fatigue Defense</span>
          <span aria-hidden="true">·</span>
          <span>Zero Burnout Guarantee</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
          Remote Health Desk — Protect Your Mind & Posture
        </h2>
        <p className="mt-1 text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
          Ghar par lambay ghantay online parhnay se sar dard, gardan mein dard (neck strain) aur aankhon ki thakawat (eye fatigue)
          ho jati hai. Use this smart health desk to take timely breaks, stay hydrated, and keep your focus razor sharp.
        </p>
      </div>

      {/* Break Due Alert Banner */}
      {breakAlertActive && (
        <div className="p-4 rounded-xl bg-amber-500 text-slate-950 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-md animate-in fade-in">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-6 h-6 shrink-0" />
            <div>
              <h4 className="text-sm font-bold">25-Minute Study Sprint Completed! Time for an Eye Rest.</h4>
              <p className="text-xs">
                Look away from your screen, stretch your neck, and take a sip of water. Cat Milo earned +2 Fish Treats!
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                setBreakAlertActive(false);
                switchMode('short_break');
                setIsRunning(true);
              }}
              className="px-3 py-1.5 text-xs font-bold rounded-lg bg-slate-950 text-white hover:bg-slate-900"
            >
              Start 5-Min Rest
            </button>
            <button
              type="button"
              onClick={() => setBreakAlertActive(false)}
              className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-amber-600 text-white"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      {/* Main Grid: Study / Break Pomodoro Timer (Left 6 Cols) & Ergonomic Toolkit (Right 6 Cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Timer Card (6 Cols) */}
        <div className="lg:col-span-6 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col justify-between space-y-6">
          <div>
            <div className="flex items-center justify-between gap-2 mb-4">
              <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => switchMode('study')}
                  className={`px-3 py-1.5 rounded-lg transition-colors ${
                    timerMode === 'study'
                      ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-xs'
                      : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  Study Focus (25m)
                </button>
                <button
                  type="button"
                  onClick={() => switchMode('short_break')}
                  className={`px-3 py-1.5 rounded-lg transition-colors ${
                    timerMode === 'short_break'
                      ? 'bg-white dark:bg-slate-700 text-teal-600 dark:text-teal-400 shadow-xs'
                      : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  Eye Rest (5m)
                </button>
                <button
                  type="button"
                  onClick={() => switchMode('long_break')}
                  className={`px-3 py-1.5 rounded-lg transition-colors ${
                    timerMode === 'long_break'
                      ? 'bg-white dark:bg-slate-700 text-amber-600 dark:text-amber-400 shadow-xs'
                      : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  Deep Rest (15m)
                </button>
              </div>

              <button
                type="button"
                onClick={() => setSoundEnabled(!soundEnabled)}
                className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-lg border border-slate-200 dark:border-slate-700"
                title={soundEnabled ? 'Chime Enabled' : 'Chime Muted'}
              >
                {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-500" /> : <VolumeX className="w-4 h-4" />}
              </button>
            </div>

            {/* Giant Digital Clock Face */}
            <div className="p-8 rounded-2xl bg-slate-50 dark:bg-slate-950/70 border border-slate-100 dark:border-slate-800 text-center">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-1">
                {timerMode === 'study' ? '🎯 Current Focus Session' : '🌿 Rest & Recovery Window'}
              </span>
              <div className="text-5xl sm:text-6xl font-black font-mono tracking-tight text-slate-900 dark:text-white tabular-nums">
                {formatTime(timeLeft)}
              </div>
              <p className="mt-2 text-xs text-slate-500">
                {timerMode === 'study'
                  ? 'Keep notifications muted. Completing this session feeds Cat Milo +2 kibbles!'
                  : 'Look away from screens. Relax your neck and shoulders.'}
              </p>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => setIsRunning(!isRunning)}
              className={`px-8 py-3 rounded-xl text-sm font-bold text-white shadow-sm transition-all flex items-center gap-2 ${
                isRunning
                  ? 'bg-amber-600 hover:bg-amber-700'
                  : 'bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600'
              }`}
            >
              {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              <span>{isRunning ? 'Pause Timer' : 'Start Focus Sprint'}</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setIsRunning(false);
                if (timerMode === 'study') setTimeLeft(25 * 60);
                else if (timerMode === 'short_break') setTimeLeft(5 * 60);
                else setTimeLeft(15 * 60);
              }}
              className="p-3 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              title="Reset Timer"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Ergonomic & Eye Strain Reset Tools (6 Cols) */}
        <div className="lg:col-span-6 space-y-4">
          {/* 20-20-20 Eye Strain Reset Card */}
          <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-teal-50 dark:bg-teal-950 text-teal-600 dark:text-teal-400">
                  <Eye className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    20-20-20 Eye Strain Reset
                  </h3>
                  <p className="text-[11px] text-slate-500">Every 20 mins, look 20 ft away for 20 secs</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  setEyeCountdown(20);
                  setIsEyeSessionOpen(true);
                }}
                className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-teal-600 hover:bg-teal-700 text-white transition-colors"
              >
                Launch 20s Reset
              </button>
            </div>

            {isEyeSessionOpen && (
              <div className="p-4 rounded-xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800 space-y-2 text-center animate-in fade-in">
                <div className="w-10 h-10 rounded-full bg-teal-600 text-white flex items-center justify-center font-bold text-lg mx-auto animate-pulse tabular-nums">
                  {eyeCountdown}s
                </div>
                <h4 className="text-xs font-bold text-teal-900 dark:text-teal-200">
                  Look away at a distant wall, tree, or window!
                </h4>
                <p className="text-[11px] text-teal-700 dark:text-teal-400">
                  Blink gently 5 times. Relax your optic nerves from blue-light glare.
                </p>
                {eyeCountdown === 0 && (
                  <button
                    type="button"
                    onClick={() => setIsEyeSessionOpen(false)}
                    className="mt-2 text-xs font-bold text-teal-700 hover:underline"
                  >
                    Close Session ✓
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Hydration Tracker */}
          <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 dark:text-white mb-0.5">
                <Droplets className="w-4 h-4 text-cyan-500" />
                <span>Daily Study Hydration</span>
              </div>
              <p className="text-xs text-slate-500">
                Target: 8 glasses · <span className="font-semibold text-cyan-600">{waterGlasses} drank</span>
              </p>
            </div>

            <div className="flex items-center gap-1.5">
              {[...Array(8)].map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setWaterGlasses(i + 1)}
                  className={`w-7 h-8 rounded-md flex items-center justify-center text-xs transition-colors ${
                    i < waterGlasses
                      ? 'bg-cyan-500 text-white shadow-xs'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
                  }`}
                  title={`Glass ${i + 1}`}
                >
                  💧
                </button>
              ))}
            </div>
          </div>

          {/* Desk Stretches for Posture & Pain Prevention */}
          <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-indigo-500" />
              <span>Pain & Stiffness Stretches (Select When Done)</span>
            </h3>

            <div className="space-y-2">
              {stretches.map((s) => {
                const isDone = completedStretches.includes(s.id);
                return (
                  <div
                    key={s.id}
                    onClick={() =>
                      setCompletedStretches((prev) =>
                        prev.includes(s.id) ? prev.filter((id) => id !== s.id) : [...prev, s.id]
                      )
                    }
                    className={`p-3 rounded-xl border text-xs cursor-pointer transition-colors flex items-start justify-between gap-3 ${
                      isDone
                        ? 'border-emerald-300 dark:border-emerald-800 bg-emerald-50/40 dark:bg-emerald-950/20'
                        : 'border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/30 hover:border-slate-300'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="font-bold text-slate-900 dark:text-white">{s.title}</span>
                        <span className="text-[10px] text-slate-400 tabular-nums">({s.duration})</span>
                      </div>
                      <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-normal">
                        {s.instruction}
                      </p>
                    </div>

                    <button
                      type="button"
                      className={`p-1 rounded-md shrink-0 ${
                        isDone
                          ? 'bg-emerald-600 text-white'
                          : 'border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-transparent'
                      }`}
                    >
                      <CheckCircle2 className="w-4 h-4" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
