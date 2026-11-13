import React from 'react';

// ==========================================
// 1. PIXEL BOY ADVENTURER CHARACTER
// Authentic Minecraft-inspired 16x24 pixel art
// ==========================================
export const PixelBoyCharacter: React.FC<{
  className?: string;
  size?: number;
  isWalking?: boolean;
}> = ({ className = '', size = 56, isWalking = false }) => {
  return (
    <svg
      viewBox="0 0 24 32"
      width={size}
      height={(size * 32) / 24}
      className={`${className} ${isWalking ? 'animate-bounce' : ''}`}
      style={{
        imageRendering: 'pixelated',
        shapeRendering: 'crispEdges',
      }}
    >
      {/* --- HAIR (Brown Pixels) --- */}
      {/* Top hair cap */}
      <rect x="7" y="3" width="10" height="2" fill="#452714" />
      <rect x="6" y="5" width="12" height="3" fill="#5D3A1A" />
      <rect x="6" y="8" width="3" height="3" fill="#5D3A1A" />
      <rect x="15" y="8" width="3" height="3" fill="#5D3A1A" />
      {/* Hair highlight */}
      <rect x="8" y="4" width="4" height="1" fill="#784C28" />

      {/* --- FACE (Peach / Skin tone) --- */}
      <rect x="7" y="7" width="10" height="6" fill="#F8D3B0" />
      <rect x="6" y="9" width="1" height="3" fill="#F8D3B0" />
      <rect x="17" y="9" width="1" height="3" fill="#F8D3B0" />

      {/* Eyes (8-bit cyan/white eyes) */}
      <rect x="8" y="9" width="2" height="2" fill="#0284C7" />
      <rect x="8" y="9" width="1" height="1" fill="#FFFFFF" />
      <rect x="14" y="9" width="2" height="2" fill="#0284C7" />
      <rect x="14" y="9" width="1" height="1" fill="#FFFFFF" />

      {/* Eyebrows */}
      <rect x="8" y="8" width="2" height="1" fill="#452714" />
      <rect x="14" y="8" width="2" height="1" fill="#452714" />

      {/* Nose & Smile */}
      <rect x="11" y="11" width="2" height="1" fill="#E8B084" />
      <rect x="10" y="12" width="4" height="1" fill="#C27D56" />

      {/* --- TUNIC / JACKET (Teal & Spruce Adventurer Shirt) --- */}
      <rect x="6" y="13" width="12" height="8" fill="#0D9488" />
      <rect x="8" y="13" width="8" height="7" fill="#14B8A6" />
      {/* Collar & Zipper line */}
      <rect x="11" y="13" width="2" height="4" fill="#042F2C" />
      <rect x="11" y="14" width="2" height="2" fill="#F8D3B0" />

      {/* Arms (Left & Right) */}
      <rect x="4" y="13" width="2" height="6" fill="#0D9488" />
      <rect x="4" y="19" width="2" height="2" fill="#F8D3B0" />
      <rect x="18" y="13" width="2" height="6" fill="#0D9488" />
      <rect x="18" y="19" width="2" height="2" fill="#F8D3B0" />

      {/* Compass in Hand (Gold pixel) */}
      <rect x="18" y="19" width="3" height="3" fill="#EAB308" />
      <rect x="19" y="20" width="1" height="1" fill="#DC2626" />

      {/* Belt (Leather brown with gold buckle) */}
      <rect x="6" y="20" width="12" height="2" fill="#5D3A1A" />
      <rect x="10" y="20" width="4" height="2" fill="#EAB308" />
      <rect x="11" y="20" width="2" height="2" fill="#CA8A04" />

      {/* --- TROUSERS (Navy Denim Jeans) --- */}
      <rect x="7" y="22" width="4" height="5" fill="#1E3A8A" />
      <rect x="13" y="22" width="4" height="5" fill="#1E3A8A" />
      <rect x="8" y="23" width="2" height="3" fill="#2563EB" />
      <rect x="14" y="23" width="2" height="3" fill="#2563EB" />

      {/* --- BOOTS (Leather boots) --- */}
      <rect x="6" y="27" width="5" height="3" fill="#422006" />
      <rect x="13" y="27" width="5" height="3" fill="#422006" />
      <rect x="6" y="29" width="5" height="1" fill="#713F12" />
      <rect x="13" y="29" width="5" height="1" fill="#713F12" />
    </svg>
  );
};

// ==========================================
// 2. PIXEL GIRL ADVENTURER CHARACTER
// Authentic Minecraft-inspired 16x24 pixel art
// ==========================================
export const PixelGirlCharacter: React.FC<{
  className?: string;
  size?: number;
  isWalking?: boolean;
}> = ({ className = '', size = 56, isWalking = false }) => {
  return (
    <svg
      viewBox="0 0 24 32"
      width={size}
      height={(size * 32) / 24}
      className={`${className} ${isWalking ? 'animate-bounce' : ''}`}
      style={{
        imageRendering: 'pixelated',
        shapeRendering: 'crispEdges',
      }}
    >
      {/* --- HAIR (Auburn / Golden Braid & Ponytail) --- */}
      {/* Top hair & side fringes */}
      <rect x="7" y="3" width="10" height="2" fill="#B45309" />
      <rect x="6" y="5" width="12" height="4" fill="#D97706" />
      <rect x="5" y="8" width="3" height="7" fill="#B45309" />
      <rect x="16" y="8" width="3" height="9" fill="#B45309" />
      {/* Hair ribbon/headband */}
      <rect x="6" y="6" width="12" height="1" fill="#059669" />
      {/* Ponytail tip */}
      <rect x="17" y="16" width="2" height="3" fill="#78350F" />

      {/* --- FACE (Peach / Skin tone) --- */}
      <rect x="7" y="7" width="10" height="6" fill="#FED7AA" />

      {/* Eyes (Emerald Green 8-bit eyes) */}
      <rect x="8" y="9" width="2" height="2" fill="#059669" />
      <rect x="8" y="9" width="1" height="1" fill="#FFFFFF" />
      <rect x="14" y="9" width="2" height="2" fill="#059669" />
      <rect x="14" y="9" width="1" height="1" fill="#FFFFFF" />

      {/* Eyelashes / Eyebrows */}
      <rect x="7" y="8" width="3" height="1" fill="#78350F" />
      <rect x="14" y="8" width="3" height="1" fill="#78350F" />

      {/* Blush & Smile */}
      <rect x="7" y="11" width="2" height="1" fill="#FCA5A5" opacity="0.8" />
      <rect x="15" y="11" width="2" height="1" fill="#FCA5A5" opacity="0.8" />
      <rect x="10" y="12" width="4" height="1" fill="#BE123C" />

      {/* --- TUNIC / JACKET (Coral Explorer Tunic) --- */}
      <rect x="6" y="13" width="12" height="8" fill="#E11D48" />
      <rect x="8" y="13" width="8" height="7" fill="#F43F5E" />
      {/* White lace neck */}
      <rect x="10" y="13" width="4" height="2" fill="#FFFFFF" />

      {/* Explorer Crossbody Satchel Strap */}
      <rect x="6" y="14" width="2" height="1" fill="#78350F" />
      <rect x="8" y="15" width="2" height="1" fill="#78350F" />
      <rect x="10" y="16" width="2" height="1" fill="#78350F" />
      <rect x="12" y="17" width="2" height="1" fill="#78350F" />
      <rect x="14" y="18" width="3" height="3" fill="#92400E" />

      {/* Arms (Left & Right) */}
      <rect x="4" y="13" width="2" height="6" fill="#E11D48" />
      <rect x="4" y="19" width="2" height="2" fill="#FED7AA" />
      <rect x="18" y="13" width="2" height="6" fill="#E11D48" />
      <rect x="18" y="19" width="2" height="2" fill="#FED7AA" />

      {/* Map Scroll in Hand (Parchment pixel) */}
      <rect x="3" y="19" width="3" height="3" fill="#FEF08A" />
      <rect x="4" y="20" width="1" height="1" fill="#D97706" />

      {/* Belt */}
      <rect x="6" y="20" width="12" height="2" fill="#78350F" />
      <rect x="10" y="20" width="4" height="2" fill="#FDE047" />

      {/* --- TROUSERS (Charcoal Explorer Trousers) --- */}
      <rect x="7" y="22" width="4" height="5" fill="#334155" />
      <rect x="13" y="22" width="4" height="5" fill="#334155" />
      <rect x="8" y="23" width="2" height="3" fill="#475569" />
      <rect x="14" y="23" width="2" height="3" fill="#475569" />

      {/* --- BOOTS (Sturdy leather boots with folded cuff) --- */}
      <rect x="6" y="27" width="5" height="3" fill="#854D0E" />
      <rect x="13" y="27" width="5" height="3" fill="#854D0E" />
      <rect x="6" y="27" width="5" height="1" fill="#B45309" />
      <rect x="13" y="27" width="5" height="1" fill="#B45309" />
    </svg>
  );
};

// ==========================================
// 3. BIOME 1: PLAINS DECORATIONS
// ==========================================
export const PixelGrassBlock: React.FC<{ size?: number; className?: string }> = ({
  size = 40,
  className = '',
}) => (
  <svg
    viewBox="0 0 16 16"
    width={size}
    height={size}
    className={className}
    style={{ imageRendering: 'pixelated', shapeRendering: 'crispEdges' }}
  >
    {/* Dirt base */}
    <rect x="0" y="5" width="16" height="11" fill="#865439" />
    {/* Dirt speckles */}
    <rect x="2" y="7" width="2" height="2" fill="#573824" />
    <rect x="8" y="9" width="2" height="2" fill="#573824" />
    <rect x="12" y="12" width="2" height="2" fill="#573824" />
    <rect x="4" y="13" width="2" height="2" fill="#9C6B4E" />
    <rect x="10" y="6" width="2" height="2" fill="#9C6B4E" />

    {/* Grass Top Layer */}
    <rect x="0" y="0" width="16" height="5" fill="#5B8C3A" />
    <rect x="0" y="0" width="16" height="2" fill="#75B048" />
    {/* Dripping grass blades */}
    <rect x="1" y="5" width="2" height="3" fill="#5B8C3A" />
    <rect x="5" y="5" width="3" height="2" fill="#5B8C3A" />
    <rect x="9" y="5" width="2" height="4" fill="#5B8C3A" />
    <rect x="13" y="5" width="2" height="2" fill="#5B8C3A" />
  </svg>
);

export const PixelOakTree: React.FC<{ size?: number; className?: string }> = ({
  size = 80,
  className = '',
}) => (
  <svg
    viewBox="0 0 32 40"
    width={size}
    height={(size * 40) / 32}
    className={className}
    style={{ imageRendering: 'pixelated', shapeRendering: 'crispEdges' }}
  >
    {/* Oak Trunk */}
    <rect x="13" y="24" width="6" height="16" fill="#6B4F32" />
    <rect x="14" y="24" width="2" height="16" fill="#8B6946" />
    <rect x="17" y="26" width="2" height="4" fill="#523B24" />

    {/* Green Voxel Leaves Blocks */}
    <rect x="4" y="8" width="24" height="16" fill="#38761D" />
    <rect x="6" y="4" width="20" height="8" fill="#4B9B27" />
    <rect x="8" y="2" width="16" height="4" fill="#6AA84F" />

    {/* Highlights */}
    <rect x="6" y="6" width="4" height="4" fill="#8FCE00" />
    <rect x="16" y="8" width="4" height="3" fill="#8FCE00" />
    <rect x="8" y="14" width="4" height="4" fill="#274E13" />
    <rect x="20" y="16" width="4" height="4" fill="#274E13" />
  </svg>
);

export const PixelPoppyFlower: React.FC<{ size?: number; className?: string }> = ({
  size = 24,
  className = '',
}) => (
  <svg
    viewBox="0 0 16 16"
    width={size}
    height={size}
    className={className}
    style={{ imageRendering: 'pixelated', shapeRendering: 'crispEdges' }}
  >
    {/* Stem */}
    <rect x="7" y="8" width="2" height="8" fill="#38761D" />
    <rect x="5" y="10" width="2" height="2" fill="#4B9B27" />
    {/* Red petals */}
    <rect x="5" y="2" width="6" height="6" fill="#CC0000" />
    <rect x="6" y="3" width="4" height="4" fill="#E60000" />
    <rect x="7" y="4" width="2" height="2" fill="#1C1C1C" />
  </svg>
);

// ==========================================
// 4. BIOME 2: OCEAN DECORATIONS
// ==========================================
export const PixelSeaLantern: React.FC<{ size?: number; className?: string }> = ({
  size = 40,
  className = '',
}) => (
  <svg
    viewBox="0 0 16 16"
    width={size}
    height={size}
    className={className}
    style={{ imageRendering: 'pixelated', shapeRendering: 'crispEdges' }}
  >
    {/* Border frame */}
    <rect x="0" y="0" width="16" height="16" fill="#164E63" />
    {/* Glowing face */}
    <rect x="1" y="1" width="14" height="14" fill="#67E8F9" />
    {/* Inner diamond grid */}
    <rect x="4" y="4" width="8" height="8" fill="#CFFAFE" />
    <rect x="6" y="6" width="4" height="4" fill="#FFFFFF" />
    <rect x="2" y="2" width="2" height="2" fill="#22D3EE" />
    <rect x="12" y="2" width="2" height="2" fill="#22D3EE" />
    <rect x="2" y="12" width="2" height="2" fill="#22D3EE" />
    <rect x="12" y="12" width="2" height="2" fill="#22D3EE" />
  </svg>
);

export const PixelCoralReef: React.FC<{ size?: number; className?: string }> = ({
  size = 44,
  className = '',
}) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    className={className}
    style={{ imageRendering: 'pixelated', shapeRendering: 'crispEdges' }}
  >
    {/* Pink tube coral */}
    <rect x="4" y="6" width="4" height="18" fill="#F43F5E" />
    <rect x="5" y="4" width="3" height="4" fill="#FDA4AF" />
    <rect x="5" y="4" width="2" height="2" fill="#FFFFFF" />

    {/* Yellow fire coral */}
    <rect x="10" y="10" width="4" height="14" fill="#F59E0B" />
    <rect x="11" y="8" width="3" height="4" fill="#FCD34D" />

    {/* Purple bubble coral */}
    <rect x="16" y="12" width="5" height="12" fill="#8B5CF6" />
    <rect x="17" y="10" width="4" height="4" fill="#C4B5FD" />
  </svg>
);

export const PixelAirBubbles: React.FC<{ size?: number; className?: string }> = ({
  size = 28,
  className = '',
}) => (
  <svg
    viewBox="0 0 16 28"
    width={size}
    height={(size * 28) / 16}
    className={`${className} animate-pulse`}
    style={{ imageRendering: 'pixelated', shapeRendering: 'crispEdges' }}
  >
    <rect x="4" y="2" width="4" height="4" fill="#E0F2FE" />
    <rect x="5" y="3" width="2" height="2" fill="#FFFFFF" />

    <rect x="9" y="11" width="3" height="3" fill="#BAE6FD" />
    <rect x="10" y="12" width="1" height="1" fill="#FFFFFF" />

    <rect x="3" y="20" width="5" height="5" fill="#7DD3FC" />
    <rect x="4" y="21" width="2" height="2" fill="#FFFFFF" />
  </svg>
);

// ==========================================
// 5. BIOME 3: NETHER DECORATIONS
// ==========================================
export const PixelNetherPortal: React.FC<{ size?: number; className?: string }> = ({
  size = 64,
  className = '',
}) => (
  <svg
    viewBox="0 0 28 36"
    width={size}
    height={(size * 36) / 28}
    className={className}
    style={{ imageRendering: 'pixelated', shapeRendering: 'crispEdges' }}
  >
    {/* Obsidian Frame (Dark purple black) */}
    <rect x="0" y="0" width="28" height="36" fill="#180B22" />
    <rect x="4" y="4" width="20" height="28" fill="#180B22" />

    {/* Obsidian texture highlights */}
    <rect x="1" y="1" width="3" height="3" fill="#3B1854" />
    <rect x="24" y="1" width="3" height="3" fill="#3B1854" />
    <rect x="1" y="32" width="3" height="3" fill="#3B1854" />
    <rect x="24" y="32" width="3" height="3" fill="#3B1854" />
    <rect x="8" y="1" width="2" height="2" fill="#58287F" />
    <rect x="1" y="16" width="2" height="3" fill="#58287F" />

    {/* Swirling Purple Portal Energy */}
    <rect x="4" y="4" width="20" height="28" fill="#7E22CE" />
    <rect x="6" y="6" width="6" height="12" fill="#A855F7" />
    <rect x="14" y="14" width="8" height="14" fill="#C084FC" />
    <rect x="8" y="22" width="8" height="8" fill="#9333EA" />
    <rect x="10" y="8" width="4" height="4" fill="#E9D5FF" />
    <rect x="16" y="20" width="3" height="4" fill="#F3E8FF" />
  </svg>
);

export const PixelLavaFall: React.FC<{ size?: number; className?: string }> = ({
  size = 40,
  className = '',
}) => (
  <svg
    viewBox="0 0 16 32"
    width={size}
    height={(size * 32) / 16}
    className={className}
    style={{ imageRendering: 'pixelated', shapeRendering: 'crispEdges' }}
  >
    {/* Lava Column */}
    <rect x="2" y="0" width="12" height="32" fill="#EA580C" />
    <rect x="4" y="0" width="8" height="32" fill="#F97316" />
    <rect x="6" y="2" width="4" height="28" fill="#FBBF24" />
    {/* Yellow fire sparks */}
    <rect x="7" y="6" width="2" height="4" fill="#FEF08A" />
    <rect x="7" y="18" width="2" height="4" fill="#FEF08A" />
    <rect x="3" y="12" width="2" height="3" fill="#DC2626" />
    <rect x="11" y="24" width="2" height="3" fill="#DC2626" />
  </svg>
);

export const PixelGlowstone: React.FC<{ size?: number; className?: string }> = ({
  size = 36,
  className = '',
}) => (
  <svg
    viewBox="0 0 16 16"
    width={size}
    height={size}
    className={className}
    style={{ imageRendering: 'pixelated', shapeRendering: 'crispEdges' }}
  >
    <rect x="0" y="0" width="16" height="16" fill="#B45309" />
    <rect x="2" y="2" width="12" height="12" fill="#F59E0B" />
    <rect x="3" y="3" width="4" height="4" fill="#FDE047" />
    <rect x="9" y="8" width="4" height="4" fill="#FDE047" />
    <rect x="4" y="4" width="2" height="2" fill="#FEF9C3" />
    <rect x="10" y="9" width="2" height="2" fill="#FEF9C3" />
    <rect x="1" y="9" width="2" height="2" fill="#78350F" />
    <rect x="8" y="1" width="2" height="2" fill="#78350F" />
  </svg>
);

// ==========================================
// 6. BIOME 4: THE END DECORATIONS
// ==========================================
export const PixelEndCrystalSpire: React.FC<{ size?: number; className?: string }> = ({
  size = 72,
  className = '',
}) => (
  <svg
    viewBox="0 0 28 48"
    width={size}
    height={(size * 48) / 28}
    className={className}
    style={{ imageRendering: 'pixelated', shapeRendering: 'crispEdges' }}
  >
    {/* Obsidian Spire Column */}
    <rect x="6" y="16" width="16" height="32" fill="#0F0B1A" />
    <rect x="8" y="16" width="12" height="32" fill="#1C142B" />
    <rect x="10" y="18" width="4" height="28" fill="#2E2048" />

    {/* End Crystal (Floating Octahedron with magenta glow) */}
    {/* Glow background */}
    <circle cx="14" cy="9" r="7" fill="#E879F9" opacity="0.3" />
    {/* Glass Cube boundary */}
    <rect x="8" y="3" width="12" height="12" fill="none" stroke="#F0ABFC" strokeWidth="1" />
    {/* Inner crystal core */}
    <rect x="11" y="6" width="6" height="6" fill="#C026D3" />
    <rect x="12" y="7" width="4" height="4" fill="#F472B6" />
    <rect x="13" y="8" width="2" height="2" fill="#FFFFFF" />

    {/* Laser Beacon Beam pointing upward */}
    <line x1="14" y1="3" x2="14" y2="0" stroke="#F472B6" strokeWidth="2" />
  </svg>
);

export const PixelEnderDragon: React.FC<{ size?: number; className?: string }> = ({
  size = 80,
  className = '',
}) => (
  <svg
    viewBox="0 0 48 32"
    width={size}
    height={(size * 32) / 48}
    className={`${className} filter drop-shadow-md`}
    style={{ imageRendering: 'pixelated', shapeRendering: 'crispEdges' }}
  >
    {/* Dragon Wings */}
    {/* Left Wing */}
    <polygon points="20,14 4,6 8,22 18,18" fill="#171717" />
    <polygon points="18,14 6,8 9,18 16,16" fill="#3B0764" />

    {/* Right Wing */}
    <polygon points="28,14 44,6 40,22 30,18" fill="#171717" />
    <polygon points="30,14 42,8 39,18 32,16" fill="#3B0764" />

    {/* Dragon Body */}
    <rect x="20" y="10" width="8" height="14" fill="#0A0A0A" />
    <rect x="22" y="12" width="4" height="10" fill="#262626" />

    {/* Dragon Neck & Head */}
    <rect x="21" y="4" width="6" height="7" fill="#171717" />
    {/* Snout */}
    <rect x="22" y="1" width="4" height="4" fill="#0A0A0A" />

    {/* Glowing Magenta Dragon Eyes */}
    <rect x="21" y="5" width="2" height="1" fill="#E879F9" />
    <rect x="25" y="5" width="2" height="1" fill="#E879F9" />

    {/* Horns */}
    <rect x="20" y="2" width="1" height="3" fill="#404040" />
    <rect x="27" y="2" width="1" height="3" fill="#404040" />

    {/* Tail */}
    <rect x="22" y="24" width="4" height="6" fill="#171717" />
    <rect x="23" y="30" width="2" height="2" fill="#3B0764" />
  </svg>
);

export const PixelChorusPlant: React.FC<{ size?: number; className?: string }> = ({
  size = 36,
  className = '',
}) => (
  <svg
    viewBox="0 0 20 32"
    width={size}
    height={(size * 32) / 20}
    className={className}
    style={{ imageRendering: 'pixelated', shapeRendering: 'crispEdges' }}
  >
    {/* Purple stem blocks */}
    <rect x="8" y="16" width="4" height="16" fill="#581C87" />
    <rect x="9" y="16" width="2" height="16" fill="#7E22CE" />

    <rect x="4" y="10" width="4" height="6" fill="#581C87" />
    <rect x="12" y="6" width="4" height="10" fill="#581C87" />

    {/* Chorus fruit flowers */}
    <rect x="3" y="6" width="6" height="4" fill="#C084FC" />
    <rect x="4" y="7" width="4" height="2" fill="#F3E8FF" />

    <rect x="11" y="2" width="6" height="4" fill="#C084FC" />
    <rect x="12" y="3" width="4" height="2" fill="#F3E8FF" />
  </svg>
);
