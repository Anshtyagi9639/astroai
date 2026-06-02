import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar.jsx'
import StarField from '../components/StarField.jsx'

export default function Layout() {
  return (
    <div className="min-h-screen" style={{ background: 'radial-gradient(ellipse at top, #1a1048 0%, #080618 50%, #03020a 100%)' }}>
      <StarField count={100} />
      <Navbar />
      <main className="relative z-10">
        <Outlet />
      </main>
      <footer className="relative z-10 border-t border-nebula-600/10 py-8 text-center">
        <p className="text-stardust/30 text-xs font-body">
          ✦ AstroAI · Your Cosmic Intelligence · {new Date().getFullYear()} ✦
        </p>
      </footer>
    </div>
  )
}
