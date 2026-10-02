import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useReducedMotion } from 'framer-motion';
import { Search, ChevronDown, ArrowRight } from 'lucide-react';
import { CATEGORIES } from '../../data/products';
import Magnetic from '../common/Magnetic';

const collectionGroups = [
  {
    title: "FRAGRANCE",
    items: [
      { name: "Perfume Glass Bottles", slug: "perfume-glass-bottles" },
      { name: "Fancy Glass Bottles", slug: "fancy-glass-bottles" }
    ]
  },
  {
    title: "DROPPERS",
    items: [
      { name: "Glass Dropper Packaging", slug: "dropper-packaging" }
    ]
  },
  {
    title: "BEAUTY & COSMETICS",
    items: [
      { name: "Cosmetic Glass Jars", slug: "cosmetic-glass-jars" },
      { name: "Cosmetic Tubes", slug: "cosmetic-tubes" }
    ]
  },
  {
    title: "PACKAGING",
    items: [
      { name: "PET Packaging", slug: "pet-packaging" },
      { name: "HDPE Packaging", slug: "hdpe-packaging" },
      { name: "Jar Collections", slug: "jar-collections" }
    ]
  }
];

export default function Navbar({ navigate, currentPage, onOpenSearch, onOpenQuote }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredPrimaryItem, setHoveredPrimaryItem] = useState(null);
  
  // Mobile accordion toggle for Collections
  const [isMobileCollectionsOpen, setIsMobileCollectionsOpen] = useState(false);
  const shouldReduce = useReducedMotion();

  // Scroll hide/show tracking
  const lastScrollY = useRef(0);
  const [isVisible, setIsVisible] = useState(true);

  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Determine blurred state
      setIsScrolled(currentScrollY > 40);

      // Hide / Show behavior
      if (currentScrollY > 150) {
        setIsVisible(currentScrollY <= lastScrollY.current);
      } else {
        setIsVisible(true);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  // Handle escape key to close menu
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMenuOpen]);

  const targetCategories = [
    "perfume-glass-bottles",
    "dropper-packaging",
    "fancy-glass-bottles",
    "cosmetic-glass-jars",
    "cosmetic-tubes",
    "pet-packaging",
    "hdpe-packaging",
    "jar-collections"
  ];

  const getCategoryDetails = (slug) => {
    return CATEGORIES.find(c => c.slug === slug) || { name: slug, image: "", editorialTitle: "PACKAGING" };
  };

  const primaryLinks = [
    { label: "Home", path: "/", id: "home", num: "01" },
    { label: "About", path: "/about", id: "about", num: "02" },
    { label: "Collections", path: "/collections", id: "collections", num: "03" },
    { label: "Customization", path: "/customization", id: "customization", num: "04" },
    { label: "Catalogue", path: "/catalogue", id: "catalogue", num: "05" },
    { label: "Contact", path: "/contact", id: "contact", num: "06" }
  ];

  // Motion variants matching user requirements
  const overlayVariants = {
    hidden: { 
      opacity: 0,
      y: shouldReduce ? 0 : -15
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: { 
        duration: shouldReduce ? 0.1 : 0.45, 
        ease: [0.22, 1, 0.36, 1],
        when: "beforeChildren",
        staggerChildren: shouldReduce ? 0 : 0.04
      }
    },
    exit: { 
      opacity: 0,
      y: shouldReduce ? 0 : -10,
      transition: { 
        duration: shouldReduce ? 0.1 : 0.3, 
        ease: [0.22, 1, 0.36, 1] 
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduce ? 0 : 15 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: shouldReduce ? 0.1 : 0.45, 
        ease: [0.22, 1, 0.36, 1] 
      } 
    }
  };

  // Navbar has solid warm ivory background from frame 1 across all scroll positions
  const isDarkTheme = false;

  const handleNavClick = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  const activeNavId = hoveredPrimaryItem || (currentPage === 'home' ? 'home' : currentPage) || 'home';

  const renderRightPanel = () => {
    switch (activeNavId) {
      case 'home':
        return (
          <motion.div
            key="home-panel"
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col justify-center h-full space-y-6 text-left max-w-lg"
          >
            <div>
              <span className="text-[10px] font-bold tracking-[0.3em] text-luxury-gold uppercase font-mono select-none block mb-2">
                01 / WELCOME
              </span>
              <h3 className="font-serif italic text-2xl md:text-3.5xl text-luxury-charcoal font-light leading-tight">
                Packaging the Future with Luxury Finishing
              </h3>
              <p className="text-xs text-neutral-500 leading-relaxed font-light mt-4">
                Packture International is a global leader in high-end cosmetic, perfume, and dropper bottle wholesaling. Our platforms enable seamless bulk ordering, customization specs verification, and automated B2B quote dispatch.
              </p>
            </div>
            <button 
              onClick={() => { setIsMenuOpen(false); onOpenQuote(); }}
              className="text-xs uppercase tracking-widest text-luxury-gold hover:text-luxury-charcoal font-bold transition-colors duration-300 py-2.5 px-5 border border-luxury-gold w-fit cursor-pointer flex items-center group/btn"
            >
              REQUEST A QUOTE
              <span className="ml-2 transition-transform duration-300 group-hover/btn:translate-x-1">→</span>
            </button>
          </motion.div>
        );
      case 'about':
        return (
          <motion.div
            key="about-panel"
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col justify-center h-full space-y-6 text-left max-w-lg"
          >
            <div>
              <span className="text-[10px] font-bold tracking-[0.3em] text-luxury-gold uppercase font-mono select-none block mb-2">
                02 / ABOUT US
              </span>
              <h3 className="font-serif italic text-2xl md:text-3.5xl text-luxury-charcoal font-light leading-tight">
                Heritage & Global B2B Reliability
              </h3>
              <p className="text-xs text-neutral-500 leading-relaxed font-light mt-4">
                Packture International supplies high-density containers and luxury glass solutions to leading fragrance, skincare, and beauty houses. With registered MSME and GSTIN credentials, we guarantee industrial durability and pristine finishing.
              </p>
            </div>
            <a 
              href="/about"
              onClick={(e) => { e.preventDefault(); handleNavClick('/about'); }}
              className="text-xs uppercase tracking-widest text-luxury-charcoal hover:text-luxury-gold font-bold transition-colors duration-300 py-1 w-fit cursor-pointer flex items-center group/btn"
            >
              DISCOVER OUR PROCESS 
              <span className="ml-1.5 transition-transform duration-300 group-hover/btn:translate-x-1">→</span>
            </a>
          </motion.div>
        );
      case 'collections':
        return (
          <motion.div
            key="collections-panel"
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col justify-between h-full text-left w-full"
          >
            <div className="space-y-6 w-full">
              <span className="text-[10px] font-bold tracking-[0.3em] text-luxury-gold uppercase font-mono select-none block">
                03 / COLLECTIONS DIRECTORY
              </span>
              
              {/* Grouped Grid layout */}
              <div className="grid grid-cols-2 gap-x-8 gap-y-6 w-full">
                {collectionGroups.map((group) => (
                  <div key={group.title} className="flex flex-col space-y-2">
                    <span className="text-[9px] font-bold tracking-[0.2em] text-luxury-gold/75 uppercase font-mono border-b border-luxury-gold/10 pb-1">
                      {group.title}
                    </span>
                    <div className="flex flex-col space-y-1">
                      {group.items.map((item) => (
                        <a
                          key={item.slug}
                          href={`/collections/${item.slug}`}
                          onClick={(e) => { e.preventDefault(); handleNavClick(`/collections/${item.slug}`); }}
                          className="text-left text-[11px] uppercase tracking-wider text-neutral-600 hover:text-luxury-gold transition-all duration-300 py-0.5 cursor-pointer flex items-center group/sub"
                        >
                          <span className="group-hover/sub:translate-x-1.5 transition-transform duration-300 flex items-center">
                            {item.name.replace(" (Acrylic & PP)", "")}
                            <span className="opacity-0 group-hover/sub:opacity-100 transition-opacity duration-300 ml-1 text-[9px] text-luxury-gold">
                              →
                            </span>
                          </span>
                        </a>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-luxury-gold/10 mt-6 flex justify-between items-center w-full">
              <a
                href="/collections"
                onClick={(e) => { e.preventDefault(); handleNavClick('/collections'); }}
                className="text-xs font-bold tracking-[0.2em] uppercase text-luxury-gold flex items-center group/viewall hover:text-luxury-charcoal transition-colors duration-300 cursor-pointer"
              >
                VIEW ALL COLLECTIONS 
                <span className="inline-block ml-2 transition-transform duration-300 group-hover/viewall:translate-x-1.5">
                  →
                </span>
              </a>
            </div>
          </motion.div>
        );
      case 'customization':
        return (
          <motion.div
            key="customization-panel"
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col justify-center h-full space-y-6 text-left max-w-lg"
          >
            <div>
              <span className="text-[10px] font-bold tracking-[0.3em] text-luxury-gold uppercase font-mono select-none block mb-2">
                04 / CUSTOMIZATION
              </span>
              <h3 className="font-serif italic text-2xl md:text-3.5xl text-luxury-charcoal font-light leading-tight">
                Bespoke Finishing & Custom Molds
              </h3>
              <p className="text-xs text-neutral-500 leading-relaxed font-light mt-4">
                Transform standard silhouettes with gold foil embossing, premium frosting, screen printing, and custom color coatings. We adapt our lines to fit the unique requirements of your brand launch.
              </p>
            </div>
            <a 
              href="/customization"
              onClick={(e) => { e.preventDefault(); handleNavClick('/customization'); }}
              className="text-xs uppercase tracking-widest text-luxury-charcoal hover:text-luxury-gold font-bold transition-colors duration-300 py-1 w-fit cursor-pointer flex items-center group/btn"
            >
              EXPLORE FINISHES
              <span className="ml-1.5 transition-transform duration-300 group-hover/btn:translate-x-1">→</span>
            </a>
          </motion.div>
        );
      case 'catalogue':
        return (
          <motion.div
            key="catalogue-panel"
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col justify-center h-full space-y-6 text-left max-w-lg"
          >
            <div>
              <span className="text-[10px] font-bold tracking-[0.3em] text-luxury-gold uppercase font-mono select-none block mb-2">
                05 / CATALOGUE
              </span>
              <h3 className="font-serif italic text-2xl md:text-3.5xl text-luxury-charcoal font-light leading-tight">
                2026 Architectural Spec Sheets
              </h3>
              <p className="text-xs text-neutral-500 leading-relaxed font-light mt-4">
                Access technical dimensions, dispatch capacities, pump thread details, and materials. Our digital flagship and cosmetic tubes archives are optimized for product development and wholesale imports.
              </p>
            </div>
            <a 
              href="/catalogue"
              onClick={(e) => { e.preventDefault(); handleNavClick('/catalogue'); }}
              className="text-xs uppercase tracking-widest text-luxury-charcoal hover:text-luxury-gold font-bold transition-colors duration-300 py-1 w-fit cursor-pointer flex items-center group/btn"
            >
              DOWNLOAD ARCHIVES
              <span className="ml-1.5 transition-transform duration-300 group-hover/btn:translate-x-1">→</span>
            </a>
          </motion.div>
        );
      case 'contact':
        return (
          <motion.div
            key="contact-panel"
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col justify-center h-full space-y-6 text-left max-w-lg"
          >
            <div>
              <span className="text-[10px] font-bold tracking-[0.3em] text-luxury-gold uppercase font-mono select-none block mb-2">
                06 / CONTACT US
              </span>
              <h3 className="font-serif italic text-2xl md:text-3.5xl text-luxury-charcoal font-light leading-tight">
                Corporate Office & Inquiry Desks
              </h3>
              <p className="text-xs text-neutral-500 leading-relaxed font-light mt-4">
                Reach our sales teams for samples, customized shapes, and wholesale quotes. We support global freight shipping and premium port delivery.
              </p>
              <div className="pt-4 flex flex-col space-y-1 text-xs font-mono text-neutral-500 select-all">
                <span>📞 +91 74181 73970</span>
                <span>✉️ packtureinternational@gmail.com</span>
                <span>📍 Erode, Tamil Nadu, India</span>
              </div>
            </div>
            <a 
              href="/contact"
              onClick={(e) => { e.preventDefault(); handleNavClick('/contact'); }}
              className="text-xs uppercase tracking-widest text-luxury-charcoal hover:text-luxury-gold font-bold transition-colors duration-300 py-1 w-fit cursor-pointer flex items-center group/btn"
            >
              VIEW OFFICE DETAILS
              <span className="ml-1.5 transition-transform duration-300 group-hover/btn:translate-x-1">→</span>
            </a>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      {/* Scroll Progress Indicator */}
      <motion.div 
        style={{ scaleX: scrollYProgress }} 
        className="fixed top-0 left-0 right-0 h-[2px] bg-luxury-gold origin-left z-50 pointer-events-none" 
      />

      <motion.header 
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: isVisible ? 0 : -100, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 bg-[#F7F3EA]/96 backdrop-blur-md border-b border-[#282014]/[0.08] ${
          isScrolled 
            ? 'py-3 shadow-[0_2px_14px_rgba(20,16,10,0.04)]' 
            : 'py-4 sm:py-4.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          
          {/* Logo */}
          <a 
            href="/"
            onClick={(e) => { e.preventDefault(); navigate('/'); setIsMenuOpen(false); }}
            className="flex items-center text-left group cursor-pointer focus:outline-none z-50"
            aria-label="Packture International - Back to home"
          >
            <img 
              src="/logo.png" 
              alt="Packture International Logo"
              className="h-10 md:h-11 w-auto object-contain transition-all duration-300"
              style={{
                filter: isDarkTheme ? 'none' : 'invert(1) hue-rotate(180deg)'
              }}
            />
          </a>

          {/* Right Header Actions */}
          <div className="flex items-center space-x-3 md:space-x-6 z-50">
            {/* Search Icon */}
            <button 
              onClick={onOpenSearch}
              className={`p-2.5 md:p-1.5 transition-colors duration-300 cursor-pointer rounded-full active:scale-95 ${
                isDarkTheme 
                  ? 'text-white/85 hover:text-luxury-gold hover:bg-white/10 lg:hover:bg-transparent' 
                  : 'text-luxury-charcoal hover:text-luxury-gold hover:bg-luxury-charcoal/5 lg:hover:bg-transparent'
              }`}
              aria-label="Search Catalog"
            >
              <Search className="w-5 h-5 md:w-4.5 md:h-4.5" />
            </button>

            {/* Request a Quote Button (Desktop Only, luxury outline with subtle hover underline) */}
            <div className={`hidden lg:block transition-all duration-500 ${isMenuOpen ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'}`}>
              <Magnetic>
                <button
                  onClick={() => onOpenQuote()}
                  className={`group relative border border-luxury-gold/40 hover:border-luxury-gold bg-transparent px-4 py-1.5 text-[11px] font-mono font-semibold tracking-[0.18em] uppercase transition-all duration-300 cursor-pointer overflow-hidden ${
                    isDarkTheme 
                      ? 'text-[#FAF6EE] hover:text-luxury-gold hover:bg-white/[0.04]' 
                      : 'text-luxury-charcoal hover:text-luxury-gold hover:bg-black/[0.03]'
                  }`}
                >
                  <span className="relative z-10 flex items-center space-x-1.5">
                    <span>REQUEST A QUOTE</span>
                    <span className="transition-transform duration-300 group-hover:translate-x-1 text-luxury-gold">→</span>
                  </span>
                  <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-luxury-gold transition-all duration-300 group-hover:w-full" />
                </button>
              </Magnetic>
            </div>

            {/* Unified Premium Hamburger/Close Menu Trigger */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`relative w-11 h-11 flex items-center justify-center cursor-pointer rounded-full transition-colors duration-300 focus:outline-none group ${
                isDarkTheme 
                  ? 'text-white/85 hover:bg-white/10 lg:hover:bg-transparent' 
                  : 'text-luxury-charcoal hover:bg-luxury-charcoal/5 lg:hover:bg-transparent'
              }`}
              aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
              aria-expanded={isMenuOpen}
            >
              <div className="relative w-6 h-4">
                <span 
                  className={`absolute left-0 h-[1.5px] bg-current rounded-full transition-all duration-550 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    isMenuOpen 
                      ? 'top-1/2 -translate-y-1/2 rotate-45 w-6' 
                      : 'top-1 w-6'
                  }`} 
                />
                <span 
                  className={`absolute right-0 h-[1.5px] bg-current rounded-full transition-all duration-550 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    isMenuOpen 
                      ? 'top-1/2 -translate-y-1/2 -rotate-45 w-6' 
                      : 'bottom-1 w-4 group-hover:w-6'
                  }`} 
                />
              </div>
            </button>
          </div>

        </div>
      </motion.header>

      {/* Full-Screen Premium Editorial Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-30 bg-luxury-ivory text-luxury-charcoal flex flex-col justify-between p-6 md:p-12 pt-28 md:pt-32 bg-grain overflow-y-auto"
          >
            <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col justify-between">
              
              {/* Main content grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-stretch py-6 md:py-12 flex-1">
                
                {/* Left Section: Primary Navigation Links */}
                <nav className="col-span-1 lg:col-span-5 flex flex-col justify-center space-y-2 lg:space-y-4">
                  {primaryLinks.map((link) => {
                    const isActive = currentPage === (link.path === '/' ? 'home' : link.path.substring(1));

                    return (
                      <React.Fragment key={link.id}>
                        <motion.div 
                          variants={itemVariants}
                          onMouseEnter={() => setHoveredPrimaryItem(link.id)}
                          className="group flex items-center space-x-6 py-3 border-b border-luxury-gold/5 lg:border-none lg:py-1.5"
                        >
                          {/* Number label */}
                          <span className="text-[10px] font-bold tracking-widest font-mono text-luxury-gold/60 select-none w-6 text-right">
                            {link.num}
                          </span>
                          
                          {/* Link button / anchor */}
                          <a
                            href={link.path}
                            onClick={(e) => {
                              if (link.id === 'collections') {
                                if (window.innerWidth < 1024) {
                                  e.preventDefault();
                                  setIsMobileCollectionsOpen(!isMobileCollectionsOpen);
                                } else {
                                  e.preventDefault();
                                  handleNavClick(link.path);
                                }
                              } else {
                                e.preventDefault();
                                handleNavClick(link.path);
                              }
                            }}
                            className={`text-left font-serif font-light text-[clamp(1.8rem,4vw,2.5rem)] lg:text-[clamp(2.2rem,3vw,3.5rem)] tracking-widest uppercase transition-all duration-300 cursor-pointer flex items-center relative select-none ${
                              isActive
                                ? 'text-luxury-gold font-medium translate-x-2'
                                : 'text-luxury-charcoal hover:text-luxury-gold hover:translate-x-2'
                            }`}
                          >
                            {link.label}
                            {link.id === 'collections' && (
                              <ChevronDown className={`w-4 h-4 ml-2 transition-transform duration-300 lg:hidden ${isMobileCollectionsOpen ? 'rotate-180 text-luxury-gold' : 'text-luxury-charcoal/60'}`} />
                            )}
                            
                            {/* Interactive indicator arrow for desktop */}
                            <span className="inline-block ml-3 text-luxury-gold transition-all duration-300 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 hidden lg:inline text-sm">
                              →
                            </span>
                          </a>
                        </motion.div>

                        {/* Inline Mobile Accordion for Collections */}
                        {link.id === 'collections' && isMobileCollectionsOpen && (
                          <div className="pl-6 pt-2 pb-4 flex flex-col space-y-2 border-l border-luxury-gold/15 ml-8 mt-1 lg:hidden">
                            {targetCategories.map((slug) => {
                              const cat = getCategoryDetails(slug);
                              return (
                                <a
                                  key={slug}
                                  href={`/collections/${slug}`}
                                  onClick={(e) => { e.preventDefault(); handleNavClick(`/collections/${slug}`); }}
                                  className="text-left text-xs uppercase tracking-wider text-luxury-charcoal/80 hover:text-luxury-gold py-3 px-2 cursor-pointer font-semibold block min-h-[44px] border-b border-luxury-gold/5"
                                >
                                  {cat.name.replace(" (Acrylic & PP)", "")}
                                </a>
                              );
                            })}
                            <a
                              href="/collections"
                              onClick={(e) => { e.preventDefault(); handleNavClick('/collections'); }}
                              className="text-left text-xs font-bold tracking-widest uppercase text-luxury-gold py-3 px-2 flex items-center cursor-pointer min-h-[44px]"
                            >
                              ALL CATEGORIES <ArrowRight className="w-3.5 h-3.5 ml-1" />
                            </a>
                          </div>
                        )}
                      </React.Fragment>
                    );
                  })}
                </nav>

                {/* Right Section: Content Panels (Desktop Only) */}
                <div className="hidden lg:block lg:col-span-7 lg:border-l lg:border-luxury-gold/15 lg:pl-16 h-full min-h-[380px] flex flex-col justify-center">
                  <AnimatePresence mode="wait">
                    {renderRightPanel()}
                  </AnimatePresence>
                </div>

              </div>

              {/* Bottom Footer Section */}
              <div className="border-t border-luxury-gold/15 pt-8 mt-12 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-center md:text-left select-none w-full">
                <div className="flex flex-col space-y-1">
                  <span className="text-[10px] font-bold tracking-widest font-mono text-luxury-charcoal/60 uppercase">
                    PACKTURE INTERNATIONAL
                  </span>
                  <span className="text-[10px] text-neutral-400 font-light">
                    Premium Packaging Solutions · Erode, Tamil Nadu, India
                  </span>
                </div>
                
                <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-[10px] uppercase font-bold tracking-widest text-luxury-charcoal/70">
                  <button onClick={() => handleNavClick('/about')} className="hover:text-luxury-gold transition-colors cursor-pointer">About Us</button>
                  <span>·</span>
                  <button onClick={() => { setIsMenuOpen(false); onOpenQuote(); }} className="hover:text-luxury-gold transition-colors cursor-pointer">Request Quote</button>
                  <span>·</span>
                  <button onClick={() => handleNavClick('/contact')} className="hover:text-luxury-gold transition-colors cursor-pointer">Contact</button>
                  <span>·</span>
                  <button onClick={() => handleNavClick('/catalogue')} className="hover:text-luxury-gold transition-colors cursor-pointer">2026 Catalogue</button>
                </div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
