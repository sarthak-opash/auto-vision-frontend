interface LoaderProps {
  isOverlay?: boolean
  message?: string
  description?: string
}

interface LoaderProps {
  isOverlay?: boolean
  message?: string
  description?: string
}

export function CarLoader({ isOverlay = true }: LoaderProps) {
  const content = (
    <div className="relative w-80 h-48 flex items-center justify-center mx-auto overflow-hidden">
      <svg className="w-72 h-40 overflow-visible" viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          {/* Wavy Fog Gradient (Primary color fading to transparent) */}
          <linearGradient id="fog-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#984216" stopOpacity="0.45" />
            <stop offset="40%" stopColor="#984216" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#984216" stopOpacity="0" />
          </linearGradient>

          {/* Wavy Fog Turbulence Filter for realistic waving motion */}
          <filter id="wavy-smoke" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="fractalNoise" baseFrequency="0.015 0.04" numOctaves="3" result="noise">
              <animate attributeName="baseFrequency" dur="10s" values="0.01 0.03;0.02 0.06;0.01 0.03" repeatCount="indefinite" />
              <animate attributeName="seed" dur="14s" values="1;80;1" repeatCount="indefinite" />
            </feTurbulence>
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="14" xChannelSelector="R" yChannelSelector="G" />
          </filter>

          {/* Clip path to restrict road dashes below ground */}
          <clipPath id="road-clip">
            <rect x="0" y="93" width="200" height="20" />
          </clipPath>
        </defs>

        {/* Wavy Flowing Fog Trail */}
        <path 
          d="M 145 83 C 160 83, 175 72, 190 64 C 205 56, 220 48, 240 38 L 240 92 L 145 92 Z" 
          fill="url(#fog-grad)" 
          filter="url(#wavy-smoke)"
        />
        <path 
          d="M 148 88 C 164 88, 178 78, 192 70 C 206 62, 218 55, 235 45 L 235 92 L 148 92 Z" 
          fill="url(#fog-grad)" 
          filter="url(#wavy-smoke)"
          opacity="0.7"
        />

        {/* Main Ground Line */}
        <path d="M 10 92 L 190 92" stroke="#984216" strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />

        {/* Road Dash lines rushing to the right (simulates leftward speed) */}
        <g clipPath="url(#road-clip)">
          <path 
            d="M -50 96 L 250 96" 
            stroke="#984216" 
            strokeWidth="2" 
            strokeDasharray="15 25" 
            className="animate-road-move-right" 
            opacity="0.5" 
          />
        </g>

        {/* Car Chassis Group (Engine suspension vibration) */}
        <g className="animate-car-bounce-3d">
          {/* Solid Sporty Car Body Silhouette (Facing Left) */}
          <path 
            d="M 32 80 C 32 75, 34 72, 38 72 C 45 72, 55 69, 65 66 C 72 61, 80 54, 85 54 C 98 54, 108 54, 115 54 C 126 54, 136 57, 142 60 C 146 59, 154 57, 160 56 C 163 56, 163 62, 162 65 C 160 74, 160 78, 160 80 L 149 80 C 149 68, 121 68, 121 80 L 72 80 C 72 68, 44 68, 44 80 L 32 80 Z" 
            fill="#984216" 
          />

          {/* White Highlights for Premium Contrast */}
          {/* Side Glass Windows */}
          <path 
            d="M 75 66 C 75 66, 83 58, 86 58 C 96 58, 106 58, 112 58 C 122 58, 131 61, 136 64 L 138 67 C 125 67, 85 67, 75 66 Z" 
            fill="#ffffff" 
            opacity="0.8" 
          />
          {/* Headlight Highlight */}
          <path d="M 32 76 C 34 76, 36 74, 38 73" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
          {/* Door / Fender Seam */}
          <path d="M 88 66 L 88 79" stroke="#ffffff" strokeWidth="1" opacity="0.5" />
          {/* Side Vent detail */}
          <path d="M 66 73 L 73 73" stroke="#ffffff" strokeWidth="1" opacity="0.6" />
          {/* Rear arch shadow */}
          <path d="M 148 72 C 154 72, 158 75, 158 80" stroke="#ffffff" strokeWidth="1" opacity="0.4" />
        </g>

        {/* Front Wheel (Stays on ground, spins counter-clockwise) */}
        <g>
          {/* Outer Tire */}
          <circle cx="58" cy="80" r="12" fill="#1e293b" stroke="#984216" strokeWidth="2" />
          {/* Inner Spoke Rim (spins) */}
          <g className="animate-wheel-spin-left-front" style={{ transformOrigin: '58px 80px' }}>
            <circle cx="58" cy="80" r="9" fill="#334155" />
            {/* 5 Spoke fan blades */}
            <path d="M 58 80 L 58 71 C 60.5 71, 60 78, 58 80 Z" fill="#ffffff" opacity="0.95" />
            <path d="M 58 80 L 66.5 77.2 C 66.7 79.9, 61.5 80, 58 80 Z" fill="#ffffff" opacity="0.95" />
            <path d="M 58 80 L 63.3 87.3 C 61.1 88.9, 59 82.5, 58 80 Z" fill="#ffffff" opacity="0.95" />
            <path d="M 58 80 L 52.7 87.3 C 50.4 85.9, 54.5 81.8, 58 80 Z" fill="#ffffff" opacity="0.95" />
            <path d="M 58 80 L 49.5 77.2 C 49.3 74.5, 54.5 77.2, 58 80 Z" fill="#ffffff" opacity="0.95" />
          </g>
        </g>

        {/* Rear Wheel (Stays on ground, spins counter-clockwise) */}
        <g>
          {/* Outer Tire */}
          <circle cx="135" cy="80" r="12" fill="#1e293b" stroke="#984216" strokeWidth="2" />
          {/* Inner Spoke Rim (spins) */}
          <g className="animate-wheel-spin-left-rear" style={{ transformOrigin: '135px 80px' }}>
            <circle cx="135" cy="80" r="9" fill="#334155" />
            {/* 5 Spoke fan blades */}
            <path d="M 135 80 L 135 71 C 137.5 71, 137 78, 135 80 Z" fill="#ffffff" opacity="0.95" />
            <path d="M 135 80 L 143.5 77.2 C 143.7 79.9, 138.5 80, 135 80 Z" fill="#ffffff" opacity="0.95" />
            <path d="M 135 80 L 140.3 87.3 C 138.1 88.9, 136 82.5, 135 80 Z" fill="#ffffff" opacity="0.95" />
            <path d="M 135 80 L 129.7 87.3 C 127.4 85.9, 131.5 81.8, 135 80 Z" fill="#ffffff" opacity="0.95" />
            <path d="M 135 80 L 126.5 77.2 C 126.3 74.5, 131.5 77.2, 135 80 Z" fill="#ffffff" opacity="0.95" />
          </g>
        </g>
      </svg>
    </div>
  )

  if (isOverlay) {
    return (
      <div className="fixed inset-0 bg-slate-950/15 backdrop-blur-[8px] z-50 flex items-center justify-center p-6 animate-in fade-in duration-300">
        {content}
      </div>
    )
  }

  return content
}



