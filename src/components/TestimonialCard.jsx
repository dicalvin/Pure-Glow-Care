import React from 'react';
import { Star, Quote } from 'lucide-react';
import { getAuthorName } from '../lib/format';

export default function TestimonialCard({ testimonial, dark = false }) {
  const rating = testimonial.rating || 5;

  return (
    <article className={`testimonial-card ${dark ? 'testimonial-card--dark' : ''}`}>
      {testimonial.author_avatar_url && (
        <img
          src={testimonial.author_avatar_url}
          alt=""
          className="testimonial-card__avatar"
        />
      )}
      <Quote size={28} className="testimonial-card__quote" strokeWidth={1} />
      <div className="stars testimonial-card__stars">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={14}
            fill={i < rating ? 'var(--gold)' : 'transparent'}
            color={i < rating ? 'var(--gold)' : 'var(--border)'}
          />
        ))}
      </div>
      <p className="testimonial-card__content">&ldquo;{testimonial.content}&rdquo;</p>
      <footer className="testimonial-card__author">
        <span className="testimonial-card__name">{getAuthorName(testimonial)}</span>
        {testimonial.author_location && (
          <span className="testimonial-card__location"> · {testimonial.author_location}</span>
        )}
        {testimonial.products?.name && (
          <span className="testimonial-card__product"> — {testimonial.products.name}</span>
        )}
      </footer>
    </article>
  );
}
