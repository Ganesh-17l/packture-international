import { handleQuoteRequest } from './quote-request-handler.js';

export default async function handler(req, res) {
  // Enforce POST method only
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ 
      success: false, 
      message: `Method ${req.method} Not Allowed` 
    });
  }

  return handleQuoteRequest(req, res);
}
