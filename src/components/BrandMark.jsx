import React from 'react';
import { useSite } from '../contexts/SiteContext';

/** Business name + BY J&K subtitle */
export default function BrandMark({ stacked = false, className = '', light = false }) {
  const { settings } = useSite();
  const subtitle = settings.business_subtitle || 'BY J&K';

  return (
    <div className={`brand-mark ${stacked ? 'brand-mark--stacked' : ''} ${light ? 'brand-mark--light' : ''} ${className}`}>
      <span className="brand-mark__name">{settings.business_name}</span>
      <span className="brand-mark__by">{subtitle}</span>
    </div>
  );
}
