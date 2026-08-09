import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

import img1 from '../assets/p1.png';
import img2 from '../assets/p1.png';
import img3 from '../assets/p1.png';
import img4 from '../assets/p1.png';
import img5 from '../assets/p1.png';
import img6 from '../assets/p1.png';

// Dummy products with real images
const products = [
  { id: 1, name: "Minty Fresh", price: 24, badge: "New", color: "#e0f2ec", image: img1 },
  { id: 2, name: "Rose Petal", price: 24, badge: "Best Seller", color: "#fcecf2", image: img2 },
  { id: 3, name: "Cloud Nine", price: 22, badge: "Trending", color: "#e6f0fa", image: img3 },
  { id: 4, name: "Lemon Drop", price: 22, badge: "", color: "#fdfceb", image: img4 },
  { id: 5, name: "Lilac Haze", price: 26, badge: "Low Stock", color: "#e8d8f8", image: img5 },
  { id: 6, name: "Peach Fuzz", price: 24, badge: "", color: "#ffe5d9", image: img6 },
];

function ProductCard({ product }) {
  return (
    <div className="min-w-[280px] sm:min-w-[320px] flex-shrink-0 group">
      {/* Image Container */}
      <div className="relative h-96 bg-white mb-4 overflow-hidden flex items-center justify-center cursor-pointer transition-colors duration-500 hover:bg-gray-100 p-4">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-110" 
        />

        {/* Badges */}
        {product.badge && (
          <span className="absolute top-4 left-4 text-[10px] uppercase tracking-widest font-bold bg-white px-3 py-1 text-geeks-dark">
            {product.badge}
          </span>
        )}

        {/* Quick Actions (Hover) */}
        <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-4 group-hover:translate-y-0 flex gap-2">
          <button className="flex-1 bg-white/90 backdrop-blur-sm py-3 text-xs font-medium tracking-wide uppercase hover:bg-pink-700 hover:text-white transition-colors">
            Quick Add
          </button>
          <button className="w-12 bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-amare-pink transition-colors">
            <Heart className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Product Details */}
      <div className="flex justify-between items-start">
        <div>
          <h4 className="font-medium text-geeks-dark">{product.name}</h4>
          <p className="text-geeks-dark/60 text-sm mt-1">${product.price.toFixed(2)}</p>
        </div>
        {/* Color Swatch */}
        <div 
          className="w-4 h-4 rounded-full border border-gray-200"
          style={{ backgroundColor: product.color }}
        ></div>
      </div>
    </div>
  );
}

export default function ProductCarousels({ title = "Trending Now" }) {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -340 : 340;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-20 px-6 max-w-7xl mx-auto overflow-hidden">
      <div className="flex items-end justify-between mb-10">
        <h3 className="font-sans text-3xl text-geeks-dark">{title}</h3>
        <div className="flex items-center gap-6">
           <div className="flex gap-2">
             <button onClick={() => scroll('left')} className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-pink-700 hover:text-white transition-colors" aria-label="Scroll left">
               <ChevronLeft className="w-5 h-5" />
             </button>
             <button onClick={() => scroll('right')} className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-pink-700 hover:text-white transition-colors" aria-label="Scroll right">
               <ChevronRight className="w-5 h-5" />
             </button>
           </div>
           <Link to="/shop" className="text-sm font-medium border-b border-geeks-dark pb-1 hidden sm:block hover:opacity-60 cursor-pointer transition-colors">
             Shop All
           </Link>
        </div>
      </div>

      <div 
        ref={scrollRef} 
        className="flex space-x-6 overflow-x-auto pb-8 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] scroll-smooth pr-6"
      >
        {products.map((product) => (
          <div key={product.id} className="snap-start">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
}
