import React, { useState, Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import { useNavigation } from './hooks/useNavigation';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import SearchBar from './components/common/SearchBar';
import EnquiryModal from './components/forms/EnquiryModal';
import VideoIntro from './components/layout/VideoIntro';

// Direct Eager Load: Flagship Home Page
import Home from './pages/Home';

// Route Code Splitting: Secondary Pages Loaded On-Demand
const About = lazy(() => import('./pages/About'));
const Collections = lazy(() => import('./pages/Collections'));
const CollectionDetail = lazy(() => import('./pages/CollectionDetail'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const Customization = lazy(() => import('./pages/Customization'));
const Catalogue = lazy(() => import('./pages/Catalogue'));
const Contact = lazy(() => import('./pages/Contact'));

function PageFallback() {
  return (
    <div className="pt-40 pb-32 min-h-screen bg-luxury-ivory bg-grain flex flex-col items-center justify-center">
      <div className="w-8 h-8 border-2 border-luxury-gold/30 border-t-luxury-gold rounded-full animate-spin" />
    </div>
  );
}

export default function App() {
  const { currentPath, page, params, navigate } = useNavigation();

  // Intro Route-Controlled Lifecycle:
  // Checked BEFORE displaying the intro:
  // - If loaded/refreshed on Home ('/'), intro begins playing.
  // - When the video reaches its final frame, onStartExit is triggered -> siteRevealed becomes true.
  //   The Home page mounts underneath in its initial layout and gently starts its entrance animation.
  // - During the 700ms transition, the intro overlay smoothly fades out.
  // - When the fade finishes, introCompleted becomes true -> intro overlay unmounts,
  //   pointer-events and scroll are fully unlocked.
  // - If loaded/refreshed on ANY other route, site is revealed and completed immediately with zero intro.
  const isInitialHome = () => {
    if (typeof window === 'undefined') return true;
    const path = window.location.pathname;
    return path === '/' || path === '' || path === '/index.html';
  };

  const [siteRevealed, setSiteRevealed] = useState(() => !isInitialHome());
  const [introCompleted, setIntroCompleted] = useState(() => !isInitialHome());

  // Search & Enquiry states
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [modalMode, setModalMode] = useState('quote'); // 'quote' | 'work-with-us'
  const [enquiryProduct, setEnquiryProduct] = useState(null);
  const [enquirySize, setEnquirySize] = useState(null);

  // Trigger general quote
  const handleOpenGeneralQuote = () => {
    setModalMode('quote');
    setEnquiryProduct(null);
    setEnquirySize(null);
    setIsQuoteOpen(true);
  };

  // Trigger item-specific B2B enquiry
  const handleOpenProductEnquiry = (product, size = null) => {
    setModalMode('quote');
    setEnquiryProduct(product);
    setEnquirySize(size);
    setIsQuoteOpen(true);
  };

  // Trigger Work With Us / Business Collaboration enquiry
  const handleOpenWorkWithUs = () => {
    setModalMode('work-with-us');
    setEnquiryProduct(null);
    setEnquirySize(null);
    setIsQuoteOpen(true);
  };

  // Trigger Start a Custom Project enquiry
  const handleOpenCustomProject = () => {
    setModalMode('custom-project');
    setEnquiryProduct(null);
    setEnquirySize(null);
    setIsQuoteOpen(true);
  };

  // Page Routing Router
  const renderActivePage = () => {
    switch (page) {
      case 'home':
        return (
          <Home 
            navigate={navigate} 
            onOpenQuote={handleOpenGeneralQuote} 
            onOpenEnquiry={handleOpenProductEnquiry} 
          />
        );
      case 'about':
        return (
          <Suspense fallback={<PageFallback />}>
            <About 
              navigate={navigate} 
              onOpenQuote={handleOpenGeneralQuote} 
              onOpenWorkWithUs={handleOpenWorkWithUs}
            />
          </Suspense>
        );
      case 'collections':
        return (
          <Suspense fallback={<PageFallback />}>
            <Collections 
              navigate={navigate} 
              onOpenQuote={handleOpenGeneralQuote}
            />
          </Suspense>
        );
      case 'collection-detail':
        return (
          <Suspense fallback={<PageFallback />}>
            <CollectionDetail 
              categorySlug={params.categorySlug} 
              navigate={navigate} 
              onOpenEnquiry={handleOpenProductEnquiry} 
            />
          </Suspense>
        );
      case 'product-detail':
        return (
          <Suspense fallback={<PageFallback />}>
            <ProductDetail 
              productSlug={params.productSlug} 
              navigate={navigate} 
              onOpenEnquiry={handleOpenProductEnquiry} 
            />
          </Suspense>
        );
      case 'customization':
        return (
          <Suspense fallback={<PageFallback />}>
            <Customization 
              navigate={navigate} 
              onOpenQuote={handleOpenGeneralQuote} 
              onOpenCustomProject={handleOpenCustomProject}
            />
          </Suspense>
        );
      case 'catalogue':
        return (
          <Suspense fallback={<PageFallback />}>
            <Catalogue />
          </Suspense>
        );
      case 'contact':
        return (
          <Suspense fallback={<PageFallback />}>
            <Contact />
          </Suspense>
        );
      default:
        // Elegant 404 Fallback
        return (
          <div className="pt-40 pb-32 text-center bg-luxury-ivory min-h-screen bg-grain flex flex-col items-center justify-center px-6">
            <span className="font-serif text-8xl text-luxury-gold font-light mb-4">404</span>
            <h1 className="font-serif text-3xl text-luxury-charcoal mb-4">Silhouette Not Found</h1>
            <p className="text-xs text-neutral-500 max-w-sm leading-relaxed mb-8">
              The packaging category or product details you are trying to access does not exist in our current registry records.
            </p>
            <button
              onClick={() => navigate('/')}
              className="bg-luxury-charcoal text-luxury-ivory border border-luxury-gold px-8 py-3.5 text-xs font-bold tracking-widest uppercase hover:bg-luxury-gold hover:text-luxury-charcoal transition-all duration-300"
            >
              Back to Flagship
            </button>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#070709] text-luxury-charcoal selection:bg-luxury-gold selection:text-luxury-charcoal relative overflow-x-hidden">
      
      {/* Packture International Intro Video: Strictly controlled by route (renders ONLY on Home page) */}
      {page === 'home' && !introCompleted && (
        <VideoIntro 
          onStartExit={() => setSiteRevealed(true)}
          onComplete={() => setIntroCompleted(true)} 
        />
      )}

      {/* Website Shell:
          - On any non-Home route: mounts immediately with zero delay.
          - On Home route: mounts at the start of the exit transition so entrance animations
            unfold naturally underneath the fading intro overlay with zero pop-in or sudden cuts. */}
      {(page !== 'home' || siteRevealed) && (
        <div 
          id="packture-site-shell"
          className="flex-1 flex flex-col justify-between bg-luxury-ivory text-luxury-charcoal bg-grain relative"
          style={{
            pointerEvents: introCompleted ? 'auto' : 'none',
          }}
        >
          {/* Global Grain Overlay Effect */}
          <div className="pointer-events-none fixed inset-0 z-50 bg-[radial-gradient(rgba(0,0,0,0.015)_1px,transparent_0)] bg-[size:16px_16px] opacity-70"></div>

          {/* Global Sticky Navigation */}
          <Navbar 
          navigate={navigate} 
          currentPage={page} 
          onOpenSearch={() => setIsSearchOpen(true)} 
          onOpenQuote={handleOpenGeneralQuote} 
        />

        {/* Main Page Area */}
        <main className="flex-1">
          {renderActivePage()}
        </main>

        {/* Global B2B Footer */}
        <Footer 
          navigate={navigate} 
          onOpenQuote={handleOpenGeneralQuote} 
        />

        {/* Global Search Overlay Panel */}
        <SearchBar 
          isOpen={isSearchOpen} 
          onClose={() => setIsSearchOpen(false)} 
          navigate={navigate} 
        />

        {/* Global B2B Enquiry Overlay Modal */}
        <EnquiryModal 
          isOpen={isQuoteOpen} 
          onClose={() => { setIsQuoteOpen(false); setEnquiryProduct(null); setEnquirySize(null); }} 
          initialProduct={enquiryProduct} 
          initialSize={enquirySize} 
          mode={modalMode}
        />
      </div>
      )}

    </div>
  );
}
