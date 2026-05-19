# Pure Glow Care

Premium hair care storefront built with React, Vite, and Supabase.

## Quick start

```bash
npm install
cp .env.example .env   # add your Supabase URL and anon key
npm run dev
```

Open http://localhost:5173

## Admin access

- URL: `/admin`
- Usernames: `preciousK20`, `calvinD`
- Password: `pure1glow2care3!`

Create matching Supabase Auth users — see [supabase/auth-setup.md](./supabase/auth-setup.md).

## Documentation

- [Technical](./docs/TECHNICAL.md)
- [Admin guide](./docs/ADMIN_GUIDE.md)
- [Visitor guide](./docs/USER_GUIDE.md)
- [Project overview](./docs/PROJECT_OVERVIEW.md)

## Supabase

Run migration for pictorial testimonials:

`supabase/migrations/002_testimonial_media.sql`

Storage bucket: `pure-glow-media` (see `supabase/storage-policies.sql`).
