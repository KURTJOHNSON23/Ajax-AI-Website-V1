"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const bullets = [
  "Sounds natural — not robotic",
  "Works 24/7, never calls in sick",
  "Books appointments directly into your calendar",
  "Handles FAQs and objections",
];

export default function VoiceAI() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section id="voice-ai" className="py-24 bg-[#0D1526]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="font-dm text-xs uppercase tracking-widest text-cyan-400 mb-3 block">
              Voice AI
            </span>
            <h2 className="font-syne font-bold text-4xl md:text-5xl text-white mb-6">
              AI Voice Agents That Sound Human
            </h2>
            <p className="font-dm text-white/50 leading-relaxed mb-8">
              Our voice agents use ElevenLabs voices and are deployed via Retell AI — they
              can answer inbound calls, qualify callers, and handle objections
              naturally.
            </p>

            <ul className="space-y-3 mb-10">
              {bullets.map((bullet, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="flex items-center gap-3 font-dm text-white/70"
                >
                  <span className="w-5 h-5 rounded-full bg-cyan-400/10 border border-cyan-400/30 flex items-center justify-center flex-shrink-0">
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                      <path d="M1 4l3 3 5-6" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  {bullet}
                </motion.li>
              ))}
            </ul>

            <button
              onClick={() => setModalOpen(true)}
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-cyan-400/10 border border-cyan-400/40 text-cyan-400 font-dm font-medium rounded-md hover:bg-cyan-400 hover:text-navy-900 hover:border-cyan-400 transition-all duration-200"
            >
              <PlayIcon />
              Hear a Demo Call
            </button>
          </motion.div>

          {/* Right — animated phone */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex justify-center"
          >
            <AnimatedPhone />
          </motion.div>
        </div>
      </div>

      {/* Demo modal */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4"
            onClick={() => setModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-navy-800 border border-white/10 rounded-2xl p-8 w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-syne font-bold text-white text-xl">Demo Call</h3>
                <button
                  onClick={() => setModalOpen(false)}
                  className="text-white/40 hover:text-white transition-colors"
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="15" y1="5" x2="5" y2="15" />
                    <line x1="5" y1="5" x2="15" y2="15" />
                  </svg>
                </button>
              </div>
              <div className="bg-navy-700 rounded-xl p-4 mb-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-cyan-400/10 border border-cyan-400/30 flex items-center justify-center">
                  <PlayIcon />
                </div>
                <div>
                  <p className="font-dm text-sm text-white font-medium">Ajax AI Demo Agent</p>
                  <p className="font-dm text-xs text-white/40">Inbound qualification call</p>
                </div>
              </div>
              <audio controls className="w-full rounded-lg" aria-label="Demo call audio">
                <source src="" type="audio/mpeg" />
                Your browser does not support audio.
              </audio>
              <p className="font-dm text-xs text-white/30 mt-3 text-center">
                Full demo available on request — book a call below.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function PlayIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
      <path d="M4 2l10 6-10 6V2z" />
    </svg>
  );
}

function AnimatedPhone() {
  const bars = [0.3, 0.6, 1.0, 0.7, 0.4, 0.8, 0.5, 1.0, 0.6, 0.3, 0.7, 0.9, 0.4, 0.6, 0.8];

  return (
    <div className="relative">
      <div className="absolute inset-0 bg-cyan-400/8 blur-3xl rounded-full" />
      <div className="relative w-56 bg-navy-800 border border-white/10 rounded-3xl p-5 shadow-2xl">
        <div className="w-16 h-1 bg-white/10 rounded-full mx-auto mb-4" />

        {/* Caller */}
        <div className="text-center mb-5">
          <div className="w-14 h-14 rounded-full bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center mx-auto mb-2">
            <span className="font-syne font-bold text-cyan-400 text-lg">AI</span>
          </div>
          <p className="font-syne font-bold text-white text-sm">Ajax AI Assistant</p>
          <p className="font-dm text-xs text-green-400 mt-0.5">● Active call</p>
        </div>

        {/* Waveform */}
        <div className="flex items-end gap-0.5 h-12 mb-4 px-2">
          {bars.map((h, i) => (
            <div
              key={i}
              className="flex-1 bg-cyan-400 rounded-sm origin-bottom"
              style={{
                height: `${h * 100}%`,
                animation: `barWave ${0.8 + (i % 5) * 0.18}s ease-in-out infinite`,
                animationDelay: `${i * 0.07}s`,
              }}
            />
          ))}
        </div>

        {/* Transcript */}
        <div className="space-y-2">
          <div className="bg-navy-700 rounded-lg px-3 py-2 text-left">
            <p className="font-dm text-[10px] text-white/40 mb-0.5">AI Agent</p>
            <p className="font-dm text-xs text-white/70">&quot;Hi, I&apos;m calling about your quote...&quot;</p>
          </div>
          <div className="bg-cyan-400/10 border border-cyan-400/10 rounded-lg px-3 py-2 text-left">
            <p className="font-dm text-[10px] text-cyan-400/60 mb-0.5">Customer</p>
            <p className="font-dm text-xs text-white/70">&quot;Yes, I&apos;m still interested!&quot;</p>
          </div>
        </div>
      </div>
    </div>
  );
}
