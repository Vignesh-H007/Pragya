import React, { useState } from 'react';
import { StudentAgeTier } from '../../types';
import {
  Search,
  Bell,
  Star,
  Sprout,
  Compass,
  ChevronDown,
  LogOut,
  Sparkles,
  BookOpen,
  HelpCircle,
  User,
} from 'lucide-react';

interface StudentNavbarProps {
  tier: StudentAgeTier;
  activeClass: string;
  onSwitchRole: () => void;
  onOpenQuestMap?: () => void;
  onOpenEscalations?: () => void;
  onToggleMenu?: () => void;
}

export const StudentNavbar: React.FC<StudentNavbarProps> = ({
  tier,
  activeClass,
  onSwitchRole,
  onOpenQuestMap,
  onOpenEscalations,
  onToggleMenu,
}) => {
  const [profileOpen, setProfileOpen] = useState(false);

  // Configuration per age tier
  const tierConfig = {
    primary: {
      tagline: 'Learn • Play • Grow',
      searchPlaceholder: 'Search anything...',
      logoIcon: <Star className="w-5 h-5 text-amber-500 fill-amber-400 animate-spin" style={{ animationDuration: '12s' }} />,
      avatarBg: 'bg-amber-100 text-amber-800 border-amber-300',
      navBg: 'bg-[#FFFBF5]/95 border-[#FEEAD4]',
      textColor: 'text-slate-800',
      searchBg: 'bg-white border-rose-200 focus:border-rose-400 focus:ring-rose-200',
    },
    middle: {
      tagline: 'Learn Today, Grow Tomorrow',
      searchPlaceholder: 'Search topics, concepts...',
      logoIcon: <Sprout className="w-5 h-5 text-emerald-600" />,
      avatarBg: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      navBg: 'bg-white/95 border-emerald-100',
      textColor: 'text-slate-800',
      searchBg: 'bg-slate-50 border-slate-200 focus:border-emerald-500 focus:ring-emerald-100',
    },
    high: {
      tagline: 'Knowledge Today. Opportunities Tomorrow.',
      searchPlaceholder: 'Search for any topic...',
      logoIcon: <Compass className="w-5 h-5 text-indigo-400" />,
      avatarBg: 'bg-indigo-950 text-indigo-300 border-indigo-700',
      navBg: 'bg-[#0F172A]/95 border-slate-800',
      textColor: 'text-white',
      searchBg: 'bg-slate-900 border-slate-700 text-slate-100 placeholder-slate-400 focus:border-indigo-500 focus:ring-indigo-900/50',
    },
  }[tier];

  return (
    <nav className={`w-full border-b backdrop-blur-md px-3 sm:px-5 py-2.5 sm:py-3 transition-colors duration-300 ${tierConfig.navBg}`}>
      <div className="max-w-[1600px] mx-auto flex items-center justify-between gap-2 sm:gap-4">
        {/* Left: Upper Menu Navigation Icon & Brand Logo & App Name */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          {/* Menu Navigation Button */}
          <button
            onClick={onToggleMenu}
            id="upper-menu-toggle-btn"
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-white hover:bg-slate-50 dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-200/90 dark:border-slate-700 shadow-xs hover:shadow-sm flex flex-col items-center justify-center gap-1 transition-all duration-200 cursor-pointer active:scale-95 group focus:outline-none focus:ring-2 focus:ring-slate-300 shrink-0"
            title="Open Navigation Menu"
            aria-label="Navigation Menu"
          >
            <span className="w-4 sm:w-5 h-[2.5px] bg-slate-600 dark:bg-slate-300 rounded-full group-hover:bg-slate-900 dark:group-hover:bg-white transition-colors" />
            <span className="w-4 sm:w-5 h-[2.5px] bg-slate-600 dark:bg-slate-300 rounded-full group-hover:bg-slate-900 dark:group-hover:bg-white transition-colors" />
            <span className="w-4 sm:w-5 h-[2.5px] bg-slate-600 dark:bg-slate-300 rounded-full group-hover:bg-slate-900 dark:group-hover:bg-white transition-colors" />
          </button>

          {/* App Brand Logo & Name aligned with navigation bar */}
          <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-white shadow-xs border border-slate-200/60 flex items-center justify-center shrink-0">
              {tierConfig.logoIcon}
            </div>
            <div className="flex flex-col justify-center min-w-0">
              <div className="flex items-center gap-1.5 leading-none">
                <span className={`text-base sm:text-lg font-black tracking-tight leading-none ${tier === 'high' ? 'text-white' : 'text-slate-900'}`}>
                  Pragya
                </span>
                <span className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded leading-none ${
                  tier === 'high'
                    ? 'bg-indigo-950 text-indigo-300 border border-indigo-800'
                    : tier === 'middle'
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                    : 'bg-amber-100 text-amber-800 border border-amber-200'
                }`}>
                  Student
                </span>
              </div>
              <p className={`text-[10px] sm:text-[11px] font-semibold tracking-wide truncate hidden sm:block mt-0.5 ${tier === 'high' ? 'text-indigo-300' : 'text-slate-500'}`}>
                {tierConfig.tagline}
              </p>
            </div>
          </div>
        </div>

        {/* Center: Search Bar */}
        <div className="flex-1 max-w-md hidden md:block">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder={tierConfig.searchPlaceholder}
              className={`w-full pl-9 pr-4 py-2 text-xs rounded-full border outline-none transition-all shadow-sm ${tierConfig.searchBg}`}
            />
          </div>
        </div>

        {/* Right Action Icons & Profile */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          {/* Teacher Doubts / Escalations Quick Button */}
          {onOpenEscalations && (
            <button
              onClick={onOpenEscalations}
              className={`flex items-center gap-1.5 p-2 sm:px-3 sm:py-1.5 rounded-full border text-xs font-bold transition-all shadow-xs cursor-pointer ${
                tier === 'high'
                  ? 'bg-slate-900 border-slate-700 text-indigo-300 hover:bg-slate-800'
                  : 'bg-rose-50 border-rose-200 text-rose-800 hover:bg-rose-100'
              }`}
              title="View your teacher escalations and doubts"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Teacher Doubts</span>
            </button>
          )}

          {/* Gamified Quest Map Quick Button */}
          {onOpenQuestMap && (
            <button
              onClick={onOpenQuestMap}
              className={`flex items-center gap-1.5 p-2 sm:px-3 sm:py-1.5 rounded-full border text-xs font-bold transition-all shadow-xs ${
                tier === 'high'
                  ? 'bg-indigo-950/80 border-indigo-700 text-indigo-200 hover:bg-indigo-900'
                  : tier === 'middle'
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-800 hover:bg-emerald-100'
                  : 'bg-amber-50 border-amber-300 text-amber-900 hover:bg-amber-100'
              }`}
              title="Open Valley Quest Gamified Learning Journey"
            >
              <Compass className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Quest Map</span>
              <span className="text-[10px] bg-white/70 px-1.5 py-0.2 rounded-full border border-black/10 flex items-center gap-0.5">
                <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-500 inline" />
                <span>6</span>
              </span>
            </button>
          )}

          {/* Notification Bell */}
          <button
            className={`relative p-2 rounded-full border transition-all ${
              tier === 'high'
                ? 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700'
                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 shadow-sm'
            }`}
          >
            <Bell className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
          </button>

          {/* Student Profile Pill */}
          <div className="relative">
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className={`flex items-center gap-1.5 sm:gap-2.5 p-1 sm:pl-2 sm:pr-3 sm:py-1.5 rounded-full border transition-all ${
                tier === 'high'
                  ? 'bg-slate-800/90 border-slate-700 text-white hover:bg-slate-700'
                  : 'bg-white border-slate-200/90 text-slate-800 hover:bg-slate-50 shadow-sm'
              }`}
            >
              {/* Avatar circle */}
              <div className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center font-bold text-xs border ${tierConfig.avatarBg}`}>
                <User className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
              </div>
              <div className="text-left leading-tight hidden sm:block">
                <span className="block text-xs font-bold">Aarav</span>
                <span className={`block text-[10px] font-semibold ${tier === 'high' ? 'text-indigo-300' : 'text-slate-500'}`}>
                  {activeClass}
                </span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden xs:block" />
            </button>

            {/* Profile Menu Dropdown */}
            {profileOpen && (
              <div
                className={`absolute right-0 mt-2 w-48 rounded-2xl shadow-xl border p-2 z-50 animate-in fade-in zoom-in-95 duration-150 ${
                  tier === 'high'
                    ? 'bg-slate-900 border-slate-800 text-white'
                    : 'bg-white border-slate-200 text-slate-800'
                }`}
              >
                <div className="px-3 py-2 border-b border-slate-200/50 mb-1">
                  <p className="text-xs font-bold">Aarav Sharma</p>
                  <p className="text-[11px] text-slate-400">Class: {activeClass}</p>
                </div>
                <button
                  onClick={() => {
                    setProfileOpen(false);
                    onSwitchRole();
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-xl transition-all text-left"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Exit to Role Selection</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
