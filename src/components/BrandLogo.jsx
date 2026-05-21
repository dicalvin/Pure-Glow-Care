import React from 'react';
import WigIcon from './icons/WigIcon';
import { useSite } from '../contexts/SiteContext';

export default function BrandLogo({ size = 36, className = '' }) {
  const { settings } = useSite();

  if (settings.logo_url) {
    return (
      <img
        src={settings.logo_url}
        alt={`${settings.business_name} logo`}
        className={`brand-logo ${className}`}
        width={size}
        height={size}
      />
    );
  }

  return (
    <span
      className={`brand-logo brand-logo--fallback ${className}`}
      style={{ width: size, height: size }}
      aria-hidden
    >
      <WigIcon size={Math.round(size * 0.65)} />
    </span>
  );
}
