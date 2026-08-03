import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, X } from 'lucide-react';

const shades = [
  { id: 1, name: "Minty Fresh", color: "#e0f2ec" },
  { id: 2, name: "Rose Petal", color: "#fcecf2" },
  { id: 3, name: "Cloud Nine", color: "#e6f0fa" },
  { id: 4, name: "Lemon Drop", color: "#fdfceb" },
  { id: 5, name: "Lilac Haze", color: "#e8d8f8" },
];

const skinTones = ["#f8d5c2", "#e5b89a", "#c68662", "#8c5a3b", "#4a2c1d"];

export default function VirtualTryOn() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeShade, setActiveShade] = useState(shades[0]);
  const [activeSkinTone, setActiveSkinTone] = useState(skinTones[1]);

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="w-full mt-4 py-4 rounded-full bg-pink-600 text-white shadow-md flex items-center justify-center gap-3 hover:bg-pink-700 transition-all tracking-widest uppercase font-bold text-xs shadow-md"
      >
        <div className="p-2 bg-white/20 rounded-full">
          <Camera className="w-5 h-5 text-white" />
        </div>
        Virtual Try-On
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-geeks-dark/80 backdrop-blur-md"
            ></motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative pink-glass rounded-[3rem] w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col md:flex-row shadow-2xl"
            >
              <button 
                onClick={() => setIsOpen(false)}
                className="absolute top-6 right-6 z-10 w-10 h-10 bg-white/50 backdrop-blur-md hover:bg-white rounded-full flex items-center justify-center transition-all border border-white"
              >
                <X className="w-5 h-5 text-geeks-dark" />
              </button>

              {/* Try-On Visualization */}
              <div className="flex-1 bg-white/40 m-4 rounded-[2.5rem] flex items-center justify-center p-8 relative min-h-[300px] border border-white/50 overflow-hidden">
                <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-geeks-orange/30 to-amare-pink/10 rounded-full blur-3xl -z-10"></div>
                {/* Hand Mockup SVG / Graphic */}
                <svg viewBox="0 0 200 300" className="w-64 h-auto drop-shadow-2xl">
                  {/* Base Hand */}
                  <path d="M50 300 V150 C50 120 70 100 90 100 C110 100 130 120 130 150 V300" fill={activeSkinTone} />
                  <path d="M10 200 C10 180 30 160 50 160 V300 H10 Z" fill={activeSkinTone} />
                  <path d="M130 140 C130 110 150 90 170 90 C190 90 210 110 210 140 V300 H130 Z" fill={activeSkinTone} />
                  
                  {/* Nails (Dynamically Colored) */}
                  <path d="M70 105 Q90 95 110 105 V120 Q90 130 70 120 Z" fill={activeShade.color} className="transition-colors duration-300" />
                  <path d="M150 95 Q170 85 190 95 V110 Q170 120 150 110 Z" fill={activeShade.color} className="transition-colors duration-300" />
                  <path d="M30 165 Q40 155 50 165 V175 Q40 185 30 175 Z" fill={activeShade.color} className="transition-colors duration-300" />
                </svg>

                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-white/70 backdrop-blur-md px-6 py-3 rounded-full shadow-lg border border-white text-geeks-dark">
                  <span className="text-xs font-bold tracking-widest uppercase">{activeShade.name}</span>
                </div>
              </div>

              {/* Controls */}
              <div className="w-full md:w-80 p-8 flex flex-col justify-center">
                <h3 className="font-sans text-2xl mb-8 text-geeks-dark">Virtual Try-On</h3>
                
                <div className="mb-8">
                  <h4 className="text-[10px] font-bold tracking-widest uppercase mb-4 text-geeks-dark/60">1. Select Skin Tone</h4>
                  <div className="flex gap-4">
                    {skinTones.map((tone) => (
                      <button
                        key={tone}
                        onClick={() => setActiveSkinTone(tone)}
                        className={`w-10 h-10 rounded-full transition-all duration-300 flex items-center justify-center bg-white/50 backdrop-blur-sm ${activeSkinTone === tone ? 'scale-110 border-[3px] border-amare-pink shadow-amare-pink/40' : 'hover:scale-105 border border-white'}`}
                      >
                        <div className="w-6 h-6 rounded-full shadow-inner" style={{ backgroundColor: tone }} />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-[10px] font-bold tracking-widest uppercase mb-4 text-geeks-dark/60">2. Select Shade</h4>
                  <div className="grid grid-cols-5 gap-4">
                    {shades.map((shade) => (
                      <button
                        key={shade.id}
                        onClick={() => setActiveShade(shade)}
                        className={`w-10 h-10 rounded-full transition-all duration-300 flex items-center justify-center bg-white/50 backdrop-blur-sm ${activeShade.id === shade.id ? 'scale-110 border-[3px] border-amare-pink shadow-amare-pink/40' : 'hover:scale-105 border border-white'}`}
                        title={shade.name}
                      >
                        <div className="w-6 h-6 rounded-full shadow-inner" style={{ backgroundColor: shade.color }} />
                      </button>
                    ))}
                  </div>
                </div>

                <button className="mt-12 w-full py-4 btn-pink text-xs uppercase tracking-widest">
                  Add to Bag - $24.00
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
