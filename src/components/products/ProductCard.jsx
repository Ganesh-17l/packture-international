import React from 'react';
import { ArrowRight } from 'lucide-react';
import ProductImage from './ProductImage';

/**
 * ProductCard Component
 * 
 * Renders a consistent, professional, luxury-themed B2B product card.
 * Designed to maintain a stable, uniform layout regardless of title length,
 * description length, or source image aspect ratios.
 * 
 * Structure:
 * 1. Image Area: Fixed 4:5 aspect ratio, clean warm-white background, custom visual padding, object-fit contain.
 * 2. Category & Info Tags
 * 3. Product Name (line-clamp to prevent height shifting)
 * 4. Product Description (line-clamp to preserve layout grid alignment)
 * 5. Sizes / Technical specifications
 * 6. CTA button aligned to bottom
 */
export default function ProductCard({ 
  product, 
  navigate, 
  onOpenEnquiry,
  className = "" 
}) {
  return (
    <div 
      className={`luxury-card group flex flex-col justify-between h-full rounded-sm text-left relative overflow-hidden ${className}`}
    >
      {/* Product Image Container: Enforces static 16:10 aspect ratio - zero hover scale */}
      <a 
        href={`/products/${product.slug}`}
        onClick={(e) => { e.preventDefault(); navigate(`/products/${product.slug}`); }}
        className="w-full relative cursor-pointer border-b border-luxury-gold/15 overflow-hidden bg-[#FCFBF7] p-3.5 flex items-center justify-center select-none block"
        style={{ aspectRatio: '16 / 10' }}
        aria-label={`View ${product.name} specifications`}
      >
        <ProductImage 
          product={product} 
          className="w-full h-full bg-transparent border-none p-0 rounded-none shadow-none" 
        />

        {/* Subtle Luxury View Details overlay badge */}
        <div className="absolute inset-0 bg-luxury-charcoal/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10 pointer-events-none">
          <span className="bg-luxury-ivory/95 backdrop-blur-xs text-luxury-charcoal border border-luxury-gold/40 px-3.5 py-1.5 text-[9.5px] tracking-[0.22em] uppercase font-mono shadow-sm transform translate-y-1 group-hover:translate-y-0 transition-transform duration-400">
            VIEW DETAILS
          </span>
        </div>

        {/* Hairline Gold Accent Line at image bottom on hover */}
        <div className="absolute bottom-0 left-0 w-0 group-hover:w-full h-[1.5px] bg-gradient-to-r from-transparent via-luxury-gold to-transparent transition-all duration-500 ease-out z-20 pointer-events-none" />
      </a>

      {/* Product Information */}
      <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between bg-[#FCFBF7]">
        <div className="flex-1 flex flex-col">
          {/* Subcategory & Box Quantity tags */}
          <div className="flex items-center justify-between mb-2 gap-2">
            <span className="editorial-badge truncate">
              {product.subcategory}
            </span>
            {product.boxQuantity && (
              <span className="text-[8.5px] font-mono tracking-wider bg-luxury-ivory text-neutral-600 border border-luxury-gold/20 px-2 py-0.5 rounded-full uppercase flex-shrink-0">
                Box Qty: {Object.values(product.boxQuantity)[0]}
              </span>
            )}
          </div>
          
          {/* Product Name */}
          <h3 className="font-serif text-lg md:text-[19px] font-medium text-luxury-charcoal group-hover:text-luxury-gold transition-colors duration-300 leading-snug mb-2 line-clamp-1">
            <a 
              href={`/products/${product.slug}`}
              onClick={(e) => { e.preventDefault(); navigate(`/products/${product.slug}`); }}
              className="hover:text-luxury-gold transition-colors focus:outline-none"
            >
              {product.name}
            </a>
          </h3>
          
          {/* Product Description */}
          {product.description && (
            <p className="text-[11.5px] text-neutral-500 line-clamp-2 leading-relaxed font-light mb-4">
              {product.description}
            </p>
          )}
        </div>

        {/* Specifications & CTA anchored to bottom */}
        <div className="border-t border-luxury-gold/10 pt-3.5 mt-auto flex items-center justify-between">
          <span className="text-[10px] text-neutral-400 font-mono tracking-wider font-medium">
            {product.sizes ? product.sizes.join(' · ') : 'Custom Sizing'}
          </span>
          <button
            onClick={() => onOpenEnquiry(product)}
            className="text-[10px] font-bold tracking-[0.18em] uppercase text-luxury-charcoal group-hover:text-luxury-gold transition-colors flex items-center cursor-pointer font-mono"
            aria-label={`Request quote for ${product.name}`}
          >
            ENQUIRE <ArrowRight className="w-3 h-3 ml-1.5 text-luxury-gold transition-transform duration-300 group-hover:translate-x-1.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

