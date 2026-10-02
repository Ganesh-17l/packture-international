# Packture International Product Image System

This directory is the centralized home for all product packaging images and category banner heroes across the Packture International website.

## Directory Structure

All product assets must be organized into their respective categories under `public/assets/products/`:

```
public/assets/products/
├── perfume/       - Fragrance and perfume glass bottles
├── droppers/      - Glass dropper packaging (essential oils, serums)
├── fancy-glass/   - Fancy glass and custom shaped bottles
├── glass-jars/    - Cosmetic glass jars (clear, amber, green, yellow, slant)
├── jars/          - Acrylic and PP jar collections (Acrylic Round, Acrylic Double Wall, PP Double Wall)
├── tubes/         - Skincare squeeze tubes
├── pet/           - Recyclable PET bottles
├── hdpe/          - High-density HDPE packaging
├── airless/       - Airless preservation bottles
├── pumps/         - Dispenser, mist, and trigger pumps
├── closures/      - Screw caps, flip tops, dome caps, Sauvage caps
├── rollons/       - Glass/PET roll-ons and deodorant containers
├── aluminium/     - Sliding and round aluminium tins
├── cosmetics/     - Makeup items, applicators, mascara/eyeliner tubes
└── category/      - Category-level collection hero headers
```

## How to Replace Dummy Placeholders with Real Photos

To update any product image on the active website, follow this simple process:

1. **Locate the target category folder** (e.g., `public/assets/products/perfume/`).
2. **Find the target product filename** (e.g., `monolith.webp`).
3. **Save your high-resolution product photo** as a **WebP** image with the **exact same name** (`monolith.webp`) into that folder, overwriting the dummy placeholder.
4. **Refresh the website.** The image will automatically load across the homepage, collection grids, details pages, search results, and enquiry sheets.
5. *(Optional)* Update the status in `src/data/productImageInventory.js` from `"placeholder"` to `"final"` for internal tracking.

## Optional Editorial Hover Images

To enable the premium hover cross-fade feature for a product:
1. Save your main product photo as `[slug].webp` (e.g., `monolith.webp`).
2. Save your editorial/lifestyle product photo in the same folder as `[slug]-editorial.webp` (e.g., `monolith-editorial.webp`).
3. The React image component will automatically detect the presence of the editorial image and enable the smooth hover reveal transition.

## Naming Conventions & Requirements

- **Filenames**: Always use the product slug defined in `src/data/products.js`. Do not include spaces, capitals, or special characters. Use dashes (e.g. `15ml-tall-perfume.webp`).
- **Format**: All images must be in **WebP** format. WebP provides superior compression and transparency support for crisp, fast-loading pages.
- **Dimensions**: Use square aspect ratios, ideally **1200 x 1200 pixels** (minimum 800 x 800 pixels).
- **Backgrounds**: Products should be photographed or rendered on clean, professional, isolated backgrounds (warm ivory, soft beige, or transparent) to match the luxury design system.
- **Aesthetic Guidelines**: 
  - **DO NOT** use AI-generated product images.
  - **DO NOT** use low-resolution PDF scans.
  - **DO NOT** use generic stock illustrations or generic vector SVGs.
  - Ensure the product is centered and fits neatly within the frame with comfortable margins (avoid edge cropping).
