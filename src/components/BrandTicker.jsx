import React from 'react';

const badges = [
  { label: "Cruelty Free", icon: "🐰" },
  { label: "Fair Trade Certified™", icon: "🤝" },
  { label: "e.l.f. Clean", icon: "🧼" },
  { label: "Vegan", icon: "🌿" },
];

export default function BrandTicker() {
  return (
    <div className="bg-[#fca5a5] py-3.5 overflow-hidden border-y border-pink-300 select-none">
      <div className="animate-marquee flex items-center space-x-12 whitespace-nowrap">
        {[...badges, ...badges, ...badges, ...badges, ...badges].map((badge, idx) => (
          <div key={idx} className="flex items-center space-x-2 text-black font-extrabold text-sm sm:text-base tracking-tight">
            <span className="text-xl">{badge.icon}</span>
            <span>{badge.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
