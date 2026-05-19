export function formatPrice(price, currency = 'UGX') {
  const n = Number(price);
  if (Number.isNaN(n)) return '';

  if (currency === 'UGX') {
    return `UGX ${n.toLocaleString('en-UG', { maximumFractionDigits: 0 })}`;
  }

  try {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(n);
  } catch {
    return `${currency} ${n.toFixed(2)}`;
  }
}

export function parseSettingValue(value) {
  if (value === null || value === undefined) return '';
  if (typeof value === 'object') return value;
  if (typeof value === 'string') {
    try {
      const parsed = JSON.parse(value);
      return typeof parsed === 'string' ? parsed : parsed;
    } catch {
      return value;
    }
  }
  return value;
}

export function getAuthorName(testimonial) {
  return testimonial?.author_name || testimonial?.author || 'Anonymous';
}

export function hasPictorialMedia(testimonial) {
  return Boolean(testimonial?.media_url);
}
