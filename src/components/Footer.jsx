import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-black text-white pt-16 pb-12 px-6 border-t border-neutral-800 font-sans">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-5 gap-10 border-b border-neutral-800 pb-12">
        
        {/* Brand & Newsletter */}
        <div className="md:col-span-2 space-y-4">
          <span className="text-4xl font-extrabold lowercase tracking-tighter text-white block">
            e.l.f.
          </span>
          <p className="text-neutral-400 text-xs max-w-sm leading-relaxed font-medium">
            Eyes. Lips. Face. Premium, 100% vegan & cruelty-free cosmetics for every eye, lip, and face.
          </p>
          <div className="pt-2">
            <h4 className="text-xs uppercase font-extrabold tracking-wider text-white mb-3">
              GET ON THE LIST & GET 15% OFF
            </h4>
            <div className="flex max-w-md border-b-2 border-white focus-within:border-cyan-400 transition-colors">
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="bg-transparent w-full py-2 outline-none placeholder-neutral-500 text-sm font-bold text-white"
              />
              <button 
                onClick={() => alert("Subscribed! Check your inbox for your 15% off code.")}
                className="p-2 text-white hover:text-cyan-400 transition-colors"
                aria-label="Subscribe"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Column 1 */}
        <div>
          <h4 className="text-xs font-black uppercase tracking-wider text-white mb-4">Shop</h4>
          <ul className="space-y-2.5 text-xs text-neutral-400 font-bold">
            <li><a href="#" className="hover:text-cyan-400 transition-colors">What's Hot</a></li>
            <li><a href="#" className="hover:text-cyan-400 transition-colors">Makeup</a></li>
            <li><a href="#" className="hover:text-cyan-400 transition-colors">Skincare</a></li>
            <li><a href="#" className="hover:text-cyan-400 transition-colors">Hair Care</a></li>
            <li><a href="#" className="hover:text-cyan-400 transition-colors">Best Sellers</a></li>
          </ul>
        </div>

        {/* Column 2 */}
        <div>
          <h4 className="text-xs font-black uppercase tracking-wider text-white mb-4">Beauty Squad</h4>
          <ul className="space-y-2.5 text-xs text-neutral-400 font-bold">
            <li><a href="#" className="hover:text-cyan-400 transition-colors">Join Beauty Squad</a></li>
            <li><a href="#" className="hover:text-cyan-400 transition-colors">Earn Points</a></li>
            <li><a href="#" className="hover:text-cyan-400 transition-colors">Redeem Rewards</a></li>
            <li><a href="#" className="hover:text-cyan-400 transition-colors">Squad Benefits</a></li>
          </ul>
        </div>

        {/* Column 3 */}
        <div>
          <h4 className="text-xs font-black uppercase tracking-wider text-white mb-4">Help & Info</h4>
          <ul className="space-y-2.5 text-xs text-neutral-400 font-bold">
            <li><a href="#" className="hover:text-cyan-400 transition-colors">Track Order</a></li>
            <li><a href="#" className="hover:text-cyan-400 transition-colors">Shipping Info</a></li>
            <li><a href="#" className="hover:text-cyan-400 transition-colors">Returns & Exchanges</a></li>
            <li><a href="#" className="hover:text-cyan-400 transition-colors">Customer Care</a></li>
          </ul>
        </div>

      </div>

      {/* Bottom Footer */}
      <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row items-center justify-between pt-8 text-[11px] text-neutral-500 font-bold gap-4">
        <p>&copy; {new Date().getFullYear()} e.l.f. Cosmetics, Inc. All rights reserved.</p>

        {/* Social SVGs */}
        <div className="flex space-x-5 text-neutral-400">
          <a href="#" className="hover:text-cyan-400 transition-colors" aria-label="Instagram">
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
          </a>
          <a href="#" className="hover:text-cyan-400 transition-colors" aria-label="Facebook">
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.614 5H18V0h-3.808C10.592 0 9 1.583 9 4.615V8z"/></svg>
          </a>
          <a href="#" className="hover:text-cyan-400 transition-colors" aria-label="TikTok">
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.27 1.76-.23 1.01.07 2.11.77 2.84.72.77 1.83 1.14 2.87.97.96-.13 1.84-.73 2.29-1.59.39-.72.5-1.58.48-2.39.02-3.92.01-7.84.01-11.76z"/></svg>
          </a>
        </div>

        <div className="flex space-x-4">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Use</a>
          <a href="#" className="hover:text-white transition-colors">Accessibility</a>
        </div>
      </div>
    </footer>
  );
}
