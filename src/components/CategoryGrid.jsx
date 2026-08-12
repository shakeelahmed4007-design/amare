import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../contexts/StoreContext';

// Static category images (local assets) — used as fallback when DB has no image
import faceImg from '../assets/Face1.PNG';
import lipsImg from '../assets/lips1.PNG';
import brushImg from '../assets/12.PNG';
import nailImg from '../assets/nail1.PNG';
import makeupImg from '../assets/cosmatic1.PNG';
import hairImg from '../assets/hair1.PNG';
import skinImg from '../assets/skin1.PNG';
import eyesImg from '../assets/eyes0.PNG';
import setImg from '../assets/set1.PNG';

// Map category slugs to local fallback images
const FALLBACK_IMAGES = {
  face: faceImg,
  lips: lipsImg,
  brushes: brushImg,
  nails: nailImg,
  makeup: makeupImg,
  hair: hairImg,
  skincare: skinImg,
  eyes: eyesImg,
  sets: setImg,
};

export default function CategoryGrid() {
  const { categories } = useStore();
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

  const handleClick = (e) => {
    if (isDragging) e.preventDefault();
  };

  // Use Supabase categories; fall back to hardcoded slugs if DB is empty
  const displayCategories = categories.length > 0
    ? categories.slice(0, 8).map((cat) => ({
        title: cat.name,
        slug: cat.slug,
        image: cat.image_url || FALLBACK_IMAGES[cat.slug] || faceImg,
      }))
    : [
        { title: 'Face', slug: 'face', image: faceImg },
        { title: 'Lips', slug: 'lips', image: lipsImg },
        { title: 'Brushes', slug: 'brushes', image: brushImg },
        { title: 'Nails', slug: 'nails', image: nailImg },
      ];

  if (displayCategories.length === 0) return null;

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
        className={`flex gap-4 sm:gap-6 overflow-x-auto no-scrollbar pb-4 ${
          isDown ? 'cursor-grabbing' : 'cursor-grab'
        } select-none`}
      >
        {displayCategories.map((cat) => (
          <Link
            key={cat.slug}
            to={`/shop?cat=${cat.slug}`}
            onClick={handleClick}
            draggable="false"
            className="group relative rounded-2xl overflow-hidden aspect-[3/4] bg-neutral-100 shadow-md border border-neutral-200 shrink-0 pointer-events-auto w-[calc(50%-0.5rem)] md:w-[calc(25%-1.125rem)]"
          >
            <img
              src={cat.image}
              alt={cat.title}
              draggable="false"
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 pointer-events-none"
            />
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
