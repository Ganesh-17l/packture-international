import React, { useState, useEffect } from 'react';

/**
 * ProductImage Component
 * 
 * Renders a product image with:
 * - Lazy loading for performance (below-the-fold)
 * - Error boundary to display a premium fallback placeholder if the file doesn't exist
 * - GPU-composited scale/fade animations matching the luxury branding
 * - Graceful hover reveal for a secondary editorial image (e.g. monolith-editorial.webp) if present
 * - Safe aspect-ratio (4:5) and scale preservation (object-fit: contain)
 * - Reusable image scale normalization to handle products with excessive whitespace
 */
const CATEGORY_NAMES = {
  "perfume-glass-bottles": "PERFUME GLASS BOTTLES",
  "dropper-packaging": "GLASS DROPPER PACKAGING",
  "fancy-glass-bottles": "FANCY GLASS BOTTLES",
  "cosmetic-glass-jars": "COSMETIC GLASS JARS",
  "cosmetic-tubes": "COSMETIC TUBES",
  "pet-packaging": "PET PACKAGING",
  "hdpe-packaging": "HDPE PACKAGING",
  "jar-collections": "JAR COLLECTIONS",
  "airless-packaging": "AIRLESS PACKAGING",
  "caps-closures": "CAPS & CLOSURES",
  "pumps-sprayers": "PUMPS & SPRAYERS",
  "roll-on-packaging": "ROLL ON PACKAGING",
  "aluminium-packaging": "ALUMINIUM PACKAGING",
  "cosmetics": "COSMETICS & MAKEUP"
};

export default function ProductImage({ 
  product, 
  src, 
  alt, 
  className = "w-full h-full", 
  variant = "default",
  imageScale = null,
  fullImage = false
}) {
  const [hasError, setHasError] = useState(false);
  const [hasEditorialError, setHasEditorialError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Reset error states if the product or source changes
  useEffect(() => {
    setHasError(false);
    setHasEditorialError(false);
  }, [product, src]);

  // Determine main image source and alt text
  const mainImageSrc = src || product?.image;
  const imageAlt = alt || product?.name || "Product Image";

  // Resolve editorial image path if product is provided
  let editorialSrc = null;
  if (product && product.image) {
    if (product.editorialImage) {
      editorialSrc = product.editorialImage;
    } else {
      const lastDotIndex = product.image.lastIndexOf('.');
      if (lastDotIndex !== -1) {
        const basePath = product.image.substring(0, lastDotIndex);
        editorialSrc = `${basePath}-editorial.webp`;
      }
    }
  }

  // A mapping of product slugs to custom scale factors to normalize their appearance
  const DEFAULT_PRODUCT_SCALES = {
    "15ml-tall-perfume": 1.15,
    "30ml-toll-long": 1.15,
    "2ml-vial": 1.25,
    "8ml-square": 1.06,
    "essential-oil-dropper": 1.12,
    "serum-dropper-bottle": 1.12,
    "tincture-dropper-bottle": 1.12,
    "lip-oil-tubes": 1.14,
    "lip-gloss-tubes": 1.14,
    "eyeliner-tubes": 1.18,
    "under-eye-rollons": 1.18,
    "roll-on-bottles": 1.14,
    "frosted-roll-on-bottles": 1.14,
    "massage-roller-tubes": 1.12,
    "customized-lipstick-containers": 1.08,
    "paper-lipstick-tubes": 1.08,
    "flat-shaped-hdpe": 1.06,
  };

  // Determine scale multiplier to handle extreme whitespace in source images
  const scaleMultiplier = imageScale ?? product?.imageScale ?? (product?.slug ? DEFAULT_PRODUCT_SCALES[product.slug] : null) ?? 1.0;

  // Check if caller overrides default styling classes
  const hasBg = className.includes('bg-');
  const hasPadding = className.split(' ').some(c => c.startsWith('p-') || c.startsWith('px-') || c.startsWith('py-'));
  const hasBorder = className.includes('border');
  const hasRounded = className.includes('rounded-');
  const hasAspect = className.includes('aspect-');
  const hasMaxHeight = className.includes('max-h-');

  // Build responsive layout class names
  const bgClass = hasBg ? '' : 'bg-[#faf9f6]';
  const paddingClass = hasPadding ? '' : (hasError || !mainImageSrc ? 'p-1' : 'p-3');
  const borderClass = hasBorder ? '' : 'border border-luxury-gold/10';
  const roundedClass = hasRounded ? '' : 'rounded-sm';
  const aspectClass = hasAspect ? '' : 'aspect-[16/10]';
  const aspectStyle = hasAspect ? {} : { aspectRatio: '16 / 10' };
  const maxHeightClass = hasMaxHeight ? '' : 'max-h-[320px]';
  const imgSizeClass = fullImage ? 'w-full h-full' : 'w-[92%] h-[92%]';

  const showEditorial = !hasError && !hasEditorialError && editorialSrc && variant === "default";
  
  // Enforces 100% static image dimensions on hover - NO ZOOM, NO SCALE, NO DISTORTION
  const mainImageStyle = {
    transform: `scale(${scaleMultiplier})`,
    objectPosition: 'center center',
  };

  const editorialImageStyle = {
    transform: `scale(${scaleMultiplier})`,
    objectPosition: 'center center',
  };

  const categoryLabel = product?.category 
    ? (CATEGORY_NAMES[product.category] || product.category.replace(/-/g, ' ').toUpperCase())
    : (product?.subcategory?.toUpperCase() || "B2B PACKAGING");

  return (
    <div 
      className={`relative overflow-hidden group/img flex items-center justify-center transition-all duration-300 ${bgClass} ${paddingClass} ${borderClass} ${roundedClass} ${aspectClass} ${maxHeightClass} ${className}`}
      style={aspectStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {hasError || !mainImageSrc ? (
        /* Luxury Branded Placeholder Card matching exact square product image size & aspect ratio */
        <div 
          className="aspect-square h-[92%] max-h-[92%] max-w-[92%] flex items-center justify-center p-0.5 relative transition-transform duration-700 ease-out drop-shadow-[0_4px_16px_rgba(0,0,0,0.03)]"
          style={mainImageStyle}
        >
          <div className="w-full h-full border border-[#e4dfd5] flex flex-col items-center justify-center p-3 sm:p-4 text-center bg-[#faf9f6] relative select-none">
            {/* Double inner border lines matching deodorant-roll-ons.webp */}
            <div className="absolute inset-2 sm:inset-2.5 border border-[#eae6de] pointer-events-none"></div>

            {/* Gold Subtitle: PACKTURE CONTAINER */}
            <span className="text-[8px] sm:text-[9.5px] font-sans font-medium tracking-[0.22em] text-luxury-gold uppercase block mb-1.5 sm:mb-2.5">
              PACKTURE CONTAINER
            </span>

            {/* Clean Bold Product Title */}
            <h4 className="font-sans text-[11px] sm:text-[13px] md:text-[14px] font-normal text-luxury-charcoal uppercase tracking-[0.08em] max-w-[88%] leading-snug mb-1.5 sm:mb-2.5">
              {product?.name || alt || "PACKAGING MODEL"}
            </h4>

            {/* Bottom Subtitle: Category */}
            <span className="text-[7.5px] sm:text-[8.5px] font-sans font-light tracking-[0.18em] text-neutral-400 uppercase">
              {categoryLabel}
            </span>
          </div>
        </div>
      ) : (
        <>
          {/* Main Image */}
          <img 
            src={mainImageSrc} 
            alt={imageAlt} 
            loading={variant === "hero" ? "eager" : "lazy"}
            decoding="async"
            className={`${imgSizeClass} object-contain transition-all duration-700 ease-out filter drop-shadow-[0_8px_20px_rgba(0,0,0,0.035)] ${
              showEditorial && isHovered ? 'opacity-0' : 'opacity-100'
            }`}
            style={mainImageStyle}
            onError={() => {
              setHasError(true);
            }}
          />
          
          {/* Hover Editorial Image */}
          {showEditorial && (
            <img 
              src={editorialSrc} 
              alt={`${imageAlt} Editorial`} 
              loading="lazy"
              decoding="async"
              className={`absolute ${imgSizeClass} object-contain transition-all duration-700 ease-out filter drop-shadow-[0_8px_20px_rgba(0,0,0,0.035)] ${
                isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}
              style={editorialImageStyle}
              onError={() => {
                setHasEditorialError(true);
              }}
            />
          )}
        </>
      )}
    </div>
  );
}
