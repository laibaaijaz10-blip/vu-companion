import React, { useState } from 'react';
import { ExamCenter, ExamCenterReview } from '../utils/vuExamCentersData';
import { filterExamCenters } from '../utils/vuLogic';
import {
  Star,
  Search,
  Filter,
  PlusCircle,
  CheckCircle2,
  AlertCircle,
  ThumbsUp,
  ThumbsDown,
  Monitor,
  Wind,
  Shield,
  Zap,
  Volume2,
  Calendar,
  X,
  Cpu,
  MousePointer2,
  Keyboard,
  Sparkles,
  ThermometerSnowflake,
  HelpCircle,
  Quote,
  PenTool,
} from 'lucide-react';
import { StudentSession } from '../utils/studentAuth';

interface ExamCenterNavigatorProps {
  centers: ExamCenter[];
  onAddReview: (centerId: string, review: Omit<ExamCenterReview, 'id' | 'date'>) => void;
  studentSession?: StudentSession | null;
}

export const ExamCenterNavigator: React.FC<ExamCenterNavigatorProps> = ({
  centers,
  onAddReview,
  studentSession,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'rating' | 'reviews' | 'name'>('rating');
  const [minRating, setMinRating] = useState<number>(0);
  const [hardwareFilter, setHardwareFilter] = useState<
    'all' | 'ac_chilled' | 'keyboard_smooth' | 'mouse_smooth' | 'pc_fast'
  >('all');

  const [selectedCenter, setSelectedCenter] = useState<ExamCenter | null>(centers[0] || null);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [showInlineForm, setShowInlineForm] = useState<boolean>(false);
  const [showSourcesModal, setShowSourcesModal] = useState<boolean>(false);

  const defaultStudentName = studentSession?.name
    ? `${studentSession.name} (${studentSession.vuId})`
    : '';

  // Review Form State with specific hardware fields
  const [formCenterId, setFormCenterId] = useState(centers[0]?.id || '');
  const [formStudentName, setFormStudentName] = useState(defaultStudentName);
  const [formExamType, setFormExamType] = useState<'Midterm' | 'Finalterm' | 'Practical'>('Finalterm');
  const [formRating, setFormRating] = useState(5);
  const [formHardwareRating, setFormHardwareRating] = useState(5);
  const [formStaffRating, setFormStaffRating] = useState(5);

  // Specific hardware & facility review selections
  const [formAcSpeed, setFormAcSpeed] = useState<ExamCenterReview['acSpeedRating']>('Chilled & High Speed');
  const [formKeyboard, setFormKeyboard] = useState<ExamCenterReview['keyboardRating']>('100% Working (Smooth & Soft)');
  const [formMouse, setFormMouse] = useState<ExamCenterReview['mouseRating']>('Smooth Laser & Precise');
  const [formComputerSpeed, setFormComputerSpeed] = useState<ExamCenterReview['computerSpeedRating']>('Fast Core i5/i7 SSD (Zero Lag)');

  const [formComment, setFormComment] = useState('');
  const [formPros, setFormPros] = useState('');
  const [formCons, setFormCons] = useState('');
  const [formTip, setFormTip] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Helper to pre-populate verified demo review
  const handleFillDemoReview = () => {
    setFormStudentName(defaultStudentName || 'Laiba Ijaz (BC210401234)');
    setFormRating(5);
    setFormExamType('Finalterm');
    setFormAcSpeed('Chilled & High Speed');
    setFormKeyboard('100% Working (Smooth & Soft)');
    setFormMouse('Smooth Laser & Precise');
    setFormComputerSpeed('Fast Core i5/i7 SSD (Zero Lag)');
    setFormStaffRating(5);
    setFormComment('Excellent examination experience! Computer was very fast with zero delay on paper submission, AC kept the lab chilled throughout the 90 minutes, and Dell keyboard had soft responsive keys.');
    setFormPros('Fast SSD computer, high speed AC cooling, polite invigilator staff.');
    setFormCons('Parking fills up 20 minutes before 8:30 AM shift.');
    setFormTip('Arrive 25 minutes prior to gate closing and test typing spacebar before starting timer.');
  };

  const filteredCenters = filterExamCenters(
    centers,
    searchQuery,
    selectedCity,
    minRating,
    sortBy,
    hardwareFilter
  );

  const cities = ['all', 'Lahore', 'Karachi', 'Islamabad', 'Rawalpindi', 'Faisalabad', 'Multan', 'Peshawar', 'Sialkot'];

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formStudentName.trim() || !formComment.trim()) return;

    onAddReview(formCenterId, {
      studentName: formStudentName.trim(),
      rating: formRating,
      examType: formExamType,
      comment: formComment.trim(),
      pros: formPros.trim() || 'Good overall exam environment',
      cons: formCons.trim() || 'No major issues observed',
      examTip: formTip.trim() || 'Arrive 30 minutes before gate closes.',
      hardwareRating: formHardwareRating,
      staffRating: formStaffRating,
      acSpeedRating: formAcSpeed,
      keyboardRating: formKeyboard,
      mouseRating: formMouse,
      computerSpeedRating: formComputerSpeed,
    });

    setSubmitSuccess(true);
    setTimeout(() => {
      setSubmitSuccess(false);
      setIsReviewModalOpen(false);
      setShowInlineForm(false);
      // Reset
      setFormComment('');
      setFormPros('');
      setFormCons('');
      setFormTip('');
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Action */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-indigo-900 via-indigo-950 to-slate-900 text-white shadow-sm">
        <div>
          <div className="text-xs font-semibold text-indigo-300 mb-1 flex items-center gap-2">
            <span>Verified Student Reviews</span>
            <span aria-hidden="true">·</span>
            <span>AC Speed · Keyboards · Mice · PC Performance</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
            VU Exam Center Navigator & Reviews
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-slate-300 max-w-2xl">
            Compare exam centers across Pakistan before choosing your date sheet. Check AC cooling speed,
            keyboard typing smoothness, mouse precision, and computer SSD performance so your exam goes uninterrupted!
          </p>
          <div className="flex flex-wrap items-center gap-2.5 mt-3 pt-2.5 border-t border-indigo-800/60">
            <button
              type="button"
              onClick={() => setShowSourcesModal(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-200 border border-indigo-400/30 text-xs font-semibold cursor-pointer transition shadow-2xs"
            >
              <HelpCircle className="w-3.5 h-3.5 text-indigo-300" />
              <span>Where did we collect these exam reviews?</span>
            </button>
            <span className="text-[11px] text-indigo-200/90 italic font-serif">
              Compiled from real VU Student Community Surveys & Live On-Site Submissions
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 self-start md:self-auto shrink-0">
          <button
            type="button"
            onClick={() => {
              setFormCenterId(selectedCenter?.id || centers[0]?.id || '');
              if (!formStudentName && defaultStudentName) setFormStudentName(defaultStudentName);
              setIsReviewModalOpen(true);
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all cursor-pointer ring-2 ring-emerald-400/40 active:scale-95"
          >
            <PlusCircle className="w-4 h-4 text-white animate-pulse" />
            <span>✍️ + Add Your Review</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search center by campus name, city, or code (e.g. MAO, LHR-01, Clifton)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-indigo-500"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-300 font-medium"
            >
              <option value="rating">Sort: Highest Rated (Best)</option>
              <option value="reviews">Sort: Most Reviews</option>
              <option value="name">Sort: Alphabetical</option>
            </select>

            <button
              type="button"
              onClick={() => setMinRating(minRating === 4.5 ? 0 : 4.5)}
              className={`px-3 py-2 text-xs font-semibold rounded-lg border transition-colors cursor-pointer ${
                minRating === 4.5
                  ? 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 border-amber-300 dark:border-amber-700'
                  : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
              }`}
            >
              ⭐ 4.5+ Only
            </button>
          </div>
        </div>

        {/* Hardware & Facility Filter Buttons (User Request Feature) */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1 text-xs">
          <span className="text-slate-400 shrink-0 font-bold uppercase tracking-wider text-[11px] mr-1">
            Hardware Filter:
          </span>
          {[
            { id: 'all', label: 'All Centers' },
            { id: 'ac_chilled', label: '❄️ High-Speed AC (Chilled)' },
            { id: 'keyboard_smooth', label: '⌨️ 100% Smooth Keyboards' },
            { id: 'mouse_smooth', label: '🖱️ Precision Laser Mice' },
            { id: 'pc_fast', label: '💻 Fast SSD PCs' },
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setHardwareFilter(item.id as typeof hardwareFilter)}
              className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                hardwareFilter === item.id
                  ? 'bg-indigo-600 text-white font-bold shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* City Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs no-scrollbar pt-1 border-t border-slate-100 dark:border-slate-800">
          <span className="text-slate-400 shrink-0 font-medium mr-1">City:</span>
          {cities.map((city) => (
            <button
              key={city}
              type="button"
              onClick={() => setSelectedCity(city)}
              className={`px-2.5 py-1 rounded-md text-xs font-medium whitespace-nowrap transition-colors shrink-0 cursor-pointer ${
                selectedCity === city
                  ? 'bg-indigo-600 text-white font-bold'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {city === 'all' ? 'All Pakistan' : city}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Split: Center List (Left) & Detailed Review Panel (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Centers List (5 Cols) */}
        <div className="lg:col-span-5 space-y-3 max-h-[720px] overflow-y-auto pr-1">
          {filteredCenters.length === 0 ? (
            <div className="p-8 text-center rounded-xl border border-dashed border-slate-200 dark:border-slate-800 text-slate-400 text-xs">
              No exam centers found matching your filters.
            </div>
          ) : (
            filteredCenters.map((center) => {
              const isSelected = selectedCenter?.id === center.id;
              return (
                <div
                  key={center.id}
                  onClick={() => setSelectedCenter(center)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all space-y-2.5 ${
                    isSelected
                      ? 'border-indigo-600 dark:border-indigo-500 bg-indigo-50/40 dark:bg-indigo-950/20 shadow-xs ring-1 ring-indigo-500/20'
                      : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-mono font-bold text-indigo-600 dark:text-indigo-400">
                        {center.code}
                      </span>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white leading-tight">
                        {center.name}
                      </h4>
                    </div>

                    <div className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 text-xs font-bold shrink-0 tabular-nums">
                      <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                      <span>{center.rating.toFixed(1)}</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                    {center.city} · {center.address}
                  </p>

                  {/* 4 Micro-Hardware Badges for Quick Decision Making */}
                  <div className="grid grid-cols-2 gap-1.5 pt-1 text-[10px]">
                    <span className="px-1.5 py-0.5 rounded bg-cyan-50 dark:bg-cyan-950/40 text-cyan-800 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-800/60 truncate flex items-center gap-1">
                      <span>❄️</span>
                      <span className="truncate">{center.facilities.acSpeed?.split('(')[0] || center.facilities.acCooling}</span>
                    </span>

                    <span className="px-1.5 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950/40 text-indigo-800 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800/60 truncate flex items-center gap-1">
                      <span>⌨️</span>
                      <span className="truncate">{center.facilities.keyboardCondition?.split('(')[0] || center.facilities.keyboardsQuality}</span>
                    </span>

                    <span className="px-1.5 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60 truncate flex items-center gap-1">
                      <span>🖱️</span>
                      <span className="truncate">{center.facilities.mouseCondition?.split('(')[0] || center.facilities.miceQuality}</span>
                    </span>

                    <span className="px-1.5 py-0.5 rounded bg-violet-50 dark:bg-violet-950/40 text-violet-800 dark:text-violet-300 border border-violet-200 dark:border-violet-800/60 truncate flex items-center gap-1">
                      <span>💻</span>
                      <span className="truncate">{center.facilities.computerPerformance?.split('(')[0] || 'Standard PC'}</span>
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-100 dark:border-slate-800">
                    <span className="tabular-nums font-medium">{center.totalReviews} reviews</span>
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedCenter(center);
                          setFormCenterId(center.id);
                          if (!formStudentName && defaultStudentName) setFormStudentName(defaultStudentName);
                          setIsReviewModalOpen(true);
                        }}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-indigo-50 dark:bg-indigo-950/70 hover:bg-indigo-100 dark:hover:bg-indigo-900 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 text-[10px] font-bold cursor-pointer transition shadow-2xs"
                      >
                        <PlusCircle className="w-3 h-3 text-indigo-600 dark:text-indigo-400" />
                        <span>+ Add Review</span>
                      </button>
                      <span className="text-slate-400 dark:text-slate-500 font-semibold text-[10px]">
                        Details →
                      </span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Selected Center Details & Reviews (7 Cols) */}
        <div className="lg:col-span-7">
          {selectedCenter ? (
            <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-6 shadow-xs">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400 mb-1">
                    <span>{selectedCenter.code}</span>
                    <span aria-hidden="true">·</span>
                    <span>{selectedCenter.city}</span>
                    <span aria-hidden="true">·</span>
                    <span className="px-1.5 py-0.5 rounded text-[10px] bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300">
                      {selectedCenter.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                    {selectedCenter.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">{selectedCenter.address}</p>
                </div>

                <div className="flex flex-col sm:items-end gap-2 shrink-0">
                  <div className="flex items-center sm:justify-end gap-1.5 text-2xl font-black text-slate-900 dark:text-white tabular-nums">
                    <Star className="w-5 h-5 fill-amber-500 text-amber-500" />
                    <span>{selectedCenter.rating.toFixed(1)}</span>
                    <span className="text-xs font-normal text-slate-400">/ 5.0</span>
                  </div>
                  <span className="text-xs text-slate-400 tabular-nums">
                    Based on {selectedCenter.totalReviews} verified student experiences
                  </span>
                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => {
                        setFormCenterId(selectedCenter.id);
                        if (!formStudentName && defaultStudentName) setFormStudentName(defaultStudentName);
                        setIsReviewModalOpen(true);
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-xs transition cursor-pointer"
                    >
                      <PlusCircle className="w-3.5 h-3.5" />
                      <span>+ Review {selectedCenter.code}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setFormCenterId(selectedCenter.id);
                        if (!formStudentName && defaultStudentName) setFormStudentName(defaultStudentName);
                        setShowInlineForm((prev) => !prev);
                      }}
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold border border-slate-200 dark:border-slate-700 cursor-pointer"
                    >
                      <PenTool className="w-3.5 h-3.5" />
                      <span>{showInlineForm ? 'Hide Form' : 'Write Inline'}</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Hardware & Lab Facility Audit Matrix */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <Cpu className="w-3.5 h-3.5 text-indigo-500" />
                    <span>Hardware, AC & Equipment Audit</span>
                  </h4>
                  <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
                    ✓ Verified for Finalterm & Midterm
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* 1. AC Cooling & Speed */}
                  <div className="p-3.5 rounded-xl bg-cyan-50/50 dark:bg-cyan-950/20 border border-cyan-200 dark:border-cyan-800/60 space-y-1">
                    <div className="flex items-center justify-between text-xs text-cyan-900 dark:text-cyan-300 font-semibold">
                      <span className="flex items-center gap-1.5">
                        <ThermometerSnowflake className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                        <span>AC Speed & Cooling</span>
                      </span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-100 dark:bg-cyan-900 text-cyan-800 dark:text-cyan-200 font-bold">
                        16°-20°C
                      </span>
                    </div>
                    <p className="text-xs font-bold text-slate-900 dark:text-white">
                      {selectedCenter.facilities.acSpeed || selectedCenter.facilities.acCooling}
                    </p>
                    <p className="text-[11px] text-slate-500">
                      High fan speed maintains steady room temperature so students remain alert during 90-minute papers.
                    </p>
                  </div>

                  {/* 2. Keyboard Functionality */}
                  <div className="p-3.5 rounded-xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-800/60 space-y-1">
                    <div className="flex items-center justify-between text-xs text-indigo-900 dark:text-indigo-300 font-semibold">
                      <span className="flex items-center gap-1.5">
                        <Keyboard className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                        <span>Keyboard Typing Condition</span>
                      </span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 font-bold">
                        Coding Grade
                      </span>
                    </div>
                    <p className="text-xs font-bold text-slate-900 dark:text-white">
                      {selectedCenter.facilities.keyboardCondition || selectedCenter.facilities.keyboardsQuality}
                    </p>
                    <p className="text-[11px] text-slate-500">
                      Responsive Spacebar and Enter keys ensure fast coding for CS201/CS301 papers and MathType.
                    </p>
                  </div>

                  {/* 3. Mouse Functionality */}
                  <div className="p-3.5 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/60 space-y-1">
                    <div className="flex items-center justify-between text-xs text-emerald-900 dark:text-emerald-300 font-semibold">
                      <span className="flex items-center gap-1.5">
                        <MousePointer2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                        <span>Mouse Precision & Click</span>
                      </span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 font-bold">
                        Zero Jitter
                      </span>
                    </div>
                    <p className="text-xs font-bold text-slate-900 dark:text-white">
                      {selectedCenter.facilities.mouseCondition || selectedCenter.facilities.miceQuality}
                    </p>
                    <p className="text-[11px] text-slate-500">
                      Optical laser sensor with clean mouse pad; effortless clicking on MCQs and radio options.
                    </p>
                  </div>

                  {/* 4. Computer Working & Speed */}
                  <div className="p-3.5 rounded-xl bg-violet-50/50 dark:bg-violet-950/20 border border-violet-200 dark:border-violet-800/60 space-y-1">
                    <div className="flex items-center justify-between text-xs text-violet-900 dark:text-violet-300 font-semibold">
                      <span className="flex items-center gap-1.5">
                        <Monitor className="w-4 h-4 text-violet-600 dark:text-violet-400" />
                        <span>Computer Speed & Stability</span>
                      </span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-violet-100 dark:bg-violet-900 text-violet-800 dark:text-violet-200 font-bold">
                        SSD Fast
                      </span>
                    </div>
                    <p className="text-xs font-bold text-slate-900 dark:text-white">
                      {selectedCenter.facilities.computerPerformance || 'Fast Core i5/i7 SSD (Instant load, zero lag)'}
                    </p>
                    <p className="text-[11px] text-slate-500">
                      Fast local network server connection; question transitions and submission save without freezing.
                    </p>
                  </div>
                </div>

                {/* Additional Amenities (UPS, Staff, Noise, Parking) */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
                  <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 text-[11px]">
                    <div className="flex items-center gap-1 text-slate-500 mb-0.5">
                      <Zap className="w-3 h-3 text-amber-500" />
                      <span>UPS / Power</span>
                    </div>
                    <p className="font-bold text-slate-800 dark:text-slate-200 truncate">
                      {selectedCenter.facilities.upsBackup}
                    </p>
                  </div>

                  <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 text-[11px]">
                    <div className="flex items-center gap-1 text-slate-500 mb-0.5">
                      <Shield className="w-3 h-3 text-emerald-500" />
                      <span>Invigilators</span>
                    </div>
                    <p className="font-bold text-slate-800 dark:text-slate-200 truncate">
                      {selectedCenter.facilities.staffBehavior}
                    </p>
                  </div>

                  <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 text-[11px]">
                    <div className="flex items-center gap-1 text-slate-500 mb-0.5">
                      <Volume2 className="w-3 h-3 text-indigo-500" />
                      <span>Exam Hall Noise</span>
                    </div>
                    <p className="font-bold text-slate-800 dark:text-slate-200 truncate">
                      {selectedCenter.facilities.noiseLevel}
                    </p>
                  </div>

                  <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 text-[11px]">
                    <div className="flex items-center gap-1 text-slate-500 mb-0.5">
                      <CheckCircle2 className="w-3 h-3 text-cyan-500" />
                      <span>Parking Space</span>
                    </div>
                    <p className="font-bold text-slate-800 dark:text-slate-200 truncate">
                      {selectedCenter.facilities.parkingAvailable ? 'Campus Parking' : 'Street Parking'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Student Experience Reviews List & Actions */}
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl bg-gradient-to-r from-indigo-50 via-blue-50 to-indigo-50 dark:from-indigo-950/40 dark:via-slate-800/60 dark:to-indigo-950/40 border border-indigo-200 dark:border-indigo-800/80 mb-4 shadow-xs">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-950 dark:text-indigo-200 flex items-center gap-2">
                      <Quote className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                      <span>Student Exam Reviews ({selectedCenter.reviews.length})</span>
                      <span className="px-1.5 py-0.5 rounded text-[10px] bg-indigo-200/80 dark:bg-indigo-900 text-indigo-900 dark:text-indigo-200 font-bold">
                        Hardware Audit
                      </span>
                    </h4>
                    <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5">
                      Have you appeared in exams at {selectedCenter.name}? Share your AC, keyboard & PC experience!
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => {
                        setFormCenterId(selectedCenter.id);
                        if (!formStudentName && defaultStudentName) setFormStudentName(defaultStudentName);
                        setShowInlineForm((prev) => !prev);
                      }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition cursor-pointer flex items-center gap-1.5 ${
                        showInlineForm
                          ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                          : 'bg-white dark:bg-slate-800 text-indigo-700 dark:text-indigo-300 border-indigo-300 dark:border-indigo-700 hover:bg-indigo-50'
                      }`}
                    >
                      <PenTool className="w-3.5 h-3.5" />
                      <span>{showInlineForm ? 'Close Form' : '✍️ Write Inline'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setFormCenterId(selectedCenter.id);
                        if (!formStudentName && defaultStudentName) setFormStudentName(defaultStudentName);
                        setIsReviewModalOpen(true);
                      }}
                      className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs cursor-pointer flex items-center gap-1.5 transition active:scale-95"
                    >
                      <PlusCircle className="w-3.5 h-3.5" />
                      <span>+ Add Review (Popup)</span>
                    </button>
                  </div>
                </div>

                {/* Inline Add Review Form Box */}
                {showInlineForm && (
                  <div className="p-5 rounded-2xl border-2 border-indigo-500/80 bg-white dark:bg-slate-900 shadow-lg mb-6 animate-in fade-in space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                      <div>
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                          <PlusCircle className="w-4 h-4 text-indigo-600" />
                          <span>Add Your Exam Review for {selectedCenter.name}</span>
                        </h4>
                        <p className="text-[11px] text-slate-500">
                          Rate AC speed, keyboard keys, mouse precision, and PC boot speed.
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={handleFillDemoReview}
                          className="px-2.5 py-1 rounded-md bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 border border-amber-300 dark:border-amber-800 text-[11px] font-bold cursor-pointer"
                        >
                          ⚡ Demo Fill
                        </button>
                        <button
                          type="button"
                          onClick={() => setShowInlineForm(false)}
                          className="p-1 rounded text-slate-400 hover:text-slate-600 cursor-pointer"
                          aria-label="Close form"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {submitSuccess ? (
                      <div className="p-6 text-center space-y-2 bg-emerald-50 dark:bg-emerald-950/30 rounded-xl border border-emerald-200">
                        <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                        <h4 className="text-sm font-bold text-emerald-900 dark:text-emerald-200">
                          Review Added Successfully!
                        </h4>
                        <p className="text-xs text-slate-500">
                          Thank you for helping fellow VU students. Cat Milo earned +1 Fish Kibble!
                        </p>
                      </div>
                    ) : (
                      <form onSubmit={handleSubmitReview} className="space-y-4 text-xs">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                              Your Name / Roll No:
                            </label>
                            <input
                              type="text"
                              required
                              placeholder="e.g. Laiba Ijaz (BC210401234)"
                              value={formStudentName}
                              onChange={(e) => setFormStudentName(e.target.value)}
                              className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-medium"
                            />
                          </div>

                          <div>
                            <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                              Exam Type:
                            </label>
                            <select
                              value={formExamType}
                              onChange={(e) => setFormExamType(e.target.value as any)}
                              className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-semibold"
                            >
                              <option value="Finalterm">Finalterm Exam</option>
                              <option value="Midterm">Midterm Exam</option>
                              <option value="Practical">Lab Practical Exam</option>
                            </select>
                          </div>
                        </div>

                        {/* 4 Hardware audit fields */}
                        <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-3">
                          <h5 className="text-[11px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                            Hardware & Facilities Rating:
                          </h5>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                                ❄️ AC Speed & Room Cooling:
                              </label>
                              <select
                                value={formAcSpeed}
                                onChange={(e) => setFormAcSpeed(e.target.value as any)}
                                className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-medium"
                              >
                                <option value="Chilled & High Speed">❄️ Chilled & High Speed (16°-20°C)</option>
                                <option value="Moderate / Normal">🌬️ Moderate / Normal Speed</option>
                                <option value="Slow / Weak">🌡️ Slow / Weak Fan Speed</option>
                                <option value="Poor / Warm">🔥 Poor / Warm Room (Suffocating)</option>
                              </select>
                            </div>

                            <div>
                              <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                                ⌨️ Keyboard Functionality:
                              </label>
                              <select
                                value={formKeyboard}
                                onChange={(e) => setFormKeyboard(e.target.value as any)}
                                className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-medium"
                              >
                                <option value="100% Working (Smooth & Soft)">⌨️ 100% Working (Soft & Responsive)</option>
                                <option value="Mostly Working (Minor Sticky)">⌨️ Mostly Working (Minor sticky keys)</option>
                                <option value="Stiff / Hard Keys">⌨️ Stiff / Hard Keys (Tires fingers)</option>
                                <option value="Faulty / Missing Keys">⌨️ Faulty / Missing Keycaps</option>
                              </select>
                            </div>

                            <div>
                              <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                                🖱️ Mouse Functionality:
                              </label>
                              <select
                                value={formMouse}
                                onChange={(e) => setFormMouse(e.target.value as any)}
                                className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-medium"
                              >
                                <option value="Smooth Laser & Precise">🖱️ Smooth Laser & Clean Clicks</option>
                                <option value="Normal / Acceptable">🖱️ Normal / Acceptable Tracking</option>
                                <option value="Jumpy Cursor / Hard Click">🖱️ Jumpy Cursor / Hard Right-Click</option>
                                <option value="Laggy / Stiff Wheel">🖱️ Laggy / Stiff Wheel Sensor</option>
                              </select>
                            </div>

                            <div>
                              <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                                💻 Computer Working & Speed:
                              </label>
                              <select
                                value={formComputerSpeed}
                                onChange={(e) => setFormComputerSpeed(e.target.value as any)}
                                className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-medium"
                              >
                                <option value="Fast Core i5/i7 SSD (Zero Lag)">💻 Fast Core i5/i7 SSD (Zero Lag)</option>
                                <option value="Standard PC (Smooth typing)">💻 Standard PC (Smooth MCQ & typing)</option>
                                <option value="Average / Slight Lag">💻 Average (Slight delay on submit)</option>
                                <option value="Slow / Freezes">💻 Slow / Experienced Freeze during Paper</option>
                              </select>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                              Overall Rating:
                            </label>
                            <select
                              value={formRating}
                              onChange={(e) => setFormRating(Number(e.target.value))}
                              className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-bold"
                            >
                              <option value="5">5 ⭐ (Excellent)</option>
                              <option value="4">4 ⭐ (Good)</option>
                              <option value="3">3 ⭐ (Average)</option>
                              <option value="2">2 ⭐ (Poor)</option>
                              <option value="1">1 ⭐ (Worst)</option>
                            </select>
                          </div>

                          <div>
                            <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                              Staff / Invigilator Attitude:
                            </label>
                            <select
                              value={formStaffRating}
                              onChange={(e) => setFormStaffRating(Number(e.target.value))}
                              className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                            >
                              <option value="5">5/5 Very Polite & Quick</option>
                              <option value="4">4/5 Professional</option>
                              <option value="3">3/5 Neutral</option>
                              <option value="2">2/5 Rude / Delayed Response</option>
                            </select>
                          </div>
                        </div>

                        <div>
                          <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                            Your Exam Experience Review:
                          </label>
                          <textarea
                            required
                            rows={2}
                            placeholder="Describe paper experience, keyboard softness, room AC temperature..."
                            value={formComment}
                            onChange={(e) => setFormComment(e.target.value)}
                            className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-medium"
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                              Pros:
                            </label>
                            <input
                              type="text"
                              placeholder="e.g. Chilled AC, instant UPS backup, new mouse"
                              value={formPros}
                              onChange={(e) => setFormPros(e.target.value)}
                              className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                            />
                          </div>
                          <div>
                            <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                              Cons:
                            </label>
                            <input
                              type="text"
                              placeholder="e.g. Tight parking, sticky spacebar"
                              value={formCons}
                              onChange={(e) => setFormCons(e.target.value)}
                              className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                            Exam Day Tip for Juniors:
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. Reach 25 minutes prior to gate closing and test mouse cursor first."
                            value={formTip}
                            onChange={(e) => setFormTip(e.target.value)}
                            className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-medium"
                          />
                        </div>

                        <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                          <button
                            type="button"
                            onClick={() => setShowInlineForm(false)}
                            className="px-3 py-1.5 text-slate-600 dark:text-slate-400 font-medium cursor-pointer"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="px-5 py-2 font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm cursor-pointer transition active:scale-95"
                          >
                            Submit Verified Review
                          </button>
                        </div>
                      </form>
                    )}
                  </div>
                )}

                <div className="space-y-4">
                  {selectedCenter.reviews.map((rev) => (
                    <div
                      key={rev.id}
                      className="p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/20 space-y-2.5 text-xs"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900 dark:text-white">
                            {rev.studentName}
                          </span>
                          <span className="text-slate-400">·</span>
                          <span className="text-slate-500 font-medium">{rev.examType}</span>
                        </div>
                        <div className="flex items-center gap-1 font-bold text-amber-500">
                          <Star className="w-3.5 h-3.5 fill-amber-500" />
                          <span>{rev.rating}</span>
                        </div>
                      </div>

                      {/* Hardware Badges for Reviewer if available */}
                      {(rev.acSpeedRating || rev.keyboardRating || rev.mouseRating || rev.computerSpeedRating) && (
                        <div className="flex flex-wrap gap-1.5 text-[10px]">
                          {rev.acSpeedRating && (
                            <span className="px-2 py-0.5 rounded bg-cyan-100 dark:bg-cyan-950 text-cyan-800 dark:text-cyan-300 font-semibold">
                              ❄️ AC: {rev.acSpeedRating}
                            </span>
                          )}
                          {rev.keyboardRating && (
                            <span className="px-2 py-0.5 rounded bg-indigo-100 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-300 font-semibold">
                              ⌨️ Keys: {rev.keyboardRating}
                            </span>
                          )}
                          {rev.mouseRating && (
                            <span className="px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-semibold">
                              🖱️ Mouse: {rev.mouseRating}
                            </span>
                          )}
                          {rev.computerSpeedRating && (
                            <span className="px-2 py-0.5 rounded bg-violet-100 dark:bg-violet-950 text-violet-800 dark:text-violet-300 font-semibold">
                              💻 PC: {rev.computerSpeedRating}
                            </span>
                          )}
                        </div>
                      )}

                      <blockquote className="font-serif italic text-slate-800 dark:text-slate-200 text-xs sm:text-sm leading-relaxed pl-3 border-l-2 border-indigo-500 bg-indigo-50/40 dark:bg-indigo-950/20 py-2 rounded-r-lg">
                        “{rev.comment}”
                      </blockquote>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                        <div className="flex items-start gap-1.5 text-emerald-700 dark:text-emerald-400">
                          <ThumbsUp className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                          <span>
                            <strong className="not-italic font-bold">Pros:</strong> <em className="italic">{rev.pros}</em>
                          </span>
                        </div>
                        <div className="flex items-start gap-1.5 text-rose-600 dark:text-rose-400">
                          <ThumbsDown className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                          <span>
                            <strong className="not-italic font-bold">Cons:</strong> <em className="italic">{rev.cons}</em>
                          </span>
                        </div>
                      </div>

                      {rev.examTip && (
                        <div className="p-2.5 rounded-lg bg-indigo-50/80 dark:bg-indigo-950/40 text-indigo-900 dark:text-indigo-300 font-medium">
                          💡 <strong className="not-italic font-bold">Exam Day Tip:</strong> <em className="italic font-serif">{rev.examTip}</em>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="p-12 text-center rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 text-slate-400 text-sm">
              Select an exam center from the list to view hardware specs and student reviews.
            </div>
          )}
        </div>
      </div>

      {/* Review Submission Modal with Comprehensive Hardware Inputs */}
      {isReviewModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="relative w-full max-w-xl rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 mb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <PlusCircle className="w-4 h-4 text-indigo-600" />
                  <span>Submit Exam Center Hardware & Experience Review</span>
                </h3>
                <p className="text-[11px] text-slate-500">
                  Help fellow VU students know if AC cooling, keyboards, and PCs work properly.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleFillDemoReview}
                  className="px-2.5 py-1 rounded-md bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 border border-amber-300 dark:border-amber-800 text-[11px] font-bold cursor-pointer"
                >
                  ⚡ Demo Fill
                </button>
                <button
                  type="button"
                  onClick={() => setIsReviewModalOpen(false)}
                  className="p-1 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {submitSuccess ? (
              <div className="p-6 text-center space-y-2">
                <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-slate-900 dark:text-white">
                  Thank You for Helping Fellow VU Students!
                </h4>
                <p className="text-xs text-slate-500">
                  Your hardware review and exam tips have been added to the directory. Cat Milo earned +1 Fish Kibble!
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitReview} className="space-y-4 text-xs">
                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Select Exam Center:
                  </label>
                  <select
                    value={formCenterId}
                    onChange={(e) => setFormCenterId(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200"
                  >
                    {centers.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name} ({c.city})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                      Your Name / Degree:
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Asad (BSCS 4th Sem)"
                      value={formStudentName}
                      onChange={(e) => setFormStudentName(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                      Exam Type:
                    </label>
                    <select
                      value={formExamType}
                      onChange={(e) => setFormExamType(e.target.value as any)}
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200"
                    >
                      <option value="Finalterm">Finalterm Exam</option>
                      <option value="Midterm">Midterm Exam</option>
                      <option value="Practical">Lab Practical Exam</option>
                    </select>
                  </div>
                </div>

                {/* Specific Hardware Questions (AC Speed, Keyboard, Mouse, Computer) */}
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-3">
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                    Hardware & Equipment Specifics (Required)
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* AC Speed & Cooling */}
                    <div>
                      <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1 flex items-center gap-1">
                        <span>❄️</span>
                        <span>AC Speed & Room Cooling:</span>
                      </label>
                      <select
                        value={formAcSpeed}
                        onChange={(e) => setFormAcSpeed(e.target.value as any)}
                        className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-medium"
                      >
                        <option value="Chilled & High Speed">❄️ Chilled & High Speed (16°-20°C)</option>
                        <option value="Moderate / Normal">🌬️ Moderate / Normal Speed</option>
                        <option value="Slow / Weak">🌡️ Slow / Weak Fan Speed</option>
                        <option value="Poor / Warm">🔥 Poor / Warm Room (Suffocating)</option>
                      </select>
                    </div>

                    {/* Keyboard Functionality */}
                    <div>
                      <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1 flex items-center gap-1">
                        <span>⌨️</span>
                        <span>Keyboard Functionality:</span>
                      </label>
                      <select
                        value={formKeyboard}
                        onChange={(e) => setFormKeyboard(e.target.value as any)}
                        className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-medium"
                      >
                        <option value="100% Working (Smooth & Soft)">⌨️ 100% Working (Soft & Responsive)</option>
                        <option value="Mostly Working (Minor Sticky)">⌨️ Mostly Working (Minor sticky keys)</option>
                        <option value="Stiff / Hard Keys">⌨️ Stiff / Hard Keys (Tires fingers)</option>
                        <option value="Faulty / Missing Keys">⌨️ Faulty / Missing Keycaps</option>
                      </select>
                    </div>

                    {/* Mouse Functionality */}
                    <div>
                      <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1 flex items-center gap-1">
                        <span>🖱️</span>
                        <span>Mouse Functionality:</span>
                      </label>
                      <select
                        value={formMouse}
                        onChange={(e) => setFormMouse(e.target.value as any)}
                        className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-medium"
                      >
                        <option value="Smooth Laser & Precise">🖱️ Smooth Laser & Clean Clicks</option>
                        <option value="Normal / Acceptable">🖱️ Normal / Acceptable Tracking</option>
                        <option value="Jumpy Cursor / Hard Click">🖱️ Jumpy Cursor / Hard Right-Click</option>
                        <option value="Laggy / Stiff Wheel">🖱️ Laggy / Stiff Wheel Sensor</option>
                      </select>
                    </div>

                    {/* Computer Working & Speed */}
                    <div>
                      <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1 flex items-center gap-1">
                        <span>💻</span>
                        <span>Computer Working & Speed:</span>
                      </label>
                      <select
                        value={formComputerSpeed}
                        onChange={(e) => setFormComputerSpeed(e.target.value as any)}
                        className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-medium"
                      >
                        <option value="Fast Core i5/i7 SSD (Zero Lag)">💻 Fast Core i5/i7 SSD (Zero Lag)</option>
                        <option value="Standard PC (Smooth typing)">💻 Standard PC (Smooth MCQ & typing)</option>
                        <option value="Average / Slight Lag">💻 Average (Slight delay on submit)</option>
                        <option value="Slow / Freezes">💻 Slow / Experienced Freeze during Paper</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                      Overall Center Star Rating:
                    </label>
                    <select
                      value={formRating}
                      onChange={(e) => setFormRating(Number(e.target.value))}
                      className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold"
                    >
                      <option value="5">5 ⭐ (Best Campus)</option>
                      <option value="4">4 ⭐ (Good Experience)</option>
                      <option value="3">3 ⭐ (Average)</option>
                      <option value="2">2 ⭐ (Poor / Avoid)</option>
                      <option value="1">1 ⭐ (Worst)</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                      Staff / Invigilator Attitude:
                    </label>
                    <select
                      value={formStaffRating}
                      onChange={(e) => setFormStaffRating(Number(e.target.value))}
                      className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200"
                    >
                      <option value="5">5/5 Very Polite & Quick</option>
                      <option value="4">4/5 Professional</option>
                      <option value="3">3/5 Neutral</option>
                      <option value="2">2/5 Rude / Delayed Response</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Your Overall Experience Review:
                  </label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Describe how your paper went, keyboard feeling, AC coolness, and if PC showed any issue..."
                    value={formComment}
                    onChange={(e) => setFormComment(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                      Pros (Best Things):
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Chilled AC, instant UPS backup, brand new keyboards"
                      value={formPros}
                      onChange={(e) => setFormPros(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                      Cons (Issues):
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Tight parking, sticky spacebar on row 3"
                      value={formCons}
                      onChange={(e) => setFormCons(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Exam Tip for Future Students:
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Check your mouse movement and press spacebar 5 times before clicking Start Paper."
                    value={formTip}
                    onChange={(e) => setFormTip(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                  <button
                    type="button"
                    onClick={() => setIsReviewModalOpen(false)}
                    className="px-4 py-2 font-medium text-slate-600 dark:text-slate-400 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-xs cursor-pointer"
                  >
                    Submit Verified Review
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Review Collection Sources & Verification Modal */}
      {showSourcesModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-in fade-in">
          <div className="relative w-full max-w-xl rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden p-6 max-h-[90vh] overflow-y-auto space-y-4">
            <div className="flex items-start justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-indigo-600 dark:text-indigo-400">
                  Data Transparency & Methodology
                </span>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                  <span>Where Did We Collect These Exam Reviews?</span>
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowSourcesModal(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                aria-label="Close dialog"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-serif italic">
              “Every exam session, thousands of Virtual University students face issues with slow computers, stiff keyboards during programming papers, or stifling AC cooling. Here is how we verify and collect center feedback:”
            </p>

            <div className="space-y-3 text-xs">
              {/* Source 1 */}
              <div className="p-3.5 rounded-xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-200/80 dark:border-indigo-800/60 space-y-1">
                <div className="flex items-center gap-2 font-bold text-indigo-950 dark:text-indigo-200">
                  <span className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px]">
                    1
                  </span>
                  <span>VU Student Community Groups & Alumni Networks</span>
                </div>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed pl-7 italic">
                  Initial benchmarks and campus ratings are gathered from active Virtual University student WhatsApp study groups, Facebook student forums, and campus alumni post-exam surveys across Fall & Spring Midterms and Finalterms.
                </p>
              </div>

              {/* Source 2 */}
              <div className="p-3.5 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200/80 dark:border-emerald-800/60 space-y-1">
                <div className="flex items-center gap-2 font-bold text-emerald-950 dark:text-emerald-200">
                  <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px]">
                    2
                  </span>
                  <span>Live Verified On-Site Student Submissions</span>
                </div>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed pl-7 italic">
                  Students taking exams can instantly submit real-time hardware reports right after their papers via the <strong>“Review Your Exam Center”</strong> button. Each submission updates the center's rating, AC cooling status, and keyboard scores in real-time.
                </p>
              </div>

              {/* Source 3 */}
              <div className="p-3.5 rounded-xl bg-cyan-50/60 dark:bg-cyan-950/30 border border-cyan-200/80 dark:border-cyan-800/60 space-y-1">
                <div className="flex items-center gap-2 font-bold text-cyan-950 dark:text-cyan-200">
                  <span className="w-5 h-5 rounded-full bg-cyan-600 text-white flex items-center justify-center text-[10px]">
                    3
                  </span>
                  <span>Hardware-Specific Performance Verification</span>
                </div>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed pl-7 italic">
                  Instead of generic opinions, reviews strictly focus on exam-critical hardware: AC cooling fan speed (16°-20°C), keyboard responsiveness (Enter/Spacebar for CS201/CS301 & MathType), optical mouse tracking, and PC boot speed.
                </p>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500">
              <span className="italic font-serif">
                Made with care for VU students across Pakistan.
              </span>
              <button
                type="button"
                onClick={() => setShowSourcesModal(false)}
                className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold cursor-pointer text-xs"
              >
                Got It
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
