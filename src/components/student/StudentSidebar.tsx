import React, { useState, useEffect } from 'react';
import { StudentAgeTier } from '../../types';
import {
  Home,
  BookOpen,
  Bot,
  LayoutGrid,
  HelpCircle,
  TrendingUp,
  Award,
  FileText,
  Settings,
  Target,
  Sparkles,
  LifeBuoy,
  Users,
  ArrowRight,
  Heart,
} from 'lucide-react';
import { GiraffeMascot } from './StudentIllustrations';
import { getEscalationTickets } from '../../utils/escalationStore';

interface StudentSidebarProps {
  tier: StudentAgeTier;
  activeNav: string;
  onSelectNav: (nav: string) => void;
  onSwitchRole?: () => void;
}

export const StudentSidebar: React.FC<StudentSidebarProps> = ({
  tier,
  activeNav,
  onSelectNav,
}) => {
  const [escalationsCount, setEscalationsCount] = useState(() => getEscalationTickets().length);

  useEffect(() => {
    const handleUpdate = () => {
      setEscalationsCount(getEscalationTickets().length);
    };
    window.addEventListener('pragya_escalation_updated', handleUpdate);
    return () => window.removeEventListener('pragya_escalation_updated', handleUpdate);
  }, []);

  // Nav items based on mockup
  const quizLabel = tier === 'high' ? 'Practice' : 'Quizzes';
  const quizIcon = tier === 'high' ? Target : HelpCircle;

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'learning', label: 'My Learning', icon: BookOpen },
    { id: 'escalations', label: 'Teacher Doubts', icon: LifeBuoy, badge: escalationsCount > 0 ? `${escalationsCount}` : undefined },
    { id: 'aitutor', label: 'AI Tutor', icon: Bot },
    { id: 'subjects', label: 'Subjects', icon: LayoutGrid },
    { id: 'quizzes', label: quizLabel, icon: quizIcon },
    { id: 'progress', label: 'Progress', icon: TrendingUp },
    { id: 'achievements', label: 'Achievements', icon: Award },
    { id: 'notes', label: 'Notes', icon: FileText },
    { id: 'switch-role', label: 'Switch Roles', icon: Users },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  // Theme styling rules
  const themeStyles = {
    primary: {
      asideBg: 'bg-[#FFFDF9] border-[#FDEEE0]',
      activeItem: 'bg-rose-500 text-white shadow-sm font-bold',
      inactiveItem: 'text-slate-600 hover:bg-rose-50 hover:text-rose-600 font-semibold',
      iconColor: 'text-rose-500',
    },
    middle: {
      asideBg: 'bg-[#FBFCFD] border-emerald-100',
      activeItem: 'bg-emerald-600 text-white shadow-sm font-bold',
      inactiveItem: 'text-slate-600 hover:bg-emerald-50 hover:text-emerald-700 font-semibold',
      iconColor: 'text-emerald-600',
    },
    high: {
      asideBg: 'bg-[#0F172A] border-slate-800',
      activeItem: 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20 font-bold',
      inactiveItem: 'text-slate-400 hover:bg-slate-800 hover:text-white font-medium',
      iconColor: 'text-indigo-400',
    },
  }[tier];

  return (
    <aside
      className={`w-60 shrink-0 border-r flex flex-col justify-between p-3.5 min-h-[calc(100vh-110px)] transition-colors duration-300 ${themeStyles.asideBg}`}
    >
      {/* Top Nav List */}
      <div className="space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeNav === item.id;
          const isAITutor = item.id === 'aitutor';

          // Custom styling for AI Tutor button to match green pill visual
          let itemStyle = isActive ? themeStyles.activeItem : themeStyles.inactiveItem;
          if (isAITutor) {
            itemStyle = isActive
              ? 'bg-[#00875A] hover:bg-[#00704A] text-white shadow-md font-black ring-2 ring-emerald-400/40'
              : 'bg-[#00875A]/10 hover:bg-[#00875A]/20 text-[#00875A] dark:bg-emerald-950/40 dark:text-emerald-400 font-bold border border-[#00875A]/20';
          }

          return (
            <button
              key={item.id}
              onClick={() => onSelectNav(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs transition-all cursor-pointer ${itemStyle}`}
            >
              <div className="flex items-center gap-3 truncate">
                <Icon className={`w-4 h-4 shrink-0 ${isActive || (isAITutor && isActive) ? 'text-white' : isAITutor ? 'text-[#00875A] dark:text-emerald-400' : ''}`} />
                <span className="truncate">{item.label}</span>
              </div>
              {isAITutor && (
                <span className={`text-[9px] font-black uppercase px-1.5 py-0.5 rounded-md ${
                  isActive ? 'bg-white/25 text-white' : 'bg-[#00875A] text-white'
                }`}>
                  AI
                </span>
              )}
              {item.id === 'learning' && !isAITutor && (
                <span className={`text-[9px] font-black uppercase px-1.5 py-0.5 rounded-md ${
                  isActive
                    ? 'bg-white/25 text-white'
                    : 'bg-emerald-100 text-emerald-800'
                }`}>
                  Map
                </span>
              )}
              {item.badge && item.id !== 'learning' && (
                <span className={`text-[10px] font-black px-1.5 py-0.2 rounded-full ${
                  isActive
                    ? 'bg-white text-rose-600'
                    : 'bg-amber-100 text-amber-900 border border-amber-300'
                }`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Bottom Mascot / Inspiration Card */}
      <div className="mt-4 pt-2">
        {tier === 'primary' && (
          <div className="rounded-2xl p-3 bg-gradient-to-b from-amber-50 to-orange-50 border border-amber-200/80 text-center flex flex-col items-center shadow-sm">
            <div className="w-16 h-20 mb-1">
              <GiraffeMascot className="w-full h-full object-contain" />
            </div>
            <p className="text-xs font-bold text-amber-900 leading-tight">
              Keep Learning
            </p>
            <p className="text-[11px] font-medium text-amber-700 flex items-center justify-center gap-1 mt-0.5">
              <span>You can do it!</span>
              <Heart className="w-3 h-3 text-rose-500 fill-rose-500" />
            </p>
          </div>
        )}

        {tier === 'middle' && (
          <div className="rounded-2xl p-3.5 bg-gradient-to-b from-emerald-50 via-teal-50 to-cyan-50 border border-emerald-200/70 text-center relative overflow-hidden shadow-sm">
            {/* Small mountain peak vector */}
            <div className="w-14 h-14 mx-auto mb-1.5 flex items-center justify-center">
              <svg viewBox="0 0 100 80" fill="none" className="w-full h-full">
                <path d="M50 15 L85 70 L15 70 Z" fill="#10B981" />
                <path d="M50 15 L62 35 L45 38 Z" fill="#FFFFFF" />
                <line x1="50" y1="15" x2="50" y2="4" stroke="#047857" strokeWidth="2" />
                <rect x="50" y="4" width="14" height="8" fill="#10B981" />
              </svg>
            </div>
            <p className="text-xs font-bold text-slate-800 italic leading-snug">
              &ldquo;Consistency today creates a brighter tomorrow.&rdquo;
            </p>
          </div>
        )}

        {tier === 'high' && (
          <div className="rounded-2xl p-4 bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 text-center relative overflow-hidden shadow-inner">
            <div className="w-14 h-12 mx-auto mb-2 flex items-center justify-center text-indigo-400">
              <svg viewBox="0 0 100 60" fill="none" className="w-full h-full">
                <path d="M50 10 L88 55 L12 55 Z" fill="#334155" />
                <path d="M50 10 L62 25 L45 28 Z" fill="#6366F1" />
                <circle cx="25" cy="18" r="1.5" fill="#E2E8F0" />
                <circle cx="75" cy="14" r="1.5" fill="#E2E8F0" />
              </svg>
            </div>
            <p className="text-xs font-semibold text-slate-300 leading-snug">
              Discipline today builds the life you want tomorrow.
            </p>
          </div>
        )}
      </div>

      {/* Dedicated Role Switcher Section */}
      <div className="mt-3 pt-3 border-t border-slate-200/70 dark:border-slate-800">
        <div className="px-1 mb-1.5 flex items-center justify-between text-[10px] font-black uppercase tracking-wider text-slate-400">
          <span>Active Role</span>
          <span className="bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.2 rounded-md">
            Student
          </span>
        </div>
        <button
          onClick={() => onSelectNav('switch-role')}
          className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-all ${
            activeNav === 'switch-role'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'bg-slate-100/90 hover:bg-slate-200/90 text-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-200'
          }`}
          title="Open dedicated Switch Role workspace section"
        >
          <div className="flex items-center gap-2">
            <Users className="w-3.5 h-3.5 text-indigo-500" />
            <span>Switch Roles</span>
          </div>
          <ArrowRight className="w-3.5 h-3.5 opacity-60" />
        </button>
      </div>
    </aside>
  );
};
