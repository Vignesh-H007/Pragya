import React, { useState } from 'react';
import {
  Compass,
  CheckCircle2,
  Circle,
  Plus,
  Target,
  Sparkles,
  BookOpen,
  Play,
  FlaskConical,
  TrendingUp,
  Award,
  Layers,
  FileCheck2,
} from 'lucide-react';
import { ClassSubjectSelector } from '../components/ClassSubjectSelector';
import { RightSidebarWidgets } from '../components/RightSidebarWidgets';
import { useDashboardTheme } from '../context/ThemeContext';
import {
  Subject,
  GoalItem,
  RemedialResource,
  PageId,
} from '../types';

interface CurriculaPageProps {
  selectedClass: string;
  setSelectedClass: (cls: string) => void;
  selectedSubject: Subject;
  setSelectedSubject: (subj: Subject) => void;
  passRate: number;
  fixedCount: number;
  activeGapsCount: number;
  goals: GoalItem[];
  onToggleGoal: (id: string) => void;
  resources: RemedialResource[];
  onOpenResource: (resource: RemedialResource) => void;
  onNavigate: (page: PageId) => void;
}

export const CurriculaPage: React.FC<CurriculaPageProps> = ({
  selectedClass,
  setSelectedClass,
  selectedSubject,
  setSelectedSubject,
  passRate,
  fixedCount,
  activeGapsCount,
  goals,
  onToggleGoal,
  resources,
  onOpenResource,
  onNavigate,
}) => {
  const { style } = useDashboardTheme();

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div
        className={`rounded-3xl p-6 border transition-all ${
          style === 'obsidian-dark' || style === 'command-dark'
            ? 'bg-gradient-to-r from-purple-950/40 via-[#121218] to-[#121218] border-purple-900/40 text-slate-100'
            : style === 'academic-warm'
            ? 'bg-gradient-to-r from-[#F5EEF7] via-[#FFFDFB] to-[#FFFDFB] border-[#E5D7EA] text-[#28231D]'
            : 'bg-gradient-to-r from-purple-50/90 via-white to-white border-purple-200/80 text-slate-900'
        }`}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-purple-600 text-white shadow-xs">
              <Compass className="w-3.5 h-3.5" />
              <span>Syllabus Trajectory & Remedial Assets</span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-black tracking-tight">
              Curricula & Batch Journey
            </h1>
            <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
              Monitor multi-phase learning trajectory milestones, complete faculty daily instructional goals,
              and deploy curated video explainers, concept simulations, and scaffolded worksheets.
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={() => onNavigate('roadblocks')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 transition cursor-pointer"
            >
              <span>Check Roadblocks</span>
            </button>
          </div>
        </div>
      </div>

      {/* Select Class & Choose Subject */}
      <ClassSubjectSelector
        selectedClass={selectedClass}
        setSelectedClass={setSelectedClass}
        selectedSubject={selectedSubject}
        setSelectedSubject={setSelectedSubject}
      />

      {/* Main Widgets in Wide Layout */}
      <div className="max-w-5xl mx-auto">
        <RightSidebarWidgets
          passRate={passRate}
          fixedCount={fixedCount}
          activeGapsCount={activeGapsCount}
          goals={goals}
          onToggleGoal={onToggleGoal}
          resources={resources}
          onOpenResource={onOpenResource}
        />
      </div>
    </div>
  );
};
