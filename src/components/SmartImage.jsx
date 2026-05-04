import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import './SmartImage.css';

const SmartImage = ({ 
  src, 
  alt, 
  className = '', 
  style = {}, 
  hoverEffect = 'parallax', // 'parallax', 'glow', 'none'
  objectFit = 'cover',
  ...props 
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '100px' } // Load slightly before it comes into view
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  // Parallax calculations
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const handleMouseMove = (e) => {
    if (hoverEffect !== 'parallax' || !imgRef.current) return;
    const { left, top, width, height } = imgRef.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / 15;
    const y = (e.clientY - top - height / 2) / 15;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    if (hoverEffect === 'parallax') {
      setMousePos({ x: 0, y: 0 });
    }
  };

  return (
    <div 
      className={`smart-image-wrapper ${className} effect-${hoverEffect}`}
      ref={imgRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        ...style,
        transform: hoverEffect === 'parallax' && mousePos.x !== 0 
          ? `perspective(1000px) rotateY(${mousePos.x}deg) rotateX(${-mousePos.y}deg) scale3d(1.02, 1.02, 1.02)` 
          : 'perspective(1000px) rotateY(0deg) rotateX(0deg) scale3d(1, 1, 1)',
        transition: mousePos.x === 0 ? 'transform 0.5s ease-out' : 'transform 0.1s ease-out'
      }}
    >
      {!isLoaded && (
        <div className="smart-image-placeholder">
          <div className="smart-image-loader"></div>
        </div>
      )}
      
      {isInView && (
        <motion.img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          onLoad={handleLoad}
          className={`smart-image-element ${isLoaded ? 'loaded' : 'loading'}`}
          style={{ objectFit }}
          initial={{ opacity: 0, filter: 'blur(10px)' }}
          animate={{ 
            opacity: isLoaded ? 1 : 0, 
            filter: isLoaded ? 'blur(0px)' : 'blur(10px)' 
          }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          {...props}
        />
      )}
      
      {hoverEffect === 'glow' && (
        <div className="smart-image-glow-overlay"></div>
      )}
    </div>
  );
};

export default SmartImage;
