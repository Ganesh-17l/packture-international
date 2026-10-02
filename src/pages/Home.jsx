import React, { useState, useEffect, useCallback } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, ArrowDown, CheckCircle } from 'lucide-react';
import { getFeaturedProducts, CATEGORIES } from '../data/products';
import ProductImage from '../components/products/ProductImage';
import ProductCard from '../components/products/ProductCard';
import ScrollReveal from '../components/common/ScrollReveal';
import Magnetic from '../components/common/Magnetic';
import HeroBottle3D from '../components/hero/HeroBottle3D';
import DarkCollectionArchive from '../sections/home/DarkCollectionArchive';
import MaterialToMarketSection from '../sections/home/MaterialToMarketSection';
import MovingMaterialWall from '../sections/home/MovingMaterialWall';
import FragranceGlassSpotlight from '../sections/home/FragranceGlassSpotlight';

export default function Home({ navigate, onOpenQuote, onOpenEnquiry }) {
  const featuredProducts = getFeaturedProducts();
  const shouldReduce = useReducedMotion();

  // Initial atmosphere aligned exactly with default emerald finish to avoid mount-time re-renders
  const [activeAtmosphere, setActiveAtmosphere] = useState('rgba(5, 72, 55, 0.14)');

  const handleFinishChange = useCallback((finish) => {
    if (finish?.ambientAtmosphere) {
      setActiveAtmosphere((prev) => (prev !== finish.ambientAtmosphere ? finish.ambientAtmosphere : prev));
    }
  }, []);



  const processSteps = [
    { num: "01", title: "DISCOVER", desc: "Consultation to review your cosmetic or perfume brand parameters, capacity choices, and finish preferences." },
    { num: "02", title: "SELECT", desc: "Select from our vast product catalog of glass jars, dropper systems, squeeze tubes, closures, and pumps." },
    { num: "03", title: "CUSTOMIZE", desc: "Specify branding options like frosted coating, custom colors, metal collars, or luxury hot foil stamping." },
    { num: "04", title: "ENQUIRE", desc: "Submit your final details to get samples, box sizing quantities, production timelines, and custom pricing." }
  ];

  // Large spotlight bottle for hero section
  const heroSpotlightProduct = {
    id: "hero-spotlight-perfume",
    name: "Monolith Gold Elite",
    slug: "monolith-gold-elite",
    category: "perfume-glass-bottles",
    image: "/assets/products/perfume/monolith.webp",
    colours: ["Gold", "Glass"],
    sizes: ["100ml"]
  };

  // Staged Hero Timings
  const titleVariants = {
    hidden: { y: "100%", opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1, 
      transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  return (
    <div className="bg-luxury-ivory text-luxury-charcoal bg-grain min-h-screen overflow-x-hidden">
      
      {/* 01. REIMAGINED FULL-BLEED CINEMATIC HERO */}
      <section 
        className="relative min-h-[100svh] lg:min-h-screen w-full bg-[#070709] text-luxury-ivory flex flex-col justify-between pt-24 sm:pt-28 pb-10 sm:pb-12 lg:pb-8 px-5 sm:px-10 lg:px-14 z-10 overflow-hidden"
      >
        {/* Layer 1A: Base Rich Charcoal & Espresso Gradient (Mobile & Desktop Luxury Studio Floor) */}
        <div 
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            background: 'radial-gradient(ellipse at 50% 68%, #1c1511 0%, #120e0b 35%, #090708 70%, #050507 100%)'
          }}
        />

        {/* Layer 1B: Desktop Asymmetric Studio Falloff (Soft warm illumination from right studio softbox) */}
        <div 
          className="hidden lg:block absolute inset-0 pointer-events-none z-0 opacity-80"
          style={{
            background: 'radial-gradient(ellipse at 72% 48%, #241a14 0%, #140f0c 40%, transparent 75%)'
          }}
        />

        {/* Layer 2: Dedicated Product Photography Studio Lighting (Positioned behind 3D bottle on mobile & desktop) */}
        {/* 2A. Mobile Studio Lighting (Centered behind the lower product zone for crisp edge separation) */}
        <div 
          className="lg:hidden absolute bottom-[8%] sm:bottom-[12%] right-1/2 translate-x-1/2 w-[340px] sm:w-[480px] h-[340px] sm:h-[480px] rounded-full blur-[85px] sm:blur-[110px] pointer-events-none z-0 transition-all duration-1000"
          style={{
            background: activeAtmosphere 
              ? `radial-gradient(circle, ${activeAtmosphere} 0%, rgba(197, 160, 89, 0.14) 45%, transparent 75%)`
              : 'radial-gradient(circle, rgba(70, 48, 32, 0.40) 0%, rgba(197, 160, 89, 0.12) 45%, transparent 75%)'
          }}
        />

        {/* 2B. Desktop Studio Lighting (Positioned behind the right stage) */}
        <div 
          className="hidden lg:block absolute top-1/3 right-[14%] w-[600px] h-[600px] rounded-full blur-[140px] pointer-events-none z-0 transition-all duration-1000"
          style={{
            background: activeAtmosphere 
              ? `radial-gradient(circle, ${activeAtmosphere} 0%, rgba(197, 160, 89, 0.10) 50%, transparent 75%)`
              : 'radial-gradient(circle, rgba(80, 55, 36, 0.35) 0%, rgba(197, 160, 89, 0.08) 50%, transparent 75%)'
          }}
        />

        {/* Layer 3: Organic Studio Micro-Texture / Dark Wood & Stone Nuance */}
        <div 
          className="absolute inset-0 opacity-[0.035] pointer-events-none z-0 mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
          }}
        />

        {/* Layer 4: Dark Cinematic Vignette & Edge Shadowing */}
        <div 
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            background: 'radial-gradient(circle at 50% 50%, transparent 35%, rgba(6, 6, 8, 0.5) 75%, rgba(4, 4, 6, 0.95) 100%)'
          }}
        />

        {/* Layer 5: Clean Dark Legibility Gradient behind Left Text Column */}
        <div 
          className="absolute top-0 left-0 w-full lg:w-1/2 h-full pointer-events-none z-0 bg-gradient-to-r from-[#050507]/60 via-[#050507]/20 to-transparent"
        />

        {/* Layer 6: Top & Bottom Seamless Transitions into Header & Collection */}
        <div className="absolute top-0 inset-x-0 h-28 bg-gradient-to-b from-[#050507]/90 via-[#050507]/40 to-transparent pointer-events-none z-0" />
        <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-[#050507] via-[#050507]/70 to-transparent pointer-events-none z-0" />
        
        {/* Layer 6B: Subtle ~80px architectural bleed/fade at hero bottom into SEC 02 */}
        <div 
          className="absolute bottom-0 inset-x-0 h-20 pointer-events-none z-10" 
          style={{
            background: 'linear-gradient(to bottom, transparent 0%, rgba(7, 7, 9, 0.4) 60%, rgba(7, 7, 9, 0.95) 100%)'
          }}
        />
        <div className="absolute -bottom-px inset-x-0 h-px bg-gradient-to-r from-transparent via-luxury-gold/25 to-transparent pointer-events-none z-20" />

        {/* Layer 7: Huge Subtle Background Monolith Watermark (Desktop only) */}
        <div className="hidden lg:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none z-0 whitespace-nowrap overflow-hidden max-w-full">
          <span className="font-serif font-light text-[22vw] text-white/[0.018] tracking-tighter leading-none block">
            PACKAGING
          </span>
        </div>

        {/* Layer 8: Vertical Editorial Brand Tag (Left Edge, Desktop only) */}
        <div className="absolute left-6 lg:left-8 top-1/2 -translate-y-1/2 -rotate-90 origin-bottom-left text-[9px] font-mono tracking-[0.35em] text-neutral-500 uppercase hidden xl:block z-20 pointer-events-none">
          COLLECTION 01 // MONOLITH SERIES · EST. 2026
        </div>

        {/* Main Editorial Hero Canvas: Dedicated Mobile Flow / Desktop Asymmetric Overlap */}
        <div className="max-w-7xl mx-auto w-full flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-center z-10 my-auto">
          
          {/* Typography Column (Full width on mobile, Cols 1-7 on desktop) */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left space-y-4 sm:space-y-6 lg:pr-4">
            
            {/* Minimal Brand Eyebrow */}
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.2 }}
              className="flex items-center space-x-2.5 sm:space-x-3"
            >
              <span className="h-px w-5 sm:w-6 bg-luxury-gold/80" />
              <span className="text-[9px] sm:text-xs font-mono tracking-[0.3em] sm:tracking-[0.35em] text-luxury-gold uppercase font-medium">
                SEC 01 // BRAND INTRODUCTION
              </span>
              <span className="w-4 h-px bg-luxury-gold/40 hidden sm:inline-block" />
              <span className="text-[9px] font-mono tracking-[0.2em] text-neutral-400 uppercase hidden sm:inline-block">
                PACKTURE INTERNATIONAL · PTI REF 2026
              </span>
            </motion.div>

            {/* Headline */}
            <div className="space-y-1">
              <motion.h1 
                variants={titleVariants}
                initial="hidden"
                animate="visible"
                className="font-serif text-[11vw] sm:text-7xl lg:text-8xl xl:text-[90px] font-light tracking-tight text-white leading-[1.04] lg:leading-[0.92]"
              >
                <div className="overflow-hidden">
                  <span>Packaging <br className="hidden sm:inline" />the Future.</span>
                </div>
                <div className="overflow-hidden pt-1 sm:pt-2">
                  <motion.span 
                    initial={{ y: "100%", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="font-serif text-[6.5vw] sm:text-5xl lg:text-6xl italic text-luxury-gold font-light block"
                  >
                    with Luxury Finishing.
                  </motion.span>
                </div>
                <span className="sr-only"> — Packture International B2B Luxury Packaging Manufacturer in India</span>
              </motion.h1>
            </div>

            {/* Short Narrative Description */}
            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
              className="text-xs sm:text-base text-neutral-400 font-light leading-relaxed max-w-lg pt-0.5 sm:pt-1"
            >
              Architectural packaging and bespoke finishing for global fragrance, beauty, and personal-care brands.
            </motion.p>

            {/* Refined CTAs: Tier 1 Primary (Quote) + Tier 2 Dark (Explore) */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.65, ease: "easeOut" }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-2 sm:pt-3 z-20 w-full sm:w-auto"
            >
              <Magnetic className="w-full sm:w-auto">
                <button
                  onClick={() => onOpenQuote()}
                  className="btn-luxury-gold w-full sm:w-auto"
                >
                  <span>REQUEST A QUOTE</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </Magnetic>

              <Magnetic className="w-full sm:w-auto">
                <button
                  onClick={() => navigate('/collections')}
                  className="btn-luxury-dark w-full sm:w-auto"
                >
                  <span>EXPLORE COLLECTIONS</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </Magnetic>
            </motion.div>

          </div>

          {/* Right Product 3D Hero Anchor (Full width on mobile, Cols 8-12 on desktop) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.4, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex flex-col items-center justify-center relative w-full h-[420px] sm:h-[480px] lg:h-[560px] xl:h-[600px] mt-4 lg:mt-0 z-10"
          >
            {/* Seamless 3D Bottle Viewport */}
            <div className="w-full h-full relative z-10 flex flex-col items-center justify-center">
              <HeroBottle3D 
                onFinishChange={handleFinishChange}
              />
            </div>
          </motion.div>

        </div>

        {/* Bottom Editorial Utility & Narrative Bar (Desktop only) */}
        <div className="hidden lg:flex max-w-7xl mx-auto w-full items-center justify-between pt-4 border-t border-white/[0.06] text-[9px] font-mono tracking-[0.25em] text-neutral-500 uppercase z-20">
          <div className="flex items-center space-x-4">
            <span className="text-neutral-400">GLASS / METAL / FORM</span>
            <span className="text-neutral-600">·</span>
            <span>GLOBAL B2B MANUFACTURING</span>
          </div>

          <div className="flex items-center space-x-2 text-neutral-400">
            <span className="text-[8.5px] tracking-[0.3em]">SCROLL</span>
            <div className="w-8 h-px bg-luxury-gold/40 relative overflow-hidden">
              <motion.div 
                animate={shouldReduce ? {} : { x: ["-100%", "100%"] }}
                transition={{ repeat: Infinity, duration: 2.0, ease: "easeInOut" }}
                className="absolute top-0 left-0 w-1/2 h-full bg-luxury-gold"
              />
            </div>
          </div>
        </div>

      </section>

      {/* 02. EDITORIAL TRANSITION INTO THE COLLECTION */}
      <section className="relative w-full bg-[#FAF7F0] text-luxury-charcoal border-b border-[#282014]/[0.08] relative z-20 overflow-hidden">
        {/* Subtle Top-Entry Transition from Dark Hero */}
        <div 
          className="absolute top-0 inset-x-0 h-[100px] pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, #F4EFE6 0%, #FAF7F0 100px)'
          }}
        />

        <div className="pt-14 pb-12 sm:pt-16 sm:pb-14 md:pt-20 md:pb-16 px-6 md:px-12 max-w-7xl mx-auto relative z-10">
          <ScrollReveal>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-8 flex flex-col space-y-4">
              <div className="flex items-center gap-2.5 mb-1">
                <span className="w-1.5 h-1.5 rounded-full bg-luxury-gold" />
                <span className="text-[10px] font-bold tracking-[0.28em] text-luxury-gold uppercase font-mono">
                  SEC 02 // ARCHITECTURAL SYSTEMS
                </span>
                <span className="w-6 h-px bg-luxury-gold/40" />
                <span className="text-[9px] font-mono tracking-[0.2em] uppercase text-neutral-500 hidden sm:inline-block">
                  DESIGN PHILOSOPHY · PTI REF 2026
                </span>
              </div>
              <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-light leading-tight text-luxury-charcoal">
                Forms designed <br />
                <span className="italic font-serif text-luxury-gold">to become brand icons.</span>
              </h2>
              <p className="text-sm md:text-base text-neutral-600 max-w-2xl leading-relaxed pt-2">
                At Packture International, packaging is the physical bridge between your formulation and the consumer. We engineer precision glass, custom closures, and luxury finishes for leading global fragrance, skincare, and beauty houses.
              </p>
            </div>
            <div className="lg:col-span-4 border-l border-luxury-gold/20 pl-8 py-4">
              <span className="font-serif text-6xl text-luxury-gold font-light block mb-2 leading-none">B2B</span>
              <p className="text-xs text-neutral-500 tracking-wider uppercase font-semibold">
                CUSTOM MOULDS · METALLIC FOILING · INDUSTRIAL SUPPLY
              </p>
            </div>
          </div>
        </ScrollReveal>
        </div>
      </section>

      {/* 03. EDITORIAL CAPABILITY: FROM MATERIAL TO MARKET (5-Stage Engineered Journey) */}
      <MaterialToMarketSection navigate={navigate} />

      {/* 04. EDITORIAL COLLECTION ARCHIVE INDEX (All 14 Packaging Divisions) */}
      <DarkCollectionArchive navigate={navigate} />

      {/* 05. SPOTLIGHT: THE ART OF FRAGRANCE GLASS (EDITORIAL CATALOGUE INSTALLATION) */}
      <FragranceGlassSpotlight 
        navigate={navigate} 
        onOpenEnquiry={onOpenEnquiry} 
      />

      {/* 06. CUSTOMIZATION TIMELINE */}
      <section className="bg-[#F6F2E9] pt-14 pb-14 sm:pt-16 sm:pb-16 md:pt-20 md:pb-20 px-6 md:px-12 border-t border-b border-[#282014]/[0.08] bg-grain">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 flex flex-col items-center">
            <div className="flex items-center gap-2.5 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-luxury-gold" />
              <span className="text-[10px] font-bold tracking-[0.28em] text-luxury-gold uppercase font-mono">
                SEC 06 // B2B WORKFLOW
              </span>
              <span className="w-6 h-px bg-luxury-gold/40" />
              <span className="text-[9px] font-mono tracking-[0.2em] uppercase text-neutral-500 hidden sm:inline-block">
                CUSTOMIZATION TIMELINE · PTI REF 2026
              </span>
            </div>
            <h2 className="font-serif text-3xl md:text-4xl font-light text-luxury-charcoal">
              B2B Customization Journey
            </h2>
            <div className="w-12 h-0.5 bg-luxury-gold mt-4"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative mb-10">
            {/* Desktop Subtle Connecting Line */}
            <div className="hidden lg:block absolute top-[68px] left-12 right-12 h-[1px] bg-luxury-gold/20 z-0" />
            
            {processSteps.map((step, idx) => (
              <ScrollReveal key={step.num} delay={idx * 0.08} direction="up" className="h-full z-10 relative">
                <div className="luxury-card p-8 relative flex flex-col justify-between h-64 z-10 group">
                  <div>
                    <span className="font-serif text-4xl font-light text-luxury-gold block mb-4 group-hover:translate-x-1 transition-transform duration-300">
                      {step.num}
                    </span>
                    <h3 className="font-serif text-lg font-medium text-luxury-charcoal mb-2">
                      {step.title}
                    </h3>
                    <p className="text-xs text-neutral-500 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                  
                  {idx < 3 && (
                    <>
                      {/* Desktop connector icon */}
                      <div className="hidden lg:block absolute top-1/2 -right-4 -translate-y-1/2 z-20 text-luxury-gold bg-luxury-cream p-1 border border-luxury-gold/20 rounded-full shadow-sm">
                        <ArrowRight className="w-4 h-4" />
                      </div>
                      {/* Mobile/Tablet vertical connector icon */}
                      <div className="block lg:hidden absolute -bottom-6 left-1/2 -translate-y-1/2 z-20 text-luxury-gold bg-luxury-cream p-1 border border-luxury-gold/20 rounded-full shadow-sm">
                        <ArrowDown className="w-3.5 h-3.5" />
                      </div>
                    </>
                  )}
                </div>
              </ScrollReveal>
            ))}
          </div>

          <div className="text-center">
            <Magnetic>
              <button
                onClick={() => navigate('/customization')}
                className="btn-luxury-secondary"
              >
                <span>LEARN MORE ABOUT CUSTOMIZATION</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </Magnetic>
          </div>
        </div>
      </section>

      {/* 07. MOVING MATERIAL WALL (EDITORIAL MATERIAL INSTALLATION) */}
      <MovingMaterialWall />

      {/* 08. FINAL EDITORIAL CTA (Charcoal Section #141312) */}
      <section className="bg-[#141312] text-[#FAF7F0] pt-16 pb-16 sm:pt-20 sm:pb-20 md:pt-24 md:pb-22 px-6 md:px-12 bg-grain relative overflow-hidden border-t border-luxury-gold/25">
        {/* Static Background Layout */}
        <div className="absolute inset-0 z-0 opacity-10">
          <img 
            src="/assets/products/category/jars.webp" 
            alt="Cosmetic jar layout background" 
            className="w-full h-full object-cover"
          />
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10 flex flex-col items-center space-y-6">
          <div className="flex items-center gap-2.5 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-luxury-gold" />
            <span className="text-[10px] font-bold tracking-[0.28em] text-luxury-gold uppercase font-mono">
              SEC 08 // BESPOKE COLLABORATION
            </span>
            <span className="w-6 h-px bg-luxury-gold/40" />
            <span className="text-[9px] font-mono tracking-[0.2em] uppercase text-neutral-400 hidden sm:inline-block">
              B2B PARTNERSHIP · PTI REF 2026
            </span>
          </div>
          
          <ScrollReveal direction="up" className="flex flex-col items-center">
            <h2 className="font-serif text-4xl md:text-6xl font-light tracking-wide leading-tight text-[#FAF7F0] mb-4">
              Let's Create <br />
              <span className="italic font-serif text-luxury-champagne">Something Beautiful.</span>
            </h2>
            <p className="text-sm text-neutral-400 max-w-xl leading-relaxed font-light">
              Explore premium packaging solutions designed to give your products a distinctive presence. Let us support your brand with luxury materials, custom tooling, and high-quality finishing.
            </p>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.2} className="flex flex-wrap justify-center gap-4 pt-4">
            <Magnetic>
              <button
                onClick={() => onOpenQuote()}
                className="btn-luxury-gold"
              >
                <span>REQUEST A QUOTE</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </Magnetic>
            <Magnetic>
              <button
                onClick={() => navigate('/collections')}
                className="btn-luxury-dark"
              >
                <span>EXPLORE COLLECTIONS</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </Magnetic>
          </ScrollReveal>
        </div>
      </section>

    </div>
  );
}
