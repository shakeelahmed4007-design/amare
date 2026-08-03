import React, { useState } from 'react';
import { Star, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

const StarburstBadge = ({ text }) => {
  const words = text ? text.split(' ') : ['NEW', 'DROP'];

  return (
    <div className="absolute top-2.5 left-2.5 w-9 h-9 sm:w-10 sm:h-10 z-20 pointer-events-none flex items-center justify-center drop-shadow-sm">
      <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full fill-[#3b59d8]">
        {/* 16-point exact starburst badge polygon */}
        <polygon points="50,0 60,7 72,2 79,13 91,12 94,24 100,29 98,41 100,53 94,62 100,74 89,80 88,92 76,93 69,100 58,96 48,100 39,94 27,98 23,86 11,86 11,74 0,69 4,57 0,45 8,37 2,25 14,21 16,9 28,11 36,1" />
      </svg>
      <div className="relative z-10 text-white font-black text-[6.5px] sm:text-[7.5px] leading-[1.05] text-center uppercase tracking-tight">
        {words[0]}
        {words[1] && <><br />{words[1]}</>}
      </div>
    </div>
  );
};

export default function ProductCard({ product, onAddToCart, className = "" }) {
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

  const cardClasses = `bg-white rounded-2xl border border-neutral-100 p-4 sm:p-5 flex flex-col justify-between h-full group transition-all duration-300 hover:border-neutral-300 hover:shadow-[0_20px_45px_rgba(0,0,0,0.05)] hover:-translate-y-1 relative select-none cursor-pointer ${className || 'min-w-[210px] w-[210px] sm:min-w-[230px] sm:w-[230px] lg:min-w-[245px] lg:w-[245px] flex-shrink-0'
    }`;

  return (
    <div className={cardClasses}>

      {/* Starburst Badge Top Left */}
      {product.badge && (
        <StarburstBadge text={product.badge} />
      )}

      {/* Top Product Image */}
      <Link to={`/product/${product.id}`} className="block relative z-10 w-full mb-3">
        <div className="relative w-full h-[220px] sm:h-[240px] rounded-lg overflow-hidden flex items-center justify-center">
          <img 
            src={product.image} 
            alt={product.title} 
            loading="lazy"
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          />
        </div>
      </Link>

      {/* Main Product Info */}
      <div className="flex flex-col flex-grow relative z-10 bg-white">

        {/* Star Rating & Review Count */}
        <div className="flex items-center gap-1 mb-1">
          <div className="flex text-neutral-800 space-x-[1px]">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3 h-3 ${i < Math.floor(product.rating || 5) ? 'fill-neutral-900 text-neutral-900' : 'fill-neutral-200 text-neutral-200'}`}
              />
            ))}
          </div>
          <span className="text-[11px] text-neutral-400 font-normal">
            ({product.reviews || 150})
          </span>
        </div>

        {/* Product Title */}
        <Link to={`/product/${product.id}`} className="block group/title">
          <h3 className="font-black text-[13px] sm:text-[14px] text-black leading-tight mb-1 cursor-pointer line-clamp-1 group-hover/title:underline decoration-1 underline-offset-2">
            {product.title}
          </h3>
        </Link>

        {/* Color Shade Swatches */}
        {product.shades ? (
          <div className="flex items-center gap-1 mb-1.5 min-h-[18px]">
            {product.shades.map((shade, idx) => (
              <button
                key={idx}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setSelectedShade(shade);
                }}
                style={{ backgroundColor: shade }}
                className={`w-3 h-3 rounded-full border border-black/20 transition-transform ${selectedShade === shade ? 'ring-1 ring-offset-1 ring-black scale-110' : 'hover:scale-110'
                  }`}
                aria-label="Select shade"
              />
            ))}
            {product.extraShades && (
              <span className="text-[11px] font-bold text-neutral-500 ml-0.5">
                {product.extraShades}
              </span>
            )}
          </div>
        ) : (
          <div className="min-h-[18px] mb-1.5" />
        )}

        {/* Short Description */}
        <p className="text-[11px] text-neutral-500 leading-snug mb-3 line-clamp-2 font-normal min-h-[28px]">
          {product.description}
        </p>

      </div>

      {/* Footer / Button + Price */}
      <div className="pt-2 border-t border-transparent mt-auto relative z-10 bg-white flex items-center justify-between gap-2">
        <button
          onClick={handleAdd}
          className={`border border-black font-extrabold text-[10px] sm:text-[11px] py-2 px-4 rounded-full transition-all duration-300 uppercase tracking-[0.12em] text-center whitespace-nowrap active:scale-95 ${added
              ? 'bg-black text-white'
              : 'bg-white text-black hover:bg-black hover:text-white'
            }`}
        >
          {added ? 'ADDED' : (product.buttonText || "ADD TO BAG")}
        </button>

        <div className="text-right flex items-center gap-1 font-black text-[13px] sm:text-[14px] text-black">
          {product.originalPrice && (
            <span className="text-[11px] font-normal text-neutral-400 line-through">
              ${product.originalPrice}
            </span>
          )}
          <span>${product.price}</span>
        </div>
      </div>

    </div>
  );
}
