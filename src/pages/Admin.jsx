import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { LogOut, Plus, Trash2, Settings, Package, MessageSquare, Pencil, Check, X } from 'lucide-react';
import { useSite } from '../contexts/SiteContext';
import MediaUpload from '../components/MediaUpload';
import { getAdminDisplayName } from '../lib/auth';
import { getAuthorName } from '../lib/format';

const TABS = [
  { id: 'settings', label: 'Site info', icon: Settings },
  { id: 'products', label: 'Products', icon: Package },
  { id: 'testimonials', label: 'Testimonials', icon: MessageSquare },
];

const EMPTY_PRODUCT = {
  name: '',
  tagline: '',
  description: '',
  price: '',
  currency: 'UGX',
  purpose: '',
  how_to_use: '',
  ingredients: '',
  category: '',
  badge: '',
  image_url: '',
  video_url: '',
  in_stock: true,
  featured: false,
  sort_order: 0,
};

const EMPTY_TESTIMONIAL = {
  author_name: '',
  author_location: '',
  content: '',
  rating: 5,
  product_id: '',
  media_url: '',
  media_type: 'image',
  featured: false,
  approved: true,
};

export default function Admin() {
  const {
    user,
    adminUsername,
    settings,
    products,
    adminTestimonials,
    signIn,
    signOut,
    updateSetting,
    addProduct,
    updateProduct,
    deleteProduct,
    addTestimonial,
    updateTestimonial,
    deleteTestimonial,
    uploadMedia,
  } = useSite();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [tab, setTab] = useState('settings');
  const [loginLoading, setLoginLoading] = useState(false);
  const [settingsForm, setSettingsForm] = useState({ ...settings });
  const [productForm, setProductForm] = useState(EMPTY_PRODUCT);
  const [testimonialForm, setTestimonialForm] = useState(EMPTY_TESTIMONIAL);
  const [editingProductId, setEditingProductId] = useState(null);
  const [editProductForm, setEditProductForm] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setSettingsForm({ ...settings });
  }, [settings]);

  async function handleProductImageUpload(file, isEdit = false) {
    const { url, error } = await uploadMedia(file, 'products');
    if (error) {
      toast.error(error.message);
      return;
    }
    if (isEdit) setEditProductForm((f) => ({ ...f, image_url: url }));
    else setProductForm((f) => ({ ...f, image_url: url }));
    toast.success('Image uploaded');
  }

  async function handleTestimonialMediaUpload(file) {
    const isVideo = file.type.startsWith('video/');
    const { url, error } = await uploadMedia(file, 'testimonials');
    if (error) {
      toast.error(error.message);
      return;
    }
    setTestimonialForm((f) => ({
      ...f,
      media_url: url,
      media_type: isVideo ? 'video' : 'image',
    }));
    toast.success('Media uploaded');
  }

  if (!user) {
    return (
      <div className="admin-login">
        <motion.div
          className="admin-login__card card"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h3>Admin</h3>
          <p className="text-muted" style={{ marginBottom: 24 }}>
            Sign in with your admin username to manage the store.
          </p>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              setLoginLoading(true);
              const { error } = await signIn(username, password);
              setLoginLoading(false);
              if (error) toast.error(error.message);
              else toast.success(`Welcome, ${username}!`);
            }}
          >
            <div className="form-group">
              <label className="label" htmlFor="username">
                Username
              </label>
              <input
                id="username"
                className="input"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin username"
                autoComplete="username"
                required
              />
            </div>
            <div className="form-group">
              <label className="label" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                className="input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={loginLoading}>
              {loginLoading ? 'Signing in…' : 'Sign in'}
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="admin">
      <div className="container admin__header">
        <div>
          <h1>Dashboard</h1>
          <p className="text-muted" style={{ fontSize: 14, marginTop: 4 }}>
            Signed in as {adminUsername || getAdminDisplayName(user)}
          </p>
        </div>
        <button type="button" className="btn btn-ghost" onClick={() => signOut()}>
          <LogOut size={16} /> Sign out
        </button>
      </div>

      <div className="container admin__tabs">
        {TABS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            type="button"
            className={`admin__tab ${tab === id ? 'is-active' : ''}`}
            onClick={() => setTab(id)}
          >
            <Icon size={16} /> {label}
          </button>
        ))}
      </div>

      <div className="container admin__panel">
        {tab === 'settings' && (
          <form
            className="card admin__form"
            onSubmit={async (e) => {
              e.preventDefault();
              setSaving(true);
              for (const [key, value] of Object.entries(settingsForm)) {
                const { error } = await updateSetting(key, value);
                if (error) toast.error(`${key}: ${error.message}`);
              }
              setSaving(false);
              toast.success('Settings saved');
            }}
          >
            <h3>Business &amp; contact</h3>

            <MediaUpload
              label="Site logo"
              accept="image/*"
              currentUrl={settingsForm.logo_url}
              hint="Shown in the navigation bar and footer. Square images work best."
              onUpload={async (file) => {
                const { url, error } = await uploadMedia(file, 'brand');
                if (error) {
                  toast.error(error.message);
                  return;
                }
                setSettingsForm((s) => ({ ...s, logo_url: url }));
                await updateSetting('logo_url', url);
                toast.success('Logo uploaded');
              }}
              onClear={async () => {
                setSettingsForm((s) => ({ ...s, logo_url: '' }));
                await updateSetting('logo_url', '');
              }}
            />

            {[
              'business_name',
              'tagline',
              'about',
              'phone',
              'email',
              'instagram',
              'whatsapp',
              'snapchat_username',
              'hero_headline',
              'hero_subheadline',
              'shipping_note',
            ].map((key) => (
              <div key={key} className="form-group">
                <label className="label">
                  {key === 'whatsapp'
                    ? 'WhatsApp number'
                    : key === 'snapchat_username'
                      ? 'Snapchat username (shown on site)'
                      : key.replace(/_/g, ' ')}
                </label>
                {key === 'about' ? (
                  <textarea
                    className="textarea"
                    value={settingsForm[key] || ''}
                    onChange={(e) => setSettingsForm((s) => ({ ...s, [key]: e.target.value }))}
                  />
                ) : (
                  <input
                    className="input"
                    value={settingsForm[key] || ''}
                    onChange={(e) => setSettingsForm((s) => ({ ...s, [key]: e.target.value }))}
                    placeholder={
                      key === 'whatsapp'
                        ? '+256 700 000000'
                        : key === 'snapchat_username'
                          ? 'yourname'
                          : undefined
                    }
                  />
                )}
                {key === 'whatsapp' && (
                  <p className="admin-field-hint">Visitors tap this number to open WhatsApp.</p>
                )}
                {key === 'snapchat_username' && (
                  <p className="admin-field-hint">Only @username is shown on the site.</p>
                )}
              </div>
            ))}

            <div className="form-group">
              <label className="label">Snapchat profile URL (hidden from visitors)</label>
              <input
                className="input"
                value={settingsForm.snapchat_url || ''}
                onChange={(e) => setSettingsForm((s) => ({ ...s, snapchat_url: e.target.value }))}
                placeholder="https://www.snapchat.com/add/yourname"
              />
              <p className="admin-field-hint">
                Used when visitors click your Snapchat username. Leave blank to auto-build from username.
              </p>
            </div>
            <button type="submit" className="btn btn-accent" disabled={saving}>
              {saving ? 'Saving…' : 'Save settings'}
            </button>
          </form>
        )}

        {tab === 'products' && (
          <>
            <form
              className="card admin__form"
              onSubmit={async (e) => {
                e.preventDefault();
                const { error } = await addProduct(productForm);
                if (error) toast.error(error.message);
                else {
                  toast.success('Product added');
                  setProductForm(EMPTY_PRODUCT);
                }
              }}
            >
              <h3>
                <Plus size={18} /> Add product
              </h3>
              <div className="admin__form-grid">
                {[
                  ['name', 'text', true],
                  ['tagline', 'text', false],
                  ['price', 'number', true],
                  ['currency', 'text', false],
                  ['category', 'text', false],
                  ['badge', 'text', false],
                  ['sort_order', 'number', false],
                ].map(([field, type, required]) => (
                  <div key={field} className="form-group">
                    <label className="label">{field.replace(/_/g, ' ')}</label>
                    <input
                      type={type}
                      className="input"
                      value={productForm[field]}
                      onChange={(e) =>
                        setProductForm((f) => ({
                          ...f,
                          [field]: type === 'number' ? e.target.value : e.target.value,
                        }))
                      }
                      required={required}
                    />
                  </div>
                ))}
              </div>
              {['description', 'purpose', 'how_to_use', 'ingredients'].map((field) => (
                <div key={field} className="form-group">
                  <label className="label">{field.replace(/_/g, ' ')}</label>
                  <textarea
                    className="textarea"
                    value={productForm[field]}
                    onChange={(e) => setProductForm((f) => ({ ...f, [field]: e.target.value }))}
                  />
                </div>
              ))}
              <MediaUpload
                label="Product image"
                accept="image/*"
                currentUrl={productForm.image_url}
                onUpload={(file) => handleProductImageUpload(file, false)}
                onClear={() => setProductForm((f) => ({ ...f, image_url: '' }))}
                hint="Stored in Supabase bucket pure-glow-media"
              />
              <div className="form-group">
                <label className="label">Video URL (optional)</label>
                <input
                  className="input"
                  value={productForm.video_url}
                  onChange={(e) => setProductForm((f) => ({ ...f, video_url: e.target.value }))}
                  placeholder="Or upload video to storage and paste URL"
                />
              </div>
              <label className="admin__checkbox">
                <input
                  type="checkbox"
                  checked={productForm.featured}
                  onChange={(e) => setProductForm((f) => ({ ...f, featured: e.target.checked }))}
                />
                Featured on homepage
              </label>
              <label className="admin__checkbox">
                <input
                  type="checkbox"
                  checked={productForm.in_stock}
                  onChange={(e) => setProductForm((f) => ({ ...f, in_stock: e.target.checked }))}
                />
                In stock
              </label>
              <button type="submit" className="btn btn-accent">
                Add product
              </button>
            </form>

            <ul className="admin__list">
              {products.map((p) => (
                <li key={p.id} className="card admin__list-item admin__list-item--product">
                  {editingProductId === p.id ? (
                    <div className="admin__edit-inline">
                      <input
                        className="input"
                        value={editProductForm.name}
                        onChange={(e) => setEditProductForm((f) => ({ ...f, name: e.target.value }))}
                      />
                      <input
                        className="input"
                        type="number"
                        value={editProductForm.price}
                        onChange={(e) => setEditProductForm((f) => ({ ...f, price: e.target.value }))}
                      />
                      <MediaUpload
                        label="Image"
                        accept="image/*"
                        currentUrl={editProductForm.image_url}
                        onUpload={(file) => handleProductImageUpload(file, true)}
                        onClear={() => setEditProductForm((f) => ({ ...f, image_url: '' }))}
                      />
                      <textarea
                        className="textarea"
                        value={editProductForm.description || ''}
                        onChange={(e) => setEditProductForm((f) => ({ ...f, description: e.target.value }))}
                        placeholder="Description"
                      />
                      <div className="admin__edit-actions">
                        <button
                          type="button"
                          className="btn btn-accent"
                          onClick={async () => {
                            const { error } = await updateProduct(p.id, editProductForm);
                            if (error) toast.error(error.message);
                            else {
                              toast.success('Product updated');
                              setEditingProductId(null);
                            }
                          }}
                        >
                          <Check size={16} /> Save
                        </button>
                        <button
                          type="button"
                          className="btn btn-ghost"
                          onClick={() => setEditingProductId(null)}
                        >
                          <X size={16} />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="admin__list-product">
                        {p.image_url && <img src={p.image_url} alt="" className="admin__thumb" />}
                        <div>
                          <strong>{p.name}</strong>
                          <span className="text-muted">
                            {' '}
                            — {p.currency || 'UGX'} {Number(p.price).toLocaleString()}
                          </span>
                          {p.featured && <span className="badge" style={{ marginLeft: 8 }}>Featured</span>}
                        </div>
                      </div>
                      <div className="admin__list-actions">
                        <button
                          type="button"
                          className="btn btn-ghost"
                          onClick={() => {
                            setEditingProductId(p.id);
                            setEditProductForm({ ...p });
                          }}
                        >
                          <Pencil size={16} />
                        </button>
                        <button
                          type="button"
                          className="btn btn-ghost"
                          onClick={async () => {
                            if (!window.confirm('Delete this product?')) return;
                            await deleteProduct(p.id);
                            toast.success('Product removed');
                          }}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </>
                  )}
                </li>
              ))}
            </ul>
          </>
        )}

        {tab === 'testimonials' && (
          <>
            <form
              className="card admin__form"
              onSubmit={async (e) => {
                e.preventDefault();
                const payload = {
                  ...testimonialForm,
                  product_id: testimonialForm.product_id || null,
                  rating: Number(testimonialForm.rating) || 5,
                };
                const { error } = await addTestimonial(payload);
                if (error) toast.error(error.message);
                else {
                  toast.success('Testimonial added');
                  setTestimonialForm(EMPTY_TESTIMONIAL);
                }
              }}
            >
              <h3>
                <Plus size={18} /> Add testimonial
              </h3>
              <div className="admin__form-grid">
                <div className="form-group">
                  <label className="label">Author name</label>
                  <input
                    className="input"
                    value={testimonialForm.author_name}
                    onChange={(e) => setTestimonialForm((f) => ({ ...f, author_name: e.target.value }))}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="label">Location</label>
                  <input
                    className="input"
                    value={testimonialForm.author_location}
                    onChange={(e) => setTestimonialForm((f) => ({ ...f, author_location: e.target.value }))}
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="label">Review text</label>
                <textarea
                  className="textarea"
                  value={testimonialForm.content}
                  onChange={(e) => setTestimonialForm((f) => ({ ...f, content: e.target.value }))}
                  required
                />
              </div>
              <div className="form-group">
                <label className="label">Linked product</label>
                <select
                  className="select"
                  value={testimonialForm.product_id}
                  onChange={(e) => setTestimonialForm((f) => ({ ...f, product_id: e.target.value }))}
                >
                  <option value="">None</option>
                  {products.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label className="label">Rating (1–5)</label>
                <input
                  type="number"
                  min={1}
                  max={5}
                  className="input"
                  value={testimonialForm.rating}
                  onChange={(e) => setTestimonialForm((f) => ({ ...f, rating: e.target.value }))}
                />
              </div>
              <MediaUpload
                label="Pictorial testimonial (photo or video)"
                accept="image/*,video/*"
                currentUrl={testimonialForm.media_url}
                onUpload={handleTestimonialMediaUpload}
                onClear={() => setTestimonialForm((f) => ({ ...f, media_url: '', media_type: 'image' }))}
                hint="Upload shows in Glow Gallery on the testimonials page"
              />
              <label className="admin__checkbox">
                <input
                  type="checkbox"
                  checked={testimonialForm.featured}
                  onChange={(e) => setTestimonialForm((f) => ({ ...f, featured: e.target.checked }))}
                />
                Featured
              </label>
              <label className="admin__checkbox">
                <input
                  type="checkbox"
                  checked={testimonialForm.approved}
                  onChange={(e) => setTestimonialForm((f) => ({ ...f, approved: e.target.checked }))}
                />
                Published (visible on site)
              </label>
              <button type="submit" className="btn btn-accent">
                Add testimonial
              </button>
            </form>

            <ul className="admin__list">
              {(adminTestimonials.length ? adminTestimonials : []).map((t) => (
                <li key={t.id} className="card admin__list-item">
                  <div className="admin__list-product">
                    {t.media_url && (
                      t.media_type === 'video' ? (
                        <video src={t.media_url} className="admin__thumb" muted />
                      ) : (
                        <img src={t.media_url} alt="" className="admin__thumb" />
                      )
                    )}
                    <div>
                      <strong>{getAuthorName(t)}</strong>
                      {!t.approved && <span className="badge badge-ink" style={{ marginLeft: 8 }}>Draft</span>}
                      <p className="text-muted" style={{ fontSize: 13, marginTop: 4 }}>
                        {t.content.slice(0, 80)}…
                      </p>
                    </div>
                  </div>
                  <div className="admin__list-actions">
                    <button
                      type="button"
                      className="btn btn-ghost"
                      title={t.approved ? 'Unpublish' : 'Publish'}
                      onClick={async () => {
                        await updateTestimonial(t.id, { approved: !t.approved });
                        toast.success(t.approved ? 'Unpublished' : 'Published');
                      }}
                    >
                      {t.approved ? 'Hide' : 'Publish'}
                    </button>
                    <button
                      type="button"
                      className="btn btn-ghost"
                      onClick={async () => {
                        if (!window.confirm('Delete this testimonial?')) return;
                        await deleteTestimonial(t.id);
                        toast.success('Removed');
                      }}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}
