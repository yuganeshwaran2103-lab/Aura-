import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useStore } from '../../store/useStore';
import { useNavigate } from 'react-router-dom';
import { Product, MaterialType } from '../../types';
import {
  Upload, Plus, Minus, CheckCircle, ChevronDown,
  Image as ImageIcon, ArrowLeft, Sparkles, AlertCircle
} from 'lucide-react';

const COLLECTIONS = ['Celestial', 'Dark Matter', 'Solaris', 'Éternel', 'Haute Horlogerie'] as const;
const CATEGORIES = ['rings', 'necklaces', 'bracelets', 'earrings', 'watches'] as const;
const ALL_MATERIALS: MaterialType[] = ['18K Yellow Gold', 'Platinum', '18K Rose Gold'];
const RING_SIZES = ['4', '5', '6', '7', '8', '9', '10', 'Custom Sizing'];

interface FormData {
  name: string;
  subtitle: string;
  price: string;
  originalPrice: string;
  category: typeof CATEGORIES[number];
  collection: typeof COLLECTIONS[number];
  primaryImage: string;
  secondaryImage: string;
  description: string;
  shortDescription: string;
  inStock: boolean;
  isFeatured: boolean;
  isBestSeller: boolean;
  isNew: boolean;
  availableMaterials: MaterialType[];
  availableSizes: string[];
  threeDType: 'ring' | 'gem' | 'pendant' | '';
  // Specs
  metal: string;
  gemstone: string;
  caratWeight: string;
  clarity: string;
  colorGrade: string;
  dimensions: string;
  craftsmanship: string;
  origin: string;
  certification: string;
}

const initialForm: FormData = {
  name: '',
  subtitle: '',
  price: '',
  originalPrice: '',
  category: 'rings',
  collection: 'Celestial',
  primaryImage: '',
  secondaryImage: '',
  description: '',
  shortDescription: '',
  inStock: true,
  isFeatured: false,
  isBestSeller: false,
  isNew: true,
  availableMaterials: ['18K Yellow Gold'],
  availableSizes: [],
  threeDType: '',
  metal: '',
  gemstone: '',
  caratWeight: '',
  clarity: '',
  colorGrade: '',
  dimensions: '',
  craftsmanship: '',
  origin: '',
  certification: '',
};

// Inline field components
const Field: React.FC<{
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}> = ({ label, required, error, children }) => (
  <div>
    <label className="block text-xs text-stone-400 uppercase tracking-widest font-mono mb-2">
      {label} {required && <span className="text-[#D4AF37]">*</span>}
    </label>
    {children}
    {error && (
      <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
        <AlertCircle className="w-3 h-3" /> {error}
      </p>
    )}
  </div>
);

const inputCls = "w-full bg-[#0a0a0f] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-stone-200 placeholder:text-stone-700 outline-none focus:border-[#D4AF37]/50 focus:bg-[#0f0f1a] transition-all";

export const AdminAddProduct: React.FC = () => {
  const { addProduct } = useStore();
  const navigate = useNavigate();
  const [form, setForm] = useState<FormData>(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [activeSection, setActiveSection] = useState(0);

  const set = (key: keyof FormData, value: any) => {
    setForm(prev => ({ ...prev, [key]: value }));
    setErrors(prev => ({ ...prev, [key]: undefined }));
  };

  const toggleMaterial = (mat: MaterialType) => {
    const has = form.availableMaterials.includes(mat);
    set('availableMaterials', has
      ? form.availableMaterials.filter(m => m !== mat)
      : [...form.availableMaterials, mat]
    );
  };

  const toggleSize = (size: string) => {
    const has = form.availableSizes.includes(size);
    set('availableSizes', has
      ? form.availableSizes.filter(s => s !== size)
      : [...form.availableSizes, size]
    );
  };

  const validate = () => {
    const errs: typeof errors = {};
    if (!form.name.trim()) errs.name = 'Product name is required';
    if (!form.subtitle.trim()) errs.subtitle = 'Subtitle is required';
    if (!form.price || isNaN(Number(form.price)) || Number(form.price) <= 0) errs.price = 'Valid price is required';
    if (!form.primaryImage.trim()) errs.primaryImage = 'Primary image URL is required';
    if (!form.description.trim()) errs.description = 'Description is required';
    if (!form.shortDescription.trim()) errs.shortDescription = 'Short description is required';
    if (form.availableMaterials.length === 0) errs.availableMaterials = 'Select at least one material';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      setActiveSection(0);
      return;
    }

    const newProduct: Product = {
      id: `aura-${form.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${Date.now()}`,
      name: form.name.trim(),
      subtitle: form.subtitle.trim(),
      price: Number(form.price),
      originalPrice: form.originalPrice ? Number(form.originalPrice) : undefined,
      rating: 5.0,
      reviewsCount: 0,
      category: form.category,
      collection: form.collection,
      availableMaterials: form.availableMaterials,
      primaryImage: form.primaryImage.trim(),
      secondaryImage: form.secondaryImage.trim() || form.primaryImage.trim(),
      gallery: [form.primaryImage.trim(), ...(form.secondaryImage ? [form.secondaryImage.trim()] : [])],
      description: form.description.trim(),
      shortDescription: form.shortDescription.trim(),
      specifications: {
        metal: form.metal || 'To be specified',
        gemstone: form.gemstone || 'To be specified',
        caratWeight: form.caratWeight || undefined,
        clarity: form.clarity || undefined,
        colorGrade: form.colorGrade || undefined,
        dimensions: form.dimensions || undefined,
        craftsmanship: form.craftsmanship || 'AURA Atelier',
        origin: form.origin || 'Geneva Atelier, Switzerland',
        certification: form.certification || 'AURA Certificate of Authenticity',
      },
      inStock: form.inStock,
      isFeatured: form.isFeatured,
      isBestSeller: form.isBestSeller,
      isNew: form.isNew,
      availableSizes: form.availableSizes.length > 0 ? form.availableSizes : undefined,
      threeDType: (form.threeDType as Product['threeDType']) || undefined,
    };

    addProduct(newProduct);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-[#0f0f1a] border border-white/5 rounded-2xl p-12 text-center max-w-sm"
        >
          <div className="w-16 h-16 bg-gradient-to-br from-[#D4AF37] to-[#B8860B] rounded-full flex items-center justify-center mx-auto mb-5">
            <CheckCircle className="w-8 h-8 text-black" />
          </div>
          <h2 className="text-2xl font-serif text-white mb-2">Product Added!</h2>
          <p className="text-stone-400 text-sm mb-6">
            <span className="text-[#D4AF37] font-medium">{form.name}</span> has been listed in the AURA catalog and is now live in the store.
          </p>
          <div className="flex flex-col gap-3">
            <button
              onClick={() => { setForm(initialForm); setSubmitted(false); setErrors({}); }}
              className="w-full py-2.5 bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-black text-sm font-semibold rounded-xl"
            >
              Add Another Product
            </button>
            <button
              onClick={() => navigate('/admin/products')}
              className="w-full py-2.5 bg-white/5 text-stone-300 text-sm rounded-xl hover:bg-white/10 transition-colors"
            >
              View All Products
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  const sections = ['Basic Info', 'Media', 'Details', 'Specifications'];

  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => navigate('/admin/products')}
          className="p-2 text-stone-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl font-serif text-white mb-1">Add New Product</h1>
          <p className="text-stone-500 text-sm">Complete all required fields to list in the catalog</p>
        </div>
      </div>

      {/* Section Tabs */}
      <div className="flex gap-1 bg-[#0f0f1a] border border-white/5 rounded-xl p-1 mb-6 overflow-x-auto">
        {sections.map((s, i) => (
          <button
            key={s}
            onClick={() => setActiveSection(i)}
            className={`flex-1 py-2 px-3 rounded-lg text-xs font-mono whitespace-nowrap transition-all ${
              activeSection === i
                ? 'bg-gradient-to-r from-[#D4AF37]/20 to-[#D4AF37]/5 text-[#D4AF37] border border-[#D4AF37]/20'
                : 'text-stone-500 hover:text-stone-300'
            }`}
          >
            {i + 1}. {s}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">

            {/* Section 0: Basic Info */}
            {activeSection === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-[#0f0f1a] border border-white/5 rounded-2xl p-6 space-y-5"
              >
                <h2 className="text-white font-serif text-base flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                  Basic Information
                </h2>

                <Field label="Product Name" required error={errors.name}>
                  <input
                    type="text"
                    placeholder="e.g. Aurora Diamond Solitaire"
                    value={form.name}
                    onChange={e => set('name', e.target.value)}
                    className={inputCls}
                  />
                </Field>

                <Field label="Subtitle" required error={errors.subtitle}>
                  <input
                    type="text"
                    placeholder="e.g. 2.5ct Oval Cut with Hidden Halo"
                    value={form.subtitle}
                    onChange={e => set('subtitle', e.target.value)}
                    className={inputCls}
                  />
                </Field>

                <div className="grid grid-cols-2 gap-4">
                  <Field label="Price (USD)" required error={errors.price}>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-500 text-sm">$</span>
                      <input
                        type="number"
                        placeholder="0.00"
                        min="0"
                        step="0.01"
                        value={form.price}
                        onChange={e => set('price', e.target.value)}
                        className={inputCls + ' pl-7'}
                      />
                    </div>
                  </Field>
                  <Field label="Original Price (optional)">
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-500 text-sm">$</span>
                      <input
                        type="number"
                        placeholder="0.00"
                        min="0"
                        step="0.01"
                        value={form.originalPrice}
                        onChange={e => set('originalPrice', e.target.value)}
                        className={inputCls + ' pl-7'}
                      />
                    </div>
                  </Field>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Field label="Category" required>
                    <div className="relative">
                      <select
                        value={form.category}
                        onChange={e => set('category', e.target.value)}
                        className={inputCls + ' appearance-none pr-8 cursor-pointer'}
                      >
                        {CATEGORIES.map(c => (
                          <option key={c} value={c} className="bg-[#0f0f1a]">{c.charAt(0).toUpperCase() + c.slice(1)}</option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-500 pointer-events-none" />
                    </div>
                  </Field>
                  <Field label="Collection" required>
                    <div className="relative">
                      <select
                        value={form.collection}
                        onChange={e => set('collection', e.target.value)}
                        className={inputCls + ' appearance-none pr-8 cursor-pointer'}
                      >
                        {COLLECTIONS.map(c => (
                          <option key={c} value={c} className="bg-[#0f0f1a]">{c}</option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-500 pointer-events-none" />
                    </div>
                  </Field>
                </div>

                {/* Materials */}
                <Field label="Available Materials" required error={errors.availableMaterials as string}>
                  <div className="flex flex-wrap gap-2">
                    {ALL_MATERIALS.map(mat => (
                      <button
                        type="button"
                        key={mat}
                        onClick={() => toggleMaterial(mat)}
                        className={`px-3 py-1.5 rounded-lg text-xs transition-all border ${
                          form.availableMaterials.includes(mat)
                            ? 'bg-[#D4AF37]/20 border-[#D4AF37]/40 text-[#D4AF37]'
                            : 'bg-white/3 border-white/10 text-stone-400 hover:border-white/20'
                        }`}
                      >
                        {mat}
                      </button>
                    ))}
                  </div>
                </Field>
              </motion.div>
            )}

            {/* Section 1: Media */}
            {activeSection === 1 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-[#0f0f1a] border border-white/5 rounded-2xl p-6 space-y-5"
              >
                <h2 className="text-white font-serif text-base flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-[#D4AF37]" />
                  Product Images
                </h2>
                <p className="text-stone-500 text-xs">Paste an image URL (Unsplash, your CDN, etc.)</p>

                <Field label="Primary Image URL" required error={errors.primaryImage}>
                  <input
                    type="url"
                    placeholder="https://images.unsplash.com/..."
                    value={form.primaryImage}
                    onChange={e => set('primaryImage', e.target.value)}
                    className={inputCls}
                  />
                  {form.primaryImage && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="mt-3"
                    >
                      <img
                        src={form.primaryImage}
                        alt="Preview"
                        className="w-full max-h-52 object-cover rounded-xl border border-white/10"
                        onError={e => (e.currentTarget.style.display = 'none')}
                      />
                    </motion.div>
                  )}
                </Field>

                <Field label="Secondary Image URL (optional)">
                  <input
                    type="url"
                    placeholder="https://images.unsplash.com/..."
                    value={form.secondaryImage}
                    onChange={e => set('secondaryImage', e.target.value)}
                    className={inputCls}
                  />
                  {form.secondaryImage && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="mt-3"
                    >
                      <img
                        src={form.secondaryImage}
                        alt="Secondary Preview"
                        className="w-full max-h-40 object-cover rounded-xl border border-white/10"
                        onError={e => (e.currentTarget.style.display = 'none')}
                      />
                    </motion.div>
                  )}
                </Field>

                <Field label="3D Model Type (optional)">
                  <div className="flex gap-2">
                    {['', 'ring', 'gem', 'pendant'].map(t => (
                      <button
                        type="button"
                        key={t}
                        onClick={() => set('threeDType', t)}
                        className={`px-3 py-1.5 rounded-lg text-xs border transition-all ${
                          form.threeDType === t
                            ? 'bg-[#D4AF37]/20 border-[#D4AF37]/40 text-[#D4AF37]'
                            : 'bg-white/3 border-white/10 text-stone-400 hover:border-white/20'
                        }`}
                      >
                        {t === '' ? 'None' : t.charAt(0).toUpperCase() + t.slice(1)}
                      </button>
                    ))}
                  </div>
                </Field>
              </motion.div>
            )}

            {/* Section 2: Details */}
            {activeSection === 2 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-[#0f0f1a] border border-white/5 rounded-2xl p-6 space-y-5"
              >
                <h2 className="text-white font-serif text-base">Description & Details</h2>

                <Field label="Short Description" required error={errors.shortDescription}>
                  <input
                    type="text"
                    placeholder="One-line summary for product cards..."
                    value={form.shortDescription}
                    onChange={e => set('shortDescription', e.target.value)}
                    className={inputCls}
                    maxLength={120}
                  />
                  <p className="text-stone-600 text-xs mt-1">{form.shortDescription.length}/120 characters</p>
                </Field>

                <Field label="Full Description" required error={errors.description}>
                  <textarea
                    placeholder="Detailed product description for the product page..."
                    value={form.description}
                    onChange={e => set('description', e.target.value)}
                    rows={6}
                    className={inputCls + ' resize-none'}
                  />
                </Field>

                {/* Sizes */}
                <Field label={`Available Sizes ${form.category === 'rings' ? '(Ring Sizes)' : '(Optional)'}`}>
                  <div className="flex flex-wrap gap-2">
                    {(form.category === 'rings' ? RING_SIZES : ['XS', 'S', 'M', 'L', 'XL', 'One Size']).map(size => (
                      <button
                        type="button"
                        key={size}
                        onClick={() => toggleSize(size)}
                        className={`px-3 py-1.5 rounded-lg text-xs border transition-all ${
                          form.availableSizes.includes(size)
                            ? 'bg-[#D4AF37]/20 border-[#D4AF37]/40 text-[#D4AF37]'
                            : 'bg-white/3 border-white/10 text-stone-400 hover:border-white/20'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </Field>
              </motion.div>
            )}

            {/* Section 3: Specifications */}
            {activeSection === 3 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-[#0f0f1a] border border-white/5 rounded-2xl p-6 space-y-5"
              >
                <h2 className="text-white font-serif text-base">Technical Specifications</h2>
                <p className="text-stone-500 text-xs">These appear on the product detail page. All fields optional.</p>

                <div className="grid grid-cols-2 gap-4">
                  <Field label="Metal">
                    <input type="text" placeholder="e.g. 18K Yellow Gold" value={form.metal} onChange={e => set('metal', e.target.value)} className={inputCls} />
                  </Field>
                  <Field label="Gemstone">
                    <input type="text" placeholder="e.g. Diamond, Opal" value={form.gemstone} onChange={e => set('gemstone', e.target.value)} className={inputCls} />
                  </Field>
                  <Field label="Carat Weight">
                    <input type="text" placeholder="e.g. 2.20 ct" value={form.caratWeight} onChange={e => set('caratWeight', e.target.value)} className={inputCls} />
                  </Field>
                  <Field label="Clarity">
                    <input type="text" placeholder="e.g. VVS1" value={form.clarity} onChange={e => set('clarity', e.target.value)} className={inputCls} />
                  </Field>
                  <Field label="Color Grade">
                    <input type="text" placeholder="e.g. D (Colorless)" value={form.colorGrade} onChange={e => set('colorGrade', e.target.value)} className={inputCls} />
                  </Field>
                  <Field label="Dimensions">
                    <input type="text" placeholder="e.g. Band 1.8mm" value={form.dimensions} onChange={e => set('dimensions', e.target.value)} className={inputCls} />
                  </Field>
                  <Field label="Craftsmanship">
                    <input type="text" placeholder="e.g. Hand-set by master" value={form.craftsmanship} onChange={e => set('craftsmanship', e.target.value)} className={inputCls} />
                  </Field>
                  <Field label="Origin">
                    <input type="text" placeholder="e.g. Geneva, Switzerland" value={form.origin} onChange={e => set('origin', e.target.value)} className={inputCls} />
                  </Field>
                </div>
                <Field label="Certification">
                  <input type="text" placeholder="e.g. GIA Certified #12345" value={form.certification} onChange={e => set('certification', e.target.value)} className={inputCls} />
                </Field>
              </motion.div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-2">
              <button
                type="button"
                onClick={() => setActiveSection(Math.max(0, activeSection - 1))}
                disabled={activeSection === 0}
                className="px-5 py-2.5 rounded-xl border border-white/10 text-stone-400 text-sm hover:text-white hover:border-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                ← Previous
              </button>
              {activeSection < sections.length - 1 ? (
                <button
                  type="button"
                  onClick={() => setActiveSection(Math.min(sections.length - 1, activeSection + 1))}
                  className="px-5 py-2.5 rounded-xl bg-white/5 text-stone-300 text-sm hover:bg-white/10 transition-colors"
                >
                  Next →
                </button>
              ) : (
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-black text-sm font-bold rounded-xl hover:opacity-90 transition-opacity flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Publish to Catalog
                </button>
              )}
            </div>
          </div>

          {/* Sidebar Preview */}
          <div className="space-y-4">
            {/* Preview Card */}
            <div className="bg-[#0f0f1a] border border-white/5 rounded-2xl p-5 sticky top-6">
              <p className="text-xs text-stone-500 uppercase tracking-widest font-mono mb-4">Live Preview</p>
              <div className="rounded-xl overflow-hidden border border-white/10 bg-[#0a0a0f]">
                {form.primaryImage ? (
                  <img
                    src={form.primaryImage}
                    alt="preview"
                    className="w-full h-44 object-cover"
                    onError={e => (e.currentTarget.style.display = 'none')}
                  />
                ) : (
                  <div className="w-full h-44 flex items-center justify-center bg-white/3">
                    <ImageIcon className="w-8 h-8 text-stone-700" />
                  </div>
                )}
                <div className="p-4">
                  <p className="text-white text-sm font-serif leading-tight mb-1">{form.name || 'Product Name'}</p>
                  <p className="text-stone-500 text-xs mb-3">{form.subtitle || 'Subtitle'}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-[#D4AF37] text-sm font-mono font-bold">
                      {form.price ? `$${Number(form.price).toLocaleString()}` : '$0'}
                    </span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-mono ${form.inStock ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
                      {form.inStock ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Flags */}
              <div className="mt-4 space-y-2">
                <p className="text-xs text-stone-500 uppercase tracking-widest font-mono">Product Flags</p>
                {[
                  { key: 'inStock', label: 'In Stock', color: 'emerald' },
                  { key: 'isFeatured', label: 'Featured', color: 'yellow' },
                  { key: 'isBestSeller', label: 'Best Seller', color: 'blue' },
                  { key: 'isNew', label: 'New Arrival', color: 'purple' },
                ].map(({ key, label, color }) => (
                  <div key={key} className="flex items-center justify-between py-1">
                    <span className="text-xs text-stone-400">{label}</span>
                    <button
                      type="button"
                      onClick={() => set(key as keyof FormData, !form[key as keyof FormData])}
                      className={`w-9 h-5 rounded-full relative transition-colors ${
                        form[key as keyof FormData]
                          ? 'bg-[#D4AF37]'
                          : 'bg-white/10'
                      }`}
                    >
                      <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all ${
                        form[key as keyof FormData] ? 'left-4' : 'left-0.5'
                      }`} />
                    </button>
                  </div>
                ))}
              </div>

              {/* Progress */}
              <div className="mt-5 pt-4 border-t border-white/5">
                <p className="text-xs text-stone-500 font-mono mb-2">Form Progress</p>
                <div className="flex gap-1">
                  {sections.map((_, i) => (
                    <div
                      key={i}
                      className={`flex-1 h-1 rounded-full transition-colors ${
                        i <= activeSection ? 'bg-[#D4AF37]' : 'bg-white/10'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-xs text-stone-600 mt-1.5">{activeSection + 1} of {sections.length} sections</p>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
