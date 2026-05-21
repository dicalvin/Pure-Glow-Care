import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { validateAdminCredentials, getAdminEmail } from '../lib/auth';
import { parseSettingValue } from '../lib/format';
import { DEMO_PRODUCTS, DEMO_TESTIMONIALS } from '../data/demoData';

const SiteContext = createContext();
const MEDIA_BUCKET = 'pure-glow-media';

const DEFAULT_SETTINGS = {
  business_name: 'Wigged up',
  business_subtitle: 'BY J&K',
  tagline: 'Slay. Switch. Wigged up.',
  about:
    'Wigged up BY J&K is your destination for premium wigs — bold styles, natural looks, and confidence in every strand. From everyday elegance to statement glam, we help you find your perfect fit.',
  phone: '+256 700 000000',
  email: 'hello@wiggedup.com',
  instagram: '@wiggedup',
  whatsapp: '+256700000000',
  hero_headline: 'Get Wigged Up',
  hero_subheadline:
    'Premium wigs curated by J&K — lace fronts, bundles, and full glam units ready to transform your look.',
  shipping_note: 'Free delivery on orders above UGX 150,000',
  logo_url: '',
  snapchat_username: '',
  snapchat_url: '',
};

export function SiteProvider({ children }) {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [products, setProducts] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [adminTestimonials, setAdminTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [adminUsername, setAdminUsername] = useState(null);

  useEffect(() => {
    if (!isSupabaseConfigured) return undefined;
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser(session.user);
        const stored = sessionStorage.getItem('pgc_admin_user');
        if (stored) setAdminUsername(stored);
      }
    });
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (!session) {
        setAdminUsername(null);
        sessionStorage.removeItem('pgc_admin_user');
      }
    });
    return () => subscription.unsubscribe();
  }, []);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    try {
      if (!isSupabaseConfigured) {
        setProducts(DEMO_PRODUCTS);
        setTestimonials(DEMO_TESTIMONIALS);
        setAdminTestimonials(DEMO_TESTIMONIALS);
        return;
      }
      await Promise.all([fetchSettings(), fetchProducts(), fetchTestimonials()]);
      if (user) await fetchAdminTestimonials();
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  useEffect(() => {
    if (user && isSupabaseConfigured) fetchAdminTestimonials();
  }, [user]);

  async function fetchSettings() {
    const { data, error } = await supabase.from('site_settings').select('*');
    if (error) console.warn('site_settings:', error.message);
    if (data?.length > 0) {
      const merged = { ...DEFAULT_SETTINGS };
      data.forEach((row) => {
        merged[row.key] = parseSettingValue(row.value);
      });
      setSettings(merged);
    }
  }

  async function fetchProducts() {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: false });
    if (error) console.warn('products:', error.message);
    setProducts(data?.length ? data : []);
  }

  async function fetchTestimonials() {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*, products(name)')
      .eq('approved', true)
      .order('created_at', { ascending: false });
    if (error) console.warn('testimonials:', error.message);
    setTestimonials(data || []);
  }

  async function fetchAdminTestimonials() {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*, products(name)')
      .order('created_at', { ascending: false });
    if (!error && data) setAdminTestimonials(data);
  }

  async function updateSetting(key, value) {
    if (!isSupabaseConfigured) {
      setSettings((prev) => ({ ...prev, [key]: value }));
      return { error: null };
    }
    const { error } = await supabase
      .from('site_settings')
      .upsert({ key, value, updated_at: new Date().toISOString() }, { onConflict: 'key' });
    if (!error) setSettings((prev) => ({ ...prev, [key]: value }));
    return { error };
  }

  async function addProduct(product) {
    const payload = {
      ...product,
      price: Number(product.price) || 0,
      currency: product.currency || 'UGX',
      in_stock: product.in_stock !== false,
      featured: Boolean(product.featured),
      sort_order: Number(product.sort_order) || 0,
    };
    if (!isSupabaseConfigured) {
      const item = { ...payload, id: `local-${Date.now()}` };
      setProducts((prev) => [item, ...prev]);
      return { data: item, error: null };
    }
    const { data, error } = await supabase.from('products').insert([payload]).select().single();
    if (!error && data) setProducts((prev) => [data, ...prev]);
    return { data, error };
  }

  async function updateProduct(id, updates) {
    const payload = { ...updates, updated_at: new Date().toISOString() };
    if (payload.price !== undefined) payload.price = Number(payload.price);
    if (!isSupabaseConfigured) {
      setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, ...payload } : p)));
      return { data: payload, error: null };
    }
    const { data, error } = await supabase.from('products').update(payload).eq('id', id).select().single();
    if (!error && data) setProducts((prev) => prev.map((p) => (p.id === id ? data : p)));
    return { data, error };
  }

  async function deleteProduct(id) {
    if (!isSupabaseConfigured) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
      return { error: null };
    }
    const { error } = await supabase.from('products').delete().eq('id', id);
    if (!error) setProducts((prev) => prev.filter((p) => p.id !== id));
    return { error };
  }

  async function addTestimonial(testimonial) {
    const payload = {
      author_name: testimonial.author_name,
      author_location: testimonial.author_location || null,
      author_avatar_url: testimonial.author_avatar_url || null,
      content: testimonial.content,
      rating: testimonial.rating ?? 5,
      product_id: testimonial.product_id || null,
      media_url: testimonial.media_url || null,
      media_type: testimonial.media_type || (testimonial.media_url ? 'image' : null),
      featured: Boolean(testimonial.featured),
      approved: testimonial.approved !== false,
    };
    if (!isSupabaseConfigured) {
      const item = { ...payload, id: `local-t-${Date.now()}`, products: null };
      setTestimonials((prev) => (payload.approved ? [item, ...prev] : prev));
      setAdminTestimonials((prev) => [item, ...prev]);
      return { data: item, error: null };
    }
    const { data, error } = await supabase.from('testimonials').insert([payload]).select('*, products(name)').single();
    if (!error && data) {
      if (data.approved) setTestimonials((prev) => [data, ...prev]);
      setAdminTestimonials((prev) => [data, ...prev]);
    }
    return { data, error };
  }

  async function updateTestimonial(id, updates) {
    if (!isSupabaseConfigured) {
      const merge = (list) => list.map((t) => (t.id === id ? { ...t, ...updates } : t));
      setTestimonials(merge);
      setAdminTestimonials(merge);
      return { data: updates, error: null };
    }
    const { data, error } = await supabase
      .from('testimonials')
      .update(updates)
      .eq('id', id)
      .select('*, products(name)')
      .single();
    if (!error && data) {
      setAdminTestimonials((prev) => prev.map((t) => (t.id === id ? data : t)));
      setTestimonials((prev) => {
        const filtered = prev.filter((t) => t.id !== id);
        return data.approved ? [data, ...filtered] : filtered;
      });
    }
    return { data, error };
  }

  async function deleteTestimonial(id) {
    if (!isSupabaseConfigured) {
      setTestimonials((prev) => prev.filter((t) => t.id !== id));
      setAdminTestimonials((prev) => prev.filter((t) => t.id !== id));
      return { error: null };
    }
    const { error } = await supabase.from('testimonials').delete().eq('id', id);
    if (!error) {
      setTestimonials((prev) => prev.filter((t) => t.id !== id));
      setAdminTestimonials((prev) => prev.filter((t) => t.id !== id));
    }
    return { error };
  }

  async function uploadMedia(file, folder) {
    const ext = file.name.split('.').pop()?.toLowerCase() || 'bin';
    const path = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2, 9)}.${ext}`;

    if (!isSupabaseConfigured) {
      return { url: URL.createObjectURL(file), path, error: null };
    }

    const { data, error } = await supabase.storage.from(MEDIA_BUCKET).upload(path, file, {
      upsert: true,
      cacheControl: '3600',
    });
    if (error) return { url: null, path: null, error };

    const {
      data: { publicUrl },
    } = supabase.storage.from(MEDIA_BUCKET).getPublicUrl(data.path);
    return { url: publicUrl, path: data.path, error: null };
  }

  async function signIn(username, password) {
    if (!validateAdminCredentials(username, password)) {
      return { data: null, error: { message: 'Invalid username or password.' } };
    }

    const trimmed = username.trim();
    sessionStorage.setItem('pgc_admin_user', trimmed);
    setAdminUsername(trimmed);

    if (!isSupabaseConfigured) {
      setUser({ id: trimmed, email: getAdminEmail(trimmed) });
      return { data: { user: { id: trimmed } }, error: null };
    }

    const email = getAdminEmail(trimmed);
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      return {
        data: null,
        error: {
          message:
            'Login verified, but Supabase Auth failed. Create users ' +
            `"${getAdminEmail(trimmed)}" with the same password in Supabase Dashboard → Authentication.`,
        },
      };
    }

    setUser(data.user);
    await fetchAdminTestimonials();
    return { data, error: null };
  }

  async function signOut() {
    sessionStorage.removeItem('pgc_admin_user');
    setAdminUsername(null);
    setUser(null);
    if (isSupabaseConfigured) await supabase.auth.signOut();
  }

  return (
    <SiteContext.Provider
      value={{
        settings,
        products,
        testimonials,
        adminTestimonials,
        loading,
        user,
        adminUsername,
        isSupabaseConfigured,
        updateSetting,
        addProduct,
        updateProduct,
        deleteProduct,
        addTestimonial,
        updateTestimonial,
        deleteTestimonial,
        uploadMedia,
        signIn,
        signOut,
        refetch: fetchAll,
        fetchAdminTestimonials,
      }}
    >
      {children}
    </SiteContext.Provider>
  );
}

function ADMIN_EMAIL_HINT(username) {
  return `"${getAdminEmail(username)}"`;
}

export const useSite = () => useContext(SiteContext);
