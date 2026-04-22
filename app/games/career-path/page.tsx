'use client'

import { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import GameLayout from '@/components/GameLayout'
import NeonInput from '@/components/NeonInput'
import ResultModal from '@/components/ResultModal'
import { getRandomPlayer, type Player } from '@/lib/players'
import { useRouter } from 'next/navigation'
import GameOverlay from "@/components/layout/GameOverlay";

// Only use players with 3+ clubs for this game
import { players } from '@/lib/players'
const eligiblePlayers = players.filter((p) => p.clubs.length >= 3)

function getRandomEligible(): Player {
  return eligiblePlayers[Math.floor(Math.random() * eligiblePlayers.length)]
}

type GameState = 'playing' | 'modal'

export default function CareerPathPage() {
  const router = useRouter()
  const [score, setScore] = useState(0)
  const [player, setPlayer] = useState<Player>(getRandomEligible)
  const [clubsRevealed, setClubsRevealed] = useState(1)
  const [guess, setGuess] = useState('')
  const [guessAttempts, setGuessAttempts] = useState(0)
  const [state, setState] = useState<GameState>('playing')
  const [isCorrect, setIsCorrect] = useState(false)
  const [shake, setShake] = useState(false)
  const [wrongGuesses, setWrongGuesses] = useState<string[]>([])
  const inputRef = useRef<HTMLInputElement>(null)

  const revealNext = () => {
    if (clubsRevealed < player.clubs.length) {
      setClubsRevealed((n) => n + 1)
    }
  }

  const handleGuess = useCallback(() => {
    if (!guess.trim()) return
    const correct =
      guess.trim().toLowerCase() === player.name.toLowerCase() ||
      player.name.toLowerCase().includes(guess.trim().toLowerCase())

    if (correct) {
      const pts = Math.max(10 - guessAttempts * 2, 2)
      setScore((s) => s + pts)
      setIsCorrect(true)
      setState('modal')
    } else {
      setWrongGuesses((w) => [...w, guess.trim()])
      setGuessAttempts((n) => n + 1)
      setShake(true)
      setTimeout(() => setShake(false), 500)
      // Auto reveal next club on wrong guess
      if (clubsRevealed < player.clubs.length) {
        setClubsRevealed((n) => n + 1)
      } else {
        setIsCorrect(false)
        setState('modal')
        return
      }
    }
    setGuess('')
  }, [guess, player, guessAttempts, clubsRevealed])

  const nextRound = () => {
    setPlayer(getRandomEligible())
    setClubsRevealed(1)
    setGuess('')
    setGuessAttempts(0)
    setWrongGuesses([])
    setState('playing')
    setTimeout(() => inputRef.current?.focus(), 100)
  }

  const pts = Math.max(10 - guessAttempts * 2, 2)

  return (
    <>
    <GameOverlay image="bg-career.png"/>
    <GameLayout title="Career Path" score={score}>
      <div className="w-full max-w-lg mx-auto flex flex-col gap-6">
        <div className="text-center">
          <p className="text-muted-foreground text-sm">Follow the club history — who is this player?</p>
          <p className="text-xs text-muted-foreground mt-1">
            Potential points: <span style={{ color: '#00ff88' }} className="font-bold">{pts}</span>
          </p>
        </div>

        {/* Career timeline */}
        <div
          className="glass rounded-2xl p-6"
          style={{ border: '1px solid rgba(0,255,136,0.15)' }}
        >
          <div className="flex items-center justify-between mb-5">
            <span
              className="text-xs font-bold tracking-widest uppercase text-muted-foreground"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Career Timeline
            </span>
            <span
              className="text-sm font-bold"
              style={{ fontFamily: 'var(--font-display)', color: '#00ff88' }}
            >
              {clubsRevealed} / {player.clubs.length} clubs
            </span>
          </div>

          <div className="relative flex flex-col gap-0">
            <AnimatePresence>
              {player.clubs.slice(0, clubsRevealed).map((club, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: i === clubsRevealed - 1 ? 0.1 : 0 }}
                  className="flex items-center gap-4 relative"
                >
                  {/* Connector line */}
                  {i < clubsRevealed - 1 && (
                    <div
                      className="absolute left-[19px] top-10 w-0.5 h-8 opacity-30"
                      style={{ background: '#00ff88' }}
                    />
                  )}
                  {/* Node */}
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0 z-10"
                    style={{
                      background: i === clubsRevealed - 1 ? 'rgba(0,255,136,0.2)' : 'rgba(0,255,136,0.08)',
                      border: `2px solid ${i === clubsRevealed - 1 ? 'rgba(0,255,136,0.6)' : 'rgba(0,255,136,0.2)'}`,
                      color: '#00ff88',
                      fontFamily: 'var(--font-display)',
                      boxShadow: i === clubsRevealed - 1 ? '0 0 12px rgba(0,255,136,0.3)' : 'none',
                    }}
                  >
                    {i + 1}
                  </div>
                  {/* Club name */}
                  <div
                    className="flex-1 py-3 px-4 rounded-xl mb-3"
                    style={{
                      background: i === clubsRevealed - 1 ? 'rgba(0,255,136,0.08)' : 'rgba(0,255,136,0.03)',
                      border: `1px solid ${i === clubsRevealed - 1 ? 'rgba(0,255,136,0.3)' : 'rgba(0,255,136,0.1)'}`,
                    }}
                  >
                    <p className="font-bold text-sm text-foreground">{club}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Locked clubs */}
            {player.clubs.slice(clubsRevealed).map((_, i) => (
              <div key={`locked-${i}`} className="flex items-center gap-4 opacity-20 mb-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '2px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.3)', fontFamily: 'var(--font-display)' }}
                >
                  {clubsRevealed + i + 1}
                </div>
                <div className="flex-1 py-3 px-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <div className="h-3 w-32 rounded-full bg-muted/30" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Wrong guesses */}
        {wrongGuesses.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {wrongGuesses.map((w, i) => (
              <span
                key={i}
                className="px-3 py-1 rounded-full text-xs font-semibold"
                style={{ background: 'rgba(255,51,85,0.1)', border: '1px solid rgba(255,51,85,0.25)', color: '#ff3355' }}
              >
                {w}
              </span>
            ))}
          </div>
        )}

        {/* Input */}
        <div className={`flex flex-col gap-3 ${shake ? 'shake' : ''}`}>
          <NeonInput
            ref={inputRef}
            placeholder="Type player name..."
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            onSubmit={handleGuess}
            buttonLabel="GUESS"
            autoFocus
          />

          <div className="flex gap-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={revealNext}
              disabled={clubsRevealed >= player.clubs.length}
              className="flex-1 py-3 rounded-xl font-bold text-xs tracking-widest uppercase transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
              style={{
                fontFamily: 'var(--font-display)',
                background: 'rgba(0,170,255,0.08)',
                border: '1px solid rgba(0,170,255,0.25)',
                color: '#00aaff',
              }}
            >
              Next Club {clubsRevealed < player.clubs.length ? `(${player.clubs.length - clubsRevealed} left)` : '(all shown)'}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => { setIsCorrect(false); setState('modal') }}
              className="px-4 py-3 rounded-xl font-bold text-xs tracking-widest uppercase transition-all duration-200"
              style={{
                fontFamily: 'var(--font-display)',
                background: 'rgba(255,51,85,0.08)',
                border: '1px solid rgba(255,51,85,0.2)',
                color: '#ff3355',
              }}
            >
              Give Up
            </motion.button>
          </div>
        </div>
      </div>

      <ResultModal
        open={state === 'modal'}
        correct={isCorrect}
        playerName={player.name}
        message={isCorrect ? `Revealed ${clubsRevealed} of ${player.clubs.length} clubs.` : 'Better luck on the next career path!'}
        pointsEarned={isCorrect ? pts : 0}
        onNext={nextRound}
        onHome={() => router.push('/')}
      />
    </GameLayout>
    </>
  )
}
