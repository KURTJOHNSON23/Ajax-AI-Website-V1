"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const AI_MONTHLY_COST = 150;

const recoveryOptions = [
  { label: "Conservative", value: 50 },
  { label: "Realistic", value: 65 },
  { label: "Best case", value: 80 },
];

function formatGBP(value: number) {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 0,
  }).format(Math.max(0, Math.round(value)));
}

function useAnimatedNumber(target: number, duration = 600) {
  const [value, setValue] = useState(target);
  const fromRef = useRef(target);
  const frameRef = useRef<number>();

  useEffect(() => {
    const skipAnimation =
      document.hidden ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (skipAnimation) {
      fromRef.current = target;
      setValue(target);
      return;
    }

    const from = fromRef.current;
    const start = performance.now();

    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = from + (target - from) * eased;
      setValue(current);
      fromRef.current = current;
      if (progress < 1) frameRef.current = requestAnimationFrame(step);
    };

    frameRef.current = requestAnimationFrame(step);
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [target, duration]);

  return value;
}

function Slider({
  label,
  value,
  min,
  max,
  step,
  display,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  display: string;
  onChange: (value: number) => void;
}) {
  const pct = ((value - min) / (max - min)) * 100;

  return (
    <div>
      <div className="flex items-baseline justify-between mb-3">
        <label className="font-dm text-sm text-white/60">{label}</label>
        <span className="font-syne font-bold text-lg text-cyan-400">{display}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-label={label}
        className="roi-slider"
        style={{ "--pct": `${pct}%` } as React.CSSProperties}
      />
    </div>
  );
}

function ResultCard({
  label,
  value,
  hint,
  highlight = false,
}: {
  label: string;
  value: string;
  hint?: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-xl p-5 border ${
        highlight
          ? "bg-cyan-400/10 border-cyan-400/30"
          : "bg-navy-700 border-white/5"
      }`}
    >
      <p className="font-dm text-xs uppercase tracking-wider text-white/40 mb-2">
        {label}
      </p>
      <p
        className={`font-syne font-extrabold text-2xl md:text-3xl ${
          highlight ? "text-cyan-400" : "text-white"
        }`}
      >
        {value}
      </p>
      {hint && <p className="font-dm text-xs text-white/35 mt-1.5">{hint}</p>}
    </div>
  );
}

export default function ROICalculator() {
  const [calls, setCalls] = useState(80);
  const [missRate, setMissRate] = useState(25);
  const [jobValue, setJobValue] = useState(7000);
  const [closeRate, setCloseRate] = useState(10);
  const [recovery, setRecovery] = useState(65);

  const missedCalls = (calls * missRate) / 100;
  const lostPerMonth = missedCalls * (closeRate / 100) * jobValue;
  const lostPerYear = lostPerMonth * 12;
  const recoveredPerMonth = lostPerMonth * (recovery / 100);
  const netPerMonth = recoveredPerMonth - AI_MONTHLY_COST;

  const animatedYear = useAnimatedNumber(lostPerYear);
  const animatedMissed = useAnimatedNumber(missedCalls);
  const animatedMonth = useAnimatedNumber(lostPerMonth);
  const animatedRecovered = useAnimatedNumber(recoveredPerMonth);
  const animatedNet = useAnimatedNumber(netPerMonth);

  return (
    <section id="roi-calculator" className="py-24 bg-navy-800">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <span className="font-dm text-xs uppercase tracking-widest text-cyan-400 mb-3 block">
            ROI Calculator
          </span>
          <h2 className="font-syne font-bold text-4xl md:text-5xl text-white mb-5 text-balance">
            What Are Missed Calls Costing You?
          </h2>
          <p className="font-dm text-white/50 leading-relaxed">
            Every unanswered call is a job going to whoever picks up next. Move the
            sliders to match your business and see the number.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="grid lg:grid-cols-2 gap-8 items-start"
        >
          {/* Inputs */}
          <div className="bg-navy-900 border border-white/10 rounded-2xl p-7 md:p-9 space-y-8">
            <Slider
              label="Inbound calls per month"
              value={calls}
              min={10}
              max={500}
              step={5}
              display={String(calls)}
              onChange={setCalls}
            />
            <Slider
              label="Calls you miss"
              value={missRate}
              min={0}
              max={60}
              step={1}
              display={`${missRate}%`}
              onChange={setMissRate}
            />
            <Slider
              label="Average job value"
              value={jobValue}
              min={500}
              max={20000}
              step={250}
              display={formatGBP(jobValue)}
              onChange={setJobValue}
            />
            <Slider
              label="Close rate on answered calls"
              value={closeRate}
              min={1}
              max={50}
              step={1}
              display={`${closeRate}%`}
              onChange={setCloseRate}
            />

            <div className="pt-2 border-t border-white/5">
              <p className="font-dm text-sm text-white/60 mb-3 pt-5">
                How many missed calls AI recovers
              </p>
              <div className="flex gap-2">
                {recoveryOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setRecovery(option.value)}
                    className={`flex-1 min-w-0 px-2 py-2.5 rounded-md font-dm text-xs sm:text-sm transition-all duration-200 border ${
                      recovery === option.value
                        ? "bg-cyan-400 text-navy-900 border-cyan-400 font-medium"
                        : "bg-transparent text-white/50 border-white/10 hover:text-white hover:border-white/25"
                    }`}
                  >
                    {option.label}
                    <span className="block text-xs opacity-70">{option.value}%</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="space-y-5">
            <div className="relative overflow-hidden bg-navy-900 border border-cyan-400/20 rounded-2xl p-8 md:p-9">
              <div className="absolute -top-24 -right-24 w-56 h-56 bg-cyan-400/10 blur-3xl rounded-full pointer-events-none" />
              <p className="relative font-dm text-sm text-white/50 mb-2">
                You are losing roughly
              </p>
              <p className="relative font-syne font-extrabold text-5xl md:text-6xl text-cyan-400 mb-2 tabular-nums">
                {formatGBP(animatedYear)}
              </p>
              <p className="relative font-dm text-sm text-white/50">
                per year in missed opportunities
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <ResultCard
                label="Missed calls / month"
                value={String(Math.round(animatedMissed))}
                hint={`${Math.round(missedCalls * 12)} a year`}
              />
              <ResultCard
                label="Lost revenue / month"
                value={formatGBP(animatedMonth)}
                hint={`${(missedCalls * (closeRate / 100)).toFixed(1)} jobs missed`}
              />
              <ResultCard
                label="Recovered with Ajax AI"
                value={formatGBP(animatedRecovered)}
                hint={`at ${recovery}% recovery`}
              />
              <ResultCard
                label="Net gain / month"
                value={formatGBP(animatedNet)}
                hint={`after ${formatGBP(AI_MONTHLY_COST)}/mo`}
                highlight
              />
            </div>

            <div className="bg-navy-900 border border-white/10 rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
              <p className="font-dm text-sm text-white/60">
                An AI receptionist answers every one of those calls, 24/7.
              </p>
              <a
                href="/#contact"
                className="inline-flex items-center justify-center px-6 py-3 bg-cyan-400 text-navy-900 font-dm font-medium text-sm rounded-md hover:bg-cyan-500 transition-all duration-200 whitespace-nowrap"
              >
                Book a Call
              </a>
            </div>

            <p className="font-dm text-xs text-white/30 leading-relaxed">
              Estimates only, based on the figures you enter. Defaults reflect a solar
              installer at around {formatGBP(7000)} per install. Recovery rate assumes
              the AI answers, qualifies and books calls you would otherwise miss.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
