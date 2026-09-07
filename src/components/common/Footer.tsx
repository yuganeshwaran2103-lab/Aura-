import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, ShieldCheck, Gem, Compass, Clock } from 'lucide-react';
import { useStore } from '../../store/useStore';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const { addToast } = useStore();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      setSubscribed(true);
      addToast(
        'Welcome to the AURA Circle',
        'Your bespoke invitation code "AURA10" has been credited for 10% privilege.',
        'gold'
      );
      setEmail('');
    }
  };

  return (
    <footer className="bg-charcoal-950 border-t border-white/10 text-stone-300 relative overflow-hidden pt-20 pb-12">
      {/* Background Subtle Luxury Radiance */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-gold-500/5 blur-[120px] pointer-events-none" />

      {/* Brand Value Pillars */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 pb-16 border-b border-white/5">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-2xl glass-panel border border-gold-500/20 text-gold-400 shrink-0">
              <Gem className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif text-sm text-stone-100 uppercase tracking-wider">
                Ethical Provenance
              </h4>
              <p className="text-xs text-stone-400 mt-1 leading-relaxed">
                100% Conflict-free natural and certified lab-grown diamonds set in recycled gold.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 rounded-2xl glass-panel border border-gold-500/20 text-gold-400 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif text-sm text-stone-100 uppercase tracking-wider">
                Armored Delivery
              </h4>
              <p className="text-xs text-stone-400 mt-1 leading-relaxed">
                Discreet worldwide courier transit, fully insured door-to-door with signature release.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 rounded-2xl glass-panel border border-gold-500/20 text-gold-400 shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif text-sm text-stone-100 uppercase tracking-wider">
                Lifetime Atelier Care
              </h4>
              <p className="text-xs text-stone-400 mt-1 leading-relaxed">
                Annual ultrasonic cleaning, prong inspection, and complimentary first re-sizing.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 rounded-2xl glass-panel border border-gold-500/20 text-gold-400 shrink-0">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif text-sm text-stone-100 uppercase tracking-wider">
                Geneva Atelier
              </h4>
              <p className="text-xs text-stone-400 mt-1 leading-relaxed">
                Master gemsetters and horologists handcrafting each piece in Switzerland.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Newsletter */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-16 grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Brand Column */}
        <div className="lg:col-span-4 space-y-6">
          <Link to="/" className="inline-flex items-center gap-2.5">
            <svg className="w-6 h-6 text-gold-400" viewBox="0 0 100 100">
              <polygon points="50,5 95,35 75,95 25,95 5,35" fill="none" stroke="currentColor" strokeWidth="6" />
              <circle cx="50" cy="50" r="7" fill="#FFF4D0" />
            </svg>
            <span className="font-serif text-2xl tracking-[0.3em] font-light text-stone-100">
              AURA
            </span>
          </Link>
          <p className="text-xs text-stone-400 leading-relaxed font-sans max-w-sm">
            Forged at the intersection of cosmic wonder and Swiss haute joaillerie. Creating timeless, radiant pieces designed to transcend generations.
          </p>
          <div className="text-[11px] font-mono text-gold-400/80 tracking-wider">
            GENEVA · RUE DU RHÔNE 42 · +41 22 819 00 00
          </div>
        </div>

        {/* Links Columns */}
        <div className="lg:col-span-2 space-y-4">
          <h5 className="font-serif text-xs uppercase tracking-widest text-gold-300">
            Collections
          </h5>
          <ul className="space-y-2.5 text-xs text-stone-400">
            <li>
              <Link to="/shop?category=rings" className="hover:text-gold-300 transition-colors">
                Solitaire Rings
              </Link>
            </li>
            <li>
              <Link to="/shop?category=necklaces" className="hover:text-gold-300 transition-colors">
                Celestial Pendants
              </Link>
            </li>
            <li>
              <Link to="/shop?category=bracelets" className="hover:text-gold-300 transition-colors">
                Tennis Bracelets
              </Link>
            </li>
            <li>
              <Link to="/shop?category=earrings" className="hover:text-gold-300 transition-colors">
                Drop Earrings
              </Link>
            </li>
            <li>
              <Link to="/shop?category=watches" className="hover:text-gold-300 transition-colors">
                Haute Horlogerie
              </Link>
            </li>
          </ul>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <h5 className="font-serif text-xs uppercase tracking-widest text-gold-300">
            Client Services
          </h5>
          <ul className="space-y-2.5 text-xs text-stone-400">
            <li>
              <Link to="/about" className="hover:text-gold-300 transition-colors">
                The Geneva Maison
              </Link>
            </li>
            <li>
              <Link to="/shop" className="hover:text-gold-300 transition-colors">
                Bespoke Consultations
              </Link>
            </li>
            <li>
              <Link to="/wishlist" className="hover:text-gold-300 transition-colors">
                Curated Wishlist
              </Link>
            </li>
            <li>
              <span className="cursor-pointer hover:text-gold-300 transition-colors">
                Ring Sizing Guide
              </span>
            </li>
            <li>
              <span className="cursor-pointer hover:text-gold-300 transition-colors">
                Certificate Verification
              </span>
            </li>
          </ul>
        </div>

        {/* Newsletter Signup */}
        <div className="lg:col-span-4 space-y-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-gold-400" />
            <h5 className="font-serif text-xs uppercase tracking-widest text-gold-300">
              The AURA Private Circle
            </h5>
          </div>
          <p className="text-xs text-stone-400 leading-relaxed">
            Receive private exhibition invitations, secret salon releases, and a 10% welcome privilege on your first acquisition.
          </p>

          {subscribed ? (
            <div className="p-3.5 rounded-xl bg-gold-500/10 border border-gold-500/30 text-xs text-gold-300">
              Privilege granted. Use code <strong className="font-mono">AURA10</strong> during checkout.
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="flex items-center glass-panel border border-white/15 rounded-xl overflow-hidden focus-within:border-gold-500/50 transition-colors">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="flex-1 bg-transparent px-4 py-3 text-xs text-stone-200 placeholder:text-stone-500 focus:outline-none"
                />
                <button
                  type="submit"
                  className="px-4 py-3 bg-gold-500 hover:bg-gold-400 text-obsidian transition-colors font-medium text-xs flex items-center gap-1.5"
                  aria-label="Subscribe to newsletter"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              <p className="text-[10px] text-stone-500">
                By joining, you agree to receive discreet communications from AURA Maison.
              </p>
            </form>
          )}
        </div>
      </div>

      {/* Bottom Copyright & Legal */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-stone-500 gap-4">
        <div>
          © {new Date().getFullYear()} AURA Joaillerie S.A. All rights reserved.
        </div>
        <div className="flex items-center gap-6">
          <span className="hover:text-stone-400 cursor-pointer">Privacy Policy</span>
          <span className="hover:text-stone-400 cursor-pointer">Terms of Sale</span>
          <span className="hover:text-stone-400 cursor-pointer">Swiss Hallmark Cert #7842</span>
        </div>
      </div>
    </footer>
  );
};
