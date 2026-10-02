import React, { useState, useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Magnetic from '../../components/common/Magnetic';

/**
 * 5 Core Capability Stages of the Packture Development Lifecycle
 */
const STAGES = [
  {
    id: "material",
    num: "01",
    title: "MATERIAL",
    descriptor: "Glass · PET · HDPE · Aluminium",
    detail: "Primary raw flint glass, circular aluminium alloys, food-grade PET and chemical-resistant high-density polymers.",
    coords: "MAT. REF 01-GL"
  },
  {
    id: "form",
    num: "02",
    title: "FORM",
    descriptor: "Moulding · Machining · Assembly",
    detail: "IS-machine blow-and-blow glass fabrication, high-precision injection tooling, and geometric shoulder shaping.",
    coords: "TOL. ±0.15MM"
  },
  {
    id: "finish",
    num: "03",
    title: "FINISH",
    descriptor: "Flint · Opal · Frosted",
    detail: "Tactile surface coatings: acid-etched soft frosting, glossy high-flint clarity, metallic hot-stamping, and UV lacquers.",
    coords: "SURF. OPT-03"
  },
  {
    id: "component",
    num: "04",
    title: "COMPONENT",
    descriptor: "Closures · Pumps · Droppers",
    detail: "Precision fluid atomization: FEA15 crimp collars, DIN18 euro droppers, treatment lotion pumps, and Sauvage crowns.",
    coords: "ENG. DIN-18"
  },
  {
    id: "supply",
    num: "05",
    title: "GLOBAL SUPPLY",
    descriptor: "B2B · Export · Logistics",
    detail: "Export-grade palletizing, certified barrier QA inspection, ISO compliance, and seamless international container dispatch.",
    coords: "LOG. INT-B2B"
  }
];

/**
 * Pure 2D / SVG Abstract Technical Vector Illustrations.
 * Scalable, lightweight vector line drawings representing each stage.
 */
function StageVectorIllustration({ stageId, isActive, isHovered }) {
  const strokeColor = (isActive || isHovered) ? "#C5A059" : "#282014";
  const strokeOpacity = (isActive || isHovered) ? 0.95 : 0.45;
  const detailOpacity = (isActive || isHovered) ? 0.75 : 0.25;

  switch (stageId) {
    case 'material':
      // 01 Material: Elemental Material Science & Molecular/Gauge Geometry
      return (
        <svg viewBox="0 0 80 80" fill="none" className="w-12 h-12 sm:w-14 sm:h-14 transition-all duration-500" aria-hidden="true">
          {/* Glass ingot cross-section / circular material gauge */}
          <circle cx="40" cy="40" r="28" stroke={strokeColor} strokeWidth="1.2" strokeOpacity={strokeOpacity} />
          <circle cx="40" cy="40" r="18" stroke={strokeColor} strokeWidth="0.8" strokeDasharray="3 3" strokeOpacity={detailOpacity} />
          {/* Internal crystalline lattice points */}
          <line x1="20" y1="40" x2="60" y2="40" stroke={strokeColor} strokeWidth="0.75" strokeOpacity={detailOpacity} />
          <line x1="40" y1="20" x2="40" y2="60" stroke={strokeColor} strokeWidth="0.75" strokeOpacity={detailOpacity} />
          {/* Corner calibration ticks */}
          <path d="M 28 28 L 28 32 M 28 28 L 32 28" stroke={strokeColor} strokeWidth="1" strokeOpacity={strokeOpacity} />
          <path d="M 52 28 L 52 32 M 52 28 L 48 28" stroke={strokeColor} strokeWidth="1" strokeOpacity={strokeOpacity} />
          <path d="M 28 52 L 28 48 M 28 52 L 32 52" stroke={strokeColor} strokeWidth="1" strokeOpacity={strokeOpacity} />
          <path d="M 52 52 L 52 48 M 52 52 L 48 52" stroke={strokeColor} strokeWidth="1" strokeOpacity={strokeOpacity} />
          <circle cx="40" cy="40" r="2.5" fill={strokeColor} fillOpacity={strokeOpacity} />
        </svg>
      );

    case 'form':
      // 02 Form: Bottle mold parting lines & architectural silhouette geometry
      return (
        <svg viewBox="0 0 80 80" fill="none" className="w-12 h-12 sm:w-14 sm:h-14 transition-all duration-500" aria-hidden="true">
          {/* Bottle neck & shoulder contour */}
          <rect x="33" y="14" width="14" height="10" rx="1" stroke={strokeColor} strokeWidth="1.2" strokeOpacity={strokeOpacity} />
          <path d="M 33 24 L 22 34 L 22 66 L 58 66 L 58 34 L 47 24 Z" stroke={strokeColor} strokeWidth="1.2" strokeOpacity={strokeOpacity} />
          {/* Mold parting centerline */}
          <line x1="40" y1="10" x2="40" y2="70" stroke={strokeColor} strokeWidth="0.8" strokeDasharray="3 2" strokeOpacity={detailOpacity} />
          {/* Dimension indicator lines */}
          <line x1="16" y1="34" x2="19" y2="34" stroke={strokeColor} strokeWidth="0.75" strokeOpacity={detailOpacity} />
          <line x1="16" y1="66" x2="19" y2="66" stroke={strokeColor} strokeWidth="0.75" strokeOpacity={detailOpacity} />
          <line x1="16" y1="34" x2="16" y2="66" stroke={strokeColor} strokeWidth="0.75" strokeOpacity={detailOpacity} />
          {/* Base push-up arc */}
          <path d="M 28 63 Q 40 57 52 63" stroke={strokeColor} strokeWidth="0.8" strokeDasharray="2 2" strokeOpacity={detailOpacity} />
        </svg>
      );

    case 'finish':
      // 03 Finish: Surface treatment, refraction facets & etching rays
      return (
        <svg viewBox="0 0 80 80" fill="none" className="w-12 h-12 sm:w-14 sm:h-14 transition-all duration-500" aria-hidden="true">
          {/* Prismatic facet diamond */}
          <polygon points="40,16 62,40 40,64 18,40" stroke={strokeColor} strokeWidth="1.2" strokeOpacity={strokeOpacity} />
          {/* Internal reflection facets */}
          <polygon points="40,24 54,40 40,56 26,40" stroke={strokeColor} strokeWidth="0.8" strokeDasharray="2.5 2" strokeOpacity={detailOpacity} />
          {/* Light dispersion rays */}
          <line x1="12" y1="40" x2="18" y2="40" stroke={strokeColor} strokeWidth="1" strokeOpacity={strokeOpacity} />
          <line x1="62" y1="40" x2="68" y2="40" stroke={strokeColor} strokeWidth="1" strokeOpacity={strokeOpacity} />
          <line x1="40" y1="10" x2="40" y2="16" stroke={strokeColor} strokeWidth="1" strokeOpacity={strokeOpacity} />
          <line x1="40" y1="64" x2="40" y2="70" stroke={strokeColor} strokeWidth="1" strokeOpacity={strokeOpacity} />
          {/* Surface coating hatch marks */}
          <line x1="32" y1="37" x2="48" y2="37" stroke={strokeColor} strokeWidth="0.75" strokeOpacity={detailOpacity} />
          <line x1="35" y1="43" x2="45" y2="43" stroke={strokeColor} strokeWidth="0.75" strokeOpacity={detailOpacity} />
        </svg>
      );

    case 'component':
      // 04 Component: Precision pump actuator, collar knurls & dip tube
      return (
        <svg viewBox="0 0 80 80" fill="none" className="w-12 h-12 sm:w-14 sm:h-14 transition-all duration-500" aria-hidden="true">
          {/* Actuator button with nozzle spout */}
          <path d="M 30 16 L 48 16 C 51 16 53 18 53 21 L 53 25 L 43 25 L 43 30 L 30 30 Z" stroke={strokeColor} strokeWidth="1.2" strokeOpacity={strokeOpacity} />
          <circle cx="50" cy="21" r="1.2" fill={strokeColor} fillOpacity={strokeOpacity} />
          {/* Metallic knurled collar */}
          <rect x="27" y="30" width="22" height="12" rx="0.5" stroke={strokeColor} strokeWidth="1.2" strokeOpacity={strokeOpacity} />
          <line x1="32" y1="30" x2="32" y2="42" stroke={strokeColor} strokeWidth="0.7" strokeOpacity={detailOpacity} />
          <line x1="38" y1="30" x2="38" y2="42" stroke={strokeColor} strokeWidth="0.7" strokeOpacity={detailOpacity} />
          <line x1="44" y1="30" x2="44" y2="42" stroke={strokeColor} strokeWidth="0.7" strokeOpacity={detailOpacity} />
          {/* Downward dip tube with flow arrow */}
          <line x1="38" y1="42" x2="38" y2="68" stroke={strokeColor} strokeWidth="1" strokeOpacity={strokeOpacity} />
          <path d="M 35 62 L 38 68 L 41 62" stroke={strokeColor} strokeWidth="0.8" strokeOpacity={detailOpacity} />
        </svg>
      );

    case 'supply':
      // 05 Global Supply: Global logistics datum, route axis & container crate
      return (
        <svg viewBox="0 0 80 80" fill="none" className="w-12 h-12 sm:w-14 sm:h-14 transition-all duration-500" aria-hidden="true">
          {/* Isometric crate / container matrix */}
          <polygon points="40,16 62,28 62,54 40,66 18,54 18,28" stroke={strokeColor} strokeWidth="1.2" strokeOpacity={strokeOpacity} />
          <line x1="40" y1="16" x2="40" y2="66" stroke={strokeColor} strokeWidth="0.8" strokeOpacity={detailOpacity} />
          <line x1="18" y1="28" x2="40" y2="40" stroke={strokeColor} strokeWidth="0.8" strokeOpacity={detailOpacity} />
          <line x1="62" y1="28" x2="40" y2="40" stroke={strokeColor} strokeWidth="0.8" strokeOpacity={detailOpacity} />
          {/* Outbound global supply axis vector */}
          <circle cx="40" cy="40" r="3" fill={strokeColor} fillOpacity={strokeOpacity} />
          <path d="M 52 46 L 68 56 M 68 56 L 62 56 M 68 56 L 68 50" stroke={strokeColor} strokeWidth="1.2" strokeOpacity={strokeOpacity} />
          <circle cx="18" cy="28" r="1.5" stroke={strokeColor} strokeWidth="0.8" strokeOpacity={detailOpacity} />
          <circle cx="62" cy="28" r="1.5" stroke={strokeColor} strokeWidth="0.8" strokeOpacity={detailOpacity} />
        </svg>
      );

    default:
      return null;
  }
}

export default function MaterialToMarketSection({ navigate }) {
  const shouldReduce = useReducedMotion();
  const [activeStageIndex, setActiveStageIndex] = useState(0);
  const [hoveredStageIndex, setHoveredStageIndex] = useState(null);

  // References for mobile auto-scroll activation via IntersectionObserver
  const mobileStageRefs = useRef([]);
  mobileStageRefs.current = [];
  const addToMobileRefs = (el) => {
    if (el && !mobileStageRefs.current.includes(el)) {
      mobileStageRefs.current.push(el);
    }
  };

  // Mobile viewport auto-activation: updates active stage smoothly on scroll
  useEffect(() => {
    if (typeof window === 'undefined' || shouldReduce) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.getAttribute('data-stage-index'));
            if (!isNaN(idx)) {
              setActiveStageIndex(idx);
            }
          }
        });
      },
      {
        rootMargin: '-30% 0px -40% 0px',
        threshold: 0.2
      }
    );

    mobileStageRefs.current.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [shouldReduce]);

  // Current display stage (hover takes precedence on desktop, active index otherwise)
  const currentIdx = hoveredStageIndex !== null ? hoveredStageIndex : activeStageIndex;
  const currentStage = STAGES[currentIdx] || STAGES[0];

  return (
    <section className="relative w-full bg-[#F6F2E9] text-luxury-charcoal pt-12 sm:pt-16 lg:pt-18 pb-8 sm:pb-10 border-t border-b border-[#282014]/[0.08] overflow-hidden select-none">
      
      {/* =========================================================================
          01 — ULTRA-SUBTLE BACKGROUND ARCHITECTURAL LINEWORK & CALIBRATION
          ========================================================================= */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Fine Architectural Grid (160px cells, 0.02 opacity) */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(40, 32, 20, 0.5) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(40, 32, 20, 0.4) 1px, transparent 1px)
            `,
            backgroundSize: '160px 160px'
          }}
        />

        {/* Technical Calibration Watermark */}
        <div className="absolute top-6 right-8 font-mono text-[8px] tracking-[0.24em] text-[#282014]/20 uppercase hidden lg:block">
          SEC-M2M // REF. 05-STEP ARCHITECTURE · SCALE 1:1
        </div>

        {/* Corner registration crosshairs */}
        <div className="absolute top-6 left-6 font-mono text-[10px] text-[#282014]/15 pointer-events-none">
          +
        </div>
        <div className="absolute bottom-6 right-6 font-mono text-[10px] text-[#282014]/15 pointer-events-none">
          +
        </div>
      </div>

      {/* =========================================================================
          02 — MAIN EDITORIAL SPREAD (Desktop 2-Part / Mobile Vertical)
          ========================================================================= */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 xl:gap-16 items-center">
        
        {/* LEFT COLUMN: Narrative, Headline & B2B Metrics (lg:col-span-5) */}
        <motion.div 
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 flex flex-col justify-center text-left"
        >
          {/* Small Gold Eyebrow */}
          <div className="flex items-center gap-2.5 mb-3.5">
            <span className="w-1.5 h-1.5 rounded-full bg-luxury-gold animate-pulse" />
            <span className="text-[10px] font-mono tracking-[0.28em] font-semibold text-luxury-gold uppercase">
              SEC 03 // PACKAGING ARCHITECTURE
            </span>
            <span className="w-6 h-px bg-luxury-gold/40" />
            <span className="text-[9px] font-mono tracking-[0.2em] uppercase text-neutral-500 hidden sm:inline-block">
              05 PHASES · PTI REF 2026
            </span>
          </div>

          {/* Large Serif Heading */}
          <h2 className="font-serif font-light text-3xl sm:text-5xl lg:text-[52px] leading-[1.02] tracking-tight text-luxury-charcoal">
            From Material <br />
            <span className="italic font-serif text-luxury-gold font-light block mt-1">
              to Market.
            </span>
          </h2>

          {/* Supporting Narrative */}
          <p className="font-serif text-base sm:text-lg text-neutral-700 font-light leading-relaxed mt-4 sm:mt-5 max-w-md">
            Packaging engineered from material selection to finished component and global B2B supply.
          </p>

          {/* Key Industrial Capability Metrics */}
          <div className="grid grid-cols-3 gap-4 pt-6 mt-6 border-t border-[#282014]/[0.08] text-[9.5px] font-mono tracking-[0.16em] uppercase text-neutral-500">
            <div>
              <span className="text-luxury-charcoal font-bold text-xs block font-mono">04+</span>
              <span className="leading-tight block mt-0.5">MATERIALS</span>
            </div>
            <div>
              <span className="text-luxury-charcoal font-bold text-xs block font-mono">14</span>
              <span className="leading-tight block mt-0.5">DIVISIONS</span>
            </div>
            <div>
              <span className="text-luxury-charcoal font-bold text-xs block font-mono">GLOBAL</span>
              <span className="leading-tight block mt-0.5">B2B EXPORT</span>
            </div>
          </div>

          {/* Single Editorial CTA Button: Tier 2 Architectural */}
          <div className="pt-8">
            <Magnetic>
              <button
                onClick={() => navigate('/collections')}
                className="btn-luxury-secondary"
                aria-label="View our collections directory"
              >
                <span>VIEW OUR COLLECTIONS</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </Magnetic>
          </div>

        </motion.div>

        {/* RIGHT COLUMN: 2D/SVG Process Visualization (lg:col-span-7) */}
        <div className="lg:col-span-7 w-full flex flex-col justify-center">
          
          {/* =========================================================================
              DESKTOP VIEW: Continuous Horizontal Process Line (lg: and above)
              ========================================================================= */}
          <div className="hidden lg:block relative w-full pt-4 pb-2">
            
            {/* The Continuous Architectural Reference Line */}
            <div className="relative w-full mb-8">
              <svg className="w-full h-8 overflow-visible" preserveAspectRatio="none" viewBox="0 0 500 32">
                {/* Base grey line */}
                <line x1="30" y1="16" x2="470" y2="16" stroke="#282014" strokeWidth="1" strokeOpacity="0.15" />
                
                {/* Animated Gold Progress Line */}
                <motion.line 
                  x1="30" 
                  y1="16" 
                  x2={30 + (currentIdx / 4) * 440} 
                  y2="16" 
                  stroke="#C5A059" 
                  strokeWidth="1.5" 
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                />

                {/* 5 Anchor Nodes */}
                {STAGES.map((s, idx) => {
                  const nodeX = 30 + (idx / 4) * 440;
                  const isNodeActive = idx <= currentIdx;
                  const isCurrent = idx === currentIdx;

                  return (
                    <g key={s.id} className="cursor-pointer" onClick={() => setActiveStageIndex(idx)}>
                      {/* Outer concentric ring */}
                      <circle 
                        cx={nodeX} 
                        cy="16" 
                        r={isCurrent ? "9" : "6"} 
                        fill="#F4F0E7" 
                        stroke={isNodeActive ? "#C5A059" : "#282014"} 
                        strokeWidth="1" 
                        strokeOpacity={isNodeActive ? 1 : 0.25}
                        className="transition-all duration-400"
                      />
                      {/* Inner solid node */}
                      <circle 
                        cx={nodeX} 
                        cy="16" 
                        r={isCurrent ? "4" : "2.5"} 
                        fill={isNodeActive ? "#C5A059" : "#282014"} 
                        fillOpacity={isNodeActive ? 1 : 0.3}
                        className="transition-all duration-400"
                      />
                    </g>
                  );
                })}
              </svg>

              {/* Subtle Moving Traveling Inspection Point (Slow Restrained Pulse) */}
              {!shouldReduce && (
                <motion.div 
                  className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-luxury-gold pointer-events-none -ml-1 blur-[0.5px]"
                  animate={{
                    left: `${(currentIdx / 4) * 88 + 6}%`
                  }}
                  transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                />
              )}
            </div>

            {/* 5 Horizontally Distributed Stages (Open Space, No Card Borders!) */}
            <div className="grid grid-cols-5 gap-3 xl:gap-4 items-start">
              {STAGES.map((stage, idx) => {
                const isActive = idx === currentIdx;
                const isHovered = hoveredStageIndex === idx;

                return (
                  <div
                    key={stage.id}
                    onMouseEnter={() => setHoveredStageIndex(idx)}
                    onMouseLeave={() => setHoveredStageIndex(null)}
                    onClick={() => setActiveStageIndex(idx)}
                    tabIndex={0}
                    role="button"
                    aria-label={`Inspect ${stage.title} phase`}
                    className={`flex flex-col items-center text-center cursor-pointer transition-all duration-500 group focus:outline-none ${
                      isActive ? 'opacity-100 scale-100' : 'opacity-65 hover:opacity-90 scale-[0.98]'
                    }`}
                  >
                    {/* Architectural Vector Line-Art Specimen */}
                    <div 
                      className={`relative mb-3 flex items-center justify-center transition-transform duration-500 ${
                        isActive ? '-translate-y-1' : 'group-hover:-translate-y-0.5'
                      }`}
                    >
                      <StageVectorIllustration 
                        stageId={stage.id} 
                        isActive={isActive} 
                        isHovered={isHovered} 
                      />
                    </div>

                    {/* Small Number & Stage Title */}
                    <span className={`font-mono text-[9px] tracking-[0.2em] font-semibold transition-colors duration-300 ${
                      isActive ? 'text-luxury-gold' : 'text-neutral-500 group-hover:text-luxury-gold/70'
                    }`}>
                      {stage.num}
                    </span>

                    <h3 className={`font-serif text-sm xl:text-base font-normal transition-colors duration-300 leading-snug mt-0.5 ${
                      isActive ? 'text-luxury-charcoal font-medium' : 'text-neutral-700 group-hover:text-luxury-charcoal'
                    }`}>
                      {stage.title}
                    </h3>

                    {/* Short Descriptor */}
                    <p className={`text-[10px] leading-relaxed transition-colors duration-300 mt-1 max-w-[120px] ${
                      isActive ? 'text-neutral-600 font-normal' : 'text-neutral-500/80 font-light'
                    }`}>
                      {stage.descriptor}
                    </p>

                    {/* Subtle Coordinate / Tolerance Footnote */}
                    <span className="font-mono text-[7.5px] tracking-widest text-[#282014]/30 uppercase mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {stage.coords}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Stage Technical Detail Drawer: Clean Expanded Technical Note */}
            <motion.div 
              key={currentStage.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mt-8 pt-4 border-t border-[#282014]/[0.07] flex items-center justify-between text-[11px] font-mono tracking-wider text-neutral-600 uppercase"
            >
              <div className="flex items-center gap-3">
                <span className="text-luxury-gold font-semibold">{currentStage.num} // {currentStage.title}:</span>
                <span className="text-neutral-600 font-sans normal-case text-xs">{currentStage.detail}</span>
              </div>
              <span className="text-neutral-400 font-mono text-[9px] tracking-widest hidden xl:inline-block">
                {currentStage.coords}
              </span>
            </motion.div>

          </div>

          {/* =========================================================================
              MOBILE & TABLET VIEW: Dedicated Vertical Continuous Pipeline (< lg: 1024px)
              ========================================================================= */}
          <div className="block lg:hidden relative w-full pt-4">
            
            {/* The Vertical Continuous Reference Spine */}
            <div className="relative pl-6 sm:pl-8">
              
              {/* Continuous vertical guide line running behind all stages */}
              <div className="absolute left-[13px] sm:left-[17px] top-4 bottom-8 w-px bg-[#282014]/15" />

              {/* 5 Vertical Stages */}
              <div className="flex flex-col space-y-8 sm:space-y-10">
                {STAGES.map((stage, idx) => {
                  const isActive = idx === activeStageIndex;

                  return (
                    <div
                      key={stage.id}
                      ref={addToMobileRefs}
                      data-stage-index={idx}
                      onClick={() => setActiveStageIndex(idx)}
                      className={`relative flex items-start gap-4 sm:gap-6 min-h-[56px] transition-all duration-500 cursor-pointer ${
                        isActive ? 'opacity-100' : 'opacity-65'
                      }`}
                    >
                      {/* Vertical Node Indicator */}
                      <div className="absolute -left-[19px] sm:-left-[23px] top-1.5 flex items-center justify-center">
                        <div className={`w-3.5 h-3.5 rounded-full bg-[#F4F0E7] border transition-all duration-400 flex items-center justify-center ${
                          isActive ? 'border-luxury-gold scale-125' : 'border-[#282014]/30'
                        }`}>
                          <div className={`w-1.5 h-1.5 rounded-full transition-colors duration-400 ${
                            isActive ? 'bg-luxury-gold' : 'bg-[#282014]/40'
                          }`} />
                        </div>
                      </div>

                      {/* Stage Vector Specimen Illustration */}
                      <div className={`flex-shrink-0 transition-transform duration-500 ${
                        isActive ? '-translate-y-0.5 scale-105' : 'scale-95'
                      }`}>
                        <StageVectorIllustration 
                          stageId={stage.id} 
                          isActive={isActive} 
                          isHovered={false} 
                        />
                      </div>

                      {/* Stage Text & Details */}
                      <div className="flex flex-col text-left">
                        <div className="flex items-center gap-2">
                          <span className={`font-mono text-[9px] tracking-widest font-semibold ${
                            isActive ? 'text-luxury-gold' : 'text-neutral-500'
                          }`}>
                            {stage.num}
                          </span>
                          <span className="text-[#282014]/30 text-[8px] font-mono">/</span>
                          <h3 className={`font-serif text-lg sm:text-xl font-normal leading-snug ${
                            isActive ? 'text-luxury-charcoal font-medium' : 'text-neutral-700'
                          }`}>
                            {stage.title}
                          </h3>
                        </div>

                        {/* Descriptor */}
                        <p className="text-xs font-mono tracking-wider text-luxury-gold/90 mt-0.5">
                          {stage.descriptor}
                        </p>

                        {/* Full Detail on Active */}
                        <p className="text-xs text-neutral-600 leading-relaxed font-light mt-1.5 max-w-sm">
                          {stage.detail}
                        </p>
                      </div>

                    </div>
                  );
                })}
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>

      {/* =========================================================================
          03 — SUBTLE ARCHITECTURAL BASELINE RULE (BREATHING TRANSITION INTO SEC 04)
          ========================================================================= */}
      <div className="w-full pt-6 sm:pt-8 relative z-10">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between border-t border-[#282014]/[0.07] pt-2.5 font-mono text-[7.5px] sm:text-[8px] tracking-[0.22em] text-[#282014]/30 uppercase">
            <span>TRANSITION · PTI REF 2026</span>
            <div className="flex items-center gap-3">
              <span className="hidden sm:inline-block">CALIB. 0.05MM</span>
              <span className="text-luxury-gold/50">+ + +</span>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
