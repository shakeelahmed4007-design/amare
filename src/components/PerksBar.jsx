import React from 'react';
import { Gift, Package, Gem, Tag } from 'lucide-react';

const perks = [
  { text: "$10 or Under", icon: Tag },
  { text: "Enjoy 15% off First Purchase", icon: Gift },
  { text: "Free Shipping on Orders $35+", icon: Package },
  { text: "Earn Points & Free Products", icon: Gem }
];

export default function PerksBar() {
  return (
    <section className="bg-[#3b59d8] text-white py-6 overflow-hidden my-8 w-full border-y border-blue-800 shadow-sm relative group cursor-default">
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
        {/* We duplicate the perks array to create a seamless infinite scroll effect */}
        {[...perks, ...perks, ...perks].map((perk, idx) => {
          const Icon = perk.icon;
          return (
            <div key={idx} className="flex items-center gap-3 px-8 lg:px-12 font-extrabold text-sm sm:text-base tracking-tight whitespace-nowrap">
              <Icon className="w-6 h-6 text-white flex-shrink-0" />
              <span>{perk.text}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
