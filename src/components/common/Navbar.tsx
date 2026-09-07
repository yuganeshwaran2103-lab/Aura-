import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Heart, ShoppingBag, Menu, X, Sparkles } from 'lucide-react';
import { useStore } from '../../store/useStore';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const { cart, wishlist, setCartOpen, setSearchOpen } = useStore();

  const totalCartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const totalWishlistCount = wishlist.length;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { label: 'Shop', path: '/shop' },
    { label: 'Collections', path: '/collections' },
    { label: 'The Maison', path: '/about' },
  ];

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="bg-charcoal-950/90 border-b border-white/5 py-1.5 px-4 text-center text-[11px] tracking-widest uppercase font-mono text-stone-400">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <span className="hidden sm:inline-block text-gold-400/80">GENEVA · PARIS · NEW YORK</span>
          <span className="mx-auto flex items-center gap-1.5 text-stone-300">
            <Sparkles className="w-3 h-3 text-gold-400" />
            <span>Complimentary Insured Armored Courier & Bespoke Sizing</span>
          </span>
          <span className="hidden sm:inline-block text-stone-400">HAUTE JOAILLERIE</span>
        </div>
      </div>

      {/* Main Glassmorphic Navigation Bar */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'glass-panel shadow-2xl py-3 border-b border-gold-500/15'
            : 'bg-obsidian/70 backdrop-blur-md py-5 border-b border-white/[0.04]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
          {/* Left: Mobile Menu Toggle & Desktop Nav Links */}
          <div className="flex items-center gap-8">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-stone-300 hover:text-gold-300 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`text-xs uppercase tracking-[0.25em] font-sans transition-all relative py-1 ${
                      isActive
                        ? 'text-gold-300 font-medium'
                        : 'text-stone-300 hover:text-gold-300'
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold-400 to-transparent" />
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Center: Brand Monogram & Name */}
          <Link
            to="/"
            className="flex flex-col items-center group relative cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <svg className="w-6 h-6 text-gold-400 group-hover:rotate-45 transition-transform duration-500" viewBox="0 0 100 100">
                <polygon points="50,5 95,35 75,95 25,95 5,35" fill="none" stroke="currentColor" strokeWidth="6" />
                <polygon points="50,25 75,45 65,80 35,80 25,45" fill="currentColor" opacity="0.3" />
                <circle cx="50" cy="50" r="7" fill="#FFF4D0" />
              </svg>
              <span className="font-serif text-2xl sm:text-3xl tracking-[0.3em] font-light text-stone-100 group-hover:text-gold-200 transition-colors">
                AURA
              </span>
            </div>
            <span className="text-[8px] uppercase tracking-[0.4em] text-gold-400/80 font-mono -mt-1">
              GENEVA
            </span>
          </Link>

          {/* Right: Actions (Search, Wishlist, Bag) */}
          <div className="flex items-center gap-3 sm:gap-5">
            {/* Search Trigger */}
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 text-stone-300 hover:text-gold-300 transition-colors rounded-full hover:bg-white/5 flex items-center gap-2"
              aria-label="Search catalog"
            >
              <Search className="w-5 h-5" />
              <span className="hidden md:inline text-[11px] font-mono uppercase tracking-widest text-stone-400">
                Search
              </span>
            </button>

            {/* Wishlist Link */}
            <Link
              to="/wishlist"
              className="p-2 text-stone-300 hover:text-gold-300 transition-colors rounded-full hover:bg-white/5 relative"
              aria-label="Saved creations"
            >
              <Heart className="w-5 h-5" />
              {totalWishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-gold-500 text-obsidian text-[10px] font-mono font-bold rounded-full flex items-center justify-center shadow-gold-sm">
                  {totalWishlistCount}
                </span>
              )}
            </Link>

            {/* Bag / Cart Drawer Button */}
            <button
              onClick={() => setCartOpen(true)}
              className="p-2 text-stone-300 hover:text-gold-300 transition-colors rounded-full hover:bg-white/5 relative flex items-center gap-2"
              aria-label="Open Atelier Bag"
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5" />
                {totalCartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-gold-400 to-gold-600 text-obsidian text-[10px] font-mono font-bold rounded-full flex items-center justify-center shadow-gold-sm">
                    {totalCartCount}
                  </span>
                )}
              </div>
              <span className="hidden xl:inline text-xs font-serif text-stone-200">
                Bag
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden glass-panel border-t border-white/10 mt-3 p-6 space-y-4">
            <nav className="flex flex-col space-y-4">
              <Link
                to="/"
                className="text-sm uppercase tracking-widest text-stone-200 hover:text-gold-300 py-1"
              >
                Home
              </Link>
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-sm uppercase tracking-widest text-stone-200 hover:text-gold-300 py-1"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/wishlist"
                className="text-sm uppercase tracking-widest text-stone-200 hover:text-gold-300 py-1 flex items-center justify-between"
              >
                <span>Wishlist</span>
                <span className="text-xs font-mono text-gold-400">({totalWishlistCount})</span>
              </Link>
              <Link
                to="/cart"
                className="text-sm uppercase tracking-widest text-stone-200 hover:text-gold-300 py-1 flex items-center justify-between"
              >
                <span>Cart Overview</span>
                <span className="text-xs font-mono text-gold-400">({totalCartCount})</span>
              </Link>
            </nav>
            <div className="pt-4 border-t border-white/10 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setSearchOpen(true);
                }}
                className="w-full py-2.5 rounded-xl glass-card text-center text-xs uppercase tracking-widest text-stone-300 font-mono"
              >
                Search Creations
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
