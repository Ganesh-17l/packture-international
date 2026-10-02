import React, { useRef, useMemo } from 'react';
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { CATEGORIES } from '../data/products';
import { COLLECTION_SPECS } from '../data/collectionSpecs';
import PackagingBlueprintHero from '../components/hero/PackagingBlueprintHero';

/**
 * Architectural Paper Backdrop Component
 * 
 * Renders extremely faint (0.02 - 0.04 opacity) technical packaging dielines,
 * subtle measurement grids, and blueprint markings printed directly into the uncoated
 * warm paper background.
 */
function ArchitecturalPaperBackdrop() {
  return (
    <div 
      className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0"
      style={{
        maskImage: 'linear-gradient(to bottom, transparent 0%, transparent 720px, rgba(0,0,0,1) 920px)',
        WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, transparent 720px, rgba(0,0,0,1) 920px)'
      }}
    >
      {/* Faint watermark dieline markings printed into paper below hero */}
      <div 
        className="absolute inset-0 opacity-[0.03]" 
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(40, 32, 20, 0.6) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(40, 32, 20, 0.4) 1px, transparent 1px)
          `,
          backgroundSize: '160px 160px'
        }}
      />

      {/* Subtle Technical Dieline Markings (Printed into the paper) */}
      <svg 
        className="absolute w-full h-full opacity-[0.035]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="dieline-cross" width="320" height="320" patternUnits="userSpaceOnUse">
            {/* Precise dieline crosshair */}
            <path d="M 160 148 L 160 172 M 148 160 L 172 160" stroke="#282014" strokeWidth="0.75" />
            <circle cx="160" cy="160" r="14" fill="none" stroke="#282014" strokeWidth="0.5" strokeDasharray="2 2" />
            
            {/* Dieline dimension markings */}
            <text x="180" y="156" fill="#282014" fontSize="7" fontFamily="monospace" letterSpacing="0.1em">
              SEC A-A · 120.00mm
            </text>
            <text x="180" y="168" fill="#282014" fontSize="6" fontFamily="monospace" letterSpacing="0.08em">
              TOL ±0.15mm · DIN 18
            </text>
            <path d="M 40 80 L 120 80 M 40 76 L 40 84 M 120 76 L 120 84" stroke="#282014" strokeWidth="0.5" />
            <text x="64" y="74" fill="#282014" fontSize="6" fontFamily="monospace">
              Ø 28.5mm
            </text>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dieline-cross)" />
      </svg>
    </div>
  );
}

/**
 * Unified Premium Product Card Component
 * 
 * Combines the product photography and all collection information into ONE
 * cohesive luxury catalogue sheet:
 * - Natural image integration with NO black frame or harsh outlines
 * - Dedicated warm stone image surface (#E9E3D7)
 * - Distinct warm cream card sheet (#FBF9F4) sitting above warm paper (#F4F0E7)
 * - Soft wide low-contrast physical shadow
 * - Strict, clear information hierarchy:
 *     1. Collection Number & Category (small uppercase font-mono)
 *     2. Collection Name (large Cormorant Garamond serif)
 *     3. Short Description (clean, comfortable leading)
 *     4. Technical Metadata (single subtle font-mono line)
 *     5. Explore Directory Action (with arrow micro-interaction)
 */
function UnifiedCollectionCard({ 
  cat, 
  spec, 
  cardDiffY,
  imgParallaxY,
  navigate,
  delay = 0 
}) {
  const isFeatured = spec.tier === "featured";
  const isSecondary = spec.tier === "secondary";

  return (
    <div className="relative w-full">
      {/* 11 — GALLERY LIGHTING EFFECT: Subtle warm spotlight behind card */}
      <div 
        className="absolute -inset-2 sm:-inset-4 -z-10 pointer-events-none rounded-sm blur-2xl opacity-75"
        style={{
          background: 'radial-gradient(circle at 50% 35%, rgba(197, 160, 89, 0.08), transparent 70%)'
        }}
      />

      <motion.article
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay }}
        style={cardDiffY ? { y: cardDiffY } : undefined}
        className="w-full text-left flex flex-col justify-between rounded-[2px] bg-[#FCFBF7] border border-[#282014]/[0.08] hover:border-luxury-gold/40 transition-all duration-500 shadow-[0_1px_2px_rgba(20,16,10,0.04),0_12px_35px_rgba(20,16,10,0.05)] hover:shadow-[0_2px_4px_rgba(20,16,10,0.04),0_20px_45px_rgba(20,16,10,0.08)] hover:-translate-y-1 group overflow-hidden will-change-transform cursor-pointer relative"
        onClick={() => navigate(`/collections/${cat.slug}`)}
      >
        {/* 1. DEDICATED IMAGE SURFACE (#F3EFE6 stone backdrop, NO black frame) */}
        <div className="w-full overflow-hidden relative select-none bg-[#F3EFE6] border-b border-[#282014]/[0.07]">
          <div className={`w-full overflow-hidden relative ${spec.aspectRatio}`}>
            <motion.img 
              src={cat.image} 
              alt={`${cat.name} - Packture International B2B Packaging`}
              loading={delay < 0.1 ? "eager" : "lazy"}
              fetchPriority={delay < 0.1 ? "high" : "auto"}
              decoding="async"
              className="w-full h-full object-cover block opacity-95 transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              style={{
                ...(imgParallaxY ? { y: imgParallaxY } : {}),
                objectPosition: spec.objectPosition || 'center center'
              }}
            />
            {/* Very subtle hairline gold accent on card hover */}
            <div className="absolute bottom-0 left-0 w-0 group-hover:w-full h-[1px] bg-gradient-to-r from-transparent via-luxury-gold to-transparent transition-all duration-500 pointer-events-none z-10" />
          </div>
        </div>

        {/* 2. UNIFIED CARD CONTENT & TYPOGRAPHY HIERARCHY */}
        <div className={`flex flex-col justify-between flex-1 ${
          isFeatured ? 'p-6 sm:p-8' : isSecondary ? 'p-5 sm:p-6' : 'p-6 sm:p-7'
        }`}>
          <div>
            {/* FIRST: Collection Number & Category */}
            <div className="flex items-center justify-between gap-2 mb-2.5">
              <span className="font-mono text-[9px] font-semibold tracking-[0.24em] text-luxury-gold uppercase">
                {spec.index} · {spec.categoryBadge}
              </span>
              <span className="font-mono text-[8px] text-[#282014]/30 uppercase tracking-widest hidden sm:inline-block">
                COLLECTION {spec.index}
              </span>
            </div>

            {/* SECOND: Collection Title */}
            <h2 className={`font-serif font-normal text-luxury-charcoal group-hover:text-luxury-gold transition-colors duration-300 leading-snug ${
              isFeatured ? 'text-2xl sm:text-[28px]' : isSecondary ? 'text-lg sm:text-[22px]' : 'text-xl sm:text-[25px]'
            }`}>
              <a
                href={`/collections/${cat.slug}`}
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); navigate(`/collections/${cat.slug}`); }}
                className="focus:outline-none"
              >
                {cat.name}
              </a>
            </h2>

            {/* THIRD: Short Description */}
            <p className="text-xs sm:text-[13px] text-neutral-600 line-clamp-3 leading-relaxed font-light mt-2.5">
              {cat.description}
            </p>

            {/* FOURTH: Technical Metadata */}
            <div className="mt-4 pt-3.5 border-t border-[#282014]/[0.07] font-mono text-[9px] tracking-wider text-neutral-500 uppercase leading-relaxed">
              {spec.meta}
            </div>
          </div>

          {/* FIFTH: Action: Explore Directory */}
          <div className="pt-4 mt-4 border-t border-[#282014]/[0.07] flex items-center justify-between">
            <a
              href={`/collections/${cat.slug}`}
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); navigate(`/collections/${cat.slug}`); }}
              className="flex items-center justify-between w-full text-luxury-charcoal group-hover:text-luxury-gold transition-colors text-[10px] font-mono font-semibold tracking-[0.2em] uppercase focus:outline-none"
              aria-label={`Explore ${cat.name} catalogue`}
            >
              <span>EXPLORE DIRECTORY</span>
              <ArrowRight className="w-3.5 h-3.5 text-luxury-gold transition-transform duration-300 group-hover:translate-x-1.5" />
            </a>
          </div>
        </div>
      </motion.article>
    </div>
  );
}

export default function Collections({ navigate }) {
  const shouldReduce = useReducedMotion();

  // Hero Scroll Tracking
  const heroRef = useRef(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const heroY = useTransform(heroProgress, [0, 1], shouldReduce ? [0, 0] : [0, -30]);
  const heroOpacity = useTransform(heroProgress, [0, 1], shouldReduce ? [1, 1] : [1, 0.85]);

  // Main Collections Section Scroll Tracking & 3-Column Opposing Parallax
  const collectionSectionRef = useRef(null);
  const { scrollYProgress: collectionProgress } = useScroll({
    target: collectionSectionRef,
    offset: ["start end", "end start"]
  });
  
  // Smooth physical spring for fluid spatial movement
  const smoothProgress = useSpring(collectionProgress, {
    stiffness: 65,
    damping: 26,
    mass: 0.8,
    restDelta: 0.001
  });

  // Desktop 3-Column Opposing Parallax:
  // Column 1 (Left): Moves UPWARD relative to scroll
  const col1Y = useTransform(smoothProgress, [0, 1], shouldReduce ? [0, 0] : [130, -150]);
  // Column 2 (Center): Moves DOWNWARD opposite to scroll with architectural top stagger
  const col2Y = useTransform(smoothProgress, [0, 1], shouldReduce ? [0, 0] : [-120, 140]);
  // Column 3 (Right): Moves UPWARD relative to scroll with mid-tier top stagger
  const col3Y = useTransform(smoothProgress, [0, 1], shouldReduce ? [0, 0] : [100, -120]);

  // Card-level subtle differential offset for organic physical depth
  const cardDiffEvenY = useTransform(smoothProgress, [0, 1], shouldReduce ? [0, 0] : [-10, 10]);
  const cardDiffOddY = useTransform(smoothProgress, [0, 1], shouldReduce ? [0, 0] : [10, -10]);

  // Subtle internal image parallax within each card
  const imgParallaxY = useTransform(smoothProgress, [0, 1], shouldReduce ? [0, 0] : [-5, 5]);

  // Map all 14 categories with their technical specifications
  const allCollections = useMemo(() => {
    return CATEGORIES.map((cat, idx) => ({
      cat,
      originalIndex: idx,
      spec: COLLECTION_SPECS[cat.slug] || {
        index: String(idx + 1).padStart(2, '0'),
        categoryBadge: "INDUSTRIAL DIRECTORY",
        tier: "standard",
        aspectRatio: "aspect-[4/3]",
        meta: "CUSTOM TOOLING · B2B SIZING AVAILABLE"
      }
    }));
  }, []);

  // Desktop 3-Column Distribution (14 collections across 3 tracks):
  // Column 1: Items 01 (Perfume), 04 (Jars), 07 (HDPE), 10 (Closures), 13 (Aluminium)
  const col1 = [
    allCollections[0],
    allCollections[3],
    allCollections[6],
    allCollections[9],
    allCollections[12]
  ];

  // Column 2: Items 02 (Droppers), 05 (Tubes), 08 (Jar Collections), 11 (Pumps), 14 (Cosmetics)
  const col2 = [
    allCollections[1],
    allCollections[4],
    allCollections[7],
    allCollections[10],
    allCollections[13]
  ];

  // Column 3: Items 03 (Fancy Glass), 06 (PET), 09 (Airless), 12 (Roll-Ons)
  const col3 = [
    allCollections[2],
    allCollections[5],
    allCollections[8],
    allCollections[11]
  ];

  // Tablet 2-Column Distribution (7 items per column)
  const tabletCol1 = allCollections.filter((_, i) => i % 2 === 0);
  const tabletCol2 = allCollections.filter((_, i) => i % 2 === 1);

  return (
    <div className="relative bg-[#F4F0E7] text-luxury-charcoal bg-grain min-h-screen overflow-x-hidden selection:bg-luxury-gold selection:text-luxury-charcoal">
      
      {/* 03 — SUBTLE BACKGROUND TONAL VARIATION: Zone A (#F5F1E8) -> Zone B (#F0EBE1) -> Zone C (#F7F3EA) */}
      <div 
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: 'linear-gradient(180deg, #F5F1E8 0%, #F0EBE1 45%, #F7F3EA 100%)'
        }}
      />

      {/* 04 — SUBTLE ARCHITECTURAL BACKGROUND DETAILS (Printed into the paper) */}
      <ArchitecturalPaperBackdrop />

      {/* =========================================================================
          01 — HERO / INTRODUCTION SECTION
          Spacious editorial headline, supporting metrics, and architectural visual plate.
          ========================================================================= */}
      <section 
        ref={heroRef}
        className="relative z-10 pt-28 sm:pt-32 lg:pt-36 pb-12 sm:pb-16 lg:pb-20 px-5 sm:px-8 lg:px-14 max-w-[1560px] mx-auto border-b border-[#282014]/[0.08]"
      >
        <motion.div 
          style={{ y: heroY, opacity: heroOpacity }}
          className="will-change-transform"
        >
          {/* Editorial Hierarchy Top Meta */}
          <div className="flex items-center gap-3 mb-6">
            <span className="font-mono text-[10px] tracking-[0.28em] font-semibold text-luxury-gold uppercase inline-flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-luxury-gold animate-pulse" />
              01 / GLOBAL COLLECTIONS
            </span>
            <span className="w-8 h-[1px] bg-luxury-gold/40" />
            <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-neutral-500">
              B2B PACKAGING DIRECTORY
            </span>
          </div>

          {/* Monumental Editorial Headline & Architectural Visual Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
            
            <div className="lg:col-span-7">
              <h1 className="font-serif font-light tracking-tight leading-[0.94] text-luxury-charcoal">
                <span className="block text-4xl sm:text-6xl lg:text-[76px] xl:text-[88px] tracking-tight">
                  B2B Packaging
                </span>
                <span className="block italic text-luxury-gold font-light text-5xl sm:text-7xl lg:text-[92px] xl:text-[106px] mt-1 sm:mt-2">
                  Collections.
                </span>
              </h1>

              <p className="font-serif text-lg sm:text-xl text-neutral-700 font-light leading-relaxed max-w-xl mt-6 sm:mt-8">
                Explore a curated world of architectural packaging formats, proprietary mold tooling, and tactile surface treatments engineered for international fragrance, skincare, and beauty houses.
              </p>

              {/* Supporting Metadata Metrics */}
              <div className="flex flex-wrap items-center gap-6 sm:gap-8 mt-8 pt-6 border-t border-[#282014]/[0.08] text-[10px] font-mono tracking-[0.18em] text-neutral-500 uppercase">
                <div>
                  <span className="text-luxury-charcoal font-bold text-xs block">14</span>
                  <span>COLLECTIONS</span>
                </div>
                <span className="text-luxury-gold/40">/</span>
                <div>
                  <span className="text-luxury-charcoal font-bold text-xs block">500+</span>
                  <span>VARIATIONS</span>
                </div>
                <span className="text-luxury-gold/40">/</span>
                <div>
                  <span className="text-luxury-charcoal font-bold text-xs block">GLOBAL</span>
                  <span>B2B EXPORT</span>
                </div>
              </div>
            </div>

            {/* Right: Architectural Packaging Blueprint & Morphology Study */}
            <div className="lg:col-span-5 flex items-center justify-center relative">
              <PackagingBlueprintHero />
            </div>

          </div>
        </motion.div>
      </section>

      {/* =========================================================================
          02 — MAIN COLLECTION AREA (The Primary Experience of the Page)
          Desktop 3-Column Spatial Opposing Parallax:
          Column 1 ↑  |  Column 2 ↓ (Offset)  |  Column 3 ↑ (Offset)
          ========================================================================= */}
      <section 
        ref={collectionSectionRef}
        className="relative z-10 pt-16 sm:pt-20 pb-28 sm:pb-36 lg:pb-44 px-5 sm:px-8 lg:px-14 max-w-[1560px] mx-auto"
      >
        {/* DESKTOP VIEW (lg: and above: 3-Column Opposing Spatial Parallax) */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-10 xl:gap-14 items-start">
          
          {/* Column 1: Moves UPWARD relative to scroll */}
          <motion.div 
            style={{ y: col1Y }}
            className="flex flex-col gap-12 xl:gap-16 pt-0 will-change-transform"
          >
            {col1.map((item, idx) => (
              <UnifiedCollectionCard
                key={item.cat.slug}
                cat={item.cat}
                spec={item.spec}
                cardDiffY={idx % 2 === 0 ? cardDiffEvenY : cardDiffOddY}
                imgParallaxY={imgParallaxY}
                navigate={navigate}
                delay={idx * 0.05}
              />
            ))}
          </motion.div>

          {/* Column 2: Moves DOWNWARD opposite to scroll with architectural top stagger */}
          <motion.div 
            style={{ y: col2Y }}
            className="flex flex-col gap-12 xl:gap-16 pt-16 lg:pt-24 will-change-transform"
          >
            {col2.map((item, idx) => (
              <UnifiedCollectionCard
                key={item.cat.slug}
                cat={item.cat}
                spec={item.spec}
                cardDiffY={idx % 2 === 0 ? cardDiffOddY : cardDiffEvenY}
                imgParallaxY={imgParallaxY}
                navigate={navigate}
                delay={0.06 + idx * 0.05}
              />
            ))}
          </motion.div>

          {/* Column 3: Moves UPWARD at independent rate with mid-tier top stagger */}
          <motion.div 
            style={{ y: col3Y }}
            className="flex flex-col gap-12 xl:gap-16 pt-8 lg:pt-12 will-change-transform"
          >
            {col3.map((item, idx) => (
              <UnifiedCollectionCard
                key={item.cat.slug}
                cat={item.cat}
                spec={item.spec}
                cardDiffY={idx % 2 === 0 ? cardDiffEvenY : cardDiffOddY}
                imgParallaxY={imgParallaxY}
                navigate={navigate}
                delay={0.12 + idx * 0.05}
              />
            ))}
          </motion.div>

        </div>

        {/* TABLET VIEW (md to lg: 2-Column Responsive Layout) */}
        <div className="hidden md:grid lg:hidden md:grid-cols-2 gap-8 sm:gap-10 items-start">
          <div className="flex flex-col gap-10">
            {tabletCol1.map((item, idx) => (
              <UnifiedCollectionCard
                key={item.cat.slug}
                cat={item.cat}
                spec={item.spec}
                navigate={navigate}
                delay={idx * 0.05}
              />
            ))}
          </div>

          <div className="flex flex-col gap-10 pt-10">
            {tabletCol2.map((item, idx) => (
              <UnifiedCollectionCard
                key={item.cat.slug}
                cat={item.cat}
                spec={item.spec}
                navigate={navigate}
                delay={0.08 + idx * 0.05}
              />
            ))}
          </div>
        </div>

        {/* MOBILE VIEW (< md: Dedicated Single-Column Sequential Flow 01 -> 14) */}
        <div className="grid grid-cols-1 gap-12 sm:gap-14 md:hidden">
          {allCollections.map((item, idx) => (
            <UnifiedCollectionCard
              key={item.cat.slug}
              cat={item.cat}
              spec={item.spec}
              navigate={navigate}
              delay={idx * 0.04}
            />
          ))}
        </div>

        {/* Clean bottom buffer before footer */}
        <div className="h-16 w-full pointer-events-none" />

      </section>

    </div>
  );
}
