import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function MegaMenu({ isOpen, onClose, menuType = 'whats-hot' }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          transition={{ duration: 0.15 }}
          onMouseEnter={(e) => e.stopPropagation()}
          onMouseLeave={onClose}
          className="absolute top-full left-0 w-full bg-[#0a0a0a] text-white shadow-2xl border-t border-neutral-900 z-50 py-8 px-8 sm:px-12 select-none max-h-[85vh] overflow-y-auto"
        >
          <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row justify-between gap-8">
            
            {/* 1. MAKEUP MENU */}
            {menuType === 'makeup' && (
              <>
                <div className="flex-1 grid grid-cols-2 md:grid-cols-5 gap-6">
                  <div>
                    <h4 className="font-extrabold text-sm text-white mb-3 uppercase tracking-wider">All Makeup</h4>
                    <ul className="space-y-1.5 text-xs font-medium text-neutral-300">
                      <li><Link to="/shop?cat=makeup" className="hover:text-white transition-colors">Shop All Makeup</Link></li>
                      <li><Link to="/shop?cat=makeup" className="hover:text-white transition-colors">Shop All New Makeup</Link></li>
                      <li><Link to="/shop?cat=makeup" className="hover:text-white transition-colors">Makeup Best Sellers</Link></li>
                      <li><Link to="/shop?cat=makeup" className="hover:text-white transition-colors">Mature Skin Makeup</Link></li>
                      <li><Link to="/shop?cat=makeup" className="hover:text-white transition-colors">Soft Glam Collection</Link></li>
                      <li><Link to="/shop?cat=makeup" className="hover:text-white transition-colors">Halo Glow Collection</Link></li>
                      <li><Link to="/shop?cat=makeup" className="hover:text-white transition-colors">Glow Reviver Collection</Link></li>
                      <li><Link to="/shop?cat=makeup" className="hover:text-white transition-colors">Camo Collection</Link></li>
                      <li><Link to="/shop?cat=makeup" className="hover:text-white transition-colors">Power Grip Collection</Link></li>
                      <li><Link to="/shop?cat=makeup" className="hover:text-white transition-colors">Putty Collection</Link></li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-extrabold text-sm text-white mb-3 uppercase tracking-wider">Eyes</h4>
                    <ul className="space-y-1.5 text-xs font-medium text-neutral-300">
                      <li><Link to="/shop?cat=eyes" className="hover:text-white transition-colors">Shop All Eyes</Link></li>
                      <li><Link to="/shop?cat=eyes" className="hover:text-white transition-colors">Eyes Best Sellers</Link></li>
                      <li><Link to="/shop?cat=eyes" className="hover:text-white transition-colors">Eyeshadow</Link></li>
                      <li><Link to="/shop?cat=eyes" className="hover:text-white transition-colors">Eyebrow</Link></li>
                      <li><Link to="/shop?cat=eyes" className="hover:text-white transition-colors">Mascara</Link></li>
                      <li><Link to="/shop?cat=eyes" className="hover:text-white transition-colors">Eyeliner</Link></li>
                      <li><Link to="/shop?cat=eyes" className="hover:text-white transition-colors">Eye Primer</Link></li>
                      <li><Link to="/shop?cat=eyes" className="hover:text-white transition-colors">Find Your Brow Product</Link></li>
                      <li><Link to="/shop?cat=eyes" className="hover:text-white transition-colors">Find Your Mascara</Link></li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-extrabold text-sm text-white mb-3 uppercase tracking-wider">Lips</h4>
                    <ul className="space-y-1.5 text-xs font-medium text-neutral-300">
                      <li><Link to="/shop?cat=lips" className="hover:text-white transition-colors">Shop All Lips</Link></li>
                      <li><Link to="/shop?cat=lips" className="hover:text-white transition-colors">Lip Best Sellers</Link></li>
                      <li><Link to="/shop?cat=lips" className="hover:text-white transition-colors">Lipstick</Link></li>
                      <li><Link to="/shop?cat=lips" className="hover:text-white transition-colors">Lip Gloss & Lip Stain</Link></li>
                      <li><Link to="/shop?cat=lips" className="hover:text-white transition-colors">Lip Oil</Link></li>
                      <li><Link to="/shop?cat=lips" className="hover:text-white transition-colors">Lip Balm & Lip Care</Link></li>
                      <li><Link to="/shop?cat=lips" className="hover:text-white transition-colors">Lip Liner</Link></li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-extrabold text-sm text-white mb-3 uppercase tracking-wider">Face</h4>
                    <ul className="space-y-1.5 text-xs font-medium text-neutral-300">
                      <li><Link to="/shop?cat=face" className="hover:text-white transition-colors">Shop All Face</Link></li>
                      <li><Link to="/shop?cat=face" className="hover:text-white transition-colors">Face Best Sellers</Link></li>
                      <li><Link to="/shop?cat=face" className="hover:text-white transition-colors">Face Primer</Link></li>
                      <li><Link to="/shop?cat=face" className="hover:text-white transition-colors">Foundation</Link></li>
                      <li><Link to="/shop?cat=face" className="hover:text-white transition-colors">Concealer</Link></li>
                      <li><Link to="/shop?cat=face" className="hover:text-white transition-colors">Blush</Link></li>
                      <li><Link to="/shop?cat=face" className="hover:text-white transition-colors">Bronzer</Link></li>
                      <li><Link to="/shop?cat=face" className="hover:text-white transition-colors">Highlighter</Link></li>
                      <li><Link to="/shop?cat=face" className="hover:text-white transition-colors">Finishing & Setting Powder</Link></li>
                      <li><Link to="/shop?cat=face" className="hover:text-white transition-colors">Setting Spray</Link></li>
                      <li><Link to="/shop?cat=face" className="hover:text-white transition-colors">Contour</Link></li>
                      <li><Link to="/shop?cat=face" className="hover:text-white transition-colors">Color Correcting Makeup</Link></li>
                      <li><Link to="/shop?cat=face" className="hover:text-white transition-colors">Face Palettes</Link></li>
                      <li><Link to="/shop?cat=face" className="hover:text-white transition-colors">Find Your Primer</Link></li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-extrabold text-sm text-white mb-3 uppercase tracking-wider">Brushes & Tools</h4>
                    <ul className="space-y-1.5 text-xs font-medium text-neutral-300">
                      <li><Link to="/shop?cat=brushes" className="hover:text-white transition-colors">Shop All Brushes & Tools</Link></li>
                      <li><Link to="/shop?cat=brushes" className="hover:text-white transition-colors">Brushes & Tools Best Sellers</Link></li>
                      <li><Link to="/shop?cat=brushes" className="hover:text-white transition-colors">Face Brushes</Link></li>
                      <li><Link to="/shop?cat=brushes" className="hover:text-white transition-colors">Eye Brushes</Link></li>
                      <li><Link to="/shop?cat=brushes" className="hover:text-white transition-colors">Sponges & Applicators</Link></li>
                      <li><Link to="/shop?cat=brushes" className="hover:text-white transition-colors">Beauty Tools</Link></li>
                      <li><Link to="/shop?cat=brushes" className="hover:text-white transition-colors">Brush Care</Link></li>
                      <li><Link to="/shop?cat=brushes" className="hover:text-white transition-colors">Value Brush & Tool Sets</Link></li>
                      <li><Link to="/shop?cat=brushes" className="hover:text-white transition-colors">Brush Finder</Link></li>
                    </ul>
                  </div>
                </div>
              </>
            )}

            {/* 2. SKINCARE MENU */}
            {menuType === 'skincare' && (
              <>
                <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-8">
                  <div>
                    <h4 className="font-extrabold text-sm text-white mb-4 uppercase tracking-wider">All Skincare</h4>
                    <ul className="space-y-2 text-xs font-medium text-neutral-300">
                      <li><Link to="/shop?cat=skin" className="hover:text-white transition-colors font-bold">Explore e.l.f. SKIN</Link></li>
                      <li><Link to="/shop?cat=skin" className="hover:text-white transition-colors">Shop All Skincare</Link></li>
                      <li><Link to="/shop?cat=skin" className="hover:text-white transition-colors">Shop All New Skincare</Link></li>
                      <li><Link to="/shop?cat=skin" className="hover:text-white transition-colors">Skincare Best Sellers</Link></li>
                      <li><Link to="/shop?cat=skin" className="hover:text-white transition-colors">Thirst Burst Collection</Link></li>
                      <li><Link to="/shop?cat=skin" className="hover:text-white transition-colors">Bright Icon Collection</Link></li>
                      <li><Link to="/shop?cat=skin" className="hover:text-white transition-colors">Holy Hydration! Collection</Link></li>
                      <li><Link to="/shop?cat=skin" className="hover:text-white transition-colors">Suntouchable Collection</Link></li>
                      <li><Link to="/shop?cat=skin" className="hover:text-white transition-colors">Blemish Breakthrough Collection</Link></li>
                      <li><Link to="/shop?cat=skin" className="hover:text-white transition-colors">Youth Boosting Collection</Link></li>
                      <li><Link to="/shop?cat=skin" className="hover:text-white transition-colors">Value Kits & Gifts</Link></li>
                      <li><Link to="/shop?cat=skin" className="hover:text-white transition-colors">Travel Size & Minis</Link></li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-extrabold text-sm text-white mb-4 uppercase tracking-wider">By Category</h4>
                    <ul className="space-y-2 text-xs font-medium text-neutral-300">
                      <li><Link to="/shop?cat=skin" className="hover:text-white transition-colors">Moisturizers</Link></li>
                      <li><Link to="/shop?cat=skin" className="hover:text-white transition-colors">Treatments & Serums</Link></li>
                      <li><Link to="/shop?cat=skin" className="hover:text-white transition-colors">SPF-Sun Protection</Link></li>
                      <li><Link to="/shop?cat=skin" className="hover:text-white transition-colors">Cleansers</Link></li>
                      <li><Link to="/shop?cat=skin" className="hover:text-white transition-colors">Makeup Remover</Link></li>
                      <li><Link to="/shop?cat=skin" className="hover:text-white transition-colors">Eye Care</Link></li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-extrabold text-sm text-white mb-4 uppercase tracking-wider">Solutions For</h4>
                    <ul className="space-y-2 text-xs font-medium text-neutral-300">
                      <li><Link to="/shop?cat=skin" className="hover:text-white transition-colors">Dry Skin</Link></li>
                      <li><Link to="/shop?cat=skin" className="hover:text-white transition-colors">Sun Protection</Link></li>
                      <li><Link to="/shop?cat=skin" className="hover:text-white transition-colors">Dull & Uneven Skin Tones</Link></li>
                      <li><Link to="/shop?cat=skin" className="hover:text-white transition-colors">Blemish & Oily Prone Skin</Link></li>
                      <li><Link to="/shop?cat=skin" className="hover:text-white transition-colors">Sensitive Skin</Link></li>
                      <li><Link to="/shop?cat=skin" className="hover:text-white transition-colors">Men's Skincare Collection</Link></li>
                      <li><Link to="/shop?cat=skin" className="hover:text-white transition-colors">Mature Skin Skincare</Link></li>
                      <li><Link to="/shop?cat=skin" className="hover:text-white transition-colors">Nighttime Skincare</Link></li>
                      <li><Link to="/shop?cat=skin" className="hover:text-white transition-colors">Find My Skin Routine</Link></li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-extrabold text-sm text-white mb-4 uppercase tracking-wider">Key Ingredients</h4>
                    <ul className="space-y-2 text-xs font-medium text-neutral-300">
                      <li><Link to="/shop?cat=skin" className="hover:text-white transition-colors">Hyaluronic Acid</Link></li>
                      <li><Link to="/shop?cat=skin" className="hover:text-white transition-colors">Vitamin C</Link></li>
                      <li><Link to="/shop?cat=skin" className="hover:text-white transition-colors">Vitamin E</Link></li>
                      <li><Link to="/shop?cat=skin" className="hover:text-white transition-colors">Niacinamide</Link></li>
                      <li><Link to="/shop?cat=skin" className="hover:text-white transition-colors">Hibiscus Extract</Link></li>
                      <li><Link to="/shop?cat=skin" className="hover:text-white transition-colors">Peptides</Link></li>
                      <li><Link to="/shop?cat=skin" className="hover:text-white transition-colors">Salicylic Acid</Link></li>
                      <li><Link to="/shop?cat=skin" className="hover:text-white transition-colors">Fragrance Free</Link></li>
                      <li><Link to="/shop?cat=skin" className="hover:text-white transition-colors">Retinoid</Link></li>
                    </ul>
                  </div>
                </div>

                <div className="w-full lg:w-[280px] shrink-0 flex flex-col gap-3">
                  <div className="relative w-full h-[180px] rounded-xl overflow-hidden bg-emerald-500 p-1 border border-white/10 shadow-lg group">
                    <img 
                      src="https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=800" 
                      alt="Discover e.l.f. SKIN"
                      className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <Link 
                    to="/shop?cat=skin" 
                    className="w-full bg-white hover:bg-neutral-100 text-black font-extrabold text-[11px] py-3 px-4 rounded-full uppercase tracking-wider text-center shadow-md transition-all active:scale-95 block"
                  >
                    DISCOVER E.L.F. SKIN
                  </Link>
                </div>
              </>
            )}

            {/* 3. DISCOVER MENU */}
            {menuType === 'discover' && (
              <>
                <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-8">
                  <div>
                    <h4 className="font-extrabold text-sm text-white mb-4 uppercase tracking-wider">Discover</h4>
                    <ul className="space-y-2 text-xs font-medium text-neutral-300">
                      <li><Link to="/shop" className="hover:text-white transition-colors">the e.l.f. word</Link></li>
                      <li><Link to="/shop" className="hover:text-white transition-colors">S.e.l.f.ie! Gallery</Link></li>
                      <li><Link to="/shop" className="hover:text-white transition-colors">Subscribe & Save</Link></li>
                      <li><Link to="/shop" className="hover:text-white transition-colors">Receipt Scan</Link></li>
                      <li><Link to="/shop" className="hover:text-white transition-colors">Shipping</Link></li>
                      <li><Link to="/shop" className="hover:text-white transition-colors">E-Gift Cards</Link></li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-extrabold text-sm text-white mb-4 uppercase tracking-wider">e.l.f. cares</h4>
                    <ul className="space-y-2 text-xs font-medium text-neutral-300">
                      <li><Link to="/shop" className="hover:text-white transition-colors">e.l.f. Cares</Link></li>
                      <li><Link to="/shop" className="hover:text-white transition-colors">Sustainability</Link></li>
                      <li><Link to="/shop" className="hover:text-white transition-colors">Cruelty Free</Link></li>
                      <li><Link to="/shop" className="hover:text-white transition-colors">e.l.f. Clean</Link></li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-extrabold text-sm text-white mb-4 uppercase tracking-wider">Spring & Summer Color Analysis</h4>
                    <ul className="space-y-2 text-xs font-medium text-neutral-300">
                      <li><Link to="/shop" className="hover:text-white transition-colors">Clear Spring Makeup</Link></li>
                      <li><Link to="/shop" className="hover:text-white transition-colors">Light Spring Makeup</Link></li>
                      <li><Link to="/shop" className="hover:text-white transition-colors">True Spring Makeup</Link></li>
                      <li><Link to="/shop" className="hover:text-white transition-colors">Soft Summer Makeup</Link></li>
                      <li><Link to="/shop" className="hover:text-white transition-colors">Light Summer Makeup</Link></li>
                      <li><Link to="/shop" className="hover:text-white transition-colors">True Summer Makeup</Link></li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-extrabold text-sm text-white mb-4 uppercase tracking-wider">Autumn & Winter Color Analysis</h4>
                    <ul className="space-y-2 text-xs font-medium text-neutral-300">
                      <li><Link to="/shop" className="hover:text-white transition-colors">Soft Autumn Makeup</Link></li>
                      <li><Link to="/shop" className="hover:text-white transition-colors">True Autumn Makeup</Link></li>
                      <li><Link to="/shop" className="hover:text-white transition-colors">Deep Autumn Makeup</Link></li>
                      <li><Link to="/shop" className="hover:text-white transition-colors">Clear Winter Makeup</Link></li>
                      <li><Link to="/shop" className="hover:text-white transition-colors">True Winter Makeup</Link></li>
                      <li><Link to="/shop" className="hover:text-white transition-colors">Deep Winter Makeup</Link></li>
                    </ul>
                  </div>
                </div>

                <div className="w-full lg:w-[280px] shrink-0 flex flex-col gap-3">
                  <div className="relative w-full h-[180px] rounded-xl overflow-hidden bg-rose-400 p-1 border border-white/10 shadow-lg group">
                    <img 
                      src="https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&q=80&w=800" 
                      alt="Explore Beauty Blog"
                      className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <Link 
                    to="/shop" 
                    className="w-full bg-white hover:bg-neutral-100 text-black font-extrabold text-[11px] py-3 px-4 rounded-full uppercase tracking-wider text-center shadow-md transition-all active:scale-95 block"
                  >
                    EXPLORE E.L.F.'S BEAUTY BLOG
                  </Link>
                </div>
              </>
            )}

            {/* 4. HAIR MENU */}
            {menuType === 'hair' && (
              <>
                <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-8">
                  <div>
                    <h4 className="font-extrabold text-sm text-white mb-4 uppercase tracking-wider">All Hair</h4>
                    <ul className="space-y-2 text-xs font-medium text-neutral-300">
                      <li><Link to="/shop?cat=hair" className="hover:text-white transition-colors font-bold">Explore e.l.f. Hair</Link></li>
                      <li><Link to="/shop?cat=hair" className="hover:text-white transition-colors">Shop All Hair</Link></li>
                      <li><Link to="/shop?cat=hair" className="hover:text-white transition-colors">e.l.f. Hair Sets</Link></li>
                      <li><Link to="/shop?cat=hair" className="hover:text-white transition-colors">Shampoo</Link></li>
                      <li><Link to="/shop?cat=hair" className="hover:text-white transition-colors">Conditioner</Link></li>
                      <li><Link to="/shop?cat=hair" className="hover:text-white transition-colors">Styling</Link></li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-extrabold text-sm text-white mb-4 uppercase tracking-wider">Shop By Benefit</h4>
                    <ul className="space-y-2 text-xs font-medium text-neutral-300">
                      <li><Link to="/shop?cat=hair" className="hover:text-white transition-colors">Moisture</Link></li>
                      <li><Link to="/shop?cat=hair" className="hover:text-white transition-colors">Anti-Frizz</Link></li>
                      <li><Link to="/shop?cat=hair" className="hover:text-white transition-colors">Shine</Link></li>
                      <li><Link to="/shop?cat=hair" className="hover:text-white transition-colors">Flexible Hold</Link></li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-extrabold text-sm text-white mb-4 uppercase tracking-wider">Discover</h4>
                    <ul className="space-y-2 text-xs font-medium text-neutral-300">
                      <li><Link to="/shop?cat=hair" className="hover:text-white transition-colors">Hair Blog</Link></li>
                    </ul>
                  </div>
                </div>

                <div className="w-full lg:w-[280px] shrink-0 flex flex-col gap-3">
                  <div className="relative w-full h-[180px] rounded-xl overflow-hidden bg-blue-500 p-1 border border-white/10 shadow-lg group">
                    <img 
                      src="https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&q=80&w=800" 
                      alt="Explore e.l.f. Hair Promo"
                      className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <Link 
                    to="/shop?cat=hair" 
                    className="w-full bg-white hover:bg-neutral-100 text-black font-extrabold text-[11px] py-3 px-4 rounded-full uppercase tracking-wider text-center shadow-md transition-all active:scale-95 block"
                  >
                    EXPLORE E.L.F. HAIR
                  </Link>
                </div>
              </>
            )}

            {/* 5. WHAT'S HOT MENU */}
            {menuType === 'whats-hot' && (
              <>
                <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-8">
                  <div>
                    <h4 className="font-extrabold text-sm text-white mb-4 uppercase tracking-wider">New</h4>
                    <ul className="space-y-2 text-xs font-medium text-neutral-300">
                      <li><Link to="/shop" className="hover:text-white transition-colors">Shop All New</Link></li>
                      <li><Link to="/shop?cat=makeup" className="hover:text-white transition-colors">Shop All New Makeup</Link></li>
                      <li><Link to="/shop?cat=skincare" className="hover:text-white transition-colors">Shop All New Skincare</Link></li>
                      <li><Link to="/shop?cat=hair" className="hover:text-white transition-colors">Shop All New Hair</Link></li>
                      <li><Link to="/product/1" className="hover:text-white transition-colors text-neutral-400">Suntouchable Invisi-Stick SPF 50 Glitz</Link></li>
                      <li><Link to="/product/13" className="hover:text-white transition-colors text-neutral-400">So Blurreal Lip & Cheek Whip</Link></li>
                      <li><Link to="/product/13" className="hover:text-white transition-colors text-neutral-400">Main Stain Lip Marker</Link></li>
                      <li><Link to="/product/11" className="hover:text-white transition-colors text-neutral-400">Soft Glam Cream Blush</Link></li>
                      <li><Link to="/product/8" className="hover:text-white transition-colors text-neutral-400">Soft Glam Cream Bronzer</Link></li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-extrabold text-sm text-white mb-4 uppercase tracking-wider">Best Sellers</h4>
                    <ul className="space-y-2 text-xs font-medium text-neutral-300">
                      <li><Link to="/shop" className="hover:text-white transition-colors">All Best Sellers</Link></li>
                      <li><Link to="/shop?cat=makeup" className="hover:text-white transition-colors">Makeup Best Sellers</Link></li>
                      <li><Link to="/shop?cat=skincare" className="hover:text-white transition-colors">e.l.f. SKIN Best Sellers</Link></li>
                      <li><Link to="/shop?cat=eyes" className="hover:text-white transition-colors font-bold">Eyes Best Sellers</Link></li>
                      <li><Link to="/shop?cat=lips" className="hover:text-white transition-colors">Lip Best Sellers</Link></li>
                      <li><Link to="/shop?cat=makeup" className="hover:text-white transition-colors">Face Best Sellers</Link></li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-extrabold text-sm text-white mb-4 uppercase tracking-wider">Trending</h4>
                    <ul className="space-y-2 text-xs font-medium text-neutral-300">
                      <li><Link to="/shop" className="hover:text-white transition-colors">Back to School Essentials</Link></li>
                      <li><Link to="/shop?cat=hair" className="hover:text-white transition-colors">e.l.f. Hair</Link></li>
                      <li><Link to="/shop" className="hover:text-white transition-colors">Award Winning Beauty</Link></li>
                      <li><Link to="/shop?cat=skincare" className="hover:text-white transition-colors">Explore e.l.f. SKIN</Link></li>
                      <li><Link to="/shop" className="hover:text-white transition-colors">Trending on TikTok</Link></li>
                      <li><Link to="/shop" className="hover:text-white transition-colors">#SkinTok</Link></li>
                      <li><Link to="/shop" className="hover:text-white transition-colors">Wedding Essentials</Link></li>
                      <li><Link to="/shop?cat=skincare" className="hover:text-white transition-colors">Double Cleansing</Link></li>
                      <li><Link to="/shop?cat=makeup" className="hover:text-white transition-colors">Color Analysis Makeup</Link></li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-extrabold text-sm text-white mb-4 uppercase tracking-wider">Shop By Value</h4>
                    <ul className="space-y-2 text-xs font-medium text-neutral-300">
                      <li><Link to="/shop" className="hover:text-white transition-colors">Shop All Under $20</Link></li>
                      <li><Link to="/shop" className="hover:text-white transition-colors">Under $15</Link></li>
                      <li><Link to="/shop" className="hover:text-white transition-colors">Under $10</Link></li>
                      <li><Link to="/shop" className="hover:text-white transition-colors">Under $8</Link></li>
                      <li><Link to="/shop" className="hover:text-white transition-colors">Today's Offers</Link></li>
                      <li><Link to="/shop" className="hover:text-white transition-colors">Travel Size & Minis</Link></li>
                      <li><Link to="/shop" className="hover:text-white transition-colors">Value Kits & Gifts</Link></li>
                    </ul>
                  </div>
                </div>

                <div className="w-full lg:w-[280px] shrink-0 flex flex-col gap-3">
                  <div className="relative w-full h-[180px] rounded-xl overflow-hidden bg-gradient-to-tr from-pink-400 via-rose-300 to-pink-200 p-1 border border-white/10 shadow-lg group">
                    <img 
                      src="https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&q=80&w=800" 
                      alt="Blush Tint Promo"
                      className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <Link 
                    to="/shop" 
                    className="w-full bg-white hover:bg-neutral-100 text-black font-extrabold text-[11px] py-3 px-4 rounded-full uppercase tracking-wider text-center shadow-md transition-all active:scale-95 block"
                  >
                    SHOP SHEER FOR IT BLUSH TINT
                  </Link>
                </div>
              </>
            )}

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
