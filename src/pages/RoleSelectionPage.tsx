import React from 'react';
import {
  GraduationCap,
  Globe,
  HelpCircle,
  ArrowRight,
  BookOpen,
  Sparkles,
  Rocket,
  Send,
  Atom,
  Star,
  Compass,
} from 'lucide-react';
import { UserRole } from '../types';
import { StudentIllustration } from '../components/illustrations/StudentIllustration';
import { ParentIllustration } from '../components/illustrations/ParentIllustration';
import { FacultyIllustration } from '../components/illustrations/FacultyIllustration';

interface RoleSelectionPageProps {
  onSelectRole: (role: UserRole) => void;
}

export const RoleSelectionPage: React.FC<RoleSelectionPageProps> = ({ onSelectRole }) => {
  return (
    <div className="relative min-h-screen flex flex-col bg-gradient-to-tr from-[#E0F2FE] via-[#F0FDFA] to-[#FAF5FF] overflow-hidden text-slate-800 font-sans">
      
      {/* Dynamic Background Floating Elements */}
      <div className="absolute top-10 left-10 w-24 h-24 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" />
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 left-1/3 w-28 h-28 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: '4s' }} />

      {/* Floating Sparkles and Orbits */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        {/* Planet / Orbit 1 */}
        <div className="absolute top-20 left-[15%] text-amber-500/40 animate-bounce" style={{ animationDuration: '6s' }}>
          <Compass className="w-8 h-8" />
        </div>
        {/* Book */}
        <div className="absolute top-36 left-[5%] text-purple-600/30 rotate-12">
          <BookOpen className="w-9 h-9" />
        </div>
        {/* Star */}
        <div className="absolute top-48 left-[18%] text-amber-400/40 animate-pulse">
          <Star className="w-6 h-6 fill-amber-400/30" />
        </div>
        {/* Atom */}
        <div className="absolute top-24 right-[15%] text-slate-400/40">
          <Atom className="w-8 h-8" />
        </div>
        {/* Orbit / Sparkle */}
        <div className="absolute bottom-40 left-[8%] text-blue-500/40 rotate-45">
          <Sparkles className="w-8 h-8" />
        </div>
        {/* Rocket */}
        <div className="absolute bottom-20 left-[20%] text-rose-500/30 -rotate-45">
          <Rocket className="w-9 h-9" />
        </div>
        {/* Paper Plane */}
        <div className="absolute bottom-48 right-[10%] text-indigo-400/40 -rotate-12">
          <Send className="w-8 h-8" />
        </div>
        {/* Book 2 */}
        <div className="absolute top-32 right-[8%] text-emerald-600/30 -rotate-12">
          <BookOpen className="w-10 h-10" />
        </div>
        {/* Star 2 */}
        <div className="absolute top-16 right-[25%] text-amber-400/40 animate-pulse">
          <Star className="w-5 h-5 fill-amber-400/30" />
        </div>
      </div>

      {/* Top Header Row */}
      <header className="relative z-10 w-full max-w-[1400px] mx-auto px-6 py-4 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-rose-400 via-amber-400 to-indigo-500 flex items-center justify-center text-white shadow-md">
            <GraduationCap className="w-5 h-5 stroke-[2.2]" />
          </div>
          <div>
            <div className="flex items-center gap-1 leading-none">
              <span className="text-lg font-black tracking-tight text-slate-800 leading-none">
                Pragya
              </span>
            </div>
            <p className="text-[9.5px] font-bold text-slate-500 tracking-wide uppercase mt-0.5">
              Smart Education Platform
            </p>
          </div>
        </div>

        {/* Top Actions */}
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-slate-200 bg-white/80 hover:bg-white text-xs font-bold text-slate-600 transition shadow-xs cursor-pointer">
            <HelpCircle className="w-3.5 h-3.5 text-blue-500" />
            <span>Need Help?</span>
          </button>
          
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-slate-200 bg-white/80 hover:bg-white text-xs font-bold text-slate-600 transition shadow-xs cursor-pointer">
            <Globe className="w-3.5 h-3.5 text-slate-400" />
            <span className="hidden sm:inline">English</span>
            <span className="text-[10px] opacity-60">▼</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 flex-1 flex flex-col justify-center items-center max-w-[1400px] mx-auto px-6 py-8 w-full">
        {/* Titles */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12 space-y-3">
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 flex items-center justify-center gap-2">
            Who Am I?
          </h1>
          <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed">
            Choose your role to enter the learning arena and personalize your journey.
          </p>
        </div>

        {/* 3 Role Selection Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 w-full max-w-6xl">
          
          {/* Card 1: STUDENT */}
          <div className="group bg-white rounded-3xl border-2 border-slate-200/60 hover:border-amber-400/80 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_12px_28px_rgba(245,158,11,0.15)] hover:-translate-y-1">
            <div className="p-6 pb-2">
              {/* Illustration Block */}
              <div className="relative h-48 rounded-2xl bg-gradient-to-tr from-amber-400 via-orange-400 to-rose-400 flex items-center justify-center overflow-hidden mb-6 p-3 group-hover:scale-[1.02] transition-transform duration-300">
                <div className="absolute inset-0 bg-white/10 backdrop-blur-[1px] mix-blend-overlay" />
                <StudentIllustration className="relative z-10 w-full h-full object-contain filter drop-shadow-md" />
              </div>

              {/* Header Title */}
              <div className="space-y-1 mb-3">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-black text-slate-800 tracking-tight uppercase">
                    I AM A STUDENT
                  </h2>
                  <span className="text-[11px] font-black tracking-wider uppercase px-2 py-0.5 rounded-md bg-amber-500 text-white shadow-xs">
                    Class 1 to 10
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs text-slate-600 leading-relaxed font-medium min-h-[64px]">
                Embark on gamified quests, diagnose your skills with adaptive pre-tests, and get guided assistance from your age-based AI tutor!
              </p>
            </div>

            <div className="p-6 pt-2 space-y-4">
              <button
                onClick={() => onSelectRole('student')}
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-5 rounded-2xl text-xs font-black bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-lg shadow-orange-500/20 hover:shadow-orange-500/30 transition-all cursor-pointer"
              >
                <span>Start Learning</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Badge Chips Footer */}
              <div className="flex flex-wrap gap-1 justify-center pt-2">
                {[
                  'Class 1',
                  'Class 2',
                  'Class 3',
                  'Class 4',
                  'Class 5',
                  'Class 6',
                  'Class 7',
                  'Class 8',
                  'Class 9',
                  'Class 10',
                ].map((cls) => (
                  <span
                    key={cls}
                    className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-slate-50 border border-slate-100 text-slate-500"
                  >
                    {cls}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Card 2: PARENT */}
          <div className="group bg-white rounded-3xl border-2 border-slate-200/60 hover:border-rose-400/80 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_12px_28px_rgba(244,63,94,0.12)] hover:-translate-y-1">
            <div className="p-6 pb-2">
              {/* Illustration Block */}
              <div className="relative h-48 rounded-2xl bg-gradient-to-tr from-rose-400 via-pink-400 to-emerald-400 flex items-center justify-center overflow-hidden mb-6 p-3 group-hover:scale-[1.02] transition-transform duration-300">
                <div className="absolute inset-0 bg-white/10 backdrop-blur-[1px] mix-blend-overlay" />
                <ParentIllustration className="relative z-10 w-full h-full object-contain filter drop-shadow-md" />
              </div>

              {/* Header Title */}
              <div className="space-y-1 mb-3">
                <h2 className="text-xl font-black text-slate-800 tracking-tight uppercase">
                  I AM A PARENT
                </h2>
              </div>

              {/* Description */}
              <p className="text-xs text-slate-600 leading-relaxed font-medium min-h-[64px]">
                Track your child's weekly mastery, view adaptive diagnostic reports, and see where they excel or need a gentle boost.
              </p>
            </div>

            <div className="p-6 pt-2 space-y-4">
              <button
                onClick={() => onSelectRole('parent')}
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-5 rounded-2xl text-xs font-black bg-gradient-to-r from-rose-500 to-[#9E5D53] hover:from-rose-600 hover:to-[#8E4D43] text-white shadow-lg shadow-rose-500/20 hover:shadow-rose-500/30 transition-all cursor-pointer"
              >
                <span>View Child's Progress</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <div className="text-center pt-2">
                <span className="text-[10px] font-bold text-slate-400">
                  Linked to student profiles.
                </span>
              </div>
            </div>
          </div>

          {/* Card 3: FACULTY */}
          <div className="group bg-white rounded-3xl border-2 border-slate-200/60 hover:border-blue-400/80 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_12px_28px_rgba(37,99,235,0.12)] hover:-translate-y-1">
            <div className="p-6 pb-2">
              {/* Illustration Block */}
              <div className="relative h-48 rounded-2xl bg-gradient-to-tr from-blue-500 via-indigo-500 to-blue-600 flex items-center justify-center overflow-hidden mb-6 p-3 group-hover:scale-[1.02] transition-transform duration-300">
                <div className="absolute inset-0 bg-white/10 backdrop-blur-[1px] mix-blend-overlay" />
                <FacultyIllustration className="relative z-10 w-full h-full object-contain filter drop-shadow-md" />
              </div>

              {/* Header Title */}
              <div className="space-y-1 mb-3">
                <h2 className="text-xl font-black text-slate-800 tracking-tight uppercase">
                  I AM A FACULTY
                </h2>
              </div>

              {/* Description */}
              <p className="text-xs text-slate-600 leading-relaxed font-medium min-h-[64px]">
                Access high-level diagnostics, inspect cohort analytics, track school-wide curriculum gaps, and manage course systems.
              </p>
            </div>

            <div className="p-6 pt-2 space-y-4">
              <button
                onClick={() => onSelectRole('faculty')}
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-5 rounded-2xl text-xs font-black bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg shadow-blue-600/20 hover:shadow-blue-600/30 transition-all cursor-pointer"
              >
                <span>Launch Dashboard</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <div className="text-center pt-2">
                <span className="text-[10px] font-bold text-slate-400">
                  Institution-wide reports.
                </span>
              </div>
            </div>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 w-full text-center py-4 border-t border-slate-200/50 text-[11px] text-slate-400 font-medium">
        © 2026 Pragya Smart Education Inc. All Rights Reserved.
      </footer>
    </div>
  );
};
