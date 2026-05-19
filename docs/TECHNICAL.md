# Pure Glow Care — Technical Documentation

## Overview

Pure Glow Care is a single-page application (SPA) built with **React 19**, **Vite 8**, and **Supabase** (PostgreSQL + Auth + Storage). It serves a public hair-care storefront and a password-protected admin dashboard for content management.

## Architecture

```
Browser
   │
   ▼
React SPA (Vite)
   ├── Public routes: Home, Products, Product detail, Testimonials, About
   └── Admin route: /admin (username/password gate + Supabase session)
           │
           ▼
Supabase
   ├── PostgreSQL: site_settings, products, testimonials
   ├── Auth: admin users (authenticated role for RLS writes)
   └── Storage: bucket pure-glow-media (images/videos)
```

## Project structure

| Path | Purpose |
|------|---------|
| `src/main.jsx` | App entry, router, toast provider |
| `src/App.jsx` | Layout, routes, global animated background |
| `src/contexts/SiteContext.jsx` | Data fetching, CRUD, auth, uploads |
| `src/lib/supabase.js` | Supabase client (`VITE_SUPABASE_*` env vars) |
| `src/lib/auth.js` | Allowed admin usernames and password check |
| `src/lib/format.js` | UGX pricing, JSONB setting parse, author names |
| `src/pages/` | Route-level screens |
| `src/components/` | Reusable UI (NavBar, cards, MediaUpload, etc.) |
| `supabase/migrations/` | SQL additions (e.g. testimonial media columns) |
| `supabase/storage-policies.sql` | Storage RLS templates |
| `supabase/auth-setup.md` | How to create Supabase Auth users |

## Database schema (summary)

### `site_settings`
- `key` (unique), `value` (JSONB), `updated_at`
- Seeds: business name, tagline, contact, hero copy, shipping note

### `products`
- Core: `name`, `tagline`, `description`, `price`, `currency` (default UGX)
- Media: `image_url`, `video_url` (public URLs from Storage)
- Merchandising: `purpose`, `how_to_use`, `ingredients`, `category`, `badge`
- Flags: `in_stock`, `featured`, `sort_order`

### `testimonials`
- `author_name`, `author_location`, `author_avatar_url`
- `content`, `rating` (1–5), `product_id` (optional FK)
- `featured`, `approved` (only approved rows are public)
- **Pictorial:** `media_url`, `media_type` (`image` | `video`) — run `002_testimonial_media.sql`

## Row Level Security (RLS)

- **Public read:** all `site_settings` and `products`; `testimonials` where `approved = true`
- **Admin write:** `authenticated` role on all three tables (matches Supabase Auth session after login)

## Storage

- Bucket name: **`pure-glow-media`** (public read recommended for storefront images)
- Upload paths: `products/{timestamp}-{id}.{ext}`, `testimonials/{timestamp}-{id}.{ext}`
- Apply policies in `supabase/storage-policies.sql` after creating the bucket

## Authentication model

1. Client validates username ∈ `{ preciousK20, calvinD }` and password `pure1glow2care3!` (`src/lib/auth.js`).
2. On success, `signInWithPassword` uses email `{username}@admin.pureglowcare.com`.
3. Supabase session satisfies RLS for admin CRUD.

See `supabase/auth-setup.md` for creating matching Auth users.

## Environment variables

```env
VITE_SUPABASE_URL=https://xxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...
```

Never commit `.env` to public repos. Use hosting provider secrets for production.

## Scripts

| Command | Action |
|---------|--------|
| `npm run dev` | Dev server (default http://localhost:5173) |
| `npm run build` | Production build → `dist/` |
| `npm run preview` | Serve production build locally |

## Key dependencies

- `react`, `react-dom`, `react-router-dom`
- `@supabase/supabase-js`
- `framer-motion`, `lucide-react`, `react-hot-toast`

## Deployment checklist

1. Run base SQL + `002_testimonial_media.sql` in Supabase SQL Editor
2. Create storage bucket + policies
3. Create two Auth users (auth-setup.md)
4. Seed or edit `site_settings` / add products via admin
5. Set `VITE_*` env vars on host (Vercel, Netlify, etc.)
6. Deploy `dist/` from `npm run build`

## Future scaling suggestions

- Move admin credentials to Edge Function + httpOnly cookies
- Add order/checkout tables when e-commerce payments are required
- CDN in front of Storage public URLs
- Separate staging Supabase project and CI deploy previews
