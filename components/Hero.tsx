"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const typingWords = [
  "Quote Follow-Ups",
  "Missed Call Responses",
  "Calendar Booking",
  "Lead Nurturing",
];

function useTypewriter(words: string[], speed = 80, pause = 1800) {
  const [displayed, setDisplayed] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[wordIdx];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && charIdx < word.length) {
      timeout = setTimeout(() => setCharIdx((c) => c + 1), speed);
    } else if (!deleting && charIdx === word.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => setCharIdx((c) => c - 1), speed / 2);
    } else if (deleting && charIdx === 0) {
      setDeleting(false);
      setWordIdx((i) => (i + 1) % words.length);
    }

    setDisplayed(word.slice(0, charIdx));
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, wordIdx, words, speed, pause]);

  return displayed;
}

export default function Hero() {
  const typed = useTypewriter(typingWords);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-navy-900 grid-bg"
    >
      {/* Radial glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-400/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-cyan-400/3 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-16 grid md:grid-cols-2 gap-12 items-center w-full">
        {/* Left — text */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-400/30 text-cyan-400 text-xs font-dm font-medium mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              AI-Powered Agency · London
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
            className="font-syne font-extrabold text-5xl md:text-6xl lg:text-7xl text-white leading-tight mb-6"
          >
            Every Call Answered.{" "}
            <span className="text-cyan-400">Every Job Booked.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="font-dm text-lg text-white/60 mb-6 max-w-lg leading-relaxed"
          >
            Ajax AI builds AI-powered systems that handle your follow-ups,
            bookings, and client calls — so you don&apos;t have to.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
            className="flex items-center gap-2 font-dm text-base text-white/50 mb-8 h-8"
          >
            <span>Automating:</span>
            <span className="text-cyan-400 font-medium min-w-[200px]">
              {typed}
              <span className="animate-pulse">|</span>
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-4 mb-8"
          >
            <a
              href="#how-it-works"
              className="inline-flex items-center justify-center px-7 py-3.5 bg-cyan-400 text-navy-900 font-dm font-semibold rounded-md hover:bg-cyan-500 transition-colors duration-200"
            >
              See How It Works
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center px-7 py-3.5 border border-white/20 text-white font-dm font-medium rounded-md hover:border-cyan-400/50 hover:text-cyan-400 transition-colors duration-200"
            >
              Book a Free Call
            </a>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.55 }}
            className="font-dm text-xs text-white/30"
          >
            Serving London businesses · Built on Make.com, ElevenLabs &amp; Twilio
          </motion.p>
        </div>

        {/* Right — phone mockup */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" }}
          className="hidden md:flex justify-center items-center"
        >
          <PhoneMockup />
        </motion.div>
      </div>
    </section>
  );
}

function PhoneMockup() {
  return (
    <div className="relative">
      {/* Glow behind phone */}
      <div className="absolute inset-0 bg-cyan-400/10 blur-3xl rounded-full scale-75" />

      {/* Phone frame */}
      <div className="relative w-64 bg-navy-800 border border-white/10 rounded-3xl p-4 shadow-2xl">
        {/* Phone notch */}
        <div className="w-20 h-1.5 bg-white/10 rounded-full mx-auto mb-4" />

        {/* Status */}
        <div className="flex items-center gap-2 mb-4 px-1">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="font-dm text-xs text-white/50">AI Calling...</span>
        </div>

        {/* Call card */}
        <div className="bg-navy-700 border border-cyan-400/20 rounded-xl p-4 mb-3">
          <p className="font-syne font-bold text-white text-sm mb-1">Sarah Johnson</p>
          <p className="font-dm text-xs text-white/40 mb-3">Lead · Solar Co.</p>
          <div className="flex items-end gap-1 h-8 mb-2">
            {[0.4, 0.7, 1.0, 0.6, 0.9, 0.5, 0.8, 0.4, 0.7, 1.0, 0.6, 0.3].map((h, i) => (
              <div
                key={i}
                className="flex-1 bg-cyan-400 rounded-sm origin-bottom"
                style={{
                  height: `${h * 100}%`,
                  animation: "barWave 1.2s ease-in-out infinite",
                  animationDelay: `${i * 0.08}s`,
                }}
              />
            ))}
          </div>
          <p className="font-dm text-xs text-cyan-400">Booking appointment...</p>
        </div>

        {/* Info card */}
        <div className="bg-navy-700/50 border border-white/5 rounded-xl p-3 mb-3">
          <p className="font-dm text-xs text-white/40 mb-1">Next Action</p>
          <p className="font-dm text-xs text-white">Confirm slot: Mon 10am ✓</p>
        </div>

        {/* Automation badge */}
        <div className="flex items-center gap-2 bg-cyan-400/10 rounded-lg px-3 py-2">
          <span className="text-cyan-400 text-xs">⚡</span>
          <span className="font-dm text-xs text-cyan-400">Handled automatically</span>
        </div>
      </div>
    </div>
  );
}
