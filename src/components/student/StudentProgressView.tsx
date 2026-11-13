import React, { useState, useMemo } from 'react';
import { StudentAgeTier } from '../../types';
import {
  TrendingUp,
  Award,
  CheckCircle2,
  Calendar,
  Clock,
  Target,
  Zap,
  ArrowUpRight,
  Sparkles,
  Star,
  Layers,
  ArrowRight,
  BarChart3,
  Activity,
  Flame,
} from 'lucide-react';
import { useDashboardTheme } from '../../context/ThemeContext';

interface StudentProgressViewProps {
  tier: StudentAgeTier;
  activeClass: string;
  activeSubject: string;
  onOpenQuizzes?: () => void;
  onOpenMap?: () => void;
}

export const StudentProgressView: React.FC<StudentProgressViewProps> = ({
  tier,
  activeClass,
  activeSubject,
  onOpenQuizzes,
  onOpenMap,
}) => {
  const { style } = useDashboardTheme();
  const [selectedDay, setSelectedDay] = useState('Thu');

  const weeklyActivity = [
    { day: 'Mon', minutes: 45, sessions: 2, completed: true },
    { day: 'Tue', minutes: 60, sessions: 3, completed: true },
    { day: 'Wed', minutes: 35, sessions: 1, completed: true },
    { day: 'Thu', minutes: 75, sessions: 4, completed: true },
    { day: 'Fri', minutes: 50, sessions: 2, completed: true },
    { day: 'Sat', minutes: 90, sessions: 4, completed: true },
    { day: 'Sun', minutes: 40, sessions: 2, completed: true },
  ];

  const subjectMastery = [
    { name: 'Mathematics', score: 78, change: '+12%', completedLessons: 14, totalLessons: 18 },
    { name: 'Science', score: 85, change: '+8%', completedLessons: 16, totalLessons: 20 },
    { name: 'Social Science', score: 72, change: '+5%', completedLessons: 11, totalLessons: 15 },
    { name: 'English', score: 91, change: '+14%', completedLessons: 15, totalLessons: 16 },
  ];

  const resolvedGaps = [
    { topic: 'Fractions & Common Denominators', status: 'Mastered', date: 'Yesterday', improvement: '+25%' },
    { topic: 'Photosynthesis & Chloroplasts', status: 'Mastered', date: '3 days ago', improvement: '+18%' },
    { topic: 'Triangle Angle Sum Theorem', status: 'In Progress', date: 'Active', improvement: '+10%' },
    { topic: 'Direct & Indirect Speech', status: 'Mastered', date: 'Last week', improvement: '+22%' },
  ];

  // Exact Theme Grading definitions
  const themeGrading = useMemo(() => {
    switch (style) {
      case 'editorial-command':
        return {
          bannerBg: 'bg-[#FAF7F0] border-[#DDD4C7] text-[#1C232B] shadow-xs',
          badge: 'bg-[#246257] text-white',
          subtitleText: 'text-[#5C6670]',
          accentBtn: 'bg-[#246257] hover:bg-[#1C4E45] text-white shadow-xs',
          secondaryBtn: 'bg-white border-[#DDD4C7] text-[#1C232B] hover:bg-[#F4EFEA]',
          cardBase: 'bg-white border-[#DDD4C7] text-[#1C232B] shadow-xs',
          statBox: 'bg-[#FAF7F0] border-[#DDD4C7] text-[#1C232B]',
          barDefault: 'bg-[#DDD4C7]',
          barActive: 'bg-[#246257]',
          barHover: 'hover:bg-[#246257]/80',
          progressTrack: 'bg-[#DDD4C7]/60',
          progressFill: 'bg-[#246257]',
          highlightColor: 'text-[#246257]',
          iconAccent: 'text-[#C85340]',
          metricBorder: 'border-[#DDD4C7]',
        };
      case 'obsidian-dark':
      case 'command-dark':
        return {
          bannerBg: 'bg-[#0D0F17]/90 border-white/[0.08] text-white shadow-2xl shadow-black/80 backdrop-blur-xl',
          badge: 'bg-white/[0.08] text-white border border-white/15',
          subtitleText: 'text-[#8E95A5]',
          accentBtn: 'bg-white text-slate-950 font-black hover:bg-slate-200 shadow-md shadow-white/10',
          secondaryBtn: 'bg-white/[0.04] border-white/10 text-white hover:bg-white/[0.08]',
          cardBase: 'bg-[#0D0F17]/90 border-white/[0.08] text-white shadow-2xl shadow-black/80 backdrop-blur-xl',
          statBox: 'bg-white/[0.04] border-white/10 text-white',
          barDefault: 'bg-white/[0.08]',
          barActive: 'bg-gradient-to-t from-amber-500 to-amber-400 shadow-[0_0_12px_rgba(245,158,11,0.5)]',
          barHover: 'hover:bg-white/20',
          progressTrack: 'bg-white/[0.08]',
          progressFill: 'bg-gradient-to-r from-amber-500 via-emerald-400 to-cyan-400',
          highlightColor: 'text-amber-400',
          iconAccent: 'text-amber-400',
          metricBorder: 'border-white/10',
        };
      case 'academic-warm':
        return {
          bannerBg: 'bg-[#FFFDFB] border-[#E6DFD3] text-[#28231D] shadow-xs',
          badge: 'bg-[#8C4A2F] text-white',
          subtitleText: 'text-[#5C5346]',
          accentBtn: 'bg-[#8C4A2F] hover:bg-[#783E26] text-white shadow-xs',
          secondaryBtn: 'bg-[#F5F1E9] border-[#E2DBD0] text-[#28231D] hover:bg-[#EAE4D8]',
          cardBase: 'bg-[#FFFDFB] border-[#E6DFD3] text-[#28231D] shadow-xs',
          statBox: 'bg-[#FAF7F2] border-[#E6DFD3] text-[#28231D]',
          barDefault: 'bg-[#E2DBD0]',
          barActive: 'bg-[#8C4A2F]',
          barHover: 'hover:bg-[#8C4A2F]/80',
          progressTrack: 'bg-[#E2DBD0]',
          progressFill: 'bg-[#8C4A2F]',
          highlightColor: 'text-[#8C4A2F]',
          iconAccent: 'text-[#B45309]',
          metricBorder: 'border-[#E6DFD3]',
        };
      case 'clean':
      default:
        return {
          bannerBg: 'bg-white border-slate-200 text-slate-900 shadow-xs',
          badge: 'bg-blue-600 text-white',
          subtitleText: 'text-slate-500',
          accentBtn: 'bg-blue-600 hover:bg-blue-700 text-white shadow-xs',
          secondaryBtn: 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-slate-100',
          cardBase: 'bg-white border-slate-200 text-slate-900 shadow-xs',
          statBox: 'bg-slate-50 border-slate-200 text-slate-800',
          barDefault: 'bg-slate-200',
          barActive: 'bg-blue-600',
          barHover: 'hover:bg-blue-500',
          progressTrack: 'bg-slate-200',
          progressFill: 'bg-blue-600',
          highlightColor: 'text-blue-600',
          iconAccent: 'text-amber-500',
          metricBorder: 'border-slate-200',
        };
    }
  }, [style]);

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* 1. Header Banner - Theme Graded */}
      <div className={`p-6 rounded-3xl border transition-all duration-200 ${themeGrading.bannerBg}`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-black tracking-wide shadow-2xs w-fit">
              <span className={`px-2 py-0.5 rounded-md ${themeGrading.badge}`}>
                {activeClass}
              </span>
              <span className="font-bold opacity-80">Mastery & Growth Tracker</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black tracking-tight">
              Learning Progress & Analytics
            </h1>
            <p className={`text-xs md:text-sm max-w-2xl ${themeGrading.subtitleText}`}>
              Track your weekly study streaks, monitor diagnostic learning gap resolutions, and celebrate subject mastery milestones.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className={`px-5 py-3 rounded-2xl border text-center ${themeGrading.statBox}`}>
              <div className="text-[10px] font-bold uppercase opacity-80">Overall Mastery</div>
              <div className={`text-2xl font-black ${themeGrading.highlightColor}`}>81.5%</div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Top 4 KPI Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className={`p-5 rounded-3xl border transition-all ${themeGrading.cardBase}`}>
          <div className="flex items-center justify-between mb-2">
            <span className={`text-xs font-bold ${themeGrading.subtitleText}`}>Weekly Study Time</span>
            <Clock className={`w-4 h-4 ${themeGrading.highlightColor}`} />
          </div>
          <div className="text-2xl font-black">6.5 hrs</div>
          <div className="text-[11px] text-emerald-600 font-bold mt-1.5 flex items-center gap-1">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>+1.5 hrs from last week</span>
          </div>
        </div>

        <div className={`p-5 rounded-3xl border transition-all ${themeGrading.cardBase}`}>
          <div className="flex items-center justify-between mb-2">
            <span className={`text-xs font-bold ${themeGrading.subtitleText}`}>Quizzes Mastered</span>
            <Target className={`w-4 h-4 ${themeGrading.iconAccent}`} />
          </div>
          <div className="text-2xl font-black">28 / 32</div>
          <div className="text-[11px] text-emerald-600 font-bold mt-1.5 flex items-center gap-1">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>87.5% accuracy rate</span>
          </div>
        </div>

        <div className={`p-5 rounded-3xl border transition-all ${themeGrading.cardBase}`}>
          <div className="flex items-center justify-between mb-2">
            <span className={`text-xs font-bold ${themeGrading.subtitleText}`}>Roadblocks Cleared</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black">9 Topics</div>
          <div className="text-[11px] opacity-70 font-semibold mt-1.5">
            Zero critical blockers
          </div>
        </div>

        <div className={`p-5 rounded-3xl border transition-all ${themeGrading.cardBase}`}>
          <div className="flex items-center justify-between mb-2">
            <span className={`text-xs font-bold ${themeGrading.subtitleText}`}>Scholar Quest XP</span>
            <Sparkles className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-black">1,480 XP</div>
          <div className="text-[11px] font-bold mt-1.5 text-amber-500 flex items-center gap-1">
            <Star className="w-3 h-3 fill-current" />
            <span>Scholar Level 4</span>
          </div>
        </div>
      </div>

      {/* 3. Middle Row: Weekly Activity Chart + Subject Mastery */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Activity Heatmap */}
        <div className={`p-6 rounded-3xl border space-y-4 ${themeGrading.cardBase}`}>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <h3 className="font-black text-base flex items-center gap-2">
                <Calendar className={`w-4 h-4 ${themeGrading.highlightColor}`} />
                <span>Weekly Study Activity</span>
              </h3>
              <p className={`text-xs ${themeGrading.subtitleText}`}>Daily minutes engaged on LearnBuddy</p>
            </div>
            <span className={`text-xs font-bold px-2.5 py-1 rounded-lg border ${themeGrading.statBox}`}>
              Total: 395 mins
            </span>
          </div>

          {/* Bar Visualization */}
          <div className="h-44 flex items-end justify-between gap-3 pt-4 px-2">
            {weeklyActivity.map((item) => {
              const heightPercent = Math.round((item.minutes / 90) * 100);
              const isSelected = selectedDay === item.day;
              return (
                <div
                  key={item.day}
                  onClick={() => setSelectedDay(item.day)}
                  className="flex-1 flex flex-col items-center gap-2 h-full justify-end cursor-pointer group"
                >
                  <div className="text-[10px] font-bold opacity-75 group-hover:opacity-100">
                    {item.minutes}m
                  </div>
                  <div className="w-full h-28 rounded-xl bg-black/5 dark:bg-white/5 flex items-end p-1 overflow-hidden">
                    <div
                      className={`w-full rounded-lg transition-all duration-300 ${
                        isSelected ? themeGrading.barActive : `${themeGrading.barDefault} ${themeGrading.barHover}`
                      }`}
                      style={{ height: `${heightPercent}%` }}
                    />
                  </div>
                  <span className={`text-xs font-bold ${isSelected ? themeGrading.highlightColor : 'opacity-70'}`}>
                    {item.day}
                  </span>
                </div>
              );
            })}
          </div>

          <div className={`p-3 rounded-2xl border text-xs font-medium flex items-center justify-between ${themeGrading.statBox}`}>
            <span>Selected {selectedDay}: {weeklyActivity.find(d => d.day === selectedDay)?.sessions} study sessions recorded</span>
            <span className="text-emerald-600 font-bold">Target Achieved</span>
          </div>
        </div>

        {/* Subject Mastery Breakdown */}
        <div className={`p-6 rounded-3xl border space-y-4 ${themeGrading.cardBase}`}>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <h3 className="font-black text-base flex items-center gap-2">
                <BarChart3 className={`w-4 h-4 ${themeGrading.highlightColor}`} />
                <span>Subject Mastery Matrix</span>
              </h3>
              <p className={`text-xs ${themeGrading.subtitleText}`}>Relative strength across curriculum domains</p>
            </div>
            {onOpenMap && (
              <button
                onClick={onOpenMap}
                className={`text-xs font-bold flex items-center gap-1 hover:underline cursor-pointer ${themeGrading.highlightColor}`}
              >
                <span>View Map</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="space-y-4 pt-1">
            {subjectMastery.map((subj) => (
              <div key={subj.name} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span>{subj.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-600 text-[11px]">{subj.change}</span>
                    <span className={themeGrading.highlightColor}>{subj.score}%</span>
                  </div>
                </div>
                <div className={`w-full h-2.5 rounded-full overflow-hidden ${themeGrading.progressTrack}`}>
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${themeGrading.progressFill}`}
                    style={{ width: `${subj.score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          {onOpenQuizzes && (
            <div className="pt-2">
              <button
                onClick={onOpenQuizzes}
                className={`w-full py-2.5 rounded-xl font-bold text-xs transition flex items-center justify-center gap-2 cursor-pointer ${themeGrading.accentBtn}`}
              >
                <span>Take Practice Quiz</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 4. Diagnosed Roadblocks Resolution Table */}
      <div className={`p-6 rounded-3xl border space-y-4 ${themeGrading.cardBase}`}>
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <h3 className="font-black text-base flex items-center gap-2">
              <Activity className={`w-4 h-4 ${themeGrading.iconAccent}`} />
              <span>Diagnosed Learning Roadblocks & Remediation</span>
            </h3>
            <p className={`text-xs ${themeGrading.subtitleText}`}>
              Individual diagnostic concepts identified by LearnBuddy AI Tutor
            </p>
          </div>
        </div>

        <div className="divide-y divide-black/10 dark:divide-white/10">
          {resolvedGaps.map((gap, idx) => (
            <div key={idx} className="py-3 flex items-center justify-between text-xs gap-3">
              <div className="flex items-center gap-3">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                    gap.status === 'Mastered'
                      ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400'
                      : 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400'
                  }`}
                >
                  {gap.status === 'Mastered' ? (
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  ) : (
                    <Clock className="w-3.5 h-3.5" />
                  )}
                </div>
                <div>
                  <div className="font-bold">{gap.topic}</div>
                  <div className={`text-[11px] ${themeGrading.subtitleText}`}>{gap.date}</div>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <span className="text-emerald-400 font-bold">{gap.improvement}</span>
                <span
                  className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase ${
                    gap.status === 'Mastered'
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  }`}
                >
                  {gap.status}
                </span>
                <button
                  onClick={() => {
                    const event = new CustomEvent('pragya_ask_ai_tutor', {
                      detail: {
                        question: `Can we do a 3-minute diagnostic drill on "${gap.topic}"?`,
                      },
                    });
                    window.dispatchEvent(event);
                  }}
                  className="px-2.5 py-1 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-white text-[11px] font-bold transition flex items-center gap-1 cursor-pointer"
                  title="Ask AI Tutor for Practice Drill"
                >
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  <span>Practice</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
