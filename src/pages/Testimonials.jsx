import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useSite } from '../contexts/SiteContext';
import PageShell from '../components/PageShell';
import TestimonialCard from '../components/TestimonialCard';
import PictorialTestimonial from '../components/PictorialTestimonial';
import { hasPictorialMedia } from '../lib/format';

export default function Testimonials() {
  const { testimonials, loading } = useSite();

  const pictorial = useMemo(() => testimonials.filter(hasPictorialMedia), [testimonials]);
  const written = useMemo(() => testimonials.filter((t) => !hasPictorialMedia(t)), [testimonials]);

  return (
    <PageShell
      title={
        <>
          Customer <em>Stories</em>
        </>
      }
      subtitle="Real experiences from our community — in words and pictures."
    >
      {loading ? (
        <section className="section">
          <p className="text-muted text-center">Loading testimonials…</p>
        </section>
      ) : testimonials.length === 0 ? (
        <section className="section">
          <p className="text-muted text-center">No testimonials yet. Check back soon.</p>
        </section>
      ) : (
        <>
          {pictorial.length > 0 && (
            <section className="section section--secondary">
              <div className="container">
                <div className="section-header section-header--center">
                  <div className="divider divider-center" />
                  <h2>
                    <em>Glow</em> Gallery
                  </h2>
                  <p className="text-muted" style={{ marginTop: 12 }}>
                    Before-and-after moments and real results from our community.
                  </p>
                </div>
                <div className="pictorial-grid">
                  {pictorial.map((t, i) => (
                    <PictorialTestimonial key={t.id} testimonial={t} index={i} />
                  ))}
                </div>
              </div>
            </section>
          )}

          {written.length > 0 && (
            <section className="section">
              <div className="container">
                {pictorial.length > 0 && (
                  <div className="section-header section-header--center" style={{ marginBottom: 40 }}>
                    <h3 className="font-display" style={{ fontSize: '1.75rem' }}>
                      Written reviews
                    </h3>
                  </div>
                )}
                <div className="testimonials-grid">
                  {written.map((t, i) => (
                    <motion.div
                      key={t.id}
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.06, duration: 0.5 }}
                    >
                      <TestimonialCard testimonial={t} />
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>
          )}
        </>
      )}
    </PageShell>
  );
}
