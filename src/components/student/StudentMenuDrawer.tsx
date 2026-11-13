import React, { useEffect } from 'react';
import { StudentAgeTier } from '../../types';
import {
  Home,
  BookOpen,
  LifeBuoy,
  Bot,
  LayoutGrid,
  HelpCircle,
  Target,
  TrendingUp,
  Award,
  FileText,
  Users,
  Settings,
  X,
  Sparkles,
  ChevronRight,
  GraduationCap,
  HeartHandshake,
} from 'lucide-react';
import { getEscalationTickets } from '../../utils/escalationStore';

interface StudentMenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  tier: StudentAgeTier;
  activeNav: string;
  onSelectNav: (nav: string) => void;
  activeClass: string;
  activeSubject: string;
  onSwitchRole?: () => void;
}

interface MenuItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  badgeColor?: string;
}

interface MenuSection {
  title: string;
  items: MenuItem[];
}

export const StudentMenuDrawer: React.FC<StudentMenuDrawerProps> = ({
  isOpen,
  onClose,
  tier,
  activeNav,
  onSelectNav,
  activeClass,
  activeSubject,
  onSwitchRole,
}) => {
  const escalationsCount = getEscalationTickets().length;

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Prevent background scrolling when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const quizLabel = tier === 'high' ? 'Practice Tests' : 'Quizzes';
  const quizIcon = tier === 'high' ? Target : HelpCircle;

  const menuSections: MenuSection[] = [
    {
      title: 'Main Hub',
      items: [
        { id: 'home', label: 'Dashboard Home', icon: Home, badge: 'Overview' },
        { id: 'learning', label: 'Syllabus Biome Quest', icon: BookOpen, badge: '12 Chapters' },
        {
          id: 'escalations',
          label: 'Teacher Doubts',
          icon: LifeBuoy,
          badge: escalationsCount > 0 ? `${escalationsCount} Active` : undefined,
          badgeColor: 'bg-rose-500 text-white',
        },
        { id: 'aitutor', label: 'AI Tutor Chat', icon: Bot, badge: 'Smart' },
      ],
    },
    {
      title: 'Academics & Study',
      items: [
        { id: 'subjects', label: 'Curriculum Subjects', icon: LayoutGrid },
        { id: 'quizzes', label: quizLabel, icon: quizIcon },
        { id: 'notes', label: 'Revision Notes', icon: FileText },
      ],
    },
    {
      title: 'Progress & Mastery',
      items: [
        { id: 'progress', label: 'Skill Progress', icon: TrendingUp },
        { id: 'achievements', label: 'Badges & Loot', icon: Award, badge: '6 Stars' },
      ],
    },
    {
      title: 'Settings & Workspace',
      items: [
        { id: 'switch-role', label: 'Switch Roles (Faculty/Parent)', icon: Users, badge: 'Role Hub' },
        { id: 'settings', label: 'Preferences', icon: Settings },
      ],
    },
  ];

  const handleItemClick = (id: string) => {
    onSelectNav(id);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-200"
        aria-hidden="true"
      />

      {/* Slide-out Menu Panel */}
      <div
        className={`relative w-80 max-w-[85vw] h-full shadow-2xl flex flex-col z-10 transition-transform duration-300 ease-out ${
          tier === 'high'
            ? 'bg-[#0F172A] text-slate-100 border-r border-slate-800'
            : 'bg-white text-slate-900 border-r border-slate-200'
        }`}
      >
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Hamburger Icon Representation */}
            <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 flex flex-col items-center justify-center gap-1 shadow-2xs">
              <span className="w-4 h-[2px] bg-slate-700 dark:bg-slate-300 rounded-full" />
              <span className="w-4 h-[2px] bg-slate-700 dark:bg-slate-300 rounded-full" />
              <span className="w-4 h-[2px] bg-slate-700 dark:bg-slate-300 rounded-full" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 leading-none">
                <h2 className="text-sm font-black tracking-tight leading-none">
                  Pragya
                </h2>
                <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded leading-none bg-amber-100 text-amber-800 border border-amber-200">
                  Student
                </span>
              </div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium mt-1">
                {activeClass} • {activeSubject}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Navigation List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {menuSections.map((section, sIdx) => (
            <div key={sIdx} className="space-y-1.5">
              <div className="px-2 text-[10px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500">
                {section.title}
              </div>
              <div className="space-y-1">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeNav === item.id;

                  return (
                    <button
                      key={item.id}
                      onClick={() => handleItemClick(item.id)}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                        isActive
                          ? tier === 'high'
                            ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                            : 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                          : tier === 'high'
                          ? 'text-slate-300 hover:bg-slate-800 hover:text-white'
                          : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon
                          className={`w-4 h-4 ${
                            isActive
                              ? 'text-white'
                              : tier === 'high'
                              ? 'text-slate-400'
                              : 'text-slate-500'
                          }`}
                        />
                        <span>{item.label}</span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        {item.badge && (
                          <span
                            className={`text-[10px] px-2 py-0.5 rounded-full font-extrabold ${
                              isActive
                                ? 'bg-white/20 text-white'
                                : item.badgeColor ||
                                  (tier === 'high'
                                    ? 'bg-slate-800 text-slate-300'
                                    : 'bg-slate-100 text-slate-600')
                            }`}
                          >
                            {item.badge}
                          </span>
                        )}
                        <ChevronRight
                          className={`w-3.5 h-3.5 opacity-40 ${isActive ? 'opacity-90' : ''}`}
                        />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Drawer Footer with Quick Role Switch */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
          <button
            onClick={() => {
              onClose();
              if (onSwitchRole) onSwitchRole();
              else onSelectNav('switch-role');
            }}
            className="w-full py-2.5 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition-transform active:scale-95"
          >
            <Users className="w-3.5 h-3.5" />
            <span>Switch Role (Teacher / Parent)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
