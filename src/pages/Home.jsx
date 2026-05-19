import React, { useRef, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Star, Leaf, Droplets, Shield, Sparkles } from 'lucide-react';
import { useSite } from '../contexts/SiteContext';
import AnimatedBackground, { FloatingOrbs } from '../components/AnimatedBackground';
import ProductCard from '../components/ProductCard';
import TestimonialCard from '../components/TestimonialCard';
import PictorialTestimonial from '../components/PictorialTestimonial';
import { hasPictorialMedia } from '../lib/format';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.4, 0, 0.2, 1] },
  }),
};

const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

export default function Home() {
  const { settings, products, testimonials, loading } = useSite();
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const showProducts = useMemo(() => {
    const featured = products.filter((p) => p.featured).slice(0, 3);
    return featured.length > 0 ? featured : products.slice(0, 3);
  }, [products]);

  const pictorialFeatured = useMemo(
    () => testimonials.filter(hasPictorialMedia).slice(0, 4),
    [testimonials]
  );
  const writtenFeatured = useMemo(
    () => testimonials.filter((t) => !hasPictorialMedia(t)).slice(0, 3),
    [testimonials]
  );

  const values = [
    { icon: Leaf, title: 'Natural Ingredients', desc: 'Sourced from nature, free from harsh chemicals and toxins.' },
    { icon: Droplets, title: 'Deep Nourishment', desc: 'Formulas that penetrate deep for lasting moisture and shine.' },
    { icon: Shield, title: 'Dermatologist Tested', desc: 'Safe for all hair types and sensitive scalps.' },
    { icon: Sparkles, title: 'Visible Results', desc: "Transformative results you'll see and feel from day one." },
  ];

  if (loading) {
    return (
      <div className="loading-screen">
        <Sparkles size={32} className="loading-screen__icon" />
        <p>Loading {settings.business_name}…</p>
      </div>
    );
  }

  return (
    <div>
      <section ref={heroRef} className="hero">
        <AnimatedBackground />
        <FloatingOrbs />
        <div className="hero__ring hero__ring--lg" />
        <div className="hero__ring hero__ring--sm" />

        <motion.div className="container hero__content" style={{ y: heroY, opacity: heroOpacity }}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="hero__eyebrow"
          >
            <span className="hero__eyebrow-line" />
            <span>{settings.tagline}</span>
          </motion.div>

          <motion.h1 variants={fadeUp} initial="hidden" animate="visible" className="hero__title">
            {settings.hero_headline}
          </motion.h1>

          <motion.p variants={fadeUp} custom={1} initial="hidden" animate="visible" className="hero__subtitle">
            {settings.hero_subheadline}
          </motion.p>

          <motion.div variants={fadeUp} custom={2} initial="hidden" animate="visible" className="hero__cta">
            <Link to="/products" className="btn btn-primary">
              Shop Collection <ArrowRight size={16} />
            </Link>
            <Link to="/about" className="btn btn-outline">
              Our Story
            </Link>
          </motion.div>

          <motion.div variants={fadeUp} custom={3} initial="hidden" animate="visible" className="hero__proof">
            <div className="hero__stars">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} fill="var(--gold)" color="var(--gold)" />
              ))}
            </div>
            <span>
              {testimonials.length > 0 ? `${testimonials.length}+ happy customers` : 'Loved by many'}
            </span>
            <span className="hero__proof-divider" />
            <span>{settings.shipping_note}</span>
          </motion.div>
        </motion.div>

        <motion.div
          className="hero__scroll"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <span>Scroll</span>
          <motion.div
            className="hero__scroll-line"
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          />
        </motion.div>
      </section>

      <section className="section section--white">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={stagger}
            className="section-header section-header--center"
          >
            <motion.div variants={fadeUp}>
              <div className="divider divider-center" />
              <h2>
                Why <em>Pure Glow</em>?
              </h2>
            </motion.div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={stagger}
            className="values-grid"
          >
            {values.map((v, i) => (
              <motion.div key={v.title} variants={fadeUp} custom={i} className={`value-card value-card--${i % 2}`}>
                <div className="value-card__icon">
                  <v.icon size={22} color="var(--accent-dark)" />
                </div>
                <h4>{v.title}</h4>
                <p>{v.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {showProducts.length > 0 && (
        <section className="section section--secondary section--relative">
          <div className="section__glow" />
          <div className="container section--z">
            <div className="section-header section-header--row">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
                <motion.div variants={fadeUp}>
                  <div className="divider" />
                  <h2>
                    <em>Featured</em> Products
                  </h2>
                </motion.div>
                <motion.p variants={fadeUp} custom={1}>
                  Our most beloved formulas, crafted for transformative results.
                </motion.p>
              </motion.div>
              <Link to="/products" className="btn btn-outline">
                View All <ArrowRight size={15} />
              </Link>
            </div>
            <div className="products-grid">
              {showProducts.map((product, i) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.6, delay: i * 0.12 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {pictorialFeatured.length > 0 && (
        <section className="section section--secondary">
          <div className="container">
            <div className="section-header section-header--center">
              <div className="divider divider-center" />
              <h2>
                Real results, <em>real glow</em>
              </h2>
            </div>
            <div className="pictorial-grid pictorial-grid--home">
              {pictorialFeatured.map((t, i) => (
                <PictorialTestimonial key={t.id} testimonial={t} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      {writtenFeatured.length > 0 && (
        <section className="section section--dark">
          <div className="container">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
              className="section-header section-header--center"
            >
              <motion.div variants={fadeUp}>
                <div className="divider divider-center divider--gold" />
                <h2 className="text-cream">
                  Real Hair, <em>Real Stories</em>
                </h2>
              </motion.div>
              <motion.p variants={fadeUp} custom={1} className="text-cream-muted">
                Hear from our glowing community.
              </motion.p>
            </motion.div>
            <div className="testimonials-grid">
              {writtenFeatured.map((t, i) => (
                <motion.div
                  key={t.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                >
                  <TestimonialCard testimonial={t} dark />
                </motion.div>
              ))}
            </div>
            <div className="section-cta">
              <Link to="/testimonials" className="btn btn-outline btn-outline--cream">
                Read All Stories <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </section>
      )}

      <section className="cta-band">
        <FloatingOrbs />
        <div className="container cta-band__inner">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.h2 variants={fadeUp}>
              Begin Your <em>Glow Journey</em>
            </motion.h2>
            <motion.p variants={fadeUp} custom={1}>
              Your healthiest, most beautiful hair is one step away. Explore our full collection.
            </motion.p>
            <motion.div variants={fadeUp} custom={2}>
              <Link to="/products" className="btn btn-primary">
                Shop Now <ArrowRight size={16} />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
