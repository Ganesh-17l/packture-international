import React from 'react';
import { ArrowUp, Phone, Mail, MapPin, ShieldCheck, Compass } from 'lucide-react';
import { CATEGORIES } from '../../data/products';

export default function Footer({ navigate, onOpenQuote }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerCategories = CATEGORIES.slice(0, 7);

  return (
    <footer className="bg-[#0D0C0B] text-neutral-400 pt-16 pb-8 md:pt-20 px-6 md:px-12 border-t border-luxury-gold/15 relative bg-grain">
      
      {/* Scroll to Top Trigger */}
      <button 
        onClick={scrollToTop}
        className="absolute top-0 right-12 -translate-y-1/2 bg-luxury-gold text-luxury-charcoal p-3 hover:bg-luxury-ivory hover:text-luxury-charcoal transition-all duration-300 shadow-lg group"
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform duration-300" />
      </button>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        
        {/* Brand Statement */}
        <div className="flex flex-col space-y-6">
          <a 
            href="/" 
            onClick={(e) => { e.preventDefault(); navigate('/'); }}
            className="flex items-center text-left cursor-pointer focus:outline-none"
            aria-label="Packture International - Flagship Home"
          >
            <img 
              src="/logo.png" 
              alt="Packture International Logo"
              className="h-10 md:h-12 w-auto object-contain"
            />
          </a>
          <p className="text-xs leading-relaxed text-neutral-400 max-w-sm">
            Packaging the Future with Luxury Finishing. Providing bespoke cosmetic, fragrance, skincare and personal-care packaging solutions globally.
          </p>
          <div className="pt-2 flex flex-col space-y-1 text-[10px] tracking-wider text-neutral-500 uppercase font-semibold">
            <span className="flex items-center"><ShieldCheck className="w-3.5 h-3.5 mr-1 text-luxury-gold" /> GSTIN: 33SHSPS7926G1Z9</span>
            <span className="flex items-center"><Compass className="w-3.5 h-3.5 mr-1 text-luxury-gold" /> MSME: TN-07-0151088</span>
          </div>
        </div>

        {/* Categories Menu */}
        <div>
          <h3 className="text-xs font-mono font-semibold tracking-[0.25em] text-neutral-200 uppercase mb-6 pb-2 border-b border-luxury-gold/20">
            PACKAGING COLLECTIONS
          </h3>
          <ul className="space-y-2.5">
            {footerCategories.map((cat) => (
              <li key={cat.slug}>
                <a
                  href={`/collections/${cat.slug}`}
                  onClick={(e) => { e.preventDefault(); navigate(`/collections/${cat.slug}`); }}
                  className="text-xs text-neutral-400 hover:text-luxury-gold transition-colors duration-300 text-left block w-full"
                >
                  {cat.name}
                </a>
              </li>
            ))}
            <li>
              <a
                href="/collections"
                onClick={(e) => { e.preventDefault(); navigate('/collections'); }}
                className="text-xs text-luxury-gold hover:underline transition-colors duration-300 text-left block w-full uppercase tracking-wider font-mono font-semibold pt-1"
              >
                View All Collections →
              </a>
            </li>
          </ul>
        </div>

        {/* Navigation links */}
        <div>
          <h3 className="text-xs font-mono font-semibold tracking-[0.25em] text-neutral-200 uppercase mb-6 pb-2 border-b border-luxury-gold/20">
            BUSINESS INFRASTRUCTURE
          </h3>
          <ul className="space-y-2.5">
            <li>
              <a 
                href="/" 
                onClick={(e) => { e.preventDefault(); navigate('/'); }}
                className="text-xs text-neutral-400 hover:text-luxury-gold transition-colors text-left block"
              >
                Home Flagship
              </a>
            </li>
            <li>
              <a 
                href="/about" 
                onClick={(e) => { e.preventDefault(); navigate('/about'); }}
                className="text-xs text-neutral-400 hover:text-luxury-gold transition-colors text-left block"
              >
                Company & Values
              </a>
            </li>
            <li>
              <a 
                href="/customization" 
                onClick={(e) => { e.preventDefault(); navigate('/customization'); }}
                className="text-xs text-neutral-400 hover:text-luxury-gold transition-colors text-left block"
              >
                Customization & Process
              </a>
            </li>
            <li>
              <a 
                href="/catalogue" 
                onClick={(e) => { e.preventDefault(); navigate('/catalogue'); }}
                className="text-xs text-neutral-400 hover:text-luxury-gold transition-colors text-left block"
              >
                2026 Product Catalogue
              </a>
            </li>
            <li>
              <a 
                href="/contact" 
                onClick={(e) => { e.preventDefault(); navigate('/contact'); }}
                className="text-xs text-neutral-400 hover:text-luxury-gold transition-colors text-left block"
              >
                Corporate Location
              </a>
            </li>
            <li>
              <button onClick={() => onOpenQuote()} className="text-xs text-luxury-gold hover:text-luxury-ivory transition-colors text-left font-mono font-semibold uppercase tracking-wider block pt-1 cursor-pointer">
                Request a Quote
              </button>
            </li>
          </ul>
        </div>

        {/* Contact details */}
        <div className="flex flex-col space-y-6">
          <h3 className="text-xs font-mono font-semibold tracking-[0.25em] text-neutral-200 uppercase pb-2 border-b border-luxury-gold/20">
            CORPORATE OFFICE
          </h3>
          <ul className="space-y-4">
            <li className="flex items-start text-xs leading-relaxed text-neutral-400">
              <MapPin className="w-4 h-4 mr-3 text-luxury-gold flex-shrink-0 mt-0.5" />
              <span>
                No. 51, Anthiyur Vazhli, Anthiyur Colony,<br />
                Anthiyur, Erode, Tamil Nadu,<br />
                India - 638501.
              </span>
            </li>
            <li className="flex items-center text-xs text-neutral-400">
              <Phone className="w-4 h-4 mr-3 text-luxury-gold flex-shrink-0" />
              <a href="tel:+917418173970" className="hover:text-luxury-gold transition-colors font-mono">
                +91 74181 73970
              </a>
            </li>
            <li className="flex items-center text-xs text-neutral-400">
              <Mail className="w-4 h-4 mr-3 text-luxury-gold flex-shrink-0" />
              <a href="mailto:packtureinternational@gmail.com" className="hover:text-luxury-gold transition-colors">
                packtureinternational@gmail.com
              </a>
            </li>
          </ul>
        </div>

      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between text-xs text-neutral-600">
        <p className="mb-4 md:mb-0">
          © {new Date().getFullYear()} Packture International. All Rights Reserved.
        </p>
        <div className="flex space-x-6">
          <button className="hover:text-neutral-400 transition-colors">Privacy Policy</button>
          <span>·</span>
          <button className="hover:text-neutral-400 transition-colors">Terms of Business</button>
        </div>
      </div>

      {/* Floating contact WhatsApp button (Restrained luxury styling) */}
      <a
        href="https://wa.me/917418173970"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-[#25D366]/90 hover:bg-[#25D366] text-white p-3 rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.35)] backdrop-blur-sm transition-all duration-300 hover:scale-105 z-30 flex items-center justify-center border border-white/10"
        aria-label="Contact via WhatsApp"
        title="Chat on WhatsApp"
      >
        <svg viewBox="0 0 24 24" className="w-4.5 h-4.5 fill-current">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.97C16.488 2.012 14.032.99 11.516.99c-5.44 0-9.865 4.37-9.869 9.803-.001 1.77.476 3.499 1.38 5.03L2.008 21.8l6.184-1.611c1.551.854 3.2 1.3 4.87 1.3" />
        </svg>
      </a>
    </footer>
  );
}
