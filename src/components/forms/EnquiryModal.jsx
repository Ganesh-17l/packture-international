import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, CheckCircle2, Trash2, Search, Plus, AlertTriangle, MessageSquare, Calendar, ChevronDown, Check } from 'lucide-react';
import { PRODUCTS } from '../../data/products';
import ProductImage from '../products/ProductImage';
import Magnetic from '../common/Magnetic';
import { submitQuoteRequest, submitCollaborationRequest, submitCustomProjectRequest } from '../../services/quoteService';

const COLLABORATION_OPTIONS = [
  'Packaging Supply',
  'Distribution Partnership',
  'Private Label / OEM',
  'Custom Packaging Development',
  'Strategic Partnership',
  'Other'
];

export default function EnquiryModal({ 
  isOpen, 
  onClose, 
  initialProduct = null, 
  initialSize = null,
  mode = 'quote' // 'quote' | 'work-with-us' | 'custom-project'
}) {
  // State for selected items (array of { product, size, quantity })
  const [selectedProducts, setSelectedProducts] = useState([]);
  
  // State for collaboration selection (work-with-us mode)
  const [selectedCollaborationTypes, setSelectedCollaborationTypes] = useState(['Packaging Supply']);

  // State for form values
  const [formData, setFormData] = useState({
    name: '',
    companyName: '',
    email: '',
    phone: '',
    country: '',
    businessIndustry: '',
    companyUrl: '',
    role: '',
    projectName: '',
    packagingType: '',
    estimatedQuantity: '',
    expectedTimeline: '1-3 months',
    customDimensions: '',
    customMaterial: '',
    customFinishing: '',
    requirements: '',
    customizationRequired: false,
    customizationDetails: [],
    timeline: '1-3 months',
    preferredContact: 'Email',
    website: '' // honeypot
  });

  // UX & Validation states
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState('idle'); // 'idle' | 'success' | 'error'
  const [referenceNumber, setReferenceNumber] = useState('');
  const [isConfirmCloseOpen, setIsConfirmCloseOpen] = useState(false);

  // Search selector state
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const modalRef = useRef(null);
  const triggerElementRef = useRef(null);
  const searchContainerRef = useRef(null);

  // Initialize selected product or collaboration options when modal opens
  useEffect(() => {
    if (isOpen) {
      // Keep track of triggering element for focus restore
      triggerElementRef.current = document.activeElement;

      if (mode === 'work-with-us') {
        setSelectedCollaborationTypes(['Packaging Supply']);
        setSelectedProducts([]);
      } else if (mode === 'custom-project') {
        setSelectedCollaborationTypes([]);
        setSelectedProducts([]);
      } else if (initialProduct) {
        setSelectedProducts([
          {
            product: initialProduct,
            size: initialSize || initialProduct.sizes?.[0] || 'Custom Sizing',
            quantity: initialProduct.moq ? initialProduct.moq : ''
          }
        ]);
      } else {
        setSelectedProducts([]);
      }

      // Reset form fields
      setFormData({
        name: '',
        companyName: '',
        email: '',
        phone: '',
        country: '',
        businessIndustry: '',
        companyUrl: '',
        role: '',
        projectName: '',
        packagingType: '',
        estimatedQuantity: '',
        expectedTimeline: '1-3 months',
        customDimensions: '',
        customMaterial: '',
        customFinishing: '',
        requirements: '',
        customizationRequired: false,
        customizationDetails: [],
        timeline: '1-3 months',
        preferredContact: 'Email',
        website: '' // honeypot
      });
      setErrors({});
      setTouched({});
      setSubmissionStatus('idle');
      setReferenceNumber('');
      setIsConfirmCloseOpen(false);
      setSearchQuery('');

      // Lock body scroll
      document.body.style.overflow = 'hidden';
      
      // Auto focus first focusable element
      setTimeout(() => {
        const focusable = modalRef.current?.querySelectorAll(
          'button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable && focusable.length > 0) {
          focusable[0].focus();
        }
      }, 100);
    } else {
      // Restore body scroll
      document.body.style.overflow = '';
      
      // Restore focus to trigger element
      if (triggerElementRef.current) {
        triggerElementRef.current.focus();
      }
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, initialProduct, mode]);

  // Handle focus trap & ESC close key listeners
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (isConfirmCloseOpen) {
          setIsConfirmCloseOpen(false);
        } else if (isFormDirty()) {
          setIsConfirmCloseOpen(true);
        } else {
          onClose();
        }
        return;
      }

      if (e.key === 'Tab') {
        if (!modalRef.current) return;
        const focusableElements = modalRef.current.querySelectorAll(
          'button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isConfirmCloseOpen, selectedProducts, selectedCollaborationTypes, formData, mode]);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Form dirty checker to prevent accidental close data loss
  const isFormDirty = () => {
    if (formData.name.trim() !== '') return true;
    if (formData.companyName.trim() !== '') return true;
    if (formData.email.trim() !== '') return true;
    if (formData.phone.trim() !== '') return true;
    if (formData.country.trim() !== '') return true;
    if (formData.requirements.trim() !== '') return true;

    if (mode === 'work-with-us') {
      if (formData.businessIndustry.trim() !== '') return true;
      if (formData.companyUrl.trim() !== '') return true;
      if (formData.role.trim() !== '') return true;
      if (selectedCollaborationTypes.length !== 1 || selectedCollaborationTypes[0] !== 'Packaging Supply') return true;
      return false;
    }

    if (mode === 'custom-project') {
      if (formData.projectName.trim() !== '') return true;
      if (formData.packagingType.trim() !== '') return true;
      if (formData.estimatedQuantity.trim() !== '') return true;
      if (formData.customizationRequired) return true;
      if (formData.customDimensions.trim() !== '') return true;
      if (formData.customMaterial.trim() !== '') return true;
      if (formData.customFinishing.trim() !== '') return true;
      return false;
    }

    if (formData.customizationRequired) return true;
    if (selectedProducts.length > (initialProduct ? 1 : 0)) return true;
    if (selectedProducts.length === 1 && initialProduct) {
      const initialQty = initialProduct.moq ? initialProduct.moq : '';
      if (selectedProducts[0].quantity !== initialQty) return true;
    }
    return false;
  };

  // Form Input Change Handler
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;
    setFormData(prev => ({ ...prev, [name]: val }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Input Blur handler to trigger validation
  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    validateField(name, value);
  };

  // Field Validator
  const validateField = (name, value) => {
    let err = '';
    if (name === 'name') {
      if (!value.trim()) err = 'Full name is required';
    } else if (name === 'companyName') {
      if (!value.trim()) err = 'Company name is required';
    } else if (name === 'email') {
      if (!value.trim()) {
        err = 'Business email is required';
      } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value.trim())) {
        err = 'Please enter a valid business email';
      }
    } else if (name === 'country' && (mode === 'work-with-us' || mode === 'custom-project')) {
      if (!value.trim()) err = 'Country is required';
    } else if (name === 'businessIndustry' && mode === 'work-with-us') {
      if (!value.trim()) err = 'Business / industry is required';
    } else if (name === 'requirements') {
      if (!value.trim()) {
        err = mode === 'work-with-us'
          ? 'Please outline your project / business requirements'
          : 'Please outline your project requirements';
      }
    }
    setErrors(prev => ({ ...prev, [name]: err }));
  };

  // Main Form Submission Validator
  const validateForm = () => {
    const tempErrors = {};
    if (!formData.name.trim()) tempErrors.name = 'Full name is required';
    if (!formData.companyName.trim()) tempErrors.companyName = 'Company name is required';
    
    if (!formData.email.trim()) {
      tempErrors.email = 'Business email is required';
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email.trim())) {
      tempErrors.email = 'Please enter a valid business email';
    }

    if (mode === 'work-with-us') {
      if (!formData.country.trim()) {
        tempErrors.country = 'Country is required';
      }
      if (!formData.businessIndustry.trim()) {
        tempErrors.businessIndustry = 'Business / industry is required';
      }
      if (!formData.requirements.trim()) {
        tempErrors.requirements = 'Project / business requirements are required';
      }
      if (selectedCollaborationTypes.length === 0) {
        tempErrors.collaborationTypes = 'Please select at least one collaboration type';
      }
    } else if (mode === 'custom-project') {
      if (!formData.country.trim()) {
        tempErrors.country = 'Country is required';
      }
      if (!formData.requirements.trim()) {
        tempErrors.requirements = 'Please outline your project requirements';
      }
    } else {
      if (!formData.requirements.trim()) tempErrors.requirements = 'Please outline your project requirements';

      if (selectedProducts.length === 0) {
        tempErrors.products = 'Please select at least one product model';
      }

      // Check if any product has invalid quantity
      selectedProducts.forEach((item, idx) => {
        if (item.quantity === '' || item.quantity === undefined || item.quantity === null) {
          tempErrors[`quantity_${idx}`] = 'Quantity is required';
        } else if (parseInt(item.quantity) <= 0) {
          tempErrors[`quantity_${idx}`] = 'Quantity must be 1 or more';
        }
      });
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  // Toggle Collaboration Interest Options
  const toggleCollaborationType = (type) => {
    setSelectedCollaborationTypes(prev => {
      const exists = prev.includes(type);
      if (exists) {
        const filtered = prev.filter(t => t !== type);
        return filtered.length > 0 ? filtered : [type];
      } else {
        return [...prev, type];
      }
    });
    if (errors.collaborationTypes) {
      setErrors(prev => ({ ...prev, collaborationTypes: '' }));
    }
  };

  // Size Dropdown Updater
  const updateProductSize = (idx, size) => {
    setSelectedProducts(prev => {
      const updated = [...prev];
      updated[idx].size = size;
      return updated;
    });
  };

  // Quantity input updater
  const updateProductQuantity = (idx, value) => {
    const val = value === '' ? '' : Math.max(0, parseInt(value) || 0);
    setSelectedProducts(prev => {
      const updated = [...prev];
      updated[idx].quantity = val;
      return updated;
    });

    if (errors[`quantity_${idx}`]) {
      setErrors(prev => ({ ...prev, [`quantity_${idx}`]: '' }));
    }
  };

  // Remove product from selector basket
  const removeProduct = (idx) => {
    setSelectedProducts(prev => prev.filter((_, i) => i !== idx));
  };

  // Add product from search selector dropdown
  const handleAddProduct = (product) => {
    // Prevent duplicates
    const exists = selectedProducts.some(item => item.product.id === product.id);
    if (!exists) {
      setSelectedProducts(prev => [
        ...prev,
        {
          product,
          size: product.sizes?.[0] || 'Custom Sizing',
          quantity: product.moq ? product.moq : ''
        }
      ]);
      
      // Clear product validation error
      if (errors.products) {
        setErrors(prev => ({ ...prev, products: '' }));
      }
    }
    setSearchQuery('');
    setIsSearchFocused(false);
  };

  // Toggle Customization Checkboxes list
  const handleCustomizationDetailChange = (detail) => {
    setFormData(prev => {
      const details = prev.customizationDetails.includes(detail)
        ? prev.customizationDetails.filter(d => d !== detail)
        : [...prev.customizationDetails, detail];
      return { ...prev, customizationDetails: details };
    });
  };

  // Handle Close Button / Backdrop click
  const handleCloseAttempt = () => {
    if (isFormDirty()) {
      setIsConfirmCloseOpen(true);
    } else {
      onClose();
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleCloseAttempt();
    }
  };

  // Handle Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    if (mode === 'custom-project') {
      const submissionData = {
        website: formData.website, // honeypot
        customer: {
          name: formData.name,
          company: formData.companyName,
          companyName: formData.companyName,
          email: formData.email,
          phone: formData.phone,
          country: formData.country
        },
        project: {
          name: formData.projectName,
          packagingType: formData.packagingType,
          quantity: formData.estimatedQuantity,
          timeline: formData.expectedTimeline || formData.timeline
        },
        customization: {
          required: formData.customizationRequired,
          dimensions: formData.customDimensions,
          material: formData.customMaterial,
          finishing: formData.customFinishing
        },
        requirements: formData.requirements,
        preferredContact: formData.preferredContact
      };

      if (window.onQuoteAnalyticsEvent) {
        window.onQuoteAnalyticsEvent('custom_project_form_started', submissionData);
      }

      try {
        const result = await submitCustomProjectRequest(submissionData);
        setReferenceNumber(result.referenceNumber);
        setSubmissionStatus('success');
      } catch (err) {
        setSubmissionStatus('error');
      } finally {
        setIsSubmitting(false);
      }
      return;
    }

    if (mode === 'work-with-us') {
      const submissionData = {
        website: formData.website, // honeypot
        collaborationTypes: selectedCollaborationTypes,
        customer: {
          name: formData.name,
          company: formData.companyName,
          email: formData.email,
          phone: formData.phone,
          country: formData.country
        },
        business: {
          industry: formData.businessIndustry,
          website: formData.companyUrl,
          role: formData.role
        },
        preferredContact: formData.preferredContact,
        requirements: formData.requirements
      };

      if (window.onQuoteAnalyticsEvent) {
        window.onQuoteAnalyticsEvent('collaboration_form_started', submissionData);
      }

      try {
        const result = await submitCollaborationRequest(submissionData);
        setReferenceNumber(result.referenceNumber);
        setSubmissionStatus('success');
      } catch (err) {
        setSubmissionStatus('error');
      } finally {
        setIsSubmitting(false);
      }
      return;
    }

    // Prepare clean data structure payload for quote request
    const submissionData = {
      website: formData.website, // honeypot
      products: selectedProducts.map(item => ({
        productId: item.product.id,
        productName: item.product.name,
        category: item.product.subcategory || item.product.category,
        size: item.size,
        quantity: item.quantity
      })),
      customer: {
        name: formData.name,
        company: formData.companyName,
        email: formData.email,
        phone: formData.phone,
        country: formData.country
      },
      customization: {
        required: formData.customizationRequired,
        details: formData.customizationDetails
      },
      timeline: formData.timeline,
      preferredContact: formData.preferredContact,
      requirements: formData.requirements
    };

    // Analytics Hook
    if (window.onQuoteAnalyticsEvent) {
      window.onQuoteAnalyticsEvent('quote_form_started', submissionData);
    }

    try {
      const result = await submitQuoteRequest(submissionData);
      setReferenceNumber(result.referenceNumber);
      setSubmissionStatus('success');
    } catch (err) {
      setSubmissionStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Search Selector Products filtering
  const filteredSearchProducts = PRODUCTS.filter(p => {
    if (!searchQuery) return false;
    const query = searchQuery.toLowerCase();
    return (
      p.name.toLowerCase().includes(query) ||
      (p.subcategory && p.subcategory.toLowerCase().includes(query))
    );
  }).slice(0, 5);

  // Framer Motion Animation Settings
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.35, ease: 'easeOut' } },
    exit: { opacity: 0, transition: { duration: 0.25, ease: 'easeIn' } }
  };

  const panelVariants = {
    hidden: { opacity: 0, y: 15, scale: 0.97 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1, 
      transition: { duration: 0.4, ease: [0.25, 1, 0.5, 1] } 
    },
    exit: { 
      opacity: 0, 
      y: 12, 
      scale: 0.98, 
      transition: { duration: 0.3, ease: 'easeIn' } 
    }
  };

  // WhatsApp Message Composer Helper
  const getWhatsAppLink = () => {
    if (mode === 'custom-project') {
      const proj = formData.projectName || 'Bespoke Custom Packaging';
      const text = `Hello Packture team, I have submitted a Custom Project enquiry for: ${proj}. Reference: ${referenceNumber}. Please review my enquiry.`;
      return `https://wa.me/917418173970?text=${encodeURIComponent(text)}`;
    }
    if (mode === 'work-with-us') {
      const types = selectedCollaborationTypes.join(', ');
      const text = `Hello Packture team, I have submitted a collaboration enquiry for: ${types}. Reference: ${referenceNumber}. Please review my enquiry.`;
      return `https://wa.me/917418173970?text=${encodeURIComponent(text)}`;
    }
    const productNames = selectedProducts.map(item => item.product.name).join(', ');
    const text = `Hello Packture team, I have submitted a B2B quote request for: ${productNames}. Reference: ${referenceNumber}. Please review my enquiry.`;
    return `https://wa.me/917418173970?text=${encodeURIComponent(text)}`;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={handleBackdropClick}
          className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-luxury-nearblack/75 backdrop-blur-[2px] overflow-y-auto"
        >
          <motion.div 
            ref={modalRef}
            variants={panelVariants}
            className="bg-luxury-ivory border border-luxury-gold/15 w-full max-w-4xl rounded-sm shadow-2xl relative bg-grain overflow-hidden flex flex-col my-auto max-h-full sm:max-h-[95vh] focus:outline-none"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            {/* Discard Warning Overlay Confirmation */}
            <AnimatePresence>
              {isConfirmCloseOpen && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-luxury-ivory/95 backdrop-blur-[1px] z-50 flex flex-col items-center justify-center p-6 sm:p-8 text-center bg-grain"
                >
                  <AlertTriangle className="w-12 h-12 text-luxury-gold mb-4 animate-pulse animate-duration-1000" />
                  <h4 className="font-serif text-xl text-luxury-charcoal mb-2">
                    {mode === 'custom-project'
                      ? 'Discard Custom Project Enquiry?'
                      : mode === 'work-with-us'
                        ? 'Discard Collaboration Enquiry?'
                        : 'Discard Quote Request?'}
                  </h4>
                  <p className="text-xs text-neutral-500 max-w-xs leading-relaxed mb-6">
                    You have entered details in your enquiry form. Closing this dialog will discard your progress.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 w-full max-w-xs justify-center">
                    <button
                      onClick={() => setIsConfirmCloseOpen(false)}
                      className="w-full sm:w-auto border border-luxury-gold text-luxury-charcoal px-6 py-3 text-[10px] font-bold tracking-widest uppercase hover:bg-neutral-50 transition-colors cursor-pointer"
                    >
                      KEEP EDITING
                    </button>
                    <button
                      onClick={() => {
                        setIsConfirmCloseOpen(false);
                        onClose();
                      }}
                      className="w-full sm:w-auto bg-luxury-charcoal text-luxury-ivory border border-luxury-gold px-6 py-3 text-[10px] font-bold tracking-widest uppercase hover:bg-luxury-gold hover:text-luxury-charcoal transition-all cursor-pointer"
                    >
                      DISCARD & CLOSE
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Header Area */}
            <div className="border-b border-luxury-gold/10 p-4 sm:p-6 flex justify-between items-center bg-luxury-beige/30 flex-shrink-0 select-none">
              <div>
                <h3 id="modal-title" className="font-serif text-xl sm:text-2xl font-light text-luxury-charcoal tracking-wide">
                  {submissionStatus === 'success' 
                    ? (mode === 'custom-project'
                        ? 'PROJECT ENQUIRY RECEIVED'
                        : mode === 'work-with-us' 
                          ? 'THANK YOU' 
                          : 'Enquiry Confirmed')
                    : (mode === 'custom-project'
                        ? 'Start a Custom Project'
                        : mode === 'work-with-us' 
                          ? 'Work With Us' 
                          : 'B2B Consultation Request')}
                </h3>
                {submissionStatus !== 'success' && (
                  <p className="text-[9px] sm:text-[10px] text-neutral-500 tracking-wider font-mono uppercase mt-1">
                    {mode === 'custom-project'
                      ? 'PACKTURE INTERNATIONAL · CUSTOM PACKAGING'
                      : mode === 'work-with-us'
                        ? 'PACKTURE INTERNATIONAL · BUSINESS COLLABORATION'
                        : 'Packture International · Premium Custom Packaging'}
                  </p>
                )}
              </div>
              <button 
                onClick={handleCloseAttempt}
                className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center text-luxury-charcoal/60 hover:text-luxury-gold transition-colors cursor-pointer rounded-full hover:bg-luxury-charcoal/5"
                aria-label={
                  mode === 'custom-project'
                    ? 'Close custom project modal'
                    : mode === 'work-with-us' 
                      ? 'Close collaboration modal' 
                      : 'Close quote modal'
                }
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Body Area */}
            <div className="overflow-y-auto p-4 sm:p-6 md:p-8 flex-1">
              
              {/* SUCCESS STATE */}
              {submissionStatus === 'success' && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className="text-center py-10 flex flex-col items-center max-w-lg mx-auto"
                >
                  <div className="w-16 h-16 bg-luxury-gold/10 border border-luxury-gold/30 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle2 className="w-8 h-8 text-luxury-gold" />
                  </div>
                  <h4 className="font-serif text-2xl tracking-wide text-luxury-charcoal mb-3 uppercase select-none">
                    {mode === 'custom-project' 
                      ? 'PROJECT ENQUIRY RECEIVED' 
                      : mode === 'work-with-us' 
                        ? 'THANK YOU' 
                        : 'QUOTE REQUEST RECEIVED'}
                  </h4>
                  {mode === 'custom-project' ? (
                    <p className="text-sm text-neutral-600 leading-relaxed mb-6 max-w-sm">
                      Thank you for sharing your project requirements. Our team will review your enquiry and get back to you shortly.
                    </p>
                  ) : mode === 'work-with-us' ? (
                    <p className="text-sm text-neutral-600 leading-relaxed mb-6 max-w-sm">
                      Your collaboration enquiry has been received. Our team will review your requirements and get back to you shortly.
                    </p>
                  ) : (
                    <>
                      <p className="text-sm text-neutral-600 leading-relaxed mb-1">
                        Thank you for your enquiry.
                      </p>
                      <p className="text-sm text-neutral-600 leading-relaxed mb-6">
                        Your request has been recorded successfully.
                      </p>
                    </>
                  )}
                  
                  <div className="bg-luxury-beige/50 border border-luxury-gold/15 p-4 rounded-sm w-full mb-6 font-mono text-center">
                    <span className="text-[10px] text-neutral-400 block tracking-widest uppercase mb-1">
                      Reference Number
                    </span>
                    <span className="text-lg font-bold text-luxury-charcoal tracking-widest select-all">
                      {referenceNumber}
                    </span>
                  </div>

                  {mode !== 'work-with-us' && mode !== 'custom-project' && (
                    <p className="text-xs text-neutral-500 mb-8 max-w-sm leading-relaxed">
                      Our team will review your requirements and contact you.
                    </p>
                  )}

                  <div className="flex flex-col sm:flex-row gap-3 w-full justify-center">
                    <Magnetic className="w-full sm:w-auto block sm:inline-block">
                      <button
                        onClick={onClose}
                        className="bg-luxury-charcoal text-luxury-ivory border border-luxury-gold px-8 py-3.5 text-xs font-bold tracking-widest uppercase hover:bg-luxury-gold hover:text-luxury-charcoal transition-all duration-300 w-full sm:w-auto cursor-pointer"
                      >
                        DONE
                      </button>
                    </Magnetic>
                    <Magnetic className="w-full sm:w-auto block sm:inline-block">
                      <a
                        href={getWhatsAppLink()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="border border-luxury-gold text-luxury-charcoal hover:bg-luxury-charcoal hover:text-luxury-ivory px-6 py-3.5 text-xs font-bold tracking-widest uppercase transition-all duration-300 w-full sm:w-auto flex items-center justify-center cursor-pointer"
                      >
                        CONTINUE ON WHATSAPP
                      </a>
                    </Magnetic>
                  </div>
                </motion.div>
              )}

              {/* ERROR STATE */}
              {submissionStatus === 'error' && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-12 flex flex-col items-center max-w-md mx-auto"
                >
                  <AlertTriangle className="w-16 h-16 text-red-600 mb-6" />
                  <h4 className="font-serif text-2xl tracking-wide text-luxury-charcoal mb-3 uppercase select-none">
                    {mode === 'work-with-us' ? 'ENQUIRY FAILED' : "REQUEST COULDN'T BE COMPLETED"}
                  </h4>
                  <p className="text-sm text-neutral-500 leading-relaxed mb-8">
                    {mode === 'work-with-us'
                      ? 'Unable to submit your enquiry right now. Please try again.'
                      : 'Please try again.'}
                  </p>
                  <Magnetic>
                    <button
                      onClick={() => setSubmissionStatus('idle')}
                      className="bg-luxury-charcoal text-luxury-ivory border border-luxury-gold px-8 py-3.5 text-xs font-bold tracking-widest uppercase hover:bg-luxury-gold hover:text-luxury-charcoal transition-all duration-300 cursor-pointer"
                    >
                      TRY AGAIN
                    </button>
                  </Magnetic>
                </motion.div>
              )}

              {/* IDLE / FORM STATE */}
              {submissionStatus === 'idle' && (
                <form onSubmit={handleSubmit} className="h-full">
                  {/* Invisible Honeypot Field */}
                  <div className="hidden" aria-hidden="true" style={{ display: 'none' }}>
                    <label htmlFor="website-honeypot">Do not fill this field if you are a human:</label>
                    <input
                      id="website-honeypot"
                      type="text"
                      name="website"
                      value={formData.website || ''}
                      onChange={handleChange}
                      tabIndex="-1"
                      autoComplete="off"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                    
                    {/* LEFT COLUMN: Selected Packaging Products (Quote Mode), Collaboration Interest (Work With Us Mode), or Project Details (Custom Project Mode) */}
                    <div className="md:col-span-5 border-b md:border-b-0 md:border-r border-luxury-gold/10 pb-6 md:pb-0 md:pr-8 flex flex-col md:sticky md:top-0 md:self-start">
                      {mode === 'custom-project' ? (
                        <>
                          <div className="flex justify-between items-center mb-4 select-none">
                            <h4 className="text-xs font-bold tracking-widest text-luxury-charcoal uppercase font-mono">
                              PROJECT DETAILS
                            </h4>
                            <span className="text-[10px] font-mono text-luxury-gold uppercase tracking-wider">
                              BESPOKE
                            </span>
                          </div>

                          <div className="space-y-4">
                            {/* Project / Product Name */}
                            <div>
                              <label htmlFor="project-name-input" className="text-[10px] font-bold tracking-widest text-luxury-charcoal uppercase block mb-1 font-mono select-none">
                                Project / Product Name
                              </label>
                              <input
                                id="project-name-input"
                                type="text"
                                name="projectName"
                                value={formData.projectName}
                                onChange={handleChange}
                                placeholder="e.g. Signature Fragrance Bottle"
                                className="w-full bg-white/50 border border-luxury-gold/20 outline-none p-3 text-xs text-luxury-charcoal focus:border-luxury-gold focus:bg-white transition-all duration-300 rounded-sm focus:ring-0 min-h-[44px]"
                              />
                            </div>

                            {/* Packaging Type */}
                            <div>
                              <label htmlFor="packaging-type-input" className="text-[10px] font-bold tracking-widest text-luxury-charcoal uppercase block mb-1 font-mono select-none">
                                Packaging Type
                              </label>
                              <input
                                id="packaging-type-input"
                                type="text"
                                name="packagingType"
                                value={formData.packagingType}
                                onChange={handleChange}
                                placeholder="e.g. Glass Dropper, Acrylic Jar, Vial, Tube"
                                className="w-full bg-white/50 border border-luxury-gold/20 outline-none p-3 text-xs text-luxury-charcoal focus:border-luxury-gold focus:bg-white transition-all duration-300 rounded-sm focus:ring-0 min-h-[44px]"
                              />
                            </div>

                            {/* Estimated Quantity */}
                            <div>
                              <label htmlFor="estimated-quantity-input" className="text-[10px] font-bold tracking-widest text-luxury-charcoal uppercase block mb-1 font-mono select-none">
                                Estimated Quantity
                              </label>
                              <input
                                id="estimated-quantity-input"
                                type="text"
                                name="estimatedQuantity"
                                value={formData.estimatedQuantity}
                                onChange={handleChange}
                                placeholder="e.g. 5,000 pcs / 10,000 pcs"
                                className="w-full bg-white/50 border border-luxury-gold/20 outline-none p-3 text-xs text-luxury-charcoal focus:border-luxury-gold focus:bg-white transition-all duration-300 rounded-sm focus:ring-0 min-h-[44px]"
                              />
                            </div>

                            {/* Expected Timeline */}
                            <div>
                              <label className="text-[10px] font-bold tracking-widest text-luxury-charcoal uppercase block mb-1 font-mono select-none">
                                Expected Timeline
                              </label>
                              <div className="grid grid-cols-2 gap-2">
                                {['< 1 month', '1-3 months', '3-6 months', 'Flexible'].map(timeOption => (
                                  <button
                                    key={timeOption}
                                    type="button"
                                    onClick={() => setFormData(prev => ({ ...prev, expectedTimeline: timeOption }))}
                                    className={`p-2.5 text-[10px] font-mono tracking-wider text-center border rounded-sm transition-all cursor-pointer ${
                                      formData.expectedTimeline === timeOption
                                        ? 'bg-luxury-charcoal text-luxury-ivory border-luxury-gold font-bold'
                                        : 'bg-white/40 border-luxury-gold/20 text-neutral-600 hover:bg-white hover:border-luxury-gold/40'
                                    }`}
                                  >
                                    {timeOption}
                                  </button>
                                ))}
                              </div>
                            </div>

                            {/* Bespoke Studio Note Card */}
                            <div className="p-4 bg-luxury-cream/60 border border-luxury-gold/20 rounded-sm mt-4">
                              <span className="text-[9px] font-mono uppercase tracking-widest text-luxury-gold font-bold block mb-1">
                                PACKTURE BESPOKE STUDIO
                              </span>
                              <p className="text-[11px] text-neutral-500 leading-relaxed font-light">
                                From 3D CAD modeling & rapid prototyping to custom mold fabrication and luxury surface decoration.
                              </p>
                            </div>
                          </div>
                        </>
                      ) : mode === 'work-with-us' ? (
                        <>
                          <div className="flex justify-between items-center mb-4 select-none">
                            <h4 className="text-xs font-bold tracking-widest text-luxury-charcoal uppercase font-mono">
                              COLLABORATION INTEREST
                            </h4>
                            <span className="text-[10px] font-mono text-neutral-400">
                              {selectedCollaborationTypes.length} Selected
                            </span>
                          </div>

                          {/* Collaboration Options List */}
                          <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1 mb-2 custom-scrollbar">
                            {COLLABORATION_OPTIONS.map((option) => {
                              const isSelected = selectedCollaborationTypes.includes(option);
                              return (
                                <button
                                  key={option}
                                  type="button"
                                  onClick={() => toggleCollaborationType(option)}
                                  className={`w-full text-left p-3.5 border rounded-sm transition-all duration-300 flex items-center justify-between cursor-pointer group ${
                                    isSelected
                                      ? 'bg-white border-luxury-gold shadow-xs'
                                      : 'bg-white/50 border-luxury-gold/15 hover:bg-white hover:border-luxury-gold/40'
                                  }`}
                                >
                                  <div className="flex items-center space-x-3">
                                    <div className={`w-4.5 h-4.5 rounded-sm border flex items-center justify-center transition-colors flex-shrink-0 ${
                                      isSelected 
                                        ? 'bg-luxury-charcoal border-luxury-gold text-luxury-gold' 
                                        : 'border-luxury-gold/30 bg-white/50'
                                    }`}>
                                      {isSelected && <Check className="w-3 h-3 stroke-[2.5]" />}
                                    </div>
                                    <span className={`text-xs font-serif font-medium tracking-wide transition-colors ${
                                      isSelected ? 'text-luxury-charcoal font-semibold' : 'text-neutral-600 group-hover:text-luxury-charcoal'
                                    }`}>
                                      {option}
                                    </span>
                                  </div>
                                  <span className={`text-[9px] font-mono tracking-wider uppercase transition-colors ${
                                    isSelected ? 'text-luxury-gold font-bold' : 'text-neutral-400 group-hover:text-neutral-500'
                                  }`}>
                                    {isSelected ? 'Selected' : 'Select'}
                                  </span>
                                </button>
                              );
                            })}
                          </div>
                          {errors.collaborationTypes && (
                            <p className="text-[10px] text-red-600 mt-2 font-semibold font-mono">{errors.collaborationTypes}</p>
                          )}
                        </>
                      ) : (
                        <>
                          <div className="flex justify-between items-center mb-4 select-none">
                            <h4 className="text-xs font-bold tracking-widest text-luxury-charcoal uppercase font-mono">
                              Selected Models
                            </h4>
                            <span className="text-[10px] font-mono text-neutral-400">
                              {selectedProducts.length} Item(s)
                            </span>
                          </div>

                          {/* Selected Items scrollable list */}
                          <div className="space-y-4 max-h-[300px] overflow-y-auto pr-1 mb-6 custom-scrollbar">
                            {selectedProducts.length === 0 ? (
                              <div className="text-center py-8 border border-dashed border-luxury-gold/20 bg-luxury-beige/10 rounded-sm">
                                <p className="text-xs text-neutral-400 italic">No packaging models selected.</p>
                                <p className="text-[10px] text-neutral-400 mt-1">Use the search box below to add models.</p>
                              </div>
                            ) : (
                              selectedProducts.map((item, idx) => (
                                <div 
                                  key={`${item.product.id}-${idx}`}
                                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3 border border-luxury-gold/10 rounded-sm relative group"
                                >
                                  {/* Left part: Image and Info */}
                                  <div className="flex items-center space-x-3 min-w-0 flex-1">
                                    {/* Product Image Thumbnail */}
                                    <div className="w-12 h-16 bg-neutral-50 flex items-center justify-center p-1 border border-neutral-100 flex-shrink-0 relative overflow-hidden">
                                      <ProductImage product={item.product} fullImage={true} className="w-full h-full bg-transparent border-none p-0 rounded-none shadow-none object-contain" />
                                    </div>

                                    {/* Product Info */}
                                    <div className="flex-1 min-w-0 pr-1">
                                      <span className="text-xs font-serif font-bold text-luxury-charcoal block truncate leading-tight">
                                        {item.product.name}
                                      </span>
                                      <span className="text-[9px] text-neutral-400 font-mono uppercase block mt-0.5">
                                        {item.product.subcategory || 'Packaging'}
                                      </span>

                                      {/* Sizes drop selector */}
                                      <div className="mt-1.5 flex items-center space-x-2">
                                        <label className="text-[8px] font-bold text-neutral-400 uppercase font-mono">Size:</label>
                                        {item.product.sizes && item.product.sizes.length > 0 ? (
                                          <select
                                            value={item.size}
                                            onChange={(e) => updateProductSize(idx, e.target.value)}
                                            className="bg-transparent border border-luxury-gold/20 outline-none px-1 py-0.5 text-[9px] text-luxury-charcoal font-mono rounded-sm focus:border-luxury-gold focus:ring-0 cursor-pointer"
                                          >
                                            {item.product.sizes.map(s => (
                                              <option key={s} value={s}>{s}</option>
                                            ))}
                                          </select>
                                        ) : (
                                          <span className="text-[9px] font-mono text-neutral-500">Custom</span>
                                        )}
                                      </div>

                                      {/* MOQ indicator */}
                                      {item.product.moq && (
                                        <span className="text-[9px] text-luxury-gold font-mono block mt-1">
                                          Min Qty: {item.product.moq}
                                        </span>
                                      )}
                                    </div>
                                  </div>

                                  {/* Right part: Qty & Delete Actions */}
                                  <div className="flex items-center sm:items-end justify-between sm:justify-start sm:flex-col gap-3 pt-2.5 sm:pt-0 border-t sm:border-t-0 border-luxury-gold/5 flex-shrink-0">
                                    <div className="flex flex-col items-start sm:items-end">
                                      <label className="text-[8px] font-bold tracking-widest text-neutral-400 uppercase font-mono mb-1 text-left sm:text-right">ESTIMATED QUANTITY *</label>
                                      <input
                                        type="number"
                                        min="1"
                                        placeholder="Qty"
                                        value={item.quantity}
                                        onChange={(e) => updateProductQuantity(idx, e.target.value)}
                                        className="w-24 sm:w-28 bg-neutral-50 border border-luxury-gold/20 outline-none p-1 text-[10px] text-luxury-charcoal focus:border-luxury-gold rounded-sm focus:ring-0 text-center font-mono focus:bg-white"
                                      />
                                      {/* Inline error for this specific product quantity */}
                                      {errors[`quantity_${idx}`] && (
                                        <p className="text-[8px] text-red-600 font-semibold font-mono mt-1 text-left sm:text-right">
                                          {errors[`quantity_${idx}`]}
                                        </p>
                                      )}
                                    </div>
                                    
                                    <button
                                      type="button"
                                      onClick={() => removeProduct(idx)}
                                      className="text-neutral-400 hover:text-red-600 transition-colors p-1 cursor-pointer flex items-center space-x-1 self-end sm:self-auto"
                                      aria-label={`Remove ${item.product.name}`}
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                      <span className="text-[9px] font-mono uppercase text-neutral-400">Remove</span>
                                    </button>
                                  </div>
                                </div>
                              ))
                            )}
                          </div>

                          {/* Search Selector Row */}
                          <div ref={searchContainerRef} className="relative mt-auto">
                            <label className="text-[10px] font-bold tracking-widest text-luxury-charcoal uppercase block mb-1 font-mono select-none">
                              + Add Another Product
                            </label>
                            <div className="relative">
                              <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                              <input
                                type="text"
                                value={searchQuery}
                                onFocus={() => setIsSearchFocused(true)}
                                onChange={(e) => {
                                  setSearchQuery(e.target.value);
                                  setIsSearchFocused(true);
                                }}
                                placeholder="Search catalogue models (e.g. Monolith)..."
                                className="w-full bg-white/50 border border-luxury-gold/20 outline-none py-3 pl-9 pr-4 text-xs text-luxury-charcoal focus:border-luxury-gold focus:bg-white transition-all duration-300 rounded-sm font-mono placeholder:text-neutral-400 min-h-[44px]"
                              />
                            </div>

                            {errors.products && (
                              <p className="text-[10px] text-red-600 mt-1 font-semibold font-mono">{errors.products}</p>
                            )}

                            {/* Search Selector Dropdown list */}
                            <AnimatePresence>
                              {isSearchFocused && searchQuery && (
                                <motion.div
                                  initial={{ opacity: 0, y: 5 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: 5 }}
                                  className="absolute left-0 right-0 top-full mt-1 bg-white border border-luxury-gold/20 z-40 max-h-60 overflow-y-auto shadow-lg rounded-sm"
                                >
                                  {filteredSearchProducts.length === 0 ? (
                                    <div className="p-4 text-center text-xs text-neutral-400 italic font-mono">
                                      No matching packaging models.
                                    </div>
                                  ) : (
                                    filteredSearchProducts.map(p => (
                                      <button
                                        type="button"
                                        key={p.id}
                                        onClick={() => handleAddProduct(p)}
                                        className="w-full text-left p-3 hover:bg-luxury-beige/20 border-b border-neutral-100 last:border-b-0 flex items-center space-x-3 transition-colors cursor-pointer"
                                      >
                                        <div className="w-8 h-10 bg-neutral-50 flex items-center justify-center p-0.5 border border-neutral-100 flex-shrink-0">
                                          <ProductImage product={p} fullImage={true} className="w-full h-full bg-transparent border-none p-0 rounded-none shadow-none object-contain" />
                                        </div>
                                        <div className="min-w-0 flex-1">
                                          <span className="text-xs font-serif font-bold text-luxury-charcoal block truncate leading-tight">
                                            {p.name}
                                          </span>
                                          <span className="text-[9px] text-neutral-400 font-mono uppercase block mt-0.5">
                                            {p.subcategory || 'Packaging'}
                                          </span>
                                        </div>
                                        <Plus className="w-3.5 h-3.5 text-luxury-gold flex-shrink-0" />
                                      </button>
                                    ))
                                  )}
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </>
                      )}
                    </div>

                    {/* RIGHT COLUMN: Form Fields */}
                    <div className="md:col-span-7 pt-6 md:pt-0">
                      {mode === 'custom-project' ? (
                        /* CUSTOM PROJECT FORM CONTENT */
                        <>
                          <h4 className="text-xs font-bold tracking-widest text-luxury-charcoal uppercase mb-4 font-mono select-none">
                            CONTACT DETAILS
                          </h4>

                          <div className="space-y-4">
                            {/* Full Name & Company Name */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div>
                                <label htmlFor="name-input" className="text-[10px] font-bold tracking-widest text-luxury-charcoal uppercase block mb-1 font-mono select-none">
                                  Full Name *
                                </label>
                                <input
                                  id="name-input"
                                  type="text"
                                  name="name"
                                  value={formData.name}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  className={`w-full bg-white/50 border outline-none p-3 text-xs text-luxury-charcoal focus:border-luxury-gold focus:bg-white transition-all duration-300 rounded-sm focus:ring-0 min-h-[44px] ${errors.name ? 'border-red-600' : 'border-luxury-gold/20'}`}
                                />
                                {errors.name && touched.name && (
                                  <p className="text-[10px] text-red-600 mt-1 font-semibold font-mono">{errors.name}</p>
                                )}
                              </div>

                              <div>
                                <label htmlFor="company-input" className="text-[10px] font-bold tracking-widest text-luxury-charcoal uppercase block mb-1 font-mono select-none">
                                  Company Name *
                                </label>
                                <input
                                  id="company-input"
                                  type="text"
                                  name="companyName"
                                  value={formData.companyName}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  className={`w-full bg-white/50 border outline-none p-3 text-xs text-luxury-charcoal focus:border-luxury-gold focus:bg-white transition-all duration-300 rounded-sm focus:ring-0 min-h-[44px] ${errors.companyName ? 'border-red-600' : 'border-luxury-gold/20'}`}
                                />
                                {errors.companyName && touched.companyName && (
                                  <p className="text-[10px] text-red-600 mt-1 font-semibold font-mono">{errors.companyName}</p>
                                )}
                              </div>
                            </div>

                            {/* Business Email & Phone / WhatsApp */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div>
                                <label htmlFor="email-input" className="text-[10px] font-bold tracking-widest text-luxury-charcoal uppercase block mb-1 font-mono select-none">
                                  Business Email *
                                </label>
                                <input
                                  id="email-input"
                                  type="email"
                                  name="email"
                                  value={formData.email}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  className={`w-full bg-white/50 border outline-none p-3 text-xs text-luxury-charcoal focus:border-luxury-gold focus:bg-white transition-all duration-300 rounded-sm focus:ring-0 min-h-[44px] ${errors.email ? 'border-red-600' : 'border-luxury-gold/20'}`}
                                />
                                {errors.email && touched.email && (
                                  <p className="text-[10px] text-red-600 mt-1 font-semibold font-mono">{errors.email}</p>
                                )}
                              </div>

                              <div>
                                <label htmlFor="phone-input" className="text-[10px] font-bold tracking-widest text-luxury-charcoal uppercase block mb-1 font-mono select-none">
                                  Phone / WhatsApp
                                </label>
                                <input
                                  id="phone-input"
                                  type="tel"
                                  name="phone"
                                  value={formData.phone}
                                  onChange={handleChange}
                                  placeholder="e.g. +91 90000 00000"
                                  className="w-full bg-white/50 border border-luxury-gold/20 outline-none p-3 text-xs text-luxury-charcoal focus:border-luxury-gold focus:bg-white transition-all duration-300 rounded-sm focus:ring-0 min-h-[44px]"
                                />
                              </div>
                            </div>

                            {/* Country */}
                            <div>
                              <label htmlFor="country-input" className="text-[10px] font-bold tracking-widest text-luxury-charcoal uppercase block mb-1 font-mono select-none">
                                Country *
                              </label>
                              <input
                                id="country-input"
                                type="text"
                                name="country"
                                value={formData.country}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder="e.g. India"
                                className={`w-full bg-white/50 border outline-none p-3 text-xs text-luxury-charcoal focus:border-luxury-gold focus:bg-white transition-all duration-300 rounded-sm focus:ring-0 min-h-[44px] ${errors.country ? 'border-red-600' : 'border-luxury-gold/20'}`}
                              />
                              {errors.country && touched.country && (
                                <p className="text-[10px] text-red-600 mt-1 font-semibold font-mono">{errors.country}</p>
                              )}
                            </div>

                            {/* CUSTOMIZATION SECTION */}
                            <div className="border-t border-luxury-gold/10 pt-6 mt-6">
                              <div className="flex justify-between items-center mb-3">
                                <div>
                                  <h4 className="text-xs font-bold tracking-widest text-luxury-charcoal uppercase font-mono select-none">
                                    CUSTOMIZATION
                                  </h4>
                                  <span className="text-[9px] text-neutral-400 font-mono uppercase">
                                    Customization Required?
                                  </span>
                                </div>
                                <div className="flex space-x-2">
                                  {[
                                    { label: 'NO', value: false },
                                    { label: 'YES', value: true }
                                  ].map(opt => (
                                    <button
                                      key={opt.label}
                                      type="button"
                                      onClick={() => setFormData(prev => ({ 
                                        ...prev, 
                                        customizationRequired: opt.value
                                      }))}
                                      className={`px-4 py-1.5 text-[9px] font-bold tracking-widest rounded-sm border transition-all cursor-pointer ${
                                        formData.customizationRequired === opt.value
                                          ? 'bg-luxury-gold border-luxury-gold text-luxury-charcoal font-bold'
                                          : 'border-luxury-gold/20 text-neutral-400 hover:border-luxury-gold/40'
                                      }`}
                                    >
                                      {opt.label}
                                    </button>
                                  ))}
                                </div>
                              </div>

                              {/* If Customization YES: Dimensions, Material, Finishing */}
                              <AnimatePresence>
                                {formData.customizationRequired && (
                                  <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="overflow-hidden space-y-3 bg-luxury-beige/25 p-3.5 border border-luxury-gold/10 rounded-sm mt-3"
                                  >
                                    <div>
                                      <label htmlFor="dimensions-input" className="text-[9px] font-bold tracking-widest text-luxury-charcoal uppercase block mb-1 font-mono select-none">
                                        Dimensions / Size Requirements
                                      </label>
                                      <input
                                        id="dimensions-input"
                                        type="text"
                                        name="customDimensions"
                                        value={formData.customDimensions}
                                        onChange={handleChange}
                                        placeholder="e.g. 30ml / 50ml, custom height 95mm, 18/415 neck"
                                        className="w-full bg-white/60 border border-luxury-gold/20 outline-none p-2.5 text-xs text-luxury-charcoal focus:border-luxury-gold focus:bg-white transition-all duration-300 rounded-sm focus:ring-0"
                                      />
                                    </div>

                                    <div>
                                      <label htmlFor="material-input" className="text-[9px] font-bold tracking-widest text-luxury-charcoal uppercase block mb-1 font-mono select-none">
                                        Material Preference
                                      </label>
                                      <input
                                        id="material-input"
                                        type="text"
                                        name="customMaterial"
                                        value={formData.customMaterial}
                                        onChange={handleChange}
                                        placeholder="e.g. Borosilicate Glass, Heavy Wall Acrylic, Aluminium"
                                        className="w-full bg-white/60 border border-luxury-gold/20 outline-none p-2.5 text-xs text-luxury-charcoal focus:border-luxury-gold focus:bg-white transition-all duration-300 rounded-sm focus:ring-0"
                                      />
                                    </div>

                                    <div>
                                      <label htmlFor="finishing-input" className="text-[9px] font-bold tracking-widest text-luxury-charcoal uppercase block mb-1 font-mono select-none">
                                        Finishing / Printing Requirements
                                      </label>
                                      <input
                                        id="finishing-input"
                                        type="text"
                                        name="customFinishing"
                                        value={formData.customFinishing}
                                        onChange={handleChange}
                                        placeholder="e.g. Matte Frosted, Gold Hot Foil Stamping, Silk Screen Printing"
                                        className="w-full bg-white/60 border border-luxury-gold/20 outline-none p-2.5 text-xs text-luxury-charcoal focus:border-luxury-gold focus:bg-white transition-all duration-300 rounded-sm focus:ring-0"
                                      />
                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>

                            {/* PROJECT REQUIREMENTS */}
                            <div className="border-t border-luxury-gold/10 pt-6 mt-6">
                              <label htmlFor="requirements-input" className="text-[10px] font-bold tracking-widest text-luxury-charcoal uppercase block mb-1 font-mono select-none">
                                Project Requirements *
                              </label>
                              <textarea
                                id="requirements-input"
                                name="requirements"
                                value={formData.requirements}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                rows="4"
                                placeholder="Tell us about your packaging concept, required specifications, dimensions, materials, finishes, quantity, or any other project requirements."
                                className={`w-full bg-white/50 border outline-none p-3 text-xs text-luxury-charcoal focus:border-luxury-gold focus:bg-white transition-all duration-300 rounded-sm resize-none focus:ring-0 ${errors.requirements ? 'border-red-600' : 'border-luxury-gold/20'}`}
                              />
                              {errors.requirements && touched.requirements && (
                                <p className="text-[10px] text-red-600 mt-1 font-semibold font-mono">{errors.requirements}</p>
                              )}
                            </div>

                            {/* PREFERRED CONTACT METHOD */}
                            <div className="border-t border-luxury-gold/10 pt-4 mt-2">
                              <label className="text-[10px] font-bold tracking-widest text-luxury-charcoal uppercase block mb-2 font-mono select-none">
                                PREFERRED CONTACT METHOD
                              </label>
                              <div className="flex space-x-2">
                                {['Email', 'Phone Call', 'WhatsApp'].map(method => (
                                  <button
                                    key={method}
                                    type="button"
                                    onClick={() => setFormData(prev => ({ ...prev, preferredContact: method }))}
                                    className={`flex-1 border py-2.5 text-[10px] font-bold tracking-wider transition-all duration-300 rounded-sm cursor-pointer ${
                                      formData.preferredContact === method
                                        ? 'bg-luxury-charcoal text-luxury-ivory border-luxury-gold'
                                        : 'bg-white/30 border-luxury-gold/20 text-luxury-charcoal hover:border-luxury-gold/50'
                                    }`}
                                  >
                                    {method}
                                  </button>
                                ))}
                              </div>
                            </div>

                            {/* SUBMIT BUTTON & DISCLAIMER */}
                            <div className="pt-2">
                              <p className="text-[9px] text-neutral-400 mb-3 leading-relaxed text-center sm:text-left select-none">
                                By submitting this project enquiry, you agree to be contacted by our custom packaging specialists regarding your project requirements.
                              </p>
                              
                              <Magnetic className="w-full block">
                                <button
                                  type="submit"
                                  disabled={isSubmitting}
                                  className="btn-luxury-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                  {isSubmitting ? (
                                    <span className="flex items-center tracking-widest animate-pulse">
                                      STARTING PROJECT…
                                    </span>
                                  ) : (
                                    <span className="flex items-center tracking-widest">
                                      START PROJECT
                                    </span>
                                  )}
                                </button>
                              </Magnetic>
                            </div>

                          </div>
                        </>
                      ) : mode === 'work-with-us' ? (
                        /* WORK WITH US FORM CONTENT */
                        <>
                          <h4 className="text-xs font-bold tracking-widest text-luxury-charcoal uppercase mb-4 font-mono select-none">
                            CONTACT DETAILS
                          </h4>

                          <div className="space-y-4">
                            {/* Full Name & Company Name */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div>
                                <label htmlFor="name-input" className="text-[10px] font-bold tracking-widest text-luxury-charcoal uppercase block mb-1 font-mono select-none">
                                  Full Name *
                                </label>
                                <input
                                  id="name-input"
                                  type="text"
                                  name="name"
                                  value={formData.name}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  className={`w-full bg-white/50 border outline-none p-3 text-xs text-luxury-charcoal focus:border-luxury-gold focus:bg-white transition-all duration-300 rounded-sm focus:ring-0 min-h-[44px] ${errors.name ? 'border-red-600' : 'border-luxury-gold/20'}`}
                                />
                                {errors.name && touched.name && (
                                  <p className="text-[10px] text-red-600 mt-1 font-semibold font-mono">{errors.name}</p>
                                )}
                              </div>

                              <div>
                                <label htmlFor="company-input" className="text-[10px] font-bold tracking-widest text-luxury-charcoal uppercase block mb-1 font-mono select-none">
                                  Company Name *
                                </label>
                                <input
                                  id="company-input"
                                  type="text"
                                  name="companyName"
                                  value={formData.companyName}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  className={`w-full bg-white/50 border outline-none p-3 text-xs text-luxury-charcoal focus:border-luxury-gold focus:bg-white transition-all duration-300 rounded-sm focus:ring-0 min-h-[44px] ${errors.companyName ? 'border-red-600' : 'border-luxury-gold/20'}`}
                                />
                                {errors.companyName && touched.companyName && (
                                  <p className="text-[10px] text-red-600 mt-1 font-semibold font-mono">{errors.companyName}</p>
                                )}
                              </div>
                            </div>

                            {/* Business Email & Phone / WhatsApp */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div>
                                <label htmlFor="email-input" className="text-[10px] font-bold tracking-widest text-luxury-charcoal uppercase block mb-1 font-mono select-none">
                                  Business Email *
                                </label>
                                <input
                                  id="email-input"
                                  type="email"
                                  name="email"
                                  value={formData.email}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  className={`w-full bg-white/50 border outline-none p-3 text-xs text-luxury-charcoal focus:border-luxury-gold focus:bg-white transition-all duration-300 rounded-sm focus:ring-0 min-h-[44px] ${errors.email ? 'border-red-600' : 'border-luxury-gold/20'}`}
                                />
                                {errors.email && touched.email && (
                                  <p className="text-[10px] text-red-600 mt-1 font-semibold font-mono">{errors.email}</p>
                                )}
                              </div>

                              <div>
                                <label htmlFor="phone-input" className="text-[10px] font-bold tracking-widest text-luxury-charcoal uppercase block mb-1 font-mono select-none">
                                  Phone / WhatsApp
                                </label>
                                <input
                                  id="phone-input"
                                  type="tel"
                                  name="phone"
                                  value={formData.phone}
                                  onChange={handleChange}
                                  placeholder="e.g. +91 90000 00000"
                                  className="w-full bg-white/50 border border-luxury-gold/20 outline-none p-3 text-xs text-luxury-charcoal focus:border-luxury-gold focus:bg-white transition-all duration-300 rounded-sm focus:ring-0 min-h-[44px]"
                                />
                              </div>
                            </div>

                            {/* Country */}
                            <div>
                              <label htmlFor="country-input" className="text-[10px] font-bold tracking-widest text-luxury-charcoal uppercase block mb-1 font-mono select-none">
                                Country *
                              </label>
                              <input
                                id="country-input"
                                type="text"
                                name="country"
                                value={formData.country}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder="e.g. India"
                                className={`w-full bg-white/50 border outline-none p-3 text-xs text-luxury-charcoal focus:border-luxury-gold focus:bg-white transition-all duration-300 rounded-sm focus:ring-0 min-h-[44px] ${errors.country ? 'border-red-600' : 'border-luxury-gold/20'}`}
                              />
                              {errors.country && touched.country && (
                                <p className="text-[10px] text-red-600 mt-1 font-semibold font-mono">{errors.country}</p>
                              )}
                            </div>

                            {/* BUSINESS INFORMATION SECTION */}
                            <div className="border-t border-luxury-gold/10 pt-6 mt-6">
                              <h4 className="text-xs font-bold tracking-widest text-luxury-charcoal uppercase mb-4 font-mono select-none">
                                BUSINESS INFORMATION
                              </h4>
                            </div>

                            {/* Business / Industry * */}
                            <div>
                              <label htmlFor="business-industry-input" className="text-[10px] font-bold tracking-widest text-luxury-charcoal uppercase block mb-1 font-mono select-none">
                                Business / Industry *
                              </label>
                              <input
                                id="business-industry-input"
                                type="text"
                                name="businessIndustry"
                                value={formData.businessIndustry}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder="e.g. Cosmetics, Skincare, Fragrance, Distribution"
                                className={`w-full bg-white/50 border outline-none p-3 text-xs text-luxury-charcoal focus:border-luxury-gold focus:bg-white transition-all duration-300 rounded-sm focus:ring-0 min-h-[44px] ${errors.businessIndustry ? 'border-red-600' : 'border-luxury-gold/20'}`}
                              />
                              {errors.businessIndustry && touched.businessIndustry && (
                                <p className="text-[10px] text-red-600 mt-1 font-semibold font-mono">{errors.businessIndustry}</p>
                              )}
                            </div>

                            {/* Website / Company URL & Your Role / Position */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div>
                                <label htmlFor="company-url-input" className="text-[10px] font-bold tracking-widest text-luxury-charcoal uppercase block mb-1 font-mono select-none">
                                  Website / Company URL
                                </label>
                                <input
                                  id="company-url-input"
                                  type="text"
                                  name="companyUrl"
                                  value={formData.companyUrl}
                                  onChange={handleChange}
                                  placeholder="e.g. https://brandname.com"
                                  className="w-full bg-white/50 border border-luxury-gold/20 outline-none p-3 text-xs text-luxury-charcoal focus:border-luxury-gold focus:bg-white transition-all duration-300 rounded-sm focus:ring-0 min-h-[44px]"
                                />
                              </div>

                              <div>
                                <label htmlFor="role-input" className="text-[10px] font-bold tracking-widest text-luxury-charcoal uppercase block mb-1 font-mono select-none">
                                  Your Role / Position
                                </label>
                                <input
                                  id="role-input"
                                  type="text"
                                  name="role"
                                  value={formData.role}
                                  onChange={handleChange}
                                  placeholder="e.g. Founder, Sourcing Lead"
                                  className="w-full bg-white/50 border border-luxury-gold/20 outline-none p-3 text-xs text-luxury-charcoal focus:border-luxury-gold focus:bg-white transition-all duration-300 rounded-sm focus:ring-0 min-h-[44px]"
                                />
                              </div>
                            </div>

                            {/* COLLABORATION DETAILS SECTION */}
                            <div className="border-t border-luxury-gold/10 pt-6 mt-6">
                              <h4 className="text-xs font-bold tracking-widest text-luxury-charcoal uppercase mb-4 font-mono select-none">
                                COLLABORATION DETAILS
                              </h4>
                            </div>

                            {/* Project / Business Requirements * */}
                            <div>
                              <label htmlFor="requirements-input" className="text-[10px] font-bold tracking-widest text-luxury-charcoal uppercase block mb-1 font-mono select-none">
                                Project / Business Requirements *
                              </label>
                              <textarea
                                id="requirements-input"
                                name="requirements"
                                value={formData.requirements}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                rows="4"
                                placeholder="Tell us about your business, partnership opportunity, packaging requirements, expected volumes, or how you would like to work with Packture International."
                                className={`w-full bg-white/50 border outline-none p-3 text-xs text-luxury-charcoal focus:border-luxury-gold focus:bg-white transition-all duration-300 rounded-sm resize-none focus:ring-0 ${errors.requirements ? 'border-red-600' : 'border-luxury-gold/20'}`}
                              />
                              {errors.requirements && touched.requirements && (
                                <p className="text-[10px] text-red-600 mt-1 font-semibold font-mono">{errors.requirements}</p>
                              )}
                            </div>

                            {/* PREFERRED CONTACT METHOD */}
                            <div className="border-t border-luxury-gold/10 pt-4 mt-2">
                              <label className="text-[10px] font-bold tracking-widest text-luxury-charcoal uppercase block mb-2 font-mono select-none">
                                PREFERRED CONTACT METHOD
                              </label>
                              <div className="flex space-x-2">
                                {['Email', 'Phone Call', 'WhatsApp'].map(method => (
                                  <button
                                    key={method}
                                    type="button"
                                    onClick={() => setFormData(prev => ({ ...prev, preferredContact: method }))}
                                    className={`flex-1 border py-2.5 text-[10px] font-bold tracking-wider transition-all duration-300 rounded-sm cursor-pointer ${
                                      formData.preferredContact === method
                                        ? 'bg-luxury-charcoal text-luxury-ivory border-luxury-gold'
                                        : 'bg-white/30 border-luxury-gold/20 text-luxury-charcoal hover:border-luxury-gold/50'
                                    }`}
                                  >
                                    {method}
                                  </button>
                                ))}
                              </div>
                            </div>

                            {/* SUBMIT BUTTON & DISCLAIMER */}
                            <div className="pt-2">
                              <p className="text-[9px] text-neutral-400 mb-3 leading-relaxed text-center sm:text-left select-none">
                                By submitting this enquiry, you agree to be contacted by our business development team regarding your collaboration enquiry.
                              </p>
                              
                              <Magnetic className="w-full block">
                                <button
                                  type="submit"
                                  disabled={isSubmitting}
                                  className="btn-luxury-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                  {isSubmitting ? (
                                    <span className="flex items-center tracking-widest animate-pulse">
                                      SUBMITTING...
                                    </span>
                                  ) : (
                                    <span className="flex items-center tracking-widest">
                                      SUBMIT ENQUIRY
                                    </span>
                                  )}
                                </button>
                              </Magnetic>
                            </div>

                          </div>
                        </>
                      ) : (
                        /* EXISTING QUOTE FORM CONTENT (UNCHANGED) */
                        <>
                          <h4 className="text-xs font-bold tracking-widest text-luxury-charcoal uppercase mb-4 font-mono select-none">
                            CONTACT DETAILS
                          </h4>

                          <div className="space-y-4">
                            
                            {/* Name & Company */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div>
                                <label htmlFor="name-input" className="text-[10px] font-bold tracking-widest text-luxury-charcoal uppercase block mb-1 font-mono select-none">
                                  Full Name *
                                </label>
                                <input
                                  id="name-input"
                                  type="text"
                                  name="name"
                                  value={formData.name}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  className={`w-full bg-white/50 border outline-none p-3 text-xs text-luxury-charcoal focus:border-luxury-gold focus:bg-white transition-all duration-300 rounded-sm focus:ring-0 min-h-[44px] ${errors.name ? 'border-red-600' : 'border-luxury-gold/20'}`}
                                />
                                {errors.name && touched.name && (
                                  <p className="text-[10px] text-red-600 mt-1 font-semibold font-mono">{errors.name}</p>
                                )}
                              </div>

                              <div>
                                <label htmlFor="company-input" className="text-[10px] font-bold tracking-widest text-luxury-charcoal uppercase block mb-1 font-mono select-none">
                                  Company Name *
                                </label>
                                <input
                                  id="company-input"
                                  type="text"
                                  name="companyName"
                                  value={formData.companyName}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  className={`w-full bg-white/50 border outline-none p-3 text-xs text-luxury-charcoal focus:border-luxury-gold focus:bg-white transition-all duration-300 rounded-sm focus:ring-0 min-h-[44px] ${errors.companyName ? 'border-red-600' : 'border-luxury-gold/20'}`}
                                />
                                {errors.companyName && touched.companyName && (
                                  <p className="text-[10px] text-red-600 mt-1 font-semibold font-mono">{errors.companyName}</p>
                                )}
                              </div>
                            </div>

                            {/* Email & Phone */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div>
                                <label htmlFor="email-input" className="text-[10px] font-bold tracking-widest text-luxury-charcoal uppercase block mb-1 font-mono select-none">
                                  Business Email *
                                </label>
                                <input
                                  id="email-input"
                                  type="email"
                                  name="email"
                                  value={formData.email}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  className={`w-full bg-white/50 border outline-none p-3 text-xs text-luxury-charcoal focus:border-luxury-gold focus:bg-white transition-all duration-300 rounded-sm focus:ring-0 min-h-[44px] ${errors.email ? 'border-red-600' : 'border-luxury-gold/20'}`}
                                />
                                {errors.email && touched.email && (
                                  <p className="text-[10px] text-red-600 mt-1 font-semibold font-mono">{errors.email}</p>
                                )}
                              </div>

                              <div>
                                <label htmlFor="phone-input" className="text-[10px] font-bold tracking-widest text-luxury-charcoal uppercase block mb-1 font-mono select-none">
                                  Phone / WhatsApp
                                </label>
                                <input
                                  id="phone-input"
                                  type="tel"
                                  name="phone"
                                  value={formData.phone}
                                  onChange={handleChange}
                                  placeholder="e.g. +91 90000 00000"
                                  className="w-full bg-white/50 border border-luxury-gold/20 outline-none p-3 text-xs text-luxury-charcoal focus:border-luxury-gold focus:bg-white transition-all duration-300 rounded-sm focus:ring-0 min-h-[44px]"
                                />
                              </div>
                            </div>

                            {/* Country */}
                            <div>
                              <label htmlFor="country-input" className="text-[10px] font-bold tracking-widest text-luxury-charcoal uppercase block mb-1 font-mono select-none">
                                Country
                              </label>
                              <input
                                id="country-input"
                                type="text"
                                name="country"
                                value={formData.country}
                                onChange={handleChange}
                                placeholder="e.g. United States"
                                className="w-full bg-white/50 border border-luxury-gold/20 outline-none p-3 text-xs text-luxury-charcoal focus:border-luxury-gold focus:bg-white transition-all duration-300 rounded-sm focus:ring-0 min-h-[44px]"
                              />
                            </div>

                            {/* Divider Section Heading */}
                            <div className="border-t border-luxury-gold/10 pt-6 mt-6">
                              <h4 className="text-xs font-bold tracking-widest text-luxury-charcoal uppercase mb-4 font-mono select-none">
                                PROJECT REQUIREMENTS
                              </h4>
                            </div>

                            {/* Timeline & Preferred Contact Method */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div>
                                <label htmlFor="timeline-select" className="text-[10px] font-bold tracking-widest text-luxury-charcoal uppercase block mb-1 font-mono select-none">
                                  Expected Timeline
                                </label>
                                <select
                                  id="timeline-select"
                                  name="timeline"
                                  value={formData.timeline}
                                  onChange={handleChange}
                                  className="w-full bg-white/50 border border-luxury-gold/20 outline-none p-3 text-xs text-luxury-charcoal focus:border-luxury-gold focus:bg-white transition-all duration-300 rounded-sm focus:ring-0 min-h-[44px] cursor-pointer"
                                >
                                  <option value="Immediate (< 1 month)">Immediate (&lt; 1 month)</option>
                                  <option value="1-3 months">1-3 months</option>
                                  <option value="3-6 months">3-6 months</option>
                                  <option value="No urgent rush">No urgent rush</option>
                                </select>
                              </div>

                              <div>
                                <label className="text-[10px] font-bold tracking-widest text-luxury-charcoal uppercase block mb-2 font-mono select-none">
                                  Preferred Contact Method
                                </label>
                                <div className="flex space-x-2">
                                  {['Email', 'Phone Call', 'WhatsApp'].map(method => (
                                    <button
                                      key={method}
                                      type="button"
                                      onClick={() => setFormData(prev => ({ ...prev, preferredContact: method }))}
                                      className={`flex-1 border py-2.5 text-[10px] font-bold tracking-wider transition-all duration-300 rounded-sm cursor-pointer ${
                                        formData.preferredContact === method
                                          ? 'bg-luxury-charcoal text-luxury-ivory border-luxury-gold'
                                          : 'bg-white/30 border-luxury-gold/20 text-luxury-charcoal hover:border-luxury-gold/50'
                                      }`}
                                    >
                                      {method}
                                    </button>
                                  ))}
                                </div>
                              </div>
                            </div>

                            {/* Customization Toggle & Options */}
                            <div className="border-t border-luxury-gold/10 pt-4 mt-2 select-none">
                              <div className="flex items-center justify-between">
                                <span className="text-[10px] font-bold tracking-widest text-luxury-charcoal uppercase font-mono">
                                  Customization Required?
                                </span>
                                <div className="flex space-x-2">
                                  {[
                                    { label: 'NO', value: false },
                                    { label: 'YES', value: true }
                                  ].map(opt => (
                                    <button
                                      key={opt.label}
                                      type="button"
                                      onClick={() => setFormData(prev => ({ 
                                        ...prev, 
                                        customizationRequired: opt.value,
                                        customizationDetails: opt.value ? prev.customizationDetails : [] 
                                      }))}
                                      className={`px-4 py-1.5 text-[9px] font-bold tracking-widest rounded-sm border transition-all cursor-pointer ${
                                        formData.customizationRequired === opt.value
                                          ? 'bg-luxury-gold border-luxury-gold text-luxury-charcoal'
                                          : 'border-luxury-gold/20 text-neutral-400 hover:border-luxury-gold/40'
                                      }`}
                                    >
                                      {opt.label}
                                    </button>
                                  ))}
                                </div>
                              </div>

                              {/* Render detailed customization checkbox options */}
                              <AnimatePresence>
                                {formData.customizationRequired && (
                                  <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="overflow-hidden mt-3 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2.5 bg-luxury-beige/25 p-3.5 border border-luxury-gold/10 rounded-sm"
                                  >
                                    {[
                                      'Custom Colour Coating',
                                      'Logo hot stamping / printing',
                                      'Special Frosted Finish',
                                      'Custom Silhouette Moulding',
                                      'Special Closure / Collar specifications'
                                    ].map((item) => {
                                      const isSelected = formData.customizationDetails.includes(item);
                                      return (
                                        <button
                                          key={item}
                                          type="button"
                                          onClick={() => handleCustomizationDetailChange(item)}
                                          className="flex items-center text-left space-x-2.5 cursor-pointer py-1 select-none"
                                        >
                                          <div className={`w-4.5 h-4.5 rounded-sm border flex items-center justify-center transition-colors flex-shrink-0 ${
                                            isSelected 
                                              ? 'bg-luxury-charcoal border-luxury-gold text-luxury-gold' 
                                              : 'border-luxury-gold/30 bg-white/50'
                                          }`}>
                                            {isSelected && <Check className="w-3 h-3 stroke-[2.5]" />}
                                          </div>
                                          <span className="text-[10px] text-neutral-600 font-medium leading-snug">
                                            {item}
                                          </span>
                                        </button>
                                      );
                                    })}
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>

                            {/* Requirements Message */}
                            <div>
                              <label htmlFor="requirements-input" className="text-[10px] font-bold tracking-widest text-luxury-charcoal uppercase block mb-1 font-mono select-none">
                                Project Requirements *
                              </label>
                              <textarea
                                id="requirements-input"
                                name="requirements"
                                value={formData.requirements}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                rows="4"
                                placeholder="Tell us about your packaging requirements, target size parameter, color finish, logo design printing details, or special mould specifications..."
                                className={`w-full bg-white/50 border outline-none p-3 text-xs text-luxury-charcoal focus:border-luxury-gold focus:bg-white transition-all duration-300 rounded-sm resize-none focus:ring-0 ${errors.requirements ? 'border-red-600' : 'border-luxury-gold/20'}`}
                              />
                              {errors.requirements && touched.requirements && (
                                <p className="text-[10px] text-red-600 mt-1 font-semibold font-mono">{errors.requirements}</p>
                              )}
                            </div>

                            {/* Submit Button & Privacy policy advisory */}
                            <div className="pt-2">
                              <p className="text-[9px] text-neutral-400 mb-3 leading-relaxed text-center sm:text-left select-none">
                                By submitting this enquiry, you agree to be contacted by our packaging advisors regarding your business specifications.
                              </p>
                              
                              <Magnetic className="w-full block">
                                <button
                                  type="submit"
                                  disabled={isSubmitting}
                                  className="btn-luxury-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                  {isSubmitting ? (
                                    <span className="flex items-center tracking-widest animate-pulse">
                                      SENDING...
                                    </span>
                                  ) : (
                                    <span className="flex items-center tracking-widest">
                                      SEND QUOTE REQUEST
                                    </span>
                                  )}
                                </button>
                              </Magnetic>
                            </div>

                          </div>
                        </>
                      )}
                    </div>

                  </div>
                </form>
              )}

            </div>

          </motion.div>
          
          {/* CONFIRM CLOSE OVERLAY */}
          <AnimatePresence>
            {isConfirmCloseOpen && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-luxury-charcoal/80 backdrop-blur-md z-[60] flex items-center justify-center p-6"
              >
                <motion.div 
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.95, opacity: 0 }}
                  className="bg-luxury-ivory border border-luxury-gold/30 p-6 md:p-8 max-w-sm w-full text-center shadow-2xl rounded-sm"
                >
                  <h4 className="font-serif text-lg tracking-wider text-luxury-charcoal uppercase mb-3 select-none">
                    DISCARD REQUEST?
                  </h4>
                  <p className="text-xs text-neutral-500 leading-relaxed mb-6 select-none">
                    You have unsaved information. Are you sure you want to close?
                  </p>
                  <div className="flex flex-col gap-3">
                    <button
                      onClick={() => setIsConfirmCloseOpen(false)}
                      className="btn-luxury-primary w-full"
                    >
                      KEEP EDITING
                    </button>
                    <button
                      onClick={() => {
                        setIsConfirmCloseOpen(false);
                        onClose();
                      }}
                      className="btn-luxury-secondary w-full"
                    >
                      DISCARD
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
