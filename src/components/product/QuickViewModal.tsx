import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, Heart, ShoppingBag, ArrowRight, ShieldCheck, Gem } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import { MaterialType } from '../../types';

export const QuickViewModal: React.FC = () => {
  const { quickViewProduct, setQuickViewProduct, addToCart, toggleWishlist, isInWishlist } =
    useStore();
  const navigate = useNavigate();

  const [selectedMaterial, setSelectedMaterial] = useState<MaterialType>('18K Yellow Gold');
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState<string>('');

  useEffect(() => {
    if (quickViewProduct) {
      setSelectedMaterial(quickViewProduct.availableMaterials[0]);
      setSelectedSize(quickViewProduct.availableSizes?.[0] || '');
      setActiveImage(quickViewProduct.primaryImage);
      setQuantity(1);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [quickViewProduct]);

  if (!quickViewProduct) return null;

  const isFavorited = isInWishlist(quickViewProduct.id);

  const handleAddToCart = () => {
    addToCart(quickViewProduct, selectedMaterial, selectedSize, quantity);
    setQuickViewProduct(null);
  };

  const handleNavigateToDetails = () => {
    setQuickViewProduct(null);
    navigate(`/product/${quickViewProduct.id}`);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setQuickViewProduct(null)}
          className="fixed inset-0 bg-obsidian/85 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-4xl bg-charcoal-950 border border-gold-500/25 rounded-3xl shadow-2xl overflow-hidden z-10 my-8"
        >
          {/* Close Button */}
          <button
            onClick={() => setQuickViewProduct(null)}
            className="absolute top-4 right-4 z-20 p-2 text-stone-400 hover:text-stone-100 rounded-full glass-panel hover:bg-white/10 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Left Image Showcase */}
            <div className="p-6 sm:p-8 bg-charcoal-900/40 flex flex-col justify-between border-b md:border-b-0 md:border-r border-white/10">
              <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-charcoal-950 border border-white/10">
                <img
                  src={activeImage}
                  alt={quickViewProduct.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Gallery Thumbnails */}
              {quickViewProduct.gallery && quickViewProduct.gallery.length > 1 && (
                <div className="flex gap-2.5 mt-4 overflow-x-auto pb-1">
                  {quickViewProduct.gallery.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImage(img)}
                      className={`w-14 h-14 rounded-xl overflow-hidden border shrink-0 transition-all ${
                        activeImage === img
                          ? 'border-gold-400 ring-2 ring-gold-500/30'
                          : 'border-white/10 opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right Product Options */}
            <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                {/* Collection & Rating */}
                <div className="flex items-center justify-between text-xs font-mono text-stone-400 uppercase tracking-wider">
                  <span className="text-gold-400 font-semibold">
                    {quickViewProduct.collection}
                  </span>
                  <div className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-gold-400 text-gold-400" />
                    <span>{quickViewProduct.rating.toFixed(2)}</span>
                    <span className="text-stone-500">
                      ({quickViewProduct.reviewsCount} reviews)
                    </span>
                  </div>
                </div>

                {/* Title & Price */}
                <div>
                  <h2 className="font-serif text-2xl text-stone-100">
                    {quickViewProduct.name}
                  </h2>
                  <p className="text-xs text-stone-400 mt-1">
                    {quickViewProduct.subtitle}
                  </p>
                  <div className="mt-3 flex items-baseline gap-3">
                    <span className="font-mono text-2xl text-gold-300 font-semibold">
                      ${quickViewProduct.price.toLocaleString()}
                    </span>
                    {quickViewProduct.originalPrice && (
                      <span className="font-mono text-sm line-through text-stone-500">
                        ${quickViewProduct.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs text-stone-300 leading-relaxed">
                  {quickViewProduct.shortDescription}
                </p>

                {/* Material Switcher */}
                <div className="space-y-2">
                  <label className="text-[11px] uppercase tracking-wider font-mono text-stone-400 block">
                    Precious Metal Finish: <span className="text-gold-300">{selectedMaterial}</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {quickViewProduct.availableMaterials.map((mat) => (
                      <button
                        key={mat}
                        onClick={() => setSelectedMaterial(mat)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-sans border transition-all ${
                          selectedMaterial === mat
                            ? 'border-gold-400 bg-gold-500/10 text-gold-200'
                            : 'border-white/10 text-stone-400 hover:border-white/30'
                        }`}
                      >
                        {mat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Size Selector */}
                {quickViewProduct.availableSizes && (
                  <div className="space-y-2">
                    <label className="text-[11px] uppercase tracking-wider font-mono text-stone-400 block">
                      Size: <span className="text-gold-300">{selectedSize}</span>
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {quickViewProduct.availableSizes.map((sz) => (
                        <button
                          key={sz}
                          onClick={() => setSelectedSize(sz)}
                          className={`px-3 py-1 rounded-xl text-xs font-mono border transition-all ${
                            selectedSize === sz
                              ? 'border-gold-400 bg-gold-500/10 text-gold-200'
                              : 'border-white/10 text-stone-400 hover:border-white/30'
                          }`}
                        >
                          {sz}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-4 border-t border-white/10">
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 py-3.5 rounded-full bg-gradient-to-r from-gold-500 to-gold-600 text-obsidian font-serif font-semibold tracking-wider text-xs uppercase shadow-gold-sm hover:shadow-gold-md transition-all flex items-center justify-center gap-2"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Atelier Bag</span>
                  </button>

                  <button
                    onClick={() => toggleWishlist(quickViewProduct)}
                    className={`p-3.5 rounded-full border transition-colors ${
                      isFavorited
                        ? 'border-rose-500/40 bg-rose-500/10 text-rose-400'
                        : 'border-white/15 text-stone-300 hover:border-gold-500/40 hover:text-gold-300'
                    }`}
                    aria-label="Wishlist"
                  >
                    <Heart className={`w-4 h-4 ${isFavorited ? 'fill-rose-400' : ''}`} />
                  </button>
                </div>

                <button
                  onClick={handleNavigateToDetails}
                  className="w-full py-2.5 text-center text-xs text-stone-400 hover:text-gold-300 transition-colors flex items-center justify-center gap-1.5 font-mono uppercase tracking-wider"
                >
                  <span>Experience Interactive 3D & Full Specifications</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
