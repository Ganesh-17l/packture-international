import { useState, useEffect } from 'react';
import { CATEGORIES, PRODUCTS } from '../data/products';

const BASE_URL = 'https://packtureinternational.com';
const DEFAULT_IMAGE = `${BASE_URL}/logo.png`;

// Helper: update or create <meta> tag by name or property
function updateMetaTag(attrName, attrValue, content) {
  let meta = document.querySelector(`meta[${attrName}="${attrValue}"]`);
  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute(attrName, attrValue);
    document.head.appendChild(meta);
  }
  meta.content = content;
}

// Helper: update or create canonical link
function updateCanonical(url) {
  let link = document.querySelector('link[rel="canonical"]');
  if (!link) {
    link = document.createElement('link');
    link.rel = 'canonical';
    document.head.appendChild(link);
  }
  link.href = url;
}

// Helper: update or remove dynamic page JSON-LD schema
function updateDynamicSchema(id, schemaObj) {
  let script = document.getElementById(id);
  if (!schemaObj) {
    if (script) script.remove();
    return;
  }
  if (!script) {
    script = document.createElement('script');
    script.id = id;
    script.type = 'application/ld+json';
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(schemaObj);
}

// Helper: normalize pathname for robust route matching (strips trailing slashes, handles multiple slashes)
function normalizePathname(rawPath) {
  if (!rawPath || typeof rawPath !== 'string') return '/';
  const trimmed = rawPath.replace(/\/+$/, '');
  return trimmed === '' ? '/' : trimmed;
}

export function useNavigation() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path) => {
    window.history.pushState({}, '', path);
    setCurrentPath(window.location.pathname);
    // Instant smooth scroll to top on navigation
    window.scrollTo(0, 0);
  };

  // Parse path with normalized pathname for route matching
  const normalizedPath = normalizePathname(currentPath);
  let page = 'home';
  let params = {};

  if (normalizedPath === '/' || normalizedPath === '' || normalizedPath === '/index.html') {
    page = 'home';
  } else if (normalizedPath === '/about') {
    page = 'about';
  } else if (normalizedPath === '/collections') {
    page = 'collections';
  } else if (normalizedPath.startsWith('/collections/')) {
    page = 'collection-detail';
    params.categorySlug = normalizedPath.substring('/collections/'.length);
  } else if (normalizedPath.startsWith('/products/')) {
    page = 'product-detail';
    params.productSlug = normalizedPath.substring('/products/'.length);
  } else if (normalizedPath === '/customization') {
    page = 'customization';
  } else if (normalizedPath === '/catalogue') {
    page = 'catalogue';
  } else if (normalizedPath === '/contact') {
    page = 'contact';
  } else {
    page = '404';
  }

  // Manage SEO: Document Title, Meta Description, Canonical, OG Tags, Twitter Cards, JSON-LD
  useEffect(() => {
    let title = 'Packture International | Luxury Packaging Manufacturer India';
    let description = 'World-class B2B packaging solutions for fragrance, cosmetic, beauty and personal-care brands globally. Custom premium glass bottles, dropper assemblies, and squeeze tubes.';
    let ogImage = DEFAULT_IMAGE;
    let pageUrl = `${BASE_URL}${normalizedPath === '/' ? '' : normalizedPath}`;
    let pageType = 'website';
    let breadcrumbSchema = null;
    let productSchema = null;

    switch (page) {
      case 'home':
        title = 'Packture International | Luxury Packaging Manufacturer India';
        description = 'Packture International is a premier B2B manufacturer of luxury perfume glass bottles, droppers, cosmetic jars & tubes in India. Request a custom quote today.';
        break;

      case 'about':
        title = 'About Packture International | Luxury Packaging Factory India';
        description = 'Learn about Packture International\'s manufacturing facility in Erode, Tamil Nadu. Certified B2B manufacturer of luxury glass bottles, jars & custom beauty packaging.';
        breadcrumbSchema = {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          'itemListElement': [
            { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': BASE_URL },
            { '@type': 'ListItem', 'position': 2, 'name': 'About Us', 'item': `${BASE_URL}/about` }
          ]
        };
        break;

      case 'collections':
        title = 'B2B Packaging Collections | Wholesale Glass Bottles & Tubes';
        description = 'Browse Packture International\'s complete directory of wholesale perfume glass bottles, dropper assemblies, cosmetic jars, squeeze tubes, and closures.';
        breadcrumbSchema = {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          'itemListElement': [
            { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': BASE_URL },
            { '@type': 'ListItem', 'position': 2, 'name': 'Collections', 'item': `${BASE_URL}/collections` }
          ]
        };
        break;

      case 'collection-detail': {
        const cat = CATEGORIES.find(c => c.slug === params.categorySlug);
        const catName = cat ? cat.name : (params.categorySlug ? params.categorySlug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') : 'Collection');
        title = `${catName} Wholesale | Packture International`;
        description = cat?.description || `Explore our professional range of ${catName} products. Available sizes, box quantities, colors, and detailed customization options.`;
        if (cat?.image) {
          ogImage = cat.image.startsWith('http') ? cat.image : `${BASE_URL}${cat.image}`;
        }
        breadcrumbSchema = {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          'itemListElement': [
            { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': BASE_URL },
            { '@type': 'ListItem', 'position': 2, 'name': 'Collections', 'item': `${BASE_URL}/collections` },
            { '@type': 'ListItem', 'position': 3, 'name': catName, 'item': pageUrl }
          ]
        };
        break;
      }

      case 'product-detail': {
        const prod = PRODUCTS.find(p => p.slug === params.productSlug);
        const prodName = prod ? prod.name : (params.productSlug ? params.productSlug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') : 'Product');
        const cat = prod ? CATEGORIES.find(c => c.slug === prod.category) : null;
        
        title = `${prodName} — B2B Wholesale Packaging | Packture International`;
        description = prod?.description 
          ? `${prod.description} Available in ${prod.sizes ? prod.sizes.join(', ') : 'custom capacities'}. Factory direct dispatch.` 
          : `View technical specifications, box quantities, sizing, colors, and enquiry options for the ${prodName} luxury bottle.`;
        
        pageType = 'product';
        if (prod?.image) {
          ogImage = prod.image.startsWith('http') ? prod.image : `${BASE_URL}${prod.image}`;
        }

        breadcrumbSchema = {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          'itemListElement': [
            { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': BASE_URL },
            { '@type': 'ListItem', 'position': 2, 'name': 'Collections', 'item': `${BASE_URL}/collections` },
            ...(cat ? [{ '@type': 'ListItem', 'position': 3, 'name': cat.name, 'item': `${BASE_URL}/collections/${cat.slug}` }] : []),
            { '@type': 'ListItem', 'position': cat ? 4 : 3, 'name': prodName, 'item': pageUrl }
          ]
        };

        if (prod) {
          productSchema = {
            '@context': 'https://schema.org',
            '@type': 'Product',
            'name': prod.name,
            'image': ogImage,
            'description': prod.description || `B2B luxury packaging model: ${prod.name}`,
            'brand': {
              '@type': 'Brand',
              'name': 'Packture International'
            },
            'category': prod.subcategory || cat?.name || 'Packaging',
            'material': prod.specifications?.material || 'Glass / Polymer',
            'offers': {
              '@type': 'AggregateOffer',
              'priceCurrency': 'INR',
              'price': '0',
              'priceValidUntil': '2027-12-31',
              'availability': 'https://schema.org/InStock',
              'seller': {
                '@type': 'Organization',
                'name': 'Packture International'
              }
            }
          };
        }
        break;
      }

      case 'customization':
        title = 'Custom Packaging Finishing & Printing | Packture International';
        description = 'Create bespoke cosmetic packaging aligned with your brand identity. Explore luxury gold hot foil stamping, custom frosted finishes, and silk screen printing.';
        breadcrumbSchema = {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          'itemListElement': [
            { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': BASE_URL },
            { '@type': 'ListItem', 'position': 2, 'name': 'Customization', 'item': `${BASE_URL}/customization` }
          ]
        };
        break;

      case 'catalogue':
        title = '2026 Product Catalogue PDF Download | Packture International';
        description = 'Download the official Packture International 2026 Product Catalogue. 76+ pages of detailed bottle dimensions, neck specifications, box quantities & closures.';
        breadcrumbSchema = {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          'itemListElement': [
            { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': BASE_URL },
            { '@type': 'ListItem', 'position': 2, 'name': 'Product Catalogue', 'item': `${BASE_URL}/catalogue` }
          ]
        };
        break;

      case 'contact':
        title = 'Contact Packture International | Packaging Factory Erode, India';
        description = 'Contact Packture International. Production Center: No. 51, Anthiyur Colony, Erode, Tamil Nadu, India - 638501. Phone: +91 74181 73970. Email: packtureinternational@gmail.com.';
        breadcrumbSchema = {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          'itemListElement': [
            { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': BASE_URL },
            { '@type': 'ListItem', 'position': 2, 'name': 'Contact', 'item': `${BASE_URL}/contact` }
          ]
        };
        break;

      default:
        title = 'Page Not Found | Packture International';
        description = 'The requested packaging silhouette or page could not be found.';
    }

    // 1. Primary Page Meta Tags
    document.title = title;
    updateMetaTag('name', 'description', description);
    updateCanonical(pageUrl);

    // 2. Open Graph Tags
    updateMetaTag('property', 'og:title', title);
    updateMetaTag('property', 'og:description', description);
    updateMetaTag('property', 'og:url', pageUrl);
    updateMetaTag('property', 'og:type', pageType);
    updateMetaTag('property', 'og:image', ogImage);
    updateMetaTag('property', 'og:site_name', 'Packture International');

    // 3. Twitter Card Tags
    updateMetaTag('name', 'twitter:card', 'summary_large_image');
    updateMetaTag('name', 'twitter:title', title);
    updateMetaTag('name', 'twitter:description', description);
    updateMetaTag('name', 'twitter:image', ogImage);

    // 4. Structured Data Injection
    updateDynamicSchema('schema-breadcrumbs', breadcrumbSchema);
    updateDynamicSchema('schema-product', productSchema);

  }, [page, currentPath, params.categorySlug, params.productSlug]);

  return { currentPath, page, params, navigate };
}
