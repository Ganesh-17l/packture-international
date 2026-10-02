import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ArrowRight } from 'lucide-react';
import { searchProducts } from '../../data/products';
import ProductImage from '../products/ProductImage';

export default function SearchBar({ isOpen, onClose, navigate }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const inputRef = useRef(null);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Perform search on query change
  useEffect(() => {
    if (query.trim() === '') {
      setResults([]);
    } else {
      const searchResults = searchProducts(query);
      setResults(searchResults);
    }
  }, [query]);

  const handleProductClick = (slug) => {
    navigate(`/products/${slug}`);
    onClose();
    setQuery('');
  };

  const suggestions = ["50ml", "Monolith", "Dropper", "PET", "Glass Jar", "Tube"];

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.4, 
        ease: [0.22, 1, 0.36, 1],
        staggerChildren: 0.05,
        delayChildren: 0.05
      }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.3, ease: 'easeInOut' }
    }
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } }
  };

  const staggerItemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
          className="fixed inset-0 z-50 bg-luxury-ivory/98 backdrop-blur-md flex flex-col bg-grain text-luxury-charcoal h-screen overflow-hidden"
        >
          {/* Search Header Container */}
          <div className="w-full pt-10 md:pt-14 pb-4 px-6 md:px-24">
            <motion.div 
              variants={headerVariants}
              className="max-w-4xl mx-auto w-full flex items-center justify-between border-b border-luxury-gold/20 pb-4"
            >
              <div className="flex items-center flex-1">
                <Search className="w-6 h-6 text-luxury-gold mr-4 flex-shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Search collections, products..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="bg-transparent border-none outline-none text-2xl md:text-4xl text-luxury-charcoal placeholder-neutral-400 w-full font-serif font-light tracking-wide focus:ring-0 placeholder:italic"
                />
              </div>
              <button 
                onClick={onClose}
                className="text-luxury-charcoal/60 hover:text-luxury-gold p-2 transition-colors duration-300 ml-4 cursor-pointer"
                aria-label="Close search"
              >
                <X className="w-6 h-6" />
              </button>
            </motion.div>
          </div>

          {/* Suggested Searches Container */}
          {query === '' && (
            <div className="w-full px-6 md:px-24 mb-6">
              <motion.div 
                variants={staggerItemVariants}
                className="max-w-4xl mx-auto w-full"
              >
                <h4 className="text-[10px] font-bold tracking-[0.2em] text-neutral-400 uppercase mb-3.5 font-mono select-none">
                  SUGGESTED SEARCHES
                </h4>
                <div className="flex flex-wrap gap-2.5">
                  {suggestions.map((sug) => (
                    <button
                      key={sug}
                      onClick={() => setQuery(sug)}
                      className="border border-luxury-gold/15 hover:border-luxury-gold text-xs text-luxury-charcoal/80 hover:text-luxury-charcoal px-4 py-2 transition-all duration-300 rounded-sm cursor-pointer tracking-wider font-semibold"
                    >
                      {sug}
                    </button>
                  ))}
                </div>
              </motion.div>
            </div>
          )}

          {/* Search Results Container */}
          <div className="w-full flex-1 overflow-y-auto pb-16 px-6 md:px-24">
            <div className="max-w-4xl mx-auto w-full">
              {query !== '' && results.length === 0 && (
                <motion.div 
                  variants={staggerItemVariants}
                  className="text-center py-16"
                >
                  <h3 className="font-serif text-2xl text-luxury-charcoal mb-2">No packaging found</h3>
                  <p className="text-xs text-neutral-500 max-w-md mx-auto leading-relaxed">
                    We couldn't find matches for "{query}". Try checking the spelling or filtering by a different capacity, category, or container style.
                  </p>
                </motion.div>
              )}

              {results.length > 0 && (
                <motion.div 
                  variants={{
                    hidden: {},
                    visible: { transition: { staggerChildren: 0.04 } }
                  }}
                  className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
                >
                  {results.map((product) => (
                    <motion.div 
                      variants={staggerItemVariants}
                      key={product.id}
                      onClick={() => handleProductClick(product.slug)}
                      className="bg-[#FCFBF7] border border-luxury-gold/15 p-4 hover:border-luxury-gold/45 hover:shadow-md transition-all duration-300 group cursor-pointer flex flex-col justify-between min-h-[140px]"
                    >
                      <div className="flex items-center space-x-4 mb-4">
                        {/* Miniature Product Graphic */}
                        <div className="w-12 h-12 bg-luxury-cream flex-shrink-0 flex items-center justify-center border border-luxury-gold/10 p-1">
                          <ProductImage product={product} fullImage={true} className="w-full h-full bg-transparent border-none p-0 rounded-none shadow-none aspect-square" />
                        </div>
                        <div>
                          <span className="text-[9px] font-bold tracking-widest text-luxury-gold uppercase block font-mono">
                            {product.subcategory}
                          </span>
                          <h3 className="font-serif text-sm font-semibold text-luxury-charcoal group-hover:text-luxury-gold transition-colors leading-tight">
                            {product.name}
                          </h3>
                        </div>
                      </div>

                      <div className="border-t border-luxury-gold/10 pt-3 mt-auto flex items-center justify-between">
                        <span className="text-[10px] text-neutral-500 font-mono">
                          {product.sizes ? product.sizes.join(' · ') : 'Custom Sizing'}
                        </span>
                        <span className="text-[10px] text-luxury-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center uppercase font-bold tracking-widest">
                          View <ArrowRight className="w-3 h-3 ml-1" />
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
