import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Trash2, ShieldCheck, Sparkles, Gift, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../store/useStore';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setCartOpen,
    removeFromCart,
    updateQuantity,
    appliedPromo,
    applyPromo,
    removePromo,
  } = useStore();

  const [promoInput, setPromoInput] = useState('');
  const [isGiftWrap, setIsGiftWrap] = useState(false);
  const [giftMessage, setGiftMessage] = useState('');
  const navigate = useNavigate();

  // Calculations
  const subtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const discountAmount = appliedPromo
    ? (subtotal * appliedPromo.discountPercent) / 100
    : 0;

  const total = Math.max(0, subtotal - discountAmount);

  // Free insured courier threshold ($3,000)
  const shippingThreshold = 3000;
  const shippingProgress = Math.min(100, (subtotal / shippingThreshold) * 100);
  const remainingForFreeShipping = Math.max(0, shippingThreshold - subtotal);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoInput) {
      const ok = applyPromo(promoInput);
      if (ok) setPromoInput('');
    }
  };

  const handleProceedToCheckout = () => {
    setCartOpen(false);
    navigate('/checkout');
  };

  const handleContinueShopping = () => {
    setCartOpen(false);
    navigate('/shop');
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCartOpen(false)}
            className="absolute inset-0 bg-obsidian/80 backdrop-blur-md"
          />

          {/* Drawer */}
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="w-screen max-w-md bg-charcoal-950 border-l border-white/10 shadow-2xl flex flex-col justify-between"
            >
              {/* Header */}
              <div className="p-6 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h3 className="font-serif text-xl tracking-wide text-stone-100">
                    Atelier Bag
                  </h3>
                  <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-gold-500/10 text-gold-300 border border-gold-500/20">
                    {cart.reduce((s, i) => s + i.quantity, 0)}
                  </span>
                </div>
                <button
                  onClick={() => setCartOpen(false)}
                  className="p-2 text-stone-400 hover:text-stone-100 rounded-full hover:bg-white/5 transition-colors"
                  aria-label="Close cart"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Insured Shipping Progress Bar */}
              <div className="px-6 py-3.5 bg-charcoal-900/60 border-b border-white/5">
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="flex items-center gap-1.5 text-stone-300">
                    <ShieldCheck className="w-3.5 h-3.5 text-gold-400" />
                    {remainingForFreeShipping === 0 ? (
                      <span className="text-gold-300 font-medium">Complimentary Armored Courier Unlocked</span>
                    ) : (
                      <span>
                        Add <strong className="text-gold-300">${remainingForFreeShipping.toLocaleString()}</strong> for complimentary armored courier
                      </span>
                    )}
                  </span>
                  <span className="text-[11px] font-mono text-stone-400">
                    {Math.round(shippingProgress)}%
                  </span>
                </div>
                <div className="w-full h-1 bg-charcoal-800 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-gold-600 via-gold-400 to-gold-200"
                    initial={{ width: 0 }}
                    animate={{ width: `${shippingProgress}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-16 space-y-4">
                    <div className="w-16 h-16 rounded-full glass-panel flex items-center justify-center text-gold-400 border border-gold-500/20">
                      <Sparkles className="w-8 h-8 opacity-70" />
                    </div>
                    <div>
                      <h4 className="font-serif text-lg text-stone-200">
                        Your Atelier Bag is Empty
                      </h4>
                      <p className="text-xs text-stone-400 mt-1 max-w-xs mx-auto">
                        Explore our haute joaillerie collections and curate your personal treasure.
                      </p>
                    </div>
                    <button
                      onClick={handleContinueShopping}
                      className="px-6 py-2.5 rounded-full bg-gold-500/10 hover:bg-gold-500/20 text-gold-300 border border-gold-500/30 text-xs uppercase tracking-widest font-mono transition-all"
                    >
                      Explore Collection
                    </button>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-4 p-4 rounded-2xl glass-card relative group"
                    >
                      <img
                        src={item.product.primaryImage}
                        alt={item.product.name}
                        className="w-20 h-20 rounded-xl object-cover border border-white/10 shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                          <h4 className="font-serif text-sm text-stone-100 truncate pr-4">
                            {item.product.name}
                          </h4>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-stone-500 hover:text-rose-400 transition-colors p-1"
                            title="Remove creation"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <p className="text-[11px] text-gold-400/90 font-mono mt-0.5">
                          {item.selectedMaterial}
                          {item.selectedSize ? ` · Size ${item.selectedSize}` : ''}
                        </p>
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center border border-white/15 rounded-lg bg-charcoal-900/80">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-1 text-stone-400 hover:text-stone-100 transition-colors"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-2.5 text-xs font-mono text-stone-200">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-1 text-stone-400 hover:text-stone-100 transition-colors"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <span className="font-mono text-xs text-gold-300 font-medium">
                            ${(item.product.price * item.quantity).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                )}

                {/* Gift Option Accordion */}
                {cart.length > 0 && (
                  <div className="pt-2 border-t border-white/10">
                    <div
                      onClick={() => setIsGiftWrap(!isGiftWrap)}
                      className="flex items-center justify-between cursor-pointer py-2 text-xs text-stone-300 hover:text-gold-300 transition-colors"
                    >
                      <span className="flex items-center gap-2">
                        <Gift className="w-4 h-4 text-gold-400" />
                        <span>Complimentary Luxury Gift Box & Note</span>
                      </span>
                      <span className="text-[11px] font-mono text-gold-400">
                        {isGiftWrap ? 'Included' : 'Add'}
                      </span>
                    </div>

                    {isGiftWrap && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="mt-2 space-y-2"
                      >
                        <textarea
                          rows={2}
                          value={giftMessage}
                          onChange={(e) => setGiftMessage(e.target.value)}
                          placeholder="Your personalized handwritten message for the recipient..."
                          className="w-full text-xs bg-charcoal-900 border border-white/10 rounded-xl p-3 text-stone-200 placeholder:text-stone-500 focus:outline-none focus:border-gold-500/40"
                        />
                        <p className="text-[10px] text-stone-400 italic">
                          Includes lacquered wooden case, velvet pouch, and gold wax seal.
                        </p>
                      </motion.div>
                    )}
                  </div>
                )}
              </div>

              {/* Footer Summary & Checkout */}
              {cart.length > 0 && (
                <div className="p-6 bg-charcoal-900/90 border-t border-white/10 space-y-4">
                  {/* Promo Code Input */}
                  <div>
                    {appliedPromo ? (
                      <div className="flex items-center justify-between p-2.5 rounded-xl bg-gold-500/10 border border-gold-500/20 text-xs">
                        <span className="text-gold-300 font-mono">
                          VIP Code: <strong>{appliedPromo.code}</strong> (-{appliedPromo.discountPercent}%)
                        </span>
                        <button
                          onClick={removePromo}
                          className="text-stone-400 hover:text-stone-100 text-[11px] underline"
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <form onSubmit={handleApplyPromo} className="flex gap-2">
                        <input
                          type="text"
                          value={promoInput}
                          onChange={(e) => setPromoInput(e.target.value)}
                          placeholder="VIP Privilege Code (e.g. AURA10)"
                          className="flex-1 bg-charcoal-950 border border-white/15 rounded-xl px-3 py-2 text-xs text-stone-200 placeholder:text-stone-500 focus:outline-none focus:border-gold-500/40 font-mono uppercase"
                        />
                        <button
                          type="submit"
                          className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-gold-300 text-xs font-mono uppercase tracking-wider border border-white/10 transition-colors"
                        >
                          Apply
                        </button>
                      </form>
                    )}
                  </div>

                  {/* Totals */}
                  <div className="space-y-1.5 text-xs">
                    <div className="flex justify-between text-stone-400">
                      <span>Subtotal</span>
                      <span className="font-mono text-stone-200">
                        ${subtotal.toLocaleString()}
                      </span>
                    </div>

                    {appliedPromo && (
                      <div className="flex justify-between text-gold-400 font-mono">
                        <span>VIP Courtesy (-{appliedPromo.discountPercent}%)</span>
                        <span>-${discountAmount.toLocaleString()}</span>
                      </div>
                    )}

                    <div className="flex justify-between text-stone-400">
                      <span>Insured Courier</span>
                      <span className="text-stone-200">
                        {remainingForFreeShipping === 0 ? 'Complimentary' : '$120'}
                      </span>
                    </div>

                    <div className="gold-divider my-2" />

                    <div className="flex justify-between text-sm font-serif text-stone-100 font-medium">
                      <span>Estimated Total</span>
                      <span className="font-mono text-gold-300 text-base">
                        ${(total + (remainingForFreeShipping === 0 ? 0 : 120)).toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* CTAs */}
                  <button
                    onClick={handleProceedToCheckout}
                    className="w-full py-3.5 rounded-full bg-gradient-to-r from-gold-500 via-gold-400 to-gold-600 text-obsidian font-serif font-semibold tracking-wider text-sm shadow-gold-sm hover:shadow-gold-md hover:brightness-105 active:scale-[0.99] transition-all flex items-center justify-center gap-2"
                  >
                    <span>Proceed to Checkout</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <p className="text-[10px] text-center text-stone-500 tracking-wider uppercase font-mono">
                    Global Insured Armored Delivery · 30-Day Returns · Swiss Provenance
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
