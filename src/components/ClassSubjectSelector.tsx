import React, { useMemo } from 'react';
import { Calculator, FlaskConical, BookOpen, Globe, LayoutGrid, Sparkles, Check } from 'lucide-react';
import { Subject } from '../types';
import { useDashboardTheme } from '../context/ThemeContext';

interface ClassSubjectSelectorProps {
  selectedClass: string;
  setSelectedClass: (cls: string) => void;
  selectedSubject: Subject;
  setSelectedSubject: (subj: Subject) => void;
}

export const ClassSubjectSelector: React.FC<ClassSubjectSelectorProps> = ({
  selectedClass,
  setSelectedClass,
  selectedSubject,
  setSelectedSubject,
}) => {
  const { style } = useDashboardTheme();
  const isDark = style === 'obsidian-dark' || style === 'command-dark';

  const classes = [
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
  ];

  // Theme-aware grading engine for the selectors
  const themeGrading = useMemo(() => {
    switch (style) {
      case 'editorial-command':
        return {
          sectionTitle: 'text-[#1C232B] font-serif',
          labelTag: 'text-[#246257] bg-[#246257]/10 border-[#246257]/20',
          classPillActive: 'bg-[#246257] text-white shadow-xs font-bold border-[#246257]',
          classPillInactive:
            'bg-white text-[#1C232B] border-[#DDD4C7] hover:bg-[#F4EFEA] hover:border-[#246257]/40',
          subjectCardBase:
            'bg-white border-[#DDD4C7] text-[#1C232B] hover:border-[#246257]/60 hover:bg-[#FAF7F0] shadow-2xs',
          subjectCardActive:
            'bg-white ring-2 ring-[#246257] border-[#246257] text-[#246257] shadow-xs',
          activeIndicator: 'bg-[#246257] text-white',
          paletteHint: 'Editorial Sandstone & Spruce',
          domainSubtitle: 'Curricular domain breakdown for NCERT & State syllabus diagnostics',
        };

      case 'obsidian-dark':
      case 'command-dark':
        return {
          sectionTitle: 'text-slate-100 font-sans',
          labelTag: 'text-indigo-400 bg-indigo-950/80 border-indigo-800/60',
          classPillActive:
            'bg-indigo-600 text-white shadow-sm shadow-indigo-500/25 font-black border-indigo-500',
          classPillInactive:
            'bg-[#161622] text-slate-300 border-[#262633] hover:border-indigo-500/50 hover:bg-[#1C1C2A]',
          subjectCardBase:
            'bg-[#161622] border-[#262633] text-slate-200 hover:border-indigo-500/50 hover:bg-[#1A1A28] shadow-md',
          subjectCardActive:
            'bg-[#1A1A28] ring-2 ring-indigo-500 border-indigo-500 text-indigo-300 shadow-indigo-950/50 shadow-lg',
          activeIndicator: 'bg-indigo-600 text-white',
          paletteHint: 'Obsidian Matte & Radiant Indigo',
          domainSubtitle: 'Real-time telemetry and mastery filter across core learning tracks',
        };

      case 'academic-warm':
        return {
          sectionTitle: 'text-[#28231D] font-serif',
          labelTag: 'text-[#8C4A2F] bg-[#8C4A2F]/10 border-[#8C4A2F]/20',
          classPillActive:
            'bg-[#8C4A2F] text-white shadow-xs font-bold border-[#8C4A2F]',
          classPillInactive:
            'bg-[#FAF7F2] text-[#3D352B] border-[#E8E2D6] hover:border-[#8C4A2F]/40 hover:bg-[#F4EFEB]',
          subjectCardBase:
            'bg-[#FAF7F2] border-[#E8E2D6] text-[#28231D] hover:border-[#8C4A2F]/60 hover:bg-[#F4EFEB] shadow-2xs',
          subjectCardActive:
            'bg-[#FDFBFA] ring-2 ring-[#8C4A2F] border-[#8C4A2F] text-[#8C4A2F] shadow-xs',
          activeIndicator: 'bg-[#8C4A2F] text-white',
          paletteHint: 'Academic Parchment & Terracotta',
          domainSubtitle: 'Pedagogical focus areas calibrated to diagnostic benchmarks',
        };

      case 'clean':
      default:
        return {
          sectionTitle: 'text-slate-900 font-sans',
          labelTag: 'text-blue-600 bg-blue-50 border-blue-200',
          classPillActive:
            'bg-blue-600 text-white shadow-xs font-bold border-blue-600',
          classPillInactive:
            'bg-white text-slate-700 border-slate-200 hover:border-blue-300 hover:bg-slate-50',
          subjectCardBase:
            'bg-white border-slate-200 text-slate-800 hover:border-blue-400 hover:bg-blue-50/20 shadow-xs',
          subjectCardActive:
            'bg-white ring-2 ring-blue-600 border-blue-600 text-blue-700 shadow-xs',
          activeIndicator: 'bg-blue-600 text-white',
          paletteHint: 'Modern Pedagogic Daylight',
          domainSubtitle: 'Select subject discipline to filter struggle patterns & prescriptions',
        };
    }
  }, [style]);

  const subjects: {
    id: Subject;
    label: string;
    icon: React.ReactNode;
    colorAccent: string;
    topicCount: string;
  }[] = [
    {
      id: 'Mathematics',
      label: 'Mathematics',
      icon: <Calculator className="w-5 h-5" />,
      colorAccent: 'text-blue-600 dark:text-cyan-400 bg-blue-100/70 dark:bg-cyan-950/70',
      topicCount: '14 Topics • 3 Roadblocks',
    },
    {
      id: 'Science',
      label: 'Science',
      icon: <FlaskConical className="w-5 h-5" />,
      colorAccent: 'text-emerald-600 dark:text-emerald-400 bg-emerald-100/70 dark:bg-emerald-950/70',
      topicCount: '12 Topics • 2 Roadblocks',
    },
    {
      id: 'English',
      label: 'English',
      icon: <BookOpen className="w-5 h-5" />,
      colorAccent: 'text-rose-600 dark:text-rose-400 bg-rose-100/70 dark:bg-rose-950/70',
      topicCount: '10 Topics • 1 Roadblock',
    },
    {
      id: 'Social Science',
      label: 'Social Science',
      icon: <Globe className="w-5 h-5" />,
      colorAccent: 'text-amber-600 dark:text-amber-400 bg-amber-100/70 dark:bg-amber-950/70',
      topicCount: '11 Topics • 1 Roadblock',
    },
    {
      id: 'Hindi',
      label: 'Hindi',
      icon: <span className="text-lg font-bold leading-none">अ</span>,
      colorAccent: 'text-purple-600 dark:text-purple-400 bg-purple-100/70 dark:bg-purple-950/70',
      topicCount: '8 Topics • 1 Roadblock',
    },
    {
      id: 'All',
      label: 'All Subjects',
      icon: <LayoutGrid className="w-5 h-5" />,
      colorAccent: 'text-slate-600 dark:text-slate-300 bg-slate-200/70 dark:bg-slate-800/70',
      topicCount: '55 Aggregate Topics',
    },
  ];

  return (
    <div className="space-y-4" aria-label="Target Cohort and Diagnostic Subject Domain Selectors">
      {/* 1. Target Cohort / Grade Level Header & Pills */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <h2 className={`text-sm font-black tracking-tight ${themeGrading.sectionTitle}`}>
              Target Cohort / Grade Level
            </h2>
            <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${themeGrading.labelTag}`}>
              Active: {selectedClass}
            </span>
          </div>
          <span className="text-[11px] opacity-60 hidden sm:inline-block">
            10 Standard Grade Tiers
          </span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {classes.map((cls) => {
            const isActive = selectedClass === cls;
            return (
              <button
                key={cls}
                id={`class-pill-${cls.replace(' ', '-').toLowerCase()}`}
                onClick={() => setSelectedClass(cls)}
                className={`px-3.5 py-1.5 rounded-xl text-xs transition-all shrink-0 cursor-pointer border ${
                  isActive ? themeGrading.classPillActive : themeGrading.classPillInactive
                }`}
              >
                {cls}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Diagnostic Subject Domain Header & Grid Cards */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <h2 className={`text-sm font-black tracking-tight ${themeGrading.sectionTitle}`}>
              Diagnostic Subject Domain
            </h2>
            <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${themeGrading.labelTag}`}>
              {selectedSubject === 'All' ? 'Cross-Domain View' : selectedSubject}
            </span>
          </div>
          <p className="text-[11px] opacity-60 hidden md:inline-block">
            {themeGrading.domainSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5">
          {subjects.map((subj) => {
            const isActive = selectedSubject === subj.id;

            return (
              <button
                key={subj.id}
                id={`subject-card-${subj.id.replace(' ', '-').toLowerCase()}`}
                onClick={() => setSelectedSubject(subj.id)}
                className={`relative flex flex-col items-center justify-between p-3 rounded-2xl border transition-all cursor-pointer text-left ${
                  isActive ? themeGrading.subjectCardActive : themeGrading.subjectCardBase
                }`}
              >
                {/* Active check indicator badge */}
                {isActive && (
                  <span
                    className={`absolute top-2 right-2 w-4 h-4 rounded-full flex items-center justify-center text-[10px] shadow-2xs ${themeGrading.activeIndicator}`}
                  >
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </span>
                )}

                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center mb-2 shadow-2xs ${subj.colorAccent}`}
                >
                  {subj.icon}
                </div>

                <div className="w-full text-center">
                  <div className="text-xs font-black tracking-tight truncate">
                    {subj.label}
                  </div>
                  <div className="text-[10px] opacity-65 truncate mt-0.5 font-medium">
                    {subj.topicCount}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
