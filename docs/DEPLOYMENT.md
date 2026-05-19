# Deployment — Netlify & Vercel

Pure Glow Care is a Vite + React SPA. Both hosts need the same build settings and environment variables.

## Build settings

| Setting | Value |
|---------|--------|
| Build command | `npm run build` |
| Publish / output directory | `dist` |
| Node version | 20 (recommended) |

## Environment variables

Add in the host dashboard (never commit `.env`):

| Variable | Description |
|----------|-------------|
| `VITE_SUPABASE_URL` | Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Supabase anon (public) key |

Redeploy after changing env vars.

## Netlify (recommended)

1. Push code to GitHub/GitLab/Bitbucket.
2. [Netlify](https://app.netlify.com) → **Add new site** → **Import an existing project**.
3. Netlify reads `netlify.toml` automatically:
   - Build: `npm run build`
   - Publish: `dist`
   - SPA redirect: all routes → `index.html`
4. **Site configuration → Environment variables** → add `VITE_SUPABASE_*`.
5. Deploy.

`public/_redirects` is a backup for SPA routing.

## Vercel

1. [Vercel](https://vercel.com) → **Add New Project** → import repo.
2. Framework: **Vite** (or use `vercel.json` in the repo).
3. **Environment Variables** → add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.
4. Deploy.

`vercel.json` includes SPA rewrites for React Router.

## Post-deploy checklist

- [ ] Homepage loads
- [ ] `/products`, `/testimonials`, `/about` work (refresh each URL)
- [ ] `/admin` login works
- [ ] Supabase data and images load (check browser console)
- [ ] WhatsApp and Snapchat links open correctly from the footer

## Custom domain

Configure DNS in Netlify or Vercel after the first deploy. Enable HTTPS (automatic on both platforms).
