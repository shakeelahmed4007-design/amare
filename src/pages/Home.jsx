import React from 'react';
import HeroSlider from '../components/HeroSlider';
import ProductCarousel from '../components/ProductCarousel';
import BrandTicker from '../components/BrandTicker';
import CategoryGrid from '../components/CategoryGrid';
import FeaturedCallout from '../components/FeaturedCallout';
import PerksBar from '../components/PerksBar';
import BeautySquadRewards from '../components/BeautySquadRewards';
import UGCWall from '../components/UGCWall';
import { useStore } from '../contexts/StoreContext';

export default function Home({ onAddToCart }) {
  const { products, publicLoading, publicError } = useStore();

  // Show only Active products on storefront
  const activeProducts = products.filter(p => !p.status || p.status === 'Active');

  const newArrivals = activeProducts.slice(0, 10);
  const recommendations = activeProducts.slice(2, 12);

  return (
    <main className="bg-white min-h-screen">
      {/* Power Grip Hero Slider */}
      <HeroSlider />

      {/* Connection error banner — only shown if data completely fails */}
      {publicError && !publicLoading && (
        <div className="mx-4 sm:mx-8 mt-4 p-4 bg-red-50 border border-red-200 rounded-xl text-center">
          <p className="text-sm text-red-600 font-bold">{publicError}</p>
          <p className="text-xs text-red-400 mt-1">
            Check your internet connection or try refreshing the page.
          </p>
        </div>
      )}

      {/* New Arrivals Product Carousel */}
      <ProductCarousel
        title="New Arrivals"
        products={publicLoading ? undefined : newArrivals}
        loading={publicLoading}
        onAddToCart={onAddToCart}
      />

      {/* Brand Values Marquee Ticker */}
      <BrandTicker />

      {/* Shop By Category Visual Cards */}
      <CategoryGrid />

      {/* Set It Right Product Carousel */}
      <ProductCarousel
        title="Set It Right"
        products={publicLoading ? undefined : recommendations}
        loading={publicLoading}
        onAddToCart={onAddToCart}
      />

      {/* Build Your Face Routine */}
      <FeaturedCallout onAddToCart={onAddToCart} />

      {/* Value Perks Highlights Bar */}
      <PerksBar />

      {/* Beauty Squad Purple Rewards Banner */}
      <BeautySquadRewards />

      {/* Amaré on you Social Wall Feed */}
      <UGCWall />

      {/* You May Also Love Carousel */}
      <ProductCarousel
        title="You May Also Love"
        products={publicLoading ? undefined : recommendations}
        loading={publicLoading}
        onAddToCart={onAddToCart}
      />
    </main>
  );
}
