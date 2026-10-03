# Packture International

Premium B2B packaging website for Packture International — collections, product catalogue, 3D visualization and enquiry platform.

This is the official digital product showcase and catalogue experience for Packture International, focused on premium B2B packaging solutions across luxury cosmetics, fragrance, rigid boxes, sustainable paper, and custom industrial packaging.

## Features

- **Premium Responsive B2B Website**: Modern corporate and luxury aesthetic designed for enterprise and retail brands.
- **Product Collections**: Curated showcases covering luxury fragrance, skincare cosmetics, rigid gift boxes, sustainable packaging, and more.
- **Product Catalogue**: Filterable and searchable multi-category packaging catalogue with real-time specification filters.
- **Product Detail Pages**: In-depth product technical specifications, finish options, capacity matrices, and MOQ details.
- **Product Enquiry & Quote Request Flow**: Interactive multi-step quote request modal with real-time validation and inquiry tracking.
- **Product Specification Information**: Detailed material properties, customisation options, dimensions, and neck finishes.
- **Catalogue PDF Downloads**: Direct downloadable specification sheets and comprehensive brand product brochures.
- **3D/WebGL Product Visualization**: Interactive Three.js 3D packaging visualizer showcasing realistic material rendering, rotation, and lighting.
- **Responsive Mobile Experience**: Fluid layouts optimized across mobile, tablet, desktop, and ultra-wide screens.
- **SEO Metadata**: Semantic HTML structure, OpenGraph meta tags, and structured heading hierarchy.
- **Accessibility & Reduced-Motion Support**: Built with ARIA standards, keyboard navigation, and `prefers-reduced-motion` compliance.
- **Serverless Enquiry API**: Robust serverless endpoints handling B2B quote inquiries with automated email dispatch and dry-run safety modes.
- **Production Deployment via Vercel**: Optimized build target configured for edge caching and serverless API execution.

## Technology Stack

- **React 19** — Frontend UI library
- **Vite 8** — Fast modern build tooling and development server
- **JavaScript (ES Modules)** — Application logic and state management
- **Three.js** — Interactive 3D/WebGL packaging viewport and models
- **Framer Motion** — Micro-interactions, transitions, and scroll animations
- **Tailwind CSS & Vanilla CSS** — High-performance utility styling and custom luxury theme design system
- **Lucide React** — Crisp vector iconography
- **Vercel Serverless Functions** — Serverless API endpoints for secure backend email dispatch
- **Oxlint** — High-speed JavaScript and JSX code linter

## Project Structure

```text
├── public/                 # Static assets (3D GLTF/GLB models, brand imagery, catalogue PDFs, icons)
├── src/                    # Frontend application source code
│   ├── assets/             # Core visual assets and logos
│   ├── components/         # Reusable UI components (navigation, layout, modal, buttons)
│   ├── data/               # Product collections, technical specifications, and imagery registries
│   ├── pages/              # Main route views (Home, Catalogue, ProductDetail, About, Contact)
│   ├── sections/           # High-impact section components (3D showcase, material wall, hero)
│   └── styles/             # Global CSS and Tailwind design tokens
└── api/                    # Vercel serverless function handlers & services
    ├── quote-request.js    # Public quote submission API endpoint
    ├── quote-request-handler.js # Request validation, sanitization, and dispatch router
    └── services/           # Backend email dispatch services (Resend / SendGrid / dry-run)
```

- **`public/`**: Contains static assets served directly at the root, including 3D model assets (`.glb`), product photography, brand icons, and client-downloadable PDF catalogues.
- **`src/`**: Houses the core React application code, UI components, pages, design systems, and client-side data stores.
- **`api/`**: Contains serverless functions deployed to Vercel's edge/serverless runtime to securely handle quote requests and email notifications without exposing API secrets to the client.

## Local Development

Install project dependencies:

```bash
npm install
```

Start the local development server:

```bash
npm run dev
```

Open your browser at the local server address (default: `http://localhost:5173`).

## Production Build

Generate the optimized production bundle:

```bash
npm run build
```

The output will be created in the `dist/` directory ready for deployment.

To preview the production build locally:

```bash
npm run preview
```

## Lint

Run code verification and linting:

```bash
npm run lint
```

## Environment Variables

Sensitive production credentials must **NEVER** be committed to GitHub.

Use `.env.example` as the reference template for environment configuration:

```bash
cp .env.example .env
```

The project utilizes the following environment variables (server-side only):

- `EMAIL_API_KEY`: Server-side API key for the transactional email provider (e.g., Resend or SendGrid).
- `PACKTURE_SALES_EMAIL`: Destination email address for receiving customer quote notifications (e.g., `sales@example.com`).
- `PACKTURE_FROM_EMAIL`: Verified sender address authorized on your email provider domain (e.g., `quotes@yourdomain.com`).
- `EMAIL_PROVIDER`: *(Optional)* Provider selection (`resend` or `sendgrid`, defaults to `resend`).
- `SEND_CUSTOMER_CONFIRMATION`: *(Optional)* Toggle sending confirmation receipt to customer (`true` or `false`).

> [!WARNING]
> Never put real credentials or production keys in `README.md` or version-controlled files. Use placeholders only.

## Deployment

Production deployment is configured for **Vercel**.

When connecting this repository to Vercel:

1. Import the repository into your Vercel account.
2. Ensure the Framework Preset is detected as **Vite**.
3. Configure your production environment variables in:
   **Vercel → Project → Settings → Environment Variables**
4. Deploy the project. The frontend SPA and serverless API functions under `api/` will be built and deployed automatically.

## Security

- **`.env` files are ignored**: All local `.env` and `.env.*` files are excluded in `.gitignore` (with explicit exemption for `.env.example`).
- **Secrets must remain outside Git**: Never commit API keys, authentication tokens, or private credentials.
- **Production secrets belong in Vercel**: All operational secrets must only be stored within Vercel's encrypted Environment Variables management console.
- **No Client-Side Leaks**: Never expose server-side email API credentials in frontend code (`src/`). All sensitive email communications are isolated within the `api/` serverless functions.
- **Dry-Run Safe Mode**: If `EMAIL_API_KEY` is omitted in development, the API safely simulates submission in dry-run mode without crashing.

## Production Status

The application has successfully completed production QA and is fully prepared for production deployment. Live transactional email delivery should be verified in the production environment once Vercel Environment Variables are configured.

## License / Usage

Proprietary — All rights reserved.

The source code, product designs, 3D assets, imagery, and branding materials contained in this repository are confidential and proprietary business assets of Packture International. Unauthorized reproduction, distribution, or commercial use without prior written authorization is strictly prohibited.
