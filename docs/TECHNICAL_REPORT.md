# Pure Glow Care — Technical Report

## 1. Overview

Pure Glow Care is a single-page application (SPA) for a hair-products online shop. It is built with **React 19**, **Vite 8**, **React Router 7**, **Framer Motion**, and **Supabase** (PostgreSQL + Auth + Storage).

| Layer        | Technology                          |
|-------------|--------------------------------------|
| Frontend    | React, Vite, CSS custom properties   |
| Data        | Supabase PostgreSQL                  |
| Media       | Supabase Storage (`pure-glow-media`) |
| Auth        | Supabase Auth + app-level allowlist  |

Brand colors: primary `#edeeef`, secondary `#f7f6f2`.

---

## 2. Project structure

```
Pure Glow Care/
├── index.html              # Vite entry HTML
├── vite.config.js
├── .env                    # VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY
├── src/
│   ├── main.jsx            # React bootstrap + router + toast
│   ├── App.jsx             # Layout, routes, global animated background
│   ├── index.css           # Global design system
│   ├── lib/
│   │   ├── supabase.js     # Supabase client
│   │   ├── auth.js         # Admin username/password allowlist
│   │   └── format.js       # UGX pricing, setting parse helpers
│   ├── contexts/
│   │   └── SiteContext.jsx # Data fetching + CRUD + uploads
│   ├── components/         # UI building blocks
│   ├── pages/              # Route pages
│   └── data/demoData.js    # Fallback when Supabase unavailable
├── supabase/
│   ├── migrations/         # SQL additions (e.g. testimonial media)
│   ├── storage-policies.sql
│   └── auth-setup.md
└── docs/                   # This documentation set
```

---

## 3. Database schema (Supabase)

### `site_settings`
- `key` (unique), `value` (JSONB), `updated_at`
- Stores business name, contact info, hero copy, etc.

### `products`
- Core fields: `name`, `tagline`, `description`, `price`, `currency` (default `UGX`)
- Media: `image_url`, `video_url`
- Merchandising: `purpose`, `how_to_use`, `ingredients`, `category`, `badge`, `in_stock`, `featured`, `sort_order`

### `testimonials`
- `author_name`, `author_location`, `author_avatar_url`
- `content`, `rating` (1–5), `product_id` (optional FK)
- `featured`, `approved` (only approved rows are public)
- **Pictorial:** `media_url`, `media_type` (`image` | `video`) — run `supabase/migrations/002_testimonial_media.sql`

### Row Level Security (RLS)
- **SELECT:** public for settings and products; testimonials where `approved = true`
- **ALL (write):** `auth.role() = 'authenticated'` for admins

---

## 4. Storage

- Bucket name: **`pure-glow-media`** (public read recommended for product/testimonial images)
- Upload paths: `products/{timestamp}-{id}.{ext}`, `testimonials/...`
- Apply policies in `supabase/storage-policies.sql`

---

## 5. Authentication architecture

1. **Allowlist** (`src/lib/auth.js`): only `preciousK20` and `calvinD` with password `pure1glow2care3!`
2. **Supabase session:** after allowlist check, `signInWithPassword` using `{username}@admin.pureglowcare.com`
3. **RLS:** authenticated JWT enables writes to tables and storage

See `supabase/auth-setup.md` for creating matching Supabase Auth users.

---

## 6. Key frontend flows

### Public site
- `/` — Landing, featured products, pictorial + written testimonials
- `/products` — Product grid
- `/products/:id` — Detail (description, purpose, how to use, ingredients, UGX price)
- `/testimonials` — Glow Gallery (media) + written reviews
- `/about` — Brand story from `site_settings.about`

### Admin (`/admin`)
- Tabs: Site info, Products, Testimonials
- Image upload to Storage for products and pictorial testimonials
- Publish/unpublish testimonials via `approved` flag

### State management
- `SiteContext` loads settings, products, and approved testimonials on mount
- `adminTestimonials` loads all rows when an admin is signed in

---

## 7. Environment variables

| Variable                 | Description                    |
|--------------------------|--------------------------------|
| `VITE_SUPABASE_URL`      | Project URL                    |
| `VITE_SUPABASE_ANON_KEY` | Public anon key (safe in client)|

Never commit service-role keys to the frontend.

---

## 8. Scripts

```bash
npm install    # Install dependencies
npm run dev    # Development server (default http://localhost:5173)
npm run build  # Production build → dist/
npm run preview # Preview production build
```

---

## 9. Scaling recommendations

1. **Auth:** Move admin validation to Edge Function; use HttpOnly cookies or short-lived tokens.
2. **CDN:** Serve `dist/` via Vercel, Netlify, or Cloudflare Pages; cache static assets.
3. **Images:** Use Supabase image transforms or CDN in front of Storage.
4. **SEO:** Add `react-helmet-async` or migrate critical pages to SSR (e.g. Remix/Next) if needed.
5. **Monitoring:** Supabase logs + Sentry on the client for production errors.
6. **Backups:** Enable Supabase point-in-time recovery on paid plan.

---

## 10. Known limitations

- Admin credentials are in client code (acceptable for a small team; not enterprise-grade).
- No shopping cart/checkout (catalog + contact model).
- Video testimonials rely on direct Storage URLs (no transcoding pipeline).
