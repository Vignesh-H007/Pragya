import React from 'react';
import { UserRole } from '../../types';
import {
  GraduationCap,
  Users,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  HeartHandshake,
  BarChart3,
  Bot,
  Map,
} from 'lucide-react';

interface RoleSwitchSectionProps {
  currentRole: UserRole;
  onSelectRole: (role: UserRole) => void;
  tier?: string;
}

export const RoleSwitchSection: React.FC<RoleSwitchSectionProps> = ({
  currentRole = 'student',
  onSelectRole,
  tier = 'middle',
}) => {
  const rolesList: {
    id: UserRole;
    title: string;
    subtitle: string;
    badge: string;
    icon: React.ReactNode;
    colorClasses: {
      border: string;
      bg: string;
      badge: string;
      button: string;
    };
    highlights: string[];
  }[] = [
    {
      id: 'faculty',
      title: 'Faculty / Teacher',
      subtitle: 'Classroom analytics, diagnostic gap matrix & roadblock prescriptions',
      badge: 'Academic Analytics',
      icon: <GraduationCap className="w-6 h-6 text-indigo-500" />,
      colorClasses: {
        border: 'border-indigo-200 hover:border-indigo-400',
        bg: 'bg-indigo-50/40 hover:bg-indigo-50/80',
        badge: 'bg-indigo-100 text-indigo-800 border-indigo-200',
        button: 'bg-indigo-600 hover:bg-indigo-700 text-white',
      },
      highlights: [
        'Class pass rate metrics & topic roadblock radar',
        'Student diagnostic remediation tracking (Fixed / In Progress)',
        'Class 7 to 10 curricula & faculty goals checklist',
      ],
    },
    {
      id: 'parent',
      title: 'Parent Portal',
      subtitle: 'Track your child’s weekly learning habits, study hours & teacher chats',
      badge: 'Family Guidance',
      icon: <HeartHandshake className="w-6 h-6 text-rose-500" />,
      colorClasses: {
        border: 'border-rose-200 hover:border-rose-400',
        bg: 'bg-rose-50/40 hover:bg-rose-50/80',
        badge: 'bg-rose-100 text-rose-800 border-rose-200',
        button: 'bg-rose-600 hover:bg-rose-700 text-white',
      },
      highlights: [
        'Aarav’s daily study time & subject breakdown',
        '1-Click encouragement cheers & weekly recap',
        'Escalation alerts & direct teacher collaboration',
      ],
    },
    {
      id: 'student',
      title: 'Student Adventure',
      subtitle: 'Gamified Minecraft syllabus quest, wild mob trials & AI Tutor',
      badge: 'Current Workspace',
      icon: <Sparkles className="w-6 h-6 text-emerald-500" />,
      colorClasses: {
        border: 'border-emerald-300 ring-2 ring-emerald-400',
        bg: 'bg-emerald-50/60',
        badge: 'bg-emerald-100 text-emerald-800 border-emerald-300',
        button: 'bg-emerald-600 text-white cursor-default',
      },
      highlights: [
        'Overworld, Ocean, Nether & End syllabus pathways',
        'Wild biome mob test encounters with instant loot drops',
        'Real-time AI Tutor chatbot with chapter hints',
      ],
    },
  ];

  return (
    <section
      id="role-switch-section"
      className="w-full my-8 p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm transition-all"
    >
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-100 text-slate-700 border border-slate-200 flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-slate-500" />
              Role & Workspace Switcher
            </span>
            <span className="text-xs text-slate-400 hidden sm:inline">• Dedicated Navigation Hub</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Switch Your Active Role
          </h2>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            LearnBuddy provides tailored environments for students, teachers, and parents. Select any portal below to switch immediately.
          </p>
        </div>

        <button
          onClick={() => onSelectRole(null)}
          className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all flex items-center gap-1.5 self-start sm:self-center shrink-0"
        >
          <span>Return to Welcome Screen</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* 3 Role Selection Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-6">
        {rolesList.map((item) => {
          const isCurrent = currentRole === item.id;

          return (
            <div
              key={item.id}
              className={`rounded-2xl border-2 p-5 flex flex-col justify-between transition-all duration-200 ${item.colorClasses.border} ${item.colorClasses.bg} shadow-xs hover:shadow-md`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="w-12 h-12 rounded-xl bg-white shadow-xs border border-black/5 flex items-center justify-center">
                    {item.icon}
                  </div>
                  <span
                    className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${item.colorClasses.badge}`}
                  >
                    {item.badge}
                  </span>
                </div>

                <h3 className="text-base font-extrabold text-slate-900 mb-1">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                  {item.subtitle}
                </p>

                <div className="space-y-2 pt-3 border-t border-black/5 mb-6">
                  {item.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                {isCurrent ? (
                  <div className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 text-white text-xs font-black text-center flex items-center justify-center gap-1.5 shadow-xs">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Currently Active Workspace</span>
                  </div>
                ) : (
                  <button
                    onClick={() => onSelectRole(item.id)}
                    className={`w-full py-2.5 px-4 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 shadow-sm hover:scale-[1.02] active:scale-95 cursor-pointer ${item.colorClasses.button}`}
                  >
                    <span>Switch to {item.title}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
