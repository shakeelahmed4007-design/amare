import React, { useState } from 'react';
import { Search, User, ShoppingBag, Menu, X, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import MegaMenu from './MegaMenu';
import logoImg from '../assets/LOGO.png';

export default function Navbar({ onOpenCart, cartCount = 0 }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMenuType, setActiveMenuType] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('US');
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);

  const navLinks = [
    { label: "What's Hot", icon: "🔥", path: "/shop", menuType: "whats-hot" },
    { label: "Hair", icon: "✨", path: "/shop?cat=hair", menuType: "hair" },
    { label: "Makeup", icon: "💄", path: "/shop?cat=makeup", menuType: "makeup" },
    { label: "Skincare", icon: "💧", path: "/shop?cat=skincare", menuType: "skincare" },
    { label: "Discover", icon: "🔍", path: "/shop?cat=discover", menuType: "discover" },
  ];

  return (
    <nav
      onMouseLeave={() => setActiveMenuType(null)}
      className="bg-black text-white relative z-50 border-b border-neutral-900 font-sans select-none"
    >
      <div className="w-full px-4 sm:px-8 py-2.5 flex items-center justify-between gap-4">

        {/* Left Section: Mobile Menu Toggle + Logo + Nav Links */}
        <div className="flex items-center gap-4 xl:gap-6">
          {/* Mobile Hamburger */}
          <button
            className="xl:hidden p-1.5 text-white hover:text-neutral-300 -ml-1.5"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="inline-block py-0.5">
              <img
                src={logoImg}
                alt="Amaré Logo"
                className="h-10 sm:h-12 w-auto object-contain hover:opacity-90 transition-opacity"
                style={{ imageRendering: 'crisp-edges' }}
              />
            </Link>
          </div>

          {/* Desktop Category Links */}
          <div className="hidden xl:flex items-center space-x-6 text-[13px] font-bold tracking-tight ml-2">
            {navLinks.map((link) => (
              <div
                key={link.label}
                onMouseEnter={() => setActiveMenuType(link.menuType)}
                className="relative py-1"
              >
                <Link
                  to={link.path}
                  className={`flex items-center gap-1.5 transition-colors border-b-2 py-0.5 ${activeMenuType === link.menuType
                      ? 'border-white text-white font-extrabold'
                      : 'border-transparent text-white hover:text-neutral-300'
                    }`}
                >
                  <span className="text-xs">{link.icon}</span>
                  <span>{link.label}</span>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Right Utilities */}
        <div className="flex items-center space-x-4 sm:space-x-5 text-xs font-bold">
          {/* Beauty Squad */}
          <Link
            to="/account"
            className="hidden md:flex items-center gap-1.5 hover:text-neutral-300 transition-colors"
          >
            <Users className="w-4 h-4" />
            <span>Beauty Squad</span>
          </Link>

          {/* Oval Search Input */}
          <div className="relative hidden sm:block w-36 md:w-52">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search"
              className="w-full bg-black text-white text-xs pl-8 pr-3 py-1.5 rounded-full border border-neutral-700 focus:outline-none focus:border-white transition-colors"
            />
            <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-neutral-400 w-3.5 h-3.5" />
          </div>

          {/* Country Selector */}
          <div className="relative hidden lg:block">
            <button
              onClick={() => setShowCountryDropdown(!showCountryDropdown)}
              className="flex items-center gap-1 hover:text-neutral-300 transition-colors font-black text-xs tracking-widest uppercase py-1"
            >
              {selectedCountry}
            </button>

            {showCountryDropdown && (
              <div className="absolute top-full right-[-10px] mt-4 w-24 bg-white border border-neutral-200 shadow-2xl py-2 z-50 rounded-sm">
                <div className="absolute -top-2 right-4 w-4 h-4 bg-white border-t border-l border-neutral-200 transform rotate-45"></div>
                <div className="relative z-10 bg-white">
                  {['US', 'UK', 'CA', 'AU', 'EU'].map(country => (
                    <button
                      key={country}
                      onClick={() => {
                        setSelectedCountry(country);
                        setShowCountryDropdown(false);
                      }}
                      className="w-full text-left px-5 py-2.5 text-[11px] font-black uppercase tracking-widest text-black hover:bg-neutral-100 transition-colors flex items-center justify-between"
                    >
                      {country}
                      {selectedCountry === country && <span className="w-1.5 h-1.5 rounded-full bg-black"></span>}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* User Account */}
          <Link to="/account" className="p-1 hover:text-neutral-300 transition-colors" aria-label="Account">
            <User className="w-5 h-5" />
          </Link>

          {/* Shopping Bag Button */}
          <button
            onClick={onOpenCart}
            className="relative p-1 hover:text-neutral-300 transition-colors flex items-center"
            aria-label="Open cart"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-cyan-400 text-black text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mega Menu Hover Dropdown */}
      <MegaMenu
        isOpen={!!activeMenuType}
        menuType={activeMenuType}
        onClose={() => setActiveMenuType(null)}
      />

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="xl:hidden bg-black border-t border-neutral-900 px-4 py-6 space-y-4">
          <div className="flex flex-col space-y-3 font-bold text-sm">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-2 text-white hover:text-neutral-300"
              >
                <span>{link.icon}</span>
                <span>{link.label}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
