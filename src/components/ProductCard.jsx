import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const StarburstBadge = ({ text }) => {
  const words = text ? text.split(' ') : ['NEW', 'DROP'];

  return (
    <div className="absolute top-3 left-3 w-11 h-11 sm:w-12 sm:h-12 z-20 pointer-events-none flex items-center justify-center drop-shadow-md">
      <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full fill-[#3b59d8]">
        {/* 16-point exact starburst badge polygon */}
        <polygon points="50,0 60,7 72,2 79,13 91,12 94,24 100,29 98,41 100,53 94,62 100,74 89,80 88,92 76,93 69,100 58,96 48,100 39,94 27,98 23,86 11,86 11,74 0,69 4,57 0,45 8,37 2,25 14,21 16,9 28,11 36,1" />
      </svg>
      <div className="relative z-10 text-white font-black text-[7.5px] sm:text-[8.5px] leading-[1.05] text-center uppercase tracking-tight">
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
      onAddToCart({
        ...product,
        image: product.image || (product.images && product.images[0]) || '',
        selectedShade
      });
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const cardClasses = `bg-white rounded-none border-2 border-black flex flex-col justify-between h-full group transition-all duration-300 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 relative select-none cursor-pointer overflow-hidden ${className || 'min-w-[270px] w-[270px] sm:min-w-[300px] sm:w-[300px] lg:min-w-[325px] lg:w-[325px] flex-shrink-0'
    }`;

  return (
    <div className={cardClasses}>

      {/* Starburst Badge Top Left */}
      {product.badge && (
        <StarburstBadge text={product.badge} />
      )}

      {/* Top Product Image (Edge to Edge, Square Shape) */}
      <Link to={`/product/${product.id}`} className="block relative z-10 w-full group/img">
        <div className="relative w-full aspect-square flex items-center justify-center bg-white overflow-hidden p-6">
          <img
            src={product.image || (product.images && product.images[0]) || ''}
            alt={product.title}
            loading="lazy"
            className="w-full h-full object-contain object-center group-hover/img:scale-105 transition-transform duration-500 ease-out"
          />
        </div>
      </Link>

      {/* Content Wrapper */}
      <div className="flex flex-col flex-grow p-4 sm:p-5 bg-white relative z-10">

        {/* Main Product Info */}
        <div className="flex flex-col flex-grow">
          {/* Star Rating & Review Count */}
          <div className="flex items-center gap-1.5 mb-1.5">
            <div className="flex text-neutral-800 space-x-[2px]">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${i < Math.floor(product.rating || 5) ? 'fill-neutral-900 text-neutral-900' : 'fill-neutral-200 text-neutral-200'}`}
                />
              ))}
            </div>
            <span className="text-[12px] text-neutral-400 font-medium">
              ({product.reviews || 150})
            </span>
          </div>

          {/* Product Title */}
          <Link to={`/product/${product.id}`} className="block group/title">
            <h3 className="font-black text-[15px] sm:text-[16px] text-black leading-snug mb-1 cursor-pointer line-clamp-1 group-hover/title:underline decoration-1 underline-offset-2">
              {product.title}
            </h3>
          </Link>

          {/* Color Shade Swatches */}
          {product.shades ? (
            <div className="flex items-center gap-1.5 mb-2 min-h-[20px]">
              {product.shades.map((shade, idx) => (
                <button
                  key={idx}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setSelectedShade(shade);
                  }}
                  style={{ backgroundColor: shade }}
                  className={`w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full border border-black/20 transition-transform ${selectedShade === shade ? 'ring-1 ring-offset-1 ring-black scale-110' : 'hover:scale-110'
                    }`}
                  aria-label="Select shade"
                />
              ))}
              {product.extraShades && (
                <span className="text-[12px] font-bold text-neutral-500 ml-0.5">
                  {product.extraShades}
                </span>
              )}
            </div>
          ) : (
            <div className="min-h-[20px] mb-2" />
          )}

          {/* Short Description */}
          <p className="text-[12px] sm:text-[13px] text-neutral-500 leading-snug mb-3.5 line-clamp-2 font-normal min-h-[34px]">
            {product.description}
          </p>
        </div>

        {/* Footer / Button + Price */}
        <div className="pt-2.5 border-t border-transparent mt-auto flex items-center justify-between gap-2">
          <button
            onClick={handleAdd}
            className={`border border-black font-extrabold text-[11px] sm:text-[12px] py-2.5 px-5 rounded-full transition-all duration-300 uppercase tracking-[0.12em] text-center whitespace-nowrap active:scale-95 ${added
              ? 'bg-black text-white'
              : 'bg-white text-black hover:bg-black hover:text-white'
              }`}
          >
            {added ? 'ADDED' : (product.buttonText || "ADD TO BAG")}
          </button>

          <div className="text-right flex items-center gap-1 font-black text-[14px] sm:text-[16px] text-black">
            {product.originalPrice && (
              <span className="text-[12px] font-normal text-neutral-400 line-through">
                ${product.originalPrice}
              </span>
            )}
            <span>${product.price}</span>
          </div>
        </div>

      </div>
    </div>
  );
}
