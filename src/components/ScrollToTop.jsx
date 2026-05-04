import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();

  // Get theme color based on current page
  const getThemeColor = () => {
    switch (location.pathname) {
      case '/hakkimizda': return '#D4C0A8';
      case '/fiyatlar': return '#00FF9D';
      case '/portfolyo': return '#BC13FE';
      case '/iletisim': return '#FFB300';
      case '/':
      default: return '#00f3ff';
    }
  };

  const themeColor = getThemeColor();

  // Auto-scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [location.pathname]);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 400);
    };

    window.addEventListener('scroll', toggleVisibility, { passive: true });
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          onClick={scrollToTop}
          aria-label="Yukarı çık"
          style={{
            position: 'fixed',
            bottom: '35px',
            right: '35px',
            width: '52px',
            height: '52px',
            borderRadius: '16px',
            border: `1px solid ${themeColor}40`,
            background: `rgba(10, 10, 15, 0.75)`,
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            color: themeColor,
            fontSize: '1.3rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            boxShadow: `0 8px 30px rgba(0,0,0,0.4), 0 0 20px ${themeColor}15`,
            transition: 'border-color 0.3s, box-shadow 0.3s, background 0.3s',
          }}
          whileHover={{
            y: -4,
            boxShadow: `0 12px 35px rgba(0,0,0,0.5), 0 0 30px ${themeColor}30`,
            borderColor: themeColor,
            background: `${themeColor}15`,
          }}
          whileTap={{ scale: 0.92 }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 15l-6-6-6 6" />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;
