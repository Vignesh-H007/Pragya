import React, { useState, useMemo } from 'react';
import { StudentAgeTier } from '../../types';
import {
  Award,
  Trophy,
  Star,
  Flame,
  Shield,
  Zap,
  Sparkles,
  Lock,
  CheckCircle2,
  Crown,
  Heart,
  BookOpen,
  ArrowRight,
  Filter,
} from 'lucide-react';
import { useDashboardTheme } from '../../context/ThemeContext';

interface StudentAchievementsViewProps {
  tier: StudentAgeTier;
  activeClass: string;
  activeSubject: string;
  onOpenMap?: () => void;
}

interface BadgeItem {
  id: string;
  title: string;
  category: 'biome' | 'academics' | 'streak' | 'special';
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedDate?: string;
  xpValue: number;
}

export const StudentAchievementsView: React.FC<StudentAchievementsViewProps> = ({
  tier,
  activeClass,
  activeSubject,
  onOpenMap,
}) => {
  const { style } = useDashboardTheme();
  const [activeFilter, setActiveFilter] = useState<'all' | 'unlocked' | 'locked'>('all');
  const [activeCategory, setActiveCategory] = useState<'all' | 'biome' | 'academics' | 'streak'>('all');

  const badges: BadgeItem[] = [
    {
      id: 'plains-clear',
      title: 'Plains Overworld Master',
      category: 'biome',
      description: 'Conquered Chapters 1–3 in the green meadows and mastered core foundations.',
      icon: '🌿',
      unlocked: true,
      unlockedDate: 'Sep 12, 2026',
      xpValue: 150,
    },
    {
      id: 'ocean-diver',
      title: 'Ocean Deep Voyager',
      category: 'biome',
      description: 'Navigated the submerged reefs in Chapters 4–6 and unlocked Prismarine treasures.',
      icon: '🌊',
      unlocked: true,
      unlockedDate: 'Sep 16, 2026',
      xpValue: 200,
    },
    {
      id: 'nether-survivor',
      title: 'Nether Flame Conqueror',
      category: 'biome',
      description: 'Survived the trial by fire in Chapters 7–9 with zero misconception penalties.',
      icon: '🔥',
      unlocked: false,
      xpValue: 350,
    },
    {
      id: 'end-dragon',
      title: 'Ender Dragon Scholar',
      category: 'biome',
      description: 'Defeated the syllabus boss capstone exam in the cosmic End dimension.',
      icon: '🐉',
      unlocked: false,
      xpValue: 500,
    },
    {
      id: 'streak-7',
      title: '7-Day Study Streak',
      category: 'streak',
      description: 'Logged in and completed at least one practice lesson 7 days in a row.',
      icon: '⚡',
      unlocked: true,
      unlockedDate: 'Today',
      xpValue: 100,
    },
    {
      id: 'quiz-ace',
      title: 'Accuracy Ace',
      category: 'academics',
      description: 'Scored 100% on three consecutive chapter quizzes without retries.',
      icon: '🎯',
      unlocked: true,
      unlockedDate: 'Sep 14, 2026',
      xpValue: 180,
    },
    {
      id: 'doubt-breaker',
      title: 'Curious Inquirer',
      category: 'academics',
      description: 'Asked AI Tutor 10 targeted questions to dissect difficult homework concepts.',
      icon: '💡',
      unlocked: true,
      unlockedDate: 'Sep 15, 2026',
      xpValue: 120,
    },
    {
      id: 'speed-runner',
      title: 'Speed Calculator',
      category: 'academics',
      description: 'Solved 10 mental math arithmetic problems in under 3 minutes.',
      icon: '⏱️',
      unlocked: false,
      xpValue: 220,
    },
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
          cardUnlocked: 'bg-white border-[#246257]/60 shadow-xs ring-1 ring-[#246257]/20 text-[#1C232B]',
          cardLocked: 'bg-[#FAF7F0]/60 border-[#DDD4C7] opacity-60 text-[#1C232B]',
          statBox: 'bg-[#FAF7F0] border-[#DDD4C7] text-[#1C232B]',
          tagActive: 'bg-[#246257] text-white shadow-xs',
          tagInactive: 'bg-white border-[#DDD4C7] text-[#5C6670] hover:text-[#1C232B]',
          progressTrack: 'bg-[#DDD4C7]/60',
          progressFill: 'bg-[#246257]',
          highlightColor: 'text-[#246257]',
          iconAccent: 'text-[#C85340]',
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
          cardUnlocked: 'bg-[#0D0F17]/90 border-amber-500/40 shadow-2xl shadow-black/80 backdrop-blur-xl ring-1 ring-amber-500/20 text-white',
          cardLocked: 'bg-[#0D0F17]/40 border-white/[0.05] text-[#8E95A5] backdrop-blur-md',
          statBox: 'bg-white/[0.04] border-white/10 text-white',
          tagActive: 'bg-white text-slate-950 font-black shadow-sm',
          tagInactive: 'bg-[#0D0F17]/80 border-white/10 text-[#8E95A5] hover:text-white hover:bg-white/[0.05]',
          progressTrack: 'bg-white/[0.08]',
          progressFill: 'bg-gradient-to-r from-amber-500 to-amber-400',
          highlightColor: 'text-amber-400',
          iconAccent: 'text-amber-400',
        };
      case 'academic-warm':
        return {
          bannerBg: 'bg-[#FFFDFB] border-[#E6DFD3] text-[#28231D] shadow-xs',
          badge: 'bg-[#8C4A2F] text-white',
          subtitleText: 'text-[#5C5346]',
          accentBtn: 'bg-[#8C4A2F] hover:bg-[#783E26] text-white shadow-xs',
          secondaryBtn: 'bg-[#F5F1E9] border-[#E2DBD0] text-[#28231D] hover:bg-[#EAE4D8]',
          cardBase: 'bg-[#FFFDFB] border-[#E6DFD3] text-[#28231D] shadow-xs',
          cardUnlocked: 'bg-[#FFFDFB] border-[#8C4A2F]/60 shadow-xs ring-1 ring-[#8C4A2F]/20 text-[#28231D]',
          cardLocked: 'bg-[#FAF7F2] border-[#E6DFD3] opacity-60 text-[#28231D]',
          statBox: 'bg-[#FAF7F2] border-[#E6DFD3] text-[#28231D]',
          tagActive: 'bg-[#8C4A2F] text-white shadow-xs',
          tagInactive: 'bg-[#FFFDFB] border-[#E6DFD3] text-[#5C5346] hover:text-[#28231D]',
          progressTrack: 'bg-[#E2DBD0]',
          progressFill: 'bg-[#8C4A2F]',
          highlightColor: 'text-[#8C4A2F]',
          iconAccent: 'text-[#B45309]',
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
          cardUnlocked: 'bg-white border-blue-500 shadow-xs ring-1 ring-blue-500/20 text-slate-900',
          cardLocked: 'bg-slate-50 border-slate-200 opacity-60 text-slate-600',
          statBox: 'bg-slate-50 border-slate-200 text-slate-800',
          tagActive: 'bg-blue-600 text-white shadow-xs',
          tagInactive: 'bg-white border-slate-200 text-slate-600 hover:text-slate-900',
          progressTrack: 'bg-slate-200',
          progressFill: 'bg-blue-600',
          highlightColor: 'text-blue-600',
          iconAccent: 'text-amber-500',
        };
    }
  }, [style]);

  const unlockedCount = badges.filter((b) => b.unlocked).length;
  const totalXP = badges.filter((b) => b.unlocked).reduce((sum, b) => sum + b.xpValue, 0);

  const filteredBadges = badges.filter((b) => {
    const matchStatus =
      activeFilter === 'all' ||
      (activeFilter === 'unlocked' && b.unlocked) ||
      (activeFilter === 'locked' && !b.unlocked);
    const matchCat = activeCategory === 'all' || b.category === activeCategory;
    return matchStatus && matchCat;
  });

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
              <span className="font-bold opacity-80">Gamified Hall of Fame</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black tracking-tight">
              Achievements & Quest Badges
            </h1>
            <p className={`text-xs md:text-sm max-w-2xl ${themeGrading.subtitleText}`}>
              Complete syllabus biomes, maintain weekly study streaks, and defeat academic misconceptions to unlock exclusive scholar medals.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className={`px-5 py-3 rounded-2xl border text-center ${themeGrading.statBox}`}>
              <div className="text-[10px] font-bold uppercase opacity-80">Badges Unlocked</div>
              <div className={`text-2xl font-black ${themeGrading.highlightColor}`}>
                {unlockedCount} / {badges.length}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Scholar Level & XP Progress Card */}
      <div className={`p-6 rounded-3xl border space-y-4 ${themeGrading.cardBase}`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl font-black border ${themeGrading.statBox}`}>
              ⭐
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-lg">Scholar Rank: Level 4</span>
                <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-md ${themeGrading.badge}`}>
                  Gold Tier
                </span>
              </div>
              <p className={`text-xs ${themeGrading.subtitleText}`}>
                {totalXP} XP accumulated • 320 XP remaining until Level 5 (Master Scholar)
              </p>
            </div>
          </div>

          {onOpenMap && (
            <button
              onClick={onOpenMap}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer ${themeGrading.accentBtn}`}
            >
              <span>Explore Quest Map</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* XP Bar */}
        <div className="space-y-1">
          <div className="flex justify-between text-xs font-bold">
            <span className="opacity-75">Progress to Next Tier</span>
            <span className={themeGrading.highlightColor}>72%</span>
          </div>
          <div className={`w-full h-3 rounded-full overflow-hidden ${themeGrading.progressTrack}`}>
            <div
              className={`h-full rounded-full transition-all duration-500 ${themeGrading.progressFill}`}
              style={{ width: '72%' }}
            />
          </div>
        </div>
      </div>

      {/* 3. Filters Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Status Filters */}
        <div className="flex items-center gap-1.5 w-full sm:w-auto">
          {[
            { id: 'all', label: 'All Medals' },
            { id: 'unlocked', label: `Unlocked (${unlockedCount})` },
            { id: 'locked', label: `Locked (${badges.length - unlockedCount})` },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id as any)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer border ${
                activeFilter === tab.id ? themeGrading.tagActive : themeGrading.tagInactive
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1">
          {[
            { id: 'all', label: 'All Categories' },
            { id: 'biome', label: 'Biomes' },
            { id: 'academics', label: 'Academics' },
            { id: 'streak', label: 'Streaks' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as any)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer shrink-0 border ${
                activeCategory === cat.id ? themeGrading.tagActive : themeGrading.tagInactive
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* 4. Badges Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredBadges.map((badge) => (
          <div
            key={badge.id}
            className={`p-5 rounded-3xl border transition-all flex flex-col justify-between ${
              badge.unlocked ? themeGrading.cardUnlocked : themeGrading.cardLocked
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-2xs border border-white/10 bg-white/[0.06]">
                  {badge.icon}
                </div>
                {badge.unlocked ? (
                  <span className="text-emerald-400 flex items-center gap-1 text-xs font-black">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Unlocked</span>
                  </span>
                ) : (
                  <span className="text-[#8E95A5] flex items-center gap-1 text-xs font-bold">
                    <Lock className="w-3.5 h-3.5" />
                    <span>Locked</span>
                  </span>
                )}
              </div>

              <h4 className="font-black text-base mb-1">{badge.title}</h4>
              <p className={`text-xs leading-relaxed mb-3 ${themeGrading.subtitleText}`}>
                {badge.description}
              </p>
            </div>

            <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between text-xs font-bold gap-2">
              <span className={`flex items-center gap-1 ${themeGrading.highlightColor}`}>
                <Sparkles className="w-3 h-3" />
                <span>+{badge.xpValue} XP</span>
              </span>

              {badge.unlocked ? (
                badge.unlockedDate && (
                  <span className="opacity-60 text-[11px] font-medium">{badge.unlockedDate}</span>
                )
              ) : (
                <button
                  onClick={() => {
                    const event = new CustomEvent('pragya_ask_ai_tutor', {
                      detail: {
                        question: `How can I earn the "${badge.title}" badge? What chapters or quizzes do I need to complete?`,
                      },
                    });
                    window.dispatchEvent(event);
                  }}
                  className="px-2 py-1 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-white text-[11px] font-bold transition flex items-center gap-1 cursor-pointer"
                  title="Ask AI Tutor how to unlock this medal"
                >
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  <span>How to Unlock</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
