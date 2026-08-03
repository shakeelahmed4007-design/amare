import React, { useState } from 'react';
import { featuredCallouts } from '../data/products';
import { Star, Check, ShoppingBag, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const MiniProductCard = ({ product, onAddToCart }) => {
  const [selectedShade, setSelectedShade] = useState(product.shades ? product.shades[0] : null);
  const [added, setAdded] = useState(false);

  const handleAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onAddToCart) {
      onAddToCart({ ...product, selectedShade });
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="flex gap-3 items-center w-full bg-neutral-50 rounded-xl p-3 border border-neutral-200/80 hover:border-neutral-300 transition-all">
      {/* Mini Image */}
      <Link to={`/product/${product.id}`} className="shrink-0 w-[64px] h-[64px] bg-white rounded-lg p-1 border border-neutral-100 flex items-center justify-center overflow-hidden">
        <img 
          src={product.image} 
          alt={product.title} 
          loading="lazy"
          className="w-full h-full object-cover rounded-md group-hover:scale-105 transition-transform" 
        />
      </Link>

      {/* Mini Details */}
      <div className="flex flex-col flex-grow min-w-0">
        {/* Rating */}
        <div className="flex items-center gap-1 mb-0.5">
          <div className="flex text-amber-400 space-x-[1px]">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={`w-3 h-3 ${i < Math.floor(product.rating || 5) ? 'fill-amber-400 text-amber-400' : 'fill-neutral-200 text-neutral-200'}`} 
              />
            ))}
          </div>
          <span className="text-[10px] font-bold text-neutral-600">({product.reviews})</span>
        </div>

        {/* Title */}
        <Link to={`/product/${product.id}`} className="block">
          <h4 className="font-extrabold text-xs text-black leading-tight truncate hover:text-pink-600 transition-colors">
            {product.title}
          </h4>
        </Link>

        {/* Price & Action Button */}
        <div className="flex items-center justify-between mt-2 gap-2">
          <span className="text-xs font-black text-black">
            ${product.price}
          </span>

          <button 
            onClick={handleAdd}
            className={`font-black text-[10px] py-1.5 px-3 rounded-full uppercase tracking-wider transition-all duration-200 flex items-center gap-1 ${
              added 
                ? 'bg-emerald-600 text-white' 
                : 'bg-black text-white hover:bg-neutral-800'
            }`}
          >
            {added ? (
              <>
                <Check className="w-3 h-3 stroke-[3]" />
                ADDED
              </>
            ) : (
              <>
                <ShoppingBag className="w-3 h-3" />
                ADD TO BAG
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default function FeaturedCallout({ onAddToCart }) {
  const stepImages = [
    "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?auto=format&fit=crop&q=80&w=800"
  ];

  return (
    <section className="py-14 px-4 sm:px-8 max-w-[1440px] mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-50 border border-pink-200 text-pink-700 text-xs font-black uppercase tracking-widest mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Curated Beauty Routine</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-black tracking-tight mb-2">
          Build Your Face Routine
        </h2>
        <p className="text-sm text-neutral-500 font-medium">
          3 simple steps to flawless, long-lasting, glowy skin all day long.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
        {featuredCallouts.map((item, idx) => (
          <div key={idx} className="bg-white rounded-2xl border border-neutral-200 p-4 sm:p-5 flex flex-col justify-between hover:shadow-xl hover:border-neutral-300 transition-all duration-300 group">
            
            {/* Step Image */}
            <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden mb-4 bg-neutral-100">
              <img 
                src={stepImages[idx] || item.product.image} 
                alt={item.heading} 
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3 bg-black text-white text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider shadow-md">
                Step {idx + 1}
              </div>
            </div>

            {/* Content Text */}
            <div className="mb-4 flex-grow">
              <h3 className="text-lg font-black text-black mb-1">
                {item.heading}
              </h3>
              <p className="text-xs text-neutral-500 leading-relaxed font-normal">
                {item.subheading}
              </p>
            </div>

            {/* Mini Product Card Component */}
            <MiniProductCard 
              product={item.product} 
              onAddToCart={onAddToCart} 
            />
            
          </div>
        ))}
      </div>
    </section>
  );
}
