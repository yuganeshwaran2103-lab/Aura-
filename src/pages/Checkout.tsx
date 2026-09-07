import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';
import {
  ShieldCheck,
  CreditCard,
  Lock,
  Truck,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Gem,
  Building,
  Smartphone,
} from 'lucide-react';
import { useStore } from '../store/useStore';

export const Checkout: React.FC = () => {
  const { cart, clearCart, appliedPromo, addToast } = useStore();
  const navigate = useNavigate();

  // Step state: 1 = Details, 2 = Completed
  const [step, setStep] = useState<1 | 2>(1);
  const [orderNumber, setOrderNumber] = useState('');

  // Form Fields
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('Switzerland');
  const [postalCode, setPostalCode] = useState('');

  // Payment Options
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'apple' | 'wire' | 'klarna'>('card');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');

  // Shipping
  const [shippingMethod, setShippingMethod] = useState<'standard' | 'express'>('standard');

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discountAmount = appliedPromo ? (subtotal * appliedPromo.discountPercent) / 100 : 0;
  const courierFee = shippingMethod === 'express' ? 250 : 0;
  const total = Math.max(0, subtotal - discountAmount + courierFee);

  // Demo Autofill for seamless testing
  const handleDemoFill = () => {
    setFirstName('Lady Genevieve');
    setLastName('Vance');
    setEmail('genevieve.vance@geneve-haute.ch');
    setPhone('+41 22 819 45 20');
    setAddress('Quai du Général-Guisan 12');
    setCity('Geneva');
    setCountry('Switzerland');
    setPostalCode('1204');
    setCardNumber('4532 •••• •••• 8842');
    setCardExpiry('08/29');
    setCardCvc('382');
    addToast('Demo Credentials Loaded', 'Sample collector details populated for fast testing.', 'gold');
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (cart.length === 0) {
      addToast('Atelier Bag is Empty', 'Please add creations to your bag before checkout.', 'info');
      navigate('/shop');
      return;
    }

    const generatedOrderNumber = `AU-${new Date().getFullYear()}-${Math.floor(
      10000 + Math.random() * 90000
    )}`;
    setOrderNumber(generatedOrderNumber);
    setStep(2);

    // Trigger golden celebratory confetti
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#D4AF37', '#FFF4D0', '#E5E4E2', '#B89228'],
    });

    clearCart();
    addToast(
      'Acquisition Confirmed',
      `Order ${generatedOrderNumber} has been recorded in the Geneva register.`,
      'gold'
    );
  };

  if (step === 2) {
    return (
      <div className="min-h-screen bg-obsidian text-stone-200 pt-16 pb-24 px-6 sm:px-8 flex items-center justify-center">
        <div className="max-w-2xl w-full p-8 sm:p-12 rounded-3xl glass-panel border border-gold-500/40 shadow-2xl text-center space-y-6 relative overflow-hidden">
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-72 h-72 bg-gold-500/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="w-20 h-20 rounded-full bg-gold-500/15 border border-gold-500/40 text-gold-300 flex items-center justify-center mx-auto shadow-gold-sm">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <span className="text-xs uppercase font-mono tracking-[0.3em] text-gold-400">
              Acquisition Confirmed
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl text-stone-100 font-light">
              Thank You, {firstName || 'Distinguished Collector'}
            </h1>
            <p className="text-xs sm:text-sm text-stone-400 font-light max-w-md mx-auto leading-relaxed">
              Your order has been formally inscribed into the AURA Geneva Registry under dossier number:
            </p>
            <div className="text-xl sm:text-2xl font-mono text-gold-300 tracking-wider font-semibold py-2">
              {orderNumber}
            </div>
          </div>

          <div className="p-6 rounded-2xl glass-card border border-white/10 text-left space-y-3 text-xs font-mono">
            <div className="flex justify-between border-b border-white/5 pb-2">
              <span className="text-stone-500">Destination</span>
              <span className="text-stone-200">
                {address}, {city}, {country}
              </span>
            </div>
            <div className="flex justify-between border-b border-white/5 pb-2">
              <span className="text-stone-500">Courier Service</span>
              <span className="text-stone-200">
                {shippingMethod === 'express'
                  ? 'Armored Vault Express (24-48 Hours)'
                  : 'Complimentary Insured Armored Courier (3-5 Days)'}
              </span>
            </div>
            <div className="flex justify-between border-b border-white/5 pb-2">
              <span className="text-stone-500">Security Seal</span>
              <span className="text-gold-400">Swiss Wax Seal #84910</span>
            </div>
            <div className="flex justify-between pt-1">
              <span className="text-stone-500">Total Transacted</span>
              <span className="text-gold-300 font-semibold">${total.toLocaleString()} USD</span>
            </div>
          </div>

          <p className="text-xs text-stone-400 font-light leading-relaxed">
            A confirmation dossier and direct link to real-time armored satellite tracking has been transmitted to <strong className="text-stone-200">{email || 'your email address'}</strong>.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/"
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gold-500 text-obsidian font-serif font-semibold text-xs uppercase tracking-wider shadow-gold-sm hover:brightness-105 transition-all"
            >
              Return to Maison
            </Link>
            <Link
              to="/shop"
              className="w-full sm:w-auto px-8 py-3.5 rounded-full glass-card border border-white/20 text-stone-300 hover:text-gold-300 text-xs font-mono uppercase tracking-wider transition-all"
            >
              Explore Other Pieces
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-obsidian text-stone-200 pt-8 pb-24 px-6 sm:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-8 border-b border-white/10 mb-12 gap-4">
          <div>
            <span className="text-xs uppercase font-mono tracking-[0.3em] text-gold-400 block mb-2">
              Encrypted Checkout
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl text-stone-100 font-light">
              Armored Acquisition
            </h1>
          </div>

          {/* Quick Demo Fill Button */}
          <button
            type="button"
            onClick={handleDemoFill}
            className="px-4 py-2 rounded-full glass-panel border border-gold-500/30 text-gold-300 hover:text-gold-100 text-xs font-mono uppercase tracking-wider flex items-center gap-2 self-start sm:self-auto"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Fast Demo Auto-Fill</span>
          </button>
        </div>

        <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Checkout Inputs */}
          <div className="lg:col-span-8 space-y-10">
            {/* 1. Client Identity & Destination */}
            <div className="p-8 rounded-3xl glass-panel border border-white/10 space-y-6">
              <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                <span className="w-7 h-7 rounded-full bg-gold-500/20 text-gold-300 font-mono text-xs flex items-center justify-center font-bold">
                  1
                </span>
                <h2 className="font-serif text-xl text-stone-100">
                  Recipient & Armored Delivery Address
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-mono uppercase tracking-wider text-stone-400 block mb-1.5">
                    First Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Genevieve"
                    className="w-full bg-charcoal-900 border border-white/10 rounded-xl px-4 py-3 text-xs text-stone-200 placeholder:text-stone-600 focus:outline-none focus:border-gold-500/50"
                  />
                </div>
                <div>
                  <label className="text-xs font-mono uppercase tracking-wider text-stone-400 block mb-1.5">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Vance"
                    className="w-full bg-charcoal-900 border border-white/10 rounded-xl px-4 py-3 text-xs text-stone-200 placeholder:text-stone-600 focus:outline-none focus:border-gold-500/50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-mono uppercase tracking-wider text-stone-400 block mb-1.5">
                    Private Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="client@haute.com"
                    className="w-full bg-charcoal-900 border border-white/10 rounded-xl px-4 py-3 text-xs text-stone-200 placeholder:text-stone-600 focus:outline-none focus:border-gold-500/50"
                  />
                </div>
                <div>
                  <label className="text-xs font-mono uppercase tracking-wider text-stone-400 block mb-1.5">
                    Telephone (For Courier Release) *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+41 22 819 00 00"
                    className="w-full bg-charcoal-900 border border-white/10 rounded-xl px-4 py-3 text-xs text-stone-200 placeholder:text-stone-600 focus:outline-none focus:border-gold-500/50"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-mono uppercase tracking-wider text-stone-400 block mb-1.5">
                  Street Address / Private Residence *
                </label>
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Quai du Général-Guisan 12, Penthouse B"
                  className="w-full bg-charcoal-900 border border-white/10 rounded-xl px-4 py-3 text-xs text-stone-200 placeholder:text-stone-600 focus:outline-none focus:border-gold-500/50"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-mono uppercase tracking-wider text-stone-400 block mb-1.5">
                    City *
                  </label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Geneva"
                    className="w-full bg-charcoal-900 border border-white/10 rounded-xl px-4 py-3 text-xs text-stone-200 placeholder:text-stone-600 focus:outline-none focus:border-gold-500/50"
                  />
                </div>
                <div>
                  <label className="text-xs font-mono uppercase tracking-wider text-stone-400 block mb-1.5">
                    Country *
                  </label>
                  <input
                    type="text"
                    required
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    placeholder="Switzerland"
                    className="w-full bg-charcoal-900 border border-white/10 rounded-xl px-4 py-3 text-xs text-stone-200 placeholder:text-stone-600 focus:outline-none focus:border-gold-500/50"
                  />
                </div>
                <div>
                  <label className="text-xs font-mono uppercase tracking-wider text-stone-400 block mb-1.5">
                    Postal Code *
                  </label>
                  <input
                    type="text"
                    required
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    placeholder="1204"
                    className="w-full bg-charcoal-900 border border-white/10 rounded-xl px-4 py-3 text-xs text-stone-200 placeholder:text-stone-600 focus:outline-none focus:border-gold-500/50"
                  />
                </div>
              </div>
            </div>

            {/* 2. Armored Courier Shipping Speed */}
            <div className="p-8 rounded-3xl glass-panel border border-white/10 space-y-4">
              <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                <span className="w-7 h-7 rounded-full bg-gold-500/20 text-gold-300 font-mono text-xs flex items-center justify-center font-bold">
                  2
                </span>
                <h2 className="font-serif text-xl text-stone-100">
                  Transit Method
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label
                  onClick={() => setShippingMethod('standard')}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-start justify-between ${
                    shippingMethod === 'standard'
                      ? 'border-gold-400 bg-gold-500/10'
                      : 'border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="font-serif text-sm text-stone-100">
                      Complimentary Armored Courier
                    </div>
                    <div className="text-xs text-stone-400">
                      Discreet transit with white-glove signature delivery (3–5 Business Days).
                    </div>
                  </div>
                  <span className="text-xs font-mono text-gold-300 font-semibold">
                    Free
                  </span>
                </label>

                <label
                  onClick={() => setShippingMethod('express')}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-start justify-between ${
                    shippingMethod === 'express'
                      ? 'border-gold-400 bg-gold-500/10'
                      : 'border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="font-serif text-sm text-stone-100">
                      Priority Armored Vault Express
                    </div>
                    <div className="text-xs text-stone-400">
                      Dedicated armored transport vehicle & immediate dispatch (24–48 Hours).
                    </div>
                  </div>
                  <span className="text-xs font-mono text-gold-300 font-semibold">
                    +$250
                  </span>
                </label>
              </div>
            </div>

            {/* 3. Payment Protocol */}
            <div className="p-8 rounded-3xl glass-panel border border-white/10 space-y-6">
              <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                <span className="w-7 h-7 rounded-full bg-gold-500/20 text-gold-300 font-mono text-xs flex items-center justify-center font-bold">
                  3
                </span>
                <h2 className="font-serif text-xl text-stone-100">
                  Secure Settlement Protocol
                </h2>
              </div>

              {/* Payment Type Selector */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { id: 'card', label: 'Credit Card', icon: CreditCard },
                  { id: 'apple', label: 'Apple Pay', icon: Smartphone },
                  { id: 'wire', label: 'Swiss Wire', icon: Building },
                  { id: 'klarna', label: 'Klarna Pay', icon: Gem },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      type="button"
                      key={item.id}
                      onClick={() => setPaymentMethod(item.id as any)}
                      className={`p-3.5 rounded-2xl border text-center transition-all flex flex-col items-center gap-2 ${
                        paymentMethod === item.id
                          ? 'border-gold-400 bg-gold-500/15 text-gold-200 shadow-gold-sm'
                          : 'border-white/10 text-stone-400 hover:border-white/20'
                      }`}
                    >
                      <Icon className="w-5 h-5 text-gold-400" />
                      <span className="text-xs font-mono">{item.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Credit Card Inputs */}
              {paymentMethod === 'card' && (
                <div className="space-y-4 pt-2">
                  <div>
                    <label className="text-xs font-mono uppercase tracking-wider text-stone-400 block mb-1.5">
                      Card Number
                    </label>
                    <div className="relative">
                      <CreditCard className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-500" />
                      <input
                        type="text"
                        required
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        placeholder="•••• •••• •••• ••••"
                        className="w-full bg-charcoal-900 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-xs font-mono text-stone-200 placeholder:text-stone-600 focus:outline-none focus:border-gold-500/50"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-mono uppercase tracking-wider text-stone-400 block mb-1.5">
                        Expiration Date
                      </label>
                      <input
                        type="text"
                        required
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        placeholder="MM / YY"
                        className="w-full bg-charcoal-900 border border-white/10 rounded-xl px-4 py-3 text-xs font-mono text-stone-200 placeholder:text-stone-600 focus:outline-none focus:border-gold-500/50"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-mono uppercase tracking-wider text-stone-400 block mb-1.5">
                        Security Code (CVC)
                      </label>
                      <input
                        type="text"
                        required
                        value={cardCvc}
                        onChange={(e) => setCardCvc(e.target.value)}
                        placeholder="•••"
                        maxLength={4}
                        className="w-full bg-charcoal-900 border border-white/10 rounded-xl px-4 py-3 text-xs font-mono text-stone-200 placeholder:text-stone-600 focus:outline-none focus:border-gold-500/50"
                      />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === 'apple' && (
                <div className="p-4 rounded-2xl bg-charcoal-900 border border-white/10 text-center space-y-2">
                  <p className="text-xs text-stone-300">
                    Touch ID / Face ID authentication will be requested upon order submission.
                  </p>
                </div>
              )}

              {paymentMethod === 'wire' && (
                <div className="p-4 rounded-2xl bg-charcoal-900 border border-white/10 space-y-2 text-xs font-mono">
                  <div className="text-gold-300 font-semibold">Bank Lombard Odier & Cie SA, Geneva</div>
                  <div className="text-stone-400">IBAN: CH93 0081 2000 1928 4102 9</div>
                  <div className="text-stone-400">BIC / SWIFT: LOCHCHGGXXX</div>
                </div>
              )}

              {paymentMethod === 'klarna' && (
                <div className="p-4 rounded-2xl bg-charcoal-900 border border-white/10 text-center space-y-2 text-xs">
                  <p className="text-stone-300">
                    Split into 4 interest-free payments of ${(total / 4).toFixed(0)} USD every 2 weeks.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Right Order Review Summary */}
          <div className="lg:col-span-4 space-y-6">
            <div className="p-8 rounded-3xl glass-panel border border-gold-500/30 sticky top-28 space-y-6">
              <h3 className="font-serif text-xl text-stone-100 border-b border-white/10 pb-4">
                Atelier Review ({cart.reduce((s, i) => s + i.quantity, 0)})
              </h3>

              {/* Line items mini-list */}
              <div className="space-y-4 max-h-60 overflow-y-auto pr-1">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-3 items-center">
                    <img
                      src={item.product.primaryImage}
                      alt={item.product.name}
                      className="w-14 h-14 rounded-xl object-cover border border-white/10 shrink-0"
                    />
                    <div className="overflow-hidden flex-1">
                      <h5 className="font-serif text-xs text-stone-100 truncate">
                        {item.product.name}
                      </h5>
                      <span className="text-[10px] font-mono text-stone-400 block">
                        {item.selectedMaterial} · Qty {item.quantity}
                      </span>
                      <span className="text-xs font-mono text-gold-300">
                        ${(item.product.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Breakdown */}
              <div className="space-y-2.5 text-xs border-t border-white/10 pt-4">
                <div className="flex justify-between text-stone-400">
                  <span>Subtotal</span>
                  <span className="font-mono text-stone-200">
                    ${subtotal.toLocaleString()}
                  </span>
                </div>

                {appliedPromo && (
                  <div className="flex justify-between text-gold-400 font-mono">
                    <span>VIP Privilege ({appliedPromo.code})</span>
                    <span>-${discountAmount.toLocaleString()}</span>
                  </div>
                )}

                <div className="flex justify-between text-stone-400">
                  <span>Transit Service</span>
                  <span className="text-stone-200">
                    {courierFee === 0 ? 'Complimentary' : `$${courierFee}`}
                  </span>
                </div>

                <div className="flex justify-between text-stone-400">
                  <span>Swiss Duties & Insurance</span>
                  <span className="text-stone-200 font-mono">Included</span>
                </div>

                <div className="pt-3 border-t border-white/10 flex justify-between text-base font-serif text-stone-100 font-medium">
                  <span>Total Amount</span>
                  <span className="font-mono text-xl text-gold-300 font-semibold">
                    ${total.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full py-4 rounded-full bg-gradient-to-r from-gold-500 via-gold-400 to-gold-600 text-obsidian font-serif font-semibold text-xs uppercase tracking-widest shadow-gold-md hover:shadow-gold-lg hover:brightness-105 transition-all flex items-center justify-center gap-2"
              >
                <Lock className="w-4 h-4" />
                <span>Authorize Acquisition · ${total.toLocaleString()}</span>
              </button>

              <div className="text-[10px] text-center text-stone-500 space-y-1">
                <p>Armored delivery requires government ID signature upon arrival.</p>
                <p className="font-mono text-gold-400/80">
                  Protected by Swiss Banking Secrecy & TLS 1.3
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
