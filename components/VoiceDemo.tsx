"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RetellWebClient } from "retell-client-js-sdk";

// Replace this with your Retell agent ID once you've created the plumber demo agent
const DEMO_AGENT_ID = "agent_78e598ed92378032a776a2989f";

type CallStatus = "idle" | "connecting" | "active" | "ended" | "error";

export default function VoiceDemo() {
  const [status, setStatus] = useState<CallStatus>("idle");
  const [duration, setDuration] = useState(0);
  const clientRef = useRef<RetellWebClient | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      clientRef.current?.stopCall();
    };
  }, []);

  async function startCall() {
    if (DEMO_AGENT_ID === "YOUR_AGENT_ID_HERE") {
      setStatus("error");
      return;
    }

    setStatus("connecting");

    try {
      const res = await fetch("/api/demo-call", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ agentId: DEMO_AGENT_ID }),
      });

      if (!res.ok) throw new Error("Failed to create call");

      const { access_token } = await res.json();

      const client = new RetellWebClient();
      clientRef.current = client;

      client.on("call_started", () => {
        setStatus("active");
        setDuration(0);
        timerRef.current = setInterval(() => setDuration((d) => d + 1), 1000);
      });

      client.on("call_ended", () => {
        setStatus("ended");
        if (timerRef.current) clearInterval(timerRef.current);
      });

      client.on("error", () => {
        setStatus("error");
        if (timerRef.current) clearInterval(timerRef.current);
      });

      await client.startCall({ accessToken: access_token });
    } catch {
      setStatus("error");
    }
  }

  function endCall() {
    clientRef.current?.stopCall();
    setStatus("ended");
    if (timerRef.current) clearInterval(timerRef.current);
  }

  function reset() {
    setStatus("idle");
    setDuration(0);
  }

  const formatTime = (s: number) =>
    `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 py-32">
      {/* Header */}
      <div className="text-center mb-16 max-w-2xl">
        <span className="inline-block font-dm text-xs font-medium text-[#10B981] tracking-widest uppercase mb-4 px-3 py-1 border border-[#10B981]/30 rounded-full bg-[#10B981]/5">
          Live Demo
        </span>
        <h1 className="font-syne font-bold text-4xl md:text-5xl text-white mb-5 leading-tight">
          Hear the AI in action
        </h1>
        <p className="font-dm text-white/60 text-lg leading-relaxed">
          This is a real AI receptionist handling a plumbing business. Click the button and it will answer your call — just like it would for one of our clients.
        </p>
      </div>

      {/* Scenario card */}
      <div className="w-full max-w-md mb-10">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <p className="font-syne font-bold text-xs text-white/40 uppercase tracking-widest mb-4">The scenario</p>
          <div className="space-y-3">
            {[
              { icon: "🏢", label: "Business", value: "Swift Flow Plumbing" },
              { icon: "🎯", label: "Task", value: "Book a job — leak repair" },
              { icon: "🤖", label: "Handled by", value: "Ajax AI Voice Agent" },
            ].map(({ icon, label, value }) => (
              <div key={label} className="flex items-center gap-3">
                <span className="text-lg w-7">{icon}</span>
                <span className="font-dm text-sm text-white/40 w-24">{label}</span>
                <span className="font-dm text-sm text-white">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Call button area */}
      <div className="flex flex-col items-center gap-6">
        <AnimatePresence mode="wait">
          {status === "idle" && (
            <motion.button
              key="start"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={startCall}
              className="relative w-24 h-24 rounded-full bg-[#10B981] hover:bg-[#0ea372] transition-colors duration-200 flex items-center justify-center shadow-lg shadow-[#10B981]/30 group"
            >
              <PhoneIcon className="w-9 h-9 text-white" />
              <span className="absolute -bottom-8 font-dm text-sm text-white/50 group-hover:text-white/80 transition-colors">
                Start demo
              </span>
            </motion.button>
          )}

          {status === "connecting" && (
            <motion.div
              key="connecting"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-4"
            >
              <div className="w-24 h-24 rounded-full border-2 border-[#10B981]/40 flex items-center justify-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
                  className="w-8 h-8 border-2 border-[#10B981] border-t-transparent rounded-full"
                />
              </div>
              <p className="font-dm text-sm text-white/50">Connecting…</p>
            </motion.div>
          )}

          {status === "active" && (
            <motion.div
              key="active"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-6"
            >
              {/* Pulse ring */}
              <div className="relative">
                <motion.div
                  animate={{ scale: [1, 1.4, 1], opacity: [0.4, 0, 0.4] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 rounded-full bg-[#10B981]/30"
                />
                <div className="relative w-24 h-24 rounded-full bg-[#10B981]/20 border border-[#10B981]/50 flex items-center justify-center">
                  <WaveformIcon className="w-10 h-10 text-[#10B981]" />
                </div>
              </div>
              <div className="text-center">
                <p className="font-dm text-sm text-[#10B981] mb-1">Live call in progress</p>
                <p className="font-syne font-bold text-2xl text-white tabular-nums">{formatTime(duration)}</p>
              </div>
              <button
                onClick={endCall}
                className="flex items-center gap-2 px-6 py-3 bg-red-500/20 border border-red-500/40 text-red-400 rounded-full font-dm text-sm hover:bg-red-500/30 transition-colors"
              >
                <PhoneOffIcon className="w-4 h-4" />
                End call
              </button>
            </motion.div>
          )}

          {status === "ended" && (
            <motion.div
              key="ended"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-5 text-center"
            >
              <div className="w-20 h-20 rounded-full bg-[#10B981]/10 border border-[#10B981]/30 flex items-center justify-center">
                <CheckIcon className="w-9 h-9 text-[#10B981]" />
              </div>
              <div>
                <p className="font-syne font-bold text-xl text-white mb-1">Call ended</p>
                <p className="font-dm text-sm text-white/50">
                  {duration > 0 ? `Duration: ${formatTime(duration)}` : ""}
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={reset}
                  className="px-5 py-2.5 border border-white/20 text-white/70 rounded-full font-dm text-sm hover:border-white/40 hover:text-white transition-colors"
                >
                  Try again
                </button>
                <a
                  href="/#contact"
                  className="px-5 py-2.5 bg-[#10B981] text-white rounded-full font-dm text-sm hover:bg-[#0ea372] transition-colors"
                >
                  Get this for my business
                </a>
              </div>
            </motion.div>
          )}

          {status === "error" && (
            <motion.div
              key="error"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-4 text-center"
            >
              <div className="w-20 h-20 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center">
                <XIcon className="w-9 h-9 text-red-400" />
              </div>
              <div>
                <p className="font-syne font-bold text-lg text-white mb-1">
                  {DEMO_AGENT_ID === "YOUR_AGENT_ID_HERE" ? "Demo not configured yet" : "Something went wrong"}
                </p>
                <p className="font-dm text-sm text-white/50">
                  {DEMO_AGENT_ID === "YOUR_AGENT_ID_HERE"
                    ? "The agent ID needs to be added before this demo goes live."
                    : "Please try again in a moment."}
                </p>
              </div>
              <button
                onClick={reset}
                className="px-5 py-2.5 border border-white/20 text-white/70 rounded-full font-dm text-sm hover:border-white/40 hover:text-white transition-colors"
              >
                Go back
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Disclaimer */}
      <p className="mt-16 font-dm text-xs text-white/25 text-center max-w-sm">
        This is a live AI call powered by Ajax AI. Calls may be limited to 3 minutes. Your browser will request microphone access.
      </p>
    </section>
  );
}

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8 19.79 19.79 0 01.01 1.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
    </svg>
  );
}

function PhoneOffIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.68 13.31a16 16 0 003.01 3.01l1.27-1.27a2 2 0 012.11-.45c.907.34 1.85.573 2.81.7A2 2 0 0122 17.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07" />
      <path d="M13.31 10.68A16 16 0 0010.3 7.67L9.03 8.94a2 2 0 01-2.11.45 12.05 12.05 0 01-2.81-.7A2 2 0 012 6.69V3.68A2 2 0 014.18 1.7 19.79 19.79 0 017.25 4.77" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );
}

function WaveformIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M2 12h2M6 8v8M10 5v14M14 9v6M18 6v12M22 12h-2" />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}
