import React from 'react';

interface IllustrationProps {
  className?: string;
}

export const ParentIllustration: React.FC<IllustrationProps> = ({ className = 'w-full h-full' }) => {
  return (
    <svg
      viewBox="0 0 360 360"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      preserveAspectRatio="xMidYMid meet"
    >
      {/* Background Soft Glow */}
      <circle cx="180" cy="180" r="150" fill="white" fillOpacity="0.12" />

      {/* ========================================================= */}
      {/* 1. FATHER (LEFT) */}
      {/* ========================================================= */}
      <g id="father">
        {/* Father - Blue Trousers */}
        <path d="M42 225 L114 225 L110 330 L84 330 L80 270 L76 330 L48 330 Z" fill="#3B82F6" />

        {/* Father - Red/Coral T-shirt */}
        <path
          d="M44 105 L112 105 L126 148 L104 156 L98 126 L98 226 L58 226 L58 126 L52 156 L30 148 Z"
          fill="#EF4444"
        />

        {/* Father - Left Arm reaching down to hold child's hand */}
        <path
          d="M104 156 L136 215 C139 220, 145 220, 148 215 L154 205 L116 146 Z"
          fill="#FBD5B5"
        />

        {/* Father - Right Arm on left side */}
        <path
          d="M30 148 L22 205 C20 215, 30 220, 35 212 L48 152 Z"
          fill="#FBD5B5"
        />

        {/* Father - Neck */}
        <rect x="70" y="88" width="16" height="20" rx="3" fill="#FBD5B5" />

        {/* Father - Head */}
        <ellipse cx="78" cy="70" rx="25" ry="26" fill="#FBD5B5" />

        {/* Father - Ears */}
        <circle cx="53" cy="70" r="6" fill="#FBD5B5" />
        <circle cx="103" cy="70" r="6" fill="#FBD5B5" />

        {/* Father - Black Hair */}
        <path
          d="M52 64 C50 35, 62 25, 84 25 C104 25, 108 38, 106 58 C98 48, 88 44, 76 45 C64 46, 56 54, 52 64 Z"
          fill="#1E293B"
        />
        {/* Father Hair side-burns */}
        <rect x="52" y="55" width="6" height="15" rx="3" fill="#1E293B" />
        <rect x="100" y="55" width="5" height="15" rx="2.5" fill="#1E293B" />

        {/* Father - Eyes */}
        <circle cx="70" cy="68" r="2.5" fill="#1E293B" />
        <circle cx="86" cy="68" r="2.5" fill="#1E293B" />

        {/* Father - Smile with white teeth */}
        <path
          d="M72 79 C72 79, 78 88, 84 79 Z"
          fill="#FFFFFF"
          stroke="#1E293B"
          strokeWidth="1.5"
        />
      </g>

      {/* ========================================================= */}
      {/* 2. MOTHER (RIGHT) */}
      {/* ========================================================= */}
      <g id="mother">
        {/* Mother - Indigo/Navy Pencil Skirt */}
        <path d="M246 215 L314 215 L310 305 L250 305 Z" fill="#312E81" />
        {/* Mother - Legs */}
        <rect x="258" y="305" width="14" height="25" fill="#FBD5B5" />
        <rect x="288" y="305" width="14" height="25" fill="#FBD5B5" />

        {/* Mother - Vibrant Green Blouse */}
        <path
          d="M246 102 L314 102 L320 215 L240 215 Z"
          fill="#10B981"
        />
        {/* Mother - Left Sleeve & Arm */}
        <path
          d="M312 102 L324 165 C326 172, 336 172, 338 165 L334 102 Z"
          fill="#10B981"
        />
        <path
          d="M322 165 L324 205 C325 212, 335 212, 336 205 L336 165 Z"
          fill="#FBD5B5"
        />

        {/* Mother - Right Arm reaching down to child */}
        <path
          d="M248 105 L228 175 C226 182, 218 184, 215 178 L238 105 Z"
          fill="#10B981"
        />
        <path
          d="M226 172 L208 215 C205 220, 198 220, 196 215 L216 168 Z"
          fill="#FBD5B5"
        />

        {/* Mother - Neck */}
        <rect x="272" y="86" width="16" height="20" rx="3" fill="#FBD5B5" />

        {/* Mother - Head */}
        <ellipse cx="280" cy="68" rx="24" ry="25" fill="#FBD5B5" />

        {/* Mother - Hair (Dark stylish bob) */}
        <path
          d="M256 65 C254 36, 266 26, 286 26 C306 26, 312 40, 310 65 L314 98 C310 102, 298 98, 296 90 C294 65, 294 48, 276 46 C262 48, 258 65, 256 90 C254 98, 244 102, 242 98 Z"
          fill="#1E293B"
        />

        {/* Mother - Eyes */}
        <circle cx="272" cy="66" r="2.5" fill="#1E293B" />
        <circle cx="288" cy="66" r="2.5" fill="#1E293B" />

        {/* Mother - Smile */}
        <path
          d="M274 77 C274 77, 280 86, 286 77 Z"
          fill="#FFFFFF"
          stroke="#1E293B"
          strokeWidth="1.5"
        />
      </g>

      {/* ========================================================= */}
      {/* 3. CHILD (CENTER) */}
      {/* ========================================================= */}
      <g id="child">
        {/* Child - Navy Shorts */}
        <path d="M162 290 L198 290 L196 330 L184 330 L180 305 L176 330 L164 330 Z" fill="#1E293B" />

        {/* Child - Cyan/Sky Blue T-shirt */}
        <path
          d="M152 216 L208 216 L204 290 L156 290 Z"
          fill="#38BDF8"
        />

        {/* Child - Right Arm holding Father's hand */}
        <path
          d="M154 218 L134 235 C130 238, 126 230, 130 225 L150 212 Z"
          fill="#FBD5B5"
        />
        {/* Clasping hands (Father & Child) */}
        <ellipse cx="136" cy="228" rx="7" ry="6" fill="#FBD5B5" />

        {/* Child - Left Arm holding Mother's hand */}
        <path
          d="M206 218 L226 235 C230 238, 234 230, 230 225 L210 212 Z"
          fill="#FBD5B5"
        />
        {/* Clasping hands (Mother & Child) */}
        <ellipse cx="224" cy="228" rx="7" ry="6" fill="#FBD5B5" />

        {/* Child - Neck */}
        <rect x="174" y="202" width="12" height="16" rx="2" fill="#FBD5B5" />

        {/* Child - Head */}
        <ellipse cx="180" cy="188" rx="20" ry="21" fill="#FBD5B5" />

        {/* Child - Ears */}
        <circle cx="160" cy="188" r="4.5" fill="#FBD5B5" />
        <circle cx="200" cy="188" r="4.5" fill="#FBD5B5" />

        {/* Child - Brown Hair */}
        <path
          d="M160 184 C158 160, 168 152, 182 152 C196 152, 202 162, 200 184 C195 174, 188 170, 180 170 C172 170, 165 175, 160 184 Z"
          fill="#78350F"
        />

        {/* Child - Eyes */}
        <circle cx="174" cy="186" r="2.2" fill="#1E293B" />
        <circle cx="186" cy="186" r="2.2" fill="#1E293B" />

        {/* Child - Smile */}
        <path
          d="M175 195 C175 195, 180 202, 185 195 Z"
          fill="#FFFFFF"
          stroke="#1E293B"
          strokeWidth="1.2"
        />
      </g>
    </svg>
  );
};
