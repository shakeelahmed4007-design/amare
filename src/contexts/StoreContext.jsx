import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { productService } from '../services/productService';
import { categoryService } from '../services/categoryService';
import { subscriptionService } from '../services/subscriptionService';
import { authService } from '../services/authService';
import { activityLogService } from '../services/activityLogService';
import { supabase } from '../supabase';

const StoreContext = createContext();

export function StoreProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);
  const [activeSubscription, setActiveSubscription] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);       // Admin auth loading
  const [publicLoading, setPublicLoading] = useState(true); // Storefront data loading
  const [publicError, setPublicError] = useState(null);
  const [activityLogs, setActivityLogs] = useState([]);

  // ─── Activity Log Helpers ──────────────────────────────────────────────────

  const logActivity = async (action, detail) => {
    try {
      await activityLogService.logAction(action, detail);
      loadActivityLogs();
    } catch (e) {
      console.warn('[StoreContext] logActivity failed (non-critical):', e);
    }
  };

  const loadActivityLogs = async () => {
    try {
      const logs = await activityLogService.getRecentLogs(5);
      setActivityLogs(logs);
    } catch (e) {
      console.warn('[StoreContext] loadActivityLogs failed:', e);
    }
  };

  // ─── Public Storefront Data (No Auth Required) ─────────────────────────────
  // Runs on every mount so the storefront always has fresh product data.

  const loadPublicData = useCallback(async () => {
    setPublicLoading(true);
    setPublicError(null);
    try {
      const [prods, cats] = await Promise.all([
        productService.getProducts(),
        categoryService.getCategories(),
      ]);
      setProducts(prods);
      setCategories(cats);
    } catch (err) {
      console.error('[StoreContext] loadPublicData error:', err);
      setPublicError(err?.message || 'Failed to load products. Please refresh.');
    } finally {
      setPublicLoading(false);
    }
  }, []);

  // Load public data on mount (storefront products visible to everyone)
  useEffect(() => {
    loadPublicData();
  }, [loadPublicData]);

  // ─── Supabase Realtime — Auto-refresh when products table changes ──────────
  useEffect(() => {
    const channel = supabase
      .channel('public:products')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'products' },
        () => {
          // Re-fetch all products whenever any row changes
          loadPublicData();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [loadPublicData]);

  // ─── Admin Full Data Load ──────────────────────────────────────────────────

  async function loadAllData() {
    try {
      const [prods, cats, subs] = await Promise.all([
        productService.getProducts(),
        categoryService.getCategories(),
        subscriptionService.getSubscriptions(),
      ]);
      setProducts(prods);
      setCategories(cats);
      setSubscriptions(subs);
      setPublicLoading(false);
      loadActivityLogs();
    } catch (err) {
      console.error('[StoreContext] loadAllData error:', err);
    }
  }

  // ─── Admin Auth Listener ───────────────────────────────────────────────────

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session) {
          try {
            const profile = await authService.getCurrentProfile(session.user.id);
            if (profile && (profile.role === 'admin' || profile.role === 'staff')) {
              setUser({ ...session.user, role: profile.role, username: profile.full_name });
              loadAllData(); // Load subscriptions + refresh products/cats for admin
            } else {
              setUser(null);
            }
          } catch (e) {
            console.error('[StoreContext] Auth profile load error:', e);
            setUser(null);
          }
        } else {
          setUser(null);
        }
        setLoading(false);
      }
    );
    return () => subscription.unsubscribe();
  }, []);

  // ─── Product CRUD ──────────────────────────────────────────────────────────

  const addProduct = async (data) => {
    const created = await productService.createProduct(data);
    setProducts(prev => [created, ...prev]);
    await logActivity('Product Added', created.title);
    return created;
  };

  const updateProduct = async (id, data) => {
    const updated = await productService.updateProduct(id, data);
    setProducts(prev =>
      prev.map(p => (String(p.id) === String(id) ? updated : p))
    );
    await logActivity('Product Updated', updated.title);
    return updated;
  };

  const deleteProduct = async (id) => {
    const target = products.find(p => String(p.id) === String(id));
    await productService.deleteProduct(id);
    setProducts(prev => prev.filter(p => String(p.id) !== String(id)));
    if (target) await logActivity('Product Deleted', target.title);
    return true;
  };

  const bulkDeleteProducts = async (ids) => {
    await productService.bulkDeleteProducts(ids);
    const idSet = new Set(ids.map(String));
    setProducts(prev => prev.filter(p => !idSet.has(String(p.id))));
    await logActivity('Products Bulk Deleted', `${ids.length} items deleted`);
    return true;
  };

  const bulkUpdateProductStatus = async (ids, status) => {
    const updatedProducts = await productService.bulkUpdateStatus(ids, status);
    const updatedMap = new Map(updatedProducts.map(u => [String(u.id), u]));
    setProducts(prev =>
      prev.map(p => updatedMap.has(String(p.id)) ? updatedMap.get(String(p.id)) : p)
    );
    await logActivity('Products Status Updated', `${ids.length} items → ${status}`);
    return true;
  };

  // ─── Category CRUD ─────────────────────────────────────────────────────────

  const addCategory = async (data) => {
    const created = await categoryService.createCategory(data);
    setCategories(prev => [...prev, created]);
    await logActivity('Category Added', created.name);
    return created;
  };

  const updateCategory = async (id, data) => {
    const updated = await categoryService.updateCategory(id, data);
    setCategories(prev =>
      prev.map(c => (String(c.id) === String(id) ? updated : c))
    );
    await logActivity('Category Updated', updated.name);
    return updated;
  };

  const deleteCategory = async (id) => {
    const target = categories.find(c => String(c.id) === String(id));
    await categoryService.deleteCategory(id);
    setCategories(prev => prev.filter(c => String(c.id) !== String(id)));
    if (target) await logActivity('Category Deleted', target.name);
    return true;
  };

  // ─── Subscription CRUD ─────────────────────────────────────────────────────

  const addSubscription = async (data) => {
    const created = await subscriptionService.createSubscription(data);
    setSubscriptions(prev => [created, ...prev]);
    await logActivity('Subscription Plan Created', created.name);
    return created;
  };

  const updateSubscription = async (id, data) => {
    const updated = await subscriptionService.updateSubscription(id, data);
    setSubscriptions(prev =>
      prev.map(s => (String(s.id) === String(id) ? updated : s))
    );
    if (String(activeSubscription?.id) === String(id)) setActiveSubscription(updated);
    await logActivity('Subscription Plan Updated', updated.name);
    return updated;
  };

  const deleteSubscription = async (id) => {
    const target = subscriptions.find(s => String(s.id) === String(id));
    await subscriptionService.deleteSubscription(id);
    setSubscriptions(prev => prev.filter(s => String(s.id) !== String(id)));
    if (String(activeSubscription?.id) === String(id)) setActiveSubscription(null);
    if (target) await logActivity('Subscription Plan Deleted', target.name);
    return true;
  };

  // ─── Admin Auth ────────────────────────────────────────────────────────────

  const loginAdmin = async (email, password) => {
    // Dev bypass — remove in production
    if (email === 'cos@admin.com' && password === 'cos123') {
      setUser({
        id: 'bypass-123',
        email: 'cos@admin.com',
        role: 'admin',
        username: 'Cosmatic Admin',
      });
      loadAllData();
      return { success: true };
    }

    const res = await authService.login(email, password);
    if (res.success) {
      await logActivity('Admin Login', email);
    }
    return res;
  };

  const logoutAdmin = async () => {
    await authService.logout();
    setUser(null);
  };

  // ─── Pricing Helpers ───────────────────────────────────────────────────────

  const getSubscribedPrice = (product) => {
    if (!activeSubscription || activeSubscription.status !== 'Active') return product.price;
    const discount = activeSubscription.discountPercent || 0;
    return Number((product.price * (1 - discount / 100)).toFixed(2));
  };

  const getTieredPrice = (product, qty) => {
    if (!product?.tieredPricing || product.tieredPricing.length === 0) return product?.price || 0;
    const match = product.tieredPricing.find(
      t => qty >= t.minQty && qty <= (t.maxQty || 99999)
    );
    return match ? match.price : product.price;
  };

  // ─── Context Value ─────────────────────────────────────────────────────────

  const value = {
    products,
    categories,
    subscriptions,
    activeSubscription,
    setActiveSubscription,
    user,
    loading,
    publicLoading,
    publicError,
    activityLogs,
    loginAdmin,
    logoutAdmin,
    addProduct,
    updateProduct,
    deleteProduct,
    bulkDeleteProducts,
    bulkUpdateProductStatus,
    addCategory,
    updateCategory,
    deleteCategory,
    addSubscription,
    updateSubscription,
    deleteSubscription,
    getSubscribedPrice,
    getTieredPrice,
    loadAllData,
    loadPublicData,
  };

  return (
    <StoreContext.Provider value={value}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) throw new Error('useStore must be used within StoreProvider');
  return context;
}
