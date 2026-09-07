import React from 'react';
import { motion } from 'framer-motion';
import { useStore } from '../../store/useStore';
import { Package, ShoppingCart, Heart, TrendingUp, DollarSign, Star, ArrowUpRight, Gem } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const StatCard: React.FC<{
  label: string;
  value: string | number;
  sub?: string;
  icon: React.ElementType;
  color: string;
  delay?: number;
}> = ({ label, value, sub, icon: Icon, color, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.4 }}
    className="bg-[#0f0f1a] border border-white/5 rounded-2xl p-6 hover:border-white/10 transition-colors group"
  >
    <div className="flex items-start justify-between mb-4">
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${color}`}>
        <Icon className="w-5 h-5 text-black" />
      </div>
      <ArrowUpRight className="w-4 h-4 text-stone-600 group-hover:text-[#D4AF37] transition-colors" />
    </div>
    <p className="text-3xl font-serif text-white font-bold">{value}</p>
    <p className="text-stone-400 text-sm mt-1">{label}</p>
    {sub && <p className="text-xs text-[#D4AF37] mt-1 font-mono">{sub}</p>}
  </motion.div>
);

export const AdminOverview: React.FC = () => {
  const { products, cart, wishlist } = useStore();
  const navigate = useNavigate();

  const totalValue = products.reduce((acc, p) => acc + p.price, 0);
  const inStockCount = products.filter(p => p.inStock).length;
  const featuredCount = products.filter(p => p.isFeatured).length;
  const avgRating = products.length > 0
    ? (products.reduce((acc, p) => acc + p.rating, 0) / products.length).toFixed(2)
    : '0.00';

  const cartTotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  const recentProducts = [...products].slice(-5).reverse();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-serif text-white mb-1">Welcome back, Admin</h1>
        <p className="text-stone-500 text-sm">Here's what's happening with AURA today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          label="Total Products"
          value={products.length}
          sub={`${inStockCount} in stock`}
          icon={Package}
          color="bg-gradient-to-br from-[#D4AF37] to-[#B8860B]"
          delay={0}
        />
        <StatCard
          label="Catalog Value"
          value={`$${(totalValue / 1000).toFixed(0)}K`}
          sub="Total list price"
          icon={DollarSign}
          color="bg-gradient-to-br from-emerald-400 to-emerald-600"
          delay={0.05}
        />
        <StatCard
          label="Cart Items"
          value={cart.reduce((a, i) => a + i.quantity, 0)}
          sub={`$${cartTotal.toLocaleString()} active`}
          icon={ShoppingCart}
          color="bg-gradient-to-br from-blue-400 to-blue-600"
          delay={0.1}
        />
        <StatCard
          label="Avg. Rating"
          value={avgRating}
          sub={`${featuredCount} featured`}
          icon={Star}
          color="bg-gradient-to-br from-purple-400 to-purple-600"
          delay={0.15}
        />
      </div>

      {/* Recent Products & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Products */}
        <div className="lg:col-span-2 bg-[#0f0f1a] border border-white/5 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-white font-serif text-base">Recent Products</h2>
            <button
              onClick={() => navigate('/admin/products')}
              className="text-xs text-[#D4AF37] hover:underline font-mono"
            >
              View all →
            </button>
          </div>
          <div className="space-y-3">
            {recentProducts.length === 0 ? (
              <div className="text-center py-8 text-stone-600">
                <Package className="w-10 h-10 mx-auto mb-2 opacity-40" />
                <p className="text-sm">No products yet</p>
              </div>
            ) : (
              recentProducts.map((product, i) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/3 transition-colors group"
                >
                  <img
                    src={product.primaryImage}
                    alt={product.name}
                    className="w-12 h-12 rounded-xl object-cover border border-white/10 flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-stone-200 font-medium truncate group-hover:text-white">{product.name}</p>
                    <p className="text-xs text-stone-500">{product.collection} · {product.category}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-sm font-mono text-[#D4AF37]">${product.price.toLocaleString()}</p>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono ${product.inStock ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
                      {product.inStock ? 'In Stock' : 'Out'}
                    </span>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-[#0f0f1a] border border-white/5 rounded-2xl p-6">
          <h2 className="text-white font-serif text-base mb-5">Quick Actions</h2>
          <div className="space-y-3">
            {[
              { label: 'Add New Product', desc: 'List a new jewelry piece', color: 'from-[#D4AF37] to-[#B8860B]', path: '/admin/add-product' },
              { label: 'Manage Catalog', desc: 'Edit or remove products', color: 'from-blue-500 to-blue-700', path: '/admin/products' },
              { label: 'View Storefront', desc: 'Preview public shop', color: 'from-purple-500 to-purple-700', path: '/shop' },
            ].map(({ label, desc, color, path }) => (
              <button
                key={label}
                onClick={() => navigate(path)}
                className="w-full flex items-center gap-4 p-4 rounded-xl bg-white/3 hover:bg-white/6 border border-white/5 hover:border-white/10 transition-all text-left group"
              >
                <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${color} flex items-center justify-center flex-shrink-0`}>
                  <Gem className="w-4 h-4 text-black" />
                </div>
                <div>
                  <p className="text-sm text-stone-200 font-medium group-hover:text-white">{label}</p>
                  <p className="text-xs text-stone-600">{desc}</p>
                </div>
              </button>
            ))}
          </div>

          {/* Collection breakdown */}
          <div className="mt-6 pt-5 border-t border-white/5">
            <p className="text-xs text-stone-500 uppercase tracking-widest font-mono mb-3">By Collection</p>
            {['Celestial', 'Dark Matter', 'Solaris', 'Éternel', 'Haute Horlogerie'].map(col => {
              const count = products.filter(p => p.collection === col).length;
              const pct = products.length > 0 ? (count / products.length) * 100 : 0;
              return (
                <div key={col} className="mb-3">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-stone-400">{col}</span>
                    <span className="text-stone-500 font-mono">{count}</span>
                  </div>
                  <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                      className="h-full bg-gradient-to-r from-[#D4AF37] to-[#B8860B] rounded-full"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
