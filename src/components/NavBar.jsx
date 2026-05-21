import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useSite } from '../contexts/SiteContext';
import BrandLogo from './BrandLogo';
import BrandMark from './BrandMark';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { settings, user } = useSite();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setMobileOpen(false), [location.pathname]);

  const links = [
    { to: '/', label: 'Home' },
    { to: '/products', label: 'Products' },
    { to: '/testimonials', label: 'Testimonials' },
    { to: '/about', label: 'Our Story' },
  ];

  const isActive = (to) => location.pathname === to;

  return (
    <>
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}
      >
        <div className="container navbar__inner">
          <Link to="/" className="navbar__logo">
            <BrandLogo size={40} />
            <BrandMark stacked />
          </Link>

          <div className="navbar__links hide-mobile">
            {links.map((l) => (
              <Link key={l.to} to={l.to} className={`navbar__link ${isActive(l.to) ? 'is-active' : ''}`}>
                {l.label}
                {isActive(l.to) && <motion.div layoutId="nav-underline" className="navbar__underline" />}
              </Link>
            ))}
          </div>

          <div className="navbar__actions">
            {user && (
              <Link to="/admin" className="btn btn-accent hide-mobile navbar__admin-btn">
                Admin
              </Link>
            )}
            <button
              type="button"
              className="hide-desktop btn btn-ghost navbar__menu-btn"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="navbar__mobile"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
          >
            {links.map((l, i) => (
              <motion.div
                key={l.to}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
              >
                <Link to={l.to} className={`navbar__mobile-link ${isActive(l.to) ? 'is-active' : ''}`}>
                  {l.label}
                </Link>
              </motion.div>
            ))}
            {user && (
              <Link to="/admin" className="btn btn-accent navbar__mobile-admin">
                Admin Dashboard
              </Link>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
