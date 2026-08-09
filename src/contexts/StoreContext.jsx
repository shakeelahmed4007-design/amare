import React, { createContext, useContext, useState, useEffect } from 'react';
import { productService } from '../services/productService';
import { categoryService } from '../services/categoryService';
import { subscriptionService } from '../services/subscriptionService';
import { authService } from '../services/authService';

const StoreContext = createContext();

export function StoreProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);
  const [activeSubscription, setActiveSubscription] = useState(null); // Active plan for subscriber view
  const [user, setUser] = useState(authService.getCurrentUser());
  const [loading, setLoading] = useState(true);
  const [activityLogs, setActivityLogs] = useState([
    { id: 1, action: 'Product Created', detail: 'Suntouchable Invisi-Stick', timestamp: '10 mins ago', user: 'Admin' },
    { id: 2, action: 'Category Added', detail: 'Services & Pass', timestamp: '1 hour ago', user: 'Admin' },
    { id: 3, action: 'Subscription Updated', detail: 'Beauty VIP Pass (10% OFF)', timestamp: '3 hours ago', user: 'Admin' }
  ]);

  const logActivity = (action, detail) => {
    const newLog = {
      id: Date.now(),
      action,
      detail,
      timestamp: 'Just now',
      user: user?.username || 'Admin'
    };
    setActivityLogs(prev => [newLog, ...prev.slice(0, 19)]);
  };

  useEffect(() => {
    loadAllData();
  }, []);

  async function loadAllData() {
    setLoading(true);
    try {
      const [prods, cats, subs] = await Promise.all([
        productService.getProducts(),
        categoryService.getCategories(),
        subscriptionService.getSubscriptions()
      ]);
      setProducts(prods);
      setCategories(cats);
      setSubscriptions(subs);
      const active = subs.find(s => s.status === 'Active');
      if (active) setActiveSubscription(active);
    } catch (err) {
      console.error('Failed to load store data:', err);
    } finally {
      setLoading(false);
    }
  }

  // --- Product Handlers ---
  const addProduct = async (data) => {
    const created = await productService.createProduct(data);
    setProducts(prev => [created, ...prev]);
    logActivity('Added Product', created.title);
    return created;
  };

  const updateProduct = async (id, data) => {
    const updated = await productService.updateProduct(id, data);
    setProducts(prev => prev.map(p => p.id === id || String(p.id) === String(id) ? updated : p));
    logActivity('Updated Product', updated.title);
    return updated;
  };

  const deleteProduct = async (id) => {
    const target = products.find(p => p.id === id || String(p.id) === String(id));
    await productService.deleteProduct(id);
    setProducts(prev => prev.filter(p => p.id !== id && String(p.id) !== String(id)));
    if (target) logActivity('Deleted Product', target.title);
    return true;
  };

  const bulkDeleteProducts = async (ids) => {
    await productService.bulkDeleteProducts(ids);
    setProducts(prev => prev.filter(p => !ids.map(String).includes(String(p.id))));
    logActivity('Bulk Deleted Products', `${ids.length} items deleted`);
    return true;
  };

  const bulkUpdateProductStatus = async (ids, status) => {
    const updated = await productService.bulkUpdateStatus(ids, status);
    setProducts(updated);
    logActivity('Bulk Status Changed', `${ids.length} items set to ${status}`);
    return true;
  };

  // --- Category Handlers ---
  const addCategory = async (data) => {
    const created = await categoryService.createCategory(data);
    setCategories(prev => [...prev, created]);
    logActivity('Added Category', created.name);
    return created;
  };

  const updateCategory = async (id, data) => {
    const updated = await categoryService.updateCategory(id, data);
    setCategories(prev => prev.map(c => c.id === id || String(c.id) === String(id) ? updated : c));
    logActivity('Updated Category', updated.name);
    return updated;
  };

  const deleteCategory = async (id) => {
    const target = categories.find(c => c.id === id || String(c.id) === String(id));
    await categoryService.deleteCategory(id);
    setCategories(prev => prev.filter(c => c.id !== id && String(c.id) !== String(id)));
    if (target) logActivity('Deleted Category', target.name);
    return true;
  };

  // --- Subscription Handlers ---
  const addSubscription = async (data) => {
    const created = await subscriptionService.createSubscription(data);
    setSubscriptions(prev => [created, ...prev]);
    logActivity('Created Subscription', created.name);
    return created;
  };

  const updateSubscription = async (id, data) => {
    const updated = await subscriptionService.updateSubscription(id, data);
    setSubscriptions(prev => prev.map(s => s.id === id || String(s.id) === String(id) ? updated : s));
    if (activeSubscription?.id === id) setActiveSubscription(updated);
    logActivity('Updated Subscription', updated.name);
    return updated;
  };

  const deleteSubscription = async (id) => {
    const target = subscriptions.find(s => s.id === id || String(s.id) === String(id));
    await subscriptionService.deleteSubscription(id);
    setSubscriptions(prev => prev.filter(s => s.id !== id && String(s.id) !== String(id)));
    if (activeSubscription?.id === id) setActiveSubscription(null);
    if (target) logActivity('Deleted Subscription', target.name);
    return true;
  };

  // --- Auth Handlers ---
  const loginAdmin = (username, password) => {
    const res = authService.login(username, password);
    if (res.success) {
      setUser(res.user);
      logActivity('Admin Login', username);
    }
    return res;
  };

  const logoutAdmin = () => {
    authService.logout();
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
