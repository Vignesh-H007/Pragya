import React from 'react';
import { StudentAgeTier } from '../../types';
import { Clock, Play, Sparkles, BookOpen, Compass, ChevronRight } from 'lucide-react';

interface StudentRecommendationsCardProps {
  tier: StudentAgeTier;
  onSelectCourse?: (courseTitle: string) => void;
}

export const StudentRecommendationsCard: React.FC<StudentRecommendationsCardProps> = ({
  tier,
  onSelectCourse,
}) => {
  const recommendationsByTier = {
    primary: [
      {
        id: 'r1',
        title: 'The Solar System',
        meta: 'Science • Class 4',
        duration: '10 min',
        iconBg: 'bg-amber-100 text-amber-700 border-amber-200',
        emoji: '🪐',
      },
      {
        id: 'r2',
        title: 'Fun with Fractions',
        meta: 'Math • Class 4',
        duration: '8 min',
        iconBg: 'bg-blue-100 text-blue-700 border-blue-200',
        emoji: '🧩',
      },
      {
        id: 'r3',
        title: 'Amazing Animals',
        meta: 'EVS • Class 4',
        duration: '7 min',
        iconBg: 'bg-emerald-100 text-emerald-700 border-emerald-200',
        emoji: '🦁',
      },
    ],
    middle: [
      {
        id: 'r1',
        title: 'Photosynthesis Explained',
        meta: 'Science • Class 7',
        duration: '12 min',
        iconBg: 'bg-emerald-100 text-emerald-700 border-emerald-200',
        emoji: '🌱',
      },
      {
        id: 'r2',
        title: 'Linear Equations',
        meta: 'Math • Class 7',
        duration: '10 min',
        iconBg: 'bg-blue-100 text-blue-700 border-blue-200',
        emoji: '📐',
      },
      {
        id: 'r3',
        title: 'The Wonder of Space',
        meta: 'Social Science • Class 7',
        duration: '9 min',
        iconBg: 'bg-indigo-100 text-indigo-700 border-indigo-200',
        emoji: '🔭',
      },
    ],
    high: [
      {
        id: 'r1',
        title: 'Laws of Motion',
        meta: 'Physics • Class 10',
        duration: '15 min',
        iconBg: 'bg-blue-950 text-blue-400 border-blue-800',
        emoji: '⚛️',
      },
      {
        id: 'r2',
        title: 'Organic Chemistry Basics',
        meta: 'Chemistry • Class 10',
        duration: '12 min',
        iconBg: 'bg-pink-950 text-pink-400 border-pink-800',
        emoji: '🧪',
      },
      {
        id: 'r3',
        title: 'Human Physiology',
        meta: 'Biology • Class 10',
        duration: '10 min',
        iconBg: 'bg-emerald-950 text-emerald-400 border-emerald-800',
        emoji: '🧬',
      },
    ],
  }[tier];

  const styles = {
    primary: {
      cardBg: 'bg-white/95 border-2 border-rose-200/60',
      titleColor: 'text-slate-800',
      itemHover: 'hover:bg-rose-50/60 border-slate-100',
    },
    middle: {
      cardBg: 'bg-white border border-emerald-200/80',
      titleColor: 'text-slate-800',
      itemHover: 'hover:bg-emerald-50/50 border-slate-100',
    },
    high: {
      cardBg: 'bg-slate-900/95 border border-slate-800 text-slate-100',
      titleColor: 'text-slate-100',
      itemHover: 'hover:bg-slate-800/60 border-slate-800',
    },
  }[tier];

  return (
    <div className={`p-4 rounded-3xl shadow-sm transition-colors duration-300 ${styles.cardBg}`}>
      <h3 className={`text-xs font-bold tracking-tight mb-3 ${styles.titleColor}`}>
        Recommended for You
      </h3>

      <div className="space-y-2.5">
        {recommendationsByTier.map((item) => (
          <div
            key={item.id}
            onClick={() => onSelectCourse?.(item.title)}
            className={`flex items-center gap-3 p-2 rounded-2xl border transition-all cursor-pointer hover:scale-[1.02] active:scale-[0.98] ${styles.itemHover}`}
            title="Start gamified quest for this course"
          >
            {/* Thumbnail */}
            <div
              className={`w-10 h-10 rounded-xl border flex items-center justify-center text-lg shrink-0 ${item.iconBg}`}
            >
              <span>{item.emoji}</span>
            </div>

            {/* Content info */}
            <div className="flex-1 min-w-0">
              <p className={`text-xs font-bold truncate ${tier === 'high' ? 'text-slate-200' : 'text-slate-800'}`}>
                {item.title}
              </p>
              <div className="flex items-center gap-2 mt-0.5">
                <span className={`text-[10px] ${tier === 'high' ? 'text-slate-400' : 'text-slate-500'}`}>
                  {item.meta}
                </span>
                <span className="text-slate-300 text-[10px]">•</span>
                <span className={`text-[10px] flex items-center gap-0.5 ${tier === 'high' ? 'text-indigo-300' : 'text-slate-500'}`}>
                  <Clock className="w-2.5 h-2.5" />
                  <span>{item.duration}</span>
                </span>
              </div>
            </div>

            <ChevronRight className={`w-3.5 h-3.5 shrink-0 ${tier === 'high' ? 'text-slate-600' : 'text-slate-400'}`} />
          </div>
        ))}
      </div>
    </div>
  );
};
