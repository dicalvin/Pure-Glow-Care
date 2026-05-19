import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Mail, Phone, MessageCircle } from 'lucide-react';
import { useSite } from '../contexts/SiteContext';
import BrandLogo from './BrandLogo';
import SnapchatIcon from './icons/SnapchatIcon';
import {
  getWhatsAppHref,
  formatWhatsAppDisplay,
  getSnapchatHref,
  getSnapchatLabel,
} from '../lib/contacts';

export default function Footer() {
  const { settings } = useSite();
  const year = new Date().getFullYear();

  const contactItems = useMemo(() => {
    const items = [];

    if (settings.phone) {
      items.push({
        key: 'phone',
        icon: Phone,
        text: settings.phone,
        href: `tel:${settings.phone.replace(/\s/g, '')}`,
      });
    }

    if (settings.email) {
      items.push({
        key: 'email',
        icon: Mail,
        text: settings.email,
        href: `mailto:${settings.email}`,
      });
    }

    const waHref = getWhatsAppHref(settings.whatsapp);
    const waDisplay = formatWhatsAppDisplay(settings.whatsapp);
    if (waHref && waDisplay) {
      items.push({
        key: 'whatsapp',
        icon: MessageCircle,
        text: waDisplay,
        href: waHref,
        className: 'footer__contact--whatsapp',
      });
    }

    if (settings.instagram) {
      items.push({
        key: 'instagram',
        icon: Instagram,
        text: settings.instagram,
        href: `https://instagram.com/${settings.instagram.replace('@', '')}`,
      });
    }

    const snapLabel = getSnapchatLabel(settings.snapchat_username);
    const snapHref = getSnapchatHref(settings);
    if (snapLabel && snapHref) {
      items.push({
        key: 'snapchat',
        icon: SnapchatIcon,
        text: snapLabel,
        href: snapHref,
        className: 'footer__contact--snapchat',
      });
    }

    return items;
  }, [settings]);

  return (
    <footer className="footer">
      <div className="footer__accent-bar" />
      <div className="container">
        <div className="footer__grid">
          <div>
            <div className="footer__brand">
              <BrandLogo size={40} />
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
              {contactItems.length === 0 ? (
                <p className="footer__contact-empty">Contact details coming soon.</p>
              ) : (
                contactItems.map(({ key, icon: Icon, text, href, className = '' }) => (
                  <a
                    key={key}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`footer__contact ${className}`}
                  >
                    <Icon size={15} />
                    <span>{text}</span>
                  </a>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <p>
            © {year} {settings.business_name}. All rights reserved.
          </p>
          <p>Powered by CDR Technologies Ltd</p>
        </div>
      </div>
    </footer>
  );
}
