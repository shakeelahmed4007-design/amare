import React from 'react';

import img1 from '../assets/7.jpg';
import img2 from '../assets/8.jpg';
import img3 from '../assets/26.jpg';

const rewards = [
  {
    title: "Bronzing Drops Mini",
    image: img1
  },
  {
    title: "Power Grip Matte Primer Mini",
    image: img2
  },
  {
    title: "Monochromatic Multi Stick",
    image: img3
  }
];

export default function BeautySquadRewards() {
  return (
    <section className="bg-gradient-to-r from-purple-900 to-[#6b21a8] text-white py-12 px-4 sm:px-8 my-10 border-y border-purple-800">
      <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">
        
        {/* Left Callout */}
        <div className="w-full lg:w-1/3 space-y-4 text-center lg:text-left">
          <div className="inline-block bg-white text-black text-[11px] font-black tracking-[0.2em] uppercase px-3 py-1">
            BEAUTY SQUAD EXCLUSIVE
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-[54px] font-black lowercase tracking-tighter text-white leading-[0.95]">
            NEW REWARDS JUST DROPPED!
          </h2>
          <p className="text-[15px] font-semibold text-purple-100">
            Redeem your points for a free full-size or mini product.
          </p>
          <div className="pt-4">
            <button className="bg-white text-black font-black text-[13px] px-10 py-3.5 rounded-full hover:bg-neutral-200 transition-colors uppercase tracking-wider">
              SIGN IN
            </button>
          </div>
        </div>

        {/* Right Product Reward Cards */}
        <div className="w-full lg:w-2/3 grid grid-cols-1 sm:grid-cols-3 gap-6">
          {rewards.map((reward, idx) => (
            <div key={idx} className="flex flex-col group cursor-pointer">
              <div className="w-full aspect-[4/5] overflow-hidden relative shadow-md">
                <img 
                  src={reward.image} 
                  alt={reward.title} 
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                />
              </div>
              <div className="mt-4 flex flex-col items-start gap-1">
                <span className="text-[13px] font-extrabold text-white leading-tight uppercase tracking-tight group-hover:underline underline-offset-2">
                  {reward.title}
                </span>
                <span className="text-[11px] font-bold text-purple-200 uppercase tracking-widest">
                  Redeem now
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
