import React, { useState } from 'react';
import {
  Sparkles,
  ArrowDownRight,
  ShieldCheck,
  Zap,
  Flame,
  Target,
  RefreshCw,
  BellRing,
  Activity,
  Award,
  Layers,
  CheckCircle2,
} from 'lucide-react';
import { useDashboardTheme } from '../context/ThemeContext';

interface HeroBannerProps {
  selectedClass: string;
  selectedSubject: string;
  activeGapsCount: number;
  onScrollToHardestTopic: () => void;
  onScrollToStudentTable: () => void;
  onTriggerSync?: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  selectedClass,
  selectedSubject,
  activeGapsCount,
  onScrollToHardestTopic,
  onScrollToStudentTable,
  onTriggerSync,
}) => {
  const { style } = useDashboardTheme();
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncStatusText, setSyncStatusText] = useState('Sync Active');

  const handleQuickSync = () => {
    setIsSyncing(true);
    setSyncStatusText('Re-analyzing Diagnostics...');
    setTimeout(() => {
      setIsSyncing(false);
      setSyncStatusText('42 Profiles Synchronized');
      if (onTriggerSync) onTriggerSync();
      setTimeout(() => setSyncStatusText('Sync Active'), 3000);
    }, 1200);
  };

  return (
    <div
      id="hero-banner-container"
      className={`relative overflow-hidden rounded-3xl p-6 md:p-8 transition-all duration-300 ${
        style === 'command-dark'
          ? 'bg-gradient-to-br from-[#061826] via-[#0d1e3d] to-[#040813] border border-cyan-500/30 shadow-cyan-950/40 text-white'
          : style === 'academic-warm'
          ? 'bg-gradient-to-br from-[#5E1E09] via-[#8C3A18] to-[#2B170E] border border-[#A85834]/40 shadow-amber-950/20 text-white'
          : style === 'editorial-command'
          ? 'bg-[#FAF7F0] border border-[#DDD4C7] text-[#1C232B] shadow-2xs'
          : 'bg-gradient-to-br from-blue-600 via-indigo-700 to-slate-900 border border-blue-500/20 text-white shadow-md'
      }`}
    >
      {/* Dynamic ambient backdrop glows (for non-editorial themes) */}
      {style !== 'editorial-command' && (
        <>
          <div
            className={`absolute -top-16 -right-16 w-64 h-64 rounded-full blur-3xl pointer-events-none ${
              style === 'command-dark'
                ? 'bg-cyan-400/20'
                : style === 'academic-warm'
                ? 'bg-amber-400/15'
                : 'bg-sky-400/20'
            }`}
          />
          <div
            className={`absolute -bottom-16 -left-16 w-64 h-64 rounded-full blur-3xl pointer-events-none ${
              style === 'command-dark'
                ? 'bg-violet-500/25'
                : style === 'academic-warm'
                ? 'bg-stone-500/20'
                : 'bg-indigo-500/25'
            }`}
          />
        </>
      )}

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        {/* Left Column: Greeting & Catchy Value Prop */}
        <div className="space-y-3.5 max-w-2xl">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold shadow-2xs backdrop-blur-md border ${
                style === 'command-dark'
                  ? 'bg-cyan-950/70 border-cyan-500/40 text-cyan-200'
                  : style === 'academic-warm'
                  ? 'bg-black/20 border-amber-300/30 text-amber-200'
                  : style === 'editorial-command'
                  ? 'bg-[#E5F2EE] border-[#BFDFD6] text-[#246257] font-mono text-[11px] tracking-wider uppercase'
                  : 'bg-white/10 border-white/20 text-sky-200'
              }`}
            >
              <Sparkles className={`w-3.5 h-3.5 ${style === 'editorial-command' ? 'text-[#246257]' : 'text-amber-300 animate-pulse'}`} />
              <span>
                {style === 'editorial-command'
                  ? `Pragya / Academic Brief • ${selectedClass} • ${selectedSubject}`
                  : `Diagnostic Command Center • ${selectedClass} • ${selectedSubject}`}
              </span>
            </span>

            <button
              onClick={handleQuickSync}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold backdrop-blur-md transition cursor-pointer ${
                style === 'command-dark'
                  ? 'bg-emerald-950/60 border border-emerald-400/50 text-emerald-300 hover:bg-emerald-900/60'
                  : style === 'academic-warm'
                  ? 'bg-emerald-900/40 border border-emerald-400/40 text-emerald-200 hover:bg-emerald-900/60'
                  : style === 'editorial-command'
                  ? 'bg-white border border-[#DDD4C7] text-[#246257] hover:bg-[#F4EFEA] font-mono'
                  : 'bg-emerald-500/20 border border-emerald-400/40 text-emerald-200 hover:bg-emerald-500/30'
              }`}
            >
              <RefreshCw className={`w-3 h-3 ${isSyncing ? 'animate-spin text-emerald-600' : ''}`} />
              <span>{syncStatusText}</span>
            </button>
          </div>

          <h1
            className={`tracking-tight leading-tight ${
              style === 'editorial-command'
                ? 'font-serif text-3xl md:text-4xl lg:text-[42px] text-[#1C232B] font-normal leading-[1.18]'
                : 'text-2xl md:text-3xl lg:text-4xl font-black text-white'
            }`}
          >
            {style === 'editorial-command' ? (
              <>
                A defensible read on{' '}
                <span className="italic font-serif text-[#246257]">class learning gaps.</span>
              </>
            ) : (
              <>
                Pinpoint Roadblocks.{' '}
                <span
                  className={`text-transparent bg-clip-text bg-gradient-to-r ${
                    style === 'command-dark'
                      ? 'from-cyan-300 via-sky-200 to-violet-300'
                      : style === 'academic-warm'
                      ? 'from-amber-200 via-orange-100 to-amber-300 font-serif'
                      : 'from-sky-200 via-blue-100 to-indigo-200'
                  }`}
                >
                  Prescribe Remediation.
                </span>
              </>
            )}
          </h1>

          <p
            className={`text-xs md:text-sm leading-relaxed ${
              style === 'command-dark'
                ? 'text-slate-300 font-medium'
                : style === 'academic-warm'
                ? 'text-amber-100/90 font-medium'
                : style === 'editorial-command'
                ? 'text-[#5C6670] leading-relaxed max-w-xl'
                : 'text-slate-200 font-medium'
            }`}
          >
            {style === 'editorial-command'
              ? 'Updated today. Four diagnostic lenses, one operating picture. Review the conceptual bottlenecks and targeted prescriptions before the next instructional cycle.'
              : 'Identify the #1 bottleneck holding back your batch, review topic mastery vs individual students, and launch scaffolded interventions.'}
          </p>

          {/* Interactive Action Badges */}
          <div className="flex flex-wrap items-center gap-2.5 pt-2">
            <button
              id="hero-jump-hardest-btn"
              onClick={onScrollToHardestTopic}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition shadow-sm cursor-pointer hover:scale-[1.01] active:scale-[0.99] ${
                style === 'command-dark'
                  ? 'bg-cyan-400 text-slate-950 hover:bg-cyan-300 shadow-cyan-500/30 font-black'
                  : style === 'academic-warm'
                  ? 'bg-[#FAF6F0] text-[#5E1E09] hover:bg-white shadow-amber-950/20 font-black'
                  : style === 'editorial-command'
                  ? 'bg-[#246257] hover:bg-[#1C4E45] text-white shadow-2xs font-semibold'
                  : 'bg-white text-blue-900 hover:bg-sky-50 font-black'
              }`}
            >
              <Flame className={`w-4 h-4 ${style === 'editorial-command' ? 'text-amber-300 fill-amber-300' : 'text-rose-600 fill-rose-500'}`} />
              <span>Inspect #1 Hardest Topic (Integers)</span>
              <ArrowDownRight className="w-4 h-4" />
            </button>

            <button
              id="hero-jump-students-btn"
              onClick={onScrollToStudentTable}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold backdrop-blur-md transition shadow-2xs cursor-pointer hover:scale-[1.01] active:scale-[0.99] ${
                style === 'editorial-command'
                  ? 'bg-white hover:bg-[#F4EFEA] border border-[#DDD4C7] text-[#1C232B] font-semibold'
                  : 'bg-white/10 hover:bg-white/20 border border-white/20 text-white font-extrabold'
              }`}
            >
              <ShieldCheck className={`w-4 h-4 ${style === 'editorial-command' ? 'text-[#246257]' : 'text-emerald-400'}`} />
              <span>Review {activeGapsCount} Active Student Gaps</span>
            </button>
          </div>
        </div>

        {/* Right Column: Catchy Interactive Batch Velocity Widget */}
        <div
          className={`lg:w-72 rounded-2xl p-4 border space-y-3 shrink-0 shadow-xs ${
            style === 'command-dark'
              ? 'bg-slate-950/60 border-cyan-500/20 backdrop-blur-md text-white'
              : style === 'academic-warm'
              ? 'bg-black/25 border-amber-300/20 backdrop-blur-md text-white'
              : style === 'editorial-command'
              ? 'bg-white border-[#DDD4C7] text-[#1C232B]'
              : 'bg-white/10 border-white/15 backdrop-blur-md text-white'
          }`}
        >
          <div className="flex items-center justify-between">
            <div
              className={`flex items-center gap-1.5 text-xs font-bold ${
                style === 'command-dark'
                  ? 'text-cyan-300'
                  : style === 'academic-warm'
                  ? 'text-amber-200'
                  : style === 'editorial-command'
                  ? 'text-[#1C232B] font-mono uppercase text-[11px] tracking-wider'
                  : 'text-sky-200'
              }`}
            >
              <Activity className={`w-4 h-4 ${style === 'editorial-command' ? 'text-[#246257]' : ''}`} />
              <span>Sprint Velocity</span>
            </div>
            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                style === 'command-dark'
                  ? 'bg-emerald-400/20 text-emerald-300 border-emerald-400/40'
                  : style === 'academic-warm'
                  ? 'bg-emerald-500/20 text-emerald-200 border-emerald-400/30'
                  : style === 'editorial-command'
                  ? 'bg-[#E5F2EE] text-[#246257] border-[#BFDFD6] font-mono'
                  : 'bg-emerald-400/20 text-emerald-300 border-emerald-400/30'
              }`}
            >
              On Track
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-center">
            <div
              className={`rounded-xl p-2.5 border ${
                style === 'editorial-command'
                  ? 'bg-[#FAF7F0] border-[#DDD4C7]'
                  : 'bg-white/10 border-white/10'
              }`}
            >
              <span
                className={`text-xl block ${
                  style === 'editorial-command'
                    ? 'font-serif text-2xl text-[#1C232B] font-normal'
                    : 'font-black text-white'
                }`}
              >
                1.8x
              </span>
              <span
                className={`text-[10px] font-semibold ${
                  style === 'command-dark'
                    ? 'text-cyan-200'
                    : style === 'academic-warm'
                    ? 'text-amber-200'
                    : style === 'editorial-command'
                    ? 'text-[#5C6670] font-mono uppercase text-[9px]'
                    : 'text-sky-200'
                }`}
              >
                Remedial Pace
              </span>
            </div>
            <div
              className={`rounded-xl p-2.5 border ${
                style === 'editorial-command'
                  ? 'bg-[#FAF7F0] border-[#DDD4C7]'
                  : 'bg-white/10 border-white/10'
              }`}
            >
              <span
                className={`text-xl block ${
                  style === 'editorial-command'
                    ? 'font-serif text-2xl text-[#246257] font-normal'
                    : 'font-black text-emerald-300'
                }`}
              >
                74.5%
              </span>
              <span
                className={`text-[10px] font-semibold ${
                  style === 'command-dark'
                    ? 'text-cyan-200'
                    : style === 'academic-warm'
                    ? 'text-amber-200'
                    : style === 'editorial-command'
                    ? 'text-[#5C6670] font-mono uppercase text-[9px]'
                    : 'text-sky-200'
                }`}
              >
                Pass Rate
              </span>
            </div>
          </div>

          {/* Mini Milestone Target */}
          <div
            className={`p-2.5 rounded-xl border text-xs space-y-1 ${
              style === 'editorial-command'
                ? 'bg-[#FAF7F0] border-[#DDD4C7]'
                : 'bg-black/20 border-white/10'
            }`}
          >
            <div
              className={`flex items-center justify-between text-[10px] font-bold ${
                style === 'editorial-command' ? 'text-[#5C6670] font-mono' : 'text-slate-300'
              }`}
            >
              <span>Next Checkpoint:</span>
              <span
                className={
                  style === 'command-dark'
                    ? 'text-cyan-300'
                    : style === 'academic-warm'
                    ? 'text-amber-300'
                    : style === 'editorial-command'
                    ? 'text-[#246257] font-bold'
                    : 'text-sky-300'
                }
              >
                Exit Gate in 4 Days
              </span>
            </div>
            <div
              className={`w-full h-1.5 rounded-full overflow-hidden ${
                style === 'editorial-command' ? 'bg-[#E7DFD4]' : 'bg-white/20'
              }`}
            >
              <div
                className={`h-full rounded-full transition-all duration-500 w-3/4 ${
                  style === 'command-dark'
                    ? 'bg-gradient-to-r from-cyan-400 to-emerald-400'
                    : style === 'academic-warm'
                    ? 'bg-gradient-to-r from-amber-400 to-emerald-400'
                    : style === 'editorial-command'
                    ? 'bg-[#246257]'
                    : 'bg-gradient-to-r from-sky-400 to-emerald-400'
                }`}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

