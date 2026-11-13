import React from 'react';
import { StudentAgeTier } from '../../types';
import { Sparkles } from 'lucide-react';
import {
  PrimaryBoyHero,
  MiddleStudentHero,
  HighSchoolHero,
} from './StudentIllustrations';

interface StudentBannerProps {
  tier: StudentAgeTier;
}

export const StudentBanner: React.FC<StudentBannerProps> = ({ tier }) => {
  if (tier === 'primary') {
    return (
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-amber-50 via-orange-50 to-rose-50 border-2 border-amber-200/80 p-6 md:p-7 shadow-sm">
        {/* Decorative background doodles */}
        <div className="absolute top-3 left-4 text-amber-400 opacity-60 text-lg select-none">✨</div>
        <div className="absolute bottom-3 left-1/3 text-rose-300 opacity-70 text-sm select-none">⭐</div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 relative z-10">
          <div className="max-w-md text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Hi Aarav!</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight mb-3">
              Ready to learn something new today?
            </h1>

            <div className="inline-block px-3.5 py-1.5 rounded-2xl bg-white/90 shadow-sm border border-amber-200/60">
              <p className="text-xs font-bold text-amber-800">
                Small Steps lead to Big Dreams! ✨
              </p>
            </div>
          </div>

          {/* Cheerful kid cartoon character illustration */}
          <div className="w-40 sm:w-48 h-40 shrink-0 filter drop-shadow-md">
            <PrimaryBoyHero className="w-full h-full object-contain" />
          </div>
        </div>
      </div>
    );
  }

  if (tier === 'middle') {
    return (
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-cyan-50 via-emerald-50 to-teal-50 border border-emerald-200/80 p-6 md:p-7 shadow-sm">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 relative z-10">
          <div className="max-w-md text-left">
            <span className="text-xs font-extrabold text-emerald-800 tracking-wide block mb-1">
              Hi Aarav!
            </span>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-snug mb-2">
              What would you like to learn today?
            </h1>

            <p className="text-xs font-semibold text-emerald-700 mb-3">
              Curious minds build a brighter future!
            </p>

            <p className="text-xs text-slate-600 leading-relaxed max-w-sm">
              Ask anything, anytime. Your AI tutor is here to help!
            </p>
          </div>

          {/* Teen student studying on laptop */}
          <div className="w-44 sm:w-52 h-40 shrink-0 filter drop-shadow-md">
            <MiddleStudentHero className="w-full h-full object-contain" />
          </div>
        </div>
      </div>
    );
  }

  // High School
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#0B132B] via-[#1C2541] to-[#1E1B4B] border border-slate-700/80 p-6 md:p-7 shadow-xl">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 relative z-10">
        <div className="max-w-md text-left">
          <span className="text-xs font-semibold text-indigo-400 tracking-wider uppercase block mb-1">
            Hi Aarav!
          </span>

          <h1 className="text-2xl sm:text-3xl font-black text-white leading-tight mb-2">
            What would you like to <span className="text-indigo-400 underline decoration-indigo-500/50">learn</span> today?
          </h1>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-indigo-950/80 border border-indigo-800/60 mb-3">
            <span className="text-xs font-medium text-indigo-200">
              Better Questions. Brighter Futures.
            </span>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            Ask anything. Get clarity. Build your future.
          </p>
        </div>

        {/* High school focused student with laptop in dark ambient setting */}
        <div className="w-48 sm:w-56 h-40 shrink-0 filter drop-shadow-lg">
          <HighSchoolHero className="w-full h-full object-contain" />
        </div>
      </div>
    </div>
  );
};
