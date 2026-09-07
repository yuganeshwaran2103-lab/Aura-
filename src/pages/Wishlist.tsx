import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Trash2, ArrowRight, Share2, Sparkles } from 'lucide-react';
import { useStore } from '../store/useStore';

export const Wishlist: React.FC = () => {
  const { wishlist, toggleWishlist, addToCart, addToast } = useStore();

  const handleMoveToCart = (product: any) => {
    addToCart(
      product,
      product.availableMaterials[0],
      product.availableSizes?.[0] || 'Default'
    );
  };

  const handleShareWishlist = () => {
    navigator.clipboard?.writeText(window.location.href);
    addToast(
      'Private Wishlist Link Copied',
      'Share your curated selection with a loved one or your personal concierge.',
      'gold'
    );
  };

  return (
    <div className="min-h-screen bg-obsidian text-stone-200 pt-8 pb-24 px-6 sm:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 border-b border-white/10 gap-4 mb-12">
          <div className="space-y-2">
            <span className="text-xs uppercase font-mono tracking-[0.3em] text-gold-400">
              Personal Salon Curation
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl text-stone-100 font-light">
              Your Saved Pieces
            </h1>
            <p className="text-xs sm:text-sm text-stone-400 font-light">
              {wishlist.length} {wishlist.length === 1 ? 'masterpiece' : 'masterpieces'} reserved for your consideration.
            </p>
          </div>

          {wishlist.length > 0 && (
            <button
              onClick={handleShareWishlist}
              className="px-5 py-2.5 rounded-full glass-panel border border-gold-500/30 text-gold-300 hover:text-gold-100 text-xs font-mono uppercase tracking-wider flex items-center gap-2 self-start md:self-auto"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share Wishlist</span>
            </button>
          )}
        </div>

        {/* Wishlist Items Grid */}
        {wishlist.length === 0 ? (
          <div className="text-center py-28 glass-panel rounded-3xl border border-white/10 space-y-6 max-w-2xl mx-auto">
            <div className="w-16 h-16 rounded-full glass-card border border-gold-500/30 text-gold-400 flex items-center justify-center mx-auto">
              <Heart className="w-7 h-7 stroke-1" />
            </div>
            <div className="space-y-2">
              <h2 className="font-serif text-2xl text-stone-100 font-light">
                Your Wishlist Awaits Its First Star
              </h2>
              <p className="text-xs sm:text-sm text-stone-400 max-w-md mx-auto font-light leading-relaxed">
                Save your favorite solitaires, necklaces, and horlogerie timepieces to review them at your leisure.
              </p>
            </div>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-gold-500 to-gold-600 text-obsidian font-serif font-semibold text-xs uppercase tracking-wider shadow-gold-sm hover:shadow-gold-md transition-all"
            >
              <span>Explore The Collection</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlist.map((product) => (
              <div
                key={product.id}
                className="group relative flex flex-col justify-between glass-card rounded-2xl overflow-hidden border border-white/10 hover:border-gold-500/30 transition-all duration-300"
              >
                {/* Image */}
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-charcoal-950">
                  <img
                    src={product.primaryImage}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <button
                    onClick={() => toggleWishlist(product)}
                    className="absolute top-3.5 right-3.5 p-2 rounded-full glass-panel text-rose-400 hover:text-stone-400 transition-colors"
                    title="Remove from saved"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Details */}
                <div className="p-5 flex flex-col justify-between flex-1 gap-4">
                  <div>
                    <span className="text-[10px] font-mono text-gold-400 uppercase tracking-widest block mb-1">
                      {product.collection}
                    </span>
                    <Link to={`/product/${product.id}`}>
                      <h3 className="font-serif text-base text-stone-100 group-hover:text-gold-300 transition-colors">
                        {product.name}
                      </h3>
                    </Link>
                    <div className="font-mono text-sm text-gold-300 font-medium mt-1">
                      ${product.price.toLocaleString()}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-3 border-t border-white/5 flex items-center gap-2">
                    <button
                      onClick={() => handleMoveToCart(product)}
                      className="flex-1 py-2.5 rounded-full bg-gold-500/15 hover:bg-gold-500 text-gold-300 hover:text-obsidian border border-gold-500/30 text-xs font-mono uppercase tracking-wider transition-all flex items-center justify-center gap-2"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Move to Bag</span>
                    </button>
                    <Link
                      to={`/product/${product.id}`}
                      className="p-2.5 rounded-full glass-card hover:border-gold-500/40 text-stone-300 hover:text-gold-300 transition-colors"
                      title="Inspect 3D & Specs"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
