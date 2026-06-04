"use client";

import { useState } from "react";
import { motion } from "framer-motion";

type FormData = {
  fullName: string;
  businessName: string;
  email: string;
  phone: string;
  businessType: string;
  challenge: string;
  source: string;
};

type Errors = Partial<Record<keyof FormData, string>>;

const initialForm: FormData = {
  fullName: "",
  businessName: "",
  email: "",
  phone: "",
  businessType: "",
  challenge: "",
  source: "",
};

function validate(data: FormData): Errors {
  const errors: Errors = {};
  if (!data.fullName.trim()) errors.fullName = "Full name is required";
  if (!data.businessName.trim()) errors.businessName = "Business name is required";
  if (!data.email.trim()) errors.email = "Email is required";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.email = "Enter a valid email";
  if (!data.phone.trim()) errors.phone = "Phone number is required";
  if (!data.businessType) errors.businessType = "Please select a business type";
  if (!data.challenge.trim()) errors.challenge = "Please describe your challenge";
  if (!data.source) errors.source = "Please let us know how you found us";
  return errors;
}

export default function ContactForm() {
  const [form, setForm] = useState<FormData>(initialForm);
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const set = (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setLoading(true);
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setSubmitted(true);
    } catch {
      // still show success for demo
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  const inputClass = (field: keyof FormData) =>
    `w-full bg-navy-700 border ${errors[field] ? "border-red-500/60" : "border-white/10"} rounded-lg px-4 py-3 font-dm text-sm text-white placeholder-white/30 focus:outline-none focus:border-cyan-400/50 transition-colors`;

  return (
    <section id="contact" className="py-24 bg-navy-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="font-dm text-xs uppercase tracking-widest text-cyan-400 mb-3 block">
              Get In Touch
            </span>
            <h2 className="font-syne font-bold text-4xl md:text-5xl text-white mb-6">
              Let&apos;s Build Your Automation
            </h2>
            <p className="font-dm text-white/50 leading-relaxed mb-10">
              Book a free 20-minute discovery call. We&apos;ll show you exactly what we&apos;d
              automate in your business — and what it would be worth.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-3 font-dm text-sm text-white/60">
                <span className="text-base">📍</span>
                Hampton, London
              </div>
              <div className="flex items-center gap-3 font-dm text-sm text-white/60">
                <span className="text-base">📧</span>
                hello@ajaxautomation.com
              </div>
              <div className="flex items-center gap-3 font-dm text-sm text-white/60">
                <span className="text-base">🌐</span>
                ajaxautomation.com
              </div>
            </div>

            {/* Decorative */}
            <div className="mt-12 p-5 bg-navy-800 border border-white/5 rounded-xl">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="font-dm text-xs text-white/40">Typically respond within 24 hours</span>
              </div>
              <p className="font-dm text-xs text-white/30">
                No commitment required. Just an honest conversation about how automation can help your business.
              </p>
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex flex-col items-center justify-center text-center py-16"
              >
                <div className="w-16 h-16 rounded-full bg-cyan-400/10 border border-cyan-400/30 flex items-center justify-center mb-6">
                  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                    <path d="M5 14l7 7 11-13" stroke="#00D4FF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3 className="font-syne font-bold text-2xl text-white mb-3">
                  Thanks {form.fullName.split(" ")[0]}!
                </h3>
                <p className="font-dm text-white/50">
                  We&apos;ll be in touch within 24 hours to book your discovery call.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      placeholder="Full Name"
                      value={form.fullName}
                      onChange={set("fullName")}
                      className={inputClass("fullName")}
                    />
                    {errors.fullName && <p className="font-dm text-xs text-red-400 mt-1">{errors.fullName}</p>}
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="Business Name"
                      value={form.businessName}
                      onChange={set("businessName")}
                      className={inputClass("businessName")}
                    />
                    {errors.businessName && <p className="font-dm text-xs text-red-400 mt-1">{errors.businessName}</p>}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <input
                      type="email"
                      placeholder="Email Address"
                      value={form.email}
                      onChange={set("email")}
                      className={inputClass("email")}
                    />
                    {errors.email && <p className="font-dm text-xs text-red-400 mt-1">{errors.email}</p>}
                  </div>
                  <div>
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      value={form.phone}
                      onChange={set("phone")}
                      className={inputClass("phone")}
                    />
                    {errors.phone && <p className="font-dm text-xs text-red-400 mt-1">{errors.phone}</p>}
                  </div>
                </div>

                <div>
                  <select
                    value={form.businessType}
                    onChange={set("businessType")}
                    className={inputClass("businessType")}
                  >
                    <option value="" disabled>Business Type</option>
                    <option>Trades &amp; Construction</option>
                    <option>Estate Agent</option>
                    <option>Recruitment</option>
                    <option>Accountancy</option>
                    <option>Other</option>
                  </select>
                  {errors.businessType && <p className="font-dm text-xs text-red-400 mt-1">{errors.businessType}</p>}
                </div>

                <div>
                  <textarea
                    rows={3}
                    placeholder="What's your biggest challenge?"
                    value={form.challenge}
                    onChange={set("challenge")}
                    className={inputClass("challenge")}
                  />
                  {errors.challenge && <p className="font-dm text-xs text-red-400 mt-1">{errors.challenge}</p>}
                </div>

                <div>
                  <select
                    value={form.source}
                    onChange={set("source")}
                    className={inputClass("source")}
                  >
                    <option value="" disabled>How did you hear about us?</option>
                    <option>Google</option>
                    <option>Referral</option>
                    <option>Social Media</option>
                    <option>Cold Outreach</option>
                    <option>Other</option>
                  </select>
                  {errors.source && <p className="font-dm text-xs text-red-400 mt-1">{errors.source}</p>}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-cyan-400 text-navy-900 font-dm font-semibold py-4 rounded-lg hover:bg-cyan-500 transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed text-sm"
                >
                  {loading ? "Sending..." : "Book My Free Call →"}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
