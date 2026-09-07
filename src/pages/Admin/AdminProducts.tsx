import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../../store/useStore';
import {
  Search, Filter, Trash2, Edit2, Eye, Star, Package,
  PlusCircle, CheckCircle, XCircle, ChevronDown, ExternalLink
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Product } from '../../types';

type SortKey = 'name' | 'price' | 'rating' | 'category';

export const AdminProducts: React.FC = () => {
  const { products, deleteProduct, addToast } = useStore();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [sortBy, setSortBy] = useState<SortKey>('name');
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');

  const categories = ['all', 'rings', 'necklaces', 'bracelets', 'earrings', 'watches'];

  const filtered = products
    .filter(p => {
      const matchesSearch =
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.collection.toLowerCase().includes(search.toLowerCase()) ||
        p.category.toLowerCase().includes(search.toLowerCase());
      const matchesCat = filterCategory === 'all' || p.category === filterCategory;
      return matchesSearch && matchesCat;
    })
    .sort((a, b) => {
      if (sortBy === 'price') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'category') return a.category.localeCompare(b.category);
      return a.name.localeCompare(b.name);
    });

  const handleDelete = (id: string) => {
    deleteProduct(id);
    setConfirmDelete(null);
  };

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-serif text-white mb-1">Product Catalog</h1>
          <p className="text-stone-500 text-sm">{products.length} total · {filtered.length} shown</p>
        </div>
        <button
          onClick={() => navigate('/admin/add-product')}
          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-black text-sm font-semibold rounded-xl hover:opacity-90 transition-opacity"
        >
          <PlusCircle className="w-4 h-4" />
          Add New Product
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-500" />
          <input
            type="text"
            placeholder="Search by name, collection, category..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-[#0f0f1a] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-stone-200 placeholder:text-stone-600 outline-none focus:border-[#D4AF37]/50 transition-colors"
          />
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <select
              value={filterCategory}
              onChange={e => setFilterCategory(e.target.value)}
              className="appearance-none bg-[#0f0f1a] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-stone-300 pr-8 outline-none focus:border-[#D4AF37]/50 cursor-pointer"
            >
              {categories.map(cat => (
                <option key={cat} value={cat} className="bg-[#0f0f1a]">
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-500 pointer-events-none" />
          </div>
          <div className="relative">
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as SortKey)}
              className="appearance-none bg-[#0f0f1a] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-stone-300 pr-8 outline-none focus:border-[#D4AF37]/50 cursor-pointer"
            >
              <option value="name" className="bg-[#0f0f1a]">Sort: Name</option>
              <option value="price" className="bg-[#0f0f1a]">Sort: Price</option>
              <option value="rating" className="bg-[#0f0f1a]">Sort: Rating</option>
              <option value="category" className="bg-[#0f0f1a]">Sort: Category</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-500 pointer-events-none" />
          </div>
          {/* View Toggle */}
          <div className="flex bg-[#0f0f1a] border border-white/10 rounded-xl overflow-hidden">
            {(['table', 'grid'] as const).map(mode => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={`px-3 py-2 text-xs font-mono transition-colors ${viewMode === mode ? 'bg-[#D4AF37]/20 text-[#D4AF37]' : 'text-stone-500 hover:text-stone-300'}`}
              >
                {mode === 'table' ? '≡' : '⊞'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Empty State */}
      {filtered.length === 0 && (
        <div className="bg-[#0f0f1a] border border-white/5 rounded-2xl p-16 text-center">
          <Package className="w-12 h-12 mx-auto mb-3 text-stone-700" />
          <p className="text-stone-400 text-base font-serif">No products found</p>
          <p className="text-stone-600 text-sm mt-1 mb-4">Try a different search or filter</p>
          <button
            onClick={() => navigate('/admin/add-product')}
            className="px-5 py-2 bg-[#D4AF37]/10 text-[#D4AF37] text-sm rounded-xl border border-[#D4AF37]/20 hover:bg-[#D4AF37]/20 transition-colors"
          >
            Add your first product
          </button>
        </div>
      )}

      {/* Table View */}
      {viewMode === 'table' && filtered.length > 0 && (
        <div className="bg-[#0f0f1a] border border-white/5 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="text-left px-5 py-4 text-xs text-stone-500 font-mono uppercase tracking-widest">Product</th>
                  <th className="text-left px-4 py-4 text-xs text-stone-500 font-mono uppercase tracking-widest hidden sm:table-cell">Category</th>
                  <th className="text-left px-4 py-4 text-xs text-stone-500 font-mono uppercase tracking-widest hidden md:table-cell">Collection</th>
                  <th className="text-right px-4 py-4 text-xs text-stone-500 font-mono uppercase tracking-widest">Price</th>
                  <th className="text-center px-4 py-4 text-xs text-stone-500 font-mono uppercase tracking-widest hidden lg:table-cell">Rating</th>
                  <th className="text-center px-4 py-4 text-xs text-stone-500 font-mono uppercase tracking-widest">Stock</th>
                  <th className="text-right px-5 py-4 text-xs text-stone-500 font-mono uppercase tracking-widest">Actions</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {filtered.map((product, i) => (
                    <motion.tr
                      key={product.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ delay: i * 0.03 }}
                      className="border-b border-white/3 hover:bg-white/2 transition-colors group"
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={product.primaryImage}
                            alt={product.name}
                            className="w-11 h-11 rounded-xl object-cover border border-white/10 flex-shrink-0"
                          />
                          <div className="min-w-0">
                            <p className="text-sm text-stone-200 font-medium truncate max-w-[160px] group-hover:text-white">{product.name}</p>
                            <p className="text-xs text-stone-500 truncate max-w-[160px]">{product.subtitle}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 hidden sm:table-cell">
                        <span className="text-xs px-2.5 py-1 bg-white/5 text-stone-400 rounded-lg capitalize font-mono">{product.category}</span>
                      </td>
                      <td className="px-4 py-4 hidden md:table-cell">
                        <span className="text-xs text-stone-400">{product.collection}</span>
                      </td>
                      <td className="px-4 py-4 text-right">
                        <span className="text-sm font-mono text-[#D4AF37]">${product.price.toLocaleString()}</span>
                      </td>
                      <td className="px-4 py-4 text-center hidden lg:table-cell">
                        <div className="flex items-center justify-center gap-1">
                          <Star className="w-3 h-3 text-[#D4AF37] fill-[#D4AF37]" />
                          <span className="text-xs text-stone-300 font-mono">{product.rating}</span>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-center">
                        {product.inStock ? (
                          <CheckCircle className="w-4 h-4 text-emerald-400 mx-auto" />
                        ) : (
                          <XCircle className="w-4 h-4 text-red-400 mx-auto" />
                        )}
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => navigate(`/product/${product.id}`)}
                            title="View on store"
                            className="p-1.5 text-stone-500 hover:text-blue-400 hover:bg-blue-400/10 rounded-lg transition-colors"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              if (confirmDelete === product.id) {
                                handleDelete(product.id);
                              } else {
                                setConfirmDelete(product.id);
                                setTimeout(() => setConfirmDelete(null), 3000);
                              }
                            }}
                            title={confirmDelete === product.id ? 'Click again to confirm' : 'Delete'}
                            className={`p-1.5 rounded-lg transition-colors ${
                              confirmDelete === product.id
                                ? 'text-red-400 bg-red-400/20 animate-pulse'
                                : 'text-stone-500 hover:text-red-400 hover:bg-red-400/10'
                            }`}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Grid View */}
      {viewMode === 'grid' && filtered.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <AnimatePresence>
            {filtered.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: i * 0.04 }}
                className="bg-[#0f0f1a] border border-white/5 rounded-2xl overflow-hidden group hover:border-white/10 transition-colors"
              >
                <div className="relative overflow-hidden aspect-square">
                  <img
                    src={product.primaryImage}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-4 gap-2">
                    <button
                      onClick={() => navigate(`/product/${product.id}`)}
                      className="p-2 bg-white/10 backdrop-blur rounded-full text-white hover:bg-white/20 transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        if (confirmDelete === product.id) {
                          handleDelete(product.id);
                        } else {
                          setConfirmDelete(product.id);
                          setTimeout(() => setConfirmDelete(null), 3000);
                        }
                      }}
                      className={`p-2 backdrop-blur rounded-full transition-colors ${
                        confirmDelete === product.id
                          ? 'bg-red-500/50 text-white'
                          : 'bg-white/10 text-white hover:bg-red-500/30'
                      }`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  {product.isNew && (
                    <span className="absolute top-2 left-2 text-[10px] bg-[#D4AF37] text-black px-2 py-0.5 rounded-full font-mono font-bold">NEW</span>
                  )}
                </div>
                <div className="p-3">
                  <p className="text-sm text-stone-200 font-medium truncate">{product.name}</p>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs font-mono text-[#D4AF37]">${product.price.toLocaleString()}</span>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-[#D4AF37] fill-[#D4AF37]" />
                      <span className="text-xs text-stone-400 font-mono">{product.rating}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};
