import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, Trash2, ShoppingBag, Diamond, Tag, Star, Gift } from 'lucide-react';
import { Link } from 'react-router-dom';
import { products } from '../data/products';

export default function CartDrawer({ isOpen, onClose, cartItems = [], onUpdateQuantity, onRemoveItem }) {
  const [activeTab, setActiveTab] = useState('bag');

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const freeShippingThreshold = 35;
  const progress = Math.min((subtotal / freeShippingThreshold) * 100, 100);

  // Use a couple of products for Trending Now
  const trendingProducts = products.slice(7, 9); // Power Grip Primer + 4% Niacinamide, Power Grip Matte Primer

  const renderBagTab = () => {
    if (cartItems.length === 0) {
      return (
        <div className="flex flex-col px-5 overflow-y-auto pb-10">
          <div className="flex flex-col items-center text-center mt-8 mb-10">
            <Star className="w-12 h-12 text-white stroke-neutral-200 mb-4" strokeWidth={1} />
            <h3 className="text-3xl font-extrabold text-black mb-3">Your Bag Is Empty</h3>
            <p className="text-neutral-600 text-sm font-medium mb-6 px-4">
              Looks like you haven't added anything yet. Let's find something you'll love.
            </p>
            <button 
              onClick={onClose}
              className="w-full bg-black text-white font-extrabold text-xs sm:text-sm py-4 rounded-full uppercase tracking-wider hover:bg-neutral-800 transition-colors"
            >
              SHOP BEST SELLERS
            </button>
          </div>

          <div className="mt-4">
            <h4 className="font-extrabold text-[17px] text-black mb-4">Trending Now</h4>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {trendingProducts.map(prod => (
                <div key={prod.id} className="bg-white p-3 rounded shadow-sm border border-neutral-100 flex flex-col group cursor-pointer">
                  <img src={prod.image} alt={prod.title} className="w-full aspect-[3/4] object-contain mix-blend-multiply mb-3 group-hover:scale-105 transition-transform" />
                  <div className="flex space-x-[1px] mb-1.5">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-2.5 h-2.5 ${i < Math.floor(prod.rating) ? 'fill-neutral-700 text-neutral-700' : 'fill-neutral-200 text-neutral-200'}`} 
                      />
                    ))}
                    <span className="text-[10px] text-neutral-500 ml-1">({prod.reviews})</span>
                  </div>
                  <h5 className="text-[13px] font-medium leading-tight mb-2 flex-grow text-black">
                    {prod.title}
                  </h5>
                  <p className="text-[11px] text-neutral-600 leading-snug mb-3 line-clamp-2 min-h-[32px]">
                    {prod.description}
                  </p>
                  <div className="flex items-center gap-1.5 mb-3">
                    {prod.originalPrice && (
                      <span className="text-xs font-bold text-neutral-400 line-through">
                        ${prod.originalPrice}
                      </span>
                    )}
                    <span className="text-sm font-extrabold text-black">
                      ${prod.price}
                    </span>
                  </div>
                  <button className="w-full border border-black text-black font-extrabold text-[10px] sm:text-xs py-2 rounded-full uppercase tracking-wider hover:bg-black hover:text-white transition-colors">
                    SELECT SIZE
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="flex flex-col h-full">
        {/* Free Shipping Progress */}
        <div className="bg-indigo-50 p-4 text-center text-indigo-900 font-extrabold mx-5 mb-4 rounded border border-indigo-100">
          <p className="text-xs tracking-wider mb-2">
            {progress >= 100 
              ? "🎉 You've unlocked Free Shipping!" 
              : `Add $${(freeShippingThreshold - subtotal).toFixed(2)} more for FREE Shipping ($35+)`}
          </p>
          <div className="w-full h-1.5 bg-indigo-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-indigo-600 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto px-5 space-y-4">
          {cartItems.map((item) => (
            <div key={item.id} className="flex gap-4 py-4 border-b border-neutral-100">
              <img 
                src={item.image} 
                alt={item.title} 
                className="w-20 h-24 object-contain bg-neutral-50 rounded" 
              />
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start gap-2">
                    <h3 className="font-bold text-[13px] text-black leading-snug">
                      {item.title}
                    </h3>
                    <button 
                      onClick={() => onRemoveItem(item.id)}
                      className="text-neutral-400 hover:text-black transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-xs text-neutral-500 font-medium mt-1">
                    ${item.price.toFixed(2)}
                  </p>
                </div>

                <div className="flex justify-between items-center mt-3">
                  <div className="flex items-center border border-black rounded-full overflow-hidden">
                    <button 
                      onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                      className="px-3 py-1.5 hover:bg-neutral-100 text-black font-bold"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-6 text-center text-xs font-black">
                      {item.quantity}
                    </span>
                    <button 
                      onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                      className="px-3 py-1.5 hover:bg-neutral-100 text-black font-bold"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                  
                  <span className="font-black text-sm text-black">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Summary */}
        <div className="p-5 bg-white border-t border-neutral-100 mt-auto">
          <div className="flex justify-between text-[15px] font-extrabold text-black mb-3">
            <span>Estimated Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <p className="text-[11px] text-neutral-500 font-medium text-center mb-4">
            Taxes and shipping calculated at checkout.
          </p>
          <Link 
            to="/checkout" 
            onClick={onClose} 
            className="w-full flex items-center justify-center py-4 bg-black text-white rounded-full font-extrabold text-sm uppercase tracking-wider hover:bg-neutral-800 transition-colors shadow-lg"
          >
            CHECKOUT
          </Link>
        </div>
      </div>
    );
  };

  const renderRewardsTab = () => (
    <div className="flex flex-col h-full overflow-y-auto">
      {/* Purple Banner */}
      <div className="bg-[#5c21c0] text-white px-5 py-4 flex items-center justify-between mx-4 rounded-lg">
        <div className="flex items-center gap-3">
          <div className="text-[20px] font-black leading-none italic tracking-tighter">
            beauty<br/>squad
          </div>
          <span className="text-xs font-medium pl-2 border-l border-white/30">
            Redeem exclusive rewards
          </span>
        </div>
        <button className="text-xs font-bold uppercase tracking-wider border-b border-white hover:text-purple-200">
          JOIN NOW
        </button>
      </div>

      <div className="flex flex-col items-center text-center mt-12 px-6">
        <Diamond className="w-10 h-10 text-black mb-6" strokeWidth={1.5} />
        <h3 className="text-3xl font-extrabold text-black leading-[1.1] mb-5">
          Beauty Squad<br/>Rewards
        </h3>
        <p className="text-neutral-800 text-[14px] leading-relaxed mb-8">
          Everything you earn, all in one place. Sign in to see rewards + free shipping on first order.
        </p>
        <button className="w-full bg-black text-white font-extrabold text-sm py-4 rounded-full uppercase tracking-wider hover:bg-neutral-800 transition-colors mb-8">
          JOIN/SIGN IN
        </button>

        <div className="flex items-center justify-center gap-2 mb-16">
          <span className="text-[13px] text-neutral-600">Also available:</span>
          <span className="text-blue-600 font-extrabold text-[15px] italic tracking-tighter">shop</span>
          <span className="bg-blue-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded uppercase">pay</span>
        </div>

        <p className="text-[10px] text-neutral-500 leading-snug text-left">
          By continuing, you agree to the Beauty Squad Terms and Conditions as well as e.l.f.'s Terms of Use and Privacy Notice, including e.l.f.'s Notice of Financial Incentive.
        </p>
      </div>
    </div>
  );

  const renderOffersTab = () => (
    <div className="flex flex-col h-full overflow-y-auto">
      <div className="mx-4 mb-8 bg-indigo-50/50 border border-indigo-100 border-dashed rounded-lg py-3 text-center">
        <span className="text-indigo-700 font-extrabold text-[13px]">
          Free Shipping on Orders $35+!
        </span>
      </div>

      <div className="px-5 mb-10">
        <h3 className="text-[22px] font-black text-black mb-1">No Gifts Right Now</h3>
        <p className="text-[14px] text-neutral-700">Check back soon for new free gift offers.</p>
      </div>

      <div className="px-5 pb-10">
        <h4 className="text-[20px] font-black text-indigo-900 mb-4">Available offers</h4>
        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4 -mx-5 px-5">
          {/* Offer Card 1 */}
          <div className="min-w-[260px] bg-indigo-50/70 border border-indigo-100 rounded-lg p-5">
            <h5 className="font-black text-indigo-900 text-[15px] mb-3 leading-snug underline underline-offset-2">
              Thank You For Your Service! Get 25% Off Your Purchase
            </h5>
            <p className="text-[13px] text-indigo-900/80 leading-relaxed mb-4">
              To show our appreciation, we're giving an exclusive discount to our fellow Teachers, First Responders, Healthcare Workers, and Military. Your cart will be discounted when your order reaches $30+.
            </p>
            <p className="text-[11px] text-indigo-900/60 leading-snug">
              Disclaimer: Receive 25% off your order of $30 or more when you redeem your coupon code at checkout. This code can only be redeemed once. It cannot be combined with other coupon codes.
            </p>
          </div>

          {/* Offer Card 2 */}
          <div className="min-w-[260px] bg-indigo-50/70 border border-indigo-100 rounded-lg p-5 flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
              <Gift className="w-8 h-8 text-indigo-900" />
            </div>
            <h5 className="font-black text-indigo-900 text-[15px] mb-3 leading-snug underline underline-offset-2">
              20% Off Discount
            </h5>
            <p className="text-[13px] text-indigo-900/80 leading-relaxed mb-4 text-left w-full">
              Simply verify your student status with Student Beans and you'll receive 20% off e.l.f. Cosmetics! *Registered Student Beans users can redeem your 20% discount code. Code valid for 1 year.
            </p>
            <p className="text-[11px] text-indigo-900/60 leading-snug text-left w-full">
              Disclaimer: Receive 20% off your order when you redeem your coupon code at checkout. It cannot be combined with other coupon codes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
          />

          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 250 }}
            className="fixed top-0 right-0 h-full w-full sm:w-[460px] bg-[#f4f2fa] shadow-2xl z-50 flex flex-col font-sans"
          >
            {/* Header */}
            <div className="flex justify-between items-center px-5 pt-5 pb-4">
              <h2 className="text-[22px] font-normal tracking-tight text-black flex items-center">
                Shopping Bag
              </h2>
              <button onClick={onClose} className="p-1 hover:bg-neutral-200 rounded-full transition-colors">
                <X className="w-6 h-6 text-neutral-800 font-light stroke-[1.5]" />
              </button>
            </div>

            {/* Tab Navigation Pill */}
            <div className="mx-4 mb-6 bg-white rounded-full flex shadow-sm border border-neutral-100 p-1 relative z-10">
              <button 
                onClick={() => setActiveTab('bag')}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-colors ${activeTab === 'bag' ? 'bg-black text-white' : 'text-neutral-600 hover:text-black'}`}
              >
                <ShoppingBag className="w-3.5 h-3.5" /> Bag
              </button>
              <button 
                onClick={() => setActiveTab('rewards')}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-colors ${activeTab === 'rewards' ? 'bg-black text-white' : 'text-neutral-600 hover:text-black'}`}
              >
                <Diamond className="w-3.5 h-3.5" /> Rewards
              </button>
              <button 
                onClick={() => setActiveTab('offers')}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-colors ${activeTab === 'offers' ? 'bg-black text-white' : 'text-neutral-600 hover:text-black'}`}
              >
                <Tag className="w-3.5 h-3.5" /> Offers
              </button>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="h-full"
                >
                  {activeTab === 'bag' && renderBagTab()}
                  {activeTab === 'rewards' && renderRewardsTab()}
                  {activeTab === 'offers' && renderOffersTab()}
                </motion.div>
              </AnimatePresence>
            </div>

          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
