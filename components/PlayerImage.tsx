'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

type PlayerImageProps = {
  src: string
  name: string
  alt?: string
  className?: string
  style?: React.CSSProperties
  blurAmount?: number
  objectPosition?: string
}

export default function PlayerImage({
  src,
  name,
  alt,
  className = '',
  style = {},
  blurAmount,
  objectPosition = 'top center',
}: PlayerImageProps) {
  const [loaded, setLoaded] = useState(false)
  const [errored, setErrored] = useState(false)

  const fallbackSrc = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&size=400&background=0d1b3e&color=00aaff&bold=true&font-size=0.35`
  const imgSrc = errored ? fallbackSrc : src

  return (
    <div className={`relative overflow-hidden ${className}`} style={style}>
      {/* Loading skeleton */}
      {!loaded && (
        <div className="absolute inset-0 z-10 animate-pulse" style={{ background: 'linear-gradient(135deg, rgba(13,27,62,0.8), rgba(0,170,255,0.05))' }}>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex flex-col items-center gap-3 opacity-40">
              <svg viewBox="0 0 24 24" fill="none" stroke="#00aaff" strokeWidth={1.5} className="w-12 h-12">
                <circle cx="12" cy="8" r="4" />
                <path d="M4 20c0-4 3.58-7 8-7s8 3 8 7" strokeLinecap="round" />
              </svg>
              <div className="w-16 h-1.5 rounded-full bg-primary/20" />
            </div>
          </div>
        </div>
      )}

      <motion.img
        src={imgSrc}
        alt={alt ?? name}
        crossOrigin="anonymous"
        className="w-full h-full object-cover"
        style={{
          objectPosition,
          filter: blurAmount !== undefined ? `blur(${blurAmount}px)` : undefined,
          opacity: loaded ? 1 : 0,
          transition: 'opacity 0.3s ease, filter 0.8s ease',
        }}
        onLoad={() => setLoaded(true)}
        onError={() => {
          if (!errored) {
            setErrored(true)
            setLoaded(false)
          } else {
            setLoaded(true) // fallback also failed, just show it
          }
        }}
      />
    </div>
  )
}
