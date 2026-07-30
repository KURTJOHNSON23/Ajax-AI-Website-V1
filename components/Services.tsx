"use client";

import { motion } from "framer-motion";

const services = [
  {
    icon: <PhoneWaveIcon />,
    title: "AI Voice Agents",
    description:
      "AI Voice Agents that answer calls, qualify leads, and book appointments 24/7.",
  },
  {
    icon: <FlowchartIcon />,
    title: "Workflow Automation",
    description:
      "End-to-end automations that connect your CRM, calendar, and messaging in one flow.",
  },
  {
    icon: <LeadCaptureIcon />,
    title: "Lead Capturing",
    description:
      "Every enquiry from your website, calls, and forms captured and logged in your CRM instantly.",
  },
];

export default function Services() {
  return (
    <section id="services" className="py-24 bg-navy-900 solar-cells">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="font-dm text-xs uppercase tracking-widest text-cyan-400 mb-3 block">
            Our Services · Built for Solar
          </span>
          <h2 className="font-syne font-bold text-4xl md:text-5xl text-white">
            What Ajax AI Does
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group relative bg-navy-800 border border-white/5 rounded-2xl p-8 hover:border-cyan-400/30 transition-all duration-300 hover:shadow-[0_0_40px_rgba(0,212,255,0.08)] cursor-default"
            >
              <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-cyan-400/10 border border-cyan-400/20 mb-5 text-cyan-400 group-hover:bg-cyan-400/15 transition-colors duration-300">
                {service.icon}
              </div>
              <h3 className="font-syne font-bold text-xl text-white mb-3">
                {service.title}
              </h3>
              <p className="font-dm text-white/50 leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PhoneWaveIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.95 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012.88 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L7.09 8.66a16 16 0 006.29 6.29l1.02-1.02a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
      <path d="M15 2c2.8.5 4.5 2.2 5 5M15 6a3 3 0 013 3" />
    </svg>
  );
}

function FlowchartIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="5" cy="12" r="2" />
      <circle cx="19" cy="5" r="2" />
      <circle cx="19" cy="19" r="2" />
      <line x1="7" y1="11" x2="17" y2="6" />
      <line x1="7" y1="13" x2="17" y2="18" />
    </svg>
  );
}

function LeadCaptureIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M3 4h18l-7 8v7l-4 2v-9L3 4z" strokeLinejoin="round" />
      <circle cx="18.5" cy="17.5" r="3.5" />
      <path d="M18.5 16v3M17 17.5h3" strokeLinecap="round" />
    </svg>
  );
}
