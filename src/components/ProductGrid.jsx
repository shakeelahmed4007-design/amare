import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const products = [
  { id: 1, name: "Minty Fresh", price: 24, badge: "New", color: "#e0f2ec", hoverImage: "https://images.unsplash.com/photo-1519014816548-bf5fe059e98b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
  { id: 2, name: "Rose Petal", price: 24, badge: "Best Seller", color: "#fcecf2", hoverImage: "https://images.unsplash.com/photo-1519014816548-bf5fe059e98b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
  { id: 3, name: "Cloud Nine", price: 22, badge: "", color: "#e6f0fa", hoverImage: "https://images.unsplash.com/photo-1519014816548-bf5fe059e98b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
  { id: 4, name: "Lemon Drop", price: 22, badge: "", color: "#fdfceb", hoverImage: "https://images.unsplash.com/photo-1519014816548-bf5fe059e98b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
  { id: 5, name: "Lilac Haze", price: 26, badge: "Low Stock", color: "#e8d8f8", hoverImage: "https://images.unsplash.com/photo-1519014816548-bf5fe059e98b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
  { id: 6, name: "Peach Fuzz", price: 24, badge: "", color: "#ffe5d9", hoverImage: "https://images.unsplash.com/photo-1519014816548-bf5fe059e98b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
  { id: 7, name: "Ocean Breeze", price: 24, badge: "", color: "#d1ecf1", hoverImage: "https://images.unsplash.com/photo-1519014816548-bf5fe059e98b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
  { id: 8, name: "Midnight Sky", price: 26, badge: "", color: "#343a40", hoverImage: "https://images.unsplash.com/photo-1519014816548-bf5fe059e98b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
];

export default function ProductGrid() {
  return (
    <div className="flex-1">
      {/* Top Bar */}
      <div className="flex justify-between items-center mb-8 text-sm text-geeks-dark/70">
        <p>Showing 1–8 of 24 results</p>
        <select className="border-none bg-transparent outline-none cursor-pointer">
          <option>Default Sorting</option>
          <option>Price: Low to High</option>
          <option>Price: High to Low</option>
          <option>Newest Arrivals</option>
        </select>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12">
        {products.map((product, i) => (
          <motion.div 
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="group"
          >
            <Link to={`/product/${product.id}`} className="block relative h-[400px] bg-white mb-4 overflow-hidden flex items-center justify-center">
              
              {/* Default Bottle View */}
              <div 
                className="absolute inset-0 flex items-center justify-center transition-opacity duration-500 group-hover:opacity-0"
              >
                <div className="w-20 h-32 rounded-sm shadow-md" style={{ backgroundColor: product.color }}>
                  <div className="w-full h-10 bg-white border-b border-gray-100 rounded-t-sm"></div>
                </div>
              </div>

              {/* Hover Lifestyle View */}
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                style={{ backgroundImage: `url(${product.hoverImage})` }}
              ></div>

              {/* Badges */}
              {product.badge && (
                <span className="absolute top-4 left-4 text-[10px] uppercase tracking-widest font-bold bg-white px-3 py-1 text-geeks-dark z-10">
                  {product.badge}
                </span>
              )}

              {/* Quick Actions */}
              <div onClick={(e) => e.preventDefault()} className="absolute inset-x-0 bottom-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-4 group-hover:translate-y-0 flex gap-2 z-10">
                <button className="flex-1 bg-white/90 backdrop-blur-sm py-3 text-xs font-medium tracking-wide uppercase hover:bg-pink-700 hover:text-white transition-colors">
                  Quick Add
                </button>
                <button className="w-12 bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-amare-pink transition-colors">
                  <Heart className="w-4 h-4" />
                </button>
              </div>
            </Link>

            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-medium text-geeks-dark">{product.name}</h4>
                <p className="text-geeks-dark/60 text-sm mt-1">${product.price.toFixed(2)}</p>
              </div>
              <div className="w-4 h-4 rounded-full border border-gray-200" style={{ backgroundColor: product.color }}></div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Pagination / Load More */}
      <div className="mt-16 text-center">
        <button className="px-8 py-3 border border-pink-600 text-pink-600 hover:bg-pink-600 hover:text-white hover:bg-pink-700 hover:text-white font-medium tracking-wide hover:bg-pink-700 hover:text-white transition-colors">
          Load More
        </button>
      </div>
    </div>
  );
}
