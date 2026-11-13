import React from 'react';

// 1. Cloud Sprite matching cloud.png
export const CloudSprite: React.FC<{ className?: string; style?: React.CSSProperties }> = ({
  className = '',
  style = {},
}) => (
  <svg
    viewBox="0 0 160 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={style}
  >
    {/* Soft subtle drop shadow / cyan base */}
    <path
      d="M20 58 C15 58 8 52 10 44 C12 36 22 35 26 35 C28 25 38 18 50 20 C56 12 70 8 86 12 C104 6 126 15 132 30 C144 32 152 42 148 52 C145 58 138 60 130 60 L20 60 Z"
      fill="#CBE4F9"
      opacity="0.7"
    />
    {/* Main Cloud Body */}
    <path
      d="M22 55 C16 55 10 50 12 42 C14 34 23 33 28 33 C30 23 40 16 52 18 C58 10 72 6 88 10 C106 4 127 13 133 27 C144 29 150 38 147 48 C144 54 136 56 128 56 L22 56 Z"
      fill="#FFFFFF"
    />
    {/* Soft puff highlights */}
    <ellipse cx="68" cy="24" rx="22" ry="12" fill="#FFFFFF" />
    <ellipse cx="106" cy="22" rx="24" ry="14" fill="#FFFFFF" />
    <ellipse cx="40" cy="38" rx="18" ry="10" fill="#FFFFFF" />
    <ellipse cx="128" cy="42" rx="16" ry="9" fill="#FFFFFF" />
  </svg>
);

// 2. Windmill Tower Base matching tower.png
export const WindmillTowerSprite: React.FC<{ className?: string; style?: React.CSSProperties }> = ({
  className = '',
  style = {},
}) => (
  <svg
    viewBox="0 0 100 130"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={style}
  >
    {/* Red Tapered Windmill Tower */}
    <path
      d="M30 45 L70 45 L85 125 L15 125 Z"
      fill="#D32F2F"
      stroke="#991B1B"
      strokeWidth="1.5"
    />
    {/* Facet shading for 3D octagon look */}
    <path d="M30 45 L46 45 L40 125 L15 125 Z" fill="#B91C1C" opacity="0.6" />
    <path d="M46 45 L54 45 L58 125 L40 125 Z" fill="#EF4444" opacity="0.4" />
    <path d="M54 45 L70 45 L85 125 L58 125 Z" fill="#991B1B" opacity="0.4" />

    {/* White Conical Roof Cap */}
    <path
      d="M50 8 L74 45 L26 45 Z"
      fill="#F8FAFC"
      stroke="#E2E8F0"
      strokeWidth="1.5"
    />
    <path d="M50 8 L26 45 L50 45 Z" fill="#E2E8F0" opacity="0.5" />
    <line x1="26" y1="45" x2="74" y2="45" stroke="#DC2626" strokeWidth="2.5" />
  </svg>
);

// 3. Windmill Fan / Blades matching fan.png (rotates with spin animation)
export const WindmillFanSprite: React.FC<{ className?: string; style?: React.CSSProperties }> = ({
  className = '',
  style = {},
}) => (
  <svg
    viewBox="0 0 120 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={style}
  >
    {/* 4 Blades */}
    <g transform="translate(60,60)">
      {/* Blade 1 (Top-Left) */}
      <g transform="rotate(-45)">
        <rect x="-5" y="-48" width="10" height="42" rx="4" fill="#FFFBEB" stroke="#B45309" strokeWidth="1" />
        <line x1="0" y1="-44" x2="0" y2="-10" stroke="#991B1B" strokeWidth="2.5" strokeLinecap="round" />
      </g>
      {/* Blade 2 (Top-Right) */}
      <g transform="rotate(45)">
        <rect x="-5" y="-48" width="10" height="42" rx="4" fill="#FFFBEB" stroke="#B45309" strokeWidth="1" />
        <line x1="0" y1="-44" x2="0" y2="-10" stroke="#991B1B" strokeWidth="2.5" strokeLinecap="round" />
      </g>
      {/* Blade 3 (Bottom-Right) */}
      <g transform="rotate(135)">
        <rect x="-5" y="-48" width="10" height="42" rx="4" fill="#FFFBEB" stroke="#B45309" strokeWidth="1" />
        <line x1="0" y1="-44" x2="0" y2="-10" stroke="#991B1B" strokeWidth="2.5" strokeLinecap="round" />
      </g>
      {/* Blade 4 (Bottom-Left) */}
      <g transform="rotate(-135)">
        <rect x="-5" y="-48" width="10" height="42" rx="4" fill="#FFFBEB" stroke="#B45309" strokeWidth="1" />
        <line x1="0" y1="-44" x2="0" y2="-10" stroke="#991B1B" strokeWidth="2.5" strokeLinecap="round" />
      </g>
      {/* Central Red Rotor Hub */}
      <circle cx="0" cy="0" r="7" fill="#DC2626" stroke="#991B1B" strokeWidth="1.5" />
      <circle cx="0" cy="0" r="2.5" fill="#FEF2F2" />
    </g>
  </svg>
);

// 4. Mountain Peaks Sprite matching mountain.png
export const MountainSprite: React.FC<{ className?: string; style?: React.CSSProperties }> = ({
  className = '',
  style = {},
}) => (
  <svg
    viewBox="0 0 160 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={style}
  >
    {/* Large Left Mountain Peak */}
    <path d="M10 110 L70 12 L130 110 Z" fill="#94A3B8" />
    {/* Large Snowcap */}
    <path d="M70 12 L88 45 L78 40 L70 48 L62 40 L52 45 Z" fill="#FFFFFF" />

    {/* Small Right Mountain Peak */}
    <path d="M75 110 L115 50 L155 110 Z" fill="#64748B" />
    {/* Small Snowcap */}
    <path d="M115 50 L126 68 L120 65 L115 70 L110 65 L104 68 Z" fill="#FFFFFF" />

    {/* Sparkle Star on Small Mountain (from mountain.png) */}
    <path
      d="M125 90 C125 86 128 84 130 84 C132 84 135 86 135 90 C135 94 132 96 130 96 C128 96 125 94 125 90 Z"
      fill="#CBD5E1"
      opacity="0.8"
    />
    <path
      d="M130 80 L132 87 L139 90 L132 93 L130 100 L128 93 L121 90 L128 87 Z"
      fill="#E2E8F0"
      opacity="0.9"
    />
  </svg>
);

// 5. Pine Tree Row matching tree.png
export const TreeRowSprite: React.FC<{ className?: string; style?: React.CSSProperties }> = ({
  className = '',
  style = {},
}) => (
  <svg
    viewBox="0 0 180 180"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={style}
  >
    {/* 6 Layered Pine Trees along a diagonal */}
    {[
      { x: 30, y: 120, scale: 0.65 },
      { x: 55, y: 100, scale: 0.75 },
      { x: 80, y: 80, scale: 0.85 },
      { x: 105, y: 60, scale: 0.92 },
      { x: 130, y: 40, scale: 0.98 },
      { x: 150, y: 20, scale: 1.05 },
    ].map((tree, idx) => (
      <g key={idx} transform={`translate(${tree.x - 30}, ${tree.y - 20}) scale(${tree.scale})`}>
        {/* Trunk */}
        <rect x="25" y="60" width="8" height="18" fill="#854D0E" rx="1" />
        {/* Tier 3 (Bottom) */}
        <path d="M5 60 L53 60 L29 38 Z" fill="#16A34A" />
        {/* Tier 2 (Middle) */}
        <path d="M10 46 L48 46 L29 26 Z" fill="#22C55E" />
        {/* Tier 1 (Top) */}
        <path d="M16 32 L42 32 L29 12 Z" fill="#4ADE80" />
      </g>
    ))}
  </svg>
);

// 6. Pond Sprite matching pond.png
export const PondSprite: React.FC<{ className?: string; style?: React.CSSProperties }> = ({
  className = '',
  style = {},
}) => (
  <svg
    viewBox="0 0 160 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={style}
  >
    {/* Organic Flat Sky-Blue Water Pond */}
    <path
      d="M15 30 C30 20 130 15 148 30 C160 40 155 65 142 80 C125 95 35 98 18 80 C5 65 5 40 15 30 Z"
      fill="#38BDF8"
    />
    {/* Horizontal Ripple Highlights */}
    <line x1="50" y1="36" x2="105" y2="36" stroke="#BAE6FD" strokeWidth="4" strokeLinecap="round" />
    <line x1="30" y1="52" x2="72" y2="52" stroke="#BAE6FD" strokeWidth="4" strokeLinecap="round" />
    <line x1="70" y1="68" x2="130" y2="68" stroke="#BAE6FD" strokeWidth="4" strokeLinecap="round" />
  </svg>
);

// 7. Pip The Pixel Adventurer Companion matching pip.png
export const PipCharacterSprite: React.FC<{ className?: string; style?: React.CSSProperties }> = ({
  className = '',
  style = {},
}) => (
  <svg
    viewBox="0 0 80 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={style}
  >
    {/* Yellow Backpack behind shoulders */}
    <rect x="42" y="32" width="22" height="34" rx="5" fill="#EAB308" stroke="#854D0E" strokeWidth="2" />
    <circle cx="53" cy="42" r="3" fill="#FEF08A" />

    {/* Legs & Boots */}
    {/* Left Leg */}
    <rect x="23" y="76" width="13" height="24" fill="#1E3A8A" stroke="#0F172A" strokeWidth="2" />
    <rect x="21" y="98" width="17" height="6" fill="#FFFFFF" rx="2" />
    <path d="M19 104 L37 104 L37 114 L15 114 Z" fill="#92400E" stroke="#451A03" strokeWidth="2" />

    {/* Right Leg */}
    <rect x="42" y="76" width="13" height="24" fill="#1E3A8A" stroke="#0F172A" strokeWidth="2" />
    <rect x="40" y="98" width="17" height="6" fill="#FFFFFF" rx="2" />
    <path d="M38 104 L56 104 L56 114 L34 114 Z" fill="#92400E" stroke="#451A03" strokeWidth="2" />

    {/* Orange Adventurer Tunic / Apron */}
    <path d="M23 60 L55 60 L58 78 L47 78 L45 70 L35 70 L33 78 L20 78 Z" fill="#EA580C" stroke="#7C2D12" strokeWidth="2" />

    {/* Brown Leather Belt & Silver Buckle */}
    <rect x="23" y="55" width="32" height="6" fill="#78350F" />
    <rect x="34" y="53" width="10" height="10" fill="#E2E8F0" stroke="#475569" strokeWidth="2" rx="1" />

    {/* Blue Vest & Shirt */}
    <rect x="24" y="34" width="30" height="22" fill="#2563EB" stroke="#1E3A8A" strokeWidth="2" />
    <path d="M28 34 L39 52 L50 34" stroke="#78350F" strokeWidth="3" />

    {/* Arms with Red Fingerless Gloves */}
    <path d="M18 36 L12 60 L18 64 L24 40" fill="#D97706" stroke="#78350F" strokeWidth="2" />
    <rect x="10" y="58" width="8" height="10" rx="2" fill="#DC2626" stroke="#7F1D1D" strokeWidth="1.5" />

    <path d="M58 36 L66 60 L60 64 L54 40" fill="#D97706" stroke="#78350F" strokeWidth="2" />
    <rect x="60" y="58" width="8" height="10" rx="2" fill="#DC2626" stroke="#7F1D1D" strokeWidth="1.5" />

    {/* Red Bandana / Scarf */}
    <path d="M22 28 C22 28 39 42 56 28 C54 38 24 38 22 28 Z" fill="#DC2626" stroke="#991B1B" strokeWidth="2" />

    {/* Head & Face */}
    <rect x="27" y="14" width="24" height="20" rx="6" fill="#FED7AA" stroke="#9A3412" strokeWidth="1.5" />

    {/* Big Bright Blue Eyes */}
    <ellipse cx="34" cy="22" rx="3" ry="4" fill="#0284C7" />
    <circle cx="35" cy="21" r="1" fill="#FFFFFF" />
    <ellipse cx="44" cy="22" rx="3" ry="4" fill="#0284C7" />
    <circle cx="45" cy="21" r="1" fill="#FFFFFF" />

    {/* Cute smile */}
    <path d="M37 28 Q39 31 42 28" stroke="#7C2D12" strokeWidth="1.5" strokeLinecap="round" />

    {/* Spiky Anime Blonde Hair */}
    <path
      d="M23 18 C20 10 28 3 40 3 C50 3 58 10 56 18 C52 16 48 18 45 16 C40 12 36 17 32 15 C28 17 25 15 23 18 Z"
      fill="#FACC15"
      stroke="#854D0E"
      strokeWidth="2"
    />
    <path d="M32 10 L30 3 L38 8 M44 8 L49 2 L48 9" stroke="#854D0E" strokeWidth="1.5" />
  </svg>
);
