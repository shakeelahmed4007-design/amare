import React from 'react';
import { Camera, ShoppingBag } from 'lucide-react';
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

const feed = [
  { id: 1, image: img1 },
  { id: 2, image: img2 },
  { id: 3, image: img3 },
  { id: 4, image: img4 },
  { id: 5, image: img5 },
  { id: 6, image: img6 },
  { id: 7, image: img7 },
  { id: 8, image: img8 },
  { id: 9, image: img9 },
  { id: 10, image: img10 }
];

export default function UGCFeed() {
  return (
    <section className="py-20 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col items-center text-center mb-12">
        <h3 className="font-sans text-4xl text-geeks-dark mb-4">Amaré In The Wild</h3>
        <p className="text-geeks-dark/60 text-sm max-w-md">
          Tag @amarecosmetics to be featured. Click to shop the shades.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {feed.map((item) => (
          <div key={item.id} className="relative aspect-square group overflow-hidden bg-gray-100 cursor-pointer">
            <img 
              src={item.image} 
              alt="UGC Content" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
            />
            
            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-geeks-dark/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <div className="flex space-x-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-geeks-dark hover:bg-geeks-orange transition-colors">
                  <ShoppingBag className="w-4 h-4" />
                </button>
                <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-geeks-dark hover:bg-geeks-orange transition-colors">
                  <Camera className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="text-center mt-12">
        <button className="px-8 py-3 border border-pink-600 text-pink-600 hover:bg-pink-600 hover:text-white hover:bg-pink-700 hover:text-white font-medium tracking-wide hover:bg-pink-700 hover:text-white transition-colors">
          Follow @amarecosmetics
        </button>
      </div>
    </section>
  );
}
