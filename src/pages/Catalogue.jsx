import React, { useState } from 'react';
import { FileText, Download, CheckCircle, Clock } from 'lucide-react';
import ScrollReveal from '../components/common/ScrollReveal';
import Magnetic from '../components/common/Magnetic';

export default function Catalogue() {
  const [downloading, setDownloading] = useState(null);
  const [downloaded, setDownloaded] = useState({});

  const catalogs = [
    {
      id: "cat1",
      title: "Packture International Flagship Catalogue",
      year: "2026 Edition",
      pages: "76 Pages of Specifications",
      desc: "Our primary catalog containing complete specifications for perfume glass bottles (Cyril, Victor, Monolith, Saab), Zamak Sauvage caps, dome closures, and luxury droppers.",
      fileName: "packture-international-catalogue.pdf"
    },
    {
      id: "cat2",
      title: "Cosmetic Tubes & Closures Catalogue",
      year: "2026 Supplementary",
      pages: "42 Pages of Layouts",
      desc: "Focusing on squeeze cosmetic tubes (matte black/white, silicon, massage roller, dropper tubes), fine mist spray pumps, trigger sprayers, and PP jars.",
      fileName: "pti-catalogue.pdf"
    }
  ];

  const handleDownload = (id, fileName) => {
    setDownloading(id);
    // Simulate premium B2B catalog download sequence
    setTimeout(() => {
      setDownloading(null);
      setDownloaded(prev => ({ ...prev, [id]: true }));
      
      // Trigger a client-side real file download from public assets
      const element = document.createElement("a");
      element.href = "/catalogues/" + fileName;
      element.download = fileName;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }, 2000);
  };

  return (
    <div className="bg-luxury-ivory text-luxury-charcoal bg-grain pt-24 pb-16 min-h-screen">
      
      {/* Editorial Header */}
      <section className="py-16 md:py-24 px-6 md:px-12 max-w-7xl mx-auto border-b border-luxury-gold/15">
        <ScrollReveal direction="up">
          <span className="text-[10px] font-bold tracking-widest text-luxury-gold uppercase block mb-3 font-mono">
            DIGITAL ARCHIVES
          </span>
          <h1 className="font-serif text-5xl md:text-7xl font-light tracking-wide leading-tight text-luxury-charcoal">
            Product Catalogue <br />
            <span className="italic font-serif text-luxury-gold">2026 Edition</span>
          </h1>
          <p className="text-xs md:text-sm text-neutral-500 max-w-xl leading-relaxed mt-4 font-light">
            Access high-resolution architectural directories detailing sizes, box capacities, and neck details. Select a catalog below to begin.
          </p>
        </ScrollReveal>
      </section>

      {/* Catalog lists */}
      <section className="py-20 px-6 md:px-12 max-w-5xl mx-auto">
        <div className="space-y-10">
          {catalogs.map((cat, index) => (
            <ScrollReveal key={cat.id} delay={index * 0.08} direction="up">
              <div 
                className="luxury-card p-8 md:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 text-left group"
              >
                <div className="flex items-start space-x-6">
                  <div className="p-4 bg-luxury-cream text-luxury-gold border border-luxury-gold/20 flex-shrink-0 group-hover:border-luxury-gold/50 transition-colors">
                    <FileText className="w-8 h-8" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-3 mb-2.5">
                      <span className="editorial-badge">{cat.year}</span>
                      <span className="text-[10px] text-neutral-400 font-mono tracking-wider">· {cat.pages}</span>
                    </div>
                    <h3 className="font-serif text-xl md:text-2xl font-medium text-luxury-charcoal mb-2 group-hover:text-luxury-gold transition-colors">
                      {cat.title}
                    </h3>
                    <p className="text-xs text-neutral-500 leading-relaxed max-w-xl font-light">
                      {cat.desc}
                    </p>
                  </div>
                </div>

                <div className="flex-shrink-0 w-full md:w-auto">
                  {downloading === cat.id ? (
                    <button
                      disabled
                      className="w-full md:w-auto bg-luxury-cream text-luxury-gold border border-luxury-gold/30 px-7 py-4 text-xs font-mono font-semibold tracking-widest uppercase flex items-center justify-center space-x-2 cursor-not-allowed"
                    >
                      <Clock className="w-4 h-4 animate-spin" />
                      <span>PREPARING PDF...</span>
                    </button>
                  ) : downloaded[cat.id] ? (
                    <Magnetic>
                      <button
                        onClick={() => handleDownload(cat.id, cat.fileName)}
                        className="w-full md:w-auto bg-white border border-emerald-600/40 text-emerald-700 px-7 py-4 text-xs font-mono font-semibold tracking-widest uppercase flex items-center justify-center space-x-2 cursor-pointer shadow-sm"
                      >
                        <CheckCircle className="w-4 h-4 text-emerald-600" />
                        <span>DOWNLOADED</span>
                      </button>
                    </Magnetic>
                  ) : (
                    <Magnetic>
                      <button
                        onClick={() => handleDownload(cat.id, cat.fileName)}
                        className="btn-luxury-primary w-full md:w-auto flex items-center justify-center space-x-2"
                      >
                        <Download className="w-4 h-4" />
                        <span>DOWNLOAD PDF</span>
                      </button>
                    </Magnetic>
                  )}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

    </div>
  );
}
