import React from 'react';
import { Play } from 'lucide-react';

import imgA from '../assets/p1.png';
import imgB from '../assets/p1.png';
import imgC from '../assets/p1.png';
import imgD from '../assets/13.jpg';
import imgE from '../assets/p1.png';

const ugcPosts = [
  {
    image: imgA,
    caption: "I've been loving the Amaré Never Thirsty Moisturizing Shampoo & Conditioner! The shampoo creates a rich, gentle lather...",
    hasPlay: false
  },
  {
    image: imgB,
    caption: "Found them! 🤩 Mi cabello es ondulado y el frizz siempre ha sido mi mayor batalla...",
    hasPlay: false
  },
  {
    image: imgC,
    caption: "Locking the glow in with this glitzy SPF 50 stick!",
    hasPlay: true
  },
  {
    image: imgD,
    caption: "We're serving stain. 💋 NEW Main Stain Lip Marker is now available on elfcosmetics.com!",
    hasPlay: true
  },
  {
    image: imgE,
    caption: "It's giving grape juice 🍇✨ cheek + lip combo with dark cocoa glow reviver...",
    hasPlay: true
  }
];

export default function UGCWall() {
  return (
    <section className="py-14 px-4 sm:px-8 max-w-[1440px] mx-auto text-center">
      <h2 className="text-4xl sm:text-5xl font-black lowercase tracking-tighter text-black mb-2">
        Amaré on you
      </h2>
      <p className="text-xs sm:text-sm text-neutral-600 font-medium max-w-xl mx-auto mb-3">
        Get instant access right here and wow. Where everyone can own their beauty, without compromise.
      </p>
      <div className="inline-block bg-indigo-100 text-indigo-900 text-xs font-black px-4 py-1 rounded-md mb-8 tracking-wider">
        #amareamazing
      </div>

      <div className="flex overflow-x-auto pb-4 no-scrollbar gap-4 md:grid md:grid-cols-5 md:overflow-x-visible md:pb-0">
        {ugcPosts.map((post, idx) => (
          <div 
            key={idx} 
            className="relative aspect-[9/16] rounded-2xl overflow-hidden group shadow-md border border-neutral-200 cursor-pointer min-w-[220px] sm:min-w-[240px] md:min-w-0 w-full flex-shrink-0"
          >
            <img 
              src={post.image} 
              alt="UGC Feed" 
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-between p-4 text-left">
              
              {/* Play Button Icon */}
              <div className="flex justify-center items-center h-full">
                {post.hasPlay && (
                  <div className="w-10 h-10 rounded-full bg-black/60 backdrop-blur-xs flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                    <Play className="w-5 h-5 fill-white ml-0.5" />
                  </div>
                )}
              </div>

              {/* Caption Overlay */}
              <p className="text-white text-sm sm:text-[15px] font-bold leading-tight line-clamp-4 drop-shadow-lg">
                {post.caption}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
