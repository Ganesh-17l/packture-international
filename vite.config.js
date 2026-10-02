import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Load environment variables locally and assign to process.env
const env = loadEnv('', process.cwd(), '');
process.env = { ...process.env, ...env };

import { handleQuoteRequest } from './api/quote-request-handler.js'

// Simple local body-stream reader
const readBody = (req) => new Promise((resolve, reject) => {
  let body = '';
  req.on('data', chunk => { body += chunk; });
  req.on('end', () => {
    try {
      resolve(body ? JSON.parse(body) : {});
    } catch (e) {
      reject(e);
    }
  });
  req.on('error', reject);
});

// Vite plugin to local-route POST /api/quote-request
const quoteApiPlugin = () => {
  const handler = async (req, res, next) => {
    const url = req.url.split('?')[0];
    if (url === '/api/quote-request' && req.method === 'POST') {
      try {
        const body = await readBody(req);
        
        const mockRes = {
          setHeader(name, value) {
            res.setHeader(name, value);
            return this;
          },
          status(code) {
            res.statusCode = code;
            return this;
          },
          json(data) {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(data));
            return this;
          }
        };

        const mockReq = {
          method: req.method,
          headers: req.headers,
          body: body,
          socket: req.socket
        };

        await handleQuoteRequest(mockReq, mockRes);
      } catch (err) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ 
          success: false, 
          message: "We couldn't send your request right now. Please try again." 
        }));
      }
      return;
    }

    if (url === '/api/collaboration-request' && req.method === 'POST') {
      try {
        const body = await readBody(req);
        body.type = body.type || 'work-with-us';
        
        const mockRes = {
          setHeader(name, value) {
            res.setHeader(name, value);
            return this;
          },
          status(code) {
            res.statusCode = code;
            return this;
          },
          json(data) {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(data));
            return this;
          }
        };

        const mockReq = {
          method: req.method,
          headers: req.headers,
          body: body,
          socket: req.socket
        };

        await handleQuoteRequest(mockReq, mockRes);
      } catch (err) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ 
          success: false, 
          message: "Unable to submit your enquiry right now. Please try again." 
        }));
      }
      return;
    }
    next();
  };

  return {
    name: 'quote-request-api',
    configureServer(server) {
      server.middlewares.use(handler);
    },
    configurePreviewServer(server) {
      server.middlewares.use(handler);
    }
  };
};

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    quoteApiPlugin()
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/three')) {
            return 'vendor-three';
          }
          if (id.includes('node_modules/framer-motion')) {
            return 'vendor-framer';
          }
        }
      }
    }
  },
  server: {
    host: true,
    port: 5173,
    allowedHosts: true,
    hmr: {
      clientPort: 443
    }
  },
  preview: {
    host: true,
    port: 5173,
    allowedHosts: true
  }
})
