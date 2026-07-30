export default function Footer() {
  return (
    <footer className="bg-navy-800 border-t border-white/5 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                <path d="M11 2L4 11h6l-1 7 7-9h-6l1-7z" fill="#10B981" stroke="#10B981" strokeWidth="0.5" strokeLinejoin="round" />
              </svg>
              <span className="font-syne font-bold text-lg text-white">
                Ajax <span className="text-cyan-400">AI</span>
              </span>
            </div>
            <p className="font-dm text-sm text-white/40 leading-relaxed">
              AI that works while you sleep.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-syne font-bold text-sm text-white mb-4">Services</h4>
            <ul className="space-y-2">
              {["AI Voice Agents", "Workflow Automation", "Lead Capturing", "Calendar Management"].map((item) => (
                <li key={item}>
                  <a href="#services" className="font-dm text-sm text-white/40 hover:text-white/70 transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-syne font-bold text-sm text-white mb-4">Company</h4>
            <ul className="space-y-2">
              {[
                { label: "How It Works", href: "#how-it-works" },
                { label: "Contact", href: "#contact" },
              ].map((item) => (
                <li key={item.label}>
                  <a href={item.href} className="font-dm text-sm text-white/40 hover:text-white/70 transition-colors">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-syne font-bold text-sm text-white mb-4">Contact</h4>
            <ul className="space-y-2">
              <li className="font-dm text-sm text-white/40">Hampton, London</li>
              <li>
                <a href="mailto:admin@ajaxai.solutions" className="font-dm text-sm text-white/40 hover:text-white/70 transition-colors">
                  admin@ajaxai.solutions
                </a>
              </li>
              <li>
                <a href="https://ajaxai.solutions" className="font-dm text-sm text-white/40 hover:text-white/70 transition-colors">
                  ajaxai.solutions
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="font-dm text-xs text-white/30">
            © 2026 Ajax AI Solutions. Hampton, London.
          </p>
          <p className="font-dm text-xs text-white/20">
            Built with Make.com · ElevenLabs · Twilio
          </p>
        </div>
      </div>
    </footer>
  );
}
