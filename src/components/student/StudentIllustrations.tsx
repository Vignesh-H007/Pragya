import React from 'react';

export const PrimaryBoyHero: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => {
  return (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Sun glow in background */}
      <circle cx="160" cy="40" r="28" fill="#FDE047" fillOpacity="0.4" />
      <circle cx="160" cy="40" r="18" fill="#FBBF24" />
      <path d="M160 14 L160 8 M160 72 L160 66 M134 40 L128 40 M192 40 L186 40" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" />

      {/* Cheering Kid in Orange T-Shirt */}
      {/* Arms raised up in excitement */}
      <path d="M60 120 C45 95 40 70 52 55 C58 48 68 55 64 75 L75 110" fill="#FF8A65" stroke="#7C2D12" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M130 110 L142 75 C140 55 150 48 156 55 C168 70 162 95 148 120" fill="#FF8A65" stroke="#7C2D12" strokeWidth="2.5" strokeLinejoin="round" />

      {/* Body / Orange T-Shirt */}
      <path d="M68 110 C75 105 135 105 142 110 L146 175 C120 180 88 180 64 175 Z" fill="#F97316" stroke="#7C2D12" strokeWidth="3" strokeLinejoin="round" />
      {/* Blue Dungarees / Shorts straps */}
      <path d="M78 120 L78 175 M130 120 L130 175" stroke="#3B82F6" strokeWidth="5" strokeLinecap="round" />
      <rect x="70" y="160" width="68" height="30" rx="6" fill="#3B82F6" stroke="#1E3A8A" strokeWidth="2.5" />

      {/* Neck */}
      <rect x="96" y="90" width="16" height="18" fill="#FFCCBC" />

      {/* Head */}
      <circle cx="104" cy="72" r="28" fill="#FFCCBC" stroke="#7C2D12" strokeWidth="2.5" />

      {/* Cute ears */}
      <circle cx="76" cy="74" r="6" fill="#FFCCBC" stroke="#7C2D12" strokeWidth="2" />
      <circle cx="132" cy="74" r="6" fill="#FFCCBC" stroke="#7C2D12" strokeWidth="2" />

      {/* Brown Messy Boy Hair */}
      <path d="M76 68 C74 38 90 32 106 32 C124 32 136 40 134 68 C126 56 116 52 104 54 C92 56 84 62 76 68 Z" fill="#6D4C41" stroke="#3E2723" strokeWidth="2.5" />
      <path d="M88 48 C94 40 102 38 114 42" stroke="#4E342E" strokeWidth="2.5" strokeLinecap="round" />

      {/* Big Cheerful Eyes */}
      <ellipse cx="94" cy="68" rx="4" ry="5" fill="#292524" />
      <ellipse cx="114" cy="68" rx="4" ry="5" fill="#292524" />
      <circle cx="95.5" cy="66" r="1.5" fill="#FFFFFF" />
      <circle cx="115.5" cy="66" r="1.5" fill="#FFFFFF" />

      {/* Blushing cheeks */}
      <ellipse cx="86" cy="76" rx="5" ry="3" fill="#FDA4AF" />
      <ellipse cx="122" cy="76" rx="5" ry="3" fill="#FDA4AF" />

      {/* Big Open Laugh / Smile with tongue */}
      <path d="M96 78 Q104 90 112 78 Z" fill="#DC2626" stroke="#7C2D12" strokeWidth="2" />
      <path d="M98 83 Q104 88 110 83" fill="#F87171" />
    </svg>
  );
};

export const MiddleStudentHero: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => {
  return (
    <svg viewBox="0 0 220 180" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Ambient background shape */}
      <circle cx="140" cy="90" r="70" fill="#ECFDF5" />
      <path d="M120 40 Q160 20 180 60 Q200 100 170 140 Q140 160 110 140 Z" fill="#D1FAE5" fillOpacity="0.6" />

      {/* Teen student studying with modern laptop */}
      {/* Upper Torso in Green Hoodie */}
      <path d="M90 95 C100 90 145 90 155 95 L165 170 L80 170 Z" fill="#10B981" stroke="#065F46" strokeWidth="3" strokeLinejoin="round" />
      {/* Hoodie Collar */}
      <path d="M110 92 Q122 108 135 92" stroke="#047857" strokeWidth="3" fill="#059669" />

      {/* Head & Face */}
      <circle cx="122" cy="58" r="22" fill="#FDE047" fillOpacity="0.3" />
      <circle cx="122" cy="58" r="20" fill="#FED7AA" stroke="#7C2D12" strokeWidth="2.5" />
      <circle cx="102" cy="58" r="4.5" fill="#FED7AA" stroke="#7C2D12" strokeWidth="2" />
      <circle cx="142" cy="58" r="4.5" fill="#FED7AA" stroke="#7C2D12" strokeWidth="2" />

      {/* Modern Hair */}
      <path d="M102 54 C100 32 115 26 128 26 C140 26 145 34 142 54 C136 46 126 44 116 46 Z" fill="#1F2937" stroke="#111827" strokeWidth="2" />

      {/* Glasses & Friendly smile */}
      <rect x="110" y="52" width="10" height="8" rx="2" stroke="#1F2937" strokeWidth="2" fill="none" />
      <rect x="124" y="52" width="10" height="8" rx="2" stroke="#1F2937" strokeWidth="2" fill="none" />
      <line x1="120" y1="56" x2="124" y2="56" stroke="#1F2937" strokeWidth="2" />
      <path d="M116 68 Q122 73 128 68" stroke="#7C2D12" strokeWidth="2" strokeLinecap="round" />

      {/* Arms resting on desk / typing */}
      <path d="M85 105 L65 140 L105 148" stroke="#10B981" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M160 105 L175 140 L140 148" stroke="#10B981" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />

      {/* Laptop */}
      <path d="M80 135 L125 105 L130 140 L85 145 Z" fill="#334155" stroke="#1E293B" strokeWidth="2" />
      {/* Screen glow */}
      <path d="M84 133 L123 108 L126 137 L87 141 Z" fill="#38BDF8" fillOpacity="0.8" />
      {/* Keyboard Base */}
      <path d="M75 144 L145 144 L152 154 L68 154 Z" fill="#64748B" stroke="#1E293B" strokeWidth="2" />
    </svg>
  );
};

export const HighSchoolHero: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => {
  return (
    <svg viewBox="0 0 240 180" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Window looking out at illuminated twilight city skyline */}
      <rect x="40" y="20" width="160" height="130" rx="8" fill="#0B132B" stroke="#1E293B" strokeWidth="2" />
      {/* City buildings silhouette */}
      <rect x="50" y="95" width="18" height="50" fill="#1C2541" />
      <rect x="75" y="70" width="25" height="75" fill="#1C2541" />
      <rect x="105" y="85" width="20" height="60" fill="#1C2541" />
      <rect x="130" y="60" width="22" height="85" fill="#1C2541" />
      <rect x="160" y="80" width="26" height="65" fill="#1C2541" />
      {/* City window lights */}
      <circle cx="82" cy="85" r="1.5" fill="#FDE047" fillOpacity="0.8" />
      <circle cx="82" cy="100" r="1.5" fill="#FDE047" fillOpacity="0.8" />
      <circle cx="138" cy="75" r="1.5" fill="#60A5FA" fillOpacity="0.8" />
      <circle cx="138" cy="90" r="1.5" fill="#FDE047" fillOpacity="0.8" />
      <circle cx="168" cy="95" r="1.5" fill="#FDE047" fillOpacity="0.8" />

      {/* Focused student with headphones studying on laptop */}
      {/* Silhouette & Indigo Lighting */}
      <path d="M120 120 C130 110 180 110 195 120 L210 180 L110 180 Z" fill="#1E293B" stroke="#334155" strokeWidth="2" />
      {/* Head */}
      <circle cx="158" cy="85" r="18" fill="#334155" />
      {/* Hair */}
      <path d="M142 82 C142 65 152 60 168 60 C178 60 182 66 180 82 Z" fill="#0F172A" />
      {/* Modern Over-ear Studio Headphones with cyan glow */}
      <path d="M144 80 C144 65 154 55 168 55 C176 55 182 65 182 80" stroke="#38BDF8" strokeWidth="3" strokeLinecap="round" />
      <rect x="141" y="78" width="6" height="14" rx="3" fill="#38BDF8" />
      <rect x="175" y="78" width="6" height="14" rx="3" fill="#38BDF8" />

      {/* Modern Slim Laptop with glowing screen & Apple/LearnBuddy emblem */}
      <path d="M90 125 L145 105 L150 145 L95 150 Z" fill="#0F172A" stroke="#475569" strokeWidth="1.5" />
      <path d="M93 124 L143 107 L147 142 L97 146 Z" fill="#6366F1" fillOpacity="0.9" />
      {/* Glowing keyboard */}
      <path d="M85 148 L160 148 L170 162 L75 162 Z" fill="#1E293B" stroke="#334155" strokeWidth="1.5" />
      <line x1="95" y1="154" x2="150" y2="154" stroke="#818CF8" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
};

export const GiraffeMascot: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => {
  return (
    <svg viewBox="0 0 100 140" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Yellow Giraffe Body & Long Neck */}
      <path d="M35 140 L35 70 C35 55 42 45 46 30 L54 30 C58 45 65 55 65 70 L65 140 Z" fill="#FBBF24" stroke="#B45309" strokeWidth="2" />
      {/* Spots */}
      <circle cx="48" cy="85" r="4.5" fill="#D97706" />
      <circle cx="56" cy="105" r="5" fill="#D97706" />
      <circle cx="44" cy="120" r="4" fill="#D97706" />
      <circle cx="50" cy="55" r="3.5" fill="#D97706" />

      {/* Head */}
      <ellipse cx="50" cy="22" rx="14" ry="12" fill="#FBBF24" stroke="#B45309" strokeWidth="2" />
      {/* Horns */}
      <path d="M44 14 L42 8 M56 14 L58 8" stroke="#B45309" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="42" cy="7" r="2.5" fill="#92400E" />
      <circle cx="58" cy="7" r="2.5" fill="#92400E" />

      {/* Ears */}
      <ellipse cx="36" cy="18" rx="4" ry="2.5" transform="rotate(-30 36 18)" fill="#FBBF24" stroke="#B45309" strokeWidth="1.5" />
      <ellipse cx="64" cy="18" rx="4" ry="2.5" transform="rotate(30 64 18)" fill="#FBBF24" stroke="#B45309" strokeWidth="1.5" />

      {/* Face & Smile */}
      <circle cx="45" cy="20" r="2" fill="#1F2937" />
      <circle cx="55" cy="20" r="2" fill="#1F2937" />
      <ellipse cx="50" cy="28" rx="8" ry="5" fill="#FDE68A" />
      <circle cx="48" cy="27" r="1" fill="#78350F" />
      <circle cx="52" cy="27" r="1" fill="#78350F" />
      <path d="M47 30 Q50 33 53 30" stroke="#78350F" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
};

export const RocketIllustration: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Smoke cloud */}
      <circle cx="40" cy="95" r="12" fill="#E2E8F0" />
      <circle cx="55" cy="100" r="10" fill="#CBD5E1" />
      <circle cx="30" cy="85" r="8" fill="#F1F5F9" />

      {/* Fire thrust */}
      <path d="M46 76 L32 94 L50 86 L62 96 L54 78 Z" fill="#EF4444" />
      <path d="M47 77 L38 88 L50 83 L58 89 L53 79 Z" fill="#FBBF24" />

      {/* Rocket fuselage (pointed top right) */}
      <g transform="rotate(45 60 55)">
        {/* Fins */}
        <path d="M45 65 L35 80 L48 78 Z" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="2" />
        <path d="M75 65 L85 80 L72 78 Z" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="2" />
        {/* Main Body */}
        <path d="M60 20 C50 35 48 65 48 75 L72 75 C72 65 70 35 60 20 Z" fill="#FFFFFF" stroke="#1E293B" strokeWidth="2.5" />
        {/* Nose cone */}
        <path d="M60 20 C56 28 53 35 50 40 L70 40 C67 35 64 28 60 20 Z" fill="#EF4444" />
        {/* Window */}
        <circle cx="60" cy="50" r="7" fill="#38BDF8" stroke="#1E293B" strokeWidth="2" />
        <circle cx="62" cy="48" r="2" fill="#FFFFFF" />
        {/* Body stripe */}
        <line x1="50" y1="62" x2="70" y2="62" stroke="#EF4444" strokeWidth="3" />
      </g>
    </svg>
  );
};
