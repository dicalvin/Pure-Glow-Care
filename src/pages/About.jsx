import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Heart, Leaf, Sparkles } from 'lucide-react';
import { useSite } from '../contexts/SiteContext';
import PageShell from '../components/PageShell';
import { FloatingOrbs } from '../components/AnimatedBackground';

export default function About() {
  const { settings } = useSite();

  const pillars = [
    { icon: Leaf, title: 'Nature first', text: 'We choose botanicals and clean ingredients your hair will thank you for.' },
    { icon: Heart, title: 'Made with care', text: 'Every batch is crafted in small runs for quality you can feel.' },
    { icon: Sparkles, title: 'Results that glow', text: 'Healthy shine, strength, and softness — without compromise.' },
  ];

  return (
    <PageShell
      title={
        <>
          Our <em>Story</em>
        </>
      }
      subtitle={settings.tagline}
    >
      <section className="section">
        <div className="container about-story">
          <motion.div
            className="about-story__text"
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="about-story__lead">{settings.about}</p>
            <p>
              At {settings.business_name}, we believe beautiful hair starts with gentle, effective care. Our
              collection is designed for all textures and lifestyles — because everyone deserves to glow.
            </p>
            <Link to="/products" className="btn btn-primary mt-8">
              Explore products <ArrowRight size={16} />
            </Link>
          </motion.div>
          <motion.div
            className="about-story__visual card"
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <FloatingOrbs />
            <div className="about-story__visual-inner">
              <Sparkles size={48} color="var(--accent)" strokeWidth={1} />
              <p className="font-display" style={{ fontSize: '1.5rem', marginTop: 16 }}>
                Pure. Gentle. <em>Effective.</em>
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="section section--secondary">
        <div className="container">
          <div className="values-grid">
            {pillars.map((p, i) => (
              <motion.div
                key={p.title}
                className="value-card value-card--0"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="value-card__icon">
                  <p.icon size={22} color="var(--accent-dark)" />
                </div>
                <h4>{p.title}</h4>
                <p>{p.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
