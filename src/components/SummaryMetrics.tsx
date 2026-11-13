import React, { useState } from 'react';
import {
  TrendingUp,
  AlertTriangle,
  Award,
  Users,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  Sparkles,
  Flame,
  Target,
  ChevronRight,
  Info,
} from 'lucide-react';
import { ClassSummaryStats } from '../types';
import { useDashboardTheme } from '../context/ThemeContext';

interface SummaryMetricsProps {
  stats: ClassSummaryStats;
  activeGapsCount: number;
  fixedCount: number;
  totalStudents: number;
  onFilterUrgentGaps?: () => void;
}

export const SummaryMetrics: React.FC<SummaryMetricsProps> = ({
  stats,
  activeGapsCount,
  fixedCount,
  totalStudents,
  onFilterUrgentGaps,
}) => {
  const { style } = useDashboardTheme();
  const [activeMetricTab, setActiveMetricTab] = useState<'kpi' | 'targets'>('kpi');
  const [showScoreInfo, setShowScoreInfo] = useState<boolean>(false);

  // Recalculate pass rate dynamically based on students who fixed their gaps vs active
  const dynamicPassRate =
    totalStudents > 0
      ? Math.round(((totalStudents - activeGapsCount) / totalStudents) * 100 * 10) / 10
      : stats.classPassRate;

  return (
    <div className="space-y-3">
      {/* Header Bar with Interactive View Toggle */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2
            className={`text-sm font-black tracking-tight ${
              style === 'command-dark'
                ? 'text-slate-100'
                : style === 'academic-warm'
                ? 'text-[#28231D]'
                : style === 'editorial-command'
                ? 'text-[#1C232B] font-serif text-base font-normal'
                : 'text-slate-900'
            }`}
          >
            Key Batch Performance Indicators
          </h2>
          <span
            className={`text-[11px] font-extrabold px-2 py-0.5 rounded-full border shadow-2xs ${
              style === 'command-dark'
                ? 'bg-cyan-950 text-cyan-300 border-cyan-800'
                : style === 'academic-warm'
                ? 'bg-amber-100 text-amber-800 border-amber-200'
                : style === 'editorial-command'
                ? 'bg-[#E5F2EE] text-[#246257] border-[#BFDFD6] font-mono text-[10px]'
                : 'bg-blue-50 text-blue-700 border-blue-100'
            }`}
          >
            Live Diagnostics
          </span>
        </div>

        <div
          className={`flex items-center gap-1 p-0.5 rounded-xl text-[11px] font-bold border ${
            style === 'command-dark'
              ? 'bg-slate-900 border-slate-800'
              : style === 'academic-warm'
              ? 'bg-[#EFE9E0] border-[#DDD3C5]'
              : style === 'editorial-command'
              ? 'bg-[#FAF7F0] border-[#DDD4C7]'
              : 'bg-slate-100 border-slate-200/60'
          }`}
        >
          <button
            onClick={() => setActiveMetricTab('kpi')}
            className={`px-2.5 py-0.5 rounded-lg transition cursor-pointer ${
              activeMetricTab === 'kpi'
                ? style === 'command-dark'
                  ? 'bg-cyan-500 text-slate-950 shadow-2xs font-black'
                  : style === 'academic-warm'
                  ? 'bg-[#8C4A2F] text-white shadow-2xs font-black'
                  : style === 'editorial-command'
                  ? 'bg-[#246257] text-white shadow-2xs font-semibold'
                  : 'bg-white text-blue-700 shadow-2xs font-extrabold'
                : style === 'command-dark'
                ? 'text-slate-400 hover:text-slate-200'
                : style === 'academic-warm'
                ? 'text-[#645A4C] hover:text-[#28231D]'
                : style === 'editorial-command'
                ? 'text-[#5C6670] hover:text-[#1C232B]'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Live KPIs
          </button>
          <button
            onClick={() => setActiveMetricTab('targets')}
            className={`px-2.5 py-0.5 rounded-lg transition cursor-pointer ${
              activeMetricTab === 'targets'
                ? style === 'command-dark'
                  ? 'bg-cyan-500 text-slate-950 shadow-2xs font-black'
                  : style === 'academic-warm'
                  ? 'bg-[#8C4A2F] text-white shadow-2xs font-black'
                  : style === 'editorial-command'
                  ? 'bg-[#246257] text-white shadow-2xs font-semibold'
                  : 'bg-white text-blue-700 shadow-2xs font-extrabold'
                : style === 'command-dark'
                ? 'text-slate-400 hover:text-slate-200'
                : style === 'academic-warm'
                ? 'text-[#645A4C] hover:text-[#28231D]'
                : style === 'editorial-command'
                ? 'text-[#5C6670] hover:text-[#1C232B]'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Batch Targets
          </button>
        </div>
      </div>

      {/* 3 Big Summary Numbers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* 1. Overall Class Pass Rate */}
        <div
          id="metric-card-pass-rate"
          className={`rounded-2xl p-5 border shadow-xs transition-all group relative overflow-hidden ${
            style === 'command-dark'
              ? 'bg-[#111827] border-slate-800 hover:border-cyan-500/50'
              : style === 'academic-warm'
              ? 'bg-[#FAF7F2] border-[#E8E2D6] hover:border-[#8C4A2F]/40'
              : style === 'editorial-command'
              ? 'bg-white border-[#DDD4C7] shadow-2xs hover:border-[#246257]'
              : 'bg-white border-slate-200/90 hover:border-blue-300'
          }`}
        >
          <div
            className={`absolute top-0 left-0 h-1.5 w-full ${
              style === 'command-dark'
                ? 'bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-500'
                : style === 'academic-warm'
                ? 'bg-gradient-to-r from-[#8C4A2F] via-[#B45309] to-[#15803D]'
                : style === 'editorial-command'
                ? 'bg-[#246257]'
                : 'bg-gradient-to-r from-blue-500 via-sky-400 to-indigo-500'
            }`}
          />
          <div className="flex items-center justify-between mb-3">
            <span
              className={`text-[11px] font-black uppercase tracking-wider ${
                style === 'command-dark'
                  ? 'text-slate-400'
                  : style === 'academic-warm'
                  ? 'text-[#7D7363]'
                  : style === 'editorial-command'
                  ? 'text-[#7C7267] font-mono text-[10px]'
                  : 'text-slate-500'
              }`}
            >
              1. Class Pass Rate
            </span>
            <div
              className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold ${
                style === 'command-dark'
                  ? 'bg-cyan-950 text-cyan-400 border border-cyan-800'
                  : style === 'academic-warm'
                  ? 'bg-[#F2EAE1] text-[#8C4A2F]'
                  : style === 'editorial-command'
                  ? 'bg-[#E5F2EE] text-[#246257] border border-[#BFDFD6]'
                  : 'bg-blue-50 text-blue-600'
              }`}
            >
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>

          <div className="flex items-baseline gap-3">
            <span
              className={`text-4xl font-black tracking-tight ${
                style === 'command-dark'
                  ? 'text-white'
                  : style === 'academic-warm'
                  ? 'text-[#28231D]'
                  : style === 'editorial-command'
                  ? 'text-[#1C232B] font-serif text-5xl font-normal'
                  : 'text-slate-900'
              }`}
            >
              {dynamicPassRate}%
            </span>
            <span
              className={`inline-flex items-center text-xs font-black px-2 py-0.5 rounded-full border ${
                style === 'command-dark'
                  ? 'text-emerald-300 bg-emerald-950 border-emerald-800'
                  : style === 'editorial-command'
                  ? 'text-[#246257] bg-[#E5F2EE] border-[#BFDFD6] font-mono text-[10px]'
                  : 'text-emerald-700 bg-emerald-50 border-emerald-200'
              }`}
            >
              <ArrowUpRight className="w-3 h-3 mr-0.5" />
              +{stats.passRateTrend}% vs test 1
            </span>
          </div>

          <div
            className={`mt-3 pt-3 border-t flex items-center justify-between text-xs ${
              style === 'command-dark'
                ? 'border-slate-800 text-slate-400'
                : style === 'academic-warm'
                ? 'border-[#E8E2D6] text-[#7D7363]'
                : 'border-slate-100 text-slate-500'
            }`}
          >
            <div className="flex items-center gap-1.5 font-medium">
              <Users className="w-3.5 h-3.5 opacity-60" />
              <span>
                <strong
                  className={
                    style === 'command-dark'
                      ? 'text-slate-200'
                      : style === 'academic-warm'
                      ? 'text-[#28231D]'
                      : 'text-slate-800'
                  }
                >
                  {totalStudents - activeGapsCount}
                </strong>{' '}
                of {totalStudents} passing
              </span>
            </div>
            <span
              className={`font-extrabold px-2 py-0.5 rounded-md text-[10px] ${
                style === 'command-dark'
                  ? 'bg-cyan-950 text-cyan-300 border border-cyan-800'
                  : style === 'academic-warm'
                  ? 'bg-[#EFE9E0] text-[#8C4A2F]'
                  : 'bg-blue-50 text-blue-600'
              }`}
            >
              Benchmark: 70%
            </span>
          </div>

          {/* Progress bar */}
          <div
            className={`mt-2.5 w-full rounded-full h-2 overflow-hidden ${
              style === 'command-dark'
                ? 'bg-slate-800'
                : style === 'academic-warm'
                ? 'bg-[#EFE9E0]'
                : 'bg-slate-100'
            }`}
          >
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                style === 'command-dark'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-500'
                  : style === 'academic-warm'
                  ? 'bg-gradient-to-r from-[#8C4A2F] to-[#15803D]'
                  : 'bg-gradient-to-r from-blue-600 via-sky-500 to-indigo-500'
              }`}
              style={{ width: `${Math.min(100, dynamicPassRate)}%` }}
            />
          </div>
        </div>

        {/* 2. Number of Active Learning Gaps */}
        <div
          id="metric-card-learning-gaps"
          onClick={onFilterUrgentGaps}
          className={`rounded-2xl p-5 border shadow-xs transition-all group relative overflow-hidden cursor-pointer ${
            style === 'command-dark'
              ? 'bg-[#111827] border-slate-800 hover:border-amber-500/50'
              : style === 'academic-warm'
              ? 'bg-[#FAF7F2] border-[#E8E2D6] hover:border-amber-700/40'
              : style === 'editorial-command'
              ? 'bg-white border-[#DDD4C7] shadow-2xs hover:border-[#C25E3E]'
              : 'bg-white border-slate-200/90 hover:border-amber-300'
          }`}
          title="Click to jump to Student Knowledge Matrix"
        >
          <div className={`absolute top-0 left-0 h-1.5 w-full ${style === 'editorial-command' ? 'bg-[#C25E3E]' : 'bg-gradient-to-r from-amber-500 via-orange-400 to-rose-500'}`} />
          <div className="flex items-center justify-between mb-3">
            <span
              className={`text-[11px] font-black uppercase tracking-wider ${
                style === 'command-dark'
                  ? 'text-slate-400'
                  : style === 'academic-warm'
                  ? 'text-[#7D7363]'
                  : style === 'editorial-command'
                  ? 'text-[#7C7267] font-mono text-[10px]'
                  : 'text-slate-500'
              }`}
            >
              2. Active Learning Gaps
            </span>
            <div
              className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold ${
                style === 'command-dark'
                  ? 'bg-amber-950 text-amber-400 border border-amber-800'
                  : style === 'academic-warm'
                  ? 'bg-amber-100 text-amber-800'
                  : style === 'editorial-command'
                  ? 'bg-[#FDF3EE] text-[#C25E3E] border border-[#F5D5C6]'
                  : 'bg-amber-50 text-amber-600'
              }`}
            >
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>

          <div className="flex items-baseline gap-3">
            <span
              className={`text-4xl font-black tracking-tight ${
                style === 'command-dark'
                  ? 'text-amber-400'
                  : style === 'editorial-command'
                  ? 'text-[#C25E3E] font-serif text-5xl font-normal'
                  : 'text-amber-600'
              }`}
            >
              {activeGapsCount}
            </span>
            <span
              className={`text-xs font-bold ${
                style === 'command-dark'
                  ? 'text-slate-400'
                  : style === 'academic-warm'
                  ? 'text-[#7D7363]'
                  : style === 'editorial-command'
                  ? 'text-[#7C7267]'
                  : 'text-slate-500'
              }`}
            >
              unresolved roadblocks
            </span>
          </div>

          <div
            className={`mt-3 pt-3 border-t flex items-center justify-between text-xs ${
              style === 'command-dark'
                ? 'border-slate-800 text-slate-400'
                : style === 'academic-warm'
                ? 'border-[#E8E2D6] text-[#7D7363]'
                : style === 'editorial-command'
                ? 'border-[#DDD4C7] text-[#7C7267]'
                : 'border-slate-100 text-slate-500'
            }`}
          >
            <div className="flex items-center gap-1.5">
              <span
                className={`inline-flex items-center gap-1 text-[10px] font-black border px-2 py-0.5 rounded-md ${
                  style === 'command-dark'
                    ? 'text-rose-300 bg-rose-950 border-rose-800'
                    : style === 'editorial-command'
                    ? 'text-[#C25E3E] bg-[#FDF3EE] border-[#F5D5C6] font-mono'
                    : 'text-rose-700 bg-rose-50 border-rose-200'
                }`}
              >
                <Clock className="w-3 h-3" />
                {stats.urgentGapsCount} Urgent
              </span>
              <span
                className={`inline-flex items-center gap-1 text-[10px] font-black border px-2 py-0.5 rounded-md ${
                  style === 'command-dark'
                    ? 'text-emerald-300 bg-emerald-950 border-emerald-800'
                    : style === 'editorial-command'
                    ? 'text-[#246257] bg-[#E5F2EE] border-[#BFDFD6] font-mono'
                    : 'text-emerald-700 bg-emerald-50 border-emerald-200'
                }`}
              >
                <CheckCircle2 className="w-3 h-3" />
                {fixedCount} Fixed
              </span>
            </div>
            <span
              className={`text-[10px] font-bold flex items-center gap-0.5 ${
                style === 'command-dark'
                  ? 'text-cyan-400'
                  : style === 'academic-warm'
                  ? 'text-[#8C4A2F]'
                  : style === 'editorial-command'
                  ? 'text-[#246257] font-semibold'
                  : 'text-blue-600'
              }`}
            >
              <span>Matrix</span>
              <ChevronRight className="w-3 h-3" />
            </span>
          </div>

          {/* Severity Meter */}
          <div className="mt-2.5 flex items-center gap-1">
            <div className="flex-1 bg-rose-500 h-2 rounded-l-full" title="Urgent Gaps" />
            <div className="flex-1 bg-amber-400 h-2" title="In Progress" />
            <div className="flex-2 bg-emerald-400 h-2 rounded-r-full" title="Resolved" />
          </div>
        </div>

        {/* 3. Average Mastery Score */}
        <div
          id="metric-card-mastery-score"
          onClick={() => setShowScoreInfo(!showScoreInfo)}
          className={`rounded-2xl p-5 border shadow-xs transition-all group relative overflow-hidden cursor-pointer ${
            style === 'command-dark'
              ? 'bg-[#111827] border-slate-800 hover:border-emerald-500/50'
              : style === 'academic-warm'
              ? 'bg-[#FAF7F2] border-[#E8E2D6] hover:border-emerald-700/40'
              : style === 'editorial-command'
              ? 'bg-white border-[#DDD4C7] shadow-2xs hover:border-[#246257]'
              : 'bg-white border-slate-200/90 hover:border-emerald-300'
          }`}
        >
          <div className={`absolute top-0 left-0 h-1.5 w-full ${style === 'editorial-command' ? 'bg-[#246257]' : 'bg-gradient-to-r from-emerald-500 via-teal-400 to-green-500'}`} />
          <div className="flex items-center justify-between mb-3">
            <span
              className={`text-[11px] font-black uppercase tracking-wider ${
                style === 'command-dark'
                  ? 'text-slate-400'
                  : style === 'academic-warm'
                  ? 'text-[#7D7363]'
                  : style === 'editorial-command'
                  ? 'text-[#7C7267] font-mono text-[10px]'
                  : 'text-slate-500'
              }`}
            >
              3. Average Mastery Score
            </span>
            <div
              className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold ${
                style === 'command-dark'
                  ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                  : style === 'academic-warm'
                  ? 'bg-emerald-100 text-emerald-800'
                  : style === 'editorial-command'
                  ? 'bg-[#E5F2EE] text-[#246257] border border-[#BFDFD6]'
                  : 'bg-emerald-50 text-emerald-600'
              }`}
            >
              <Award className="w-4 h-4" />
            </div>
          </div>

          <div className="flex items-baseline gap-2">
            <span
              className={`text-4xl font-black tracking-tight ${
                style === 'command-dark'
                  ? 'text-white'
                  : style === 'academic-warm'
                  ? 'text-[#28231D]'
                  : style === 'editorial-command'
                  ? 'text-[#1C232B] font-serif text-5xl font-normal'
                  : 'text-slate-900'
              }`}
            >
              {stats.averageMasteryScore}
            </span>
            <span
              className={`text-sm font-bold ${
                style === 'command-dark' ? 'text-slate-500' : 'text-slate-400'
              }`}
            >
              / 100
            </span>
            <span
              className={`ml-auto inline-flex items-center text-[10px] font-black px-2 py-0.5 rounded-full border ${
                style === 'command-dark'
                  ? 'bg-cyan-950 text-cyan-300 border-cyan-800'
                  : style === 'academic-warm'
                  ? 'bg-[#EFE9E0] text-[#8C4A2F] border-[#DDD3C5]'
                  : style === 'editorial-command'
                  ? 'bg-[#E5F2EE] text-[#246257] border-[#BFDFD6] font-mono'
                  : 'bg-blue-50 text-blue-700 border-blue-100'
              }`}
            >
              <Sparkles className="w-3 h-3 mr-1" />
              {stats.masteryTier.split(' ')[0]}
            </span>
          </div>

          <div
            className={`mt-3 pt-3 border-t flex items-center justify-between text-xs ${
              style === 'command-dark'
                ? 'border-slate-800 text-slate-400'
                : style === 'academic-warm'
                ? 'border-[#E8E2D6] text-[#7D7363]'
                : 'border-slate-100 text-slate-500'
            }`}
          >
            <span className="font-medium">Batch Proficiency:</span>
            <span
              className={`font-extrabold ${
                style === 'command-dark' ? 'text-emerald-400' : 'text-emerald-700'
              }`}
            >
              Solid Progress
            </span>
          </div>

          {/* Tier breakdown indicators */}
          <div
            className={`mt-2.5 flex items-center justify-between text-[10px] font-bold ${
              style === 'command-dark'
                ? 'text-slate-500'
                : style === 'academic-warm'
                ? 'text-[#8E8474]'
                : 'text-slate-400'
            }`}
          >
            <span>Critical &lt;50</span>
            <span
              className={`font-extrabold ${
                style === 'command-dark' ? 'text-emerald-400' : 'text-emerald-700'
              }`}
            >
              Batch Target &gt;80
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

