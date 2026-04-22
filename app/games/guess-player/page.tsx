'use client'

import { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import GameLayout from '@/components/GameLayout'
import NeonInput from '@/components/NeonInput'
import ResultModal from '@/components/ResultModal'
import PlayerImage from '@/components/PlayerImage'
import { getRandomPlayer, type Player } from '@/lib/players'
import { useRouter } from 'next/navigation'
import GameOverlay from "@/components/layout/GameOverlay";

type GameState = 'playing' | 'modal'

function initGame(): { player: Player; hintsRevealed: number; used: number } {
  return { player: getRandomPlayer(), hintsRevealed: 1, used: 0 }
}


export default function GuessPlayerPage() {
  const router = useRouter()
  const [score, setScore] = useState(0)
  const [{ player, hintsRevealed, used }, setGame] = useState(initGame)
  const [guess, setGuess] = useState('')
  const [state, setState] = useState<GameState>('playing')
  const [isCorrect, setIsCorrect] = useState(false)
  const [shake, setShake] = useState(false)
  const [correctFlash, setCorrectFlash] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const revealHint = () => {
    if (hintsRevealed < player.hints.length) {
      setGame((g) => ({ ...g, hintsRevealed: g.hintsRevealed + 1, used: g.used + 1 }))
    }
  }

  const handleGuess = useCallback(() => {
    if (!guess.trim()) return
    const correct = guess.trim().toLowerCase() === player.name.toLowerCase() ||
      player.name.toLowerCase().includes(guess.trim().toLowerCase())

    if (correct) {
      const pts = Math.max(10 - used * 2, 2)
      setScore((s) => s + pts)
      setIsCorrect(true)
      setCorrectFlash(true)
      setTimeout(() => setCorrectFlash(false), 800)
    } else {
      setIsCorrect(false)
      setShake(true)
      setTimeout(() => setShake(false), 500)
      setGame((g) => ({ ...g, used: g.used + 1 }))
      if (hintsRevealed < player.hints.length) {
        setGame((g) => ({ ...g, hintsRevealed: Math.min(g.hintsRevealed + 1, player.hints.length), used: g.used }))
      } else {
        // out of hints - game over for this round
        setState('modal')
        return
      }
    }

    setGuess('')
    if (correct) setState('modal')
  }, [guess, player, used, hintsRevealed])

  const nextRound = () => {
    setGame(initGame())
    setGuess('')
    setState('playing')
    setTimeout(() => inputRef.current?.focus(), 100)
  }

  const pts = Math.max(10 - used * 2, 2)

  return (
    <>
    <GameOverlay image="/bg-guess.png" />
    <GameLayout title="Guess the Player" score={score}>
      <div className="w-full max-w-lg mx-auto flex flex-col gap-6">
        {/* FUT-style mystery player card */}
        <div className="flex flex-col items-center gap-2">
          <div
            className="relative w-32 h-40 rounded-2xl overflow-hidden"
            style={{
              border: correctFlash ? '2px solid rgba(0,255,136,0.7)' : '2px solid rgba(0,170,255,0.3)',
              boxShadow: correctFlash
                ? '0 0 30px rgba(0,255,136,0.5)'
                : '0 0 20px rgba(0,170,255,0.2)',
              background: 'linear-gradient(160deg, #0d1b3e, #050810)',
            }}
          >
            {/* Silhouette / blurred player image */}
            <PlayerImage
              src={player.image}
              name={player.name}
              className="w-full h-full"
              blurAmount={correctFlash ? 0 : 999}
              objectPosition="top center"
              style={{ filter: correctFlash ? 'none' : 'brightness(0.05) contrast(2) blur(0px)' }}
            />
            {/* Mystery overlay */}
            {!correctFlash && (
              <div className="absolute inset-0 flex items-center justify-center" style={{ background: 'rgba(5,8,16,0.7)' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="#00aaff" strokeWidth={1.2} className="w-14 h-14 opacity-30">
                  <circle cx="12" cy="8" r="4" />
                  <path d="M4 20c0-4 3.58-7 8-7s8 3 8 7" strokeLinecap="round" />
                </svg>
              </div>
            )}
            {/* Position badge */}
            <div
              className="absolute bottom-2 left-0 right-0 flex justify-center"
            >
              <span
                className="px-2 py-0.5 rounded text-xs font-black tracking-widest"
                style={{ fontFamily: 'var(--font-display)', background: 'rgba(5,8,16,0.85)', color: '#00aaff', border: '1px solid rgba(0,170,255,0.3)' }}
              >
                {correctFlash ? player.position.toUpperCase() : '???'}
              </span>
            </div>
          </div>
          <p className="text-xs text-muted-foreground tracking-widest uppercase" style={{ fontFamily: 'var(--font-display)' }}>
            Who am I? &bull; <span style={{ color: '#00aaff' }}>{pts} pts</span> available
          </p>
        </div>

        {/* Hints list */}
        <div
          className={`glass rounded-2xl p-6 border transition-all duration-300 ${correctFlash ? 'correct-flash' : ''}`}
          style={{ border: correctFlash ? '1px solid rgba(0,255,136,0.5)' : '1px solid rgba(0,170,255,0.15)' }}
        >
          <div className="flex items-center justify-between mb-4">
            <span
              className="text-xs font-bold tracking-widest uppercase text-muted-foreground"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Hints Revealed
            </span>
            <span
              className="text-sm font-bold"
              style={{ fontFamily: 'var(--font-display)', color: '#00aaff' }}
            >
              {hintsRevealed} / {player.hints.length}
            </span>
          </div>

          <div className="flex flex-col gap-3">
            <AnimatePresence>
              {player.hints.slice(0, hintsRevealed).map((hint, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-start gap-3 p-3 rounded-xl"
                  style={{ background: 'rgba(0,170,255,0.05)', border: '1px solid rgba(0,170,255,0.1)' }}
                >
                  <span
                    className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5"
                    style={{ background: 'rgba(0,170,255,0.15)', color: '#00aaff', fontFamily: 'var(--font-display)' }}
                  >
                    {i + 1}
                  </span>
                  <p className="text-sm text-foreground leading-relaxed">{hint}</p>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Locked hints */}
            {player.hints.slice(hintsRevealed).map((_, i) => (
              <div
                key={`locked-${i}`}
                className="flex items-center gap-3 p-3 rounded-xl opacity-30"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                <span className="w-5 h-5 rounded-full flex items-center justify-center text-xs shrink-0"
                  style={{ background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.3)' }}>
                  {hintsRevealed + i + 1}
                </span>
                <div className="flex-1 h-3 rounded-full bg-muted/30" />
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
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
              onClick={revealHint}
              disabled={hintsRevealed >= player.hints.length}
              className="flex-1 py-3 rounded-xl font-bold text-xs tracking-widest uppercase transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
              style={{
                fontFamily: 'var(--font-display)',
                background: 'rgba(0,255,136,0.08)',
                border: '1px solid rgba(0,255,136,0.25)',
                color: '#00ff88',
              }}
            >
              Reveal Hint {hintsRevealed < player.hints.length ? `(${player.hints.length - hintsRevealed} left)` : '(none left)'}
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
              Skip
            </motion.button>
          </div>
        </div>

        {/* Wrong guess indicator */}
        {used > 0 && (
          <p className="text-center text-xs text-muted-foreground">
            Wrong guesses:{' '}
            <span style={{ color: '#ff3355' }} className="font-bold">{used}</span>
          </p>
        )}
      </div>

      <ResultModal
        open={state === 'modal'}
        correct={isCorrect}
        playerName={player.name}
        message={isCorrect ? `You guessed in ${used + 1} attempt${used !== 0 ? 's' : ''}!` : `Better luck next time!`}
        pointsEarned={isCorrect ? pts : 0}
        onNext={nextRound}
        onHome={() => router.push('/')}
      />
    </GameLayout>
    </>
  )
}
