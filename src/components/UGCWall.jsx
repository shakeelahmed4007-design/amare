import React from 'react';
import { Play } from 'lucide-react';

const ugcPosts = [
  {
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=600",
    caption: "I've been loving the e.l.f. Never Thirsty Moisturizing Shampoo & Conditioner! The shampoo creates a rich, gentle lather...",
    hasPlay: false
  },
  {
    image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&q=80&w=600",
    caption: "Found them! 🤩 Mi cabello es ondulado y el frizz siempre ha sido mi mayor batalla...",
    hasPlay: false
  },
  {
    image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&q=80&w=600",
    caption: "Locking the glow in with this glitzy SPF 50 stick!",
    hasPlay: true
  },
  {
    image: "https://images.unsplash.com/photo-1583001809873-a1284d5b318f?auto=format&fit=crop&q=80&w=600",
    caption: "We're serving stain. 💋 NEW Main Stain Lip Marker is now available on elfcosmetics.com!",
    hasPlay: true
  },
  {
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600",
    caption: "It's giving grape juice 🍇✨ cheek + lip combo with dark cocoa glow reviver...",
    hasPlay: true
  }
];

export default function UGCWall() {
  return (
    <section className="py-14 px-4 sm:px-8 max-w-[1440px] mx-auto text-center">
      <h2 className="text-4xl sm:text-5xl font-black lowercase tracking-tighter text-black mb-2">
        e.l.f. on you
      </h2>
      <p className="text-xs sm:text-sm text-neutral-600 font-medium max-w-xl mx-auto mb-3">
        Get instant access right here and wow. Where everyone can own their beauty, without compromise.
      </p>
      <div className="inline-block bg-indigo-100 text-indigo-900 text-xs font-black px-4 py-1 rounded-md mb-8 tracking-wider">
        #elfingamazing
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 overflow-x-auto pb-4 no-scrollbar">
        {ugcPosts.map((post, idx) => (
          <div 
            key={idx} 
            className="relative aspect-[9/16] rounded-2xl overflow-hidden group shadow-md border border-neutral-200 cursor-pointer min-w-[200px]"
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
