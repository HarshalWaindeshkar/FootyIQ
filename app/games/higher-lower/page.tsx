'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import GameLayout from '@/components/GameLayout'
import PlayerImage from '@/components/PlayerImage'
import { getTwoRandomPlayers, type Player } from '@/lib/players'
import { useRouter } from 'next/navigation'
import GameOverlay from "@/components/layout/GameOverlay";

type Stat = 'goals' | 'market_value'
type RevealState = 'idle' | 'revealing' | 'done'

const STAT_LABELS: Record<Stat, string> = {
  goals: 'Career Goals',
  market_value: 'Market Value (M€)',
}


function getRandomStat(): Stat {
  return Math.random() > 0.5 ? 'goals' : 'market_value'
}

function init(): { left: Player; right: Player; stat: Stat } {
  const [a, b] = getTwoRandomPlayers()
  return { left: a, right: b, stat: getRandomStat() }
}

export default function HigherLowerPage() {
  const router = useRouter()
  const [score, setScore] = useState(0)
  const [streak, setStreak] = useState(0)
  const [{ left, right, stat }, setRound] = useState(init)
  const [revealState, setRevealState] = useState<RevealState>('idle')
  const [resultCorrect, setResultCorrect] = useState(false)
  const [answer, setAnswer] = useState<'higher' | 'lower' | null>(null)
  const [gameOver, setGameOver] = useState(false)

  const handleChoice = useCallback(
    (choice: 'higher' | 'lower') => {
      if (revealState !== 'idle') return
      const leftVal = left[stat]
      const rightVal = right[stat]
      const correct =
        (choice === 'higher' && rightVal >= leftVal) ||
        (choice === 'lower' && rightVal <= leftVal)

      setAnswer(choice)
      setRevealState('revealing')

      setTimeout(() => {
        setRevealState('done')
        setResultCorrect(correct)

        if (correct) {
          const pts = 1 + Math.floor(streak / 3) // bonus for streak
          setScore((s) => s + pts)
          setStreak((st) => st + 1)
        } else {
          setStreak(0)
          setGameOver(true)
        }
      }, 800)
    },
    [revealState, left, right, stat, streak]
  )

  const nextRound = () => {
    setRound(init())
    setRevealState('idle')
    setAnswer(null)
    setResultCorrect(false)
  }

  const restart = () => {
    setScore(0)
    setStreak(0)
    setRound(init())
    setRevealState('idle')
    setAnswer(null)
    setResultCorrect(false)
    setGameOver(false)
  }

  return (
    <>
    <GameOverlay image="/bg-higher.png" />
    <GameLayout title="Higher or Lower" score={score}>
      <div className="w-full max-w-2xl mx-auto flex flex-col gap-6">
        {/* Streak */}
        <div className="flex items-center justify-center gap-3">
          <div
            className="flex items-center gap-2 px-4 py-1.5 rounded-full glass"
            style={{ border: streak > 0 ? '1px solid rgba(0,255,136,0.4)' : '1px solid rgba(0,170,255,0.15)' }}
          >
            <span className="text-xs font-bold tracking-widest uppercase" style={{ fontFamily: 'var(--font-display)', color: streak > 0 ? '#00ff88' : 'rgba(255,255,255,0.3)' }}>
              Streak: {streak}
            </span>
            {streak >= 3 && (
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
                className="text-xs"
                style={{ color: '#ffaa00' }}
              >
                HOT
              </motion.span>
            )}
          </div>
          <div className="px-4 py-1.5 rounded-full glass" style={{ border: '1px solid rgba(0,170,255,0.15)' }}>
            <span className="text-xs font-bold tracking-widest uppercase text-muted-foreground" style={{ fontFamily: 'var(--font-display)' }}>
              {STAT_LABELS[stat]}
            </span>
          </div>
        </div>

        {/* Game Over overlay */}
        <AnimatePresence>
          {gameOver && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass rounded-2xl p-8 text-center"
              style={{ border: '1px solid rgba(255,51,85,0.4)', boxShadow: '0 0 40px rgba(255,51,85,0.15)' }}
            >
              <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: 'linear-gradient(90deg, transparent, #ff3355, transparent)' }} />
              <h2 className="text-4xl font-black tracking-widest uppercase mb-2" style={{ fontFamily: 'var(--font-display)', color: '#ff3355', textShadow: '0 0 20px rgba(255,51,85,0.5)' }}>
                Game Over
              </h2>
              <p className="text-muted-foreground mb-2">Final Score: <span className="font-bold text-foreground">{score}</span></p>
              <p className="text-muted-foreground text-sm mb-6">Best streak: <span style={{ color: '#00ff88' }} className="font-bold">{streak}</span></p>
              <div className="flex gap-3 justify-center">
                <button
                  onClick={() => router.push('/')}
                  className="px-6 py-3 rounded-xl font-bold text-xs tracking-widest uppercase"
                  style={{ fontFamily: 'var(--font-display)', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.6)' }}
                >
                  Home
                </button>
                <button
                  onClick={restart}
                  className="px-6 py-3 rounded-xl font-bold text-xs tracking-widest uppercase"
                  style={{ fontFamily: 'var(--font-display)', background: 'rgba(0,170,255,0.15)', border: '1px solid rgba(0,170,255,0.4)', color: '#00aaff', boxShadow: '0 0 15px rgba(0,170,255,0.2)' }}
                >
                  Play Again
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Players comparison */}
        {!gameOver && (
          <>
            <div className="grid grid-cols-2 gap-4">
              {/* Left player (known) */}
              <PlayerCard
                player={left}
                stat={stat}
                revealed
                role="left"
                label="BASE"
              />

              {/* Right player (unknown or revealed) */}
              <PlayerCard
                player={right}
                stat={stat}
                revealed={revealState !== 'idle'}
                role="right"
                label={revealState === 'idle' ? '?' : 'COMPARE'}
                isCorrect={revealState === 'done' ? resultCorrect : undefined}
              />
            </div>

            {/* VS divider */}
            <div className="flex items-center gap-4">
              <div className="flex-1 h-px" style={{ background: 'rgba(0,170,255,0.1)' }} />
              <span
                className="text-2xl font-black tracking-widest"
                style={{ fontFamily: 'var(--font-display)', color: '#00aaff' }}
              >
                VS
              </span>
              <div className="flex-1 h-px" style={{ background: 'rgba(0,170,255,0.1)' }} />
            </div>

            {/* Choice buttons or result */}
            <AnimatePresence mode="wait">
              {revealState === 'idle' ? (
                <motion.div
                  key="buttons"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="grid grid-cols-2 gap-4"
                >
                  <ChoiceButton
                    choice="higher"
                    onClick={() => handleChoice('higher')}
                    color="#00ff88"
                    icon={
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-6 h-6">
                        <path d="M12 19V5M5 12l7-7 7 7" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    }
                  />
                  <ChoiceButton
                    choice="lower"
                    onClick={() => handleChoice('lower')}
                    color="#ff3355"
                    icon={
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-6 h-6">
                        <path d="M12 5v14M5 12l7 7 7-7" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    }
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center gap-3"
                >
                  {revealState === 'done' && (
                    <>
                      <div
                        className="px-6 py-3 rounded-xl font-black text-xl tracking-widest uppercase"
                        style={{
                          fontFamily: 'var(--font-display)',
                          color: resultCorrect ? '#00ff88' : '#ff3355',
                          background: resultCorrect ? 'rgba(0,255,136,0.1)' : 'rgba(255,51,85,0.1)',
                          border: `1px solid ${resultCorrect ? 'rgba(0,255,136,0.4)' : 'rgba(255,51,85,0.4)'}`,
                          textShadow: resultCorrect ? '0 0 15px rgba(0,255,136,0.5)' : '0 0 15px rgba(255,51,85,0.5)',
                        }}
                      >
                        {resultCorrect ? 'CORRECT!' : 'WRONG!'}
                      </div>
                      {!gameOver && (
                        <button
                          onClick={nextRound}
                          className="px-8 py-3 rounded-xl font-bold text-xs tracking-widest uppercase"
                          style={{
                            fontFamily: 'var(--font-display)',
                            background: 'rgba(0,170,255,0.15)',
                            border: '1px solid rgba(0,170,255,0.4)',
                            color: '#00aaff',
                          }}
                        >
                          Next Round
                        </button>
                      )}
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
      </div>
    </GameLayout>
    </>
  )
}

function PlayerCard({
  player,
  stat,
  revealed,
  label,
  isCorrect,
}: {
  player: Player
  stat: Stat
  revealed: boolean
  role: 'left' | 'right'
  label: string
  isCorrect?: boolean
}) {
  return (
    <motion.div
      className="glass rounded-xl overflow-hidden relative"
      style={{
        border: `1px solid ${isCorrect === true ? 'rgba(0,255,136,0.5)' : isCorrect === false ? 'rgba(255,51,85,0.5)' : 'rgba(0,170,255,0.15)'}`,
        boxShadow: isCorrect === true ? '0 0 20px rgba(0,255,136,0.2)' : isCorrect === false ? '0 0 20px rgba(255,51,85,0.2)' : 'none',
      }}
    >
      {/* Label badge */}
      <div
        className="absolute top-2 left-2 z-10 px-2 py-0.5 rounded text-xs font-bold tracking-widest"
        style={{
          fontFamily: 'var(--font-display)',
          background: 'rgba(5,8,16,0.8)',
          border: '1px solid rgba(0,170,255,0.2)',
          color: '#00aaff',
        }}
      >
        {label}
      </div>

      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-secondary/30">
        <PlayerImage
          src={player.image}
          name={player.name}
          className="w-full h-full"
          objectPosition="top center"
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(5,8,16,0.9) 0%, transparent 50%)' }} />
        <div className="absolute bottom-2 left-2 right-2">
          <p className="font-bold text-xs text-foreground truncate" style={{ fontFamily: 'var(--font-display)' }}>
            {player.name}
          </p>
          <p className="text-muted-foreground text-xs">{player.nationality}</p>
        </div>
      </div>

      {/* Stat */}
      <div className="p-3 text-center">
        <AnimatePresence mode="wait">
          {revealed ? (
            <motion.div
              key="value"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              <p
                className="text-2xl font-black"
                style={{
                  fontFamily: 'var(--font-display)',
                  color: isCorrect === true ? '#00ff88' : isCorrect === false ? '#ff3355' : '#00aaff',
                }}
              >
                {formatStat(stat, player[stat])}
              </p>
            </motion.div>
          ) : (
            <motion.div key="hidden" className="flex justify-center">
              <div
                className="w-12 h-7 rounded flex items-center justify-center"
                style={{ background: 'rgba(0,170,255,0.1)', border: '1px solid rgba(0,170,255,0.2)' }}
              >
                <span className="text-lg font-black" style={{ color: '#00aaff', fontFamily: 'var(--font-display)' }}>?</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

function ChoiceButton({
  choice,
  onClick,
  color,
  icon,
}: {
  choice: 'higher' | 'lower'
  onClick: () => void
  color: string
  icon: React.ReactNode
}) {
  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className="py-5 rounded-xl font-black tracking-widest uppercase flex flex-col items-center gap-2 transition-all duration-200"
      style={{
        fontFamily: 'var(--font-display)',
        background: `${color}18`,
        border: `1px solid ${color}44`,
        color,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = `0 0 20px ${color}33`
        e.currentTarget.style.background = `${color}28`
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = 'none'
        e.currentTarget.style.background = `${color}18`
      }}
    >
      <span className="w-8 h-8 flex items-center justify-center">{icon}</span>
      <span className="text-sm">{choice.toUpperCase()}</span>
    </motion.button>
  )
}

function formatStat(stat: Stat, val: number): string {
  if (stat === 'market_value') return `€${val}M`
  return `${val}`
}
