export function Footer() {
  return (
    <footer className="mt-24 border-t border-slate-100 py-12">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-slate-50 rounded-xl flex items-center justify-center shadow-inner border border-slate-200 overflow-hidden">
              <img src="/logo.png" alt="AutoVision Logo" className="w-full h-full object-cover" />
            </div>
            <span className="font-black text-2xl text-slate-900 tracking-tight">AutoVision</span>
          </div>
          <div className="text-sm text-slate-500 font-medium text-center md:text-right">
            <p>© {new Date().getFullYear()} AutoVision AI. All rights reserved.</p>
            <p className="mt-1">Industrial-Grade Intelligent Vehicle Damage Assessment</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

