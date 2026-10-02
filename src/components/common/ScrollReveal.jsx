import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export default function ScrollReveal({ 
  children, 
  direction = "up", 
  delay = 0, 
  duration = 0.8, 
  className = "",
  stagger = false,
  amount = 0.15
}) {
  const shouldReduce = useReducedMotion();

  // If user requests reduced motion, only fade in opacity without offsets
  if (shouldReduce) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount }}
        transition={{ duration: duration / 1.5, delay }}
        className={className}
      >
        {children}
      </motion.div>
    );
  }

  // Determine offsets based on direction
  const getVariants = () => {
    switch (direction) {
      case "up":
        return {
          hidden: { opacity: 0, y: 35 },
          visible: { opacity: 1, y: 0 }
        };
      case "down":
        return {
          hidden: { opacity: 0, y: -35 },
          visible: { opacity: 1, y: 0 }
        };
      case "left":
        return {
          hidden: { opacity: 0, x: 35 },
          visible: { opacity: 1, x: 0 }
        };
      case "right":
        return {
          hidden: { opacity: 0, x: -35 },
          visible: { opacity: 1, x: 0 }
        };
      case "scale":
        return {
          hidden: { opacity: 0, scale: 0.96 },
          visible: { opacity: 1, scale: 1 }
        };
      default:
        return {
          hidden: { opacity: 0 },
          visible: { opacity: 1 }
        };
    }
  };

  const variants = getVariants();

  if (stagger) {
    return (
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount }}
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.08,
              delayChildren: delay
            }
          }
        }}
        className={className}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      variants={variants}
      transition={{ 
        duration, 
        delay, 
        ease: [0.16, 1, 0.3, 1] 
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
