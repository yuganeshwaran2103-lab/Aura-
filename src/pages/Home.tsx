import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Gem, Compass, ShieldCheck, ChevronDown, Check, Star } from 'lucide-react';
import { PRODUCTS, COLLECTIONS } from '../data/products';
import { ProductCard } from '../components/product/ProductCard';
import { JewelryCanvas } from '../components/3d/JewelryCanvas';
import { MaterialType } from '../types';

export const Home: React.FC = () => {
  const [selected3DMaterial, setSelected3DMaterial] = useState<MaterialType>('18K Yellow Gold');
  const [activeTab, setActiveTab] = useState<'all' | 'rings' | 'necklaces' | 'watches'>('all');

  const bestSellers = PRODUCTS.filter((p) => p.isBestSeller);
  const displayedBestSellers = activeTab === 'all'
    ? bestSellers.slice(0, 4)
    : bestSellers.filter((p) => p.category === activeTab).slice(0, 4);

  const scrollTo3D = () => {
    document.getElementById('3d-atelier-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-obsidian text-stone-200 overflow-hidden">
      {/* 1. CINEMATIC HERO SECTION */}
      <section className="relative min-h-[92vh] flex items-center justify-center pt-8 pb-20 px-6 sm:px-8">
        {/* Ambient Luxury Gradients */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(212,175,55,0.12)_0%,rgba(8,8,10,0.85)_60%,#08080A_100%)] pointer-events-none" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold-500/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-rose-gold/5 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          {/* Left Editorial Headline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="lg:col-span-7 space-y-6 text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border border-gold-500/30 text-gold-300 text-xs uppercase tracking-[0.3em] font-mono">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Haute Joaillerie · Genève</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl xl:text-7xl font-light text-stone-100 tracking-tight leading-[1.1]">
              TIMELESS. <br />
              <span className="text-gold-gradient font-normal italic">RADIANT.</span> <br />
              YOURS.
            </h1>

            <p className="text-sm sm:text-base text-stone-400 font-sans max-w-xl mx-auto lg:mx-0 leading-relaxed font-light">
              Forged at the threshold of astronomical wonder and Swiss horological precision. Explore bespoke diamond solitaires, cosmic opals, and sculptural gold crafted to outshine time.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link
                to="/shop"
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-gold-500 via-gold-400 to-gold-600 text-obsidian font-serif font-semibold text-xs uppercase tracking-[0.2em] shadow-gold-md hover:shadow-gold-lg hover:brightness-105 transition-all flex items-center justify-center gap-2 group"
              >
                <span>Explore Collection</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <button
                onClick={scrollTo3D}
                className="w-full sm:w-auto px-8 py-4 rounded-full glass-panel hover:border-gold-500/40 text-stone-200 hover:text-gold-300 font-mono text-xs uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2"
              >
                <Gem className="w-3.5 h-3.5 text-gold-400" />
                <span>3D Atelier</span>
              </button>
            </div>

            {/* Subtle Brand Metric Indicators */}
            <div className="pt-8 grid grid-cols-3 gap-6 border-t border-white/10 max-w-md mx-auto lg:mx-0 text-left">
              <div>
                <div className="font-serif text-xl sm:text-2xl text-gold-300 font-light">
                  100%
                </div>
                <div className="text-[10px] uppercase font-mono tracking-wider text-stone-500 mt-0.5">
                  Recycled 18K Gold
                </div>
              </div>
              <div>
                <div className="font-serif text-xl sm:text-2xl text-gold-300 font-light">
                  GIA / IGI
                </div>
                <div className="text-[10px] uppercase font-mono tracking-wider text-stone-500 mt-0.5">
                  Triple-Ex Certified
                </div>
              </div>
              <div>
                <div className="font-serif text-xl sm:text-2xl text-gold-300 font-light">
                  Geneva
                </div>
                <div className="text-[10px] uppercase font-mono tracking-wider text-stone-500 mt-0.5">
                  Master Setters
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Hero Visual Showcase (3D Interactive Ring) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative aspect-square w-full max-w-[500px] mx-auto">
              <JewelryCanvas
                material={selected3DMaterial}
                type="ring"
                fallbackImage="https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=1000"
              />
            </div>
          </motion.div>
        </div>

        {/* Bottom Scroll Indicator */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-stone-500 hover:text-gold-300 cursor-pointer transition-colors" onClick={scrollTo3D}>
          <span className="text-[9px] uppercase tracking-[0.3em] font-mono">Scroll</span>
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </div>
      </section>

      {/* 2. FEATURED COLLECTIONS EDITORIAL SHOWCASE */}
      <section className="py-24 px-6 sm:px-8 max-w-7xl mx-auto">
        <div className="text-center space-y-3 mb-16">
          <span className="text-xs uppercase tracking-[0.3em] font-mono text-gold-400">
            Curated Lines
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-stone-100 font-light">
            Haute Joaillerie Collections
          </h2>
          <div className="w-16 h-[1px] bg-gold-500/50 mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {COLLECTIONS.slice(0, 4).map((col, idx) => (
            <Link
              key={col.id}
              to={`/shop?collection=${col.id}`}
              className="group relative h-[440px] rounded-3xl overflow-hidden glass-card border border-white/10 flex flex-col justify-end p-6 hover:border-gold-500/40 transition-all duration-500"
            >
              {/* Background Image */}
              <img
                src={col.image}
                alt={col.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-75 group-hover:opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/40 to-transparent" />

              {/* Text Content */}
              <div className="relative z-10 space-y-2">
                <span className="text-[10px] uppercase font-mono tracking-widest text-gold-300">
                  {col.itemCount} Masterpieces
                </span>
                <h3 className="font-serif text-xl text-stone-100 group-hover:text-gold-200 transition-colors">
                  {col.name}
                </h3>
                <p className="text-xs text-stone-400 font-light line-clamp-2">
                  {col.tagline}
                </p>
                <div className="pt-2 flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-gold-400 group-hover:translate-x-1 transition-transform">
                  <span>Explore Series</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. INTERACTIVE 3D JEWELRY ATELIER SECTION */}
      <section
        id="3d-atelier-section"
        className="py-24 px-6 sm:px-8 bg-charcoal-950 border-y border-white/10 relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text & Controls */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel border border-gold-500/30 text-gold-300 text-xs uppercase tracking-widest font-mono">
              <Sparkles className="w-3.5 h-3.5 text-gold-400" />
              <span>Real-Time 3D Configurator</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl text-stone-100 font-light leading-tight">
              Mastery of Light, <br />
              <span className="text-gold-gradient italic">Form & Refraction.</span>
            </h2>

            <p className="text-sm text-stone-400 font-light leading-relaxed">
              Every AURA piece is engineered using 3D ray-tracing simulations to ensure maximum internal refraction and light return before our Geneva master jewelers begin hand-setting each facet.
            </p>

            {/* Material Finish Switcher */}
            <div className="space-y-3 pt-2">
              <label className="text-xs font-mono uppercase tracking-wider text-stone-400 block">
                Select Precious Alloy:
              </label>
              <div className="grid grid-cols-3 gap-3">
                {(['18K Yellow Gold', 'Platinum', '18K Rose Gold'] as MaterialType[]).map((mat) => (
                  <button
                    key={mat}
                    onClick={() => setSelected3DMaterial(mat)}
                    className={`py-3 px-2 rounded-xl text-xs font-mono transition-all text-center border ${
                      selected3DMaterial === mat
                        ? 'border-gold-400 bg-gold-500/15 text-gold-200 shadow-gold-sm'
                        : 'border-white/10 text-stone-400 hover:border-white/20 hover:text-stone-200'
                    }`}
                  >
                    {mat}
                  </button>
                ))}
              </div>
            </div>

            {/* Technical Highlights */}
            <div className="space-y-2.5 pt-4">
              <div className="flex items-center gap-3 text-xs text-stone-300">
                <Check className="w-4 h-4 text-gold-400 shrink-0" />
                <span>2.417 True Diamond Index of Refraction (IOR) Simulation</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-stone-300">
                <Check className="w-4 h-4 text-gold-400 shrink-0" />
                <span>Seamless 360° Orbit, Zoom & Micro-Facet Inspection</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-stone-300">
                <Check className="w-4 h-4 text-gold-400 shrink-0" />
                <span>Bespoke Hand-Finishing in Geneva Atelier</span>
              </div>
            </div>

            <div className="pt-4">
              <Link
                to="/product/aura-solstice-ring"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-gold-500 hover:bg-gold-400 text-obsidian font-serif text-xs uppercase tracking-widest font-semibold transition-all shadow-gold-sm"
              >
                <span>Customize Solstice Ring</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right 3D Interactive Canvas */}
          <div className="lg:col-span-7">
            <div className="w-full h-[520px] rounded-3xl overflow-hidden shadow-2xl border border-gold-500/20">
              <JewelryCanvas
                material={selected3DMaterial}
                type="ring"
                fallbackImage="https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=1000"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 4. BEST SELLERS / ICONIC CREATIONS */}
      <section className="py-24 px-6 sm:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3">
            <span className="text-xs uppercase tracking-[0.3em] font-mono text-gold-400">
              Iconic Pieces
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-stone-100 font-light">
              Acclaimed Masterpieces
            </h2>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 border-b border-white/10 pb-2">
            {[
              { id: 'all', label: 'All Curations' },
              { id: 'rings', label: 'Rings' },
              { id: 'necklaces', label: 'Necklaces' },
              { id: 'watches', label: 'Horlogerie' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all ${
                  activeTab === tab.id
                    ? 'bg-gold-500 text-obsidian font-semibold shadow-gold-sm'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayedBestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full glass-panel hover:border-gold-500/40 text-stone-200 hover:text-gold-300 font-mono text-xs uppercase tracking-[0.2em] transition-all"
          >
            <span>View Complete Catalog ({PRODUCTS.length} Pieces)</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* 5. BRAND STORY & GENEVA HERITAGE */}
      <section className="py-24 px-6 sm:px-8 bg-charcoal-950 border-t border-white/10 relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Editorial Image Trio */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <img
                src="https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&q=80&w=800"
                alt="Geneva Jeweler setting diamond"
                className="w-full h-64 object-cover rounded-2xl border border-white/10 shadow-lg"
              />
              <img
                src="https://images.unsplash.com/photo-1598560917505-59a3ad559071?auto=format&fit=crop&q=80&w=800"
                alt="Faceted diamond macro"
                className="w-full h-44 object-cover rounded-2xl border border-white/10 shadow-lg"
              />
            </div>
            <div className="pt-8">
              <img
                src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=800"
                alt="Watchmaker tourbillon"
                className="w-full h-96 object-cover rounded-2xl border border-white/10 shadow-lg"
              />
            </div>
          </div>

          {/* Editorial Content */}
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs uppercase tracking-[0.3em] font-mono text-gold-400">
              The AURA Maison
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-stone-100 font-light leading-snug">
              Born Under Geneva Skies. <br />
              <span className="text-gold-gradient italic">Crafted for Eternity.</span>
            </h2>
            <p className="text-sm text-stone-300 font-light leading-relaxed">
              Founded on the belief that modern fine jewelry should evoke the silent power of cosmic constellations. We select only the upper tenth of one percent of diamonds, combining centuries of traditional Swiss lapidary with avant-garde parametric geometries.
            </p>
            <p className="text-sm text-stone-400 font-light leading-relaxed">
              Every ring, necklace, and timepiece is serialized, registered in our Geneva ledger, and presented with a lifelong commitment to maintenance and bespoke sizing.
            </p>

            <div className="pt-4 flex items-center gap-6">
              <Link
                to="/about"
                className="px-6 py-3 rounded-full bg-gold-500/10 hover:bg-gold-500/20 text-gold-300 border border-gold-500/30 text-xs uppercase tracking-widest font-mono transition-all flex items-center gap-2"
              >
                <span>Read The Maison Story</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. ATELIER GALLERY MASONRY */}
      <section className="py-24 px-6 sm:px-8 max-w-7xl mx-auto">
        <div className="text-center space-y-3 mb-16">
          <span className="text-xs uppercase tracking-[0.3em] font-mono text-gold-400">
            Visual Anthology
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-stone-100 font-light">
            The World of AURA
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="rounded-2xl overflow-hidden aspect-[3/4] border border-white/10 group relative">
            <img
              src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=800"
              alt="Diamond necklace"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="rounded-2xl overflow-hidden aspect-[3/4] border border-white/10 group relative">
            <img
              src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=800"
              alt="Diamond ring macro"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="rounded-2xl overflow-hidden aspect-[3/4] border border-white/10 group relative">
            <img
              src="https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&q=80&w=800"
              alt="Luxury horlogerie"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="rounded-2xl overflow-hidden aspect-[3/4] border border-white/10 group relative">
            <img
              src="https://images.unsplash.com/photo-1611591475836-8c433c6ce090?auto=format&fit=crop&q=80&w=800"
              alt="Gold tennis bracelet"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
      </section>
    </div>
  );
};
