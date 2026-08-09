import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';

import img1 from '../assets/1.jpg';
import img2 from '../assets/2.jpg';
import img3 from '../assets/3.jpg';
import img4 from '../assets/4.jpg';
import img5 from '../assets/5.jpg';
import img6 from '../assets/6.jpg';
import img7 from '../assets/7.jpg';
import img8 from '../assets/8.jpg';
import img9 from '../assets/9.jpg';
import img10 from '../assets/10.jpg';
import img11 from '../assets/11.jpg';
import img12 from '../assets/12.jpg';
import img13 from '../assets/13.jpg';

const products = [
  { 
    id: 1, 
    name: "Collagen Glow Up Powder", 
    image: img9, 
    reviews: 7316, 
    newPrice: "Rs.6,500.00", 
    oldPrice: "Rs.7,600.00",
    supply: "1 month supply",
    desc: "UK's #1 natural, high-protein Collagen powder"
  },
  { 
    id: 2, 
    name: "Magnesium Glycinate 3-in-1", 
    image: img11, 
    reviews: 6421, 
    newPrice: "Rs.3,800.00", 
    oldPrice: "Rs.5,400.00",
    supply: "6-12 week supply",
    desc: "Support muscle relaxation and improve sleep."
  },
  { 
    id: 3, 
    name: "Pure Creatine Monohydrate Powder", 
    image: img6, 
    reviews: 677, 
    newPrice: "Rs.3,800.00", 
    oldPrice: "Rs.5,700.00",
    supply: "3 months supply",
    desc: "Enhance mental & physical performance."
  },
  { 
    id: 4, 
    name: "Apple Cider Vinegar+", 
    image: img7, 
    reviews: 634, 
    newPrice: "Rs.3,800.00", 
    oldPrice: "Rs.5,700.00",
    supply: "1 month supply",
    desc: "Curb cravings, support digestion & balance blood sugar."
  },
  { 
    id: 5, 
    name: "Vitamin D3 + K2", 
    image: img8, 
    reviews: 4122, 
    newPrice: "Rs.2,500.00", 
    oldPrice: "Rs.3,500.00",
    supply: "4 months supply",
    desc: "Essential bone and immune support."
  },
  { 
    id: 6, 
    name: "Ashwagandha KSM-66", 
    image: img9, 
    reviews: 8391, 
    newPrice: "Rs.4,200.00", 
    oldPrice: "Rs.6,000.00",
    supply: "2 months supply",
    desc: "Clinically proven stress & anxiety relief."
  },
  { 
    id: 7, 
    name: "Omega 3 Fish Oil", 
    image: img10, 
    reviews: 5204, 
    newPrice: "Rs.3,900.00", 
    oldPrice: "Rs.5,200.00",
    supply: "3 months supply",
    desc: "High strength EPA & DHA for heart health."
  },
  { 
    id: 8, 
    name: "Lion's Mane Mushroom", 
    image: img12, 
    reviews: 3105, 
    newPrice: "Rs.4,500.00", 
    oldPrice: "Rs.6,200.00",
    supply: "2 months supply",
    desc: "Powerful nootropic for focus and memory."
  }
];

export default function ProductBentoGrid({ title = "Award-Winning Supplements", showHeader = true }) {
  return (
    <section className="w-full">
      {showHeader && (
        <div className="text-center mb-10 px-6 max-w-7xl mx-auto mt-16">
          <h3 className="font-sans text-3xl md:text-4xl font-bold text-stone-800 mb-4">{title}</h3>
          <p className="text-stone-500 text-[16px] max-w-lg mx-auto">Join over 4 million customers who love our science-backed supplements.</p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-6 max-w-7xl mx-auto pb-16">
        {products.map((product, i) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="group relative flex flex-col p-6 rounded-[2rem] bg-white border border-rose-50 shadow-[0_4px_20px_rgba(225,29,72,0.02)] hover:shadow-[0_20px_40px_rgba(225,29,72,0.08)] hover:-translate-y-2 transition-all duration-500 overflow-hidden"
          >
            <Link to={`/product/${product.id}`} className="block w-full h-full flex flex-col">
              
              <div className="w-full h-[280px] mb-6 flex justify-center items-center relative">
                <div className="absolute inset-0 bg-rose-50 rounded-2xl transform scale-95 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500 -z-10"></div>
                <img 
                  src={product.image || (product.images && product.images[0]) || ''} 
                  alt={product.name} 
                  className="max-h-full max-w-[85%] object-contain drop-shadow-sm transition-transform duration-700 group-hover:scale-110" 
                />
              </div>
              
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-sans font-bold text-[20px] leading-tight text-stone-800 mb-3 text-center px-2">
                    {product.name}
                  </h4>
                  
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <div className="flex text-rose-300">
                      {[...Array(5)].map((_, idx) => <Star key={idx} className="w-3.5 h-3.5 fill-current" />)}
                    </div>
                    <span className="text-[12px] font-medium text-stone-500">({product.reviews})</span>
                  </div>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <span className="font-black text-rose-500 text-[18px] tracking-tight">{product.newPrice}</span>
                    <span className="text-[14px] text-stone-400 line-through font-medium">{product.oldPrice}</span>
                  </div>

                  <div className="w-full py-3 rounded-xl bg-rose-300 text-stone-800 font-bold text-[14px] text-center transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    View Details
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="flex justify-center pb-24">
        <Link 
          to="/shop" 
          className="group inline-flex items-center justify-center px-10 py-4 bg-rose-400 text-white font-bold text-[15px] rounded-full hover:bg-rose-500 transition-colors shadow-md"
        >
          View all products
          <span className="ml-2 transform transition-transform group-hover:translate-x-1">→</span>
        </Link>
      </div>
    </section>
  );
}
