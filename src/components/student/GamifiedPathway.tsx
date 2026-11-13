import React from 'react';
import {
  CheckCircle2,
  Lock,
  Star,
  Sparkles,
  ChevronDown,
  Compass,
  Trophy,
  ShieldCheck,
  Zap,
  Crown,
  Waves,
  Flame,
} from 'lucide-react';

export type BiomeKey = 'plains' | 'ocean' | 'nether' | 'end';

interface PathwaySegmentProps {
  fromOffset: -1 | 0 | 1; // -1: left (-48px), 0: center, 1: right (+48px)
  toOffset: -1 | 0 | 1;
  status: 'completed' | 'active' | 'locked';
  biome: BiomeKey;
  stepNumber: number;
}

/**
 * Mathematically calculates cubic bezier curve points for SVG pathway connector.
 * Container viewBox is 320 x 84.
 * Center is X = 160. Offset multiplier is 56px.
 */
export const PathwaySegmentConnector: React.FC<PathwaySegmentProps> = ({
  fromOffset,
  toOffset,
  status,
  biome,
  stepNumber,
}) => {
  const startX = 160 + fromOffset * 56;
  const endX = 160 + toOffset * 56;
  const height = 84;

  // Cubic bezier control points for a smooth organic S-curve
  const cp1X = startX;
  const cp1Y = height * 0.52;
  const cp2X = endX;
  const cp2Y = height * 0.48;

  const pathD = `M ${startX} 0 C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${endX} ${height}`;

  // Bezier evaluation for micro-stepping waypoint stones at t = 0.33 and t = 0.67
  const evalBezier = (t: number) => {
    const mt = 1 - t;
    const x =
      mt * mt * mt * startX +
      3 * mt * mt * t * cp1X +
      3 * mt * t * t * cp2X +
      t * t * t * endX;
    const y =
      mt * mt * mt * 0 +
      3 * mt * mt * t * cp1Y +
      3 * mt * t * t * cp2Y +
      t * t * t * height;
    return { x, y };
  };

  const wp1 = evalBezier(0.35);
  const wp2 = evalBezier(0.68);

  // Biome-specific color palettes for the pathway
  const biomeStyles = {
    plains: {
      shadowColor: '#17360A',
      curbColor: '#4A2F1E',
      roadGradStart: '#9C6B4E',
      roadGradEnd: '#73482C',
      pebbleStroke: '#D4B499',
      activeColor: '#84CC16',
      activeGlow: '#BEF264',
      glowFilter: 'plains-glow',
      activeBg: 'bg-lime-400',
    },
    ocean: {
      shadowColor: '#021B2A',
      curbColor: '#083344',
      roadGradStart: '#0E7490',
      roadGradEnd: '#155E75',
      pebbleStroke: '#67E8F9',
      activeColor: '#06B6D4',
      activeGlow: '#22D3EE',
      glowFilter: 'ocean-glow',
      activeBg: 'bg-cyan-400',
    },
    nether: {
      shadowColor: '#1F0404',
      curbColor: '#360A0A',
      roadGradStart: '#7F1D1D',
      roadGradEnd: '#5B1111',
      pebbleStroke: '#FCA5A5',
      activeColor: '#EF4444',
      activeGlow: '#F97316',
      glowFilter: 'nether-glow',
      activeBg: 'bg-amber-500',
    },
    end: {
      shadowColor: '#080315',
      curbColor: '#1F0B3D',
      roadGradStart: '#4C1D95',
      roadGradEnd: '#3B0764',
      pebbleStroke: '#E9D5FF',
      activeColor: '#A855F7',
      activeGlow: '#C084FC',
      glowFilter: 'end-glow',
      activeBg: 'bg-purple-400',
    },
  }[biome];

  const gradId = `road-grad-${biome}-${stepNumber}`;
  const isCompleted = status === 'completed';
  const isActive = status === 'active';
  const isLocked = status === 'locked';

  return (
    <div className="relative w-full h-20 sm:h-22 flex items-center justify-center my-[-8px] z-0 overflow-visible pointer-events-none">
      <svg
        className="w-full h-full overflow-visible"
        viewBox="0 0 320 84"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          {/* 3D Roadbed Linear Gradient */}
          <linearGradient id={gradId} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={biomeStyles.roadGradStart} />
            <stop offset="100%" stopColor={biomeStyles.roadGradEnd} />
          </linearGradient>

          {/* Glowing Drop Shadow Filter for Active/Completed Flow */}
          <filter id="trail-shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor={biomeStyles.shadowColor} floodOpacity="0.85" />
          </filter>

          <filter id="active-pulse-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* 1. Deep Trench Shadow (Provides tactile depth) */}
        <path
          d={pathD}
          fill="none"
          stroke={biomeStyles.shadowColor}
          strokeWidth="34"
          strokeLinecap="round"
          filter="url(#trail-shadow)"
        />

        {/* 2. Outer Paved Curb Border */}
        <path
          d={pathD}
          fill="none"
          stroke={biomeStyles.curbColor}
          strokeWidth="26"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* 3. Main Roadbed Paving Track */}
        <path
          d={pathD}
          fill="none"
          stroke={`url(#${gradId})`}
          strokeWidth="20"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* 4. Tactile Stone Paving Texture / Edge Grooves */}
        <path
          d={pathD}
          fill="none"
          stroke={biomeStyles.pebbleStroke}
          strokeWidth="12"
          strokeDasharray="4 14"
          strokeLinecap="square"
          opacity={isLocked ? 0.35 : 0.6}
        />

        {/* 5. Centerline: Dynamic Status Trail */}
        {isCompleted ? (
          <>
            {/* Completed: Radiant illuminated golden/biome energy trail */}
            <path
              d={pathD}
              fill="none"
              stroke={biomeStyles.activeColor}
              strokeWidth="5"
              strokeLinecap="round"
              filter="url(#active-pulse-glow)"
              opacity="0.95"
            />
            <path
              d={pathD}
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeDasharray="6 12"
              opacity="0.8"
            />
          </>
        ) : isActive ? (
          <>
            {/* Active: Animated pulsating energy current leading to active node */}
            <path
              d={pathD}
              fill="none"
              stroke={biomeStyles.activeGlow}
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray="8 8"
              className="animate-pulse"
              style={{
                strokeDashoffset: 16,
                animation: 'dashFlow 1.5s linear infinite',
              }}
              filter="url(#active-pulse-glow)"
            />
            <path
              d={pathD}
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeDasharray="6 10"
              style={{
                animation: 'dashFlow 1.5s linear infinite',
              }}
            />
          </>
        ) : (
          /* Locked: Clean, muted dotted trail */
          <path
            d={pathD}
            fill="none"
            stroke="#94A3B8"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="4 8"
            opacity="0.4"
          />
        )}

        {/* 6. Micro-Stepping Waypoint Stones (Duolingo / Brilliant style) */}
        {[wp1, wp2].map((pt, i) => {
          const isPointActive = isActive && i === 1;
          const isPointCompleted = isCompleted || (isActive && i === 0);

          return (
            <g key={i} transform={`translate(${pt.x}, ${pt.y})`}>
              {/* Stepping stone drop shadow */}
              <circle r="7.5" fill={biomeStyles.shadowColor} cy="1.5" opacity="0.8" />

              {/* Stepping stone outer bezel */}
              <circle
                r="7"
                fill={isPointCompleted ? biomeStyles.activeColor : isPointActive ? '#FBBF24' : '#334155'}
                stroke={isPointCompleted ? '#FFFFFF' : isPointActive ? '#FEF08A' : '#64748B'}
                strokeWidth="1.5"
                filter={isPointCompleted || isPointActive ? 'url(#active-pulse-glow)' : undefined}
              />

              {/* Inner core glyph */}
              {isPointCompleted ? (
                <circle r="2.5" fill="#FFFFFF" />
              ) : isPointActive ? (
                <circle r="2.5" fill="#78350F" className="animate-ping" />
              ) : (
                <rect x="-1.5" y="-1.5" width="3" height="3" fill="#94A3B8" />
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
};

// ============================================================================
// BIOME GATEWAY PORTAL CHECKPOINT
// Professional transition bridge between chapters / biomes
// ============================================================================

interface BiomeGatewayPortalProps {
  fromBiome: BiomeKey;
  toBiome: BiomeKey;
  chapterNumber: number;
  chapterTitle: string;
  isUnlocked: boolean;
  onOpenBiomePalette?: () => void;
}

export const BiomeGatewayPortal: React.FC<BiomeGatewayPortalProps> = ({
  fromBiome,
  toBiome,
  chapterNumber,
  chapterTitle,
  isUnlocked,
  onOpenBiomePalette,
}) => {
  const portalInfo = {
    ocean: {
      name: 'Abyssal Marine Gateway',
      subtitle: 'Descend to the Submerged Reefs',
      portalIcon: Waves,
      gateBorder: 'border-sky-400/60',
      gateBg: 'bg-gradient-to-r from-sky-950 via-cyan-900 to-sky-950',
      badgeBg: 'bg-sky-500/20 text-sky-200 border-sky-400/40',
      glowColor: 'shadow-cyan-500/30',
      requirement: 'Complete Lessons 1–3 to cross the marine aqueduct',
    },
    nether: {
      name: 'Nether Fortress Obsidian Portal',
      subtitle: 'Breach the Scorched Underworld',
      portalIcon: Flame,
      gateBorder: 'border-rose-500/60',
      gateBg: 'bg-gradient-to-r from-rose-950 via-amber-950 to-rose-950',
      badgeBg: 'bg-rose-500/20 text-rose-200 border-rose-400/40',
      glowColor: 'shadow-rose-500/30',
      requirement: 'Complete Lessons 4–6 to ignite the obsidian portal',
    },
    end: {
      name: 'Stronghold Celestial End Portal',
      subtitle: 'Ascend to the Void Dragon Spire',
      portalIcon: Sparkles,
      gateBorder: 'border-purple-500/60',
      gateBg: 'bg-gradient-to-r from-purple-950 via-indigo-950 to-purple-950',
      badgeBg: 'bg-purple-500/20 text-purple-200 border-purple-400/40',
      glowColor: 'shadow-purple-500/30',
      requirement: 'Complete Lessons 7–9 to activate the 12 Eyes of Ender',
    },
  }[toBiome as 'ocean' | 'nether' | 'end'];

  const PortalIcon = portalInfo.portalIcon;

  return (
    <div className="relative w-full py-6 flex flex-col items-center z-20">
      {/* Upper Inflow Bridge Pathway (Centering into portal) */}
      <div className="w-8 h-8 flex flex-col items-center justify-center -mt-2 mb-1">
        <div className="w-4 h-full bg-gradient-to-b from-amber-400 to-slate-800 rounded-xs border-x-2 border-slate-900 shadow-inner" />
      </div>

      {/* Gateway Portal Card */}
      <div
        className={`w-[92%] sm:w-[85%] rounded-2xl p-4 border-2 ${
          portalInfo.gateBorder
        } ${portalInfo.gateBg} backdrop-blur-md shadow-xl ${
          isUnlocked ? portalInfo.glowColor : 'opacity-90'
        } transition-all relative overflow-hidden`}
      >
        {/* Subtle animated border flare */}
        {isUnlocked && (
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-xl pointer-events-none" />
        )}

        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            {/* 3D Portal Ring Icon */}
            <div
              className={`w-12 h-12 rounded-2xl border-2 flex items-center justify-center text-amber-300 shadow-lg relative ${
                isUnlocked
                  ? 'bg-slate-900 border-amber-300 ring-2 ring-amber-400/40'
                  : 'bg-slate-900/80 border-slate-700'
              }`}
            >
              <PortalIcon className="w-6 h-6" />
              {isUnlocked && (
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-slate-950 flex items-center justify-center">
                  <CheckCircle2 className="w-2.5 h-2.5 text-white" />
                </div>
              )}
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-amber-300">
                  CHAPTER {chapterNumber} GATEWAY
                </span>
                <span
                  className={`text-[9px] font-mono px-2 py-0.5 rounded-md border font-bold ${
                    isUnlocked
                      ? 'bg-emerald-950 text-emerald-300 border-emerald-500/50'
                      : 'bg-slate-900 text-slate-400 border-slate-700'
                  }`}
                >
                  {isUnlocked ? 'GATEWAY UNLOCKED' : 'GATEWAY SEALED'}
                </span>
              </div>
              <h4 className="text-sm sm:text-base font-black text-white">{portalInfo.name}</h4>
              <p className="text-xs text-slate-300 line-clamp-1">{portalInfo.subtitle}</p>
            </div>
          </div>

          <div className="flex flex-col items-end gap-1.5 shrink-0">
            <div className="flex items-center gap-1 text-[11px] font-bold text-amber-300 bg-black/40 px-2 py-1 rounded-lg border border-white/10">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>+100 XP</span>
            </div>
            {onOpenBiomePalette && (
              <button
                onClick={onOpenBiomePalette}
                className="text-[10px] text-slate-300 hover:text-white underline underline-offset-2 transition-colors cursor-pointer"
              >
                Inspect Biome
              </button>
            )}
          </div>
        </div>

        {/* Lock requirement warning if still locked */}
        {!isUnlocked && (
          <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center gap-2 text-xs text-amber-200/90 font-medium">
            <Lock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>{portalInfo.requirement}</span>
          </div>
        )}
      </div>

      {/* Downward Outflow Bridge Pathway (Leading to next lesson node) */}
      <div className="w-8 h-8 flex flex-col items-center justify-center mt-1 -mb-2">
        <div
          className={`w-4 h-full rounded-xs border-x-2 border-slate-900 shadow-inner ${
            isUnlocked
              ? 'bg-gradient-to-b from-slate-800 to-amber-400'
              : 'bg-gradient-to-b from-slate-800 to-slate-700'
          }`}
        />
      </div>
    </div>
  );
};

// ============================================================================
// THE DRAGON SUMMIT CAPSTONE PODIUM (End of Lesson 12)
// Grand golden trophy shrine celebrating complete curriculum mastery
// ============================================================================

interface SummitDragonSanctumProps {
  isMastered: boolean;
  totalLessons: number;
  completedLessons: number;
  earnedStars: number;
  totalStars: number;
  onJumpToStart: () => void;
}

export const SummitDragonSanctum: React.FC<SummitDragonSanctumProps> = ({
  isMastered,
  totalLessons,
  completedLessons,
  earnedStars,
  totalStars,
  onJumpToStart,
}) => {
  return (
    <div className="relative w-full mt-10 mb-6 flex flex-col items-center z-20 text-center px-4">
      {/* Floating Dragon Head & Crown Crest */}
      <div className="relative flex flex-col items-center mb-3">
        <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-amber-400 via-yellow-300 to-purple-600 p-1 shadow-2xl flex items-center justify-center animate-bounce" style={{ animationDuration: '3s' }}>
          <div className="w-full h-full bg-slate-950 rounded-[22px] flex items-center justify-center text-amber-400 shadow-inner border border-amber-300/40">
            <Crown className="w-9 h-9" />
          </div>
        </div>

        {/* Ambient Halo */}
        <div className="absolute -inset-4 bg-purple-500/20 rounded-full blur-xl pointer-events-none" />
      </div>

      <div className="bg-slate-950/90 border-2 border-purple-500/60 rounded-3xl p-5 max-w-md w-full backdrop-blur-md shadow-2xl text-white">
        <div className="flex items-center justify-center gap-2 mb-1">
          <Trophy className="w-4 h-4 text-amber-400" />
          <span className="text-xs font-black uppercase tracking-widest text-amber-400">
            PINNACLE OF MASTERY
          </span>
          <Trophy className="w-4 h-4 text-amber-400" />
        </div>

        <h3 className="text-lg font-black text-white mb-2">
          Dragon Gateway: Syllabus Completion
        </h3>

        <p className="text-xs text-slate-300 leading-relaxed mb-4">
          Conquer all 12 chapters across the Overworld, Ocean, Nether, and The End to claim the legendary Diamond Graduation Shield and faculty mastery honours!
        </p>

        {/* Progress Grid */}
        <div className="grid grid-cols-2 gap-2 bg-slate-900/80 p-3 rounded-2xl border border-purple-500/30 mb-4 text-left">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <div>
              <div className="text-[10px] text-slate-400 uppercase font-bold">Chapters</div>
              <div className="text-xs font-black text-white">
                {completedLessons} / {totalLessons} Mastered
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400 shrink-0" />
            <div>
              <div className="text-[10px] text-slate-400 uppercase font-bold">Total Stars</div>
              <div className="text-xs font-black text-yellow-300 flex items-center gap-1">
                <span>{earnedStars} / {totalStars}</span>
                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400 inline" />
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={onJumpToStart}
          className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 text-slate-950 font-black text-xs transition-all shadow-lg hover:scale-[1.02] active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2"
        >
          <Compass className="w-4 h-4 text-slate-950" />
          <span>Review Journey from Stage 1 (Plains)</span>
        </button>
      </div>
    </div>
  );
};
