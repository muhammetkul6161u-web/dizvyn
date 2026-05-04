import React from 'react';
import { motion } from 'framer-motion';

const steps = [
  {
    id: 1,
    number: '01',
    title: 'Keşfet',
    desc: 'Projenizin vizyonunu, hedef kitlenizi ve teknik gereksinimlerini birlikte analiz ediyoruz.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"/>
        <path d="M21 21l-4.35-4.35"/>
        <path d="M11 8v6M8 11h6"/>
      </svg>
    ),
  },
  {
    id: 2,
    number: '02',
    title: 'Tasarla',
    desc: 'Piksel mükemmelliğinde, markanıza özel UI/UX tasarımlar hazırlıyoruz.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20h9"/>
        <path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/>
      </svg>
    ),
  },
  {
    id: 3,
    number: '03',
    title: 'Kodla',
    desc: 'Modern teknolojilerle, performans odaklı ve sürdürülebilir kodlar yazıyoruz.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6"/>
        <polyline points="8 6 2 12 8 18"/>
        <line x1="14" y1="4" x2="10" y2="20"/>
      </svg>
    ),
  },
  {
    id: 4,
    number: '04',
    title: 'Yayınla',
    desc: 'Projenizi canlıya alıyor, SEO optimizasyonu ve sürekli destek sağlıyoruz.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 2L11 13"/>
        <path d="M22 2l-7 20-4-9-9-4 20-7z"/>
      </svg>
    ),
  },
];

const ProcessSection = () => {
  return (
    <div className="process-section section-padding section-border-top">
      <div className="bg-watermark">02 // SÜREÇ</div>
      <div className="reveal-item visible" style={{ marginBottom: '60px', textAlign: 'center' }}>
        <div className="section-subtitle">[ NASIL ÇALIŞIYORUZ ]</div>
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Fikirden <br />
          <span className="gradient-text-home">Ürüne Dört Adım.</span>
        </motion.h2>
      </div>

      <div className="process-grid">
        {steps.map((step, i) => (
          <motion.div
            key={step.id}
            className="process-card glass-box"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.12 }}
          >
            {/* Connecting line between cards */}
            {i < steps.length - 1 && (
              <div className="process-connector"></div>
            )}
            
            <div className="process-number">{step.number}</div>
            <div className="process-icon">{step.icon}</div>
            <h3 className="process-title">{step.title}</h3>
            <p className="process-desc">{step.desc}</p>
            <div className="process-glow"></div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ProcessSection;
