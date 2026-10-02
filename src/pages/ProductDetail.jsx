import React, { useMemo, useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Box, BadgeInfo } from 'lucide-react';
import { PRODUCTS, CATEGORIES } from '../data/products';
import ProductImage from '../components/products/ProductImage';
import ScrollReveal from '../components/common/ScrollReveal';
import Magnetic from '../components/common/Magnetic';

export default function ProductDetail({ productSlug, navigate, onOpenEnquiry }) {
  const shouldReduce = useReducedMotion();
  
  // Find Active Product
  const product = useMemo(() => {
    return PRODUCTS.find(p => p.slug === productSlug);
  }, [productSlug]);

  // Find Parent Category
  const category = useMemo(() => {
    if (!product) return null;
    return CATEGORIES.find(cat => cat.slug === product.category);
  }, [product]);

  // Track active size (if product has sizes)
  const [activeSize, setActiveSize] = useState(() => {
    if (product && product.sizes && product.sizes.length > 0) {
      return product.sizes[0];
    }
    return '';
  });

  // Dynamic document.title
  useEffect(() => {
    if (product && product.name) {
      const prevTitle = document.title;
      document.title = `${product.name} — Packture International`;
      return () => {
        document.title = prevTitle;
      };
    }
  }, [product]);

  if (!product) {
    return (
      <div className="pt-32 pb-24 text-center">
        <h2 className="font-serif text-3xl mb-4">Product Not Found</h2>
        <button onClick={() => navigate('/collections')} className="text-luxury-gold hover:underline cursor-pointer">
          Return to Collections
        </button>
      </div>
    );
  }

  // Get box quantity for active size
  const activeBoxQuantity = product.boxQuantity && activeSize ? product.boxQuantity[activeSize] : null;

  const floatVariants = {
    animate: shouldReduce ? { y: 0 } : {
      y: [0, -6, 0],
      transition: {
        repeat: Infinity,
        duration: 5.5,
        ease: "easeInOut"
      }
    },
    static: {
      y: 0
    }
  };

  return (
    <div className="bg-luxury-ivory text-luxury-charcoal bg-grain pt-28 pb-20 min-h-screen text-left">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Breadcrumb navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-[10px] font-mono tracking-widest text-neutral-400 uppercase mb-8">
          <a 
            href={category ? `/collections/${category.slug}` : '/collections'}
            onClick={(e) => {
              e.preventDefault();
              if (category) {
                navigate(`/collections/${category.slug}`);
              } else {
                navigate('/collections');
              }
            }}
            className="hover:text-luxury-gold transition-colors cursor-pointer flex items-center"
          >
            <ArrowLeft className="w-3 h-3 mr-1.5 text-luxury-gold" /> {category ? category.name : 'COLLECTIONS'}
          </a>
          <span>/</span>
          <span className="text-luxury-gold font-semibold truncate max-w-[280px]">{product.name}</span>
        </nav>
 
        {/* Product Details Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start mb-16">
          
          {/* Left Column: Graphic Display Box - 100% Static & Dimensionally Stable */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 bg-white border border-luxury-gold/20 p-8 sm:p-12 flex items-center justify-center h-[420px] md:h-[520px] relative rounded-sm overflow-hidden select-none shadow-[0_12px_32px_rgba(0,0,0,0.03)]"
          >
            {/* Stable display container */}
            <div className="w-full h-full max-h-[380px] flex items-center justify-center relative">
              <ProductImage 
                product={product} 
                fullImage={true}
                className="w-full h-full bg-transparent border-none p-0 rounded-none shadow-none aspect-auto drop-shadow-[0_15px_30px_rgba(0,0,0,0.06)]" 
              />
            </div>
            
            {/* Subtle inner framing accent */}
            <div className="absolute inset-4 border border-luxury-gold/15 pointer-events-none" />

            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between pointer-events-none">
              <span className="editorial-badge text-[9px]">
                HIGH-FIDELITY ARCHIVE
              </span>
              <span className="text-[9px] font-mono text-neutral-400">
                100% QC VERIFIED
              </span>
            </div>
          </motion.div>

          {/* Right Column: Information Sheet */}
          <div className="lg:col-span-7 flex flex-col space-y-6">
            <ScrollReveal direction="up">
              <div>
                <span className="editorial-badge block mb-2">
                  {product.subcategory}
                </span>
                <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-luxury-charcoal leading-[1.15]">
                  {product.name}
                </h1>
              </div>
            </ScrollReveal>

            {/* Description */}
            <ScrollReveal direction="up" delay={0.05}>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed max-w-xl font-light">
                {product.description || `Premium B2B ${product.subcategory.toLowerCase()} packaging solution designed to present and elevate luxury cosmetic and fragrance formulations.`}
              </p>
            </ScrollReveal>

            <div className="border-t border-b border-luxury-gold/15 py-6 my-2 space-y-6">
              
              {/* Sizing Toggles */}
              {product.sizes && product.sizes.length > 0 && (
                <ScrollReveal direction="up">
                  <div>
                    <h3 className="editorial-badge text-[9.5px] block mb-3">
                      CAPACITY &amp; SIZING OPTIONS
                    </h3>
                    <div className="flex flex-wrap gap-2.5">
                      {product.sizes.map((s) => (
                        <button
                          key={s}
                          onClick={() => setActiveSize(s)}
                          aria-pressed={activeSize === s ? "true" : "false"}
                          className={`relative px-4 text-xs font-mono font-medium tracking-wider transition-all duration-300 rounded-sm border cursor-pointer min-h-[42px] min-w-[50px] flex items-center justify-center focus:outline-none ${
                            activeSize === s
                              ? 'bg-luxury-charcoal text-luxury-ivory border-luxury-gold shadow-sm'
                              : 'bg-white border-luxury-gold/20 hover:border-luxury-gold/60 text-luxury-charcoal hover:bg-luxury-ivory'
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                </ScrollReveal>
              )}

              {/* Box Size / Quantity details per size */}
              {activeBoxQuantity && (
                <ScrollReveal direction="scale">
                  <div className="bg-white border border-luxury-gold/20 p-4 flex items-center justify-between rounded-sm shadow-xs">
                    <div className="flex items-center space-x-3.5">
                      <Box className="w-5 h-5 text-luxury-gold flex-shrink-0" />
                      <div>
                        <span className="editorial-badge text-[8.5px] block mb-0.5">DISPATCH BOX PACKAGING</span>
                        <p className="text-xs sm:text-sm font-bold text-luxury-charcoal font-mono uppercase">{activeSize}: {activeBoxQuantity}</p>
                      </div>
                    </div>
                    <span className="text-[9px] font-mono font-semibold text-luxury-gold bg-luxury-ivory px-3 py-1 border border-luxury-gold/20 uppercase tracking-widest">
                      Standard Carton
                    </span>
                  </div>
                </ScrollReveal>
              )}

              {/* Specifications table */}
              <ScrollReveal direction="up">
                <div>
                  <h3 className="editorial-badge text-[9.5px] block mb-3">
                    TECHNICAL SPECIFICATIONS
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 text-xs bg-white/70 p-4 border border-luxury-gold/15 rounded-sm">
                    <div className="flex justify-between border-b border-luxury-gold/10 pb-2">
                      <span className="text-neutral-400 font-normal">Material</span>
                      <span className="text-luxury-charcoal font-medium">{product.specifications?.material || 'Premium Glass / Polymer'}</span>
                    </div>
                    {product.specifications?.neckType && (
                      <div className="flex justify-between border-b border-luxury-gold/10 pb-2">
                        <span className="text-neutral-400 font-normal">Neck Finish</span>
                        <span className="text-luxury-charcoal font-medium">{product.specifications.neckType}</span>
                      </div>
                    )}
                    {product.specifications?.dispenserType && (
                      <div className="flex justify-between border-b border-luxury-gold/10 pb-2">
                        <span className="text-neutral-400 font-normal">Dispenser</span>
                        <span className="text-luxury-charcoal font-medium">{product.specifications.dispenserType}</span>
                      </div>
                    )}
                    {product.specifications?.collarOptions && (
                      <div className="flex justify-between border-b border-luxury-gold/10 pb-2">
                        <span className="text-neutral-400 font-normal">Collar Styles</span>
                        <span className="text-luxury-charcoal font-medium">{product.specifications.collarOptions}</span>
                      </div>
                    )}
                    <div className="flex justify-between border-b border-luxury-gold/10 pb-2">
                      <span className="text-neutral-400 font-normal">Customization</span>
                      <span className="text-luxury-gold font-semibold font-mono text-[11px]">Available upon inquiry</span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              {/* Colours / Finishes List */}
              {product.colours && product.colours.length > 0 && (
                <ScrollReveal direction="up">
                  <div>
                    <h3 className="editorial-badge text-[9.5px] block mb-3">
                      AVAILABLE SURFACE FINISHES
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {product.colours.map((col) => (
                        <span 
                          key={col}
                          className="bg-white border border-luxury-gold/20 px-3 py-1.5 text-[10px] font-mono font-medium text-neutral-700 rounded-sm tracking-wider uppercase"
                        >
                          {col}
                        </span>
                      ))}
                    </div>
                  </div>
                </ScrollReveal>
              )}

            </div>

            {/* Action button */}
            <ScrollReveal direction="up" className="pt-2">
              <Magnetic className="w-full sm:w-auto block sm:inline-block">
                <button
                  onClick={() => onOpenEnquiry(product, activeSize)}
                  className="btn-luxury-primary w-full sm:w-auto sm:min-w-[280px]"
                >
                  <span>REQUEST FORMAL QUOTE</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </Magnetic>
            </ScrollReveal>

            {/* B2B Advisory Note */}
            <ScrollReveal direction="up">
              <div className="flex items-start space-x-3 p-4 bg-luxury-cream border border-luxury-gold/15 rounded-sm text-left">
                <BadgeInfo className="w-4 h-4 text-luxury-gold flex-shrink-0 mt-0.5" />
                <p className="text-[11px] text-neutral-600 leading-relaxed font-light">
                  Packture International is a verified B2B wholesaler. We support custom gold foil embossing, customized screen prints, and frosting finishes. Minimum order quantities (MOQ) apply for bulk factory dispatch.
                </p>
              </div>
            </ScrollReveal>

          </div>

        </div>

      </div>
    </div>

  );
}
