'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import GameLayout from '@/components/GameLayout'
import NeonInput from '@/components/NeonInput'
import ResultModal from '@/components/ResultModal'
import PlayerImage from '@/components/PlayerImage'
import { getRandomPlayer, type Player } from '@/lib/players'
import { useRouter } from 'next/navigation'
import GameOverlay from "@/components/layout/GameOverlay";

const TIMER_DURATION = 15
const MAX_BLUR = 20
const BLUR_REDUCTION_INTERVAL = 2500 // ms

type GameState = 'playing' | 'modal'

function initGame() {
  return { player: getRandomPlayer(), blur: MAX_BLUR, attempts: 0 }
}

export default function BlurChallengePage() {
  const router = useRouter()
  const [score, setScore] = useState(0)
  const [{ player, blur, attempts }, setGame] = useState(initGame)
  const [guess, setGuess] = useState('')
  const [state, setState] = useState<GameState>('playing')
  const [isCorrect, setIsCorrect] = useState(false)
  const [shake, setShake] = useState(false)
  const [timeKey, setTimeKey] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const blurIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  // Progressive unblur
  useEffect(() => {
    if (state !== 'playing') return
    blurIntervalRef.current = setInterval(() => {
      setGame((g) => {
        const newBlur = Math.max(g.blur - 2, 0)
        return { ...g, blur: newBlur }
      })
    }, BLUR_REDUCTION_INTERVAL)
    return () => {
      if (blurIntervalRef.current) clearInterval(blurIntervalRef.current)
    }
  }, [state, player])

  const handleTimeUp = useCallback(() => {
    if (state !== 'playing') return
    setIsCorrect(false)
    setState('modal')
    if (blurIntervalRef.current) clearInterval(blurIntervalRef.current)
  }, [state])

  const handleGuess = useCallback(() => {
    if (!guess.trim()) return
    const correct =
      guess.trim().toLowerCase() === player.name.toLowerCase() ||
      player.name.toLowerCase().includes(guess.trim().toLowerCase())

    if (correct) {
      const pts = Math.max(10 - attempts * 2, 1)
      setScore((s) => s + pts)
      setIsCorrect(true)
      if (blurIntervalRef.current) clearInterval(blurIntervalRef.current)
      setState('modal')
    } else {
      setGame((g) => ({ ...g, attempts: g.attempts + 1 }))
      setShake(true)
      setTimeout(() => setShake(false), 500)
    }
    setGuess('')
  }, [guess, player, attempts])

  const nextRound = () => {
    setGame(initGame())
    setGuess('')
    setState('playing')
    setTimeKey((k) => k + 1)
    setTimeout(() => inputRef.current?.focus(), 100)
  }

  const pts = Math.max(10 - attempts * 2, 1)

  return (
    <>
    <GameOverlay image="bg-blur.png"/>
    <GameLayout
      title="Blur Challenge"
      score={score}
      timer={TIMER_DURATION}
      showTimer
      key={timeKey}
      onTimeUp={handleTimeUp}
    >
      <div className="w-full max-w-md mx-auto flex flex-col gap-6">
        <div className="text-center">
          <p className="text-muted-foreground text-sm">
            The image gets clearer every 2.5 seconds — guess fast!
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Potential points: <span style={{ color: '#00aaff' }} className="font-bold">{pts}</span>
            {' '}· Blur: <span style={{ color: '#00ff88' }}>{blur}px</span>
          </p>
        </div>

        {/* Player image with blur */}
        <div
          className="relative glass rounded-2xl overflow-hidden"
          style={{
            border: '1px solid rgba(0,170,255,0.2)',
            aspectRatio: '1 / 1.1',
          }}
        >
          {/* Scanlines overlay */}
          <div className="absolute inset-0 scanlines z-10 pointer-events-none" />

          <PlayerImage
            src={player.image}
            name={player.name}
            alt="Mystery player"
            className="w-full h-full"
            blurAmount={blur}
            objectPosition="top center"
          />

          {/* Blur overlay with gradient */}
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to top, rgba(5,8,16,0.8) 0%, transparent 40%)',
              zIndex: 5,
            }}
          />

          {/* Blur indicator */}
          <div
            className="absolute top-3 right-3 z-20 px-2 py-1 rounded-lg text-xs font-bold"
            style={{
              fontFamily: 'var(--font-display)',
              background: 'rgba(5,8,16,0.8)',
              border: `1px solid ${blur > 10 ? 'rgba(0,170,255,0.4)' : blur > 4 ? 'rgba(255,170,0,0.4)' : 'rgba(0,255,136,0.4)'}`,
              color: blur > 10 ? '#00aaff' : blur > 4 ? '#ffaa00' : '#00ff88',
            }}
          >
            {blur === 0 ? 'CLEAR' : `${blur}px blur`}
          </div>

          {/* Attempts indicator */}
          {attempts > 0 && (
            <div
              className="absolute bottom-3 left-3 z-20 px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5"
              style={{ background: 'rgba(5,8,16,0.8)', border: '1px solid rgba(255,51,85,0.3)', color: '#ff3355' }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-3 h-3">
                <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
              </svg>
              {attempts} wrong
            </div>
          )}
        </div>

        {/* Blur progress bar */}
        <div className="flex items-center gap-3">
          <span className="text-xs text-muted-foreground" style={{ fontFamily: 'var(--font-display)' }}>BLURRY</span>
          <div className="flex-1 h-1.5 rounded-full bg-muted/30 overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              animate={{ width: `${((MAX_BLUR - blur) / MAX_BLUR) * 100}%` }}
              transition={{ duration: 0.8 }}
              style={{ background: 'linear-gradient(90deg, #00aaff, #00ff88)' }}
            />
          </div>
          <span className="text-xs text-muted-foreground" style={{ fontFamily: 'var(--font-display)' }}>CLEAR</span>
        </div>

        {/* Input */}
        <div className={shake ? 'shake' : ''}>
          <NeonInput
            ref={inputRef}
            placeholder="Who is this player?"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            onSubmit={handleGuess}
            buttonLabel="GUESS"
            autoFocus
          />
        </div>
      </div>

      <ResultModal
        open={state === 'modal'}
        correct={isCorrect}
        playerName={player.name}
        message={isCorrect ? `Image was ${blur}px blurred when you got it!` : 'Time\'s up! Better luck next round.'}
        pointsEarned={isCorrect ? pts : 0}
        onNext={nextRound}
        onHome={() => router.push('/')}
      />
    </GameLayout>
    </>
  )
}
