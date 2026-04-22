"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";

type GameCardProps = {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
  index?: number;
  bgImage?: string;
};

export default function GameCardEnhanced({
  title,
  description,
  href,
  icon,
  index = 0,
  bgImage,
}: GameCardProps) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * 10;
    const rotateY = ((x - centerX) / centerX) * -10;

    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.1 }}
      whileHover={{ y: -10, scale: 1.02 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onHoverStart={() => setIsHovered(true)}
      style={{
        perspective: 1200,
        transformStyle: "preserve-3d",
        transform: isHovered
          ? `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateZ(20px)`
          : "rotateX(0) rotateY(0) translateZ(0)",
      }}
      className="group"
    >
      <Link href={href} className="block h-full">
        <div
          className="relative h-full min-h-[280px] rounded-2xl overflow-hidden transition-all duration-300 border"
          style={{
            borderColor: "rgba(0, 170, 255, 0.4)",
            boxShadow: isHovered
              ? "0 0 20px rgba(0, 170, 255, 0.5), 0 20px 60px rgba(0, 170, 255, 0.2), inset 0 1px 0 rgba(0, 255, 136, 0.1)"
              : "0 0 10px rgba(0, 170, 255, 0.2), 0 10px 30px rgba(0, 170, 255, 0.05)",
            backgroundColor: "rgba(10, 15, 31, 0.5)",
            backdropFilter: "blur(12px)",
          }}
        >
          {/* Background image */}
          {bgImage && (
            <div className="absolute inset-0 z-0">
              <img
                src={bgImage}
                alt=""
                className="w-full h-full object-cover opacity-10 group-hover:opacity-20 transition-opacity duration-500"
              />
            </div>
          )}

          {/* Gradient overlay */}
          <div
            className="absolute inset-0 z-0 opacity-40 group-hover:opacity-60 transition-opacity"
            style={{
              background:
                "linear-gradient(135deg, rgba(0, 170, 255, 0.1) 0%, rgba(0, 255, 136, 0.05) 100%)",
            }}
          />

          {/* Top accent line */}
          <div
            className="absolute top-0 left-0 right-0 h-1 z-10 opacity-0 group-hover:opacity-100 transition-all"
            style={{
              background:
                "linear-gradient(90deg, transparent, #00aaff, transparent)",
              boxShadow: "0 0 20px rgba(0, 170, 255, 0.5)",
            }}
          />

          {/* Content */}
          <div className="relative z-10 p-6 md:p-8 flex flex-col h-full gap-4">
            {/* Top row: icon + badge */}
            <div className="flex items-start justify-between">
              <motion.div
                className="w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center transition-all"
                style={{
                  background: "rgba(0, 170, 255, 0.15)",
                  border: "1px solid rgba(0, 170, 255, 0.4)",
                  color: "#00aaff",
                  boxShadow: "0 0 15px rgba(0, 170, 255, 0.2)",
                }}
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <span className="text-xl md:text-2xl">{icon}</span>
              </motion.div>

              {/* Badge */}
              <div
                className="px-3 py-1 rounded-lg text-xs font-bold tracking-wider"
                style={{
                  background: "rgba(0, 170, 255, 0.1)",
                  border: "1px solid rgba(0, 170, 255, 0.3)",
                  color: "#00aaff",
                  boxShadow: "0 0 10px rgba(0, 170, 255, 0.15)",
                }}
              >
                {index === 0
                  ? "🔥 HOT"
                  : index === 1
                    ? "⚡ FUN"
                    : index === 2
                      ? "✨ NEW"
                      : "🎮 PLAY"}
              </div>
            </div>

            {/* Text */}
            <div className="flex-1">
              <h3
                className="text-xl md:text-2xl font-black tracking-wide mb-3 uppercase leading-tight"
                style={{ color: "#00aaff" }}
              >
                {title}
              </h3>
              <p className="text-sm md:text-base text-gray-400 leading-relaxed">
                {description}
              </p>
            </div>

            {/* Play button */}
            <motion.div
              className="flex items-center justify-between pt-4 border-t"
              style={{ borderColor: "rgba(230, 57, 70, 0.1)" }}
              whileHover={{ x: 5 }}
            >
              <span className="text-xs font-semibold tracking-widest uppercase text-gray-600">
                Tap to play
              </span>
              <motion.div
                whileHover={{ scale: 1.08, x: 3 }}
                className="flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-xs tracking-widest uppercase"
                style={{
                  background: "rgba(230, 57, 70, 0.15)",
                  border: "1px solid rgba(230, 57, 70, 0.3)",
                  color: "#E63946",
                  boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.4)",
                }}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-3.5 h-3.5"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
                PLAY
              </motion.div>
            </motion.div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
