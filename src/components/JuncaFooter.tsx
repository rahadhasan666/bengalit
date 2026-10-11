import React from 'react';

export default function JuncaFooter() {
  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer" id="footer">
      <div className="container-junca">
        {/* Top: Massive Headline & Briefing paragraph */}
        <div className="footer__top">
          <p className="footer__headline font-heading">
            LET'S BUILD SOMETHING AMBITIOUS TOGETHER.
          </p>
          <p className="footer__desc">
            বেঙ্গল আইটি এজেন্সী বাংলাদেশ (Bengal IT Agency Bangladesh) — প্রতিষ্ঠাতা মোঃ লাবিব মৃধা (Md Labib Mridha)। We engineer high-velocity Flutter Android apps, custom WordPress/Laravel websites, Facebook security solutions, ethical hacking audits, Linux VPS servers, and Python AI chatbots.
          </p>
        </div>

        {/* Thin Divider Line */}
        <div className="footer__line" />

        {/* 4-Column Grid */}
        <div className="footer__grid">
          {/* Column 1: Socials */}
          <ul className="footer__socials">
            <li>
              <a
                href="https://wa.me/8801410075921"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>WhatsApp Support</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 7h10v10M7 17 17 7"/>
                </svg>
              </a>
            </li>
            <li>
              <a
                href="mailto:rahad.mondal@vbd.com.bd"
              >
                <span>Official Email</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 7h10v10M7 17 17 7"/>
                </svg>
              </a>
            </li>
            <li>
              <a
                href="tel:+8801407592175"
              >
                <span>Telephone Line</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 7h10v10M7 17 17 7"/>
                </svg>
              </a>
            </li>
            <li>
              <a
                href="https://github.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>GitHub Repositories</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 7h10v10M7 17 17 7"/>
                </svg>
              </a>
            </li>
          </ul>

          {/* Column 2: Navigation & 6 Key Capabilities */}
          <div className="footer__col">
            <p className="footer__head">NAVIGATION</p>
            <ul>
              <li><a href="#projects">Selected Work</a></li>
              <li><a href="#services">Engineering Services</a></li>
              <li><a href="#why">Why Work With Us</a></li>
              <li><a href="#faq">Frequently Asked Questions</a></li>
              <li><a href="#contact">Direct Consultation</a></li>
            </ul>

            <p className="footer__head footer__head--latest">CORE SERVICES</p>
            <ul>
              <li><a href="#services">Custom Web & E-Commerce BD</a></li>
              <li><a href="#services">Flutter & Android Mobile Apps</a></li>
              <li><a href="#services">Facebook Fix & ID Security</a></li>
              <li><a href="#services">Cyber Security & Malware Removal</a></li>
              <li><a href="#services">Linux VPS & Cloud Hosting</a></li>
              <li><a href="#services">AI Chatbots & Bot Automation</a></li>
            </ul>
          </div>

          {/* Column 3: Direct Contact Details & Founder Attribution */}
          <div className="footer__col">
            <p className="footer__head">FOUNDER & LEAD CONSULTANT</p>
            <ul>
              <li className="text-[var(--fg)] font-semibold">
                Md Labib Mridha (মোঃ লাবিব মৃধা)
              </li>
              <li className="text-xs text-[var(--fg-muted)] pb-2">
                Chief IT Consultant & Tech SEO Specialist
              </li>
              <li>
                <a href="mailto:rahad.mondal@vbd.com.bd" className="break-all">
                  rahad.mondal@vbd.com.bd
                </a>
              </li>
              <li>
                <a href="https://wa.me/8801410075921" target="_blank" rel="noopener noreferrer">
                  WhatsApp: +880 1410 075921
                </a>
              </li>
              <li>
                <a href="tel:+8801407592175">
                  Phone: +880 1407 592175
                </a>
              </li>
              <li className="text-[var(--fg-muted)] pt-2">
                Location: Dhaka, Bangladesh
              </li>
              <li className="text-[var(--fg-muted)]">
                Operating Model: 100% Online IT Agency
              </li>
            </ul>
          </div>

          {/* Column 4: Engineering Standards & SEO */}
          <div className="footer__col">
            <p className="footer__head">TECHNICAL STANDARDS</p>
            <ul>
              <li className="text-[var(--fg-2)]">OWASP Top 10 Security Hardened</li>
              <li className="text-[var(--fg-2)]">Compiled 60-120 FPS Flutter Code</li>
              <li className="text-[var(--fg-2)]">Sub-Second Core Web Vitals TTFB</li>
              <li className="text-[var(--fg-2)]">Complete Semantic Schema Structured</li>
              <li className="text-[var(--fg-2)]">Google #1 Rank Optimized SEO</li>
              <li className="text-[var(--fg-2)]">Zero Bloat Code Architecture</li>
            </ul>
          </div>
        </div>

        {/* Official Brandmark & Tagline Showcase Banner */}
        <div className="py-8 sm:py-10 border-t border-[var(--line)] flex flex-col md:flex-row items-start md:items-center justify-between gap-6 sm:gap-8 my-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5">
            <div className="relative w-14 h-14 sm:w-20 sm:h-20 flex-shrink-0 flex items-center justify-center p-2 rounded-2xl bg-black/60 border border-emerald-500/30 shadow-[0_0_30px_rgba(0,255,163,0.2)]">
              <div className="absolute inset-0 bg-emerald-500/20 rounded-2xl blur-lg" />
              <img
                src="/assets/bengal-logo-mark.png"
                alt="Bengal IT Agency Brandmark"
                className="relative z-10 w-full h-full object-contain filter drop-shadow-[0_0_10px_rgba(0,255,163,0.7)]"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-heading font-extrabold text-2xl sm:text-3xl tracking-tight text-[var(--fg)]">
                  BENGAL IT
                </span>
                <span className="w-2 h-2 rounded-full bg-[#ef3e36] shadow-[0_0_8px_#ef3e36] animate-pulse" />
              </div>
              <p className="font-mono text-xs sm:text-sm tracking-wider sm:tracking-widest text-emerald-400 font-semibold uppercase mt-0.5">
                AGENCY BANGLADESH • BUILD. SECURE. SCALE.
              </p>
              <p className="text-xs text-[var(--fg-muted)] mt-1">
                Founder: Md Labib Mridha (মোঃ লাবিব মৃধা) · Custom Web, Flutter App, Cyber Security & AI Automation.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
            <div className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-black/50 border border-emerald-500/30 text-emerald-400 font-mono text-[11px] sm:text-xs flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>HEADQUARTERS: DHAKA, BD</span>
            </div>
            <div className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-black/50 border border-white/10 text-slate-300 font-mono text-[11px] sm:text-xs">
              <span>ONLINE AGENCY: GLOBAL 24/7</span>
            </div>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="footer__bottom">
          <div className="footer__logo">
            <a href="#top" onClick={scrollToTop} className="inline-flex items-center gap-2.5">
              <img
                src="/assets/bengal-logo-mark.png"
                alt="Bengal IT Emblem"
                className="w-6 h-6 object-contain"
              />
              <span className="font-heading font-extrabold tracking-tight text-2xl text-[var(--fg)]">
                BENGAL IT<span className="text-[#ef3e36]">.</span>
              </span>
            </a>
          </div>

          <p className="footer__copy">
            © 2026 Bengal IT Agency Bangladesh. All rights reserved.
          </p>

          <a
            href="#top"
            onClick={scrollToTop}
            className="footer__top-link"
          >
            <span>BACK TO TOP</span>
            <span aria-hidden="true">↑</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
