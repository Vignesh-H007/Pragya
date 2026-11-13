import React, { useState, useId, useEffect } from 'react';
import {
  HeartPulse,
  Activity,
  Sparkles,
  ArrowRight,
  ArrowUpRight,
  Flame,
  Users,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Radio,
  Sliders,
  Play,
  RotateCcw,
  Zap,
  ChevronDown,
  ChevronUp,
  UserCheck,
  Send,
  MessageSquare,
  HelpCircle,
  Smile,
  Meh,
  Frown,
  ShieldAlert,
  Award,
} from 'lucide-react';
import { useDashboardTheme } from '../context/ThemeContext';

export type PulsePhase = 'before' | 'after' | 'compare';

interface StudentReactionItem {
  id: string;
  name: string;
  avatar: string;
  rollNumber: string;
  beforeStage: 'mastery' | 'confident' | 'unsure' | 'stressed' | 'lost';
  afterStage: 'mastery' | 'confident' | 'unsure' | 'stressed' | 'lost';
  beforeScore: number;
  afterScore: number;
  note: string;
}

interface EmojiCategory {
  id: 'mastery' | 'confident' | 'unsure' | 'stressed' | 'lost';
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  shortDesc: string;
  weight: number; // 0 to 100
  color: string;
  bgLight: string;
  bgDark: string;
  borderLight: string;
  borderDark: string;
  textColor: string;
}

const EMOJI_CATEGORIES: EmojiCategory[] = [
  {
    id: 'mastery',
    icon: Sparkles,
    label: 'Mastered / Ready',
    shortDesc: '100% confidence, ready to ace',
    weight: 100,
    color: '#10B981',
    bgLight: 'bg-emerald-50',
    bgDark: 'bg-emerald-950/40',
    borderLight: 'border-emerald-200',
    borderDark: 'border-emerald-800/80',
    textColor: 'text-emerald-700 dark:text-emerald-300',
  },
  {
    id: 'confident',
    icon: Smile,
    label: 'Confident / Solid',
    shortDesc: 'Good grasp, minor review needed',
    weight: 75,
    color: '#3B82F6',
    bgLight: 'bg-blue-50',
    bgDark: 'bg-blue-950/40',
    borderLight: 'border-blue-200',
    borderDark: 'border-blue-800/80',
    textColor: 'text-blue-700 dark:text-blue-300',
  },
  {
    id: 'unsure',
    icon: Meh,
    label: 'Unsure / 50-50',
    shortDesc: 'Can do basics, stuck on steps',
    weight: 50,
    color: '#F59E0B',
    bgLight: 'bg-amber-50',
    bgDark: 'bg-amber-950/40',
    borderLight: 'border-amber-200',
    borderDark: 'border-amber-800/80',
    textColor: 'text-amber-700 dark:text-amber-300',
  },
  {
    id: 'stressed',
    icon: Frown,
    label: 'Apprehensive / Stuck',
    shortDesc: 'High cognitive friction',
    weight: 25,
    color: '#F97316',
    bgLight: 'bg-orange-50',
    bgDark: 'bg-orange-950/40',
    borderLight: 'border-orange-200',
    borderDark: 'border-orange-800/80',
    textColor: 'text-orange-700 dark:text-orange-300',
  },
  {
    id: 'lost',
    icon: ShieldAlert,
    label: 'Lost / Roadblocked',
    shortDesc: 'Need immediate teacher scaffolding',
    weight: 0,
    color: '#EF4444',
    bgLight: 'bg-rose-50',
    bgDark: 'bg-rose-950/40',
    borderLight: 'border-rose-200',
    borderDark: 'border-rose-800/80',
    textColor: 'text-rose-700 dark:text-rose-300',
  },
];

const MOCK_SAMPLE_STUDENTS: StudentReactionItem[] = [
  {
    id: 's-1',
    name: 'Vikram Malhotra',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
    rollNumber: 'C7-09',
    beforeStage: 'lost',
    afterStage: 'confident',
    beforeScore: 20,
    afterScore: 78,
    note: 'Before: Stuck on sign flips. After: Number line elevation exercise cleared confusion.',
  },
  {
    id: 's-2',
    name: 'Rohan Gupta',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    rollNumber: 'C7-03',
    beforeStage: 'lost',
    afterStage: 'confident',
    beforeScore: 25,
    afterScore: 82,
    note: 'Before: Confused multiplying negatives vs addition. After: Peer study with Aarav boosted mastery.',
  },
  {
    id: 's-3',
    name: 'Priya Sharma',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80',
    rollNumber: 'C7-07',
    beforeStage: 'stressed',
    afterStage: 'mastery',
    beforeScore: 40,
    afterScore: 92,
    note: 'Before: Anxious about speed. After: Completed all 8 practice problems with zero errors.',
  },
  {
    id: 's-4',
    name: 'Ananya Verma',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&auto=format&fit=crop&q=80',
    rollNumber: 'C7-05',
    beforeStage: 'unsure',
    afterStage: 'mastery',
    beforeScore: 55,
    afterScore: 95,
    note: 'Before: Hesitant on brackets. After: Ace performer on test exit card.',
  },
  {
    id: 's-5',
    name: 'Aarav Patel',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=120&auto=format&fit=crop&q=80',
    rollNumber: 'C7-01',
    beforeStage: 'stressed',
    afterStage: 'confident',
    beforeScore: 32,
    afterScore: 75,
    note: 'Before: Diagnostic score 32%. After: Remediated to 75% passing threshold.',
  },
  {
    id: 's-6',
    name: 'Devansh Joshi',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
    rollNumber: 'C7-14',
    beforeStage: 'unsure',
    afterStage: 'confident',
    beforeScore: 58,
    afterScore: 80,
    note: 'Before: Inconsistent on sign rules. After: Steady progress achieved.',
  },
  {
    id: 's-7',
    name: 'Meera Desai',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&auto=format&fit=crop&q=80',
    rollNumber: 'C7-11',
    beforeStage: 'lost',
    afterStage: 'unsure',
    beforeScore: 18,
    afterScore: 54,
    note: 'Before: Incomplete basic prerequisite. After: Improved from 18% to 54%, scheduled for follow-up.',
  },
  {
    id: 's-8',
    name: 'Kabir Mehta',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&auto=format&fit=crop&q=80',
    rollNumber: 'C7-18',
    beforeStage: 'mastery',
    afterStage: 'mastery',
    beforeScore: 92,
    afterScore: 100,
    note: 'Consistently high confidence. Acted as peer mentor for Group 2.',
  },
];

const ASSIGNMENT_OPTIONS = [
  {
    id: 'asg-1',
    title: 'Integers: Negative Numbers Operations (Test #2)',
    subject: 'Mathematics',
    totalStudents: 42,
    beforeStats: {
      mastery: 5,
      confident: 11,
      unsure: 13,
      stressed: 9,
      lost: 4,
    },
    afterStats: {
      mastery: 20,
      confident: 14,
      unsure: 5,
      stressed: 2,
      lost: 1,
    },
  },
  {
    id: 'asg-2',
    title: 'Fraction Division & Reciprocals (Worksheet #4)',
    subject: 'Mathematics',
    totalStudents: 42,
    beforeStats: {
      mastery: 7,
      confident: 14,
      unsure: 12,
      stressed: 6,
      lost: 3,
    },
    afterStats: {
      mastery: 22,
      confident: 13,
      unsure: 5,
      stressed: 1,
      lost: 1,
    },
  },
  {
    id: 'asg-3',
    title: 'Acids, Bases & Neutralization (Lab Quiz #1)',
    subject: 'Science',
    totalStudents: 42,
    beforeStats: {
      mastery: 9,
      confident: 15,
      unsure: 10,
      stressed: 6,
      lost: 2,
    },
    afterStats: {
      mastery: 25,
      confident: 12,
      unsure: 4,
      stressed: 1,
      lost: 0,
    },
  },
];

export const ClassConfidencePulseMeter: React.FC = () => {
  const { style } = useDashboardTheme();
  const sliderInputId = useId();

  // Selected assignment
  const [selectedAssignmentId, setSelectedAssignmentId] = useState<string>('asg-1');
  const assignment =
    ASSIGNMENT_OPTIONS.find((a) => a.id === selectedAssignmentId) || ASSIGNMENT_OPTIONS[0];

  // Phase: 'before' | 'after' | 'compare'
  const [phase, setPhase] = useState<PulsePhase>('after');

  // Interactive scrubber slider between Before (0) and After (100)
  // When in compare/scrubber mode, sliderValue blends the two states
  const [scrubberValue, setScrubberValue] = useState<number>(100);

  // Confidence Filter threshold slider (0 to 100)
  const [thresholdFilter, setThresholdFilter] = useState<number>(60);
  const [showThresholdControl, setShowThresholdControl] = useState<boolean>(false);

  // Selected emoji to inspect students
  const [selectedEmojiFilter, setSelectedEmojiFilter] = useState<string | null>(null);

  // Interactive Live simulation state
  const [isPollLive, setIsPollLive] = useState<boolean>(false);
  const [pollCountdown, setPollCountdown] = useState<number>(60);
  const [reactionToast, setReactionToast] = useState<string | null>(null);

  // Dynamic user reactions added during session
  const [customReactions, setCustomReactions] = useState<{ [key: string]: number }>({
    mastery: 0,
    confident: 0,
    unsure: 0,
    stressed: 0,
    lost: 0,
  });

  // Calculate live counts based on phase and scrubber
  const getEmojiCount = (categoryKey: string): number => {
    const beforeCount =
      assignment.beforeStats[categoryKey as keyof typeof assignment.beforeStats] || 0;
    const afterCount =
      assignment.afterStats[categoryKey as keyof typeof assignment.afterStats] || 0;
    const addedCount = customReactions[categoryKey] || 0;

    if (phase === 'before') {
      return beforeCount + addedCount;
    }
    if (phase === 'after') {
      return afterCount + addedCount;
    }
    // 'compare' or scrubber interpolation
    const ratio = scrubberValue / 100;
    const interpolated = Math.round(beforeCount * (1 - ratio) + afterCount * ratio);
    return interpolated + addedCount;
  };

  const totalCalculatedStudents = EMOJI_CATEGORIES.reduce(
    (acc, cat) => acc + getEmojiCount(cat.id),
    0
  );

  // Weighted confidence score 0 to 100
  const totalWeightedScore = EMOJI_CATEGORIES.reduce((acc, cat) => {
    const count = getEmojiCount(cat.id);
    return acc + count * cat.weight;
  }, 0);

  const overallConfidenceLevel =
    totalCalculatedStudents > 0 ? Math.round(totalWeightedScore / totalCalculatedStudents) : 50;

  // Baseline Before & After static calculations for comparison
  const beforeTotalScore = EMOJI_CATEGORIES.reduce((acc, cat) => {
    const count = assignment.beforeStats[cat.id as keyof typeof assignment.beforeStats] || 0;
    return acc + count * cat.weight;
  }, 0);
  const beforeConfidence = Math.round(beforeTotalScore / assignment.totalStudents);

  const afterTotalScore = EMOJI_CATEGORIES.reduce((acc, cat) => {
    const count = assignment.afterStats[cat.id as keyof typeof assignment.afterStats] || 0;
    return acc + count * cat.weight;
  }, 0);
  const afterConfidence = Math.round(afterTotalScore / assignment.totalStudents);
  const deltaGain = afterConfidence - beforeConfidence;

  // Live poll countdown timer effect
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    if (isPollLive && pollCountdown > 0) {
      interval = setInterval(() => {
        setPollCountdown((prev) => {
          if (prev <= 1) {
            setIsPollLive(false);
            setReactionToast('Live Pulse Check complete! 42 student reactions synchronized.');
            return 60;
          }
          // Random incoming vote simulation every 3-5 seconds
          if (prev % 3 === 0) {
            const keys = ['mastery', 'confident', 'unsure'];
            const randomKey = keys[Math.floor(Math.random() * keys.length)];
            setCustomReactions((cr) => ({ ...cr, [randomKey]: cr[randomKey] + 1 }));
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPollLive, pollCountdown]);

  // Toast cleanup
  useEffect(() => {
    if (reactionToast) {
      const timer = setTimeout(() => setReactionToast(null), 3500);
      return () => clearTimeout(timer);
    }
  }, [reactionToast]);

  // Teacher quick adds a reaction
  const handleTeacherQuickAddReaction = (categoryId: string, label: string) => {
    setCustomReactions((prev) => ({
      ...prev,
      [categoryId]: prev[categoryId] + 1,
    }));
    setReactionToast(`Logged new student reaction: ${label.split('/')[0].trim()} (Class Pulse updated)`);
  };

  const handleResetReactions = () => {
    setCustomReactions({
      mastery: 0,
      confident: 0,
      unsure: 0,
      stressed: 0,
      lost: 0,
    });
    setReactionToast('Student reaction baseline reset.');
  };

  // Determine sentiment tier
  const getSentimentTier = (score: number) => {
    if (score >= 80)
      return {
        label: 'High Cognitive Flow & Readiness',
        color: 'text-emerald-600 dark:text-emerald-400',
        badge: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950 dark:text-emerald-300',
        heartbeatRate: 'animate-pulse',
        advice: 'Excellent readiness! Most students possess working models to tackle challenging problems.',
      };
    if (score >= 65)
      return {
        label: 'Steady Comprehension (Minor Doubts)',
        color: 'text-blue-600 dark:text-blue-400',
        badge: 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-950 dark:text-blue-300',
        heartbeatRate: 'animate-pulse',
        advice: 'Adequate grounding. Focus exit review on boundary cases and sign conventions.',
      };
    if (score >= 50)
      return {
        label: 'Moderate Friction & Ambiguity',
        color: 'text-amber-600 dark:text-amber-400',
        badge: 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950 dark:text-amber-300',
        heartbeatRate: 'animate-pulse',
        advice: 'Significant segment lacks confidence. Provide scaffolded formula cards before timed tasks.',
      };
    return {
      label: 'High Anxiety / Concept Bottlenecks',
      color: 'text-rose-600 dark:text-rose-400',
      badge: 'bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-950 dark:text-rose-300',
      heartbeatRate: 'animate-ping',
      advice: 'Urgent intervention recommended. Pause independent testing and review foundational concepts with concrete manipulatives.',
    };
  };

  const sentimentTier = getSentimentTier(overallConfidenceLevel);

  // Filter students based on selected category or threshold
  const filteredStudents = MOCK_SAMPLE_STUDENTS.filter((st) => {
    if (selectedEmojiFilter) {
      const activeStage = phase === 'before' ? st.beforeStage : st.afterStage;
      return activeStage === selectedEmojiFilter;
    }
    if (showThresholdControl) {
      const activeScore = phase === 'before' ? st.beforeScore : st.afterScore;
      return activeScore <= thresholdFilter;
    }
    return true;
  });

  return (
    <section
      id="class-confidence-pulse-meter"
      aria-label="Class Real-Time Confidence Pulse Meter"
      className={`rounded-3xl border shadow-xs p-5 md:p-6 space-y-5 transition-all duration-300 relative overflow-hidden ${
        style === 'command-dark'
          ? 'bg-[#0E1524] border-slate-800 text-slate-100 shadow-cyan-950/20'
          : style === 'academic-warm'
          ? 'bg-[#FAF7F2] border-[#E6DFD3] text-[#28231D]'
          : style === 'editorial-command'
          ? 'bg-white border-[#DDD4C7] text-[#1C232B] shadow-2xs'
          : 'bg-white border-slate-200/90 text-slate-900'
      }`}
    >
      {/* Decorative ambient pulse spot */}
      <div
        className={`absolute -top-12 -right-12 w-48 h-48 rounded-full blur-3xl pointer-events-none ${
          overallConfidenceLevel >= 75
            ? 'bg-emerald-500/10'
            : overallConfidenceLevel >= 55
            ? 'bg-blue-500/10'
            : 'bg-rose-500/15'
        }`}
      />

      {/* Floating Toast Notification */}
      {reactionToast && (
        <div className="absolute top-4 right-4 z-50 flex items-center gap-2 bg-slate-900/95 text-white text-xs font-bold px-3.5 py-2 rounded-xl shadow-lg border border-slate-700 animate-in fade-in slide-in-from-top-2">
          <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span>{reactionToast}</span>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TOP HEADER: TITLE, ASSIGNMENT SELECTOR, LIVE POLL TRIGGER, PHASE SWITCHER */}
      {/* ========================================================================= */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800/80">
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2.5">
            <div
              className={`w-8 h-8 rounded-xl flex items-center justify-center shadow-xs ${
                style === 'command-dark'
                  ? 'bg-cyan-950 text-cyan-400 border border-cyan-800'
                  : style === 'academic-warm'
                  ? 'bg-[#F2EAE1] text-[#8C4A2F]'
                  : style === 'editorial-command'
                  ? 'bg-[#E5F2EE] text-[#246257] border border-[#BFDFD6]'
                  : 'bg-rose-50 text-rose-600 border border-rose-100'
              }`}
            >
              <HeartPulse className="w-4 h-4 animate-pulse" />
            </div>

            <h2 className={`text-base font-black tracking-tight flex items-center gap-2 ${style === 'editorial-command' ? 'font-serif text-xl font-normal text-[#1C232B]' : ''}`}>
              Class Real-Time Confidence Pulse
            </h2>

            {/* Live status badge */}
            <span
              className={`inline-flex items-center gap-1.5 text-[11px] font-extrabold px-2.5 py-0.5 rounded-full border shadow-2xs ${
                isPollLive
                  ? 'bg-rose-500 text-white border-rose-600 animate-pulse'
                  : style === 'command-dark'
                  ? 'bg-cyan-950 text-cyan-300 border-cyan-800'
                  : style === 'academic-warm'
                  ? 'bg-[#EFE9E0] text-[#8C4A2F] border-[#DDD3C5]'
                  : style === 'editorial-command'
                  ? 'bg-[#E5F2EE] text-[#246257] border-[#BFDFD6] font-mono text-[10px]'
                  : 'bg-blue-50 text-blue-700 border-blue-200'
              }`}
            >
              <Radio className={`w-3 h-3 ${isPollLive ? 'animate-spin' : ''}`} />
              {isPollLive ? `Live Poll: ${pollCountdown}s Remaining` : 'Exit Ticket & Pre-Flight Pulse'}
            </span>
          </div>

          <p
            className={`text-xs ${
              style === 'command-dark'
                ? 'text-slate-400'
                : style === 'academic-warm'
                ? 'text-[#7D7363]'
                : style === 'editorial-command'
                ? 'text-[#5C6670]'
                : 'text-slate-500'
            }`}
          >
            Track student emotional state and concept self-efficacy before vs after assignments via instant confidence micro-reactions.
          </p>
        </div>

        {/* Action Controls: Assignment selector & Live poll trigger */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Assignment Selector Dropdown */}
          <div className="relative">
            <select
              value={selectedAssignmentId}
              onChange={(e) => setSelectedAssignmentId(e.target.value)}
              className={`text-xs font-bold pl-3 pr-8 py-1.5 rounded-xl border appearance-none cursor-pointer focus:outline-none focus:ring-2 transition ${
                style === 'command-dark'
                  ? 'bg-slate-900 border-slate-700 text-slate-200 focus:ring-cyan-500'
                  : style === 'academic-warm'
                  ? 'bg-[#FAF7F2] border-[#D6CDBC] text-[#28231D] focus:ring-[#8C4A2F]'
                  : style === 'editorial-command'
                  ? 'bg-[#FAF7F0] border-[#DDD4C7] text-[#1C232B] focus:ring-[#246257]'
                  : 'bg-slate-50 border-slate-200 text-slate-700 focus:ring-blue-500'
              }`}
            >
              {ASSIGNMENT_OPTIONS.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {opt.title}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none opacity-50" />
          </div>

          {/* Quick Launch 60s Live Poll Button */}
          <button
            onClick={() => {
              if (isPollLive) {
                setIsPollLive(false);
                setPollCountdown(60);
              } else {
                setIsPollLive(true);
                setReactionToast('60-Second Pulse Poll launched on 42 student tablets!');
              }
            }}
            className={`inline-flex items-center gap-1.5 text-xs font-black px-3 py-1.5 rounded-xl shadow-xs transition cursor-pointer ${
              isPollLive
                ? 'bg-rose-600 text-white hover:bg-rose-700'
                : style === 'command-dark'
                ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white hover:from-cyan-500 hover:to-blue-500'
                : style === 'academic-warm'
                ? 'bg-[#8C4A2F] text-white hover:bg-[#783E26]'
                : style === 'editorial-command'
                ? 'bg-[#246257] text-white hover:bg-[#1C4E45] font-semibold'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            <Send className="w-3.5 h-3.5" />
            <span>{isPollLive ? 'Stop Poll' : 'Launch 60s Poll'}</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* PHASE CONTROLLER: BEFORE ASSIGNMENT vs AFTER ASSIGNMENT vs COMPARISON      */}
      {/* ========================================================================= */}
      <div className={`flex flex-wrap items-center justify-between gap-3 p-2 rounded-2xl border transition-colors ${
        style === 'editorial-command'
          ? 'bg-[#FAF7F0] border-[#DDD4C7]'
          : 'bg-slate-50 dark:bg-slate-900/60 border-slate-200/70 dark:border-slate-800'
      }`}>
        <div className="flex items-center gap-1.5">
          <span className={`text-[11px] font-black uppercase tracking-wider px-2 ${
            style === 'editorial-command' ? 'text-[#7C7267] font-mono text-[10px]' : 'text-slate-400'
          }`}>
            Pulse Phase:
          </span>

          {/* Tab 1: Before Assignment */}
          <button
            id="phase-btn-before"
            onClick={() => {
              setPhase('before');
              setScrubberValue(0);
            }}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black transition cursor-pointer ${
              phase === 'before'
                ? style === 'command-dark'
                  ? 'bg-cyan-500 text-slate-950 shadow-xs'
                  : style === 'academic-warm'
                  ? 'bg-[#8C4A2F] text-white shadow-xs'
                  : style === 'editorial-command'
                  ? 'bg-white text-[#1C232B] shadow-2xs border border-[#DDD4C7] font-semibold'
                  : 'bg-white text-blue-700 shadow-xs border border-blue-200'
                : style === 'editorial-command'
                ? 'text-[#5C6670] hover:text-[#1C232B]'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Before Assignment</span>
            <span className="text-[10px] opacity-80 font-normal">({beforeConfidence}%)</span>
          </button>

          {/* Tab 2: After Assignment */}
          <button
            id="phase-btn-after"
            onClick={() => {
              setPhase('after');
              setScrubberValue(100);
            }}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black transition cursor-pointer ${
              phase === 'after'
                ? style === 'command-dark'
                  ? 'bg-emerald-500 text-slate-950 shadow-xs'
                  : style === 'academic-warm'
                  ? 'bg-[#15803D] text-white shadow-xs'
                  : style === 'editorial-command'
                  ? 'bg-[#246257] text-white shadow-2xs font-semibold'
                  : 'bg-white text-emerald-700 shadow-xs border border-emerald-200'
                : style === 'editorial-command'
                ? 'text-[#5C6670] hover:text-[#1C232B]'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>After Assignment</span>
            <span className="text-[10px] opacity-80 font-normal">({afterConfidence}%)</span>
          </button>

          {/* Tab 3: Interactive Shift Comparison */}
          <button
            id="phase-btn-compare"
            onClick={() => {
              setPhase('compare');
            }}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black transition cursor-pointer ${
              phase === 'compare'
                ? style === 'command-dark'
                  ? 'bg-violet-500 text-slate-950 shadow-xs'
                  : style === 'academic-warm'
                  ? 'bg-[#7C2D12] text-white shadow-xs'
                  : style === 'editorial-command'
                  ? 'bg-white text-[#246257] shadow-2xs border border-[#BFDFD6] font-semibold'
                  : 'bg-white text-indigo-700 shadow-xs border border-indigo-200'
                : style === 'editorial-command'
                ? 'text-[#5C6670] hover:text-[#1C232B]'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Interactive Delta Scrub</span>
            <span className={`text-[10px] font-extrabold ${style === 'editorial-command' ? 'text-[#246257]' : 'text-emerald-600 dark:text-emerald-400'}`}>
              +{deltaGain}% Rebound
            </span>
          </button>
        </div>

        {/* Toggle Threshold Filter */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowThresholdControl(!showThresholdControl)}
            className={`inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-xl transition cursor-pointer ${
              showThresholdControl
                ? 'bg-amber-100 text-amber-900 border border-amber-300 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800'
                : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
            }`}
          >
            <Sliders className="w-3 h-3" />
            <span>Sensitivity Slider</span>
            {showThresholdControl ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          </button>

          {Object.values(customReactions).some((v) => v > 0) && (
            <button
              onClick={handleResetReactions}
              title="Reset simulated live votes"
              className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-500 hover:text-rose-600 transition cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset Votes</span>
            </button>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* INTERACTIVE SLIDERS: SCRUBBER SLIDER OR THRESHOLD FILTER SLIDER           */}
      {/* ========================================================================= */}
      {phase === 'compare' && (
        <div className="bg-gradient-to-r from-blue-50/70 via-indigo-50/70 to-emerald-50/70 dark:from-slate-900/90 dark:to-slate-950 p-4 rounded-2xl border border-indigo-100 dark:border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs font-black">
            <span className="flex items-center gap-1.5 text-blue-700 dark:text-blue-300">
              <Clock className="w-3.5 h-3.5" />
              Before Assignment (0% Pre-Test)
            </span>
            <span className="text-indigo-800 dark:text-indigo-300 bg-white/80 dark:bg-slate-800 px-2 py-0.5 rounded-md border border-indigo-200 dark:border-slate-700">
              Interactive Time Scrub: {scrubberValue}% Progress
            </span>
            <span className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-300">
              <CheckCircle2 className="w-3.5 h-3.5" />
              After Assignment (100% Exit Ticket)
            </span>
          </div>

          <div className="relative flex items-center">
            <input
              id="confidence-scrubber-slider"
              type="range"
              min={0}
              max={100}
              step={1}
              value={scrubberValue}
              onChange={(e) => setScrubberValue(Number(e.target.value))}
              aria-label="Drag to scrub confidence shift between before and after assignment"
              className="w-full h-2.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-600 focus:outline-none"
            />
          </div>

          <p className="text-[11px] text-slate-500 dark:text-slate-400 text-center font-medium">
            Drag slider to watch the live redistribution of confidence reactions from pre-test hesitation to post-remediation mastery.
          </p>
        </div>
      )}

      {showThresholdControl && (
        <div className="bg-amber-50/70 dark:bg-amber-950/20 p-4 rounded-2xl border border-amber-200/80 dark:border-amber-900/60 space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-amber-900 dark:text-amber-300">
            <span className="flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
              Filter Students Below Confidence Threshold
            </span>
            <span className="font-mono font-black text-sm bg-amber-100 dark:bg-amber-900/60 px-2 py-0.5 rounded">
              &le; {thresholdFilter}% Confidence
            </span>
          </div>

          <input
            id={sliderInputId}
            type="range"
            min={10}
            max={90}
            step={5}
            value={thresholdFilter}
            onChange={(e) => setThresholdFilter(Number(e.target.value))}
            aria-label="Filter students by minimum confidence threshold"
            className="w-full h-2 bg-amber-200 dark:bg-amber-900/50 rounded-lg appearance-none cursor-pointer accent-amber-600"
          />

          <div className="flex items-center justify-between text-[10px] text-amber-800/80 dark:text-amber-400">
            <span>Strictest Alert (&le;10%)</span>
            <span>Recommended Intervention Benchmark: 60%</span>
            <span>Broad Screen (&le;90%)</span>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2-COLUMN MAIN INSTRUMENT: PULSE GAUGE & EMOJI REACTION SPECTRUM           */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        {/* LEFT: Overall Class Confidence Pulse Meter / Biometric Gauge */}
        <div
          id="confidence-pulse-gauge-card"
          className={`lg:col-span-4 rounded-2xl p-5 border flex flex-col justify-between relative overflow-hidden transition-colors ${
            style === 'command-dark'
              ? 'bg-slate-900/80 border-slate-800'
              : style === 'academic-warm'
              ? 'bg-[#FAF7F2] border-[#E8E2D6]'
              : style === 'editorial-command'
              ? 'bg-[#FAF7F0] border-[#DDD4C7] shadow-2xs'
              : 'bg-slate-50/70 border-slate-200/90'
          }`}
        >
          {/* Subtle top indicator line */}
          <div
            className={`absolute top-0 left-0 h-1.5 w-full ${
              style === 'editorial-command'
                ? 'bg-[#246257]'
                : overallConfidenceLevel >= 75
                ? 'bg-gradient-to-r from-emerald-500 to-teal-400'
                : overallConfidenceLevel >= 55
                ? 'bg-gradient-to-r from-blue-500 to-indigo-400'
                : 'bg-gradient-to-r from-amber-500 to-rose-500'
            }`}
          />

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className={`text-[11px] font-black uppercase tracking-wider ${
                style === 'editorial-command' ? 'text-[#7C7267] font-mono text-[10px]' : 'text-slate-400'
              }`}>
                Composite Pulse Level
              </span>
              <span
                className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                  style === 'editorial-command'
                    ? 'bg-[#E5F2EE] text-[#246257] border-[#BFDFD6] font-mono'
                    : sentimentTier.badge
                }`}
              >
                {phase === 'before'
                  ? 'Pre-Flight Pulse'
                  : phase === 'after'
                  ? 'Post-Exit Pulse'
                  : 'Interpolated State'}
              </span>
            </div>

            {/* Big Score Display with Vital Pulse Waveform */}
            <div className="flex items-baseline gap-2 my-1">
              <span className={`text-5xl font-black tracking-tight ${
                style === 'editorial-command' ? 'font-serif font-normal text-[#1C232B] text-6xl' : ''
              }`}>{overallConfidenceLevel}%</span>
              <span className={`text-xs font-bold ${style === 'editorial-command' ? 'text-[#5C6670] font-mono' : 'text-slate-400'}`}>Class Efficacy</span>

              {phase !== 'before' && (
                <span className={`ml-auto inline-flex items-center text-xs font-black px-2 py-0.5 rounded-full ${
                  style === 'editorial-command'
                    ? 'bg-[#E5F2EE] text-[#246257] border border-[#BFDFD6] font-mono'
                    : 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800'
                }`}>
                  <ArrowUpRight className="w-3 h-3 mr-0.5" />
                  +{deltaGain}% surge
                </span>
              )}
            </div>

            {/* Vital Heartbeat SVG Waveform Visualization */}
            <div className="my-3 py-2 px-3 rounded-xl bg-white/60 dark:bg-slate-950/60 border border-slate-200/60 dark:border-slate-800/80">
              <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 mb-1">
                <span className="flex items-center gap-1">
                  <Activity className="w-3 h-3 text-rose-500 animate-pulse" />
                  Cognitive Rhythm:
                </span>
                <span className="font-mono text-slate-600 dark:text-slate-300">
                  {overallConfidenceLevel > 70 ? 'Optimal (Steady)' : 'Accelerated Friction'}
                </span>
              </div>

              {/* Dynamic SVG cardiac rhythm line */}
              <svg className="w-full h-8 overflow-visible" viewBox="0 0 200 30" fill="none">
                <path
                  d="M 0 15 L 40 15 L 50 5 L 60 25 L 70 8 L 80 20 L 90 15 L 130 15 L 140 2 L 150 28 L 160 10 L 170 18 L 180 15 L 200 15"
                  stroke={overallConfidenceLevel >= 75 ? '#10B981' : overallConfidenceLevel >= 55 ? '#3B82F6' : '#EF4444'}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={sentimentTier.heartbeatRate}
                />
              </svg>
            </div>

            <p className="text-xs font-semibold leading-snug mt-1">{sentimentTier.advice}</p>
          </div>

          {/* Bottom Breakdown Pills */}
          <div className="mt-4 pt-3 border-t border-slate-200/80 dark:border-slate-800 flex items-center justify-between text-xs font-medium">
            <div className="flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-slate-400" />
              <span>
                <strong>{totalCalculatedStudents}</strong> total reactions
              </span>
            </div>
            <span className="text-[11px] font-extrabold text-blue-600 dark:text-cyan-400">
              {phase === 'before' ? 'Baseline Check' : 'Remediation Verified'}
            </span>
          </div>
        </div>

        {/* RIGHT: Emoji Reaction Breakdown Cards & Quick Click Simulator */}
        <div className="lg:col-span-8 flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase tracking-wider text-slate-400">
                Student Micro-Reactions Spectrum
              </span>
              <span className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold px-2 py-0.5 rounded-full">
                Click stage to inspect students
              </span>
            </div>

            <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 hidden sm:inline">
              Tap &ldquo;+&rdquo; to simulate instant tablet response
            </span>
          </div>

          {/* 5 Reaction Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
            {EMOJI_CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              const count = getEmojiCount(cat.id);
              const percentage =
                totalCalculatedStudents > 0
                  ? Math.round((count / totalCalculatedStudents) * 100)
                  : 0;
              const isSelected = selectedEmojiFilter === cat.id;

              return (
                <div
                  key={cat.id}
                  id={`emoji-card-${cat.id}`}
                  onClick={() => {
                    setSelectedEmojiFilter(isSelected ? null : cat.id);
                  }}
                  className={`p-3 rounded-2xl border transition-all cursor-pointer relative group flex flex-col justify-between ${
                    isSelected
                      ? 'ring-2 ring-blue-500 dark:ring-cyan-400 shadow-md scale-[1.02]'
                      : 'hover:border-slate-300 dark:hover:border-slate-700'
                  } ${
                    style === 'command-dark'
                      ? `${cat.bgDark} ${cat.borderDark}`
                      : `${cat.bgLight} ${cat.borderLight}`
                  }`}
                >
                  {/* Top Bar with Icon & Counter */}
                  <div className="flex items-start justify-between">
                    <div className="p-1 rounded-lg">
                      <Icon className="w-6 h-6 transform transition group-hover:scale-110" />
                    </div>

                    {/* Quick Add Vote Button for Teacher Simulator */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleTeacherQuickAddReaction(cat.id, cat.label);
                      }}
                      title={`Simulate 1 more student reacting with ${cat.label}`}
                      className="w-5 h-5 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 flex items-center justify-center text-xs font-black hover:bg-blue-600 hover:text-white transition cursor-pointer shadow-2xs"
                    >
                      +
                    </button>
                  </div>

                  {/* Label & Numbers */}
                  <div className="mt-2 space-y-0.5">
                    <div className="flex items-baseline justify-between">
                      <span className="text-lg font-black tracking-tight">{count}</span>
                      <span className="text-xs font-bold text-slate-500">{percentage}%</span>
                    </div>

                    <div className="text-[11px] font-black truncate">{cat.label.split('/')[0]}</div>
                    <div className="text-[9px] text-slate-500 dark:text-slate-400 line-clamp-1">
                      {cat.shortDesc}
                    </div>
                  </div>

                  {/* Mini Progress Bar */}
                  <div className="mt-2 w-full bg-slate-200/70 dark:bg-slate-800 rounded-full h-1.5 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${percentage}%`,
                        backgroundColor: cat.color,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Summary Pill Bar */}
          <div className="bg-slate-100/70 dark:bg-slate-900/60 p-2.5 rounded-xl flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-slate-700 dark:text-slate-300">
                Key Shift Insight:
              </span>
              <span className="text-slate-600 dark:text-slate-400">
                {phase === 'before'
                  ? 'Before assignment, 13 students (31%) were in the Apprehensive or Roadblocked zone.'
                  : 'After remediation, 34 of 42 students (81%) now report Mastered or Confident readiness!'}
              </span>
            </div>

            {selectedEmojiFilter && (
              <button
                onClick={() => setSelectedEmojiFilter(null)}
                className="text-[11px] font-black text-blue-600 dark:text-cyan-400 hover:underline cursor-pointer"
              >
                Clear Filter
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* EXPANDABLE ROSTER: STUDENTS MATCHING CURRENT FILTER OR LOW CONFIDENCE     */}
      {/* ========================================================================= */}
      {(selectedEmojiFilter || showThresholdControl) && (
        <div className="mt-3 pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3 animate-in fade-in slide-in-from-top-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-blue-600 dark:text-cyan-400" />
              <h3 className="text-xs font-black uppercase tracking-wider">
                {selectedEmojiFilter
                  ? `Students with ${EMOJI_CATEGORIES.find((c) => c.id === selectedEmojiFilter)?.label.split('/')[0]} Status`
                  : `Students with Confidence &le; ${thresholdFilter}%`}
              </h3>
              <span className="text-[10px] font-bold bg-slate-200 dark:bg-slate-800 px-2 py-0.5 rounded-full">
                {filteredStudents.length} Students
              </span>
            </div>

            <button
              onClick={() => {
                setSelectedEmojiFilter(null);
                setShowThresholdControl(false);
              }}
              className="text-xs font-bold text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 cursor-pointer"
            >
              Close Roster
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {filteredStudents.map((st) => {
              const BeforeIcon = EMOJI_CATEGORIES.find((c) => c.id === st.beforeStage)?.icon || Sparkles;
              const AfterIcon = EMOJI_CATEGORIES.find((c) => c.id === st.afterStage)?.icon || Sparkles;
              const beforeColor = EMOJI_CATEGORIES.find((c) => c.id === st.beforeStage)?.textColor || 'text-slate-500';
              const afterColor = EMOJI_CATEGORIES.find((c) => c.id === st.afterStage)?.textColor || 'text-slate-500';

              return (
                <div
                  key={st.id}
                  className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 shadow-2xs space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img
                        src={st.avatar}
                        alt={st.name}
                        referrerPolicy="no-referrer"
                        className="w-7 h-7 rounded-full object-cover border border-slate-200"
                      />
                      <div>
                        <div className="text-xs font-bold truncate max-w-[110px]">{st.name}</div>
                        <div className="text-[10px] text-slate-400 font-mono">{st.rollNumber}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1">
                      <BeforeIcon className={`w-4 h-4 ${beforeColor}`} />
                      <ArrowRight className="w-3 h-3 text-slate-400" />
                      <AfterIcon className={`w-4 h-4 ${afterColor}`} />
                    </div>
                  </div>

                  <div className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-tight bg-slate-50 dark:bg-slate-950 p-1.5 rounded-lg border border-slate-100 dark:border-slate-800/60">
                    {st.note}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
};
