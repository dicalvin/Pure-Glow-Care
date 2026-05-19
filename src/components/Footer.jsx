import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Instagram, Mail, Phone, MessageCircle } from 'lucide-react';
import { useSite } from '../contexts/SiteContext';

export default function Footer() {
  const { settings } = useSite();
  const year = new Date().getFullYear();

  const contactItems = [
    { icon: Phone, text: settings.phone, href: `tel:${settings.phone}` },
    { icon: Mail, text: settings.email, href: `mailto:${settings.email}` },
    {
      icon: MessageCircle,
      text: 'WhatsApp',
      href: `https://wa.me/${settings.whatsapp?.replace(/\D/g, '')}`,
    },
    {
      icon: Instagram,
      text: settings.instagram,
      href: `https://instagram.com/${settings.instagram?.replace('@', '')}`,
    },
  ];

  return (
    <footer className="footer">
      <div className="footer__accent-bar" />
      <div className="container">
        <div className="footer__grid">
          <div>
            <div className="footer__brand">
              <span className="navbar__logo-icon">
                <Sparkles size={16} color="white" />
              </span>
              <span className="footer__brand-name">{settings.business_name}</span>
            </div>
            <p className="footer__tagline">
              {settings.tagline} — Handcrafted with love and nature&apos;s finest ingredients.
            </p>
          </div>

          <div>
            <h4 className="footer__heading">Explore</h4>
            {[
              { to: '/', label: 'Home' },
              { to: '/products', label: 'Products' },
              { to: '/testimonials', label: 'Testimonials' },
              { to: '/about', label: 'Our Story' },
            ].map((l) => (
              <Link key={l.to} to={l.to} className="footer__link">
                {l.label}
              </Link>
            ))}
          </div>

          <div>
            <h4 className="footer__heading">Get in Touch</h4>
            <div className="footer__contacts">
              {contactItems.map(({ icon: Icon, text, href }) => (
                <a key={text} href={href} target="_blank" rel="noopener noreferrer" className="footer__contact">
                  <Icon size={15} />
                  <span>{text}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <p>© {year} {settings.business_name}. All rights reserved.</p>
          <p>Made with love for beautiful hair</p>
        </div>
      </div>
    </footer>
  );
}
