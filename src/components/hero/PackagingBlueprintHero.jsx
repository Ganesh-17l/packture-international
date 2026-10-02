import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

/**
 * =========================================================================
 * PACKTURE INTERNATIONAL — ARCHITECTURAL PACKAGING SPECIMEN SYSTEM
 * Precision 2D Packaging Blueprint with Engineered Glass Wall Thickness,
 * Dedicated Specimen Geometry (Flacon, Jar, Dropper), Mobile Motion-Responsive
 * Material Tint (DeviceOrientation Inertia & Settling), Dynamic Material
 * Light Response, Automated Inspection Sequence, and Robust Non-Overlapping
 * Annotation Typography.
 *
 * SPECIMEN & BLUEPRINT STABILITY:
 * The outer bottle outline, dimensions, technical annotations, specimen
 * navigation, and blueprint structure remain completely stable.
 * ONLY the internal material tint, flowing radial pool, and specular highlight
 * respond fluidly to physical phone tilt.
 * =========================================================================
 */

const PACKAGING_FORMS = [
  {
    id: 'flacon',
    index: '01',
    name: 'FLINT FLACON',
    category: 'FRAGRANCE ARCHITECTURE',
    nominalVol: '100 ML',
    heightMm: '128.5 MM',
    diameterMm: '54.0 MM',
    neckSpec: 'FEA15 CRIMP NECK',
    baseSpec: '14.5 MM REINFORCED BASE',
    wallSpec: '4.8 MM THICK-WALL FLINT',
    bounds: {
      top: 32,
      bottom: 278,
      left: 104,
      right: 236
    },
    datumLines: [74, 118, 278],
    paths: {
      capCrown: "M 156 32 L 184 32 L 184 36 L 156 36 Z",
      cap: "M 152 36 L 188 36 L 188 74 L 152 74 Z",
      collar: "M 158 74 L 182 74 L 182 88 L 158 88 Z",
      shoulder: "M 158 88 L 138 102 L 104 110 L 104 118",
      shoulderR: "M 182 88 L 202 102 L 236 110 L 236 118",
      outerBody: "M 104 118 L 104 268 C 104 274 110 278 120 278 L 220 278 C 230 278 236 274 236 268 L 236 118",
      innerWall: "M 112 122 L 112 260 C 112 265 116 268 122 268 L 218 268 C 224 268 228 265 228 260 L 228 122",
      innerCavity: "M 116 126 L 116 256 C 116 260 120 264 126 264 L 214 264 C 220 264 224 260 224 256 L 224 126 C 224 120 216 114 208 110 L 178 96 L 162 96 L 132 110 C 124 114 116 120 116 126 Z",
      liquidMeniscus: "M 118 168 C 145 166 195 166 222 168",
      dipTube: "M 170 88 L 170 260 M 166 260 L 174 260",
      specularHighlight: "M 226 130 L 226 258",
      baseConcavePunt: "M 112 268 C 140 264 200 264 228 268",
      baseFloor: "M 104 278 L 236 278"
    },
    annotations: {
      cap: { pointX: 152, pointY: 52, textY: 49, subY: 56, title: "CAP / CLOSURE", subtitle: "CUSTOM FINISH" },
      neck: { pointX: 158, pointY: 88, textY: 85, subY: 92, title: "NECK FINISH", subtitle: "FEA15 CRIMP NECK" },
      body: { pointX: 104, pointY: 180, textY: 177, subY: 184, title: "GLASS RECEPTACLE", subtitle: "4.8 MM THICK-WALL FLINT" },
      base: { pointX: 104, pointY: 272, textY: 268, subY: 275, title: "REINFORCED BASE", subtitle: "14.5 MM HEAVY PUSH-UP" }
    },
    hotspots: {
      cap: { y1: 32, y2: 74 },
      neck: { y1: 74, y2: 118 },
      body: { y1: 118, y2: 252 },
      base: { y1: 252, y2: 284 }
    }
  },
  {
    id: 'jar',
    index: '02',
    name: 'COSMETIC JAR',
    category: 'SKINCARE RECEPTACLE',
    nominalVol: '50 G',
    heightMm: '58.0 MM',
    diameterMm: '68.5 MM',
    neckSpec: 'GPI 53-400 THREAD',
    baseSpec: '12.0 MM HEAVY FLINT',
    wallSpec: '5.2 MM SOLID GLASS',
    bounds: {
      top: 80,
      bottom: 265,
      left: 80,
      right: 260
    },
    datumLines: [86, 122, 148, 265],
    paths: {
      lidCrown: "M 94 80 L 246 80 L 246 86 L 94 86 Z",
      lid: "M 90 86 L 250 86 L 250 118 L 90 118 Z",
      lidLip: "M 92 118 L 248 118 L 248 122 L 92 122 Z",
      neck: "M 106 122 L 234 122 L 234 142 L 106 142 Z",
      shoulderL: "M 106 142 L 80 148",
      shoulderR: "M 234 142 L 260 148",
      outerBody: "M 80 148 L 80 258 C 80 263 86 265 96 265 L 244 265 C 254 265 260 263 260 258 L 260 148",
      innerWall: "M 94 150 L 94 246 C 94 252 98 255 106 255 L 234 255 C 242 255 246 252 246 246 L 246 150",
      innerCavity: "M 100 148 L 100 242 C 100 248 106 252 114 252 L 226 252 C 234 252 240 248 240 242 L 240 148 Z",
      liquidMeniscus: "M 102 180 C 145 178 195 178 238 180",
      dipTube: "",
      specularHighlight: "M 250 156 L 250 252",
      baseConcavePunt: "M 96 255 C 130 252 210 252 244 255",
      baseFloor: "M 80 265 L 260 265"
    },
    annotations: {
      cap: { pointX: 90, pointY: 100, textY: 97, subY: 104, title: "CAP / CLOSURE", subtitle: "DOUBLE-WALL SCREW LID" },
      neck: { pointX: 106, pointY: 134, textY: 131, subY: 138, title: "NECK / THREAD", subtitle: "GPI 53-400 SCREW THREAD" },
      body: { pointX: 80, pointY: 195, textY: 192, subY: 199, title: "GLASS RECEPTACLE", subtitle: "SOLID COSMETIC GLASS" },
      base: { pointX: 80, pointY: 260, textY: 257, subY: 264, title: "REINFORCED BASE", subtitle: "12.0 MM HEAVY FLINT BASE" }
    },
    hotspots: {
      cap: { y1: 80, y2: 122 },
      neck: { y1: 122, y2: 148 },
      body: { y1: 148, y2: 248 },
      base: { y1: 248, y2: 268 }
    }
  },
  {
    id: 'dropper',
    index: '03',
    name: 'SERUM DROPPER',
    category: 'PRECISION DISPENSING',
    nominalVol: '30 ML',
    heightMm: '105.0 MM',
    diameterMm: '32.0 MM',
    neckSpec: 'DIN 18 EURO NECK',
    baseSpec: '9.5 MM CONCAVE BASE',
    wallSpec: '3.6 MM OPTICAL BORO',
    bounds: {
      top: 20,
      bottom: 280,
      left: 120,
      right: 220
    },
    datumLines: [46, 90, 128, 280],
    paths: {
      bulb: "M 158 24 C 158 16 182 16 182 24 L 182 46 L 158 46 Z",
      collar: "M 152 46 L 188 46 L 188 74 L 152 74 Z",
      neck: "M 156 74 L 184 74 L 184 90 L 156 90 Z",
      shoulderL: "M 156 90 L 140 104 L 120 118 L 120 128",
      shoulderR: "M 184 90 L 200 104 L 220 118 L 220 128",
      outerBody: "M 120 128 L 120 272 C 120 276 124 280 130 280 L 210 280 C 216 280 220 276 220 272 L 220 128",
      innerWall: "M 126 130 L 126 266 C 126 269 130 271 134 271 L 206 271 C 210 271 214 269 214 266 L 214 130",
      innerCavity: "M 128 130 L 128 264 C 128 266 132 268 136 268 L 204 268 C 208 268 212 266 212 264 L 212 130 C 212 124 202 114 188 106 L 170 98 L 152 106 C 138 114 128 124 128 130 Z",
      liquidMeniscus: "M 130 174 C 155 172 185 172 210 174",
      pipetteTube: "M 170 46 L 170 260 M 166 260 L 174 260",
      specularHighlight: "M 214 140 L 214 260",
      baseConcavePunt: "M 126 270 C 145 267 195 267 214 270",
      baseFloor: "M 120 280 L 220 280"
    },
    annotations: {
      cap: { pointX: 152, pointY: 46, textY: 43, subY: 50, title: "DROPPER CAP", subtitle: "PRECISION PIPETTE BULB" },
      neck: { pointX: 156, pointY: 82, textY: 79, subY: 86, title: "COLLAR / NECK", subtitle: "DIN 18 EURO THREAD" },
      body: { pointX: 120, pointY: 185, textY: 182, subY: 189, title: "GLASS BODY", subtitle: "3.6 MM OPTICAL BORE" },
      base: { pointX: 120, pointY: 274, textY: 270, subY: 277, title: "REINFORCED BASE", subtitle: "9.5 MM CONCAVE BASE" }
    },
    hotspots: {
      cap: { y1: 20, y2: 74 },
      neck: { y1: 74, y2: 128 },
      body: { y1: 128, y2: 250 },
      base: { y1: 250, y2: 282 }
    }
  }
];

/**
 * =========================================================================
 * MATERIAL STUDY DEFINITIONS (Refined Luxury Material System)
 * FLINT: Smoked Champagne / Warm Tea Glass (fastest & sharpest highlight)
 * OPAL: Pearl Blush / Soft Rose Opal (medium & soft diffusion)
 * FROSTED: Smoky Sage / Frosted Mineral Glass (slowest & broadest diffusion)
 * - Outer silhouette stroke is ALWAYS clean, sharp, thin charcoal (#282014)
 * - Zero outer glow, zero outer halo, zero colored outer outlines
 * =========================================================================
 */
const MATERIAL_STUDIES = [
  {
    id: 'flint',
    label: 'FLINT',
    fullName: 'SMOKED CHAMPAGNE / WARM TEA GLASS',
    descriptor: 'SMOKED CHAMPAGNE · WARM TEA GLASS',
    gradientId: 'hero-flint-grad',
    flowPoolGradientId: 'hero-flint-pool',
    flowBlend: 'screen',
    // Mobile motion amplitudes (Clamped within user limits: base <= 12px, highlight <= 16px)
    tintAmpX: 7.5,        // 5–8px base movement
    tintAmpY: 5.5,
    highlightAmpX: 13.5,  // 8–14px highlight movement (fastest & sharpest)
    highlightAmpY: 6.5,
    gradientStops: [
      { offset: '0%', color: 'rgba(168, 126, 78, 0.32)' },
      { offset: '32%', color: 'rgba(238, 218, 185, 0.52)' },
      { offset: '68%', color: 'rgba(152, 112, 68, 0.28)' },
      { offset: '100%', color: 'rgba(185, 142, 94, 0.38)' }
    ],
    cavityFill: 'rgba(138, 100, 58, 0.20)',
    strokeColor: '#282014',
    strokeWidth: 1.15,
    innerWallColor: 'rgba(58, 40, 24, 0.85)',
    innerWallDash: '5 3',
    innerWallWidth: 0.85,
    highlightOpacity: 0.95,
    highlightWidth: 1.6,
    meniscusColor: '#C59942',
    filter: 'none',
    swatchStyle: {
      background: 'radial-gradient(circle at 35% 30%, #F5E8D0 0%, #C49856 50%, #7A5222 100%)',
      border: '1px solid rgba(197,153,66,0.55)'
    }
  },
  {
    id: 'opal',
    label: 'OPAL',
    fullName: 'PEARL BLUSH / SOFT ROSE OPAL',
    descriptor: 'PEARL BLUSH · SOFT ROSE OPAL',
    gradientId: 'hero-opal-grad',
    flowPoolGradientId: 'hero-opal-pool',
    flowBlend: 'soft-light',
    tintAmpX: 6.0,        // Medium & soft movement
    tintAmpY: 4.5,
    highlightAmpX: 9.5,   // Softer highlight movement
    highlightAmpY: 5.0,
    gradientStops: [
      { offset: '0%', color: 'rgba(248, 235, 234, 0.90)' },
      { offset: '35%', color: 'rgba(255, 248, 248, 0.98)' },
      { offset: '70%', color: 'rgba(238, 218, 216, 0.88)' },
      { offset: '100%', color: 'rgba(246, 230, 228, 0.94)' }
    ],
    cavityFill: 'rgba(230, 204, 202, 0.76)',
    strokeColor: '#282014',
    strokeWidth: 1.15,
    innerWallColor: 'rgba(125, 88, 92, 0.55)',
    innerWallDash: '6 3.5',
    innerWallWidth: 0.70,
    highlightOpacity: 0.28,
    highlightWidth: 2.2,
    meniscusColor: 'rgba(195, 142, 144, 0.85)',
    filter: 'none',
    swatchStyle: {
      background: 'radial-gradient(circle at 35% 30%, #FFFFFF 0%, #F6E2E0 50%, #D8B2AF 100%)',
      border: '1px solid rgba(180,125,128,0.40)'
    }
  },
  {
    id: 'frosted',
    label: 'FROSTED',
    fullName: 'SMOKY SAGE / FROSTED MINERAL GLASS',
    descriptor: 'SMOKY SAGE · FROSTED MINERAL GLASS',
    gradientId: 'hero-frosted-grad',
    flowPoolGradientId: 'hero-frosted-pool',
    flowBlend: 'screen',
    tintAmpX: 4.5,        // Slowest & broadest diffusion
    tintAmpY: 3.5,
    highlightAmpX: 7.0,   // Broad, gentle highlight
    highlightAmpY: 4.0,
    gradientStops: [
      { offset: '0%', color: 'rgba(196, 204, 194, 0.72)' },   // Desaturated sage-grey base (#C9D0C5)
      { offset: '32%', color: 'rgba(235, 238, 230, 0.82)' },  // Warm ivory-sage light (#E2E5DA)
      { offset: '70%', color: 'rgba(174, 184, 172, 0.68)' },  // Shadow (#AEB8AC)
      { offset: '100%', color: 'rgba(201, 208, 197, 0.76)' }  // Base (#C9D0C5)
    ],
    cavityFill: 'rgba(174, 184, 172, 0.35)',
    strokeColor: '#282014', // Outer silhouette is ALWAYS crisp charcoal, NEVER green!
    strokeWidth: 1.15,
    innerWallColor: 'rgba(92, 106, 94, 0.42)', // Diffused, softened inner wall
    innerWallDash: '2 2',                      // Micro-dashed diffused look
    innerWallWidth: 0.65,
    highlightOpacity: 0.22,
    highlightWidth: 3.2,
    meniscusColor: 'rgba(145, 160, 142, 0.75)',
    filter: 'none',
    swatchStyle: {
      background: 'radial-gradient(circle at 40% 35%, #E2E5DA 0%, #C9D0C5 50%, #9DAA9A 100%)',
      border: '1px solid rgba(140, 155, 138, 0.50)'
    }
  }
];

const MATERIAL_CYCLE = ['flint', 'opal', 'frosted'];

export default function PackagingBlueprintHero() {
  const shouldReduce = useReducedMotion();
  const [formIndex, setFormIndex] = useState(0);
  const [activeMaterialId, setActiveMaterialId] = useState('flint');
  const [previewMaterialId, setPreviewMaterialId] = useState(null);
  const [isDesktopHovering, setIsDesktopHovering] = useState(false);
  const [activeHotspot, setActiveHotspot] = useState(null); // 'cap' | 'neck' | 'body' | 'base'
  const [lightSweepKey, setLightSweepKey] = useState(0);
  const [hasDrafted, setHasDrafted] = useState(false);
  const [isInViewport, setIsInViewport] = useState(true);

  const containerRef = useRef(null);
  const idleTimerRef = useRef(null);

  // Desktop Pointer Parallax Coordinates (±4px max, tactile precision)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Mobile DeviceOrientation / Inertial Smooth Coordinates
  // targetX & targetY smoothed via 0.06 damping rate for liquid physical inertia
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const targetTiltRef = useRef({ x: 0, y: 0 });
  const currentTiltRef = useRef({ x: 0, y: 0 });

  const currentMaterialId = previewMaterialId || activeMaterialId;
  const activeForm = PACKAGING_FORMS[formIndex];
  const activeMaterial = MATERIAL_STUDIES.find(m => m.id === currentMaterialId) || MATERIAL_STUDIES[0];

  // Pause loops when out of viewport
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInViewport(entry.isIntersecting);
      },
      { threshold: 0.15 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Mark drafting animation sequence as completed once mounted
  useEffect(() => {
    const timer = setTimeout(() => {
      setHasDrafted(true);
    }, 2200);
    return () => clearTimeout(timer);
  }, []);

  // Progressive Enhancement Refs
  const lastSensorEventTimeRef = useRef(0);
  const isSensorActiveRef = useRef(false);
  const orientationListenerRef = useRef(null);
  const permissionAttemptedRef = useRef(false);

  // =========================================================================
  // PROGRESSIVE ENHANCEMENT: MOTION TINT & AUTOMATIC FALLBACK
  // 1. Detect motion/orientation support.
  // 2. Detect whether permission is available.
  // 3. If supported and permitted: enable motion-responsive tint.
  // 4. If unsupported: use automatic CSS/SVG tint animation.
  // 5. If permission is denied: silently use the fallback animation.
  // 6. If the device becomes unavailable: immediately fall back without errors.
  // Never display a broken state.
  // Never block page rendering while requesting motion permission.
  // Never require gyroscope access just to view the Collections page.
  // Motion interaction is strictly an enhancement.
  // =========================================================================
  useEffect(() => {
    if (shouldReduce) return;

    // Orientation event parser
    const onOrientation = (e) => {
      // Validate numeric values exist (some browsers emit null or undefined)
      if (!e || typeof e.gamma !== 'number' || typeof e.beta !== 'number') return;
      if (isNaN(e.gamma) || isNaN(e.beta)) return;

      lastSensorEventTimeRef.current = performance.now();
      isSensorActiveRef.current = true;

      // 1. Dead Zone & Clamping for Gamma (left/right tilt)
      let rawGamma = e.gamma || 0;
      if (Math.abs(rawGamma) < 1.5) {
        rawGamma = 0;
      } else {
        rawGamma = rawGamma > 0 ? rawGamma - 1.5 : rawGamma + 1.5;
      }
      const clampedGamma = Math.max(-20, Math.min(20, rawGamma));
      const normX = clampedGamma / 20; // [-1, 1]

      // 2. Dead Zone & Clamping for Beta (forward/back tilt, baseline 42° posture)
      const baselineBeta = 42;
      let rawBeta = (e.beta || baselineBeta) - baselineBeta;
      if (Math.abs(rawBeta) < 1.5) {
        rawBeta = 0;
      } else {
        rawBeta = rawBeta > 0 ? rawBeta - 1.5 : rawBeta + 1.5;
      }
      const clampedBeta = Math.max(-15, Math.min(15, rawBeta));
      const normY = clampedBeta / 15; // [-1, 1]

      targetTiltRef.current = { x: normX, y: normY };
    };

    orientationListenerRef.current = onOrientation;

    // PROGRESSIVE ENHANCEMENT:
    // Step 1: Detect motion/orientation support
    // Step 2: Detect whether permission is available
    // Step 3: If supported without explicit permission prompt (e.g. Android Chrome), attach immediately
    try {
      if (typeof window !== 'undefined' && 'DeviceOrientationEvent' in window) {
        const needsPermission = typeof window.DeviceOrientationEvent.requestPermission === 'function';
        if (!needsPermission) {
          window.addEventListener('deviceorientation', onOrientation, true);
        }
      }
    } catch {
      // Step 4/5: Silently fall back if environment restricts or errors
      isSensorActiveRef.current = false;
    }

    // Inertial RAF animation loop (Section 05: 0.06 damping rate, physical inertia)
    let animId;
    let startTime = performance.now();

    const loop = () => {
      const now = performance.now();
      const elapsed = (now - startTime) / 1000;
      
      // Step 6: If the device becomes unavailable, or never had sensors, or idle > 1.5s:
      // immediately fall back to automatic breathing animation without errors.
      const isHardwareLive = isSensorActiveRef.current && (now - lastSensorEventTimeRef.current < 1500);

      if (!isHardwareLive) {
        // Automatic organic breathing simulation (Period: 8.0s)
        const period = 8.0;
        const autoX = Math.sin((elapsed * 2 * Math.PI) / period) * 0.45;
        const autoY = Math.cos((elapsed * 2 * Math.PI) / (period * 1.25)) * 0.22;
        targetTiltRef.current = { x: autoX, y: autoY };
      }

      // Smooth inertia: current += (target - current) * 0.06 (settles 700-1200ms)
      currentTiltRef.current.x += (targetTiltRef.current.x - currentTiltRef.current.x) * 0.06;
      currentTiltRef.current.y += (targetTiltRef.current.y - currentTiltRef.current.y) * 0.06;

      // Update CSS variables for high-performance rendering (Section 22)
      if (containerRef.current) {
        containerRef.current.style.setProperty('--material-x', currentTiltRef.current.x.toFixed(4));
        containerRef.current.style.setProperty('--material-y', currentTiltRef.current.y.toFixed(4));
      }

      setTilt({
        x: currentTiltRef.current.x,
        y: currentTiltRef.current.y
      });

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);

    return () => {
      if (typeof window !== 'undefined' && onOrientation) {
        window.removeEventListener('deviceorientation', onOrientation, true);
      }
      if (animId) cancelAnimationFrame(animId);
    };
  }, [shouldReduce]);

  // Request motion permission on iOS upon explicit user gesture (non-blocking, silent fallback)
  const handleUserTap = () => {
    // If already attempted or sensor is already actively feeding data, do not re-request
    if (permissionAttemptedRef.current || isSensorActiveRef.current || shouldReduce) return;

    try {
      if (
        typeof window !== 'undefined' &&
        typeof window.DeviceOrientationEvent !== 'undefined' &&
        typeof window.DeviceOrientationEvent.requestPermission === 'function'
      ) {
        permissionAttemptedRef.current = true;
        window.DeviceOrientationEvent.requestPermission()
          .then((perm) => {
            if (perm === 'granted' && orientationListenerRef.current) {
              window.addEventListener('deviceorientation', orientationListenerRef.current, true);
            } else {
              // Denied: silently continue on automatic breathing fallback
              isSensorActiveRef.current = false;
            }
          })
          .catch(() => {
            // Cancelled or errored: silently continue on automatic breathing fallback
            isSensorActiveRef.current = false;
          });
      }
    } catch {
      // Silently ignore any unexpected environment errors
      isSensorActiveRef.current = false;
    }
  };


  // =========================================================================
  // AUTOMATED LIVING PACKAGING SPECIMEN SEQUENCE (Mobile & Idle Desktop)
  // Total cycle ~28.5 seconds (9.5s per specimen: Flacon -> Jar -> Dropper).
  // Tint position persists unbroken across specimen morphs & material changes.
  // =========================================================================
  useEffect(() => {
    if (shouldReduce || isDesktopHovering || !isInViewport) return;

    let isCancelled = false;
    const timeouts = [];

    timeouts.push(setTimeout(() => {
      if (!isCancelled) setActiveHotspot('cap');
    }, 1800));

    timeouts.push(setTimeout(() => {
      if (!isCancelled) setActiveHotspot('neck');
    }, 3000));

    timeouts.push(setTimeout(() => {
      if (!isCancelled) setActiveHotspot('body');
    }, 4400));

    timeouts.push(setTimeout(() => {
      if (!isCancelled) setActiveHotspot('base');
    }, 6200));

    timeouts.push(setTimeout(() => {
      if (!isCancelled) setActiveHotspot(null);
    }, 7600));

    timeouts.push(setTimeout(() => {
      if (!isCancelled) {
        setLightSweepKey(k => k + 1);
        setActiveMaterialId(prevMat => {
          const nextIdx = (MATERIAL_CYCLE.indexOf(prevMat) + 1) % MATERIAL_CYCLE.length;
          return MATERIAL_CYCLE[nextIdx];
        });
      }
    }, 8400));

    timeouts.push(setTimeout(() => {
      if (!isCancelled) {
        setFormIndex(prev => (prev + 1) % PACKAGING_FORMS.length);
      }
    }, 9500));

    return () => {
      isCancelled = true;
      timeouts.forEach(t => clearTimeout(t));
    };
  }, [formIndex, isDesktopHovering, isInViewport, shouldReduce]);

  // Desktop Hover Interaction (Section 19: Desktop uses mouse hover, mobile uses sensor)
  const handleMouseMove = (e) => {
    if (shouldReduce || !containerRef.current) return;
    setIsDesktopHovering(true);

    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);

    const rect = containerRef.current.getBoundingClientRect();
    const relX = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
    const relY = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
    setMousePos({ x: relX * 4, y: relY * 3 });

    idleTimerRef.current = setTimeout(() => {
      setIsDesktopHovering(false);
      setActiveHotspot(null);
    }, 5000);
  };

  const handleMouseLeave = () => {
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    setIsDesktopHovering(false);
    setActiveHotspot(null);
    setPreviewMaterialId(null);
    setMousePos({ x: 0, y: 0 });
  };

  // Inspect hotspot based on desktop pointer Y position in SVG coordinate space (0-315)
  const handleSvgMouseMove = (e) => {
    if (shouldReduce) return;
    const svgElem = e.currentTarget;
    const rect = svgElem.getBoundingClientRect();
    const svgY = ((e.clientY - rect.top) / rect.height) * 315;

    const spots = activeForm.hotspots;
    if (svgY >= spots.cap.y1 && svgY <= spots.cap.y2) {
      setActiveHotspot('cap');
    } else if (svgY > spots.neck.y1 && svgY <= spots.neck.y2) {
      setActiveHotspot('neck');
    } else if (svgY > spots.body.y1 && svgY <= spots.body.y2) {
      setActiveHotspot('body');
    } else if (svgY > spots.base.y1 && svgY <= spots.base.y2) {
      setActiveHotspot('base');
    } else {
      setActiveHotspot(null);
    }
  };

  const handleMaterialCommit = (id) => {
    setActiveMaterialId(id);
    setPreviewMaterialId(null);
    setLightSweepKey(prev => prev + 1);
  };

  const handleFormSelect = (idx) => {
    setFormIndex(idx);
    setActiveHotspot(null);
  };

  // Dimension coordinates computed dynamically
  const heightTop = activeForm.bounds.top;
  const heightBottom = activeForm.bounds.bottom;
  const widthLeft = activeForm.bounds.left;
  const widthRight = activeForm.bounds.right;

  // Specimen-specific annotation anchor points
  const ann = activeForm.annotations;

  // =========================================================================
  // MOTION-RESPONSIVE MATERIAL TINT DISPLACEMENT (Sections 06, 08, 09, 10, 11, 12)
  // Base material tint: 5–8px movement (max 10-12px)
  // Specular highlight: 8–14px movement (faster, sharper refraction, max 14-16px)
  // Inner glass wall: subtle 1.2px optical shift
  // Outer bottle outline & blueprint text: 100% STABLE (zero shake)
  // =========================================================================
  const motionX = isDesktopHovering ? (mousePos.x / 4) : (shouldReduce ? 0 : tilt.x);
  const motionY = isDesktopHovering ? (mousePos.y / 3) : (shouldReduce ? 0 : tilt.y);

  const tintPos = {
    baseX: motionX * activeMaterial.tintAmpX,
    baseY: motionY * activeMaterial.tintAmpY,
    highlightX: motionX * activeMaterial.highlightAmpX,
    highlightY: motionY * activeMaterial.highlightAmpY,
    wallX: motionX * 1.2,
    wallY: motionY * 0.8
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsDesktopHovering(true)}
      onMouseLeave={handleMouseLeave}
      onClick={handleUserTap}
      className="relative w-full max-w-[430px] lg:max-w-[450px] select-none flex flex-col justify-between py-1 group"
    >
      {/* =========================================================================
          LAYER 1: SUBTLE LOCALIZED DRAFTING ATMOSPHERE (Completely Stable)
          Zero full-page intrusion. Kept purely under the blueprint specimen.
          ========================================================================= */}
      <div 
        className="absolute -inset-4 sm:-inset-6 pointer-events-none select-none z-0 hidden sm:block opacity-[0.06]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(40, 32, 20, 0.75) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(40, 32, 20, 0.6) 1px, transparent 1px)
          `,
          backgroundSize: '28px 28px',
          maskImage: 'radial-gradient(circle at 50% 50%, rgba(0,0,0,1) 0%, rgba(0,0,0,0.35) 60%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(circle at 50% 50%, rgba(0,0,0,1) 0%, rgba(0,0,0,0.35) 60%, transparent 80%)'
        }}
      />

      {/* =========================================================================
          TOP TECHNICAL TITLE & SPECIMEN MORPHOLOGY SELECTOR (Frameless Inline)
          Responsive Layout: Stacked on mobile, row on desktop. Never collides.
          ========================================================================= */}
      <motion.div 
        initial={{ opacity: shouldReduce ? 1 : 0, y: shouldReduce ? 0 : -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between pb-2.5 border-b border-[#282014]/[0.10] gap-2"
      >
        <div className="flex items-center gap-2 min-w-0">
          <span className="w-1.5 h-1.5 rounded-full bg-luxury-gold shrink-0 animate-pulse" />
          <span className="font-mono text-[9px] sm:text-[9.5px] font-semibold tracking-[0.20em] text-luxury-gold uppercase truncate">
            SPECIMEN {activeForm.index} · {activeForm.category}
          </span>
        </div>

        {/* Morphology Form Selector Tabs (Inline Monospace) */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          {PACKAGING_FORMS.map((form, idx) => {
            const isSelected = formIndex === idx;
            return (
              <button
                key={form.id}
                onClick={(e) => {
                  e.stopPropagation();
                  handleFormSelect(idx);
                }}
                className={`font-mono text-[8.5px] sm:text-[9px] tracking-[0.16em] uppercase transition-colors cursor-pointer focus:outline-none flex items-center gap-1 ${
                  isSelected
                    ? 'text-luxury-charcoal font-bold'
                    : 'text-neutral-400 hover:text-luxury-charcoal'
                }`}
                aria-label={`Select Specimen ${form.index} ${form.name}`}
              >
                {isSelected && <span className="w-1 h-1 rounded-full bg-luxury-gold" />}
                <span>{form.index} {form.id.toUpperCase()}</span>
              </button>
            );
          })}
        </div>
      </motion.div>

      {/* =========================================================================
          CENTRAL ARTISTIC SPECIMEN CONTAINER (Rock-Solid Blueprint Frame)
          Outer canvas is completely fixed. Only internal clipped tint responds.
          ========================================================================= */}
      <div className="relative flex-1 flex items-center justify-center my-2 sm:my-3">
        
        <div className="relative z-10 w-full max-w-[390px] sm:max-w-[420px] h-[315px] sm:h-[330px] flex items-center justify-center">
          <svg
            viewBox="-50 0 390 315"
            className="w-full h-full overflow-visible"
            xmlns="http://www.w3.org/2000/svg"
            onMouseMove={handleSvgMouseMove}
          >
            <defs>
              {/* Active Material Fill Gradients */}
              <linearGradient id={activeMaterial.gradientId} x1="0" y1="0" x2="1" y2="0">
                {activeMaterial.gradientStops.map((stop, i) => (
                  <stop key={i} offset={stop.offset} stopColor={stop.color} />
                ))}
              </linearGradient>

              {/* Dynamic Flowing Radial Light Pools (Section 07: champagne, pearl, smoky sage) */}
              <radialGradient id="hero-flint-pool" cx="50%" cy="45%" r="60%">
                <stop offset="0%" stopColor="rgba(255, 238, 205, 0.48)" />
                <stop offset="45%" stopColor="rgba(215, 172, 115, 0.22)" />
                <stop offset="100%" stopColor="rgba(168, 126, 78, 0)" />
              </radialGradient>

              <radialGradient id="hero-opal-pool" cx="50%" cy="45%" r="65%">
                <stop offset="0%" stopColor="rgba(255, 255, 255, 0.65)" />
                <stop offset="50%" stopColor="rgba(248, 226, 224, 0.32)" />
                <stop offset="100%" stopColor="rgba(225, 195, 192, 0)" />
              </radialGradient>

              <radialGradient id="hero-frosted-pool" cx="50%" cy="45%" r="70%">
                <stop offset="0%" stopColor="rgba(235, 240, 230, 0.45)" />
                <stop offset="50%" stopColor="rgba(195, 206, 192, 0.20)" />
                <stop offset="100%" stopColor="rgba(165, 178, 162, 0)" />
              </radialGradient>

              {/* Specular Refraction Highlight Line */}
              <linearGradient id="specular-line-subtle" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(255,255,255,0.98)" />
                <stop offset="45%" stopColor="rgba(255,255,255,0.85)" />
                <stop offset="85%" stopColor="rgba(255,255,255,0.40)" />
                <stop offset="100%" stopColor="rgba(255,255,255,0.05)" />
              </linearGradient>

              {/* Optical Light Sweep (Sweeps left to right on material change) */}
              <linearGradient id="light-sweep-grad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="rgba(255,255,255,0)" />
                <stop offset="35%" stopColor="rgba(255,255,255,0.30)" />
                <stop offset="50%" stopColor="rgba(255,255,255,0.65)" />
                <stop offset="65%" stopColor="rgba(255,255,255,0.30)" />
                <stop offset="100%" stopColor="rgba(255,255,255,0)" />
              </linearGradient>

              {/* Internal Acid-Etched Mineral Diffusion Filter - strictly clipped INSIDE glass body */}
              <filter id="internal-frosted-grain" x="0" y="0" width="100%" height="100%">
                <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" result="noise" />
                <feColorMatrix type="matrix" values="0 0 0 0 0.76  0 0 0 0 0.80  0 0 0 0 0.75  0 0 0 0.16 0" />
              </filter>

              {/* Clip path strictly constraining optical sweep, dynamic tint & frosted diffusion inside outer glass boundary */}
              <clipPath id="active-bottle-clip">
                <path d={activeForm.paths.outerBody} />
              </clipPath>
            </defs>

            {/* =========================================================================
                LAYER 2: CENTRAL VERTICAL AXIS & DATUM GUIDES (Stable Architectural Lines)
                ========================================================================= */}
            <g>
              <motion.line
                initial={{ pathLength: shouldReduce ? 1 : 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.35 }}
                transition={{ duration: shouldReduce || hasDrafted ? 0.3 : 0.7, ease: [0.16, 1, 0.3, 1] }}
                x1="170"
                y1="16"
                x2="170"
                y2="296"
                stroke="#C5A059"
                strokeWidth="0.65"
                strokeDasharray="8 3 2 3"
              />

              {/* Symmetry Guides / Horizontal Datum Rules */}
              <g stroke="#C5A059" strokeWidth="0.5" opacity="0.25" strokeDasharray="3 3">
                {activeForm.datumLines.map((y, idx) => (
                  <motion.line
                    key={`datum-${idx}`}
                    x1="20"
                    x2="300"
                    animate={{ y1: y, y2: y }}
                    transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
                  />
                ))}
              </g>

              {/* Micro Drafting Crosshair (+) */}
              <g 
                opacity={isDesktopHovering ? 0.65 : 0.35} 
                stroke="#C5A059" 
                strokeWidth="0.65" 
                className="hidden sm:block"
              >
                <line x1="242" y1="96" x2="252" y2="96" />
                <line x1="247" y1="91" x2="247" y2="101" />
                <circle cx="247" cy="96" r="1.5" fill="none" strokeWidth="0.5" />
              </g>
            </g>

            {/* =========================================================================
                LAYER 4 & 5: SPECIMEN ARCHITECTURE & INTERNAL MOTION TINT
                - Internal Glass Material Tint & Radial Flow Pool (Moves with phone tilt)
                - Internal Specular Highlight (Moves faster for refraction depth)
                - Double-line Inner Glass Wall & Cavity (Subtle 1.2px optical parallax)
                - Crisp Charcoal Outer Outline (100% stable, sharp, thin, NO filters, NO halos)
                ========================================================================= */}
            <AnimatePresence mode="wait">
              <motion.g
                key={activeForm.id}
                initial={{ opacity: 0, scale: 0.985 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.985 }}
                transition={{ duration: shouldReduce ? 0.2 : 0.70, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* =========================================================================
                    INTERNAL MOTION-RESPONSIVE MATERIAL SYSTEM (Strictly Clipped Inside Glass)
                    Section 13: 100% contained within active-bottle-clip.
                    Zero spill outside the silhouette, zero outer halo, zero tinted strokes.
                    ========================================================================= */}
                <g clipPath="url(#active-bottle-clip)">
                  {/* 1. Base Material Tint Field - smooth gradient plane drifting with phone tilt */}
                  <g 
                    style={{ 
                      transform: `translate3d(${tintPos.baseX}px, ${tintPos.baseY}px, 0)`,
                      willChange: 'transform'
                    }}
                  >
                    <rect
                      x="40"
                      y="10"
                      width="260"
                      height="300"
                      fill={`url(#${activeMaterial.gradientId})`}
                      style={{ transition: 'fill 650ms cubic-bezier(0.16, 1, 0.3, 1)' }}
                    />
                  </g>

                  {/* 2. Flowing Liquid Light / Radial Tint Pool (Section 07: champagne, pearl, sage) */}
                  <g 
                    style={{ 
                      transform: `translate3d(${tintPos.baseX * 1.15}px, ${tintPos.baseY * 1.15}px, 0)`,
                      willChange: 'transform'
                    }}
                  >
                    <circle
                      cx="170"
                      cy="190"
                      r="95"
                      fill={`url(#${activeMaterial.flowPoolGradientId})`}
                      style={{ mixBlendMode: activeMaterial.flowBlend }}
                      pointerEvents="none"
                    />
                  </g>

                  {/* 3. Frosted Material Internal Acid-Etched Diffusion Texture (drifts gently with tint) */}
                  {currentMaterialId === 'frosted' && (
                    <g 
                      style={{ 
                        transform: `translate3d(${tintPos.baseX * 0.7}px, ${tintPos.baseY * 0.7}px, 0)`,
                        willChange: 'transform'
                      }}
                    >
                      <rect
                        x="40"
                        y="10"
                        width="260"
                        height="300"
                        fill="#C9D0C5"
                        opacity="0.20"
                        filter="url(#internal-frosted-grain)"
                        style={{ mixBlendMode: 'multiply' }}
                        pointerEvents="none"
                      />
                    </g>
                  )}

                  {/* 4. Optical Light Sweep Pass through Glass on Material Change */}
                  <motion.rect
                    key={`sweep-${lightSweepKey}`}
                    initial={{ x: -140, opacity: 0 }}
                    animate={{ x: 270, opacity: [0, 0.55, 0] }}
                    transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
                    y="60"
                    width="80"
                    height="240"
                    fill="url(#light-sweep-grad)"
                    pointerEvents="none"
                  />

                  {/* 5. Specular Refraction Highlight Streak (moves faster for physical depth) */}
                  {activeForm.paths.specularHighlight && (
                    <g 
                      style={{ 
                        transform: `translate3d(${tintPos.highlightX}px, ${tintPos.highlightY}px, 0)`,
                        willChange: 'transform'
                      }}
                    >
                      <path
                        d={activeForm.paths.specularHighlight}
                        stroke="url(#specular-line-subtle)"
                        strokeWidth={activeMaterial.highlightWidth}
                        opacity={activeMaterial.highlightOpacity}
                        style={{ transition: 'opacity 500ms ease, stroke-width 400ms ease' }}
                      />
                    </g>
                  )}
                </g>

                {/* =========================================================================
                    6. DOUBLE-LINE INNER GLASS WALL & CAVITY (Subtle 1.2px optical parallax)
                    ========================================================================= */}
                <g style={{ transform: `translate3d(${tintPos.wallX}px, ${tintPos.wallY}px, 0)`, transition: 'transform 80ms ease-out' }}>
                  <motion.path
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isDesktopHovering || activeHotspot === 'body' ? 0.95 : 0.70 }}
                    transition={{ duration: 0.6, delay: shouldReduce || hasDrafted ? 0 : 0.4 }}
                    d={activeForm.paths.innerWall}
                    stroke={activeHotspot === 'body' ? '#C5A059' : activeMaterial.innerWallColor}
                    strokeWidth={activeMaterial.innerWallWidth}
                    strokeDasharray={activeMaterial.innerWallDash}
                    fill="none"
                    style={{ transition: 'stroke 400ms ease, opacity 400ms ease' }}
                  />

                  {/* Fluid Core / Receptacle Cavity Field */}
                  <motion.path
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isDesktopHovering || activeHotspot === 'body' ? 0.95 : 0.85 }}
                    transition={{ duration: 0.6, delay: shouldReduce || hasDrafted ? 0 : 0.5 }}
                    d={activeForm.paths.innerCavity}
                    fill={activeMaterial.cavityFill}
                    stroke={activeMaterial.innerWallColor}
                    strokeWidth="0.65"
                    strokeDasharray="4 2.5"
                    style={{ transition: 'fill 650ms cubic-bezier(0.16, 1, 0.3, 1), stroke 400ms ease, opacity 400ms ease' }}
                  />
                </g>

                {/* 7. Fluid / Cream Meniscus Line */}
                {activeForm.paths.liquidMeniscus && (
                  <path
                    d={activeForm.paths.liquidMeniscus}
                    stroke={activeMaterial.meniscusColor}
                    strokeWidth="1.25"
                    fill="none"
                    opacity="0.85"
                    style={{ transition: 'stroke 500ms ease' }}
                  />
                )}

                {/* =========================================================================
                    8. CRISP CHARCOAL OUTER SILHOUETTE (Pure vector stroke, 100% STABLE)
                    - Clean, sharp, thin charcoal outline (#282014)
                    - NEVER green tinted, NEVER blurry, zero halo, zero noisy edge
                    ========================================================================= */}
                <motion.path
                  initial={{ pathLength: shouldReduce || hasDrafted ? 1 : 0, opacity: shouldReduce || hasDrafted ? 1 : 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: shouldReduce || hasDrafted ? 0.3 : 1.0, delay: shouldReduce || hasDrafted ? 0 : 0.2, ease: [0.16, 1, 0.3, 1] }}
                  d={activeForm.paths.outerBody}
                  fill="none"
                  stroke={activeHotspot === 'body' ? '#C5A059' : '#282014'}
                  strokeWidth={activeHotspot === 'body' ? 1.4 : 1.15}
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  filter="none"
                  style={{ transition: 'stroke 300ms ease, stroke-width 300ms ease' }}
                />

                {/* =========================================================================
                    SPECIMEN 01: FLACON DEDICATED CLOSURE & ARCHITECTURAL SHOULDERS (Stable)
                    ========================================================================= */}
                {activeForm.id === 'flacon' && (
                  <g key="flacon-closure-group">
                    <path
                      d={activeForm.paths.shoulder}
                      stroke={activeHotspot === 'neck' ? '#C5A059' : '#282014'}
                      strokeWidth={activeHotspot === 'neck' ? 1.4 : 1.15}
                      fill="none"
                      style={{ transition: 'stroke 300ms ease' }}
                    />
                    <path
                      d={activeForm.paths.shoulderR}
                      stroke={activeHotspot === 'neck' ? '#C5A059' : '#282014'}
                      strokeWidth={activeHotspot === 'neck' ? 1.4 : 1.15}
                      fill="none"
                      style={{ transition: 'stroke 300ms ease' }}
                    />
                    <path
                      d={activeForm.paths.collar}
                      fill="#EDE8DF"
                      stroke={activeHotspot === 'neck' ? '#C5A059' : '#282014'}
                      strokeWidth={activeHotspot === 'neck' ? 1.4 : 1.15}
                      style={{ transition: 'stroke 300ms ease' }}
                    />

                    <path
                      d={activeForm.paths.cap}
                      fill="#E5DFD4"
                      stroke={activeHotspot === 'cap' ? '#C5A059' : '#282014'}
                      strokeWidth={activeHotspot === 'cap' ? 1.4 : 1.15}
                      style={{ transition: 'stroke 300ms ease' }}
                    />
                    <path
                      d={activeForm.paths.capCrown}
                      fill="#DACFB9"
                      stroke={activeHotspot === 'cap' ? '#C5A059' : '#282014'}
                      strokeWidth={activeHotspot === 'cap' ? 1.4 : 1.15}
                      style={{ transition: 'stroke 300ms ease' }}
                    />

                    <path
                      d={activeForm.paths.dipTube}
                      stroke="#C5A059"
                      strokeWidth="0.75"
                      opacity="0.55"
                      strokeDasharray="4 2"
                      fill="none"
                    />
                  </g>
                )}

                {/* =========================================================================
                    SPECIMEN 02: JAR DEDICATED WIDE COSMETIC LID & SHORT SCREW NECK (Stable)
                    ========================================================================= */}
                {activeForm.id === 'jar' && (
                  <g key="jar-closure-group">
                    <path
                      d={activeForm.paths.shoulderL}
                      stroke={activeHotspot === 'neck' ? '#C5A059' : '#282014'}
                      strokeWidth={activeHotspot === 'neck' ? 1.4 : 1.15}
                      fill="none"
                      style={{ transition: 'stroke 300ms ease' }}
                    />
                    <path
                      d={activeForm.paths.shoulderR}
                      stroke={activeHotspot === 'neck' ? '#C5A059' : '#282014'}
                      strokeWidth={activeHotspot === 'neck' ? 1.4 : 1.15}
                      fill="none"
                      style={{ transition: 'stroke 300ms ease' }}
                    />

                    <path
                      d={activeForm.paths.neck}
                      fill="#EDE8DF"
                      stroke={activeHotspot === 'neck' ? '#C5A059' : '#282014'}
                      strokeWidth={activeHotspot === 'neck' ? 1.4 : 1.15}
                      style={{ transition: 'stroke 300ms ease' }}
                    />
                    <line 
                      x1="106" y1="128" x2="234" y2="128" 
                      stroke="#C5A059" strokeWidth="0.65" strokeDasharray="5 3" opacity="0.65" 
                    />
                    <line 
                      x1="106" y1="136" x2="234" y2="136" 
                      stroke="#C5A059" strokeWidth="0.65" strokeDasharray="5 3" opacity="0.65" 
                    />

                    <path
                      d={activeForm.paths.lid}
                      fill="#E5DFD4"
                      stroke={activeHotspot === 'cap' ? '#C5A059' : '#282014'}
                      strokeWidth={activeHotspot === 'cap' ? 1.4 : 1.15}
                      style={{ transition: 'stroke 300ms ease' }}
                    />
                    <path
                      d={activeForm.paths.lidCrown}
                      fill="#DACFB9"
                      stroke={activeHotspot === 'cap' ? '#C5A059' : '#282014'}
                      strokeWidth={activeHotspot === 'cap' ? 1.4 : 1.15}
                      style={{ transition: 'stroke 300ms ease' }}
                    />
                    <path
                      d={activeForm.paths.lidLip}
                      fill="#D5CCC0"
                      stroke={activeHotspot === 'cap' ? '#C5A059' : '#282014'}
                      strokeWidth={activeHotspot === 'cap' ? 1.4 : 1.15}
                      style={{ transition: 'stroke 300ms ease' }}
                    />
                  </g>
                )}

                {/* =========================================================================
                    SPECIMEN 03: DROPPER DEDICATED PIPETTE BULB & EURO NECK (Stable)
                    ========================================================================= */}
                {activeForm.id === 'dropper' && (
                  <g key="dropper-closure-group">
                    <path
                      d={activeForm.paths.shoulderL}
                      stroke={activeHotspot === 'neck' ? '#C5A059' : '#282014'}
                      strokeWidth={activeHotspot === 'neck' ? 1.4 : 1.15}
                      fill="none"
                      style={{ transition: 'stroke 300ms ease' }}
                    />
                    <path
                      d={activeForm.paths.shoulderR}
                      stroke={activeHotspot === 'neck' ? '#C5A059' : '#282014'}
                      strokeWidth={activeHotspot === 'neck' ? 1.4 : 1.15}
                      fill="none"
                      style={{ transition: 'stroke 300ms ease' }}
                    />

                    <path
                      d={activeForm.paths.neck}
                      fill="#EDE8DF"
                      stroke={activeHotspot === 'neck' ? '#C5A059' : '#282014'}
                      strokeWidth={activeHotspot === 'neck' ? 1.4 : 1.15}
                      style={{ transition: 'stroke 300ms ease' }}
                    />

                    <path
                      d={activeForm.paths.collar}
                      fill="#E5DFD4"
                      stroke={activeHotspot === 'cap' ? '#C5A059' : '#282014'}
                      strokeWidth={activeHotspot === 'cap' ? 1.4 : 1.15}
                      style={{ transition: 'stroke 300ms ease' }}
                    />
                    <path
                      d={activeForm.paths.bulb}
                      fill="#DACFB9"
                      stroke={activeHotspot === 'cap' ? '#C5A059' : '#282014'}
                      strokeWidth={activeHotspot === 'cap' ? 1.4 : 1.15}
                      style={{ transition: 'stroke 300ms ease' }}
                    />

                    <path
                      d={activeForm.paths.pipetteTube}
                      stroke="#C5A059"
                      strokeWidth="0.75"
                      opacity="0.65"
                      strokeDasharray="4 2"
                      fill="none"
                    />
                  </g>
                )}

                {/* Specimen Base Push-up (Punt) & Reinforced Foot Geometry */}
                {activeForm.paths.baseConcavePunt && (
                  <path
                    d={activeForm.paths.baseConcavePunt}
                    stroke="#C5A059"
                    strokeWidth="0.85"
                    strokeDasharray="3 2"
                    fill="none"
                    opacity="0.65"
                    style={{ transition: 'stroke 300ms ease' }}
                  />
                )}
                <path
                  d={activeForm.paths.baseFloor}
                  stroke="#C5A059"
                  strokeWidth={activeHotspot === 'base' ? 1.6 : 1.3}
                  opacity="0.80"
                  style={{ transition: 'stroke-width 300ms ease' }}
                />
              </motion.g>
            </AnimatePresence>

            {/* =========================================================================
                DIMENSION SYSTEM (Height & Diameter) — Completely Stable
                Protected dedicated zone on the right (X >= 270) and bottom (Y >= 286)
                ========================================================================= */}
            <motion.g 
              stroke="#C5A059" 
              strokeWidth="0.65" 
              opacity={isDesktopHovering ? 0.90 : 0.70}
              transition={{ duration: 0.3 }}
            >
              <motion.line 
                x1="262" 
                x2="284" 
                animate={{ y1: heightTop, y2: heightTop }}
                transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
              />
              <motion.line 
                x1="262" 
                x2="284" 
                animate={{ y1: heightBottom, y2: heightBottom }}
                transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
              />
              <motion.line 
                x1="280" 
                x2="280" 
                animate={{ y1: heightTop, y2: heightBottom }}
                strokeDasharray="3 2" 
                transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
              />
              <motion.path 
                animate={{ d: `M 278 ${heightTop + 6} L 280 ${heightTop} L 282 ${heightTop + 6}` }}
                fill="none" 
                strokeWidth="0.8" 
                transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
              />
              <motion.path 
                animate={{ d: `M 278 ${heightBottom - 6} L 280 ${heightBottom} L 282 ${heightBottom - 6}` }}
                fill="none" 
                strokeWidth="0.8" 
                transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
              />
            </motion.g>

            {/* Height text label positioned dynamically at midpoint */}
            <motion.text
              x="286"
              animate={{ y: (heightTop + heightBottom) / 2 }}
              fill="#282014"
              fontSize="7.5"
              fontFamily="monospace"
              letterSpacing="0.1em"
              transform={`rotate(90 286 ${(heightTop + heightBottom) / 2})`}
              opacity="0.85"
              transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            >
              H: {activeForm.heightMm}
            </motion.text>

            {/* Diameter Callout (Bottom Center) */}
            <motion.g 
              stroke="#C5A059" 
              strokeWidth="0.65" 
              opacity={isDesktopHovering ? 0.90 : 0.70}
              transition={{ duration: 0.3 }}
            >
              <motion.line 
                y1="286" 
                y2="304" 
                animate={{ x1: widthLeft, x2: widthLeft }}
                transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
              />
              <motion.line 
                y1="286" 
                y2="304" 
                animate={{ x1: widthRight, x2: widthRight }}
                transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
              />
              <motion.line 
                y1="300" 
                y2="300" 
                animate={{ x1: widthLeft, x2: widthRight }}
                strokeDasharray="3 2" 
                transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
              />
              <motion.path 
                animate={{ d: `M ${widthLeft + 6} 298 L ${widthLeft} 300 L ${widthLeft + 6} 302` }}
                fill="none" 
                strokeWidth="0.8" 
                transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
              />
              <motion.path 
                animate={{ d: `M ${widthRight - 6} 298 L ${widthRight} 300 L ${widthRight - 6} 302` }}
                fill="none" 
                strokeWidth="0.8" 
                transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
              />
            </motion.g>

            {/* Diameter and Nominal Capacity Text */}
            <text
              x="170"
              y="311"
              textAnchor="middle"
              fill="#282014"
              fontSize="7.5"
              fontFamily="monospace"
              letterSpacing="0.12em"
              opacity="0.85"
            >
              Ø {activeForm.diameterMm} · NOMINAL {activeForm.nominalVol}
            </text>

            {/* =========================================================================
                LAYER 3: SPECIMEN ANNOTATIONS & LEADER LINES — Completely Stable
                Robust Non-Overlapping System:
                - AnimatePresence mode="wait" ensures old annotations exit before new mount
                - Primary Label (high contrast charcoal #1A1612, bold)
                - Secondary Detail (soft champagne gold #9B7B38, normal)
                - Leader lines terminate cleanly at X=32 with 8px whitespace buffer before text
                - Zero text overlap, zero shake, zero movement
                ========================================================================= */}
            <AnimatePresence mode="wait">
              <motion.g
                key={`annotations-${activeForm.id}`}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -6 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                {(['cap', 'neck', 'body', 'base']).map((key) => {
                  const item = ann[key];
                  const isHot = activeHotspot === key;
                  return (
                    <g
                      key={`${activeForm.id}-${key}`}
                      className="cursor-pointer"
                      onMouseEnter={() => setActiveHotspot(key)}
                      onMouseLeave={() => setActiveHotspot(null)}
                    >
                      {/* Connector Line - terminates before text with clean whitespace gap */}
                      <line
                        x1="32"
                        y1={item.pointY}
                        x2={item.pointX}
                        y2={item.pointY}
                        stroke="#C5A059"
                        strokeWidth={isHot ? 1.0 : 0.65}
                        strokeDasharray="2.5 2"
                        opacity={isHot ? 0.95 : 0.55}
                        style={{ transition: 'opacity 250ms ease, stroke-width 250ms ease' }}
                      />
                      {/* Connector terminal dot on specimen boundary */}
                      <circle
                        cx={item.pointX}
                        cy={item.pointY}
                        r={isHot ? 2.4 : 1.5}
                        fill="#C5A059"
                        style={{ transition: 'r 250ms ease' }}
                      />

                      {/* Primary Technical Label (stronger contrast, charcoal #1A1612) */}
                      <text
                        x="24"
                        y={item.textY}
                        textAnchor="end"
                        fill={isHot ? '#11100D' : '#282014'}
                        fontSize="8"
                        fontFamily="monospace"
                        letterSpacing="0.10em"
                        fontWeight={isHot ? '700' : '600'}
                        opacity={isHot ? 1.0 : 0.85}
                        style={{ transition: 'opacity 250ms ease, fill 250ms ease' }}
                      >
                        {item.title}
                      </text>

                      {/* Secondary Technical Detail (smaller, lower contrast, champagne gold #9B7B38) */}
                      <text
                        x="24"
                        y={item.subY}
                        textAnchor="end"
                        fill="#9B7B38"
                        fontSize="6.8"
                        fontFamily="monospace"
                        letterSpacing="0.10em"
                        fontWeight="400"
                        opacity={isHot ? 1.0 : 0.75}
                        style={{ transition: 'opacity 250ms ease' }}
                      >
                        {item.subtitle}
                      </text>
                    </g>
                  );
                })}
              </motion.g>
            </AnimatePresence>

          </svg>
        </div>
      </div>

      {/* =========================================================================
          STEP 9: INLINE MATERIAL STUDY (Authentic Swatches with Champagne-Gold Ring)
          Preview on Hover, Commit on Click. Automatically cycles on mobile/idle.
          Responsive Spacing: Swatches on line 1, Specimen/Material descriptor on line 2 (mobile)
          or clean right-aligned badge on desktop. Never merges with "FROSTED".
          ========================================================================= */}
      <motion.div 
        initial={{ opacity: shouldReduce ? 1 : 0, y: shouldReduce ? 0 : 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="relative z-10 pt-2.5 border-t border-[#282014]/[0.10] flex flex-col sm:flex-row sm:items-center justify-between gap-2"
      >
        {/* Swatches Block */}
        <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap">
          <span className="font-mono text-[8.5px] sm:text-[9px] tracking-[0.18em] font-semibold text-neutral-500 uppercase shrink-0">
            MATERIAL STUDY:
          </span>
          <div className="flex items-center gap-3.5 sm:gap-4">
            {MATERIAL_STUDIES.map((mat) => {
              const isSelected = activeMaterialId === mat.id;
              const isPreviewed = previewMaterialId === mat.id;
              const isHighlighted = isSelected || isPreviewed;

              return (
                <button
                  key={mat.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleMaterialCommit(mat.id);
                  }}
                  onMouseEnter={() => setPreviewMaterialId(mat.id)}
                  onMouseLeave={() => setPreviewMaterialId(null)}
                  className="flex items-center gap-1.5 group cursor-pointer focus:outline-none"
                  aria-label={`Select ${mat.fullName}`}
                >
                  {/* Representative material swatch circle with champagne-gold active ring */}
                  <span 
                    className={`w-3.5 h-3.5 rounded-full transition-all duration-300 shadow-2xs relative flex items-center justify-center ${
                      isHighlighted 
                        ? 'ring-1.5 ring-luxury-gold ring-offset-1 scale-110' 
                        : 'opacity-70 group-hover:opacity-100'
                    }`}
                    style={mat.swatchStyle}
                  >
                    {isHighlighted && <span className="w-1 h-1 rounded-full bg-luxury-gold" />}
                  </span>
                  <span className={`font-mono text-[8.5px] sm:text-[9px] tracking-[0.15em] uppercase transition-colors duration-300 ${
                    isHighlighted ? 'text-luxury-charcoal font-bold' : 'text-neutral-500 group-hover:text-luxury-charcoal'
                  }`}>
                    {mat.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dedicated Independent Specimen Descriptor Block */}
        <div className="flex items-center justify-between sm:justify-end gap-2.5 pt-1 sm:pt-0 border-t border-[#282014]/[0.05] sm:border-0">
          <span className="font-mono text-[7.5px] sm:text-[8px] tracking-[0.15em] text-[#C5A059] uppercase font-semibold shrink-0">
            SPECIMEN / PTI-{activeForm.index}
          </span>
          <span className="text-[#282014]/20 text-[8px]">·</span>
          <span className="font-mono text-[7.5px] sm:text-[8px] tracking-[0.12em] text-[#282014]/65 uppercase truncate max-w-[200px] sm:max-w-none text-right">
            {activeHotspot 
              ? `${activeForm.annotations[activeHotspot].title}` 
              : activeMaterial.descriptor}
          </span>
        </div>
      </motion.div>

    </div>
  );
}
