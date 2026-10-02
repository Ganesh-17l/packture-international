import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SlidersHorizontal, ArrowLeft, RotateCcw, Sparkles, X } from 'lucide-react';
import { CATEGORIES, getProductsByCategory } from '../data/products';
import { getCategoryFilters } from '../data/categoryFilters';
import ProductCard from '../components/products/ProductCard';
import ScrollReveal from '../components/common/ScrollReveal';

export default function CollectionDetail({ categorySlug, navigate, onOpenEnquiry }) {
  // Applied filters (controls what products are rendered on page)
  const [selectedFilters, setSelectedFilters] = useState({});
  
  // Mobile drawer state
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  // Draft filters (staged choices while mobile drawer is open)
  const [draftFilters, setDraftFilters] = useState({});

  // Category Metadata
  const category = useMemo(() => {
    return CATEGORIES.find(cat => cat.slug === categorySlug);
  }, [categorySlug]);

  // Category Products
  const rawProducts = useMemo(() => {
    return getProductsByCategory(categorySlug);
  }, [categorySlug]);

  // Category Filter Configuration
  const categoryFilters = useMemo(() => {
    return getCategoryFilters(categorySlug);
  }, [categorySlug]);

  // Reset filters on category switch
  useEffect(() => {
    setSelectedFilters({});
    setDraftFilters({});
  }, [categorySlug]);

  // Dynamic document.title
  useEffect(() => {
    const catName = category?.name || (categorySlug ? categorySlug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') : 'Collection');
    const prevTitle = document.title;
    document.title = `${catName} — Packture International`;
    return () => {
      document.title = prevTitle;
    };
  }, [category, categorySlug]);

  // Handle desktop filter change
  const handleFilterChange = (filterId, value) => {
    setSelectedFilters(prev => ({
      ...prev,
      [filterId]: value
    }));
  };

  // Check if any filter is actively applied on the page
  const isAnyFilterActive = useMemo(() => {
    return Object.values(selectedFilters).some(v => v && v !== 'all');
  }, [selectedFilters]);

  // Reset all applied filters on the page
  const handleResetFilters = () => {
    setSelectedFilters({});
  };

  // --- Mobile Drawer Handlers ---
  const handleOpenMobileFilters = () => {
    setDraftFilters({ ...selectedFilters });
    setIsMobileFiltersOpen(true);
  };

  const handleCloseMobileFilters = () => {
    // Discard any uncommitted draft selections
    setIsMobileFiltersOpen(false);
  };

  const handleApplyMobileFilters = () => {
    // Commit staged draft filters to the actual page state
    setSelectedFilters({ ...draftFilters });
    setIsMobileFiltersOpen(false);
  };

  const handleDraftFilterChange = (filterId, value) => {
    setDraftFilters(prev => ({
      ...prev,
      [filterId]: value
    }));
  };

  const handleResetDraftFilters = () => {
    setDraftFilters({});
  };

  const isDraftFilterActive = useMemo(() => {
    return Object.values(draftFilters).some(v => v && v !== 'all');
  }, [draftFilters]);

  // Primary filter (rendered as horizontal pill tabs on desktop)
  const primaryFilter = useMemo(() => {
    return categoryFilters.find(f => f.isPrimaryPill) || categoryFilters[0];
  }, [categoryFilters]);

  // Secondary filters (rendered as dropdowns on desktop)
  const secondaryFilters = useMemo(() => {
    if (!primaryFilter) return [];
    return categoryFilters.filter(f => f.id !== primaryFilter.id);
  }, [categoryFilters, primaryFilter]);

  // Filtered Products (based on applied selectedFilters)
  const filteredProducts = useMemo(() => {
    return rawProducts.filter(product => {
      return categoryFilters.every(filterDef => {
        const selectedValue = selectedFilters[filterDef.id] || 'all';
        if (selectedValue === 'all') return true;
        const opt = filterDef.options.find(o => o.value === selectedValue);
        return opt && opt.match ? opt.match(product) : true;
      });
    });
  }, [rawProducts, selectedFilters, categoryFilters]);

  // Draft Filtered Products (for live count preview inside mobile drawer)
  const draftFilteredProducts = useMemo(() => {
    return rawProducts.filter(product => {
      return categoryFilters.every(filterDef => {
        const selectedValue = draftFilters[filterDef.id] || 'all';
        if (selectedValue === 'all') return true;
        const opt = filterDef.options.find(o => o.value === selectedValue);
        return opt && opt.match ? opt.match(product) : true;
      });
    });
  }, [rawProducts, draftFilters, categoryFilters]);

  if (!category) {
    return (
      <div className="pt-32 pb-24 text-center">
        <h2 className="font-serif text-3xl mb-4">Collection Not Found</h2>
        <button onClick={() => navigate('/collections')} className="text-luxury-gold hover:underline cursor-pointer">
          Return to All Collections
        </button>
      </div>
    );
  }

  return (
    <div className="bg-luxury-ivory text-luxury-charcoal bg-grain pt-28 pb-20 min-h-screen">
      
      {/* Editorial Header */}
      <section className="py-12 md:py-20 px-6 md:px-12 max-w-7xl mx-auto border-b border-luxury-gold/15 text-left">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-[10px] font-mono tracking-widest text-neutral-400 uppercase mb-6">
          <a 
            href="/collections"
            onClick={(e) => { e.preventDefault(); navigate('/collections'); }}
            className="hover:text-luxury-gold transition-colors cursor-pointer flex items-center"
          >
            <ArrowLeft className="w-3 h-3 mr-1.5 text-luxury-gold" /> COLLECTIONS
          </a>
          <span>/</span>
          <span className="text-luxury-gold font-semibold truncate max-w-[240px]">{category.name}</span>
        </nav>
        
        <ScrollReveal direction="up">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-7">
              <span className="editorial-badge block mb-2">
                COLLECTION DIRECTORY
              </span>
              <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-light tracking-tight text-luxury-charcoal leading-[1.1]">
                {category.name}
              </h1>
              <p className="text-xs sm:text-sm text-neutral-600 mt-4 leading-relaxed max-w-2xl font-light">
                {category.description}
              </p>
            </div>
            {category.editorialQuote && (
              <div className="lg:col-span-5 border-l border-luxury-gold/30 pl-6 py-2">
                <span className="editorial-badge text-[9px] block mb-1">
                  EDITORIAL SPECIFICATION
                </span>
                <p className="text-xs italic text-neutral-600 leading-relaxed font-light font-serif">
                  "{category.editorialQuote}"
                </p>
              </div>
            )}
          </div>
        </ScrollReveal>
      </section>

      {/* Filter and Content Area */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 pt-8 text-left">
        
        {/* Desktop Filter Suite */}
        <ScrollReveal direction="down" className="w-full">
          <div className="hidden md:block border-b border-luxury-gold/15 pb-6 mb-8 space-y-4">
            
            {/* Primary Filter Pill Tabs & Product Count */}
            {primaryFilter && (
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="editorial-badge text-[9.5px] mr-1">
                    {primaryFilter.label}:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {primaryFilter.options.map(opt => {
                      const isActive = (selectedFilters[primaryFilter.id] || 'all') === opt.value;
                      return (
                        <button
                          key={opt.value}
                          onClick={() => handleFilterChange(primaryFilter.id, opt.value)}
                          className={`text-xs px-4 py-1.5 rounded-full transition-all duration-300 cursor-pointer font-sans ${
                            isActive 
                              ? 'bg-luxury-charcoal text-luxury-ivory font-medium shadow-sm border border-luxury-gold' 
                              : 'bg-white/80 text-neutral-600 border border-luxury-gold/20 hover:border-luxury-gold hover:text-luxury-charcoal hover:bg-white'
                          }`}
                        >
                          {opt.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Product Counter */}
                <div className="text-xs text-neutral-500 font-mono tracking-wider flex-shrink-0">
                  <span className="text-luxury-charcoal font-bold">{filteredProducts.length}</span> {filteredProducts.length === 1 ? 'MODEL' : 'MODELS'}
                </div>
              </div>
            )}

            {/* Secondary Filters Dropdowns & Active Filter Indicators */}
            {secondaryFilters.length > 0 && (
              <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                <div className="flex flex-wrap items-center gap-5">
                  
                  {secondaryFilters.map(filterDef => (
                    <div key={filterDef.id} className="flex items-center space-x-2">
                      <span className="editorial-badge text-[9px]">
                        {filterDef.label}:
                      </span>
                      <select
                        value={selectedFilters[filterDef.id] || 'all'}
                        onChange={(e) => handleFilterChange(filterDef.id, e.target.value)}
                        className="bg-white border border-luxury-gold/25 outline-none px-3.5 py-1.5 text-xs rounded-sm focus:border-luxury-gold text-luxury-charcoal transition-colors cursor-pointer font-sans"
                      >
                        {filterDef.options.map(opt => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  ))}

                  {/* Reset Filters Action */}
                  {isAnyFilterActive && (
                    <button
                      onClick={handleResetFilters}
                      className="flex items-center text-[10px] font-mono font-bold tracking-widest uppercase text-luxury-gold hover:text-luxury-charcoal transition-colors cursor-pointer py-1.5 px-3 border border-luxury-gold/40 rounded-sm bg-white"
                    >
                      <RotateCcw className="w-3 h-3 mr-1.5" />
                      Clear Filters
                    </button>
                  )}

                </div>

                {!primaryFilter && (
                  <div className="text-xs text-neutral-500 font-mono tracking-wider">
                    <span className="text-luxury-charcoal font-bold">{filteredProducts.length}</span> {filteredProducts.length === 1 ? 'MODEL' : 'MODELS'}
                  </div>
                )}
              </div>
            )}

          </div>
        </ScrollReveal>

        {/* Mobile Filter Toggle & Summary */}
        <div className="flex md:hidden items-center justify-between border-b border-luxury-gold/10 pb-4 mb-6">
          <button 
            onClick={handleOpenMobileFilters}
            className="border border-luxury-gold/25 bg-white/60 px-4 py-2 text-xs font-bold tracking-widest uppercase flex items-center space-x-2 cursor-pointer rounded-sm"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-luxury-gold" />
            <span>Filters {isAnyFilterActive && '•'}</span>
          </button>
          <span className="text-xs text-neutral-400 font-mono">
            {filteredProducts.length} Products
          </span>
        </div>

        {/* Mobile Filter Bottom Sheet Overlay */}
        <AnimatePresence>
          {isMobileFiltersOpen && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseMobileFilters}
              className="fixed inset-0 z-50 bg-luxury-nearblack/60 backdrop-blur-sm flex items-end justify-center"
            >
              <motion.div 
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 220 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-luxury-ivory w-full max-h-[85vh] rounded-t-xl p-6 bg-grain overflow-y-auto flex flex-col focus:outline-none shadow-2xl"
              >
                <div className="flex items-center justify-between border-b border-luxury-gold/15 pb-4 mb-6">
                  <div className="flex items-center space-x-2">
                    <Sparkles className="w-4 h-4 text-luxury-gold" />
                    <h3 className="font-serif text-2xl font-medium">Filter {category.name}</h3>
                  </div>
                  <button 
                    onClick={handleCloseMobileFilters}
                    className="p-1 text-neutral-400 hover:text-luxury-charcoal transition-colors cursor-pointer rounded-full"
                    aria-label="Close without applying"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-6 flex-1 text-left">
                  {/* Category Filters inside Mobile Drawer */}
                  {categoryFilters.map(filterDef => (
                    <div key={filterDef.id}>
                      <label className="text-[10px] font-bold tracking-widest text-luxury-charcoal uppercase block mb-2 font-mono">
                        {filterDef.label}
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {filterDef.options.map(opt => {
                          const isSelected = (draftFilters[filterDef.id] || 'all') === opt.value;
                          return (
                            <button
                              key={opt.value}
                              onClick={() => handleDraftFilterChange(filterDef.id, opt.value)}
                              className={`text-xs px-3 py-2 rounded-sm border transition-all text-left cursor-pointer ${
                                isSelected
                                  ? 'bg-luxury-charcoal text-luxury-ivory border-luxury-charcoal font-medium'
                                  : 'bg-white/60 text-neutral-700 border-luxury-gold/20'
                              }`}
                            >
                              {opt.label}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex space-x-3 mt-8">
                  {isDraftFilterActive && (
                    <button
                      onClick={handleResetDraftFilters}
                      className="w-1/3 bg-transparent border border-luxury-gold/40 text-luxury-charcoal py-3.5 text-xs font-bold tracking-widest uppercase hover:bg-white transition-all cursor-pointer rounded-sm"
                    >
                      Reset
                    </button>
                  )}
                  <button
                    onClick={handleApplyMobileFilters}
                    className="flex-1 bg-luxury-charcoal text-luxury-ivory border border-luxury-gold py-3.5 text-xs font-bold tracking-widest uppercase hover:bg-luxury-gold hover:text-luxury-charcoal transition-all duration-300 cursor-pointer rounded-sm text-center"
                  >
                    View {draftFilteredProducts.length} {draftFilteredProducts.length === 1 ? 'Product' : 'Products'}
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-20 flex flex-col items-center bg-white/70 border border-luxury-gold/15 p-12 rounded-sm shadow-sm">
            <h3 className="font-serif text-3xl text-luxury-charcoal mb-3">No matching packaging found</h3>
            <p className="text-xs text-neutral-500 max-w-md leading-relaxed mb-6 font-light">
              There are no models matching your current filter selection in this collection.
            </p>
            <button
              onClick={handleResetFilters}
              className="btn-luxury-primary"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset All Filters</span>
            </button>
          </div>
        )}

        {/* Grid of Product Cards */}
        {filteredProducts.length > 0 && (
          <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product) => (
                <motion.div 
                  layout
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  key={product.id}
                  className="h-full"
                >
                  <ProductCard 
                    product={product} 
                    navigate={navigate} 
                    onOpenEnquiry={onOpenEnquiry} 
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

      </section>

    </div>
  );
}
