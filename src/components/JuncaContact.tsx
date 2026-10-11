import React, { useState, useEffect } from 'react';

interface JuncaContactProps {
  initialService?: string;
}

export default function JuncaContact({ initialService }: JuncaContactProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: initialService || 'Flutter & Android App Development',
    budget: '$1,000 - $3,000',
    message: ''
  });

  useEffect(() => {
    if (initialService) {
      setFormData(prev => ({ ...prev, service: initialService }));
    }
  }, [initialService]);

  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText('rahad.mondal@vbd.com.bd');
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Prepare pre-filled WhatsApp message
    const waText = encodeURIComponent(
      `Hello Bengal IT Agency Bangladesh!\n\n` +
      `Name: ${formData.name}\n` +
      `Email: ${formData.email}\n` +
      `Service: ${formData.service}\n` +
      `Budget: ${formData.budget}\n` +
      `Details: ${formData.message}`
    );
    window.open(`https://wa.me/8801410075921?text=${waText}`, '_blank');
    setSubmitted(true);
  };

  return (
    <section className="py-24 md:py-32 border-t border-[var(--line)]" id="contact">
      <div className="container-junca">
        {/* Header */}
        <div className="max-w-3xl mb-16 md:mb-20">
          <p className="eyebrow dot-label mb-4">Start a Project</p>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-medium tracking-tight text-[var(--fg)] leading-[1.02]">
            Let’s engineer something remarkable together.
          </h2>
          <p className="mt-6 text-base md:text-lg text-[var(--fg-2)] leading-relaxed max-w-2xl">
            Whether you need a high-performance Flutter Android app, a bespoke web application, or an authoritative cybersecurity audit, our engineers are ready to build.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          {/* Left Column: Direct Agency Channels */}
          <div className="lg:col-span-5 space-y-6 sm:space-y-8">
            <div className="p-5 sm:p-8 rounded bg-[var(--surface-card)] border border-[var(--line)] space-y-6">
              <p className="font-heading font-medium text-lg text-[var(--fg)]">
                Direct Contact Channels
              </p>

              {/* Email */}
              <div className="space-y-1">
                <span className="text-xs uppercase font-mono tracking-wider text-[var(--fg-3)]">
                  Primary Email
                </span>
                <div className="flex flex-wrap sm:flex-nowrap items-center justify-between gap-3 pt-1">
                  <a
                    href="mailto:rahad.mondal@vbd.com.bd"
                    className="text-base sm:text-lg font-heading text-[var(--fg)] hover:text-[var(--red)] transition-colors break-all"
                  >
                    rahad.mondal@vbd.com.bd
                  </a>
                  <button
                    type="button"
                    onClick={copyEmail}
                    className="text-xs font-mono uppercase px-3 py-1.5 border border-[var(--line)] rounded hover:border-[var(--red)] hover:text-[var(--red)] transition-colors flex-none"
                    aria-label="Copy email address"
                  >
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="space-y-1 pt-2 border-t border-[var(--line)]">
                <span className="text-xs uppercase font-mono tracking-wider text-[var(--fg-3)]">
                  WhatsApp Support
                </span>
                <div className="pt-1">
                  <a
                    href="https://wa.me/8801410075921"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base sm:text-lg font-heading text-[var(--fg)] hover:text-[var(--red)] transition-colors inline-flex items-center gap-2"
                  >
                    +880 1410 075921
                    <svg className="w-4 h-4 text-[var(--red)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M7 7h10v10M7 17 17 7" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className="space-y-1 pt-2 border-t border-[var(--line)]">
                <span className="text-xs uppercase font-mono tracking-wider text-[var(--fg-3)]">
                  Telephone Call
                </span>
                <div className="pt-1">
                  <a
                    href="tel:+8801407592175"
                    className="text-base sm:text-lg font-heading text-[var(--fg)] hover:text-[var(--red)] transition-colors inline-flex items-center gap-2"
                  >
                    +880 1407 592175
                  </a>
                </div>
              </div>

              {/* Agency Location & Availability */}
              <div className="space-y-1 pt-2 border-t border-[var(--line)]">
                <span className="text-xs uppercase font-mono tracking-wider text-[var(--fg-3)]">
                  Location & Availability
                </span>
                <p className="text-sm text-[var(--fg-2)] pt-1">
                  Dhaka, Bangladesh · Online-Based Agency · Active Worldwide
                </p>
                <div className="inline-flex items-center gap-2 text-xs font-mono text-[var(--red)] pt-1">
                  <span className="w-2 h-2 rounded-full bg-[var(--red)] animate-pulse" />
                  Currently Accepting New Projects (Q2-Q4 2026)
                </div>
              </div>
            </div>

            {/* Quick WhatsApp Jump */}
            <div className="p-4 sm:p-6 rounded border border-[var(--line)] bg-[var(--bg-main)] flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
              <div>
                <p className="font-heading font-medium text-[var(--fg)]">Prefer instant messaging?</p>
                <p className="text-xs text-[var(--fg-2)] mt-0.5">Average response time: &lt; 15 minutes</p>
              </div>
              <a
                href="https://wa.me/8801410075921"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 text-xs uppercase font-mono tracking-wider bg-[var(--ink)] text-white dark:bg-white dark:text-black rounded hover:bg-[var(--red)] dark:hover:bg-[var(--red)] dark:hover:text-white transition-colors self-start sm:self-auto"
              >
                Chat Now →
              </a>
            </div>
          </div>

          {/* Right Column: Swiss Editorial Briefing Form */}
          <div className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              className="p-5 sm:p-8 md:p-10 rounded bg-[var(--surface-card)] border border-[var(--line)] space-y-6"
            >
              <div className="space-y-2">
                <h3 className="font-heading text-xl md:text-2xl text-[var(--fg)]">
                  Project Inquiry & Consultation
                </h3>
                <p className="text-xs font-mono text-[var(--fg-3)] uppercase tracking-wider">
                  Fill in your requirements below for an architectural breakdown
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[var(--fg-2)] mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Tanvir Ahmed"
                    className="w-full bg-[var(--bg-main)] border border-[var(--line)] rounded px-4 py-3 text-base sm:text-sm text-[var(--fg)] focus:outline-none focus:border-[var(--red)] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[var(--fg-2)] mb-2">
                    Work Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@company.com"
                    className="w-full bg-[var(--bg-main)] border border-[var(--line)] rounded px-4 py-3 text-base sm:text-sm text-[var(--fg)] focus:outline-none focus:border-[var(--red)] transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[var(--fg-2)] mb-2">
                    Primary Service *
                  </label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full bg-[var(--bg-main)] border border-[var(--line)] rounded px-4 py-3 text-base sm:text-sm text-[var(--fg)] focus:outline-none focus:border-[var(--red)] transition-colors"
                  >
                    <option>Custom Web & E-Commerce BD (WordPress / Laravel / React)</option>
                    <option>Flutter & Android App Development (60-120 FPS Native)</option>
                    <option>Facebook Problem Solving & ID Security (Page Restriction Fix)</option>
                    <option>Cyber Security Audit & Malware Removal BD</option>
                    <option>Linux VPS, Server Setup & Cloud Hosting</option>
                    <option>AI Development & Custom Bot Solutions (Telegram/Messenger)</option>
                    <option>Custom Enterprise Software Solution</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[var(--fg-2)] mb-2">
                    Estimated Budget (USD)
                  </label>
                  <select
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full bg-[var(--bg-main)] border border-[var(--line)] rounded px-4 py-3 text-base sm:text-sm text-[var(--fg)] focus:outline-none focus:border-[var(--red)] transition-colors"
                  >
                    <option>$500 - $1,000</option>
                    <option>$1,000 - $3,000</option>
                    <option>$3,000 - $7,000</option>
                    <option>$7,000+</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[var(--fg-2)] mb-2">
                  Project Details / Scope *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us about the project goals, target audience, core features, or technical requirements..."
                  className="w-full bg-[var(--bg-main)] border border-[var(--line)] rounded px-4 py-3 text-base sm:text-sm text-[var(--fg)] focus:outline-none focus:border-[var(--red)] transition-colors resize-none"
                />
              </div>

              {submitted && (
                <div className="p-3 bg-green-500/10 border border-green-500/30 rounded text-xs text-green-600 dark:text-green-400">
                  ✓ Inquiry transmitted! A direct WhatsApp conversation has also opened to connect with our lead architect.
                </div>
              )}

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full min-h-[50px] sm:h-[54px] py-3 px-4 rounded border border-[var(--ink)] bg-[var(--ink)] text-white hover:bg-[var(--red)] hover:border-[var(--red)] transition-colors font-heading text-sm sm:text-base font-medium flex items-center justify-center gap-3 cursor-pointer dark:bg-white dark:text-black dark:hover:bg-[var(--red)] dark:hover:text-white dark:border-white text-center"
                >
                  <span>Submit Inquiry & Open WhatsApp</span>
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M7 7h10v10M7 17 17 7" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
