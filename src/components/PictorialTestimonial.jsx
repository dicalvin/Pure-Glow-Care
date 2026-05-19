import React from 'react';
import { motion } from 'framer-motion';
import { Star, Play } from 'lucide-react';
import { getAuthorName } from '../lib/format';

export default function PictorialTestimonial({ testimonial, index = 0 }) {
  const rating = testimonial.rating || 5;
  const isVideo = testimonial.media_type === 'video';

  return (
    <motion.article
      className="pictorial-testimonial card"
      initial={{ opacity: 0, scale: 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      <div className="pictorial-testimonial__media">
        {isVideo ? (
          <video src={testimonial.media_url} controls playsInline muted className="pictorial-testimonial__video" />
        ) : (
          <img src={testimonial.media_url} alt={`${getAuthorName(testimonial)} testimonial`} loading="lazy" />
        )}
        {isVideo && (
          <span className="pictorial-testimonial__play-badge" aria-hidden>
            <Play size={14} fill="currentColor" />
          </span>
        )}
      </div>
      <div className="pictorial-testimonial__body">
        <div className="stars">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={12}
              fill={i < rating ? 'var(--gold)' : 'transparent'}
              color={i < rating ? 'var(--gold)' : 'var(--border)'}
            />
          ))}
        </div>
        {testimonial.content && (
          <p className="pictorial-testimonial__quote">&ldquo;{testimonial.content}&rdquo;</p>
        )}
        <footer>
          <strong>{getAuthorName(testimonial)}</strong>
          {testimonial.author_location && (
            <span className="pictorial-testimonial__location"> · {testimonial.author_location}</span>
          )}
          {testimonial.products?.name && (
            <span className="pictorial-testimonial__product"> — {testimonial.products.name}</span>
          )}
        </footer>
      </div>
    </motion.article>
  );
}
