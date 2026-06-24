interface LoaderProps {
  isOverlay?: boolean
  message?: string
  description?: string
}

export function CarLoader({ isOverlay = true }: LoaderProps) {
  const content = (
    <div className="relative w-64 h-32 flex flex-col items-center justify-center mx-auto">
      {/* Detailed SVG Car & Road Animation */}
      <svg className="w-56 h-24 overflow-visible" viewBox="0 0 120 50" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="headlight-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#eab308" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#eab308" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Headlight Beam */}
        <path d="M97 30 L125 24 L125 39 L97 34 Z" fill="url(#headlight-grad)" className="animate-headlight-beam" />

        {/* Exhaust Smoke Puffs */}
        <g className="animate-smoke-puff-1">
          <circle cx="12" cy="33" r="1.5" fill="#cbd5e1" />
        </g>
        <g className="animate-smoke-puff-2">
          <circle cx="12" cy="33" r="2" fill="#94a3b8" />
        </g>
        <g className="animate-smoke-puff-3">
          <circle cx="12" cy="33" r="1" fill="#e2e8f0" />
        </g>

        {/* Car Chassis and Body (vibrates with engine) */}
        <g className="animate-car-vibrate-custom">
          {/* Main car body structure */}
          <path 
            d="M 15 35 L 33 35 C 33 29, 43 29, 43 35 L 77 35 C 77 29, 87 29, 87 35 L 97 35 C 99 35, 99 32, 98 30 C 94 26, 85 24, 78 18 C 72 13, 58 13, 48 14 C 36 15, 31 25, 26 25 C 20 25, 15 28, 15 32 Z" 
            fill="#984216" 
            stroke="#7c3410" 
            strokeWidth="1" 
          />
          {/* Cabin Windows */}
          <path d="M 48 16 L 73 16 L 69 22 L 48 22 Z" fill="#f8fafc" fillOpacity="0.4" stroke="#7c3410" strokeWidth="0.5" />
          {/* Rear wing */}
          <path d="M 15 27 L 11 25 L 12 24 L 16 27 Z" fill="#7c3410" />
          {/* Headlight & Tail light */}
          <path d="M 97 29 L 98 30 L 98 32 L 97 31 Z" fill="#eab308" />
          <path d="M 15 29 L 13 29 L 13 31 L 15 30 Z" fill="#ef4444" />
        </g>

        {/* Wheels (Separate from body so they rotate but don't vibrate) */}
        {/* Rear Wheel */}
        <g className="animate-wheel-spin-custom-rear">
          <circle cx="38" cy="35" r="5" fill="#0f172a" stroke="#475569" strokeWidth="1" />
          <circle cx="38" cy="35" r="2.5" fill="#94a3b8" />
          <line x1="38" y1="30" x2="38" y2="40" stroke="#ffffff" strokeWidth="0.75" />
          <line x1="33" y1="35" x2="43" y2="35" stroke="#ffffff" strokeWidth="0.75" />
        </g>
        {/* Front Wheel */}
        <g className="animate-wheel-spin-custom-front">
          <circle cx="82" cy="35" r="5" fill="#0f172a" stroke="#475569" strokeWidth="1" />
          <circle cx="82" cy="35" r="2.5" fill="#94a3b8" />
          <line x1="82" y1="30" x2="82" y2="40" stroke="#ffffff" strokeWidth="0.75" />
          <line x1="77" y1="35" x2="87" y2="35" stroke="#ffffff" strokeWidth="0.75" />
        </g>
      </svg>

      {/* The Road Line with passing dashes */}
      <div className="w-56 h-[3px] bg-slate-300/30 rounded-full overflow-hidden relative -mt-3">
        <div className="absolute inset-0 animate-road-pass"></div>
      </div>
    </div>
  )

  if (isOverlay) {
    return (
      <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-[4px] z-50 flex items-center justify-center p-6 animate-in fade-in duration-300">
        {content}
      </div>
    )
  }

  return content
}
