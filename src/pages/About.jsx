import React from 'react';
import { ShieldCheck, Compass, Award, Heart, Activity, ArrowRight, CheckCircle2 } from 'lucide-react';
import ScrollReveal from '../components/common/ScrollReveal';
import Magnetic from '../components/common/Magnetic';

export default function About({ navigate, onOpenQuote, onOpenWorkWithUs }) {
  const values = [
    { num: "01", title: "PREMIUM MATERIALS", desc: "Sourcing thick-walled glass, heavy base components, and leak-proof pump systems to protect and elevate sensitive beauty formulas.", icon: ShieldCheck },
    { num: "02", title: "STRUCTURAL INNOVATION", desc: "Continually scouting modern silhouettes, magnetic cap closures, dome closures, and sustainable packaging components.", icon: Compass },
    { num: "03", title: "OPERATIONAL INTEGRITY", desc: "Transparent B2B operations. Providing exact packaging weights, box sizes, and logistical terms for seamless global trade.", icon: Award },
    { num: "04", title: "ENTERPRISE FOCUS", desc: "B2B solutions built for scale. Helping brands choose ideal capacities, design custom layouts, and test rapid sample kits.", icon: Heart },
    { num: "05", title: "SUSTAINABLE EVOLUTION", desc: "Developing eco-conscious packaging alternatives including recyclable PET, light-weight glass, and biodegradable paper tubes.", icon: Activity },
    { num: "06", title: "LONG-TERM PARTNERSHIP", desc: "Building enduring supply partnerships with leading cosmetic, skincare, and fragrance houses domestically and internationally.", icon: ShieldCheck }
  ];

  const metrics = [
    { num: "500+", label: "CUSTOM MOULDS", desc: "Engineered for unique brand silhouettes" },
    { num: "100%", label: "INSPECTION QC", desc: "Pre-dispatch vacuum & leak audits" },
    { num: "DIRECT", label: "GLOBAL DISPATCH", desc: "Door-to-port verified logistics" },
    { num: "CERTIFIED", label: "MSME & GSTIN", desc: "Fully compliant Indian manufacturing" }
  ];

  return (
    <div className="bg-luxury-ivory text-luxury-charcoal bg-grain pt-28 pb-20 min-h-screen">
      
      {/* 01. EDITORIAL HERO */}
      <section className="py-16 md:py-24 px-6 md:px-12 max-w-7xl mx-auto border-b border-luxury-gold/15 text-left">
        <ScrollReveal direction="up">
          <div className="flex items-center space-x-2 mb-3">
            <span className="editorial-badge">
              01 / HERITAGE &amp; MISSION
            </span>
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-light tracking-tight leading-[1.08] text-luxury-charcoal max-w-4xl mb-6">
            Packaging with Purpose. <br />
            <span className="italic font-serif text-luxury-gold">Crafting Brand Identities.</span>
            <span className="sr-only"> — About Packture International B2B Luxury Packaging Manufacturer in India</span>
          </h1>
          <p className="text-sm md:text-base text-neutral-600 max-w-2xl leading-relaxed font-light">
            Packture International is a premium B2B luxury packaging provider. We specialize in supplying high-end glass bottles, jars, dropper packaging, cosmetic squeeze tubes, roll-ons, and customized caps for fragrance, skincare, and beauty brands worldwide.
          </p>
        </ScrollReveal>

        {/* Editorial Metrics Strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-12 mt-12 border-t border-luxury-gold/10">
          {metrics.map((m, idx) => (
            <ScrollReveal key={m.label} delay={idx * 0.05} direction="up">
              <div className="text-left border-l border-luxury-gold/30 pl-4 py-1">
                <span className="font-serif text-3xl md:text-4xl text-luxury-charcoal font-light block leading-none mb-1.5">
                  {m.num}
                </span>
                <span className="editorial-badge text-[9px] block mb-1">
                  {m.label}
                </span>
                <span className="text-[11px] text-neutral-500 font-light block">
                  {m.desc}
                </span>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* 02. CORPORATE ADVANTAGE */}
      <section className="py-20 md:py-28 px-6 md:px-12 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Column: Stable Image Frame (Zero Hover Zoom) */}
        <ScrollReveal direction="left" className="lg:col-span-5 w-full">
          <div className="h-[360px] sm:h-[420px] border border-luxury-gold/20 p-2 bg-[#FCFBF7] relative overflow-hidden select-none">
            {/* Stable Image - NO hover zoom */}
            <div className="w-full h-full relative overflow-hidden bg-neutral-100">
              <img 
                src="/assets/products/category/droppers.webp" 
                alt="Skincare dropper bottle studio render" 
                className="w-full h-full object-cover"
              />
              {/* Subtle inner champagne border */}
              <div className="absolute inset-3 border border-luxury-gold/30 pointer-events-none" />
            </div>
            <div className="absolute bottom-4 left-4 bg-luxury-ivory/95 backdrop-blur-xs border border-luxury-gold/30 px-3 py-1 text-[9px] font-mono tracking-widest text-luxury-charcoal uppercase">
              STUDIO ARCHIVE · PTI-042
            </div>
          </div>
        </ScrollReveal>
        
        {/* Right Column: Narrative */}
        <ScrollReveal direction="right" className="lg:col-span-7 text-left">
          <div className="flex flex-col space-y-6 max-w-xl">
            <span className="editorial-badge">
              02 / B2B ADVANTAGE
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light leading-tight text-luxury-charcoal">
              Built for Fast-Moving Brands.<br />
              <span className="italic font-serif text-luxury-gold">Engineered for Global Scale.</span>
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-light">
              Our domestic and international logistics channels ensure your containers arrive safely with zero transit defects. We understand the tight schedule of cosmetic launches, providing pre-tested sample kits, direct volume pricing, and custom mold tooling for unique silhouettes.
            </p>
            <div className="space-y-2.5 pt-2">
              <div className="flex items-center space-x-2 text-xs text-neutral-600">
                <CheckCircle2 className="w-4 h-4 text-luxury-gold flex-shrink-0" />
                <span>Low Minimum Order Quantities (MOQ) for emerging luxury lines</span>
              </div>
              <div className="flex items-center space-x-2 text-xs text-neutral-600">
                <CheckCircle2 className="w-4 h-4 text-luxury-gold flex-shrink-0" />
                <span>Direct dispatch in export-grade corrugated cartons with partitions</span>
              </div>
              <div className="flex items-center space-x-2 text-xs text-neutral-600">
                <CheckCircle2 className="w-4 h-4 text-luxury-gold flex-shrink-0" />
                <span>Custom silk screen printing, hot stamping &amp; frosted treatments</span>
              </div>
            </div>
            <div className="pt-4">
              <Magnetic>
                <button
                  onClick={() => (onOpenWorkWithUs ? onOpenWorkWithUs() : onOpenQuote())}
                  className="btn-luxury-primary"
                >
                  <span>WORK WITH US</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </Magnetic>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* 03. CORE COMPANY VALUES */}
      <section className="bg-luxury-cream py-24 px-6 md:px-12 border-t border-b border-luxury-gold/15 bg-grain">
        <div className="max-w-7xl mx-auto">
          <div className="text-left md:text-center max-w-2xl mx-auto mb-16">
            <span className="editorial-badge block mb-2">
              03 / GUIDING PRINCIPLES
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-luxury-charcoal">
              Core Company Values
            </h2>
            <p className="text-xs sm:text-sm text-neutral-500 font-light mt-3">
              The foundational standards guiding our materials engineering, manufacturing partnerships, and logistics.
            </p>
            <div className="luxury-divider max-w-xs mx-auto mt-6" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {values.map((v, index) => {
              const Icon = v.icon;
              return (
                <ScrollReveal key={v.title} delay={index * 0.05} direction="up" className="h-full">
                  <div 
                    className="luxury-card p-8 flex flex-col justify-between h-full min-h-[220px] rounded-sm text-left relative group overflow-hidden bg-[#FCFBF7]"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="font-mono text-xs font-semibold text-luxury-gold tracking-widest">
                          {v.num}
                        </span>
                        <Icon className="w-5 h-5 text-luxury-gold/70 group-hover:text-luxury-gold transition-colors duration-300" />
                      </div>
                      <h3 className="font-serif text-lg font-medium tracking-wide text-luxury-charcoal group-hover:text-luxury-gold transition-colors duration-300 mb-2">
                        {v.title}
                      </h3>
                      <p className="text-xs text-neutral-500 leading-relaxed font-light">
                        {v.desc}
                      </p>
                    </div>

                    {/* Bottom Hairline Gold Accent on Hover */}
                    <div className="w-0 group-hover:w-full h-[1.5px] bg-gradient-to-r from-transparent via-luxury-gold to-transparent transition-all duration-500 mt-4" />
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

    </div>
  );
}

