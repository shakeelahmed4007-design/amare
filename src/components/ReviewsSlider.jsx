import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const reviews = [
  { id: 1, name: "Sophia L.", rating: 5, text: "The Pure Creatine is exactly what I've been looking for. It mixes so smoothly and gives me energy for hours without a crash!", verified: true },
  { id: 2, name: "Emma R.", rating: 5, text: "Absolutely love the clean formula. The Magnesium is perfect for my sleep routine. Shipping was super fast too.", verified: true },
  { id: 3, name: "Olivia M.", rating: 5, text: "Finally, natural supplements that actually work. The quality is premium and the packaging alone is stunning.", verified: true },
];

export default function ReviewsSlider() {
  return (
    <section className="py-24 bg-[#FDFBF7] px-6">
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h3 className="font-sans text-4xl font-bold text-stone-800 mb-4 tracking-tight">Loved by our Community</h3>
        <div className="flex items-center justify-center gap-1 text-rose-300">
          {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
        </div>
        <p className="mt-4 text-stone-500 text-[15px] font-medium">Over 10,000+ 5-star reviews</p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {reviews.map((review, i) => (
          <motion.div 
            key={review.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="bg-white p-8 rounded-[2rem] border border-rose-100 shadow-[0_4px_20px_rgba(225,29,72,0.02)] hover:shadow-[0_10px_30px_rgba(225,29,72,0.06)] transition-all duration-300"
          >
            <div className="flex items-center gap-1 text-rose-300 mb-6">
              {[...Array(review.rating)].map((_, i) => <Star key={i} className="w-[18px] h-[18px] fill-current" />)}
            </div>
            <p className="text-stone-600 font-medium italic mb-8 leading-relaxed text-[15px]">
              "{review.text}"
            </p>
            <div className="flex items-center justify-between">
              <span className="font-bold text-stone-800">{review.name}</span>
              {review.verified && <span className="text-[10px] uppercase tracking-widest text-rose-600 bg-rose-50 px-3 py-1 rounded-full font-bold">Verified Buyer</span>}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
