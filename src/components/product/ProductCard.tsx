import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Eye, ShoppingBag, Star, Sparkles } from 'lucide-react';
import { Product, MaterialType } from '../../types';
import { useStore } from '../../store/useStore';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState<MaterialType>(
    product.availableMaterials[0]
  );

  const { addToCart, toggleWishlist, isInWishlist, setQuickViewProduct } = useStore();
  const isFavorited = isInWishlist(product.id);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, selectedMaterial, product.availableSizes?.[0] || 'Default');
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setQuickViewProduct(product);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex flex-col justify-between glass-card rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-1.5"
    >
      {/* Top Media Container */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-charcoal-900/60">
        {/* Primary Image */}
        <img
          src={isHovered && product.secondaryImage ? product.secondaryImage : product.primaryImage}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />

        {/* Subtle Dark Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian/80 via-transparent to-black/20 pointer-events-none" />

        {/* Badges (New, Best Seller) */}
        <div className="absolute top-3.5 left-3.5 flex flex-col gap-1.5 z-10 pointer-events-none">
          {product.isNew && (
            <span className="px-2.5 py-0.5 rounded-full bg-gold-500/90 text-obsidian text-[10px] font-mono font-bold uppercase tracking-wider shadow-gold-sm">
              New Creation
            </span>
          )}
          {product.isBestSeller && (
            <span className="px-2.5 py-0.5 rounded-full glass-panel border border-gold-500/30 text-gold-300 text-[10px] font-mono tracking-wider">
              Iconic
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlist}
          className={`absolute top-3.5 right-3.5 z-10 p-2.5 rounded-full backdrop-blur-md transition-all duration-300 ${
            isFavorited
              ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40 shadow-sm'
              : 'bg-charcoal-950/60 text-stone-300 hover:text-rose-400 hover:bg-charcoal-900 border border-white/10'
          }`}
          aria-label={isFavorited ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart className={`w-4 h-4 ${isFavorited ? 'fill-rose-400' : ''}`} />
        </button>

        {/* Quick View Button (Reveals on Hover) */}
        <div className="absolute inset-x-4 bottom-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-2">
          <button
            onClick={handleQuickView}
            className="flex-1 py-2.5 rounded-full glass-panel text-stone-200 hover:text-gold-300 border border-white/20 hover:border-gold-500/40 text-xs font-mono uppercase tracking-widest transition-all flex items-center justify-center gap-2 shadow-lg"
          >
            <Eye className="w-3.5 h-3.5 text-gold-400" />
            <span>Quick View</span>
          </button>
          
          <button
            onClick={handleQuickAdd}
            className="p-2.5 rounded-full bg-gold-500 hover:bg-gold-400 text-obsidian transition-all shadow-gold-sm"
            title="Add to Atelier Bag"
            aria-label="Add to bag"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Product Information */}
      <div className="p-5 flex flex-col justify-between flex-1 gap-3">
        <div>
          {/* Eyebrow & Rating */}
          <div className="flex items-center justify-between text-[11px] font-mono text-stone-400 uppercase tracking-wider mb-1">
            <span>{product.collection}</span>
            <div className="flex items-center gap-1 text-gold-400">
              <Star className="w-3 h-3 fill-gold-400" />
              <span>{product.rating.toFixed(2)}</span>
              <span className="text-stone-500">({product.reviewsCount})</span>
            </div>
          </div>

          {/* Product Title */}
          <Link to={`/product/${product.id}`}>
            <h3 className="font-serif text-base sm:text-lg text-stone-100 group-hover:text-gold-300 transition-colors leading-snug">
              {product.name}
            </h3>
          </Link>
          <p className="text-xs text-stone-400 line-clamp-1 mt-0.5">
            {product.subtitle}
          </p>
        </div>

        {/* Material Selection Dots & Price */}
        <div className="pt-2 border-t border-white/5 flex items-center justify-between">
          {/* Material Finishes */}
          <div className="flex items-center gap-1.5" title="Available Finishes">
            {product.availableMaterials.map((mat) => {
              const isSelected = selectedMaterial === mat;
              let dotColor = 'bg-[#D8B046]'; // Yellow gold
              if (mat === 'Platinum') dotColor = 'bg-[#E5E4E2]';
              if (mat === '18K Rose Gold') dotColor = 'bg-[#C98A90]';

              return (
                <button
                  key={mat}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setSelectedMaterial(mat);
                  }}
                  className={`w-3.5 h-3.5 rounded-full ${dotColor} transition-transform ${
                    isSelected
                      ? 'ring-2 ring-gold-400 ring-offset-2 ring-offset-charcoal-950 scale-110'
                      : 'opacity-60 hover:opacity-100'
                  }`}
                  aria-label={`Select ${mat}`}
                />
              );
            })}
          </div>

          {/* Price */}
          <div className="text-right">
            {product.originalPrice && (
              <span className="text-[11px] line-through text-stone-500 font-mono mr-2">
                ${product.originalPrice.toLocaleString()}
              </span>
            )}
            <span className="font-mono text-sm sm:text-base text-gold-300 font-semibold">
              ${product.price.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
