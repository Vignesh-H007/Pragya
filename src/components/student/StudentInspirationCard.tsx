import React from 'react';
import { StudentAgeTier } from '../../types';
import { RocketIllustration } from './StudentIllustrations';
import { Sparkles, Sun } from 'lucide-react';

interface StudentInspirationCardProps {
  tier: StudentAgeTier;
}

export const StudentInspirationCard: React.FC<StudentInspirationCardProps> = ({ tier }) => {
  if (tier === 'primary') {
    return (
      <div className="relative overflow-hidden rounded-3xl p-5 bg-gradient-to-tr from-sky-100 via-amber-50 to-rose-100 border-2 border-amber-200/60 shadow-sm flex items-center justify-between">
        {/* Rocket illustration */}
        <div className="w-20 h-20 shrink-0">
          <RocketIllustration className="w-full h-full object-contain" />
        </div>

        {/* Text */}
        <div className="text-right z-10">
          <p className="text-sm font-black text-sky-700 tracking-wide uppercase">Dream</p>
          <p className="text-sm font-black text-amber-700 tracking-wide uppercase">Learn</p>
          <p className="text-sm font-black text-emerald-700 tracking-wide uppercase">Explore</p>
          <p className="text-base font-black text-rose-600 tracking-wide uppercase flex items-center justify-end gap-1">
            <span>Grow!</span>
            <Sparkles className="w-4 h-4 text-amber-500 fill-amber-400" />
          </p>
        </div>

        {/* Background stars */}
        <div className="absolute top-2 right-1/2 text-amber-400 opacity-60 text-xs">✨</div>
        <div className="absolute bottom-2 left-2 text-rose-400 opacity-60 text-xs">⭐</div>
      </div>
    );
  }

  if (tier === 'middle') {
    return (
      <div className="relative overflow-hidden rounded-3xl p-5 bg-gradient-to-b from-sky-100 via-emerald-50 to-teal-100 border border-emerald-200/80 shadow-sm">
        {/* Sun & Mountain vector art */}
        <div className="flex items-center justify-between">
          <div className="w-10 h-10 rounded-full bg-amber-300 border-2 border-amber-400 flex items-center justify-center shadow-md animate-spin" style={{ animationDuration: '24s' }}>
            <Sun className="w-5 h-5 text-amber-700" />
          </div>

          <div className="text-right">
            <h4 className="text-base font-black text-slate-800 tracking-tight leading-tight">
              Progress
            </h4>
            <p className="text-xs font-bold text-emerald-700">
              Over
            </p>
            <h4 className="text-base font-black text-teal-800 tracking-tight leading-tight">
              Perfection
            </h4>
          </div>
        </div>

        {/* Mountains Silhouette footer */}
        <div className="mt-3 -mx-5 -mb-5 h-16 relative">
          <svg viewBox="0 0 300 100" fill="none" className="w-full h-full preserve-3d" preserveAspectRatio="none">
            <path d="M0 100 L40 40 L100 80 L160 30 L220 70 L270 45 L300 100 Z" fill="#047857" fillOpacity="0.4" />
            <path d="M0 100 L60 60 L120 85 L180 50 L240 75 L300 60 L300 100 Z" fill="#064E3B" fillOpacity="0.7" />
          </svg>
        </div>
      </div>
    );
  }

  // High School
  return (
    <div className="relative overflow-hidden rounded-3xl p-5 bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-950 border border-slate-800 shadow-xl text-white">
      {/* Night Sky & Mountain Vector */}
      <div className="relative z-10">
        <h4 className="text-lg font-black tracking-tight text-white leading-tight">
          A Brighter You Awaits.
        </h4>
        <p className="text-xs text-indigo-300 mt-1 font-medium">
          Excellence is a continuous habit, not a single act.
        </p>
      </div>

      {/* Dark Mountain Vector with subtle star glow */}
      <div className="mt-4 -mx-5 -mb-5 h-20 relative">
        <svg viewBox="0 0 300 100" fill="none" className="w-full h-full" preserveAspectRatio="none">
          <circle cx="50" cy="20" r="1.5" fill="#FFFFFF" fillOpacity="0.7" />
          <circle cx="120" cy="15" r="1.5" fill="#FFFFFF" fillOpacity="0.5" />
          <circle cx="220" cy="25" r="1.5" fill="#FFFFFF" fillOpacity="0.8" />
          <path d="M0 100 L50 45 L110 80 L180 35 L240 70 L300 40 L300 100 Z" fill="#1E293B" fillOpacity="0.7" />
          <path d="M0 100 L70 65 L130 90 L200 55 L260 80 L300 65 L300 100 Z" fill="#0F172A" />
        </svg>
      </div>
    </div>
  );
};
