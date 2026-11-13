import React, { useState, useMemo } from 'react';
import {
  Search,
  CheckCircle2,
  Clock,
  AlertCircle,
  Sparkles,
  ChevronRight,
  Plus,
  ArrowUpDown,
  Filter,
  Grid3X3,
  Flame,
  FileText,
  Layers,
  ArrowRight,
  Lightbulb,
  HelpCircle,
  Check,
  Send,
  Users,
  Zap,
  BookOpen,
  Target,
  RefreshCw,
  X,
  ExternalLink,
  ChevronDown,
  Info,
} from 'lucide-react';
import { StudentGapRecord, RemediationStatus, Subject, TopicFailureStat } from '../types';
import { TOPIC_FAILURE_STATS } from '../data/mockData';
import { useDashboardTheme } from '../context/ThemeContext';

interface StudentGapsTableProps {
  students: StudentGapRecord[];
  selectedSubject: Subject;
  filterTopic: string | null;
  onSelectStudent: (student: StudentGapRecord) => void;
  onToggleStatus: (studentId: string, nextStatus: RemediationStatus) => void;
  onOpenAddModal: () => void;
}

interface CellSelection {
  student: StudentGapRecord;
  topic: TopicFailureStat;
  score: number;
  status: RemediationStatus | 'Proficient';
  isPrimaryGap: boolean;
}

export const StudentGapsTable: React.FC<StudentGapsTableProps> = ({
  students,
  selectedSubject,
  filterTopic,
  onSelectStudent,
  onToggleStatus,
  onOpenAddModal,
}) => {
  const { style } = useDashboardTheme();
  const [searchTerm, setSearchTerm] = useState('');

  const [masteryLevelFilter, setMasteryLevelFilter] = useState<'All' | 'Critical' | 'In Progress' | 'Mastered'>('All');
  const [selectedTopicCol, setSelectedTopicCol] = useState<string | null>(filterTopic);
  const [selectedCell, setSelectedCell] = useState<CellSelection | null>(null);
  const [densityMode, setDensityMode] = useState<'detailed' | 'compact'>('detailed');

  // Automated Recommendation Widget State
  const [activeRecommendationTab, setActiveRecommendationTab] = useState<'cohort' | 'practice' | 'peer'>('cohort');
  const [dispatchedSuccess, setDispatchedSuccess] = useState(false);
  const [highlightedCohort, setHighlightedCohort] = useState<string | null>(null);
  const [scaffoldingLevel, setScaffoldingLevel] = useState<'Level 1' | 'Level 2' | 'Level 3'>('Level 1');
  const [showPeerDrawer, setShowPeerDrawer] = useState(false);

  // Sync selectedTopicCol when filterTopic changes from outer props
  React.useEffect(() => {
    if (filterTopic) {
      setSelectedTopicCol(filterTopic);
    }
  }, [filterTopic]);

  // Available topics based on registered student gaps or TOPIC_FAILURE_STATS
  const availableTopics = useMemo(() => {
    const studentTopics: TopicFailureStat[] = [];
    const seen = new Set<string>();
    students.forEach((s, idx) => {
      if (!seen.has(s.failedBasicTopic)) {
        seen.add(s.failedBasicTopic);
        studentTopics.push({
          id: `topic-${idx}`,
          topicName: s.failedBasicTopic,
          subject: s.subject,
          classGrade: s.classGrade,
          failureRate: 40,
          totalStudentsStuck: students.filter((st) => st.failedBasicTopic === s.failedBasicTopic).length,
          totalTested: students.length,
          averageAttempts: s.attemptsCount,
          difficultyLevel: 'High',
          isNumberOneHardest: idx === 0,
          rootCause: s.failedConceptDetail,
          recommendedIntervention: s.remediationNote || 'Personalized conceptual review session.',
        });
      }
    });

    const pool = studentTopics.length > 0 ? studentTopics : TOPIC_FAILURE_STATS;
    if (selectedSubject === 'All') return pool;
    return pool.filter((t) => t.subject === selectedSubject || t.isNumberOneHardest);
  }, [students, selectedSubject]);

  // Deterministic helper to generate realistic secondary topic scores for students
  const getTopicScoreForStudent = (student: StudentGapRecord, topic: TopicFailureStat) => {
    const isPrimaryGap =
      student.failedBasicTopic.toLowerCase().includes(topic.topicName.toLowerCase()) ||
      topic.topicName.toLowerCase().includes(student.failedBasicTopic.toLowerCase());

    if (isPrimaryGap) {
      return {
        score: student.diagnosticScore,
        status: student.fixedStatus as RemediationStatus | 'Proficient',
        isPrimaryGap: true,
      };
    }

    // Deterministic hash based on student roll & topic id
    const seed = (student.rollNumber.charCodeAt(student.rollNumber.length - 1) * 17 + topic.id.charCodeAt(topic.id.length - 1) * 31) % 100;
    
    // Higher base scores for topics the student didn't fail
    let score = 70 + (seed % 28); // 70 to 97
    if (seed < 15) {
      score = 58 + (seed % 12); // developing
    }

    let status: RemediationStatus | 'Proficient' = 'Proficient';
    if (score >= 82) status = 'Proficient';
    else if (score >= 70) status = 'Fixed';
    else status = 'In Progress';

    return {
      score,
      status,
      isPrimaryGap: false,
    };
  };

  // Filter students
  const filteredStudents = useMemo(() => {
    return students.filter((s) => {
      const matchesSubject = selectedSubject === 'All' || s.subject === selectedSubject;
      const matchesTopic = !selectedTopicCol || s.failedBasicTopic === selectedTopicCol;

      // Filter by mastery level filter
      let matchesMastery = true;
      if (masteryLevelFilter === 'Critical') matchesMastery = s.fixedStatus === 'Not Fixed';
      else if (masteryLevelFilter === 'In Progress') matchesMastery = s.fixedStatus === 'In Progress';
      else if (masteryLevelFilter === 'Mastered') matchesMastery = s.fixedStatus === 'Fixed';

      // Cohort highlight filter
      let matchesCohort = true;
      if (highlightedCohort === 'integers-sign') {
        matchesCohort = s.failedBasicTopic.toLowerCase().includes('integer');
      }

      const matchesSearch =
        s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.rollNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.failedBasicTopic.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesSubject && matchesTopic && matchesMastery && matchesCohort && matchesSearch;
    });
  }, [students, selectedSubject, selectedTopicCol, masteryLevelFilter, highlightedCohort, searchTerm]);

  // Aggregate stats across the matrix
  const criticalCount = students.filter((s) => s.fixedStatus === 'Not Fixed').length;
  const inProgressCount = students.filter((s) => s.fixedStatus === 'In Progress').length;
  const masteredCount = students.filter((s) => s.fixedStatus === 'Fixed').length;

  // Topic class-wide average calculation
  const topicClassAverages = useMemo(() => {
    return availableTopics.map((topic) => {
      let totalScore = 0;
      let count = 0;
      let gapCount = 0;

      students.forEach((student) => {
        const { score, status } = getTopicScoreForStudent(student, topic);
        totalScore += score;
        count++;
        if (status === 'Not Fixed' || score < 50) {
          gapCount++;
        }
      });

      const avg = count > 0 ? Math.round(totalScore / count) : 0;
      return {
        topicId: topic.id,
        averageScore: avg,
        gapCount,
        gapPercentage: topic.failureRate,
      };
    });
  }, [availableTopics, students]);

  // Interactive Action: Handle dispatching practice pack
  const handleDispatchPractice = () => {
    setDispatchedSuccess(true);
    setTimeout(() => {
      setDispatchedSuccess(false);
    }, 3500);
  };

  // Helper to get color class for a cell
  const getCellColor = (status: RemediationStatus | 'Proficient', score: number) => {
    if (status === 'Not Fixed' || score < 45) {
      return {
        bg: 'bg-rose-500/15 hover:bg-rose-500/25 border-rose-300 text-rose-800',
        badge: 'bg-rose-600 text-white',
        dot: 'bg-rose-500',
        label: 'Critical Gap',
      };
    }
    if (status === 'In Progress' || score < 70) {
      return {
        bg: 'bg-amber-500/15 hover:bg-amber-500/25 border-amber-300 text-amber-900',
        badge: 'bg-amber-500 text-white',
        dot: 'bg-amber-500',
        label: 'Developing',
      };
    }
    if (status === 'Fixed' || score < 85) {
      return {
        bg: 'bg-emerald-500/15 hover:bg-emerald-500/25 border-emerald-300 text-emerald-900',
        badge: 'bg-emerald-600 text-white',
        dot: 'bg-emerald-500',
        label: 'Mastered',
      };
    }
    return {
      bg: 'bg-sky-500/15 hover:bg-sky-500/25 border-sky-300 text-sky-900',
      badge: 'bg-sky-600 text-white',
      dot: 'bg-sky-500',
      label: 'Proficient',
    };
  };

  const isDark = style === 'obsidian-dark' || style === 'command-dark';

  return (
    <div
      id="student-gaps-table-card"
      className="space-y-6"
    >
      {/* ========================================================================= */}
      {/* 1. BRIGHT INTERACTIVE AUTOMATED RECOMMENDATION WIDGET                     */}
      {/* ========================================================================= */}
      <div
        id="automated-recommendation-widget"
        className={`relative overflow-hidden rounded-2xl border p-5 md:p-6 shadow-sm space-y-4 transition-colors duration-200 ${
          isDark
            ? 'border-[#2A2A38] bg-gradient-to-br from-[#121218] via-[#161622] to-indigo-950/30 text-slate-100'
            : style === 'academic-warm'
            ? 'border-[#DDD3C5] bg-gradient-to-br from-[#F5EFE6] via-[#FAF7F2] to-[#ECE5D8] text-[#28231D]'
            : style === 'editorial-command'
            ? 'border-[#DDD4C7] bg-[#FAF7F0] text-[#1C232B] shadow-2xs'
            : 'border-2 border-indigo-200/90 bg-gradient-to-br from-indigo-50/90 via-sky-50/60 to-blue-50/80 text-slate-900'
        }`}
      >
        {/* Glow ambient spots */}
        <div className="absolute -top-16 -right-16 w-56 h-56 bg-blue-400/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-44 h-44 bg-cyan-400/15 rounded-full blur-2xl pointer-events-none" />

        {/* Header Ribbon */}
        <div
          className={`relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b ${
            isDark
              ? 'border-[#2A2A38]'
              : style === 'academic-warm'
              ? 'border-[#E2D9CC]'
              : style === 'editorial-command'
              ? 'border-[#DDD4C7]'
              : 'border-indigo-100/90'
          }`}
        >
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-sm shrink-0 ${
                isDark
                  ? 'bg-indigo-600 text-indigo-200 shadow-indigo-900/50'
                  : style === 'academic-warm'
                  ? 'bg-[#8C4A2F] text-amber-200'
                  : style === 'editorial-command'
                  ? 'bg-[#E5F2EE] text-[#246257] border border-[#BFDFD6]'
                  : 'bg-gradient-to-tr from-blue-600 via-indigo-600 to-sky-500 text-white shadow-blue-500/25'
              }`}
            >
              <Zap className={`w-5 h-5 ${style === 'editorial-command' ? 'text-[#246257]' : 'fill-amber-300 text-amber-300 animate-pulse'}`} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3
                  className={`text-sm font-black tracking-tight ${
                    isDark
                      ? 'text-white'
                      : style === 'academic-warm'
                      ? 'text-[#28231D]'
                      : style === 'editorial-command'
                      ? 'text-[#1C232B] font-serif text-base font-normal'
                      : 'text-slate-900'
                  }`}
                >
                  Automated Pedagogical Action Recommendations
                </h3>
                <span
                  className={`inline-flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full shadow-2xs ${
                    isDark
                      ? 'bg-indigo-600 text-white'
                      : style === 'academic-warm'
                      ? 'bg-[#8C4A2F] text-white'
                      : style === 'editorial-command'
                      ? 'bg-[#E5F2EE] text-[#246257] border border-[#BFDFD6] font-mono'
                      : 'bg-indigo-600 text-white'
                  }`}
                >
                  <Sparkles className="w-2.5 h-2.5 text-cyan-200" />
                  Live AI Engine
                </span>
              </div>
              <p
                className={`text-xs font-medium ${
                  isDark
                    ? 'text-slate-400'
                    : style === 'academic-warm'
                    ? 'text-[#7D7363]'
                    : style === 'editorial-command'
                    ? 'text-[#5C6670]'
                    : 'text-slate-600'
                }`}
              >
                Real-time whole-class knowledge gap interventions synthesized from {students.length} student test diagnostics
              </p>
            </div>
          </div>

          {/* Interactive Recommendation Mode Switcher */}
          <div className={`flex items-center gap-1 p-1 rounded-xl border shadow-2xs self-start sm:self-auto ${
            style === 'editorial-command' ? 'bg-white border-[#DDD4C7]' : 'bg-white/90 border-indigo-100'
          }`}>
            <button
              onClick={() => setActiveRecommendationTab('cohort')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeRecommendationTab === 'cohort'
                  ? style === 'editorial-command' ? 'bg-[#246257] text-white shadow-2xs' : 'bg-blue-600 text-white shadow-xs'
                  : style === 'editorial-command' ? 'text-[#5C6670] hover:text-[#1C232B]' : 'text-slate-600 hover:text-blue-600'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Micro-Cohorts</span>
            </button>
            <button
              onClick={() => setActiveRecommendationTab('practice')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeRecommendationTab === 'practice'
                  ? style === 'editorial-command' ? 'bg-[#246257] text-white shadow-2xs' : 'bg-blue-600 text-white shadow-xs'
                  : style === 'editorial-command' ? 'text-[#5C6670] hover:text-[#1C232B]' : 'text-slate-600 hover:text-blue-600'
              }`}
            >
              <Target className="w-3.5 h-3.5" />
              <span>Targeted Practice</span>
            </button>
            <button
              onClick={() => setActiveRecommendationTab('peer')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeRecommendationTab === 'peer'
                  ? style === 'editorial-command' ? 'bg-[#246257] text-white shadow-2xs' : 'bg-blue-600 text-white shadow-xs'
                  : style === 'editorial-command' ? 'text-[#5C6670] hover:text-[#1C232B]' : 'text-slate-600 hover:text-blue-600'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Peer Pairing</span>
            </button>
          </div>
        </div>

        {/* Dynamic Interactive Card Body */}
        {students.length === 0 ? (
          <div className="relative z-10 py-6 text-center bg-white/70 dark:bg-black/20 rounded-xl border border-dashed border-indigo-200 dark:border-slate-800">
            <p className="text-xs text-slate-500 font-medium max-w-md mx-auto">
              No active learning gaps recorded yet. When students complete diagnostic assessments or you click <strong>"+ Log Student Gap"</strong>, AI intervention micro-cohorts and differentiated practice packs will automatically assemble here.
            </p>
          </div>
        ) : (
          <>
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-3.5">
          {/* Card 1: Micro-Cohort Remediation */}
          <div
            className={`p-4 rounded-xl border transition-all ${
              activeRecommendationTab === 'cohort'
                ? 'bg-white border-blue-400 shadow-md ring-2 ring-blue-500/20'
                : 'bg-white/70 border-indigo-100 hover:bg-white'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="inline-flex items-center gap-1 text-[10px] font-extrabold text-rose-700 bg-rose-100/80 px-2 py-0.5 rounded-md">
                <Flame className="w-3 h-3 text-rose-600 fill-rose-500" />
                Priority Intervention
              </span>
              <span className="text-xs font-extrabold text-slate-800">12 Students</span>
            </div>
            <h4 className="text-xs font-extrabold text-slate-900 leading-snug">
              Integers: Sign-Reversal Reteach Group
            </h4>
            <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
              12 students across the batch share the identical cognitive misconception: assuming <code className="bg-slate-100 px-1 py-0.5 rounded font-bold text-rose-700">-(-x) = -x</code>.
            </p>

            <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center gap-2">
              <button
                onClick={() => {
                  setHighlightedCohort(highlightedCohort === 'integers-sign' ? null : 'integers-sign');
                  setSelectedTopicCol('Integers: Negative Numbers Operations');
                }}
                className={`flex-1 text-[11px] font-extrabold px-2.5 py-1.5 rounded-lg border transition-all cursor-pointer flex items-center justify-center gap-1 ${
                  highlightedCohort === 'integers-sign'
                    ? 'bg-rose-600 text-white border-rose-600 shadow-xs'
                    : 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100'
                }`}
              >
                <Users className="w-3 h-3" />
                <span>{highlightedCohort === 'integers-sign' ? 'Showing Cohort' : 'Highlight Cohort'}</span>
              </button>
            </div>
          </div>

          {/* Card 2: Differentiated Practice Pack Dispatch */}
          <div
            className={`p-4 rounded-xl border transition-all ${
              activeRecommendationTab === 'practice'
                ? 'bg-white border-blue-400 shadow-md ring-2 ring-blue-500/20'
                : 'bg-white/70 border-indigo-100 hover:bg-white'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="inline-flex items-center gap-1 text-[10px] font-extrabold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-md">
                <Clock className="w-3 h-3 text-amber-600" />
                Auto-Differentiated
              </span>
              <span className="text-xs font-extrabold text-slate-800">10-Min Packs</span>
            </div>
            <h4 className="text-xs font-extrabold text-slate-900 leading-snug">
              Deploy Visual Scaffold to Critical Gaps
            </h4>
            <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
              Auto-assign interactive number line manipulatives to Level 1, while releasing word problem drills to Mastered learners.
            </p>

            <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center gap-1.5">
              <div className="flex items-center bg-slate-100 p-0.5 rounded-lg text-[10px] font-bold">
                {(['Level 1', 'Level 2', 'Level 3'] as const).map((lvl) => (
                  <button
                    key={lvl}
                    onClick={() => setScaffoldingLevel(lvl)}
                    className={`px-1.5 py-0.5 rounded transition cursor-pointer ${
                      scaffoldingLevel === lvl ? 'bg-white text-blue-700 shadow-2xs font-extrabold' : 'text-slate-500'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
              <button
                onClick={handleDispatchPractice}
                className={`flex-1 text-[11px] font-extrabold px-2.5 py-1.5 rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1 ${
                  dispatchedSuccess
                    ? 'bg-emerald-600 text-white'
                    : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:opacity-95 shadow-xs'
                }`}
              >
                {dispatchedSuccess ? (
                  <>
                    <Check className="w-3 h-3 text-white" />
                    <span>Dispatched!</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3 h-3" />
                    <span>Dispatch</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Card 3: Peer-Assisted Tutoring Pairing */}
          <div
            className={`p-4 rounded-xl border transition-all ${
              activeRecommendationTab === 'peer'
                ? 'bg-white border-blue-400 shadow-md ring-2 ring-blue-500/20'
                : 'bg-white/70 border-indigo-100 hover:bg-white'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="inline-flex items-center gap-1 text-[10px] font-extrabold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                Social Learning
              </span>
              <span className="text-xs font-extrabold text-slate-800">4 Synergies</span>
            </div>
            <h4 className="text-xs font-extrabold text-slate-900 leading-snug">
              Pair Mastered Students with Struggling Peers
            </h4>
            <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
              Pair Pooja Nair & Kabir Verma (90%+ on Linear Equations) with Aarav & Rohan for a 10-minute peer balance exercise.
            </p>

            <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center gap-2">
              <button
                onClick={() => setShowPeerDrawer(!showPeerDrawer)}
                className="w-full text-[11px] font-extrabold bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-200 px-2.5 py-1.5 rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1"
              >
                <Users className="w-3 h-3" />
                <span>{showPeerDrawer ? 'Hide Pairings' : 'Preview 4 Peer Pairs'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Peer Pairs Drawer if toggled */}
        {showPeerDrawer && (
          <div className="relative z-10 bg-white/95 backdrop-blur-xs p-3.5 rounded-xl border border-indigo-200 text-xs space-y-2 animate-in fade-in duration-200">
            <div className="flex items-center justify-between">
              <span className="font-extrabold text-slate-900 flex items-center gap-1.5">
                <Users className="w-4 h-4 text-blue-600" />
                AI Generated Reciprocal Peer Tutoring Pairs:
              </span>
              <button onClick={() => setShowPeerDrawer(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
              <div className="p-2 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between">
                <span className="text-emerald-700 font-bold">Pooja Nair (92% Master)</span>
                <span className="text-slate-400 font-extrabold">⇄</span>
                <span className="text-rose-700 font-bold">Aarav Patel (32% Gap)</span>
              </div>
              <div className="p-2 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between">
                <span className="text-emerald-700 font-bold">Ananya Roy (88% Master)</span>
                <span className="text-slate-400 font-extrabold">⇄</span>
                <span className="text-rose-700 font-bold">Rohan Mehra (28% Gap)</span>
              </div>
            </div>
          </div>
        )}
        </>
        )}
      </div>

      {/* ========================================================================= */}
      {/* 2. TOPIC MASTERY VS INDIVIDUAL STUDENTS VISUAL MATRIX GRID                */}
      {/* ========================================================================= */}
      <div
        id="topic-mastery-matrix-container"
        className={`rounded-2xl p-5 md:p-6 border shadow-xs space-y-5 transition-colors duration-200 ${
          isDark
            ? 'bg-[#121218] border-[#2A2A38] text-slate-100'
            : style === 'academic-warm'
            ? 'bg-[#FAF7F2] border-[#E8E2D6] text-[#28231D]'
            : style === 'editorial-command'
            ? 'bg-white border-[#DDD4C7] text-[#1C232B] shadow-2xs'
            : 'bg-white border-slate-200/80 text-slate-900'
        }`}
      >
        {/* Top Controls Header */}
        <div
          className={`flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b ${
            isDark
              ? 'border-[#2A2A38]'
              : style === 'academic-warm'
              ? 'border-[#E8E2D6]'
              : style === 'editorial-command'
              ? 'border-[#DDD4C7]'
              : 'border-slate-100'
          }`}
        >
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <h2
                className={`text-base font-extrabold tracking-tight flex items-center gap-2 ${
                  isDark
                    ? 'text-white'
                    : style === 'academic-warm'
                    ? 'text-[#28231D]'
                    : style === 'editorial-command'
                    ? 'text-[#1C232B] font-serif text-lg font-normal'
                    : 'text-slate-900'
                }`}
              >
                <Grid3X3
                  className={`w-5 h-5 ${
                    isDark
                      ? 'text-indigo-400'
                      : style === 'academic-warm'
                      ? 'text-[#8C4A2F]'
                      : style === 'editorial-command'
                      ? 'text-[#246257]'
                      : 'text-blue-600'
                  }`}
                />
                Topic Mastery vs. Individual Students Matrix
              </h2>
              <span
                className={`text-[11px] font-extrabold px-2.5 py-0.5 rounded-full border ${
                  isDark
                    ? 'bg-indigo-950 text-indigo-300 border-indigo-800'
                    : style === 'academic-warm'
                    ? 'bg-[#EFE9E0] text-[#8C4A2F] border-[#DDD3C5]'
                    : style === 'editorial-command'
                    ? 'bg-[#E5F2EE] text-[#246257] border-[#BFDFD6] font-mono text-[10px]'
                    : 'bg-blue-100 text-blue-800 border-blue-200'
                }`}
              >
                {filteredStudents.length} Students • {availableTopics.length} Topics
              </span>
            </div>
            <p
              className={`text-xs ${
                isDark
                  ? 'text-slate-400'
                  : style === 'academic-warm'
                  ? 'text-[#7D7363]'
                  : style === 'editorial-command'
                  ? 'text-[#5C6670]'
                  : 'text-slate-500'
              }`}
            >
              Color-coded competency grid showing mastery per topic across every student. Instantly pinpoint whole-class vs individual knowledge gaps.
            </p>
          </div>

          {/* Quick Filter & Add Gap Controls */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Density Toggle */}
            <div className={`flex items-center p-0.5 rounded-xl border text-xs ${
              style === 'editorial-command' ? 'bg-[#FAF7F0] border-[#DDD4C7]' : 'bg-slate-100 border-slate-200/60'
            }`}>
              <button
                onClick={() => setDensityMode('detailed')}
                className={`px-2.5 py-1 rounded-lg font-bold transition cursor-pointer ${
                  densityMode === 'detailed'
                    ? style === 'editorial-command'
                      ? 'bg-[#246257] text-white shadow-2xs font-semibold'
                      : 'bg-white text-blue-700 shadow-2xs font-extrabold'
                    : style === 'editorial-command'
                    ? 'text-[#5C6670]'
                    : 'text-slate-500'
                }`}
              >
                Detailed View
              </button>
              <button
                onClick={() => setDensityMode('compact')}
                className={`px-2.5 py-1 rounded-lg font-bold transition cursor-pointer ${
                  densityMode === 'compact'
                    ? style === 'editorial-command'
                      ? 'bg-[#246257] text-white shadow-2xs font-semibold'
                      : 'bg-white text-blue-700 shadow-2xs font-extrabold'
                    : style === 'editorial-command'
                    ? 'text-[#5C6670]'
                    : 'text-slate-500'
                }`}
              >
                Heatmap Grid
              </button>
            </div>

            {/* Log Gap Button */}
            <button
              id="add-gap-matrix-btn"
              onClick={onOpenAddModal}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-white text-xs font-bold shadow-xs transition-colors cursor-pointer ${
                style === 'editorial-command'
                  ? 'bg-[#246257] hover:bg-[#1C4E45] shadow-2xs font-semibold'
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Log Student Gap</span>
            </button>
          </div>
        </div>

        {/* Interactive Filter Strip & Color Legend */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Interactive Mastery Level Chips */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs text-slate-400 font-semibold mr-1">Filter Cohort:</span>
            <button
              onClick={() => {
                setMasteryLevelFilter('All');
                setHighlightedCohort(null);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                masteryLevelFilter === 'All' && !highlightedCohort
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              All Students ({students.length})
            </button>
            <button
              onClick={() => {
                setMasteryLevelFilter('Critical');
                setHighlightedCohort(null);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                masteryLevelFilter === 'Critical'
                  ? 'bg-rose-600 text-white shadow-xs'
                  : 'bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-rose-500" />
              <span>Critical Gaps ({criticalCount})</span>
            </button>
            <button
              onClick={() => {
                setMasteryLevelFilter('In Progress');
                setHighlightedCohort(null);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                masteryLevelFilter === 'In Progress'
                  ? 'bg-amber-500 text-white shadow-xs'
                  : 'bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              <span>In Remediation ({inProgressCount})</span>
            </button>
            <button
              onClick={() => {
                setMasteryLevelFilter('Mastered');
                setHighlightedCohort(null);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                masteryLevelFilter === 'Mastered'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Mastered ({masteredCount})</span>
            </button>
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search student, roll number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-50 focus:bg-white text-xs text-slate-800 pl-9 pr-3 py-2 rounded-xl border border-slate-200 focus:border-blue-400 focus:outline-none transition-all placeholder:text-slate-400 font-medium"
            />
          </div>
        </div>

        {/* Selected Topic Focus Tag if applied */}
        {selectedTopicCol && (
          <div className="flex items-center justify-between bg-blue-50 border border-blue-200 rounded-xl px-3.5 py-2 text-xs">
            <div className="flex items-center gap-2 text-blue-900 font-medium">
              <Filter className="w-3.5 h-3.5 text-blue-600 shrink-0" />
              <span>
                Matrix column focus: <strong>{selectedTopicCol}</strong>
              </span>
            </div>
            <button
              onClick={() => setSelectedTopicCol(null)}
              className="text-[11px] text-blue-700 hover:text-blue-900 font-bold underline cursor-pointer"
            >
              Reset to whole class
            </button>
          </div>
        )}

        {/* The Matrix Table Canvas */}
        <div className="overflow-x-auto rounded-2xl border border-slate-200/90 shadow-2xs">
          <table className="w-full text-left border-collapse min-w-[780px]">
            {/* Table Header: Columns represent Topics with Whole-Class Knowledge Gap Indicators */}
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-700">
                {/* Left Fixed Student Header */}
                <th className="py-4 px-4 w-60 sticky left-0 bg-slate-100/95 backdrop-blur-xs z-20 border-r border-slate-200">
                  <div className="text-xs font-black text-slate-900">Student Profiles</div>
                  <div className="text-[10px] text-slate-400 font-semibold mt-0.5">
                    Click name for dossier
                  </div>
                </th>

                {/* Topic Columns with Whole-Class Knowledge Gap Indicator */}
                {availableTopics.map((topic) => {
                  const stat = topicClassAverages.find((t) => t.topicId === topic.id);
                  const isHardest = topic.isNumberOneHardest;
                  const isColFocused = selectedTopicCol === topic.topicName;

                  return (
                    <th
                      key={topic.id}
                      onClick={() =>
                        setSelectedTopicCol(selectedTopicCol === topic.topicName ? null : topic.topicName)
                      }
                      className={`py-3 px-3.5 border-l border-slate-200/80 text-center transition-all cursor-pointer group select-none min-w-[140px] max-w-[170px] ${
                        isColFocused
                          ? 'bg-blue-100/60 ring-2 ring-blue-500/30'
                          : isHardest
                          ? 'bg-amber-50/70 hover:bg-amber-100/60'
                          : 'hover:bg-slate-100/80'
                      }`}
                      title="Click to focus this topic across all students"
                    >
                      {/* Topic Category Tag */}
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <span
                          className={`text-[9px] font-extrabold uppercase tracking-wider px-1.5 py-0.2 rounded ${
                            topic.subject === 'Mathematics'
                              ? 'bg-blue-100 text-blue-700'
                              : topic.subject === 'Science'
                              ? 'bg-emerald-100 text-emerald-700'
                              : 'bg-purple-100 text-purple-700'
                          }`}
                        >
                          {topic.subject}
                        </span>
                        {isHardest && (
                          <span className="text-[9px] font-extrabold bg-amber-500 text-white px-1.5 py-0.2 rounded flex items-center gap-0.5">
                            <Flame className="w-2.5 h-2.5 fill-current" />
                            #1 Gap
                          </span>
                        )}
                      </div>

                      {/* Topic Name */}
                      <div className="text-xs font-extrabold text-slate-900 line-clamp-1 group-hover:text-blue-600 transition-colors">
                        {topic.topicName.split(':')[0]}
                      </div>

                      {/* WHOLE CLASS GAP METER (Instantly reveals bottleneck) */}
                      <div className="mt-2 pt-1.5 border-t border-slate-200/60 space-y-1">
                        <div className="flex items-center justify-between text-[10px] font-extrabold">
                          <span className="text-slate-400">Class Gap:</span>
                          <span
                            className={
                              topic.failureRate > 35
                                ? 'text-rose-600'
                                : topic.failureRate > 25
                                ? 'text-amber-600'
                                : 'text-emerald-600'
                            }
                          >
                            {topic.failureRate}% stuck
                          </span>
                        </div>
                        {/* Visual Mini Progress Meter */}
                        <div className="w-full bg-slate-200/70 h-1.5 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-300 ${
                              topic.failureRate > 35
                                ? 'bg-rose-500'
                                : topic.failureRate > 25
                                ? 'bg-amber-400'
                                : 'bg-emerald-500'
                            }`}
                            style={{ width: `${topic.failureRate}%` }}
                          />
                        </div>
                      </div>
                    </th>
                  );
                })}

                {/* Overall Student Mastery Column */}
                <th className="py-4 px-4 w-32 text-center border-l border-slate-200 bg-slate-100/90 z-10">
                  <div className="text-xs font-black text-slate-900">Remediation Status</div>
                  <div className="text-[10px] text-slate-400 font-semibold mt-0.5">Overall Flag</div>
                </th>
              </tr>
            </thead>

            {/* Matrix Rows: Each student against each topic */}
            <tbody className="divide-y divide-slate-100 text-xs">
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan={Math.max(availableTopics.length + 2, 4)} className="py-12 text-center text-slate-400">
                    {students.length === 0 ? (
                      <div className="space-y-1.5 max-w-sm mx-auto">
                        <p className="font-extrabold text-sm text-slate-700">No student gap records logged yet</p>
                        <p className="text-xs text-slate-400">Click "+ Log Student Gap" to record student diagnostic results and track mastery progress.</p>
                      </div>
                    ) : (
                      'No students match the current filter or search criteria.'
                    )}
                  </td>
                </tr>
              ) : (
                filteredStudents.map((student) => {
                  return (
                    <tr
                      key={student.id}
                      className="hover:bg-blue-50/25 transition-colors group"
                    >
                      {/* Left Sticky Column: Student Info */}
                      <td
                        onClick={() => onSelectStudent(student)}
                        className="py-3 px-4 sticky left-0 bg-white group-hover:bg-slate-50 transition-colors z-10 border-r border-slate-100 cursor-pointer"
                        title="Click to view full student diagnostic profile"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={student.avatar}
                            alt={student.name}
                            className="w-8 h-8 rounded-full object-cover ring-2 ring-slate-100 shrink-0"
                          />
                          <div className="min-w-0">
                            <div className="font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors truncate">
                              {student.name}
                            </div>
                            <div className="text-[10px] text-slate-400 font-medium">
                              {student.rollNumber} • {student.classGrade}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Topic Mastery Cells */}
                      {availableTopics.map((topic) => {
                        const { score, status, isPrimaryGap } = getTopicScoreForStudent(student, topic);
                        const cellColor = getCellColor(status, score);
                        const isSelectedCell =
                          selectedCell?.student.id === student.id && selectedCell.topic.id === topic.id;

                        return (
                          <td
                            key={topic.id}
                            onClick={() =>
                              setSelectedCell({
                                student,
                                topic,
                                score,
                                status,
                                isPrimaryGap,
                              })
                            }
                            className={`p-2 text-center border-l border-slate-100 transition-all cursor-pointer ${
                              isSelectedCell ? 'ring-2 ring-blue-600 ring-inset bg-blue-100/50' : ''
                            }`}
                          >
                            <div
                              className={`rounded-xl border p-2 flex flex-col items-center justify-center gap-1 transition-all hover:scale-105 shadow-2xs ${cellColor.bg}`}
                            >
                              {densityMode === 'detailed' ? (
                                <>
                                  <div className="flex items-center justify-between w-full px-1">
                                    <span className="text-xs font-black tracking-tight">{score}%</span>
                                    <span className={`w-2 h-2 rounded-full shrink-0 ${cellColor.dot}`} />
                                  </div>
                                  <span className="text-[9px] font-extrabold uppercase tracking-wider truncate max-w-[80px]">
                                    {cellColor.label}
                                  </span>
                                </>
                              ) : (
                                <div className="py-1">
                                  <span className="text-[11px] font-black">{score}%</span>
                                </div>
                              )}
                            </div>
                          </td>
                        );
                      })}

                      {/* Overall Fix Status Stepper */}
                      <td className="py-3 px-3 text-center border-l border-slate-100">
                        <div className="inline-flex items-center p-0.5 bg-slate-100 rounded-lg border border-slate-200/60">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onToggleStatus(student.id, 'Not Fixed');
                            }}
                            className={`px-1.5 py-0.5 rounded text-[10px] font-extrabold transition cursor-pointer ${
                              student.fixedStatus === 'Not Fixed'
                                ? 'bg-rose-600 text-white shadow-xs'
                                : 'text-slate-400 hover:text-rose-600'
                            }`}
                            title="Mark Not Fixed"
                          >
                            !
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onToggleStatus(student.id, 'In Progress');
                            }}
                            className={`px-1.5 py-0.5 rounded text-[10px] font-extrabold transition cursor-pointer ${
                              student.fixedStatus === 'In Progress'
                                ? 'bg-amber-500 text-white shadow-xs'
                                : 'text-slate-400 hover:text-amber-600'
                            }`}
                            title="Mark In Progress"
                          >
                            ⧗
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onToggleStatus(student.id, 'Fixed');
                            }}
                            className={`px-1.5 py-0.5 rounded text-[10px] font-extrabold transition cursor-pointer ${
                              student.fixedStatus === 'Fixed'
                                ? 'bg-emerald-600 text-white shadow-xs'
                                : 'text-slate-400 hover:text-emerald-600'
                            }`}
                            title="Mark Fixed"
                          >
                            <Check className="w-3 h-3" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>

            {/* Whole Class Knowledge Gap Average Summary Row */}
            <tfoot>
              <tr className="bg-slate-100/90 border-t-2 border-slate-200 font-extrabold text-slate-800">
                <td className="py-3.5 px-4 sticky left-0 bg-slate-100 z-10 border-r border-slate-200">
                  <div className="text-xs font-black text-slate-900">Whole-Class Average Mastery</div>
                  <div className="text-[10px] text-slate-500 font-medium">Cohort of 42 Tested Students</div>
                </td>

                {availableTopics.map((topic) => {
                  const stat = topicClassAverages.find((t) => t.topicId === topic.id);
                  const avg = stat?.averageScore || 70;

                  return (
                    <td key={topic.id} className="py-3 px-3 text-center border-l border-slate-200">
                      <div className="space-y-1">
                        <div className="text-xs font-black text-slate-900">{avg}%</div>
                        <div className="text-[9px] font-bold text-slate-500">
                          {stat?.gapCount} needing help
                        </div>
                      </div>
                    </td>
                  );
                })}

                <td className="py-3.5 px-3 text-center border-l border-slate-200">
                  <span className="text-[11px] font-black text-emerald-700">74% Pass</span>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Interactive Selected Cell Quick Remediation Drawer */}
        {selectedCell && (
          <div
            id="cell-quick-action-drawer"
            className="rounded-2xl border-2 border-blue-300 bg-gradient-to-br from-blue-50/80 via-white to-sky-50/70 p-4 md:p-5 shadow-sm space-y-3 animate-in fade-in duration-200"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-blue-100">
              <div className="flex items-center gap-3">
                <img
                  src={selectedCell.student.avatar}
                  alt={selectedCell.student.name}
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-blue-300"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-black text-slate-900">
                      {selectedCell.student.name} • {selectedCell.topic.topicName}
                    </span>
                    <span
                      className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                        selectedCell.status === 'Not Fixed'
                          ? 'bg-rose-100 text-rose-800'
                          : selectedCell.status === 'In Progress'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {selectedCell.status} ({selectedCell.score}%)
                    </span>
                  </div>
                  <span className="text-xs text-slate-500 font-medium">
                    Roll: {selectedCell.student.rollNumber} • {selectedCell.topic.subject} • {selectedCell.student.attemptsCount} Diagnostic Attempts
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 self-start sm:self-auto">
                {/* 1-Click Status Stepper */}
                <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-200 shadow-2xs">
                  <button
                    onClick={() => {
                      onToggleStatus(selectedCell.student.id, 'Not Fixed');
                      setSelectedCell({ ...selectedCell, status: 'Not Fixed' });
                    }}
                    className={`px-2 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                      selectedCell.status === 'Not Fixed' ? 'bg-rose-600 text-white' : 'text-slate-600 hover:text-rose-600'
                    }`}
                  >
                    Not Fixed
                  </button>
                  <button
                    onClick={() => {
                      onToggleStatus(selectedCell.student.id, 'In Progress');
                      setSelectedCell({ ...selectedCell, status: 'In Progress' });
                    }}
                    className={`px-2 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                      selectedCell.status === 'In Progress' ? 'bg-amber-500 text-white' : 'text-slate-600 hover:text-amber-600'
                    }`}
                  >
                    In Progress
                  </button>
                  <button
                    onClick={() => {
                      onToggleStatus(selectedCell.student.id, 'Fixed');
                      setSelectedCell({ ...selectedCell, status: 'Fixed' });
                    }}
                    className={`px-2 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                      selectedCell.status === 'Fixed' ? 'bg-emerald-600 text-white' : 'text-slate-600 hover:text-emerald-600'
                    }`}
                  >
                    Fixed & Mastered
                  </button>
                </div>

                <button
                  onClick={() => setSelectedCell(null)}
                  className="text-slate-400 hover:text-slate-600 p-1.5"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Cognitive Stumble Details */}
            {selectedCell.student.sampleFailedQuestion ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-white rounded-xl border border-blue-100 space-y-1">
                  <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">
                    Diagnostic Stumbled Question
                  </span>
                  <p className="font-bold text-slate-900">{selectedCell.student.sampleFailedQuestion.question}</p>
                  <div className="flex items-center gap-3 pt-1 text-[11px] font-medium">
                    <span className="text-rose-600 font-bold">Answered: {selectedCell.student.sampleFailedQuestion.studentAnswer}</span>
                    <span className="text-emerald-700 font-bold">Correct: {selectedCell.student.sampleFailedQuestion.correctAnswer}</span>
                  </div>
                </div>

                <div className="p-3 bg-amber-50/70 rounded-xl border border-amber-200 space-y-1">
                  <span className="text-[10px] font-bold uppercase text-amber-800 tracking-wider">
                    Identified Cognitive Misconception
                  </span>
                  <p className="text-slate-800 font-medium">{selectedCell.student.sampleFailedQuestion.misconception}</p>
                </div>
              </div>
            ) : (
              <p className="text-xs text-slate-600 font-medium">
                {selectedCell.student.failedConceptDetail}
              </p>
            )}

            <div className="flex items-center justify-between pt-1">
              <span className="text-[11px] text-slate-500">
                Recommended Action: {selectedCell.topic.recommendedIntervention}
              </span>
              <button
                onClick={() => onSelectStudent(selectedCell.student)}
                className="inline-flex items-center gap-1 text-xs font-bold text-blue-700 hover:text-blue-900 underline cursor-pointer"
              >
                <span>Open full student diagnostic dossier</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Color Legend & Helper Footnote */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100 gap-3">
          <div className="flex flex-wrap items-center gap-4 text-[11px]">
            <span className="font-bold text-slate-700">Mastery Levels:</span>
            <span className="inline-flex items-center gap-1.5 text-rose-700 font-bold">
              <span className="w-3 h-3 rounded-md bg-rose-500/20 border border-rose-300" />
              Critical Gap (&lt;45%)
            </span>
            <span className="inline-flex items-center gap-1.5 text-amber-800 font-bold">
              <span className="w-3 h-3 rounded-md bg-amber-500/20 border border-amber-300" />
              Developing (45-69%)
            </span>
            <span className="inline-flex items-center gap-1.5 text-emerald-800 font-bold">
              <span className="w-3 h-3 rounded-md bg-emerald-500/20 border border-emerald-300" />
              Mastered (70-84%)
            </span>
            <span className="inline-flex items-center gap-1.5 text-sky-800 font-bold">
              <span className="w-3 h-3 rounded-md bg-sky-500/20 border border-sky-300" />
              Proficient (85%+)
            </span>
          </div>

          <span className="text-[11px] text-slate-400">
            Tip: Click any cell to inspect misconception & cycle remediation status.
          </span>
        </div>
      </div>
    </div>
  );
};
