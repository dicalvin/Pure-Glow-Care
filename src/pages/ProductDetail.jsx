import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Crown } from 'lucide-react';
import { useSite } from '../contexts/SiteContext';
import AnimatedBackground from '../components/AnimatedBackground';
import { formatPrice } from '../lib/format';

export default function ProductDetail() {
  const { id } = useParams();
  const { products } = useSite();
  const product = products.find((p) => String(p.id) === String(id));

  if (!product) {
    return (
      <div className="container section text-center">
        <h2>Product not found</h2>
        <Link to="/products" className="btn btn-outline mt-8">
          <ArrowLeft size={16} /> Back to products
        </Link>
      </div>
    );
  }

  const priceLabel = formatPrice(product.price, product.currency || 'UGX');

  return (
    <article className="product-detail">
      <header className="product-detail__hero">
        <AnimatedBackground intensity={0.5} />
        <div className="container product-detail__hero-inner">
          <Link to="/products" className="product-detail__back">
            <ArrowLeft size={16} /> All products
          </Link>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            {product.name}
          </motion.h1>
          {product.tagline && (
            <motion.p className="product-detail__tagline" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              {product.tagline}
            </motion.p>
          )}
          <motion.p
            className="product-detail__price"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
          >
            {priceLabel}
          </motion.p>
        </div>
      </header>

      <div className="container product-detail__body">
        <div className="product-detail__grid">
          <div className="product-detail__media card">
            {product.image_url ? (
              <img src={product.image_url} alt={product.name} />
            ) : (
              <div className="img-placeholder product-detail__placeholder">
                <Crown size={48} strokeWidth={1.2} />
              </div>
            )}
            {product.video_url && (
              <video src={product.video_url} controls className="product-detail__video" playsInline />
            )}
          </div>
          <div className="product-detail__info">
            {product.description && (
              <section>
                <h3>About</h3>
                <p>{product.description}</p>
              </section>
            )}
            {product.purpose && (
              <section>
                <h3>Purpose</h3>
                <p>{product.purpose}</p>
              </section>
            )}
            {product.how_to_use && (
              <section>
                <h3>How to use</h3>
                <p>{product.how_to_use}</p>
              </section>
            )}
            {product.ingredients && (
              <section>
                <h3>Ingredients</h3>
                <p>{product.ingredients}</p>
              </section>
            )}
            {product.category && <span className="badge">{product.category}</span>}
            {product.badge && <span className="badge badge-sage">{product.badge}</span>}
            {product.in_stock === false && <span className="badge badge-ink">Currently unavailable</span>}
          </div>
        </div>
      </div>
    </article>
  );
}
