import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import img1 from '../assets/p1.png';
import img2 from '../assets/p1.png';
import img3 from '../assets/p1.png';
import img4 from '../assets/p1.png';
import img5 from '../assets/p1.png';
import img6 from '../assets/p1.png';
import img7 from '../assets/p1.png';
import img8 from '../assets/8.jpg';
import img9 from '../assets/p1.png';
import img10 from '../assets/p1.png';

const categories = [
  { id: 1, name: "Pastel Essentials", image: img1 },
  { id: 2, name: "Glitter & Shimmer", image: img2 },
  { id: 3, name: "Treatments & Top Coats", image: img3 },
  { id: 4, name: "Vegan & Cruelty-Free", image: img4 },
  { id: 5, name: "The Nude Edit", image: img5 },
  { id: 6, name: "Summer Vibes", image: img6 },
  { id: 7, name: "Winter Wonders", image: img7 },
  { id: 8, name: "Neon Nights", image: img8 },
  { id: 9, name: "Matte Magic", image: img9 },
  { id: 10, name: "Bridal Collection", image: img10 },
];

export default function CategorySlider() {
  const scrollRef = useRef(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -320, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 320, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto overflow-hidden relative">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 space-y-4 md:space-y-0">
        <div>
          <h3 className="font-sans text-3xl md:text-4xl text-geeks-dark mb-2">Shop by Category</h3>
          <Link to="/shop" className="text-sm font-medium tracking-wide border-b border-geeks-dark pb-1 hover:opacity-60 transition-colors inline-block">
            View All Collections
          </Link>
        </div>
        
        {/* Unique Arrows */}
        <div className="flex space-x-3 hidden md:flex">
          <button 
            onClick={scrollLeft} 
            className="w-12 h-12 rounded-full border border-geeks-dark/20 flex items-center justify-center text-geeks-dark hover:bg-pink-700 hover:text-white hover:scale-105 transition-all duration-300 shadow-sm"
          >
            <ChevronLeft strokeWidth={1.5} size={24} />
          </button>
          <button 
            onClick={scrollRight} 
            className="w-12 h-12 rounded-full border border-geeks-dark/20 flex items-center justify-center text-geeks-dark hover:bg-pink-700 hover:text-white hover:scale-105 transition-all duration-300 shadow-sm"
          >
            <ChevronRight strokeWidth={1.5} size={24} />
          </button>
        </div>
      </div>

      {/* Horizontal Slider */}
      <div className="relative group">
        <div 
          ref={scrollRef} 
          className="flex space-x-6 overflow-x-auto scroll-smooth pb-8 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {categories.map((cat) => (
            <div 
              key={cat.id}
              className="min-w-[280px] h-[350px] relative rounded-t-full overflow-hidden group/card flex items-end justify-center pb-8 shadow-sm transition-transform hover:-translate-y-2 isolate snap-start shrink-0 cursor-pointer"
              style={{ WebkitMaskImage: '-webkit-radial-gradient(white, black)' }}
            >
              <img src={cat.image} className="absolute inset-0 w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-500" alt={cat.name} />
              <div className="absolute inset-0 bg-black/10 group-hover/card:bg-black/0 transition-colors duration-500"></div>

              <span className="relative z-10 font-medium tracking-wide text-geeks-dark bg-white/80 px-6 py-2 rounded-full backdrop-blur-md shadow-sm">
                {cat.name}
              </span>
            </div>
          ))}
        </div>
        
        {/* Mobile Arrows (Visible only on small screens) */}
        <div className="flex space-x-4 justify-center mt-6 md:hidden">
          <button 
            onClick={scrollLeft} 
            className="w-10 h-10 rounded-full border border-geeks-dark/20 flex items-center justify-center text-geeks-dark hover:bg-pink-700 hover:text-white transition-all duration-300"
          >
            <ChevronLeft strokeWidth={1.5} size={20} />
          </button>
          <button 
            onClick={scrollRight} 
            className="w-10 h-10 rounded-full border border-geeks-dark/20 flex items-center justify-center text-geeks-dark hover:bg-pink-700 hover:text-white transition-all duration-300"
          >
            <ChevronRight strokeWidth={1.5} size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}
