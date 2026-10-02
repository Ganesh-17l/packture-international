import React, { useState, useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

import { MATERIALS } from '../../data/materials';

export default function MovingMaterialWall() {
  const shouldReduce = useReducedMotion();
  const [activeDesktopId, setActiveDesktopId] = useState(null);
  const [activeMobileId, setActiveMobileId] = useState('glass');
  
  // Mobile panel refs for IntersectionObserver
  const mobilePanelRefs = useRef([]);

  // Mobile viewport-based auto-active behavior
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -30% 0px',
      threshold: 0.2
    };

    const handleIntersect = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const materialId = entry.target.getAttribute('data-material-id');
          if (materialId) {
            setActiveMobileId(materialId);
          }
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    mobilePanelRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section 
      id="sec-07-materials"
      className="relative bg-[#F3EFE6] text-luxury-charcoal bg-grain pt-14 pb-16 sm:pt-16 sm:pb-20 md:pt-20 md:pb-24 lg:pt-24 lg:pb-28 px-5 sm:px-8 md:px-12 transition-colors duration-700 border-t border-[#282014]/[0.06]"
      aria-label="Section 07: Material Library and Studies"
    >
      {/* Background Soft Lighting Transition */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-40 transition-opacity duration-700 z-0"
        style={{
          background: 'radial-gradient(ellipse at 50% 20%, #ECE7DC 0%, #F3EFE6 70%)'
        }}
      />

      <div className="max-w-[1400px] mx-auto relative z-10">
        
        {/* Section Header: Restrained Editorial Architecture */}
        <div className="mb-10 sm:mb-12 md:mb-14">
          
          {/* Section Marker */}
          <div className="flex items-center gap-2.5 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-luxury-gold" />
            <span className="text-[10px] font-bold tracking-[0.28em] text-luxury-gold uppercase font-mono">
              SEC 07 // MATERIALS
            </span>
            <span className="w-6 h-px bg-luxury-gold/40" />
            <span className="text-[9px] font-mono tracking-[0.2em] uppercase text-neutral-500 hidden sm:inline-block">
              EDITORIAL MATERIAL INSTALLATION · PTI REF 2026
            </span>
          </div>

          {/* Eyebrow & Title Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-end">
            
            <div className="lg:col-span-7 space-y-2">
              <p className="text-[11px] font-mono tracking-[0.28em] text-luxury-gold uppercase font-medium">
                MATERIAL, BEFORE THE PRODUCT.
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-light text-luxury-charcoal leading-[1.08] tracking-tight">
                Material, before the product.
              </h2>
            </div>

            {/* Restrained Supporting Copy */}
            <div className="lg:col-span-5 lg:pl-4 border-l border-luxury-gold/25">
              <p className="text-xs sm:text-[13px] text-luxury-charcoal font-normal tracking-wide">
                Every package begins with a material.
              </p>
              <p className="text-xs sm:text-[13px] text-neutral-500 font-light leading-relaxed mt-1">
                Glass for presence. PET for versatility. HDPE for resilience. Aluminium for precision.
              </p>
            </div>

          </div>

        </div>

        {/* ============================================================== */}
        {/* DESKTOP & TABLET: HORIZONTAL EXPANDING MATERIAL WALL           */}
        {/* ============================================================== */}
        <div 
          className="hidden md:flex flex-row items-stretch gap-3 lg:gap-4 h-[520px] lg:h-[580px] xl:h-[620px] w-full"
          onMouseLeave={() => setActiveDesktopId(null)}
          role="region"
          aria-label="Moving Material Wall Interactive Panels"
        >
          {MATERIALS.map((material) => {
            const isActive = activeDesktopId === material.id;
            const hasActiveSibling = activeDesktopId !== null && !isActive;

            // Flex calculation:
            // When reduced motion: all equal (flex: 1)
            // Default: flex 1 for all (25% each)
            // On hover: active gets ~44-46% (flex 2.2), siblings get ~18% (flex 0.85)
            const flexValue = shouldReduce 
              ? '1 1 0%' 
              : isActive 
                ? '2.2 1 0%' 
                : hasActiveSibling 
                  ? '0.85 1 0%' 
                  : '1 1 0%';

            return (
              <div
                key={material.id}
                tabIndex={0}
                role="group"
                aria-label={`Material study ${material.num}: ${material.name}. ${material.characteristics}`}
                onMouseEnter={() => setActiveDesktopId(material.id)}
                onFocus={() => setActiveDesktopId(material.id)}
                onBlur={() => setActiveDesktopId(null)}
                style={{
                  flex: flexValue,
                  transition: shouldReduce 
                    ? 'none' 
                    : 'flex 650ms cubic-bezier(0.22, 1, 0.36, 1), background-color 500ms ease, border-color 500ms ease, box-shadow 500ms ease, opacity 500ms ease'
                }}
                className={`
                  relative rounded-none overflow-hidden flex flex-col justify-between p-6 lg:p-8
                  border cursor-pointer select-none outline-none
                  focus-visible:ring-1 focus-visible:ring-luxury-gold focus-visible:ring-offset-2
                  ${isActive 
                    ? 'bg-[#FFFFFF] border-luxury-gold/45 shadow-[0_16px_40px_-15px_rgba(40,32,20,0.08)] z-10' 
                    : hasActiveSibling 
                      ? 'bg-[#F7F4EC] border-[#282014]/[0.06] opacity-75' 
                      : 'bg-[#FCFBF7] border-[#282014]/[0.08] hover:border-luxury-gold/30'
                  }
                `}
              >
                {/* Subtle Ambient Lighting inside Panel */}
                <div 
                  className="absolute inset-0 pointer-events-none transition-opacity duration-700"
                  style={{
                    opacity: isActive ? 1 : 0.25,
                    background: `radial-gradient(circle at 50% 45%, ${material.glowColor} 0%, transparent 75%)`
                  }}
                />

                {/* TOP COMPOSITION: Material Number & Technical Tag */}
                <div className="relative z-10 flex items-center justify-between border-b border-[#282014]/[0.06] pb-3">
                  <span className={`text-[10px] font-mono tracking-[0.25em] font-semibold transition-colors duration-400 ${
                    isActive ? 'text-luxury-gold' : 'text-neutral-400'
                  }`}>
                    {material.num} / MATERIAL
                  </span>

                  <span className={`text-[9px] font-mono tracking-[0.2em] uppercase transition-all duration-500 ${
                    isActive ? 'opacity-90 text-neutral-600 translate-x-0' : 'opacity-0 translate-x-2'
                  }`}>
                    STUDY SAMPLE
                  </span>
                </div>

                {/* CENTER COMPOSITION: Large Material Sample Visual */}
                <div className="relative z-10 my-auto flex items-center justify-center py-4 px-2 overflow-hidden flex-1">
                  <div className="relative w-full max-w-[260px] lg:max-w-[300px] aspect-[3/4] flex items-center justify-center">
                    
                    {/* Shadow base underneath sample */}
                    <div 
                      className={`absolute -bottom-3 inset-x-4 h-6 rounded-full blur-md pointer-events-none transition-all duration-700 ${
                        isActive ? 'opacity-35 scale-105 bg-[#282014]/30' : 'opacity-15 scale-95 bg-[#282014]/20'
                      }`} 
                    />

                    {/* Material Study Image */}
                    <div className="relative w-full h-full overflow-hidden rounded-sm border border-[#282014]/[0.08] bg-[#ECE7DC]/40 shadow-sm">
                      <img
                        src={material.image}
                        alt={material.alt}
                        className={`w-full h-full object-cover object-center pointer-events-none transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                          isActive && !shouldReduce ? 'scale-[1.04]' : 'scale-100'
                        }`}
                        loading="lazy"
                      />
                      
                      {/* Subtle Glass/Satin Inset Highlight */}
                      <div className="absolute inset-0 pointer-events-none border border-white/40 mix-blend-overlay" />
                    </div>

                  </div>
                </div>

                {/* BOTTOM COMPOSITION: Material Name & Revealed Characteristics */}
                <div className="relative z-10 pt-3 border-t border-[#282014]/[0.06]">
                  
                  {/* Confident Material Name */}
                  <div className="overflow-hidden">
                    <h3 className={`font-serif text-2xl lg:text-3xl xl:text-4xl font-light tracking-wide text-luxury-charcoal transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      isActive && !shouldReduce ? '-translate-y-0.5' : 'translate-y-0'
                    }`}>
                      {material.name}
                    </h3>
                  </div>

                  {/* Dynamic Characteristics Reveal (No layout shift: fixed container height) */}
                  <div className="h-10 mt-1 flex flex-col justify-start overflow-hidden">
                    <p className={`text-xs font-mono tracking-wider font-medium text-luxury-gold uppercase transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                    }`}>
                      {material.characteristics}
                    </p>
                    <p className={`text-[10px] font-mono tracking-[0.18em] text-neutral-500 uppercase mt-0.5 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      isActive ? 'opacity-90 translate-y-0' : 'opacity-0 translate-y-2'
                    }`}>
                      {material.spec}
                    </p>
                  </div>

                </div>

              </div>
            );
          })}
        </div>

        {/* ============================================================== */}
        {/* MOBILE: VERTICAL INTERACTIVE MATERIAL SEQUENCE                */}
        {/* Auto-active via IntersectionObserver (or tap)                  */}
        {/* Zero sensor dependency, 100% stable across all mobile browsers  */}
        {/* ============================================================== */}
        <div 
          className="flex md:hidden flex-col gap-3 w-full"
          role="region"
          aria-label="Mobile Material Sequence"
        >
          {MATERIALS.map((material, idx) => {
            const isActive = activeMobileId === material.id;

            return (
              <div
                key={material.id}
                ref={(el) => (mobilePanelRefs.current[idx] = el)}
                data-material-id={material.id}
                onClick={() => setActiveMobileId(material.id)}
                className={`
                  relative rounded-none overflow-hidden p-5 border transition-all duration-600 ease-[cubic-bezier(0.22,1,0.36,1)]
                  ${isActive 
                    ? 'bg-[#FFFFFF] border-luxury-gold/50 shadow-[0_10px_30px_-10px_rgba(40,32,20,0.08)]' 
                    : 'bg-[#FCFBF7] border-[#282014]/[0.08] opacity-85'
                  }
                `}
              >
                {/* Header row */}
                <div className="flex items-center justify-between pb-3 border-b border-[#282014]/[0.06]">
                  <div className="flex items-center gap-3">
                    <span className={`text-[10px] font-mono tracking-[0.25em] font-semibold ${
                      isActive ? 'text-luxury-gold' : 'text-neutral-400'
                    }`}>
                      {material.num}
                    </span>
                    <h3 className="font-serif text-xl font-light text-luxury-charcoal tracking-wide">
                      {material.name}
                    </h3>
                  </div>

                  <span className={`text-[9px] font-mono tracking-[0.2em] uppercase transition-opacity duration-300 ${
                    isActive ? 'text-luxury-gold opacity-100' : 'text-neutral-400 opacity-60'
                  }`}>
                    {isActive ? 'ACTIVE' : 'EXAMINE'}
                  </span>
                </div>

                {/* Content Area: Dynamic Expansion on Active */}
                <div className={`grid grid-cols-12 gap-4 items-center transition-all duration-500 pt-3 ${
                  isActive ? 'max-h-[380px] opacity-100' : 'max-h-[160px] opacity-90'
                }`}>
                  
                  {/* Left: Material Study Thumbnail */}
                  <div className={`col-span-5 relative transition-all duration-500 ${
                    isActive ? 'scale-100' : 'scale-95'
                  }`}>
                    <div className="aspect-[3/4] w-full rounded-sm overflow-hidden border border-[#282014]/[0.08] bg-[#ECE7DC]/50 shadow-sm">
                      <img
                        src={material.image}
                        alt={material.alt}
                        className="w-full h-full object-cover object-center pointer-events-none"
                        loading="lazy"
                      />
                    </div>
                  </div>

                  {/* Right: Statement & Revealed Characteristics */}
                  <div className="col-span-7 space-y-2">
                    <p className="font-serif text-base text-luxury-charcoal font-light italic">
                      "{material.statement}"
                    </p>

                    <div className={`transition-all duration-500 space-y-1.5 ${
                      isActive ? 'opacity-100 max-h-32' : 'opacity-40 max-h-14 overflow-hidden'
                    }`}>
                      <p className="text-[11px] font-mono tracking-wider font-semibold text-luxury-gold uppercase">
                        {material.characteristics}
                      </p>
                      <p className="text-[10px] text-neutral-500 font-light leading-relaxed">
                        {material.editorialNote}
                      </p>
                      <p className="text-[9px] font-mono tracking-[0.16em] text-neutral-400 uppercase pt-1">
                        {material.spec}
                      </p>
                    </div>
                  </div>

                </div>

              </div>
            );
          })}
        </div>

        {/* Section Bottom Editorial Footer / Smooth Transition Bridge */}
        <div className="mt-12 sm:mt-14 md:mt-16 pt-5 border-t border-[#282014]/[0.08] flex flex-col sm:flex-row items-start sm:items-center justify-between text-[9px] sm:text-[10px] font-mono tracking-[0.22em] text-neutral-500 uppercase gap-2">
          <span>01 GLASS · 02 PET · 03 HDPE · 04 ALUMINIUM</span>
          <span className="text-luxury-gold">ARCHITECTURAL MATERIAL LIBRARY · PTI STANDARD</span>
        </div>

      </div>

      {/* Restrained Architectural Transition into Dark CTA SEC 08 (#F3EFE6 -> #ECE6DA -> #141312) */}
      <div 
        className="absolute bottom-0 inset-x-0 h-20 pointer-events-none" 
        style={{
          background: 'linear-gradient(to bottom, transparent 0%, #ECE6DA 65%, rgba(20, 19, 18, 0.95) 100%)'
        }}
        aria-hidden="true" 
      />
    </section>
  );
}
