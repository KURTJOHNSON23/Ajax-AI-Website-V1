"use client";

import { motion } from "framer-motion";

const automations = [
  {
    title: "AI Booking & Rescheduling",
    badge: "24/7 coverage",
    description:
      "Your AI receptionist handles inbound calls, books appointments, and sends confirmations — even at midnight.",
    steps: [
      "Inbound call",
      "AI answers & qualifies",
      "Books slot in calendar",
      "Confirmation + reminder sent",
    ],
  },
  {
    title: "Never Lose a Quote Again",
    badge: "Saves 4 hrs/week",
    description:
      "When a lead goes cold, Ajax triggers a multi-step follow-up with automated emails and SMS reminders — all without lifting a finger.",
    steps: [
      "Customer calls to request quote",
      "Quote sent + logged in CRM",
      "Follow-up email (Day 1)",
      "SMS reminder (Day 3)",
      "Email + SMS nudge (Day 5)",
      "Quote accepted",
    ],
  },
  {
    title: "Nurture Every Lead on Autopilot",
    badge: "10x response rate",
    description:
      "Leads get the right message at the right time. Fully personalised, fully automated — from first touch to booked call.",
    steps: [
      "New lead captured",
      "Tagged in CRM",
      "Email 1 — Welcome",
      "Email 2 — Case Study (+3d)",
      "Email 3 — Offer (+7d)",
      "Call booked",
    ],
  },
];

export default function Automations() {
  return (
    <section id="automations" className="py-24 bg-navy-800">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="font-dm text-xs uppercase tracking-widest text-cyan-400 mb-3 block">
            Use Cases
          </span>
          <h2 className="font-syne font-bold text-4xl md:text-5xl text-white">
            Real Automations. Real Results.
          </h2>
        </motion.div>

        <div className="flex flex-col gap-6">
          {automations.map((automation, i) => (
            <motion.div
              key={automation.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="bg-navy-900 border border-white/5 rounded-2xl p-8 hover:border-cyan-400/20 transition-all duration-300"
            >
              <div className="flex flex-col lg:flex-row lg:items-start gap-8">
                {/* Title + description */}
                <div className="lg:w-72 flex-shrink-0">
                  <div className="flex items-start gap-3 mb-3">
                    <h3 className="font-syne font-bold text-xl text-white">
                      {automation.title}
                    </h3>
                  </div>
                  <p className="font-dm text-white/50 text-sm leading-relaxed mb-4">
                    {automation.description}
                  </p>
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-cyan-400/10 border border-cyan-400/20 text-cyan-400 text-xs font-dm font-medium">
                    ⚡ {automation.badge}
                  </span>
                </div>

                {/* Flow diagram */}
                <div className="flex-1">
                  <FlowDiagram steps={automation.steps} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FlowDiagram({ steps }: { steps: string[] }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {steps.map((step, i) => (
        <div key={i} className="flex items-center gap-2">
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-cyan-400/20 border border-cyan-400/40 flex items-center justify-center flex-shrink-0">
                <span className="text-cyan-400 text-[10px] font-syne font-bold">{i + 1}</span>
              </div>
              <div className="bg-navy-700 border border-white/8 rounded-lg px-3 py-2">
                <span className="font-dm text-xs text-white/70 whitespace-nowrap">{step}</span>
              </div>
            </div>
          </div>
          {i < steps.length - 1 && (
            <svg width="16" height="10" viewBox="0 0 16 10" className="text-cyan-400/40 flex-shrink-0">
              <path d="M0 5h13M9 1l5 4-5 4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </div>
      ))}
    </div>
  );
}
