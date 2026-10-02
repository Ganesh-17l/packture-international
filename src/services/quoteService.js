/**
 * Service to handle B2B Quote Requests for Packture International.
 * Communicates with the backend server/serverless API layer.
 */

/**
 * Submits B2B Quote Request data to the server API
 * @param {Object} data - The structured quote request data
 * @returns {Promise<{success: boolean, referenceNumber: string}>}
 */
export async function submitQuoteRequest(data) {
  // Support request timeout of 10 seconds
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000);

  try {
    const response = await fetch("/api/quote-request", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      signal: controller.signal,
      body: JSON.stringify(data)
    });

    clearTimeout(timeoutId);

    // Read response JSON
    let result;
    try {
      result = await response.json();
    } catch (parseErr) {
      throw new Error("Invalid server response format.");
    }

    if (!response.ok) {
      throw new Error(result.message || "We couldn't send your request right now. Please try again.");
    }

    // Trigger google analytics/custom analytics callback on completion
    if (window.onQuoteAnalyticsEvent) {
      const productIds = data.products ? data.products.map(p => p.productId).join(', ') : '';
      const productNames = data.products ? data.products.map(p => p.productName).join(', ') : '';
      window.onQuoteAnalyticsEvent('quote_submitted', {
        productId: productIds,
        productName: productNames,
        referenceNumber: result.referenceNumber
      });
    }

    return result;

  } catch (error) {
    clearTimeout(timeoutId);
    
    // Log client-side error for debug reference
    console.error("Quote submission client error:", error);
    
    // Throw client-friendly error message
    if (error.name === 'AbortError') {
      throw new Error("We couldn't complete the request right now. Please try again.");
    }
    throw error;
  }
}

/**
 * Submits Business Collaboration / Work With Us Request data to the server API
 * @param {Object} data - The structured collaboration request data
 * @returns {Promise<{success: boolean, referenceNumber: string}>}
 */
export async function submitCollaborationRequest(data) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000);

  const payload = {
    type: 'work-with-us',
    ...data
  };

  try {
    const response = await fetch("/api/quote-request", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      signal: controller.signal,
      body: JSON.stringify(payload)
    });

    clearTimeout(timeoutId);

    let result;
    try {
      result = await response.json();
    } catch {
      throw new Error("Unable to submit your enquiry right now. Please try again.");
    }

    if (!response.ok) {
      throw new Error(result.message || "Unable to submit your enquiry right now. Please try again.");
    }

    if (window.onQuoteAnalyticsEvent) {
      window.onQuoteAnalyticsEvent('collaboration_submitted', {
        collaborationTypes: Array.isArray(data.collaborationTypes) ? data.collaborationTypes.join(', ') : '',
        company: data.customer?.company || '',
        referenceNumber: result.referenceNumber
      });
    }

    return result;

  } catch (error) {
    clearTimeout(timeoutId);
    console.error("Collaboration submission client error:", error);

    if (error.name === 'AbortError') {
      throw new Error("Unable to submit your enquiry right now. Please try again.");
    }
    throw error;
  }
}

/**
 * Submits Start a Custom Project Request data to the server API
 * @param {Object} data - The structured custom project request data
 * @returns {Promise<{success: boolean, referenceNumber: string}>}
 */
export async function submitCustomProjectRequest(data) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000);

  const payload = {
    type: 'custom-project',
    ...data
  };

  try {
    const response = await fetch("/api/quote-request", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      signal: controller.signal,
      body: JSON.stringify(payload)
    });

    clearTimeout(timeoutId);

    let result;
    try {
      result = await response.json();
    } catch {
      throw new Error("Unable to submit your enquiry right now. Please try again.");
    }

    if (!response.ok) {
      throw new Error(result.message || "Unable to submit your enquiry right now. Please try again.");
    }

    if (window.onQuoteAnalyticsEvent) {
      window.onQuoteAnalyticsEvent('custom_project_submitted', {
        projectName: data.project?.name || '',
        packagingType: data.project?.packagingType || '',
        company: data.customer?.company || data.customer?.companyName || '',
        referenceNumber: result.referenceNumber
      });
    }

    return result;

  } catch (error) {
    clearTimeout(timeoutId);
    console.error("Custom project submission client error:", error);

    if (error.name === 'AbortError') {
      throw new Error("Unable to submit your enquiry right now. Please try again.");
    }
    throw error;
  }
}

/**
 * Submits Contact Page Inquiry data to the server API
 * @param {Object} data - The structured contact inquiry data
 * @returns {Promise<{success: boolean, referenceNumber: string}>}
 */
export async function submitContactInquiry(data) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000);

  const payload = {
    type: 'contact-inquiry',
    ...data
  };

  try {
    const response = await fetch("/api/quote-request", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      signal: controller.signal,
      body: JSON.stringify(payload)
    });

    clearTimeout(timeoutId);

    let result;
    try {
      result = await response.json();
    } catch {
      throw new Error("Unable to send your inquiry right now. Please try again.");
    }

    if (!response.ok) {
      throw new Error(result.message || "Unable to send your inquiry right now. Please try again.");
    }

    if (window.onQuoteAnalyticsEvent) {
      window.onQuoteAnalyticsEvent('contact_inquiry_submitted', {
        company: data.customer?.company || data.customer?.companyName || '',
        referenceNumber: result.referenceNumber
      });
    }

    return result;

  } catch (error) {
    clearTimeout(timeoutId);
    console.error("Contact inquiry client error:", error);

    if (error.name === 'AbortError') {
      throw new Error("Unable to send your inquiry right now. Please try again.");
    }
    throw error;
  }
}

