import React from 'react';
import { motion } from 'framer-motion';
import './SplashLoader.css';

const SplashLoader = () => {
  return (
    <div className="splash-container">
      <div className="splash-background">
        <div className="splash-glow"></div>
      </div>
      
      <div className="splash-content">
        <motion.div 
          className="splash-logo"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="logo-k">K</span>
          <span className="logo-m">M</span>
          <span className="logo-a">A</span>
        </motion.div>
        
        <motion.div 
          className="splash-text"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        >
          STUDIO
        </motion.div>
        
        <div className="splash-progress-container">
          <motion.div 
            className="splash-progress-bar"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 2, ease: "easeInOut" }}
          ></motion.div>
        </div>
      </div>
    </div>
  );
};

export default SplashLoader;
