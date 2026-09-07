import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, ShieldCheck, Gem, Compass, Award } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-obsidian text-stone-200 pt-8 pb-24 px-6 sm:px-8">
      {/* Hero Section */}
      <section className="max-w-5xl mx-auto text-center space-y-6 pt-12 pb-20">
        <span className="text-xs uppercase tracking-[0.3em] font-mono text-gold-400">
          Maison Fondée à Genève
        </span>
        <h1 className="font-serif text-4xl sm:text-6xl text-stone-100 font-light leading-tight">
          Where Astronomy Meets <br />
          <span className="text-gold-gradient italic">Swiss Haute Joaillerie</span>
        </h1>
        <p className="text-sm sm:text-base text-stone-400 font-light max-w-2xl mx-auto leading-relaxed">
          AURA was established with a singular conviction: fine jewelry should embody both the ancient romance of starlight and the radical precision of futuristic engineering.
        </p>
      </section>

      {/* Atelier Photography Split */}
      <section className="max-w-7xl mx-auto mb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden glass-panel border border-white/10 shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&q=80&w=1200"
              alt="Geneva Master Jeweler"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian/80 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 text-xs font-mono text-gold-300 uppercase tracking-widest">
              Rue du Rhône Atelier · Geneva
            </div>
          </div>

          <div className="space-y-6 md:pl-6">
            <span className="text-xs uppercase tracking-[0.25em] font-mono text-gold-400">
              The Philosophy
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-stone-100 font-light leading-snug">
              Sculpting Light With Mathematical Purity
            </h2>
            <p className="text-xs sm:text-sm text-stone-300 font-light leading-relaxed">
              Traditional jewelry often leaves light behind. At AURA, each ring setting is modeled in custom algorithmic environments to measure exact photon bounce angles within the gemstone pavilion.
            </p>
            <p className="text-xs sm:text-sm text-stone-400 font-light leading-relaxed">
              Once modeled, the pieces are hand-cast from certified fairmined and recycled 18K gold in our Geneva workshops, then entrusted to setters with over thirty years of heritage at the highest echelons of Swiss high jewelry.
            </p>

            <div className="pt-2 grid grid-cols-2 gap-4 border-t border-white/10">
              <div>
                <div className="font-serif text-2xl text-gold-300">100%</div>
                <div className="text-[11px] font-mono text-stone-400">Recycled Precious Alloys</div>
              </div>
              <div>
                <div className="font-serif text-2xl text-gold-300">Zero</div>
                <div className="text-[11px] font-mono text-stone-400">Conflict Gemstones</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Three Pillars */}
      <section className="max-w-7xl mx-auto py-16 border-y border-white/10 mb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-3xl glass-card space-y-4">
            <Gem className="w-8 h-8 text-gold-400" />
            <h3 className="font-serif text-xl text-stone-100">
              Rare Diamond Curation
            </h3>
            <p className="text-xs text-stone-400 leading-relaxed font-light">
              We exclusively source diamonds in the D–F color spectrum with clarity grades of VVS or above. Every diamond is accompanied by original laser-inscribed GIA or IGI laboratory records.
            </p>
          </div>

          <div className="p-8 rounded-3xl glass-card space-y-4">
            <Compass className="w-8 h-8 text-gold-400" />
            <h3 className="font-serif text-xl text-stone-100">
              Parametric Architecture
            </h3>
            <p className="text-xs text-stone-400 leading-relaxed font-light">
              Our designs eliminate excessive weight while bolstering structural integrity. Cathedral shanks and hidden halos are engineered for maximum durability and effortless ergonomic comfort.
            </p>
          </div>

          <div className="p-8 rounded-3xl glass-card space-y-4">
            <Award className="w-8 h-8 text-gold-400" />
            <h3 className="font-serif text-xl text-stone-100">
              Bespoke Geneva Heritage
            </h3>
            <p className="text-xs text-stone-400 leading-relaxed font-light">
              Every client order is recorded in our permanent register, accompanied by lifetime complimentary inspection, ultrasonic revitalization, and bespoke resizing privileges.
            </p>
          </div>
        </div>
      </section>

      {/* Editorial Press Quotes */}
      <section className="max-w-4xl mx-auto text-center space-y-12 mb-24">
        <span className="text-xs uppercase tracking-[0.3em] font-mono text-gold-400">
          Critical Acclaim
        </span>

        <div className="space-y-6">
          <blockquote className="font-serif text-2xl sm:text-3xl text-stone-200 font-light italic leading-relaxed">
            "AURA is redefining high joaillerie for the 21st century—blending interstellar aesthetics with the uncompromising rigor of Swiss watchmaking."
          </blockquote>
          <div className="font-mono text-xs uppercase tracking-widest text-gold-400">
            — The Financial Times · How To Spend It
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 pt-8 border-t border-white/10 opacity-70 font-serif text-sm tracking-widest uppercase text-stone-400">
          <div>VOGUE LUXURY</div>
          <div>ROBB REPORT</div>
          <div>GQ INTERNATIONAL</div>
          <div>HARPER’S BAZAAR</div>
        </div>
      </section>

      {/* Private Concierge CTA */}
      <section className="max-w-5xl mx-auto rounded-3xl p-10 sm:p-14 glass-panel border border-gold-500/30 text-center space-y-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/10 rounded-full blur-[90px] pointer-events-none" />

        <Sparkles className="w-6 h-6 text-gold-400 mx-auto" />
        <h2 className="font-serif text-3xl sm:text-4xl text-stone-100 font-light">
          Book a Private Geneva or Virtual Viewing
        </h2>
        <p className="text-xs sm:text-sm text-stone-300 max-w-lg mx-auto font-light leading-relaxed">
          Our senior jewelry curators are available for one-on-one virtual consultations or private salon appointments in Geneva, Paris, and New York.
        </p>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/shop"
            className="px-8 py-3.5 rounded-full bg-gradient-to-r from-gold-500 to-gold-600 text-obsidian font-serif font-semibold text-xs uppercase tracking-wider shadow-gold-sm hover:shadow-gold-md transition-all"
          >
            Explore The Pieces
          </Link>
          <a
            href="mailto:concierge@aura-joaillerie.ch"
            className="px-8 py-3.5 rounded-full glass-card border border-white/20 text-stone-200 hover:text-gold-300 text-xs font-mono uppercase tracking-wider transition-all"
          >
            Contact Salon Concierge
          </a>
        </div>
      </section>
    </div>
  );
};
