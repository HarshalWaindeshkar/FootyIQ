'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { useState } from 'react'
import HowToPlayModal from '@/components/HowToPlayModal'

export default function Navbar() {
  const pathname = usePathname()
  const [howToPlayOpen, setHowToPlayOpen] = useState(false)

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-primary/20 border border-primary/40 flex items-center justify-center glow-blue">
                  <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
                    <circle cx="12" cy="12" r="10" stroke="#00aaff" strokeWidth="1.5" />
                    <path d="M12 2C12 2 8 6 8 12C8 18 12 22 12 22" stroke="#00aaff" strokeWidth="1.5" />
                    <path d="M12 2C12 2 16 6 16 12C16 18 12 22 12 22" stroke="#00aaff" strokeWidth="1.5" />
                    <path d="M2 12H22" stroke="#00aaff" strokeWidth="1.5" />
                    <path d="M3.5 7H20.5" stroke="#00aaff" strokeWidth="1" strokeOpacity="0.6" />
                    <path d="M3.5 17H20.5" stroke="#00aaff" strokeWidth="1" strokeOpacity="0.6" />
                  </svg>
                </div>
                <span
                  className="text-xl font-bold tracking-widest text-glow-blue"
                  style={{ fontFamily: 'var(--font-display, Rajdhani, sans-serif)', color: '#00aaff', letterSpacing: '0.15em' }}
                >
                  FOOTY<span style={{ color: '#00ff88' }}>IQ</span>
                </span>
              </motion.div>
            </Link>

            {/* Nav links */}
            <div className="flex items-center gap-2 sm:gap-6">
              <NavLink href="/" active={pathname === '/'}>
                Games
              </NavLink>
              <button
                onClick={() => setHowToPlayOpen(true)}
                className="text-sm font-semibold tracking-widest uppercase transition-all duration-200 text-muted-foreground hover:text-foreground flex items-center gap-1.5"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-3.5 h-3.5 hidden sm:block">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 16v-4M12 8h.01" strokeLinecap="round" />
                </svg>
                <span className="hidden sm:inline">How to Play</span>
                <span className="sm:hidden">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 16v-4M12 8h.01" strokeLinecap="round" />
                  </svg>
                </span>
              </button>
            </div>

            {/* Live badge */}
            <div className="flex items-center gap-3">
              <div className="glass px-3 py-1.5 rounded-lg border border-neon-green/20 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
                <span className="text-xs font-bold tracking-widest text-neon-green hidden sm:inline" style={{ fontFamily: 'var(--font-display)' }}>
                  LIVE
                </span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <HowToPlayModal open={howToPlayOpen} onClose={() => setHowToPlayOpen(false)} />
    </>
  )
}

function NavLink({ href, active, children }: { href: string; active: boolean; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className={`text-sm font-semibold tracking-widest uppercase transition-all duration-200 ${
        active ? 'text-primary text-glow-blue' : 'text-muted-foreground hover:text-foreground'
      }`}
      style={{ fontFamily: 'var(--font-display)' }}
    >
      {children}
    </Link>
  )
}
