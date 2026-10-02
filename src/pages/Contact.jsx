import React, { useState } from 'react';
import { Phone, Mail, MapPin, ShieldCheck, Compass, Send, CheckCircle2 } from 'lucide-react';
import ScrollReveal from '../components/common/ScrollReveal';
import Magnetic from '../components/common/Magnetic';
import { submitContactInquiry } from '../services/quoteService';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    companyName: '',
    email: '',
    phone: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [referenceNumber, setReferenceNumber] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    if (errorMessage) {
      setErrorMessage('');
    }
  };

  const validate = () => {
    const tempErrors = {};
    if (!formData.name.trim()) tempErrors.name = 'Your name is required';
    if (!formData.companyName.trim()) tempErrors.companyName = 'Company name is required';
    
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!formData.email.trim()) {
      tempErrors.email = 'Business email is required';
    } else if (!emailRegex.test(formData.email.trim())) {
      tempErrors.email = 'Please enter a valid business email';
    }

    if (!formData.phone.trim()) tempErrors.phone = 'Contact phone is required';
    if (!formData.message.trim()) tempErrors.message = 'Message / project scope is required';

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const result = await submitContactInquiry({
        customer: {
          name: formData.name,
          company: formData.companyName,
          companyName: formData.companyName,
          email: formData.email,
          phone: formData.phone
        },
        message: formData.message
      });

      setReferenceNumber(result.referenceNumber || '');
      setIsSubmitted(true);
      setFormData({
        name: '',
        companyName: '',
        email: '',
        phone: '',
        message: ''
      });
    } catch (err) {
      setErrorMessage("Unable to send your inquiry right now. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-luxury-ivory text-luxury-charcoal bg-grain pt-24 pb-16 min-h-screen">
      
      {/* Editorial Header */}
      <section className="py-16 md:py-24 px-6 md:px-12 max-w-7xl mx-auto border-b border-luxury-gold/15">
        <ScrollReveal direction="up">
          <span className="text-[10px] font-bold tracking-widest text-luxury-gold uppercase block mb-3 font-mono">
            CONNECT
          </span>
          <h1 className="font-serif text-5xl md:text-7xl font-light tracking-wide leading-tight text-luxury-charcoal">
            Corporate Location <br />
            <span className="italic font-serif text-luxury-gold">& Inquiries</span>
            <span className="sr-only"> — Contact Packture International Packaging Facility Erode, Tamil Nadu, India</span>
          </h1>
          <p className="text-xs md:text-sm text-neutral-500 max-w-xl leading-relaxed mt-4 font-light">
            Contact our domestic or international packaging departments. Request sample containers, discuss technical details, or request price lists.
          </p>
        </ScrollReveal>
      </section>

      {/* Grid: Details & Form */}
      <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left Column: Registry details */}
        <div className="lg:col-span-5 flex flex-col space-y-8 text-left">
          <ScrollReveal direction="left" delay={0.05}>
            <div className="luxury-card p-6 md:p-8">
              <span className="editorial-badge mb-4 block w-fit">
                01 // CORPORATE HEADQUARTERS
              </span>
              <h3 className="font-serif text-lg font-medium text-luxury-charcoal uppercase mb-4">
                Anthiyur Production Center
              </h3>
              <div className="flex items-start space-x-4">
                <div className="p-2 bg-luxury-cream text-luxury-gold border border-luxury-gold/20 flex-shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <p className="text-xs md:text-sm text-neutral-600 leading-relaxed font-light">
                  No. 51, Anthiyur Vazhli, Anthiyur Colony,<br />
                  Anthiyur, Erode, Tamil Nadu,<br />
                  India - 638501.
                </p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="left" delay={0.1}>
            <div className="luxury-card p-6 md:p-8">
              <span className="editorial-badge mb-4 block w-fit">
                02 // DIRECT LIAISON
              </span>
              <h3 className="font-serif text-lg font-medium text-luxury-charcoal uppercase mb-4">
                Communication Channels
              </h3>
              <ul className="space-y-4">
                <li className="flex items-center space-x-4">
                  <div className="p-2 bg-luxury-cream text-luxury-gold border border-luxury-gold/20 flex-shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <a href="tel:+917418173970" className="text-xs md:text-sm text-neutral-600 hover:text-luxury-gold transition-colors font-mono">
                    +91 74181 73970
                  </a>
                </li>
                <li className="flex items-center space-x-4">
                  <div className="p-2 bg-luxury-cream text-luxury-gold border border-luxury-gold/20 flex-shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <a href="mailto:packtureinternational@gmail.com" className="text-xs md:text-sm text-neutral-600 hover:text-luxury-gold transition-colors">
                    packtureinternational@gmail.com
                  </a>
                </li>
              </ul>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="left" delay={0.15}>
            <div className="luxury-card p-6 md:p-8">
              <span className="editorial-badge mb-4 block w-fit">
                03 // COMPLIANCE
              </span>
              <h3 className="font-serif text-lg font-medium text-luxury-charcoal uppercase mb-4">
                Corporate Credentials
              </h3>
              <div className="space-y-3 text-xs text-neutral-600 font-mono tracking-wider">
                <p className="flex items-center">
                  <ShieldCheck className="w-4 h-4 mr-2.5 text-luxury-gold flex-shrink-0" />
                  <span>GSTIN: <strong className="font-medium text-luxury-charcoal">33SHSPS7926G1Z9</strong></span>
                </p>
                <p className="flex items-center">
                  <Compass className="w-4 h-4 mr-2.5 text-luxury-gold flex-shrink-0" />
                  <span>MSME: <strong className="font-medium text-luxury-charcoal">TN-07-0151088</strong></span>
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Right Column: Contact form */}
        <div className="lg:col-span-7">
          <ScrollReveal direction="right" delay={0.1}>
            <div className="luxury-card p-8 md:p-10 text-left">
              {isSubmitted ? (
                <div className="text-center py-12 flex flex-col items-center">
                  <CheckCircle2 className="w-16 h-16 text-luxury-gold mb-4" />
                  <h3 className="font-serif text-2xl md:text-3xl text-luxury-charcoal mb-2 uppercase">
                    INQUIRY SENT
                  </h3>
                  <p className="text-xs text-neutral-500 max-w-sm leading-relaxed mb-6 font-light">
                    Thank you for contacting Packture International. Your enquiry has been received and our team will get back to you shortly.
                  </p>
                  {referenceNumber && (
                    <div className="bg-luxury-beige/50 border border-luxury-gold/15 p-3 rounded-sm w-full max-w-xs mb-6 font-mono text-center">
                      <span className="text-[9px] text-neutral-400 block tracking-widest uppercase mb-0.5">
                        Reference Number
                      </span>
                      <span className="text-sm font-bold text-luxury-charcoal tracking-widest select-all">
                        {referenceNumber}
                      </span>
                    </div>
                  )}
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setReferenceNumber('');
                      setErrorMessage('');
                    }}
                    className="btn-luxury-primary cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {errorMessage && (
                    <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs font-medium rounded-sm">
                      {errorMessage}
                    </div>
                  )}
                  <div className="mb-6">
                    <span className="text-[10px] font-mono tracking-[0.25em] text-luxury-gold uppercase block mb-1 font-semibold">
                      INQUIRY DISPATCH
                    </span>
                    <h3 className="font-serif text-2xl text-luxury-charcoal font-light">
                      Send a Message
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-bold tracking-widest text-luxury-charcoal uppercase block mb-1.5 font-mono">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full bg-neutral-50/70 border border-luxury-gold/20 outline-none p-3 text-xs text-luxury-charcoal focus:border-luxury-gold focus:ring-1 focus:ring-luxury-gold/30 focus:bg-white transition-all duration-300"
                      />
                      {errors.name && <p className="text-[10px] text-red-600 mt-1 font-semibold">{errors.name}</p>}
                    </div>
                    <div>
                      <label className="text-[10px] font-bold tracking-widest text-luxury-charcoal uppercase block mb-1.5 font-mono">
                        Company Name *
                      </label>
                      <input
                        type="text"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleChange}
                        className="w-full bg-neutral-50/70 border border-luxury-gold/20 outline-none p-3 text-xs text-luxury-charcoal focus:border-luxury-gold focus:ring-1 focus:ring-luxury-gold/30 focus:bg-white transition-all duration-300"
                      />
                      {errors.companyName && <p className="text-[10px] text-red-600 mt-1 font-semibold">{errors.companyName}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-bold tracking-widest text-luxury-charcoal uppercase block mb-1.5 font-mono">
                        Business Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full bg-neutral-50/70 border border-luxury-gold/20 outline-none p-3 text-xs text-luxury-charcoal focus:border-luxury-gold focus:ring-1 focus:ring-luxury-gold/30 focus:bg-white transition-all duration-300"
                      />
                      {errors.email && <p className="text-[10px] text-red-600 mt-1 font-semibold">{errors.email}</p>}
                    </div>
                    <div>
                      <label className="text-[10px] font-bold tracking-widest text-luxury-charcoal uppercase block mb-1.5 font-mono">
                        Contact Phone *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full bg-neutral-50/70 border border-luxury-gold/20 outline-none p-3 text-xs text-luxury-charcoal focus:border-luxury-gold focus:ring-1 focus:ring-luxury-gold/30 focus:bg-white transition-all duration-300"
                      />
                      {errors.phone && <p className="text-[10px] text-red-600 mt-1 font-semibold">{errors.phone}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-bold tracking-widest text-luxury-charcoal uppercase block mb-1.5 font-mono">
                      Message / Project Scope *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows="4"
                      placeholder="Tell us about your brand launch, required quantities, shipping destination, or custom finish preferences..."
                      className="w-full bg-neutral-50/70 border border-luxury-gold/20 outline-none p-3 text-xs text-luxury-charcoal focus:border-luxury-gold focus:ring-1 focus:ring-luxury-gold/30 focus:bg-white transition-all duration-300 resize-none"
                    />
                    {errors.message && <p className="text-[10px] text-red-600 mt-1 font-semibold">{errors.message}</p>}
                  </div>

                  <Magnetic>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-luxury-primary w-full flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <span>SENDING…</span>
                      ) : (
                        <span className="flex items-center">
                          SEND INQUIRY <Send className="w-3.5 h-3.5 ml-2" />
                        </span>
                      )}
                    </button>
                  </Magnetic>
                </form>
              )}
            </div>
          </ScrollReveal>
        </div>

      </section>

    </div>
  );
}
