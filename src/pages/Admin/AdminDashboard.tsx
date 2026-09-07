import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Routes, Route, NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Package, PlusCircle, ShoppingCart,
  Heart, Settings, LogOut, Menu, X, ChevronRight,
  TrendingUp, Users, DollarSign, Star, Bell, Search
} from 'lucide-react';
import { useStore } from '../../store/useStore';
import { AdminProducts } from './AdminProducts';
import { AdminAddProduct } from './AdminAddProduct';
import { AdminOverview } from './AdminOverview';

const NAV_ITEMS = [
  { to: '/admin', label: 'Overview', icon: LayoutDashboard, end: true },
  { to: '/admin/products', label: 'Products', icon: Package },
  { to: '/admin/add-product', label: 'Add Product', icon: PlusCircle },
];

export const AdminDashboard: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { products, cart } = useStore();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex">
      {/* Sidebar */}
      <AnimatePresence mode="wait">
        <motion.aside
          initial={false}
          animate={{ width: sidebarOpen ? 260 : 72 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="relative flex flex-col bg-[#0f0f1a] border-r border-white/5 min-h-screen z-20 overflow-hidden"
        >
          {/* Logo */}
          <div className="flex items-center gap-3 px-5 py-6 border-b border-white/5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#D4AF37] to-[#B8860B] flex items-center justify-center flex-shrink-0">
              <span className="text-black font-bold text-sm font-serif">A</span>
            </div>
            <AnimatePresence>
              {sidebarOpen && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <p className="text-white font-serif text-base tracking-widest">AURA</p>
                  <p className="text-[#D4AF37] text-[10px] tracking-[0.2em] uppercase font-mono">Admin Console</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <nav className="flex-1 py-6 px-3 space-y-1">
            {NAV_ITEMS.map(({ to, label, icon: Icon, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group relative ${
                    isActive
                      ? 'bg-gradient-to-r from-[#D4AF37]/20 to-[#D4AF37]/5 text-[#D4AF37] border border-[#D4AF37]/20'
                      : 'text-stone-400 hover:text-stone-200 hover:bg-white/5'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-[#D4AF37]' : ''}`} />
                    <AnimatePresence>
                      {sidebarOpen && (
                        <motion.span
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="text-sm font-medium whitespace-nowrap"
                        >
                          {label}
                        </motion.span>
                      )}
                    </AnimatePresence>
                    {isActive && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute inset-0 rounded-xl bg-[#D4AF37]/10 -z-10"
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}

            <div className="pt-4 border-t border-white/5 mt-4">
              <button
                onClick={() => navigate('/')}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-stone-400 hover:text-stone-200 hover:bg-white/5 transition-all w-full"
              >
                <LogOut className="w-5 h-5 flex-shrink-0" />
                <AnimatePresence>
                  {sidebarOpen && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-sm font-medium whitespace-nowrap"
                    >
                      Back to Store
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </nav>

          {/* Toggle Button */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="absolute top-6 -right-3 w-6 h-6 rounded-full bg-[#1a1a2e] border border-white/10 flex items-center justify-center text-stone-400 hover:text-white transition-colors z-30"
          >
            {sidebarOpen ? <X className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
          </button>
        </motion.aside>
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="h-16 bg-[#0f0f1a] border-b border-white/5 flex items-center justify-between px-6 flex-shrink-0">
          <div className="flex items-center gap-3 flex-1 max-w-md">
            <Search className="w-4 h-4 text-stone-500" />
            <input
              type="text"
              placeholder="Search products, orders..."
              className="bg-transparent text-sm text-stone-300 placeholder:text-stone-600 outline-none w-full"
            />
          </div>
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-stone-400 hover:text-white transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-[#D4AF37] rounded-full" />
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-white/10">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#B8860B] flex items-center justify-center">
                <span className="text-black text-xs font-bold">A</span>
              </div>
              <div className="hidden sm:block">
                <p className="text-sm text-stone-200 font-medium">Admin</p>
                <p className="text-xs text-stone-500">AURA Console</p>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <Routes>
            <Route index element={<AdminOverview />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="add-product" element={<AdminAddProduct />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};
