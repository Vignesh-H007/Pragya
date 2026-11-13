import React from 'react';
import {
  ArrowLeft,
  Sparkles,
  Compass,
  Trophy,
  Activity,
  Smile,
} from 'lucide-react';
import { UserRole } from '../types';
import { StudentIllustration } from '../components/illustrations/StudentIllustration';
import { ParentIllustration } from '../components/illustrations/ParentIllustration';

interface StudentParentPlaceholderPageProps {
  role: 'student' | 'parent';
  onBack: () => void;
}

export const StudentParentPlaceholderPage: React.FC<StudentParentPlaceholderPageProps> = ({
  role,
  onBack,
}) => {
  const isStudent = role === 'student';

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-tr from-[#FAF5FF] via-[#F0FDF4] to-[#EFF6FF] text-slate-800 font-sans p-6 overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-10 left-10 w-28 h-28 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-25 animate-pulse" />
      <div className="absolute bottom-10 right-10 w-28 h-28 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-25 animate-pulse" style={{ animationDelay: '2s' }} />

      <div className="relative z-10 max-w-lg w-full bg-white rounded-3xl border-2 border-slate-100 shadow-xl p-8 text-center space-y-6">
        
        {/* Back button */}
        <div className="flex justify-start">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Change Role</span>
          </button>
        </div>

        {/* Visual Header Illustration */}
        <div className="mx-auto w-28 h-28 rounded-2xl bg-gradient-to-tr from-slate-100 to-slate-200/80 border border-slate-200/80 flex items-center justify-center p-2 shadow-inner">
          {isStudent ? (
            <StudentIllustration className="w-full h-full object-contain filter drop-shadow-sm" />
          ) : (
            <ParentIllustration className="w-full h-full object-contain filter drop-shadow-sm" />
          )}
        </div>

        {/* Title */}
        <div className="space-y-2">
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            {isStudent ? 'Student Learning Arena' : 'Parent Mastery Portal'}
          </h1>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black bg-blue-50 text-blue-600 border border-blue-100">
            <Sparkles className="w-3 h-3" />
            <span>SYSTEM CONSTRUCT IN PROGRESS</span>
          </div>
        </div>

        {/* Informative Body text */}
        <p className="text-xs text-slate-600 leading-relaxed font-medium">
          {isStudent ? (
            "We're currently constructing the gamified Student Arena! Soon, students will be able to log in here to embark on adaptive diagnostics, earn mastery trophies, and unlock the interactive AI tutor tailored to their grade level."
          ) : (
            "The Parent Weekly Mastery Portal is currently undergoing final quality calibration. Once active, parents can instantly inspect real-time curriculum gap sheets, check child streak logs, and unlock targeted tutoring exercises."
          )}
        </p>

        {/* Features Preview List */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-left space-y-2.5">
          <span className="text-[10px] font-extrabold uppercase text-slate-400 tracking-wider block">
            Upcoming Modules:
          </span>
          {isStudent ? (
            <>
              <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                <Compass className="w-4 h-4 text-amber-500" />
                <span>Adaptive Level Diagnostics (Pre-tests)</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                <Trophy className="w-4 h-4 text-yellow-500" />
                <span>Gamified Badges & Learning Quests</span>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                <Activity className="w-4 h-4 text-emerald-500" />
                <span>Weekly Parent Summary Email Alerts</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                <Smile className="w-4 h-4 text-rose-500" />
                <span>Remedial Practice Progress Checklists</span>
              </div>
            </>
          )}
        </div>

        {/* Back Button Accent */}
        <button
          onClick={onBack}
          className="w-full py-3 px-5 rounded-xl text-xs font-extrabold bg-slate-900 hover:bg-slate-800 text-white transition cursor-pointer shadow-md"
        >
          Return to Portal Entrance
        </button>
      </div>
    </div>
  );
};
