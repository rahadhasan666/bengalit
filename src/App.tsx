import { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { useLenis } from './hooks/useLenis';
import { LuxuryVFXCursor } from './components/LuxuryVFXCursor';
import { AmbientTorch } from './components/AmbientTorch';
import { CyberHudOverlay } from './components/CyberHudOverlay';
import { LuxuryAtmosphere } from './components/LuxuryAtmosphere';
import { AnimeGuideCompanion } from './components/AnimeGuideCompanion';
import { JuncaPreloader } from './components/JuncaPreloader';
import { JuncaChrome } from './components/JuncaChrome';
import { JuncaBottomBar } from './components/JuncaBottomBar';
import { JuncaHero } from './components/JuncaHero';
import { JuncaClients } from './components/JuncaClients';
import JuncaScrubStatement from './components/JuncaScrubStatement';
import JuncaServicesOrbit from './components/JuncaServicesOrbit';
import { JuncaProjects } from './components/JuncaProjects';
import { JuncaStudioReel } from './components/JuncaStudioReel';
import { JuncaWhy } from './components/JuncaWhy';
import { JuncaVoice } from './components/JuncaVoice';
import { TechStack } from './components/TechStack';
import { Process } from './components/Process';
import JuncaFAQ from './components/JuncaFAQ';
import JuncaContact from './components/JuncaContact';
import JuncaFooter from './components/JuncaFooter';

export function App() {
  // Initialize Lenis smooth inertia scroll (matching Junca Studio's robot-lenis)
  useLenis();

  const [selectedService, setSelectedService] = useState<string>(
    'Flutter & Android App Development'
  );

  const navigateToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectService = (serviceTitle: string) => {
    setSelectedService(serviceTitle);
    navigateToSection('contact');
  };

  const handleSelectProject = (projectName: string) => {
    setSelectedService(`Project Case Study Inquiry: ${projectName}`);
    navigateToSection('contact');
  };

  return (
    <ThemeProvider>
      <div className="relative min-h-screen bg-[var(--bg-main)] text-[var(--fg)] selection:bg-[var(--red)] selection:text-white transition-colors duration-500">
        {/* Luxury Spatial Stardust & Specular Aura Atmosphere */}
        <LuxuryAtmosphere />

        {/* Studio Boot Sequence Preloader (Scramble decryption + turbine spin + curtain exit) */}
        <JuncaPreloader />

          {/* Ambient Cursor Spotlight Torch for deep spatial 3D lighting */}
          <AmbientTorch />

        {/* World-Class Luxury VFX Cursor: Physics Stardust Spark Trail + Real-Time Click Shockwave Blast */}
        <LuxuryVFXCursor />

        {/* Precision Cyberpunk / Swiss Luxury HUD Telemetry (Live FPS, Dhaka Coordinates, WebGL Engine) */}
        <CyberHudOverlay />

        {/* Cute Interactive Anime AI Companion Guide (Aira) */}
        <AnimeGuideCompanion />

        {/* Junca Fixed Architectural Chrome (Top-left wordmark, center split nav, top-right 2-line animated burger & flyout menu) */}
        <JuncaChrome onNavigateTo={navigateToSection} />

        {/* Junca Fixed Bottom Bar (Dhaka UTC+6 clock, copyright, and rotating 3-blade turbine status) */}
        <JuncaBottomBar />

        {/* Main Document Flow */}
        <main id="top" className="relative z-10">
          {/* 1. Hero Section: Prominent 3D WebGL Gyroscopic Core + Editorial Typography */}
          <JuncaHero
            onStartProject={() => navigateToSection('contact')}
            onExploreServices={() => navigateToSection('services')}
          />

          {/* 2. Client & Technology Infinite Marquee Track */}
          <JuncaClients />

          {/* 3. Junca Kinetic Character-by-Character Scroll Scrub Statement */}
          <JuncaScrubStatement />

          {/* 4. Signature 3D Services Orbit Section (Cards fly in 3D orbit around center text as user scrolls) */}
          <JuncaServicesOrbit onSelectService={handleSelectService} />

          {/* 5. Selected Work: 3D Tilt Cards + Specular Glare + WebGL Liquid Ripple + Case Study Modals */}
          <JuncaProjects onSelectProject={handleSelectProject} />

          {/* 6. Junca Studio Reel: 3D Perspective Warp Showcase Stage */}
          <JuncaStudioReel />

          {/* 7. Why Work With Us: 3D Sticky Stacking Burgundy Cards */}
          <JuncaWhy />

          {/* 8. Engineering Principles & Voice: Interactive Hover Veil + High-Performance Standards */}
          <JuncaVoice />

          {/* 9. Engineering Toolchain: Interactive Category Filters & Verified Production Badges */}
          <TechStack />

          {/* 8. Execution Roadmap: 6-Stage Agile Engineering Process */}
          <Process />

          {/* 9. Swiss Minimalist FAQ Accordion (Rotating Red Plus/Minus) */}
          <JuncaFAQ />

          {/* 10. Direct Consultation, Instant WhatsApp & Project Briefing Form */}
          <JuncaContact initialService={selectedService} />
        </main>

        {/* 11. Junca Giant Footer: Headline, 4 Columns, Back to Top */}
        <JuncaFooter />
      </div>
    </ThemeProvider>
  );
}

export default App;
