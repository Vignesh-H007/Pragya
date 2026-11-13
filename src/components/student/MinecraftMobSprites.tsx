import React from 'react';

// ============================================================================
// MINECRAFT MOB PIXEL SPRITES (Authentic 8-bit & 16-bit Voxel Styled SVGs)
// ============================================================================

interface MobSpriteProps {
  size?: number;
  className?: string;
  isHit?: boolean;
  isAttacking?: boolean;
}

// ----------------------------------------------------------------------------
// PLAINS MOBS
// ----------------------------------------------------------------------------

/**
 * Pixel Creeper - Iconic green checkered voxel mob with frowning face
 */
export const PixelCreeper: React.FC<MobSpriteProps> = ({
  size = 56,
  className = '',
  isHit = false,
}) => (
  <svg
    viewBox="0 0 24 32"
    width={size}
    height={(size * 32) / 24}
    className={`${className} ${isHit ? 'filter brightness-150 saturate-200 animate-wiggle' : ''}`}
    style={{ imageRendering: 'pixelated', shapeRendering: 'crispEdges' }}
  >
    {/* Head Block (12x12) */}
    <rect x="6" y="2" width="12" height="12" fill="#22C55E" />
    {/* Camo variations */}
    <rect x="6" y="2" width="3" height="3" fill="#16A34A" />
    <rect x="15" y="2" width="3" height="3" fill="#15803D" />
    <rect x="8" y="5" width="2" height="2" fill="#4ADE80" />
    <rect x="13" y="9" width="3" height="2" fill="#15803D" />
    <rect x="6" y="11" width="3" height="3" fill="#16A34A" />
    <rect x="15" y="11" width="3" height="3" fill="#4ADE80" />

    {/* Creeper Face (Eyes & Mouth) */}
    {/* Left Eye */}
    <rect x="8" y="5" width="2.5" height="2.5" fill="#052E16" />
    {/* Right Eye */}
    <rect x="13.5" y="5" width="2.5" height="2.5" fill="#052E16" />
    {/* Center Nose Bridge */}
    <rect x="11" y="7.5" width="2" height="2.5" fill="#052E16" />
    {/* Mouth */}
    <rect x="9.5" y="10" width="5" height="3" fill="#052E16" />
    <rect x="8.5" y="11" width="1" height="3" fill="#052E16" />
    <rect x="14.5" y="11" width="1" height="3" fill="#052E16" />

    {/* Body Column */}
    <rect x="8" y="14" width="8" height="10" fill="#16A34A" />
    <rect x="9" y="15" width="3" height="3" fill="#22C55E" />
    <rect x="12" y="18" width="3" height="3" fill="#15803D" />
    <rect x="8" y="21" width="2" height="3" fill="#14532D" />

    {/* 4 Feet */}
    {/* Front Left Foot */}
    <rect x="6" y="24" width="3.5" height="7" fill="#15803D" />
    <rect x="6" y="29" width="3.5" height="2" fill="#052E16" />
    {/* Front Right Foot */}
    <rect x="14.5" y="24" width="3.5" height="7" fill="#15803D" />
    <rect x="14.5" y="29" width="3.5" height="2" fill="#052E16" />
    {/* Back Legs (peeking) */}
    <rect x="9.5" y="24" width="2" height="6" fill="#14532D" />
    <rect x="12.5" y="24" width="2" height="6" fill="#14532D" />
  </svg>
);

/**
 * Pixel Zombie - Overworld zombie scholar with outstretched arms
 */
export const PixelZombie: React.FC<MobSpriteProps> = ({
  size = 56,
  className = '',
  isHit = false,
}) => (
  <svg
    viewBox="0 0 24 32"
    width={size}
    height={(size * 32) / 24}
    className={`${className} ${isHit ? 'filter brightness-150 animate-bounce' : ''}`}
    style={{ imageRendering: 'pixelated', shapeRendering: 'crispEdges' }}
  >
    {/* Head (Green skin with dark green hair) */}
    <rect x="7" y="2" width="10" height="2" fill="#14532D" />
    <rect x="7" y="4" width="10" height="8" fill="#15803D" />
    <rect x="6" y="4" width="1" height="8" fill="#14532D" />
    <rect x="17" y="4" width="1" height="8" fill="#14532D" />

    {/* Zombie Eyes (Dark sinister pupils) */}
    <rect x="9" y="7" width="2" height="2" fill="#052E16" />
    <rect x="9" y="7" width="1" height="1" fill="#86EFAC" />
    <rect x="13" y="7" width="2" height="2" fill="#052E16" />
    <rect x="13" y="7" width="1" height="1" fill="#86EFAC" />

    {/* Nose & Mouth */}
    <rect x="11" y="9" width="2" height="1" fill="#14532D" />
    <rect x="10" y="10" width="4" height="1" fill="#052E16" />

    {/* Blue Cyan Tunic Shirt */}
    <rect x="7" y="12" width="10" height="9" fill="#0284C7" />
    <rect x="9" y="13" width="6" height="7" fill="#0369A1" />

    {/* Outstretched Arms (Zombie reach pose) */}
    <rect x="4" y="13" width="3" height="7" fill="#0284C7" />
    <rect x="3" y="18" width="3" height="3" fill="#15803D" />
    <rect x="17" y="13" width="3" height="7" fill="#0284C7" />
    <rect x="18" y="18" width="3" height="3" fill="#15803D" />

    {/* Book in hand (Scholar Zombie) */}
    <rect x="18" y="16" width="4" height="4" fill="#78350F" />
    <rect x="19" y="17" width="2" height="2" fill="#FDE047" />

    {/* Tattered Indigo Pants */}
    <rect x="8" y="21" width="3.5" height="7" fill="#1E3A8A" />
    <rect x="12.5" y="21" width="3.5" height="7" fill="#1E3A8A" />

    {/* Shoes */}
    <rect x="8" y="28" width="3.5" height="3" fill="#172554" />
    <rect x="12.5" y="28" width="3.5" height="3" fill="#172554" />
  </svg>
);

/**
 * Pixel Iron Golem - Mighty village guardian with red eyes & poppy flower
 */
export const PixelIronGolem: React.FC<MobSpriteProps> = ({
  size = 64,
  className = '',
  isHit = false,
}) => (
  <svg
    viewBox="0 0 32 36"
    width={size}
    height={(size * 36) / 32}
    className={`${className} ${isHit ? 'filter brightness-150' : ''}`}
    style={{ imageRendering: 'pixelated', shapeRendering: 'crispEdges' }}
  >
    {/* Broad Shoulders & Iron Torso */}
    <rect x="8" y="10" width="16" height="12" fill="#E2E8F0" />
    <rect x="10" y="12" width="12" height="8" fill="#CBD5E1" />
    {/* Vine accents on chest */}
    <rect x="10" y="11" width="2" height="4" fill="#22C55E" />
    <rect x="18" y="13" width="3" height="2" fill="#16A34A" />

    {/* Head Block */}
    <rect x="12" y="2" width="8" height="9" fill="#F1F5F9" />
    <rect x="14" y="6" width="4" height="4" fill="#E2E8F0" />
    {/* Nose */}
    <rect x="15" y="5" width="2" height="4" fill="#CBD5E1" />
    {/* Red Glowing Eyes */}
    <rect x="13" y="5" width="1.5" height="1.5" fill="#DC2626" />
    <rect x="17.5" y="5" width="1.5" height="1.5" fill="#DC2626" />

    {/* Long Heavy Arms */}
    <rect x="4" y="10" width="4" height="16" fill="#CBD5E1" />
    <rect x="24" y="10" width="4" height="16" fill="#CBD5E1" />

    {/* Red Poppy Flower in Hand */}
    <rect x="25" y="24" width="3" height="3" fill="#EF4444" />
    <rect x="26" y="25" width="1" height="1" fill="#F59E0B" />
    <rect x="26" y="27" width="1" height="3" fill="#22C55E" />

    {/* Legs */}
    <rect x="10" y="22" width="4.5" height="12" fill="#94A3B8" />
    <rect x="17.5" y="22" width="4.5" height="12" fill="#94A3B8" />
  </svg>
);

// ----------------------------------------------------------------------------
// OCEAN MOBS
// ----------------------------------------------------------------------------

/**
 * Pixel Drowned - Submerged aquatic zombie with glowing sea eyes & trident
 */
export const PixelDrowned: React.FC<MobSpriteProps> = ({
  size = 56,
  className = '',
  isHit = false,
}) => (
  <svg
    viewBox="0 0 28 34"
    width={size}
    height={(size * 34) / 28}
    className={`${className} ${isHit ? 'filter brightness-150' : ''}`}
    style={{ imageRendering: 'pixelated', shapeRendering: 'crispEdges' }}
  >
    {/* Trident held in right hand */}
    <line x1="23" y1="2" x2="23" y2="30" stroke="#06B6D4" strokeWidth="1.5" />
    {/* Trident prongs */}
    <rect x="20" y="2" width="2" height="4" fill="#67E8F9" />
    <rect x="22" y="0" width="2" height="6" fill="#A5F3FC" />
    <rect x="24" y="2" width="2" height="4" fill="#67E8F9" />
    <rect x="20" y="5" width="6" height="1.5" fill="#0891B2" />

    {/* Drowned Head (Teal & Cyan skin) */}
    <rect x="6" y="4" width="10" height="9" fill="#0D9488" />
    <rect x="8" y="4" width="6" height="2" fill="#042F2C" />
    {/* Glowing Sea Eyes */}
    <rect x="7.5" y="8" width="2.5" height="2" fill="#22D3EE" />
    <rect x="8" y="8.5" width="1" height="1" fill="#FFFFFF" />
    <rect x="12" y="8" width="2.5" height="2" fill="#22D3EE" />
    <rect x="12.5" y="8.5" width="1" height="1" fill="#FFFFFF" />

    {/* Aquatic Tunic */}
    <rect x="6" y="13" width="10" height="8" fill="#134E4A" />
    <rect x="8" y="14" width="6" height="6" fill="#0F766E" />

    {/* Arms */}
    <rect x="3" y="13" width="3" height="8" fill="#0D9488" />
    <rect x="16" y="13" width="3" height="8" fill="#0D9488" />

    {/* Kelp wrapped pants */}
    <rect x="7" y="21" width="3.5" height="8" fill="#115E59" />
    <rect x="11.5" y="21" width="3.5" height="8" fill="#115E59" />
    <rect x="7" y="24" width="2" height="2" fill="#10B981" />
    <rect x="13" y="26" width="2" height="2" fill="#10B981" />
  </svg>
);

/**
 * Pixel Pufferfish - Puffed yellow/turquoise spiky guardian
 */
export const PixelPufferfish: React.FC<MobSpriteProps> = ({
  size = 52,
  className = '',
  isHit = false,
}) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    className={`${className} ${isHit ? 'filter brightness-150 animate-spin' : 'animate-pulse'}`}
    style={{ imageRendering: 'pixelated', shapeRendering: 'crispEdges' }}
  >
    {/* Spikes protruding */}
    <rect x="11" y="0" width="2" height="3" fill="#CA8A04" />
    <rect x="11" y="21" width="2" height="3" fill="#CA8A04" />
    <rect x="0" y="11" width="3" height="2" fill="#CA8A04" />
    <rect x="21" y="11" width="3" height="2" fill="#CA8A04" />
    <rect x="2" y="2" width="2" height="2" fill="#EAB308" />
    <rect x="20" y="2" width="2" height="2" fill="#EAB308" />
    <rect x="2" y="20" width="2" height="2" fill="#EAB308" />
    <rect x="20" y="20" width="2" height="2" fill="#EAB308" />

    {/* Main Puffed Body */}
    <rect x="3" y="3" width="18" height="18" fill="#FACC15" />
    <rect x="5" y="5" width="14" height="14" fill="#FDE047" />

    {/* Pufferfish Eyes */}
    <rect x="6" y="8" width="3" height="3" fill="#000000" />
    <rect x="6.5" y="8.5" width="1" height="1" fill="#FFFFFF" />
    <rect x="15" y="8" width="3" height="3" fill="#000000" />
    <rect x="15.5" y="8.5" width="1" height="1" fill="#FFFFFF" />

    {/* Mouth */}
    <rect x="10" y="13" width="4" height="2" fill="#B45309" />

    {/* Turquoise belly spots */}
    <rect x="6" y="14" width="2" height="2" fill="#06B6D4" />
    <rect x="16" y="14" width="2" height="2" fill="#06B6D4" />
    <rect x="11" y="16" width="2" height="2" fill="#06B6D4" />
  </svg>
);

/**
 * Pixel Elder Guardian - Spiky prismarine boss with giant laser eye
 */
export const PixelElderGuardian: React.FC<MobSpriteProps> = ({
  size = 64,
  className = '',
  isHit = false,
}) => (
  <svg
    viewBox="0 0 32 32"
    width={size}
    height={size}
    className={`${className} ${isHit ? 'filter brightness-150' : ''}`}
    style={{ imageRendering: 'pixelated', shapeRendering: 'crispEdges' }}
  >
    {/* Spikes (Orange-Red Prismarine rods) */}
    <rect x="14" y="0" width="4" height="4" fill="#EA580C" />
    <rect x="14" y="28" width="4" height="4" fill="#EA580C" />
    <rect x="0" y="14" width="4" height="4" fill="#EA580C" />
    <rect x="28" y="14" width="4" height="4" fill="#EA580C" />

    {/* Main Prismarine Body */}
    <rect x="4" y="4" width="24" height="24" fill="#A5F3FC" />
    <rect x="6" y="6" width="20" height="20" fill="#CFFAFE" />
    <rect x="5" y="5" width="4" height="4" fill="#06B6D4" />
    <rect x="23" y="5" width="4" height="4" fill="#06B6D4" />
    <rect x="5" y="23" width="4" height="4" fill="#06B6D4" />
    <rect x="23" y="23" width="4" height="4" fill="#06B6D4" />

    {/* Giant Central Cyclops Eye */}
    <rect x="10" y="10" width="12" height="12" fill="#FFFFFF" />
    <rect x="12" y="12" width="8" height="8" fill="#F43F5E" />
    <rect x="14" y="14" width="4" height="4" fill="#881337" />
    <rect x="15" y="14" width="1.5" height="1.5" fill="#FFFFFF" />

    {/* Eye Laser Beam Charge Emitter */}
    <circle cx="16" cy="16" r="1.5" fill="#FFE4E6" />
  </svg>
);

// ----------------------------------------------------------------------------
// NETHER MOBS
// ----------------------------------------------------------------------------

/**
 * Pixel Blaze - Floating fiery mob with rotating golden blaze rods
 */
export const PixelBlaze: React.FC<MobSpriteProps> = ({
  size = 56,
  className = '',
  isHit = false,
}) => (
  <svg
    viewBox="0 0 28 32"
    width={size}
    height={(size * 32) / 28}
    className={`${className} ${isHit ? 'filter brightness-150' : 'animate-bounce'}`}
    style={{ imageRendering: 'pixelated', shapeRendering: 'crispEdges', animationDuration: '3s' }}
  >
    {/* Floating Blaze Rods (Upper layer) */}
    <rect x="2" y="4" width="3" height="8" fill="#F59E0B" />
    <rect x="2.5" y="5" width="2" height="6" fill="#FDE047" />
    <rect x="23" y="4" width="3" height="8" fill="#F59E0B" />
    <rect x="23.5" y="5" width="2" height="6" fill="#FDE047" />

    {/* Blaze Head (Floating golden core with smoke) */}
    <rect x="9" y="6" width="10" height="10" fill="#D97706" />
    <rect x="10" y="7" width="8" height="8" fill="#F59E0B" />
    <rect x="11" y="8" width="6" height="6" fill="#FDE047" />

    {/* Blaze Eyes (White/Yellow slit eyes) */}
    <rect x="10" y="9" width="2.5" height="1.5" fill="#FFFFFF" />
    <rect x="11" y="9" width="1" height="1" fill="#78350F" />
    <rect x="15.5" y="9" width="2.5" height="1.5" fill="#FFFFFF" />
    <rect x="16" y="9" width="1" height="1" fill="#78350F" />

    {/* Floating Blaze Rods (Middle layer) */}
    <rect x="4" y="16" width="3" height="8" fill="#EA580C" />
    <rect x="4.5" y="17" width="2" height="6" fill="#FBBF24" />
    <rect x="21" y="16" width="3" height="8" fill="#EA580C" />
    <rect x="21.5" y="17" width="2" height="6" fill="#FBBF24" />

    {/* Lower floating rods */}
    <rect x="10" y="20" width="3" height="9" fill="#F59E0B" />
    <rect x="15" y="20" width="3" height="9" fill="#F59E0B" />
  </svg>
);

/**
 * Pixel Piglin - Gold-loving Nether warrior with tusks & sword
 */
export const PixelPiglin: React.FC<MobSpriteProps> = ({
  size = 56,
  className = '',
  isHit = false,
}) => (
  <svg
    viewBox="0 0 28 32"
    width={size}
    height={(size * 32) / 28}
    className={`${className} ${isHit ? 'filter brightness-150' : ''}`}
    style={{ imageRendering: 'pixelated', shapeRendering: 'crispEdges' }}
  >
    {/* Piglin Head with Drooping Ears */}
    <rect x="8" y="2" width="12" height="10" fill="#F472B6" />
    <rect x="9" y="3" width="10" height="8" fill="#EC4899" />
    {/* Floppy Left Ear */}
    <rect x="5" y="4" width="3" height="7" fill="#DB2777" />
    {/* Floppy Right Ear */}
    <rect x="20" y="4" width="3" height="7" fill="#DB2777" />

    {/* Snout & Tusks */}
    <rect x="11" y="7" width="6" height="4" fill="#BE185D" />
    {/* White Tusks */}
    <rect x="10" y="9" width="1.5" height="3" fill="#FFFFFF" />
    <rect x="16.5" y="9" width="1.5" height="3" fill="#FFFFFF" />

    {/* Eyes */}
    <rect x="10" y="5" width="2" height="2" fill="#831843" />
    <rect x="10" y="5" width="1" height="1" fill="#FFFFFF" />
    <rect x="16" y="5" width="2" height="2" fill="#831843" />
    <rect x="16" y="5" width="1" height="1" fill="#FFFFFF" />

    {/* Golden Chestplate */}
    <rect x="8" y="12" width="12" height="9" fill="#EAB308" />
    <rect x="10" y="13" width="8" height="7" fill="#FACC15" />

    {/* Golden Sword */}
    <line x1="22" y1="10" x2="22" y2="24" stroke="#CA8A04" strokeWidth="2" />
    <rect x="20" y="19" width="5" height="1.5" fill="#A16207" />

    {/* Left Arm */}
    <rect x="5" y="12" width="3" height="8" fill="#EC4899" />

    {/* Pants */}
    <rect x="9" y="21" width="4" height="8" fill="#78350F" />
    <rect x="15" y="21" width="4" height="8" fill="#78350F" />
  </svg>
);

/**
 * Pixel Ghast - Flying white cube ghost with crying eyes & tentacles
 */
export const PixelGhast: React.FC<MobSpriteProps> = ({
  size = 60,
  className = '',
  isHit = false,
}) => (
  <svg
    viewBox="0 0 32 36"
    width={size}
    height={(size * 36) / 32}
    className={`${className} ${isHit ? 'filter brightness-150' : 'animate-pulse'}`}
    style={{ imageRendering: 'pixelated', shapeRendering: 'crispEdges' }}
  >
    {/* Ghast Main Cube Body */}
    <rect x="4" y="2" width="24" height="22" fill="#F8FAFC" />
    <rect x="6" y="4" width="20" height="18" fill="#FFFFFF" />

    {/* Crying Eyes (Closed slits with tear streams) */}
    <rect x="9" y="8" width="4" height="2" fill="#475569" />
    <rect x="19" y="8" width="4" height="2" fill="#475569" />
    {/* Red/Crimson Ghast Tears */}
    <rect x="10" y="10" width="2" height="5" fill="#EF4444" />
    <rect x="20" y="10" width="2" height="5" fill="#EF4444" />

    {/* Open O-Mouth (Shooting fireball expression) */}
    <rect x="14" y="15" width="4" height="4" fill="#1E293B" />
    <rect x="15" y="16" width="2" height="2" fill="#EA580C" />

    {/* 9 Trailing Tentacles below */}
    <rect x="5" y="24" width="2" height="10" fill="#E2E8F0" />
    <rect x="8" y="24" width="2" height="8" fill="#CBD5E1" />
    <rect x="11" y="24" width="2" height="11" fill="#E2E8F0" />
    <rect x="14" y="24" width="2" height="9" fill="#CBD5E1" />
    <rect x="17" y="24" width="2" height="11" fill="#E2E8F0" />
    <rect x="20" y="24" width="2" height="8" fill="#CBD5E1" />
    <rect x="23" y="24" width="2" height="10" fill="#E2E8F0" />
  </svg>
);

// ----------------------------------------------------------------------------
// THE END MOBS
// ----------------------------------------------------------------------------

/**
 * Pixel Enderman - Tall pitch-black figure with glowing magenta eyes & carrying a block
 */
export const PixelEnderman: React.FC<MobSpriteProps> = ({
  size = 56,
  className = '',
  isHit = false,
}) => (
  <svg
    viewBox="0 0 24 38"
    width={size}
    height={(size * 38) / 24}
    className={`${className} ${isHit ? 'filter brightness-150 animate-ping' : ''}`}
    style={{ imageRendering: 'pixelated', shapeRendering: 'crispEdges' }}
  >
    {/* Head Block */}
    <rect x="8" y="2" width="8" height="8" fill="#0F0F12" />
    <rect x="9" y="3" width="6" height="6" fill="#18181B" />

    {/* Glowing Purple Enderman Eyes */}
    <rect x="9" y="5" width="2.5" height="1.5" fill="#E879F9" />
    <rect x="9.5" y="5" width="1" height="1" fill="#FFFFFF" />
    <rect x="12.5" y="5" width="2.5" height="1.5" fill="#E879F9" />
    <rect x="13" y="5" width="1" height="1" fill="#FFFFFF" />

    {/* Thin Slender Body */}
    <rect x="10.5" y="10" width="3" height="12" fill="#09090B" />

    {/* Long Limbs (Arms) holding a Grass/Dirt Block */}
    <rect x="7" y="10" width="2" height="16" fill="#09090B" />
    <rect x="15" y="10" width="2" height="16" fill="#09090B" />

    {/* Carried Block between hands */}
    <rect x="9" y="16" width="6" height="6" fill="#78350F" />
    <rect x="9" y="16" width="6" height="2" fill="#22C55E" />

    {/* Very Long Thin Legs */}
    <rect x="9" y="22" width="2" height="16" fill="#09090B" />
    <rect x="13" y="22" width="2" height="16" fill="#09090B" />
  </svg>
);

/**
 * Pixel Shulker - End City shell with opening lid & peeking yellow eye
 */
export const PixelShulker: React.FC<MobSpriteProps> = ({
  size = 52,
  className = '',
  isHit = false,
}) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    className={`${className} ${isHit ? 'filter brightness-150' : ''}`}
    style={{ imageRendering: 'pixelated', shapeRendering: 'crispEdges' }}
  >
    {/* Upper Shell (Slightly levitated/opened) */}
    <rect x="3" y="2" width="18" height="7" fill="#6B21A8" />
    <rect x="4" y="3" width="16" height="5" fill="#9333EA" />
    <rect x="6" y="4" width="12" height="2" fill="#C084FC" />

    {/* Peeking Head Inside Shell */}
    <rect x="7" y="9" width="10" height="6" fill="#EDE9FE" />
    {/* Big Inquisitive Eyes */}
    <rect x="9" y="11" width="2" height="2" fill="#F59E0B" />
    <rect x="9.5" y="11" width="1" height="1" fill="#000000" />
    <rect x="13" y="11" width="2" height="2" fill="#F59E0B" />
    <rect x="13.5" y="11" width="1" height="1" fill="#000000" />

    {/* Lower Shell Base */}
    <rect x="3" y="15" width="18" height="7" fill="#6B21A8" />
    <rect x="4" y="16" width="16" height="5" fill="#7E22CE" />
  </svg>
);

/**
 * Pixel Ender Dragon Head - Boss battle portrait
 */
export const PixelEnderDragonHead: React.FC<MobSpriteProps> = ({
  size = 64,
  className = '',
  isHit = false,
}) => (
  <svg
    viewBox="0 0 32 32"
    width={size}
    height={size}
    className={`${className} ${isHit ? 'filter brightness-150 animate-wiggle' : ''}`}
    style={{ imageRendering: 'pixelated', shapeRendering: 'crispEdges' }}
  >
    {/* Dragon Horns */}
    <rect x="6" y="2" width="3" height="6" fill="#3F3F46" />
    <rect x="23" y="2" width="3" height="6" fill="#3F3F46" />

    {/* Dragon Skull Block */}
    <rect x="7" y="6" width="18" height="16" fill="#09090B" />
    <rect x="9" y="8" width="14" height="12" fill="#18181B" />

    {/* Fierce Glowing Dragon Eyes */}
    <rect x="9" y="12" width="4" height="2" fill="#E879F9" />
    <rect x="10" y="12" width="2" height="1" fill="#FFFFFF" />
    <rect x="19" y="12" width="4" height="2" fill="#E879F9" />
    <rect x="20" y="12" width="2" height="1" fill="#FFFFFF" />

    {/* Long Snout / Jaws */}
    <rect x="10" y="18" width="12" height="10" fill="#09090B" />
    <rect x="11" y="20" width="10" height="6" fill="#27272A" />

    {/* Nostrils */}
    <rect x="12" y="22" width="2" height="2" fill="#09090B" />
    <rect x="18" y="22" width="2" height="2" fill="#09090B" />

    {/* Sharp White Teeth */}
    <rect x="11" y="26" width="1.5" height="2" fill="#FFFFFF" />
    <rect x="15" y="26" width="2" height="2" fill="#FFFFFF" />
    <rect x="19.5" y="26" width="1.5" height="2" fill="#FFFFFF" />
  </svg>
);
