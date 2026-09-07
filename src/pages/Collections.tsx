import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { COLLECTIONS } from '../data/products';
import { useStore } from '../store/useStore';

export const Collections: React.FC = () => {
  const { products } = useStore();
  return (
    <div className="min-h-screen bg-obsidian text-stone-200 pt-8 pb-24 px-6 sm:px-8">
      {/* Editorial Header */}
      <div className="max-w-7xl mx-auto mb-20 text-center space-y-4">
        <span className="text-xs uppercase tracking-[0.3em] font-mono text-gold-400">
          The Curated Anthologies
        </span>
        <h1 className="font-serif text-4xl sm:text-6xl text-stone-100 font-light">
          Bespoke Collections
        </h1>
        <p className="text-xs sm:text-sm text-stone-400 max-w-xl mx-auto font-light leading-relaxed">
          Each collection represents a distinct chapter in the AURA design universe, inspired by cosmological phenomena and sculpted with Swiss precision.
        </p>
      </div>

      {/* Series Sections */}
      <div className="max-w-7xl mx-auto space-y-32">
        {COLLECTIONS.map((col, index) => {
          const isReversed = index % 2 === 1;
          const colProducts = products.filter((p) => p.collection === col.id).slice(0, 2);

          return (
            <div
              key={col.id}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-12 items-center ${
                isReversed ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Image Hero with Floating Badge */}
              <div className={`lg:col-span-7 relative group ${isReversed ? 'lg:order-2' : ''}`}>
                <div className="relative aspect-[16/10] w-full rounded-3xl overflow-hidden glass-panel border border-white/10 shadow-2xl">
                  <img
                    src={col.heroImage}
                    alt={col.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian/90 via-transparent to-black/30" />

                  <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-gold-300">
                        Haute Joaillerie Series 0{index + 1}
                      </span>
                      <h3 className="font-serif text-2xl sm:text-3xl text-stone-100">
                        {col.name}
                      </h3>
                    </div>
                    <span className="text-xs font-mono text-stone-400 px-3 py-1 rounded-full glass-panel">
                      {col.itemCount} Masterpieces
                    </span>
                  </div>
                </div>
              </div>

              {/* Editorial Description & Mini Product Teasers */}
              <div className={`lg:col-span-5 space-y-6 ${isReversed ? 'lg:order-1' : ''}`}>
                <span className="text-xs font-mono uppercase tracking-[0.25em] text-gold-400">
                  {col.tagline}
                </span>
                <h2 className="font-serif text-3xl text-stone-100 font-light">
                  {col.name}
                </h2>
                <p className="text-xs sm:text-sm text-stone-300 font-light leading-relaxed">
                  {col.description}
                </p>

                {/* Sample Pieces in this collection */}
                {colProducts.length > 0 && (
                  <div className="space-y-3 pt-4 border-t border-white/10">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-stone-500 block">
                      Notable Creations:
                    </span>
                    <div className="grid grid-cols-2 gap-3">
                      {colProducts.map((prod) => (
                        <Link
                          key={prod.id}
                          to={`/product/${prod.id}`}
                          className="flex items-center gap-3 p-2 rounded-xl glass-card hover:border-gold-500/40 transition-all group"
                        >
                          <img
                            src={prod.primaryImage}
                            alt={prod.name}
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                          <div className="overflow-hidden">
                            <h5 className="text-xs font-serif text-stone-200 truncate group-hover:text-gold-300">
                              {prod.name}
                            </h5>
                            <span className="text-[11px] font-mono text-gold-400">
                              ${prod.price.toLocaleString()}
                            </span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                <div className="pt-4">
                  <Link
                    to={`/shop?collection=${col.id}`}
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-gold-500 to-gold-600 text-obsidian font-serif font-semibold text-xs uppercase tracking-wider shadow-gold-sm hover:shadow-gold-md transition-all"
                  >
                    <span>View Complete {col.name}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
