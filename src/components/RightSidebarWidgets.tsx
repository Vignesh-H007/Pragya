import React, { useState } from 'react';
import {
  TrendingUp,
  Play,
  FlaskConical,
  BookOpen,
  CheckCircle2,
  Circle,
  Sparkles,
  ExternalLink,
  Flag,
  Mountain,
  ChevronRight,
  Send,
  Check,
  Zap,
  Target,
  Users,
  Compass,
  ArrowRight,
  SlidersHorizontal,
  Flame,
  Layers,
  Award,
  Calendar,
  X,
  Eye,
  FileCheck2,
} from 'lucide-react';
import { GoalItem, RemedialResource } from '../types';
import { useDashboardTheme } from '../context/ThemeContext';

interface RightSidebarWidgetsProps {
  passRate: number;
  fixedCount: number;
  activeGapsCount: number;
  goals: GoalItem[];
  onToggleGoal: (id: string) => void;
  resources: RemedialResource[];
  onOpenResource: (resource: RemedialResource) => void;
}

interface MilestonePhase {
  id: number;
  phaseName: string;
  shortLabel: string;
  status: 'completed' | 'active' | 'upcoming';
  progressPercent: number;
  targetDate: string;
  focusTopic: string;
  details: string;
}

export const RightSidebarWidgets: React.FC<RightSidebarWidgetsProps> = ({
  passRate,
  fixedCount,
  activeGapsCount,
  goals,
  onToggleGoal,
  resources,
  onOpenResource,
}) => {
  const { style } = useDashboardTheme();
  // Journey State
  const [activePhaseIndex, setActivePhaseIndex] = useState<number>(1); // Phase 2 active by default

  const [bonusReTestCount, setBonusReTestCount] = useState<number>(0);
  const [simulatedCelebration, setSimulatedCelebration] = useState<boolean>(false);

  // Remedial Curricula Filter & Modal State
  const [selectedCurriculumFilter, setSelectedCurriculumFilter] = useState<'all' | 'math' | 'science' | 'interactive'>('all');
  const [previewingResource, setPreviewingResource] = useState<RemedialResource | null>(null);
  const [assignedResources, setAssignedResources] = useState<Record<string, boolean>>({});

  // Dynamic Journey Phases
  const journeyPhases: MilestonePhase[] = [
    {
      id: 1,
      phaseName: 'Phase 1: Baseline Diagnostic Scan',
      shortLabel: 'Scan',
      status: 'completed',
      progressPercent: 100,
      targetDate: 'May 02 (Completed)',
      focusTopic: 'Integers, Linear Eq, pH Scale',
      details: '42 students completed diagnostic assessment. 18 foundational gaps flagged.',
    },
    {
      id: 2,
      phaseName: 'Phase 2: Targeted Reteach & Intervention',
      shortLabel: 'Reteach',
      status: 'active',
      progressPercent: Math.min(100, Math.round(passRate) + bonusReTestCount * 3),
      targetDate: 'May 10 (Current Sprint)',
      focusTopic: 'Negative Signs & Elevation Lift',
      details: `${fixedCount + bonusReTestCount} of 42 students reached concept benchmark. 12 in active reteach.`,
    },
    {
      id: 3,
      phaseName: 'Phase 3: Reciprocal Peer Triads',
      shortLabel: 'Peer Drills',
      status: 'upcoming',
      progressPercent: 35,
      targetDate: 'May 14 (Queued)',
      focusTopic: 'Master-Peer Pairings for Linear Eq',
      details: 'Pairs high-mastery students with struggling peers for 10-minute collaborative balance drills.',
    },
    {
      id: 4,
      phaseName: 'Phase 4: Exit Gate Mastery Validation',
      shortLabel: 'Exit Gate',
      status: 'upcoming',
      progressPercent: 0,
      targetDate: 'May 18 (Target)',
      focusTopic: 'Class-Wide 90% Pass Verification',
      details: 'Final formative exit ticket before advancing to Grade 8 prerequisite curriculum.',
    },
  ];

  const currentPhase = journeyPhases[activePhaseIndex];

  // Handle advance/simulate checkpoint
  const handleSimulateCheckpoint = () => {
    setBonusReTestCount((prev) => prev + 1);
    setSimulatedCelebration(true);
    setTimeout(() => {
      setSimulatedCelebration(false);
    }, 3000);
  };

  // Filtered Curricula
  const filteredResources = resources.filter((res) => {
    if (selectedCurriculumFilter === 'all') return true;
    if (selectedCurriculumFilter === 'math') return res.subject === 'Mathematics';
    if (selectedCurriculumFilter === 'science') return res.subject === 'Science';
    if (selectedCurriculumFilter === 'interactive') return res.type === 'concept' || res.type === 'quiz';
    return true;
  });

  const handleAssignResource = (e: React.MouseEvent, resId: string) => {
    e.stopPropagation();
    setAssignedResources((prev) => ({ ...prev, [resId]: true }));
    setTimeout(() => {
      // keep it marked assigned
    }, 2000);
  };

  return (
    <div className="space-y-5">
      {/* ========================================================================= */}
      {/* 1. IMPROVISED BATCH LEARNING JOURNEY                                     */}
      {/* ========================================================================= */}
      <div
        id="batch-learning-journey-card"
        className={`rounded-2xl p-5 border shadow-xs relative overflow-hidden space-y-4 transition-colors duration-200 ${
          style === 'command-dark'
            ? 'bg-[#111827] border-slate-800 text-slate-100'
            : style === 'academic-warm'
            ? 'bg-[#FAF7F2] border-[#E8E2D6] text-[#28231D]'
            : style === 'editorial-command'
            ? 'bg-white border-[#DDD4C7] text-[#1C232B] shadow-2xs'
            : 'bg-white border-slate-200/90 text-slate-900'
        }`}
      >
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl pointer-events-none" />

        {/* Journey Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div
              className={`w-8 h-8 rounded-xl flex items-center justify-center shadow-xs ${
                style === 'command-dark'
                  ? 'bg-cyan-600 text-cyan-200'
                  : style === 'academic-warm'
                  ? 'bg-[#8C4A2F] text-amber-200'
                  : style === 'editorial-command'
                  ? 'bg-[#E5F2EE] text-[#246257] border border-[#BFDFD6]'
                  : 'bg-gradient-to-tr from-blue-600 to-indigo-600 text-white'
              }`}
            >
              <Compass className="w-4 h-4 animate-spin-slow" />
            </div>
            <div>
              <h3
                className={`text-xs font-black tracking-tight ${
                  style === 'command-dark'
                    ? 'text-white'
                    : style === 'academic-warm'
                    ? 'text-[#28231D]'
                    : style === 'editorial-command'
                    ? 'font-serif text-[#1C232B] text-sm font-normal'
                    : 'text-slate-900'
                }`}
              >
                Batch Learning Journey
              </h3>
              <p
                className={`text-[10px] font-medium ${
                  style === 'command-dark'
                    ? 'text-slate-400'
                    : style === 'academic-warm'
                    ? 'text-[#7D7363]'
                    : style === 'editorial-command'
                    ? 'text-[#7C7267] font-mono'
                    : 'text-slate-500'
                }`}
              >
                Milestone roadmap to 90% Class Mastery
              </p>
            </div>
          </div>

          <span
            className={`inline-flex items-center gap-1 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border ${
              style === 'command-dark'
                ? 'bg-emerald-950 text-emerald-300 border-emerald-800'
                : style === 'editorial-command'
                ? 'bg-[#E5F2EE] text-[#246257] border-[#BFDFD6] font-mono'
                : 'bg-emerald-50 text-emerald-700 border-emerald-200'
            }`}
          >
            <Flame className="w-3 h-3 text-emerald-600 fill-emerald-500" />
            Pace: +{fixedCount} Resolved
          </span>
        </div>

        {/* Milestone Roadmap Stepper (Road with 4 Stations) */}
        <div className="relative pt-2 pb-1">
          {/* Connecting Trajectory Track */}
          <div className="absolute top-6 left-5 right-5 h-1 bg-slate-100 rounded-full z-0">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 via-blue-500 to-indigo-500 rounded-full transition-all duration-500"
              style={{
                width:
                  activePhaseIndex === 0
                    ? '25%'
                    : activePhaseIndex === 1
                    ? '52%'
                    : activePhaseIndex === 2
                    ? '76%'
                    : '100%',
              }}
            />
          </div>

          {/* 4 Interactive Stations */}
          <div className="relative z-10 grid grid-cols-4 gap-1">
            {journeyPhases.map((phase, idx) => {
              const isCurrent = activePhaseIndex === idx;
              const isCompleted = phase.status === 'completed';
              const isActive = phase.status === 'active';

              return (
                <button
                  key={phase.id}
                  onClick={() => setActivePhaseIndex(idx)}
                  className="flex flex-col items-center group cursor-pointer text-center focus:outline-none"
                  title={`Click to view ${phase.phaseName}`}
                >
                  {/* Station Node Icon */}
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-black transition-all duration-200 shadow-xs ${
                      isCompleted
                        ? 'bg-emerald-500 text-white shadow-emerald-500/20'
                        : isActive
                        ? 'bg-blue-600 text-white ring-4 ring-blue-100 shadow-blue-500/30 scale-110'
                        : 'bg-white text-slate-400 border-2 border-slate-200 group-hover:border-slate-300'
                    } ${isCurrent ? 'ring-2 ring-slate-900' : ''}`}
                  >
                    {isCompleted ? (
                      <Check className="w-4 h-4 stroke-[3]" />
                    ) : (
                      <span>0{phase.id}</span>
                    )}
                  </div>

                  {/* Station Label */}
                  <span
                    className={`text-[10px] font-extrabold mt-2 truncate max-w-[65px] transition-colors ${
                      isCurrent
                        ? 'text-blue-700 font-black'
                        : 'text-slate-600 group-hover:text-slate-900'
                    }`}
                  >
                    {phase.shortLabel}
                  </span>

                  <span className="text-[9px] text-slate-400 font-semibold">
                    {phase.progressPercent}%
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Phase Focus Box */}
        <div className="bg-gradient-to-br from-slate-50 to-blue-50/40 rounded-xl p-3.5 border border-slate-200/80 space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span
                className={`w-2 h-2 rounded-full ${
                  currentPhase.status === 'completed'
                    ? 'bg-emerald-500'
                    : currentPhase.status === 'active'
                    ? 'bg-blue-500 animate-pulse'
                    : 'bg-slate-300'
                }`}
              />
              <h4 className="text-xs font-extrabold text-slate-900">
                {currentPhase.phaseName}
              </h4>
            </div>
            <span className="text-[10px] font-bold text-slate-500 bg-white px-2 py-0.5 rounded-md border border-slate-200">
              {currentPhase.targetDate}
            </span>
          </div>

          <p className="text-[11px] text-slate-600 leading-relaxed font-medium">
            {currentPhase.details}
          </p>

          {/* Phase Progress Bar */}
          <div className="space-y-1">
            <div className="flex items-center justify-between text-[10px] font-bold">
              <span className="text-slate-500">Cohort Milestone Mastery:</span>
              <span className="text-blue-700 font-extrabold">{currentPhase.progressPercent}%</span>
            </div>
            <div className="w-full bg-slate-200/80 h-2 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-500 rounded-full transition-all duration-500"
                style={{ width: `${currentPhase.progressPercent}%` }}
              />
            </div>
          </div>

          {/* Interactive Checkpoint Advancement */}
          <div className="pt-1 flex items-center justify-between gap-2">
            <div className="text-[10px] text-slate-500 font-medium">
              Target: <strong className="text-slate-700">90% Exit Gate</strong>
            </div>

            <button
              onClick={handleSimulateCheckpoint}
              className={`text-[10px] font-extrabold px-2.5 py-1 rounded-lg transition-all cursor-pointer flex items-center gap-1 ${
                simulatedCelebration
                  ? 'bg-emerald-600 text-white'
                  : 'bg-white text-blue-700 border border-blue-200 hover:bg-blue-50 shadow-2xs'
              }`}
            >
              {simulatedCelebration ? (
                <>
                  <CheckCircle2 className="w-3 h-3 text-white" />
                  <span>+1 Mastered!</span>
                </>
              ) : (
                <>
                  <Zap className="w-3 h-3 text-amber-500 fill-amber-500" />
                  <span>Log Re-Test Pass</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. RESET REMEDIAL CURRICULA                                               */}
      {/* ========================================================================= */}
      <div
        id="remedial-curricula-hub"
        className={`rounded-2xl p-5 border shadow-xs space-y-4 transition-colors duration-200 ${
          style === 'command-dark'
            ? 'bg-[#111827] border-slate-800 text-slate-100'
            : style === 'academic-warm'
            ? 'bg-[#FAF7F2] border-[#E8E2D6] text-[#28231D]'
            : style === 'editorial-command'
            ? 'bg-white border-[#DDD4C7] text-[#1C232B] shadow-2xs'
            : 'bg-white border-slate-200/90 text-slate-900'
        }`}
      >
        {/* Curricula Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div
              className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold ${
                style === 'command-dark'
                  ? 'bg-purple-950 text-purple-400 border border-purple-800'
                  : style === 'academic-warm'
                  ? 'bg-[#F2EAE1] text-[#8C4A2F]'
                  : style === 'editorial-command'
                  ? 'bg-[#FBECE6] text-[#C25E3E] border border-[#F4D3C5]'
                  : 'bg-purple-100 text-purple-700'
              }`}
            >
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h3
                className={`text-xs font-black tracking-tight ${
                  style === 'command-dark'
                    ? 'text-white'
                    : style === 'academic-warm'
                    ? 'text-[#28231D]'
                    : style === 'editorial-command'
                    ? 'font-serif text-[#1C232B] text-sm font-normal'
                    : 'text-slate-900'
                }`}
              >
                Remedial Curricula
              </h3>
              <p
                className={`text-[10px] font-medium ${
                  style === 'command-dark'
                    ? 'text-slate-400'
                    : style === 'academic-warm'
                    ? 'text-[#7D7363]'
                    : style === 'editorial-command'
                    ? 'text-[#7C7267] font-mono'
                    : 'text-slate-500'
                }`}
              >
                Structured pedagogical intervention modules
              </p>
            </div>
          </div>

          <span
            className={`text-[10px] font-extrabold px-2 py-0.5 rounded-md border ${
              style === 'command-dark'
                ? 'bg-slate-800 text-slate-300 border-slate-700'
                : style === 'academic-warm'
                ? 'bg-[#EFE9E0] text-[#7D7363] border-[#DDD3C5]'
                : style === 'editorial-command'
                ? 'bg-[#FAF7F0] text-[#5C6670] border-[#DDD4C7] font-mono'
                : 'bg-slate-100 text-slate-600 border-slate-200'
            }`}
          >
            {resources.length} Modules
          </span>
        </div>

        {/* Curricula Category Filter Pills */}
        <div className="flex items-center gap-1 bg-slate-100/90 p-1 rounded-xl text-[10px] font-bold">
          <button
            onClick={() => setSelectedCurriculumFilter('all')}
            className={`flex-1 py-1 rounded-lg transition cursor-pointer ${
              selectedCurriculumFilter === 'all'
                ? 'bg-white text-blue-700 shadow-2xs font-extrabold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setSelectedCurriculumFilter('math')}
            className={`flex-1 py-1 rounded-lg transition cursor-pointer ${
              selectedCurriculumFilter === 'math'
                ? 'bg-white text-blue-700 shadow-2xs font-extrabold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Math
          </button>
          <button
            onClick={() => setSelectedCurriculumFilter('science')}
            className={`flex-1 py-1 rounded-lg transition cursor-pointer ${
              selectedCurriculumFilter === 'science'
                ? 'bg-white text-blue-700 shadow-2xs font-extrabold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Science
          </button>
          <button
            onClick={() => setSelectedCurriculumFilter('interactive')}
            className={`flex-1 py-1 rounded-lg transition cursor-pointer ${
              selectedCurriculumFilter === 'interactive'
                ? 'bg-white text-blue-700 shadow-2xs font-extrabold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Labs
          </button>
        </div>

        {/* Curricula Cards List */}
        <div className="space-y-2.5">
          {filteredResources.map((res) => {
            const isAssigned = assignedResources[res.id];

            return (
              <div
                key={res.id}
                onClick={() => onOpenResource(res)}
                className="p-3 rounded-xl border border-slate-200/80 bg-slate-50/50 hover:bg-white hover:border-blue-300 hover:shadow-xs transition-all cursor-pointer group space-y-2"
              >
                {/* Top Strip: Type Icon + Title + Duration */}
                <div className="flex items-start gap-2.5">
                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 shadow-2xs ${
                      res.color === 'blue'
                        ? 'bg-blue-100 text-blue-600'
                        : res.color === 'emerald'
                        ? 'bg-emerald-100 text-emerald-600'
                        : res.color === 'purple'
                        ? 'bg-purple-100 text-purple-600'
                        : res.color === 'rose'
                        ? 'bg-rose-100 text-rose-600'
                        : 'bg-indigo-100 text-indigo-600'
                    }`}
                  >
                    {res.type === 'video' ? (
                      <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                    ) : res.type === 'concept' ? (
                      <FlaskConical className="w-3.5 h-3.5" />
                    ) : res.type === 'quiz' ? (
                      <Target className="w-3.5 h-3.5" />
                    ) : (
                      <BookOpen className="w-3.5 h-3.5" />
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-1">
                      <span
                        className={`text-[9px] font-extrabold uppercase tracking-wider px-1.5 py-0.2 rounded ${
                          res.subject === 'Mathematics'
                            ? 'bg-blue-100 text-blue-700'
                            : res.subject === 'Science'
                            ? 'bg-emerald-100 text-emerald-700'
                            : 'bg-rose-100 text-rose-700'
                        }`}
                      >
                        {res.subject}
                      </span>
                      <span className="text-[10px] font-bold text-slate-400">
                        {res.duration}
                      </span>
                    </div>

                    <h4 className="text-xs font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors mt-0.5 line-clamp-1">
                      {res.title}
                    </h4>
                  </div>
                </div>

                {/* Description & Scaffolding Badge */}
                {res.description && (
                  <p className="text-[11px] text-slate-500 font-medium line-clamp-2 leading-relaxed">
                    {res.description}
                  </p>
                )}

                {/* Action Footer: Scaffolding Badge + Interactive Assign Button */}
                <div className="pt-1 border-t border-slate-100 flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-slate-600 bg-white px-2 py-0.5 rounded-md border border-slate-200">
                    <Layers className="w-3 h-3 text-slate-400" />
                    <span>{res.scaffoldLevel || 'Visual Scaffold'}</span>
                  </span>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setPreviewingResource(res);
                      }}
                      className="text-[10px] font-bold text-slate-600 hover:text-blue-600 bg-white border border-slate-200 px-2 py-1 rounded-lg transition cursor-pointer flex items-center gap-1"
                    >
                      <Eye className="w-3 h-3" />
                      <span>Preview</span>
                    </button>

                    <button
                      onClick={(e) => handleAssignResource(e, res.id)}
                      className={`text-[10px] font-extrabold px-2 py-1 rounded-lg transition cursor-pointer flex items-center gap-1 ${
                        isAssigned
                          ? 'bg-emerald-600 text-white'
                          : 'bg-blue-600 hover:bg-blue-700 text-white shadow-2xs'
                      }`}
                    >
                      {isAssigned ? (
                        <>
                          <Check className="w-3 h-3" />
                          <span>Assigned</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-3 h-3" />
                          <span>Assign</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. FACULTY DAILY ACTIONS                                                  */}
      {/* ========================================================================= */}
      <div
        id="faculty-daily-actions-card"
        className={`rounded-2xl p-5 border shadow-xs transition-colors duration-200 ${
          style === 'command-dark'
            ? 'bg-[#111827] border-slate-800 text-slate-100'
            : style === 'academic-warm'
            ? 'bg-[#FAF7F2] border-[#E8E2D6] text-[#28231D]'
            : style === 'editorial-command'
            ? 'bg-white border-[#DDD4C7] text-[#1C232B] shadow-2xs'
            : 'bg-white border-slate-200/90 text-slate-900'
        }`}
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <h3
              className={`text-xs font-black tracking-tight ${
                style === 'command-dark'
                  ? 'text-white'
                  : style === 'academic-warm'
                  ? 'text-[#28231D]'
                  : style === 'editorial-command'
                  ? 'font-serif text-[#1C232B] text-sm font-normal'
                  : 'text-slate-900'
              }`}
            >
              Faculty Daily Actions
            </h3>
            <span
              className={`text-[10px] font-extrabold px-1.5 py-0.2 rounded ${
                style === 'command-dark'
                  ? 'bg-cyan-950 text-cyan-300'
                  : style === 'academic-warm'
                  ? 'bg-[#EFE9E0] text-[#8C4A2F]'
                  : style === 'editorial-command'
                  ? 'bg-[#E5F2EE] text-[#246257] font-mono'
                  : 'bg-blue-50 text-blue-700'
              }`}
            >
              {goals.filter((g) => g.completed).length}/{goals.length}
            </span>
          </div>
          <span
            className={`text-[11px] font-bold hover:underline cursor-pointer ${
              style === 'command-dark'
                ? 'text-cyan-400'
                : style === 'academic-warm'
                ? 'text-[#8C4A2F]'
                : style === 'editorial-command'
                ? 'text-[#246257]'
                : 'text-blue-600'
            }`}
          >
            View All
          </span>
        </div>

        <div className="space-y-2.5">
          {goals.map((goal) => (
            <div
              key={goal.id}
              onClick={() => onToggleGoal(goal.id)}
              className="flex items-start gap-2.5 group cursor-pointer text-xs"
            >
              <button className="mt-0.5 shrink-0 text-slate-400 group-hover:text-blue-600 transition-colors cursor-pointer">
                {goal.completed ? (
                  <CheckCircle2
                    className={`w-4 h-4 ${
                      style === 'command-dark'
                        ? 'text-cyan-400 fill-cyan-950'
                        : style === 'academic-warm'
                        ? 'text-[#8C4A2F] fill-[#F5EFE6]'
                        : style === 'editorial-command'
                        ? 'text-[#246257] fill-[#E5F2EE]'
                        : 'text-blue-600 fill-blue-100'
                    }`}
                  />
                ) : (
                  <Circle className="w-4 h-4 text-slate-300" />
                )}
              </button>
              <span
                className={`leading-snug transition-colors ${
                  goal.completed
                    ? 'line-through text-slate-400 font-medium'
                    : style === 'command-dark'
                    ? 'text-slate-300 font-semibold group-hover:text-white'
                    : style === 'academic-warm'
                    ? 'text-[#3E372E] font-semibold group-hover:text-[#28231D]'
                    : style === 'editorial-command'
                    ? 'text-[#1C232B] font-medium group-hover:text-[#246257]'
                    : 'text-slate-700 font-semibold group-hover:text-slate-900'
                }`}
              >
                {goal.text}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4. CLASSROOM INSPIRATION CARD                                             */}
      {/* ========================================================================= */}
      <div
        id="mountain-motivation-card"
        className={`rounded-2xl p-4 border relative overflow-hidden text-center transition-colors duration-200 ${
          style === 'command-dark'
            ? 'bg-slate-900 border-slate-800 text-slate-200'
            : style === 'academic-warm'
            ? 'bg-[#F5EFE6] border-[#DDD3C5] text-[#28231D]'
            : style === 'editorial-command'
            ? 'bg-[#FAF7F0] border-[#DDD4C7] text-[#1C232B]'
            : 'bg-gradient-to-br from-indigo-50/80 via-purple-50/40 to-sky-50 border-indigo-100/80 text-slate-900'
        }`}
      >
        <div className="relative z-10 space-y-1.5">
          <div
            className={`w-10 h-10 mx-auto rounded-xl shadow-xs flex items-center justify-center mb-1 ${
              style === 'command-dark'
                ? 'bg-slate-800 text-cyan-400'
                : style === 'academic-warm'
                ? 'bg-[#FAF7F2] text-[#8C4A2F]'
                : style === 'editorial-command'
                ? 'bg-[#E5F2EE] text-[#246257]'
                : 'bg-white text-indigo-600'
            }`}
          >
            <Mountain className="w-5 h-5 stroke-[2]" />
          </div>

          <h4
            className={`text-xs font-black ${
              style === 'command-dark'
                ? 'text-white'
                : style === 'academic-warm'
                ? 'text-[#28231D]'
                : style === 'editorial-command'
                ? 'font-serif text-[#1C232B] text-sm font-normal'
                : 'text-slate-900'
            }`}
          >
            &ldquo;Every misconception is a doorway to mastery.&rdquo;
          </h4>
          <p
            className={`text-[11px] font-medium leading-relaxed ${
              style === 'command-dark'
                ? 'text-slate-400'
                : style === 'academic-warm'
                ? 'text-[#7D7363]'
                : style === 'editorial-command'
                ? 'text-[#5C6670]'
                : 'text-slate-600'
            }`}
          >
            Targeting the #1 hardest topic unlocks downstream concept comprehension.
          </p>
        </div>
      </div>

      {/* Interactive Curriculum Preview Drawer */}
      {previewingResource && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-md w-full p-5 border border-slate-200 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                  <FileCheck2 className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-black text-slate-900">
                    Curriculum Module Preview
                  </h3>
                  <span className="text-[10px] text-slate-500 font-medium">
                    {previewingResource.subject} • {previewingResource.classGrade}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setPreviewingResource(null)}
                className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <h4 className="font-extrabold text-slate-900">
                  {previewingResource.title}
                </h4>
                <p className="text-slate-600 mt-1 text-[11px] leading-relaxed">
                  {previewingResource.description}
                </p>
              </div>

              <div className="p-3 bg-blue-50/60 rounded-xl border border-blue-100 space-y-1.5">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-700">
                  Lesson Scaffolding Structure ({previewingResource.stepsCount || 4} Steps)
                </span>
                <ul className="text-[11px] text-slate-700 space-y-1 list-disc pl-4 font-medium">
                  <li>Step 1: Concrete physical manipulative orientation</li>
                  <li>Step 2: Guided visual diagram representation</li>
                  <li>Step 3: 5 Rapid diagnostic comprehension checks</li>
                  <li>Step 4: Individual exit ticket submission</li>
                </ul>
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-[11px] font-bold text-slate-500">
                  Estimated duration: {previewingResource.duration}
                </span>
                <button
                  onClick={() => {
                    handleAssignResource(null as any, previewingResource.id);
                    setPreviewingResource(null);
                  }}
                  className="px-3.5 py-1.5 rounded-xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-700 transition cursor-pointer shadow-xs"
                >
                  Dispatch to {previewingResource.assignedCount || 12} Students
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
