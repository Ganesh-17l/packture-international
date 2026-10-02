// Configured environment variables will be read dynamically from process.env

/**
 * Sanitizes input text to prevent HTML injection inside emails.
 */
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Sends a notification email to the Packture Sales Team.
 */
export async function sendQuoteNotification(quote, referenceNumber) {
  const salesEmail = process.env.PACKTURE_SALES_EMAIL || 'sales@example.com';
  const fromEmail = process.env.PACKTURE_FROM_EMAIL || 'no-reply@example.com';
  const apiKey = process.env.EMAIL_API_KEY;

  const subject = `New B2B Quote Request — ${referenceNumber} — ${quote.customer.company}`;
  const html = getSalesEmailHtml(quote, referenceNumber);
  
  if (!apiKey) {
    console.log('\n======================================================');
    console.log('--- EMAIL DRY RUN / MOCK MODE (SALES TEAM NOTIFICATION) ---');
    console.log(`To (Sales Target): ${salesEmail}`);
    console.log(`From (Verified Sender): ${fromEmail}`);
    console.log(`Reply-To (Customer): ${quote.customer.email}`);
    console.log(`Subject: ${subject}`);
    console.log('------------------------------------------------------');
    console.log('HTML CONTENT PREVIEW:');
    console.log(html);
    console.log('======================================================\n');
    return { success: true, message: 'Dry run completed successfully.' };
  }

  return sendEmailViaApi({
    to: salesEmail,
    from: fromEmail,
    replyTo: quote.customer.email,
    subject,
    html
  });
}

/**
 * Sends a confirmation email to the client's submitted email.
 */
export async function sendCustomerConfirmation(quote, referenceNumber) {
  const fromEmail = process.env.PACKTURE_FROM_EMAIL || 'no-reply@example.com';
  const apiKey = process.env.EMAIL_API_KEY;

  const sendConfirm = process.env.SEND_CUSTOMER_CONFIRMATION !== 'false';
  if (!sendConfirm) return { success: true, message: 'Confirmation email is disabled' };

  const subject = `Packture International — Quote Request Received — ${referenceNumber}`;
  const html = getCustomerEmailHtml(quote, referenceNumber);

  if (!apiKey) {
    console.log('\n======================================================');
    console.log('--- EMAIL DRY RUN / MOCK MODE (CUSTOMER CONFIRMATION) ---');
    console.log(`To: ${quote.customer.email}`);
    console.log(`From: ${fromEmail}`);
    console.log(`Subject: ${subject}`);
    console.log('------------------------------------------------------');
    console.log('HTML CONTENT PREVIEW:');
    console.log(html);
    console.log('======================================================\n');
    return { success: true, message: 'Dry run completed successfully.' };
  }

  return sendEmailViaApi({
    to: quote.customer.email,
    from: fromEmail,
    replyTo: null,
    subject,
    html
  });
}

/**
 * Handles internal delivery branching to chosen provider.
 */
async function sendEmailViaApi({ to, from, replyTo, subject, html }) {
  const provider = process.env.EMAIL_PROVIDER || 'resend';
  if (provider.toLowerCase() === 'sendgrid') {
    return sendSendGridEmail({ to, from, replyTo, subject, html });
  } else {
    return sendResendEmail({ to, from, replyTo, subject, html });
  }
}

/**
 * Delivers via Resend REST API
 */
async function sendResendEmail({ to, from, replyTo, subject, html }) {
  const apiKey = process.env.EMAIL_API_KEY;
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from,
      to,
      reply_to: replyTo || undefined,
      subject,
      html
    })
  });

  const resData = await response.json();
  if (!response.ok) {
    throw new Error(resData.message || 'Failed to send email via Resend API.');
  }
  return resData;
}

/**
 * Delivers via SendGrid v3 Web API
 */
async function sendSendGridEmail({ to, from, replyTo, subject, html }) {
  const apiKey = process.env.EMAIL_API_KEY;
  const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      personalizations: [
        {
          to: [{ email: to }],
          subject
        }
      ],
      from: { email: from },
      reply_to: replyTo ? { email: replyTo } : undefined,
      content: [
        {
          type: 'text/html',
          value: html
        }
      ]
    })
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(errText || 'Failed to send email via SendGrid API.');
  }
  return { success: true };
}

/**
 * Builds HTML table rows for product list.
 */
function buildProductRows(products) {
  return products.map(item => `
    <tr>
      <td style="padding: 10px; border: 1px solid #F0ECE3; color: #1C1C1C; font-family: Georgia, serif; font-size: 13px;">
        ${escapeHtml(item.productName)}
      </td>
      <td style="padding: 10px; border: 1px solid #F0ECE3; color: #666666; font-size: 12px; text-transform: uppercase; font-family: monospace;">
        ${escapeHtml(item.category)}
      </td>
      <td align="center" style="padding: 10px; border: 1px solid #F0ECE3; color: #666666; font-size: 12px; font-family: monospace;">
        ${escapeHtml(item.size || 'Custom')}
      </td>
      <td align="right" style="padding: 10px; border: 1px solid #F0ECE3; font-weight: bold; color: #1C1C1C; font-family: monospace; font-size: 12px;">
        ${escapeHtml(item.quantity)}
      </td>
    </tr>
  `).join('');
}

/**
 * Generates the HTML body for the Sales Notification email.
 */
function getSalesEmailHtml(quote, referenceNumber) {
  const timestamp = new Date().toLocaleString('en-US', { timeZoneName: 'short' });
  const productRows = buildProductRows(quote.products);
  const customRequired = quote.customization.required ? 'Yes' : 'No';
  const customDetailsRow = (quote.customization.required && quote.customization.details.length > 0)
    ? `<tr>
        <td style="padding: 6px 0; font-weight: bold; color: #666666; font-family: monospace; font-size: 11px; text-transform: uppercase;">Details:</td>
        <td style="padding: 6px 0; color: #1C1C1C;">${quote.customization.details.map(d => escapeHtml(d)).join(', ')}</td>
       </tr>`
    : '';

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New B2B Quote Request</title>
</head>
<body style="margin: 0; padding: 0; background-color: #FAF9F6; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;">
  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #FAF9F6; padding: 40px 10px;">
    <tr>
      <td align="center">
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #FFFFFF; border: 1px solid #E6DFD3; border-top: 4px solid #C5A880; box-shadow: 0 4px 12px rgba(0,0,0,0.03);">
          <!-- Logo & Brand Header -->
          <tr>
            <td style="padding: 30px 40px; text-align: center; border-bottom: 1px solid #F0ECE3;">
              <h1 style="margin: 0; font-family: Georgia, serif; font-size: 24px; font-weight: 300; letter-spacing: 0.15em; color: #1C1C1C; text-transform: uppercase;">
                Packture International
              </h1>
              <p style="margin: 5px 0 0 0; font-size: 10px; font-family: monospace; letter-spacing: 0.2em; color: #C5A880; text-transform: uppercase;">
                B2B Enquiry System
              </p>
            </td>
          </tr>
          <!-- Main Content -->
          <tr>
            <td style="padding: 40px 40px 30px 40px;">
              <h2 style="margin: 0 0 10px 0; font-family: Georgia, serif; font-size: 18px; font-weight: normal; color: #1C1C1C; letter-spacing: 0.05em; text-transform: uppercase;">
                New B2B Quote Request
              </h2>
              <p style="margin: 0 0 25px 0; font-size: 13px; color: #666666; line-height: 1.5;">
                A new business consultation request has been received. The detailed specifications are outlined below.
              </p>
              
              <!-- Reference Card -->
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #FAF9F6; border: 1px solid #F0ECE3; margin-bottom: 30px;">
                <tr>
                  <td style="padding: 15px; text-align: center;">
                    <span style="display: block; font-size: 9px; font-family: monospace; text-transform: uppercase; letter-spacing: 0.15em; color: #888888; margin-bottom: 4px;">
                      Reference Number
                    </span>
                    <span style="font-size: 18px; font-family: monospace; font-weight: bold; color: #C5A880; letter-spacing: 0.1em;">
                      ${escapeHtml(referenceNumber)}
                    </span>
                  </td>
                </tr>
              </table>

              <!-- Customer Details -->
              <h3 style="margin: 0 0 12px 0; font-size: 10px; font-family: monospace; text-transform: uppercase; letter-spacing: 0.2em; color: #C5A880; border-bottom: 1px solid #F0ECE3; padding-bottom: 6px;">
                CUSTOMER DETAILS
              </h3>
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 30px; font-size: 13px; line-height: 1.6; color: #444444;">
                <tr>
                  <td width="35%" style="padding: 4px 0; font-weight: bold; color: #666666; font-family: monospace; font-size: 11px; text-transform: uppercase;">Name:</td>
                  <td style="padding: 4px 0; color: #1C1C1C;">${escapeHtml(quote.customer.name)}</td>
                </tr>
                <tr>
                  <td style="padding: 4px 0; font-weight: bold; color: #666666; font-family: monospace; font-size: 11px; text-transform: uppercase;">Company:</td>
                  <td style="padding: 4px 0; color: #1C1C1C;">${escapeHtml(quote.customer.company)}</td>
                </tr>
                <tr>
                  <td style="padding: 4px 0; font-weight: bold; color: #666666; font-family: monospace; font-size: 11px; text-transform: uppercase;">Business Email:</td>
                  <td style="padding: 4px 0;"><a href="mailto:${escapeHtml(quote.customer.email)}" style="color: #C5A880; text-decoration: none;">${escapeHtml(quote.customer.email)}</a></td>
                </tr>
                <tr>
                  <td style="padding: 4px 0; font-weight: bold; color: #666666; font-family: monospace; font-size: 11px; text-transform: uppercase;">Phone / WhatsApp:</td>
                  <td style="padding: 4px 0; color: #1C1C1C;">${quote.customer.phone ? escapeHtml(quote.customer.phone) : 'Not Provided'}</td>
                </tr>
                <tr>
                  <td style="padding: 4px 0; font-weight: bold; color: #666666; font-family: monospace; font-size: 11px; text-transform: uppercase;">Country:</td>
                  <td style="padding: 4px 0; color: #1C1C1C;">${quote.customer.country ? escapeHtml(quote.customer.country) : 'Not Provided'}</td>
                </tr>
              </table>

              <!-- Selected Products Table -->
              <h3 style="margin: 0 0 12px 0; font-size: 10px; font-family: monospace; text-transform: uppercase; letter-spacing: 0.2em; color: #C5A880; border-bottom: 1px solid #F0ECE3; padding-bottom: 6px;">
                SELECTED PRODUCTS
              </h3>
              <table border="0" cellpadding="8" cellspacing="0" width="100%" style="margin-bottom: 30px; border-collapse: collapse; font-size: 12px; line-height: 1.4; width: 100%;">
                <thead>
                  <tr style="background-color: #1C1C1C;">
                    <th align="left" style="color: #FAF9F6; font-weight: 500; font-family: monospace; font-size: 10px; border: 1px solid #1C1C1C; text-transform: uppercase; letter-spacing: 0.05em; padding: 10px;">Product</th>
                    <th align="left" style="color: #FAF9F6; font-weight: 500; font-family: monospace; font-size: 10px; border: 1px solid #1C1C1C; text-transform: uppercase; letter-spacing: 0.05em; padding: 10px;">Category</th>
                    <th align="center" style="color: #FAF9F6; font-weight: 500; font-family: monospace; font-size: 10px; border: 1px solid #1C1C1C; text-transform: uppercase; letter-spacing: 0.05em; padding: 10px;">Size</th>
                    <th align="right" style="color: #FAF9F6; font-weight: 500; font-family: monospace; font-size: 10px; border: 1px solid #1C1C1C; text-transform: uppercase; letter-spacing: 0.05em; padding: 10px;">Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  ${productRows}
                </tbody>
              </table>

              <!-- Customization Requirements -->
              <h3 style="margin: 0 0 12px 0; font-size: 10px; font-family: monospace; text-transform: uppercase; letter-spacing: 0.2em; color: #C5A880; border-bottom: 1px solid #F0ECE3; padding-bottom: 6px;">
                CUSTOMIZATION
              </h3>
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 30px; font-size: 13px; line-height: 1.6; color: #444444;">
                <tr>
                  <td width="35%" style="padding: 4px 0; font-weight: bold; color: #666666; font-family: monospace; font-size: 11px; text-transform: uppercase;">Required:</td>
                  <td style="padding: 4px 0; color: #1C1C1C;">${customRequired}</td>
                </tr>
                ${customDetailsRow}
              </table>

              <!-- Project details -->
              <h3 style="margin: 0 0 12px 0; font-size: 10px; font-family: monospace; text-transform: uppercase; letter-spacing: 0.2em; color: #C5A880; border-bottom: 1px solid #F0ECE3; padding-bottom: 6px;">
                PROJECT DETAILS
              </h3>
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 30px; font-size: 13px; line-height: 1.6; color: #444444;">
                <tr>
                  <td width="35%" style="padding: 4px 0; font-weight: bold; color: #666666; font-family: monospace; font-size: 11px; text-transform: uppercase;">Expected Timeline:</td>
                  <td style="padding: 4px 0; color: #1C1C1C;">${quote.timeline ? escapeHtml(quote.timeline) : 'Not Specified'}</td>
                </tr>
                <tr>
                  <td style="padding: 4px 0; font-weight: bold; color: #666666; font-family: monospace; font-size: 11px; text-transform: uppercase;">Preferred Contact:</td>
                  <td style="padding: 4px 0; color: #1C1C1C;">${escapeHtml(quote.preferredContact)}</td>
                </tr>
              </table>

              <!-- Requirements Message -->
              <h3 style="margin: 0 0 12px 0; font-size: 10px; font-family: monospace; text-transform: uppercase; letter-spacing: 0.2em; color: #C5A880; border-bottom: 1px solid #F0ECE3; padding-bottom: 6px;">
                PROJECT REQUIREMENTS
              </h3>
              <div style="background-color: #FAF9F6; border: 1px solid #F0ECE3; padding: 20px; font-size: 13px; color: #1C1C1C; line-height: 1.6; white-space: pre-wrap; font-family: Georgia, serif;">${escapeHtml(quote.requirements)}</div>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="padding: 30px 40px; background-color: #1C1C1C; text-align: center; font-size: 11px; color: #888888; line-height: 1.6;">
              <p style="margin: 0; color: #FAF9F6; letter-spacing: 0.1em; text-transform: uppercase;">
                Packture International
              </p>
              <p style="margin: 5px 0 0 0;">
                This request was dispatched from the B2B platform integration server.
              </p>
              <p style="margin: 5px 0 0 0; font-family: monospace; font-size: 9px; color: #666666;">
                Submitted on: ${escapeHtml(timestamp)}
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

/**
 * Generates the HTML body for the Customer Confirmation email.
 */
function getCustomerEmailHtml(quote, referenceNumber) {
  const productRows = buildProductRows(quote.products);
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Quote Request Received</title>
</head>
<body style="margin: 0; padding: 0; background-color: #FAF9F6; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;">
  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #FAF9F6; padding: 40px 10px;">
    <tr>
      <td align="center">
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #FFFFFF; border: 1px solid #E6DFD3; border-top: 4px solid #C5A880; box-shadow: 0 4px 12px rgba(0,0,0,0.03);">
          <!-- Logo Header -->
          <tr>
            <td style="padding: 30px 40px; text-align: center; border-bottom: 1px solid #F0ECE3;">
              <h1 style="margin: 0; font-family: Georgia, serif; font-size: 24px; font-weight: 300; letter-spacing: 0.15em; color: #1C1C1C; text-transform: uppercase;">
                Packture International
              </h1>
              <p style="margin: 5px 0 0 0; font-size: 10px; font-family: monospace; letter-spacing: 0.2em; color: #C5A880; text-transform: uppercase;">
                B2B Packaging Solutions
              </p>
            </td>
          </tr>
          <!-- Content Body -->
          <tr>
            <td style="padding: 40px 40px 30px 40px;">
              <h2 style="margin: 0 0 15px 0; font-family: Georgia, serif; font-size: 18px; font-weight: normal; color: #1C1C1C; letter-spacing: 0.05em; text-transform: uppercase;">
                Quote Request Received
              </h2>
              <p style="margin: 0 0 20px 0; font-size: 13px; color: #444444; line-height: 1.6;">
                Hello ${escapeHtml(quote.customer.name)},<br><br>
                Thank you for contacting Packture International. We have successfully received your packaging requirements and B2B consultation request.
              </p>
              
              <!-- Reference Card -->
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #FAF9F6; border: 1px solid #F0ECE3; margin-bottom: 30px;">
                <tr>
                  <td style="padding: 15px; text-align: center;">
                    <span style="display: block; font-size: 9px; font-family: monospace; text-transform: uppercase; letter-spacing: 0.15em; color: #888888; margin-bottom: 4px;">
                      Your Reference Number
                    </span>
                    <span style="font-size: 18px; font-family: monospace; font-weight: bold; color: #C5A880; letter-spacing: 0.1em;">
                      ${escapeHtml(referenceNumber)}
                    </span>
                  </td>
                </tr>
              </table>

              <!-- Selected Items Table -->
              <h3 style="margin: 0 0 12px 0; font-size: 10px; font-family: monospace; text-transform: uppercase; letter-spacing: 0.2em; color: #C5A880; border-bottom: 1px solid #F0ECE3; padding-bottom: 6px;">
                ENQUIRY DETAILS
              </h3>
              <table border="0" cellpadding="8" cellspacing="0" width="100%" style="margin-bottom: 30px; border-collapse: collapse; font-size: 12px; line-height: 1.4; width: 100%;">
                <thead>
                  <tr style="background-color: #1C1C1C;">
                    <th align="left" style="color: #FAF9F6; font-weight: 500; font-family: monospace; font-size: 10px; border: 1px solid #1C1C1C; text-transform: uppercase; letter-spacing: 0.05em; padding: 10px;">Product</th>
                    <th align="left" style="color: #FAF9F6; font-weight: 500; font-family: monospace; font-size: 10px; border: 1px solid #1C1C1C; text-transform: uppercase; letter-spacing: 0.05em; padding: 10px;">Category</th>
                    <th align="center" style="color: #FAF9F6; font-weight: 500; font-family: monospace; font-size: 10px; border: 1px solid #1C1C1C; text-transform: uppercase; letter-spacing: 0.05em; padding: 10px;">Size</th>
                    <th align="right" style="color: #FAF9F6; font-weight: 500; font-family: monospace; font-size: 10px; border: 1px solid #1C1C1C; text-transform: uppercase; letter-spacing: 0.05em; padding: 10px;">Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  ${productRows}
                </tbody>
              </table>

              <p style="margin: 0 0 10px 0; font-size: 13px; color: #666666; line-height: 1.6;">
                Our packaging advisors are currently reviewing your request. We will contact you shortly through your preferred contact channel.
              </p>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="padding: 30px 40px; background-color: #1C1C1C; text-align: center; font-size: 11px; color: #888888; line-height: 1.6;">
              <p style="margin: 0; color: #FAF9F6; letter-spacing: 0.1em; text-transform: uppercase;">
                Packture International
              </p>
              <p style="margin: 5px 0 0 0;">
                Premium Editorial Packaging & Custom B2B Collections.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

/**
 * Sends a notification email for Work With Us / Business Collaboration to the Packture Sales Team.
 */
export async function sendWorkWithUsNotification(collaboration, referenceNumber) {
  const salesEmail = process.env.PACKTURE_SALES_EMAIL || 'sales@example.com';
  const fromEmail = process.env.PACKTURE_FROM_EMAIL || 'no-reply@example.com';
  const apiKey = process.env.EMAIL_API_KEY;

  const companyName = collaboration.customer?.company?.trim();
  const subject = companyName 
    ? `New Work With Us Enquiry — ${companyName}`
    : `New Work With Us Enquiry — Packture International`;

  const html = getWorkWithUsEmailHtml(collaboration, referenceNumber);

  if (!apiKey) {
    console.log('\n======================================================');
    console.log('--- EMAIL DRY RUN / MOCK MODE (WORK WITH US NOTIFICATION) ---');
    console.log(`To (Sales Target): ${salesEmail}`);
    console.log(`From (Verified Sender): ${fromEmail}`);
    console.log(`Reply-To (Customer): ${collaboration.customer?.email}`);
    console.log(`Subject: ${subject}`);
    console.log('------------------------------------------------------');
    console.log('HTML CONTENT PREVIEW:');
    console.log(html);
    console.log('======================================================\n');
    return { success: true, message: 'Dry run completed successfully.' };
  }

  return sendEmailViaApi({
    to: salesEmail,
    from: fromEmail,
    replyTo: collaboration.customer?.email,
    subject,
    html
  });
}

/**
 * Generates the HTML body for the Work With Us Notification email.
 */
function getWorkWithUsEmailHtml(collaboration, referenceNumber) {
  const timestamp = new Date().toLocaleString('en-US', { timeZoneName: 'short' });
  const collaborationTypes = Array.isArray(collaboration.collaborationTypes)
    ? collaboration.collaborationTypes.join(', ')
    : (collaboration.collaborationType || 'Not Specified');

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Work With Us Enquiry</title>
</head>
<body style="margin: 0; padding: 0; background-color: #FAF9F6; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;">
  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #FAF9F6; padding: 40px 10px;">
    <tr>
      <td align="center">
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #FFFFFF; border: 1px solid #E6DFD3; border-top: 4px solid #C5A880; box-shadow: 0 4px 12px rgba(0,0,0,0.03);">
          <!-- Logo & Brand Header -->
          <tr>
            <td style="padding: 30px 40px; text-align: center; border-bottom: 1px solid #F0ECE3;">
              <h1 style="margin: 0; font-family: Georgia, serif; font-size: 24px; font-weight: 300; letter-spacing: 0.15em; color: #1C1C1C; text-transform: uppercase;">
                Packture International
              </h1>
              <p style="margin: 5px 0 0 0; font-size: 10px; font-family: monospace; letter-spacing: 0.2em; color: #C5A880; text-transform: uppercase;">
                Business Collaboration Enquiry
              </p>
            </td>
          </tr>
          <!-- Main Content -->
          <tr>
            <td style="padding: 40px 40px 30px 40px;">
              <h2 style="margin: 0 0 10px 0; font-family: Georgia, serif; font-size: 18px; font-weight: normal; color: #1C1C1C; letter-spacing: 0.05em; text-transform: uppercase;">
                NEW WORK WITH US ENQUIRY
              </h2>
              <p style="margin: 0 0 25px 0; font-size: 13px; color: #666666; line-height: 1.5;">
                A new business collaboration enquiry has been submitted through the Work With Us portal. The submitted details are outlined below.
              </p>
              
              <!-- Reference Card -->
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #FAF9F6; border: 1px solid #F0ECE3; margin-bottom: 30px;">
                <tr>
                  <td style="padding: 15px; text-align: center;">
                    <span style="display: block; font-size: 9px; font-family: monospace; text-transform: uppercase; letter-spacing: 0.15em; color: #888888; margin-bottom: 4px;">
                      Reference Number
                    </span>
                    <span style="font-size: 18px; font-family: monospace; font-weight: bold; color: #C5A880; letter-spacing: 0.1em;">
                      ${escapeHtml(referenceNumber)}
                    </span>
                  </td>
                </tr>
              </table>

              <!-- Contact Details -->
              <h3 style="margin: 0 0 12px 0; font-size: 10px; font-family: monospace; text-transform: uppercase; letter-spacing: 0.2em; color: #C5A880; border-bottom: 1px solid #F0ECE3; padding-bottom: 6px;">
                CONTACT DETAILS
              </h3>
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 30px; font-size: 13px; line-height: 1.6; color: #444444;">
                <tr>
                  <td width="35%" style="padding: 4px 0; font-weight: bold; color: #666666; font-family: monospace; font-size: 11px; text-transform: uppercase;">Full Name:</td>
                  <td style="padding: 4px 0; color: #1C1C1C;">${escapeHtml(collaboration.customer?.name)}</td>
                </tr>
                <tr>
                  <td style="padding: 4px 0; font-weight: bold; color: #666666; font-family: monospace; font-size: 11px; text-transform: uppercase;">Company Name:</td>
                  <td style="padding: 4px 0; color: #1C1C1C;">${escapeHtml(collaboration.customer?.company)}</td>
                </tr>
                <tr>
                  <td style="padding: 4px 0; font-weight: bold; color: #666666; font-family: monospace; font-size: 11px; text-transform: uppercase;">Business Email:</td>
                  <td style="padding: 4px 0;"><a href="mailto:${escapeHtml(collaboration.customer?.email)}" style="color: #C5A880; text-decoration: none;">${escapeHtml(collaboration.customer?.email)}</a></td>
                </tr>
                <tr>
                  <td style="padding: 4px 0; font-weight: bold; color: #666666; font-family: monospace; font-size: 11px; text-transform: uppercase;">Phone / WhatsApp:</td>
                  <td style="padding: 4px 0; color: #1C1C1C;">${collaboration.customer?.phone ? escapeHtml(collaboration.customer.phone) : 'Not Provided'}</td>
                </tr>
                <tr>
                  <td style="padding: 4px 0; font-weight: bold; color: #666666; font-family: monospace; font-size: 11px; text-transform: uppercase;">Country:</td>
                  <td style="padding: 4px 0; color: #1C1C1C;">${escapeHtml(collaboration.customer?.country)}</td>
                </tr>
              </table>

              <!-- Business Information -->
              <h3 style="margin: 0 0 12px 0; font-size: 10px; font-family: monospace; text-transform: uppercase; letter-spacing: 0.2em; color: #C5A880; border-bottom: 1px solid #F0ECE3; padding-bottom: 6px;">
                BUSINESS INFORMATION
              </h3>
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 30px; font-size: 13px; line-height: 1.6; color: #444444;">
                <tr>
                  <td width="35%" style="padding: 4px 0; font-weight: bold; color: #666666; font-family: monospace; font-size: 11px; text-transform: uppercase;">Business / Industry:</td>
                  <td style="padding: 4px 0; color: #1C1C1C;">${escapeHtml(collaboration.business?.industry)}</td>
                </tr>
                <tr>
                  <td width="35%" style="padding: 4px 0; font-weight: bold; color: #666666; font-family: monospace; font-size: 11px; text-transform: uppercase;">Website / Company URL:</td>
                  <td style="padding: 4px 0; color: #1C1C1C;">${collaboration.business?.website ? `<a href="${escapeHtml(collaboration.business.website)}" target="_blank" style="color: #C5A880; text-decoration: none;">${escapeHtml(collaboration.business.website)}</a>` : 'Not Provided'}</td>
                </tr>
                <tr>
                  <td width="35%" style="padding: 4px 0; font-weight: bold; color: #666666; font-family: monospace; font-size: 11px; text-transform: uppercase;">Role / Position:</td>
                  <td style="padding: 4px 0; color: #1C1C1C;">${collaboration.business?.role ? escapeHtml(collaboration.business.role) : 'Not Provided'}</td>
                </tr>
              </table>

              <!-- Collaboration Interest -->
              <h3 style="margin: 0 0 12px 0; font-size: 10px; font-family: monospace; text-transform: uppercase; letter-spacing: 0.2em; color: #C5A880; border-bottom: 1px solid #F0ECE3; padding-bottom: 6px;">
                COLLABORATION INTEREST
              </h3>
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 30px; font-size: 13px; line-height: 1.6; color: #444444;">
                <tr>
                  <td width="35%" style="padding: 4px 0; font-weight: bold; color: #666666; font-family: monospace; font-size: 11px; text-transform: uppercase;">Collaboration Type:</td>
                  <td style="padding: 4px 0; color: #1C1C1C; font-weight: bold;">${escapeHtml(collaborationTypes)}</td>
                </tr>
              </table>

              <!-- Collaboration Details -->
              <h3 style="margin: 0 0 12px 0; font-size: 10px; font-family: monospace; text-transform: uppercase; letter-spacing: 0.2em; color: #C5A880; border-bottom: 1px solid #F0ECE3; padding-bottom: 6px;">
                COLLABORATION DETAILS
              </h3>
              <div style="background-color: #FAF9F6; border: 1px solid #F0ECE3; padding: 20px; font-size: 13px; color: #1C1C1C; line-height: 1.6; white-space: pre-wrap; font-family: Georgia, serif; margin-bottom: 30px;">${escapeHtml(collaboration.requirements)}</div>

              <!-- Preferred Contact -->
              <h3 style="margin: 0 0 12px 0; font-size: 10px; font-family: monospace; text-transform: uppercase; letter-spacing: 0.2em; color: #C5A880; border-bottom: 1px solid #F0ECE3; padding-bottom: 6px;">
                PREFERRED CONTACT
              </h3>
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 10px; font-size: 13px; line-height: 1.6; color: #444444;">
                <tr>
                  <td width="35%" style="padding: 4px 0; font-weight: bold; color: #666666; font-family: monospace; font-size: 11px; text-transform: uppercase;">Preferred Method:</td>
                  <td style="padding: 4px 0; color: #1C1C1C; font-weight: bold;">${escapeHtml(collaboration.preferredContact || 'Email')}</td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="padding: 30px 40px; background-color: #1C1C1C; text-align: center; font-size: 11px; color: #888888; line-height: 1.6;">
              <p style="margin: 0; color: #FAF9F6; letter-spacing: 0.1em; text-transform: uppercase;">
                Packture International
              </p>
              <p style="margin: 5px 0 0 0;">
                This enquiry was dispatched from the B2B platform integration server.
              </p>
              <p style="margin: 5px 0 0 0; font-family: monospace; font-size: 9px; color: #666666;">
                Submitted on: ${escapeHtml(timestamp)}
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

/**
 * Sends a notification email for a Custom Project enquiry to the Packture Sales Team.
 */
export async function sendCustomProjectNotification(customProject, referenceNumber) {
  const salesEmail = process.env.PACKTURE_SALES_EMAIL || 'sales@example.com';
  const fromEmail = process.env.PACKTURE_FROM_EMAIL || 'no-reply@example.com';
  const apiKey = process.env.EMAIL_API_KEY;

  const companyName = customProject.customer?.company || customProject.customer?.companyName || '';
  const subject = companyName 
    ? `New Custom Project Enquiry — ${companyName}`
    : `New Custom Project Enquiry — Packture International`;

  const html = getCustomProjectEmailHtml(customProject, referenceNumber);

  if (!apiKey) {
    console.log('\n======================================================');
    console.log('--- EMAIL DRY RUN / MOCK MODE (CUSTOM PROJECT NOTIFICATION) ---');
    console.log(`To (Sales Target): ${salesEmail}`);
    console.log(`From (Verified Sender): ${fromEmail}`);
    console.log(`Reply-To (Customer): ${customProject.customer?.email}`);
    console.log(`Subject: ${subject}`);
    console.log('------------------------------------------------------');
    console.log('HTML CONTENT PREVIEW:');
    console.log(html);
    console.log('======================================================\n');
    return { success: true, message: 'Dry run completed successfully.' };
  }

  return sendEmailViaApi({
    to: salesEmail,
    from: fromEmail,
    replyTo: customProject.customer?.email,
    subject,
    html
  });
}

/**
 * Generates the HTML body for the Custom Project Notification email.
 */
function getCustomProjectEmailHtml(customProject, referenceNumber) {
  const timestamp = new Date().toLocaleString('en-US', { timeZoneName: 'short' });
  const isCustomization = customProject.customization?.required ? 'YES' : 'NO';

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Custom Project Enquiry</title>
</head>
<body style="margin: 0; padding: 0; background-color: #FAF9F6; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;">
  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #FAF9F6; padding: 40px 10px;">
    <tr>
      <td align="center">
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #FFFFFF; border: 1px solid #E6DFD3; border-top: 4px solid #C5A880; box-shadow: 0 4px 12px rgba(0,0,0,0.03);">
          <!-- Logo & Brand Header -->
          <tr>
            <td style="padding: 30px 40px; text-align: center; border-bottom: 1px solid #F0ECE3;">
              <h1 style="margin: 0; font-family: Georgia, serif; font-size: 24px; font-weight: 300; letter-spacing: 0.15em; color: #1C1C1C; text-transform: uppercase;">
                PACKTURE INTERNATIONAL
              </h1>
              <p style="margin: 5px 0 0 0; font-size: 10px; font-family: monospace; letter-spacing: 0.2em; color: #C5A880; text-transform: uppercase;">
                Custom Packaging Enquiry
              </p>
            </td>
          </tr>
          <!-- Main Content -->
          <tr>
            <td style="padding: 40px 40px 30px 40px;">
              <h2 style="margin: 0 0 10px 0; font-family: Georgia, serif; font-size: 18px; font-weight: normal; color: #1C1C1C; letter-spacing: 0.05em; text-transform: uppercase;">
                NEW CUSTOM PROJECT ENQUIRY
              </h2>
              <p style="margin: 0 0 25px 0; font-size: 13px; color: #666666; line-height: 1.5;">
                A new bespoke custom packaging project enquiry has been submitted. The submitted specifications are detailed below.
              </p>
              
              <!-- Reference Card -->
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #FAF9F6; border: 1px solid #F0ECE3; margin-bottom: 30px;">
                <tr>
                  <td style="padding: 15px; text-align: center;">
                    <span style="display: block; font-size: 9px; font-family: monospace; text-transform: uppercase; letter-spacing: 0.15em; color: #888888; margin-bottom: 4px;">
                      Reference Number
                    </span>
                    <span style="font-size: 18px; font-family: monospace; font-weight: bold; color: #C5A880; letter-spacing: 0.1em;">
                      ${escapeHtml(referenceNumber)}
                    </span>
                  </td>
                </tr>
              </table>

              <!-- Contact Details -->
              <h3 style="margin: 0 0 12px 0; font-size: 10px; font-family: monospace; text-transform: uppercase; letter-spacing: 0.2em; color: #C5A880; border-bottom: 1px solid #F0ECE3; padding-bottom: 6px;">
                CONTACT DETAILS
              </h3>
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 30px; font-size: 13px; line-height: 1.6; color: #444444;">
                <tr>
                  <td width="38%" style="padding: 4px 0; font-weight: bold; color: #666666; font-family: monospace; font-size: 11px; text-transform: uppercase;">Full Name:</td>
                  <td style="padding: 4px 0; color: #1C1C1C;">${escapeHtml(customProject.customer?.name)}</td>
                </tr>
                <tr>
                  <td style="padding: 4px 0; font-weight: bold; color: #666666; font-family: monospace; font-size: 11px; text-transform: uppercase;">Company Name:</td>
                  <td style="padding: 4px 0; color: #1C1C1C;">${escapeHtml(customProject.customer?.company || customProject.customer?.companyName)}</td>
                </tr>
                <tr>
                  <td style="padding: 4px 0; font-weight: bold; color: #666666; font-family: monospace; font-size: 11px; text-transform: uppercase;">Business Email:</td>
                  <td style="padding: 4px 0;"><a href="mailto:${escapeHtml(customProject.customer?.email)}" style="color: #C5A880; text-decoration: none;">${escapeHtml(customProject.customer?.email)}</a></td>
                </tr>
                <tr>
                  <td style="padding: 4px 0; font-weight: bold; color: #666666; font-family: monospace; font-size: 11px; text-transform: uppercase;">Phone / WhatsApp:</td>
                  <td style="padding: 4px 0; color: #1C1C1C;">${customProject.customer?.phone ? escapeHtml(customProject.customer.phone) : 'Not Provided'}</td>
                </tr>
                <tr>
                  <td style="padding: 4px 0; font-weight: bold; color: #666666; font-family: monospace; font-size: 11px; text-transform: uppercase;">Country:</td>
                  <td style="padding: 4px 0; color: #1C1C1C;">${escapeHtml(customProject.customer?.country)}</td>
                </tr>
              </table>

              <!-- Project Details -->
              <h3 style="margin: 0 0 12px 0; font-size: 10px; font-family: monospace; text-transform: uppercase; letter-spacing: 0.2em; color: #C5A880; border-bottom: 1px solid #F0ECE3; padding-bottom: 6px;">
                PROJECT DETAILS
              </h3>
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 30px; font-size: 13px; line-height: 1.6; color: #444444;">
                <tr>
                  <td width="38%" style="padding: 4px 0; font-weight: bold; color: #666666; font-family: monospace; font-size: 11px; text-transform: uppercase;">Project / Product Name:</td>
                  <td style="padding: 4px 0; color: #1C1C1C;">${customProject.project?.name ? escapeHtml(customProject.project.name) : 'Not Specified'}</td>
                </tr>
                <tr>
                  <td style="padding: 4px 0; font-weight: bold; color: #666666; font-family: monospace; font-size: 11px; text-transform: uppercase;">Packaging Type:</td>
                  <td style="padding: 4px 0; color: #1C1C1C;">${customProject.project?.packagingType ? escapeHtml(customProject.project.packagingType) : 'Not Specified'}</td>
                </tr>
                <tr>
                  <td style="padding: 4px 0; font-weight: bold; color: #666666; font-family: monospace; font-size: 11px; text-transform: uppercase;">Estimated Quantity:</td>
                  <td style="padding: 4px 0; color: #1C1C1C;">${customProject.project?.quantity ? escapeHtml(customProject.project.quantity) : 'Not Specified'}</td>
                </tr>
                <tr>
                  <td style="padding: 4px 0; font-weight: bold; color: #666666; font-family: monospace; font-size: 11px; text-transform: uppercase;">Expected Timeline:</td>
                  <td style="padding: 4px 0; color: #1C1C1C;">${customProject.project?.timeline ? escapeHtml(customProject.project.timeline) : 'Not Specified'}</td>
                </tr>
              </table>

              <!-- Customization -->
              <h3 style="margin: 0 0 12px 0; font-size: 10px; font-family: monospace; text-transform: uppercase; letter-spacing: 0.2em; color: #C5A880; border-bottom: 1px solid #F0ECE3; padding-bottom: 6px;">
                CUSTOMIZATION
              </h3>
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 30px; font-size: 13px; line-height: 1.6; color: #444444;">
                <tr>
                  <td width="38%" style="padding: 4px 0; font-weight: bold; color: #666666; font-family: monospace; font-size: 11px; text-transform: uppercase;">Customization Required:</td>
                  <td style="padding: 4px 0; color: #1C1C1C; font-weight: bold;">${isCustomization}</td>
                </tr>
                <tr>
                  <td style="padding: 4px 0; font-weight: bold; color: #666666; font-family: monospace; font-size: 11px; text-transform: uppercase;">Dimensions / Size Requirements:</td>
                  <td style="padding: 4px 0; color: #1C1C1C;">${customProject.customization?.dimensions ? escapeHtml(customProject.customization.dimensions) : 'Not Specified'}</td>
                </tr>
                <tr>
                  <td style="padding: 4px 0; font-weight: bold; color: #666666; font-family: monospace; font-size: 11px; text-transform: uppercase;">Material Preference:</td>
                  <td style="padding: 4px 0; color: #1C1C1C;">${customProject.customization?.material ? escapeHtml(customProject.customization.material) : 'Not Specified'}</td>
                </tr>
                <tr>
                  <td style="padding: 4px 0; font-weight: bold; color: #666666; font-family: monospace; font-size: 11px; text-transform: uppercase;">Finishing / Printing Requirements:</td>
                  <td style="padding: 4px 0; color: #1C1C1C;">${customProject.customization?.finishing ? escapeHtml(customProject.customization.finishing) : 'Not Specified'}</td>
                </tr>
              </table>

              <!-- Project Requirements -->
              <h3 style="margin: 0 0 12px 0; font-size: 10px; font-family: monospace; text-transform: uppercase; letter-spacing: 0.2em; color: #C5A880; border-bottom: 1px solid #F0ECE3; padding-bottom: 6px;">
                PROJECT REQUIREMENTS
              </h3>
              <div style="background-color: #FAF9F6; border: 1px solid #F0ECE3; padding: 20px; font-size: 13px; color: #1C1C1C; line-height: 1.6; white-space: pre-wrap; font-family: Georgia, serif; margin-bottom: 30px;">${escapeHtml(customProject.requirements)}</div>

              <!-- Preferred Contact Method -->
              <h3 style="margin: 0 0 12px 0; font-size: 10px; font-family: monospace; text-transform: uppercase; letter-spacing: 0.2em; color: #C5A880; border-bottom: 1px solid #F0ECE3; padding-bottom: 6px;">
                PREFERRED CONTACT METHOD
              </h3>
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 10px; font-size: 13px; line-height: 1.6; color: #444444;">
                <tr>
                  <td width="38%" style="padding: 4px 0; font-weight: bold; color: #666666; font-family: monospace; font-size: 11px; text-transform: uppercase;">Preferred Method:</td>
                  <td style="padding: 4px 0; color: #1C1C1C; font-weight: bold;">${escapeHtml(customProject.preferredContact || 'Email')}</td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="padding: 30px 40px; background-color: #1C1C1C; text-align: center; font-size: 11px; color: #888888; line-height: 1.6;">
              <p style="margin: 0; color: #FAF9F6; letter-spacing: 0.1em; text-transform: uppercase;">
                PACKTURE INTERNATIONAL
              </p>
              <p style="margin: 5px 0 0 0;">
                This custom project enquiry was dispatched from the B2B platform integration server.
              </p>
              <p style="margin: 5px 0 0 0; font-family: monospace; font-size: 9px; color: #666666;">
                Submitted on: ${escapeHtml(timestamp)}
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

/**
 * Sends a notification email for a Contact Page Inquiry to the Packture Sales Team.
 */
export async function sendContactInquiryNotification(inquiry, referenceNumber) {
  const salesEmail = process.env.PACKTURE_SALES_EMAIL || 'sales@example.com';
  const fromEmail = process.env.PACKTURE_FROM_EMAIL || 'no-reply@example.com';
  const apiKey = process.env.EMAIL_API_KEY;

  const companyName = inquiry.customer?.company || inquiry.customer?.companyName || '';
  const subject = companyName 
    ? `New Contact Inquiry — ${companyName}`
    : `New Contact Inquiry — Packture International`;

  const html = getContactInquiryEmailHtml(inquiry, referenceNumber);

  if (!apiKey) {
    console.log('\n======================================================');
    console.log('--- EMAIL DRY RUN / MOCK MODE (CONTACT INQUIRY NOTIFICATION) ---');
    console.log(`To (Sales Target): ${salesEmail}`);
    console.log(`From (Verified Sender): ${fromEmail}`);
    console.log(`Reply-To (Customer): ${inquiry.customer?.email}`);
    console.log(`Subject: ${subject}`);
    console.log('------------------------------------------------------');
    console.log('HTML CONTENT PREVIEW:');
    console.log(html);
    console.log('======================================================\n');
    return { success: true, message: 'Dry run completed successfully.' };
  }

  return sendEmailViaApi({
    to: salesEmail,
    from: fromEmail,
    replyTo: inquiry.customer?.email,
    subject,
    html
  });
}

/**
 * Generates the HTML body for the Contact Page Inquiry Notification email.
 */
function getContactInquiryEmailHtml(inquiry, referenceNumber) {
  const timestamp = new Date().toLocaleString('en-US', { timeZoneName: 'short' });

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Contact Inquiry</title>
</head>
<body style="margin: 0; padding: 0; background-color: #FAF9F6; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;">
  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #FAF9F6; padding: 40px 10px;">
    <tr>
      <td align="center">
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #FFFFFF; border: 1px solid #E6DFD3; border-top: 4px solid #C5A880; box-shadow: 0 4px 12px rgba(0,0,0,0.03);">
          <!-- Logo & Brand Header -->
          <tr>
            <td style="padding: 30px 40px; text-align: center; border-bottom: 1px solid #F0ECE3;">
              <h1 style="margin: 0; font-family: Georgia, serif; font-size: 24px; font-weight: 300; letter-spacing: 0.15em; color: #1C1C1C; text-transform: uppercase;">
                PACKTURE INTERNATIONAL
              </h1>
              <p style="margin: 5px 0 0 0; font-size: 10px; font-family: monospace; letter-spacing: 0.2em; color: #C5A880; text-transform: uppercase;">
                Contact Inquiry
              </p>
            </td>
          </tr>
          <!-- Main Content -->
          <tr>
            <td style="padding: 40px 40px 30px 40px;">
              <h2 style="margin: 0 0 10px 0; font-family: Georgia, serif; font-size: 18px; font-weight: normal; color: #1C1C1C; letter-spacing: 0.05em; text-transform: uppercase;">
                NEW CONTACT INQUIRY
              </h2>
              <p style="margin: 0 0 25px 0; font-size: 13px; color: #666666; line-height: 1.5;">
                A new inquiry has been submitted through the Contact page form. The submitted details are outlined below.
              </p>
              
              <!-- Reference Card -->
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #FAF9F6; border: 1px solid #F0ECE3; margin-bottom: 30px;">
                <tr>
                  <td style="padding: 15px; text-align: center;">
                    <span style="display: block; font-size: 9px; font-family: monospace; text-transform: uppercase; letter-spacing: 0.15em; color: #888888; margin-bottom: 4px;">
                      Reference Number
                    </span>
                    <span style="font-size: 18px; font-family: monospace; font-weight: bold; color: #C5A880; letter-spacing: 0.1em;">
                      ${escapeHtml(referenceNumber)}
                    </span>
                  </td>
                </tr>
              </table>

              <!-- Contact Details -->
              <h3 style="margin: 0 0 12px 0; font-size: 10px; font-family: monospace; text-transform: uppercase; letter-spacing: 0.2em; color: #C5A880; border-bottom: 1px solid #F0ECE3; padding-bottom: 6px;">
                CONTACT DETAILS
              </h3>
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 30px; font-size: 13px; line-height: 1.6; color: #444444;">
                <tr>
                  <td width="35%" style="padding: 4px 0; font-weight: bold; color: #666666; font-family: monospace; font-size: 11px; text-transform: uppercase;">Name:</td>
                  <td style="padding: 4px 0; color: #1C1C1C;">${escapeHtml(inquiry.customer?.name)}</td>
                </tr>
                <tr>
                  <td style="padding: 4px 0; font-weight: bold; color: #666666; font-family: monospace; font-size: 11px; text-transform: uppercase;">Company Name:</td>
                  <td style="padding: 4px 0; color: #1C1C1C;">${escapeHtml(inquiry.customer?.company || inquiry.customer?.companyName)}</td>
                </tr>
                <tr>
                  <td style="padding: 4px 0; font-weight: bold; color: #666666; font-family: monospace; font-size: 11px; text-transform: uppercase;">Business Email:</td>
                  <td style="padding: 4px 0;"><a href="mailto:${escapeHtml(inquiry.customer?.email)}" style="color: #C5A880; text-decoration: none;">${escapeHtml(inquiry.customer?.email)}</a></td>
                </tr>
                <tr>
                  <td style="padding: 4px 0; font-weight: bold; color: #666666; font-family: monospace; font-size: 11px; text-transform: uppercase;">Contact Phone:</td>
                  <td style="padding: 4px 0; color: #1C1C1C;">${escapeHtml(inquiry.customer?.phone)}</td>
                </tr>
              </table>

              <!-- Message / Project Scope -->
              <h3 style="margin: 0 0 12px 0; font-size: 10px; font-family: monospace; text-transform: uppercase; letter-spacing: 0.2em; color: #C5A880; border-bottom: 1px solid #F0ECE3; padding-bottom: 6px;">
                MESSAGE / PROJECT SCOPE
              </h3>
              <div style="background-color: #FAF9F6; border: 1px solid #F0ECE3; padding: 20px; font-size: 13px; color: #1C1C1C; line-height: 1.6; white-space: pre-wrap; font-family: Georgia, serif; margin-bottom: 20px;">${escapeHtml(inquiry.message || inquiry.requirements)}</div>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="padding: 30px 40px; background-color: #1C1C1C; text-align: center; font-size: 11px; color: #888888; line-height: 1.6;">
              <p style="margin: 0; color: #FAF9F6; letter-spacing: 0.1em; text-transform: uppercase;">
                PACKTURE INTERNATIONAL
              </p>
              <p style="margin: 5px 0 0 0;">
                This inquiry was dispatched from the B2B platform contact form.
              </p>
              <p style="margin: 5px 0 0 0; font-family: monospace; font-size: 9px; color: #666666;">
                Submitted on: ${escapeHtml(timestamp)}
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

