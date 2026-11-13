import React, { useState, useMemo } from 'react';
import {
  Users,
  Search,
  ArrowUpDown,
  CheckCircle2,
  AlertTriangle,
  Clock,
  BookOpen,
  Sparkles,
  Send,
  MessageSquare,
  ChevronRight,
  TrendingUp,
  SlidersHorizontal,
  Award,
  Check,
  Zap,
  Activity,
  Layers,
  GraduationCap,
} from 'lucide-react';
import { useDashboardTheme } from '../../context/ThemeContext';
import {
  MOCK_STUDENT_PROFILES,
  StudentProgressProfile,
} from '../../data/teacherDashboardData';
import { StudentGapRecord } from '../../types';

interface IndividualStudentProgressCardsProps {
  selectedClass: string;
  onSelectStudent?: (student: StudentGapRecord) => void;
  studentsList?: StudentGapRecord[];
}

export const IndividualStudentProgressCards: React.FC<IndividualStudentProgressCardsProps> = ({
  selectedClass,
  onSelectStudent,
  studentsList = [],
}) => {
  const { style } = useDashboardTheme();
  const isDark = style === 'obsidian-dark' || style === 'command-dark';

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'Needs Help' | 'In Progress' | 'Mastered'>('all');
  const [sortBy, setSortBy] = useState<'lowest_score' | 'highest_score' | 'recent_active'>('lowest_score');
  const [assignedPacks, setAssignedPacks] = useState<Record<string, boolean>>({});
  const [activeNoteStudent, setActiveNoteStudent] = useState<string | null>(null);
  const [teacherNoteText, setTeacherNoteText] = useState('');
  const [noteSentStatus, setNoteSentStatus] = useState<Record<string, boolean>>({});

  // Theme-Aware Grading and Visual Engine
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
          primaryBtn: 'bg-[#246257] hover:bg-[#1C4E45] text-white',
          secondaryBtn: 'border-[#DDD4C7] bg-[#F4EFEA] text-[#1C232B] hover:bg-[#EDE5D8]',
          inputBg: 'bg-white border-[#DDD4C7] text-[#1C232B] placeholder-[#8A8276]',
          getStatusStyle: (status: 'Needs Help' | 'In Progress' | 'Mastered') => {
            if (status === 'Needs Help') {
              return {
                bg: 'bg-[#C85340]/12',
                text: 'text-[#9E3625]',
                border: 'border-[#C85340]/30',
                barFill: '#C85340',
                dot: 'bg-[#C85340]',
                badge: 'bg-[#C85340]/15 text-[#9E3625] border-[#C85340]/35',
                label: 'Needs Help',
              };
            }
            if (status === 'In Progress') {
              return {
                bg: 'bg-[#D97706]/12',
                text: 'text-[#B45309]',
                border: 'border-[#D97706]/30',
                barFill: '#D97706',
                dot: 'bg-[#D97706]',
                badge: 'bg-[#D97706]/15 text-[#B45309] border-[#D97706]/35',
                label: 'In Progress',
              };
            }
            return {
              bg: 'bg-[#246257]/12',
              text: 'text-[#246257]',
              border: 'border-[#246257]/30',
              barFill: '#246257',
              dot: 'bg-[#246257]',
              badge: 'bg-[#246257]/15 text-[#246257] border-[#246257]/35',
              label: 'Mastered',
            };
          },
          getScoreColor: (score: number) => {
            if (score < 60) return { text: 'text-[#9E3625]', bar: '#C85340' };
            if (score < 80) return { text: 'text-[#B45309]', bar: '#D97706' };
            return { text: 'text-[#246257]', bar: '#246257' };
          },
          legend: [
            { label: 'Needs Help (<60%)', swatch: 'bg-[#C85340]', text: 'text-[#9E3625]', status: 'Needs Help' as const },
            { label: 'In Progress (60-79%)', swatch: 'bg-[#D97706]', text: 'text-[#B45309]', status: 'In Progress' as const },
            { label: 'Mastered (≥80%)', swatch: 'bg-[#246257]', text: 'text-[#246257]', status: 'Mastered' as const },
          ],
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
          getStatusStyle: (status: 'Needs Help' | 'In Progress' | 'Mastered') => {
            if (status === 'Needs Help') {
              return {
                bg: 'bg-rose-950/60',
                text: 'text-rose-300',
                border: 'border-rose-700/40',
                barFill: '#F43F5E',
                dot: 'bg-rose-500 shadow-rose-500/50 shadow-xs',
                badge: 'bg-rose-950/80 text-rose-300 border-rose-800/60',
                label: 'Needs Help',
              };
            }
            if (status === 'In Progress') {
              return {
                bg: 'bg-amber-950/60',
                text: 'text-amber-300',
                border: 'border-amber-700/40',
                barFill: '#F59E0B',
                dot: 'bg-amber-500',
                badge: 'bg-amber-950/80 text-amber-300 border-amber-800/60',
                label: 'In Progress',
              };
            }
            return {
              bg: 'bg-emerald-950/60',
              text: 'text-emerald-300',
              border: 'border-emerald-700/40',
              barFill: '#10B981',
              dot: 'bg-emerald-500 shadow-emerald-500/50 shadow-xs',
              badge: 'bg-emerald-950/80 text-emerald-300 border-emerald-800/60',
              label: 'Mastered',
            };
          },
          getScoreColor: (score: number) => {
            if (score < 60) return { text: 'text-rose-400', bar: '#F43F5E' };
            if (score < 80) return { text: 'text-amber-400', bar: '#F59E0B' };
            return { text: 'text-emerald-400', bar: '#10B981' };
          },
          legend: [
            { label: 'Needs Help (<60%)', swatch: 'bg-rose-500 shadow-rose-500/50 shadow-xs', text: 'text-rose-400', status: 'Needs Help' as const },
            { label: 'In Progress (60-79%)', swatch: 'bg-amber-500', text: 'text-amber-400', status: 'In Progress' as const },
            { label: 'Mastered (≥80%)', swatch: 'bg-emerald-500 shadow-emerald-500/50 shadow-xs', text: 'text-emerald-400', status: 'Mastered' as const },
          ],
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
          getStatusStyle: (status: 'Needs Help' | 'In Progress' | 'Mastered') => {
            if (status === 'Needs Help') {
              return {
                bg: 'bg-[#9A3412]/12',
                text: 'text-[#9A3412]',
                border: 'border-[#9A3412]/30',
                barFill: '#9A3412',
                dot: 'bg-[#9A3412]',
                badge: 'bg-[#9A3412]/15 text-[#9A3412] border-[#9A3412]/35',
                label: 'Needs Help',
              };
            }
            if (status === 'In Progress') {
              return {
                bg: 'bg-[#B45309]/12',
                text: 'text-[#B45309]',
                border: 'border-[#B45309]/30',
                barFill: '#B45309',
                dot: 'bg-[#B45309]',
                badge: 'bg-[#B45309]/15 text-[#B45309] border-[#B45309]/35',
                label: 'In Progress',
              };
            }
            return {
              bg: 'bg-[#15803D]/12',
              text: 'text-[#15803D]',
              border: 'border-[#15803D]/30',
              barFill: '#15803D',
              dot: 'bg-[#15803D]',
              badge: 'bg-[#15803D]/15 text-[#15803D] border-[#15803D]/35',
              label: 'Mastered',
            };
          },
          getScoreColor: (score: number) => {
            if (score < 60) return { text: 'text-[#9A3412]', bar: '#9A3412' };
            if (score < 80) return { text: 'text-[#B45309]', bar: '#B45309' };
            return { text: 'text-[#15803D]', bar: '#15803D' };
          },
          legend: [
            { label: 'Needs Help (<60%)', swatch: 'bg-[#9A3412]', text: 'text-[#9A3412]', status: 'Needs Help' as const },
            { label: 'In Progress (60-79%)', swatch: 'bg-[#B45309]', text: 'text-[#B45309]', status: 'In Progress' as const },
            { label: 'Mastered (≥80%)', swatch: 'bg-[#15803D]', text: 'text-[#15803D]', status: 'Mastered' as const },
          ],
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
          getStatusStyle: (status: 'Needs Help' | 'In Progress' | 'Mastered') => {
            if (status === 'Needs Help') {
              return {
                bg: 'bg-rose-50',
                text: 'text-rose-700',
                border: 'border-rose-200',
                barFill: '#E11D48',
                dot: 'bg-rose-500',
                badge: 'bg-rose-100 text-rose-800 border-rose-200',
                label: 'Needs Help',
              };
            }
            if (status === 'In Progress') {
              return {
                bg: 'bg-amber-50',
                text: 'text-amber-700',
                border: 'border-amber-200',
                barFill: '#F59E0B',
                dot: 'bg-amber-500',
                badge: 'bg-amber-100 text-amber-800 border-amber-200',
                label: 'In Progress',
              };
            }
            return {
              bg: 'bg-emerald-50',
              text: 'text-emerald-700',
              border: 'border-emerald-200',
              barFill: '#10B981',
              dot: 'bg-emerald-500',
              badge: 'bg-emerald-100 text-emerald-800 border-emerald-200',
              label: 'Mastered',
            };
          },
          getScoreColor: (score: number) => {
            if (score < 60) return { text: 'text-rose-600', bar: '#E11D48' };
            if (score < 80) return { text: 'text-amber-600', bar: '#F59E0B' };
            return { text: 'text-emerald-600', bar: '#10B981' };
          },
          legend: [
            { label: 'Needs Help (<60%)', swatch: 'bg-rose-500', text: 'text-rose-700', status: 'Needs Help' as const },
            { label: 'In Progress (60-79%)', swatch: 'bg-amber-500', text: 'text-amber-700', status: 'In Progress' as const },
            { label: 'Mastered (≥80%)', swatch: 'bg-emerald-500', text: 'text-emerald-700', status: 'Mastered' as const },
          ],
        };
    }
  }, [style]);

  // Aggregate Cohort Metrics
  const cohortStats = useMemo(() => {
    const total = MOCK_STUDENT_PROFILES.length;
    const needsHelp = MOCK_STUDENT_PROFILES.filter((s) => s.status === 'Needs Help').length;
    const inProgress = MOCK_STUDENT_PROFILES.filter((s) => s.status === 'In Progress').length;
    const mastered = MOCK_STUDENT_PROFILES.filter((s) => s.status === 'Mastered').length;
    const avgScore = Math.round(
      MOCK_STUDENT_PROFILES.reduce((acc, s) => acc + s.overallMasteryScore, 0) / (total || 1)
    );
    return { total, needsHelp, inProgress, mastered, avgScore };
  }, []);

  const filteredStudents = useMemo(() => {
    let list = [...MOCK_STUDENT_PROFILES];

    if (statusFilter !== 'all') {
      list = list.filter((s) => s.status === statusFilter);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.rollNumber.toLowerCase().includes(q) ||
          s.strugglingTopics.some((t) => t.topic.toLowerCase().includes(q))
      );
    }

    if (sortBy === 'lowest_score') {
      list.sort((a, b) => a.overallMasteryScore - b.overallMasteryScore);
    } else if (sortBy === 'highest_score') {
      list.sort((a, b) => b.overallMasteryScore - a.overallMasteryScore);
    } else {
      list.sort((a, b) => (b.attendanceStatus === 'active_today' ? 1 : -1));
    }

    return list;
  }, [statusFilter, searchQuery, sortBy]);

  const handleAssignPack = (studentId: string) => {
    setAssignedPacks((prev) => ({ ...prev, [studentId]: true }));
    setTimeout(() => {
      setAssignedPacks((prev) => ({ ...prev, [studentId]: false }));
    }, 4500);
  };

  const handleSendNote = (studentId: string) => {
    if (!teacherNoteText.trim()) return;
    setNoteSentStatus((prev) => ({ ...prev, [studentId]: true }));
    setTeacherNoteText('');
    setTimeout(() => {
      setActiveNoteStudent(null);
    }, 1400);
  };

  const openStudentDiagnostic = (profile: StudentProgressProfile) => {
    if (!onSelectStudent) return;
    const matched = studentsList.find((s) => s.name.toLowerCase() === profile.name.toLowerCase());
    if (matched) {
      onSelectStudent(matched);
    } else {
      onSelectStudent({
        id: profile.id,
        name: profile.name,
        avatar: profile.avatar,
        rollNumber: profile.rollNumber,
        classGrade: profile.classGrade,
        subject: profile.subject,
        failedBasicTopic: profile.strugglingTopics[0]?.topic || 'Core Arithmetic',
        failedConceptDetail: `Diagnostic score: ${profile.diagnosticScore}%. Needs focused revision.`,
        diagnosticScore: profile.diagnosticScore,
        attemptsCount: profile.attemptsCount,
        dateFlagged: 'Flagged by Teacher',
        fixedStatus: profile.status === 'Needs Help' ? 'Not Fixed' : 'In Progress',
      });
    }
  };

  return (
    <section
      id="individual-student-progress-cards"
      aria-label="Individual Student Progress Cards"
      className={`rounded-2xl p-5 sm:p-6 border transition-all duration-200 ${themeGrading.containerBg}`}
    >
      {/* 1. Header & Live Cohort Stats Ribbon */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-5 pb-5 border-b border-inherit">
        <div>
          <div className="flex items-center gap-2.5 mb-1.5 flex-wrap">
            <span className={`p-2 rounded-xl border ${themeGrading.cardHeaderBg} ${themeGrading.accentText}`}>
              <Users className="w-4 h-4 stroke-[2.4]" />
            </span>
            <h2 className="text-lg sm:text-xl font-black tracking-tight">
              Individual Student Progress Cards
            </h2>
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${themeGrading.cardHeaderBg}`}>
              {selectedClass} • {filteredStudents.length} Active Profiles
            </span>
            <span className="text-[11px] font-mono font-medium opacity-70 px-2 py-0.5 rounded bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10">
              {themeGrading.paletteLabel}
            </span>
          </div>
          <p className="text-xs sm:text-sm opacity-80 max-w-3xl leading-relaxed">
            Personalized mastery gauges, diagnostic footprints, struggling concept roadmaps, and instant 1-click remedial interventions.
          </p>
        </div>

        {/* Aggregate Status Pills (Theme Graded) */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0 flex-wrap">
          {/* Needs Help Stat */}
          {(() => {
            const urgentStyle = themeGrading.getStatusStyle('Needs Help');
            return (
              <button
                onClick={() => setStatusFilter(statusFilter === 'Needs Help' ? 'all' : 'Needs Help')}
                className={`px-3 py-2 rounded-xl border transition cursor-pointer text-center ${
                  statusFilter === 'Needs Help'
                    ? 'ring-2 ring-offset-1 ring-rose-500'
                    : ''
                } ${urgentStyle.bg} ${urgentStyle.border}`}
                title="Filter by Urgent Attention"
              >
                <div className={`text-[10px] font-bold uppercase tracking-wider ${urgentStyle.text}`}>
                  Urgent Attention
                </div>
                <div className={`text-base sm:text-lg font-black leading-tight ${urgentStyle.text}`}>
                  {cohortStats.needsHelp} Students
                </div>
              </button>
            );
          })()}

          {/* In Progress Stat */}
          {(() => {
            const inProgStyle = themeGrading.getStatusStyle('In Progress');
            return (
              <button
                onClick={() => setStatusFilter(statusFilter === 'In Progress' ? 'all' : 'In Progress')}
                className={`px-3 py-2 rounded-xl border transition cursor-pointer text-center ${
                  statusFilter === 'In Progress'
                    ? 'ring-2 ring-offset-1 ring-amber-500'
                    : ''
                } ${inProgStyle.bg} ${inProgStyle.border}`}
                title="Filter by In Remediation"
              >
                <div className={`text-[10px] font-bold uppercase tracking-wider ${inProgStyle.text}`}>
                  In Remediation
                </div>
                <div className={`text-base sm:text-lg font-black leading-tight ${inProgStyle.text}`}>
                  {cohortStats.inProgress} Students
                </div>
              </button>
            );
          })()}

          {/* Mastered Stat */}
          {(() => {
            const masteredStyle = themeGrading.getStatusStyle('Mastered');
            return (
              <button
                onClick={() => setStatusFilter(statusFilter === 'Mastered' ? 'all' : 'Mastered')}
                className={`px-3 py-2 rounded-xl border transition cursor-pointer text-center ${
                  statusFilter === 'Mastered'
                    ? 'ring-2 ring-offset-1 ring-emerald-500'
                    : ''
                } ${masteredStyle.bg} ${masteredStyle.border}`}
                title="Filter by Mastered"
              >
                <div className={`text-[10px] font-bold uppercase tracking-wider ${masteredStyle.text}`}>
                  High Mastery
                </div>
                <div className={`text-base sm:text-lg font-black leading-tight ${masteredStyle.text}`}>
                  {cohortStats.mastered} Students
                </div>
              </button>
            );
          })()}

          {/* Cohort Mean */}
          <div className={`px-3 py-2 rounded-xl border text-center ${themeGrading.cardHeaderBg}`}>
            <div className="text-[10px] font-bold uppercase tracking-wider opacity-70">
              Cohort Mean
            </div>
            <div className="text-base sm:text-lg font-black leading-tight">
              {cohortStats.avgScore}%
            </div>
          </div>
        </div>
      </div>

      {/* 2. Controls & Search Bar */}
      <div className="py-4 flex flex-col lg:flex-row lg:items-center justify-between gap-3 text-xs border-b border-inherit">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 opacity-40" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by student name, roll number, or concept..."
            className={`w-full pl-8 pr-3 py-1.5 rounded-xl border focus:outline-none focus:ring-1 focus:ring-indigo-500 text-xs transition ${themeGrading.inputBg}`}
          />
        </div>

        {/* Status Filters & Sorter */}
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap justify-between lg:justify-end">
          {/* Status Tabs */}
          <div className="flex items-center rounded-xl p-0.5 border border-inherit bg-black/5 dark:bg-white/5">
            {(
              [
                { id: 'all', label: 'All' },
                { id: 'Needs Help', label: 'Needs Help' },
                { id: 'In Progress', label: 'In Progress' },
                { id: 'Mastered', label: 'Mastered' },
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
              <option value="lowest_score">Weakest First</option>
              <option value="highest_score">Top Mastery</option>
              <option value="recent_active">Recent Activity</option>
            </select>
          </div>
        </div>
      </div>

      {/* 3. Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 pt-4">
        {filteredStudents.length === 0 ? (
          <div className="col-span-full py-12 text-center opacity-60 font-semibold border rounded-2xl border-dashed border-inherit">
            No students found matching your active filter criteria.
          </div>
        ) : (
          filteredStudents.map((student) => {
            const statusStyle = themeGrading.getStatusStyle(student.status);
            const scoreColor = themeGrading.getScoreColor(student.overallMasteryScore);
            const isNoteOpen = activeNoteStudent === student.id;

            return (
              <div
                key={student.id}
                className={`rounded-2xl p-4 sm:p-5 border transition-all duration-200 flex flex-col justify-between relative ${themeGrading.cardBg}`}
              >
                <div>
                  {/* Student Identity Header */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <img
                          src={student.avatar}
                          alt={student.name}
                          className="w-11 h-11 rounded-full object-cover border-2 border-inherit shrink-0 shadow-2xs"
                        />
                        <span
                          className={`w-3.5 h-3.5 rounded-full absolute -bottom-0.5 -right-0.5 border-2 ${
                            isDark ? 'border-[#161622]' : 'border-white'
                          } ${
                            student.attendanceStatus === 'active_today'
                              ? 'bg-emerald-500 animate-pulse ring-2 ring-emerald-500/20'
                              : 'bg-amber-400'
                          }`}
                          title={student.lastActiveText}
                        />
                      </div>

                      <div>
                        <div className="flex items-center gap-1.5">
                          <h3 className="font-black text-sm leading-tight">
                            {student.name}
                          </h3>
                        </div>
                        <div className="flex items-center gap-1.5 mt-0.5 text-[11px] opacity-75">
                          <span className="font-bold opacity-90">
                            {student.rollNumber}
                          </span>
                          <span>•</span>
                          <span>{student.section}</span>
                          <span>•</span>
                          <span className="truncate max-w-[100px]" title={student.lastActiveText}>
                            {student.attendanceStatus === 'active_today' ? 'Active Today' : 'Recent'}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Theme-Graded Status Badge Pill */}
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider border shrink-0 flex items-center gap-1.5 ${statusStyle.badge}`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${statusStyle.dot}`} />
                      <span>{student.status}</span>
                    </span>
                  </div>

                  {/* Overall Mastery Score Gauge Panel (Theme Graded) */}
                  <div className={`mb-3.5 p-3 rounded-xl border ${themeGrading.subPanelBg} transition-colors`}>
                    <div className="flex items-center justify-between text-xs mb-1.5 font-bold">
                      <span className="opacity-80">Subject Mastery Score</span>
                      <span className={`font-black text-sm ${scoreColor.text}`}>
                        {student.overallMasteryScore}%
                      </span>
                    </div>

                    {/* Theme Progress Bar */}
                    <div className="w-full h-2 bg-black/10 dark:bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${student.overallMasteryScore}%`,
                          backgroundColor: scoreColor.bar,
                        }}
                      />
                    </div>

                    {/* Micro Diagnostic Footprints */}
                    <div className="flex items-center justify-between text-[11px] opacity-75 mt-2 pt-1 border-t border-inherit/40">
                      <span>
                        Diagnostic: <strong>{student.diagnosticScore}%</strong> ({student.attemptsCount} attempts)
                      </span>
                      <span>
                        Modules: <strong>{student.quizzesCompleted}/{student.quizzesTotal}</strong>
                      </span>
                    </div>
                  </div>

                  {/* Struggling Concepts (Theme Calibrated) */}
                  <div className="mb-3">
                    <div className="text-[11px] font-bold mb-1.5 flex items-center gap-1 opacity-90">
                      <AlertTriangle className="w-3 h-3 text-rose-500" />
                      <span>Priority Remedial Needs:</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {student.strugglingTopics.map((st, idx) => {
                        const urgentStyle = themeGrading.getStatusStyle('Needs Help');
                        return (
                          <span
                            key={idx}
                            className={`px-2 py-0.5 rounded-lg text-[10px] font-bold border flex items-center gap-1 ${urgentStyle.badge}`}
                          >
                            <span>{st.topic}</span>
                            <span className="font-black opacity-85">({st.score}%)</span>
                          </span>
                        );
                      })}
                    </div>
                  </div>

                  {/* Mastered Topics Footprint (Theme Graded) */}
                  <div className="mb-3 text-[11px] opacity-80">
                    <div className="flex items-center gap-1 font-bold mb-1 opacity-95">
                      <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                      <span>{student.masteredTopicsCount} Concepts Mastered:</span>
                    </div>
                    <p className="text-[10px] opacity-75 truncate" title={student.masteredTopics.join(', ')}>
                      {student.masteredTopics.slice(0, 3).join(' • ')}
                      {student.masteredTopics.length > 3 && ` +${student.masteredTopics.length - 3} more`}
                    </p>
                  </div>
                </div>

                {/* Inline Teacher Note Composer Overlay */}
                {isNoteOpen && (
                  <div className={`mb-3 p-3 rounded-xl border text-xs animate-fadeIn ${themeGrading.subPanelBg}`}>
                    <div className="font-bold mb-1.5 flex items-center justify-between">
                      <span>Send Direct Guidance to {student.name}:</span>
                      <button
                        onClick={() => setActiveNoteStudent(null)}
                        className="opacity-50 hover:opacity-100 cursor-pointer"
                      >
                        ✕
                      </button>
                    </div>
                    <textarea
                      rows={2}
                      value={teacherNoteText}
                      onChange={(e) => setTeacherNoteText(e.target.value)}
                      placeholder="e.g., Great effort on negative signs. Review the 3 number line exercises tonight!"
                      className={`w-full p-2 rounded-lg border text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500 ${themeGrading.inputBg}`}
                    />
                    <div className="flex items-center justify-end gap-2 mt-2">
                      <button
                        onClick={() => setActiveNoteStudent(null)}
                        className="px-2.5 py-1 rounded-lg text-[11px] opacity-70 hover:opacity-100 cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleSendNote(student.id)}
                        disabled={!teacherNoteText.trim()}
                        className={`px-3 py-1 rounded-lg text-[11px] font-bold flex items-center gap-1 cursor-pointer transition disabled:opacity-50 ${themeGrading.primaryBtn}`}
                      >
                        <Send className="w-3 h-3" />
                        <span>{noteSentStatus[student.id] ? 'Note Dispatched!' : 'Send Note'}</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* Card Action Footer */}
                <div className="pt-3 border-t border-inherit flex items-center justify-between gap-2">
                  <button
                    onClick={() => openStudentDiagnostic(student)}
                    className={`flex-1 py-1.5 px-2.5 rounded-xl text-xs font-bold border transition flex items-center justify-center gap-1.5 cursor-pointer ${themeGrading.secondaryBtn}`}
                    title="Open full gap diagnostic breakdown"
                  >
                    <BookOpen className="w-3.5 h-3.5 opacity-70" />
                    <span>Diagnostic Gap</span>
                  </button>

                  <button
                    onClick={() => handleAssignPack(student.id)}
                    className={`py-1.5 px-3 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-xs ${
                      assignedPacks[student.id]
                        ? 'bg-emerald-600 text-white'
                        : themeGrading.primaryBtn
                    }`}
                    title="Dispatch adaptive 5-question practice pack"
                  >
                    {assignedPacks[student.id] ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Pack Sent!</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Assign Pack</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => {
                      setActiveNoteStudent(isNoteOpen ? null : student.id);
                      setTeacherNoteText('');
                    }}
                    className={`p-2 rounded-xl border transition cursor-pointer ${themeGrading.secondaryBtn}`}
                    title="Write direct encouragement or note"
                  >
                    <MessageSquare className="w-3.5 h-3.5 opacity-75" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
};
