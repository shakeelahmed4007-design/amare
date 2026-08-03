import React from 'react';
import HeroSlider from '../components/HeroSlider';
import ProductCarousel from '../components/ProductCarousel';
import BrandTicker from '../components/BrandTicker';
import CategoryGrid from '../components/CategoryGrid';
import FeaturedCallout from '../components/FeaturedCallout';
import PerksBar from '../components/PerksBar';
import BeautySquadRewards from '../components/BeautySquadRewards';
import UGCWall from '../components/UGCWall';
import { products } from '../data/products';

export default function Home({ onAddToCart }) {
  const newArrivals = products.slice(0, 10);
  const recommendations = products.slice(10, 18);

  return (
    <main className="bg-white min-h-screen">
      {/* Power Grip Hero Slider */}
      <HeroSlider />

      {/* New Arrivals Product Carousel */}
      <ProductCarousel
        title="New Arrivals"
        products={newArrivals}
        onAddToCart={onAddToCart}
      />

      {/* Brand Values Marquee Ticker */}
      <BrandTicker />

      {/* Shop By Category Visual Cards */}
      <CategoryGrid />

      {/* Set It Right Product Carousel replacing FeaturedCallout */}
      <ProductCarousel
        title="Set It Right"
        products={recommendations}
        onAddToCart={onAddToCart}
      />

      {/* Build Your Face Routine - Restored and Cloned */}
      <FeaturedCallout onAddToCart={onAddToCart} />

      {/* Value Perks Highlights Bar (Marquee) moved above Beauty Squad */}
      <PerksBar />

      {/* Beauty Squad Purple Rewards Banner */}
      <BeautySquadRewards />

      {/* e.l.f. on you Social Wall Feed */}
      <UGCWall />

      {/* You May Also Love Carousel */}
      <ProductCarousel
        title="You May Also Love"
        products={recommendations}
        onAddToCart={onAddToCart}
      />
    </main>
  );
}
