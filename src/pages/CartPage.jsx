import React, { useState } from 'react';
import { Minus, Plus, Trash2, ShieldCheck, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import img1 from '../assets/1.jpg';
import img2 from '../assets/2.jpg';

export default function CartPage() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Minty Fresh",
      price: 24.00,
      quantity: 1,
      image: img1
    },
    {
      id: 2,
      name: "Rose Petal",
      price: 24.00,
      quantity: 2,
      image: img2
    }
  ]);

  const updateQuantity = (id, delta) => {
    setCartItems(items => items.map(item => {
      if (item.id === id) {
        return { ...item, quantity: Math.max(1, item.quantity + delta) };
      }
      return item;
    }));
  };

  const removeItem = (id) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const freeShippingThreshold = 50;
  const progress = Math.min((subtotal / freeShippingThreshold) * 100, 100);

  return (
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-6 min-h-screen">
      <h1 className="font-sans text-4xl text-geeks-dark mb-12">Your Shopping Bag</h1>

      {cartItems.length > 0 ? (
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Line Items */}
          <div className="flex-1">
            {/* Free Shipping Progress */}
            <div className="bg-geeks-orange/30 p-6 mb-8">
              <p className="text-sm text-geeks-dark mb-2 font-medium tracking-wide">
                {progress >= 100 
                  ? "Congratulations! You've unlocked Free Shipping." 
                  : `Add $${(freeShippingThreshold - subtotal).toFixed(2)} more for Free Shipping.`}
              </p>
              <div className="w-full h-1.5 bg-white rounded-full overflow-hidden">
                <div 
                  className="h-full bg-geeks-dark rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <div className="space-y-8">
              {cartItems.map((item) => (
                <div key={item.id} className="flex gap-6 pb-8 border-b border-gray-100">
                  <img src={item.image} alt={item.name} className="w-32 h-40 object-contain bg-white p-2" />
                  <div className="flex-1 flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-lg text-geeks-dark">{item.name}</h3>
                        <p className="text-geeks-dark/60 text-sm mt-1">10-Free Vegan Polish</p>
                      </div>
                      <p className="font-medium text-geeks-dark">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                    
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center border border-gray-200">
                        <button onClick={() => updateQuantity(item.id, -1)} className="p-2 hover:bg-white transition-colors"><Minus className="w-4 h-4" /></button>
                        <span className="w-12 text-center text-sm font-medium">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, 1)} className="p-2 hover:bg-white transition-colors"><Plus className="w-4 h-4" /></button>
                      </div>
                      <button onClick={() => removeItem(item.id)} className="text-geeks-dark/50 hover:text-red-500 transition-colors flex items-center gap-1 text-sm">
                        <Trash2 className="w-4 h-4" /> Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="w-full lg:w-96">
            <div className="bg-white p-8">
              <h2 className="font-sans text-2xl text-geeks-dark mb-6">Order Summary</h2>
              
              <div className="space-y-4 text-sm mb-6 border-b border-gray-200 pb-6">
                <div className="flex justify-between text-geeks-dark/70">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-geeks-dark/70">
                  <span>Estimated Shipping</span>
                  <span>{progress >= 100 ? 'Free' : 'Calculated at checkout'}</span>
                </div>
              </div>

              <div className="flex justify-between text-lg font-medium text-geeks-dark mb-8">
                <span>Total</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>

              <Link to="/checkout" className="w-full py-4 bg-pink-600 text-white shadow-md font-medium tracking-wide flex items-center justify-center gap-2 hover:bg-pink-700 transition-colors">
                Proceed to Checkout <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="mt-6 flex flex-col gap-3">
              <div className="flex items-center gap-3 text-geeks-dark/70 text-sm">
                <ShieldCheck className="w-5 h-5 text-geeks-orange" />
                <span>Secure Checkout Process</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-20 border border-gray-100">
          <p className="text-lg text-geeks-dark/70 mb-6">Your shopping bag is currently empty.</p>
          <Link to="/shop" className="px-8 py-3 bg-pink-600 text-white shadow-md tracking-wide font-medium hover:bg-pink-700 transition-colors">
            Explore the Palette
          </Link>
        </div>
      )}
    </div>
  );
}
