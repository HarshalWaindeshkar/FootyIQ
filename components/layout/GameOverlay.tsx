"use client";

export default function GameOverlay({ image }: { image: string }) {
  return (
    <>
      {/* Override Background */}
      <div
        className="fixed inset-0 bg-cover bg-center -z-20"
        style={{ backgroundImage: `url(${image})` }}
      />

      {/* Blur */}
      <div className="fixed inset-0 backdrop-blur-[6px] -z-10" />

      {/* Dark overlay */}
      <div className="fixed inset-0 bg-black/50 -z-10" />
    </>
  );
}
