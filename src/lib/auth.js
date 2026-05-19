/** Allowed admin usernames (case-sensitive) */
export const ADMIN_USERNAMES = ['preciousK20', 'calvinD'];

/** Shared admin password */
export const ADMIN_PASSWORD = 'pure1glow2care3!';

/** Supabase Auth email for each username — create these users in Supabase with the same password */
const ADMIN_EMAIL_DOMAIN = 'admin.pureglowcare.com';

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
