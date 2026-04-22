"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type GameLayoutProps = {
  title: string;
  score: number;
  timer?: number;
  showTimer?: boolean;
  children: React.ReactNode;
  onTimeUp?: () => void;
};

export default function GameLayout({
  title,
  score,
  timer,
  showTimer = false,
  children,
  onTimeUp,
}: GameLayoutProps) {
  const [timeLeft, setTimeLeft] = useState(timer ?? 0);
  const timeUpCalled = useRef(false);

  useEffect(() => {
    setTimeLeft(timer ?? 0);
    timeUpCalled.current = false;
  }, [timer]);

  useEffect(() => {
    if (!showTimer) return;

    const id = setInterval(() => {
      setTimeLeft((t) => (t <= 1 ? 0 : t - 1));
    }, 1000);

    return () => clearInterval(id);
  }, [showTimer]);

  useEffect(() => {
    if (!showTimer || timeLeft !== 0 || timeUpCalled.current) return;
    timeUpCalled.current = true;
    onTimeUp?.();
  }, [showTimer, timeLeft, onTimeUp]);

  const timerColor =
    timeLeft > 7 ? "#00aaff" : timeLeft > 3 ? "#ffaa00" : "#ff3355";
  const timerPct = timer ? (timeLeft / timer) * 100 : 100;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top HUD bar */}
      <div className="glass border-b border-border sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
          {/* Back */}
          <Link
            href="/"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm font-semibold tracking-widest uppercase"
            style={{ fontFamily: "var(--font-display)" }}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="w-4 h-4"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                d="M19 12H5M12 5l-7 7 7 7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="hidden sm:inline">Back</span>
          </Link>

          {/* Title */}
          <h1
            className="text-lg font-bold tracking-widest uppercase text-glow-blue"
            style={{ fontFamily: "var(--font-display)", color: "#00aaff" }}
          >
            {title}
          </h1>

          {/* Score */}
          <div className="flex items-center gap-3">
            {showTimer && (
              <div className="relative flex items-center gap-2">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border-2"
                  style={{
                    borderColor: timerColor,
                    color: timerColor,
                    boxShadow: `0 0 12px ${timerColor}44`,
                    fontFamily: "var(--font-display)",
                    background: `${timerColor}11`,
                  }}
                >
                  {timeLeft}
                </div>
              </div>
            )}
            <div
              className="glass px-4 py-1.5 rounded-lg border border-primary/30 flex items-center gap-2"
              style={{ boxShadow: "0 0 12px rgba(0,170,255,0.15)" }}
            >
              <svg viewBox="0 0 24 24" fill="#00aaff" className="w-4 h-4">
                <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
              </svg>
              <span
                className="font-bold text-sm tracking-widest"
                style={{ fontFamily: "var(--font-display)", color: "#00aaff" }}
              >
                {score}
              </span>
            </div>
          </div>
        </div>

        {/* Timer progress bar */}
        {showTimer && (
          <motion.div
            className="h-0.5 origin-left"
            animate={{ scaleX: timerPct / 100 }}
            transition={{ duration: 0.3 }}
            style={{
              background: timerColor,
              boxShadow: `0 0 6px ${timerColor}`,
            }}
          />
        )}
      </div>

      {/* Main content */}
      <main className="flex-1 flex flex-col items-center justify-center p-4 py-8 max-w-4xl mx-auto w-full">
        {children}
      </main>
    </div>
  );
}
