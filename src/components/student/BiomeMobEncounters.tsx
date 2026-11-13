import React from 'react';
import { BiomeId, BiomeMob, BIOME_MOBS } from '../../data/biomeMobsData';
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
import { Swords, Trophy, Heart, Sparkles, CheckCircle2, Flame, Shield } from 'lucide-react';

interface BiomeMobEncountersProps {
  biome: BiomeId;
  defeatedMobIds: string[];
  onSelectMob: (mob: BiomeMob) => void;
  activeClass: string;
  activeSubject: string;
}

const MobSpritePreview: React.FC<{ mobType: BiomeMob['mobType']; size?: number }> = ({
  mobType,
  size = 48,
}) => {
  switch (mobType) {
    case 'creeper':
      return <PixelCreeper size={size} />;
    case 'zombie':
      return <PixelZombie size={size} />;
    case 'irongolem':
      return <PixelIronGolem size={size} />;
    case 'drowned':
      return <PixelDrowned size={size} />;
    case 'pufferfish':
      return <PixelPufferfish size={size} />;
    case 'elderguardian':
      return <PixelElderGuardian size={size} />;
    case 'blaze':
      return <PixelBlaze size={size} />;
    case 'piglin':
      return <PixelPiglin size={size} />;
    case 'ghast':
      return <PixelGhast size={size} />;
    case 'enderman':
      return <PixelEnderman size={size} />;
    case 'shulker':
      return <PixelShulker size={size} />;
    case 'enderdragon':
      return <PixelEnderDragonHead size={size} />;
    default:
      return <PixelZombie size={size} />;
  }
};

export const BiomeMobEncounters: React.FC<BiomeMobEncountersProps> = ({
  biome,
  defeatedMobIds,
  onSelectMob,
  activeClass,
  activeSubject,
}) => {
  const mobs = BIOME_MOBS[biome] || [];
  const defeatedCount = mobs.filter((m) => defeatedMobIds.includes(m.id)).length;

  const styling = {
    plains: {
      cardBorder: 'border-emerald-500/40 hover:border-emerald-400',
      bannerBorder: 'border-emerald-500/50',
      bannerBg: 'from-emerald-950/70 to-slate-900/90',
      accentText: 'text-emerald-300',
      buttonBg: 'from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600',
      tagBg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
    },
    ocean: {
      cardBorder: 'border-sky-500/40 hover:border-sky-400',
      bannerBorder: 'border-sky-500/50',
      bannerBg: 'from-sky-950/70 to-slate-900/90',
      accentText: 'text-sky-300',
      buttonBg: 'from-cyan-600 to-sky-700 hover:from-cyan-500 hover:to-sky-600',
      tagBg: 'bg-sky-500/20 text-sky-300 border-sky-500/40',
    },
    nether: {
      cardBorder: 'border-rose-500/40 hover:border-rose-400',
      bannerBorder: 'border-rose-500/50',
      bannerBg: 'from-rose-950/70 to-slate-900/90',
      accentText: 'text-rose-300',
      buttonBg: 'from-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600',
      tagBg: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
    },
    end: {
      cardBorder: 'border-purple-500/40 hover:border-purple-400',
      bannerBorder: 'border-purple-500/50',
      bannerBg: 'from-purple-950/70 to-slate-900/90',
      accentText: 'text-purple-300',
      buttonBg: 'from-purple-600 to-violet-700 hover:from-purple-500 hover:to-violet-600',
      tagBg: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
    },
  }[biome];

  return (
    <div className="relative z-10 my-8 w-full max-w-2xl mx-auto px-3">
      {/* Section Header */}
      <div
        className={`p-3.5 rounded-2xl bg-gradient-to-r ${styling.bannerBg} border-2 ${styling.bannerBorder} shadow-xl flex items-center justify-between flex-wrap gap-2 mb-4`}
      >
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-black/50 border border-white/20 flex items-center justify-center text-amber-400 shadow-md">
            <Swords className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-black uppercase tracking-wider text-amber-300">
                BIOME MOB TRIALS
              </span>
              <span className="text-[10px] text-slate-400">• {activeClass} {activeSubject}</span>
            </div>
            <h4 className="text-xs sm:text-sm font-black text-white">
              Defeat Biome Mobs with Syllabus Answers
            </h4>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] font-black bg-black/60 border border-white/15 px-3 py-1 rounded-full text-slate-300 flex items-center gap-1">
            <Trophy className="w-3.5 h-3.5 text-amber-400" />
            <span>Defeated: {defeatedCount} / {mobs.length}</span>
          </span>
        </div>
      </div>

      {/* 3 Mobs Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {mobs.map((mob) => {
          const isDefeated = defeatedMobIds.includes(mob.id);

          return (
            <div
              key={mob.id}
              onClick={() => onSelectMob(mob)}
              className={`group relative rounded-2xl bg-slate-950/85 backdrop-blur-md border-2 ${styling.cardBorder} p-3.5 shadow-xl flex flex-col items-center text-center transition-all duration-200 hover:-translate-y-1 cursor-pointer overflow-hidden`}
            >
              {/* Top status indicator */}
              <div className="w-full flex items-center justify-between mb-2">
                <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-md border ${styling.tagBg}`}>
                  {mob.difficulty}
                </span>

                {isDefeated ? (
                  <span className="flex items-center gap-0.5 text-[9px] font-extrabold text-emerald-400 bg-emerald-950/70 border border-emerald-500/40 px-1.5 py-0.5 rounded-md">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    <span>Mastered</span>
                  </span>
                ) : (
                  <span className="flex items-center gap-0.5 text-[9px] font-extrabold text-amber-400 bg-amber-950/60 border border-amber-500/40 px-1.5 py-0.5 rounded-md">
                    <Sparkles className="w-3 h-3 text-amber-400" />
                    <span>+{mob.xpReward} XP</span>
                  </span>
                )}
              </div>

              {/* Mob Sprite & Voxel Pedestal */}
              <div className="relative my-2 flex flex-col items-center">
                <div className="w-14 h-14 flex items-center justify-center group-hover:scale-110 transition-transform filter drop-shadow-md">
                  <MobSpritePreview mobType={mob.mobType} size={48} />
                </div>
                {/* 3D Voxel Stand */}
                <div className="w-14 h-2 bg-black/60 rounded-full border-b border-white/20 mt-1 shadow-inner" />
              </div>

              {/* Mob Name & Lore */}
              <h5 className="text-xs font-black text-white group-hover:text-amber-300 transition-colors line-clamp-1">
                {mob.name}
              </h5>
              <p className="text-[10px] text-slate-400 font-medium line-clamp-1 mb-2">
                {mob.title}
              </p>

              {/* Hearts Preview */}
              <div className="flex items-center justify-center gap-1 mb-3">
                {Array.from({ length: mob.maxHearts }).map((_, i) => (
                  <Heart
                    key={i}
                    className={`w-3 h-3 ${
                      isDefeated ? 'text-slate-600 fill-slate-700' : 'text-rose-500 fill-rose-500'
                    }`}
                  />
                ))}
                <span className="text-[10px] font-mono text-slate-400 ml-1">
                  {mob.maxHearts} HP
                </span>
              </div>

              {/* CTA Button */}
              <button
                type="button"
                className={`w-full py-1.5 px-2 rounded-xl text-[11px] font-black text-white flex items-center justify-center gap-1.5 shadow-md bg-gradient-to-r ${styling.buttonBg} transition-all`}
              >
                <Swords className="w-3 h-3" />
                <span>{isDefeated ? 'Replay Test' : 'Challenge Mob'}</span>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
