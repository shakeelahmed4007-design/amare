import React, { useState } from 'react';
import { motion } from 'framer-motion';

import img1 from '../assets/1.jpg';
import img2 from '../assets/2.jpg';
import img3 from '../assets/3.jpg';
import img4 from '../assets/4.jpg';

const images = [img1, img2, img3, img4];

export default function ImageGallery() {
  const [activeImg, setActiveImg] = useState(0);

  return (
    <div className="flex flex-col-reverse md:flex-row gap-4 h-[600px]">
      {/* Thumbnails */}
      <div className="flex md:flex-col gap-4 overflow-x-auto md:overflow-y-auto w-full md:w-24 flex-shrink-0 hide-scrollbar">
        {images.map((img, idx) => (
          <button 
            key={idx} 
            onClick={() => setActiveImg(idx)}
            className={`w-20 md:w-full aspect-[4/5] flex-shrink-0 bg-white border-2 transition-all ${activeImg === idx ? 'border-geeks-dark' : 'border-transparent opacity-60 hover:opacity-100'} p-2 flex items-center justify-center`}
          >
            <img src={img} alt="Thumbnail" className="w-full h-full object-contain mix-blend-multiply" />
          </button>
        ))}
      </div>

      {/* Main Image */}
      <div className="flex-1 bg-[#e0f2ec]/30 rounded-2xl relative overflow-hidden group cursor-zoom-in flex items-center justify-center p-12">
        <motion.img 
          key={activeImg}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          src={images[activeImg]} 
          alt="Main Product" 
          className="w-full h-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-150 transform-origin-center"
        />
      </div>
    </div>
  );
}
