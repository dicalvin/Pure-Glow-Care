import React from 'react';
import { motion } from 'framer-motion';
import { useSite } from '../contexts/SiteContext';
import PageShell from '../components/PageShell';
import ProductCard from '../components/ProductCard';

export default function Products() {
  const { products, loading } = useSite();

  return (
    <PageShell
      title={
        <>
          Our <em>Collection</em>
        </>
      }
      subtitle="Browse our wig collection — prices, details, and how to rock each unit."
    >
      <section className="section">
        <div className="container">
          {loading ? (
            <p className="text-muted text-center">Loading products…</p>
          ) : products.length === 0 ? (
            <p className="text-muted text-center">No products yet. Check back soon.</p>
          ) : (
            <div className="products-grid">
              {products.map((product, i) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </PageShell>
  );
}
