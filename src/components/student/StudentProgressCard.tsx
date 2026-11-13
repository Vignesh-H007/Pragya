import React from 'react';
import { StudentAgeTier } from '../../types';
import { TrendingUp, Award, Zap } from 'lucide-react';

interface StudentProgressCardProps {
  tier: StudentAgeTier;
}

export const StudentProgressCard: React.FC<StudentProgressCardProps> = ({ tier }) => {
  const config = {
    primary: {
      title: "Today's Progress",
      percentage: 70,
      feedback: 'Great Job!',
      subFeedback: 'Keep going!',
      strokeColor: '#F59E0B',
      cardBg: 'bg-white/95 border-2 border-amber-200/60',
      titleColor: 'text-slate-800',
    },
    middle: {
      title: 'Your Progress',
      percentage: 75,
      feedback: 'Keep Going!',
      subFeedback: "You're doing great!",
      strokeColor: '#10B981',
      cardBg: 'bg-white border border-emerald-200/80',
      titleColor: 'text-slate-800',
    },
    high: {
      title: 'Study Progress',
      percentage: 82,
      feedback: 'Excellent!',
      subFeedback: 'Stay consistent!',
      strokeColor: '#6366F1',
      cardBg: 'bg-slate-900/95 border border-slate-800 text-white',
      titleColor: 'text-slate-100',
    },
  }[tier];

  // SVG Circular Ring math
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (config.percentage / 100) * circumference;

  return (
    <div className={`p-4 rounded-3xl shadow-sm transition-colors duration-300 ${config.cardBg}`}>
      <h3 className={`text-xs font-bold tracking-tight mb-3 ${config.titleColor}`}>
        {config.title}
      </h3>

      <div className="flex items-center gap-4">
        {/* Radial Progress Ring */}
        <div className="relative w-20 h-20 shrink-0 flex items-center justify-center">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
            {/* Background ring */}
            <circle
              cx="50"
              cy="50"
              r={radius}
              fill="transparent"
              stroke={tier === 'high' ? '#1E293B' : '#F1F5F9'}
              strokeWidth="8"
            />
            {/* Value ring */}
            <circle
              cx="50"
              cy="50"
              r={radius}
              fill="transparent"
              stroke={config.strokeColor}
              strokeWidth="8"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="transition-all duration-1000 ease-out"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-sm font-black tracking-tight">{config.percentage}%</span>
          </div>
        </div>

        {/* Motivational badge */}
        <div>
          <p className="text-xs font-bold leading-tight">{config.feedback}</p>
          <p className={`text-[11px] font-medium mt-0.5 ${tier === 'high' ? 'text-indigo-300' : 'text-slate-500'}`}>
            {config.subFeedback}
          </p>

          <div className="mt-2 flex items-center gap-1.5">
            <span
              className={`inline-block w-2 h-2 rounded-full animate-pulse ${
                tier === 'primary' ? 'bg-amber-400' : tier === 'middle' ? 'bg-emerald-400' : 'bg-indigo-400'
              }`}
            />
            <span className="text-[10px] font-semibold text-slate-400">
              Daily goal on track
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
