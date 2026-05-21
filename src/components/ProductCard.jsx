import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Crown, ArrowUpRight } from 'lucide-react';
import { formatPrice } from '../lib/format';

export default function ProductCard({ product }) {
  const [hovered, setHovered] = useState(false);
  const priceLabel = formatPrice(product.price, product.currency || 'UGX');
  const summary = product.tagline || product.purpose || product.description;

  return (
    <Link to={`/products/${product.id}`} className="product-card card">
      <div
        className="product-card__image"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {product.image_url ? (
          <img src={product.image_url} alt={product.name} loading="lazy" />
        ) : (
          <div className="img-placeholder product-card__placeholder">
            <Crown size={36} strokeWidth={1.2} />
          </div>
        )}
        <motion.div
          className="product-card__overlay"
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.25 }}
        >
          <span className="product-card__view">
            View details <ArrowUpRight size={14} />
          </span>
        </motion.div>
        {(product.badge || product.featured) && (
          <span className="badge product-card__badge">{product.badge || 'Featured'}</span>
        )}
        {product.in_stock === false && <span className="badge badge-ink product-card__stock">Sold out</span>}
      </div>
      <div className="product-card__body">
        <h3 className="product-card__name">{product.name}</h3>
        {summary && <p className="product-card__purpose">{summary}</p>}
        <div className="product-card__footer">
          <span className="product-card__price">{priceLabel}</span>
        </div>
      </div>
    </Link>
  );
}
