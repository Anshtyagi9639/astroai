import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const links = [
  { to: '/', label: 'Home' },
  { to: '/horoscope', label: 'Horoscope' },
  { to: '/chat', label: 'AI Chat' },
  { to: '/about', label: 'About' },
]

export default function Navbar() {
  const { pathname } = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'py-3 bg-cosmic-950/80 backdrop-blur-xl border-b border-nebula-600/20' : 'py-5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-nebula-gradient flex items-center justify-center text-sm font-bold shadow-lg shadow-nebula-600/30 group-hover:scale-110 transition-transform">
            ✦
          </div>
          <span className="font-display font-bold text-xl tracking-tight">
            <span className="text-gradient">Astro</span>
            <span className="text-stardust">AI</span>
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {links.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                pathname === to
                  ? 'text-stardust'
                  : 'text-stardust/50 hover:text-stardust/90'
              }`}
            >
              {pathname === to && (
                <motion.div
                  layoutId="nav-pill"
                  className="absolute inset-0 glass-card rounded-lg"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">{label}</span>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <Link
          to="/horoscope"
          className="hidden md:block btn-primary text-sm px-5 py-2.5 rounded-xl"
        >
          <span>Read My Stars ✨</span>
        </Link>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-stardust/80 hover:text-stardust p-2"
        >
          <div className="w-6 space-y-1.5">
            <span className={`block h-0.5 bg-current transition-all ${open ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block h-0.5 bg-current transition-all ${open ? 'opacity-0' : ''}`} />
            <span className={`block h-0.5 bg-current transition-all ${open ? '-rotate-45 -translate-y-2' : ''}`} />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-cosmic-900/95 backdrop-blur-xl border-b border-nebula-600/20"
          >
            <div className="px-6 py-4 space-y-1">
              {links.map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  onClick={() => setOpen(false)}
                  className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    pathname === to
                      ? 'glass-card text-stardust'
                      : 'text-stardust/60 hover:text-stardust'
                  }`}
                >
                  {label}
                </Link>
              ))}
              <Link
                to="/horoscope"
                onClick={() => setOpen(false)}
                className="block btn-primary text-center text-sm mt-3"
              >
                <span>Read My Stars ✨</span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
