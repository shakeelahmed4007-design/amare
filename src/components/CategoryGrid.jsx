import React, { useRef, useState } from 'react';
import { categories } from '../data/products';
import { Link } from 'react-router-dom';

export default function CategoryGrid() {
  const scrollRef = useRef(null);
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = (e) => {
    setIsDown(true);
    setIsDragging(false);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDown(false);
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDown(false);
  };

  const handleMouseMove = (e) => {
    if (!isDown) return;
    e.preventDefault();
    setIsDragging(true); // User is dragging, prevent link clicks
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Scroll speed multiplier
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleClick = (e) => {
    if (isDragging) {
      e.preventDefault();
    }
  };

  return (
    <section className="py-12 px-4 sm:px-8 max-w-[1440px] mx-auto">
      <h2 className="text-3xl sm:text-5xl font-black text-black tracking-tight mb-8">
        Shop By Category
      </h2>

      <div 
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        className={`flex gap-4 sm:gap-6 overflow-x-auto no-scrollbar pb-4 ${isDown ? 'cursor-grabbing' : 'cursor-grab'} select-none`}
      >
        {categories.map((cat) => (
          <Link 
            key={cat.title} 
            to={`/shop?cat=${cat.title}`}
            onClick={handleClick}
            draggable="false"
            // Exactly matching the original grid widths: 50% on mobile, 25% on desktop
            className="group relative rounded-2xl overflow-hidden aspect-[3/4] bg-neutral-100 shadow-md border border-neutral-200 shrink-0 pointer-events-auto w-[calc(50%-0.5rem)] md:w-[calc(25%-1.125rem)]"
          >
            {/* Image */}
            <img 
              src={cat.image} 
              alt={cat.title} 
              draggable="false"
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 pointer-events-none"
            />
            
            {/* Exactly matching original gradient and text layout */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end justify-center p-6 pointer-events-none">
              <span className="text-white text-2xl sm:text-4xl font-black lowercase tracking-tighter group-hover:scale-110 transition-transform">
                {cat.title}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
