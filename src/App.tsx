import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { CartDrawer } from './components/cart/CartDrawer';
import { SearchDrawer } from './components/common/SearchDrawer';
import { QuickViewModal } from './components/product/QuickViewModal';
import { ToastContainer } from './components/common/Toast';

// Pages
import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { ProductDetails } from './pages/ProductDetails';
import { Collections } from './pages/Collections';
import { About } from './pages/About';
import { Wishlist } from './pages/Wishlist';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';

// Admin
import { AdminDashboard } from './pages/Admin/AdminDashboard';

// Scroll to top helper on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
}

// Storefront layout wrapper (with Navbar / Footer / overlays)
function StorefrontLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-obsidian text-stone-200 selection:bg-gold-500/30 selection:text-gold-200">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/collections" element={<Collections />} />
          <Route path="/about" element={<About />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
      {/* Global Overlays & Modals */}
      <CartDrawer />
      <SearchDrawer />
      <QuickViewModal />
      <ToastContainer />
    </div>
  );
}

export function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Admin routes — own layout, no public nav */}
        <Route path="/admin/*" element={<AdminDashboard />} />
        {/* Public storefront */}
        <Route path="/*" element={<StorefrontLayout />} />
      </Routes>
    </Router>
  );
}

export default App;

