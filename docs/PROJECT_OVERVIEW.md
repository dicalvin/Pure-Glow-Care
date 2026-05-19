# Pure Glow Care — Project Overview

## What this project is

A modern, animated marketing and catalog website for **Pure Glow Care**, a hair products brand. It replaces static content with a database-backed site that two admins can update without editing code.

## Brand

- **Name:** Pure Glow Care  
- **Tagline:** Nourish. Restore. Glow.  
- **Colors:** Primary `#edeeef`, secondary `#f7f6f2`  
- **Typography:** Cormorant Garamond (headings), DM Sans (body)

## Features delivered

| Feature | Status |
|---------|--------|
| Responsive landing page with motion / animated background | Done |
| Product catalog with detail pages (UGX pricing) | Done |
| Written testimonials | Done |
| Pictorial / video testimonials (Glow Gallery) | Done |
| About page | Done |
| Admin dashboard (settings, products, testimonials) | Done |
| Image upload to Supabase Storage | Done |
| Hard-coded admin usernames + shared password | Done |
| Supabase PostgreSQL + RLS | Done (see your SQL) |

## Documentation index

| Document | Audience |
|----------|----------|
| [TECHNICAL.md](./TECHNICAL.md) | Developers, DevOps |
| [ADMIN_GUIDE.md](./ADMIN_GUIDE.md) | preciousK20, calvinD |
| [USER_GUIDE.md](./USER_GUIDE.md) | Website visitors |
| [../supabase/auth-setup.md](../supabase/auth-setup.md) | First-time Supabase setup |
| [../supabase/migrations/002_testimonial_media.sql](../supabase/migrations/002_testimonial_media.sql) | SQL for gallery media columns |

## One-time setup (owner checklist)

1. Confirm Supabase project has base tables and RLS (your provided SQL).
2. Run `002_testimonial_media.sql` for pictorial testimonials.
3. Create bucket `pure-glow-media` and storage policies.
4. Create Auth users per `auth-setup.md`.
5. Ensure `.env` has `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.
6. Run `npm install` and `npm run dev` locally; then deploy `npm run build` output.

## Maintenance

- Back up Supabase data regularly from the dashboard.
- Rotate admin password periodically (update `src/lib/auth.js` and Supabase Auth passwords together).
- Monitor Storage usage as product and testimonial images grow.
