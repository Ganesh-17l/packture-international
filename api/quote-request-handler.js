import { PRODUCTS } from '../src/data/products.js';
import { sendQuoteNotification, sendCustomerConfirmation, sendWorkWithUsNotification, sendCustomProjectNotification, sendContactInquiryNotification } from './services/emailService.js';

// Simple in-memory rate limiting map
const ipRequests = new Map();

/**
 * Checks if request rate has exceeded limits (max 5 requests per minute).
 */
function rateLimitCheck(ip) {
  const now = Date.now();
  const windowMs = 60 * 1000; // 1 minute
  const maxRequests = 5;      // 5 requests per minute
  
  if (!ipRequests.has(ip)) {
    ipRequests.set(ip, []);
  }
  
  const timestamps = ipRequests.get(ip).filter(time => now - time < windowMs);
  timestamps.push(now);
  ipRequests.set(ip, timestamps);
  
  return timestamps.length <= maxRequests;
}

/**
 * Handles Work With Us / Business Collaboration submissions.
 */
async function handleWorkWithUsSubmission(body, req, res) {
  // 1. Validate customer block
  if (!body.customer || typeof body.customer !== 'object') {
    return res.status(400).json({ success: false, message: 'Invalid customer information format.' });
  }

  const { name, company, email, phone, country } = body.customer;
  if (!name || typeof name !== 'string' || name.trim().length === 0 || name.length > 100) {
    return res.status(400).json({ success: false, message: 'Full name is required.' });
  }
  if (!company || typeof company !== 'string' || company.trim().length === 0 || company.length > 100) {
    return res.status(400).json({ success: false, message: 'Company name is required.' });
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || typeof email !== 'string' || !emailRegex.test(email.trim()) || email.length > 150) {
    return res.status(400).json({ success: false, message: 'Please enter a valid business email address.' });
  }
  if (!country || typeof country !== 'string' || country.trim().length === 0 || country.length > 100) {
    return res.status(400).json({ success: false, message: 'Country is required.' });
  }
  if (phone && (typeof phone !== 'string' || phone.length > 50)) {
    return res.status(400).json({ success: false, message: 'Invalid phone number length.' });
  }

  // 2. Validate business block
  const business = body.business || {};
  const industry = business.industry || body.businessIndustry;
  if (!industry || typeof industry !== 'string' || industry.trim().length === 0 || industry.length > 150) {
    return res.status(400).json({ success: false, message: 'Business / Industry is required.' });
  }
  const website = business.website || body.companyUrl || '';
  if (website && (typeof website !== 'string' || website.length > 200)) {
    return res.status(400).json({ success: false, message: 'Invalid website URL length.' });
  }
  const role = business.role || body.role || '';
  if (role && (typeof role !== 'string' || role.length > 100)) {
    return res.status(400).json({ success: false, message: 'Invalid role / position length.' });
  }

  // 3. Validate collaboration interest
  let collaborationTypes = [];
  if (Array.isArray(body.collaborationTypes)) {
    collaborationTypes = body.collaborationTypes.map(t => String(t).trim()).filter(Boolean);
  } else if (typeof body.collaborationTypes === 'string' && body.collaborationTypes.trim()) {
    collaborationTypes = [body.collaborationTypes.trim()];
  } else if (typeof body.collaborationType === 'string' && body.collaborationType.trim()) {
    collaborationTypes = [body.collaborationType.trim()];
  }

  if (collaborationTypes.length === 0) {
    return res.status(400).json({ success: false, message: 'Please select at least one collaboration type.' });
  }

  // 4. Validate collaboration details / requirements
  const { requirements, preferredContact } = body;
  if (!requirements || typeof requirements !== 'string' || requirements.trim().length === 0 || requirements.length > 5000) {
    return res.status(400).json({ success: false, message: 'Project / Business requirements are required.' });
  }
  if (preferredContact && (typeof preferredContact !== 'string' || preferredContact.length > 50)) {
    return res.status(400).json({ success: false, message: 'Invalid contact method preference.' });
  }

  // Diagnostic simulator hook
  if (name.toLowerCase() === 'trigger error') {
    throw new Error("Simulated Server Error: Email delivery service failed.");
  }

  // 5. Build sanitized collaboration payload
  const sanitizedCollaboration = {
    customer: {
      name: name.trim(),
      company: company.trim(),
      email: email.trim().toLowerCase(),
      phone: phone ? phone.trim() : '',
      country: country.trim()
    },
    business: {
      industry: industry.trim(),
      website: website.trim(),
      role: role.trim()
    },
    collaborationTypes,
    preferredContact: preferredContact ? preferredContact.trim() : 'Email',
    requirements: requirements.trim()
  };

  // 6. Generate Reference Number
  const referenceNumber = `PKT-COL-${getFormattedDate()}-${Math.floor(10000 + Math.random() * 90000)}`;

  // 7. Deliver notification email
  await sendWorkWithUsNotification(sanitizedCollaboration, referenceNumber);

  console.log(`[SUCCESS] Work With Us collaboration enquiry processed. Ref: ${referenceNumber}. Company: ${sanitizedCollaboration.customer.company}. Timestamp: ${new Date().toISOString()}`);

  // 8. Return success response
  return res.status(200).json({
    success: true,
    referenceNumber
  });
}

/**
 * Handles Start a Custom Project submissions.
 */
async function handleCustomProjectSubmission(body, req, res) {
  // 1. Validate customer block
  if (!body.customer || typeof body.customer !== 'object') {
    return res.status(400).json({ success: false, message: 'Invalid customer information format.' });
  }

  const { name, company, companyName, email, phone, country } = body.customer;
  const companyVal = (company || companyName || '').trim();

  if (!name || typeof name !== 'string' || name.trim().length === 0 || name.length > 100) {
    return res.status(400).json({ success: false, message: 'Full name is required.' });
  }
  if (!companyVal || companyVal.length > 100) {
    return res.status(400).json({ success: false, message: 'Company name is required.' });
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || typeof email !== 'string' || !emailRegex.test(email.trim()) || email.length > 150) {
    return res.status(400).json({ success: false, message: 'Please enter a valid business email address.' });
  }
  if (!country || typeof country !== 'string' || country.trim().length === 0 || country.length > 100) {
    return res.status(400).json({ success: false, message: 'Country is required.' });
  }
  if (phone && (typeof phone !== 'string' || phone.length > 50)) {
    return res.status(400).json({ success: false, message: 'Invalid phone number format.' });
  }

  // 2. Validate project requirements
  const { requirements, preferredContact, project = {}, customization = {} } = body;
  if (!requirements || typeof requirements !== 'string' || requirements.trim().length === 0 || requirements.length > 5000) {
    return res.status(400).json({ success: false, message: 'Project requirements are required.' });
  }
  if (preferredContact && (typeof preferredContact !== 'string' || preferredContact.length > 50)) {
    return res.status(400).json({ success: false, message: 'Invalid contact method preference.' });
  }

  // Diagnostic simulator hook
  if (name.toLowerCase() === 'trigger error') {
    throw new Error("Simulated Server Error: Email delivery service failed.");
  }

  // 3. Build sanitized custom project payload
  const sanitizedProject = {
    customer: {
      name: name.trim(),
      company: companyVal,
      email: email.trim().toLowerCase(),
      phone: phone ? phone.trim() : '',
      country: country.trim()
    },
    project: {
      name: project.name ? String(project.name).trim().slice(0, 150) : '',
      packagingType: project.packagingType ? String(project.packagingType).trim().slice(0, 150) : '',
      quantity: project.quantity ? String(project.quantity).trim().slice(0, 100) : '',
      timeline: project.timeline ? String(project.timeline).trim().slice(0, 100) : ''
    },
    customization: {
      required: Boolean(customization.required),
      dimensions: customization.dimensions ? String(customization.dimensions).trim().slice(0, 200) : '',
      material: customization.material ? String(customization.material).trim().slice(0, 200) : '',
      finishing: customization.finishing ? String(customization.finishing).trim().slice(0, 200) : ''
    },
    preferredContact: preferredContact ? preferredContact.trim() : 'Email',
    requirements: requirements.trim()
  };

  // 4. Generate Reference Number: PKT-PRJ-YYYYMMDD-XXXXX
  const referenceNumber = `PKT-PRJ-${getFormattedDate()}-${Math.floor(10000 + Math.random() * 90000)}`;

  // 5. Deliver notification email
  await sendCustomProjectNotification(sanitizedProject, referenceNumber);

  console.log(`[SUCCESS] Custom project enquiry processed. Ref: ${referenceNumber}. Company: ${sanitizedProject.customer.company}. Timestamp: ${new Date().toISOString()}`);

  // 6. Return success response
  return res.status(200).json({
    success: true,
    referenceNumber
  });
}

/**
 * Handles Contact Page Inquiry submissions.
 */
async function handleContactInquirySubmission(body, req, res) {
  // 1. Validate customer block
  if (!body.customer || typeof body.customer !== 'object') {
    return res.status(400).json({ success: false, message: 'Invalid customer information format.' });
  }

  const { name, company, companyName, email, phone } = body.customer;
  const companyVal = (company || companyName || '').trim();

  if (!name || typeof name !== 'string' || name.trim().length === 0 || name.length > 100) {
    return res.status(400).json({ success: false, message: 'Your name is required.' });
  }
  if (!companyVal || companyVal.length > 100) {
    return res.status(400).json({ success: false, message: 'Company name is required.' });
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || typeof email !== 'string' || !emailRegex.test(email.trim()) || email.length > 150) {
    return res.status(400).json({ success: false, message: 'Please enter a valid business email address.' });
  }
  if (!phone || typeof phone !== 'string' || phone.trim().length === 0 || phone.length > 50) {
    return res.status(400).json({ success: false, message: 'Contact phone is required.' });
  }

  // 2. Validate message / project scope
  const message = body.message || body.requirements || '';
  if (!message || typeof message !== 'string' || message.trim().length === 0 || message.length > 5000) {
    return res.status(400).json({ success: false, message: 'Message / project scope is required.' });
  }

  // Diagnostic simulator hook
  if (name.toLowerCase() === 'trigger error') {
    throw new Error("Simulated Server Error: Email delivery service failed.");
  }

  // 3. Build sanitized inquiry payload
  const sanitizedInquiry = {
    customer: {
      name: name.trim(),
      company: companyVal,
      email: email.trim().toLowerCase(),
      phone: phone.trim()
    },
    message: message.trim()
  };

  // 4. Generate Reference Number: PKT-CNT-YYYYMMDD-XXXXX
  const referenceNumber = `PKT-CNT-${getFormattedDate()}-${Math.floor(10000 + Math.random() * 90000)}`;

  // 5. Deliver notification email
  await sendContactInquiryNotification(sanitizedInquiry, referenceNumber);

  console.log(`[SUCCESS] Contact page inquiry processed. Ref: ${referenceNumber}. Company: ${sanitizedInquiry.customer.company}. Timestamp: ${new Date().toISOString()}`);

  // 6. Return success response
  return res.status(200).json({
    success: true,
    referenceNumber,
    message: 'Inquiry received successfully'
  });
}

/**
 * Core platform-agnostic request handler for B2B submissions.
 */
export async function handleQuoteRequest(req, res) {
  try {
    const ip = req.headers['x-forwarded-for'] || req.socket?.remoteAddress || '127.0.0.1';
    
    // 1. Rate Limiting Check
    if (!rateLimitCheck(ip)) {
      console.warn(`Rate limit exceeded for IP: ${ip}`);
      return res.status(429).json({
        success: false,
        message: "We couldn't complete the request right now. Please try again."
      });
    }

    const body = req.body || {};

    // 2. Honeypot Spam Protection
    if (body.website && body.website.trim() !== '') {
      console.warn(`Honeypot triggered from IP ${ip}. Silent rejection.`);
      let prefix = 'PKT';
      if (body.type === 'custom-project') prefix = 'PKT-PRJ';
      else if (body.type === 'work-with-us') prefix = 'PKT-COL';
      else if (body.type === 'contact-inquiry') prefix = 'PKT-CNT';

      const fakeRef = `${prefix}-${getFormattedDate()}-${Math.floor(10000 + Math.random() * 90000)}`;
      return res.status(200).json({
        success: true,
        referenceNumber: fakeRef
      });
    }

    // 3. Submissions Routing by Type
    if (body.type === 'contact-inquiry') {
      return await handleContactInquirySubmission(body, req, res);
    }

    if (body.type === 'custom-project') {
      return await handleCustomProjectSubmission(body, req, res);
    }

    if (body.type === 'work-with-us') {
      return await handleWorkWithUsSubmission(body, req, res);
    }

    // 4. Server-Side Input Validation (Quote Request)
    // Validate customer block
    if (!body.customer || typeof body.customer !== 'object') {
      return res.status(400).json({ success: false, message: 'Invalid customer information format.' });
    }
    
    const { name, company, email, phone, country } = body.customer;
    if (!name || typeof name !== 'string' || name.trim().length === 0 || name.length > 100) {
      return res.status(400).json({ success: false, message: 'Invalid customer name.' });
    }
    if (!company || typeof company !== 'string' || company.trim().length === 0 || company.length > 100) {
      return res.status(400).json({ success: false, message: 'Invalid company name.' });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== 'string' || !emailRegex.test(email.trim()) || email.length > 150) {
      return res.status(400).json({ success: false, message: 'Invalid business email address.' });
    }
    if (phone && (typeof phone !== 'string' || phone.length > 50)) {
      return res.status(400).json({ success: false, message: 'Invalid phone number length.' });
    }
    if (country && (typeof country !== 'string' || country.length > 100)) {
      return res.status(400).json({ success: false, message: 'Invalid country name length.' });
    }

    // Validate project specs
    const { requirements, timeline, preferredContact, customization } = body;
    if (!requirements || typeof requirements !== 'string' || requirements.trim().length === 0 || requirements.length > 5000) {
      return res.status(400).json({ success: false, message: 'Invalid project requirements text.' });
    }
    if (timeline && (typeof timeline !== 'string' || timeline.length > 100)) {
      return res.status(400).json({ success: false, message: 'Invalid project timeline length.' });
    }
    if (preferredContact && (typeof preferredContact !== 'string' || preferredContact.length > 50)) {
      return res.status(400).json({ success: false, message: 'Invalid contact method preference.' });
    }

    // Validate customization block
    if (customization && typeof customization === 'object') {
      const detailsText = (customization.details || []).join(', ');
      if (detailsText.length > 3000) {
        return res.status(400).json({ success: false, message: 'Customization details exceed limit.' });
      }
    }

    // Validate products block
    if (!Array.isArray(body.products) || body.products.length === 0) {
      return res.status(400).json({ success: false, message: 'Please select at least one product model.' });
    }

    // 4. Product Verification against Product Manifest Catalog
    const verifiedProducts = [];
    for (const item of body.products) {
      if (!item.productId || typeof item.productId !== 'string') {
        return res.status(400).json({ success: false, message: 'Missing product identifier.' });
      }

      // Lookup product by ID or Slug
      const matchedCatalogProduct = PRODUCTS.find(p => p.id === item.productId || p.slug === item.productId);
      if (!matchedCatalogProduct) {
        console.warn(`Product ID verification failed for: ${item.productId}`);
        return res.status(400).json({ success: false, message: 'Product selection contains invalid catalogue models.' });
      }

      // Validate Quantity
      const qty = parseInt(item.quantity);
      if (isNaN(qty) || qty < 1 || qty > 10000000) {
        return res.status(400).json({ success: false, message: 'Please provide a valid estimated quantity.' });
      }

      // Validate and sanitize the selected size
      let selectedSize = 'Custom';
      if (matchedCatalogProduct.sizes && matchedCatalogProduct.sizes.length > 0) {
        if (item.size) {
          if (!matchedCatalogProduct.sizes.includes(item.size)) {
            console.warn(`Size verification failed for Product: ${matchedCatalogProduct.name}, Size: ${item.size}`);
            return res.status(400).json({ 
              success: false, 
              message: `The selected size option is not available for ${matchedCatalogProduct.name}.` 
            });
          }
          selectedSize = item.size;
        } else {
          // Normalize to first size if completely missing
          selectedSize = matchedCatalogProduct.sizes[0];
        }
      } else {
        selectedSize = item.size || 'Custom';
      }

      // Override product info with values verified from our source-of-truth products.js
      verifiedProducts.push({
        productId: matchedCatalogProduct.id,
        productName: matchedCatalogProduct.name,
        category: matchedCatalogProduct.subcategory || matchedCatalogProduct.category,
        size: selectedSize,
        quantity: qty
      });
    }

    // Build the final sanitized quote model
    const sanitizedQuote = {
      customer: {
        name: name.trim(),
        company: company.trim(),
        email: email.trim().toLowerCase(),
        phone: phone ? phone.trim() : '',
        country: country ? country.trim() : ''
      },
      products: verifiedProducts,
      customization: {
        required: !!customization?.required,
        details: Array.isArray(customization?.details) ? customization.details.map(d => String(d).trim()) : []
      },
      timeline: timeline ? timeline.trim() : '1-3 months',
      preferredContact: preferredContact ? preferredContact.trim() : 'Email',
      requirements: requirements.trim()
    };

    // 5. Reference Number Generation (Server-Side)
    const referenceNumber = `PKT-${getFormattedDate()}-${Math.floor(10000 + Math.random() * 90000)}`;

    // 6. Deliver Emails (Sales Team notification & client receipt)
    // Send Sales Team notification
    await sendQuoteNotification(sanitizedQuote, referenceNumber);
    
    // Optionally Send Customer confirmation receipt
    try {
      await sendCustomerConfirmation(sanitizedQuote, referenceNumber);
    } catch (custEmailErr) {
      // Don't fail the request if ONLY the customer receipt fails, but log it
      console.error(`Warning: Customer confirmation email failed:`, custEmailErr);
    }

    // Log Server Activity Log entry (safely - no keys/customer secrets)
    console.log(`[SUCCESS] B2B Quote request generated successfully. Ref: ${referenceNumber}. Timestamp: ${new Date().toISOString()}`);

    // 7. Return success response
    return res.status(200).json({
      success: true,
      referenceNumber
    });

  } catch (error) {
    // Log the server error securely
    console.error(`[ERROR] Server failure during quote request processing:`, error);
    
    // Return friendly generic error to browser without leaking stack trace/secrets
    return res.status(500).json({
      success: false,
      message: "We couldn't send your request right now. Please try again."
    });
  }
}

// Utility to get current date formatted as YYYYMMDD
function getFormattedDate() {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}${month}${day}`;
}
