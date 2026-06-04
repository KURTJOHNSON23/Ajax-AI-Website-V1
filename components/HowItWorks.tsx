"use client";

import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    icon: <CalendarIcon />,
    title: "Discovery Call",
    description:
      "We map your current workflow and identify the highest-impact automation opportunities.",
  },
  {
    number: "02",
    icon: <WrenchIcon />,
    title: "We Build It",
    description:
      "Your custom automation is built in Make.com, connected to your tools, and tested end-to-end.",
  },
  {
    number: "03",
    icon: <RocketIcon />,
    title: "You Grow",
    description:
      "Go live in days, not months. We monitor, optimise, and scale as your business grows.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-navy-900">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="font-dm text-xs uppercase tracking-widest text-cyan-400 mb-3 block">
            The Process
          </span>
          <h2 className="font-syne font-bold text-4xl md:text-5xl text-white">
            From Zero to Automated in 7 Days
          </h2>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line (desktop) */}
          <div className="hidden md:block absolute top-16 left-[calc(16.66%+2rem)] right-[calc(16.66%+2rem)] h-px bg-white/5">
            <motion.div
              initial={{ width: "0%" }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.4 }}
              className="h-full bg-gradient-to-r from-cyan-400/40 to-cyan-400/10 relative"
            >
              {/* Travelling dot */}
              <motion.div
                initial={{ left: "0%" }}
                animate={{ left: "100%" }}
                transition={{ duration: 3, ease: "linear", repeat: Infinity, delay: 1 }}
                className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(0,212,255,0.8)]"
              />
            </motion.div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="flex flex-col items-center text-center"
              >
                {/* Icon circle */}
                <div className="relative mb-8">
                  <div className="w-16 h-16 rounded-full bg-navy-800 border border-cyan-400/30 flex items-center justify-center text-cyan-400 shadow-[0_0_20px_rgba(0,212,255,0.1)]">
                    {step.icon}
                  </div>
                  <span className="absolute -top-2 -right-2 font-syne font-bold text-xs text-cyan-400/50 bg-navy-900 px-1">
                    {step.number}
                  </span>
                </div>

                <h3 className="font-syne font-bold text-xl text-white mb-3">
                  {step.title}
                </h3>
                <p className="font-dm text-white/50 leading-relaxed max-w-xs">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CalendarIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function WrenchIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
    </svg>
  );
}

function RocketIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 00-2.91-.09zM12 15l-3-3a22 22 0 012-3.95A12.88 12.88 0 0122 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 01-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </svg>
  );
}
