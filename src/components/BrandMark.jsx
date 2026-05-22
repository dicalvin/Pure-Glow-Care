import React from 'react';
import { useSite } from '../contexts/SiteContext';

/** Business name + BY J&K subtitle */
export default function BrandMark({ stacked = false, className = '', light = false }) {
  const { settings } = useSite();
  const subtitle = settings.business_subtitle || 'By J&K';
  const businessName = settings.business_name.replace('Wigged up', 'Wigged Up');

  return (
    <div className={`brand-mark ${stacked ? 'brand-mark--stacked' : ''} ${light ? 'brand-mark--light' : ''} ${className}`}>
      <span className="brand-mark__name">{businessName}</span>
      <span className="brand-mark__by">{subtitle}</span>
    </div>
  );
}
