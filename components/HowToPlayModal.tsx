'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const GAMES = [
  {
    id: 'guess',
    title: 'Guess the Player',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
        <circle cx="12" cy="8" r="4" />
        <path d="M4 20c0-4 3.58-7 8-7s8 3 8 7" strokeLinecap="round" />
      </svg>
    ),
    color: '#00aaff',
    steps: [
      'A mystery footballer is chosen at random.',
      'You start with 1 hint revealed — up to 5 hints total.',
      'Type the player\'s name and hit GUESS to submit.',
      'Each wrong guess auto-reveals the next hint.',
      'Score more points by guessing with fewer hints used.',
      'Click "Reveal Hint" to peek ahead — but it costs you points!',
    ],
    tip: 'First hint is always the hardest — try to guess early for maximum points.',
  },
  {
    id: 'career',
    title: 'Career Path',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
        <path d="M3 12h4l3-9 4 18 3-9h4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    color: '#00ff88',
    steps: [
      'A player\'s career club history is shown as a timeline.',
      'Clubs are revealed one by one from their first club.',
      'Type a player name and submit your guess.',
      'Each wrong guess reveals the next club in their career.',
      'Fewer clubs revealed = more points earned.',
    ],
    tip: 'Some players had very short careers at big clubs — think carefully!',
  },
  {
    id: 'blur',
    title: 'Blur Challenge',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
        <circle cx="11" cy="11" r="8" />
        <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
      </svg>
    ),
    color: '#00aaff',
    steps: [
      'A heavily blurred player photo is shown.',
      'The image automatically sharpens every 2.5 seconds.',
      'You have 15 seconds before time runs out.',
      'Type the player\'s name and hit GUESS.',
      'The blurrier the image when you guess correctly, the more points you earn.',
    ],
    tip: 'Focus on body shape and kit color first — don\'t wait for a clear face!',
  },
  {
    id: 'higher',
    title: 'Higher or Lower',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
        <path d="M7 16V4m0 0L4 7m3-3l3 3M17 8v12m0 0l3-3m-3 3l-3-3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    color: '#00ff88',
    steps: [
      'Two players are shown side by side.',
      'A stat is shown — Career Goals or Market Value.',
      'The left player\'s stat is always revealed.',
      'Decide: does the right player\'s stat go HIGHER or LOWER?',
      'Build a streak for bonus points — one wrong answer ends the game!',
    ],
    tip: 'Market value is tricky — younger players often have huge values despite fewer goals.',
  },
  {
    id: 'badge',
    title: 'Club Badge Guess',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
        <path d="M12 2L4 6v6c0 5.25 3.5 9.74 8 11 4.5-1.26 8-5.75 8-11V6l-8-4z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    color: '#00ff88',
    steps: [
      'A football club badge is shown — blurred or zoomed in based on difficulty.',
      'Easy: slightly blurred. Medium: heavy blur. Hard: extreme blur + zoomed.',
      'Type the club name and hit GUESS to submit.',
      'Wrong guesses count against you — each mistake adds to a wrong-answer counter.',
      'Score more points on harder difficulty levels.',
      'After each guess, the next club badge appears automatically.',
    ],
    tip: 'Focus on the crest shape and color palette first — badge details come later.',
  },
]

type HowToPlayModalProps = {
  open: boolean
  onClose: () => void
}

export default function HowToPlayModal({ open, onClose }: HowToPlayModalProps) {
  const [activeGame, setActiveGame] = useState(GAMES[0].id)
  const active = GAMES.find((g) => g.id === activeGame) ?? GAMES[0]

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          style={{ background: 'rgba(5,8,16,0.9)', backdropFilter: 'blur(10px)' }}
          onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
        >
          <motion.div
            initial={{ scale: 0.85, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', stiffness: 280, damping: 22 }}
            className="glass rounded-2xl w-full max-w-xl overflow-hidden relative"
            style={{ border: '1px solid rgba(0,170,255,0.3)', boxShadow: '0 0 60px rgba(0,170,255,0.15), 0 0 120px rgba(0,170,255,0.05)' }}
          >
            {/* Top accent bar */}
            <div className="h-0.5 w-full" style={{ background: 'linear-gradient(90deg, transparent, #00aaff, #00ff88, transparent)' }} />

            {/* Header */}
            <div className="flex items-center justify-between px-6 pt-5 pb-4">
              <div>
                <h2 className="text-2xl font-black tracking-widest uppercase" style={{ fontFamily: 'var(--font-display)', color: '#00aaff', textShadow: '0 0 15px rgba(0,170,255,0.5)' }}>
                  How to Play
                </h2>
                <p className="text-xs text-muted-foreground tracking-widest uppercase mt-0.5" style={{ fontFamily: 'var(--font-display)' }}>
                  Select a game mode to learn
                </p>
              </div>
              <button
                onClick={onClose}
                className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 text-muted-foreground hover:text-foreground"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
                  <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            {/* Game tab selector */}
            <div className="px-6 pb-4 flex gap-2 overflow-x-auto scrollbar-hide">
              {GAMES.map((g) => (
                <button
                  key={g.id}
                  onClick={() => setActiveGame(g.id)}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold tracking-widest uppercase whitespace-nowrap transition-all duration-200 shrink-0"
                  style={{
                    fontFamily: 'var(--font-display)',
                    background: activeGame === g.id ? `${g.color}20` : 'rgba(255,255,255,0.04)',
                    border: `1px solid ${activeGame === g.id ? `${g.color}60` : 'rgba(255,255,255,0.08)'}`,
                    color: activeGame === g.id ? g.color : 'rgba(255,255,255,0.4)',
                    boxShadow: activeGame === g.id ? `0 0 12px ${g.color}30` : 'none',
                  }}
                >
                  <span style={{ color: activeGame === g.id ? g.color : 'rgba(255,255,255,0.3)' }}>{g.icon}</span>
                  {g.title.split(' ')[0]}
                </button>
              ))}
            </div>

            {/* Game instructions */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeGame}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="px-6 pb-6"
              >
                {/* Game title */}
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: `${active.color}18`, border: `1px solid ${active.color}40`, color: active.color }}
                  >
                    {active.icon}
                  </div>
                  <h3 className="text-lg font-bold tracking-wide uppercase" style={{ fontFamily: 'var(--font-display)', color: active.color }}>
                    {active.title}
                  </h3>
                </div>

                {/* Steps */}
                <div className="flex flex-col gap-2.5 mb-4">
                  {active.steps.map((step, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04 }}
                      className="flex items-start gap-3"
                    >
                      <span
                        className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5"
                        style={{ background: `${active.color}20`, border: `1px solid ${active.color}40`, color: active.color, fontFamily: 'var(--font-display)' }}
                      >
                        {i + 1}
                      </span>
                      <p className="text-sm text-foreground/80 leading-relaxed">{step}</p>
                    </motion.div>
                  ))}
                </div>

                {/* Pro tip */}
                <div
                  className="flex items-start gap-3 p-3 rounded-xl"
                  style={{ background: `${active.color}08`, border: `1px solid ${active.color}25` }}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke={active.color} strokeWidth={2} className="w-4 h-4 shrink-0 mt-0.5">
                    <path d="M12 2a7 7 0 017 7c0 3.5-2.5 6-4 7.5V18a2 2 0 01-2 2h-2a2 2 0 01-2-2v-1.5C7.5 15 5 12.5 5 9a7 7 0 017-7z" strokeLinecap="round" />
                    <path d="M10 22h4" strokeLinecap="round" />
                  </svg>
                  <p className="text-xs leading-relaxed" style={{ color: active.color, opacity: 0.8 }}>
                    <span className="font-bold" style={{ fontFamily: 'var(--font-display)' }}>PRO TIP: </span>
                    {active.tip}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
