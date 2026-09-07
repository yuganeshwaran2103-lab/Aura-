import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../store/useStore';

export const SearchDrawer: React.FC = () => {
  const { isSearchOpen, setSearchOpen, products } = useStore();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isSearchOpen]);

  // Filtered live results
  const results = query.trim()
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase()) ||
          p.collection.toLowerCase().includes(query.toLowerCase()) ||
          p.shortDescription.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const handleSelectProduct = (id: string) => {
    setSearchOpen(false);
    navigate(`/product/${id}`);
  };

  const handleQuickCategory = (cat: string) => {
    setSearchOpen(false);
    navigate(`/shop?category=${cat}`);
  };

  return (
    <AnimatePresence>
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 flex flex-col justify-start">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSearchOpen(false)}
            className="absolute inset-0 bg-obsidian/90 backdrop-blur-xl"
          />

          {/* Search Content */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="relative w-full max-w-4xl mx-auto mt-12 sm:mt-20 px-6 z-10"
          >
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-gold-500/30 shadow-2xl bg-charcoal-900/90">
              <div className="flex items-center justify-between pb-6 border-b border-white/10">
                <div className="flex items-center gap-4 flex-1">
                  <Search className="w-6 h-6 text-gold-400" />
                  <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search diamonds, collections, rings, tourbillons..."
                    className="w-full bg-transparent border-none text-xl sm:text-2xl font-serif text-stone-100 placeholder:text-stone-500 focus:outline-none"
                  />
                </div>
                <button
                  onClick={() => setSearchOpen(false)}
                  className="p-2 text-stone-400 hover:text-stone-100 transition-colors rounded-full hover:bg-white/5"
                  aria-label="Close search"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Quick Category Badges */}
              {!query && (
                <div className="pt-6">
                  <span className="text-xs uppercase tracking-widest text-stone-500 font-mono block mb-3">
                    Curated Categories
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {['Rings', 'Necklaces', 'Bracelets', 'Earrings', 'Watches'].map((cat) => (
                      <button
                        key={cat}
                        onClick={() => handleQuickCategory(cat.toLowerCase())}
                        className="px-4 py-1.5 rounded-full text-xs text-stone-300 glass-card hover:border-gold-500/40 hover:text-gold-300 transition-colors"
                      >
                        {cat}
                      </button>
                    ))}
                  </div>

                  <div className="mt-8 pt-6 border-t border-white/5">
                    <span className="text-xs uppercase tracking-widest text-stone-500 font-mono block mb-4">
                      Trending Creations
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {products.slice(0, 3).map((item) => (
                        <div
                          key={item.id}
                          onClick={() => handleSelectProduct(item.id)}
                          className="flex items-center gap-3 p-2 rounded-xl glass-card cursor-pointer hover:border-gold-500/40 transition-all group"
                        >
                          <img
                            src={item.primaryImage}
                            alt={item.name}
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                          <div className="overflow-hidden">
                            <h5 className="text-xs font-serif text-stone-200 truncate group-hover:text-gold-300 transition-colors">
                              {item.name}
                            </h5>
                            <p className="text-[11px] text-gold-400 font-mono">
                              ${item.price.toLocaleString()}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Live Search Results */}
              {query && (
                <div className="pt-6 max-h-[60vh] overflow-y-auto pr-2 space-y-3">
                  <div className="flex items-center justify-between text-xs text-stone-400 font-mono uppercase tracking-wider mb-2">
                    <span>Results ({results.length})</span>
                    {results.length > 0 && <span>Click to inspect</span>}
                  </div>

                  {results.length > 0 ? (
                    results.map((product) => (
                      <div
                        key={product.id}
                        onClick={() => handleSelectProduct(product.id)}
                        className="flex items-center justify-between p-3 rounded-2xl glass-card hover:border-gold-500/40 cursor-pointer transition-all group"
                      >
                        <div className="flex items-center gap-4">
                          <img
                            src={product.primaryImage}
                            alt={product.name}
                            className="w-16 h-16 rounded-xl object-cover border border-white/10"
                          />
                          <div>
                            <span className="text-[10px] tracking-widest uppercase font-mono text-gold-400">
                              {product.collection} · {product.category}
                            </span>
                            <h4 className="font-serif text-base text-stone-100 group-hover:text-gold-300 transition-colors">
                              {product.name}
                            </h4>
                            <p className="text-xs text-stone-400 line-clamp-1">
                              {product.shortDescription}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 text-right">
                          <div>
                            <div className="font-mono text-gold-300 text-sm font-medium">
                              ${product.price.toLocaleString()}
                            </div>
                            <span className="text-[10px] text-stone-500">USD</span>
                          </div>
                          <ArrowRight className="w-4 h-4 text-stone-500 group-hover:text-gold-400 group-hover:translate-x-1 transition-all" />
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-12">
                      <p className="font-serif text-stone-400 text-lg">
                        No creations found matching "{query}"
                      </p>
                      <p className="text-xs text-stone-500 mt-1">
                        Try searching for diamond, solitaire, gold, tourbillon or celestial.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
