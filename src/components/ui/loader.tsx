import { Car } from 'lucide-react'

interface LoaderProps {
  isOverlay?: boolean
  message?: string
  description?: string
}

export function CarLoader({ isOverlay = true }: LoaderProps) {
  const content = (
    <div className="relative w-64 h-32 flex items-center justify-center mx-auto">
      {/* The Road Line */}
      <div className="absolute bottom-6 left-4 right-4 h-[2px] bg-slate-400/30"></div>
      
      {/* The Wall/Barrier */}
      <div className="absolute right-12 bottom-6 w-[6px] h-10 bg-[#984216] rounded-full origin-bottom animate-wall-impact"></div>
      
      {/* The Sparks on impact */}
      <div className="absolute right-12 bottom-10 w-6 h-6 rounded-full bg-red-500/20 border border-red-500/40 flex items-center justify-center animate-spark">
        <div className="w-1.5 h-1.5 rounded-full bg-yellow-400"></div>
      </div>

      {/* The Animated Car */}
      <div className="absolute text-[#984216] animate-car-run-crash flex items-center justify-center" style={{ left: '50%', transform: 'translateX(-50%)' }}>
        <Car size={64} />
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
