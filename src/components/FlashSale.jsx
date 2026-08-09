import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import bundleImg from '../assets/p1.png';

export default function FlashSale() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 12,
    minutes: 45,
    seconds: 30
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { hours, minutes, seconds } = prev;
        if (seconds > 0) seconds--;
        else {
          seconds = 59;
          if (minutes > 0) minutes--;
          else {
            minutes = 59;
            if (hours > 0) hours--;
          }
        }
        return { hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-20 px-6 bg-amare-pink/30 my-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="flex-1 space-y-6">
          <span className="text-geeks-dark uppercase tracking-[0.2em] text-xs font-bold bg-white px-3 py-1 inline-block">
            Flash Sale
          </span>
          <h2 className="font-sans text-4xl md:text-5xl text-geeks-dark">
            The Spring Bundle
          </h2>
          <p className="text-geeks-dark/70 max-w-md">
            Get our 3 best-selling pastel shades plus a premium glass top coat for 30% off. Limited time only.
          </p>
          
          <div className="flex space-x-6 pt-4">
            <div className="text-center">
              <span className="block text-3xl font-sans text-geeks-dark">{String(timeLeft.hours).padStart(2, '0')}</span>
              <span className="text-[10px] uppercase tracking-wider text-geeks-dark/60">Hours</span>
            </div>
            <div className="text-center">
              <span className="block text-3xl font-sans text-geeks-dark">{String(timeLeft.minutes).padStart(2, '0')}</span>
              <span className="text-[10px] uppercase tracking-wider text-geeks-dark/60">Mins</span>
            </div>
            <div className="text-center">
              <span className="block text-3xl font-sans text-geeks-dark">{String(timeLeft.seconds).padStart(2, '0')}</span>
              <span className="text-[10px] uppercase tracking-wider text-geeks-dark/60">Secs</span>
            </div>
          </div>

          <button className="mt-8 px-8 py-4 bg-pink-600 text-white shadow-md hover:bg-pink-700 transition-colors font-medium tracking-wide">
            Shop the Bundle - $45
          </button>
        </div>

        <div className="flex-1 w-full relative flex items-center justify-center">
          <img src={bundleImg} alt="The Spring Bundle" className="w-full h-auto max-w-md object-cover rounded-xl shadow-2xl" />
        </div>
      </div>
    </section>
  );
}
