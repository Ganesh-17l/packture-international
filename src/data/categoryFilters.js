/**
 * Category-specific smart filter definitions for all 14 packaging collections.
 * Tailored to genuine B2B product differentiators (Dropper Types, Silhouettes, Jar Styles, Tube Applicators, etc.)
 */

export const CATEGORY_FILTERS = {
  // 1. GLASS DROPPER PACKAGING
  'dropper-packaging': {
    filters: [
      {
        id: 'type',
        label: 'Dropper Type',
        isPrimaryPill: true,
        options: [
          { label: 'All Types', value: 'all' },
          { label: 'Serum & Essential Droppers', value: 'serum', match: p => p.name.includes('Serum') || p.name.includes('Essential') },
          { label: 'Tincture & Amber Droppers', value: 'tincture', match: p => p.name.includes('Tincture') || (p.name.includes('Amber') && !p.name.includes('Frosted')) },
          { label: 'Frosted Glass Droppers', value: 'frosted', match: p => p.name.includes('Frosted') },
          { label: 'Coloured Glass Droppers', value: 'coloured', match: p => p.name.includes('Blue') || p.name.includes('Green') || p.name.includes('Orange') },
          { label: 'Custom & Solid Droppers', value: 'custom', match: p => p.name.includes('Customized') }
        ]
      },
      {
        id: 'finish',
        label: 'Glass Tone / Finish',
        isPrimaryPill: false,
        options: [
          { label: 'All Finishes', value: 'all' },
          { label: 'Clear Glass', value: 'clear', match: p => p.name.includes('Clear') || p.colours?.some(c => c.toLowerCase().includes('clear')) },
          { label: 'Amber (UV Protection)', value: 'amber', match: p => p.name.includes('Amber') || p.colours?.some(c => c.toLowerCase().includes('amber')) },
          { label: 'Frosted Glass', value: 'frosted', match: p => p.name.includes('Frosted') || p.colours?.some(c => c.toLowerCase().includes('frosted')) },
          { label: 'Cobalt Blue', value: 'blue', match: p => p.name.includes('Blue') || p.colours?.some(c => c.toLowerCase().includes('blue')) },
          { label: 'Emerald Green', value: 'green', match: p => p.name.includes('Green') || p.colours?.some(c => c.toLowerCase().includes('green')) },
          { label: 'Orange / Coral', value: 'orange', match: p => p.name.includes('Orange') || p.colours?.some(c => c.toLowerCase().includes('orange')) },
          { label: 'Custom Solid / Frosted', value: 'custom', match: p => p.name.includes('Customized') || p.colours?.some(c => c.toLowerCase().includes('custom')) }
        ]
      }
    ]
  },

  // 2. PERFUME GLASS BOTTLES
  'perfume-glass-bottles': {
    filters: [
      {
        id: 'style',
        label: 'Bottle Silhouette',
        isPrimaryPill: true,
        options: [
          { label: 'All Silhouettes', value: 'all' },
          { label: 'Monolith & Rectangular', value: 'rectangular', match: p => ['p5', 'p6', 'p13', 'p23'].includes(p.id) || p.name.includes('Monolith') || p.name.includes('Square') || p.name.includes('Victor') },
          { label: 'Curved & Soft Shoulder', value: 'curved', match: p => ['p3', 'p4', 'p22', 'p20', 'p21'].includes(p.id) || p.name.includes('Cyril') || p.name.includes('Amore') || p.name.includes('Moon') || p.name.includes('Lumiere') || p.name.includes('Beau') },
          { label: 'Tall & Cylindrical', value: 'tall', match: p => ['p1', 'p2', 'p7', 'p8', 'p9', 'p10', 'p11', 'p12', 'p14'].includes(p.id) || p.name.includes('Tall') || p.name.includes('Toll') || p.name.includes('Saab') || p.name.includes('Vision') || p.name.includes('Quest') || p.name.includes('Micron') || p.name.includes('Mono') || p.name.includes('Raymond') || p.name.includes('VG') },
          { label: 'Luxury Heavy Base', value: 'luxury', match: p => ['p15', 'p16', 'p17', 'p18', 'p19'].includes(p.id) || p.name.includes('Galatic') || p.name.includes('Galaxy') || p.name.includes('Rennes') || p.name.includes('Mount') || p.name.includes('Titanic') },
          { label: 'Miniature & Travel Vials', value: 'sampler', match: p => ['p23', 'p24'].includes(p.id) || p.name.includes('Vial') || p.name.includes('8ML') }
        ]
      },
      {
        id: 'capacity',
        label: 'Capacity Range',
        isPrimaryPill: false,
        options: [
          { label: 'All Capacities', value: 'all' },
          { label: 'Travel & Sampler (2ml - 15ml)', value: 'mini', match: p => p.sizes?.some(s => ['2ML', '8ML', '15ML'].includes(s.toUpperCase())) },
          { label: 'Compact (20ml - 30ml)', value: 'compact', match: p => p.sizes?.some(s => ['20ML', '30ML'].includes(s.toUpperCase())) },
          { label: 'Standard (50ml)', value: 'standard', match: p => p.sizes?.some(s => ['50ML'].includes(s.toUpperCase())) },
          { label: 'Prestige (100ml)', value: 'prestige', match: p => p.sizes?.some(s => ['100ML'].includes(s.toUpperCase())) }
        ]
      }
    ]
  },

  // 3. FANCY GLASS BOTTLES
  'fancy-glass-bottles': {
    filters: [
      {
        id: 'type',
        label: 'Bottle Type',
        isPrimaryPill: true,
        options: [
          { label: 'All Types', value: 'all' },
          { label: 'Luxe Serum & Flat Shoulder', value: 'serum', match: p => p.subcategory?.includes('Fancy Glass') || p.name.includes('Serum') || p.name.includes('Geometric') || p.name.includes('Silhouettes') },
          { label: 'Body Glass & Trigger Bottles', value: 'body', match: p => p.subcategory?.includes('Body Glass') || p.name.includes('Body') || p.name.includes('Trigger') || p.name.includes('Claro') || p.name.includes('Luna') },
          { label: 'Designer Perfume Bottles', value: 'perfume', match: p => p.subcategory === 'Perfume Glass Bottle' || p.name.includes('Perfume') },
          { label: 'Roll-On & Attar Bottles', value: 'rollon', match: p => p.subcategory?.includes('Roll On') || p.name.includes('Roll On') || p.name.includes('Attar') }
        ]
      },
      {
        id: 'finish',
        label: 'Glass Tone / Finish',
        isPrimaryPill: false,
        options: [
          { label: 'All Finishes', value: 'all' },
          { label: 'Clear Glass', value: 'clear', match: p => p.colours?.some(c => c.toLowerCase().includes('clear')) || p.name.includes('Clear') },
          { label: 'Amber & UV Protection', value: 'amber', match: p => p.colours?.some(c => c.toLowerCase().includes('amber')) || p.name.includes('Amber') },
          { label: 'Gradient & Colored Lacquer', value: 'gradient', match: p => p.colours?.some(c => c.toLowerCase().includes('gradient') || c.toLowerCase().includes('solid') || c.toLowerCase().includes('pink') || c.toLowerCase().includes('blue') || c.toLowerCase().includes('orange')) || p.name.includes('Colored') || p.name.includes('Gradient') },
          { label: 'Frosted Glass', value: 'frosted', match: p => p.colours?.some(c => c.toLowerCase().includes('frosted')) || p.name.includes('Frosted') }
        ]
      }
    ]
  },

  // 4. COSMETIC GLASS JARS
  'cosmetic-glass-jars': {
    filters: [
      {
        id: 'style',
        label: 'Jar Style',
        isPrimaryPill: true,
        options: [
          { label: 'All Styles', value: 'all' },
          { label: 'Classic Cream Jars', value: 'classic', match: p => !p.name.toLowerCase().includes('slant') },
          { label: 'Signature Slant Jars', value: 'slant', match: p => p.name.toLowerCase().includes('slant') }
        ]
      },
      {
        id: 'finish',
        label: 'Glass Tone & Finish',
        isPrimaryPill: false,
        options: [
          { label: 'All Finishes', value: 'all' },
          { label: 'Clear Flint Glass', value: 'clear', match: p => p.name.includes('Clear Glass') || p.name.includes('Clear Slant') || p.name.includes('Prestige') },
          { label: 'Frosted Clear Glass', value: 'frosted-clear', match: p => p.name.includes('Clear Frosted') },
          { label: 'Amber Glass', value: 'amber', match: p => p.name.includes('Amber Glass') || p.name.includes('Amber Slant') },
          { label: 'Amber Frosted Glass', value: 'amber-frosted', match: p => p.name.includes('Amber Frosted') },
          { label: 'Emerald Green', value: 'green', match: p => p.name.includes('Green') },
          { label: 'Yellow / Warm Amber', value: 'warm', match: p => p.name.includes('Yellow') || p.name.includes('Orange') },
          { label: 'Custom Finish', value: 'custom', match: p => p.name.includes('Customized') || p.name.includes('Signature') }
        ]
      },
      {
        id: 'capacity',
        label: 'Capacity',
        isPrimaryPill: false,
        options: [
          { label: 'All Capacities', value: 'all' },
          { label: 'Sample / Eye Cream (5g - 15g)', value: 'mini', match: p => p.sizes?.some(s => ['5gm', '10gm', '15gm'].includes(s)) },
          { label: 'Medium (20g - 30g)', value: 'medium', match: p => p.sizes?.some(s => ['20gm', '30gm'].includes(s)) },
          { label: 'Full Size (50g - 100g)', value: 'full', match: p => p.sizes?.some(s => ['50gm', '100gm'].includes(s)) }
        ]
      }
    ]
  },

  // 5. COSMETIC TUBES
  'cosmetic-tubes': {
    filters: [
      {
        id: 'type',
        label: 'Applicator & Format',
        isPrimaryPill: true,
        options: [
          { label: 'All Formats', value: 'all' },
          { label: 'Classic Squeeze Tubes', value: 'squeeze', match: p => p.name.includes('Plain White') || p.name.includes('Plain Black') || p.name.includes('Squeeze Tubes') },
          { label: 'Dropper & Precision Tip Tubes', value: 'dropper', match: p => p.name.includes('Dropper') },
          { label: 'Lip & Gloss Tubes', value: 'lip', match: p => p.name.includes('Lip') },
          { label: 'Massage Roller Tubes', value: 'roller', match: p => p.name.includes('Roller') },
          { label: 'Airless PE & Specialty Tubes', value: 'specialty', match: p => p.name.includes('Airless') || p.name.includes('Silicon') || p.name.includes('Hanging') }
        ]
      },
      {
        id: 'finish',
        label: 'Color & Material',
        isPrimaryPill: false,
        options: [
          { label: 'All Finishes', value: 'all' },
          { label: 'White (Matte / Gloss)', value: 'white', match: p => p.name.includes('White') || p.colours?.some(c => c.toLowerCase().includes('white')) },
          { label: 'Black (Matte / Gloss)', value: 'black', match: p => p.name.includes('Black') || p.colours?.some(c => c.toLowerCase().includes('black')) },
          { label: 'Clear / Silicon / Translucent', value: 'clear', match: p => p.name.includes('Silicon') || p.colours?.some(c => c.toLowerCase().includes('transparent') || c.toLowerCase().includes('frosted')) },
          { label: 'Custom Colors / Finishes', value: 'custom', match: p => p.colours?.some(c => c.toLowerCase().includes('custom')) || p.name.includes('Customized') }
        ]
      }
    ]
  },

  // 6. PET PACKAGING
  'pet-packaging': {
    filters: [
      {
        id: 'shape',
        label: 'Bottle Shape & Series',
        isPrimaryPill: true,
        options: [
          { label: 'All Shapes', value: 'all' },
          { label: 'Boston Round', value: 'boston', match: p => p.name.includes('Boston') },
          { label: 'Square & Flat Profiles', value: 'square', match: p => p.name.includes('Square') || p.name.includes('Flat') },
          { label: 'Sleek & Cylindrical', value: 'sleek', match: p => p.name.includes('Sleek') || p.name.includes('JLI') },
          { label: 'Foaming Dispenser Bottles', value: 'foaming', match: p => p.name.includes('Foaming') },
          { label: 'Designer Series (Avon, Belleza, Milan)', value: 'designer', match: p => p.name.includes('Avon') || p.name.includes('Cetra') || p.name.includes('Milan') || p.name.includes('Belleza') }
        ]
      },
      {
        id: 'capacity',
        label: 'Capacity Range',
        isPrimaryPill: false,
        options: [
          { label: 'All Capacities', value: 'all' },
          { label: 'Travel & Sampler (15ml - 50ml)', value: 'travel', match: p => p.sizes?.some(s => ['15ml', '20ml', '30ml', '50ml'].includes(s)) },
          { label: 'Standard Daily (100ml - 300ml)', value: 'standard', match: p => p.sizes?.some(s => ['100ml', '150ml', '200ml', '300ml'].includes(s)) },
          { label: 'Large & Refill (500ml - 1000ml)', value: 'large', match: p => p.sizes?.some(s => ['500ml', '1000ml'].includes(s)) }
        ]
      }
    ]
  },

  // 7. HDPE PACKAGING
  'hdpe-packaging': {
    filters: [
      {
        id: 'model',
        label: 'Bottle Model',
        isPrimaryPill: true,
        options: [
          { label: 'All Models', value: 'all' },
          { label: 'Flat Shaped Series', value: 'flat', match: p => p.name.includes('Flat') },
          { label: 'Nova Series', value: 'nova', match: p => p.name.includes('Nova') },
          { label: 'Round Series', value: 'round', match: p => p.name.includes('Round') },
          { label: 'Jupiter Series', value: 'jupiter', match: p => p.name.includes('Jupiter') },
          { label: 'Venus Series', value: 'venus', match: p => p.name.includes('Venus') },
          { label: 'Tulip Series', value: 'tulip', match: p => p.name.includes('Tulip') },
          { label: 'Vault Series', value: 'vault', match: p => p.name.includes('Vault') },
          { label: 'Pure Series', value: 'pure', match: p => p.name.includes('Pure') },
          { label: 'Square Barni Series', value: 'square-barni', match: p => p.name.includes('Square') || p.name.includes('Barni') },
          { label: 'Jasmine Series', value: 'jasmine', match: p => p.name.includes('Jasmine') },
          { label: 'Cylinder Series', value: 'cylinder', match: p => p.name.includes('Cylinder') },
          { label: 'Tiara Series', value: 'tiara', match: p => p.name.includes('Tiara') }
        ]
      },
      {
        id: 'capacity',
        label: 'Capacity Range',
        isPrimaryPill: false,
        options: [
          { label: 'All Capacities', value: 'all' },
          { label: 'Compact & Travel (50ml - 100ml)', value: 'compact', match: p => p.sizes?.some(s => ['50ml', '100ml'].includes(s)) },
          { label: 'Standard Daily (150ml - 300ml)', value: 'standard', match: p => p.sizes?.some(s => ['150ml', '200ml', '250ml', '300ml'].includes(s)) },
          { label: 'Large Volume (350ml - 1000ml)', value: 'large', match: p => p.sizes?.some(s => ['350ml', '400ml', '500ml', '1000ml'].includes(s)) }
        ]
      }
    ]
  },

  // 8. JAR COLLECTIONS (Acrylic & PP)
  'jar-collections': {
    filters: [
      {
        id: 'collection',
        label: 'Jar Collection Type',
        isPrimaryPill: true,
        options: [
          { label: 'All Collections', value: 'all' },
          { label: 'Acrylic Round Jars', value: 'acrylic-round', match: p => p.slug === 'acrylic-round-jars' || p.name === 'Acrylic Round Jars' },
          { label: 'Acrylic Double Wall Jars', value: 'acrylic-double-wall', match: p => p.slug === 'acrylic-double-wall-jars' || p.name.includes('Acrylic Double Wall') },
          { label: 'PP Double Wall Jars', value: 'pp-double-wall', match: p => p.slug === 'pp-double-wall-jars' || p.name.includes('PP') }
        ]
      },
      {
        id: 'capacity',
        label: 'Capacity',
        isPrimaryPill: false,
        options: [
          { label: 'All Capacities', value: 'all' },
          { label: 'Compact / Eye (5g - 25g)', value: 'compact', match: p => p.sizes?.some(s => ['5g', '8g', '15g', '25g'].includes(s)) },
          { label: 'Standard (30g - 50g)', value: 'standard', match: p => p.sizes?.some(s => ['30gm', '50g', '50gm'].includes(s)) },
          { label: 'Large Volume (100g - 250g)', value: 'large', match: p => p.sizes?.some(s => ['100g Tall', '100g Wide', '100gm', '200g', '250g'].includes(s)) }
        ]
      }
    ]
  },

  // 9. AIRLESS PACKAGING
  'airless-packaging': {
    filters: [
      {
        id: 'format',
        label: 'Container Format',
        isPrimaryPill: true,
        options: [
          { label: 'All Formats', value: 'all' },
          { label: 'Airless Bottles', value: 'bottle', match: p => p.name.includes('Bottle') || p.subcategory === 'Airless Bottle' },
          { label: 'Airless Jars', value: 'jar', match: p => p.name.includes('Jar') || p.subcategory === 'Airless Jar' }
        ]
      }
    ]
  },

  // 10. CAPS & CLOSURES
  'caps-closures': {
    filters: [
      {
        id: 'type',
        label: 'Closure Category',
        isPrimaryPill: true,
        options: [
          { label: 'All Closures', value: 'all' },
          { label: 'Flip Top & Disc Top Caps', value: 'pp-dispensing', match: p => p.name.includes('Flip') || p.name.includes('Disc') || p.name.includes('FTC') || p.name.includes('Bek') || p.name.includes('Kettle') },
          { label: 'Specialty, CRC & Spice Caps', value: 'specialty', match: p => p.name.includes('Spice') || p.name.includes('CRC') || p.name.includes('Bell Shape') || p.name.includes('Volza') }
        ]
      },
      {
        id: 'neckSize',
        label: 'Neck Size & Type',
        isPrimaryPill: false,
        options: [
          { label: 'All Sizes', value: 'all' },
          { label: '14mm - 19mm PP Tubes/Bottles', value: 'small', match: p => p.sizes?.some(s => ['14MM', '15MM', '19MM'].includes(s)) },
          { label: '20mm - 28mm (20/410, 24/410, 28/410)', value: 'medium', match: p => p.sizes?.some(s => ['20MM', '24MM', '28MM', '20/410', '24/410', '28/410'].includes(s)) },
          { label: '38mm - 63mm (Jars & Spice)', value: 'large', match: p => p.sizes?.some(s => ['38MM', '42MM', '46MM', '53MM', '63MM'].includes(s)) }
        ]
      }
    ]
  },

  // 11. PUMPS & SPRAYERS
  'pumps-sprayers': {
    filters: [
      {
        id: 'type',
        label: 'Dispenser Mechanism',
        isPrimaryPill: true,
        options: [
          { label: 'All Pumps & Sprayers', value: 'all' },
          { label: 'Lotion & Hand Push Pumps', value: 'lotion', match: p => p.name.includes('Lotion') || p.name.includes('Dispenser') || p.name.includes('Hand Push') || p.name.includes('Bek') },
          { label: 'Fine Mist & Spray Pumps', value: 'mist', match: p => p.name.includes('Mist') || p.name.includes('Spray') },
          { label: 'Treatment, Cream & Serum Pumps', value: 'treatment', match: p => p.name.includes('Treatment') || p.name.includes('Cream') || p.name.includes('Serum') || p.name.includes('Penguin') || p.name.includes('Luna') || p.name.includes('LGB') || p.name.includes('CLD') || p.name.includes('Plum') },
          { label: 'Foam & Trigger Sprayers', value: 'specialty', match: p => p.name.includes('Foam') || p.name.includes('Trigger') }
        ]
      },
      {
        id: 'neckSize',
        label: 'Neck Diameter',
        isPrimaryPill: false,
        options: [
          { label: 'All Sizes', value: 'all' },
          { label: '18mm - 20mm (Serums & Small Sprays)', value: 'small', match: p => p.sizes?.some(s => ['18MM', '18mm', '20MM', '20mm'].includes(s)) },
          { label: '24mm - 28mm (Standard Bottles & Lotions)', value: 'medium', match: p => p.sizes?.some(s => ['24MM', '24mm', '28MM', '28mm'].includes(s)) },
          { label: '36mm - 42mm (Foam & Wide Spray)', value: 'large', match: p => p.sizes?.some(s => ['36MM', '42MM', '36mm', '42mm'].includes(s)) }
        ]
      }
    ]
  },

  // 12. ROLL-ON PACKAGING
  'roll-on-packaging': {
    filters: [
      {
        id: 'format',
        label: 'Roll-On Style',
        isPrimaryPill: true,
        options: [
          { label: 'All Roll-Ons', value: 'all' },
          { label: 'Classic & Frosted Cylinders', value: 'cylindrical', match: p => ['roll-on-bottles', 'frosted-roll-on-bottles', 'customized-roll-on-bottles'].includes(p.slug) },
          { label: 'Geometric & Artisan (Patti, Stone, Round, Rectangular)', value: 'artisan', match: p => ['patti-roll-on-bottles', 'stone-roll-ons', 'round-roll-ons', 'rectangular-roll-ons'].includes(p.slug) },
          { label: 'UV Protective (Amber & Black)', value: 'uv-protective', match: p => p.slug === 'amber-black-roll-ons' },
          { label: 'Deodorant Roll-Ons (30ml, 50ml)', value: 'deodorant', match: p => p.slug === 'deodorant-roll-ons' }
        ]
      },
      {
        id: 'capacity',
        label: 'Capacity',
        isPrimaryPill: false,
        options: [
          { label: 'All Sizes', value: 'all' },
          { label: '3ml - 6ml (Attar & Tester)', value: 'small', match: p => p.sizes?.some(s => ['3ML', '3ml', '5ML', '5ml', '6ML', '6ml'].includes(s)) },
          { label: '8ml - 12ml (Perfume & Serums)', value: 'medium', match: p => p.sizes?.some(s => ['8ML', '8ml', '9ML', '9ml', '10ML', '10ml', '12ML', '12ml'].includes(s)) },
          { label: '30ml - 50ml (Body Deodorant)', value: 'large', match: p => p.sizes?.some(s => ['30ML', '30ml', '50ML', '50ml'].includes(s)) }
        ]
      }
    ]
  },

  // 13. ALUMINIUM PACKAGING
  'aluminium-packaging': {
    filters: [
      {
        id: 'finish',
        label: 'Finish',
        isPrimaryPill: true,
        options: [
          { label: 'All Finishes', value: 'all' },
          { label: 'Silver Aluminium', value: 'silver', match: p => p.colours?.some(c => c.toLowerCase().includes('silver')) },
          { label: 'Matte Black', value: 'black', match: p => p.colours?.some(c => c.toLowerCase().includes('black')) },
          { label: 'Brushed Gold', value: 'gold', match: p => p.colours?.some(c => c.toLowerCase().includes('gold')) }
        ]
      },
      {
        id: 'capacity',
        label: 'Size',
        isPrimaryPill: false,
        options: [
          { label: 'All Sizes', value: 'all' },
          { label: '10ml (Lip & Balm)', value: '10ml', match: p => p.sizes?.includes('10ml') },
          { label: '40ml (Travel Cream)', value: '40ml', match: p => p.sizes?.includes('40ml') },
          { label: '80ml (Standard Cream)', value: '80ml', match: p => p.sizes?.includes('80ml') }
        ]
      }
    ]
  },

  // 14. COSMETICS & MAKEUP
  'cosmetics': {
    filters: [
      {
        id: 'type',
        label: 'Makeup Application',
        isPrimaryPill: true,
        options: [
          { label: 'All Applications', value: 'all' },
          { label: 'Eye Applicators (Mascara & Liner)', value: 'eye', match: p => p.name.includes('Mascara') || p.name.includes('Liner') },
          { label: 'Lip Care & Gloss Packaging', value: 'lip', match: p => p.name.includes('Lipstick') || p.name.includes('Lip Gloss') || p.name.includes('Chapstick') },
          { label: 'Under Eye Treatment Roll-Ons', value: 'undereye', match: p => p.name.includes('Under Eye') }
        ]
      },
      {
        id: 'material',
        label: 'Material / Style',
        isPrimaryPill: false,
        options: [
          { label: 'All Materials', value: 'all' },
          { label: 'Sleek ABS, PETG & AS Plastic', value: 'abs', match: p => p.specifications?.material?.includes('ABS') || p.specifications?.material?.includes('PETG') || p.specifications?.material?.includes('AS') || p.specifications?.material?.includes('PP') },
          { label: 'Eco Biodegradable Kraft Paper', value: 'kraft', match: p => p.name.includes('Paper') || p.specifications?.material?.includes('Kraft') },
          { label: 'Glass Roll-On Applicator', value: 'glass', match: p => p.specifications?.material?.includes('Glass') }
        ]
      }
    ]
  }
};

/**
 * Returns filter configurations for a given category slug
 */
export function getCategoryFilters(categorySlug) {
  return CATEGORY_FILTERS[categorySlug]?.filters || [];
}
