import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RotateCw, Sparkles } from 'lucide-react';

// Physical packaging finish definitions with authentic champagne gold hardware
export const FINISHES = {
  emerald: {
    id: 'emerald',
    name: 'EMERALD GLASS',
    descriptor: 'DEEP TRANSLUCENT GLASS',
    activeSwatch: {
      background: 'radial-gradient(circle at 35% 25%, #34d399 0%, #059669 35%, #047857 70%, #022c22 100%)',
      boxShadow: 'inset 0 1.5px 2px rgba(255,255,255,0.85), inset 0 -1px 2px rgba(0,0,0,0.5), 0 0 14px rgba(16, 185, 129, 0.4)'
    },
    inactiveSwatch: {
      background: 'radial-gradient(circle at 35% 25%, #059669 0%, #047857 45%, #022c22 90%, #011c15 100%)',
      boxShadow: 'inset 0 1px 1.5px rgba(255,255,255,0.35), inset 0 -1px 2px rgba(0,0,0,0.6), 0 2px 5px rgba(0,0,0,0.6)'
    },
    glintColor: 'rgba(212, 175, 55, 0.45)',
    glassColor: 0x054837,
    attenuationColor: 0x012b1c,
    attenuationDistance: 1.1,
    liquidColor: 0x033828,
    liquidOpacity: 0.94,
    liquidTransmission: 0.72,
    roughness: 0.015,
    transmission: 0.98,
    ior: 1.54,
    capColor: 0xd0b680,
    capMetalness: 0.98,
    capRoughness: 0.22,
    backLightColor: 0x34d399,
    ambientAtmosphere: 'rgba(5, 72, 55, 0.14)'
  },
  clear: {
    id: 'clear',
    name: 'CLEAR CRYSTAL',
    descriptor: 'OPTICAL CLEAR GLASS',
    activeSwatch: {
      background: 'radial-gradient(circle at 35% 25%, #ffffff 0%, #f0f9ff 30%, rgba(190,225,255,0.85) 60%, #cbd5e1 90%, #94a3b8 100%)',
      boxShadow: 'inset 0 2px 3px rgba(255,255,255,1.0), inset 0 -1px 2px rgba(148,163,184,0.4), 0 0 14px rgba(255, 255, 255, 0.45)'
    },
    inactiveSwatch: {
      background: 'radial-gradient(circle at 35% 25%, rgba(255,255,255,0.7) 0%, rgba(200,220,240,0.4) 50%, #94a3b8 100%)',
      boxShadow: 'inset 0 1px 1.5px rgba(255,255,255,0.4), inset 0 -1px 1.5px rgba(0,0,0,0.4), 0 2px 5px rgba(0,0,0,0.5)'
    },
    glintColor: 'rgba(255, 255, 255, 0.65)',
    glassColor: 0xffffff,
    attenuationColor: 0xffffff,
    attenuationDistance: 8.0,
    liquidColor: 0xdfa84a,
    liquidOpacity: 0.65,
    liquidTransmission: 0.90,
    roughness: 0.01,
    transmission: 0.99,
    ior: 1.52,
    capColor: 0xd0b680,
    capMetalness: 0.98,
    capRoughness: 0.22,
    backLightColor: 0xe0f2fe,
    ambientAtmosphere: 'rgba(212, 175, 55, 0.08)'
  },
  amber: {
    id: 'amber',
    name: 'AMBER GLASS',
    descriptor: 'WARM TRANSLUCENT GLASS',
    activeSwatch: {
      background: 'radial-gradient(circle at 35% 25%, #fde047 0%, #f59e0b 35%, #b45309 70%, #451a03 100%)',
      boxShadow: 'inset 0 1.5px 2px rgba(255,255,255,0.9), inset 0 -1px 2px rgba(0,0,0,0.5), 0 0 14px rgba(245, 158, 11, 0.45)'
    },
    inactiveSwatch: {
      background: 'radial-gradient(circle at 35% 25%, #d97706 0%, #92400e 45%, #451a03 90%, #260e02 100%)',
      boxShadow: 'inset 0 1px 1.5px rgba(255,255,255,0.4), inset 0 -1px 2px rgba(0,0,0,0.6), 0 2px 5px rgba(0,0,0,0.6)'
    },
    glintColor: 'rgba(253, 224, 71, 0.5)',
    glassColor: 0x9a4a10,
    attenuationColor: 0x612803,
    attenuationDistance: 0.9,
    liquidColor: 0x7c3206,
    liquidOpacity: 0.88,
    liquidTransmission: 0.82,
    roughness: 0.025,
    transmission: 0.92,
    ior: 1.54,
    capColor: 0x242424,
    capMetalness: 0.9,
    capRoughness: 0.25,
    backLightColor: 0xf59e0b,
    ambientAtmosphere: 'rgba(154, 74, 16, 0.12)'
  },
  frosted: {
    id: 'frosted',
    name: 'FROSTED MATTE',
    descriptor: 'SOFT DIFFUSED GLASS',
    activeSwatch: {
      background: 'radial-gradient(circle at 40% 30%, #ffffff 0%, #f8fafc 40%, #e2e8f0 75%, #94a3b8 100%)',
      boxShadow: 'inset 0 2px 2.5px rgba(255,255,255,1.0), inset 0 -1px 1.5px rgba(0,0,0,0.25), 0 0 12px rgba(240, 253, 244, 0.35)'
    },
    inactiveSwatch: {
      background: 'radial-gradient(circle at 40% 30%, #e2e8f0 0%, #cbd5e1 50%, #64748b 100%)',
      boxShadow: 'inset 0 1px 1.5px rgba(255,255,255,0.45), inset 0 -1px 1.5px rgba(0,0,0,0.35), 0 2px 5px rgba(0,0,0,0.5)'
    },
    glintColor: 'rgba(255, 255, 255, 0.5)',
    glassColor: 0xf0fdf4,
    attenuationColor: 0x064e3b,
    attenuationDistance: 1.4,
    liquidColor: 0x065f46,
    liquidOpacity: 0.78,
    liquidTransmission: 0.75,
    roughness: 0.32,
    transmission: 0.84,
    ior: 1.48,
    capColor: 0xd0b680,
    capMetalness: 0.98,
    capRoughness: 0.22,
    backLightColor: 0xd4af37,
    ambientAtmosphere: 'rgba(240, 253, 244, 0.08)'
  },
  obsidian: {
    id: 'obsidian',
    name: 'OBSIDIAN BLACK',
    descriptor: 'SMOKED BLACK GLASS',
    activeSwatch: {
      background: 'radial-gradient(circle at 35% 25%, #71717a 0%, #3f3f46 30%, #18181b 75%, #050507 100%)',
      boxShadow: 'inset 0 1.5px 2px rgba(255,255,255,0.6), inset 0 -1px 2px rgba(0,0,0,0.9), 0 0 12px rgba(161, 161, 170, 0.25)'
    },
    inactiveSwatch: {
      background: 'radial-gradient(circle at 35% 25%, #3f3f46 0%, #18181b 50%, #09090b 100%)',
      boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.25), inset 0 -1px 2px rgba(0,0,0,0.9), 0 2px 5px rgba(0,0,0,0.7)'
    },
    glintColor: 'rgba(212, 175, 55, 0.35)',
    glassColor: 0x141414,
    attenuationColor: 0x050505,
    attenuationDistance: 0.45,
    liquidColor: 0x0a0a0a,
    liquidOpacity: 0.96,
    liquidTransmission: 0.35,
    roughness: 0.06,
    transmission: 0.45,
    ior: 1.58,
    capColor: 0xc5a059,
    capMetalness: 0.98,
    capRoughness: 0.22,
    backLightColor: 0xa3a3a3,
    ambientAtmosphere: 'rgba(20, 20, 20, 0.15)'
  }
};

/**
 * Creates a rounded rectangular extruded geometry with multi-segmented precision bevels
 */
function createRoundedBox(width, height, depth, radius, smoothness = 8) {
  const shape = new THREE.Shape();
  const halfW = width / 2;
  const halfH = height / 2;
  const r = Math.min(radius, width / 2, height / 2);

  shape.moveTo(-halfW + r, -halfH);
  shape.lineTo(halfW - r, -halfH);
  shape.absarc(halfW - r, -halfH + r, r, -Math.PI / 2, 0, false);
  shape.lineTo(halfW, halfH - r);
  shape.absarc(halfW - r, halfH - r, r, 0, Math.PI / 2, false);
  shape.lineTo(-halfW + r, halfH);
  shape.absarc(-halfW + r, halfH - r, r, Math.PI / 2, Math.PI, false);
  shape.lineTo(-halfW, -halfH + r);
  shape.absarc(-halfW + r, -halfH + r, r, Math.PI, Math.PI * 1.5, false);

  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth: depth - r * 2,
    bevelEnabled: true,
    bevelSegments: smoothness,
    steps: 1,
    bevelSize: r,
    bevelThickness: r,
    curveSegments: smoothness
  });

  geometry.center();
  geometry.computeVertexNormals();
  return geometry;
}

/**
 * Generates the authentic screen-printed champagne gold foil typography texture
 */
function createLabelTexture(logoImage) {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, 1024, 1024);

  const goldGrad = ctx.createLinearGradient(280, 360, 744, 560);
  goldGrad.addColorStop(0, '#fffbeb');
  goldGrad.addColorStop(0.2, '#fef08a');
  goldGrad.addColorStop(0.45, '#eab308');
  goldGrad.addColorStop(0.75, '#ca8a04');
  goldGrad.addColorStop(1, '#fef08a');

  // If official logo is loaded, render with champagne gold foil
  if (logoImage && logoImage.complete && logoImage.naturalWidth > 0) {
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = logoImage.naturalWidth;
    tempCanvas.height = logoImage.naturalHeight;
    const tempCtx = tempCanvas.getContext('2d');
    tempCtx.drawImage(logoImage, 0, 0);

    const imgData = tempCtx.getImageData(0, 0, tempCanvas.width, tempCanvas.height);
    const data = imgData.data;

    for (let i = 0; i < data.length; i += 4) {
      const alpha = data[i + 3];
      if (alpha > 8) {
        const brightness = (data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114) / 255;
        data[i] = Math.min(255, Math.floor(224 + brightness * 31));   // R
        data[i + 1] = Math.min(255, Math.floor(185 + brightness * 55)); // G
        data[i + 2] = Math.min(255, Math.floor(80 + brightness * 100)); // B
        data[i + 3] = Math.min(255, alpha * 1.1);
      }
    }
    tempCtx.putImageData(imgData, 0, 0);

    // Draw centered on main canvas in the upper-mid region (~28% bottle width)
    const targetW = 560;
    const targetH = (logoImage.naturalHeight / logoImage.naturalWidth) * targetW;
    const targetX = (1024 - targetW) / 2;
    const targetY = 430 - targetH / 2;
    ctx.drawImage(tempCanvas, targetX, targetY, targetW, targetH);
  } else {
    // Vector render fallback: Exact signature ligature PACKTURE INTERNATIONAL logo
    ctx.save();
    ctx.textAlign = 'center';
    
    // Draw stylized 'P' flourish
    ctx.strokeStyle = goldGrad;
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(330, 480);
    ctx.lineTo(330, 410);
    ctx.arc(360, 430, 20, -Math.PI / 2, Math.PI / 2, false);
    ctx.lineTo(330, 450);
    ctx.stroke();

    // Main typography
    ctx.fillStyle = goldGrad;
    ctx.font = '600 50px "Cinzel", "Playfair Display", "Times New Roman", serif';
    ctx.letterSpacing = '14px';
    ctx.shadowColor = 'rgba(0,0,0,0.85)';
    ctx.shadowBlur = 4;
    ctx.fillText('PACKTURE', 525, 450);

    // Subtitle
    ctx.fillStyle = '#fef08a';
    ctx.font = '500 21px "Inter", "Montserrat", sans-serif';
    ctx.letterSpacing = '20px';
    ctx.fillText('INTERNATIONAL', 512, 502);
    ctx.restore();
  }

  // Lower typography: MONOLITH ELITE, 100ML, EXTRAIT DE PARFUM
  ctx.textAlign = 'center';

  // MONOLITH ELITE
  ctx.fillStyle = '#fef08a';
  ctx.font = '600 28px "Cinzel", "Playfair Display", "Times New Roman", serif';
  ctx.letterSpacing = '12px';
  ctx.shadowColor = 'rgba(0,0,0,0.9)';
  ctx.shadowBlur = 4;
  ctx.fillText('MONOLITH ELITE', 512, 760);

  // 100ML (Crisp, high-contrast)
  ctx.fillStyle = '#fffbeb';
  ctx.font = '600 24px "Inter", "Montserrat", sans-serif';
  ctx.letterSpacing = '8px';
  ctx.fillText('100ML', 512, 806);

  // EXTRAIT DE PARFUM
  ctx.fillStyle = '#d4af37';
  ctx.font = '500 16px "Inter", "Montserrat", sans-serif';
  ctx.letterSpacing = '10px';
  ctx.fillText('EXTRAIT DE PARFUM', 512, 846);

  const texture = new THREE.CanvasTexture(canvas);
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.needsUpdate = true;
  return texture;
}

/**
 * Generates an equirectangular studio lighting environment map with vertical strip softboxes
 */
let cachedStudioCanvas = null;

function getStudioCanvas() {
  if (cachedStudioCanvas) return cachedStudioCanvas;

  const canvas = document.createElement('canvas');
  // 512x256 is 75% fewer pixels than 1024x512, processing at 4x speed with identical smooth lighting
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');

  // Dark luxury studio gradient
  const bgGrad = ctx.createLinearGradient(0, 0, 0, 256);
  bgGrad.addColorStop(0, '#0a0a0c');
  bgGrad.addColorStop(0.5, '#161513');
  bgGrad.addColorStop(1, '#040405');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, 512, 256);

  // Left Studio Vertical Softbox Strip (Produces sharp vertical glass edge highlights)
  const leftStrip = ctx.createLinearGradient(65, 0, 120, 0);
  leftStrip.addColorStop(0, 'rgba(255,255,255,0)');
  leftStrip.addColorStop(0.5, 'rgba(255,252,242,1.0)');
  leftStrip.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = leftStrip;
  ctx.fillRect(65, 12, 55, 230);

  // Right Studio Vertical Softbox Strip
  const rightStrip = ctx.createLinearGradient(385, 0, 440, 0);
  rightStrip.addColorStop(0, 'rgba(255,255,255,0)');
  rightStrip.addColorStop(0.5, 'rgba(255,252,242,0.95)');
  rightStrip.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = rightStrip;
  ctx.fillRect(385, 12, 55, 230);

  // Top Overhead Softbox Panel (Illuminates cap crown and shoulders)
  const topBox = ctx.createRadialGradient(256, 45, 5, 256, 45, 125);
  topBox.addColorStop(0, 'rgba(255,248,225,0.98)');
  topBox.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = topBox;
  ctx.fillRect(130, 0, 252, 110);

  // Warm Amber Ground Reflection
  const floorBounce = ctx.createRadialGradient(256, 225, 10, 256, 225, 160);
  floorBounce.addColorStop(0, 'rgba(197,160,89,0.35)');
  floorBounce.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = floorBounce;
  ctx.fillRect(90, 170, 332, 86);

  cachedStudioCanvas = canvas;
  return cachedStudioCanvas;
}

function createStudioEnvironment(renderer) {
  const canvas = getStudioCanvas();
  const envTexture = new THREE.CanvasTexture(canvas);
  envTexture.mapping = THREE.EquirectangularReflectionMapping;

  const pmremGenerator = new THREE.PMREMGenerator(renderer);
  pmremGenerator.compileEquirectangularShader();
  const envMap = pmremGenerator.fromEquirectangular(envTexture).texture;

  envTexture.dispose();
  pmremGenerator.dispose();
  return envMap;
}

export default function HeroBottle3D({ onFinishChange }) {
  const mountRef = useRef(null);
  const [activeFinish, setActiveFinish] = useState('emerald');
  const [hoveredFinish, setHoveredFinish] = useState(null);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [webglSupported, setWebglSupported] = useState(true);
  const [is3DReady, setIs3DReady] = useState(false);

  // References for live material updates
  const materialsRef = useRef({});
  const labelMatRef = useRef(null);
  const activeFinishRef = useRef(activeFinish);
  activeFinishRef.current = activeFinish;

  useEffect(() => {
    if (activeFinish !== 'emerald') {
      onFinishChange?.(FINISHES[activeFinish]);
    }
  }, [activeFinish, onFinishChange]);

  useEffect(() => {
    let isMounted = true;
    let cleanup3D = null;
    let timerId = null;
    let idleId = null;

    // WebGL support validation
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        setWebglSupported(false);
        return;
      }
    } catch {
      setWebglSupported(false);
      return;
    }

    const initThreeScene = () => {
      if (!isMounted) return;
      const container = mountRef.current;
      if (!container) return;

      const width = container.clientWidth || 360;
      const height = container.clientHeight || 460;

      // --- 1. Scene & Camera ---
      const scene = new THREE.Scene();

      // Professional 85mm product lens perspective (tight 30deg FOV, true proportions)
      const camera = new THREE.PerspectiveCamera(30, width / height, 0.1, 50);

      // --- MATHEMATICAL CAMERA FRAMING FUNCTION ---
      const updateCameraDistance = (w, h) => {
        const aspect = w / h;
        camera.aspect = aspect;

        // Model total height from bottom of shadow (-1.45) to top of cap (+2.25) is ~3.70 units
        const modelHeight = 4.25; // Generous vertical safety margin so cap, bottle, and shadow NEVER clip
        const modelWidth = 2.5;

        const fovRad = (camera.fov * Math.PI) / 180;
        const distVertical = (modelHeight / 2) / Math.tan(fovRad / 2);
        const distHorizontal = (modelWidth / 2) / (Math.tan(fovRad / 2) * aspect);

        const requiredDist = Math.max(distVertical, distHorizontal) * 1.04;

        // Position camera centered on the 3D model's visual midpoint (y = 0.38)
        camera.position.set(0, 0.38, requiredDist);
        camera.lookAt(0, 0.38, 0);
        camera.updateProjectionMatrix();
      };

      updateCameraDistance(width, height);

      // --- 2. High Performance WebGL Renderer ---
      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance'
      });
      // CRITICAL: Disable synchronous getProgramInfoLog / getShaderInfoLog driver stalls!
      renderer.debug.checkShaderErrors = false;
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.42;
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      container.appendChild(renderer.domElement);

      // --- 3. Studio HDRI Environment Map ---
      const studioEnvMap = createStudioEnvironment(renderer);
      scene.environment = studioEnvMap;

      // --- 4. Studio Cinematic Softbox Lighting Setup ---
      const ambientLight = new THREE.AmbientLight(0xfffaed, 0.92);
      scene.add(ambientLight);

      // Left Key Studio Softbox Light (Upper-left key light)
      const keyLight = new THREE.DirectionalLight(0xfffaee, 4.2);
      keyLight.position.set(3.5, 4.5, 4.0);
      scene.add(keyLight);

      // Left Edge Vertical Softbox Strip (Creates long elegant glass reflections)
      const leftEdgeLight = new THREE.DirectionalLight(0xffffff, 3.8);
      leftEdgeLight.position.set(-5.0, 2.0, 2.0);
      scene.add(leftEdgeLight);

      // Right Edge Vertical Softbox Strip
      const rightEdgeLight = new THREE.DirectionalLight(0xe2f1ff, 3.2);
      rightEdgeLight.position.set(5.0, 2.0, 2.0);
      scene.add(rightEdgeLight);

      // Top Overhead Softbox Bank (for cap crown and shoulders)
      const topLight = new THREE.DirectionalLight(0xfff3db, 3.0);
      topLight.position.set(0, 7.0, 1.5);
      scene.add(topLight);

      // Rear Emerald Rim Light (Illuminates glass thickness & edge silhouette)
      const currentFinishKey = activeFinishRef.current || 'emerald';
      const initialFinish = FINISHES[currentFinishKey] || FINISHES.emerald;
      const backRim = new THREE.DirectionalLight(initialFinish.backLightColor, 2.8);
      backRim.position.set(0, 2.0, -4.5);
      scene.add(backRim);

      // --- 5. 3D Model Hierarchy & Architectural Geometry ---
      const bottleGroup = new THREE.Group();
      scene.add(bottleGroup);

      // A. Outer Heavy Glass Shell with Precision Bevels
      const outerGlassGeo = createRoundedBox(1.72, 2.50, 1.08, 0.14, 8);

      const outerGlassMat = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color(initialFinish.glassColor),
        roughness: initialFinish.roughness,
        transmission: initialFinish.transmission,
        thickness: 1.8,
        ior: initialFinish.ior,
        reflectivity: 0.98,
        clearcoat: 1.0,
        clearcoatRoughness: 0.0,
        attenuationColor: new THREE.Color(initialFinish.attenuationColor),
        attenuationDistance: initialFinish.attenuationDistance,
        transparent: true,
        opacity: 0.99
      });

      const outerGlass = new THREE.Mesh(outerGlassGeo, outerGlassMat);
      outerGlass.position.y = -0.15;
      bottleGroup.add(outerGlass);

      // B. Inner Liquid Core & Thick Solid Crystal Base
      const innerLiquidGeo = createRoundedBox(1.40, 1.78, 0.76, 0.08, 8);

      const innerLiquidMat = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color(initialFinish.liquidColor),
        roughness: 0.02,
        transmission: initialFinish.liquidTransmission,
        thickness: 1.1,
        ior: 1.44,
        transparent: true,
        opacity: initialFinish.liquidOpacity,
        clearcoat: 0.95
      });

      const innerLiquid = new THREE.Mesh(innerLiquidGeo, innerLiquidMat);
      innerLiquid.position.set(0, 0.10, 0);
      bottleGroup.add(innerLiquid);

      // C. Screen-Printed Gold Foil Decal (Official PACKTURE INTERNATIONAL Logo from /logo.png)
      const logoImg = new Image();
      logoImg.src = '/logo.png';
      
      let labelTex = createLabelTexture(null);
      const labelGeo = new THREE.PlaneGeometry(1.46, 2.05);
      const labelMat = new THREE.MeshStandardMaterial({
        map: labelTex,
        transparent: true,
        alphaTest: 0.01,
        metalness: 0.96,
        roughness: 0.16,
        color: 0xffffff,
        emissive: new THREE.Color(0xd4af37),
        emissiveIntensity: 0.42,
        depthWrite: false,
        depthTest: true,
        polygonOffset: true,
        polygonOffsetFactor: -2,
        polygonOffsetUnits: -2,
        side: THREE.FrontSide
      });
      labelMatRef.current = labelMat;

      logoImg.onload = () => {
        if (!isMounted) return;
        const updatedTex = createLabelTexture(logoImg);
        labelMat.map = updatedTex;
        labelMat.needsUpdate = true;
      };

      const labelMeshFront = new THREE.Mesh(labelGeo, labelMat);
      labelMeshFront.position.set(0, -0.06, 0.545);
      bottleGroup.add(labelMeshFront);

      const labelMeshBack = new THREE.Mesh(labelGeo, labelMat);
      labelMeshBack.position.set(0, -0.06, -0.545);
      labelMeshBack.rotation.y = Math.PI;
      bottleGroup.add(labelMeshBack);

      // D. Fine Internal Glass Dip Tube
      const dipTubeGeo = new THREE.CylinderGeometry(0.016, 0.016, 2.05, 12);
      const dipTubeMat = new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        roughness: 0.1,
        transmission: 0.88,
        transparent: true,
        opacity: 0.5
      });
      const dipTube = new THREE.Mesh(dipTubeGeo, dipTubeMat);
      dipTube.position.set(0.02, 0.03, 0);
      bottleGroup.add(dipTube);

      // E. Multi-Tier Machined Champagne Gold Neck Assembly
      const collarGroup = new THREE.Group();
      collarGroup.position.y = 1.15;
      bottleGroup.add(collarGroup);

      const collarMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(initialFinish.capColor),
        metalness: initialFinish.capMetalness,
        roughness: initialFinish.capRoughness
      });

      const collarBaseGeo = new THREE.CylinderGeometry(0.44, 0.44, 0.06, 24);
      const collarBase = new THREE.Mesh(collarBaseGeo, collarMat);
      collarBase.position.y = -0.02;
      collarGroup.add(collarBase);

      const collarCenterGeo = new THREE.CylinderGeometry(0.34, 0.34, 0.16, 24);
      const collarCenter = new THREE.Mesh(collarCenterGeo, collarMat);
      collarCenter.position.y = 0.08;
      collarGroup.add(collarCenter);

      const collarTopGeo = new THREE.CylinderGeometry(0.38, 0.38, 0.06, 24);
      const collarTop = new THREE.Mesh(collarTopGeo, collarMat);
      collarTop.position.y = 0.18;
      collarGroup.add(collarTop);

      // F. Architectural Machined Champagne Gold Cap
      const capGroup = new THREE.Group();
      capGroup.position.y = 1.76;
      bottleGroup.add(capGroup);

      const capMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(initialFinish.capColor),
        metalness: initialFinish.capMetalness,
        roughness: initialFinish.capRoughness
      });

      const capInsetGeo = createRoundedBox(1.10, 0.10, 0.76, 0.04, 6);
      const capInset = new THREE.Mesh(capInsetGeo, capMat);
      capInset.position.y = -0.32;
      capGroup.add(capInset);

      const capMainGeo = createRoundedBox(1.26, 0.72, 0.88, 0.05, 8);
      const capMain = new THREE.Mesh(capMainGeo, capMat);
      capMain.position.y = 0.08;
      capGroup.add(capMain);

      const capCrownGeo = createRoundedBox(1.16, 0.03, 0.78, 0.03, 6);
      const capCrown = new THREE.Mesh(capCrownGeo, capMat);
      capCrown.position.y = 0.46;
      capGroup.add(capCrown);

      // G. Soft Ground Contact Shadow
      const shadowGeo = new THREE.PlaneGeometry(3.6, 3.6);
      const shadowCanvas = document.createElement('canvas');
      shadowCanvas.width = 256;
      shadowCanvas.height = 256;
      const sCtx = shadowCanvas.getContext('2d');
      const sGrad = sCtx.createRadialGradient(128, 128, 10, 128, 128, 115);
      sGrad.addColorStop(0, 'rgba(0,0,0,0.72)');
      sGrad.addColorStop(0.4, 'rgba(0,0,0,0.22)');
      sGrad.addColorStop(1, 'rgba(0,0,0,0)');
      sCtx.fillStyle = sGrad;
      sCtx.fillRect(0, 0, 256, 256);

      const shadowTex = new THREE.CanvasTexture(shadowCanvas);
      const shadowMat = new THREE.MeshBasicMaterial({
        map: shadowTex,
        transparent: true,
        opacity: 0.82,
        depthWrite: false
      });
      const contactShadow = new THREE.Mesh(shadowGeo, shadowMat);
      contactShadow.rotation.x = -Math.PI / 2;
      contactShadow.position.y = -1.42;
      bottleGroup.add(contactShadow);

      // Store references for live finish updates
      materialsRef.current = {
        outerGlassMat,
        innerLiquidMat,
        collarMat,
        capMat,
        backRim
      };

      let targetRotationX = 0.03;
      let targetRotationY = -0.14;
      let currentRotationX = 0.03;
      let currentRotationY = -0.14;

      let isDragging = false;
      let previousPointerX = 0;
      let previousPointerY = 0;

      let cachedRect = {
        left: 0,
        top: 0,
        width,
        height
      };

      const updateCachedRect = () => {
        if (!container) return;
        const rect = container.getBoundingClientRect();
        cachedRect.left = rect.left;
        cachedRect.top = rect.top;
        cachedRect.width = rect.width || container.clientWidth || 360;
        cachedRect.height = rect.height || container.clientHeight || 460;
      };

      updateCachedRect();

      let latestPointerY = 0;
      let pointerNeedsUpdate = false;

      const onPointerDown = (e) => {
        isDragging = true;
        setHasInteracted(true);
        updateCachedRect();
        previousPointerX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
        previousPointerY = e.clientY || (e.touches && e.touches[0].clientY) || 0;
      };

      const onPointerMove = (e) => {
        const clientX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
        const clientY = e.clientY || (e.touches && e.touches[0].clientY) || 0;

        if (isDragging) {
          const deltaX = clientX - previousPointerX;
          const deltaY = clientY - previousPointerY;

          targetRotationY += deltaX * 0.009;
          targetRotationX += deltaY * 0.005;

          targetRotationX = Math.max(-0.30, Math.min(0.35, targetRotationX));

          previousPointerX = clientX;
          previousPointerY = clientY;
        } else {
          latestPointerY = clientY;
          pointerNeedsUpdate = true;
        }
      };

      const onPointerUp = () => {
        isDragging = false;
      };

      const domElement = renderer.domElement;
      domElement.style.touchAction = 'pan-y';
      domElement.style.cursor = 'grab';

      domElement.addEventListener('pointerdown', onPointerDown);
      window.addEventListener('pointermove', onPointerMove);
      window.addEventListener('pointerup', onPointerUp);

      // --- 7. Single Guaranteed Animation Loop ---
      let isVisible = true;
      let isRunning = false;
      let animationFrameId = null;
      const clock = new THREE.Clock();

      const animate = () => {
        if (!isRunning || !isVisible) {
          isRunning = false;
          animationFrameId = null;
          return;
        }

        animationFrameId = requestAnimationFrame(animate);

        if (pointerNeedsUpdate && !isDragging && cachedRect.height > 0) {
          const normY = (latestPointerY - cachedRect.top) / cachedRect.height - 0.5;
          targetRotationX = 0.03 + normY * 0.035;
          pointerNeedsUpdate = false;
        }

        const elapsedTime = clock.getElapsedTime();

        if (!isDragging) {
          const autoSpeed = 0.0034 - Math.cos(targetRotationY) * 0.0009;
          targetRotationY += autoSpeed;
        }

        bottleGroup.position.y = Math.sin(elapsedTime * 0.9) * 0.016;

        const lerpSpeed = isDragging ? 0.12 : 0.045;
        currentRotationX += (targetRotationX - currentRotationX) * lerpSpeed;
        currentRotationY += (targetRotationY - currentRotationY) * lerpSpeed;

        bottleGroup.rotation.x = currentRotationX;
        bottleGroup.rotation.y = currentRotationY;

        renderer.render(scene, camera);
      };

      const startLoop = () => {
        if (!isRunning && isVisible) {
          isRunning = true;
          clock.start();
          animationFrameId = requestAnimationFrame(animate);
        }
      };

      const stopLoop = () => {
        isRunning = false;
        if (animationFrameId) {
          cancelAnimationFrame(animationFrameId);
          animationFrameId = null;
        }
      };

      const observer = new IntersectionObserver(
        ([entry]) => {
          isVisible = entry.isIntersecting;
          if (isVisible) {
            startLoop();
          } else {
            stopLoop();
          }
        },
        { threshold: 0.05 }
      );
      observer.observe(container);

      // Pre-warm WebGL shaders and render first frame silently before crossfade
      renderer.compile(scene, camera);
      renderer.render(scene, camera);

      if (isMounted) {
        setIs3DReady(true);
      }

      startLoop();

      // --- 8. Responsive Resize Handler ---
      const handleResize = () => {
        if (!container) return;
        updateCachedRect();
        const w = cachedRect.width;
        const h = cachedRect.height;
        updateCameraDistance(w, h);
        renderer.setSize(w, h);
      };

      window.addEventListener('resize', handleResize);

      // Clean disposal
      cleanup3D = () => {
        observer.disconnect();
        stopLoop();

        window.removeEventListener('resize', handleResize);
        domElement.removeEventListener('pointerdown', onPointerDown);
        window.removeEventListener('pointermove', onPointerMove);
        window.removeEventListener('pointerup', onPointerUp);

        outerGlassGeo.dispose();
        innerLiquidGeo.dispose();
        labelGeo.dispose();
        dipTubeGeo.dispose();
        collarBaseGeo.dispose();
        collarCenterGeo.dispose();
        collarTopGeo.dispose();
        capInsetGeo.dispose();
        capMainGeo.dispose();
        capCrownGeo.dispose();
        shadowGeo.dispose();

        outerGlassMat.dispose();
        innerLiquidMat.dispose();
        labelMat.dispose();
        dipTubeMat.dispose();
        collarMat.dispose();
        capMat.dispose();
        shadowMat.dispose();
        studioEnvMap.dispose();

        renderer.dispose();
        if (container.contains(domElement)) {
          container.removeChild(domElement);
        }
      };
    };

    // Stagger 3D scene initialization smoothly so it doesn't block the very first mount frame
    const scheduleInit = () => {
      if (!isMounted) return;
      initThreeScene();
    };

    // 60ms delay allows the browser to commit the initial Home paint & begin the intro fade-out cleanly
    timerId = setTimeout(scheduleInit, 60);

    return () => {
      isMounted = false;
      if (timerId) clearTimeout(timerId);
      if (idleId && typeof window !== 'undefined' && 'cancelIdleCallback' in window) {
        cancelIdleCallback(idleId);
      }
      if (cleanup3D) {
        cleanup3D();
      }
    };
  }, []);

  // Update materials smoothly when activeFinish changes
  useEffect(() => {
    const finish = FINISHES[activeFinish];
    const mats = materialsRef.current;
    if (!finish || !mats.outerGlassMat) return;

    // Glass shell
    mats.outerGlassMat.color.setHex(finish.glassColor);
    mats.outerGlassMat.roughness = finish.roughness;
    mats.outerGlassMat.transmission = finish.transmission;
    mats.outerGlassMat.ior = finish.ior;
    mats.outerGlassMat.attenuationColor.setHex(finish.attenuationColor);
    mats.outerGlassMat.attenuationDistance = finish.attenuationDistance;

    // Liquid core
    mats.innerLiquidMat.color.setHex(finish.liquidColor);
    mats.innerLiquidMat.opacity = finish.liquidOpacity;
    mats.innerLiquidMat.transmission = finish.liquidTransmission;

    // Metal collar & cap
    mats.collarMat.color.setHex(finish.capColor);
    mats.collarMat.metalness = finish.capMetalness;
    mats.collarMat.roughness = finish.capRoughness;

    mats.capMat.color.setHex(finish.capColor);
    mats.capMat.metalness = finish.capMetalness;
    mats.capMat.roughness = finish.capRoughness;

    // Tint rim light according to finish
    if (mats.backRim) {
      mats.backRim.color.setHex(finish.backLightColor);
    }
  }, [activeFinish]);

  if (!webglSupported) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center relative p-6 text-center">
        <span className="text-xs font-mono tracking-widest text-neutral-500 uppercase">
          Packture 3D Experience (WebGL Required)
        </span>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-between select-none">
      
      {/* Luxury Material Specimen Selector (Illuminated Physical Glass Samples - Zero UI Borders/Underlines) */}
      <div className="w-full flex justify-center lg:justify-end px-3 sm:px-6 pt-1 z-40 pointer-events-auto">
        <div className="flex flex-col items-center lg:items-end">
          
          {/* Finish Heading (FINISH // FROSTED MATTE) */}
          <div className="flex items-center space-x-1.5 text-xs sm:text-[13px] font-mono tracking-[0.25em] text-neutral-400 uppercase mb-2 text-center lg:text-right">
            <span className="text-luxury-gold/90 font-medium">FINISH //</span>
            <span className="text-luxury-ivory font-semibold tracking-wider transition-colors duration-300">
              {hoveredFinish ? FINISHES[hoveredFinish]?.name : FINISHES[activeFinish]?.name}
            </span>
          </div>

          {/* Row of 5 Physical Glass Specimens (Illuminated purely through internal light & specular glint) */}
          <div 
            className="flex items-center space-x-1.5 sm:space-x-2.5"
            role="radiogroup"
            aria-label="Bottle Material Finishes"
          >
            {Object.entries(FINISHES).map(([key, item]) => {
              const isSelected = activeFinish === key;
              const isHovered = hoveredFinish === key;

              return (
                <button
                  key={key}
                  onClick={() => setActiveFinish(key)}
                  onMouseEnter={() => setHoveredFinish(key)}
                  onMouseLeave={() => setHoveredFinish(null)}
                  className="group relative min-w-[42px] min-h-[42px] sm:min-w-[46px] sm:min-h-[46px] flex items-center justify-center cursor-pointer focus:outline-none p-1"
                  role="radio"
                  aria-checked={isSelected}
                  aria-label={`Select ${item.name}`}
                  title={item.name}
                >
                  {/* Physical Glass Specimen Disc (Illuminated when active, subdued when inactive) */}
                  <div
                    className={`relative w-[24px] h-[24px] sm:w-[28px] sm:h-[28px] rounded-full transition-all duration-500 overflow-hidden ${
                      isSelected
                        ? 'scale-110 opacity-100'
                        : isHovered
                        ? 'scale-105 opacity-90'
                        : 'scale-100 opacity-55 hover:opacity-85'
                    }`}
                    style={isSelected ? item.activeSwatch : item.inactiveSwatch}
                  >
                    {/* Realistic Upper-Left Curved Optical Specular Glint */}
                    <div 
                      className={`absolute inset-0 rounded-full pointer-events-none transition-opacity duration-500 ${
                        isSelected 
                          ? 'opacity-100 bg-[radial-gradient(circle_at_35%_25%,rgba(255,255,255,0.95)_0%,rgba(255,255,255,0.3)_35%,transparent_65%)]'
                          : 'opacity-40 bg-[radial-gradient(circle_at_35%_25%,rgba(255,255,255,0.6)_0%,transparent_50%)]'
                      }`} 
                    />

                    {/* Material-Specific Dynamic Glint Highlight Arc */}
                    <div 
                      className={`absolute inset-0 rounded-full pointer-events-none transition-opacity duration-500 ${
                        isSelected ? 'opacity-85' : 'opacity-25'
                      }`}
                      style={{
                        background: `linear-gradient(135deg, ${item.glintColor} 0%, transparent 45%)`
                      }}
                    />

                    {/* Bottom Subsurface Refraction Bounce Light */}
                    {isSelected && (
                      <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_50%_90%,rgba(255,255,255,0.4)_0%,transparent_50%)] pointer-events-none" />
                    )}

                    {/* Subtle One-Time Specular Light Sweep on Selection */}
                    {isSelected && (
                      <div 
                        key={`glint-${activeFinish}`}
                        className="absolute inset-0 pointer-events-none bg-gradient-to-r from-transparent via-white/50 to-transparent w-[200%] h-full animate-[swatchShimmer_0.9s_cubic-bezier(0.16,1,0.3,1)_forwards]"
                      />
                    )}
                  </div>
                </button>
              );
            })}
          </div>

        </div>
      </div>

      {/* 3D WebGL Canvas Viewport (Direct smooth 3D reveal - zero intermediate static image) */}
      <div className="relative w-full flex-1 min-h-[300px] sm:min-h-[380px] lg:min-h-[440px] flex items-center justify-center">
        <div 
          ref={mountRef} 
          className={`w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing z-10 ${
            is3DReady ? 'opacity-100 scale-100' : 'opacity-0 scale-[0.98] pointer-events-none'
          }`}
          style={{
            transition: 'opacity 500ms cubic-bezier(0.16, 1, 0.3, 1), transform 500ms cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        />
      </div>

      {/* Minimal Catalog Annotation (NO bulky UI badges) */}
      <div className="w-full flex flex-col items-center justify-center pt-1 pb-1 gap-1 z-20 pointer-events-none">
        <div className="flex items-center space-x-1.5 text-[8.5px] sm:text-[9px] font-mono tracking-[0.25em] text-neutral-400 uppercase">
          <Sparkles className="w-2.5 h-2.5 text-luxury-gold" />
          <span>MONOLITH ELITE · 100ML</span>
        </div>
        <div 
          className={`flex items-center space-x-1.5 text-[8px] font-mono tracking-[0.25em] text-luxury-gold/70 uppercase transition-opacity duration-500 ${
            hasInteracted ? 'opacity-0' : 'opacity-80'
          }`}
        >
          <RotateCw className="w-2.5 h-2.5 text-luxury-gold animate-spin" style={{ animationDuration: '7s' }} />
          <span>DRAG TO ROTATE 360°</span>
        </div>
      </div>

    </div>
  );
}
