/** Allowed admin usernames (case-sensitive) */
export const ADMIN_USERNAMES = ['jennyK29', 'calvinD13'];

/** Shared admin password */
export const ADMIN_PASSWORD = 'wigged1up2!!!';

/** Supabase Auth email domain — create matching users in Supabase Auth */
const ADMIN_EMAIL_DOMAIN = 'admin.wiggedup.com';

export function getAdminEmail(username) {
  return `${username.trim()}@${ADMIN_EMAIL_DOMAIN}`;
}

export function validateAdminCredentials(username, password) {
  const user = username?.trim();
  return ADMIN_USERNAMES.includes(user) && password === ADMIN_PASSWORD;
}

export function getAdminDisplayName(user) {
  if (!user) return '';
  return user.user_metadata?.username || user.email?.split('@')[0] || 'Admin';
}
