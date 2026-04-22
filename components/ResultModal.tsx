'use client'

import { motion, AnimatePresence } from 'framer-motion'

type ResultModalProps = {
  open: boolean
  correct: boolean
  playerName: string
  message?: string
  onNext: () => void
  onHome?: () => void
  pointsEarned?: number
}

export default function ResultModal({ open, correct, playerName, message, onNext, onHome, pointsEarned }: ResultModalProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(5,8,16,0.85)', backdropFilter: 'blur(8px)' }}
        >
          <motion.div
            initial={{ scale: 0.7, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="glass rounded-2xl p-8 max-w-sm w-full text-center relative overflow-hidden"
            style={{
              border: `1px solid ${correct ? 'rgba(0,255,136,0.5)' : 'rgba(255,51,85,0.5)'}`,
              boxShadow: correct
                ? '0 0 40px rgba(0,255,136,0.25), 0 0 80px rgba(0,255,136,0.1)'
                : '0 0 40px rgba(255,51,85,0.25), 0 0 80px rgba(255,51,85,0.1)',
            }}
          >
            {/* Top accent */}
            <div
              className="absolute top-0 left-0 right-0 h-0.5"
              style={{
                background: correct
                  ? 'linear-gradient(90deg, transparent, #00ff88, transparent)'
                  : 'linear-gradient(90deg, transparent, #ff3355, transparent)',
              }}
            />

            {/* Icon */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.1, type: 'spring', stiffness: 400 }}
              className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center text-4xl"
              style={{
                background: correct ? 'rgba(0,255,136,0.1)' : 'rgba(255,51,85,0.1)',
                border: `2px solid ${correct ? 'rgba(0,255,136,0.5)' : 'rgba(255,51,85,0.5)'}`,
              }}
            >
              {correct ? '✓' : '✗'}
            </motion.div>

            <h2
              className="text-3xl font-bold tracking-widest uppercase mb-2"
              style={{
                fontFamily: 'var(--font-display)',
                color: correct ? '#00ff88' : '#ff3355',
                textShadow: correct
                  ? '0 0 15px rgba(0,255,136,0.6)'
                  : '0 0 15px rgba(255,51,85,0.6)',
              }}
            >
              {correct ? 'CORRECT!' : 'WRONG!'}
            </h2>

            <p className="text-muted-foreground text-sm mb-1">The answer was</p>
            <p className="text-foreground font-bold text-lg mb-2">{playerName}</p>

            {message && <p className="text-muted-foreground text-sm mb-4">{message}</p>}

            {correct && pointsEarned !== undefined && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mb-4 px-4 py-2 rounded-lg inline-flex items-center gap-2"
                style={{ background: 'rgba(0,255,136,0.1)', border: '1px solid rgba(0,255,136,0.3)' }}
              >
                <svg viewBox="0 0 24 24" fill="#00ff88" className="w-4 h-4">
                  <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
                </svg>
                <span className="font-bold text-sm tracking-wider" style={{ fontFamily: 'var(--font-display)', color: '#00ff88' }}>
                  +{pointsEarned} POINTS
                </span>
              </motion.div>
            )}

            <div className="flex gap-3 mt-4">
              {onHome && (
                <button
                  onClick={onHome}
                  className="flex-1 py-3 rounded-xl font-bold text-sm tracking-widest uppercase transition-all duration-200 text-muted-foreground hover:text-foreground"
                  style={{
                    fontFamily: 'var(--font-display)',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                  }}
                >
                  HOME
                </button>
              )}
              <button
                onClick={onNext}
                className="flex-1 py-3 rounded-xl font-bold text-sm tracking-widest uppercase transition-all duration-200"
                style={{
                  fontFamily: 'var(--font-display)',
                  background: correct ? 'rgba(0,255,136,0.15)' : 'rgba(0,170,255,0.15)',
                  border: `1px solid ${correct ? 'rgba(0,255,136,0.4)' : 'rgba(0,170,255,0.4)'}`,
                  color: correct ? '#00ff88' : '#00aaff',
                  boxShadow: correct ? '0 0 15px rgba(0,255,136,0.2)' : '0 0 15px rgba(0,170,255,0.2)',
                }}
              >
                NEXT
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
