import React, { useState } from 'react';
import { Filter, ChevronDown, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const categories = ["Pastel Essentials", "Glitter & Shimmer", "Treatments & Top Coats", "Vegan & Cruelty-Free"];
const colors = ["#e0f2ec", "#fcecf2", "#e6f0fa", "#fdfceb", "#e8dcc4"];

export default function SidebarFilters() {
  const [isOpen, setIsOpen] = useState(true);
  const [priceRange, setPriceRange] = useState(50);

  return (
    <div className="w-full md:w-64 flex-shrink-0">
      <div className="flex items-center justify-between md:hidden mb-4 border-b border-gray-100 pb-4">
        <span className="font-medium">Filter Products</span>
        <button onClick={() => setIsOpen(!isOpen)}>
          <Filter className="w-5 h-5" />
        </button>
      </div>

      <AnimatePresence>
        {(isOpen || window.innerWidth >= 768) && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="space-y-8 overflow-hidden md:overflow-visible"
          >
            {/* Categories */}
            <div>
              <h4 className="font-medium text-sm tracking-widest uppercase mb-4 text-geeks-dark">Categories</h4>
              <ul className="space-y-3">
                {categories.map((cat, idx) => (
                  <li key={idx} className="flex items-center gap-3 group cursor-pointer">
                    <div className="w-4 h-4 border border-gray-300 rounded-sm flex items-center justify-center group-hover:border-geeks-orange transition-colors">
                      {idx === 0 && <Check className="w-3 h-3 text-geeks-orange" />}
                    </div>
                    <span className="text-sm text-geeks-dark/70 group-hover:text-geeks-dark transition-colors">{cat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Colors */}
            <div>
              <h4 className="font-medium text-sm tracking-widest uppercase mb-4 text-geeks-dark">Colors</h4>
              <div className="flex flex-wrap gap-3">
                {colors.map((color, idx) => (
                  <button 
                    key={idx}
                    className="w-6 h-6 rounded-full border border-gray-200 hover:scale-110 transition-transform"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>

            {/* Price */}
            <div>
              <h4 className="font-medium text-sm tracking-widest uppercase mb-4 text-geeks-dark">Price Range</h4>
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="w-full accent-geeks-orange"
              />
              <div className="flex justify-between text-xs text-geeks-dark/60 mt-2">
                <span>$0</span>
                <span>${priceRange}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
