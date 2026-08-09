import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const announcements = [
  { text: "Free Shipping with all orders $35+! ", linkText: "Shop Now" },
  { text: "New! Shop Pay is now available!", linkText: "" },
  { text: "Get $4 Off! Try Amaré fave Halo Glow Skin Tint SPF 50 for only $14. ", linkText: "Shop Now" }
];

export default function AnnouncementBar() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % announcements.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + announcements.length) % announcements.length);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % announcements.length);
  };

  const current = announcements[currentIndex];

  return (
    <div className="bg-[#3b59d8] text-white py-2 px-4 text-xs font-semibold flex items-center justify-between h-9 select-none z-50">
      <button 
        onClick={prevSlide}
        className="p-1 hover:opacity-80 transition-opacity"
        aria-label="Previous announcement"
      >
        <ChevronLeft className="w-4 h-4 text-white" />
      </button>

      <div className="text-center font-medium text-[13px] tracking-wide flex items-center justify-center gap-1 overflow-hidden">
        <span>{current.text}</span>
        {current.linkText && (
          <a href="#shop" className="underline font-bold hover:text-cyan-200 transition-colors">
            {current.linkText}
          </a>
        )}
      </div>

      <button 
        onClick={nextSlide}
        className="p-1 hover:opacity-80 transition-opacity"
        aria-label="Next announcement"
      >
        <ChevronRight className="w-4 h-4 text-white" />
      </button>
    </div>
  );
}
