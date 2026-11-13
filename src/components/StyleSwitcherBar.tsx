import React from 'react';
import { Palette, Sun, Moon, Library, Sparkles, Check, ArrowRight } from 'lucide-react';
import { useDashboardTheme } from '../context/ThemeContext';
import { DashboardStyle } from '../types';

export const StyleSwitcherBar: React.FC = () => {
  const { style, setStyle } = useDashboardTheme();

  const styles = [
    {
      id: 'editorial-command' as DashboardStyle,
      title: '1. Editorial Command',
      subtitle: 'Warm Sandstone (Default)',
      desc: 'Editorial serif typography, warm sandstone canvas (#F4EFEA), deep spruce teal (#246257), and terracotta indicators. Inspired by mission governance briefs.',
      icon: Sparkles,
      swatches: ['#246257', '#C85340', '#F8ECD0', '#F4EFEA'],
      themeClass: 'from-[#246257] to-[#1C4E45]',
      activeRing: 'ring-2 ring-[#246257] border-[#246257] bg-[#E5F2EE]/40',
    },
    {
      id: 'clean' as DashboardStyle,
      title: '2. Modern Pedagogic',
      subtitle: 'Clinical Light',
      desc: 'Crisp daylight slate with sky & indigo accents. High optical contrast optimized for daytime classroom presentation.',
      icon: Sun,
      swatches: ['#2563EB', '#38BDF8', '#F1F5F9', '#0F172A'],
      themeClass: 'from-blue-600 to-indigo-600',
      activeRing: 'ring-2 ring-blue-500 border-blue-400 bg-blue-50/40',
    },
    {
      id: 'obsidian-dark' as DashboardStyle,
      title: '3. Obsidian Dark',
      subtitle: 'Mineral Obsidian Dark',
      desc: 'Deep mineral obsidian canvas (#0A0A0E) with matte charcoal cards, amethyst violet accents, and silvery titanium typography. Purpose-built for nocturnal focus.',
      icon: Moon,
      swatches: ['#8B5CF6', '#6366F1', '#10B981', '#0A0A0E'],
      themeClass: 'from-indigo-600 to-purple-800',
      activeRing: 'ring-2 ring-indigo-500 border-indigo-500/80 bg-indigo-950/40 shadow-lg shadow-indigo-950/60',
    },
    {
      id: 'academic-warm' as DashboardStyle,
      title: '4. Academic Studio',
      subtitle: 'Editorial Warm',
      desc: 'Warm linen parchment with terracotta, sage forest & bronze accents. Inspired by classic scholarly journals & faculty libraries.',
      icon: Library,
      swatches: ['#9A3412', '#15803D', '#B45309', '#FAF7F2'],
      themeClass: 'from-amber-700 to-stone-800',
      activeRing: 'ring-2 ring-[#9A3412] border-[#C2410C] bg-[#F4EFEB]',
    },
  ];

  return (
    <div
      id="dashboard-style-switcher"
      className={`rounded-2xl p-4 transition-all duration-300 border ${
        style === 'command-dark'
          ? 'bg-[#111827] border-slate-800 shadow-xl'
          : style === 'academic-warm'
          ? 'bg-[#FFFDFB] border-[#E6DFD3] shadow-xs'
          : style === 'editorial-command'
          ? 'bg-white border-[#DDD4C7] shadow-xs'
          : 'bg-white border-slate-200/90 shadow-xs'
      }`}
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-3.5">
        <div className="flex items-center gap-2.5">
          <div
            className={`w-8 h-8 rounded-xl flex items-center justify-center ${
              style === 'command-dark'
                ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                : style === 'academic-warm'
                ? 'bg-amber-100 text-amber-900 border border-amber-200'
                : style === 'editorial-command'
                ? 'bg-[#E5F2EE] text-[#246257] border border-[#BFDFD6]'
                : 'bg-blue-50 text-blue-600 border border-blue-100'
            }`}
          >
            <Palette className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3
                className={`text-sm font-black tracking-tight ${
                  style === 'command-dark'
                    ? 'text-slate-100'
                    : style === 'academic-warm'
                    ? 'text-[#28231D]'
                    : style === 'editorial-command'
                    ? 'text-[#1C232B] font-serif text-base'
                    : 'text-slate-900'
                }`}
              >
                Dashboard Aesthetic & Atmosphere
              </h3>
              <span
                className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                  style === 'command-dark'
                    ? 'bg-cyan-950/50 text-cyan-300 border border-cyan-700/50'
                    : style === 'academic-warm'
                    ? 'bg-amber-100 text-amber-800 border border-amber-200'
                    : style === 'editorial-command'
                    ? 'bg-[#E5F2EE] text-[#246257] border border-[#BFDFD6]'
                    : 'bg-blue-100 text-blue-700 border border-blue-200'
                }`}
              >
                {style === 'editorial-command' ? 'Editorial Command Active' : '4 Styles Available'}
              </span>
            </div>
            <p
              className={`text-xs ${
                style === 'command-dark'
                  ? 'text-slate-400'
                  : style === 'academic-warm'
                  ? 'text-[#6D6353]'
                  : style === 'editorial-command'
                  ? 'text-[#5C6670]'
                  : 'text-slate-500'
              }`}
            >
              Switch between 3 handcrafted visual archetypes — every component and telemetry gauge transforms instantly.
            </p>
          </div>
        </div>

        {/* Mini quick pill indication */}
        <div className="flex items-center gap-1.5 self-start md:self-auto">
          <span
            className={`text-xs font-semibold ${
              style === 'command-dark'
                ? 'text-slate-400'
                : style === 'academic-warm'
                ? 'text-[#7D7363]'
                : 'text-slate-400'
            }`}
          >
            Active:
          </span>
          <span
            className={`text-xs font-black px-2.5 py-1 rounded-lg ${
              style === 'command-dark'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40'
                : style === 'academic-warm'
                ? 'bg-[#8C4A2F] text-white'
                : style === 'editorial-command'
                ? 'bg-[#246257] text-white'
                : 'bg-blue-600 text-white'
            }`}
          >
            {styles.find((s) => s.id === style)?.title.replace(/^[0-9.]+\s*/, '')}
          </span>
        </div>
      </div>

      {/* 4 Interactive Style Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {styles.map((s) => {
          const isActive = style === s.id;
          const Icon = s.icon;
          return (
            <button
              key={s.id}
              id={`style-select-btn-${s.id}`}
              onClick={() => setStyle(s.id)}
              className={`text-left p-3.5 rounded-xl border transition-all duration-200 relative group cursor-pointer ${
                isActive
                  ? s.activeRing
                  : style === 'command-dark'
                  ? 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                  : style === 'academic-warm'
                  ? 'bg-[#FBF9F5] border-[#E8E2D6] hover:border-[#D6CCC0] hover:bg-[#F6F2EB]'
                  : style === 'editorial-command'
                  ? 'bg-[#FAF7F0] border-[#DDD4C7] hover:border-[#B5A898] hover:bg-white'
                  : 'bg-slate-50/70 border-slate-200/80 hover:border-slate-300 hover:bg-slate-100/70'
              }`}
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${
                      isActive
                        ? 'bg-gradient-to-tr ' + s.themeClass + ' text-white shadow-2xs'
                        : style === 'command-dark'
                        ? 'bg-slate-800 text-slate-400'
                        : style === 'academic-warm'
                        ? 'bg-stone-200 text-stone-700'
                        : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span
                      className={`text-xs font-black block leading-tight ${
                        style === 'command-dark'
                          ? isActive
                            ? 'text-cyan-300'
                            : 'text-slate-200'
                          : style === 'academic-warm'
                          ? isActive
                            ? 'text-[#8C4A2F]'
                            : 'text-[#28231D]'
                          : isActive
                          ? 'text-blue-700'
                          : 'text-slate-800'
                      }`}
                    >
                      {s.title}
                    </span>
                    <span
                      className={`text-[10px] font-bold ${
                        style === 'command-dark'
                          ? 'text-slate-400'
                          : style === 'academic-warm'
                          ? 'text-[#7D7363]'
                          : 'text-slate-400'
                      }`}
                    >
                      {s.subtitle}
                    </span>
                  </div>
                </div>

                {/* Status Indicator */}
                {isActive ? (
                  <span
                    className={`inline-flex items-center gap-1 text-[10px] font-black px-2 py-0.5 rounded-full ${
                      s.id === 'command-dark'
                        ? 'bg-cyan-500 text-slate-950'
                        : s.id === 'academic-warm'
                        ? 'bg-[#8C4A2F] text-white'
                        : 'bg-blue-600 text-white'
                    }`}
                  >
                    <Check className="w-3 h-3 stroke-[3]" />
                    <span>Active</span>
                  </span>
                ) : (
                  <span
                    className={`text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity ${
                      style === 'command-dark' ? 'text-slate-400' : 'text-slate-400'
                    }`}
                  >
                    Click to apply
                  </span>
                )}
              </div>

              {/* Description */}
              <p
                className={`text-[11px] leading-relaxed mb-3 line-clamp-2 ${
                  style === 'command-dark'
                    ? 'text-slate-400'
                    : style === 'academic-warm'
                    ? 'text-[#645A4C]'
                    : 'text-slate-500'
                }`}
              >
                {s.desc}
              </p>

              {/* Color Swatch Dots */}
              <div className="flex items-center justify-between pt-2 border-t border-black/5 dark:border-white/5">
                <div className="flex items-center gap-1.5">
                  {s.swatches.map((color, idx) => (
                    <span
                      key={idx}
                      className="w-3.5 h-3.5 rounded-full border border-black/10 shadow-2xs inline-block"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
                <span
                  className={`text-[10px] font-extrabold flex items-center gap-0.5 ${
                    isActive
                      ? s.id === 'command-dark'
                        ? 'text-cyan-400'
                        : s.id === 'academic-warm'
                        ? 'text-[#8C4A2F]'
                        : s.id === 'editorial-command'
                        ? 'text-[#246257]'
                        : 'text-blue-600'
                      : 'text-slate-400 group-hover:text-slate-600'
                  }`}
                >
                  <span>Select</span>
                  <ArrowRight className="w-2.5 h-2.5" />
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
