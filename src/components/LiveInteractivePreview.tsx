import React, { useState, useEffect, useRef } from 'react';
import { ProjectTemplate } from '../utils/workspace';
import {
  TrendingUp,
  DollarSign,
  Users,
  Search,
  ShoppingCart,
  Trash2,
  Plus,
  Play,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Download,
} from 'lucide-react';

interface LivePreviewProps {
  template: ProjectTemplate;
}

export const LiveInteractivePreview: React.FC<LivePreviewProps> = ({ template }) => {
  // SAAS STATE
  const [saasTimeframe, setSaasTimeframe] = useState<'30d' | '90d' | '1y'>('30d');
  const [saasSearch, setSaasSearch] = useState('');
  const [saasSortKey, setSaasSortKey] = useState<'name' | 'revenue' | 'status'>('revenue');

  // ECOMMERCE STATE
  const [cart, setCart] = useState<{ id: string; name: string; price: number; qty: number }[]>([
    { id: '1', name: 'Minimalist Titanium Pen', price: 68, qty: 1 },
    { id: '2', name: 'Merino Wool Desk Mat', price: 92, qty: 1 },
  ]);
  const [cartOpen, setCartOpen] = useState(false);

  // KANBAN STATE
  const [tasks, setTasks] = useState<{ id: string; title: string; column: 'todo' | 'doing' | 'done' }[]>([
    { id: 't1', title: 'Implement OAuth refresh token rotation', column: 'todo' },
    { id: 't2', title: 'Design responsive tablet navigation', column: 'doing' },
    { id: 't3', title: 'Migrate to Tailwind CSS v4 custom variant', column: 'done' },
  ]);
  const [newTaskInput, setNewTaskInput] = useState('');

  // SCIENCE STATE
  const [isSensorsRunning, setIsSensorsRunning] = useState(true);
  const [phVal, setPhVal] = useState(7.34);
  const [tempVal, setTempVal] = useState(37.1);
  const [dissolvedO2, setDissolvedO2] = useState(94.2);

  useEffect(() => {
    if (!isSensorsRunning || template.id !== 'science-telemetry') return;
    const interval = setInterval(() => {
      setPhVal((p) => +(p + (Math.random() * 0.08 - 0.04)).toFixed(2));
      setTempVal((t) => +(t + (Math.random() * 0.2 - 0.1)).toFixed(1));
      setDissolvedO2((o) => +(o + (Math.random() * 0.4 - 0.2)).toFixed(1));
    }, 1200);
    return () => clearInterval(interval);
  }, [isSensorsRunning, template.id]);

  // ARCADE STATE
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [score, setScore] = useState(0);
  const [gameActive, setGameActive] = useState(false);
  const targetsRef = useRef<{ x: number; y: number; r: number; vx: number; vy: number; color: string }[]>([]);

  useEffect(() => {
    if (template.id !== 'casual-game') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let spawnCounter = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Background grid
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 30) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += 30) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      if (gameActive) {
        spawnCounter++;
        if (spawnCounter % 60 === 0 && targetsRef.current.length < 8) {
          targetsRef.current.push({
            x: Math.random() * (canvas.width - 60) + 30,
            y: Math.random() * (canvas.height - 60) + 30,
            r: 16,
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2,
            color: ['#6366f1', '#10b981', '#f59e0b', '#ec4899'][Math.floor(Math.random() * 4)],
          });
        }

        // Draw and move targets
        targetsRef.current.forEach((t) => {
          t.x += t.vx;
          t.y += t.vy;
          if (t.x - t.r < 0 || t.x + t.r > canvas.width) t.vx *= -1;
          if (t.y - t.r < 0 || t.y + t.r > canvas.height) t.vy *= -1;

          ctx.beginPath();
          ctx.arc(t.x, t.y, t.r, 0, Math.PI * 2);
          ctx.fillStyle = t.color;
          ctx.fill();
          ctx.lineWidth = 2;
          ctx.strokeStyle = '#ffffff';
          ctx.stroke();
        });
      } else {
        ctx.fillStyle = '#94a3b8';
        ctx.font = '14px Plus Jakarta Sans';
        ctx.textAlign = 'center';
        ctx.fillText('Press "Start Session" and click moving orbs!', canvas.width / 2, canvas.height / 2);
      }

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [gameActive, template.id]);

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!gameActive) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    const hitIndex = targetsRef.current.findIndex((t) => {
      const dist = Math.hypot(t.x - clickX, t.y - clickY);
      return dist <= t.r + 5;
    });

    if (hitIndex !== -1) {
      targetsRef.current.splice(hitIndex, 1);
      setScore((s) => s + 100);
    }
  };

  return (
    <section id="preview" className="py-12 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div>
            <div className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 mb-1">
              Live Sandbox
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              Interactive Prototype: {template.name}
            </h2>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              Test real state transitions, inputs, and interactive components directly on this page.
            </p>
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400 font-mono">
            Active Module: <span className="font-semibold text-slate-800 dark:text-slate-200">{template.id}</span>
          </div>
        </div>

        {/* PREVIEW CONTAINER */}
        <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm transition-colors">
          {/* SAAS DASHBOARD DEMO */}
          {template.id === 'saas-dashboard' && (
            <div className="space-y-6">
              {/* Header bar */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
                  {(['30d', '90d', '1y'] as const).map((tf) => (
                    <button
                      key={tf}
                      type="button"
                      onClick={() => setSaasTimeframe(tf)}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                        saasTimeframe === tf
                          ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      {tf === '30d' ? 'Last 30 Days' : tf === '90d' ? 'Quarter' : 'Full Year'}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="w-4 h-4 text-slate-400 absolute left-2.5 top-2.5" />
                    <input
                      type="text"
                      placeholder="Filter accounts..."
                      value={saasSearch}
                      onChange={(e) => setSaasSearch(e.target.value)}
                      className="pl-8 pr-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-200 focus:outline-indigo-500"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => alert('Simulated CSV exported!')}
                    className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300"
                    title="Export CSV"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* KPI Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40">
                  <span className="text-xs text-slate-500 dark:text-slate-400">Monthly Recurring Revenue</span>
                  <div className="mt-1 text-2xl font-bold text-slate-900 dark:text-white tabular-nums">
                    {saasTimeframe === '30d' ? '$128,450' : saasTimeframe === '90d' ? '$391,200' : '$1,420,000'}
                  </div>
                  <div className="mt-2 text-xs text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-medium">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>+14.8% vs prior interval</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40">
                  <span className="text-xs text-slate-500 dark:text-slate-400">Active Workspaces</span>
                  <div className="mt-1 text-2xl font-bold text-slate-900 dark:text-white tabular-nums">
                    {saasTimeframe === '30d' ? '3,480' : saasTimeframe === '90d' ? '3,890' : '4,210'}
                  </div>
                  <div className="mt-2 text-xs text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-medium">
                    <Users className="w-3.5 h-3.5" />
                    <span>98.6% 30-day retention</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40">
                  <span className="text-xs text-slate-500 dark:text-slate-400">P95 Response Latency</span>
                  <div className="mt-1 text-2xl font-bold text-indigo-600 dark:text-indigo-400 tabular-nums">
                    42 ms
                  </div>
                  <div className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                    Edge CDN verified globally
                  </div>
                </div>
              </div>

              {/* Data Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400">
                      <th className="py-2.5 font-semibold">Account Name</th>
                      <th className="py-2.5 font-semibold">Plan Tier</th>
                      <th className="py-2.5 font-semibold tabular-nums text-right">ARR Contribution</th>
                      <th className="py-2.5 font-semibold text-right">Health Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                    {[
                      { name: 'Acme Systems Europe', tier: 'Enterprise Plus', revenue: '$34,000/yr', status: 'Optimal' },
                      { name: 'Helix Biotechnology', tier: 'Enterprise Dedicated', revenue: '$52,000/yr', status: 'Optimal' },
                      { name: 'Linear Design Labs', tier: 'Team Scale', revenue: '$14,400/yr', status: 'Reviewing' },
                      { name: 'Vector Aerospace', tier: 'Enterprise Plus', revenue: '$48,000/yr', status: 'Optimal' },
                    ]
                      .filter((row) => row.name.toLowerCase().includes(saasSearch.toLowerCase()))
                      .map((row, idx) => (
                        <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                          <td className="py-3 font-semibold text-slate-800 dark:text-slate-200">{row.name}</td>
                          <td className="py-3 text-slate-500 dark:text-slate-400">{row.tier}</td>
                          <td className="py-3 text-right font-medium text-slate-800 dark:text-slate-200 tabular-nums">
                            {row.revenue}
                          </td>
                          <td className="py-3 text-right">
                            <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                              {row.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* E-COMMERCE DEMO */}
          {template.id === 'ecommerce-boutique' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">Curated Collection</h3>
                  <p className="text-xs text-slate-500">Fine stationery & architectural desktop tools</p>
                </div>
                <button
                  type="button"
                  onClick={() => setCartOpen(!cartOpen)}
                  className="relative p-2 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 flex items-center gap-2 text-xs font-semibold"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>Cart ({cart.reduce((sum, item) => sum + item.qty, 0)})</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {[
                  { id: '1', name: 'Minimalist Titanium Pen', price: 68, category: 'Writing Instruments' },
                  { id: '2', name: 'Merino Wool Desk Mat', price: 92, category: 'Desk Objects' },
                  { id: '3', name: 'Machined Aluminum Stand', price: 115, category: 'Hardware' },
                ].map((item) => (
                  <div key={item.id} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-col justify-between">
                    <div>
                      <div className="w-full h-32 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 mb-3">
                        <span className="text-xs font-mono">{item.name}</span>
                      </div>
                      <span className="text-xs text-slate-400">{item.category}</span>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">{item.name}</h4>
                      <div className="mt-1 text-sm font-semibold text-indigo-600 dark:text-indigo-400 tabular-nums">
                        ${item.price}.00
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setCart((prev) => {
                          const existing = prev.find((p) => p.id === item.id);
                          if (existing) {
                            return prev.map((p) => (p.id === item.id ? { ...p, qty: p.qty + 1 } : p));
                          }
                          return [...prev, { ...item, qty: 1 }];
                        });
                      }}
                      className="mt-4 w-full py-1.5 px-3 rounded-lg text-xs font-semibold bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:opacity-90 transition-opacity"
                    >
                      Add to Bag
                    </button>
                  </div>
                ))}
              </div>

              {cartOpen && (
                <div className="p-4 rounded-xl border border-indigo-200 dark:border-indigo-900 bg-indigo-50/50 dark:bg-indigo-950/20">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-indigo-900 dark:text-indigo-300">Active Bag Drawer</span>
                    <span className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold tabular-nums">
                      Subtotal: ${cart.reduce((sum, item) => sum + item.price * item.qty, 0)}.00
                    </span>
                  </div>
                  <div className="space-y-2">
                    {cart.map((c) => (
                      <div key={c.id} className="flex items-center justify-between text-xs py-1">
                        <span className="text-slate-800 dark:text-slate-200 font-medium">
                          {c.name} (x{c.qty})
                        </span>
                        <div className="flex items-center gap-3">
                          <span className="tabular-nums font-semibold">${c.price * c.qty}.00</span>
                          <button
                            type="button"
                            onClick={() => setCart((prev) => prev.filter((p) => p.id !== c.id))}
                            className="text-red-500 hover:text-red-700"
                            title="Remove"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* WORKFLOW KANBAN DEMO */}
          {template.id === 'workflow-kanban' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="New sprint card title..."
                    value={newTaskInput}
                    onChange={(e) => setNewTaskInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && newTaskInput.trim()) {
                        setTasks((prev) => [
                          ...prev,
                          { id: `t${Date.now()}`, title: newTaskInput.trim(), column: 'todo' },
                        ]);
                        setNewTaskInput('');
                      }
                    }}
                    className="px-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-200 w-64 focus:outline-indigo-500"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (newTaskInput.trim()) {
                        setTasks((prev) => [
                          ...prev,
                          { id: `t${Date.now()}`, title: newTaskInput.trim(), column: 'todo' },
                        ]);
                        setNewTaskInput('');
                      }
                    }}
                    className="p-1.5 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 text-xs font-semibold"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <span className="text-xs text-slate-500 tabular-nums">{tasks.length} sprint tickets active</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {(['todo', 'doing', 'done'] as const).map((col) => {
                  const colTasks = tasks.filter((t) => t.column === col);
                  const title = col === 'todo' ? 'Backlog & Queue' : col === 'doing' ? 'In Active Progress' : 'Completed';
                  return (
                    <div key={col} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
                      <div className="flex items-center justify-between mb-3 text-xs font-bold text-slate-700 dark:text-slate-300">
                        <span>{title}</span>
                        <span className="text-slate-400 tabular-nums">{colTasks.length}</span>
                      </div>
                      <div className="space-y-2">
                        {colTasks.map((t) => (
                          <div
                            key={t.id}
                            className="p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs text-xs"
                          >
                            <p className="font-semibold text-slate-800 dark:text-slate-200">{t.title}</p>
                            <div className="mt-2 flex items-center justify-between text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
                              <span>Move:</span>
                              <div className="flex gap-1.5">
                                {col !== 'todo' && (
                                  <button
                                    type="button"
                                    onClick={() =>
                                      setTasks((prev) =>
                                        prev.map((task) =>
                                          task.id === t.id ? { ...task, column: col === 'done' ? 'doing' : 'todo' } : task
                                        )
                                      )
                                    }
                                    className="text-slate-500 hover:text-indigo-600 font-bold"
                                  >
                                    ←
                                  </button>
                                )}
                                {col !== 'done' && (
                                  <button
                                    type="button"
                                    onClick={() =>
                                      setTasks((prev) =>
                                        prev.map((task) =>
                                          task.id === t.id ? { ...task, column: col === 'todo' ? 'doing' : 'done' } : task
                                        )
                                      )
                                    }
                                    className="text-slate-500 hover:text-indigo-600 font-bold"
                                  >
                                    →
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* SCIENCE TELEMETRY DEMO */}
          {template.id === 'science-telemetry' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-900 dark:text-white">Probes Continuous Monitor</span>
                  <span className="text-xs text-slate-400">· Channel Alpha-01</span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsSensorsRunning(!isSensorsRunning)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    isSensorsRunning
                      ? 'bg-amber-100 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800'
                      : 'bg-indigo-600 text-white'
                  }`}
                >
                  {isSensorsRunning ? 'Pause Probes' : 'Resume Probes'}
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40">
                  <span className="text-xs text-slate-400">Bioreactor pH</span>
                  <div className="mt-1 text-2xl font-bold font-mono text-cyan-600 dark:text-cyan-400 tabular-nums">
                    {phVal} pH
                  </div>
                  <span className="text-xs text-slate-500 mt-1 block">Set point: 7.40 ± 0.1</span>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40">
                  <span className="text-xs text-slate-400">Chamber Temperature</span>
                  <div className="mt-1 text-2xl font-bold font-mono text-slate-900 dark:text-white tabular-nums">
                    {tempVal} °C
                  </div>
                  <span className="text-xs text-slate-500 mt-1 block">Target: 37.0 °C</span>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40">
                  <span className="text-xs text-slate-400">Dissolved Oxygen</span>
                  <div className="mt-1 text-2xl font-bold font-mono text-emerald-600 dark:text-emerald-400 tabular-nums">
                    {dissolvedO2} %
                  </div>
                  <span className="text-xs text-slate-500 mt-1 block">Saturation: Normal</span>
                </div>
              </div>
            </div>
          )}

          {/* CASUAL GAME DEMO */}
          {template.id === 'casual-game' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={() => {
                      setGameActive(!gameActive);
                      if (!gameActive) {
                        setScore(0);
                        targetsRef.current = [];
                      }
                    }}
                    className="px-4 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white transition-colors"
                  >
                    {gameActive ? 'End Session' : 'Start Session'}
                  </button>
                  <span className="text-xs text-slate-500">
                    Target: Click moving spheres as they bounce!
                  </span>
                </div>
                <div className="text-sm font-bold text-slate-900 dark:text-white tabular-nums">
                  Score: {score} pts
                </div>
              </div>

              <div className="w-full flex justify-center bg-slate-950 rounded-xl overflow-hidden p-2">
                <canvas
                  ref={canvasRef}
                  width={640}
                  height={260}
                  onClick={handleCanvasClick}
                  className="rounded-lg cursor-crosshair max-w-full"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
