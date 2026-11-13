import React from 'react';
import { Palette, X, Sprout, Waves, Flame, Sparkles } from 'lucide-react';

// ============================================================================
// BIOME COLOR PALETTES & THEME DEFINITIONS
// Distinct aesthetic, colors, gradients, and motif tokens for each biome
// ============================================================================

export interface BiomePalette {
  id: 'plains' | 'ocean' | 'nether' | 'end';
  name: string;
  subtitle: string;
  tagline: string;
  stageName: string;
  chapterRange: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  bgGradient: string;
  borderClass: string;
  bannerBg: string;
  bannerBorder: string;
  roadColor: string;
  particleColor: string;
  voxelBlockName: string;
  colorSwatches: { label: string; hex: string; role: string }[];
  aestheticFeatures: string[];
}

export const BIOME_THEMES: Record<'plains' | 'ocean' | 'nether' | 'end', BiomePalette> = {
  plains: {
    id: 'plains',
    name: 'Plains: Verdant Overworld',
    subtitle: 'Lush Grasslands & Oak Canopies',
    tagline: 'Foundation of Knowledge',
    stageName: 'STAGE 1 • OVERWORLD BIOME',
    chapterRange: 'Lessons 1 – 3',
    primaryColor: '#3B7A1C',
    secondaryColor: '#865439',
    accentColor: '#BEF264',
    bgGradient: 'from-[#2d5e15] via-[#3B7A1C] to-[#1e460d]',
    borderClass: 'border-[#1A450A]',
    bannerBg: 'bg-emerald-950/80',
    bannerBorder: 'border-[#8FCE00]/50',
    roadColor: '#9C6B4E',
    particleColor: '#FDE047',
    voxelBlockName: 'Grass Block & Cobblestone',
    colorSwatches: [
      { label: 'Grass Emerald', hex: '#3B7A1C', role: 'Main Terrain' },
      { label: 'Voxel Lime', hex: '#8FCE00', role: 'Foliage Highlights' },
      { label: 'Loam Soil', hex: '#865439', role: 'Earth Base' },
      { label: 'Gravel Trail', hex: '#BCA18D', role: 'Pathway Stones' },
      { label: 'Sunbeam Gold', hex: '#FDE047', role: 'Atmosphere' },
    ],
    aestheticFeatures: [
      'Checkerboard pixel grass turf pattern',
      'Winding gravel and soil footpath with floral borders',
      'Diagonal morning sunbeam light shafts',
      'Floating pixel dandelion seeds and spore particles',
      'Voxel oak trees, red poppies, and dirt blocks',
    ],
  },
  ocean: {
    id: 'ocean',
    name: 'Ocean: Aquatic Depths',
    subtitle: 'Prismarine Reefs & Abyssal Trenches',
    tagline: 'Deep Conceptual Discovery',
    stageName: 'STAGE 2 • AQUATIC DEPTHS',
    chapterRange: 'Lessons 4 – 6',
    primaryColor: '#0284C7',
    secondaryColor: '#0E7490',
    accentColor: '#67E8F9',
    bgGradient: 'from-[#0369a1] via-[#0284c7] to-[#082f49]',
    borderClass: 'border-[#041D2D]',
    bannerBg: 'bg-sky-950/80',
    bannerBorder: 'border-sky-400/50',
    roadColor: '#0891B2',
    particleColor: '#A5F3FC',
    voxelBlockName: 'Prismarine & Sea Lantern',
    colorSwatches: [
      { label: 'Abyssal Cyan', hex: '#0284C7', role: 'Water Body' },
      { label: 'Prismarine Teal', hex: '#06B6D4', role: 'Monument Masonry' },
      { label: 'Lantern Luster', hex: '#FEF08A', role: 'Light Glow' },
      { label: 'Coral Blossom', hex: '#F43F5E', role: 'Reef Accent' },
      { label: 'Deep Mariana', hex: '#082F49', role: 'Trench Shadows' },
    ],
    aestheticFeatures: [
      'Underwater caustic ripple refraction texture',
      'Piercing down-shafts of filtered sunlight',
      'Submerged prismarine stone pathway with glowing sea kelp',
      'Rising pixel oxygen bubbles with horizontal drift',
      'Illuminated sea lanterns and living coral reefs',
    ],
  },
  nether: {
    id: 'nether',
    name: 'The Nether: Fiery Underworld',
    subtitle: 'Crimson Nylium & Nether Fortresses',
    tagline: 'Trial Under Pressure',
    stageName: 'STAGE 3 • THE UNDERWORLD',
    chapterRange: 'Lessons 7 – 9',
    primaryColor: '#991B1B',
    secondaryColor: '#7F1D1D',
    accentColor: '#FCA5A5',
    bgGradient: 'from-[#7f1d1d] via-[#991b1b] to-[#360707]',
    borderClass: 'border-[#260505]',
    bannerBg: 'bg-rose-950/85',
    bannerBorder: 'border-rose-500/50',
    roadColor: '#B45309',
    particleColor: '#F97316',
    voxelBlockName: 'Nether Brick & Magma Block',
    colorSwatches: [
      { label: 'Crimson Stone', hex: '#991B1B', role: 'Netherrack Core' },
      { label: 'Magma Molten', hex: '#EA580C', role: 'Lava Veins' },
      { label: 'Glowstone Gold', hex: '#FBBF24', role: 'Cavern Light' },
      { label: 'Soul Fire Cyan', hex: '#06B6D4', role: 'Spirit Accent' },
      { label: 'Obsidian Void', hex: '#18181B', role: 'Fortress Masonry' },
    ],
    aestheticFeatures: [
      'Cracked netherrack fissure texture with glowing lava veins',
      'Basalt stalactites and cavern ceiling arches',
      'Molten magma stone pathway with glowing seams',
      'Rising volcanic cinder embers and smoke particles',
      'Obsidian portal frame with undulating purple energy',
    ],
  },
  end: {
    id: 'end',
    name: 'The End: Void Dimension',
    subtitle: 'Obsidian Spires & Ender Summit',
    tagline: 'Capstone Victory & Mastery',
    stageName: 'STAGE 4 • THE END REALM',
    chapterRange: 'Lessons 10 – 12',
    primaryColor: '#581C87',
    secondaryColor: '#3B0764',
    accentColor: '#E9D5FF',
    bgGradient: 'from-[#1e1b4b] via-[#0f0b1a] to-[#040208]',
    borderClass: 'border-[#120726]',
    bannerBg: 'bg-purple-950/90',
    bannerBorder: 'border-purple-500/50',
    roadColor: '#7E22CE',
    particleColor: '#C084FC',
    voxelBlockName: 'End Stone & Purpur Pillar',
    colorSwatches: [
      { label: 'Void Abyss', hex: '#05030A', role: 'Infinite Sky' },
      { label: 'End Stone Sand', hex: '#FEF08A', role: 'Island Islands' },
      { label: 'Purpur Crystal', hex: '#7E22CE', role: 'Dragon Palace' },
      { label: 'Ender Ray Pink', hex: '#F472B6', role: 'Crystal Beacon' },
      { label: 'Nebula Violet', hex: '#C084FC', role: 'Starlight Particles' },
    ],
    aestheticFeatures: [
      'Cosmic void starfield with twinkling pixel constellations',
      'Floating pale end-stone archipelago islands',
      'Mystical purpur rune stepping bridge with glowing purple glyphs',
      'Hovering purple ender pearl teleportation sparks',
      'Towering obsidian crystal spires with pink beam rays & Ender Dragon',
    ],
  },
};

// ============================================================================
// 1. PLAINS BIOME SVG VISUAL THEME COMPONENTS
// ============================================================================

/**
 * CSS-pattern + SVG background texture for Plains Biome:
 * Pixel grass grid, dirt specks, soft sunbeams, and winding cobblestone path.
 */
export const PlainsThemeBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {/* 1. Checkerboard voxel grass pattern */}
      <svg className="absolute inset-0 w-full h-full opacity-30" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="plains-grass-pattern" width="32" height="32" patternUnits="userSpaceOnUse">
            {/* Base tile */}
            <rect width="16" height="16" fill="#4B9B27" />
            <rect x="16" width="16" height="16" fill="#38761D" />
            <rect y="16" width="16" height="16" fill="#38761D" />
            <rect x="16" y="16" width="16" height="16" fill="#4B9B27" />

            {/* Micro pixel blades */}
            <rect x="3" y="4" width="2" height="4" fill="#6AA84F" />
            <rect x="19" y="8" width="2" height="3" fill="#8FCE00" />
            <rect x="25" y="3" width="2" height="2" fill="#274E13" />
            <rect x="9" y="20" width="2" height="4" fill="#8FCE00" />
            <rect x="21" y="22" width="3" height="2" fill="#6AA84F" />

            {/* Tiny flower / clover dots */}
            <rect x="7" y="10" width="2" height="2" fill="#FACC15" />
            <rect x="27" y="24" width="2" height="2" fill="#EF4444" />
          </pattern>

          {/* Sunbeam gradient */}
          <linearGradient id="plains-sunbeams" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FEF08A" stopOpacity="0.22" />
            <stop offset="40%" stopColor="#FEF08A" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#84CC16" stopOpacity="0.0" />
          </linearGradient>
        </defs>

        <rect width="100%" height="100%" fill="url(#plains-grass-pattern)" />
        <rect width="100%" height="100%" fill="url(#plains-sunbeams)" />
      </svg>

      {/* 2. Soft diagonal sunbeams */}
      <div
        className="absolute -top-10 -left-10 w-[140%] h-[140%] opacity-25 pointer-events-none"
        style={{
          background:
            'repeating-linear-gradient(45deg, rgba(254, 240, 138, 0.12) 0px, rgba(254, 240, 138, 0.12) 35px, transparent 35px, transparent 90px)',
        }}
      />

      {/* 3. Drifting pixel pollen / dandelion seeds */}
      <div className="absolute top-10 left-[15%] w-1.5 h-1.5 bg-yellow-200 rounded-xs opacity-75 animate-pulse" />
      <div className="absolute top-36 right-[20%] w-2 h-2 bg-lime-200 rounded-xs opacity-60 animate-bounce" style={{ animationDuration: '4s' }} />
      <div className="absolute top-64 left-[28%] w-1.5 h-1.5 bg-white rounded-xs opacity-70 animate-pulse" style={{ animationDuration: '3s' }} />
      <div className="absolute bottom-20 right-[15%] w-2 h-2 bg-yellow-300 rounded-xs opacity-65 animate-bounce" style={{ animationDuration: '5s' }} />
    </div>
  );
};

/**
 * Winding Dirt & Cobblestone Path SVG for Plains Biome:
 * Connects the 3 lessons (left -> right -> center) with an authentic Minecraft trail.
 */
export const PlainsTrailPathSvg: React.FC = () => {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible"
      viewBox="0 0 600 520"
      preserveAspectRatio="none"
    >
      <defs>
        {/* Dirt & Cobblestone Path Gradient */}
        <linearGradient id="plains-path-grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#9C6B4E" />
          <stop offset="50%" stopColor="#865439" />
          <stop offset="100%" stopColor="#6E442D" />
        </linearGradient>

        <filter id="path-shadow" x="-10%" y="-10%" width="130%" height="130%">
          <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#1A450A" floodOpacity="0.6" />
        </filter>
      </defs>

      {/* Wide dirt path trench */}
      <path
        d="M 230 40 C 210 100, 190 140, 230 180 C 270 220, 390 220, 380 300 C 370 360, 310 400, 300 480"
        fill="none"
        stroke="#5A3A26"
        strokeWidth="38"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="url(#path-shadow)"
      />

      {/* Cobblestone & Gravel Inner Road */}
      <path
        d="M 230 40 C 210 100, 190 140, 230 180 C 270 220, 390 220, 380 300 C 370 360, 310 400, 300 480"
        fill="none"
        stroke="url(#plains-path-grad)"
        strokeWidth="28"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Cobblestone Stepping Stones along the trail */}
      <path
        d="M 230 40 C 210 100, 190 140, 230 180 C 270 220, 390 220, 380 300 C 370 360, 310 400, 300 480"
        fill="none"
        stroke="#D4B499"
        strokeWidth="8"
        strokeDasharray="14 18"
        strokeLinecap="square"
        opacity="0.85"
      />

      {/* Dark cobblestone edge flecks */}
      <path
        d="M 230 40 C 210 100, 190 140, 230 180 C 270 220, 390 220, 380 300 C 370 360, 310 400, 300 480"
        fill="none"
        stroke="#4A2F1E"
        strokeWidth="3"
        strokeDasharray="6 26"
        opacity="0.9"
      />
    </svg>
  );
};

// ============================================================================
// 2. OCEAN BIOME SVG VISUAL THEME COMPONENTS
// ============================================================================

/**
 * CSS-pattern + SVG background texture for Ocean Biome:
 * Aquatic caustics ripple, light shafts descending into the deep, and animated bubbles.
 */
export const OceanThemeBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {/* 1. Underwater caustic refraction grid */}
      <svg className="absolute inset-0 w-full h-full opacity-35" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="ocean-water-pattern" width="36" height="36" patternUnits="userSpaceOnUse">
            {/* Water depth blocks */}
            <rect width="18" height="18" fill="#0284C7" />
            <rect x="18" width="18" height="18" fill="#0369A1" />
            <rect y="18" width="18" height="18" fill="#075985" />
            <rect x="18" y="18" width="18" height="18" fill="#0284C7" />

            {/* Caustic highlights */}
            <rect x="4" y="4" width="6" height="2" fill="#38BDF8" opacity="0.6" />
            <rect x="22" y="8" width="8" height="2" fill="#67E8F9" opacity="0.7" />
            <rect x="10" y="24" width="6" height="2" fill="#38BDF8" opacity="0.5" />
            <rect x="26" y="22" width="4" height="2" fill="#A5F3FC" opacity="0.6" />

            {/* Deep shadow pixels */}
            <rect x="8" y="14" width="4" height="2" fill="#0C4A6E" opacity="0.5" />
            <rect x="20" y="30" width="6" height="2" fill="#0C4A6E" opacity="0.5" />
          </pattern>

          {/* Oceanic Light Ray Gradient */}
          <linearGradient id="ocean-light-rays" x1="20%" y1="0%" x2="80%" y2="100%">
            <stop offset="0%" stopColor="#67E8F9" stopOpacity="0.25" />
            <stop offset="45%" stopColor="#0284C7" stopOpacity="0.10" />
            <stop offset="100%" stopColor="#082F49" stopOpacity="0.0" />
          </linearGradient>
        </defs>

        <rect width="100%" height="100%" fill="url(#ocean-water-pattern)" />
        <rect width="100%" height="100%" fill="url(#ocean-light-rays)" />
      </svg>

      {/* 2. Downward piercing light shafts */}
      <div
        className="absolute -top-10 -left-10 w-[140%] h-[140%] opacity-30 pointer-events-none"
        style={{
          background:
            'repeating-linear-gradient(115deg, rgba(103, 232, 249, 0.15) 0px, rgba(103, 232, 249, 0.15) 28px, transparent 28px, transparent 80px)',
        }}
      />

      {/* 3. Rising pixel air bubbles */}
      <div className="absolute bottom-16 left-[18%] w-2 h-2 bg-cyan-200/80 rounded-full animate-bounce" style={{ animationDuration: '3.2s' }} />
      <div className="absolute bottom-32 right-[24%] w-3 h-3 bg-cyan-100/70 rounded-full animate-pulse" style={{ animationDuration: '2.5s' }} />
      <div className="absolute bottom-52 left-[32%] w-1.5 h-1.5 bg-white/90 rounded-full animate-bounce" style={{ animationDuration: '4s' }} />
      <div className="absolute top-28 right-[12%] w-2 h-2 bg-sky-200/80 rounded-full animate-pulse" style={{ animationDuration: '3.8s' }} />

      {/* 4. Swimming Pixel Fish Silhouette */}
      <svg className="absolute top-24 left-[8%] w-7 h-4 opacity-50 text-cyan-200" viewBox="0 0 16 8">
        <rect x="0" y="2" width="2" height="4" fill="currentColor" />
        <rect x="2" y="1" width="3" height="6" fill="currentColor" />
        <rect x="5" y="0" width="7" height="8" fill="currentColor" />
        <rect x="12" y="1" width="3" height="6" fill="currentColor" />
        <rect x="15" y="3" width="1" height="2" fill="currentColor" />
        <rect x="8" y="2" width="2" height="2" fill="#FEF08A" />
      </svg>
      <svg className="absolute bottom-40 right-[10%] w-6 h-3 opacity-40 text-amber-200" viewBox="0 0 16 8">
        <rect x="0" y="3" width="1" height="2" fill="currentColor" />
        <rect x="1" y="1" width="3" height="6" fill="currentColor" />
        <rect x="4" y="0" width="7" height="8" fill="currentColor" />
        <rect x="11" y="1" width="3" height="6" fill="currentColor" />
        <rect x="14" y="2" width="2" height="4" fill="currentColor" />
        <rect x="6" y="2" width="2" height="2" fill="#F43F5E" />
      </svg>
    </div>
  );
};

/**
 * Winding Submerged Prismarine Trail SVG for Ocean Biome:
 * Connects the 3 lessons (right -> left -> center) with an aquatic prismarine road.
 */
export const OceanTrailPathSvg: React.FC = () => {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible"
      viewBox="0 0 600 520"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="ocean-path-grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#0E7490" />
          <stop offset="50%" stopColor="#06B6D4" />
          <stop offset="100%" stopColor="#0891B2" />
        </linearGradient>

        <filter id="ocean-path-glow" x="-10%" y="-10%" width="130%" height="130%">
          <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#06B6D4" floodOpacity="0.4" />
        </filter>
      </defs>

      {/* Dark trench substrate */}
      <path
        d="M 370 40 C 390 100, 410 140, 370 180 C 330 220, 210 220, 220 300 C 230 360, 290 400, 300 480"
        fill="none"
        stroke="#042F4A"
        strokeWidth="38"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="url(#ocean-path-glow)"
      />

      {/* Prismarine stone pavement */}
      <path
        d="M 370 40 C 390 100, 410 140, 370 180 C 330 220, 210 220, 220 300 C 230 360, 290 400, 300 480"
        fill="none"
        stroke="url(#ocean-path-grad)"
        strokeWidth="28"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Illuminated Sea Lantern Conduit line */}
      <path
        d="M 370 40 C 390 100, 410 140, 370 180 C 330 220, 210 220, 220 300 C 230 360, 290 400, 300 480"
        fill="none"
        stroke="#A5F3FC"
        strokeWidth="8"
        strokeDasharray="12 20"
        strokeLinecap="square"
        opacity="0.9"
      />

      {/* Dark prismarine tile grout */}
      <path
        d="M 370 40 C 390 100, 410 140, 370 180 C 330 220, 210 220, 220 300 C 230 360, 290 400, 300 480"
        fill="none"
        stroke="#083344"
        strokeWidth="3"
        strokeDasharray="5 27"
        opacity="0.8"
      />
    </svg>
  );
};

// ============================================================================
// 3. THE NETHER BIOME SVG VISUAL THEME COMPONENTS
// ============================================================================

/**
 * CSS-pattern + SVG background texture for Nether Biome:
 * Netherrack fissures, glowing magma veins, ceiling stalactites, and rising embers.
 */
export const NetherThemeBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {/* 1. Netherrack fissure & magma grid */}
      <svg className="absolute inset-0 w-full h-full opacity-35" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="nether-rock-pattern" width="32" height="32" patternUnits="userSpaceOnUse">
            {/* Netherrack dark stone */}
            <rect width="16" height="16" fill="#7F1D1D" />
            <rect x="16" width="16" height="16" fill="#991B1B" />
            <rect y="16" width="16" height="16" fill="#601212" />
            <rect x="16" y="16" width="16" height="16" fill="#7F1D1D" />

            {/* Magma Fissure Lines (Glowing veins) */}
            <rect x="4" y="6" width="8" height="2" fill="#EA580C" />
            <rect x="10" y="8" width="2" height="6" fill="#F97316" />
            <rect x="20" y="2" width="6" height="2" fill="#FDE047" />
            <rect x="2" y="20" width="4" height="2" fill="#F97316" />
            <rect x="22" y="24" width="8" height="2" fill="#EA580C" />

            {/* Crimson fungus dots */}
            <rect x="8" y="24" width="3" height="3" fill="#BE123C" />
            <rect x="26" y="10" width="2" height="2" fill="#06B6D4" />
          </pattern>

          {/* Molten Glow gradient */}
          <linearGradient id="nether-heat-gradient" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#EA580C" stopOpacity="0.30" />
            <stop offset="40%" stopColor="#DC2626" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#450A0A" stopOpacity="0.0" />
          </linearGradient>
        </defs>

        <rect width="100%" height="100%" fill="url(#nether-rock-pattern)" />
        <rect width="100%" height="100%" fill="url(#nether-heat-gradient)" />
      </svg>

      {/* 2. Heat haze wave lines */}
      <div
        className="absolute -top-10 -left-10 w-[140%] h-[140%] opacity-25 pointer-events-none"
        style={{
          background:
            'repeating-linear-gradient(0deg, rgba(234, 88, 12, 0.12) 0px, rgba(234, 88, 12, 0.12) 16px, transparent 16px, transparent 48px)',
        }}
      />

      {/* 3. Rising fiery embers & volcanic smoke */}
      <div className="absolute bottom-12 left-[20%] w-2 h-2 bg-orange-400 rounded-xs opacity-90 animate-bounce" style={{ animationDuration: '2s' }} />
      <div className="absolute bottom-28 right-[18%] w-1.5 h-1.5 bg-yellow-300 rounded-xs opacity-85 animate-pulse" style={{ animationDuration: '1.8s' }} />
      <div className="absolute bottom-48 left-[35%] w-2.5 h-2.5 bg-red-500 rounded-xs opacity-75 animate-bounce" style={{ animationDuration: '3.1s' }} />
      <div className="absolute top-36 right-[28%] w-1.5 h-1.5 bg-amber-400 rounded-xs opacity-90 animate-pulse" style={{ animationDuration: '2.4s' }} />
      <div className="absolute top-64 left-[14%] w-2 h-2 bg-orange-500 rounded-xs opacity-80 animate-bounce" style={{ animationDuration: '3.6s' }} />

      {/* 4. Stalactite silhouettes hanging from top */}
      <svg className="absolute top-0 left-8 w-8 h-8 opacity-60 text-[#360808]" viewBox="0 0 16 16">
        <polygon points="0,0 16,0 8,16" fill="currentColor" />
      </svg>
      <svg className="absolute top-0 right-12 w-6 h-6 opacity-60 text-[#360808]" viewBox="0 0 16 16">
        <polygon points="0,0 16,0 8,16" fill="currentColor" />
      </svg>
    </div>
  );
};

/**
 * Winding Magma & Nether Brick Trail SVG for Nether Biome:
 * Connects the 3 lessons (left -> right -> center) with a volcanic scorched stone road.
 */
export const NetherTrailPathSvg: React.FC = () => {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible"
      viewBox="0 0 600 520"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="nether-path-grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#7F1D1D" />
          <stop offset="50%" stopColor="#DC2626" />
          <stop offset="100%" stopColor="#991B1B" />
        </linearGradient>

        <filter id="nether-path-glow" x="-10%" y="-10%" width="130%" height="130%">
          <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#EF4444" floodOpacity="0.5" />
        </filter>
      </defs>

      {/* Obsidian scorched base */}
      <path
        d="M 230 40 C 210 100, 190 140, 230 180 C 270 220, 390 220, 380 300 C 370 360, 310 400, 300 480"
        fill="none"
        stroke="#280505"
        strokeWidth="38"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="url(#nether-path-glow)"
      />

      {/* Nether brick & Magma stone road */}
      <path
        d="M 230 40 C 210 100, 190 140, 230 180 C 270 220, 390 220, 380 300 C 370 360, 310 400, 300 480"
        fill="none"
        stroke="url(#nether-path-grad)"
        strokeWidth="28"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Glowing Molten Lava Core Line */}
      <path
        d="M 230 40 C 210 100, 190 140, 230 180 C 270 220, 390 220, 380 300 C 370 360, 310 400, 300 480"
        fill="none"
        stroke="#FEF08A"
        strokeWidth="8"
        strokeDasharray="14 18"
        strokeLinecap="square"
        opacity="0.95"
      />

      {/* Fiery orange seam cracks */}
      <path
        d="M 230 40 C 210 100, 190 140, 230 180 C 270 220, 390 220, 380 300 C 370 360, 310 400, 300 480"
        fill="none"
        stroke="#EA580C"
        strokeWidth="3"
        strokeDasharray="6 26"
        opacity="0.85"
      />
    </svg>
  );
};

// ============================================================================
// 4. THE END BIOME SVG VISUAL THEME COMPONENTS
// ============================================================================

/**
 * CSS-pattern + SVG background texture for The End Biome:
 * Cosmic void starfield, twinkling constellations, end stone archipelago, and void sparks.
 */
export const EndThemeBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {/* 1. Deep space void starfield pattern */}
      <svg className="absolute inset-0 w-full h-full opacity-40" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="end-void-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
            {/* Dark void background */}
            <rect width="40" height="40" fill="#0A0612" />

            {/* Twinkling pixel stars */}
            <rect x="6" y="8" width="2" height="2" fill="#E9D5FF" />
            <rect x="28" y="14" width="2" height="2" fill="#C084FC" />
            <rect x="18" y="32" width="2" height="2" fill="#FFFFFF" />
            <rect x="36" y="28" width="1" height="1" fill="#F472B6" />
            <rect x="10" y="22" width="1" height="1" fill="#A855F7" />
            <rect x="22" y="4" width="1" height="1" fill="#E9D5FF" />

            {/* End stone sand speckles */}
            <rect x="32" y="2" width="2" height="2" fill="#FEF08A" opacity="0.4" />
          </pattern>

          {/* Void Nebula Core Gradient */}
          <radialGradient id="end-nebula-glow" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor="#7E22CE" stopOpacity="0.28" />
            <stop offset="50%" stopColor="#3B0764" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#05030A" stopOpacity="0.0" />
          </radialGradient>
        </defs>

        <rect width="100%" height="100%" fill="url(#end-void-pattern)" />
        <rect width="100%" height="100%" fill="url(#end-nebula-glow)" />
      </svg>

      {/* 2. Mystical nebula dust rings */}
      <div
        className="absolute -top-10 -left-10 w-[140%] h-[140%] opacity-20 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(168, 85, 247, 0.25) 0%, rgba(88, 28, 135, 0.1) 45%, transparent 70%)',
        }}
      />

      {/* 3. Floating Ender Pearl / Void Sparks */}
      <div className="absolute bottom-20 left-[22%] w-2 h-2 bg-purple-300 rounded-full opacity-90 animate-ping" style={{ animationDuration: '2.8s' }} />
      <div className="absolute bottom-44 right-[20%] w-2.5 h-2.5 bg-fuchsia-300 rounded-full opacity-80 animate-pulse" style={{ animationDuration: '2.2s' }} />
      <div className="absolute top-36 left-[30%] w-1.5 h-1.5 bg-teal-300 rounded-full opacity-85 animate-bounce" style={{ animationDuration: '3.4s' }} />
      <div className="absolute top-60 right-[15%] w-2 h-2 bg-purple-200 rounded-full opacity-90 animate-ping" style={{ animationDuration: '3s' }} />

      {/* 4. Floating End Stone Island Silhouette */}
      <svg className="absolute bottom-8 left-[6%] w-16 h-10 opacity-40 text-[#FEF08A]" viewBox="0 0 32 20">
        <polygon points="4,4 28,4 32,8 26,16 6,16 0,8" fill="#581C87" />
        <polygon points="6,4 26,4 30,8 24,14 8,14 2,8" fill="currentColor" opacity="0.6" />
      </svg>
    </div>
  );
};

/**
 * Winding Purpur & End Stone Trail SVG for The End Biome:
 * Connects the 3 lessons (right -> left -> center BOSS) with a mystical purple rune road.
 */
export const EndTrailPathSvg: React.FC = () => {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible"
      viewBox="0 0 600 520"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="end-path-grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#581C87" />
          <stop offset="50%" stopColor="#A855F7" />
          <stop offset="100%" stopColor="#7E22CE" />
        </linearGradient>

        <filter id="end-path-glow" x="-10%" y="-10%" width="130%" height="130%">
          <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#C084FC" floodOpacity="0.6" />
        </filter>
      </defs>

      {/* Bedrock void trench */}
      <path
        d="M 370 40 C 390 100, 410 140, 370 180 C 330 220, 210 220, 220 300 C 230 360, 290 400, 300 480"
        fill="none"
        stroke="#1A0A2E"
        strokeWidth="38"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="url(#end-path-glow)"
      />

      {/* Purpur tile road */}
      <path
        d="M 370 40 C 390 100, 410 140, 370 180 C 330 220, 210 220, 220 300 C 230 360, 290 400, 300 480"
        fill="none"
        stroke="url(#end-path-grad)"
        strokeWidth="28"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Glowing End-Stone Rune Glyphs */}
      <path
        d="M 370 40 C 390 100, 410 140, 370 180 C 330 220, 210 220, 220 300 C 230 360, 290 400, 300 480"
        fill="none"
        stroke="#FDE047"
        strokeWidth="8"
        strokeDasharray="14 20"
        strokeLinecap="square"
        opacity="0.9"
      />

      {/* Magenta Dragon breath edge sparkles */}
      <path
        d="M 370 40 C 390 100, 410 140, 370 180 C 330 220, 210 220, 220 300 C 230 360, 290 400, 300 480"
        fill="none"
        stroke="#E879F9"
        strokeWidth="3"
        strokeDasharray="6 26"
        opacity="0.85"
      />
    </svg>
  );
};

// ============================================================================
// 5. BIOME PALETTE INSPECTOR MODAL / DRAWER
// Allows students & parents to explore the distinct color palettes & theme motifs
// ============================================================================

interface BiomePaletteModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeBiomeId: 'plains' | 'ocean' | 'nether' | 'end';
  onSelectBiome?: (biomeId: 'plains' | 'ocean' | 'nether' | 'end') => void;
}

export const BiomePaletteModal: React.FC<BiomePaletteModalProps> = ({
  isOpen,
  onClose,
  activeBiomeId,
  onSelectBiome,
}) => {
  const [selectedBiomeKey, setSelectedBiomeKey] = React.useState<'plains' | 'ocean' | 'nether' | 'end'>(activeBiomeId);

  React.useEffect(() => {
    setSelectedBiomeKey(activeBiomeId);
  }, [activeBiomeId]);

  if (!isOpen) return null;

  const currentBiome = BIOME_THEMES[selectedBiomeKey];

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-150">
      <div className="w-full max-w-xl bg-slate-900 border-4 border-amber-400 rounded-3xl p-5 sm:p-6 shadow-2xl text-white relative flex flex-col max-h-[90vh] overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-amber-400/20 border-2 border-amber-400 flex items-center justify-center">
              <Palette className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h3 className="text-base font-black text-white">4-Biome Visual Themes & Color Palettes</h3>
              <p className="text-xs text-slate-400">
                Minecraft-inspired SVG patterns, custom road trails, and ambient color palettes
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center font-bold text-sm cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Biome Segment Tabs */}
        <div className="grid grid-cols-4 gap-1.5 p-1 bg-slate-950 rounded-2xl border border-slate-800 mb-4">
          {(['plains', 'ocean', 'nether', 'end'] as const).map((bKey) => {
            const b = BIOME_THEMES[bKey];
            const isSelected = selectedBiomeKey === bKey;
            return (
              <button
                key={bKey}
                onClick={() => {
                  setSelectedBiomeKey(bKey);
                  onSelectBiome?.(bKey);
                }}
                className={`py-2 px-1.5 rounded-xl text-xs font-black transition-all flex flex-col items-center gap-0.5 cursor-pointer ${
                  isSelected
                    ? 'bg-amber-400 text-slate-950 shadow-md scale-102'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <span className="flex items-center justify-center">
                  {bKey === 'plains' ? (
                    <Sprout className="w-4 h-4" />
                  ) : bKey === 'ocean' ? (
                    <Waves className="w-4 h-4" />
                  ) : bKey === 'nether' ? (
                    <Flame className="w-4 h-4" />
                  ) : (
                    <Sparkles className="w-4 h-4" />
                  )}
                </span>
                <span className="capitalize text-[11px] truncate w-full text-center">
                  {bKey}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Biome Palette Card */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-1">
          {/* Hero Banner Preview */}
          <div
            className={`p-4 rounded-2xl border-2 ${currentBiome.bannerBorder} ${currentBiome.bannerBg} flex items-center justify-between`}
          >
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-amber-300 block">
                {currentBiome.stageName}
              </span>
              <h4 className="text-base font-black text-white">{currentBiome.name}</h4>
              <p className="text-xs text-slate-300 font-medium">{currentBiome.subtitle}</p>
            </div>
            <div className="text-right">
              <span className="text-xs font-mono bg-black/40 px-2.5 py-1 rounded-lg border border-white/20 font-bold">
                {currentBiome.chapterRange}
              </span>
              <div className="text-[11px] text-slate-400 mt-1 font-mono">
                {currentBiome.voxelBlockName}
              </div>
            </div>
          </div>

          {/* Color Palette Swatches */}
          <div className="space-y-2">
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Aesthetic Color Palette & Swatches
            </h5>
            <div className="grid grid-cols-5 gap-2">
              {currentBiome.colorSwatches.map((swatch, idx) => (
                <div key={idx} className="flex flex-col items-center gap-1.5">
                  <div
                    className="w-full h-12 rounded-xl border-2 border-white/30 shadow-md flex items-center justify-center text-[10px] font-mono font-bold"
                    style={{ backgroundColor: swatch.hex }}
                  >
                    <span className="bg-black/60 px-1 py-0.5 rounded text-[9px] text-white">
                      {swatch.hex}
                    </span>
                  </div>
                  <div className="text-center leading-tight">
                    <span className="text-[10px] font-bold text-white block truncate w-full">
                      {swatch.label}
                    </span>
                    <span className="text-[9px] text-slate-400 block truncate">
                      {swatch.role}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Biome Aesthetic Features */}
          <div className="p-3.5 bg-slate-950/80 rounded-2xl border border-slate-800 space-y-2">
            <h5 className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Theme Visual Features & Textures:</span>
            </h5>
            <ul className="space-y-1 text-xs text-slate-300">
              {currentBiome.aestheticFeatures.map((feat, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold">•</span>
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer Action */}
        <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between">
          <span className="text-[11px] text-slate-400">
            Click any biome tab to inspect its palette & styling.
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs transition-colors cursor-pointer"
          >
            Done Exploring
          </button>
        </div>
      </div>
    </div>
  );
};
