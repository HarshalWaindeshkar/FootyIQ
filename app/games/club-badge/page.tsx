"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GameLayout from "@/components/GameLayout";
import NeonInput from "@/components/NeonInput";
import { useRouter } from "next/navigation";
import clubs from "@/data/clubs.json";
import GameOverlay from "@/components/layout/GameOverlay";

// ── helpers ─────────────────────────────

function normalise(s: string) {
  return s
    .toLowerCase()
    .replace(/fc\s|cf\s|afc\s|fk\s|sc\s/g, "")
    .replace(/[^a-z0-9\s]/g, "")
    .trim();
}

function isCorrectGuess(guess: string, clubName: string): boolean {
  const g = normalise(guess);
  const c = normalise(clubName);
  return c.includes(g) || g.includes(c);
}

// ── difficulty config ───────────────────

const DIFFICULTY_CONFIG = {
  easy: { label: "Easy", blur: 4, points: 10, color: "#00ff88" },
  medium: { label: "Medium", blur: 10, points: 20, color: "#ffaa00" },
  hard: { label: "Hard", blur: 18, points: 30, color: "#ff3355" },
};

type Difficulty = "easy" | "medium" | "hard";
type Phase = "select" | "playing" | "between";

// ── component ───────────────────────────

export default function ClubBadgePage() {
  const router = useRouter();

  const [phase, setPhase] = useState<Phase>("select");
  const [difficulty, setDifficulty] = useState<Difficulty>("easy");
  const [currentClub, setCurrentClub] = useState<any>(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [guess, setGuess] = useState("");
  const [blur, setBlur] = useState(12);
  const [lastResult, setLastResult] = useState<"correct" | "wrong" | null>(
    null,
  );

  const inputRef = useRef<HTMLInputElement>(null);

  const getRandomClub = () => clubs[Math.floor(Math.random() * clubs.length)];

  const startGame = (diff: Difficulty) => {
    setDifficulty(diff);
    setScore(0);
    setStreak(0);
    setGuess("");
    setBlur(DIFFICULTY_CONFIG[diff].blur);
    setCurrentClub(getRandomClub());
    setPhase("playing");

    setTimeout(() => inputRef.current?.focus(), 100);
  };

  useEffect(() => {
    if (phase !== "playing") return;

    const interval = setInterval(() => {
      setBlur((prev) => Math.max(prev - 2, 0));
    }, 2000);

    return () => clearInterval(interval);
  }, [currentClub, phase]);

  const handleGuess = useCallback(() => {
    if (!currentClub || !guess.trim()) return;

    if (isCorrectGuess(guess, currentClub.name)) {
      setScore((s) => s + DIFFICULTY_CONFIG[difficulty].points);
      setStreak((s) => s + 1);
      setLastResult("correct");
    } else {
      setStreak(0);
      setLastResult("wrong");
    }

    setGuess("");
    setPhase("between");
  }, [guess, currentClub, difficulty]);

  const handleGiveUp = () => {
    setLastResult("wrong");
    setPhase("between");
  };

  const nextClub = () => {
    setCurrentClub(getRandomClub());
    setBlur(DIFFICULTY_CONFIG[difficulty].blur);
    setLastResult(null);
    setPhase("playing");

    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const cfg = DIFFICULTY_CONFIG[difficulty];

  return (
    <>
    <GameOverlay image ="/bg-club.png"/>
    <GameLayout title="Club Badge Guess" score={score}>
      <AnimatePresence mode="wait">
        {/* 🎮 Difficulty Select */}
        {phase === "select" && (
          <motion.div
            key="select"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="flex flex-col gap-4 items-center">
              {(["easy", "medium", "hard"] as Difficulty[]).map((d) => (
                <button
                  key={d}
                  onClick={() => startGame(d)}
                  className="px-6 py-3 rounded-xl font-bold"
                  style={{
                    background: DIFFICULTY_CONFIG[d].color,
                    color: "#000",
                  }}
                >
                  {DIFFICULTY_CONFIG[d].label}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* 🎯 GAME */}
        {(phase === "playing" || phase === "between") && currentClub && (
          <motion.div
            key="game"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center gap-6"
          >
            {/* 🃏 FIFA STYLE CARD */}
            <div
              className="relative flex items-center justify-center rounded-2xl overflow-hidden"
              style={{
                width: "260px",
                height: "260px",
                background: "linear-gradient(135deg, #0d1b3e, #050810)",
                border:
                  phase === "between"
                    ? lastResult === "correct"
                      ? "2px solid rgba(0,255,136,0.7)"
                      : "2px solid rgba(255,51,85,0.6)"
                    : "1px solid rgba(0,170,255,0.2)",
                boxShadow:
                  phase === "between"
                    ? lastResult === "correct"
                      ? "0 0 40px rgba(0,255,136,0.3)"
                      : "0 0 40px rgba(255,51,85,0.25)"
                    : "0 0 20px rgba(0,170,255,0.1)",
              }}
            >
              <motion.img
                src={currentClub.logo}
                alt={currentClub.name}
                className="w-3/5 h-3/5 object-contain"
                style={{
                  filter: `blur(${blur}px)`,
                  transition: "filter 0.6s ease",
                }}
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "https://ui-avatars.com/api/?name=Club";
                }}
              />

              {/* Reveal */}
              {phase === "between" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute bottom-4"
                >
                  <span
                    className="px-4 py-1 rounded-xl text-sm font-bold uppercase"
                    style={{
                      background:
                        lastResult === "correct"
                          ? "rgba(0,255,136,0.15)"
                          : "rgba(255,51,85,0.15)",
                      color: lastResult === "correct" ? "#00ff88" : "#ff3355",
                    }}
                  >
                    {currentClub.name}
                  </span>
                </motion.div>
              )}
            </div>

            {/* ✏️ INPUT */}
            {phase === "playing" ? (
              <>
                <NeonInput
                  ref={inputRef}
                  placeholder="Guess the club..."
                  value={guess}
                  onChange={(e) => setGuess(e.target.value)}
                  onSubmit={handleGuess}
                  buttonLabel="GUESS"
                />

                {/* GIVE UP */}
                <button
                  onClick={handleGiveUp}
                  className="text-xs text-red-400 hover:text-red-300"
                >
                  Give Up
                </button>
              </>
            ) : (
              <div className="flex flex-col items-center gap-4">
                {lastResult === "correct" ? (
                  <p className="text-green-400 text-lg font-bold">GOAL! ⚽</p>
                ) : (
                  <p className="text-red-400 text-lg font-bold">
                    Missed! It was {currentClub.name}
                  </p>
                )}

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={nextClub}
                  className="px-6 py-2 rounded-lg"
                  style={{
                    background: "rgba(0,170,255,0.2)",
                    border: "1px solid rgba(0,170,255,0.5)",
                    color: "#00aaff",
                  }}
                >
                  Next Club
                </motion.button>
              </div>
            )}

            {/* SCORE + STREAK */}
            <div className="text-sm text-muted-foreground">
              Score: {score} | Streak: {streak}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </GameLayout>
    </>
  );
}
