import React, { useState, useEffect } from 'react';
import { StudentAgeTier } from '../../types';
import { Check, CheckCircle2 } from 'lucide-react';

interface StudentGoalsCardProps {
  tier: StudentAgeTier;
}

interface GoalItem {
  id: string;
  text: string;
  completed: boolean;
}

export const StudentGoalsCard: React.FC<StudentGoalsCardProps> = ({ tier }) => {
  const initialGoalsByTier: Record<StudentAgeTier, GoalItem[]> = {
    primary: [
      { id: 'p1', text: 'Solve 5 Math questions', completed: true },
      { id: 'p2', text: 'Learn 1 new Science fact', completed: false },
      { id: 'p3', text: 'Complete English quiz', completed: false },
      { id: 'p4', text: 'Spend 20 minutes on AI Tutor', completed: false },
    ],
    middle: [
      { id: 'm1', text: 'Complete Science notes', completed: true },
      { id: 'm2', text: 'Solve 10 Math questions', completed: false },
      { id: 'm3', text: 'Read 1 English chapter', completed: false },
      { id: 'm4', text: 'Practice on AI Tutor (20 mins)', completed: false },
    ],
    high: [
      { id: 'h1', text: 'Solve 15 Physics numericals', completed: true },
      { id: 'h2', text: 'Revise Chemistry notes', completed: false },
      { id: 'h3', text: 'Complete English essay', completed: false },
      { id: 'h4', text: 'Practice on AI Tutor (30 mins)', completed: false },
    ],
  };

  const [goals, setGoals] = useState<GoalItem[]>(initialGoalsByTier[tier]);

  useEffect(() => {
    setGoals(initialGoalsByTier[tier]);
  }, [tier]);

  const toggleGoal = (id: string) => {
    setGoals((prev) =>
      prev.map((g) => (g.id === id ? { ...g, completed: !g.completed } : g))
    );
  };

  const styles = {
    primary: {
      cardBg: 'bg-white/95 border-2 border-rose-200/60',
      titleColor: 'text-slate-800',
      viewAllColor: 'text-rose-500 hover:text-rose-600',
      checkActive: 'bg-rose-500 text-white border-rose-500',
      checkInactive: 'border-slate-300 hover:border-rose-400 bg-white',
    },
    middle: {
      cardBg: 'bg-white border border-emerald-200/80',
      titleColor: 'text-slate-800',
      viewAllColor: 'text-emerald-600 hover:text-emerald-700',
      checkActive: 'bg-teal-600 text-white border-teal-600',
      checkInactive: 'border-slate-300 hover:border-emerald-500 bg-white',
    },
    high: {
      cardBg: 'bg-slate-900/95 border border-slate-800 text-slate-100',
      titleColor: 'text-slate-100',
      viewAllColor: 'text-indigo-400 hover:text-indigo-300',
      checkActive: 'bg-indigo-600 text-white border-indigo-500',
      checkInactive: 'border-slate-700 hover:border-indigo-400 bg-slate-800',
    },
  }[tier];

  return (
    <div className={`p-4 rounded-3xl shadow-sm transition-colors duration-300 ${styles.cardBg}`}>
      <div className="flex items-center justify-between mb-3">
        <h3 className={`text-xs font-bold tracking-tight ${styles.titleColor}`}>
          Today&apos;s Goal
        </h3>
        <button className={`text-[11px] font-semibold transition-colors ${styles.viewAllColor}`}>
          View All
        </button>
      </div>

      <div className="space-y-2.5">
        {goals.map((goal) => (
          <div
            key={goal.id}
            onClick={() => toggleGoal(goal.id)}
            className="flex items-center gap-2.5 group cursor-pointer select-none"
          >
            <div
              className={`w-4 h-4 rounded-md border flex items-center justify-center shrink-0 transition-all ${
                goal.completed ? styles.checkActive : styles.checkInactive
              }`}
            >
              {goal.completed && <Check className="w-3 h-3 stroke-[3]" />}
            </div>
            <span
              className={`text-xs transition-colors ${
                goal.completed
                  ? 'line-through text-slate-400'
                  : tier === 'high'
                  ? 'text-slate-200 group-hover:text-white'
                  : 'text-slate-700 group-hover:text-slate-900 font-medium'
              }`}
            >
              {goal.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
