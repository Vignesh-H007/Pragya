import React from 'react';
import { StudentAgeTier } from '../../types';
import { Sparkles, Compass, ShieldAlert, ArrowLeft } from 'lucide-react';

interface AgeTierSelectorProps {
  activeTier: StudentAgeTier;
  onSelectTier: (tier: StudentAgeTier) => void;
  onSwitchRole: () => void;
}

export const AgeTierSelector: React.FC<AgeTierSelectorProps> = ({
  activeTier,
  onSelectTier,
  onSwitchRole,
}) => {
  const tiers: {
    id: StudentAgeTier;
    title: string;
    subtitle: string;
    grades: string;
    palette: string[];
    tagline: string;
    bgClass: string;
    activeBorder: string;
  }[] = [
    {
      id: 'primary',
      title: 'Primary School (Ages 6–10)',
      subtitle: 'Bright, playful, fun and engaging',
      grades: 'Class 1 – 4',
      palette: ['#F43F5E', '#FBBF24', '#34D399', '#60A5FA', '#A78BFA'],
      tagline: 'Playful • Energetic • Friendly • Imaginative',
      bgClass: 'bg-rose-50/80 hover:bg-rose-100/70 text-rose-950',
      activeBorder: 'border-rose-400 ring-2 ring-rose-300 bg-white shadow-md',
    },
    {
      id: 'middle',
      title: 'Middle School (Ages 11–14)',
      subtitle: 'Fresh, balanced, motivating',
      grades: 'Class 5 – 7',
      palette: ['#047857', '#10B981', '#6EE7B7', '#93C5FD', '#818CF8'],
      tagline: 'Calm • Focused • Fresh • Motivating • Confident',
      bgClass: 'bg-emerald-50/80 hover:bg-emerald-100/70 text-emerald-950',
      activeBorder: 'border-emerald-500 ring-2 ring-emerald-300 bg-white shadow-md',
    },
    {
      id: 'high',
      title: 'High School (Ages 15–18)',
      subtitle: 'Modern, focused, sophisticated',
      grades: 'Class 8 – 10',
      palette: ['#0F172A', '#3B82F6', '#6366F1', '#8B5CF6', '#C4B5FD'],
      tagline: 'Focused • Modern • Calm • Aspirational • Mature',
      bgClass: 'bg-slate-800/80 hover:bg-slate-700/80 text-white',
      activeBorder: 'border-indigo-400 ring-2 ring-indigo-500/50 bg-slate-900 shadow-xl text-white',
    },
  ];

  return (
    <header className="w-full bg-white/90 backdrop-blur-md border-b border-slate-200/80 sticky top-0 z-50 px-4 py-2.5 transition-colors duration-300">
      <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Left: Context info (No floating switch role button on upper dashboard) */}
        <div className="flex items-center gap-2.5 w-full md:w-auto justify-start">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-200 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Student Learning Mode</span>
          </span>
          <span className="text-xs font-medium text-slate-500 hidden sm:inline">
            Adaptive Curriculum Journey
          </span>
        </div>

        {/* Center: 3 Age Tier Switcher Buttons matching reference */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 w-full md:w-auto">
          {tiers.map((t) => {
            const isActive = activeTier === t.id;
            return (
              <button
                key={t.id}
                onClick={() => onSelectTier(t.id)}
                className={`flex flex-col text-left px-3.5 py-2 rounded-xl border transition-all duration-200 ${
                  isActive
                    ? t.activeBorder
                    : 'border-slate-200/70 bg-slate-50/60 hover:bg-slate-100 text-slate-700'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-bold leading-tight line-clamp-1">
                    {t.title}
                  </span>
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${
                      isActive
                        ? t.id === 'high'
                          ? 'bg-indigo-600 text-white'
                          : 'bg-slate-800 text-white'
                        : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {t.grades}
                  </span>
                </div>
                <span
                  className={`text-[11px] mt-0.5 ${
                    isActive
                      ? t.id === 'high'
                        ? 'text-indigo-200'
                        : 'text-slate-600'
                      : 'text-slate-500'
                  }`}
                >
                  {t.subtitle}
                </span>

                {/* Color Palette Indicators */}
                <div className="flex items-center gap-1 mt-1.5">
                  {t.palette.map((c, i) => (
                    <span
                      key={i}
                      className="w-2.5 h-2.5 rounded-full border border-black/10 inline-block shadow-sm"
                      style={{ backgroundColor: c }}
                    />
                  ))}
                  <span
                    className={`text-[9px] font-medium ml-1.5 truncate max-w-[120px] ${
                      isActive
                        ? t.id === 'high'
                          ? 'text-slate-300'
                          : 'text-slate-600'
                        : 'text-slate-400'
                    }`}
                  >
                    {t.tagline.split('•')[0]}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
