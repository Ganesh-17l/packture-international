import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { CATEGORIES } from '../../data/products';
import { COLLECTION_ARCHIVE_DATA } from '../../data/collectionSpecs';
import Magnetic from '../../components/common/Magnetic';

/**
 * Architectural SVG Line Silhouette Component.
 * Minimalist, monochromatic, low-contrast technical line drawings
 * representing each packaging category's authentic physical geometry.
 */
function SpecimenLineArt({ type, className = "w-10 h-10", isHovered = false }) {
  const strokeColor = isHovered ? "#C5A059" : "#282014";

  switch (type) {
    case 'perfume':
      return (
        <svg viewBox="0 0 60 80" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          {/* Cap */}
          <rect x="23" y="8" width="14" height="15" rx="1" stroke={strokeColor} strokeWidth="1.2" />
          {/* Collar */}
          <rect x="21" y="23" width="18" height="4" stroke={strokeColor} strokeWidth="1" />
          {/* Bottle Body */}
          <rect x="14" y="27" width="32" height="46" rx="2" stroke={strokeColor} strokeWidth="1.2" />
          {/* Base Push-up concavity */}
          <path d="M 18 69 Q 30 63 42 69" stroke={strokeColor} strokeWidth="0.8" strokeDasharray="1.5 1.5" />
          {/* Fill meniscus line */}
          <line x1="17" y1="38" x2="43" y2="38" stroke={strokeColor} strokeWidth="0.6" strokeDasharray="2 2" opacity="0.6" />
        </svg>
      );

    case 'dropper':
      return (
        <svg viewBox="0 0 60 80" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          {/* Rubber bulb */}
          <path d="M 26 12 C 26 6 34 6 34 12 L 35 18 L 25 18 Z" stroke={strokeColor} strokeWidth="1" />
          {/* Collar cap */}
          <rect x="22" y="18" width="16" height="8" rx="0.5" stroke={strokeColor} strokeWidth="1.2" />
          {/* Dropper neck */}
          <rect x="24" y="26" width="12" height="3" stroke={strokeColor} strokeWidth="0.8" />
          {/* Bottle body */}
          <rect x="17" y="29" width="26" height="44" rx="2" stroke={strokeColor} strokeWidth="1.2" />
          {/* Glass pipette inner tube */}
          <line x1="30" y1="26" x2="30" y2="66" stroke={strokeColor} strokeWidth="0.8" strokeDasharray="2 2" />
          <circle cx="30" cy="68" r="1.5" stroke={strokeColor} strokeWidth="0.8" />
        </svg>
      );

    case 'fancy':
      return (
        <svg viewBox="0 0 60 80" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          {/* Rectangular gold cap */}
          <rect x="21" y="10" width="18" height="12" rx="1" stroke={strokeColor} strokeWidth="1.2" />
          {/* Neck */}
          <rect x="26" y="22" width="8" height="4" stroke={strokeColor} strokeWidth="1" />
          {/* Geometric beveled shoulder & body */}
          <path d="M 26 26 L 14 34 L 14 68 L 18 73 L 42 73 L 46 68 L 46 34 L 34 26 Z" stroke={strokeColor} strokeWidth="1.2" />
          {/* Inner crystal facet lines */}
          <line x1="20" y1="36" x2="20" y2="67" stroke={strokeColor} strokeWidth="0.75" opacity="0.6" />
          <line x1="40" y1="36" x2="40" y2="67" stroke={strokeColor} strokeWidth="0.75" opacity="0.6" />
        </svg>
      );

    case 'jar':
      return (
        <svg viewBox="0 0 60 80" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          {/* Wide Screw Cap */}
          <rect x="12" y="26" width="36" height="9" rx="1" stroke={strokeColor} strokeWidth="1.2" />
          {/* Outer Glass Jar Body */}
          <rect x="13" y="35" width="34" height="26" rx="2" stroke={strokeColor} strokeWidth="1.2" />
          {/* Heavy Glass Base Wall */}
          <rect x="17" y="38" width="26" height="17" stroke={strokeColor} strokeWidth="0.8" strokeDasharray="2 2" opacity="0.6" />
          <line x1="13" y1="56" x2="47" y2="56" stroke={strokeColor} strokeWidth="0.75" opacity="0.5" />
        </svg>
      );

    case 'tube':
      return (
        <svg viewBox="0 0 60 80" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          {/* Crimped top seal */}
          <rect x="16" y="12" width="28" height="4" stroke={strokeColor} strokeWidth="1.2" />
          <line x1="20" y1="12" x2="20" y2="16" stroke={strokeColor} strokeWidth="0.7" />
          <line x1="24" y1="12" x2="24" y2="16" stroke={strokeColor} strokeWidth="0.7" />
          <line x1="28" y1="12" x2="28" y2="16" stroke={strokeColor} strokeWidth="0.7" />
          <line x1="32" y1="12" x2="32" y2="16" stroke={strokeColor} strokeWidth="0.7" />
          <line x1="36" y1="12" x2="36" y2="16" stroke={strokeColor} strokeWidth="0.7" />
          <line x1="40" y1="12" x2="40" y2="16" stroke={strokeColor} strokeWidth="0.7" />
          {/* Tube body tapering down to cap */}
          <path d="M 16 16 L 20 60 L 40 60 L 44 16 Z" stroke={strokeColor} strokeWidth="1.2" />
          {/* Octagonal stand-up cap */}
          <rect x="22" y="60" width="16" height="9" rx="0.5" stroke={strokeColor} strokeWidth="1.2" />
        </svg>
      );

    case 'pet':
      return (
        <svg viewBox="0 0 60 80" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          {/* Disc-top / Pump head */}
          <path d="M 25 14 L 35 14 L 35 18 L 39 18 L 39 21 L 35 21 L 35 23 L 25 23 Z" stroke={strokeColor} strokeWidth="1" />
          {/* Collar ring */}
          <rect x="24" y="23" width="12" height="3" stroke={strokeColor} strokeWidth="0.8" />
          {/* Bottle body */}
          <path d="M 24 26 C 20 28 17 32 17 36 L 17 68 C 17 71 20 73 24 73 L 36 73 C 40 73 43 71 43 68 L 43 36 C 43 32 40 28 36 26 Z" stroke={strokeColor} strokeWidth="1.2" />
          {/* Central dip tube */}
          <line x1="30" y1="26" x2="30" y2="70" stroke={strokeColor} strokeWidth="0.7" strokeDasharray="2 2" opacity="0.5" />
        </svg>
      );

    case 'hdpe':
      return (
        <svg viewBox="0 0 60 80" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          {/* Ribbed industrial cap */}
          <rect x="23" y="14" width="14" height="9" rx="0.5" stroke={strokeColor} strokeWidth="1.2" />
          <line x1="26" y1="14" x2="26" y2="23" stroke={strokeColor} strokeWidth="0.6" opacity="0.6" />
          <line x1="30" y1="14" x2="30" y2="23" stroke={strokeColor} strokeWidth="0.6" opacity="0.6" />
          <line x1="34" y1="14" x2="34" y2="23" stroke={strokeColor} strokeWidth="0.6" opacity="0.6" />
          {/* Sturdy ergonomic bottle profile */}
          <path d="M 23 23 L 15 32 L 15 68 C 15 71 18 73 22 73 L 38 73 C 42 73 45 71 45 68 L 45 32 L 37 23 Z" stroke={strokeColor} strokeWidth="1.2" />
        </svg>
      );

    case 'doublejar':
      return (
        <svg viewBox="0 0 60 80" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          {/* Outer Cap */}
          <rect x="12" y="24" width="36" height="9" rx="1" stroke={strokeColor} strokeWidth="1.2" />
          {/* Outer Clear PMMA Wall */}
          <rect x="12" y="33" width="36" height="28" rx="2" stroke={strokeColor} strokeWidth="1.2" />
          {/* Inner PP Suspended Jar Cup */}
          <rect x="17" y="37" width="26" height="20" rx="1" stroke={strokeColor} strokeWidth="0.9" strokeDasharray="2 1.5" />
          {/* Metallic Collar line */}
          <line x1="12" y1="36" x2="48" y2="36" stroke={strokeColor} strokeWidth="0.8" opacity="0.7" />
        </svg>
      );

    case 'airless':
      return (
        <svg viewBox="0 0 60 80" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          {/* Flush Actuator Cap */}
          <rect x="22" y="10" width="16" height="13" rx="1" stroke={strokeColor} strokeWidth="1.2" />
          {/* Actuator Orifice */}
          <circle cx="26" cy="16" r="1" stroke={strokeColor} strokeWidth="0.8" />
          {/* Metallic Ring */}
          <rect x="21" y="23" width="18" height="4" stroke={strokeColor} strokeWidth="1" />
          {/* Slender Outer Cylinder */}
          <rect x="19" y="27" width="22" height="46" rx="2" stroke={strokeColor} strokeWidth="1.2" />
          {/* Internal Vacuum Piston */}
          <line x1="21" y1="64" x2="39" y2="64" stroke={strokeColor} strokeWidth="1" />
          <line x1="21" y1="67" x2="39" y2="67" stroke={strokeColor} strokeWidth="0.6" strokeDasharray="1.5 1.5" opacity="0.6" />
        </svg>
      );

    case 'closure':
      return (
        <svg viewBox="0 0 60 80" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          {/* Luxury Crown Bevel */}
          <path d="M 16 32 L 20 26 L 40 26 L 44 32 Z" stroke={strokeColor} strokeWidth="1.2" />
          {/* Main Cap Body */}
          <rect x="15" y="32" width="30" height="22" rx="1" stroke={strokeColor} strokeWidth="1.2" />
          {/* Precision Knurling Ribs */}
          <line x1="19" y1="36" x2="19" y2="50" stroke={strokeColor} strokeWidth="0.75" opacity="0.7" />
          <line x1="23" y1="36" x2="23" y2="50" stroke={strokeColor} strokeWidth="0.75" opacity="0.7" />
          <line x1="27" y1="36" x2="27" y2="50" stroke={strokeColor} strokeWidth="0.75" opacity="0.7" />
          <line x1="31" y1="36" x2="31" y2="50" stroke={strokeColor} strokeWidth="0.75" opacity="0.7" />
          <line x1="35" y1="36" x2="35" y2="50" stroke={strokeColor} strokeWidth="0.75" opacity="0.7" />
          <line x1="39" y1="36" x2="39" y2="50" stroke={strokeColor} strokeWidth="0.75" opacity="0.7" />
          {/* Inner Sealing Lip */}
          <line x1="19" y1="52" x2="41" y2="52" stroke={strokeColor} strokeWidth="0.75" strokeDasharray="2 2" />
        </svg>
      );

    case 'pump':
      return (
        <svg viewBox="0 0 60 80" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          {/* Actuator Head & Spout */}
          <path d="M 24 16 L 38 16 C 41 16 43 18 43 20 L 43 23 L 34 23 L 34 27 L 24 27 Z" stroke={strokeColor} strokeWidth="1.2" />
          <line x1="43" y1="21" x2="45" y2="21" stroke={strokeColor} strokeWidth="1.2" />
          {/* Metallic Oversleeve Collar */}
          <rect x="22" y="27" width="16" height="8" rx="0.5" stroke={strokeColor} strokeWidth="1.2" />
          {/* Downward Dipping Tube */}
          <line x1="30" y1="35" x2="30" y2="72" stroke={strokeColor} strokeWidth="1" />
          {/* Orifice exit angle */}
          <line x1="30" y1="72" x2="33" y2="74" stroke={strokeColor} strokeWidth="0.8" />
        </svg>
      );

    case 'rollon':
      return (
        <svg viewBox="0 0 60 80" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          {/* Spherical roller ball */}
          <circle cx="30" cy="18" r="5" stroke={strokeColor} strokeWidth="1.2" />
          {/* PE Ball Housing */}
          <path d="M 23 20 C 23 24 25 26 27 27 L 33 27 C 35 26 37 24 37 20" stroke={strokeColor} strokeWidth="1" />
          {/* Neck ring */}
          <rect x="24" y="27" width="12" height="3" stroke={strokeColor} strokeWidth="0.8" />
          {/* Slender glass vial body */}
          <rect x="21" y="30" width="18" height="42" rx="1.5" stroke={strokeColor} strokeWidth="1.2" />
          {/* Patti panel facet line */}
          <line x1="26" y1="34" x2="26" y2="68" stroke={strokeColor} strokeWidth="0.75" opacity="0.6" />
          <line x1="34" y1="34" x2="34" y2="68" stroke={strokeColor} strokeWidth="0.75" opacity="0.6" />
        </svg>
      );

    case 'aluminium':
      return (
        <svg viewBox="0 0 60 80" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          {/* Shallow Round Aluminium Tin Lid */}
          <rect x="11" y="31" width="38" height="7" rx="1" stroke={strokeColor} strokeWidth="1.2" />
          <line x1="11" y1="34" x2="49" y2="34" stroke={strokeColor} strokeWidth="0.6" opacity="0.6" />
          {/* Threaded Base Casing */}
          <rect x="12" y="38" width="36" height="15" rx="1" stroke={strokeColor} strokeWidth="1.2" />
          {/* Thread lines */}
          <line x1="14" y1="41" x2="46" y2="41" stroke={strokeColor} strokeWidth="0.7" strokeDasharray="3 2" opacity="0.6" />
          <line x1="14" y1="45" x2="46" y2="45" stroke={strokeColor} strokeWidth="0.7" strokeDasharray="3 2" opacity="0.6" />
        </svg>
      );

    case 'cosmetics':
      return (
        <svg viewBox="0 0 60 80" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          {/* Mascara tube */}
          <rect x="18" y="24" width="10" height="48" rx="1" stroke={strokeColor} strokeWidth="1.2" />
          <line x1="18" y1="40" x2="28" y2="40" stroke={strokeColor} strokeWidth="0.8" opacity="0.7" />
          {/* Extracted Wand stem */}
          <line x1="38" y1="20" x2="38" y2="72" stroke={strokeColor} strokeWidth="1" />
          {/* Wand handle/cap */}
          <rect x="34" y="52" width="8" height="20" rx="0.5" stroke={strokeColor} strokeWidth="1.2" />
          {/* Micro-bristles */}
          <line x1="33" y1="23" x2="43" y2="23" stroke={strokeColor} strokeWidth="0.8" />
          <line x1="32" y1="26" x2="44" y2="26" stroke={strokeColor} strokeWidth="0.8" />
          <line x1="33" y1="29" x2="43" y2="29" stroke={strokeColor} strokeWidth="0.8" />
          <line x1="34" y1="32" x2="42" y2="32" stroke={strokeColor} strokeWidth="0.8" />
          <line x1="35" y1="35" x2="41" y2="35" stroke={strokeColor} strokeWidth="0.8" />
        </svg>
      );

    default:
      return null;
  }
}

/**
 * DarkCollectionArchive Component
 * 
 * Re-art-directs the dark "Explore Our Collections" section into a
 * refined Dark Editorial Collection Archive Index:
 * - Architectural technical background (registration marks, subtle grid, faint numerals)
 * - 14 Collections arranged in a balanced multi-column catalogue index
 * - Micro-interaction: hovering a row illuminates the gold index, extends hairline, and reveals SVG silhouette
 * - Smooth transitional bridge from the light sector cards above
 * - Respects prefers-reduced-motion
 * - Dedicated single-column layout on mobile with tap/scroll activation
 */
export default function DarkCollectionArchive({ navigate }) {
  const shouldReduce = useReducedMotion();
  const [activeSlug, setActiveSlug] = useState("perfume-glass-bottles");
  const [hoveredSlug, setHoveredSlug] = useState(null);

  // Current active collection data for the technical inspection plate
  const currentSlug = hoveredSlug || activeSlug;
  const currentCat = CATEGORIES.find(c => c.slug === currentSlug) || CATEGORIES[0];
  const currentData = COLLECTION_ARCHIVE_DATA[currentSlug] || COLLECTION_ARCHIVE_DATA["perfume-glass-bottles"];

  // Split all 14 categories into two balanced columns (7 items each) for desktop/tablet
  const colLeft = CATEGORIES.slice(0, 7);
  const colRight = CATEGORIES.slice(7, 14);

  return (
    <section className="relative w-full bg-[#F6F2E9] text-luxury-charcoal overflow-hidden select-none border-t border-b border-[#282014]/[0.08]">
      
      {/* =========================================================================
          01 — ULTRA-SUBTLE TECHNICAL BACKGROUND (Parchment Depth)
          ========================================================================= */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        
        {/* Subtle Architectural Fine Grid (120px cells, 0.03 opacity) */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(40, 32, 20, 0.4) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(40, 32, 20, 0.35) 1px, transparent 1px)
            `,
            backgroundSize: '120px 120px'
          }}
        />

        {/* Faint oversized catalogue Roman numeral in the background */}
        <div className="absolute right-4 lg:right-12 top-1/2 -translate-y-1/2 font-serif text-[28vw] lg:text-[22vw] text-[#282014]/[0.025] font-light leading-none select-none pointer-events-none">
          XIV
        </div>

        {/* Architectural registration crosshairs at key corners */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.035]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="archive-cross" width="240" height="240" patternUnits="userSpaceOnUse">
              <path d="M 120 114 L 120 126 M 114 120 L 126 120" stroke="#282014" strokeWidth="0.75" />
              <circle cx="120" cy="120" r="8" fill="none" stroke="#282014" strokeWidth="0.5" strokeDasharray="1.5 1.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#archive-cross)" />
        </svg>

        {/* Tactile paper texture */}
        <div className="absolute inset-0 bg-grain opacity-25 mix-blend-multiply" />
      </div>

      {/* =========================================================================
          02 — MAIN EDITORIAL CANVAS
          ========================================================================= */}
      <div className="relative z-10 max-w-7xl mx-auto pt-8 sm:pt-10 lg:pt-12 pb-12 sm:pb-16 px-5 sm:px-8 lg:px-12">
        
        {/* HERO HEADER AREA */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 sm:pb-16 border-b border-[#282014]/[0.08]">
          <div className="max-w-2xl">
            {/* Small Gold Eyebrow */}
            <div className="flex items-center gap-2.5 mb-3.5">
              <span className="w-1.5 h-1.5 rounded-full bg-luxury-gold animate-pulse" />
              <span className="text-[10px] font-mono tracking-[0.28em] font-semibold text-luxury-gold uppercase">
                SEC 04 // ARCHIVE INDEX
              </span>
              <span className="w-6 h-px bg-luxury-gold/40" />
              <span className="text-[9px] font-mono tracking-[0.2em] uppercase text-neutral-500 hidden sm:inline-block">
                14 PACKAGING DIVISIONS · PTI REF 2026
              </span>
            </div>

            {/* Large Elegant Serif Heading */}
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-[54px] font-light text-luxury-charcoal leading-[1.05] tracking-tight">
              Explore Our Collections<span className="italic font-serif text-luxury-gold">.</span>
            </h2>

            {/* Short Refined Description */}
            <p className="text-xs sm:text-sm text-neutral-600 font-light leading-relaxed max-w-lg mt-3 sm:mt-4">
              A considered library of packaging formats, materials and dispensing systems engineered for modern beauty and personal care.
            </p>
          </div>

          {/* Refined Editorial Navigation Element: Tier 2 Architectural */}
          <div className="flex items-center">
            <Magnetic>
              <button
                onClick={() => navigate('/collections')}
                className="btn-luxury-secondary text-luxury-charcoal"
                aria-label="Open complete collection archive: All 14 Divisions"
              >
                <span className="text-luxury-charcoal font-semibold">OPEN COLLECTION ARCHIVE · 14 DIVISIONS</span>
                <ArrowRight className="w-3.5 h-3.5 text-luxury-gold" />
              </button>
            </Magnetic>
          </div>
        </div>

        {/* =========================================================================
            04 — THE COLLECTION ARCHIVE INDEX (Desktop 2-Column / Mobile Single-Column)
            ========================================================================= */}
        <div className="pt-8 sm:pt-12">
          
          {/* DESKTOP & TABLET TWO-COLUMN INDEX (md: and above) */}
          <div className="hidden md:grid md:grid-cols-2 gap-x-12 lg:gap-x-16 gap-y-2">
            
            {/* COLUMN 1: Items 01 through 07 */}
            <div className="flex flex-col">
              {colLeft.map((cat, idx) => {
                const data = COLLECTION_ARCHIVE_DATA[cat.slug] || {
                  index: String(idx + 1).padStart(2, '0'),
                  subtitle: "Packaging Division",
                  spec: "B2B Tooling",
                  type: "perfume"
                };
                const isHovered = hoveredSlug === cat.slug;

                return (
                  <motion.div
                    key={cat.slug}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-20px" }}
                    transition={{ 
                      duration: 0.5, 
                      ease: [0.16, 1, 0.3, 1], 
                      delay: shouldReduce ? 0 : idx * 0.04 
                    }}
                    onMouseEnter={() => {
                      setHoveredSlug(cat.slug);
                      setActiveSlug(cat.slug);
                    }}
                    onMouseLeave={() => setHoveredSlug(null)}
                    onClick={() => navigate(`/collections/${cat.slug}`)}
                    className="group relative flex items-center justify-between py-4 sm:py-5 px-3 rounded-[2px] transition-all duration-400 cursor-pointer border-b border-[#282014]/[0.08] hover:border-transparent hover:bg-white/50"
                  >
                    {/* Hover Gold Hairline Accent Bar on the Left */}
                    <div 
                      className={`absolute left-0 top-1/2 -translate-y-1/2 w-[2px] bg-luxury-gold transition-all duration-400 ease-out ${
                        isHovered ? 'h-8 opacity-100' : 'h-0 opacity-0'
                      }`}
                    />

                    {/* Left Details: Index + Title + Subtitle */}
                    <div className="flex items-center gap-4 sm:gap-6 pl-1 sm:pl-2">
                      <span className="font-mono text-xs sm:text-[13px] tracking-wider text-neutral-500 group-hover:text-luxury-gold transition-colors duration-300 font-semibold w-6">
                        {data.index}
                      </span>

                      <div className="flex flex-col">
                        <div className="flex items-baseline gap-3">
                          <h3 className="font-serif text-lg sm:text-xl lg:text-[22px] font-normal text-luxury-charcoal group-hover:text-luxury-gold transition-all duration-300 leading-snug group-hover:translate-x-1.5">
                            {cat.name}
                          </h3>
                        </div>
                        <span className="text-[10px] font-mono tracking-[0.16em] uppercase text-neutral-500 group-hover:text-luxury-gold/90 transition-colors duration-300 mt-1">
                          {data.subtitle} <span className="opacity-30">·</span> <span className="text-neutral-500/70 font-normal">{data.spec}</span>
                        </span>
                      </div>
                    </div>

                    {/* Right: Architectural SVG Specimen Silhouette + Exploration Arrow */}
                    <div className="flex items-center gap-4 sm:gap-6 pr-2">
                      <div className="transition-all duration-500 ease-out transform group-hover:scale-110 opacity-40 group-hover:opacity-100">
                        <SpecimenLineArt type={data.type} isHovered={isHovered} className="w-7 h-7 sm:w-8 sm:h-8" />
                      </div>

                      <div className="w-7 h-7 rounded-full flex items-center justify-center border border-[#282014]/15 group-hover:border-luxury-gold text-neutral-500 group-hover:text-luxury-gold group-hover:bg-luxury-gold/10 transition-all duration-300 group-hover:translate-x-1">
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </div>
                    </div>

                    {/* Expandable gold hairline on hover */}
                    <div className="absolute bottom-0 left-0 w-0 group-hover:w-full h-px bg-gradient-to-r from-luxury-gold/60 via-luxury-gold/20 to-transparent transition-all duration-500 pointer-events-none" />
                  </motion.div>
                );
              })}
            </div>

            {/* COLUMN 2: Items 08 through 14 */}
            <div className="flex flex-col">
              {colRight.map((cat, idx) => {
                const data = COLLECTION_ARCHIVE_DATA[cat.slug] || {
                  index: String(idx + 8).padStart(2, '0'),
                  subtitle: "Packaging Division",
                  spec: "B2B Tooling",
                  type: "perfume"
                };
                const isHovered = hoveredSlug === cat.slug;

                return (
                  <motion.div
                    key={cat.slug}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-20px" }}
                    transition={{ 
                      duration: 0.5, 
                      ease: [0.16, 1, 0.3, 1], 
                      delay: shouldReduce ? 0 : (idx + 7) * 0.04 
                    }}
                    onMouseEnter={() => {
                      setHoveredSlug(cat.slug);
                      setActiveSlug(cat.slug);
                    }}
                    onMouseLeave={() => setHoveredSlug(null)}
                    onClick={() => navigate(`/collections/${cat.slug}`)}
                    className="group relative flex items-center justify-between py-4 sm:py-5 px-3 rounded-[2px] transition-all duration-400 cursor-pointer border-b border-[#282014]/[0.08] hover:border-transparent hover:bg-white/50"
                  >
                    {/* Hover Gold Hairline Accent Bar on the Left */}
                    <div 
                      className={`absolute left-0 top-1/2 -translate-y-1/2 w-[2px] bg-luxury-gold transition-all duration-400 ease-out ${
                        isHovered ? 'h-8 opacity-100' : 'h-0 opacity-0'
                      }`}
                    />

                    {/* Left Details: Index + Title + Subtitle */}
                    <div className="flex items-center gap-4 sm:gap-6 pl-1 sm:pl-2">
                      <span className="font-mono text-xs sm:text-[13px] tracking-wider text-neutral-500 group-hover:text-luxury-gold transition-colors duration-300 font-semibold w-6">
                        {data.index}
                      </span>

                      <div className="flex flex-col">
                        <div className="flex items-baseline gap-3">
                          <h3 className="font-serif text-lg sm:text-xl lg:text-[22px] font-normal text-luxury-charcoal group-hover:text-luxury-gold transition-all duration-300 leading-snug group-hover:translate-x-1.5">
                            {cat.name}
                          </h3>
                        </div>
                        <span className="text-[10px] font-mono tracking-[0.16em] uppercase text-neutral-500 group-hover:text-luxury-gold/80 transition-colors duration-300 mt-1">
                          {data.subtitle} <span className="opacity-30">·</span> <span className="text-neutral-500/70 font-normal">{data.spec}</span>
                        </span>
                      </div>
                    </div>

                    {/* Right: Architectural SVG Specimen Silhouette + Exploration Arrow */}
                    <div className="flex items-center gap-4 sm:gap-6 pr-2">
                      <div className="transition-all duration-500 ease-out transform group-hover:scale-110 opacity-40 group-hover:opacity-100">
                        <SpecimenLineArt type={data.type} isHovered={isHovered} className="w-7 h-7 sm:w-8 sm:h-8" />
                      </div>

                      <div className="w-7 h-7 rounded-full flex items-center justify-center border border-[#282014]/15 group-hover:border-luxury-gold text-neutral-500 group-hover:text-luxury-gold group-hover:bg-luxury-gold/10 transition-all duration-300 group-hover:translate-x-1">
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </div>
                    </div>

                    {/* Expandable gold hairline on hover */}
                    <div className="absolute bottom-0 left-0 w-0 group-hover:w-full h-px bg-gradient-to-r from-luxury-gold/60 via-luxury-gold/20 to-transparent transition-all duration-500 pointer-events-none" />
                  </motion.div>
                );
              })}
            </div>

          </div>

          {/* DEDICATED MOBILE SINGLE-COLUMN INDEX (< md: 768px) */}
          <div className="grid grid-cols-1 divide-y divide-[#282014]/[0.08] md:hidden">
            {CATEGORIES.map((cat, idx) => {
              const data = COLLECTION_ARCHIVE_DATA[cat.slug] || {
                index: String(idx + 1).padStart(2, '0'),
                subtitle: "Packaging Division",
                spec: "B2B Tooling",
                type: "perfume"
              };

              return (
                <motion.div
                  key={cat.slug}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-10px" }}
                  transition={{ duration: 0.45, delay: shouldReduce ? 0 : idx * 0.03 }}
                  onClick={() => navigate(`/collections/${cat.slug}`)}
                  className="flex items-center justify-between py-4 min-h-[56px] active:bg-white/60 transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-3.5">
                    <span className="font-mono text-xs font-semibold text-luxury-gold tracking-wider">
                      {data.index}
                    </span>
                    <div className="flex flex-col">
                      <h3 className="font-serif text-base font-normal text-luxury-charcoal group-active:text-luxury-gold transition-colors leading-tight">
                        {cat.name}
                      </h3>
                      <span className="text-[9px] font-mono tracking-wider text-neutral-500 uppercase mt-0.5">
                        {data.subtitle}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="opacity-45">
                      <SpecimenLineArt type={data.type} className="w-6 h-6" />
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-neutral-400 group-active:text-luxury-gold group-active:translate-x-1 transition-transform" />
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>

        {/* =========================================================================
            03 — SPECIMEN INSPECTOR FOOTNOTE & SINGLE EDITORIAL CTA
            ========================================================================= */}
        <div className="pt-8 sm:pt-10 mt-6 sm:mt-8 border-t border-[#282014]/[0.08] flex flex-col sm:flex-row items-center justify-between gap-6">
          
          {/* Left: Monospace Archive Notation */}
          <div className="flex items-center gap-3 text-neutral-600 font-mono text-[9px] sm:text-[10px] tracking-[0.2em] uppercase">
            <span className="w-2 h-2 rounded-full bg-luxury-gold/50" />
            <span>AUTHENTIC SPECIMENS: 14 DIVISIONS / 500+ B2B CONFIGURATIONS</span>
          </div>

          {/* Right: Primary Editorial CTA: Tier 2 Architectural */}
          <Magnetic>
            <button
              onClick={() => navigate('/collections')}
              className="btn-luxury-secondary text-luxury-charcoal"
            >
              <span className="text-luxury-charcoal font-semibold">BROWSE ALL COLLECTIONS</span>
              <ArrowRight className="w-3.5 h-3.5 text-luxury-gold" />
            </button>
          </Magnetic>

        </div>

      </div>

    </section>
  );
}
