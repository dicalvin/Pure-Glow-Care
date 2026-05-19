/** Digits-only WhatsApp deep link */
export function getWhatsAppHref(whatsapp) {
  const digits = whatsapp?.replace(/\D/g, '');
  if (!digits) return null;
  return `https://wa.me/${digits}`;
}

export function formatWhatsAppDisplay(whatsapp) {
  const raw = whatsapp?.trim();
  if (!raw) return '';
  return raw;
}

/** Public label only — full URL stays in settings for the href */
export function getSnapchatLabel(snapchatUsername) {
  const user = snapchatUsername?.trim().replace(/^@/, '');
  if (!user) return null;
  return `@${user}`;
}

/**
 * Uses admin-configured snapchat_url when set; otherwise builds add-link from username.
 * Visitors only see @username in the UI.
 */
export function getSnapchatHref(settings) {
  const custom = settings?.snapchat_url?.trim();
  if (custom) return custom;

  const user = settings?.snapchat_username?.trim().replace(/^@/, '');
  if (!user) return null;

  return `https://www.snapchat.com/add/${encodeURIComponent(user)}`;
}
