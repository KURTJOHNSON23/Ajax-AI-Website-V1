"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const stats = [
  { value: 50, suffix: "+", label: "Hours Saved Per Client Monthly" },
  { value: 24, suffix: "/7", label: "AI Coverage" },
  { value: 7, suffix: "-Day", label: "Build Time" },
  { value: 150, prefix: "£", suffix: "/mo", label: "Starting Price" },
];

function useCountUp(target: number, duration = 1500, active = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;
    const start = performance.now();
    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [active, target, duration]);

  return count;
}

function StatItem({
  stat,
  active,
  delay,
}: {
  stat: (typeof stats)[0];
  active: boolean;
  delay: number;
}) {
  const count = useCountUp(stat.value, 1400, active);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="text-center"
    >
      <div className="font-syne font-extrabold text-4xl md:text-5xl text-cyan-400 mb-1">
        {stat.prefix ?? ""}
        {count}
        {stat.suffix}
      </div>
      <div className="font-dm text-sm text-white/50">{stat.label}</div>
    </motion.div>
  );
}

export default function StatsBar() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-16 bg-navy-800 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <StatItem key={stat.label} stat={stat} active={active} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
}
