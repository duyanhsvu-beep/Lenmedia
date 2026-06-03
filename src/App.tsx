import React, { useState, useEffect } from "react";
import {
  Instagram,
  Youtube,
  Mail,
  Play,
  Activity,
  Sparkles,
  Zap,
  Film,
  Sliders,
  ChevronRight,
  ArrowUpRight,
  Send,
  Check,
  Award,
  Layers,
  Camera
} from "lucide-react";

import { PROJECTS, CLIENT_LOGOS } from "./data";
import { Project } from "./types";
import LaserCanvas from "./components/LaserCanvas";
import ProjectCard from "./components/ProjectCard";
import ProjectShowcaseModal from "./components/ProjectShowcaseModal";
import { playSubDrop, playLaserSweep } from "./components/SoundSystem";
import portrait from "./images/lennert_portrait_1780485998066.jpg";

export default function App() {
  // Navigation active scroll state
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // General Interactive States
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeCategory, setActiveCategory] = useState("ALL");

  // Contact form state
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formSubject, setFormSubject] = useState("");
  const [formMessage, setFormMessage] = useState("");
  const [formSuccess, setFormSuccess] = useState(false);
  const [formError, setFormError] = useState("");

  // Background laser configuration states (stable, elegant settings)
  const bpm = 10; // Relaxed elegant festival energy pace
  const lasersActive = true;
  const strobeMode = false;

  // Monitor Scroll for Navbar styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Title transition state for "Videographer" and "Editor"
  const rotatingWords = ["Videographer", "Editor"];
  const [rotatingWordIdx, setRotatingWordIdx] = useState(0);
  const [isWordTransitioning, setIsWordTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsWordTransitioning(true);
      setTimeout(() => {
        setRotatingWordIdx((prev) => (prev + 1) % rotatingWords.length);
        setIsWordTransitioning(false);
      }, 500);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Sync reference from Modal to standard Dutch Contact form
  const handleApplyStyleFromModal = (proj: Project) => {
    setFormSubject(`Referentie: ${proj.title}`);
    setFormMessage((prev) => {
      const intro = `Beste Lennert, ik heb interesse in een productie in de stijl van jouw project "${proj.title}". Laten we de mogelijkheden bespreken!`;
      return prev ? `${intro}\n\n${prev}` : intro;
    });

    // Close modal & scroll down to standard Contact sheet
    setSelectedProject(null);
    const elem = document.getElementById("contact");
    if (elem) {
      setTimeout(() => {
        elem.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  // Submit contact form
  const handleSubmitContact = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formEmail || !formSubject || !formMessage) {
      setFormError("Identity credentials (Name, Email, Subject, Message) are fully required.");
      return;
    }
    setFormError("");
    setFormSuccess(true);
    playSubDrop(); // Sound system confirmation feedback
    
    setTimeout(() => {
      setFormName("");
      setFormEmail("");
      setFormSubject("");
      setFormMessage("");
      setFormSuccess(false);
    }, 6000);
  };

  const categories = ["ALL", "Festival Aftermovie", "Artist Stage Visuals", "Festival Video Production", "Event Highlight Video"];
  const filteredProjects = activeCategory === "ALL"
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === activeCategory || p.tags.includes(activeCategory));

  return (
    <div className="min-h-screen bg-cyber-black text-slate-200 relative overflow-hidden flex flex-col justify-between selection:bg-cyber-cyan selection:text-black">
      {/* Subtle Laser projecting backdrop */}
      <LaserCanvas active={lasersActive} bpm={bpm} strobeMode={strobeMode} />

      {/* Modern, high contrast coordinate grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#071018_1px,transparent_1px),linear-gradient(to_bottom,#071018_1px,transparent_1px)] bg-[size:5rem_5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none opacity-20" />

      {/* Clean Transparent blurred-on-scroll Navbar */}
      <header
        className={`sticky top-0 z-40 transition-all duration-500 border-b ${
  isScrolled
    ? "bg-cyber-black/90 backdrop-blur-md border-cyan-500/10 py-4 shadow-xl shadow-black/80"
    : "bg-cyber-black/60 backdrop-blur-sm border-cyan-500/10 py-6"
}`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xl font-display font-black tracking-widest text-white leading-none">
              LEN<span className="text-cyber-cyan font-semibold">MEDIA</span>
            </span>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8 text-[11px] font-mono uppercase tracking-[0.2em] text-slate-400">
            <a href="#hero" className="hover:text-cyber-cyan transition-colors">Home</a>
            <a href="#portfolio" className="hover:text-cyber-cyan transition-colors">Portfolio</a>
            <a href="#about" className="hover:text-cyber-cyan transition-colors">Over Mij</a>
            <a href="#contact" className="hover:text-cyber-cyan transition-colors text-slate-100 font-semibold border-b border-cyber-cyan/30 pb-1">Contact</a>
          </nav>

          {/* Contact Action Trigger in Navbar */}
          <div className="flex items-center gap-4">
            <a
              href="#contact"
              onClick={() => playLaserSweep()}
              className="hidden sm:flex items-center gap-1.5 px-4 py-2 border border-cyber-cyan/30 text-cyber-cyan bg-cyan-500/5 hover:bg-cyber-cyan hover:text-black transition-all text-[10px] font-mono uppercase tracking-widest cursor-pointer rounded"
            >
              Neem contact op 
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            {/* Mobile menu trigger button */}
            <button
              id="mobile-nav-trigger-btn"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 border border-slate-900 rounded md:hidden text-slate-400 hover:text-white transition-all cursor-pointer"
            >
              <Sliders className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Mobile Navigation Interface Panel */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-cyan-500/10 bg-[#030507]/95 backdrop-blur-lg p-6 space-y-4 font-mono text-xs uppercase tracking-widest text-slate-300 absolute w-full left-0 top-[100%] z-50">
            <a href="#hero" onClick={() => setIsMenuOpen(false)} className="block py-2.5 border-b border-slate-900/60 hover:text-cyber-cyan">Home</a>
            <a href="#portfolio" onClick={() => setIsMenuOpen(false)} className="block py-2.5 border-b border-slate-900/60 hover:text-cyber-cyan">Portfolio</a>
            <a href="#about" onClick={() => setIsMenuOpen(false)} className="block py-2.5 border-b border-slate-900/60 hover:text-cyber-cyan">Over Mij</a>
            <a href="#contact" onClick={() => setIsMenuOpen(false)} className="block py-3 text-center rounded border border-cyber-cyan/50 text-cyber-cyan font-bold">Contact</a>
          </div>
        )}
      </header>

      {/* Main Container Layout Area */}
      <main className="flex-grow z-25 relative">

        {/* 1. HERO SECTION (REDESIGNED) */}
        <section id="hero" className="relative min-h-[95vh] flex flex-col justify-center items-center px-4 overflow-hidden pt-52 pb-24">
          <div className="absolute inset-0 pointer-events-none z-10">
            {/* Cinematic dark overlays to maximize title legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-cyber-black via-cyber-black/50 to-cyber-black" />
            
            {/* Ambient festival background image */}
            <img
              src="/src/assets/images/festival_hero_1780486016944.png"
              alt="Cinematic Stage Lights background"
              className="w-full h-full object-cover filter brightness-30 contrast-125 saturate-110 opacity-70 transition-all duration-1000"
              referrerPolicy="no-referrer"
            />

            {/* Simulated stage lasers, particle loops, and glow grids */}
            <div className="absolute inset-0 bg-transparent overflow-hidden">
              <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[120px] animate-pulse" />
              <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px]" />
            </div>
          </div>

          <div className="max-w-6xl mx-auto text-center relative z-20 space-y-12 px-4 flex flex-col items-center">
            {/* Elegant and smaller animated title - 3-line layout */}
            <div className="space-y-1 flex flex-col items-center w-full overflow-visible">
              <h1 id="hero-animated-title" className="uppercase select-none w-full text-center flex flex-col items-center overflow-visible">
                <span className="block text-base sm:text-lg md:text-xl lg:text-2xl font-display font-medium tracking-[0.15em] text-slate-300">
  Freelance Event
</span>
                
{/* The animated word - fixed clipping issue */}
<span
  className={`block transition-all duration-500 ease-in-out text-transparent bg-clip-text bg-gradient-to-r from-cyber-cyan via-[#00c9ff] to-[#0080FF] font-display font-black text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl tracking-tighter leading-none mt-2 sm:mt-3 ${
    isWordTransitioning ? "opacity-0 scale-95 translate-y-2" : "opacity-100 scale-100 translate-y-0"
  }`}
  style={{ WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
>
  {rotatingWords[rotatingWordIdx]}
</span>
              </h1>
            </div>

            {/* Subtle Scroll Down Indicator */}
            <div
              onClick={() => {
                playLaserSweep();
                const portfolioElem = document.getElementById("portfolio");
                if (portfolioElem) {
                  portfolioElem.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="pt-16 flex flex-col items-center gap-2.5 text-slate-500 hover:text-cyber-cyan transition-all group cursor-pointer"
            >
              <span className="font-mono text-[9px] uppercase tracking-[0.25em]">Scroll Down</span>
              <div className="w-5 h-8 border-2 border-slate-800 rounded-full flex justify-center p-1.5 transition-colors group-hover:border-cyber-cyan/30">
                <div className="w-1 h-2 bg-cyber-cyan rounded-full animate-bounce" />
              </div>
            </div>
          </div>
        </section>


        {/* 2. PORTFOLIO SECTION (MAIN CORE FOCUS) */}
        <section id="portfolio" className="py-32 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-16 space-y-3">
            <span className="font-mono text-[10px] text-cyber-cyan tracking-[0.25em] uppercase block">Selected Works // Video Portfolio</span>
            <h2 className="text-1xl md:text-3xl font-display font-black tracking-tight text-white uppercase">
              Geselecteerd Werk
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-cyber-cyan to-cyber-blue mx-auto" />
          </div>

          {/* Clean Filtering Tabs bar */}
          <div className="flex flex-wrap justify-center gap-2 mb-16 max-w-4xl mx-auto font-mono text-[9px] uppercase tracking-wider">
            {categories.map((cat) => (
              <button
                id={`cat-tab-${cat}`}
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  playLaserSweep();
                }}
                className={`py-2 px-4 rounded transition-all cursor-pointer border ${
                  activeCategory === cat
                    ? "bg-cyan-500/15 border-cyber-cyan text-cyber-cyan shadow-[0_0_12px_rgba(0,229,255,0.2)] font-semibold"
                    : "bg-slate-950/40 border-slate-900/80 text-slate-400 hover:text-white hover:border-slate-800"
                }`}
              >
                {cat === "ALL" ? "TOON ALLES" : cat}
              </button>
            ))}
          </div>

          {/* Projects Portfolio Grid selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onOpenDetails={(p) => setSelectedProject(p)}
              />
            ))}
          </div>
        </section>


        {/* 3. WORKS WITH - LOGO WALL CREDIBILITY SECTION */}
        <section id="brands" className="py-20 border-t border-b border-cyan-500/5 bg-[#030507]/40 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 mb-10">
            <div className="text-center">
              <h3 className="text-xs font-mono uppercase tracking-[0.25em] text-cyan-400">Worked With</h3>
              <p className="text-xs font-sans text-slate-500 mt-1">Collabs met vooraanstaande artiesten, festivals en platforms</p>
            </div>
          </div>

          {/* Seamless slider loop */}
          <div className="relative w-full overflow-hidden mask-gradient-marquee py-2 flex">
            {/* Ambient edge fades */}
            <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-[#030507] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-[#030507] to-transparent z-10 pointer-events-none" />
            
            <div className="animate-marquee flex gap-6">
              {/* Render twice for continuous loop */}
              {[...CLIENT_LOGOS, ...CLIENT_LOGOS].map((client, idx) => (
                <div
                  key={`${client.id}-${idx}`}
                  className="flex-shrink-0 flex items-center justify-center p-6 bg-slate-950/40 border border-slate-900/60 rounded-lg group transition-all duration-300 hover:border-cyber-cyan/35 hover:shadow-[0_0_20px_rgba(0,229,255,0.08)] cursor-default w-[160px] sm:w-[190px]"
                >
                  <span className="font-display font-black text-xs sm:text-xs tracking-widest text-slate-500 group-hover:text-cyber-cyan transition-colors duration-300 uppercase filter grayscale group-hover:grayscale-0 group-hover:scale-105 transform brightness-75 group-hover:brightness-110">
                    {client.logoText}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>


        {/* 4. ABOUT ME SECTION (OVER MIJ - simplified) */}
        <section id="about" className="py-32 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 border-b border-cyan-500/5 select-none relative z-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Lennert's portrait */}
            <div className="relative group rounded-xl overflow-hidden bg-slate-950 border border-slate-900 aspect-[3/4] max-w-sm mx-auto w-full lg:col-span-5">
              {/* Overlay elements */}
              <div className="absolute top-4 left-4 z-20 text-[8px] font-mono text-cyber-cyan tracking-widest bg-black/80 px-2.5 py-1 rounded border border-cyan-500/10">
                ACTIVE_OPERATOR // LENNERT.PNG
              </div>

              <div className="absolute inset-0 bg-transparent z-10 pointer-events-none group-hover:bg-cyan-500/5 transition-all duration-500" />

              <img
                src={portrait}
                alt="Lennert - LenMedia professional videographer"
                className="w-full h-full object-cover filter brightness-95 group-hover:brightness-105 saturate-110 contrast-105 transition-transform duration-700 hover:scale-102"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Profile context Text description in Dutch */}
            <div className="space-y-6 text-left lg:col-span-7 flex flex-col justify-center">
              <div>
                <h2 className="text-3xl md:text-5xl font-display font-black tracking-tight text-white uppercase mt-1 pb-1 overflow-visible leading-tight">
                  Over Mij
                </h2>
                <div className="w-16 h-1 bg-gradient-to-r from-cyber-cyan to-cyber-blue mt-2" />
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                <p>
                  Als freelance event videograaf en editor leg ik de rauwe energie, lasers, pyro en pure sfeer van festivals, 
                  hardstyle events en artiesten-sets vast. Met meer dan 5 jaar ervaring in de elektronische muziekscene vertaal ik de dynamische kickrolls 
                  en adrenaline van het publiek direct naar strakke cinematic cuts en aftermovies.
                </p>
                <p className="font-semibold text-slate-100 italic border-l-2 border-cyber-cyan/40 pl-4 py-1">
                  "Geen saaie bedrijfsvideo's of vlakke content. Mijn focus ligt op het vangen van de climax, het lichtspel, 
                  en de absolute ontlading van het publiek."
                </p>
                <p>
                  Gewapend met high-end cinema cams, anamorfe lenzen en FPV drones lever ik professionele aftermovies, 
                  teasers voor socials, en visuele showelementen met een snelle doorlooptijd en hoogwaardige kleurcorrectie.
                </p>
              </div>

              {/* Professional stats grid - smaller, more elegant, integrated naturally */}
              <div className="grid grid-cols-2 gap-3 pt-4">
                {[
                  { label: "Festivals", value: "+50" },
                  { label: "Aftermovies", value: "+100" },
                  { label: "Artists", value: "+20" },
                  { label: "Views Generated", value: "+5M" },
                ].map((stat, i) => (
                  <div
                    key={i}
                    className="py-3.5 px-4 rounded-lg bg-[#071018]/25 border border-slate-900/60 relative overflow-hidden group hover:border-cyber-cyan/20 hover:shadow-[0_0_12px_rgba(0,229,255,0.04)] transition-all duration-300 text-left"
                  >
                    <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-cyber-cyan/15 group-hover:border-cyber-cyan/35 transition-colors" />
                    <span className="font-display font-black text-xl tracking-tight text-white block group-hover:text-cyber-cyan transition-colors drop-shadow-[0_0_8px_rgba(0,229,255,0.08)]">
                      {stat.value}
                    </span>
                    <span className="font-mono text-[8px] text-slate-400 uppercase tracking-widest block mt-0.5">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>


        {/* 5. CONTACT SECTION (SIMPLIFIED & SPACIOUS) */}
        <section id="contact" className="py-32 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-30">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            
            {/* Contact details */}
            <div className="space-y-8 text-left lg:col-span-5">
              <div>
                <span className="font-mono text-xs text-cyber-cyan tracking-[0.2em] uppercase block">Laat van u horen</span>
                <h2 className="text-2xl sm:text-2xl md:text-3xl font-display font-black tracking-tight text-white uppercase mt-1 pb-2 overflow-visible leading-tight">
                  Samenwerken
                </h2>
                <div className="w-16 h-1 bg-gradient-to-r from-cyber-cyan to-cyber-blue mt-2.5" />
              </div>

              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-sans">
                Heeft u een aftermovie nodig voor uw festival, branded video-content voor socials, of zoekt u een ervaren videograaf voor uw artiestentour?
                Vul het formulier in voor een snelle offerte en antwoord binnen 24 uur.
              </p>

              {/* Direct Channels info */}
              <div className="space-y-4 pt-4 font-mono text-xs">
                <div className="flex items-center gap-3.5 p-4 bg-slate-950/40 border border-slate-900 rounded-lg">
                  <Mail className="w-5 h-5 text-cyber-cyan" />
                  <div>
                    <span className="text-slate-500 block text-[9px] uppercase">DIRECT E-MAIL</span>
                    <a href="mailto:info@lenmedia.net" className="text-slate-100 hover:text-cyber-cyan transition-colors font-sans">info@lenmedia.net</a>
                  </div>
                </div>

                <div className="flex items-center gap-3.5 p-4 bg-slate-950/40 border border-slate-900 rounded-lg">
                  <Instagram className="w-5 h-5 text-cyber-cyan" />
                  <div>
                    <span className="text-slate-500 block text-[9px] uppercase">INSTAGRAM CHANNEL</span>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-slate-100 hover:text-cyber-cyan transition-colors font-sans">@lenmedia</a>
                  </div>
                </div>
              </div>
            </div>

            {/* Dutch Contact Form */}
            <div className="glass-panel p-8 rounded-xl relative overflow-hidden text-left bg-[#071018]/40 border-slate-900 shadow-xl shadow-black lg:col-span-7">
              <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-cyber-cyan/40" />
              <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-cyber-cyan/40" />

              <div className="flex items-center gap-2 mb-8 pb-3 border-b border-cyan-500/10">
                <Activity className="w-4 h-4 text-cyber-cyan" />
                <h3 className="font-display font-bold text-xs tracking-widest text-white uppercase">
                  Contactformulier
                </h3>
              </div>

              {formSuccess ? (
                <div className="py-12 text-center space-y-4 font-sans">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-400/40 flex items-center justify-center mx-auto text-emerald-400 animate-pulse">
                    <Check className="w-8 h-8" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-display font-black text-white text-base">BERICHT VERSTUURD</h4>
                    <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
                      Lennert heeft uw bericht ontvangen! U krijgt binnen 24 uur een reactie op uw e-mailadres.
                    </p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmitContact} className="space-y-6 text-xs text-left">
                  {formError && (
                    <div className="p-3.5 bg-rose-500/15 border border-rose-400/30 rounded text-rose-300 font-mono text-[11px]">
                      [ERROR]: {formError}
                    </div>
                  )}

                  {/* Naam */}
                  <div>
                    <label htmlFor="contact-naam" className="block text-[10px] font-mono text-slate-400 uppercase tracking-widest mb-2">
                      Naam
                    </label>
                    <input
                      id="contact-naam"
                      type="text"
                      placeholder="Uw naam"
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      className="w-full bg-[#030507] border border-slate-900 focus:border-cyber-cyan focus:outline-none p-3.5 rounded-lg text-white transition-all text-xs"
                      required
                    />
                  </div>

                  {/* E-mail */}
                  <div>
                    <label htmlFor="contact-email" className="block text-[10px] font-mono text-slate-400 uppercase tracking-widest mb-2">
                      E-mail
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      placeholder="voorbeeld@domein.nl"
                      value={formEmail}
                      onChange={(e) => setFormEmail(e.target.value)}
                      className="w-full bg-[#030507] border border-slate-900 focus:border-cyber-cyan focus:outline-none p-3.5 rounded-lg text-white transition-all text-xs"
                      required
                    />
                  </div>

                  {/* Onderwerp */}
                  <div>
                    <label htmlFor="contact-onderwerp" className="block text-[10px] font-mono text-slate-400 uppercase tracking-widest mb-2">
                      Onderwerp
                    </label>
                    <input
                      id="contact-onderwerp"
                      type="text"
                      placeholder="Onderwerp van uw aanvraag"
                      value={formSubject}
                      onChange={(e) => setFormSubject(e.target.value)}
                      className="w-full bg-[#030507] border border-slate-900 focus:border-cyber-cyan focus:outline-none p-3.5 rounded-lg text-white transition-all text-xs"
                      required
                    />
                  </div>

                  {/* Bericht */}
                  <div>
                    <label htmlFor="contact-bericht" className="block text-[10px] font-mono text-slate-400 uppercase tracking-widest mb-2">
                      Bericht
                    </label>
                    <textarea
                      id="contact-bericht"
                      rows={5}
                      placeholder="Beschrijf hier uw project (evenement, datum, aantal verwachte bezoekers...)"
                      value={formMessage}
                      onChange={(e) => setFormMessage(e.target.value)}
                      className="w-full bg-[#030507] border border-slate-900 focus:border-cyber-cyan focus:outline-none p-3.5 rounded-lg text-white transition-all font-sans text-xs leading-relaxed resize-none"
                      required
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    id="submit-contact-btn"
                    type="submit"
                    className="w-full py-4 rounded bg-gradient-to-r from-cyber-cyan to-cyber-blue text-black font-display font-bold uppercase text-[10px] tracking-widest hover:shadow-[0_0_20px_#00E5FF] transition-all cursor-pointer flex items-center justify-center gap-2 mt-2"
                  >
                    <Send className="w-3.5 h-3.5" />
                    Verstuur Bericht
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>

      </main>

      {/* Cyber minimal Footer layout */}
      <footer className="bg-cyber-black border-t border-cyan-500/10 py-12 px-6 sm:px-12 z-20 relative">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center md:items-start">
            <span className="text-xl font-display font-black tracking-widest text-white leading-none">
              LEN<span className="text-cyber-cyan font-semibold">MEDIA</span>
            </span>
            <span className="text-[9px] font-mono text-slate-500 uppercase tracking-[0.2em] mt-2">
              PREMIUM VIDEOGRAPHER / EDITOR PORTFOLIO
            </span>
          </div>

          <div className="flex items-center gap-6 font-mono text-[9px] text-slate-500 tracking-wider">
            <span>© 2026 LENMEDIA. ALLE RECHTEN VOORBEHOUDEN.</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 border border-slate-900 hover:border-cyber-cyan hover:text-cyber-cyan rounded transition-all bg-[#030507]"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 border border-slate-900 hover:border-cyber-cyan hover:text-cyber-cyan rounded transition-all bg-[#030507]"
            >
              <Youtube className="w-4 h-4" />
            </a>
            <a
              href="#contact"
              className="p-2 border border-slate-900 hover:border-cyber-cyan hover:text-cyber-cyan rounded transition-all bg-[#030507]"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>
      </footer>

      {/* Selected Project Details Overlay Modal */}
      {selectedProject && (
        <ProjectShowcaseModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          onApplyStyle={handleApplyStyleFromModal}
        />
      )}
    </div>
  );
}
