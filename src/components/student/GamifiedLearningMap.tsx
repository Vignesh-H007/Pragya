import React, { useState, useEffect, useRef } from 'react';
import { StudentAgeTier } from '../../types';
import { getSyllabusForSubject, BIOMES, SyllabusLesson, BiomeInfo } from '../../data/syllabusCurriculum';
import {
  PixelBoyCharacter,
  PixelGirlCharacter,
  PixelGrassBlock,
  PixelOakTree,
  PixelPoppyFlower,
  PixelSeaLantern,
  PixelCoralReef,
  PixelAirBubbles,
  PixelNetherPortal,
  PixelLavaFall,
  PixelGlowstone,
  PixelEndCrystalSpire,
  PixelEnderDragon,
  PixelChorusPlant,
} from './MinecraftBiomeAssets';
import {
  ArrowLeft,
  Flame,
  Star,
  Zap,
  Sparkles,
  CheckCircle2,
  Lock,
  Play,
  X,
  Compass,
  Scroll,
  Navigation,
  Trophy,
  HelpCircle,
  Volume2,
  Palette,
  Swords,
  User,
  Sprout,
  Waves,
  Check,
  Rocket,
} from 'lucide-react';
import { BiomeMob } from '../../data/biomeMobsData';
import { AmbientBiomeMobs } from './AmbientBiomeMobs';
import { MobTestBattleModal } from './MobTestBattleModal';
import {
  BIOME_THEMES,
  BiomePaletteModal,
  PlainsThemeBackground,
  OceanThemeBackground,
  NetherThemeBackground,
  EndThemeBackground,
} from './BiomeVisualThemes';
import {
  PathwaySegmentConnector,
  BiomeGatewayPortal,
  SummitDragonSanctum,
} from './GamifiedPathway';

export type CharacterGender = 'boy' | 'girl';

export interface MapLessonState extends SyllabusLesson {
  status: 'completed' | 'active' | 'locked';
  stars: number;
}

interface GamifiedLearningMapProps {
  tier: StudentAgeTier;
  activeClass: string;
  activeSubject: string;
  onBackToDashboard?: () => void;
}

export const GamifiedLearningMap: React.FC<GamifiedLearningMapProps> = ({
  tier,
  activeClass,
  activeSubject,
  onBackToDashboard,
}) => {
  // 1. Character Gender Choice (Boy or Girl) persisted in localStorage
  const [characterGender, setCharacterGender] = useState<CharacterGender>(() => {
    const saved = localStorage.getItem('learnbuddy_quest_character_gender');
    return saved === 'girl' ? 'girl' : 'boy';
  });

  const handleSelectGender = (gender: CharacterGender) => {
    setCharacterGender(gender);
    localStorage.setItem('learnbuddy_quest_character_gender', gender);
  };

  // Character metadata
  const characterInfo = {
    boy: {
      name: 'Rohan (Pixel Scout)',
      title: 'Diamond Explorer',
      color: 'teal',
      accentBg: 'bg-teal-500',
      speech: 'Time to craft some knowledge! Let’s explore the biomes.',
    },
    girl: {
      name: 'Aanya (Pixel Pioneer)',
      title: 'Nether & End Navigator',
      color: 'rose',
      accentBg: 'bg-rose-500',
      speech: 'Map is ready! Which syllabus chapter are we conquering next?',
    },
  }[characterGender];

  // 2. Syllabus Lessons state mapped from syllabusCurriculum
  const [lessons, setLessons] = useState<MapLessonState[]>(() => {
    const raw = getSyllabusForSubject(activeClass, activeSubject);
    return raw.map((item, idx) => ({
      ...item,
      // Default: First 2 completed, 3rd active, others locked
      status: idx < 2 ? 'completed' : idx === 2 ? 'active' : 'locked',
      stars: idx < 2 ? 3 : 0,
    }));
  });

  // Re-generate if class or subject changes
  useEffect(() => {
    const raw = getSyllabusForSubject(activeClass, activeSubject);
    setLessons(
      raw.map((item, idx) => ({
        ...item,
        status: idx < 2 ? 'completed' : idx === 2 ? 'active' : 'locked',
        stars: idx < 2 ? 3 : 0,
      }))
    );
  }, [activeClass, activeSubject]);

  // Active stats
  const [streakDays] = useState(7);
  const earnedStars = lessons.reduce((acc, l) => acc + l.stars, 0);
  const totalStars = lessons.length * 3;
  const [xp, setXp] = useState(480);
  const [selectedLesson, setSelectedLesson] = useState<MapLessonState | null>(null);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [celebrationMsg, setCelebrationMsg] = useState('');

  // 4-Biome Visual Theme & Color Palette Inspector Modal
  const [isPaletteModalOpen, setIsPaletteModalOpen] = useState(false);
  const [inspectedBiomeId, setInspectedBiomeId] = useState<'plains' | 'ocean' | 'nether' | 'end'>('plains');

  const handleOpenBiomePalette = (biomeKey: 'plains' | 'ocean' | 'nether' | 'end') => {
    setInspectedBiomeId(biomeKey);
    setIsPaletteModalOpen(true);
  };

  // 5. Biome Mobs State & Handlers
  const [selectedBattleMob, setSelectedBattleMob] = useState<BiomeMob | null>(null);
  const [defeatedMobIds, setDefeatedMobIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('learnbuddy_quest_defeated_mobs');
      return saved ? JSON.parse(saved) : ['mob-plains-zombie'];
    } catch {
      return ['mob-plains-zombie'];
    }
  });

  const handleMobDefeated = (mob: BiomeMob, xpEarned: number) => {
    setDefeatedMobIds((prev) => {
      if (prev.includes(mob.id)) return prev;
      const next = [...prev, mob.id];
      try {
        localStorage.setItem('learnbuddy_quest_defeated_mobs', JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
    setXp((prev) => prev + xpEarned);
    setCelebrationMsg(`Mob Defeated: ${mob.name}! Gained +${xpEarned} XP & Rare Loot!`);
    setShowCelebration(true);
    setTimeout(() => setShowCelebration(false), 3500);
  };

  // Active lesson
  const activeLesson = lessons.find((l) => l.status === 'active') || lessons[0];

  // Refs for smooth biome scrolling
  const containerRef = useRef<HTMLDivElement>(null);
  const biomeRefs = {
    plains: useRef<HTMLDivElement>(null),
    ocean: useRef<HTMLDivElement>(null),
    nether: useRef<HTMLDivElement>(null),
    end: useRef<HTMLDivElement>(null),
  };
  const activeNodeRef = useRef<HTMLDivElement>(null);

  const scrollToBiome = (biomeKey: 'plains' | 'ocean' | 'nether' | 'end') => {
    biomeRefs[biomeKey].current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const scrollToActiveLesson = () => {
    activeNodeRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  // Lesson open modal
  const handleOpenLesson = (lesson: MapLessonState) => {
    setSelectedLesson(lesson);
    setSelectedAnswerIndex(null);
    setHasAnswered(false);
  };

  // Lesson completion handler
  const handleCompleteLesson = () => {
    if (!selectedLesson) return;

    // Advance this lesson to completed
    setLessons((prev) => {
      const idx = prev.findIndex((l) => l.id === selectedLesson.id);
      if (idx === -1) return prev;

      const updated = [...prev];
      updated[idx] = {
        ...updated[idx],
        status: 'completed',
        stars: 3,
      };

      // Unlock next lesson
      if (idx + 1 < updated.length) {
        updated[idx + 1] = {
          ...updated[idx + 1],
          status: 'active',
        };
      }
      return updated;
    });

    setXp((prev) => prev + selectedLesson.xpReward);
    setCelebrationMsg(
      `Chapter Mastered! +3 Stars & +${selectedLesson.xpReward} XP! Next biome trail unlocked!`
    );
    setShowCelebration(true);
    setTimeout(() => setShowCelebration(false), 3500);
    setSelectedLesson(null);
  };

  return (
    <div
      ref={containerRef}
      className="w-full flex flex-col items-center pb-24 select-none relative animate-in fade-in duration-200"
    >
      {/* Toast Notification for XP & Star Gain */}
      {showCelebration && (
        <div className="fixed top-16 z-50 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 text-slate-950 px-6 py-3.5 rounded-2xl font-black text-xs sm:text-sm shadow-2xl flex items-center gap-3 border-3 border-white animate-bounce">
          <Sparkles className="w-5 h-5 text-amber-900 shrink-0" />
          <span>{celebrationMsg}</span>
        </div>
      )}

      {/* ==========================================
          TOP STICKY COMMAND HUD & BIOME NAVIGATOR
      ========================================== */}
      <div className="w-full max-w-3xl px-3 pt-2 pb-2 sticky top-14 z-40 space-y-2">
        <div className="bg-slate-900/95 backdrop-blur-md border-2 border-slate-700/80 rounded-2xl p-3 sm:p-4 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Left: Back + Character Info */}
          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
            {onBackToDashboard && (
              <button
                onClick={onBackToDashboard}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors border border-slate-700"
                title="Back to Student Dashboard"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
            )}

            <div className="flex items-center gap-2.5">
              {/* Character sprite preview icon */}
              <div className="w-11 h-11 rounded-xl bg-slate-800 border-2 border-slate-600 flex items-center justify-center p-0.5 overflow-hidden shadow-inner">
                {characterGender === 'boy' ? (
                  <PixelBoyCharacter size={32} />
                ) : (
                  <PixelGirlCharacter size={32} />
                )}
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-sm text-white tracking-wide">
                    {characterInfo.name}
                  </span>
                  <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-md font-mono border border-amber-500/30">
                    Lvl 7
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 font-medium">
                  {activeClass} • {activeSubject} Syllabus Trail
                </p>
              </div>
            </div>

            {/* Boy / Girl Gender Toggle */}
            <div className="flex items-center bg-slate-800/90 p-1 rounded-xl border border-slate-700">
              <button
                onClick={() => handleSelectGender('boy')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                  characterGender === 'boy'
                    ? 'bg-teal-600 text-white shadow-xs scale-105'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Play as Pixel Boy Adventurer"
              >
                <User className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Boy</span>
              </button>

              <button
                onClick={() => handleSelectGender('girl')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                  characterGender === 'girl'
                    ? 'bg-rose-600 text-white shadow-xs scale-105'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Play as Pixel Girl Adventurer"
              >
                <User className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Girl</span>
              </button>
            </div>
          </div>

          {/* Right: Stars, Streak & Jump to Quest */}
          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <div className="bg-amber-950/60 border border-amber-700/50 text-amber-300 px-2.5 py-1 rounded-xl text-xs font-bold flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span>{streakDays}d Streak</span>
            </div>

            <div className="bg-yellow-950/60 border border-yellow-700/50 text-yellow-300 px-2.5 py-1 rounded-xl text-xs font-bold flex items-center gap-1.5">
              <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
              <span className="flex items-center gap-1">
                <span>{earnedStars}/{totalStars}</span>
              </span>
            </div>

            <div className="bg-indigo-950/60 border border-indigo-700/50 text-indigo-300 px-2.5 py-1 rounded-xl text-xs font-bold hidden sm:flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-indigo-400 fill-indigo-400" />
              <span>{xp} XP</span>
            </div>

            <button
              onClick={() => handleOpenBiomePalette('plains')}
              className="px-2.5 py-1 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-400/40 text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm hover:scale-105 cursor-pointer"
              title="Inspect 4-Biome visual themes and color palettes"
            >
              <Palette className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">Palettes</span>
            </button>

            <button
              onClick={scrollToActiveLesson}
              className="px-3 py-1 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-black transition-all flex items-center gap-1.5 shadow-md hover:scale-105"
              title="Jump viewport to active character lesson"
            >
              <Navigation className="w-3.5 h-3.5 fill-slate-950" />
              <span className="hidden md:inline">Jump to Quest</span>
            </button>
          </div>
        </div>

        {/* Biome Quick-Jump Segmented Pill Bar */}
        <div className="grid grid-cols-4 gap-1.5 p-1 bg-slate-900/90 border border-slate-700/80 rounded-2xl backdrop-blur-md shadow-lg text-[11px] font-bold">
          {BIOMES.map((b) => {
            const hasActive = lessons.some((l) => l.biome === b.id && l.status === 'active');
            const allCompleted = lessons
              .filter((l) => l.biome === b.id)
              .every((l) => l.status === 'completed');

            return (
              <button
                key={b.id}
                onClick={() => scrollToBiome(b.id)}
                className={`py-1.5 px-2 rounded-xl flex items-center justify-center gap-1.5 transition-all text-center ${
                  hasActive
                    ? 'bg-amber-400 text-slate-950 font-black shadow-sm ring-2 ring-amber-300'
                    : allCompleted
                    ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-700/40 hover:bg-emerald-900/50'
                    : 'bg-slate-800/60 text-slate-300 hover:bg-slate-700 hover:text-white'
                }`}
              >
                {b.id === 'plains' ? (
                  <Sprout className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                ) : b.id === 'ocean' ? (
                  <Waves className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                ) : b.id === 'nether' ? (
                  <Flame className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                ) : (
                  <Sparkles className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                )}
                <span className="truncate">{b.name.replace(' Biome', '')}</span>
                {allCompleted && <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />}
              </button>
            );
          })}
        </div>

        {/* Dynamic Curriculum Progress Bar */}
        <div className="bg-slate-900/90 border border-slate-700/70 rounded-2xl px-3.5 py-2 backdrop-blur-md shadow-md">
          <div className="flex items-center justify-between text-[11px] font-bold text-slate-300 mb-1.5">
            <span className="flex items-center gap-1.5 text-amber-300">
              <Compass className="w-3.5 h-3.5 text-amber-400" />
              <span>Curriculum Pathway Progress</span>
            </span>
            <span className="font-mono text-xs text-white">
              {lessons.filter((l) => l.status === 'completed').length} / {lessons.length} Mastered (
              {Math.round(
                (lessons.filter((l) => l.status === 'completed').length / lessons.length) * 100
              )}
              %)
            </span>
          </div>
          <div className="grid grid-cols-12 gap-1 h-2">
            {lessons.map((l) => (
              <div
                key={l.id}
                className={`h-full rounded-full transition-all duration-300 ${
                  l.status === 'completed'
                    ? 'bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)]'
                    : l.status === 'active'
                    ? 'bg-amber-400 animate-pulse shadow-[0_0_6px_rgba(251,191,36,0.9)]'
                    : 'bg-slate-800 border border-slate-700/50'
                }`}
                title={`Lesson ${l.lessonNumber}: ${l.title} (${l.status})`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ==========================================
          THE 4-BIOME SCROLLING ROAD MAP
          1st: Plains | 2nd: Ocean | 3rd: Nether | 4th: The End
      ========================================== */}
      <div className="w-full max-w-[620px] px-3 mt-1 flex flex-col space-y-0 shadow-2xl rounded-3xl overflow-hidden border-4 border-slate-800 bg-slate-950">

        {/* ------------------------------------------
            BIOME 1: PLAINS (OVERWORLD)
        ------------------------------------------ */}
        <div
          ref={biomeRefs.plains}
          className={`relative w-full pt-8 pb-10 px-4 bg-gradient-to-b ${BIOME_THEMES.plains.bgGradient} border-b-8 ${BIOME_THEMES.plains.borderClass} text-white overflow-hidden`}
        >
          {/* CSS-based Visual Theme Atmospheric Background */}
          <PlainsThemeBackground />

          {/* Biome Header Banner */}
          <div className="relative z-10 flex items-center justify-between mb-8 bg-black/50 backdrop-blur-xs p-3 rounded-2xl border-2 border-[#8FCE00]/50 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#5B8C3A] border-2 border-[#8FCE00] flex items-center justify-center text-[#BEF264] shadow-xs">
                <Sprout className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-[#A3E635] block">
                  STAGE 1 • OVERWORLD BIOME
                </span>
                <h3 className="text-sm font-black text-white">Plains: Core Concepts</h3>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleOpenBiomePalette('plains')}
                className="hidden sm:flex items-center gap-1 text-[10px] font-mono bg-emerald-900/60 hover:bg-emerald-800 text-[#BEF264] px-2 py-1 rounded-lg border border-[#8FCE00]/40 font-bold transition-all cursor-pointer hover:scale-105"
                title="Inspect Plains visual theme & color palette"
              >
                <Palette className="w-3 h-3 text-[#BEF264]" />
                <span>Theme</span>
              </button>
              <span className="text-[10px] font-mono bg-[#8FCE00]/20 text-[#BEF264] px-2.5 py-1 rounded-lg border border-[#8FCE00]/30 font-bold">
                Lessons 1 – 3
              </span>
            </div>
          </div>

          {/* Biome Environment Pixel Decor */}
          <div className="absolute top-16 left-3 opacity-90 pointer-events-none z-10">
            <PixelOakTree size={70} />
          </div>
          <div className="absolute top-44 right-4 opacity-90 pointer-events-none z-10">
            <PixelOakTree size={65} />
          </div>
          <div className="absolute bottom-6 left-6 opacity-90 pointer-events-none z-10">
            <PixelPoppyFlower size={26} />
          </div>
          <div className="absolute bottom-10 right-8 opacity-90 pointer-events-none z-10">
            <PixelGrassBlock size={34} />
          </div>

          {/* Ambient Wild Mobs positioned around the landscape (NOT on pathway) */}
          <AmbientBiomeMobs
            biome="plains"
            defeatedMobIds={defeatedMobIds}
            onSelectMob={(mob) => setSelectedBattleMob(mob)}
            activeClass={activeClass}
            activeSubject={activeSubject}
          />

          {/* Road Path & Nodes for Plains (Lessons 1, 2, 3) */}
          <div className="relative flex flex-col items-center my-4 z-10">
            {lessons
              .filter((l) => l.biome === 'plains')
              .map((lesson, idx, arr) => {
                const isActive = lesson.status === 'active';
                const isCompleted = lesson.status === 'completed';
                const isLocked = lesson.status === 'locked';
                const offsetFactor: -1 | 0 | 1 = idx === 0 ? -1 : idx === 1 ? 1 : 0;
                const offsetClass =
                  offsetFactor === -1
                    ? '-translate-x-12 sm:-translate-x-14'
                    : offsetFactor === 1
                    ? 'translate-x-12 sm:translate-x-14'
                    : 'translate-x-0';
                const nextOffsetFactor: -1 | 0 | 1 = idx === 0 ? 1 : 0;

                return (
                  <React.Fragment key={lesson.id}>
                    <div
                      ref={isActive ? activeNodeRef : undefined}
                      className={`relative flex flex-col items-center transition-all ${offsetClass}`}
                    >
                      {/* Character sitting on active node */}
                      {isActive && (
                        <div
                          onClick={() => handleOpenLesson(lesson)}
                          className="absolute -top-16 flex flex-col items-center cursor-pointer animate-bounce z-30"
                          style={{ animationDuration: '2s' }}
                        >
                          {/* Speech bubble */}
                          <div className="bg-slate-900 border-2 border-amber-400 text-amber-300 text-[10px] font-extrabold px-3 py-1 rounded-xl whitespace-nowrap shadow-xl mb-1 flex items-center gap-1">
                            <User className="w-3 h-3 text-amber-300" />
                            <span>Ready! Tap to learn</span>
                            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-900 border-b-2 border-r-2 border-amber-400 rotate-45" />
                          </div>

                          {/* Pixel Character Sprite */}
                          <div className="w-12 h-14 flex items-center justify-center filter drop-shadow-lg">
                            {characterGender === 'boy' ? (
                              <PixelBoyCharacter size={44} isWalking={true} />
                            ) : (
                              <PixelGirlCharacter size={44} isWalking={true} />
                            )}
                          </div>
                        </div>
                      )}

                      {/* Active Node Pulsing Halo */}
                      {isActive && (
                        <div className="absolute -inset-2.5 rounded-full bg-amber-400 opacity-60 animate-ping pointer-events-none" />
                      )}

                      {/* Node Voxel Stone Block Button */}
                      <div className="flex flex-col items-center relative">
                        <button
                          onClick={() => handleOpenLesson(lesson)}
                          className={`relative w-16 h-16 sm:w-18 sm:h-18 rounded-2xl border-4 font-black text-base flex flex-col items-center justify-center shadow-2xl transition-all duration-150 cursor-pointer border-t-2 border-t-white/40 border-b-4 border-b-black/60 ${
                            isCompleted
                              ? 'bg-gradient-to-b from-[#84CC16] to-[#4D7C0F] border-[#BEF264] text-white hover:scale-105 active:scale-95'
                              : isActive
                              ? 'bg-gradient-to-b from-amber-300 to-amber-500 border-white text-slate-950 scale-110 shadow-amber-500/50 hover:scale-115 active:scale-95 ring-4 ring-amber-400 ring-offset-2 ring-offset-[#4F9429]'
                              : 'bg-slate-800/90 border-slate-600 text-slate-400 hover:bg-slate-700'
                          }`}
                        >
                          {/* Floating Completion Star Rating Pill */}
                          {isCompleted && (
                            <div className="absolute -top-2.5 -right-2 bg-amber-400 text-slate-950 font-black text-[9px] px-1.5 py-0.5 rounded-full border border-white shadow-md flex items-center gap-0.5">
                              <Star className="w-2.5 h-2.5 fill-slate-950 text-slate-950" />
                              <span>3/3</span>
                            </div>
                          )}

                          {isLocked ? (
                            <Lock className="w-5 h-5 text-slate-400" />
                          ) : (
                            <>
                              <span className="text-xs -mb-1">{lesson.icon}</span>
                              <span className="font-mono text-sm">{lesson.lessonNumber}</span>
                            </>
                          )}
                        </button>

                        {/* 3D Voxel Grass Block Pedestal */}
                        <div className="w-16 sm:w-18 h-2.5 -mt-1.5 rounded-b-xl bg-[#6E442D] border-b-2 border-[#4A2F1E] flex justify-around px-1 z-0 shadow-inner">
                          <div className="w-1 h-1.5 bg-[#84CC16] rounded-b-xs" />
                          <div className="w-1.5 h-2 bg-[#65A30D] rounded-b-xs" />
                          <div className="w-1 h-1 bg-[#84CC16] rounded-b-xs" />
                          <div className="w-1.5 h-1.5 bg-[#4D7C0F] rounded-b-xs" />
                        </div>
                      </div>

                      {/* Lesson Label */}
                      <div className="mt-2.5 bg-slate-950/90 backdrop-blur-md border border-white/20 px-3.5 py-1.5 rounded-xl text-center max-w-[210px] shadow-lg">
                        <div className="text-[9px] font-extrabold text-[#BEF264] uppercase tracking-wider truncate">
                          {lesson.chapter}
                        </div>
                        <div className="text-xs font-black text-white truncate">
                          {lesson.title.split(':')[1] || lesson.title}
                        </div>
                        <div className="flex items-center justify-center gap-2 mt-0.5 text-[10px]">
                          {isCompleted ? (
                            <span className="text-emerald-400 font-extrabold flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                              <span>Mastered (+{lesson.xpReward} XP)</span>
                            </span>
                          ) : isActive ? (
                            <span className="text-amber-400 font-black flex items-center gap-1">
                              <Zap className="w-3 h-3 fill-amber-400 text-amber-400" />
                              <span>Current Quest</span>
                            </span>
                          ) : (
                            <span className="text-slate-400 font-medium">5 min • +{lesson.xpReward} XP</span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Precise SVG Pathway Connector between adjacent nodes */}
                    {idx < arr.length - 1 && (
                      <PathwaySegmentConnector
                        fromOffset={offsetFactor}
                        toOffset={nextOffsetFactor}
                        status={
                          arr[idx + 1].status === 'completed'
                            ? 'completed'
                            : arr[idx + 1].status === 'active'
                            ? 'active'
                            : 'locked'
                        }
                        biome="plains"
                        stepNumber={idx + 1}
                      />
                    )}
                  </React.Fragment>
                );
              })}
          </div>

          {/* Professional Biome Gateway Portal to Ocean */}
          <BiomeGatewayPortal
            fromBiome="plains"
            toBiome="ocean"
            chapterNumber={1}
            chapterTitle="Stage 1: Overworld Foundations"
            isUnlocked={lessons
              .filter((l) => l.biome === 'plains')
              .every((l) => l.status === 'completed')}
            onOpenBiomePalette={() => handleOpenBiomePalette('ocean')}
          />
        </div>

        {/* ------------------------------------------
            BIOME 2: OCEAN (AQUATIC DEPTHS)
        ------------------------------------------ */}
        <div
          ref={biomeRefs.ocean}
          className={`relative w-full pt-8 pb-10 px-4 bg-gradient-to-b ${BIOME_THEMES.ocean.bgGradient} border-b-8 ${BIOME_THEMES.ocean.borderClass} text-white overflow-hidden`}
        >
          {/* CSS-based Visual Theme Atmospheric Background */}
          <OceanThemeBackground />

          {/* Biome Header Banner */}
          <div className="relative z-10 flex items-center justify-between mb-8 bg-black/50 backdrop-blur-xs p-3 rounded-2xl border-2 border-sky-400/50 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-sky-600 border-2 border-sky-300 flex items-center justify-center text-sky-200 shadow-xs">
                <Waves className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-sky-300 block">
                  STAGE 2 • AQUATIC DEPTHS
                </span>
                <h3 className="text-sm font-black text-white">Ocean: Applied Formulas & Relations</h3>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleOpenBiomePalette('ocean')}
                className="hidden sm:flex items-center gap-1 text-[10px] font-mono bg-sky-900/60 hover:bg-sky-800 text-sky-200 px-2 py-1 rounded-lg border border-sky-400/40 font-bold transition-all cursor-pointer hover:scale-105"
                title="Inspect Ocean visual theme & color palette"
              >
                <Palette className="w-3 h-3 text-sky-200" />
                <span>Theme</span>
              </button>
              <span className="text-[10px] font-mono bg-sky-400/20 text-sky-200 px-2.5 py-1 rounded-lg border border-sky-400/30 font-bold">
                Lessons 4 – 6
              </span>
            </div>
          </div>

          {/* Biome Environment Pixel Decor */}
          <div className="absolute top-16 right-4 opacity-90 pointer-events-none z-10">
            <PixelSeaLantern size={42} />
          </div>
          <div className="absolute top-44 left-3 opacity-90 pointer-events-none z-10">
            <PixelCoralReef size={48} />
          </div>
          <div className="absolute bottom-10 right-6 opacity-90 pointer-events-none z-10">
            <PixelAirBubbles size={30} />
          </div>
          <div className="absolute bottom-6 left-8 opacity-90 pointer-events-none z-10">
            <PixelSeaLantern size={36} />
          </div>

          {/* Ambient Wild Mobs positioned around the landscape (NOT on pathway) */}
          <AmbientBiomeMobs
            biome="ocean"
            defeatedMobIds={defeatedMobIds}
            onSelectMob={(mob) => setSelectedBattleMob(mob)}
            activeClass={activeClass}
            activeSubject={activeSubject}
          />

          {/* Road Path & Nodes for Ocean (Lessons 4, 5, 6) */}
          <div className="relative flex flex-col items-center my-4 z-10">
            {lessons
              .filter((l) => l.biome === 'ocean')
              .map((lesson, idx, arr) => {
                const isActive = lesson.status === 'active';
                const isCompleted = lesson.status === 'completed';
                const isLocked = lesson.status === 'locked';
                const offsetFactor: -1 | 0 | 1 = idx === 0 ? 1 : idx === 1 ? -1 : 0;
                const offsetClass =
                  offsetFactor === -1
                    ? '-translate-x-12 sm:-translate-x-14'
                    : offsetFactor === 1
                    ? 'translate-x-12 sm:translate-x-14'
                    : 'translate-x-0';
                const nextOffsetFactor: -1 | 0 | 1 = idx === 0 ? -1 : 0;

                return (
                  <React.Fragment key={lesson.id}>
                    <div
                      ref={isActive ? activeNodeRef : undefined}
                      className={`relative flex flex-col items-center transition-all ${offsetClass}`}
                    >
                      {/* Character sitting on active node */}
                      {isActive && (
                        <div
                          onClick={() => handleOpenLesson(lesson)}
                          className="absolute -top-16 flex flex-col items-center cursor-pointer animate-bounce z-30"
                          style={{ animationDuration: '2s' }}
                        >
                          <div className="bg-slate-900 border-2 border-amber-400 text-amber-300 text-[10px] font-extrabold px-3 py-1 rounded-xl whitespace-nowrap shadow-xl mb-1 flex items-center gap-1">
                            <User className="w-3 h-3 text-amber-300" />
                            <span>Diving deep! Tap node</span>
                            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-900 border-b-2 border-r-2 border-amber-400 rotate-45" />
                          </div>

                          <div className="w-12 h-14 flex items-center justify-center filter drop-shadow-lg">
                            {characterGender === 'boy' ? (
                              <PixelBoyCharacter size={44} isWalking={true} />
                            ) : (
                              <PixelGirlCharacter size={44} isWalking={true} />
                            )}
                          </div>
                        </div>
                      )}

                      {/* Pulsing halo */}
                      {isActive && (
                        <div className="absolute -inset-2.5 rounded-full bg-cyan-400 opacity-60 animate-ping pointer-events-none" />
                      )}

                      {/* Node Prismarine Block Button */}
                      <div className="flex flex-col items-center relative">
                        <button
                          onClick={() => handleOpenLesson(lesson)}
                          className={`relative w-16 h-16 sm:w-18 sm:h-18 rounded-2xl border-4 font-black text-base flex flex-col items-center justify-center shadow-2xl transition-all duration-150 cursor-pointer border-t-2 border-t-white/40 border-b-4 border-b-black/60 ${
                            isCompleted
                              ? 'bg-gradient-to-b from-[#06B6D4] to-[#0E7490] border-[#67E8F9] text-white hover:scale-105 active:scale-95'
                              : isActive
                              ? 'bg-gradient-to-b from-amber-300 to-amber-500 border-white text-slate-950 scale-110 shadow-amber-500/50 hover:scale-115 active:scale-95 ring-4 ring-cyan-400 ring-offset-2 ring-offset-[#0369A1]'
                              : 'bg-slate-800/90 border-slate-600 text-slate-400 hover:bg-slate-700'
                          }`}
                        >
                          {/* Floating Completion Star Rating Pill */}
                          {isCompleted && (
                            <div className="absolute -top-2.5 -right-2 bg-amber-400 text-slate-950 font-black text-[9px] px-1.5 py-0.5 rounded-full border border-white shadow-md flex items-center gap-0.5">
                              <Star className="w-2.5 h-2.5 fill-slate-950 text-slate-950" />
                              <span>3/3</span>
                            </div>
                          )}

                          {isLocked ? (
                            <Lock className="w-5 h-5 text-slate-400" />
                          ) : (
                            <>
                              <span className="text-xs -mb-1">{lesson.icon}</span>
                              <span className="font-mono text-sm">{lesson.lessonNumber}</span>
                            </>
                          )}
                        </button>

                        {/* 3D Voxel Prismarine Pedestal */}
                        <div className="w-16 sm:w-18 h-2.5 -mt-1.5 rounded-b-xl bg-[#083344] border-b-2 border-[#06B6D4]/70 flex justify-around px-1 z-0 shadow-inner">
                          <div className="w-1 h-1 bg-[#22D3EE] rounded-b-xs shadow-[0_0_4px_#22D3EE]" />
                          <div className="w-1.5 h-1.5 bg-[#67E8F9] rounded-b-xs shadow-[0_0_4px_#67E8F9]" />
                          <div className="w-1 h-1 bg-[#22D3EE] rounded-b-xs shadow-[0_0_4px_#22D3EE]" />
                        </div>
                      </div>

                      {/* Lesson Label */}
                      <div className="mt-2.5 bg-slate-950/90 backdrop-blur-md border border-white/20 px-3.5 py-1.5 rounded-xl text-center max-w-[210px] shadow-lg">
                        <div className="text-[9px] font-extrabold text-sky-300 uppercase tracking-wider truncate">
                          {lesson.chapter}
                        </div>
                        <div className="text-xs font-black text-white truncate">
                          {lesson.title.split(':')[1] || lesson.title}
                        </div>
                        <div className="flex items-center justify-center gap-2 mt-0.5 text-[10px]">
                          {isCompleted ? (
                            <span className="text-cyan-300 font-extrabold flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3 text-cyan-300" />
                              <span>Mastered (+{lesson.xpReward} XP)</span>
                            </span>
                          ) : isActive ? (
                            <span className="text-amber-400 font-black flex items-center gap-1">
                              <Zap className="w-3 h-3 fill-amber-400 text-amber-400" />
                              <span>Current Quest</span>
                            </span>
                          ) : (
                            <span className="text-slate-400 font-medium">5 min • +{lesson.xpReward} XP</span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Precise SVG Pathway Connector between adjacent nodes */}
                    {idx < arr.length - 1 && (
                      <PathwaySegmentConnector
                        fromOffset={offsetFactor}
                        toOffset={nextOffsetFactor}
                        status={
                          arr[idx + 1].status === 'completed'
                            ? 'completed'
                            : arr[idx + 1].status === 'active'
                            ? 'active'
                            : 'locked'
                        }
                        biome="ocean"
                        stepNumber={idx + 4}
                      />
                    )}
                  </React.Fragment>
                );
              })}
          </div>

          {/* Professional Biome Gateway Portal to Nether */}
          <BiomeGatewayPortal
            fromBiome="ocean"
            toBiome="nether"
            chapterNumber={2}
            chapterTitle="Stage 2: Oceanic Formulas"
            isUnlocked={lessons
              .filter((l) => l.biome === 'ocean')
              .every((l) => l.status === 'completed')}
            onOpenBiomePalette={() => handleOpenBiomePalette('nether')}
          />
        </div>

        {/* ------------------------------------------
            BIOME 3: THE NETHER (FIERY CHALLENGES)
        ------------------------------------------ */}
        <div
          ref={biomeRefs.nether}
          className={`relative w-full pt-8 pb-10 px-4 bg-gradient-to-b ${BIOME_THEMES.nether.bgGradient} border-b-8 ${BIOME_THEMES.nether.borderClass} text-white overflow-hidden`}
        >
          {/* CSS-based Visual Theme Atmospheric Background */}
          <NetherThemeBackground />

          {/* Biome Header Banner */}
          <div className="relative z-10 flex items-center justify-between mb-8 bg-black/60 backdrop-blur-xs p-3 rounded-2xl border-2 border-rose-500/50 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-800 border-2 border-rose-400 flex items-center justify-center text-rose-200 shadow-xs">
                <Flame className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-rose-300 block">
                  STAGE 3 • THE UNDERWORLD
                </span>
                <h3 className="text-sm font-black text-white">Nether: Intensive Multi-Step Equations</h3>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleOpenBiomePalette('nether')}
                className="hidden sm:flex items-center gap-1 text-[10px] font-mono bg-rose-950/80 hover:bg-rose-900 text-rose-200 px-2 py-1 rounded-lg border border-rose-500/40 font-bold transition-all cursor-pointer hover:scale-105"
                title="Inspect Nether visual theme & color palette"
              >
                <Palette className="w-3 h-3 text-rose-200" />
                <span>Theme</span>
              </button>
              <span className="text-[10px] font-mono bg-rose-500/20 text-rose-200 px-2.5 py-1 rounded-lg border border-rose-500/30 font-bold">
                Lessons 7 – 9
              </span>
            </div>
          </div>

          {/* Biome Environment Pixel Decor */}
          <div className="absolute top-16 left-3 opacity-90 pointer-events-none z-10">
            <PixelNetherPortal size={54} />
          </div>
          <div className="absolute top-44 right-3 opacity-90 pointer-events-none z-10">
            <PixelLavaFall size={38} />
          </div>
          <div className="absolute bottom-10 left-6 opacity-90 pointer-events-none z-10">
            <PixelGlowstone size={38} />
          </div>

          {/* Ambient Wild Mobs positioned around the landscape (NOT on pathway) */}
          <AmbientBiomeMobs
            biome="nether"
            defeatedMobIds={defeatedMobIds}
            onSelectMob={(mob) => setSelectedBattleMob(mob)}
            activeClass={activeClass}
            activeSubject={activeSubject}
          />

          {/* Road Path & Nodes for Nether (Lessons 7, 8, 9) */}
          <div className="relative flex flex-col items-center my-4 z-10">
            {lessons
              .filter((l) => l.biome === 'nether')
              .map((lesson, idx, arr) => {
                const isActive = lesson.status === 'active';
                const isCompleted = lesson.status === 'completed';
                const isLocked = lesson.status === 'locked';
                const offsetFactor: -1 | 0 | 1 = idx === 0 ? -1 : idx === 1 ? 1 : 0;
                const offsetClass =
                  offsetFactor === -1
                    ? '-translate-x-12 sm:-translate-x-14'
                    : offsetFactor === 1
                    ? 'translate-x-12 sm:translate-x-14'
                    : 'translate-x-0';
                const nextOffsetFactor: -1 | 0 | 1 = idx === 0 ? 1 : 0;

                return (
                  <React.Fragment key={lesson.id}>
                    <div
                      ref={isActive ? activeNodeRef : undefined}
                      className={`relative flex flex-col items-center transition-all ${offsetClass}`}
                    >
                      {/* Character sitting on active node */}
                      {isActive && (
                        <div
                          onClick={() => handleOpenLesson(lesson)}
                          className="absolute -top-16 flex flex-col items-center cursor-pointer animate-bounce z-30"
                          style={{ animationDuration: '2s' }}
                        >
                          <div className="bg-slate-900 border-2 border-amber-400 text-amber-300 text-[10px] font-extrabold px-3 py-1 rounded-xl whitespace-nowrap shadow-xl mb-1 flex items-center gap-1">
                            <User className="w-3 h-3 text-amber-300" />
                            <span>Fiery trial! Tap node</span>
                            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-900 border-b-2 border-r-2 border-amber-400 rotate-45" />
                          </div>

                          <div className="w-12 h-14 flex items-center justify-center filter drop-shadow-lg">
                            {characterGender === 'boy' ? (
                              <PixelBoyCharacter size={44} isWalking={true} />
                            ) : (
                              <PixelGirlCharacter size={44} isWalking={true} />
                            )}
                          </div>
                        </div>
                      )}

                      {/* Pulsing halo */}
                      {isActive && (
                        <div className="absolute -inset-2.5 rounded-full bg-rose-500 opacity-70 animate-ping pointer-events-none" />
                      )}

                      {/* Node Nether Brick Block Button */}
                      <div className="flex flex-col items-center relative">
                        <button
                          onClick={() => handleOpenLesson(lesson)}
                          className={`relative w-16 h-16 sm:w-18 sm:h-18 rounded-2xl border-4 font-black text-base flex flex-col items-center justify-center shadow-2xl transition-all duration-150 cursor-pointer border-t-2 border-t-white/40 border-b-4 border-b-black/60 ${
                            isCompleted
                              ? 'bg-gradient-to-b from-[#DC2626] to-[#7F1D1D] border-[#FCA5A5] text-white hover:scale-105 active:scale-95'
                              : isActive
                              ? 'bg-gradient-to-b from-amber-300 to-amber-500 border-white text-slate-950 scale-110 shadow-amber-500/50 hover:scale-115 active:scale-95 ring-4 ring-rose-500 ring-offset-2 ring-offset-[#7F1D1D]'
                              : 'bg-slate-800/90 border-slate-600 text-slate-400 hover:bg-slate-700'
                          }`}
                        >
                          {/* Floating Completion Star Rating Pill */}
                          {isCompleted && (
                            <div className="absolute -top-2.5 -right-2 bg-amber-400 text-slate-950 font-black text-[9px] px-1.5 py-0.5 rounded-full border border-white shadow-md flex items-center gap-0.5">
                              <Star className="w-2.5 h-2.5 fill-slate-950 text-slate-950" />
                              <span>3/3</span>
                            </div>
                          )}

                          {isLocked ? (
                            <Lock className="w-5 h-5 text-slate-400" />
                          ) : (
                            <>
                              <span className="text-xs -mb-1">{lesson.icon}</span>
                              <span className="font-mono text-sm">{lesson.lessonNumber}</span>
                            </>
                          )}
                        </button>

                        {/* 3D Voxel Nether Brick & Magma Pedestal */}
                        <div className="w-16 sm:w-18 h-2.5 -mt-1.5 rounded-b-xl bg-[#260505] border-b-2 border-[#EA580C]/80 flex justify-around px-1 z-0 shadow-inner">
                          <div className="w-1 h-1 bg-[#F97316] rounded-b-xs shadow-[0_0_4px_#F97316]" />
                          <div className="w-1.5 h-1.5 bg-[#EF4444] rounded-b-xs shadow-[0_0_4px_#EF4444]" />
                          <div className="w-1 h-1 bg-[#FBBF24] rounded-b-xs shadow-[0_0_4px_#FBBF24]" />
                        </div>
                      </div>

                      {/* Lesson Label */}
                      <div className="mt-2.5 bg-slate-950/90 backdrop-blur-md border border-white/20 px-3.5 py-1.5 rounded-xl text-center max-w-[210px] shadow-lg">
                        <div className="text-[9px] font-extrabold text-rose-300 uppercase tracking-wider truncate">
                          {lesson.chapter}
                        </div>
                        <div className="text-xs font-black text-white truncate">
                          {lesson.title.split(':')[1] || lesson.title}
                        </div>
                        <div className="flex items-center justify-center gap-2 mt-0.5 text-[10px]">
                          {isCompleted ? (
                            <span className="text-rose-300 font-extrabold flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3 text-rose-300" />
                              <span>Mastered (+{lesson.xpReward} XP)</span>
                            </span>
                          ) : isActive ? (
                            <span className="text-amber-400 font-black flex items-center gap-1">
                              <Zap className="w-3 h-3 fill-amber-400 text-amber-400" />
                              <span>Current Quest</span>
                            </span>
                          ) : (
                            <span className="text-slate-400 font-medium">5 min • +{lesson.xpReward} XP</span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Precise SVG Pathway Connector between adjacent nodes */}
                    {idx < arr.length - 1 && (
                      <PathwaySegmentConnector
                        fromOffset={offsetFactor}
                        toOffset={nextOffsetFactor}
                        status={
                          arr[idx + 1].status === 'completed'
                            ? 'completed'
                            : arr[idx + 1].status === 'active'
                            ? 'active'
                            : 'locked'
                        }
                        biome="nether"
                        stepNumber={idx + 7}
                      />
                    )}
                  </React.Fragment>
                );
              })}
          </div>

          {/* Professional Biome Gateway Portal to The End */}
          <BiomeGatewayPortal
            fromBiome="nether"
            toBiome="end"
            chapterNumber={3}
            chapterTitle="Stage 3: Nether Equations"
            isUnlocked={lessons
              .filter((l) => l.biome === 'nether')
              .every((l) => l.status === 'completed')}
            onOpenBiomePalette={() => handleOpenBiomePalette('end')}
          />
        </div>

        {/* ------------------------------------------
            BIOME 4: THE END (VOID & DRAGON SUMMIT)
        ------------------------------------------ */}
        <div
          ref={biomeRefs.end}
          className={`relative w-full pt-8 pb-16 px-4 bg-gradient-to-b ${BIOME_THEMES.end.bgGradient} border-b-8 ${BIOME_THEMES.end.borderClass} text-white overflow-hidden`}
        >
          {/* CSS-based Visual Theme Atmospheric Background */}
          <EndThemeBackground />

          {/* Biome Header Banner */}
          <div className="relative z-10 flex items-center justify-between mb-8 bg-black/60 backdrop-blur-xs p-3 rounded-2xl border-2 border-purple-500/50 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-900 border-2 border-purple-400 flex items-center justify-center text-purple-200 shadow-xs">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-purple-300 block">
                  STAGE 4 • THE END DIMENSION
                </span>
                <h3 className="text-sm font-black text-white">The End: Comprehensive Capstone Mastery</h3>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleOpenBiomePalette('end')}
                className="hidden sm:flex items-center gap-1 text-[10px] font-mono bg-purple-950/80 hover:bg-purple-900 text-purple-200 px-2 py-1 rounded-lg border border-purple-500/40 font-bold transition-all cursor-pointer hover:scale-105"
                title="Inspect The End visual theme & color palette"
              >
                <Palette className="w-3 h-3 text-purple-200" />
                <span>Theme</span>
              </button>
              <span className="text-[10px] font-mono bg-purple-500/20 text-purple-200 px-2.5 py-1 rounded-lg border border-purple-500/30 font-bold">
                Lessons 10 – 12
              </span>
            </div>
          </div>

          {/* Biome Environment Pixel Decor */}
          <div className="absolute top-16 right-3 opacity-90 pointer-events-none z-10">
            <PixelEndCrystalSpire size={64} />
          </div>
          <div className="absolute top-52 left-3 opacity-90 pointer-events-none z-10">
            <PixelChorusPlant size={38} />
          </div>
          <div className="absolute bottom-20 right-8 opacity-90 pointer-events-none z-10">
            <PixelEnderDragon size={75} />
          </div>

          {/* Ambient Wild Mobs positioned around the landscape (NOT on pathway) */}
          <AmbientBiomeMobs
            biome="end"
            defeatedMobIds={defeatedMobIds}
            onSelectMob={(mob) => setSelectedBattleMob(mob)}
            activeClass={activeClass}
            activeSubject={activeSubject}
          />

          {/* Road Path & Nodes for The End (Lessons 10, 11, 12 Final Boss) */}
          <div className="relative flex flex-col items-center my-4 z-10">
            {lessons
              .filter((l) => l.biome === 'end')
              .map((lesson, idx, arr) => {
                const isActive = lesson.status === 'active';
                const isCompleted = lesson.status === 'completed';
                const isLocked = lesson.status === 'locked';
                const isBoss = lesson.lessonNumber === 12;
                const offsetFactor: -1 | 0 | 1 = isBoss ? 0 : idx === 0 ? 1 : -1;
                const offsetClass =
                  offsetFactor === -1
                    ? '-translate-x-12 sm:-translate-x-14'
                    : offsetFactor === 1
                    ? 'translate-x-12 sm:translate-x-14'
                    : 'translate-x-0';
                const nextOffsetFactor: -1 | 0 | 1 = idx === 0 ? -1 : 0;

                return (
                  <React.Fragment key={lesson.id}>
                    <div
                      ref={isActive ? activeNodeRef : undefined}
                      className={`relative flex flex-col items-center transition-all ${offsetClass}`}
                    >
                      {/* Character sitting on active node */}
                      {isActive && (
                        <div
                          onClick={() => handleOpenLesson(lesson)}
                          className="absolute -top-16 flex flex-col items-center cursor-pointer animate-bounce z-30"
                          style={{ animationDuration: '2s' }}
                        >
                          <div className="bg-slate-900 border-2 border-amber-400 text-amber-300 text-[10px] font-extrabold px-3 py-1 rounded-xl whitespace-nowrap shadow-xl mb-1 flex items-center gap-1">
                            <User className="w-3 h-3 text-amber-300" />
                            <span>{isBoss ? 'Face the Final Boss!' : 'In the End Realm!'}</span>
                            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-900 border-b-2 border-r-2 border-amber-400 rotate-45" />
                          </div>

                          <div className="w-12 h-14 flex items-center justify-center filter drop-shadow-lg">
                            {characterGender === 'boy' ? (
                              <PixelBoyCharacter size={44} isWalking={true} />
                            ) : (
                              <PixelGirlCharacter size={44} isWalking={true} />
                            )}
                          </div>
                        </div>
                      )}

                      {/* Pulsing halo */}
                      {isActive && (
                        <div
                          className={`absolute -inset-3 rounded-full opacity-70 animate-ping pointer-events-none ${
                            isBoss ? 'bg-purple-400' : 'bg-amber-400'
                          }`}
                        />
                      )}

                      {/* Node Button (Special larger sizing for Boss Lesson 12) */}
                      <div className="flex flex-col items-center relative">
                        <button
                          onClick={() => handleOpenLesson(lesson)}
                          className={`relative rounded-2xl border-4 font-black flex flex-col items-center justify-center shadow-2xl transition-all duration-150 cursor-pointer border-t-2 border-t-white/40 border-b-4 border-b-black/60 ${
                            isBoss
                              ? 'w-20 h-20 sm:w-22 sm:h-22 text-lg ring-4 ring-purple-500/50'
                              : 'w-16 h-16 sm:w-18 sm:h-18 text-base'
                          } ${
                            isCompleted
                              ? 'bg-gradient-to-b from-[#A855F7] to-[#581C87] border-[#E9D5FF] text-white hover:scale-105 active:scale-95'
                              : isActive
                              ? isBoss
                                ? 'bg-gradient-to-b from-purple-400 to-purple-700 border-amber-300 text-white scale-110 shadow-purple-500/80 hover:scale-115 active:scale-95 ring-4 ring-purple-400 ring-offset-2 ring-offset-[#0F0B1A]'
                                : 'bg-gradient-to-b from-amber-300 to-amber-500 border-white text-slate-950 scale-110 shadow-amber-500/50 hover:scale-115 active:scale-95 ring-4 ring-purple-400 ring-offset-2 ring-offset-[#0F0B1A]'
                              : 'bg-slate-800/90 border-slate-600 text-slate-400 hover:bg-slate-700'
                          }`}
                        >
                          {/* Floating Completion Star Rating Pill */}
                          {isCompleted && (
                            <div className="absolute -top-2.5 -right-2 bg-amber-400 text-slate-950 font-black text-[9px] px-1.5 py-0.5 rounded-full border border-white shadow-md flex items-center gap-0.5">
                              <Star className="w-2.5 h-2.5 fill-slate-950 text-slate-950" />
                              <span>3/3</span>
                            </div>
                          )}

                          {isLocked ? (
                            <Lock className="w-5 h-5 text-slate-400" />
                          ) : (
                            <>
                              <span className={isBoss ? 'text-lg -mb-1' : 'text-xs -mb-1'}>
                                {lesson.icon}
                              </span>
                              <span className="font-mono text-sm">
                                {isBoss ? 'BOSS' : lesson.lessonNumber}
                              </span>
                            </>
                          )}
                        </button>

                        {/* 3D Voxel End Stone & Purpur Pedestal */}
                        <div
                          className={`-mt-1.5 rounded-b-xl bg-[#2E1065] border-b-2 border-[#A855F7]/80 flex justify-around px-1 z-0 shadow-inner ${
                            isBoss ? 'w-20 sm:w-22 h-3' : 'w-16 sm:w-18 h-2.5'
                          }`}
                        >
                          <div className="w-1 h-1 bg-[#E9D5FF] rounded-b-xs shadow-[0_0_4px_#E9D5FF]" />
                          <div className="w-1.5 h-1.5 bg-[#C084FC] rounded-b-xs shadow-[0_0_4px_#C084FC]" />
                          <div className="w-1 h-1 bg-[#FDE047] rounded-b-xs shadow-[0_0_4px_#FDE047]" />
                        </div>
                      </div>

                      {/* Lesson Label */}
                      <div className="mt-2.5 bg-slate-950/90 backdrop-blur-md border border-white/20 px-3.5 py-1.5 rounded-xl text-center max-w-[210px] shadow-lg">
                        <div className="text-[9px] font-extrabold text-purple-300 uppercase tracking-wider truncate">
                          {lesson.chapter}
                        </div>
                        <div className="text-xs font-black text-white truncate">
                          {lesson.title.split(':')[1] || lesson.title}
                        </div>
                        <div className="flex items-center justify-center gap-2 mt-0.5 text-[10px]">
                          {isCompleted ? (
                            <span className="text-purple-300 font-extrabold flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3 text-purple-300" />
                              <span>Mastered (+{lesson.xpReward} XP)</span>
                            </span>
                          ) : isActive ? (
                            <span className="text-amber-400 font-black flex items-center gap-1">
                              <Zap className="w-3 h-3 fill-amber-400 text-amber-400" />
                              <span>Current Quest</span>
                            </span>
                          ) : (
                            <span className="text-slate-400 font-medium">5 min • +{lesson.xpReward} XP</span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Precise SVG Pathway Connector between adjacent nodes */}
                    {idx < arr.length - 1 && (
                      <PathwaySegmentConnector
                        fromOffset={offsetFactor}
                        toOffset={nextOffsetFactor}
                        status={
                          arr[idx + 1].status === 'completed'
                            ? 'completed'
                            : arr[idx + 1].status === 'active'
                            ? 'active'
                            : 'locked'
                        }
                        biome="end"
                        stepNumber={idx + 10}
                      />
                    )}
                  </React.Fragment>
                );
              })}
          </div>

          {/* Grand Dragon Summit Sanctum Capstone */}
          <SummitDragonSanctum
            isMastered={lessons.every((l) => l.status === 'completed')}
            totalLessons={lessons.length}
            completedLessons={lessons.filter((l) => l.status === 'completed').length}
            earnedStars={earnedStars}
            totalStars={totalStars}
            onJumpToStart={() => scrollToBiome('plains')}
          />
        </div>
      </div>

      {/* ==========================================
          BIOME COLOR PALETTES & THEME INSPECTOR MODAL
      ========================================== */}
      <BiomePaletteModal
        isOpen={isPaletteModalOpen}
        activeBiomeId={inspectedBiomeId}
        onClose={() => setIsPaletteModalOpen(false)}
        onSelectBiome={(b) => scrollToBiome(b)}
      />

      {/* ==========================================
          INTERACTIVE MOB SYLLABUS TEST BATTLE MODAL
      ========================================== */}
      {selectedBattleMob && (
        <MobTestBattleModal
          mob={selectedBattleMob}
          className={activeClass}
          subjectName={activeSubject}
          isOpen={true}
          onClose={() => setSelectedBattleMob(null)}
          onMobDefeated={handleMobDefeated}
          isAlreadyDefeated={defeatedMobIds.includes(selectedBattleMob.id)}
        />
      )}

      {/* ==========================================
          INTERACTIVE SYLLABUS LESSON MODAL
      ========================================== */}
      {selectedLesson && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-end sm:items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="w-full max-w-lg bg-slate-900 border-4 border-amber-400/80 rounded-3xl p-6 shadow-2xl text-white relative animate-in slide-in-from-bottom duration-200">
            {/* Close Button */}
            <button
              onClick={() => setSelectedLesson(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-3.5 mb-4">
              <div className="w-14 h-14 rounded-2xl bg-slate-800 border-2 border-amber-400 flex items-center justify-center text-3xl shrink-0 shadow-md">
                {selectedLesson.icon}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-amber-400 text-slate-950">
                    {selectedLesson.biomeStage}
                  </span>
                  <span className="text-xs text-amber-300 font-mono font-bold">
                    +{selectedLesson.xpReward} XP
                  </span>
                </div>
                <h3 className="text-base font-black text-white leading-tight mt-1">
                  {selectedLesson.title}
                </h3>
                <p className="text-xs text-slate-400 font-medium">{selectedLesson.chapter}</p>
              </div>
            </div>

            {/* Concept Summary Box */}
            <div className="p-3.5 bg-slate-800/80 border border-slate-700 rounded-2xl mb-4 text-xs text-slate-200 leading-relaxed space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-amber-300 text-[11px]">
                <Scroll className="w-3.5 h-3.5" />
                <span>Syllabus Concept Summary:</span>
              </div>
              <p>{selectedLesson.conceptSummary}</p>
            </div>

            {/* Interactive Concept Check Question */}
            <div className="p-4 bg-slate-950/70 border border-slate-800 rounded-2xl mb-5 space-y-2.5">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
                <HelpCircle className="w-4 h-4" />
                <span>Concept Check: {selectedLesson.question}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                {selectedLesson.options.map((optionText, optIdx) => {
                  const isSelected = selectedAnswerIndex === optIdx;
                  const isCorrect = optIdx === selectedLesson.correctOptionIndex;

                  let optClass =
                    'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700';
                  if (hasAnswered) {
                    if (isCorrect) {
                      optClass = 'bg-emerald-600 text-white border-emerald-400 font-black';
                    } else if (isSelected) {
                      optClass = 'bg-rose-600 text-white border-rose-400';
                    } else {
                      optClass = 'bg-slate-800/50 text-slate-500 border-slate-800';
                    }
                  } else if (isSelected) {
                    optClass = 'bg-amber-400 text-slate-950 border-amber-300 font-black';
                  }

                  return (
                    <button
                      key={optIdx}
                      disabled={hasAnswered}
                      onClick={() => {
                        setSelectedAnswerIndex(optIdx);
                        setHasAnswered(true);
                      }}
                      className={`p-2.5 rounded-xl text-xs font-medium border text-left transition-all flex items-center justify-between cursor-pointer ${optClass}`}
                    >
                      <span className="truncate">{optionText}</span>
                      {hasAnswered && isCorrect && <span>✅</span>}
                    </button>
                  );
                })}
              </div>

              {hasAnswered && (
                <div className="text-[11px] p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 leading-snug">
                  <strong>Explanation: </strong> {selectedLesson.explanation}
                </div>
              )}
            </div>

            {/* Action Buttons */}
            {selectedLesson.status === 'active' ? (
              <button
                onClick={handleCompleteLesson}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 text-slate-950 font-black text-sm shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.02]"
              >
                <Play className="w-4 h-4 fill-slate-950" />
                <span>COMPLETE & UNLOCK NEXT BIOME NODE 🚀</span>
              </button>
            ) : selectedLesson.status === 'completed' ? (
              <button
                onClick={() => setSelectedLesson(null)}
                className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>LESSON MASTERED (CLOSE REVIEW)</span>
              </button>
            ) : (
              <button
                disabled
                className="w-full py-2.5 rounded-xl bg-slate-800 text-slate-500 font-bold text-xs border border-slate-700"
              >
                LOCKED • COMPLETE PREVIOUS BIOME CHAPTERS FIRST
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
