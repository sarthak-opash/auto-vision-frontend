import { CarLogo } from './logo'

interface LoaderProps {
  isOverlay?: boolean
  message?: string
  description?: string
}

export function CarLoader({ isOverlay = true }: LoaderProps) {
  const content = (
    <div className="relative w-72 h-44 flex items-center justify-center mx-auto overflow-hidden">
      <CarLogo moving={true} className="w-64 h-36" />
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

