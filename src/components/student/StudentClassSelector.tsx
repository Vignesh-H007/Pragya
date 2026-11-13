import React from 'react';
import { StudentAgeTier } from '../../types';

interface StudentClassSelectorProps {
  tier: StudentAgeTier;
  selectedClass: string;
  onSelectClass: (grade: string) => void;
}

export const StudentClassSelector: React.FC<StudentClassSelectorProps> = ({
  tier,
  selectedClass,
  onSelectClass,
}) => {
  const classMap: Record<StudentAgeTier, string[]> = {
    primary: ['Class 1', 'Class 2', 'Class 3', 'Class 4'],
    middle: ['Class 5', 'Class 6', 'Class 7'],
    high: ['Class 8', 'Class 9', 'Class 10'],
  };

  const classes = classMap[tier];

  // Active styles per tier
  const activeStyle = {
    primary: 'bg-rose-500 text-white font-bold shadow-md shadow-rose-500/20 border-rose-500 scale-105',
    middle: 'bg-teal-700 text-white font-bold shadow-md shadow-teal-700/20 border-teal-700 scale-105',
    high: 'bg-indigo-700 text-white font-bold shadow-lg shadow-indigo-700/30 border-indigo-600 scale-105',
  }[tier];

  const inactiveStyle = {
    primary: 'bg-white/80 text-slate-700 hover:bg-rose-50 hover:text-rose-600 border-slate-200/80',
    middle: 'bg-white text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 border-slate-200/80',
    high: 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white border-slate-700/80',
  }[tier];

  const labelColor = tier === 'high' ? 'text-slate-200' : 'text-slate-900';

  return (
    <div className="space-y-2">
      <h2 className={`text-xs font-bold tracking-tight ${labelColor}`}>
        Select Your Class
      </h2>
      <div className="flex flex-wrap items-center gap-2">
        {classes.map((cls) => {
          const isSelected = selectedClass === cls;
          return (
            <button
              key={cls}
              onClick={() => onSelectClass(cls)}
              className={`px-3.5 py-1.5 rounded-xl text-xs border transition-all duration-150 ${
                isSelected ? activeStyle : inactiveStyle
              }`}
            >
              {cls}
            </button>
          );
        })}
      </div>
    </div>
  );
};
