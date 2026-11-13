import React, { useState, useMemo } from 'react';
import {
  HelpCircle,
  Search,
  MessageSquare,
  Users,
  CheckCircle2,
  Calendar,
  Sparkles,
  Send,
  AlertCircle,
  ThumbsUp,
  Volume2,
  Check,
  Plus,
  ArrowUpDown,
  ListPlus,
  AudioWaveform as Waveform,
  Lightbulb,
  Radio,
  BookMarked,
} from 'lucide-react';
import { useDashboardTheme } from '../../context/ThemeContext';
import {
  MOCK_FREQUENT_DOUBTS,
  FrequentlyAskedDoubt,
} from '../../data/teacherDashboardData';
import { Subject } from '../../types';

interface FrequentlyAskedDoubtsListProps {
  selectedClass: string;
}

export const FrequentlyAskedDoubtsList: React.FC<FrequentlyAskedDoubtsListProps> = ({
  selectedClass,
}) => {
  const { style } = useDashboardTheme();
  const isDark = style === 'obsidian-dark' || style === 'command-dark';

  const [doubts, setDoubts] = useState<FrequentlyAskedDoubt[]>(MOCK_FREQUENT_DOUBTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [subjectFilter, setSubjectFilter] = useState<string>('All');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'agenda_added' | 'explained'>('all');
  const [sortBy, setSortBy] = useState<'most_frequent' | 'newest' | 'topic'>('most_frequent');
  const [broadcastActive, setBroadcastActive] = useState<Record<string, boolean>>({});
  const [batchAgendaSuccess, setBatchAgendaSuccess] = useState(false);

  // Theme-aware color grading and styling engine
  const themeGrading = useMemo(() => {
    switch (style) {
      case 'editorial-command':
        return {
          themeName: 'Editorial Command',
          paletteLabel: 'Sandstone, Spruce & Terracotta Grading',
          containerBg: 'bg-[#FAF7F0] border-[#DDD4C7] text-[#1C232B]',
          cardBg: 'bg-white/90 border-[#DDD4C7] hover:border-[#246257] shadow-xs',
          cardHeaderBg: 'bg-[#F4EFEA] border-[#DDD4C7]',
          subPanelBg: 'bg-[#F7F3EC] border-[#DDD4C7]',
          accentText: 'text-[#246257]',
          badgePill: 'bg-[#246257] text-white',
          filterActive: 'bg-[#246257] text-white shadow-xs',
          filterInactive: 'text-[#5C6670] hover:text-[#1C232B]',
          primaryBtn: 'bg-[#246257] hover:bg-[#1C4E45] text-white shadow-xs',
          secondaryBtn: 'border-[#DDD4C7] bg-[#F4EFEA] text-[#1C232B] hover:bg-[#EDE5D8]',
          inputBg: 'bg-white border-[#DDD4C7] text-[#1C232B] placeholder-[#8A8276]',
          misconceptionBox: 'bg-[#D97706]/10 border-[#D97706]/30 text-[#28231D]',
          analogyBox: 'bg-[#246257]/8 border-[#246257]/25 text-[#1C232B]',
          getFrequencyStyle: (pct: number) => {
            if (pct >= 40) {
              return {
                bg: 'bg-[#C85340]/15 text-[#9E3625] border-[#C85340]/35',
                dot: 'bg-[#C85340]',
                bar: '#C85340',
                label: 'High Frequency',
              };
            }
            if (pct >= 25) {
              return {
                bg: 'bg-[#D97706]/15 text-[#B45309] border-[#D97706]/35',
                dot: 'bg-[#D97706]',
                bar: '#D97706',
                label: 'Moderate',
              };
            }
            return {
              bg: 'bg-[#246257]/12 text-[#246257] border-[#246257]/30',
              dot: 'bg-[#246257]',
              bar: '#246257',
              label: 'Standard',
            };
          },
          getStatusBadge: (status: 'pending' | 'agenda_added' | 'explained') => {
            if (status === 'explained') {
              return 'bg-[#246257]/15 text-[#246257] border-[#246257]/35';
            }
            if (status === 'agenda_added') {
              return 'bg-[#246257] text-white border-[#246257] shadow-2xs';
            }
            return 'bg-[#DDD4C7]/40 text-[#5C6670] border-[#DDD4C7]';
          },
        };

      case 'obsidian-dark':
      case 'command-dark':
        return {
          themeName: 'Obsidian Dark',
          paletteLabel: 'Obsidian Matte & Radiant Ruby-Emerald Grading',
          containerBg: 'bg-[#121218] border-[#262633] text-slate-100 shadow-xl',
          cardBg: 'bg-[#161622] border-[#262633] hover:border-indigo-500/50 shadow-md',
          cardHeaderBg: 'bg-[#0E0E14] border-[#23232C]',
          subPanelBg: 'bg-[#0F0F16] border-[#20202C]',
          accentText: 'text-indigo-400',
          badgePill: 'bg-indigo-600 text-white',
          filterActive: 'bg-indigo-600 text-white shadow-xs',
          filterInactive: 'text-slate-400 hover:text-slate-200',
          primaryBtn: 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-xs',
          secondaryBtn: 'border-[#262633] bg-[#1A1A26] text-slate-200 hover:bg-[#202030]',
          inputBg: 'bg-[#0E0E14] border-[#2A2A38] text-slate-100 placeholder-slate-500',
          misconceptionBox: 'bg-amber-950/40 border-amber-800/50 text-amber-200',
          analogyBox: 'bg-indigo-950/40 border-indigo-800/50 text-slate-200',
          getFrequencyStyle: (pct: number) => {
            if (pct >= 40) {
              return {
                bg: 'bg-rose-950/70 text-rose-300 border-rose-700/50',
                dot: 'bg-rose-500 shadow-rose-500/50 shadow-xs',
                bar: '#F43F5E',
                label: 'High Frequency',
              };
            }
            if (pct >= 25) {
              return {
                bg: 'bg-amber-950/70 text-amber-300 border-amber-700/50',
                dot: 'bg-amber-500',
                bar: '#F59E0B',
                label: 'Moderate',
              };
            }
            return {
              bg: 'bg-indigo-950/70 text-indigo-300 border-indigo-700/50',
              dot: 'bg-indigo-500',
              bar: '#6366F1',
              label: 'Standard',
            };
          },
          getStatusBadge: (status: 'pending' | 'agenda_added' | 'explained') => {
            if (status === 'explained') {
              return 'bg-emerald-950/80 text-emerald-300 border-emerald-700/60';
            }
            if (status === 'agenda_added') {
              return 'bg-indigo-600 text-white border-indigo-500 shadow-indigo-600/30 shadow-xs';
            }
            return 'bg-slate-800/60 text-slate-300 border-slate-700';
          },
        };

      case 'academic-warm':
        return {
          themeName: 'Academic Warm',
          paletteLabel: 'Parchment, Terracotta & Sage Grading',
          containerBg: 'bg-[#FFFDFB] border-[#E6DFD3] text-[#28231D]',
          cardBg: 'bg-[#FAF7F2] border-[#E6DFD3] hover:border-[#9A3412] shadow-xs',
          cardHeaderBg: 'bg-[#F5EFE6] border-[#E6DFD3]',
          subPanelBg: 'bg-[#F9F5EE] border-[#E6DFD3]',
          accentText: 'text-[#9A3412]',
          badgePill: 'bg-[#8C4A2F] text-white',
          filterActive: 'bg-[#8C4A2F] text-white shadow-xs',
          filterInactive: 'text-[#5C5346] hover:text-[#28231D]',
          primaryBtn: 'bg-[#8C4A2F] hover:bg-[#783E26] text-white shadow-xs',
          secondaryBtn: 'border-[#E6DFD3] bg-[#FAF7F2] text-[#28231D] hover:bg-[#EFE8DC]',
          inputBg: 'bg-white border-[#E6DFD3] text-[#28231D] placeholder-[#8A7F70]',
          misconceptionBox: 'bg-[#B45309]/10 border-[#B45309]/25 text-[#28231D]',
          analogyBox: 'bg-[#15803D]/8 border-[#15803D]/25 text-[#28231D]',
          getFrequencyStyle: (pct: number) => {
            if (pct >= 40) {
              return {
                bg: 'bg-[#9A3412]/15 text-[#9A3412] border-[#9A3412]/30',
                dot: 'bg-[#9A3412]',
                bar: '#9A3412',
                label: 'High Frequency',
              };
            }
            if (pct >= 25) {
              return {
                bg: 'bg-[#B45309]/15 text-[#B45309] border-[#B45309]/30',
                dot: 'bg-[#B45309]',
                bar: '#B45309',
                label: 'Moderate',
              };
            }
            return {
              bg: 'bg-[#15803D]/15 text-[#15803D] border-[#15803D]/30',
              dot: 'bg-[#15803D]',
              bar: '#15803D',
              label: 'Standard',
            };
          },
          getStatusBadge: (status: 'pending' | 'agenda_added' | 'explained') => {
            if (status === 'explained') {
              return 'bg-[#15803D]/15 text-[#15803D] border-[#15803D]/35';
            }
            if (status === 'agenda_added') {
              return 'bg-[#8C4A2F] text-white border-[#8C4A2F] shadow-xs';
            }
            return 'bg-[#E6DFD3]/60 text-[#5C5346] border-[#E6DFD3]';
          },
        };

      case 'clean':
      default:
        return {
          themeName: 'Modern Pedagogic',
          paletteLabel: 'Daylight Blue, Rose & Emerald Grading',
          containerBg: 'bg-white border-slate-200 text-slate-900 shadow-xs',
          cardBg: 'bg-white border-slate-200 hover:border-blue-400 shadow-xs',
          cardHeaderBg: 'bg-slate-50 border-slate-200',
          subPanelBg: 'bg-slate-50 border-slate-200/80',
          accentText: 'text-blue-600',
          badgePill: 'bg-blue-600 text-white',
          filterActive: 'bg-blue-600 text-white shadow-xs',
          filterInactive: 'text-slate-600 hover:text-slate-900',
          primaryBtn: 'bg-blue-600 hover:bg-blue-700 text-white shadow-xs',
          secondaryBtn: 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100',
          inputBg: 'bg-white border-slate-200 text-slate-900 placeholder-slate-400',
          misconceptionBox: 'bg-amber-50 border-amber-200 text-amber-900',
          analogyBox: 'bg-sky-50 border-sky-200 text-slate-800',
          getFrequencyStyle: (pct: number) => {
            if (pct >= 40) {
              return {
                bg: 'bg-rose-100 text-rose-800 border-rose-200',
                dot: 'bg-rose-500',
                bar: '#E11D48',
                label: 'High Frequency',
              };
            }
            if (pct >= 25) {
              return {
                bg: 'bg-amber-100 text-amber-800 border-amber-200',
                dot: 'bg-amber-500',
                bar: '#F59E0B',
                label: 'Moderate',
              };
            }
            return {
              bg: 'bg-blue-100 text-blue-800 border-blue-200',
              dot: 'bg-blue-500',
              bar: '#2563EB',
              label: 'Standard',
            };
          },
          getStatusBadge: (status: 'pending' | 'agenda_added' | 'explained') => {
            if (status === 'explained') {
              return 'bg-emerald-100 text-emerald-800 border-emerald-200';
            }
            if (status === 'agenda_added') {
              return 'bg-blue-600 text-white border-blue-600 shadow-xs';
            }
            return 'bg-slate-100 text-slate-600 border-slate-200';
          },
        };
    }
  }, [style]);

  // Aggregate Metrics
  const doubtStats = useMemo(() => {
    const total = doubts.length;
    const inAgenda = doubts.filter((d) => d.status === 'agenda_added').length;
    const unresolved = doubts.filter((d) => d.status === 'pending').length;
    const highFrequency = doubts.filter((d) => d.frequencyPercentage >= 40).length;
    const totalInquiries = doubts.reduce((acc, d) => acc + d.frequencyCount, 0);
    return { total, inAgenda, unresolved, highFrequency, totalInquiries };
  }, [doubts]);

  const filteredDoubts = useMemo(() => {
    let list = doubts.filter((d) => {
      const matchSubject = subjectFilter === 'All' || d.subject === subjectFilter;
      const matchStatus = statusFilter === 'all' || d.status === statusFilter;
      const matchSearch =
        d.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.topicName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.underlyingMisconception.toLowerCase().includes(searchQuery.toLowerCase());
      return matchSubject && matchStatus && matchSearch;
    });

    return list.sort((a, b) => {
      if (sortBy === 'most_frequent') {
        return b.frequencyPercentage - a.frequencyPercentage;
      }
      if (sortBy === 'topic') {
        return a.topicName.localeCompare(b.topicName);
      }
      return b.id.localeCompare(a.id);
    });
  }, [doubts, subjectFilter, statusFilter, searchQuery, sortBy]);

  const toggleAgenda = (doubtId: string) => {
    setDoubts((prev) =>
      prev.map((d) => {
        if (d.id === doubtId) {
          const nextStatus = d.status === 'agenda_added' ? 'pending' : 'agenda_added';
          return { ...d, status: nextStatus };
        }
        return d;
      })
    );
  };

  const markResolved = (doubtId: string) => {
    setDoubts((prev) =>
      prev.map((d) => {
        if (d.id === doubtId) {
          return { ...d, status: 'explained' };
        }
        return d;
      })
    );
  };

  const handleBroadcast = (doubtId: string) => {
    setBroadcastActive((prev) => ({ ...prev, [doubtId]: true }));
    setTimeout(() => {
      setBroadcastActive((prev) => ({ ...prev, [doubtId]: false }));
    }, 4000);
  };

  const handleBatchAddHighFrequency = () => {
    setDoubts((prev) =>
      prev.map((d) => {
        if (d.frequencyPercentage >= 40 && d.status === 'pending') {
          return { ...d, status: 'agenda_added' };
        }
        return d;
      })
    );
    setBatchAgendaSuccess(true);
    setTimeout(() => setBatchAgendaSuccess(false), 3000);
  };

  return (
    <section
      id="frequently-asked-doubts-list"
      aria-label="Most Frequently Asked Doubts List"
      className={`rounded-2xl p-5 sm:p-6 border transition-all duration-200 ${themeGrading.containerBg}`}
    >
      {/* 1. Section Header & Quick Stats Ribbon */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-5 pb-5 border-b border-inherit">
        <div>
          <div className="flex items-center gap-2.5 mb-1.5 flex-wrap">
            <span className={`p-2 rounded-xl border ${themeGrading.cardHeaderBg} ${themeGrading.accentText}`}>
              <HelpCircle className="w-4 h-4 stroke-[2.4]" />
            </span>
            <h2 className="text-lg sm:text-xl font-black tracking-tight">
              Most Frequently Asked Doubts List
            </h2>
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${themeGrading.cardHeaderBg}`}>
              {selectedClass} • AI Practice Clustered
            </span>
            <span className="text-[11px] font-mono font-medium opacity-70 px-2 py-0.5 rounded bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10">
              {themeGrading.paletteLabel}
            </span>
          </div>
          <p className="text-xs sm:text-sm opacity-80 max-w-3xl leading-relaxed">
            Real student questions recurrently asked during independent evening practice and diagnostic drills, clustered into root cognitive misconceptions with instant lesson-planning analogies.
          </p>
        </div>

        {/* Aggregated Doubt Counters & Batch Action */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0 flex-wrap">
          <div className={`px-3 py-2 rounded-xl border text-center ${themeGrading.cardHeaderBg}`}>
            <div className="text-[10px] font-bold uppercase tracking-wider opacity-70">
              Student Inquiries
            </div>
            <div className="text-base sm:text-lg font-black leading-tight">
              {doubtStats.totalInquiries}
            </div>
          </div>

          <div className={`px-3 py-2 rounded-xl border text-center ${themeGrading.cardHeaderBg}`}>
            <div className="text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              High Frequency
            </div>
            <div className="text-base sm:text-lg font-black leading-tight text-amber-600 dark:text-amber-300">
              {doubtStats.highFrequency} Doubts
            </div>
          </div>

          <div className={`px-3 py-2 rounded-xl border text-center ${themeGrading.cardHeaderBg}`}>
            <div className={`text-[10px] font-bold uppercase tracking-wider ${themeGrading.accentText}`}>
              On Lesson Agenda
            </div>
            <div className={`text-base sm:text-lg font-black leading-tight ${themeGrading.accentText}`}>
              {doubtStats.inAgenda} Ready
            </div>
          </div>

          {/* Quick Batch Add Button */}
          <button
            onClick={handleBatchAddHighFrequency}
            disabled={batchAgendaSuccess || doubtStats.highFrequency === 0}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition cursor-pointer shadow-xs ${
              batchAgendaSuccess
                ? 'bg-emerald-600 text-white'
                : themeGrading.primaryBtn
            }`}
            title="Add all unresolved high-frequency doubts into next class agenda"
          >
            {batchAgendaSuccess ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Added to Agenda!</span>
              </>
            ) : (
              <>
                <ListPlus className="w-3.5 h-3.5" />
                <span>Stage Top Doubts</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* 2. Search & Controls Bar */}
      <div className="py-4 flex flex-col lg:flex-row lg:items-center justify-between gap-3 text-xs border-b border-inherit">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 opacity-40" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search questions, topics, or misconceptions..."
            className={`w-full pl-8 pr-3 py-1.5 rounded-xl border focus:outline-none focus:ring-1 focus:ring-indigo-500 text-xs transition ${themeGrading.inputBg}`}
          />
        </div>

        {/* Filters and Sorting */}
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap justify-between lg:justify-end">
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

          {/* Status Filter */}
          <div className="flex items-center rounded-xl p-0.5 border border-inherit bg-black/5 dark:bg-white/5">
            {(
              [
                { id: 'all', label: 'All' },
                { id: 'pending', label: 'Unresolved' },
                { id: 'agenda_added', label: 'On Agenda' },
                { id: 'explained', label: 'Explained' },
              ] as const
            ).map((filter) => (
              <button
                key={filter.id}
                onClick={() => setStatusFilter(filter.id)}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  statusFilter === filter.id
                    ? themeGrading.filterActive
                    : themeGrading.filterInactive
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl border border-inherit bg-black/5 dark:bg-white/5 font-bold">
            <ArrowUpDown className="w-3 h-3 opacity-50" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-transparent opacity-90 focus:outline-none cursor-pointer font-bold"
            >
              <option value="most_frequent">Sort: Most Frequent</option>
              <option value="newest">Sort: Recent Inquiries</option>
              <option value="topic">Sort: Topic Alphabetical</option>
            </select>
          </div>
        </div>
      </div>

      {/* 3. Doubts List */}
      <div className="space-y-4 pt-4">
        {filteredDoubts.length === 0 ? (
          <div className="py-12 text-center opacity-60 font-semibold border rounded-2xl border-dashed border-inherit">
            No doubts found matching your active filters.
          </div>
        ) : (
          filteredDoubts.map((doubt) => {
            const isAgenda = doubt.status === 'agenda_added';
            const isExplained = doubt.status === 'explained';
            const freqStyle = themeGrading.getFrequencyStyle(doubt.frequencyPercentage);
            const statusBadgeStyle = themeGrading.getStatusBadge(doubt.status);

            return (
              <div
                key={doubt.id}
                className={`rounded-2xl p-4 sm:p-5 border transition-all duration-200 ${themeGrading.cardBg}`}
              >
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                  {/* Left Main Content */}
                  <div className="flex-1 space-y-3">
                    {/* Header Badges Ribbon */}
                    <div className="flex items-center gap-2 flex-wrap">
                      {/* Frequency Badge (Theme Graded) */}
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[11px] font-black border flex items-center gap-1.5 ${freqStyle.bg}`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${freqStyle.dot}`} />
                        <Users className="w-3 h-3" />
                        <span>
                          Asked by {doubt.frequencyCount} Students ({doubt.frequencyPercentage}% of Class)
                        </span>
                      </span>

                      {/* Topic Breadcrumb */}
                      <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${themeGrading.cardHeaderBg}`}>
                        {doubt.subject}: {doubt.topicName}
                      </span>

                      <span className="text-[11px] opacity-60">
                        Reported {doubt.dateReported}
                      </span>
                    </div>

                    {/* Student Question Heading */}
                    <div className="flex items-start gap-2">
                      <span className={`text-xl font-serif font-black leading-none shrink-0 opacity-40 ${themeGrading.accentText}`}>
                        &ldquo;
                      </span>
                      <h3 className="font-extrabold text-sm sm:text-base leading-snug">
                        {doubt.question}
                      </h3>
                      <span className={`text-xl font-serif font-black leading-none shrink-0 opacity-40 ${themeGrading.accentText}`}>
                        &rdquo;
                      </span>
                    </div>

                    {/* Diagnosed Root Misconception Box (Theme Calibrated) */}
                    <div className={`p-3 sm:p-3.5 rounded-xl border text-xs leading-relaxed ${themeGrading.misconceptionBox}`}>
                      <div className="font-bold flex items-center gap-1.5 mb-1 text-xs">
                        <AlertCircle className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                        <span>Cognitive Misconception (AI Diagnosis):</span>
                      </div>
                      <p className="opacity-90 pl-5">
                        {doubt.underlyingMisconception}
                      </p>
                    </div>

                    {/* Sample Classroom Analogy / Clarification Box (Theme Calibrated) */}
                    <div className={`p-3 sm:p-3.5 rounded-xl border text-xs leading-relaxed ${themeGrading.analogyBox}`}>
                      <div className={`font-bold flex items-center gap-1.5 mb-1 text-xs ${themeGrading.accentText}`}>
                        <Lightbulb className="w-3.5 h-3.5 shrink-0" />
                        <span>Recommended Chalkboard Analogy for Next Class:</span>
                      </div>
                      <p className="opacity-90 italic pl-5">
                        &ldquo;{doubt.sampleClarification}&rdquo;
                      </p>
                    </div>

                    {/* Student Avatars Strip */}
                    <div className="flex items-center gap-2 pt-1 text-xs opacity-80">
                      <span className="text-[11px] font-bold">Recent Inquiries:</span>
                      <div className="flex items-center -space-x-2">
                        {doubt.studentAvatars.map((s, idx) => (
                          <img
                            key={idx}
                            src={s.avatar}
                            alt={s.name}
                            title={s.name}
                            className="w-6 h-6 rounded-full border-2 border-inherit object-cover shadow-2xs"
                          />
                        ))}
                      </div>
                      <span className="text-[11px] opacity-70">
                        +{Math.max(0, doubt.frequencyCount - doubt.studentAvatars.length)} more students
                      </span>
                    </div>
                  </div>

                  {/* Right Action Column */}
                  <div className="flex lg:flex-col items-center lg:items-end justify-between lg:justify-start gap-2.5 shrink-0 pt-2 lg:pt-0 lg:w-[200px]">
                    {/* Status Pill Badge */}
                    <span
                      className={`px-3 py-1 rounded-xl text-[11px] font-black uppercase tracking-wider border text-center w-full ${statusBadgeStyle}`}
                    >
                      {isExplained
                        ? '✓ Explained in Class'
                        : isAgenda
                        ? '★ On Lesson Agenda'
                        : 'Pending Review'}
                    </span>

                    {/* Toggle Agenda Button */}
                    <button
                      onClick={() => toggleAgenda(doubt.id)}
                      className={`w-full py-2 px-3.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer shadow-xs ${
                        isAgenda
                          ? themeGrading.secondaryBtn
                          : themeGrading.primaryBtn
                      }`}
                      title={isAgenda ? 'Remove from lesson agenda' : 'Add to next lesson agenda'}
                    >
                      {isAgenda ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-500" />
                          <span>On Lesson Agenda</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add to Agenda</span>
                        </>
                      )}
                    </button>

                    {/* Broadcast Audio Note Button */}
                    <button
                      onClick={() => handleBroadcast(doubt.id)}
                      className={`w-full py-1.5 px-3 rounded-xl text-xs font-bold border transition flex items-center justify-center gap-1.5 cursor-pointer ${
                        broadcastActive[doubt.id]
                          ? 'bg-emerald-600 text-white border-emerald-600'
                          : themeGrading.secondaryBtn
                      }`}
                      title="Simulate dispatching an AI-narrated audio recap to students' AI Tutor"
                    >
                      {broadcastActive[doubt.id] ? (
                        <>
                          <Radio className="w-3.5 h-3.5 animate-pulse" />
                          <span>Audio Note Sent!</span>
                        </>
                      ) : (
                        <>
                          <Volume2 className="w-3.5 h-3.5 opacity-70" />
                          <span>Push Audio Recap</span>
                        </>
                      )}
                    </button>

                    {/* Audio Broadcast Simulation Animation banner if triggered */}
                    {broadcastActive[doubt.id] && (
                      <div className="w-full text-[10px] text-center font-bold text-emerald-600 dark:text-emerald-400 animate-fadeIn">
                        Dispatched to {doubt.frequencyCount} student AI Tutors
                      </div>
                    )}

                    {/* Mark as Explained in Class */}
                    {!isExplained && (
                      <button
                        onClick={() => markResolved(doubt.id)}
                        className={`text-[11px] font-bold hover:underline cursor-pointer py-1 ${themeGrading.accentText}`}
                      >
                        Mark Explained &rarr;
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
};
