import React, { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from './ProductCard';

// Skeleton card to show while products are loading
const ProductCardSkeleton = () => (
  <div className="min-w-[270px] w-[270px] sm:min-w-[300px] sm:w-[300px] lg:min-w-[325px] lg:w-[325px] flex-shrink-0 border-2 border-neutral-100 rounded-none overflow-hidden animate-pulse">
    <div className="w-full aspect-square bg-neutral-100" />
    <div className="p-4 space-y-3">
      <div className="h-3 bg-neutral-100 rounded w-2/3" />
      <div className="h-4 bg-neutral-100 rounded w-full" />
      <div className="h-3 bg-neutral-100 rounded w-3/4" />
      <div className="flex items-center justify-between pt-2">
        <div className="h-8 w-28 bg-neutral-100 rounded-full" />
        <div className="h-5 w-12 bg-neutral-100 rounded" />
      </div>
    </div>
  </div>
);

export default function ProductCarousel({ title, subtitle, products, onAddToCart, loading }) {
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
    setIsDragging(true);
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleCaptureClick = (e) => {
    if (isDragging) {
      e.stopPropagation();
      e.preventDefault();
    }
  };

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -360 : 360;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Show skeletons while loading
  const isLoading = loading || (products === undefined);
  // Hide section entirely if not loading and no products
  if (!isLoading && (!products || products.length === 0)) return null;

  return (
    <section className="py-10 px-4 sm:px-8 max-w-[1536px] mx-auto relative group">
      {/* Header with Title & Navigation Arrows */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-black tracking-tight">
            {title}
          </h2>
          {subtitle && (
            <p className="text-neutral-500 text-sm mt-1 font-medium">{subtitle}</p>
          )}
        </div>

        {/* Scroll Control Arrows */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => scroll('left')}
            className="w-10 h-10 rounded-full border border-neutral-300 bg-white hover:bg-black hover:text-white hover:border-black flex items-center justify-center transition-all shadow-sm active:scale-95"
            aria-label="Scroll Left"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="w-10 h-10 rounded-full border border-neutral-300 bg-white hover:bg-black hover:text-white hover:border-black flex items-center justify-center transition-all shadow-sm active:scale-95"
            aria-label="Scroll Right"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Products Carousel Slider */}
      <div
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onClickCapture={handleCaptureClick}
        className={`flex gap-5 sm:gap-6 overflow-x-auto no-scrollbar scroll-smooth pb-4 pt-1 items-stretch ${
          isDown ? 'cursor-grabbing' : 'cursor-grab'
        } select-none`}
      >
        {isLoading
          ? [...Array(5)].map((_, i) => <ProductCardSkeleton key={i} />)
          : products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
              />
            ))}
      </div>
    </section>
  );
}
