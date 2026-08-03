import React, { useState, useEffect } from 'react';

const slides = [
  {
    id: 1,
    tag: "new!",
    tagClass: "text-white font-black text-sm uppercase tracking-wider",
    title: "lock the e.l.f. in.",
    titleColor: "text-white",
    subtitle: "The new definition of setting goals: this luminous, makeup-locking duo.",
    subtitleColor: "text-white/90",
    buttonText: "DOUBLE SET IT",
    buttonBg: "bg-white text-black hover:bg-neutral-100",
    bgColor: "bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300",
    imageCaption: "Halimotu wears Set It in Bright Deep/Rich",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=1200"
  },
  {
    id: 2,
    tag: "new! Gloss Mode Treatment Oil",
    tagClass: "bg-white/90 text-amber-700 font-extrabold text-xs px-3.5 py-1 rounded-full shadow-xs",
    title: "drip. drop.\nshine won't stop.",
    titleColor: "text-amber-500",
    subtitle: "Glossy styling oil strengthens hair* and helps protect it from heat. Only $10.",
    subtitleColor: "text-amber-800",
    buttonText: "SHOP NOW",
    buttonBg: "bg-white text-black hover:bg-neutral-100",
    bgColor: "bg-[#fff9b3]",
    disclaimer: "*Versus control.",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=1200"
  },
  {
    id: 3,
    tag: "NEW DROP",
    tagClass: "bg-black text-white font-extrabold text-xs px-3.5 py-1 rounded-full",
    title: "power grip\ncollection",
    titleColor: "text-black",
    subtitle: "The iconic, makeup-locking lineup has something for every sticky stan.",
    subtitleColor: "text-black/90",
    buttonText: "SHOP NOW",
    buttonBg: "bg-black text-white hover:bg-neutral-800",
    bgColor: "bg-[#00cbf6]",
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=1200"
  }
];

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const active = slides[currentSlide];

  return (
    <div className={`w-full overflow-hidden transition-colors duration-700 ${active.bgColor}`}>
      {/* Taller container to prevent images from being squeezed/cut off */}
      <div className="w-full max-w-[1440px] mx-auto flex flex-col md:flex-row items-stretch min-h-[500px] md:min-h-[560px]">
        
        {/* Left Side Content Container (Vertically centered gracefully) */}
        <div className="w-full md:w-1/2 flex flex-col justify-center px-8 sm:px-14 md:px-20 py-12 md:py-16 relative z-10 space-y-4">
          
          {/* Tag / Badge */}
          {active.tag && (
            <div>
              <span className={active.tagClass}>
                {active.tag}
              </span>
            </div>
          )}

          {/* Headline */}
          <h1 className={`text-4xl sm:text-5xl lg:text-[4rem] font-black lowercase tracking-tighter leading-[1.05] whitespace-pre-line ${active.titleColor}`}>
            {active.title}
          </h1>

          {/* Subtitle */}
          <p className={`text-sm md:text-base font-semibold max-w-md leading-relaxed ${active.subtitleColor}`}>
            {active.subtitle}
          </p>

          {/* CTA Button */}
          <div className="pt-2">
            <button className={`font-black text-xs md:text-sm px-8 py-3.5 rounded-full uppercase tracking-wider shadow-sm transition-transform hover:scale-105 ${active.buttonBg}`}>
              {active.buttonText}
            </button>
          </div>

          {/* Indicator Dots & Disclaimer */}
          <div className="pt-6 flex items-center space-x-4">
            <div className="flex items-center space-x-2.5">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`transition-all duration-300 ${
                    currentSlide === idx 
                      ? 'w-8 h-2 rounded-full bg-black' 
                      : 'w-2 h-2 rounded-full bg-black/40 hover:bg-black'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
            {active.disclaimer && (
              <span className="text-[11px] text-amber-900 font-bold">
                {active.disclaimer}
              </span>
            )}
          </div>

        </div>

        {/* Right Side Image (Full height, proper cover without max-h constraints) */}
        <div className="w-full md:w-1/2 relative min-h-[350px] md:min-h-full">
          <img 
            src={active.image} 
            alt={active.title} 
            fetchpriority="high"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          {active.imageCaption && (
            <div className="absolute bottom-6 right-6 bg-black/60 backdrop-blur-md text-white text-xs font-bold px-4 py-2 rounded-lg shadow-lg">
              {active.imageCaption}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
