export function Hero3D() {
  return (
    <div className="relative h-[300px] w-full overflow-hidden rounded-3xl border border-white/80 bg-gradient-to-br from-white via-[#faf7fd] to-[#f4edf8] md:h-[380px]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(96,23,111,0.16),transparent_45%),radial-gradient(circle_at_80%_70%,rgba(96,23,111,0.12),transparent_40%)]" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="glass-surface rounded-3xl px-8 py-6 text-center">
          <p className="text-xs uppercase tracking-[0.18em] text-[#4B4B4B]">Insurance Grade Analysis</p>
          <p className="mt-2 text-2xl font-semibold text-[#111111]">Vehicle Damage Inspection</p>
        </div>
      </div>
    </div>
  )
}
