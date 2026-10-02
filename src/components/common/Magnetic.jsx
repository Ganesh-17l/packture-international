import React, { useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';

export default function Magnetic({ children, range = 50, strength = 0.15, className = "inline-block" }) {
  const ref = useRef(null);
  const shouldReduce = useReducedMotion();

  // Motion values for direct animation without triggering React re-renders
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs for physics-based response
  const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  useEffect(() => {
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (shouldReduce || isTouch) return;

    const element = ref.current;
    if (!element) return;

    let rect = null;

    // Cache the bounding rect on mouse enter to avoid getBoundingClientRect() on every mousemove frame
    const handleMouseEnter = () => {
      rect = element.getBoundingClientRect();
    };

    const handleMouseMove = (e) => {
      if (!rect) {
        rect = element.getBoundingClientRect();
      }
      const { clientX, clientY } = e;
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distanceX = clientX - centerX;
      const distanceY = clientY - centerY;

      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
      if (distance < range) {
        x.set(distanceX * strength);
        y.set(distanceY * strength);
      } else {
        x.set(0);
        y.set(0);
      }
    };

    const handleMouseLeave = () => {
      x.set(0);
      y.set(0);
      rect = null; // Reset cached rect
    };

    element.addEventListener('mouseenter', handleMouseEnter, { passive: true });
    element.addEventListener('mousemove', handleMouseMove, { passive: true });
    element.addEventListener('mouseleave', handleMouseLeave, { passive: true });

    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [range, strength, shouldReduce]);

  // Touch device fallback or reduced motion
  const isTouch = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;
  if (shouldReduce || isTouch) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      style={{ x: springX, y: springY }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
