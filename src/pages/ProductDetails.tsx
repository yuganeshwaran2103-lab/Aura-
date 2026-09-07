import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Star,
  Heart,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  Gem,
  Truck,
  RotateCcw,
  Sparkles,
  ChevronDown,
  CheckCircle2,
  Ruler,
  X,
} from 'lucide-react';
import { PRODUCTS, SAMPLE_REVIEWS } from '../data/products';
import { JewelryCanvas } from '../components/3d/JewelryCanvas';
import { ProductCard } from '../components/product/ProductCard';
import { useStore } from '../store/useStore';
import { MaterialType, Review } from '../types';

export const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const product = PRODUCTS.find((p) => p.id === id) || PRODUCTS[0];

  const { addToCart, toggleWishlist, isInWishlist, addToast } = useStore();

  // Selected State
  const [selectedMaterial, setSelectedMaterial] = useState<MaterialType>(
    product.availableMaterials[0]
  );
  const [selectedSize, setSelectedSize] = useState<string>(
    product.availableSizes?.[0] || 'Default'
  );
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(product.primaryImage);
  const [activeAccordion, setActiveAccordion] = useState<'specs' | 'story' | 'shipping' | null>(
    'specs'
  );
  const [viewMode, setViewMode] = useState<'3d' | 'photo'>('3d');
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [reviews, setReviews] = useState<Review[]>(SAMPLE_REVIEWS);
  const [showReviewModal, setShowReviewModal] = useState(false);

  // New review form
  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewTitle, setNewReviewTitle] = useState('');
  const [newReviewComment, setNewReviewComment] = useState('');

  // Scroll to top on product change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setSelectedMaterial(product.availableMaterials[0]);
    setSelectedSize(product.availableSizes?.[0] || 'Default');
    setActiveImage(product.primaryImage);
  }, [id, product]);

  const isFavorited = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, selectedMaterial, selectedSize, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedMaterial, selectedSize, quantity);
    navigate('/checkout');
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewAuthor || !newReviewTitle || !newReviewComment) return;

    const review: Review = {
      id: `rev-${Date.now()}`,
      author: newReviewAuthor,
      rating: newReviewRating,
      date: 'Just now',
      title: newReviewTitle,
      comment: newReviewComment,
      verified: true,
    };

    setReviews([review, ...reviews]);
    setShowReviewModal(false);
    setNewReviewAuthor('');
    setNewReviewTitle('');
    setNewReviewComment('');
    addToast('Review Submitted', 'Thank you for sharing your experience with AURA.', 'gold');
  };

  // Related products
  const relatedProducts = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 3);

  return (
    <div className="min-h-screen bg-obsidian text-stone-200 pt-6 pb-24 px-6 sm:px-8">
      {/* Breadcrumb Navigation */}
      <nav className="max-w-7xl mx-auto mb-8 flex items-center gap-2 text-xs font-mono text-stone-500 uppercase tracking-widest">
        <Link to="/" className="hover:text-gold-300 transition-colors">
          Maison
        </Link>
        <span>/</span>
        <Link to="/shop" className="hover:text-gold-300 transition-colors">
          Atelier
        </Link>
        <span>/</span>
        <Link
          to={`/shop?category=${product.category}`}
          className="hover:text-gold-300 transition-colors"
        >
          {product.category}
        </Link>
        <span>/</span>
        <span className="text-gold-400 font-medium truncate">{product.name}</span>
      </nav>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* LEFT COLUMN: INTERACTIVE 3D VIEWER & GALLERY */}
        <div className="lg:col-span-7 space-y-6">
          {/* Main Visual Display */}
          <div className="relative aspect-square w-full rounded-3xl overflow-hidden glass-panel border border-white/10 shadow-2xl">
            {viewMode === '3d' ? (
              <JewelryCanvas
                material={selectedMaterial}
                type={product.threeDType || 'ring'}
                fallbackImage={activeImage}
              />
            ) : (
              <div className="w-full h-full p-8 flex items-center justify-center bg-charcoal-950">
                <img
                  src={activeImage}
                  alt={product.name}
                  className="max-h-full max-w-full object-contain drop-shadow-[0_25px_40px_rgba(212,175,55,0.15)]"
                />
              </div>
            )}

            {/* Mode Switcher Buttons */}
            <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
              <button
                onClick={() => setViewMode('3d')}
                className={`px-3 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all flex items-center gap-1.5 ${
                  viewMode === '3d'
                    ? 'bg-gold-500 text-obsidian font-semibold shadow-gold-sm'
                    : 'glass-panel text-stone-400 hover:text-stone-200 border border-white/10'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>3D Atelier</span>
              </button>
              <button
                onClick={() => setViewMode('photo')}
                className={`px-3 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all ${
                  viewMode === 'photo'
                    ? 'bg-gold-500 text-obsidian font-semibold shadow-gold-sm'
                    : 'glass-panel text-stone-400 hover:text-stone-200 border border-white/10'
                }`}
              >
                Studio Photos
              </button>
            </div>
          </div>

          {/* Gallery Thumbnails */}
          {product.gallery && product.gallery.length > 0 && (
            <div className="grid grid-cols-4 gap-4">
              {product.gallery.map((img, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setActiveImage(img);
                    setViewMode('photo');
                  }}
                  className={`aspect-square rounded-2xl overflow-hidden border transition-all ${
                    activeImage === img && viewMode === 'photo'
                      ? 'border-gold-400 ring-2 ring-gold-500/30'
                      : 'border-white/10 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="Product view" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: PRODUCT DETAILS & CONFIGURATION */}
        <div className="lg:col-span-5 space-y-8">
          {/* Header Info */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase font-mono tracking-[0.25em] text-gold-400 font-semibold">
                {product.collection} · {product.category}
              </span>
              <div className="flex items-center gap-1.5 text-xs font-mono text-gold-300">
                <Star className="w-3.5 h-3.5 fill-gold-400 text-gold-400" />
                <span>{product.rating.toFixed(2)}</span>
                <span className="text-stone-500 underline cursor-pointer">
                  ({reviews.length} reviews)
                </span>
              </div>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl text-stone-100 font-light leading-tight">
              {product.name}
            </h1>
            <p className="text-sm text-stone-400 font-light">
              {product.subtitle}
            </p>

            <div className="pt-2 flex items-baseline gap-4">
              <span className="font-mono text-3xl text-gold-300 font-medium">
                ${product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <span className="font-mono text-base line-through text-stone-500">
                  ${product.originalPrice.toLocaleString()}
                </span>
              )}
              <span className="text-[11px] font-mono text-stone-400 uppercase">
                USD · Duty Included
              </span>
            </div>

            <div className="p-3 rounded-xl glass-card border border-white/10 text-xs text-stone-400 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-gold-400 shrink-0" />
              <span>
                Complimentary armored delivery or 4 payments of ${(product.price / 4).toFixed(0)} with Klarna.
              </span>
            </div>
          </div>

          {/* 1. Precious Metal Selector */}
          <div className="space-y-3 pt-2">
            <div className="flex justify-between items-center text-xs font-mono uppercase tracking-wider">
              <span className="text-stone-400">Precious Metal Alloy</span>
              <span className="text-gold-300 font-medium">{selectedMaterial}</span>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {product.availableMaterials.map((mat) => (
                <button
                  key={mat}
                  onClick={() => setSelectedMaterial(mat)}
                  className={`py-3 px-2 rounded-2xl text-xs font-mono transition-all text-center border ${
                    selectedMaterial === mat
                      ? 'border-gold-400 bg-gold-500/15 text-gold-200 shadow-gold-sm'
                      : 'border-white/10 text-stone-400 hover:border-white/20'
                  }`}
                >
                  {mat}
                </button>
              ))}
            </div>
          </div>

          {/* 2. Ring / Bracelet Sizing */}
          {product.availableSizes && (
            <div className="space-y-3">
              <div className="flex justify-between items-center text-xs font-mono uppercase tracking-wider">
                <span className="text-stone-400">Size Selection</span>
                <button
                  onClick={() => setShowSizeGuide(true)}
                  className="text-gold-400 hover:text-gold-200 flex items-center gap-1 normal-case tracking-normal underline"
                >
                  <Ruler className="w-3.5 h-3.5" />
                  <span>Interactive Sizing Guide</span>
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {product.availableSizes.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`px-4 py-2 rounded-xl text-xs font-mono border transition-all ${
                      selectedSize === sz
                        ? 'border-gold-400 bg-gold-500/15 text-gold-200 shadow-gold-sm font-semibold'
                        : 'border-white/10 text-stone-400 hover:border-white/30'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 3. Quantity & Primary Purchase CTAs */}
          <div className="space-y-4 pt-4 border-t border-white/10">
            <div className="flex items-center gap-4">
              {/* Quantity */}
              <div className="flex items-center border border-white/15 rounded-full bg-charcoal-900 px-3 py-2">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-2 text-stone-400 hover:text-stone-200 font-mono"
                >
                  -
                </button>
                <span className="px-3 text-xs font-mono text-stone-200 font-medium">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-2 text-stone-400 hover:text-stone-200 font-mono"
                >
                  +
                </button>
              </div>

              {/* Add to Cart */}
              <button
                onClick={handleAddToCart}
                className="flex-1 py-4 rounded-full bg-gradient-to-r from-gold-500 via-gold-400 to-gold-600 text-obsidian font-serif font-semibold tracking-widest text-xs uppercase shadow-gold-md hover:shadow-gold-lg hover:brightness-105 transition-all flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Atelier Bag</span>
              </button>

              {/* Wishlist */}
              <button
                onClick={() => toggleWishlist(product)}
                className={`p-4 rounded-full border transition-all ${
                  isFavorited
                    ? 'border-rose-500/40 bg-rose-500/15 text-rose-400'
                    : 'border-white/15 text-stone-300 hover:border-gold-500/40 hover:text-gold-300'
                }`}
                aria-label="Wishlist"
              >
                <Heart className={`w-4 h-4 ${isFavorited ? 'fill-rose-400' : ''}`} />
              </button>
            </div>

            {/* Direct Buy Now */}
            <button
              onClick={handleBuyNow}
              className="w-full py-3.5 rounded-full glass-panel border border-gold-500/30 hover:border-gold-400 text-gold-300 font-serif font-medium tracking-widest text-xs uppercase transition-all"
            >
              Instant Acquisition · Proceed to Checkout
            </button>
          </div>

          {/* Guarantees Badges */}
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10 text-center">
            <div className="space-y-1">
              <Truck className="w-4 h-4 text-gold-400 mx-auto" />
              <div className="text-[11px] font-medium text-stone-200">Armored Courier</div>
              <div className="text-[10px] text-stone-500">Insured Delivery</div>
            </div>
            <div className="space-y-1">
              <RotateCcw className="w-4 h-4 text-gold-400 mx-auto" />
              <div className="text-[11px] font-medium text-stone-200">30-Day Returns</div>
              <div className="text-[10px] text-stone-500">Geneva Atelier Guarantee</div>
            </div>
            <div className="space-y-1">
              <ShieldCheck className="w-4 h-4 text-gold-400 mx-auto" />
              <div className="text-[11px] font-medium text-stone-200">GIA / IGI Dossier</div>
              <div className="text-[10px] text-stone-500">Laser Inscribed</div>
            </div>
          </div>

          {/* Accordion Specifications */}
          <div className="space-y-3 pt-4 border-t border-white/10">
            {/* Story Accordion */}
            <div className="glass-card rounded-2xl overflow-hidden border border-white/10">
              <button
                onClick={() =>
                  setActiveAccordion(activeAccordion === 'story' ? null : 'story')
                }
                className="w-full p-4 flex items-center justify-between text-left text-xs uppercase font-serif tracking-wider text-stone-200"
              >
                <span>Design Philosophy & Inspiration</span>
                <ChevronDown
                  className={`w-4 h-4 text-stone-400 transition-transform ${
                    activeAccordion === 'story' ? 'rotate-180 text-gold-400' : ''
                  }`}
                />
              </button>
              {activeAccordion === 'story' && (
                <div className="px-4 pb-4 text-xs text-stone-300 font-light leading-relaxed border-t border-white/5 pt-3">
                  {product.description}
                </div>
              )}
            </div>

            {/* Technical Specifications Accordion */}
            <div className="glass-card rounded-2xl overflow-hidden border border-white/10">
              <button
                onClick={() =>
                  setActiveAccordion(activeAccordion === 'specs' ? null : 'specs')
                }
                className="w-full p-4 flex items-center justify-between text-left text-xs uppercase font-serif tracking-wider text-stone-200"
              >
                <span>Specifications & Certification</span>
                <ChevronDown
                  className={`w-4 h-4 text-stone-400 transition-transform ${
                    activeAccordion === 'specs' ? 'rotate-180 text-gold-400' : ''
                  }`}
                />
              </button>
              {activeAccordion === 'specs' && (
                <div className="px-4 pb-4 text-xs space-y-2.5 border-t border-white/5 pt-3 font-mono">
                  {Object.entries(product.specifications).map(([key, val]) => (
                    <div key={key} className="flex justify-between py-1 border-b border-white/5">
                      <span className="text-stone-500 capitalize">{key}</span>
                      <span className="text-stone-200 text-right">{val}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Insured Shipping & Packaging Accordion */}
            <div className="glass-card rounded-2xl overflow-hidden border border-white/10">
              <button
                onClick={() =>
                  setActiveAccordion(activeAccordion === 'shipping' ? null : 'shipping')
                }
                className="w-full p-4 flex items-center justify-between text-left text-xs uppercase font-serif tracking-wider text-stone-200"
              >
                <span>Complimentary Armored Delivery & Packaging</span>
                <ChevronDown
                  className={`w-4 h-4 text-stone-400 transition-transform ${
                    activeAccordion === 'shipping' ? 'rotate-180 text-gold-400' : ''
                  }`}
                />
              </button>
              {activeAccordion === 'shipping' && (
                <div className="px-4 pb-4 text-xs text-stone-300 font-light leading-relaxed border-t border-white/5 pt-3 space-y-2">
                  <p>
                    Every AURA piece is hand-packed in our signature lacquered ebony presentation box with bespoke velvet cradle, serialized certificate booklet, and gold wax seal.
                  </p>
                  <p className="text-stone-400">
                    Dispatched via insured armored courier with signature release required upon delivery.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* VERIFIED CUSTOMER REVIEWS SECTION */}
      <section className="max-w-7xl mx-auto mt-24 pt-16 border-t border-white/10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div className="space-y-2">
            <span className="text-xs uppercase font-mono tracking-[0.3em] text-gold-400">
              Collector Testimonials
            </span>
            <h3 className="font-serif text-3xl text-stone-100 font-light">
              Client Appraisals & Experiences
            </h3>
          </div>

          <button
            onClick={() => setShowReviewModal(true)}
            className="px-6 py-2.5 rounded-full glass-panel border border-gold-500/30 text-gold-300 hover:text-gold-100 text-xs font-mono uppercase tracking-wider transition-all"
          >
            Submit an Appraisal
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="p-6 rounded-3xl glass-card border border-white/10 space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-gold-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-gold-400" />
                    ))}
                  </div>
                  <span className="text-[11px] font-mono text-stone-500">{rev.date}</span>
                </div>

                <h4 className="font-serif text-base text-stone-100">"{rev.title}"</h4>
                <p className="text-xs text-stone-300 leading-relaxed font-light">
                  {rev.comment}
                </p>
              </div>

              <div className="flex items-center gap-2 pt-3 border-t border-white/5">
                <div className="w-7 h-7 rounded-full bg-gold-500/20 text-gold-300 flex items-center justify-center text-xs font-serif">
                  {rev.author[0]}
                </div>
                <div>
                  <div className="text-xs text-stone-200 font-medium">{rev.author}</div>
                  {rev.verified && (
                    <div className="text-[10px] text-gold-400/90 flex items-center gap-1 font-mono">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Verified Acquisition</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CURATED COMPANIONS (RELATED PRODUCTS) */}
      {relatedProducts.length > 0 && (
        <section className="max-w-7xl mx-auto mt-24 pt-16 border-t border-white/10">
          <div className="text-center space-y-2 mb-12">
            <span className="text-xs uppercase font-mono tracking-[0.3em] text-gold-400">
              Curated Harmonies
            </span>
            <h3 className="font-serif text-3xl text-stone-100 font-light">
              Companions for this Creation
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* SIZE GUIDE MODAL */}
      {showSizeGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-obsidian/85 backdrop-blur-md"
            onClick={() => setShowSizeGuide(false)}
          />
          <div className="relative w-full max-w-lg bg-charcoal-950 border border-gold-500/30 rounded-3xl p-6 sm:p-8 z-10 space-y-6">
            <div className="flex justify-between items-center border-b border-white/10 pb-4">
              <h3 className="font-serif text-xl text-stone-100">
                AURA Bespoke Sizing Guide
              </h3>
              <button
                onClick={() => setShowSizeGuide(false)}
                className="text-stone-400 hover:text-stone-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-stone-300 leading-relaxed">
              We offer complimentary re-sizing within 60 days of acquisition. If you are unsure of your exact measurement, our Geneva concierge can dispatch a complimentary calibration sizer to your address.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-xs font-mono text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/15 text-gold-400">
                    <th className="py-2">US / Canada</th>
                    <th className="py-2">UK / AU</th>
                    <th className="py-2">Inside Dia (mm)</th>
                    <th className="py-2">Circumference</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-stone-300">
                  <tr>
                    <td className="py-2">Size 5</td>
                    <td>J 1/2</td>
                    <td>15.7 mm</td>
                    <td>49.3 mm</td>
                  </tr>
                  <tr>
                    <td className="py-2">Size 6</td>
                    <td>L 1/2</td>
                    <td>16.5 mm</td>
                    <td>51.9 mm</td>
                  </tr>
                  <tr>
                    <td className="py-2">Size 7</td>
                    <td>N 1/2</td>
                    <td>17.3 mm</td>
                    <td>54.4 mm</td>
                  </tr>
                  <tr>
                    <td className="py-2">Size 8</td>
                    <td>P 1/2</td>
                    <td>18.1 mm</td>
                    <td>57.0 mm</td>
                  </tr>
                  <tr>
                    <td className="py-2">Size 9</td>
                    <td>R 1/2</td>
                    <td>18.9 mm</td>
                    <td>59.5 mm</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <button
              onClick={() => setShowSizeGuide(false)}
              className="w-full py-3 rounded-full bg-gold-500 text-obsidian font-serif font-semibold text-xs uppercase tracking-wider"
            >
              Understood
            </button>
          </div>
        </div>
      )}

      {/* SUBMIT REVIEW MODAL */}
      {showReviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-obsidian/85 backdrop-blur-md"
            onClick={() => setShowReviewModal(false)}
          />
          <div className="relative w-full max-w-lg bg-charcoal-950 border border-gold-500/30 rounded-3xl p-6 sm:p-8 z-10 space-y-4">
            <div className="flex justify-between items-center border-b border-white/10 pb-4">
              <h3 className="font-serif text-xl text-stone-100">
                Submit Client Appraisal
              </h3>
              <button
                onClick={() => setShowReviewModal(false)}
                className="text-stone-400 hover:text-stone-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddReview} className="space-y-4">
              <div>
                <label className="text-xs font-mono text-stone-400 block mb-1">
                  Full Name / Title
                </label>
                <input
                  type="text"
                  required
                  value={newReviewAuthor}
                  onChange={(e) => setNewReviewAuthor(e.target.value)}
                  placeholder="e.g. Lady Genevieve Vance"
                  className="w-full bg-charcoal-900 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-stone-200 focus:outline-none focus:border-gold-500"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-stone-400 block mb-1">
                  Rating
                </label>
                <div className="flex gap-2 text-gold-400">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setNewReviewRating(star)}
                    >
                      <Star
                        className={`w-5 h-5 ${
                          star <= newReviewRating ? 'fill-gold-400' : 'text-stone-600'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-mono text-stone-400 block mb-1">
                  Appraisal Headline
                </label>
                <input
                  type="text"
                  required
                  value={newReviewTitle}
                  onChange={(e) => setNewReviewTitle(e.target.value)}
                  placeholder="e.g. Exceptional scintillation and weight"
                  className="w-full bg-charcoal-900 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-stone-200 focus:outline-none focus:border-gold-500"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-stone-400 block mb-1">
                  Detailed Comments
                </label>
                <textarea
                  rows={4}
                  required
                  value={newReviewComment}
                  onChange={(e) => setNewReviewComment(e.target.value)}
                  placeholder="Describe your impressions of the craftsmanship, light refraction, and packaging..."
                  className="w-full bg-charcoal-900 border border-white/15 rounded-xl p-4 text-xs text-stone-200 focus:outline-none focus:border-gold-500"
                />
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowReviewModal(false)}
                  className="flex-1 py-3 rounded-full border border-white/15 text-stone-300 text-xs font-mono"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-full bg-gold-500 text-obsidian font-serif font-semibold text-xs uppercase tracking-wider shadow-gold-sm"
                >
                  Publish Appraisal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
