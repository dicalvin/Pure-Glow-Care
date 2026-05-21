import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Crown, Heart, Sparkles } from 'lucide-react';
import { useSite } from '../contexts/SiteContext';
import PageShell from '../components/PageShell';
import { FloatingOrbs } from '../components/AnimatedBackground';
import BrandMark from '../components/BrandMark';

export default function About() {
  const { settings } = useSite();

  const pillars = [
    { icon: Crown, title: 'Premium wigs', text: 'Lace fronts, full units, and bundles — quality you can see and feel.' },
    { icon: Heart, title: 'BY J&K', text: 'Curated by Jenny & Calvin with an eye for style, fit, and fierce confidence.' },
    { icon: Sparkles, title: 'Slay every day', text: 'From natural everyday looks to full glam — we have your vibe covered.' },
  ];

  return (
    <PageShell
      title={
        <>
          Our <em>Story</em>
        </>
      }
      subtitle={`${settings.business_name} ${settings.business_subtitle || 'BY J&K'}`}
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
              At {settings.business_name}, we believe every woman deserves a look that makes her feel unstoppable.
              Whether you are new to wigs or a seasoned slayer, J&K is here to help you find your perfect match.
            </p>
            <Link to="/products" className="btn btn-primary mt-8">
              Shop wigs <ArrowRight size={16} />
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
              <BrandMark stacked />
              <p className="font-display" style={{ fontSize: '1.25rem', marginTop: 20, textAlign: 'center' }}>
                Hot pink. <em>Black.</em> White. <br />Unapologetic glam.
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
                  <p.icon size={22} color="var(--hot-pink-dark)" />
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
