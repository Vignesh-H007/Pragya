import React from 'react';

interface IllustrationProps {
  className?: string;
}

export const StudentIllustration: React.FC<IllustrationProps> = ({ className = 'w-full h-full' }) => {
  return (
    <svg
      viewBox="0 0 320 360"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      preserveAspectRatio="xMidYMid meet"
    >
      {/* Background soft glow */}
      <circle cx="160" cy="180" r="140" fill="white" fillOpacity="0.12" />

      {/* Backpack visible behind left shoulder */}
      <path
        d="M102 120 C102 110, 118 100, 142 108 L146 160 C125 160, 102 145, 102 120 Z"
        fill="#FF6B4A"
        stroke="#1E293B"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      {/* Backpack strap on shoulder */}
      <path
        d="M128 114 C124 135, 120 180, 124 235 C118 232, 104 215, 102 175 C100 145, 110 120, 128 114 Z"
        fill="#FF6E40"
        stroke="#1E293B"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      <path
        d="M102 205 C102 235, 120 245, 132 245"
        fill="#D7CCC8"
        stroke="#1E293B"
        strokeWidth="3.5"
        strokeLinecap="round"
      />

      {/* Body / Shirt */}
      <path
        d="M122 115 C132 112, 150 110, 170 110 C190 110, 208 112, 218 115 C228 122, 240 145, 246 200 L242 250 C230 252, 195 254, 170 254 C145 254, 115 252, 104 250 L100 200 C106 145, 114 122, 122 115 Z"
        fill="#FFFFFF"
        stroke="#1E293B"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />

      {/* Shirt Placket & Buttons */}
      <line x1="170" y1="130" x2="170" y2="252" stroke="#1E293B" strokeWidth="2.5" />
      <circle cx="170" cy="150" r="2.5" fill="#1E293B" />
      <circle cx="170" cy="175" r="2.5" fill="#1E293B" />

      {/* Collar */}
      <path
        d="M148 110 L158 132 L170 118 L182 132 L192 110"
        fill="#FFFFFF"
        stroke="#1E293B"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />

      {/* Neck */}
      <path
        d="M156 94 L156 116 C162 119, 178 119, 184 116 L184 94 Z"
        fill="#FBD5B5"
        stroke="#1E293B"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      {/* Neck shadow */}
      <path
        d="M156 94 C164 102, 176 102, 184 94 L184 100 C176 106, 164 106, 156 100 Z"
        fill="#F5BA94"
      />

      {/* Head */}
      <path
        d="M142 62 C142 35, 198 35, 198 62 C198 88, 178 98, 170 98 C162 98, 142 88, 142 62 Z"
        fill="#FBD5B5"
        stroke="#1E293B"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />

      {/* Ears */}
      <ellipse cx="140" cy="66" rx="6" ry="9" fill="#FBD5B5" stroke="#1E293B" strokeWidth="3" />
      <path d="M140 63 C138 66, 138 68, 141 70" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" />

      <ellipse cx="200" cy="66" rx="6" ry="9" fill="#FBD5B5" stroke="#1E293B" strokeWidth="3" />
      <path d="M200 63 C202 66, 202 68, 199 70" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" />

      {/* Hair */}
      <path
        d="M136 55 C136 30, 150 18, 174 18 C194 18, 206 28, 204 45 C198 38, 186 35, 176 36 C164 37, 155 42, 148 50 C146 52, 144 55, 142 60 C138 62, 135 58, 136 55 Z"
        fill="#4A3428"
        stroke="#1E293B"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      {/* Hair detail fringe */}
      <path
        d="M146 45 C155 35, 175 32, 190 35 C182 42, 170 42, 160 46 C152 49, 148 53, 146 56"
        fill="#3A281E"
      />
      <path
        d="M185 24 C192 18, 200 22, 202 28 C204 35, 200 42, 198 48"
        stroke="#1E293B"
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* Eyebrows */}
      <path d="M152 52 Q158 50 163 53" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M176 53 Q181 50 187 52" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" />

      {/* Eyes */}
      <ellipse cx="157" cy="59" rx="3.5" ry="4.5" fill="#1E293B" />
      <ellipse cx="182" cy="59" rx="3.5" ry="4.5" fill="#1E293B" />

      {/* Smile with teeth */}
      <path
        d="M161 70 C161 70, 170 78, 178 70 Z"
        fill="#FFFFFF"
        stroke="#1E293B"
        strokeWidth="3"
        strokeLinejoin="round"
      />

      {/* Right Arm - Raised and Pointing Up */}
      {/* Shoulder to elbow */}
      <path
        d="M122 120 C108 135, 94 165, 86 195 L106 205 C112 180, 122 155, 130 140 Z"
        fill="#FFFFFF"
        stroke="#1E293B"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      {/* Forearm pointing upwards */}
      <path
        d="M86 195 L90 140 C92 135, 108 135, 112 140 L106 205 Z"
        fill="#FFFFFF"
        stroke="#1E293B"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      {/* Cuff */}
      <path
        d="M88 136 L112 136 L110 126 L86 126 Z"
        fill="#FFFFFF"
        stroke="#1E293B"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      {/* Hand & Pointing Finger */}
      {/* Palm & folded fingers */}
      <path
        d="M88 126 C84 116, 86 100, 95 98 C97 98, 104 104, 106 114 L110 126 Z"
        fill="#FBD5B5"
        stroke="#1E293B"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      {/* Index Finger pointing straight up */}
      <path
        d="M102 104 L102 60 C102 54, 110 54, 110 60 L110 106"
        fill="#FBD5B5"
        stroke="#1E293B"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Thumb folded */}
      <path
        d="M93 105 C93 98, 98 97, 102 101"
        stroke="#1E293B"
        strokeWidth="3"
        strokeLinecap="round"
      />
      {/* Folded knuckles lines */}
      <path d="M88 110 Q94 112 100 110" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M88 116 Q94 118 100 116" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" />

      {/* Left Arm & Holding Book */}
      {/* Upper arm */}
      <path
        d="M216 118 C232 138, 245 168, 248 198 L226 208 C222 185, 212 160, 202 142 Z"
        fill="#FFFFFF"
        stroke="#1E293B"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />

      {/* The Book/Notebook */}
      <g>
        {/* Book cover (brown) */}
        <rect
          x="156"
          y="156"
          width="54"
          height="80"
          rx="4"
          transform="rotate(2 183 196)"
          fill="#C49A74"
          stroke="#1E293B"
          strokeWidth="3.5"
        />
        {/* White pages border */}
        <rect
          x="156"
          y="156"
          width="7"
          height="80"
          rx="2"
          transform="rotate(2 183 196)"
          fill="#FFFFFF"
          stroke="#1E293B"
          strokeWidth="2.5"
        />
      </g>

      {/* Forearm & Hand holding the book */}
      <path
        d="M228 206 C210 206, 185 204, 168 200 C162 198, 155 186, 162 178 C168 170, 182 174, 188 178 L222 186 Z"
        fill="#FBD5B5"
        stroke="#1E293B"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      {/* Fingers gripping book */}
      <path d="M156 182 C152 184, 152 192, 156 195 C162 195, 172 195, 176 193" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" />
      <path d="M158 195 C154 197, 154 204, 158 206 C164 206, 172 206, 176 203" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" />
      <path d="M160 206 C158 208, 158 214, 162 216 C166 216, 172 215, 176 212" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" />

      {/* Thumb resting on front cover */}
      <path
        d="M170 172 C178 165, 185 174, 176 184 C170 186, 166 180, 170 172 Z"
        fill="#FBD5B5"
        stroke="#1E293B"
        strokeWidth="3"
        strokeLinejoin="round"
      />

      {/* Sleeve cuff left */}
      <path
        d="M214 186 L228 206 L218 214 L204 192 Z"
        fill="#FFFFFF"
        stroke="#1E293B"
        strokeWidth="3"
        strokeLinejoin="round"
      />

      {/* Belt & Pants */}
      <path
        d="M116 250 L224 250 L222 258 L118 258 Z"
        fill="#1E293B"
        stroke="#1E293B"
        strokeWidth="2.5"
      />
      {/* Belt buckle */}
      <rect x="162" y="249" width="16" height="10" rx="2" fill="#94A3B8" stroke="#1E293B" strokeWidth="2" />

      {/* Blue Trousers */}
      <path
        d="M116 258 L222 258 L218 350 L172 350 L170 285 L168 350 L122 350 Z"
        fill="#51648E"
        stroke="#1E293B"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      {/* Trouser crease lines */}
      <line x1="145" y1="265" x2="145" y2="340" stroke="#374768" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="195" y1="265" x2="195" y2="340" stroke="#374768" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
};
