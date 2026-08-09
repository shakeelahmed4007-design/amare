import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { useStore } from '../contexts/StoreContext';
import { Sparkles, TicketPercent } from 'lucide-react';

export default function Shop({ onAddToCart }) {
  const { products, categories, activeSubscription, getSubscribedPrice, loading } = useStore();
  const [searchParams, setSearchParams] = useSearchParams();
  
  const selectedCat = searchParams.get('cat') || 'all';
  const badgeFilter = searchParams.get('badge'); 
  const sortParam = searchParams.get('sort'); 
  const maxPrice = searchParams.get('max_price'); 

  const [activeFilter, setActiveFilter] = useState(selectedCat);

  // Sync state if URL changes
  React.useEffect(() => {
    setActiveFilter(selectedCat);
  }, [selectedCat]);

  const categoryList = [{ id: 'all', slug: 'all', name: 'All' }, ...categories];

  // Only show Active products on the storefront (Inactive / Out of Stock stay hidden)
  const activeProducts = products.filter(p => !p.status || p.status === 'Active');

  let filteredProducts = activeFilter === 'all'
    ? activeProducts
    : activeProducts.filter(p => (p.category_slug || p.category) === activeFilter);

  if (badgeFilter) {
    filteredProducts = filteredProducts.filter(p => p.badge?.toLowerCase().includes(badgeFilter.toLowerCase()));
  }

  if (maxPrice) {
    filteredProducts = filteredProducts.filter(p => p.price <= parseFloat(maxPrice));
  }

  if (sortParam === 'bestselling') {
    // Sort by reviews (assuming higher reviews = bestselling)
    filteredProducts = [...filteredProducts].sort((a, b) => (b.reviews || 0) - (a.reviews || 0));
  } else if (sortParam === 'trending') {
    // Sort by rating or special badges
    filteredProducts = [...filteredProducts].sort((a, b) => {
      const aTrending = (a.badge === 'HOLY GRAIL' || a.rating >= 4.8) ? 1 : 0;
      const bTrending = (b.badge === 'HOLY GRAIL' || b.rating >= 4.8) ? 1 : 0;
      return bTrending - aTrending || (b.rating || 0) - (a.rating || 0);
    });
  }

  return (
    <div className="py-10 px-4 sm:px-8 max-w-[1440px] mx-auto min-h-screen bg-white">
      
      {/* Header Banner */}
      <div className="bg-black text-white p-8 sm:p-12 rounded-3xl mb-8 text-center space-y-3 relative overflow-hidden">
        <span className="text-xs uppercase font-extrabold text-cyan-400 tracking-widest flex items-center justify-center gap-1">
          <Sparkles className="w-3.5 h-3.5" />
          100% Vegan & Cruelty-Free
        </span>
        <h1 className="text-4xl sm:text-6xl font-black lowercase tracking-tighter">
          Shop All Amaré Faves
        </h1>
        <p className="text-sm text-neutral-400 max-w-xl mx-auto font-medium">
          Discover Holy Grail primers, hydrating liquid filters, glossy lips, and high-performance skincare.
        </p>

        {activeSubscription && (
          <div className="inline-flex items-center gap-2 mt-2 px-4 py-1.5 rounded-full bg-pink-500/20 border border-pink-500/40 text-pink-300 text-xs font-bold">
            <TicketPercent className="w-4 h-4 text-pink-400" />
            <span>Subscriber Discount Active: {activeSubscription.name} ({activeSubscription.discountPercent}% OFF)</span>
          </div>
        )}
      </div>

      {/* Dynamic Category Tabs */}
      <div className="flex items-center justify-center gap-2 sm:gap-3 mb-10 overflow-x-auto pb-2 scrollbar-none">
        {categoryList.map((cat) => (
          <button
            key={cat.id || cat.slug}
            onClick={() => {
              setActiveFilter(cat.slug);
              // Update URL to match filter, but clear other params to keep it clean
              setSearchParams({ cat: cat.slug });
            }}
            className={`px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-wider transition-all whitespace-nowrap ${
              activeFilter === cat.slug && !badgeFilter && !sortParam && !maxPrice
                ? 'bg-black text-white shadow-md'
                : 'bg-neutral-100 text-black hover:bg-neutral-200'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      {loading ? (
        <div className="text-center py-20 text-neutral-500 font-bold">Loading storefront catalog...</div>
      ) : filteredProducts.length === 0 ? (
        <div className="text-center py-20 text-neutral-500 font-bold">No products found in this category.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 justify-items-center">
          {filteredProducts.map((product) => {
            const finalPrice = getSubscribedPrice(product);
            const isDiscounted = finalPrice < product.price;

            return (
              <ProductCard 
                key={product.id} 
                className="w-full max-w-[320px]"
                product={{
                  ...product,
                  image: (product.images?.length > 0 ? product.images[0] : null) || product.image || '',
                  originalPrice: isDiscounted ? product.price : product.originalPrice,
                  price: finalPrice
                }} 
                onAddToCart={onAddToCart} 
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
