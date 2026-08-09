import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useStore } from '../contexts/StoreContext';

export default function MegaMenu({ isOpen, onClose, menuType = 'whats-hot' }) {
  const { products, categories } = useStore();

  const getFeaturedProduct = (catFilter) => {
    let list = products.filter(p => !p.status || p.status === 'Active');
    if (catFilter) {
      list = list.filter(p => (p.category_slug || p.category) === catFilter);
    }
    // Prefer products with images
    list = list.filter(p => p.image);
    // Prefer trending or new
    list.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    return list[0] || products[0];
  };

  const renderColumn = (title, links) => (
    <div>
      <h4 className="font-extrabold text-sm text-white mb-4 uppercase tracking-wider">{title}</h4>
      <ul className="space-y-2 text-xs font-medium text-neutral-300">
        {links.map((link, idx) => (
          <li key={idx}>
            <Link 
              to={link.url} 
              onClick={onClose}
              className={`hover:text-white transition-colors ${link.bold ? 'font-bold text-white' : ''}`}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );

  const PromoBanner = ({ product }) => {
    if (!product) return null;
    return (
      <div className="w-full lg:w-[280px] shrink-0 flex flex-col gap-3">
        <div className="relative w-full h-[180px] rounded-xl overflow-hidden bg-neutral-100 p-4 border border-white/10 shadow-lg group flex items-center justify-center">
          <img 
            src={product.image || (product.images && product.images[0])} 
            alt={product.title}
            className="w-full h-full object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        <Link 
          to={`/product/${product.id}`}
          onClick={onClose}
          className="w-full bg-white hover:bg-neutral-100 text-black font-extrabold text-[11px] py-3 px-4 rounded-full uppercase tracking-wider text-center shadow-md transition-all active:scale-95 block truncate"
        >
          SHOP {product.title}
        </Link>
      </div>
    );
  };

  // Content configuration based on menuType
  const menuConfigs = {
    'whats-hot': {
      columns: [
        {
          title: "New",
          links: [
            { label: "Shop All New", url: "/shop?badge=new", bold: true },
            { label: "New Makeup", url: "/shop?cat=makeup&badge=new" },
            { label: "New Skincare", url: "/shop?cat=skincare&badge=new" },
            { label: "New Hair", url: "/shop?cat=hair&badge=new" },
          ]
        },
        {
          title: "Best Sellers",
          links: [
            { label: "All Best Sellers", url: "/shop?sort=bestselling", bold: true },
            { label: "Makeup Best Sellers", url: "/shop?cat=makeup&sort=bestselling" },
            { label: "Skincare Best Sellers", url: "/shop?cat=skincare&sort=bestselling" },
            { label: "Hair Best Sellers", url: "/shop?cat=hair&sort=bestselling" },
            { label: "Lips Best Sellers", url: "/shop?cat=lips&sort=bestselling" },
          ]
        },
        {
          title: "Trending",
          links: [
            { label: "Top Trending", url: "/shop?sort=trending", bold: true },
            { label: "Trending Makeup", url: "/shop?cat=makeup&sort=trending" },
            { label: "Trending Skincare", url: "/shop?cat=skincare&sort=trending" },
          ]
        },
        {
          title: "Shop By Value",
          links: [
            { label: "Shop All Under $20", url: "/shop?max_price=20", bold: true },
            { label: "Under $15", url: "/shop?max_price=15" },
            { label: "Under $10", url: "/shop?max_price=10" },
            { label: "Under $5", url: "/shop?max_price=5" },
          ]
        }
      ],
      featured: getFeaturedProduct()
    },
    'makeup': {
      columns: [
        {
          title: "All Makeup",
          links: [
            { label: "Shop All Makeup", url: "/shop?cat=makeup", bold: true },
            { label: "New Makeup", url: "/shop?cat=makeup&badge=new" },
            { label: "Best Sellers", url: "/shop?cat=makeup&sort=bestselling" },
          ]
        },
        {
          title: "Face",
          links: [
            { label: "Shop All Face", url: "/shop?cat=face", bold: true },
            { label: "New Face", url: "/shop?cat=face&badge=new" },
            { label: "Face Best Sellers", url: "/shop?cat=face&sort=bestselling" },
          ]
        },
        {
          title: "Lips",
          links: [
            { label: "Shop All Lips", url: "/shop?cat=lips", bold: true },
            { label: "New Lips", url: "/shop?cat=lips&badge=new" },
            { label: "Lips Best Sellers", url: "/shop?cat=lips&sort=bestselling" },
          ]
        },
        {
          title: "Eyes",
          links: [
            { label: "Shop All Eyes", url: "/shop?cat=eyes", bold: true },
            { label: "New Eyes", url: "/shop?cat=eyes&badge=new" },
            { label: "Eyes Best Sellers", url: "/shop?cat=eyes&sort=bestselling" },
          ]
        }
      ],
      featured: getFeaturedProduct('makeup') || getFeaturedProduct('face')
    },
    'skincare': {
      columns: [
        {
          title: "All Skincare",
          links: [
            { label: "Explore Amaré SKIN", url: "/shop?cat=skincare", bold: true },
            { label: "Shop All New Skincare", url: "/shop?cat=skincare&badge=new" },
            { label: "Skincare Best Sellers", url: "/shop?cat=skincare&sort=bestselling" },
          ]
        },
        {
          title: "Shop By Value",
          links: [
            { label: "Skincare Under $20", url: "/shop?cat=skincare&max_price=20" },
            { label: "Skincare Under $15", url: "/shop?cat=skincare&max_price=15" },
            { label: "Skincare Under $10", url: "/shop?cat=skincare&max_price=10" },
          ]
        }
      ],
      featured: getFeaturedProduct('skincare') || getFeaturedProduct('skin')
    },
    'hair': {
      columns: [
        {
          title: "All Hair",
          links: [
            { label: "Explore Amaré Hair", url: "/shop?cat=hair", bold: true },
            { label: "Shop All Hair", url: "/shop?cat=hair" },
            { label: "New Hair Products", url: "/shop?cat=hair&badge=new" },
            { label: "Hair Best Sellers", url: "/shop?cat=hair&sort=bestselling" },
          ]
        },
        {
          title: "Shop By Value",
          links: [
            { label: "Hair Under $20", url: "/shop?cat=hair&max_price=20" },
            { label: "Hair Under $15", url: "/shop?cat=hair&max_price=15" },
          ]
        }
      ],
      featured: getFeaturedProduct('hair')
    },
    'discover': {
      columns: [
        {
          title: "Discover Amaré",
          links: [
            { label: "All Products", url: "/shop", bold: true },
            { label: "New Arrivals", url: "/shop?badge=new" },
            { label: "Best Sellers", url: "/shop?sort=bestselling" },
            { label: "Trending Picks", url: "/shop?sort=trending" },
          ]
        },
        {
          title: "Tools & Sets",
          links: [
            { label: "Brushes", url: "/shop?cat=brushes", bold: true },
            { label: "Sets & Kits", url: "/shop?cat=sets" },
            { label: "Nails", url: "/shop?cat=nails" },
          ]
        }
      ],
      featured: getFeaturedProduct()
    }
  };

  const currentConfig = menuConfigs[menuType] || menuConfigs['whats-hot'];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          transition={{ duration: 0.15 }}
          onMouseEnter={(e) => e.stopPropagation()}
          onMouseLeave={onClose}
          className="absolute top-full left-0 w-full bg-[#0a0a0a] text-white shadow-2xl border-t border-neutral-900 z-50 py-8 px-8 sm:px-12 select-none max-h-[85vh] overflow-y-auto"
        >
          <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row justify-between gap-8">
            <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-8">
              {currentConfig.columns.map((col, i) => (
                <React.Fragment key={i}>
                  {renderColumn(col.title, col.links)}
                </React.Fragment>
              ))}
            </div>
            
            <PromoBanner product={currentConfig.featured} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
