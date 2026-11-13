import React from 'react';

interface IllustrationProps {
  className?: string;
}

export const FacultyIllustration: React.FC<IllustrationProps> = ({ className = 'w-full h-full' }) => {
  return (
    <svg
      viewBox="0 0 320 360"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      preserveAspectRatio="xMidYMid meet"
    >
      {/* Soft circular aura */}
      <circle cx="160" cy="180" r="140" fill="white" fillOpacity="0.12" />

      {/* Main Body / Shirt */}
      <path
        d="M100 240 L115 165 C120 150, 138 145, 160 145 C182 145, 200 150, 205 165 L220 240 L212 350 L108 350 Z"
        fill="#FFFFFF"
        stroke="#1E293B"
        strokeWidth="4"
        strokeLinejoin="round"
      />

      {/* Right Arm (pointing up side) */}
      <path
        d="M115 165 C95 185, 78 215, 62 250 L84 258 C96 230, 110 200, 128 178 Z"
        fill="#FFFFFF"
        stroke="#1E293B"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      {/* Forearm pointing upward */}
      <path
        d="M62 250 L68 185 C70 178, 86 178, 88 185 L84 258 Z"
        fill="#FFFFFF"
        stroke="#1E293B"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      {/* Sleeve cuff */}
      <line x1="68" y1="185" x2="88" y2="185" stroke="#1E293B" strokeWidth="4" strokeLinecap="round" />

      {/* Hand & Pointing Finger */}
      {/* Palm and closed fingers */}
      <path
        d="M68 185 C62 170, 64 150, 75 146 C82 146, 88 152, 88 166 L88 185 Z"
        fill="#FFFFFF"
        stroke="#1E293B"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      {/* Index Finger pointing upward */}
      <path
        d="M74 150 L74 100 C74 92, 86 92, 86 100 L86 152"
        fill="#FFFFFF"
        stroke="#1E293B"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Thumb folded */}
      <path
        d="M70 156 C68 148, 76 145, 80 150"
        stroke="#1E293B"
        strokeWidth="4"
        strokeLinecap="round"
      />
      {/* Finger crease lines */}
      <path d="M66 164 Q74 167 82 165" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" />
      <path d="M66 172 Q74 175 82 173" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" />

      {/* Left Arm (holding book side) */}
      <path
        d="M205 165 C222 188, 235 220, 240 255 L220 262 C215 235, 204 208, 192 185 Z"
        fill="#FFFFFF"
        stroke="#1E293B"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      {/* Forearm bent forward holding book */}
      <path
        d="M240 255 C225 260, 200 264, 180 264 L180 244 C198 244, 212 240, 220 236 Z"
        fill="#FFFFFF"
        stroke="#1E293B"
        strokeWidth="4"
        strokeLinejoin="round"
      />

      {/* Open Book in Left Hand */}
      <g id="open-book">
        {/* Left page cover (Blue) */}
        <path
          d="M182 238 C160 220, 138 232, 126 238 L142 278 C154 272, 172 262, 192 278 Z"
          fill="#3B82F6"
          stroke="#1E293B"
          strokeWidth="4"
          strokeLinejoin="round"
        />
        {/* Left page inner (White) */}
        <path
          d="M180 234 C162 218, 142 228, 130 234 L144 270 C154 265, 170 256, 188 272 Z"
          fill="#FFFFFF"
          stroke="#1E293B"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />

        {/* Right page cover (Blue) */}
        <path
          d="M182 238 C204 220, 226 232, 238 238 L222 278 C210 272, 192 262, 172 278 Z"
          fill="#3B82F6"
          stroke="#1E293B"
          strokeWidth="4"
          strokeLinejoin="round"
        />
        {/* Right page inner (White) */}
        <path
          d="M184 234 C202 218, 222 228, 234 234 L220 270 C210 265, 194 256, 176 272 Z"
          fill="#FFFFFF"
          stroke="#1E293B"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />

        {/* Center Spine Crease */}
        <path d="M182 236 L182 276" stroke="#1E293B" strokeWidth="4" strokeLinecap="round" />

        {/* Fingers holding the book at bottom */}
        {/* Left hand gripping from right */}
        <path
          d="M208 262 C204 256, 194 258, 192 268 C190 276, 202 282, 210 276"
          fill="#FFFFFF"
          stroke="#1E293B"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />
        <path
          d="M218 266 C214 260, 204 262, 202 272 C200 280, 212 286, 220 280"
          fill="#FFFFFF"
          stroke="#1E293B"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />
        <path
          d="M228 270 C224 264, 214 266, 212 276 C210 284, 222 290, 230 284"
          fill="#FFFFFF"
          stroke="#1E293B"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />
        {/* Thumb resting on page */}
        <path
          d="M198 250 C194 246, 190 252, 192 258 C194 262, 204 262, 204 256 Z"
          fill="#FFFFFF"
          stroke="#1E293B"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />
      </g>

      {/* Shirt Placket and Collar */}
      {/* Neck */}
      <path
        d="M150 120 L150 148 C155 152, 165 152, 170 148 L170 120 Z"
        fill="#FFFFFF"
        stroke="#1E293B"
        strokeWidth="4"
        strokeLinejoin="round"
      />

      {/* Classic Crisp Collar */}
      <path
        d="M142 140 L160 168 L178 140"
        fill="#FFFFFF"
        stroke="#1E293B"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <path
        d="M136 138 L152 168 L160 162 L150 138 Z"
        fill="#FFFFFF"
        stroke="#1E293B"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <path
        d="M184 138 L168 168 L160 162 L170 138 Z"
        fill="#FFFFFF"
        stroke="#1E293B"
        strokeWidth="4"
        strokeLinejoin="round"
      />

      {/* Royal Blue Necktie */}
      <path
        d="M154 162 L166 162 L168 174 L160 178 L152 174 Z"
        fill="#3B82F6"
        stroke="#1E293B"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      <path
        d="M155 176 L165 176 L174 270 L160 295 L146 270 Z"
        fill="#3B82F6"
        stroke="#1E293B"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      {/* Tie knot highlight */}
      <path d="M156 166 L164 166" stroke="#60A5FA" strokeWidth="2" strokeLinecap="round" />

      {/* Head */}
      <path
        d="M134 85 C134 45, 186 45, 186 85 C186 115, 172 126, 160 126 C148 126, 134 115, 134 85 Z"
        fill="#FFFFFF"
        stroke="#1E293B"
        strokeWidth="4"
        strokeLinejoin="round"
      />

      {/* Ears */}
      <ellipse cx="132" cy="88" rx="6" ry="10" fill="#FFFFFF" stroke="#1E293B" strokeWidth="3.5" />
      <ellipse cx="188" cy="88" rx="6" ry="10" fill="#FFFFFF" stroke="#1E293B" strokeWidth="3.5" />

      {/* Hair (Neat Gray-Brown professional cut) */}
      <path
        d="M130 82 C126 55, 142 30, 168 30 C190 30, 196 52, 192 82 C186 70, 174 65, 160 66 C146 66, 136 74, 130 82 Z"
        fill="#64748B"
        stroke="#1E293B"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      {/* Hair lock detail */}
      <path
        d="M142 66 C150 56, 162 56, 174 60"
        stroke="#475569"
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* Eyes */}
      <ellipse cx="147" cy="82" rx="4" ry="4.5" fill="#1E293B" />
      <ellipse cx="173" cy="82" rx="4" ry="4.5" fill="#1E293B" />

      {/* Nose */}
      <path d="M160 88 C158 92, 162 94, 163 94" stroke="#1E293B" strokeWidth="3.5" strokeLinecap="round" />

      {/* Gentle Smile */}
      <path d="M152 104 Q160 110 168 104" stroke="#1E293B" strokeWidth="3.5" strokeLinecap="round" />
    </svg>
  );
};
