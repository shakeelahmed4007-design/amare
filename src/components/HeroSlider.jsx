import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import banner1 from '../assets/banner1.jpg';
import banner2 from '../assets/banner2.jpg';
import banner3 from '../assets/banner3.jpg';
import banner4 from '../assets/banner4.jpg';
import banner5 from '../assets/banner5.jpg';

const slides = [
  {
    id: 1,
    tag: "NEW IN SKINCARE",
    title: "lock the glow.\nown the look.",
    subtitle: "Say goodbye to melting makeup. Meet the ultimate luminous, makeup-locking duo that holds your look all day long.",
    buttonText: "Explore The Duo",
    image: banner1,
    tagColor: "text-pink-400"
  },
  {
    id: 2,
    tag: "HAIRCARE REVOLUTION",
    title: "drip. drop.\nshine won't stop.",
    subtitle: "Strengthen, protect, and gloss. Infused with weightless nutrients for a mirror-like shine that shields from heat.",
    buttonText: "Shop Gloss Mode",
    image: banner2,
    tagColor: "text-amber-400",
    disclaimer: "*Compared to untreated hair."
  },
  {
    id: 3,
    tag: "HOLY GRAIL",
    title: "power grip\nyour routine.",
    subtitle: "The award-winning, makeup-locking primer collection designed for ultimate hydration and 16-hour hold.",
    buttonText: "Shop the Collection",
    image: banner3,
    tagColor: "text-cyan-400"
  },
  {
    id: 4,
    tag: "NEW IN SKINCARE",
    title: "lock the glow.\nown the look.",
    subtitle: "Say goodbye to melting makeup. Meet the ultimate luminous, makeup-locking duo that holds your look all day long.",
    buttonText: "Explore The Duo",
    image: banner4,
    tagColor: "text-pink-400"
  },
  {
    id: 5,
    tag: "HAIRCARE REVOLUTION",
    title: "drip. drop.\nshine won't stop.",
    subtitle: "Strengthen, protect, and gloss. Infused with weightless nutrients for a mirror-like shine that shields from heat.",
    buttonText: "Shop Gloss Mode",
    image: banner5,
    tagColor: "text-amber-400",
    disclaimer: "*Compared to untreated hair."
  }
];

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <div className="w-full relative h-[85vh] sm:h-[95vh] min-h-[700px] max-h-[950px] overflow-hidden bg-neutral-900 group">
      {/* Slides Container */}
      <div className="relative w-full h-full">
        {slides.map((slide, idx) => {
          const isActive = currentSlide === idx;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${isActive ? 'opacity-100 z-10 pointer-events-auto' : 'opacity-0 z-0 pointer-events-none'
                }`}
            >
              {/* Immersive Ken Burns Background Image */}
              <div
                className={`absolute inset-0 bg-cover bg-center transition-transform duration-[6000ms] ease-out ${isActive ? 'scale-105' : 'scale-100'
                  }`}
                style={{ backgroundImage: `url(${slide.image})` }}
              />

              {/* Ambient Luxury Dark Overlay (Ensuring clear contrast) */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/45 to-transparent" />

              {/* Content Panel (Floating gracefully) */}
              <div className="relative z-20 w-full h-full max-w-[1440px] mx-auto px-6 sm:px-12 md:px-20 flex flex-col justify-center text-left text-white space-y-6">

                {/* Badge Tag */}
                <div className={`transform transition-all duration-1000 delay-300 ${isActive ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                  <span className={`text-xs font-black tracking-[0.25em] uppercase ${slide.tagColor}`}>
                    {slide.tag}
                  </span>
                </div>

                {/* Main Headline */}
                <h1 className={`text-5xl sm:text-6xl lg:text-[5rem] font-black lowercase tracking-tighter leading-none transform transition-all duration-1000 delay-400 ${isActive ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                  {slide.title}
                </h1>

                {/* Subtitle description */}
                <p className={`text-sm sm:text-base text-neutral-300 font-medium max-w-xl leading-relaxed transform transition-all duration-1000 delay-500 ${isActive ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                  {slide.subtitle}
                </p>

                {/* Action CTA Button */}
                <div className={`pt-2 transform transition-all duration-1000 delay-600 ${isActive ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                  <button className="bg-white text-black font-extrabold text-xs sm:text-sm uppercase tracking-[0.15em] px-10 py-4 rounded-full shadow-2xl hover:bg-neutral-100 hover:scale-105 active:scale-95 transition-all duration-300">
                    {slide.buttonText}
                  </button>
                </div>

                {/* Meta details & Indicators */}
                <div className={`pt-6 flex items-center space-x-6 transform transition-all duration-1000 delay-700 ${isActive ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                  <span className="text-xs font-black tracking-widest text-white/50">
                    0{idx + 1} / 0{slides.length}
                  </span>

                  {/* Slider Progress Dashes */}
                  <div className="flex items-center space-x-2">
                    {slides.map((_, sIdx) => (
                      <button
                        key={sIdx}
                        onClick={() => setCurrentSlide(sIdx)}
                        className={`h-[3px] rounded-full transition-all duration-500 ${currentSlide === sIdx
                            ? 'w-10 bg-white'
                            : 'w-3 bg-white/30 hover:bg-white/50'
                          }`}
                        aria-label={`Go to slide ${sIdx + 1}`}
                      />
                    ))}
                  </div>

                  {slide.disclaimer && (
                    <span className="text-[10px] text-white/40 tracking-wider font-semibold uppercase">
                      {slide.disclaimer}
                    </span>
                  )}
                </div>

              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation Arrows (Visible on Slider Hover) */}
      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full border border-white/20 bg-white/5 text-white backdrop-blur-md flex items-center justify-center hover:bg-white hover:text-black hover:border-white shadow-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 active:scale-90"
        aria-label="Previous Slide"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full border border-white/20 bg-white/5 text-white backdrop-blur-md flex items-center justify-center hover:bg-white hover:text-black hover:border-white shadow-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 active:scale-90"
        aria-label="Next Slide"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}
