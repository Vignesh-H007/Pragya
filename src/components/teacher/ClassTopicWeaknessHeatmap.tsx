import React, { useState, useMemo } from 'react';
import {
  Grid,
  AlertOctagon,
  AlertTriangle,
  CheckCircle2,
  Search,
  Users,
  Sparkles,
  ChevronRight,
  X,
  Send,
  Zap,
  Brain,
  Calculator,
  FileText,
  Layers,
  BarChart3,
  SlidersHorizontal,
  Info,
  ArrowRight,
} from 'lucide-react';
import { useDashboardTheme } from '../../context/ThemeContext';
import {
  MOCK_HEATMAP_TOPICS,
  TopicWeaknessRow,
  HeatmapTopicCell,
} from '../../data/teacherDashboardData';
import { Subject, DashboardStyle } from '../../types';

interface ClassTopicWeaknessHeatmapProps {
  selectedClass: string;
  selectedSubject: Subject;
  onNavigateToMatrix?: () => void;
}

type ViewMode = 'matrix' | 'spectrum';

export const ClassTopicWeaknessHeatmap: React.FC<ClassTopicWeaknessHeatmapProps> = ({
  selectedClass,
  selectedSubject,
  onNavigateToMatrix,
}) => {
  const { style } = useDashboardTheme();
  const isDark = style === 'obsidian-dark' || style === 'command-dark';

  const [searchQuery, setSearchQuery] = useState('');
  const [severityFilter, setSeverityFilter] = useState<'all' | 'critical' | 'high' | 'moderate' | 'low'>('all');
  const [subjectFilter, setSubjectFilter] = useState<string>('All');
  const [viewMode, setViewMode] = useState<ViewMode>('matrix');
  const [sortBy, setSortBy] = useState<'highest_weakness' | 'topic_name' | 'stuck_students'>('highest_weakness');
  const [selectedCellInfo, setSelectedCellInfo] = useState<{
    topic: TopicWeaknessRow;
    cell?: HeatmapTopicCell;
  } | null>(null);
  const [remedialAssignedTopics, setRemedialAssignedTopics] = useState<Record<string, boolean>>({});

  // Theme-aware color grading engine
  const themeGrading = useMemo(() => {
    switch (style) {
      case 'editorial-command':
        return {
          themeName: 'Editorial Command',
          paletteLabel: 'Sandstone & Terracotta-to-Spruce Grading',
          containerBg: 'bg-[#FAF7F0] border-[#DDD4C7] text-[#1C232B]',
          cardHeaderBg: 'bg-[#F4EFEA] border-[#DDD4C7]',
          tableThBg: 'bg-[#EFE8DE] text-[#1C232B] border-[#DDD4C7]',
          tableBorder: 'border-[#DDD4C7]',
          tableDivide: 'divide-[#E8DFC8]',
          rowHover: 'hover:bg-[#F2ECE1]/80',
          accentText: 'text-[#246257]',
          badgePill: 'bg-[#246257] text-white',
          filterActive: 'bg-[#246257] text-white',
          filterInactive: 'text-[#5C6670] hover:text-[#1C232B]',
          getCellStyle: (score: number) => {
            if (score >= 60) {
              return {
                bg: 'bg-[#C85340]/15 hover:bg-[#C85340]/25',
                text: 'text-[#9E3625]',
                border: 'border-[#C85340]/35',
                barFill: '#C85340',
                badgeBg: 'bg-[#C85340]/15',
                badgeText: 'text-[#9E3625]',
                level: 'Critical',
              };
            }
            if (score >= 45) {
              return {
                bg: 'bg-[#D97706]/15 hover:bg-[#D97706]/25',
                text: 'text-[#B45309]',
                border: 'border-[#D97706]/35',
                barFill: '#D97706',
                badgeBg: 'bg-[#D97706]/15',
                badgeText: 'text-[#B45309]',
                level: 'High',
              };
            }
            if (score >= 30) {
              return {
                bg: 'bg-[#D4A373]/25 hover:bg-[#D4A373]/35',
                text: 'text-[#8C5E32]',
                border: 'border-[#D4A373]/40',
                barFill: '#D4A373',
                badgeBg: 'bg-[#D4A373]/20',
                badgeText: 'text-[#8C5E32]',
                level: 'Moderate',
              };
            }
            return {
              bg: 'bg-[#246257]/12 hover:bg-[#246257]/22',
              text: 'text-[#246257]',
              border: 'border-[#246257]/30',
              barFill: '#246257',
              badgeBg: 'bg-[#246257]/15',
              badgeText: 'text-[#246257]',
              level: 'Mastered',
            };
          },
          legend: [
            { label: 'Critical (≥60%)', swatch: 'bg-[#C85340]', text: 'text-[#9E3625]', key: 'critical' as const },
            { label: 'High (45-59%)', swatch: 'bg-[#D97706]', text: 'text-[#B45309]', key: 'high' as const },
            { label: 'Moderate (30-44%)', swatch: 'bg-[#D4A373]', text: 'text-[#8C5E32]', key: 'moderate' as const },
            { label: 'Mastered (<30%)', swatch: 'bg-[#246257]', text: 'text-[#246257]', key: 'low' as const },
          ],
        };

      case 'obsidian-dark':
      case 'command-dark':
        return {
          themeName: 'Obsidian Dark',
          paletteLabel: 'Obsidian Matte & Radiant Ruby-to-Emerald Glow',
          containerBg: 'bg-[#121218] border-[#262633] text-slate-100 shadow-xl',
          cardHeaderBg: 'bg-[#0E0E14] border-[#23232C]',
          tableThBg: 'bg-[#161620] text-slate-200 border-[#262633]',
          tableBorder: 'border-[#262633]',
          tableDivide: 'divide-[#20202C]',
          rowHover: 'hover:bg-[#181824]',
          accentText: 'text-indigo-400',
          badgePill: 'bg-indigo-600 text-white',
          filterActive: 'bg-indigo-600 text-white shadow-xs',
          filterInactive: 'text-slate-400 hover:text-slate-200',
          getCellStyle: (score: number) => {
            if (score >= 60) {
              return {
                bg: 'bg-rose-950/50 hover:bg-rose-900/60',
                text: 'text-rose-300',
                border: 'border-rose-600/40',
                barFill: '#F43F5E',
                badgeBg: 'bg-rose-950/70',
                badgeText: 'text-rose-300',
                level: 'Critical',
              };
            }
            if (score >= 45) {
              return {
                bg: 'bg-amber-950/50 hover:bg-amber-900/60',
                text: 'text-amber-300',
                border: 'border-amber-600/40',
                barFill: '#F59E0B',
                badgeBg: 'bg-amber-950/70',
                badgeText: 'text-amber-300',
                level: 'High',
              };
            }
            if (score >= 30) {
              return {
                bg: 'bg-violet-950/50 hover:bg-violet-900/60',
                text: 'text-violet-300',
                border: 'border-violet-600/40',
                barFill: '#8B5CF6',
                badgeBg: 'bg-violet-950/70',
                badgeText: 'text-violet-300',
                level: 'Moderate',
              };
            }
            return {
              bg: 'bg-emerald-950/50 hover:bg-emerald-900/60',
              text: 'text-emerald-300',
              border: 'border-emerald-600/40',
              barFill: '#10B981',
              badgeBg: 'bg-emerald-950/70',
              badgeText: 'text-emerald-300',
              level: 'Mastered',
            };
          },
          legend: [
            { label: 'Critical (≥60%)', swatch: 'bg-rose-500 shadow-rose-500/50 shadow-xs', text: 'text-rose-400', key: 'critical' as const },
            { label: 'High (45-59%)', swatch: 'bg-amber-500', text: 'text-amber-400', key: 'high' as const },
            { label: 'Moderate (30-44%)', swatch: 'bg-violet-500', text: 'text-violet-400', key: 'moderate' as const },
            { label: 'Mastered (<30%)', swatch: 'bg-emerald-500 shadow-emerald-500/50 shadow-xs', text: 'text-emerald-400', key: 'low' as const },
          ],
        };

      case 'academic-warm':
        return {
          themeName: 'Academic Warm',
          paletteLabel: 'Parchment & Terracotta-to-Sage Grading',
          containerBg: 'bg-[#FFFDFB] border-[#E6DFD3] text-[#28231D]',
          cardHeaderBg: 'bg-[#FAF7F2] border-[#E6DFD3]',
          tableThBg: 'bg-[#F5EFE6] text-[#28231D] border-[#E6DFD3]',
          tableBorder: 'border-[#E6DFD3]',
          tableDivide: 'divide-[#EDE5D8]',
          rowHover: 'hover:bg-[#FAF4EC]',
          accentText: 'text-[#9A3412]',
          badgePill: 'bg-[#8C4A2F] text-white',
          filterActive: 'bg-[#8C4A2F] text-white',
          filterInactive: 'text-[#5C5346] hover:text-[#28231D]',
          getCellStyle: (score: number) => {
            if (score >= 60) {
              return {
                bg: 'bg-[#9A3412]/15 hover:bg-[#9A3412]/25',
                text: 'text-[#9A3412]',
                border: 'border-[#9A3412]/35',
                barFill: '#9A3412',
                badgeBg: 'bg-[#9A3412]/15',
                badgeText: 'text-[#9A3412]',
                level: 'Critical',
              };
            }
            if (score >= 45) {
              return {
                bg: 'bg-[#C2410C]/15 hover:bg-[#C2410C]/25',
                text: 'text-[#C2410C]',
                border: 'border-[#C2410C]/35',
                barFill: '#C2410C',
                badgeBg: 'bg-[#C2410C]/15',
                badgeText: 'text-[#C2410C]',
                level: 'High',
              };
            }
            if (score >= 30) {
              return {
                bg: 'bg-[#B45309]/15 hover:bg-[#B45309]/25',
                text: 'text-[#B45309]',
                border: 'border-[#B45309]/35',
                barFill: '#B45309',
                badgeBg: 'bg-[#B45309]/15',
                badgeText: 'text-[#B45309]',
                level: 'Moderate',
              };
            }
            return {
              bg: 'bg-[#15803D]/15 hover:bg-[#15803D]/25',
              text: 'text-[#15803D]',
              border: 'border-[#15803D]/35',
              barFill: '#15803D',
              badgeBg: 'bg-[#15803D]/15',
              badgeText: 'text-[#15803D]',
              level: 'Mastered',
            };
          },
          legend: [
            { label: 'Critical (≥60%)', swatch: 'bg-[#9A3412]', text: 'text-[#9A3412]', key: 'critical' as const },
            { label: 'High (45-59%)', swatch: 'bg-[#C2410C]', text: 'text-[#C2410C]', key: 'high' as const },
            { label: 'Moderate (30-44%)', swatch: 'bg-[#B45309]', text: 'text-[#B45309]', key: 'moderate' as const },
            { label: 'Mastered (<30%)', swatch: 'bg-[#15803D]', text: 'text-[#15803D]', key: 'low' as const },
          ],
        };

      case 'clean':
      default:
        return {
          themeName: 'Modern Pedagogic',
          paletteLabel: 'Daylight Blue & Rose-to-Emerald Grading',
          containerBg: 'bg-white border-slate-200 text-slate-900 shadow-xs',
          cardHeaderBg: 'bg-slate-50 border-slate-200',
          tableThBg: 'bg-slate-100/90 text-slate-800 border-slate-200',
          tableBorder: 'border-slate-200',
          tableDivide: 'divide-slate-100',
          rowHover: 'hover:bg-slate-50',
          accentText: 'text-blue-600',
          badgePill: 'bg-blue-600 text-white',
          filterActive: 'bg-blue-600 text-white',
          filterInactive: 'text-slate-600 hover:text-slate-900',
          getCellStyle: (score: number) => {
            if (score >= 60) {
              return {
                bg: 'bg-rose-100 hover:bg-rose-200/80',
                text: 'text-rose-800',
                border: 'border-rose-300',
                barFill: '#E11D48',
                badgeBg: 'bg-rose-100',
                badgeText: 'text-rose-800',
                level: 'Critical',
              };
            }
            if (score >= 45) {
              return {
                bg: 'bg-amber-100 hover:bg-amber-200/80',
                text: 'text-amber-800',
                border: 'border-amber-300',
                barFill: '#F59E0B',
                badgeBg: 'bg-amber-100',
                badgeText: 'text-amber-800',
                level: 'High',
              };
            }
            if (score >= 30) {
              return {
                bg: 'bg-sky-100 hover:bg-sky-200/80',
                text: 'text-sky-800',
                border: 'border-sky-300',
                barFill: '#0284C7',
                badgeBg: 'bg-sky-100',
                badgeText: 'text-sky-800',
                level: 'Moderate',
              };
            }
            return {
              bg: 'bg-emerald-100 hover:bg-emerald-200/80',
              text: 'text-emerald-800',
              border: 'border-emerald-300',
              barFill: '#10B981',
              badgeBg: 'bg-emerald-100',
              badgeText: 'text-emerald-800',
              level: 'Mastered',
            };
          },
          legend: [
            { label: 'Critical (≥60%)', swatch: 'bg-rose-500', text: 'text-rose-700', key: 'critical' as const },
            { label: 'High (45-59%)', swatch: 'bg-amber-500', text: 'text-amber-700', key: 'high' as const },
            { label: 'Moderate (30-44%)', swatch: 'bg-sky-500', text: 'text-sky-700', key: 'moderate' as const },
            { label: 'Mastered (<30%)', swatch: 'bg-emerald-500', text: 'text-emerald-700', key: 'low' as const },
          ],
        };
    }
  }, [style]);

  // Filtered and sorted topics
  const filteredTopics = useMemo(() => {
    let list = MOCK_HEATMAP_TOPICS.filter((topic) => {
      const matchSubject = subjectFilter === 'All' || topic.subject === subjectFilter;
      const matchSeverity = severityFilter === 'all' || topic.severity === severityFilter;
      const matchSearch =
        topic.topicName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        topic.rootMisconception.toLowerCase().includes(searchQuery.toLowerCase());
      return matchSubject && matchSeverity && matchSearch;
    });

    return list.sort((a, b) => {
      if (sortBy === 'highest_weakness') {
        return b.overallWeaknessScore - a.overallWeaknessScore;
      }
      if (sortBy === 'stuck_students') {
        return b.totalStuckStudents - a.totalStuckStudents;
      }
      return a.topicName.localeCompare(b.topicName);
    });
  }, [subjectFilter, severityFilter, searchQuery, sortBy]);

  // Aggregate Metrics
  const criticalCount = useMemo(
    () => MOCK_HEATMAP_TOPICS.filter((t) => t.severity === 'critical').length,
    []
  );
  const highCount = useMemo(
    () => MOCK_HEATMAP_TOPICS.filter((t) => t.severity === 'high').length,
    []
  );
  const avgWeakness = useMemo(() => {
    if (MOCK_HEATMAP_TOPICS.length === 0) return 0;
    const total = MOCK_HEATMAP_TOPICS.reduce((acc, t) => acc + t.overallWeaknessScore, 0);
    return Math.round(total / MOCK_HEATMAP_TOPICS.length);
  }, []);

  // Bottleneck topic (#1 highest failure)
  const highestBottleneckTopic = useMemo(() => {
    return [...MOCK_HEATMAP_TOPICS].sort(
      (a, b) => b.overallWeaknessScore - a.overallWeaknessScore
    )[0];
  }, []);

  const handleAssignRemedial = (topicId: string) => {
    setRemedialAssignedTopics((prev) => ({ ...prev, [topicId]: true }));
    setTimeout(() => {
      setSelectedCellInfo(null);
    }, 1200);
  };

  return (
    <section
      id="class-topic-weakness-heatmap"
      aria-label="Class-Wide Topic Weakness Heatmap"
      className={`rounded-2xl p-5 sm:p-6 border transition-all duration-200 ${themeGrading.containerBg}`}
    >
      {/* 1. Header & Quick Analytics Ribbon */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-5 pb-5 border-b border-inherit">
        <div>
          <div className="flex items-center gap-2.5 mb-1.5 flex-wrap">
            <span className={`p-2 rounded-xl border ${themeGrading.cardHeaderBg} ${themeGrading.accentText}`}>
              <Grid className="w-4 h-4 stroke-[2.4]" />
            </span>
            <h2 className="text-lg sm:text-xl font-black tracking-tight">
              Class-Wide Topic Weakness Heatmap
            </h2>
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${themeGrading.cardHeaderBg}`}>
              {selectedClass} • Diagnostic Matrix
            </span>
            <span className="text-[11px] font-mono font-medium opacity-70 px-2 py-0.5 rounded bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10">
              {themeGrading.paletteLabel}
            </span>
          </div>
          <p className="text-xs sm:text-sm opacity-80 max-w-2xl leading-relaxed">
            Multi-tiered diagnostic matrix calibrating student failure rates across four cognitive layers: conceptual theory, procedural mechanics, word problems, and synthesis transfer.
          </p>
        </div>

        {/* Aggregate Severity Pill Badges */}
        <div className="flex items-center gap-2.5 shrink-0 flex-wrap">
          <div className={`px-3 py-2 rounded-xl border text-center ${themeGrading.cardHeaderBg}`}>
            <div className="text-[10px] font-bold uppercase tracking-wider text-rose-500 dark:text-rose-400">
              Critical Roadblocks
            </div>
            <div className="text-base sm:text-lg font-black leading-tight text-rose-600 dark:text-rose-300">
              {criticalCount} Topics
            </div>
          </div>
          <div className={`px-3 py-2 rounded-xl border text-center ${themeGrading.cardHeaderBg}`}>
            <div className="text-[10px] font-bold uppercase tracking-wider text-amber-500 dark:text-amber-400">
              High Weakness
            </div>
            <div className="text-base sm:text-lg font-black leading-tight text-amber-600 dark:text-amber-300">
              {highCount} Topics
            </div>
          </div>
          <div className={`px-3 py-2 rounded-xl border text-center ${themeGrading.cardHeaderBg}`}>
            <div className="text-[10px] font-bold uppercase tracking-wider opacity-70">
              Avg Cohort Weakness
            </div>
            <div className="text-base sm:text-lg font-black leading-tight">
              {avgWeakness}%
            </div>
          </div>
        </div>
      </div>

      {/* 2. Priority Bottleneck Alert Banner */}
      {highestBottleneckTopic && (
        <div
          className={`mt-4 p-4 rounded-xl border flex flex-col md:flex-row md:items-center justify-between gap-3 transition-colors ${
            isDark
              ? 'bg-rose-950/25 border-rose-900/40 text-rose-200'
              : style === 'editorial-command'
              ? 'bg-[#C85340]/8 border-[#C85340]/25 text-[#28231D]'
              : style === 'academic-warm'
              ? 'bg-[#9A3412]/8 border-[#9A3412]/25 text-[#28231D]'
              : 'bg-rose-50/70 border-rose-200 text-rose-900'
          }`}
        >
          <div className="flex items-center gap-3">
            <span className="p-2 rounded-lg bg-rose-500/15 text-rose-600 dark:text-rose-400 shrink-0">
              <AlertOctagon className="w-4 h-4 stroke-[2.4]" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase tracking-wider font-extrabold px-1.5 py-0.5 rounded bg-rose-600 text-white leading-none">
                  Top Roadblock
                </span>
                <span className="font-extrabold text-xs sm:text-sm">
                  {highestBottleneckTopic.topicName}
                </span>
              </div>
              <p className="text-xs opacity-80 mt-0.5 max-w-2xl line-clamp-1">
                {highestBottleneckTopic.rootMisconception}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <div className="text-right hidden sm:block">
              <span className="text-xs font-black text-rose-600 dark:text-rose-400">
                {highestBottleneckTopic.overallWeaknessScore}% Failure Rate
              </span>
              <div className="text-[10px] opacity-70">
                {highestBottleneckTopic.totalStuckStudents} students struggling
              </div>
            </div>
            <button
              onClick={() => setSelectedCellInfo({ topic: highestBottleneckTopic })}
              className="px-3 py-1.5 rounded-lg text-xs font-bold border border-inherit hover:bg-black/5 dark:hover:bg-white/5 transition flex items-center gap-1.5 cursor-pointer"
            >
              <span>Inspect Misconceptions</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* 3. Controls, Filters & Theme Legend */}
      <div className="py-4 flex flex-col lg:flex-row lg:items-center justify-between gap-3 text-xs border-b border-inherit">
        {/* Search and Filters */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Search */}
          <div className="relative min-w-[210px]">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 opacity-40" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search topic or misconception..."
              className="w-full pl-8 pr-3 py-1.5 rounded-xl border border-inherit bg-black/5 dark:bg-white/5 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-xs"
            />
          </div>

          {/* Subject Filter */}
          <div className="flex items-center rounded-xl p-0.5 border border-inherit bg-black/5 dark:bg-white/5">
            {['All', 'Mathematics', 'Science'].map((subj) => (
              <button
                key={subj}
                onClick={() => setSubjectFilter(subj)}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  subjectFilter === subj
                    ? themeGrading.filterActive
                    : themeGrading.filterInactive
                }`}
              >
                {subj}
              </button>
            ))}
          </div>

          {/* Severity Filter (all / critical / high / moderate) */}
          <div className="flex items-center rounded-xl p-0.5 border border-inherit bg-black/5 dark:bg-white/5">
            {(
              [
                { id: 'all', label: 'All' },
                { id: 'critical', label: 'Critical' },
                { id: 'high', label: 'High' },
                { id: 'moderate', label: 'Moderate' },
              ] as const
            ).map((sev) => (
              <button
                key={sev.id}
                onClick={() => setSeverityFilter(sev.id)}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  severityFilter === sev.id
                    ? themeGrading.filterActive
                    : themeGrading.filterInactive
                }`}
              >
                {sev.label}
              </button>
            ))}
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-1 pl-1">
            <SlidersHorizontal className="w-3.5 h-3.5 opacity-50" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="py-1 px-2 rounded-lg border border-inherit bg-black/5 dark:bg-white/5 text-xs font-bold cursor-pointer focus:outline-none"
            >
              <option value="highest_weakness">Sort: Highest Failure Rate</option>
              <option value="stuck_students">Sort: Most Students Stuck</option>
              <option value="topic_name">Sort: Topic Alphabetical</option>
            </select>
          </div>
        </div>

        {/* View Mode Switcher + Interactive Theme Legend */}
        <div className="flex items-center gap-4 flex-wrap justify-between lg:justify-end">
          {/* Interactive Legend with click-to-filter */}
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap text-[11px] font-semibold">
            <span className="font-bold opacity-70">Scale:</span>
            {themeGrading.legend.map((item) => (
              <button
                key={item.key}
                onClick={() => setSeverityFilter(severityFilter === item.key ? 'all' : item.key)}
                className={`flex items-center gap-1.5 px-1.5 py-0.5 rounded cursor-pointer transition ${
                  severityFilter === item.key ? 'ring-1 ring-offset-1 ring-indigo-500 font-black' : 'opacity-85 hover:opacity-100'
                }`}
                title={`Click to filter by ${item.label}`}
              >
                <span className={`w-3 h-3 rounded-xs ${item.swatch} shrink-0`} />
                <span className={item.text}>{item.label}</span>
              </button>
            ))}
          </div>

          {/* Matrix vs Spectrum View Switcher */}
          <div className="flex items-center rounded-xl p-0.5 border border-inherit bg-black/5 dark:bg-white/5 shrink-0">
            <button
              onClick={() => setViewMode('matrix')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                viewMode === 'matrix' ? themeGrading.filterActive : themeGrading.filterInactive
              }`}
            >
              <Grid className="w-3.5 h-3.5" />
              <span>Matrix</span>
            </button>
            <button
              onClick={() => setViewMode('spectrum')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                viewMode === 'spectrum' ? themeGrading.filterActive : themeGrading.filterInactive
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Spectrum</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4. MAIN CONTENT AREA */}
      {viewMode === 'matrix' ? (
        /* MATRIX TABLE VIEW */
        <div className="mt-4 overflow-x-auto rounded-xl border border-inherit shadow-2xs">
          <table className="w-full text-left border-collapse min-w-[820px]">
            <thead>
              <tr className={`${themeGrading.tableThBg} text-[11px] font-extrabold uppercase tracking-wider border-b border-inherit`}>
                <th className="py-3.5 px-4 w-[260px]">Curriculum Topic</th>
                <th className="py-3.5 px-3 text-center w-[110px]">
                  <span>Total Failure</span>
                </th>
                <th className="py-3.5 px-3 text-center w-[140px]">
                  <div className="flex items-center justify-center gap-1">
                    <Brain className="w-3.5 h-3.5 opacity-70" />
                    <span>Conceptual</span>
                  </div>
                  <div className="text-[9px] font-normal normal-case opacity-60">Definitions & Meaning</div>
                </th>
                <th className="py-3.5 px-3 text-center w-[140px]">
                  <div className="flex items-center justify-center gap-1">
                    <Calculator className="w-3.5 h-3.5 opacity-70" />
                    <span>Procedural</span>
                  </div>
                  <div className="text-[9px] font-normal normal-case opacity-60">Calculation & Steps</div>
                </th>
                <th className="py-3.5 px-3 text-center w-[140px]">
                  <div className="flex items-center justify-center gap-1">
                    <FileText className="w-3.5 h-3.5 opacity-70" />
                    <span>Word Problems</span>
                  </div>
                  <div className="text-[9px] font-normal normal-case opacity-60">Applied Formulation</div>
                </th>
                <th className="py-3.5 px-3 text-center w-[140px]">
                  <div className="flex items-center justify-center gap-1">
                    <Layers className="w-3.5 h-3.5 opacity-70" />
                    <span>Synthesis</span>
                  </div>
                  <div className="text-[9px] font-normal normal-case opacity-60">Multi-Step Transfer</div>
                </th>
                <th className="py-3.5 px-4 text-right w-[110px]">Impact</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${themeGrading.tableDivide} text-xs`}>
              {filteredTopics.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center opacity-60 font-semibold">
                    No topics found matching your active search and severity filters.
                  </td>
                </tr>
              ) : (
                filteredTopics.map((topic) => {
                  const overallStyle = themeGrading.getCellStyle(topic.overallWeaknessScore);

                  return (
                    <tr key={topic.id} className={`${themeGrading.rowHover} transition-colors group`}>
                      {/* Topic Name & Misconception */}
                      <td className="py-3.5 px-4">
                        <div className="font-extrabold text-sm leading-tight flex items-center gap-2">
                          <span>{topic.topicName}</span>
                        </div>
                        <div className="flex items-center gap-2 mt-1 text-[11px] opacity-75">
                          <span className={`font-bold ${themeGrading.accentText}`}>
                            {topic.subject}
                          </span>
                          <span>•</span>
                          <span className="truncate max-w-[210px]" title={topic.rootMisconception}>
                            {topic.rootMisconception}
                          </span>
                        </div>
                      </td>

                      {/* Overall Weakness Indicator Cell */}
                      <td className="py-3 px-2 text-center">
                        <button
                          onClick={() => setSelectedCellInfo({ topic })}
                          className={`w-full py-2 px-1.5 rounded-xl font-black text-xs border transition-all cursor-pointer flex flex-col items-center justify-center gap-1 ${overallStyle.bg} ${overallStyle.text} ${overallStyle.border}`}
                          title="Click to view full topic diagnostic"
                        >
                          <span className="leading-none text-xs">{topic.overallWeaknessScore}%</span>
                          {/* Micro Heat Bar */}
                          <div className="w-full bg-black/10 dark:bg-white/10 h-1 rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full transition-all duration-300"
                              style={{ width: `${topic.overallWeaknessScore}%`, backgroundColor: overallStyle.barFill }}
                            />
                          </div>
                          <span className="text-[9px] opacity-75 font-medium leading-none">
                            {overallStyle.level}
                          </span>
                        </button>
                      </td>

                      {/* 4 Cognitive Sub-Dimension Heat Cells */}
                      {topic.subDimensions.map((dim) => {
                        const dimStyle = themeGrading.getCellStyle(dim.weaknessScore);

                        return (
                          <td key={dim.dimensionId} className="py-3 px-2 text-center">
                            <button
                              onClick={() => setSelectedCellInfo({ topic, cell: dim })}
                              className={`w-full py-2 px-1.5 rounded-xl font-extrabold text-xs border transition-transform hover:scale-[1.02] cursor-pointer flex flex-col items-center justify-center gap-1 ${dimStyle.bg} ${dimStyle.text} ${dimStyle.border}`}
                              title={`${dim.dimensionLabel}: ${dim.weaknessScore}% failure rate. Click to inspect misconception.`}
                            >
                              <div className="flex items-center justify-between w-full px-1">
                                <span className="text-xs font-black leading-none">{dim.weaknessScore}%</span>
                                <span className="text-[9px] opacity-75 font-semibold leading-none">
                                  {dim.studentsCount} st.
                                </span>
                              </div>
                              {/* Micro Heat Bar */}
                              <div className="w-full bg-black/10 dark:bg-white/10 h-1 rounded-full overflow-hidden">
                                <div
                                  className="h-full rounded-full transition-all duration-300"
                                  style={{ width: `${dim.weaknessScore}%`, backgroundColor: dimStyle.barFill }}
                                />
                              </div>
                            </button>
                          </td>
                        );
                      })}

                      {/* Stuck Cohort & Drilldown trigger */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <div className="text-right">
                            <div className="font-extrabold text-xs text-rose-600 dark:text-rose-400">
                              {topic.totalStuckStudents} / {topic.totalTested}
                            </div>
                            <div className="text-[10px] opacity-60">stuck</div>
                          </div>
                          <button
                            onClick={() => setSelectedCellInfo({ topic })}
                            className="p-1.5 rounded-lg border border-inherit hover:bg-black/5 dark:hover:bg-white/5 transition cursor-pointer"
                            title="Inspect topic drilldown"
                          >
                            <ChevronRight className="w-3.5 h-3.5 opacity-60" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      ) : (
        /* SPECTRUM CARD / GRID VIEW */
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredTopics.map((topic) => {
            const overallStyle = themeGrading.getCellStyle(topic.overallWeaknessScore);

            return (
              <div
                key={topic.id}
                onClick={() => setSelectedCellInfo({ topic })}
                className={`p-4 rounded-xl border transition-all hover:shadow-md cursor-pointer flex flex-col justify-between gap-3 ${themeGrading.cardHeaderBg} border-inherit`}
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className={`text-[10px] font-bold uppercase tracking-wider ${themeGrading.accentText}`}>
                        {topic.subject} • {topic.classGrade}
                      </span>
                      <h3 className="font-black text-sm text-slate-900 dark:text-slate-100 mt-0.5 leading-snug">
                        {topic.topicName}
                      </h3>
                    </div>
                    <span
                      className={`px-2 py-0.5 rounded-lg text-xs font-black shrink-0 ${overallStyle.badgeBg} ${overallStyle.badgeText}`}
                    >
                      {topic.overallWeaknessScore}%
                    </span>
                  </div>

                  <p className="text-xs opacity-70 mt-2 line-clamp-2 leading-relaxed">
                    {topic.rootMisconception}
                  </p>
                </div>

                {/* Sub-Dimension Heat Strip */}
                <div className="space-y-2 pt-2 border-t border-inherit">
                  <div className="grid grid-cols-4 gap-1.5">
                    {topic.subDimensions.map((dim) => {
                      const dimStyle = themeGrading.getCellStyle(dim.weaknessScore);
                      return (
                        <div
                          key={dim.dimensionId}
                          className={`p-1.5 rounded-lg border text-center ${dimStyle.bg} ${dimStyle.text} ${dimStyle.border}`}
                          title={`${dim.dimensionLabel}: ${dim.weaknessScore}%`}
                        >
                          <div className="text-[9px] opacity-75 font-semibold truncate">
                            {dim.dimensionId === 'definition'
                              ? 'Concept'
                              : dim.dimensionId === 'procedure'
                              ? 'Proced.'
                              : dim.dimensionId === 'word_problem'
                              ? 'Word'
                              : 'Synth'}
                          </div>
                          <div className="text-xs font-black mt-0.5">{dim.weaknessScore}%</div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="flex items-center justify-between text-[11px] opacity-75 pt-1">
                    <span>Struggling: <strong className="text-rose-600 dark:text-rose-400">{topic.totalStuckStudents}</strong> of {topic.totalTested}</span>
                    <span className="text-indigo-600 dark:text-indigo-400 font-bold inline-flex items-center gap-1">
                      Drilldown <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 5. Cell Inspection & Diagnostic Popover Modal */}
      {selectedCellInfo && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div
            className={`w-full max-w-xl rounded-2xl p-6 border shadow-2xl transition-all ${
              isDark
                ? 'bg-[#14141C] border-[#2A2A38] text-slate-100'
                : style === 'editorial-command'
                ? 'bg-[#FAF7F0] border-[#DDD4C7] text-[#1C232B]'
                : style === 'academic-warm'
                ? 'bg-[#FFFDFB] border-[#E6DFD3] text-[#28231D]'
                : 'bg-white border-slate-200 text-slate-900'
            }`}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-inherit">
              <div>
                <div className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold border mb-2 ${themeGrading.cardHeaderBg} ${themeGrading.accentText}`}>
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>
                    {selectedCellInfo.cell
                      ? `${selectedCellInfo.cell.dimensionLabel} Drilldown`
                      : 'Curriculum Diagnostic Overview'}
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-black leading-tight">
                  {selectedCellInfo.topic.topicName}
                </h3>
                <p className="text-xs opacity-70 mt-1">
                  Subject: {selectedCellInfo.topic.subject} • Class: {selectedClass}
                </p>
              </div>
              <button
                onClick={() => setSelectedCellInfo(null)}
                className="p-1.5 rounded-xl opacity-60 hover:opacity-100 hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="py-4 space-y-4 text-xs">
              {/* Weakness Score Banner */}
              {(() => {
                const score = selectedCellInfo.cell
                  ? selectedCellInfo.cell.weaknessScore
                  : selectedCellInfo.topic.overallWeaknessScore;
                const scoreStyle = themeGrading.getCellStyle(score);

                return (
                  <div
                    className={`p-3.5 rounded-xl border flex items-center justify-between ${scoreStyle.bg} ${scoreStyle.text} ${scoreStyle.border}`}
                  >
                    <div>
                      <div className="text-[11px] font-bold uppercase tracking-wider opacity-85">
                        {selectedCellInfo.cell
                          ? selectedCellInfo.cell.dimensionLabel
                          : 'Overall Cohort Failure Rate'}
                      </div>
                      <div className="text-2xl font-black mt-0.5">
                        {score}% Error Rate
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-black text-sm">
                        {selectedCellInfo.cell
                          ? selectedCellInfo.cell.studentsCount
                          : selectedCellInfo.topic.totalStuckStudents}{' '}
                        Students Stuck
                      </div>
                      <div className="text-[10px] opacity-80 mt-0.5">
                        Severity Level: {scoreStyle.level}
                      </div>
                    </div>
                  </div>
                );
              })()}

              {/* Identified Misconception */}
              <div className="p-3.5 rounded-xl border border-inherit bg-black/5 dark:bg-white/5">
                <div className="font-bold flex items-center gap-1.5 mb-1 text-xs">
                  <AlertOctagon className="w-3.5 h-3.5 text-rose-500" />
                  <span>Diagnosed Cognitive Roadblock:</span>
                </div>
                <p className="opacity-80 leading-relaxed text-xs">
                  {selectedCellInfo.cell
                    ? selectedCellInfo.cell.keyMisconception
                    : selectedCellInfo.topic.rootMisconception}
                </p>
              </div>

              {/* Pedagogic Recommendation */}
              <div className={`p-3.5 rounded-xl border ${themeGrading.cardHeaderBg} border-inherit`}>
                <div className={`font-bold flex items-center gap-1.5 mb-1 text-xs ${themeGrading.accentText}`}>
                  <Zap className="w-3.5 h-3.5" />
                  <span>Recommended Teacher Intervention:</span>
                </div>
                <p className="opacity-85 leading-relaxed text-xs">
                  {selectedCellInfo.topic.recommendedIntervention}
                </p>
              </div>

              {/* Struggling Students Chips */}
              <div>
                <div className="font-bold mb-2 flex items-center justify-between">
                  <span>Struggling Student Cohort ({selectedCellInfo.topic.stuckStudentNames.length}):</span>
                  {onNavigateToMatrix && (
                    <button
                      onClick={() => {
                        setSelectedCellInfo(null);
                        onNavigateToMatrix();
                      }}
                      className={`text-[11px] ${themeGrading.accentText} hover:underline font-semibold cursor-pointer`}
                    >
                      View in Mastery Matrix &rarr;
                    </button>
                  )}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {selectedCellInfo.topic.stuckStudentNames.map((name) => (
                    <span
                      key={name}
                      className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-black/5 dark:bg-white/5 border border-inherit"
                    >
                      {name}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="pt-4 border-t border-inherit flex items-center justify-end gap-2">
              <button
                onClick={() => setSelectedCellInfo(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold border border-inherit hover:bg-black/5 dark:hover:bg-white/5 transition cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={() => handleAssignRemedial(selectedCellInfo.topic.id)}
                disabled={remedialAssignedTopics[selectedCellInfo.topic.id]}
                className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition shadow-xs cursor-pointer ${
                  remedialAssignedTopics[selectedCellInfo.topic.id]
                    ? 'bg-emerald-600 text-white'
                    : isDark
                    ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                    : style === 'editorial-command'
                    ? 'bg-[#246257] hover:bg-[#1C4E45] text-white'
                    : style === 'academic-warm'
                    ? 'bg-[#8C4A2F] hover:bg-[#783E26] text-white'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                {remedialAssignedTopics[selectedCellInfo.topic.id] ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Remedial Drill Dispatched!</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Dispatch 5-min Remedial Drill</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
