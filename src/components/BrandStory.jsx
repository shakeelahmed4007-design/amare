import React from 'react';

const logos = [
  { text: "Men'sHealth", className: "font-serif font-extrabold tracking-tighter text-[22px] transform scale-y-110 scale-x-90" },
  { text: "METRO", className: "font-sans font-black tracking-tighter uppercase text-[26px]" },
  { text: "GLAMOUR", className: "font-sans font-bold tracking-tight uppercase text-[20px] transform scale-y-110" },
  { text: "Women'sHealth", className: "font-serif font-bold tracking-tighter text-[24px] transform scale-y-[1.3] scale-x-75 origin-center" },
  { text: "Mirror", className: "font-sans font-black tracking-tight text-[26px]" },
  { text: "COSMOPOLITAN", className: "font-sans font-bold tracking-tighter uppercase text-[22px] transform scale-y-[1.4] scale-x-75 origin-center" }
];

export default function BrandStory() {
  return (
    <section className="bg-white">
      {/* Logos Strip */}
      <div className="w-full bg-[#f0f0f0] py-6 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap items-center justify-between gap-6 text-[#1c3835]">
            {logos.map((logo, idx) => (
              <span key={idx} className={`inline-block whitespace-nowrap ${logo.className}`}>
                {logo.text}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
