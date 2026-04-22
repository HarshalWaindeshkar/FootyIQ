"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import GameCardEnhanced from "@/components/game/GameCardEnhanced";

const GAMES = [
  {
    title: "Guess the Player",
    description:
      "Unlock hints one by one and guess the mystery footballer before you run out of clues.",
    href: "/games/guess-player",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        className="w-6 h-6"
      >
        <circle cx="12" cy="8" r="4" />
        <path d="M4 20c0-4 3.58-7 8-7s8 3 8 7" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Career Path",
    description:
      "Follow a player's club history. Guess who they are before their full career is revealed.",
    href: "/games/career-path",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        className="w-6 h-6"
      >
        <path
          d="M3 12h4l3-9 4 18 3-9h4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "Blur Challenge",
    description:
      "A player photo gradually sharpens — can you name them before it's crystal clear?",
    href: "/games/blur-challenge",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        className="w-6 h-6"
      >
        <circle cx="11" cy="11" r="8" />
        <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Higher or Lower",
    description:
      "Compare two players' career goals or market value. One wrong answer ends the run.",
    href: "/games/higher-lower",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        className="w-6 h-6"
      >
        <path
          d="M7 16V4m0 0L4 7m3-3l3 3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M17 8v12m0 0l3-3m-3 3l-3-3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "Club Badge Guess",
    description:
      "Identify the football club from its blurred badge. Three difficulty levels — can you ace all of them?",
    href: "/games/club-badge",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        className="w-6 h-6"
      >
        <path
          d="M12 2L4 6v6c0 5.25 3.5 9.74 8 11 4.5-1.26 8-5.75 8-11V6l-8-4z"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

export default function HomePage() {
  const router = useRouter();

  const handleRandomChallenge = () => {
    const games = GAMES.map((g) => g.href);
    const rand = games[Math.floor(Math.random() * games.length)];
    router.push(rand);
  };

  return (
    <div className="relative min-h-screen">
      <Navbar />

      <main className="relative z-10 pt-16 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section with Football3D */}
          <section className="mb-20">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 mb-6 bg-primary/5 backdrop-blur-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                <span
                  className="text-xs font-bold tracking-[0.2em] uppercase text-primary"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Football Challenges
                </span>
              </div>

              {/* Main Title */}
              <h1
                className="text-6xl sm:text-7xl md:text-8xl font-black tracking-tight mb-4 leading-none"
                style={{ fontFamily: "var(--font-display)" }}
              >
                <span style={{ color: "#00aaff" }}>FOOTY</span>
                <span style={{ color: "#00ff88" }}>IQ</span>
              </h1>

              <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed mb-12">
                Test your football knowledge with 5 unique mini-games. From
                career paths to club badges — every game is a new challenge.
              </p>

              {/* Random Challenge CTA */}
              <motion.button
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleRandomChallenge}
                className="inline-flex items-center gap-3 px-8 py-4 rounded-xl font-bold text-sm tracking-widest uppercase transition-all duration-200"
                style={{
                  fontFamily: "var(--font-display)",
                  background:
                    "linear-gradient(135deg, rgba(0,170,255,0.2), rgba(0,255,136,0.1))",
                  color: "#00aaff",
                  border: "1px solid rgba(0, 170, 255, 0.4)",
                  boxShadow:
                    "0 0 25px rgba(0, 170, 255, 0.25), inset 0 1px 0 rgba(0, 255, 136, 0.1)",
                }}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  className="w-5 h-5"
                >
                  <path
                    d="M16 3h5v5M8 3H3v5M21 21l-5-5M3 21l5-5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path d="M12 12m-3 0a3 3 0 106 0 3 3 0 10-6 0" />
                </svg>
                Random Challenge
              </motion.button>
            </motion.div>
          </section>

          {/* Game Cards Grid */}
          <section>
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-xs font-bold tracking-[0.3em] uppercase mb-8 text-center"
              style={{ fontFamily: "var(--font-display)", color: "#00aaff" }}
            >
              Choose Your Challenge
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
              {GAMES.map((game, i) => (
                <motion.div
                  key={game.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.4 }}
                >
                  <GameCardEnhanced
                    title={game.title}
                    description={game.description}
                    href={game.href}
                    icon={game.icon}
                  />
                </motion.div>
              ))}
            </div>
          </section>

          {/* Stats Bar */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="rounded-2xl border p-8"
            style={{
              background: "rgba(10, 15, 31, 0.6)",
              border: "1px solid rgba(0, 170, 255, 0.2)",
              backdropFilter: "blur(12px)",
              boxShadow: "0 0 20px rgba(0, 170, 255, 0.1)",
            }}
          >
            <div className="grid grid-cols-3 gap-8 text-center">
              {[
                { value: "5", label: "Mini Games" },
                { value: "100", label: "Players" },
                { value: "∞", label: "Challenges" },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col gap-2">
                  <span
                    className="text-4xl font-black"
                    style={{
                      fontFamily: "var(--font-display)",
                      color: "#00aaff",
                      textShadow: "0 0 20px rgba(0, 170, 255, 0.4)",
                    }}
                  >
                    {stat.value}
                  </span>
                  <span
                    className="text-xs text-muted-foreground tracking-widest uppercase"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </motion.section>
        </div>
      </main>
    </div>
  );
}
