import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Camera, MessageSquare } from 'lucide-react';
import { useSite } from '../contexts/SiteContext';
import PageShell from '../components/PageShell';
import TestimonialCard from '../components/TestimonialCard';
import PictorialTestimonial from '../components/PictorialTestimonial';
import LoadingScreen from '../components/LoadingScreen';
import { hasPictorialMedia } from '../lib/format';

export default function Testimonials() {
  const { testimonials, loading } = useSite();

  const pictorial = useMemo(() => testimonials.filter(hasPictorialMedia), [testimonials]);
  const written = useMemo(() => testimonials.filter((t) => !hasPictorialMedia(t)), [testimonials]);

  if (loading) {
    return <LoadingScreen message="Loading testimonials…" />;
  }

  return (
    <PageShell
      title={
        <>
          Client <em>Love</em>
        </>
      }
      subtitle="See the looks. Read the reviews. All in one place."
    >
      <div className="testimonials-page">
        {/* ── Pictorial section ── */}
        <section className="testimonials-page__section testimonials-page__section--pictorial">
          <div className="container">
            <header className="testimonials-page__header">
              <span className="testimonials-page__badge">
                <Camera size={18} />
                Pictorial
              </span>
              <h2 className="testimonials-page__title">
                The <em>Lookbook</em>
              </h2>
              <p className="testimonials-page__desc">
                Real clients, real installs — photos and videos of our wigs in action.
              </p>
              <span className="testimonials-page__count">{pictorial.length} gallery items</span>
            </header>

            {pictorial.length === 0 ? (
              <div className="testimonials-page__empty card">
                <Camera size={32} strokeWidth={1.2} />
                <p>No pictorial testimonials yet. Check back soon for client photos and videos.</p>
              </div>
            ) : (
              <div className="pictorial-grid pictorial-grid--page">
                {pictorial.map((t, i) => (
                  <PictorialTestimonial key={t.id} testimonial={t} index={i} />
                ))}
              </div>
            )}
          </div>
        </section>

        <div className="testimonials-page__divider" aria-hidden>
          <span />
        </div>

        {/* ── Written section ── */}
        <section className="testimonials-page__section testimonials-page__section--written">
          <div className="container">
            <header className="testimonials-page__header">
              <span className="testimonials-page__badge testimonials-page__badge--dark">
                <MessageSquare size={18} />
                Written
              </span>
              <h2 className="testimonials-page__title">
                <em>Reviews</em> in Words
              </h2>
              <p className="testimonials-page__desc">
                Honest feedback from our wigged-up family — ratings, stories, and love.
              </p>
              <span className="testimonials-page__count">{written.length} written reviews</span>
            </header>

            {written.length === 0 ? (
              <div className="testimonials-page__empty card">
                <MessageSquare size={32} strokeWidth={1.2} />
                <p>No written reviews yet. Our clients&apos; words will appear here soon.</p>
              </div>
            ) : (
              <div className="testimonials-grid testimonials-grid--written">
                {written.map((t, i) => (
                  <motion.div
                    key={t.id}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ delay: i * 0.06, duration: 0.5 }}
                  >
                    <TestimonialCard testimonial={t} />
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </PageShell>
  );
}
