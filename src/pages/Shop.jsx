import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { supabase } from '../supabase';
import { products as staticProducts } from '../data/products';

export default function Shop({ onAddToCart }) {
  const [searchParams] = useSearchParams();
  const selectedCat = searchParams.get('cat') || 'all';
  const [activeFilter, setActiveFilter] = useState(selectedCat);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState(['all']);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  async function fetchCategories() {
    const { data, error } = await supabase
      .from('categories')
      .select('name, slug');
    if (!error && data) {
      setCategories(['all', ...data.map(c => c.slug)]);
    }
  }

  async function fetchProducts() {
    setLoading(true);
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });
    if (!error && data) {
      setProducts(data);
    }
    setLoading(false);
  }

  const displayProducts = products.length > 0 ? products : staticProducts;

  const filteredProducts = activeFilter === 'all' 
    ? displayProducts 
    : displayProducts.filter(p => (p.category_slug || p.category) === activeFilter);

  return (
    <div className="py-10 px-4 sm:px-8 max-w-[1440px] mx-auto min-h-screen bg-white">
      {/* Header Banner */}
      <div className="bg-black text-white p-8 sm:p-12 rounded-3xl mb-10 text-center space-y-3">
        <span className="text-xs uppercase font-extrabold text-cyan-400 tracking-widest">
          100% Vegan & Cruelty-Free
        </span>
        <h1 className="text-4xl sm:text-6xl font-black lowercase tracking-tighter">
          Shop All e.l.f. Faves
        </h1>
        <p className="text-sm text-neutral-400 max-w-xl mx-auto font-medium">
          Discover Holy Grail primers, hydrating liquid filters, glossy lips, and high-performance skincare.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center justify-center gap-2 sm:gap-4 mb-10 overflow-x-auto pb-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveFilter(cat)}
            className={`px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-wider transition-all ${
              activeFilter === cat
                ? 'bg-black text-white shadow-md'
                : 'bg-neutral-100 text-black hover:bg-neutral-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      {loading ? (
        <div className="text-center py-20 text-neutral-500 font-bold">Loading products...</div>
      ) : filteredProducts.length === 0 ? (
        <div className="text-center py-20 text-neutral-500 font-bold">No products found.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 justify-items-center">
          {filteredProducts.map((product) => (
            <ProductCard 
              key={product.id} 
              className="w-full max-w-[320px]"
              product={{
                ...product,
                image: product.image || product.image_url || staticProducts[0].image,
                price: product.price
              }} 
              onAddToCart={onAddToCart} 
            />
          ))}
        </div>
      )}
    </div>
  );
}
