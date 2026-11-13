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
import { Swords, CheckCircle2, Sparkles, Heart, RotateCcw } from 'lucide-react';

interface AmbientBiomeMobsProps {
  biome: BiomeId;
  defeatedMobIds: string[];
  onSelectMob: (mob: BiomeMob) => void;
  activeClass: string;
  activeSubject: string;
}

const MobSpritePreview: React.FC<{ mobType: BiomeMob['mobType']; size?: number }> = ({
  mobType,
  size = 40,
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

export const AmbientBiomeMobs: React.FC<AmbientBiomeMobsProps> = ({
  biome,
  defeatedMobIds,
  onSelectMob,
  activeClass,
  activeSubject,
}) => {
  const mobs = BIOME_MOBS[biome] || [];

  // Positions scattered around the place off the pathway (alternating right, left, right)
  const mobPositions = [
    {
      containerClass: 'top-20 sm:top-24 right-2 sm:right-4 md:right-6',
      groundClass: 'bg-[#5B8C3A] border-[#3B661E]', // Plains default or themed
      bubbleAlign: 'right',
    },
    {
      containerClass: 'top-64 sm:top-72 left-2 sm:left-4 md:left-6',
      groundClass: 'bg-[#737373] border-[#525252]',
      bubbleAlign: 'left',
    },
    {
      containerClass: 'top-[28rem] sm:top-[30rem] right-2 sm:right-4 md:right-6',
      groundClass: 'bg-[#4B5563] border-[#374151]',
      bubbleAlign: 'right',
    },
  ];

  const biomeTheme = {
    plains: {
      accentColor: 'text-emerald-400',
      tagBorder: 'border-emerald-500/50',
      bubbleBg: 'bg-slate-950/90 border-emerald-500/60',
      haloGlow: 'shadow-emerald-500/30',
    },
    ocean: {
      accentColor: 'text-sky-400',
      tagBorder: 'border-sky-500/50',
      bubbleBg: 'bg-slate-950/90 border-sky-500/60',
      haloGlow: 'shadow-sky-500/30',
    },
    nether: {
      accentColor: 'text-rose-400',
      tagBorder: 'border-rose-500/50',
      bubbleBg: 'bg-slate-950/90 border-rose-500/60',
      haloGlow: 'shadow-rose-500/30',
    },
    end: {
      accentColor: 'text-purple-400',
      tagBorder: 'border-purple-500/50',
      bubbleBg: 'bg-slate-950/90 border-purple-500/60',
      haloGlow: 'shadow-purple-500/30',
    },
  }[biome];

  return (
    <>
      {/* 1. Ambient Wild Mobs positioned around the landscape (NOT on the pathway) */}
      {mobs.map((mob, idx) => {
        const pos = mobPositions[idx % mobPositions.length];
        const isDefeated = defeatedMobIds.includes(mob.id);

        return (
          <div
            key={mob.id}
            onClick={(e) => {
              e.stopPropagation();
              onSelectMob(mob);
            }}
            className={`absolute ${pos.containerClass} z-20 flex flex-col items-center group cursor-pointer select-none transition-transform duration-200 hover:scale-105 active:scale-95`}
            title={`Wild encounter: ${mob.name} (${mob.difficulty}) - Click to battle!`}
          >
            {/* Interactive Speech & Combat Tag */}
            <div
              className={`mb-1.5 px-2.5 py-1 rounded-xl border backdrop-blur-md shadow-lg ${biomeTheme.bubbleBg} transition-all group-hover:-translate-y-0.5 max-w-[125px] sm:max-w-[155px] text-center`}
            >
              <div className="flex items-center justify-between gap-1 text-[8px] sm:text-[9px] font-black uppercase tracking-wider">
                <span className={biomeTheme.accentColor}>
                  {mob.name.split(' ')[0]}
                </span>
                {isDefeated ? (
                  <span className="text-emerald-400 flex items-center gap-0.5">
                    <CheckCircle2 className="w-2.5 h-2.5" />
                    <span>Conquered</span>
                  </span>
                ) : (
                  <span className="text-amber-400 flex items-center gap-0.5">
                    <Sparkles className="w-2.5 h-2.5" />
                    <span>+{mob.xpReward} XP</span>
                  </span>
                )}
              </div>

              <div className="flex items-center justify-center gap-1.5 mt-0.5">
                <span className="text-[9px] text-slate-300 font-bold truncate flex items-center gap-0.5">
                  {isDefeated ? (
                    <>
                      <RotateCcw className="w-2.5 h-2.5 text-amber-400" />
                      <span>Rematch</span>
                    </>
                  ) : (
                    <>
                      <Swords className="w-2.5 h-2.5 text-rose-400" />
                      <span>Fight</span>
                    </>
                  )}
                </span>
                <span className="text-[8px] text-rose-400 flex items-center gap-0.5">
                  {Array.from({ length: Math.min(mob.maxHearts, 3) }).map((_, i) => (
                    <Heart key={i} className="w-2.5 h-2.5 fill-rose-500 text-rose-500" />
                  ))}
                </span>
              </div>
            </div>

            {/* Pixel Mob Sprite with Idle Animation & Shadow */}
            <div className="relative flex flex-col items-center">
              {/* Encounter Aura Ring for active undefeated mobs */}
              {!isDefeated && (
                <div className="absolute -inset-2 rounded-full border border-amber-400/50 animate-ping pointer-events-none opacity-40" />
              )}

              <div className="transition-transform duration-200 group-hover:scale-110 group-hover:-translate-y-1 filter drop-shadow-lg">
                <MobSpritePreview mobType={mob.mobType} size={42} />
              </div>

              {/* Minecraft Terrain Block Pedestal / Ground Shadow */}
              <div className="w-10 h-2 bg-black/50 rounded-full blur-[1px] mt-0.5" />
            </div>

            {/* Rare Dropped Loot Badge if defeated */}
            {isDefeated && mob.lootDrops && mob.lootDrops.length > 0 && (
              <div className="mt-1 bg-black/80 border border-white/20 rounded-md px-1.5 py-0.5 text-[8px] font-mono text-emerald-300 flex items-center gap-1 shadow-xs">
                <span>{mob.lootDrops[0].icon}</span>
                <span className="truncate max-w-[60px]">{mob.lootDrops[0].name.split(' ')[0]}</span>
              </div>
            )}
          </div>
        );
      })}
    </>
  );
};
