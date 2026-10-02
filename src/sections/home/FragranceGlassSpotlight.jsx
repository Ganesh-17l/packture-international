import React from 'react';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { getFeaturedProducts } from '../../data/products';
import ScrollReveal from '../../components/common/ScrollReveal';
import Magnetic from '../../components/common/Magnetic';

/**
 * FragranceGlassSpotlight Component (SEC 05)
 * 
 * Luxury Editorial Fragrance Packaging Catalogue Showroom.
 * Designed to feel like a high-end editorial product study / material catalogue
 * rather than a generic ecommerce product grid.
 * 
 * Palette:
 * - Section Background: #FAF7F0
 * - Product Card Surface: #FCFBF7
 * - Image Container: #F4F0E7 (aspect-ratio 4:3, object-fit contain, zero cropping)
 * - Architectural Border: rgba(40, 32, 20, 0.08)
 * - Gold Accent: #C5A059
 * - Description Color: #716D65
 */
export default function FragranceGlassSpotlight({ navigate, onOpenEnquiry }) {
  const featured = getFeaturedProducts().slice(0, 4);

  return (
    <section 
      id="sec-05-fragrance-glass"
      className="w-full bg-[#FAF7F0] pt-14 pb-14 sm:pt-16 sm:pb-16 md:pt-20 md:pb-20 px-5 sm:px-8 lg:px-12 border-b border-[#282014]/[0.08] relative overflow-hidden select-none"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-10 xl:gap-14 lg:items-center">
          
          {/* =========================================================================
              LEFT EDITORIAL PANEL (Desktop ~38% width, Col-span 5)
              ========================================================================= */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            
            {/* Technical Eyebrow */}
            <div className="flex items-center gap-2.5 mb-3.5">
              <span className="w-1.5 h-1.5 rounded-full bg-luxury-gold animate-pulse" />
              <span className="text-[10px] font-bold tracking-[0.28em] text-luxury-gold uppercase font-mono">
                SEC 05 // PRODUCT SPOTLIGHT
              </span>
              <span className="w-6 h-px bg-luxury-gold/40" />
              <span className="text-[9px] font-mono tracking-[0.2em] uppercase text-neutral-500 hidden sm:inline-block">
                FRAGRANCE GLASS · PTI REF 2026
              </span>
            </div>

            {/* Main Editorial Heading */}
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[44px] xl:text-[48px] font-light text-luxury-charcoal leading-[1.08] tracking-tight mb-4">
              The Art of <br />
              <span className="italic font-serif text-luxury-gold">Fragrance Glass</span>
              <span className="font-serif text-luxury-gold">.</span>
            </h2>

            {/* Restrained Description */}
            <p className="text-xs sm:text-sm text-[#716D65] font-light leading-relaxed max-w-lg mb-6">
              Discover heavy glass bases, pristine optical clarity, and precision dispensing closures. We supply world-class models like Cyril, Amore, Monolith, and Victor bottles, engineered for prestigious global fragrance houses.
            </p>

            {/* Technical Feature List */}
            <div className="space-y-3 pb-7 border-b border-[#282014]/[0.08] mb-6">
              <div className="flex items-center text-xs text-luxury-charcoal/85">
                <CheckCircle className="w-3.5 h-3.5 mr-2.5 text-luxury-gold flex-shrink-0" />
                <span className="font-normal">Monolith Series: 30ml · 50ml · 100ml capacities</span>
              </div>
              <div className="flex items-center text-xs text-luxury-charcoal/85">
                <CheckCircle className="w-3.5 h-3.5 mr-2.5 text-luxury-gold flex-shrink-0" />
                <span className="font-normal">Cyril Series: Round, soft-shoulder luxury design</span>
              </div>
              <div className="flex items-center text-xs text-luxury-charcoal/85">
                <CheckCircle className="w-3.5 h-3.5 mr-2.5 text-luxury-gold flex-shrink-0" />
                <span className="font-normal">Box quantities detailed per catalog parameters</span>
              </div>
            </div>

            {/* Architectural Tier 2 CTA Button */}
            <div className="flex items-center">
              <Magnetic>
                <button
                  type="button"
                  onClick={() => navigate('/collections/perfume-glass-bottles')}
                  className="btn-luxury-secondary text-luxury-charcoal"
                  aria-label="Explore perfume glass bottle collection"
                >
                  <span className="text-luxury-charcoal font-semibold">EXPLORE FRAGRANCE BOTTLES</span>
                  <ArrowRight className="w-3.5 h-3.5 text-luxury-gold" />
                </button>
              </Magnetic>
            </div>

          </div>

          {/* =========================================================================
              RIGHT PRODUCT GRID (Desktop ~62% width, Col-span 7)
              2 x 2 on Tablet/Desktop, 1 column on Mobile
              ========================================================================= */}
          <div className="lg:col-span-7 w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              {featured.map((product, idx) => {
                // First box quantity entry
                const boxQty = product.boxQuantity ? Object.values(product.boxQuantity)[0] : null;
                // Formatted sizes
                const sizeDisplay = product.sizes ? product.sizes.join(' · ') : '15ML';

                return (
                  <ScrollReveal 
                    key={product.id} 
                    delay={idx * 0.05} 
                    direction="up" 
                    className="h-full"
                  >
                    <div 
                      onClick={() => navigate(`/products/${product.slug}`)}
                      className="group bg-[#FCFBF7] border border-[#282014]/[0.08] rounded-[2px] transition-all duration-350 ease-out hover:border-luxury-gold/45 hover:shadow-[0_10px_26px_-8px_rgba(40,32,20,0.07)] flex flex-col justify-between h-full overflow-hidden relative cursor-pointer"
                      role="article"
                      aria-label={`${product.name} luxury perfume bottle`}
                    >
                      {/* 1. UNIFIED IMAGE CONTAINER: Aspect Ratio 4:3, subtle warm neutral #F4F0E7 */}
                      <div className="w-full aspect-[4/3] bg-[#F4F0E7] relative overflow-hidden flex items-center justify-center p-4 sm:p-5 border-b border-[#282014]/[0.06]">
                        <img
                          src={product.image}
                          alt={`${product.name} — B2B Luxury Fragrance Glass Packaging`}
                          loading="lazy"
                          className="w-full h-full object-contain transition-transform duration-400 ease-out group-hover:scale-[1.03]"
                          style={{
                            maxHeight: '88%',
                            maxWidth: '88%',
                            // Visual balance compensation for tall slender 15ml bottle
                            transform: product.slug === '15ml-tall-perfume' ? 'scale(1.08)' : undefined
                          }}
                        />

                        {/* Subtle Gold Hairline Accent reveal at image bottom on hover */}
                        <div className="absolute bottom-0 left-0 w-0 group-hover:w-full h-[1.5px] bg-gradient-to-r from-transparent via-luxury-gold/70 to-transparent transition-all duration-500 ease-out pointer-events-none" />
                      </div>

                      {/* 2. PRODUCT INFORMATION BODY */}
                      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between bg-[#FCFBF7]">
                        <div>
                          
                          {/* Category & Box Quantity Top Meta Row */}
                          <div className="flex items-center justify-between gap-2 mb-2">
                            <span className="text-[9px] font-mono tracking-[0.2em] uppercase font-semibold text-neutral-500 truncate">
                              {product.subcategory || "PERFUME GLASS BOTTLE"}
                            </span>
                            {boxQty && (
                              <span className="text-[8.5px] font-mono tracking-[0.14em] uppercase text-neutral-600 px-2 py-0.5 border border-[#282014]/15 rounded-[1px] bg-[#F4F0E7]/60 flex-shrink-0">
                                BOX QTY: {boxQty}
                              </span>
                            )}
                          </div>

                          {/* Product Title */}
                          <h3 className="font-serif text-[18px] sm:text-[19px] font-normal text-luxury-charcoal group-hover:text-luxury-gold transition-colors duration-300 leading-snug mb-1.5 line-clamp-1">
                            {product.name}
                          </h3>

                          {/* Product Description: Clamped to 2 lines for uniform card height */}
                          <p className="text-[11.5px] text-[#716D65] line-clamp-2 leading-relaxed font-light mb-3 sm:mb-4">
                            {product.description}
                          </p>

                        </div>

                        {/* 3. BOTTOM METADATA & EDITORIAL CTA ROW */}
                        <div className="border-t border-[#282014]/[0.08] pt-3 mt-auto flex items-center justify-between">
                          <span className="text-[10px] text-neutral-500 font-mono tracking-wider font-medium">
                            {sizeDisplay}
                          </span>
                          
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              onOpenEnquiry(product);
                            }}
                            className="text-[10.5px] font-mono font-semibold tracking-[0.2em] uppercase text-luxury-charcoal group-hover:text-luxury-gold transition-colors flex items-center gap-1.5 cursor-pointer py-1 focus:outline-none"
                            aria-label={`Request quotation for ${product.name}`}
                          >
                            <span>ENQUIRE</span>
                            <ArrowRight className="w-3.5 h-3.5 text-luxury-gold transition-transform duration-300 group-hover:translate-x-1" />
                          </button>
                        </div>

                      </div>

                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
