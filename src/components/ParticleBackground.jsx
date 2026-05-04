import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const ParticleBackground = ({ variant = 'cyber' }) => {
  const [mousePosition, setMousePosition] = useState({ x: -1000, y: -1000 });

  useEffect(() => {
    let animationFrameId;

    const handleMouseMove = (e) => {
      // Use requestAnimationFrame to throttle the state update for smoothness
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      animationFrameId = requestAnimationFrame(() => {
        setMousePosition({ x: e.clientX, y: e.clientY });
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  const getAuraColor = () => {
    switch (variant) {
      case 'suit': return 'rgba(212, 192, 168, 0.4)'; // Warm wood/Coffee
      case 'chart': return 'rgba(0, 255, 157, 0.3)'; // Vibrant green
      case 'lens': return 'rgba(188, 19, 254, 0.3)'; // Deep purple
      case 'signal': return 'rgba(255, 179, 0, 0.3)'; // Bright yellow
      case 'admin': return 'rgba(0, 255, 157, 0.15)'; // Subtle green for admin
      case 'cyber':
      default: return 'rgba(0, 243, 255, 0.3)'; // Cyber blue
    }
  };

  const auraSize = 400; // px diameter

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden'
      }}
    >
      <motion.div
        animate={{
          x: mousePosition.x - auraSize / 2,
          y: mousePosition.y - auraSize / 2,
        }}
        transition={{
          type: "spring",
          damping: 40,
          stiffness: 250,
          mass: 0.5
        }}
        style={{
          position: 'absolute',
          width: `${auraSize}px`,
          height: `${auraSize}px`,
          background: `radial-gradient(circle, ${getAuraColor()} 0%, transparent 60%)`,
          borderRadius: '50%',
          filter: 'blur(40px)',
          willChange: 'transform'
        }}
      />
    </div>
  );
};

export default ParticleBackground;
