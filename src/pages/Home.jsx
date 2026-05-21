import React, { useRef, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Star, Crown, Sparkles, Heart, Scissors } from 'lucide-react';
import { useSite } from '../contexts/SiteContext';
import AnimatedBackground, { FloatingOrbs } from '../components/AnimatedBackground';
import ProductCard from '../components/ProductCard';
import TestimonialCard from '../components/TestimonialCard';
import PictorialTestimonial from '../components/PictorialTestimonial';
import LoadingScreen from '../components/LoadingScreen';
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
    { icon: Crown, title: 'Premium Quality', desc: 'Hand-picked units and bundles — luxury fibers, flawless construction.' },
    { icon: Scissors, title: 'Styled to Slay', desc: 'Ready-to-wear looks and customizable lace for your perfect fit.' },
    { icon: Heart, title: 'Confidence First', desc: 'Every piece chosen to help you feel bold, beautiful, and wigged up.' },
    { icon: Sparkles, title: 'J&K Curated', desc: 'Exclusive selections from Jenny & Calvin — taste you can trust.' },
  ];

  if (loading) {
    return <LoadingScreen />;
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
            <span>{settings.business_subtitle || 'BY J&K'} · {settings.tagline}</span>
          </motion.div>

          <motion.h1 variants={fadeUp} initial="hidden" animate="visible" className="hero__title">
            {settings.hero_headline}
          </motion.h1>

          <motion.p variants={fadeUp} custom={1} initial="hidden" animate="visible" className="hero__subtitle">
            {settings.hero_subheadline}
          </motion.p>

          <motion.div variants={fadeUp} custom={2} initial="hidden" animate="visible" className="hero__cta">
            <Link to="/products" className="btn btn-primary">
              Shop Wigs <ArrowRight size={16} />
            </Link>
            <Link to="/about" className="btn btn-outline">
              Our Story
            </Link>
          </motion.div>

          <motion.div variants={fadeUp} custom={3} initial="hidden" animate="visible" className="hero__proof">
            <div className="hero__stars">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} fill="var(--hot-pink)" color="var(--hot-pink)" />
              ))}
            </div>
            <span>
              {testimonials.length > 0 ? `${testimonials.length}+ slayed looks` : 'Loved by our clients'}
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
                Why <em>Wigged up</em>?
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
                  <v.icon size={22} color="var(--hot-pink-dark)" />
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
                    <em>Featured</em> Wigs
                  </h2>
                </motion.div>
                <motion.p variants={fadeUp} custom={1}>
                  Our hottest picks — lace fronts, glam units, and everyday slay.
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
        <section className="section section--white">
          <div className="container">
            <div className="section-header section-header--center">
              <div className="divider divider-center" />
              <h2>
                Client <em>lookbook</em>
              </h2>
            </div>
            <div className="pictorial-grid pictorial-grid--home">
              {pictorialFeatured.map((t, i) => (
                <PictorialTestimonial key={t.id} testimonial={t} index={i} />
              ))}
            </div>
            <div className="section-cta">
              <Link to="/testimonials" className="btn btn-outline">
                See full gallery <ArrowRight size={15} />
              </Link>
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
                  Real Clients, <em>Real Reviews</em>
                </h2>
              </motion.div>
              <motion.p variants={fadeUp} custom={1} className="text-cream-muted">
                The wigged-up family speaks.
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
                All testimonials <ArrowRight size={15} />
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
              Ready to Get <em>Wigged Up</em>?
            </motion.h2>
            <motion.p variants={fadeUp} custom={1}>
              Your next signature look is waiting. Browse the collection by J&K.
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
