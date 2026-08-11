import React, { createContext, useContext, useState, useEffect } from 'react';
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
  const [activeSubscription, setActiveSubscription] = useState(null); // Active plan for subscriber view
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activityLogs, setActivityLogs] = useState([]);

  const logActivity = async (action, detail) => {
    await activityLogService.logAction(action, detail);
    // Optionally refresh logs if we are on dashboard
    loadActivityLogs();
  };

  const loadActivityLogs = async () => {
    try {
      const logs = await activityLogService.getRecentLogs(5);
      setActivityLogs(logs);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    // Auth Listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session) {
          const profile = await authService.getCurrentProfile(session.user.id);
          if (profile && (profile.role === 'admin' || profile.role === 'staff')) {
            setUser({ ...session.user, role: profile.role, username: profile.full_name });
            loadAllData();
          } else {
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

  async function loadAllData() {
    try {
      const [prods, cats, subs] = await Promise.all([
        productService.getProducts(),
        categoryService.getCategories(),
        subscriptionService.getSubscriptions()
      ]);
      setProducts(prods);
      setCategories(cats);
      setSubscriptions(subs);
      loadActivityLogs();
    } catch (err) {
      console.error('Failed to load store data:', err);
    }
  }

  // --- Product Handlers ---
  const addProduct = async (data) => {
    const created = await productService.createProduct(data);
    setProducts(prev => [created, ...prev]);
    await logActivity('Product Added', created.title);
    return created;
  };

  const updateProduct = async (id, data) => {
    const updated = await productService.updateProduct(id, data);
    setProducts(prev => prev.map(p => p.id === id || String(p.id) === String(id) ? updated : p));
    await logActivity('Product Updated', updated.title);
    return updated;
  };

  const deleteProduct = async (id) => {
    const target = products.find(p => p.id === id || String(p.id) === String(id));
    await productService.deleteProduct(id);
    setProducts(prev => prev.filter(p => p.id !== id && String(p.id) !== String(id)));
    if (target) await logActivity('Product Deleted', target.title);
    return true;
  };

  const bulkDeleteProducts = async (ids) => {
    await productService.bulkDeleteProducts(ids);
    setProducts(prev => prev.filter(p => !ids.map(String).includes(String(p.id))));
    await logActivity('Products Bulk Deleted', `${ids.length} items deleted`);
    return true;
  };

  const bulkUpdateProductStatus = async (ids, status) => {
    const updatedProducts = await productService.bulkUpdateStatus(ids, status);

    // Merge updated ones into local state
    setProducts(prev => {
      const updatedMap = new Map(updatedProducts.map(u => [String(u.id), u]));
      return prev.map(p => {
        if (updatedMap.has(String(p.id))) {
          return updatedMap.get(String(p.id));
        }
        return p;
      });
    });
    await logActivity('Products Status Updated', `${ids.length} items set to ${status}`);
    return true;
  };

  // --- Category Handlers ---
  const addCategory = async (data) => {
    const created = await categoryService.createCategory(data);
    setCategories(prev => [...prev, created]);
    await logActivity('Category Added', created.name);
    return created;
  };

  const updateCategory = async (id, data) => {
    const updated = await categoryService.updateCategory(id, data);
    setCategories(prev => prev.map(c => c.id === id || String(c.id) === String(id) ? updated : c));
    await logActivity('Category Updated', updated.name);
    return updated;
  };

  const deleteCategory = async (id) => {
    const target = categories.find(c => c.id === id || String(c.id) === String(id));
    await categoryService.deleteCategory(id);
    setCategories(prev => prev.filter(c => c.id !== id && String(c.id) !== String(id)));
    if (target) await logActivity('Category Deleted', target.name);
    return true;
  };

  // --- Subscription Handlers ---
  const addSubscription = async (data) => {
    const created = await subscriptionService.createSubscription(data);
    setSubscriptions(prev => [created, ...prev]);
    await logActivity('Subscription Plan Created', created.name);
    return created;
  };

  const updateSubscription = async (id, data) => {
    const updated = await subscriptionService.updateSubscription(id, data);
    setSubscriptions(prev => prev.map(s => s.id === id || String(s.id) === String(id) ? updated : s));
    if (activeSubscription?.id === id) setActiveSubscription(updated);
    await logActivity('Subscription Plan Updated', updated.name);
    return updated;
  };

  const deleteSubscription = async (id) => {
    const target = subscriptions.find(s => s.id === id || String(s.id) === String(id));
    await subscriptionService.deleteSubscription(id);
    setSubscriptions(prev => prev.filter(s => s.id !== id && String(s.id) !== String(id)));
    if (activeSubscription?.id === id) setActiveSubscription(null);
    if (target) await logActivity('Subscription Plan Deleted', target.name);
    return true;
  };

  // --- Auth Handlers ---
  const loginAdmin = async (email, password) => {
    // Temporary bypass for testing UI without backend user
    if (email === 'cos@admin.com' && password === 'cos123') {
      setUser({
        id: 'bypass-123',
        email: 'cos@admin.com',
        role: 'admin',
        username: 'Cosmatic Admin'
      });
      loadAllData(); // Will attempt to fetch, might return empty if RLS blocks it
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

  // Pricing Helpers
  const getSubscribedPrice = (product) => {
    if (!activeSubscription || activeSubscription.status !== 'Active') return product.price;
    const discount = activeSubscription.discountPercent || 0;
    const discounted = product.price * (1 - discount / 100);
    return Number(discounted.toFixed(2));
  };

  const getTieredPrice = (product, qty) => {
    if (!product.tieredPricing || product.tieredPricing.length === 0) return product.price;
    const match = product.tieredPricing.find(t => qty >= t.minQty && qty <= (t.maxQty || 99999));
    return match ? match.price : product.price;
  };

  const value = {
    products,
    categories,
    subscriptions,
    activeSubscription,
    setActiveSubscription,
    user,
    loading,
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
    loadAllData
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
