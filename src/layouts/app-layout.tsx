import { Outlet } from 'react-router-dom'
import { Footer } from '../components/layout/footer'
import { Navbar } from '../components/layout/navbar'

export function AppLayout() {
  return (
    <div className="page-shell flex min-h-screen flex-col">
      <Navbar />
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 sm:py-10">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
