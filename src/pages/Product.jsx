import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, ChevronDown, ChevronUp, Minus, Plus, Check } from 'lucide-react';
import { products } from '../data/products';
import ProductCarousel from '../components/ProductCarousel';

import imgA from '../assets/18.jpg';
import imgB from '../assets/19.jpg';
import imgC from '../assets/20.jpg';
import imgD from '../assets/25.jpg';

export default function Product({ onAddToCart }) {
  const { id } = useParams();
  
  // Find target product or default to Suntouchable Invisi-Stick (id: 1)
  const product = products.find(p => p.id === Number(id)) || products[0];

  const galleryImages = [
    product.image,
    imgA,
    imgB,
    imgC,
    imgD
  ];

  const [activeImage, setActiveImage] = useState(galleryImages[0]);
  const [quantity, setQuantity] = useState(1);
  const [openAccordion, setOpenAccordion] = useState({ details: true, ingredients: false, howToUse: false });
  const [showStickyBar, setShowStickyBar] = useState(false);

  useEffect(() => {
    setActiveImage(product.image);
    window.scrollTo(0, 0);
  }, [product]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 450) {
        setShowStickyBar(true);
      } else {
        setShowStickyBar(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleAccordion = (key) => {
    setOpenAccordion(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleAdd = () => {
    for (let i = 0; i < quantity; i++) {
      onAddToCart(product);
    }
  };

  return (
    <div className="bg-white min-h-screen font-sans pb-24">
      
      {/* Breadcrumb */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-4 text-xs font-semibold text-neutral-500 border-b border-neutral-100">
        <Link to="/" className="hover:text-black">Home</Link> / 
        <Link to="/shop?cat=skincare" className="hover:text-black mx-1">All Skincare</Link> / 
        <span className="mx-1">SPF Sun Protection</span> / 
        <span className="font-bold text-black ml-1">{product.title}</span>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start">
          
          {/* Left Column: Image Gallery (Thumbnails below) */}
          <div className="w-full lg:w-1/2 flex flex-col gap-4">
            {/* Main Featured Image Container */}
            <div className="relative w-full aspect-square rounded-2xl overflow-hidden flex items-center justify-center">
              {product.badge && (
                <div className="absolute top-4 left-4 z-10">
                  <span className="bg-blue-600 text-white text-xs font-black tracking-wider uppercase px-3 py-1.5 rounded-full shadow-md">
                    {product.badge}
                  </span>
                </div>
              )}
              <img 
                src={activeImage} 
                alt={product.title} 
                className="w-full h-full object-cover transition-all duration-300"
              />
            </div>

            {/* Horizontal Thumbnails Row */}
            <div className="flex flex-row gap-3 overflow-x-auto no-scrollbar py-1">
              {galleryImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 bg-neutral-50 ${
                    activeImage === img ? 'border-black ring-2 ring-black/10' : 'border-neutral-200 hover:border-neutral-400'
                  }`}
                >
                  <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Product Purchasing Details */}
          <div className="w-full lg:w-1/2 space-y-6">
            
            {/* Tag Pills */}
            <div className="flex items-center gap-2">
              <span className="bg-orange-100 text-orange-800 text-[11px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                Sun Protection
              </span>
              <span className="bg-orange-100 text-orange-800 text-[11px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                No Touch Application
              </span>
            </div>

            {/* Product Title */}
            <h1 className="text-3xl sm:text-5xl font-black text-black tracking-tight leading-none">
              {product.title}
            </h1>

            {/* Star Rating */}
            <div className="flex items-center gap-2 text-xs font-bold">
              <div className="flex text-black">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-black text-black" />
                ))}
              </div>
              <span className="text-black font-extrabold">5.0</span>
              <span className="text-neutral-400">|</span>
              <span className="underline cursor-pointer hover:text-cyan-600">{product.reviews} review</span>
            </div>

            {/* Pricing */}
            <div className="flex items-baseline gap-3">
              {product.originalPrice && (
                <span className="text-2xl font-bold text-neutral-400 line-through">
                  ${product.originalPrice}
                </span>
              )}
              <span className="text-4xl font-black text-black">
                ${product.price}
              </span>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed font-medium">
              {product.description}
            </p>

            {/* Purchase Container Box */}
            <div className="border-2 border-black rounded-2xl p-6 space-y-5 bg-white shadow-sm">
              <div className="space-y-3 border-b border-neutral-200 pb-5">
                {/* One-Time Purchase */}
                <label className="flex items-center justify-between cursor-pointer group">
                  <div className="flex items-center gap-3 font-extrabold text-sm text-black uppercase tracking-wider">
                    <input type="radio" name="purchaseType" defaultChecked className="w-4 h-4 accent-black" />
                    <span className="group-hover:text-neutral-600 transition-colors">ONE-TIME PURCHASE</span>
                  </div>
                  <span className="font-black text-base">${product.price}</span>
                </label>

                {/* Subscribe & Save Box */}
                <label className="flex items-center justify-between cursor-pointer border border-neutral-300 rounded p-4 hover:border-black transition-colors bg-white">
                  <div className="flex items-center gap-3 font-extrabold text-[12px] sm:text-[13px] text-black uppercase tracking-wider">
                    <input type="radio" name="purchaseType" className="w-4 h-4 accent-black" />
                    <span>SUBSCRIBE & SAVE UP TO 15%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-neutral-400 line-through text-xs font-bold">${product.price}</span>
                    <span className="font-black text-base text-black">${(product.price * 0.85).toFixed(2)}</span>
                  </div>
                </label>
              </div>

              {/* Quantity & Add to Bag */}
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <div className="flex items-center border border-neutral-300 rounded-full px-3 py-2 bg-neutral-50 w-full sm:w-auto justify-between">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-1 hover:text-cyan-600 text-black font-bold"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="font-black text-sm px-4">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-1 hover:text-cyan-600 text-black font-bold"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <button 
                  onClick={handleAdd}
                  className="w-full flex-1 bg-black text-white font-extrabold text-xs py-3.5 px-6 rounded-full hover:bg-neutral-800 transition-all uppercase tracking-wider shadow-lg"
                >
                  ADD TO BAG
                </button>
              </div>

              {/* BUY IT NOW Button */}
              <button 
                onClick={handleAdd}
                className="w-full bg-white text-black border-2 border-black font-extrabold text-xs py-3.5 px-6 rounded-full hover:bg-neutral-100 transition-all uppercase tracking-wider"
              >
                BUY IT NOW
              </button>

              {/* Delivery info */}
              <div className="flex items-center justify-center gap-1.5 text-xs text-emerald-700 font-bold pt-2">
                <Check className="w-4 h-4 stroke-[3]" />
                <span>Your order is estimated to arrive by Mon, Jul 27 to 74000 ⌄</span>
              </div>
            </div>

            {/* Benefit Round Icons */}
            <div className="flex items-center justify-around py-6 border-y border-neutral-200">
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center text-xl">
                  🌿
                </div>
                <span className="text-[11px] font-bold text-black">100% Vegan</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center text-xl">
                  🐰
                </div>
                <span className="text-[11px] font-bold text-black">Cruelty-free</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center text-xl">
                  🤝
                </div>
                <span className="text-[11px] font-bold text-black">Fair Trade</span>
              </div>
            </div>

            {/* Why you'll love it section */}
            <div className="bg-neutral-50 rounded-2xl p-6 border border-neutral-200 space-y-3">
              <h3 className="font-extrabold text-lg text-black">Why you'll love it:</h3>
              <ul className="space-y-2 text-xs text-neutral-700 font-medium">
                <li className="flex items-start gap-2">
                  <span className="text-black">•</span>
                  <span>Limited-edition sparkly stick sunscreen for your face and body delivers broad spectrum SPF 50 sun protection with a sparkly finish</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-black">•</span>
                  <span>Applies clear on all skin tones with no white cast (just sparkle!)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-black">•</span>
                  <span>Delivers a smooth, no-tug, touchless application with a non-greasy feel</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-black">•</span>
                  <span>Non-comedogenic (won't clog pores)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-black">•</span>
                  <span>Water-resistant (80 minutes)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-black">•</span>
                  <span>Infused with moisturizing sunflower seed oil and soothing bisabolol</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-black">•</span>
                  <span>Great for on-the-go applications</span>
                </li>
              </ul>
            </div>

            {/* Expandable Accordions */}
            <div className="border-t border-neutral-200 pt-2 space-y-2">
              <div className="border-b border-neutral-200 pb-3">
                <button 
                  onClick={() => toggleAccordion('details')}
                  className="w-full flex items-center justify-between py-2 text-left font-black text-sm text-black uppercase tracking-wider"
                >
                  <span>Details</span>
                  {openAccordion.details ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {openAccordion.details && (
                  <p className="text-xs text-neutral-600 font-medium pt-2 leading-relaxed">
                    Your fave Suntouchable Invisi-Stick SPF 50 now comes in a glitzy finish that's perfect for summer and festival season! This portable sunscreen stick for your face and body delivers broad spectrum SPF 50 sun protection with a smooth formula that glides on completely clear – no white cast here, just iridescent sparkle.
                  </p>
                )}
              </div>

              <div className="border-b border-neutral-200 pb-3">
                <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-widest block py-1">
                  SKU: 57109UP
                </span>
              </div>

              <div className="border-b border-neutral-200 pb-3">
                <button 
                  onClick={() => toggleAccordion('ingredients')}
                  className="w-full flex items-center justify-between py-2 text-left font-black text-sm text-black uppercase tracking-wider"
                >
                  <span>Ingredients</span>
                  {openAccordion.ingredients ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {openAccordion.ingredients && (
                  <p className="text-xs text-neutral-600 font-medium pt-2 leading-relaxed">
                    Active Ingredients: Avobenzone 3.0%, Homosalate 10.0%, Octisalate 5.0%, Octocrylene 10.0%. Inactive Ingredients: Sunflower Seed Oil, Bisabolol, Synthetic Fluorphlogopite, Silica, Fragrance.
                  </p>
                )}
              </div>

              <div className="border-b border-neutral-200 pb-3">
                <button 
                  onClick={() => toggleAccordion('howToUse')}
                  className="w-full flex items-center justify-between py-2 text-left font-black text-sm text-black uppercase tracking-wider"
                >
                  <span>How to Use</span>
                  {openAccordion.howToUse ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {openAccordion.howToUse && (
                  <p className="text-xs text-neutral-600 font-medium pt-2 leading-relaxed">
                    Apply liberally 15 minutes before sun exposure. Reapply after 80 minutes of swimming or sweating, immediately after towel drying, or at least every 2 hours.
                  </p>
                )}
              </div>
            </div>

          </div>
        </div>

        {/* Pairs Well With Carousel */}
        <div className="mt-16 pt-8 border-t border-neutral-200">
          <ProductCarousel 
            title="Pairs Well With" 
            products={products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 8)} 
            onAddToCart={onAddToCart} 
          />
        </div>

      </div>

      {/* Sticky Bottom Purchase Bar (Screenshot 5) */}
      {showStickyBar && (
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-neutral-200 shadow-2xl p-3 animate-in fade-in slide-in-from-bottom-4">
          <div className="max-w-[1440px] mx-auto flex items-center justify-between gap-4">
            
            {/* Product Thumbnail & Title */}
            <div className="flex items-center gap-3">
              <img 
                src={product.image} 
                alt={product.title} 
                className="w-12 h-12 rounded-lg object-cover bg-neutral-100 border border-neutral-200" 
              />
              <div className="hidden sm:block">
                <h4 className="font-extrabold text-xs text-black">{product.title}</h4>
                <div className="flex items-center gap-2 text-xs">
                  {product.originalPrice && <span className="line-through text-neutral-400">${product.originalPrice}</span>}
                  <span className="font-black text-black">${product.price}</span>
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-3">
              <div className="flex items-center border border-neutral-300 rounded-full px-3 py-1.5 bg-neutral-50 text-xs">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="font-bold px-1 text-black">-</button>
                <span className="font-black px-3">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="font-bold px-1 text-black">+</button>
              </div>

              <button 
                onClick={handleAdd}
                className="bg-black text-white font-extrabold text-xs py-3 px-6 rounded-full hover:bg-neutral-800 uppercase tracking-wider shadow-md"
              >
                ADD TO BAG - ${product.price * quantity}
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
