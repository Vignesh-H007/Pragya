import React from 'react';
import { StudentAgeTier } from '../../types';
import {
  FlaskConical,
  BookOpen,
  Sprout,
  Palette,
  Calculator,
  Globe,
  Monitor,
  Atom,
  Dna,
  LayoutGrid,
} from 'lucide-react';

interface StudentSubjectSelectorProps {
  tier: StudentAgeTier;
  selectedSubject: string;
  onSelectSubject: (subj: string) => void;
}

export const StudentSubjectSelector: React.FC<StudentSubjectSelectorProps> = ({
  tier,
  selectedSubject,
  onSelectSubject,
}) => {
  // Primary subjects
  const primarySubjects = [
    { id: 'Math', label: 'Math', iconText: '1 2 3', bg: 'bg-blue-100 text-blue-700 border-blue-200' },
    { id: 'Science', label: 'Science', icon: FlaskConical, bg: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
    { id: 'English', label: 'English', icon: BookOpen, bg: 'bg-rose-100 text-rose-700 border-rose-200' },
    { id: 'EVS', label: 'EVS', icon: Sprout, bg: 'bg-cyan-100 text-cyan-700 border-cyan-200' },
    { id: 'Art & Fun', label: 'Art & Fun', icon: Palette, bg: 'bg-amber-100 text-amber-700 border-amber-200' },
  ];

  // Middle subjects
  const middleSubjects = [
    { id: 'Mathematics', label: 'Mathematics', icon: Calculator, bg: 'bg-blue-50 text-blue-600 border-blue-200' },
    { id: 'Science', label: 'Science', icon: FlaskConical, bg: 'bg-emerald-50 text-emerald-600 border-emerald-200' },
    { id: 'English', label: 'English', icon: BookOpen, bg: 'bg-rose-50 text-rose-600 border-rose-200' },
    { id: 'Social Science', label: 'Social Science', icon: Globe, bg: 'bg-cyan-50 text-cyan-600 border-cyan-200' },
    { id: 'Computer', label: 'Computer', icon: Monitor, bg: 'bg-sky-50 text-sky-600 border-sky-200' },
  ];

  // High school subjects
  const highSubjects = [
    { id: 'Mathematics', label: 'Mathematics', piText: 'π', bg: 'bg-blue-950/60 text-blue-400 border-blue-800/80' },
    { id: 'Physics', label: 'Physics', icon: Atom, bg: 'bg-purple-950/60 text-purple-400 border-purple-800/80' },
    { id: 'Chemistry', label: 'Chemistry', icon: FlaskConical, bg: 'bg-pink-950/60 text-pink-400 border-pink-800/80' },
    { id: 'Biology', label: 'Biology', icon: Dna, bg: 'bg-emerald-950/60 text-emerald-400 border-emerald-800/80' },
    { id: 'More', label: 'More', icon: LayoutGrid, bg: 'bg-slate-800/60 text-slate-400 border-slate-700' },
  ];

  const labelColor = tier === 'high' ? 'text-slate-200' : 'text-slate-900';

  return (
    <div className="space-y-2">
      <h2 className={`text-xs font-bold tracking-tight ${labelColor}`}>
        Choose a Subject
      </h2>

      {/* Grid of subjects */}
      <div className="grid grid-cols-5 gap-2.5">
        {tier === 'primary' &&
          primarySubjects.map((item) => {
            const isSelected = selectedSubject === item.id;
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => onSelectSubject(item.id)}
                className={`flex flex-col items-center justify-center p-2.5 rounded-2xl border transition-all duration-200 ${
                  isSelected
                    ? 'ring-2 ring-rose-400 bg-white shadow-md scale-105 border-rose-300'
                    : 'bg-white/90 hover:bg-white border-slate-200/80 shadow-xs'
                }`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-1.5 border font-black text-xs ${item.bg}`}>
                  {item.iconText ? (
                    <span className="tracking-tight text-[11px]">{item.iconText}</span>
                  ) : (
                    Icon && <Icon className="w-5 h-5 stroke-[2.2]" />
                  )}
                </div>
                <span className="text-[11px] font-bold text-slate-800 truncate max-w-full">
                  {item.label}
                </span>
              </button>
            );
          })}

        {tier === 'middle' &&
          middleSubjects.map((item) => {
            const isSelected = selectedSubject === item.id;
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => onSelectSubject(item.id)}
                className={`flex flex-col items-center justify-center p-2.5 rounded-2xl border transition-all duration-200 ${
                  isSelected
                    ? 'ring-2 ring-emerald-400 bg-white shadow-md scale-105 border-emerald-300'
                    : 'bg-white hover:bg-slate-50 border-slate-200/80 shadow-xs'
                }`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-1.5 border ${item.bg}`}>
                  <Icon className="w-5 h-5 stroke-[2]" />
                </div>
                <span className="text-[11px] font-semibold text-slate-800 truncate max-w-full">
                  {item.label}
                </span>
              </button>
            );
          })}

        {tier === 'high' &&
          highSubjects.map((item) => {
            const isSelected = selectedSubject === item.id;
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => onSelectSubject(item.id)}
                className={`flex flex-col items-center justify-center p-2.5 rounded-2xl border transition-all duration-200 ${
                  isSelected
                    ? 'ring-2 ring-indigo-500 bg-slate-800 shadow-lg scale-105 border-indigo-400'
                    : 'bg-slate-900/80 hover:bg-slate-800/80 border-slate-800 shadow-xs'
                }`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-1.5 border text-base font-bold ${item.bg}`}>
                  {item.piText ? (
                    <span className="text-lg font-serif">{item.piText}</span>
                  ) : (
                    Icon && <Icon className="w-5 h-5 stroke-[2]" />
                  )}
                </div>
                <span className="text-[11px] font-medium text-slate-200 truncate max-w-full">
                  {item.label}
                </span>
              </button>
            );
          })}
      </div>
    </div>
  );
};
