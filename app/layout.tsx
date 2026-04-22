import type { Metadata } from "next";
import { Barlow, Rajdhani } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { StreamerProvider } from "@/lib/streamer-context";
import ParticleBackground from "@/components/three/ParticleBackground";
import "./globals.css";

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-barlow",
});

const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-rajdhani",
});

export const metadata: Metadata = {
  title: "FootyIQ — Football Challenges",
  description: "Test your football knowledge with FIFA-style mini-games",
};

export const viewport = {
  themeColor: "#050810",
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${barlow.variable} ${rajdhani.variable}`}>
      <body className="relative min-h-screen overflow-x-hidden font-sans antialiased text-foreground">
        {/* 🖼️ STADIUM BACKGROUND */}
        <div
          className="fixed inset-0 bg-cover bg-center -z-20"
          style={{ backgroundImage: "url('/bg.png')" }}
        />

        {/* 🌫️ BLUR LAYER */}
        <div className="fixed inset-0 backdrop-blur-[6px] -z-10" />

        {/* 🌑 DARK CINEMATIC OVERLAY */}
        <div className="fixed inset-0 bg-black/50 -z-10" />

        {/* ✨ PARTICLES */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <ParticleBackground />
        </div>

        {/* 📦 CONTENT */}
        <div className="relative z-10">
          <StreamerProvider>{children}</StreamerProvider>
        </div>

        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  );
}
