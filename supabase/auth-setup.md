# Supabase Auth setup for Pure Glow Care admins

The app validates usernames in code, then signs in to Supabase so Row Level Security allows writes.

## Create two users in Supabase Dashboard

Go to **Authentication → Users → Add user** (email + password):

| Username (app login) | Email (Supabase Auth)              | Password            |
|----------------------|------------------------------------|---------------------|
| `preciousK20`        | `preciousK20@admin.pureglowcare.com` | `pure1glow2care3!` |
| `calvinD`            | `calvinD@admin.pureglowcare.com`     | `pure1glow2care3!` |

- Enable **Auto confirm user** when creating accounts.
- Use the **same password** as configured in the app (`src/lib/auth.js`).

## Login flow

1. Admin opens `/admin` and enters username + password.
2. App checks username is `preciousK20` or `calvinD` and password matches.
3. App calls `signInWithPassword` using the mapped email above.
4. Authenticated session unlocks insert/update/delete on products, testimonials, and settings.

## Security note

Usernames and password are embedded in the frontend bundle. For stronger security later, move validation to a Supabase Edge Function or use Magic Link / SSO only for known admin emails.
