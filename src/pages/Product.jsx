import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, ChevronDown, ChevronUp, Minus, Plus, Check, Leaf, Rabbit, HeartHandshake } from 'lucide-react';
import { useStore } from '../contexts/StoreContext';
import ProductCarousel from '../components/ProductCarousel';

import nail1 from '../assets/nail1.PNG';
import nail2 from '../assets/nail2.PNG';
import nail3 from '../assets/nail3.PNG';
import face1 from '../assets/Face1.PNG';
import lips1 from '../assets/lips1.PNG';
import eyes0 from '../assets/eyes0.PNG';
import hair1 from '../assets/hair1.PNG';
import Shampoo from '../assets/Shampoo.PNG';
import skin1 from '../assets/skin1.PNG';
import set1 from '../assets/set1.PNG';
import brush1 from '../assets/p1.png';

const categoryFallbacks = {
  nails: [nail1, nail2, nail3],
  makeup: [face1, lips1, eyes0],
  face: [face1],
  lips: [lips1],
  eyes: [eyes0],
  hair: [hair1, Shampoo],
  skincare: [skin1],
  skin: [skin1],
  sets: [set1],
  'sets & kits': [set1],
  brushes: [brush1]
};

export default function Product({ onAddToCart }) {
  const { id } = useParams();
  const { products, getSubscribedPrice, getTieredPrice } = useStore();

  const targetProduct = products.find(p => String(p.id) === String(id)) || products[0];

  const getFallbackImages = (p) => {
    if (!p) return [];
    const cat = (p.category_slug || p.category || '').toLowerCase();
    const fallbacks = categoryFallbacks[cat] || [];
    return [p.image || p.images?.[0], ...fallbacks].filter(Boolean);
  };

  // Ensure we use category-specific images for the gallery
  const baseImages = targetProduct?.images?.length > 1
    ? targetProduct.images
    : getFallbackImages(targetProduct);

  // Remove duplicates if the main image happens to be one of the fallbacks
  const galleryImages = Array.from(new Set(baseImages.filter(Boolean))).slice(0, 5);

  const [activeImage, setActiveImage] = useState(galleryImages[0]);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(targetProduct?.sizes?.[0] || 'Regular 1.0 oz / 30 ml');
  const [purchaseType, setPurchaseType] = useState('one-time'); // 'one-time' or 'subscribe'

  const [openAccordion, setOpenAccordion] = useState({ details: true, ingredients: false, howToUse: false });

  useEffect(() => {
    const baseImgs = targetProduct?.images?.length > 1
      ? targetProduct.images
      : getFallbackImages(targetProduct);
    const imgs = Array.from(new Set(baseImgs.filter(Boolean))).slice(0, 5);
    setActiveImage(imgs[0]);
    if (targetProduct?.sizes?.length > 0) {
      setSelectedSize(targetProduct.sizes[0]);
    }
    window.scrollTo(0, 0);
  }, [id, targetProduct]);

  const toggleAccordion = (key) => {
    setOpenAccordion(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // Base price
  const basePrice = getTieredPrice(targetProduct, quantity);
  const subscribePrice = getSubscribedPrice({ ...targetProduct, price: basePrice });

  const finalUnitPrice = purchaseType === 'subscribe' ? subscribePrice : basePrice;
  const originalPrice = targetProduct.originalPrice || (basePrice * 1.2).toFixed(2); // Mock original price if missing

  const handleAdd = () => {
    for (let i = 0; i < quantity; i++) {
      onAddToCart({
        ...targetProduct,
        price: finalUnitPrice,
        image: activeImage,
        selectedSize,
        purchaseType
      });
    }
  };

  if (!targetProduct) return <div className="py-20 text-center text-neutral-500 font-bold">Product not found</div>;

  return (
    <div className="bg-white min-h-screen font-sans pb-24">

      {/* Breadcrumb */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-4 text-xs font-semibold text-neutral-500 border-b border-neutral-100">
        <Link to="/" className="hover:text-black">Home</Link> /
        <Link to="/shop" className="hover:text-black mx-1">Shop</Link> /
        <span className="capitalize mx-1">{targetProduct.category_slug || 'Cosmetics'}</span> /
        <span className="font-bold text-black ml-1">{targetProduct.title}</span>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-12 items-start">

          {/* Left Column: Image Gallery (Vertical Thumbnails) */}
          <div className="w-full lg:w-[55%] flex flex-col-reverse sm:flex-row gap-4">
            {/* Vertical Thumbnails (Only show if multiple images exist) */}
            {galleryImages.length > 1 && (
              <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-y-auto no-scrollbar py-1 w-full sm:w-20 sm:h-[600px] flex-shrink-0">
                {galleryImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    className={`w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 bg-neutral-50 ${activeImage === img ? 'border-black ring-2 ring-black/10' : 'border-neutral-200 hover:border-neutral-400'
                      }`}
                  >
                    <img src={img} alt="Thumbnail" className="w-full h-full object-contain p-1" />
                  </button>
                ))}
              </div>
            )}

            {/* Main Image */}
            <div className="flex-1 aspect-square sm:aspect-auto sm:h-[600px] bg-neutral-50 rounded-2xl overflow-hidden relative p-8 group/img">
              {targetProduct.badge && (
                <div className={`absolute top-4 left-4 z-10 text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-widest ${targetProduct.badgeColor || 'bg-black text-white'}`}>
                  {targetProduct.badge}
                </div>
              )}
              <img
                src={activeImage}
                alt={targetProduct.title}
                className="w-full h-full object-contain group-hover/img:scale-105 transition-transform duration-500"
              />
            </div>
          </div>

          {/* Right Column: Product Purchasing Details */}
          <div className="w-full lg:w-[45%] space-y-6">

            {/* Title & Rating */}
            <div>
              <h1 className="text-3xl sm:text-[40px] font-black text-black tracking-tight leading-none mb-3">
                {targetProduct.title}
              </h1>
              <div className="flex items-center gap-2 text-sm font-bold">
                <div className="flex text-black gap-[2px]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-black text-black" />
                  ))}
                </div>
                <span className="text-black ml-1">{targetProduct.rating || 4.7}</span>
                <span className="text-neutral-300">|</span>
                <span className="underline cursor-pointer text-neutral-600 hover:text-black">
                  {targetProduct.reviews || 4242} reviews
                </span>
              </div>
            </div>

            {/* Pricing */}
            <div className="flex items-center gap-3">
              <span className="text-xl font-bold text-neutral-400 line-through decoration-1">
                ${originalPrice}
              </span>
              <span className="text-3xl font-black text-black">
                ${basePrice}
              </span>
            </div>

            {/* Why You'll Love It */}
            {targetProduct.whyYoullLoveIt && targetProduct.whyYoullLoveIt.length > 0 && (
              <div className="bg-neutral-50 border border-neutral-200 p-5 rounded-2xl">
                <h3 className="font-black text-sm uppercase tracking-wider mb-3">Why You'll Love It:</h3>
                <ul className="space-y-2">
                  {targetProduct.whyYoullLoveIt.map((benefit, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm font-medium text-neutral-700">
                      <Check className="w-4 h-4 text-black mt-0.5 flex-shrink-0" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Size Selector */}
            {targetProduct.sizes && targetProduct.sizes.length > 0 && (
              <div className="space-y-3">
                <div className="flex justify-between items-end">
                  <span className="font-bold text-sm">Size: <span className="font-normal text-neutral-600">{selectedSize}</span></span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {targetProduct.sizes.map((size, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 text-sm font-bold rounded-full border-2 transition-all ${selectedSize === size
                          ? 'border-black bg-black text-white'
                          : 'border-neutral-200 bg-white text-black hover:border-black'
                        }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Purchase Box */}
            <div className="border border-neutral-200 rounded-2xl overflow-hidden bg-white">
              {/* One Time Purchase Option */}
              <div
                className={`p-4 border-b border-neutral-200 cursor-pointer transition-colors ${purchaseType === 'one-time' ? 'bg-neutral-50' : 'hover:bg-neutral-50/50'}`}
                onClick={() => setPurchaseType('one-time')}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${purchaseType === 'one-time' ? 'border-black' : 'border-neutral-300'}`}>
                      {purchaseType === 'one-time' && <div className="w-2.5 h-2.5 bg-black rounded-full" />}
                    </div>
                    <span className="font-bold">ONE-TIME PURCHASE</span>
                  </div>
                  <span className="font-bold">${basePrice}</span>
                </div>

                {purchaseType === 'one-time' && (
                  <div className="flex flex-col gap-3 pl-8">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center border-2 border-black rounded-full px-3 py-1.5 bg-white w-28 justify-between">
                        <button onClick={(e) => { e.stopPropagation(); setQuantity(Math.max(1, quantity - 1)); }} className="p-1 hover:opacity-50">
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="font-bold text-sm">{quantity}</span>
                        <button onClick={(e) => { e.stopPropagation(); setQuantity(quantity + 1); }} className="p-1 hover:opacity-50">
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <button onClick={(e) => { e.stopPropagation(); handleAdd(); }} className="flex-1 bg-white border-2 border-black text-black font-extrabold text-xs py-2.5 px-4 rounded-full hover:bg-neutral-50 transition-all uppercase tracking-wider">
                        ADD TO BAG
                      </button>
                    </div>
                    <button onClick={(e) => { e.stopPropagation(); handleAdd(); }} className="w-full bg-[#5a31f4] text-white font-extrabold text-xs py-3.5 px-4 rounded-full hover:bg-[#4a24d4] transition-all uppercase tracking-wider">
                      BUY IT NOW
                    </button>
                    <p className="text-xs text-neutral-500 font-medium mt-1">
                      Estimated Delivery: <span className="text-black font-bold">Aug 12 - Aug 15</span>
                    </p>
                  </div>
                )}
              </div>

              {/* Subscribe Option */}
              <div
                className={`p-4 cursor-pointer transition-colors ${purchaseType === 'subscribe' ? 'bg-neutral-50' : 'hover:bg-neutral-50/50'}`}
                onClick={() => setPurchaseType('subscribe')}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${purchaseType === 'subscribe' ? 'border-black' : 'border-neutral-300'}`}>
                      {purchaseType === 'subscribe' && <div className="w-2.5 h-2.5 bg-black rounded-full" />}
                    </div>
                    <span className="font-bold">SUBSCRIBE & SAVE UP TO 15%</span>
                  </div>
                  <span className="font-bold text-pink-600">${subscribePrice}</span>
                </div>

                {purchaseType === 'subscribe' && (
                  <div className="flex flex-col gap-3 pl-8 mt-4">
                    <p className="text-xs font-medium text-neutral-600 mb-2">
                      Get this item delivered automatically. Skip or cancel anytime.
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center border-2 border-black rounded-full px-3 py-1.5 bg-white w-28 justify-between">
                        <button onClick={(e) => { e.stopPropagation(); setQuantity(Math.max(1, quantity - 1)); }} className="p-1 hover:opacity-50">
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="font-bold text-sm">{quantity}</span>
                        <button onClick={(e) => { e.stopPropagation(); setQuantity(quantity + 1); }} className="p-1 hover:opacity-50">
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <button onClick={(e) => { e.stopPropagation(); handleAdd(); }} className="flex-1 bg-black text-white font-extrabold text-xs py-3 px-4 rounded-full hover:bg-neutral-800 transition-all uppercase tracking-wider">
                        SUBSCRIBE NOW
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Trust Badges */}
            <div className="flex items-center justify-around py-4 border-y border-neutral-200">
              <div className="flex flex-col items-center gap-2 group cursor-default">
                <Leaf className="w-6 h-6 text-neutral-700 group-hover:text-green-600 transition-colors" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">100% Vegan</span>
              </div>
              <div className="flex flex-col items-center gap-2 group cursor-default">
                <Rabbit className="w-6 h-6 text-neutral-700 group-hover:text-pink-500 transition-colors" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">Cruelty-Free</span>
              </div>
              <div className="flex flex-col items-center gap-2 group cursor-default">
                <HeartHandshake className="w-6 h-6 text-neutral-700 group-hover:text-blue-500 transition-colors" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">Fair Trade</span>
              </div>
            </div>

            {/* Accordions */}
            <div className="border-b border-neutral-200">
              {/* Details Accordion */}
              <div className="border-t border-neutral-200">
                <button
                  onClick={() => toggleAccordion('details')}
                  className="w-full flex items-center justify-between py-4 focus:outline-none"
                >
                  <span className="font-bold text-sm uppercase tracking-wider">Details</span>
                  {openAccordion.details ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </button>
                {openAccordion.details && (
                  <div className="pb-4 text-sm text-neutral-600 leading-relaxed font-medium">
                    {targetProduct.details || targetProduct.description || "Great for all skin types. Provides essential benefits for your daily routine."}
                  </div>
                )}
              </div>

              {/* Ingredients Accordion */}
              <div className="border-t border-neutral-200">
                <button
                  onClick={() => toggleAccordion('ingredients')}
                  className="w-full flex items-center justify-between py-4 focus:outline-none"
                >
                  <span className="font-bold text-sm uppercase tracking-wider">Ingredients</span>
                  {openAccordion.ingredients ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </button>
                {openAccordion.ingredients && (
                  <div className="pb-4 text-sm text-neutral-600 leading-relaxed font-medium">
                    <p className="mb-2"><strong>SKU:</strong> {targetProduct.id.toString().padStart(6, '0')}</p>
                    <p>{targetProduct.ingredients || "Water (Aqua), Glycerin, Squalane, Niacinamide, Sodium Hyaluronate."}</p>
                  </div>
                )}
              </div>

              {/* How to Use Accordion */}
              <div className="border-t border-neutral-200">
                <button
                  onClick={() => toggleAccordion('howToUse')}
                  className="w-full flex items-center justify-between py-4 focus:outline-none"
                >
                  <span className="font-bold text-sm uppercase tracking-wider">How to Use</span>
                  {openAccordion.howToUse ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </button>
                {openAccordion.howToUse && (
                  <div className="pb-4 text-sm text-neutral-600 leading-relaxed font-medium">
                    <ul className="list-disc pl-5 space-y-1">
                      {(targetProduct.howToUse ? [targetProduct.howToUse] : [
                        "Apply a small amount to clean skin.",
                        "Gently massage until absorbed.",
                        "Use daily for best results."
                      ]).map((step, idx) => (
                        <li key={idx}>{step}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>

        {/* Pairs Well With Carousel */}
        <div className="mt-16 pt-8 border-t border-neutral-200">
          <ProductCarousel
            title="Pairs Well With"
            products={products.filter(p => p.id !== targetProduct.id).slice(0, 8)}
            onAddToCart={onAddToCart}
          />
        </div>

      </div>
    </div>
  );
}
