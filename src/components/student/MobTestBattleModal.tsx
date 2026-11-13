import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { BiomeMob, MobQuestion, getMobSyllabusTest } from '../../data/biomeMobsData';
import {
  PixelCreeper,
  PixelZombie,
  PixelIronGolem,
  PixelDrowned,
  PixelPufferfish,
  PixelElderGuardian,
  PixelBlaze,
  PixelPiglin,
  PixelGhast,
  PixelEnderman,
  PixelShulker,
  PixelEnderDragonHead,
} from './MinecraftMobSprites';
import {
  X,
  Heart,
  Zap,
  Sparkles,
  Trophy,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Volume2,
  VolumeX,
  RotateCcw,
  ArrowRight,
  ShieldAlert,
  Flame,
  Star,
  Swords,
  MessageSquare,
} from 'lucide-react';

interface MobTestBattleModalProps {
  mob: BiomeMob;
  className: string;
  subjectName: string;
  isOpen: boolean;
  onClose: () => void;
  onMobDefeated: (mob: BiomeMob, xpEarned: number) => void;
  isAlreadyDefeated?: boolean;
}

// ----------------------------------------------------------------------------
// LIGHTWEIGHT WEB AUDIO 8-BIT RETRO SOUND SYNTHESIZER
// ----------------------------------------------------------------------------
class RetroSoundEngine {
  private ctx: AudioContext | null = null;
  public isMuted: boolean = false;

  private initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) {
        this.ctx = new AudioContextClass();
      }
    }
  }

  public playHit() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(320, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(110, this.ctx.currentTime + 0.12);
      gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.12);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.12);
    } catch {
      // AudioContext policy fallback
    }
  }

  public playHurt() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(140, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(70, this.ctx.currentTime + 0.18);
      gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.18);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.18);
    } catch {
      // ignore
    }
  }

  public playSuccess() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      [440, 554, 659].forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.07);
        gain.gain.setValueAtTime(0.15, now + idx * 0.07);
        gain.gain.exponentialRampToValueAtTime(0.01, now + idx * 0.07 + 0.12);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + idx * 0.07);
        osc.stop(now + idx * 0.07 + 0.12);
      });
    } catch {
      // ignore
    }
  }

  public playVictory() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      [523, 659, 783, 1046].forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(freq, now + idx * 0.09);
        gain.gain.setValueAtTime(0.18, now + idx * 0.09);
        gain.gain.exponentialRampToValueAtTime(0.01, now + idx * 0.09 + 0.2);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + idx * 0.09);
        osc.stop(now + idx * 0.09 + 0.2);
      });
    } catch {
      // ignore
    }
  }
}

const soundEngine = new RetroSoundEngine();

// Helper to render proper pixel mob sprite
const MobPixelAvatar: React.FC<{
  mobType: BiomeMob['mobType'];
  size?: number;
  isHit?: boolean;
}> = ({ mobType, size = 64, isHit = false }) => {
  switch (mobType) {
    case 'creeper':
      return <PixelCreeper size={size} isHit={isHit} />;
    case 'zombie':
      return <PixelZombie size={size} isHit={isHit} />;
    case 'irongolem':
      return <PixelIronGolem size={size} isHit={isHit} />;
    case 'drowned':
      return <PixelDrowned size={size} isHit={isHit} />;
    case 'pufferfish':
      return <PixelPufferfish size={size} isHit={isHit} />;
    case 'elderguardian':
      return <PixelElderGuardian size={size} isHit={isHit} />;
    case 'blaze':
      return <PixelBlaze size={size} isHit={isHit} />;
    case 'piglin':
      return <PixelPiglin size={size} isHit={isHit} />;
    case 'ghast':
      return <PixelGhast size={size} isHit={isHit} />;
    case 'enderman':
      return <PixelEnderman size={size} isHit={isHit} />;
    case 'shulker':
      return <PixelShulker size={size} isHit={isHit} />;
    case 'enderdragon':
      return <PixelEnderDragonHead size={size} isHit={isHit} />;
    default:
      return <PixelZombie size={size} isHit={isHit} />;
  }
};

export const MobTestBattleModal: React.FC<MobTestBattleModalProps> = ({
  mob,
  className,
  subjectName,
  isOpen,
  onClose,
  onMobDefeated,
  isAlreadyDefeated = false,
}) => {
  // Generate syllabus-aligned questions for this mob & active curriculum
  const questions: MobQuestion[] = useMemo(
    () => getMobSyllabusTest(mob, className, subjectName),
    [mob, className, subjectName]
  );

  // Battle state
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [mobHearts, setMobHearts] = useState(mob.maxHearts);
  const [playerHearts, setPlayerHearts] = useState(3);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [isMobHit, setIsMobHit] = useState(false);
  const [isPlayerHurt, setIsPlayerHurt] = useState(false);
  const [battleState, setBattleState] = useState<'battling' | 'victory' | 'defeat'>('battling');
  const [dialogueText, setDialogueText] = useState(mob.introQuote);
  const [soundMuted, setSoundMuted] = useState(false);

  // Sync mute state to audio engine
  const toggleMute = () => {
    soundEngine.isMuted = !soundMuted;
    setSoundMuted(!soundMuted);
  };

  // Reset battle when opened
  useEffect(() => {
    if (isOpen) {
      setCurrentQuestionIndex(0);
      setMobHearts(mob.maxHearts);
      setPlayerHearts(3);
      setSelectedOptionIndex(null);
      setHasAnswered(false);
      setIsMobHit(false);
      setIsPlayerHurt(false);
      setBattleState('battling');
      setDialogueText(mob.introQuote);
    }
  }, [isOpen, mob]);

  const currentQ = questions[currentQuestionIndex] || questions[0];

  // Handle answering an option
  const handleSelectOption = (idx: number) => {
    if (hasAnswered || battleState !== 'battling') return;
    setSelectedOptionIndex(idx);
    setHasAnswered(true);

    const isCorrect = idx === currentQ.correctOptionIndex;

    if (isCorrect) {
      // Hit the mob!
      soundEngine.playHit();
      soundEngine.playSuccess();
      setIsMobHit(true);
      setTimeout(() => setIsMobHit(false), 500);

      const nextMobHearts = Math.max(0, mobHearts - 1);
      setMobHearts(nextMobHearts);
      setDialogueText(currentQ.mobReactionCorrect);

      // Check if mob defeated or next question
      if (nextMobHearts === 0 || currentQuestionIndex === questions.length - 1) {
        // Victory!
        setTimeout(() => {
          soundEngine.playVictory();
          setBattleState('victory');
          setDialogueText(mob.victoryQuote);
          onMobDefeated(mob, mob.xpReward);
        }, 1200);
      }
    } else {
      // Player hurt
      soundEngine.playHurt();
      setIsPlayerHurt(true);
      setTimeout(() => setIsPlayerHurt(false), 500);

      const nextPlayerHearts = Math.max(0, playerHearts - 1);
      setPlayerHearts(nextPlayerHearts);
      setDialogueText(currentQ.mobReactionWrong);

      if (nextPlayerHearts === 0) {
        // Defeat
        setTimeout(() => {
          setBattleState('defeat');
          setDialogueText(mob.defeatQuote);
        }, 1000);
      }
    }
  };

  // Move to next question after reviewing explanation
  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedOptionIndex(null);
      setHasAnswered(false);
    }
  };

  // Restart battle test
  const handleRetryBattle = () => {
    setCurrentQuestionIndex(0);
    setMobHearts(mob.maxHearts);
    setPlayerHearts(3);
    setSelectedOptionIndex(null);
    setHasAnswered(false);
    setIsMobHit(false);
    setIsPlayerHurt(false);
    setBattleState('battling');
    setDialogueText(mob.introQuote);
  };

  if (!isOpen) return null;

  // Biome-specific themed colors & accents
  const biomeTheme = {
    plains: {
      headerBg: 'from-emerald-900 via-green-950 to-slate-950',
      borderAccent: 'border-emerald-500/60',
      badgeClass: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
      cardGlow: 'shadow-emerald-500/10',
      arenaGradient: 'from-[#14532D]/30 via-slate-900 to-black',
    },
    ocean: {
      headerBg: 'from-cyan-900 via-sky-950 to-slate-950',
      borderAccent: 'border-cyan-500/60',
      badgeClass: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
      cardGlow: 'shadow-cyan-500/10',
      arenaGradient: 'from-[#0369A1]/30 via-slate-900 to-black',
    },
    nether: {
      headerBg: 'from-rose-950 via-red-950 to-slate-950',
      borderAccent: 'border-rose-500/60',
      badgeClass: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
      cardGlow: 'shadow-rose-500/10',
      arenaGradient: 'from-[#7F1D1D]/30 via-slate-900 to-black',
    },
    end: {
      headerBg: 'from-purple-950 via-violet-950 to-slate-950',
      borderAccent: 'border-purple-500/60',
      badgeClass: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
      cardGlow: 'shadow-purple-500/10',
      arenaGradient: 'from-[#3B0764]/30 via-slate-900 to-black',
    },
  }[mob.biome];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div
        className={`relative w-full max-w-3xl rounded-3xl bg-slate-950 border-3 ${biomeTheme.borderAccent} shadow-2xl overflow-hidden flex flex-col my-auto max-h-[92vh] text-white`}
      >
        {/* ================================================================
            MODAL HEADER: Biome Title & Controls
            ================================================================ */}
        <div className={`relative px-5 py-4 bg-gradient-to-r ${biomeTheme.headerBg} border-b border-white/15 flex items-center justify-between`}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-black/40 border border-white/20 flex items-center justify-center shadow-md">
              <Swords className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full border ${biomeTheme.badgeClass}`}>
                  {mob.biome.toUpperCase()} BIOME TRIAL
                </span>
                <span className="text-[10px] font-bold text-amber-300 bg-amber-950/60 border border-amber-500/40 px-2 py-0.5 rounded-full">
                  +{mob.xpReward} XP REWARD
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-black tracking-tight text-white flex items-center gap-2">
                <span>{mob.name}</span>
                <span className="text-xs font-medium text-slate-400">({mob.title})</span>
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleMute}
              title={soundMuted ? 'Unmute Sound FX' : 'Mute Sound FX'}
              className="p-2 rounded-xl bg-black/40 hover:bg-black/60 text-slate-300 hover:text-white border border-white/10 transition-colors"
            >
              {soundMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-black/40 hover:bg-rose-950/80 text-slate-300 hover:text-white border border-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* ================================================================
            COMBAT ARENA HUD: Mob vs Student Hearts & Dialogue
            ================================================================ */}
        <div className={`relative px-5 py-4 bg-gradient-to-b ${biomeTheme.arenaGradient} border-b border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4`}>
          {/* Mob Combat Block */}
          <div className="flex items-center gap-4">
            <div className="relative flex flex-col items-center">
              <div
                className={`p-2 rounded-2xl bg-black/50 border-2 ${biomeTheme.borderAccent} shadow-xl transition-transform duration-200 ${
                  isMobHit ? 'scale-90 rotate-6 filter brightness-150 ring-4 ring-rose-500' : 'scale-100'
                }`}
              >
                <MobPixelAvatar mobType={mob.mobType} size={58} isHit={isMobHit} />
              </div>
              {/* Pedestal label */}
              <span className="text-[9px] font-mono text-slate-400 mt-1">{mob.pedestalBlock}</span>
            </div>

            <div>
              <div className="text-xs font-black text-white flex items-center gap-2">
                <span>{mob.name}</span>
                <span className="text-[10px] text-amber-400 font-extrabold bg-amber-950/50 px-1.5 py-0.5 rounded-sm border border-amber-500/30">
                  {mob.difficulty}
                </span>
              </div>

              {/* Mob Hearts Display */}
              <div className="flex items-center gap-1.5 mt-1">
                {Array.from({ length: mob.maxHearts }).map((_, i) => (
                  <Heart
                    key={i}
                    className={`w-4 h-4 transition-all duration-300 ${
                      i < mobHearts
                        ? 'text-rose-500 fill-rose-500 drop-shadow-[0_0_6px_rgba(244,63,94,0.6)]'
                        : 'text-slate-700 fill-slate-800 opacity-40'
                    }`}
                  />
                ))}
                <span className="text-[11px] font-black font-mono ml-1 text-rose-300">
                  {mobHearts}/{mob.maxHearts} HP
                </span>
              </div>
            </div>
          </div>

          {/* Student Hearts & Stats */}
          <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto border-t sm:border-t-0 pt-2 sm:pt-0 border-white/10">
            <div className="text-xs font-bold text-slate-300 flex items-center gap-1">
              <span>Student Stamina</span>
              <span className="text-[10px] text-emerald-400 font-mono">({className} {subjectName})</span>
            </div>

            <div className="flex items-center gap-1.5 mt-1">
              {Array.from({ length: 3 }).map((_, i) => (
                <Heart
                  key={i}
                  className={`w-4 h-4 transition-all duration-300 ${
                    i < playerHearts
                      ? 'text-red-500 fill-red-500 drop-shadow-[0_0_6px_rgba(239,68,68,0.7)]'
                      : 'text-slate-700 fill-slate-800 opacity-30'
                  } ${isPlayerHurt ? 'animate-bounce' : ''}`}
                />
              ))}
              <span className="text-[11px] font-black font-mono ml-1 text-emerald-400">
                {playerHearts}/3 Hearts
              </span>
            </div>
          </div>
        </div>

        {/* Mob Speech Bubble / Dialogue Banner */}
        <div className="px-5 py-2.5 bg-slate-900/90 border-b border-white/10 flex items-center gap-2.5">
          <MessageSquare className="w-4 h-4 text-amber-300 shrink-0" />
          <p className="text-xs font-semibold text-amber-200/95 italic tracking-wide">
            "{dialogueText}"
          </p>
        </div>

        {/* ================================================================
            MAIN BODY: BATTLE TEST / VICTORY / DEFEAT
            ================================================================ */}
        <div className="p-5 overflow-y-auto flex-1 space-y-4">
          {/* --- CASE 1: ACTIVE BATTLING --- */}
          {battleState === 'battling' && (
            <div className="space-y-4">
              {/* Question Progress & Chapter Badge */}
              <div className="flex items-center justify-between flex-wrap gap-2 text-xs">
                <span className="bg-slate-900 border border-white/15 px-3 py-1 rounded-xl text-slate-300 font-bold flex items-center gap-1.5">
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
                </span>
                <span className="text-sky-300 font-black bg-sky-950/60 border border-sky-500/40 px-3 py-1 rounded-xl text-[11px]">
                  {currentQ.chapter}
                </span>
              </div>

              {/* Question Card */}
              <div className="bg-slate-900/90 border-2 border-white/15 rounded-2xl p-4 sm:p-5 shadow-xl">
                <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1">
                  Concept: {currentQ.conceptTitle}
                </div>
                <h4 className="text-sm sm:text-base font-black text-white leading-relaxed">
                  {currentQ.question}
                </h4>

                {/* 4 Interactive Answer Options */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-4">
                  {currentQ.options.map((opt, idx) => {
                    const isSelected = selectedOptionIndex === idx;
                    const isCorrect = idx === currentQ.correctOptionIndex;

                    let btnClass = 'bg-slate-800/80 hover:bg-slate-700/80 border-slate-700 text-white';

                    if (hasAnswered) {
                      if (isCorrect) {
                        btnClass = 'bg-emerald-950/90 border-emerald-400 text-emerald-200 ring-2 ring-emerald-500';
                      } else if (isSelected) {
                        btnClass = 'bg-rose-950/90 border-rose-500 text-rose-200 ring-2 ring-rose-500';
                      } else {
                        btnClass = 'bg-slate-900/50 border-slate-800 text-slate-500 opacity-60';
                      }
                    }

                    return (
                      <button
                        key={idx}
                        onClick={() => handleSelectOption(idx)}
                        disabled={hasAnswered}
                        className={`p-3 rounded-xl border-2 text-left font-bold text-xs sm:text-sm flex items-start gap-2.5 transition-all cursor-pointer ${btnClass}`}
                      >
                        <span className="w-5 h-5 rounded-lg bg-black/40 border border-white/20 flex items-center justify-center text-[10px] font-mono shrink-0">
                          {['A', 'B', 'C', 'D'][idx]}
                        </span>
                        <span className="flex-1">{opt}</span>
                        {hasAnswered && isCorrect && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        )}
                        {hasAnswered && isSelected && !isCorrect && (
                          <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Explanation Reveal */}
                {hasAnswered && (
                  <div className="mt-4 pt-3 border-t border-white/10 bg-black/40 p-3 rounded-xl">
                    <div className="flex items-center gap-1.5 text-xs font-black text-amber-300 mb-1">
                      <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
                      <span>Syllabus Explanation</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed font-medium">
                      {currentQ.explanation}
                    </p>

                    {/* Next Question / Proceed Button if player still has hearts & questions remain */}
                    {playerHearts > 0 && mobHearts > 0 && currentQuestionIndex < questions.length - 1 && (
                      <div className="mt-3 flex justify-end">
                        <button
                          onClick={handleNextQuestion}
                          className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-black flex items-center gap-1.5 shadow-lg cursor-pointer"
                        >
                          <span>Next Challenge Question</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* --- CASE 2: VICTORY SCREEN --- */}
          {battleState === 'victory' && (
            <div className="py-6 flex flex-col items-center text-center space-y-4">
              <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-amber-400 via-yellow-400 to-emerald-500 p-1 shadow-2xl flex items-center justify-center animate-bounce">
                <div className="w-full h-full rounded-[22px] bg-slate-950 flex items-center justify-center text-amber-400">
                  <Trophy className="w-9 h-9" />
                </div>
              </div>

              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-amber-400 bg-amber-950/60 border border-amber-500/40 px-3 py-1 rounded-full">
                  VICTORY ACHIEVED!
                </span>
                <h4 className="text-xl sm:text-2xl font-black text-white mt-2">
                  You Defeated the {mob.name}!
                </h4>
                <p className="text-xs text-slate-300 max-w-md mt-1">
                  You conquered the {mob.biome.toUpperCase()} Biome syllabus trial! Your deep understanding of {subjectName} overcame the mob’s defenses!
                </p>
              </div>

              {/* Earned Rewards Box */}
              <div className="w-full max-w-md bg-slate-900 border-2 border-amber-400/50 rounded-2xl p-4 shadow-xl text-left">
                <div className="flex items-center justify-between mb-3 border-b border-white/10 pb-2">
                  <span className="text-xs font-black text-amber-300 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span>Loot & Syllabus Rewards Dropped</span>
                  </span>
                  <span className="text-xs font-extrabold text-emerald-400 font-mono">
                    +{mob.xpReward} XP
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {mob.lootDrops.map((loot, idx) => (
                    <div
                      key={idx}
                      className="bg-black/40 border border-white/10 p-2 rounded-xl flex items-center gap-2"
                    >
                      <span className="text-xl">{loot.icon}</span>
                      <div className="min-w-0">
                        <div className="text-[11px] font-extrabold text-white truncate">
                          {loot.name}
                        </div>
                        <div className="text-[10px] text-amber-400 font-bold font-mono">
                          x{loot.count} ({loot.rarity})
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Mob Badge */}
                <div className="mt-3 pt-2 border-t border-white/10 flex items-center gap-2 text-xs font-bold text-purple-300">
                  <Trophy className="w-4 h-4 text-amber-400" />
                  <span>Unlocked Badge: {mob.badgeTitle}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={handleRetryBattle}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-extrabold flex items-center gap-1.5 border border-white/10 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Replay Trial</span>
                </button>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-black text-xs flex items-center gap-1.5 shadow-xl cursor-pointer"
                >
                  <span>Claim Loot & Continue Quest</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* --- CASE 3: DEFEAT SCREEN --- */}
          {battleState === 'defeat' && (
            <div className="py-6 flex flex-col items-center text-center space-y-4">
              <div className="w-20 h-20 rounded-3xl bg-rose-950/80 border-2 border-rose-500 p-1 shadow-2xl flex items-center justify-center">
                <ShieldAlert className="w-10 h-10 text-rose-400 animate-pulse" />
              </div>

              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-rose-400 bg-rose-950/60 border border-rose-500/40 px-3 py-1 rounded-full">
                  STAMINA DEPLETED
                </span>
                <h4 className="text-xl sm:text-2xl font-black text-white mt-2">
                  The {mob.name} Overwhelmed Your Defenses!
                </h4>
                <p className="text-xs text-slate-300 max-w-md mt-1">
                  Don’t worry! In Minecraft and in learning, every defeat is a lesson. Revise the {mob.biome.toUpperCase()} Biome syllabus formulas and face the mob again!
                </p>
              </div>

              {/* Encouragement Card */}
              <div className="w-full max-w-md bg-slate-900 border border-rose-500/30 rounded-2xl p-4 shadow-xl text-left">
                <div className="text-xs font-black text-amber-300 mb-1 flex items-center gap-1.5">
                  <Flame className="w-4 h-4 text-amber-400" />
                  <span>Teacher & Mob Study Tip</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-medium">
                  Focus on sign rules and inverse operations. Remember that double negatives become positive, and always balance both sides of an equation!
                </p>
              </div>

              {/* Retry button */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={onClose}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-extrabold border border-white/10 cursor-pointer"
                >
                  Return to Map
                </button>
                <button
                  onClick={handleRetryBattle}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-400 hover:to-rose-400 text-slate-950 font-black text-xs flex items-center gap-1.5 shadow-xl cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Retry Mob Battle Test (Full Hearts)</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
