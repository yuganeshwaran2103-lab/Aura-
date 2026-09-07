import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, SlidersHorizontal, Grid3X3, Grid2X2, RotateCcw, Search, X } from 'lucide-react';
import { COLLECTIONS } from '../data/products';
import { ProductCard } from '../components/product/ProductCard';
import { CategoryType } from '../types';
import { useStore } from '../store/useStore';

export const Shop: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { products: PRODUCTS } = useStore();

  // Filters State
  const initialCategory = (searchParams.get('category') as CategoryType) || 'all';
  const initialCollection = searchParams.get('collection') || 'all';

  const [category, setCategory] = useState<CategoryType>(initialCategory);
  const [collection, setCollection] = useState<string>(initialCollection);
  const [material, setMaterial] = useState<string>('all');
  const [maxPrice, setMaxPrice] = useState<number>(20000);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [columns, setColumns] = useState<3 | 4>(3);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Sync URL query params
  useEffect(() => {
    const cat = searchParams.get('category') as CategoryType;
    if (cat) setCategory(cat);
    const col = searchParams.get('collection');
    if (col) setCollection(col);
  }, [searchParams]);

  // Handle category change
  const handleCategoryChange = (cat: CategoryType) => {
    setCategory(cat);
    if (cat === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', cat);
    }
    setSearchParams(searchParams);
  };

  // Clear all filters
  const resetFilters = () => {
    setCategory('all');
    setCollection('all');
    setMaterial('all');
    setMaxPrice(20000);
    setSortBy('featured');
    setInStockOnly(false);
    setSearchQuery('');
    setSearchParams({});
  };

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category filter
      if (category !== 'all' && product.category !== category) return false;

      // Collection filter
      if (collection !== 'all' && product.collection !== collection) return false;

      // Material filter
      if (material !== 'all' && !product.availableMaterials.includes(material as any)) return false;

      // Price filter
      if (product.price > maxPrice) return false;

      // In-stock
      if (inStockOnly && !product.inStock) return false;

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = product.name.toLowerCase().includes(q);
        const matchSubtitle = product.subtitle.toLowerCase().includes(q);
        const matchDesc = product.description.toLowerCase().includes(q);
        if (!matchName && !matchSubtitle && !matchDesc) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      // Default: featured first
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });
  }, [category, collection, material, maxPrice, inStockOnly, searchQuery, sortBy, PRODUCTS]);

  const activeFiltersCount =
    (category !== 'all' ? 1 : 0) +
    (collection !== 'all' ? 1 : 0) +
    (material !== 'all' ? 1 : 0) +
    (maxPrice < 20000 ? 1 : 0) +
    (inStockOnly ? 1 : 0) +
    (searchQuery ? 1 : 0);

  return (
    <div className="min-h-screen bg-obsidian text-stone-200 pt-8 pb-24 px-6 sm:px-8">
      {/* Header Banner */}
      <div className="max-w-7xl mx-auto mb-12 text-center space-y-3">
        <span className="text-xs uppercase tracking-[0.3em] font-mono text-gold-400">
          Haute Joaillerie & Horlogerie
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl text-stone-100 font-light">
          The Curated Catalog
        </h1>
        <p className="text-xs sm:text-sm text-stone-400 max-w-lg mx-auto font-light leading-relaxed">
          Each creation is individually sculpted in Geneva from recycled 18K gold and certified diamonds.
        </p>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Top Controls Bar */}
        <div className="p-4 rounded-2xl glass-panel border border-white/10 mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search catalog..."
              className="w-full bg-charcoal-900/90 border border-white/10 rounded-full pl-10 pr-4 py-2 text-xs text-stone-200 placeholder:text-stone-500 focus:outline-none focus:border-gold-500/40"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-500 hover:text-stone-300"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Right Filters & Sorting */}
          <div className="flex items-center justify-between w-full md:w-auto gap-4">
            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
              className="lg:hidden px-4 py-2 rounded-full glass-card border border-white/15 text-xs font-mono uppercase tracking-wider text-stone-300 flex items-center gap-2"
            >
              <Filter className="w-3.5 h-3.5 text-gold-400" />
              <span>Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}</span>
            </button>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <span className="hidden sm:inline text-[11px] uppercase font-mono text-stone-500">
                Sort:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-charcoal-900/90 border border-white/10 rounded-full px-4 py-2 text-xs font-mono text-stone-300 focus:outline-none focus:border-gold-500/40 cursor-pointer"
              >
                <option value="featured">Featured Curations</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>

            {/* Grid Layout Switcher (Desktop) */}
            <div className="hidden lg:flex items-center border border-white/10 rounded-full p-1 bg-charcoal-900/60">
              <button
                onClick={() => setColumns(3)}
                className={`p-1.5 rounded-full transition-colors ${
                  columns === 3 ? 'bg-gold-500 text-obsidian' : 'text-stone-400 hover:text-stone-200'
                }`}
                title="3 Column Layout"
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setColumns(4)}
                className={`p-1.5 rounded-full transition-colors ${
                  columns === 4 ? 'bg-gold-500 text-obsidian' : 'text-stone-400 hover:text-stone-200'
                }`}
                title="4 Column Layout"
              >
                <Grid2X2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Main Content: Sidebar + Products Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block lg:col-span-3 space-y-8 p-6 rounded-3xl glass-panel border border-white/10 h-fit sticky top-28">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-gold-400" />
                <h3 className="font-serif text-sm uppercase tracking-wider text-stone-100">
                  Filters
                </h3>
              </div>
              {activeFiltersCount > 0 && (
                <button
                  onClick={resetFilters}
                  className="text-[11px] font-mono text-gold-400 hover:text-gold-200 flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset ({activeFiltersCount})</span>
                </button>
              )}
            </div>

            {/* Category Filter */}
            <div className="space-y-2.5">
              <h4 className="text-xs uppercase font-mono tracking-wider text-stone-400">
                Category
              </h4>
              <div className="space-y-1 text-xs">
                {[
                  { id: 'all', label: 'All Creations' },
                  { id: 'rings', label: 'Rings & Solitaires' },
                  { id: 'necklaces', label: 'Necklaces & Pendants' },
                  { id: 'bracelets', label: 'Bracelets & Bangles' },
                  { id: 'earrings', label: 'Earrings & Studs' },
                  { id: 'watches', label: 'Haute Horlogerie' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleCategoryChange(item.id as any)}
                    className={`w-full text-left py-1.5 px-2.5 rounded-lg transition-colors flex items-center justify-between ${
                      category === item.id
                        ? 'bg-gold-500/15 text-gold-300 font-medium'
                        : 'text-stone-400 hover:text-stone-200'
                    }`}
                  >
                    <span>{item.label}</span>
                    <span className="text-[10px] font-mono text-stone-600">
                      {item.id === 'all'
                        ? PRODUCTS.length
                        : PRODUCTS.filter((p) => p.category === item.id).length}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Collection Filter */}
            <div className="space-y-2.5 pt-4 border-t border-white/5">
              <h4 className="text-xs uppercase font-mono tracking-wider text-stone-400">
                Collection
              </h4>
              <div className="space-y-1 text-xs">
                <button
                  onClick={() => setCollection('all')}
                  className={`w-full text-left py-1 px-2 rounded-lg transition-colors ${
                    collection === 'all' ? 'text-gold-300 font-medium' : 'text-stone-400 hover:text-stone-200'
                  }`}
                >
                  All Collections
                </button>
                {COLLECTIONS.map((col) => (
                  <button
                    key={col.id}
                    onClick={() => setCollection(col.id)}
                    className={`w-full text-left py-1 px-2 rounded-lg transition-colors flex items-center justify-between ${
                      collection === col.id ? 'text-gold-300 font-medium' : 'text-stone-400 hover:text-stone-200'
                    }`}
                  >
                    <span>{col.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Metal Alloy Filter */}
            <div className="space-y-2.5 pt-4 border-t border-white/5">
              <h4 className="text-xs uppercase font-mono tracking-wider text-stone-400">
                Precious Metal
              </h4>
              <div className="flex flex-wrap gap-2 text-xs">
                {['all', '18K Yellow Gold', 'Platinum', '18K Rose Gold'].map((mat) => (
                  <button
                    key={mat}
                    onClick={() => setMaterial(mat)}
                    className={`px-3 py-1.5 rounded-full border transition-colors ${
                      material === mat
                        ? 'border-gold-400 bg-gold-500/10 text-gold-300'
                        : 'border-white/10 text-stone-400 hover:text-stone-200'
                    }`}
                  >
                    {mat === 'all' ? 'All Metals' : mat}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Filter Slider */}
            <div className="space-y-2.5 pt-4 border-t border-white/5">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="uppercase text-stone-400">Maximum Price</span>
                <span className="text-gold-300 font-medium">${maxPrice.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="1000"
                max="20000"
                step="500"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-gold-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-stone-500">
                <span>$1,000</span>
                <span>$20,000+</span>
              </div>
            </div>

            {/* In Stock Toggle */}
            <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs">
              <span className="text-stone-400">Available Immediately</span>
              <button
                onClick={() => setInStockOnly(!inStockOnly)}
                className={`w-10 h-5 rounded-full p-0.5 transition-colors ${
                  inStockOnly ? 'bg-gold-500' : 'bg-charcoal-800'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-obsidian transition-transform ${
                    inStockOnly ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </aside>

          {/* Products Grid */}
          <main className="lg:col-span-9">
            {/* Active Filters Pills */}
            {activeFiltersCount > 0 && (
              <div className="flex flex-wrap items-center gap-2 mb-6">
                <span className="text-xs font-mono text-stone-500">Active filters:</span>
                {category !== 'all' && (
                  <span className="px-3 py-1 rounded-full text-xs font-mono bg-gold-500/10 border border-gold-500/30 text-gold-300 flex items-center gap-1.5">
                    Category: {category}
                    <X className="w-3 h-3 cursor-pointer" onClick={() => handleCategoryChange('all')} />
                  </span>
                )}
                {collection !== 'all' && (
                  <span className="px-3 py-1 rounded-full text-xs font-mono bg-gold-500/10 border border-gold-500/30 text-gold-300 flex items-center gap-1.5">
                    Collection: {collection}
                    <X className="w-3 h-3 cursor-pointer" onClick={() => setCollection('all')} />
                  </span>
                )}
                {material !== 'all' && (
                  <span className="px-3 py-1 rounded-full text-xs font-mono bg-gold-500/10 border border-gold-500/30 text-gold-300 flex items-center gap-1.5">
                    Metal: {material}
                    <X className="w-3 h-3 cursor-pointer" onClick={() => setMaterial('all')} />
                  </span>
                )}
                {maxPrice < 20000 && (
                  <span className="px-3 py-1 rounded-full text-xs font-mono bg-gold-500/10 border border-gold-500/30 text-gold-300 flex items-center gap-1.5">
                    Under ${maxPrice.toLocaleString()}
                    <X className="w-3 h-3 cursor-pointer" onClick={() => setMaxPrice(20000)} />
                  </span>
                )}
                <button
                  onClick={resetFilters}
                  className="text-xs text-stone-400 hover:text-gold-300 underline ml-2"
                >
                  Clear All
                </button>
              </div>
            )}

            {/* Results Counter */}
            <div className="text-xs font-mono uppercase tracking-widest text-stone-500 mb-6">
              Showing {filteredProducts.length} of {PRODUCTS.length} creations
            </div>

            {/* Grid */}
            {filteredProducts.length > 0 ? (
              <div
                className={`grid gap-6 ${
                  columns === 3
                    ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3'
                    : 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-4'
                }`}
              >
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-24 glass-panel rounded-3xl border border-white/10 space-y-4">
                <p className="font-serif text-xl text-stone-300">
                  No masterpieces match your criteria
                </p>
                <p className="text-xs text-stone-400 max-w-sm mx-auto">
                  Try clearing some filters or search for another precious gemstone or metal.
                </p>
                <button
                  onClick={resetFilters}
                  className="px-6 py-2.5 rounded-full bg-gold-500/15 border border-gold-500/30 text-gold-300 text-xs font-mono uppercase tracking-wider"
                >
                  Reset All Filters
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};
