import React from 'react';
import { motion } from 'framer-motion';
import AnimatedBackground from './AnimatedBackground';

export default function PageShell({ title, subtitle, children, className = '' }) {
  return (
    <div className={`page-shell ${className}`}>
      <header className="page-shell__hero">
        <AnimatedBackground intensity={0.7} />
        <div className="container page-shell__hero-inner">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {title}
          </motion.h1>
          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="page-shell__subtitle"
            >
              {subtitle}
            </motion.p>
          )}
        </div>
      </header>
      <div className="page-shell__content">{children}</div>
    </div>
  );
}
