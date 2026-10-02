import React from 'react';
import { PenTool, CheckSquare, Sparkles, Award, ArrowRight } from 'lucide-react';
import ScrollReveal from '../components/common/ScrollReveal';
import Magnetic from '../components/common/Magnetic';

export default function Customization({ navigate, onOpenQuote, onOpenCustomProject }) {
  const customFinishes = [
    {
      title: "HOT FOIL STAMPING",
      desc: "Apply premium metallic elements like gold, silver, rose gold, or bronze foil directly onto glass or plastic walls, creating a reflective, luxury brand finish.",
      icon: Sparkles
    },
    {
      title: "FROSTED COATING",
      desc: "Apply frosted finishes onto dropper bottles, jars, and vials, giving a soft-touch texture that diffuses light and elevates formula premium positioning.",
      icon: Award
    },
    {
      title: "SILK SCREEN PRINTING",
      desc: "High-density ink transfer on round or flat surfaces. Ideal for printing clean typography, brand logo lines, and detailed ingredient lists with perfect clarity.",
      icon: PenTool
    },
    {
      title: "CUSTOM COLOR MATCHING",
      desc: "Specify Pantone or custom paint codes. We customize plastic caps, glass body tints, and rubber dropper bulbs to match your brand's core identity color system.",
      icon: CheckSquare
    }
  ];

  const steps = [
    { num: "01", name: "TECHNICAL DRAWING", desc: "Our engineers translate your packaging concept into precise 2D blueprints and 3D mockups." },
    { num: "02", name: "PROTOTYPE MOLDING", desc: "We fabricate sample containers for volume check, leak proofing, and material compatibility tests." },
    { num: "03", name: "FINISHING SELECTION", desc: "Choose specific decorative finishes—from silk screen prints to golden hot stamping." },
    { num: "04", name: "MASS PRODUCTION", desc: "Production under strict quality audits, followed by export-grade box packing and global dispatch." }
  ];

  return (
    <div className="bg-luxury-ivory text-luxury-charcoal bg-grain pt-24 pb-16 min-h-screen">
      
      {/* Editorial Header */}
      <section className="py-16 md:py-24 px-6 md:px-12 max-w-7xl mx-auto border-b border-luxury-gold/15">
        <ScrollReveal direction="up">
          <span className="text-[10px] font-bold tracking-widest text-luxury-gold uppercase block mb-3 font-mono">
            TAILORED PACKAGING
          </span>
          <h1 className="font-serif text-5xl md:text-7xl font-light tracking-wide leading-tight text-luxury-charcoal">
            Bespoke Customization <br />
            <span className="italic font-serif text-luxury-gold">Processes</span>
          </h1>
          <p className="text-xs md:text-sm text-neutral-500 max-w-xl leading-relaxed mt-4 font-light">
            Establish an unmistakable brand signature. Packture International offers end-to-end customization services, transforming standard shapes into premium editorial pieces.
          </p>
        </ScrollReveal>
      </section>

      {/* Finishes Grid */}
      <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {customFinishes.map((finish, index) => {
            const Icon = finish.icon;
            return (
              <ScrollReveal key={finish.title} delay={index * 0.05} direction="up" className="h-full">
                <div 
                  className="luxury-card p-8 flex flex-col justify-between h-72 group text-left"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-serif text-lg md:text-xl font-medium text-luxury-charcoal group-hover:text-luxury-gold transition-colors duration-300">
                        {finish.title}
                      </h3>
                      <div className="p-2.5 bg-luxury-cream border border-luxury-gold/20 text-luxury-gold group-hover:border-luxury-gold/50 transition-colors">
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>
                    <p className="text-xs text-neutral-500 leading-relaxed mt-2 font-light">
                      {finish.desc}
                    </p>
                  </div>
                  <div className="editorial-badge w-fit">
                    AVAILABLE FOR BULK PROJECTS
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </section>

      {/* Timeline Section */}
      <section className="bg-luxury-beige py-24 px-6 md:px-12 border-t border-b border-luxury-gold/10 bg-grain">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-[10px] font-bold tracking-widest text-luxury-gold uppercase mb-2 block font-mono">
              02 // PRODUCTION FLOW
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-light text-luxury-charcoal">
              From Blueprint to Dispatch
            </h2>
            <div className="w-12 h-0.5 bg-luxury-gold mx-auto mt-4"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <ScrollReveal key={step.num} delay={index * 0.05} direction="up" className="h-full">
                <div 
                  className="luxury-card p-8 flex flex-col justify-between h-64 text-left group"
                >
                  <div>
                    <span className="font-serif text-4xl font-light text-luxury-gold block mb-4 group-hover:translate-x-1 transition-transform duration-300">
                      {step.num}
                    </span>
                    <h3 className="text-xs font-mono font-semibold tracking-wider text-luxury-charcoal mb-2 uppercase">
                      {step.name}
                    </h3>
                    <p className="text-xs text-neutral-500 leading-relaxed font-light">
                      {step.desc}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <div className="text-center mt-12">
            <Magnetic>
              <button
                onClick={() => (onOpenCustomProject ? onOpenCustomProject() : onOpenQuote())}
                className="btn-luxury-primary"
              >
                <span>START A CUSTOM PROJECT</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </Magnetic>
          </div>
        </div>
      </section>

    </div>
  );
}
