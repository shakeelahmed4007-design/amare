import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';

import img5 from '../assets/p1.png';
import img6 from '../assets/p1.png';
import img7 from '../assets/p1.png';
import img8 from '../assets/8.jpg';
import img1 from '../assets/p1.png';
import img2 from '../assets/p1.png';
import img3 from '../assets/p1.png';
import img4 from '../assets/p1.png';

const bundles = [
  { 
    id: 1, 
    name: "Meno Support Bundle", 
    image: img5, 
    reviews: 550, 
    newPrice: "Rs.9,500.00", 
    oldPrice: "Rs.14,500.00",
    desc: "Support your body's natural transition."
  },
  { 
    id: 2, 
    name: "Glow Up Bundle", 
    image: img6, 
    reviews: 345, 
    newPrice: "Rs.11,400.00", 
    oldPrice: "Rs.12,900.00",
    desc: "Flaunt luscious hair, and embrace vibrant health for less."
  },
  { 
    id: 3, 
    name: "Welcome Bundle", 
    image: img7, 
    reviews: 402, 
    newPrice: "Rs.15,200.00", 
    oldPrice: "Rs.23,200.00",
    desc: "Start your wellness journey with these 7 essentials."
  },
  { 
    id: 4, 
    name: "Sleep Bundle", 
    image: img8, 
    reviews: 364, 
    newPrice: "Rs.7,600.00", 
    oldPrice: "Rs.9,900.00",
    desc: "The ultimate value sleep supplement package."
  },
  { 
    id: 5, 
    name: "Performance Bundle", 
    image: img3, 
    reviews: 821, 
    newPrice: "Rs.12,000.00", 
    oldPrice: "Rs.15,000.00",
    desc: "Maximize your mental and physical daily output."
  },
  { 
    id: 6, 
    name: "Daily Essentials Stack", 
    image: img2, 
    reviews: 1205, 
    newPrice: "Rs.8,500.00", 
    oldPrice: "Rs.11,200.00",
    desc: "Your foundational nutrients for every single day."
  },
  { 
    id: 7, 
    name: "Beauty & Skin Bundle", 
    image: img1, 
    reviews: 943, 
    newPrice: "Rs.14,500.00", 
    oldPrice: "Rs.18,000.00",
    desc: "Radiate confidence with our premium beauty formulas."
  },
  { 
    id: 8, 
    name: "Gut Health Pack", 
    image: img4, 
    reviews: 678, 
    newPrice: "Rs.9,200.00", 
    oldPrice: "Rs.12,500.00",
    desc: "Restore balance and support healthy digestion."
  }
];

export default function BundleGrid() {
  return (
    <section className="w-full bg-[#FDFBF7] pb-20 pt-10">
      <div className="text-center mb-10 px-6 max-w-7xl mx-auto">
        <h3 className="font-sans text-3xl font-bold text-stone-800 mb-3">Save With Bundles</h3>
        <p className="text-stone-500 text-[17px]">Lock in savings when you stock up with our best-selling bundles.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 px-6 max-w-[1400px] mx-auto">
        {bundles.map((bundle, i) => (
          <motion.div
            key={bundle.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="group relative flex flex-col rounded-[2rem] bg-white border border-rose-50 overflow-hidden shadow-[0_4px_20px_rgba(225,29,72,0.02)] hover:shadow-[0_20px_40px_rgba(225,29,72,0.08)] hover:-translate-y-2 transition-all duration-500"
          >
            <Link to={`/product/${bundle.id}`} className="block w-full h-full flex flex-col">
              
              {/* Full width image */}
              <div className="w-full aspect-[1/1] bg-rose-50 flex justify-center items-center overflow-hidden relative">
                <div className="absolute inset-0 bg-white/20 transform scale-95 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500 z-10"></div>
                <img 
                  src={bundle.image} 
                  alt={bundle.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                />
              </div>
              
              {/* Content Box */}
              <div className="p-6 flex flex-col items-center text-center flex-grow">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <span className="font-black text-rose-500 text-[18px]">{bundle.newPrice}</span>
                  <span className="text-[14px] text-stone-400 line-through font-medium">{bundle.oldPrice}</span>
                </div>

                <div className="flex items-center justify-center gap-1.5 mb-3">
                  <div className="flex text-rose-300">
                    {[...Array(5)].map((_, idx) => <Star key={idx} className="w-3.5 h-3.5 fill-current" />)}
                  </div>
                  <span className="text-[12px] font-medium text-stone-500">({bundle.reviews})</span>
                </div>
                
                <h4 className="font-sans font-bold text-[20px] leading-[1.2] text-stone-800 mb-3">
                  {bundle.name}
                </h4>

                <p className="text-[14px] text-stone-500 font-medium leading-snug mb-8 px-2 flex-grow">
                  {bundle.desc}
                </p>

                <button className="w-full py-3.5 bg-rose-300 border border-rose-300 text-stone-800 font-bold text-[14px] rounded-xl hover:bg-rose-400 hover:border-rose-400 transition-colors transform translate-y-2 opacity-90 group-hover:translate-y-0 group-hover:opacity-100">
                  Add to basket
                </button>
              </div>

            </Link>
          </motion.div>
        ))}
      </div>

      {/* Carousel Controls & Button */}
      <div className="flex flex-col items-center mt-12 pb-8">
        <div className="flex items-center gap-3 mb-8">
          <button className="text-stone-300 hover:text-stone-500 transition-colors">
            <svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 1L2 6L7 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <div className="flex gap-2 items-center">
            <div className="w-2 h-2 rounded-full bg-rose-200"></div>
            <div className="w-6 h-2 rounded-full bg-rose-400"></div>
            <div className="w-2 h-2 rounded-full bg-rose-200"></div>
          </div>
          <button className="text-stone-300 hover:text-stone-500 transition-colors">
            <svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 11L6 6L1 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        <Link 
          to="/shop" 
          className="group inline-flex items-center justify-center px-10 py-4 bg-rose-400 text-white font-bold text-[15px] rounded-full hover:bg-rose-500 transition-colors shadow-md"
        >
          View all Bundles
          <span className="ml-2 transform transition-transform group-hover:translate-x-1">→</span>
        </Link>
      </div>
    </section>
  );
}
