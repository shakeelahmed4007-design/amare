import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AnnouncementBar from './components/AnnouncementBar';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import FloatingWidgets from './components/FloatingWidgets';
import ToastNotification from './components/ToastNotification';

import Home from './pages/Home';
import Shop from './pages/Shop';
import Product from './pages/Product';
import CartPage from './pages/CartPage';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Account from './pages/Account';

import { AdminLayout } from './components/layout/AdminLayout';
import { Dashboard } from './pages/admin/Dashboard';
import { Products } from './pages/admin/Products';
import { ProductForm } from './pages/admin/ProductForm';
import { Categories } from './pages/admin/Categories';
import { Orders } from './pages/admin/Orders';
import { Customers } from './pages/admin/Customers';
import { Reviews } from './pages/admin/Reviews';
import { Discounts } from './pages/admin/Discounts';
import { Roles } from './pages/admin/Roles';
import { Analytics } from './pages/admin/Analytics';
import { Settings } from './pages/admin/Settings';

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([
    {
      id: 2,
      title: "Power Grip Primer",
      price: 10,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=600"
    }
  ]);
  const [toast, setToast] = useState({ isVisible: false, message: '' });

  const showToast = (message) => {
    setToast({ isVisible: true, message });
    setTimeout(() => {
      setToast({ isVisible: false, message: '' });
    }, 3000);
  };

  const handleAddToCart = (product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    showToast(`Added ${product.title} to your bag! ✨`);
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (id, newQty) => {
    if (newQty <= 0) {
      handleRemoveItem(id);
      return;
    }
    setCartItems(prev => prev.map(item => item.id === id ? { ...item, quantity: newQty } : item));
  };

  const handleRemoveItem = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <Router>
      <div className="min-h-screen bg-white font-sans text-black flex flex-col relative">
        {/* Sticky Header Stack */}
        <div className="sticky top-0 z-40 w-full shadow-md">
          <AnnouncementBar />
          <Navbar 
            onOpenCart={() => setIsCartOpen(true)} 
            cartCount={cartCount}
          />
        </div>
        
        {/* Page Views */}
        <main className="flex-1">
          <Routes>
            {/* Storefront Routes */}
            <Route path="/" element={<Home onAddToCart={handleAddToCart} />} />
            <Route path="/shop" element={<Shop onAddToCart={handleAddToCart} />} />
            <Route path="/product/:id" element={<Product onAddToCart={handleAddToCart} />} />
            <Route path="/cart" element={<CartPage cartItems={cartItems} onUpdateQuantity={handleUpdateQuantity} onRemoveItem={handleRemoveItem} />} />
            <Route path="/checkout" element={<Checkout cartItems={cartItems} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/account" element={<Account />} />
            
            {/* Admin Routes */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="products" element={<Products />} />
              <Route path="products/new" element={<ProductForm />} />
              <Route path="products/:id" element={<ProductForm />} />
              <Route path="categories" element={<Categories />} />
              <Route path="orders" element={<Orders />} />
              <Route path="customers" element={<Customers />} />
              <Route path="reviews" element={<Reviews />} />
              <Route path="discounts" element={<Discounts />} />
              <Route path="roles" element={<Roles />} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="settings" element={<Settings />} />
            </Route>
          </Routes>
        </main>

        {/* Footer */}
        <Footer />

        {/* Interactive Side Cart Drawer */}
        <CartDrawer 
          isOpen={isCartOpen} 
          onClose={() => setIsCartOpen(false)} 
          cartItems={cartItems}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveItem}
        />

        {/* Floating Chat Avatar & Accessibility Icons */}
        <FloatingWidgets />

        {/* Toast Alert */}
        <ToastNotification 
          isVisible={toast.isVisible} 
          message={toast.message} 
          onClose={() => setToast({ ...toast, isVisible: false })} 
        />
      </div>
    </Router>
  );
}

export default App;
