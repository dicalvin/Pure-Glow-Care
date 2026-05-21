import React from 'react';
import { motion } from 'framer-motion';
import WigIcon from './icons/WigIcon';
import { useSite } from '../contexts/SiteContext';
import BrandMark from './BrandMark';

export default function LoadingScreen({ message }) {
  const { settings } = useSite();

  return (
    <div className="loading-screen">
      <motion.div
        className="loading-screen__wig"
        animate={{ y: [0, -10, 0], rotate: [0, 3, -3, 0] }}
        transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
      >
        <WigIcon size={56} animated />
      </motion.div>
      <BrandMark stacked className="loading-screen__brand" />
      <p className="loading-screen__text">{message || `Loading ${settings.business_name}…`}</p>
      <div className="loading-screen__dots" aria-hidden>
        <span /><span /><span />
      </div>
    </div>
  );
}
