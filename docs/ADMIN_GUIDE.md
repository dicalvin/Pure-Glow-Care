# Pure Glow Care — Admin Guide

This guide is for **preciousK20** and **calvinD**, the site administrators who manage products, testimonials, and business information.

## Signing in

1. Open the website and go to **`/admin`** (or tap **Admin** in the navigation when already signed in).
2. Enter your **username** (not email):
   - `preciousK20`
   - `calvinD`
3. Enter the shared admin **password**: `pure1glow2care3!`
4. Click **Sign in**.

If login fails with a database message, ask your technical contact to confirm your Supabase Auth account exists (see `supabase/auth-setup.md`).

## Dashboard tabs

### Site info

Update content shown across the public site:

- **Site logo** — upload an image; it appears in the header and footer (replaces the default icon).
- Business name, tagline, about text
- Phone, email, Instagram
- **WhatsApp number** — shown in Get in Touch; visitors tap it to open a WhatsApp chat.
- **Snapchat username** — shown as @username only; visitors tap to open your profile.
- **Snapchat profile URL** — full link used behind the scenes (not shown on the public site). Leave blank to auto-link from the username.
- Homepage hero headline and subheadline
- Shipping note (e.g. free delivery threshold)

Click **Save settings** after editing. Logo uploads save immediately; other fields save when you click **Save settings**.

### Products

**Add a product**

1. Fill in name, price (numbers only), and optional fields:
   - Tagline, description, purpose, how to use, ingredients
   - Category, badge label, sort order (lower = earlier in lists)
2. **Upload product image** — file goes to Supabase Storage and links automatically.
3. Optional: paste a **video URL** for a demo clip on the product page.
4. Check **Featured** to highlight on the homepage.
5. Check **In stock** (uncheck if sold out).
6. Click **Add product**.

**Edit or delete**

- Use the **pencil** icon to edit name, price, image, and description inline.
- Use the **trash** icon to remove a product (confirm when prompted).

Prices use **UGX** by default unless you set another currency code.

### Testimonials

**Written reviews** (no photo) appear in the dark “Real Stories” section.

**Pictorial testimonials** (photo or video) appear in the **Glow Gallery** on the Testimonials page and on the homepage.

**Add a testimonial**

1. Author name (required) and optional location.
2. Review text (required).
3. Optionally link a **product** from the dropdown.
4. Set **rating** 1–5.
5. For pictorial reviews: upload an **image or video** under “Pictorial testimonial”.
6. **Featured** — optional highlight flag for future use.
7. **Published** — must be checked for visitors to see the review.
8. Click **Add testimonial**.

**Manage existing**

- **Hide** / **Publish** toggles approval without deleting.
- **Trash** permanently removes the testimonial.

## Media uploads

- Images and videos are stored in the **pure-glow-media** bucket.
- Use clear, well-lit photos (JPEG/PNG) or short MP4/WebM videos.
- Large files may take longer to upload; wait for the success toast.

## Sign out

Click **Sign out** in the dashboard header when finished, especially on shared devices.

## Tips

- Add products before linking them in testimonials.
- Unpublish drafts instead of deleting if you might reuse the text.
- Keep hero copy short; the homepage is designed for scannable messaging.
