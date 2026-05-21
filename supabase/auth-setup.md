# Supabase Auth setup for Wigged up BY J&K admins

The app validates usernames in code, then signs in to Supabase so Row Level Security allows writes.

## Create two users in Supabase Dashboard

Go to **Authentication → Users → Add user** (email + password):

| Username (app login) | Email (Supabase Auth)           | Password        |
|------------------------|---------------------------------|-----------------|
| `jennyK29`             | `jennyK29@admin.wiggedup.com`   | `wigged1up2!!!` |
| `calvinD13`            | `calvinD13@admin.wiggedup.com`  | `wigged1up2!!!` |

- Enable **Auto confirm user** when creating accounts.
- Use the **same password** as configured in the app (`src/lib/auth.js`).

> If you previously used `preciousK20@admin.pureglowcare.com` emails, create the new emails above or update existing users to match.

## Login flow

1. Admin opens `/admin` and enters username + password.
2. App checks username is `jennyK29` or `calvinD13` and password matches.
3. App calls `signInWithPassword` using the mapped email above.
4. Authenticated session unlocks insert/update/delete on products, testimonials, and settings.
