import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ShieldCheck, Gift, ArrowRight, Sparkles } from 'lucide-react';
import { useStore } from '../store/useStore';

export const Cart: React.FC = () => {
  const {
    cart,
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

  const subtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const discountAmount = appliedPromo
    ? (subtotal * appliedPromo.discountPercent) / 100
    : 0;

  const shippingThreshold = 3000;
  const isFreeShipping = subtotal >= shippingThreshold || cart.length === 0;
  const courierFee = isFreeShipping ? 0 : 120;
  const total = Math.max(0, subtotal - discountAmount + courierFee);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoInput) {
      applyPromo(promoInput);
      setPromoInput('');
    }
  };

  return (
    <div className="min-h-screen bg-obsidian text-stone-200 pt-8 pb-24 px-6 sm:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="pb-8 border-b border-white/10 mb-12">
          <span className="text-xs uppercase font-mono tracking-[0.3em] text-gold-400 block mb-2">
            Order Review
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl text-stone-100 font-light">
            Your Atelier Bag
          </h1>
        </div>

        {cart.length === 0 ? (
          <div className="text-center py-28 glass-panel rounded-3xl border border-white/10 space-y-6 max-w-xl mx-auto">
            <Sparkles className="w-10 h-10 text-gold-400/80 mx-auto" />
            <div className="space-y-2">
              <h2 className="font-serif text-2xl text-stone-100 font-light">
                Your Atelier Bag is Empty
              </h2>
              <p className="text-xs sm:text-sm text-stone-400 font-light leading-relaxed">
                Begin curating your collection of timeless diamonds and fine Swiss horlogerie.
              </p>
            </div>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-gold-500 to-gold-600 text-obsidian font-serif font-semibold text-xs uppercase tracking-wider shadow-gold-sm hover:shadow-gold-md transition-all"
            >
              <span>Explore The Atelier</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Items Column */}
            <div className="lg:col-span-8 space-y-6">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="p-6 rounded-3xl glass-card border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
                >
                  <div className="flex items-center gap-6">
                    <img
                      src={item.product.primaryImage}
                      alt={item.product.name}
                      className="w-24 h-24 rounded-2xl object-cover border border-white/10 shrink-0"
                    />
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-gold-400">
                        {item.product.collection}
                      </span>
                      <Link to={`/product/${item.product.id}`}>
                        <h3 className="font-serif text-lg text-stone-100 hover:text-gold-300 transition-colors">
                          {item.product.name}
                        </h3>
                      </Link>
                      <p className="text-xs text-stone-400 font-mono">
                        {item.selectedMaterial}
                        {item.selectedSize ? ` · Size ${item.selectedSize}` : ''}
                      </p>
                      <div className="text-sm font-mono text-gold-300 pt-1">
                        ${item.product.price.toLocaleString()} each
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-6">
                    <div className="flex items-center border border-white/15 rounded-full bg-charcoal-900 px-3 py-1.5">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-2 text-stone-400 hover:text-stone-200 font-mono"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-3 text-xs font-mono text-stone-200 font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-2 text-stone-400 hover:text-stone-200 font-mono"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="text-right min-w-[100px]">
                      <div className="font-mono text-base text-gold-300 font-semibold">
                        ${(item.product.price * item.quantity).toLocaleString()}
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-stone-500 hover:text-rose-400 text-xs font-mono transition-colors flex items-center gap-1 mt-1 ml-auto"
                      >
                        <Trash2 className="w-3 h-3" />
                        <span>Remove</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {/* Gift Presentation Accordion */}
              <div className="p-6 rounded-3xl glass-card border border-white/10 space-y-3">
                <div
                  onClick={() => setIsGiftWrap(!isGiftWrap)}
                  className="flex items-center justify-between cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <Gift className="w-5 h-5 text-gold-400" />
                    <div>
                      <h4 className="font-serif text-sm text-stone-100">
                        Complimentary Lacquered Gift Box & Note
                      </h4>
                      <p className="text-xs text-stone-400">
                        Hand-sealed with gold sealing wax and velvet travel pouch.
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-gold-400 underline">
                    {isGiftWrap ? 'Close' : 'Include'}
                  </span>
                </div>

                {isGiftWrap && (
                  <div className="pt-3 border-t border-white/5 space-y-2">
                    <textarea
                      rows={3}
                      value={giftMessage}
                      onChange={(e) => setGiftMessage(e.target.value)}
                      placeholder="Write your personal gift message to be inscribed..."
                      className="w-full bg-charcoal-900 border border-white/10 rounded-2xl p-4 text-xs text-stone-200 placeholder:text-stone-500 focus:outline-none focus:border-gold-500/40"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Right Summary Column */}
            <div className="lg:col-span-4 space-y-6">
              <div className="p-8 rounded-3xl glass-panel border border-gold-500/25 space-y-6 sticky top-28">
                <h3 className="font-serif text-xl text-stone-100 border-b border-white/10 pb-4">
                  Order Summary
                </h3>

                {/* Promo Code */}
                <div>
                  {appliedPromo ? (
                    <div className="flex items-center justify-between p-3 rounded-2xl bg-gold-500/10 border border-gold-500/30 text-xs font-mono">
                      <span className="text-gold-300">
                        VIP Courtesy <strong>{appliedPromo.code}</strong> (-{appliedPromo.discountPercent}%)
                      </span>
                      <button
                        onClick={removePromo}
                        className="text-stone-400 hover:text-stone-100 underline text-[11px]"
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
                        placeholder="VIP Privilege Code"
                        className="flex-1 bg-charcoal-900 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-stone-200 placeholder:text-stone-500 focus:outline-none focus:border-gold-500/40 font-mono uppercase"
                      />
                      <button
                        type="submit"
                        className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-gold-300 text-xs font-mono uppercase tracking-wider transition-colors"
                      >
                        Apply
                      </button>
                    </form>
                  )}
                </div>

                {/* Calculation Details */}
                <div className="space-y-3 text-xs border-y border-white/10 py-4">
                  <div className="flex justify-between text-stone-400">
                    <span>Subtotal</span>
                    <span className="font-mono text-stone-200">
                      ${subtotal.toLocaleString()}
                    </span>
                  </div>

                  {appliedPromo && (
                    <div className="flex justify-between text-gold-400 font-mono">
                      <span>Privilege Discount ({appliedPromo.discountPercent}%)</span>
                      <span>-${discountAmount.toLocaleString()}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-stone-400">
                    <span>Armored Courier Delivery</span>
                    <span className="text-stone-200">
                      {isFreeShipping ? 'Complimentary' : '$120'}
                    </span>
                  </div>

                  <div className="flex justify-between text-stone-400">
                    <span>Customs Duties & Taxes</span>
                    <span className="text-stone-200 font-mono">Included</span>
                  </div>

                  <div className="pt-2 flex justify-between text-base font-serif text-stone-100 font-medium border-t border-white/5">
                    <span>Total Amount</span>
                    <span className="font-mono text-xl text-gold-300 font-semibold">
                      ${total.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Proceed Button */}
                <button
                  onClick={() => navigate('/checkout')}
                  className="w-full py-4 rounded-full bg-gradient-to-r from-gold-500 via-gold-400 to-gold-600 text-obsidian font-serif font-semibold text-xs uppercase tracking-widest shadow-gold-md hover:shadow-gold-lg hover:brightness-105 transition-all flex items-center justify-center gap-2"
                >
                  <span>Proceed to Armored Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="flex items-center justify-center gap-2 text-[11px] font-mono text-stone-400">
                  <ShieldCheck className="w-4 h-4 text-gold-400" />
                  <span>256-Bit Encrypted Swiss Transaction</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
