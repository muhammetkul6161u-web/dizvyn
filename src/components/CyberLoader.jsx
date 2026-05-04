import React from 'react';
import { motion } from 'framer-motion';

const CyberLoader = ({ text = "DATABANK SORGULANIYOR..." }) => {
  return (
    <div className="flex flex-col items-center justify-center py-20 w-full min-h-[300px]">
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
        className="relative w-16 h-16 mb-6"
      >
        <div className="absolute inset-0 border-t-2 border-r-2 border-[#00FF9D] rounded-full opacity-70"></div>
        <div className="absolute inset-2 border-b-2 border-l-2 border-[#00f3ff] rounded-full opacity-50" style={{ animationDirection: 'reverse' }}></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-2 h-2 bg-[#00FF9D] rounded-full animate-ping"></div>
        </div>
      </motion.div>
      <div className="text-[#00FF9D] animate-pulse font-mono tracking-[0.3em] text-sm md:text-base font-bold shadow-[0_0_10px_rgba(0,255,157,0.5)]">
        {text}
      </div>
    </div>
  );
};

export default CyberLoader;
