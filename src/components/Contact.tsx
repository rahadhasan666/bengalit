import React, { useState, useEffect } from 'react';
import {
  Mail,
  Phone,
  MessageCircle,
  Send,
  CheckCircle2,
  Copy,
  Check,
  ArrowUpRight,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import type { ContactFormData } from '../types';

interface ContactProps {
  initialService?: string;
}

export const Contact: React.FC<ContactProps> = ({ initialService = '' }) => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    service: initialService || 'Flutter & Android App Development',
    details: '',
  });

  const [copiedEmail, setCopiedEmail] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (initialService) {
      setFormData((prev) => ({ ...prev, service: initialService }));
    }
  }, [initialService]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('rahad.mondal@vbd.com.bd');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate swift client validation & processing
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);

      // Trigger celebratory high-tech confetti
      try {
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#00e5ff', '#38bdf8', '#3b82f6', '#ffffff'],
        });
      } catch (err) {
        // fallback gracefully if WebGL/canvas is restricted
      }
    }, 600);
  };

  // Pre-fill WhatsApp message query
  const buildWhatsAppUrl = () => {
    const text = encodeURIComponent(
      `Hello Bengal IT Agency Bangladesh,\n\nI would like to inquire about a project.\nName: ${formData.name || 'Client'}\nService: ${formData.service}\nDetails: ${formData.details || 'Initial project consultation'}`
    );
    return `https://wa.me/8801410075921?text=${text}`;
  };

  const buildMailtoUrl = () => {
    const subject = encodeURIComponent(`Project Inquiry: ${formData.service} - ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nService: ${formData.service}\n\nProject Details:\n${formData.details}`
    );
    return `mailto:rahad.mondal@vbd.com.bd?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background glowing effects */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] ambient-glow-cyan opacity-25 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-mono text-cyan-400 mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>START A COLLABORATION</span>
          </div>

          <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-slate-900 dark:text-white uppercase tracking-tight mb-4">
            LET'S BUILD SOMETHING GREAT.
          </h2>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            Have an idea, project or digital challenge? Tell us what you're building.
            We will respond swiftly with technical feasibility, architecture recommendations, and a project estimate.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Direct Contact Cards */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-6 sm:p-7 rounded-2xl glass-panel border-slate-200 dark:border-white/5 space-y-3">
              <h3 className="font-display font-bold text-xl text-slate-900 dark:text-white">
                Direct Channels
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Connect directly with our engineering and project leads in Bangladesh. Available 24/7 online for clients worldwide.
              </p>
            </div>

            {/* Email Direct Card */}
            <div className="group p-5 rounded-2xl glass-panel glass-card-hover border-slate-200 dark:border-white/5 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                    Official Email
                  </span>
                  <a
                    href="mailto:rahad.mondal@vbd.com.bd"
                    className="text-sm sm:text-base font-semibold text-slate-900 dark:text-white hover:text-cyan-400 transition-colors"
                  >
                    rahad.mondal@vbd.com.bd
                  </a>
                </div>
              </div>
              <button
                type="button"
                onClick={handleCopyEmail}
                className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-cyan-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                title="Copy email address"
                aria-label="Copy email address"
              >
                {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* Phone Direct Card */}
            <a
              href="tel:+8801407592175"
              className="group p-5 rounded-2xl glass-panel glass-card-hover border-slate-200 dark:border-white/5 flex items-center justify-between gap-3"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                    Phone / Call
                  </span>
                  <span className="text-sm sm:text-base font-semibold text-slate-900 dark:text-white group-hover:text-cyan-400 transition-colors">
                    +8801407592175
                  </span>
                </div>
              </div>
              <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-400 group-hover:text-cyan-400 transition-colors">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </a>

            {/* WhatsApp Direct Card */}
            <a
              href="https://wa.me/8801410075921"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-5 rounded-2xl glass-panel glass-card-hover border-emerald-500/30 bg-emerald-950/20 flex items-center justify-between gap-3 shadow-[0_0_15px_rgba(16,185,129,0.08)]"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono text-emerald-400 uppercase tracking-wider">
                      Instant WhatsApp
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  </div>
                  <span className="text-sm sm:text-base font-semibold text-emerald-300 group-hover:text-emerald-200 transition-colors">
                    +8801410075921
                  </span>
                </div>
              </div>
              <div className="px-3 py-1.5 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs flex items-center gap-1 group-hover:bg-emerald-400 transition-colors">
                <span>Chat</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </div>
            </a>

            {/* Security Guarantee Badge */}
            <div className="p-4 rounded-xl glass-panel border-cyan-500/20 flex items-center gap-3 text-xs font-mono text-slate-400">
              <ShieldCheck className="w-5 h-5 text-cyan-400 shrink-0" />
              <span>Confidentiality & Non-Disclosure guaranteed on all project requests.</span>
            </div>
          </div>

          {/* Right Column: Premium Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 lg:p-10 rounded-2xl glass-panel border-slate-200 dark:border-white/5 relative">
              {isSubmitted ? (
                <div className="py-12 flex flex-col items-center text-center space-y-5 animate-in fade-in duration-300">
                  <div className="w-16 h-16 rounded-full bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shadow-[0_0_20px_rgba(0,229,255,0.4)]">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>

                  <h3 className="font-display font-bold text-2xl text-slate-900 dark:text-white">
                    Project Request Received!
                  </h3>

                  <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-md">
                    Thank you, <span className="font-semibold text-cyan-400">{formData.name}</span>.
                    Our technical team at Bengal IT Agency Bangladesh will review your requirements and reach out within hours.
                  </p>

                  {/* Immediate Action Buttons */}
                  <div className="pt-4 flex flex-col sm:flex-row items-center gap-3 w-full max-w-md">
                    <a
                      href={buildWhatsAppUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-1/2 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Send to WhatsApp</span>
                    </a>

                    <a
                      href={buildMailtoUrl()}
                      className="w-full sm:w-1/2 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-medium text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
                    >
                      <Mail className="w-4 h-4 text-cyan-400" />
                      <span>Open in Email</span>
                    </a>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({
                        name: '',
                        email: '',
                        phone: '',
                        service: 'Flutter & Android App Development',
                        details: '',
                      });
                    }}
                    className="text-xs font-mono text-slate-400 hover:text-cyan-400 transition-colors pt-2"
                  >
                    Submit another request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Name */}
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-xs font-mono uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2"
                      >
                        Your Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g. Alex Rahman"
                        className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-900/90 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors text-sm"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-xs font-mono uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2"
                      >
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="name@company.com"
                        className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-900/90 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Phone / WhatsApp */}
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-xs font-mono uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2"
                      >
                        Phone / WhatsApp *
                      </label>
                      <input
                        type="text"
                        id="phone"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+880 1XXX XXXXXX"
                        className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-900/90 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors text-sm"
                      />
                    </div>

                    {/* Service Selection */}
                    <div>
                      <label
                        htmlFor="service"
                        className="block text-xs font-mono uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2"
                      >
                        Primary Service *
                      </label>
                      <select
                        id="service"
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-900/90 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors text-sm"
                      >
                        <option value="Flutter & Android App Development">
                          Flutter & Android App Development
                        </option>
                        <option value="Website Design & Development">
                          Website Design & Development
                        </option>
                        <option value="Cybersecurity Services">
                          Cybersecurity Services (Defensive)
                        </option>
                        <option value="Custom Digital Solutions">
                          Custom Digital Solutions
                        </option>
                        <option value="General Technical Consultation">
                          General Technical Consultation
                        </option>
                      </select>
                    </div>
                  </div>

                  {/* Project Details */}
                  <div>
                    <label
                      htmlFor="details"
                      className="block text-xs font-mono uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2"
                    >
                      Project Details & Goals *
                    </label>
                    <textarea
                      id="details"
                      name="details"
                      required
                      rows={4}
                      value={formData.details}
                      onChange={handleChange}
                      placeholder="Briefly describe what you would like to build, timeline goals, or any specific requirements..."
                      className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-900/90 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors text-sm resize-y"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full group inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-sky-400 hover:from-cyan-300 hover:to-sky-300 transition-all duration-300 shadow-[0_0_25px_rgba(0,229,255,0.3)] hover:shadow-[0_0_35px_rgba(0,229,255,0.5)] active:scale-[0.99] disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                        <span>Processing Request...</span>
                      </span>
                    ) : (
                      <>
                        <span>Send Project Request</span>
                        <Send className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
