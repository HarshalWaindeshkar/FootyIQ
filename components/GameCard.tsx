'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

type GameCardProps = {
  title: string
  description: string
  href: string
  icon: React.ReactNode
  accentColor?: 'blue' | 'green'
  index?: number
  bgImage?: string
}

export default function GameCard({
  title,
  description,
  href,
  icon,
  accentColor = 'blue',
  index = 0,
  bgImage,
}: GameCardProps) {
  const isBlue = accentColor === 'blue'
  const color = isBlue ? '#00aaff' : '#00ff88'
  const glow = isBlue
    ? '0 0 30px rgba(0,170,255,0.4), 0 0 60px rgba(0,170,255,0.15)'
    : '0 0 30px rgba(0,255,136,0.4), 0 0 60px rgba(0,255,136,0.15)'
  const borderActive = isBlue ? 'rgba(0,170,255,0.7)' : 'rgba(0,255,136,0.7)'
  const borderIdle = isBlue ? 'rgba(0,170,255,0.2)' : 'rgba(0,255,136,0.15)'

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.07 }}
      whileHover={{ scale: 1.025, y: -5, rotateX: 2 }}
      style={{ perspective: 1000, transformStyle: 'preserve-3d' }}
      className="group relative"
    >
      <Link href={href} className="block h-full">
        <div
          className="relative h-full rounded-2xl overflow-hidden cursor-pointer transition-all duration-300"
          style={{ border: `1px solid ${borderIdle}`, minHeight: '200px' }}
          onMouseEnter={(e) => {
            const el = e.currentTarget
            el.style.border = `1px solid ${borderActive}`
            el.style.boxShadow = glow
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget
            el.style.border = `1px solid ${borderIdle}`
            el.style.boxShadow = 'none'
          }}
        >
          {/* Background image */}
          {bgImage && (
            <div className="absolute inset-0 z-0">
              <img
                src={bgImage}
                alt=""
                className="w-full h-full object-cover opacity-25 group-hover:opacity-35 transition-opacity duration-500"
              />
            </div>
          )}

          {/* Dark glass base */}
          <div
            className="absolute inset-0 z-0"
            style={{
              background: bgImage
                ? `linear-gradient(135deg, rgba(5,8,16,0.85) 0%, rgba(5,8,16,0.6) 100%)`
                : `linear-gradient(135deg, rgba(13,27,62,0.9), rgba(5,8,16,0.95))`,
              backdropFilter: 'blur(4px)',
            }}
          />

          {/* Top neon accent line */}
          <div
            className="absolute top-0 left-0 right-0 h-[2px] z-10 transition-all duration-300"
            style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)`, opacity: 0.6 }}
          />
          <div
            className="absolute top-0 left-0 right-0 h-[2px] z-10 opacity-0 group-hover:opacity-100 transition-all duration-300"
            style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)`, boxShadow: `0 0 12px ${color}` }}
          />

          {/* Content */}
          <div className="relative z-10 p-6 flex flex-col h-full gap-4" style={{ minHeight: '200px' }}>
            {/* Top row: icon + position badge */}
            <div className="flex items-start justify-between">
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                style={{
                  background: `${isBlue ? 'rgba(0,170,255,0.12)' : 'rgba(0,255,136,0.12)'}`,
                  border: `1px solid ${isBlue ? 'rgba(0,170,255,0.3)' : 'rgba(0,255,136,0.3)'}`,
                  color,
                  boxShadow: `0 0 12px ${color}30`,
                }}
              >
                {icon}
              </div>
              {/* FUT-style card rating chip */}
              <div
                className="px-2.5 py-1 rounded-lg text-xs font-black tracking-wider"
                style={{
                  fontFamily: 'var(--font-display)',
                  background: `${color}18`,
                  border: `1px solid ${color}40`,
                  color,
                }}
              >
                {index === 0 ? 'HOT' : index === 1 ? 'FUN' : index === 2 ? 'NEW' : index === 3 ? 'FAST' : index === 4 ? 'HARD' : 'PLAY'}
              </div>
            </div>

            {/* Text */}
            <div className="flex-1">
              <h3
                className="text-xl font-black tracking-wide mb-2 uppercase leading-tight"
                style={{ fontFamily: 'var(--font-display)', color }}
              >
                {title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
            </div>

            {/* Play button — FIFA style */}
            <div
              className="flex items-center justify-between pt-3"
              style={{ borderTop: `1px solid ${color}20` }}
            >
              <span
                className="text-xs font-bold tracking-[0.2em] uppercase text-muted-foreground"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Tap to play
              </span>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2 px-4 py-2 rounded-xl font-black text-xs tracking-widest uppercase"
                style={{
                  fontFamily: 'var(--font-display)',
                  background: `linear-gradient(135deg, ${color}30, ${color}15)`,
                  border: `1px solid ${color}60`,
                  color,
                  boxShadow: `0 0 15px ${color}25`,
                }}
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                  <path d="M8 5v14l11-7z" />
                </svg>
                PLAY
              </motion.div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
