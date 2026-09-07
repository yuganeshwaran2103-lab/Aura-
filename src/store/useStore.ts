import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product, CartItem, MaterialType } from '../types';
import { PRODUCTS } from '../data/products';

export interface ToastMessage {
  id: string;
  title: string;
  message: string;
  type?: 'success' | 'gold' | 'info';
}

interface StoreState {
  // Products
  products: Product[];
  addProduct: (product: Product) => void;
  deleteProduct: (productId: string) => void;

  // Cart
  cart: CartItem[];
  isCartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  addToCart: (product: Product, material: MaterialType, size?: string, quantity?: number) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  appliedPromo: { code: string; discountPercent: number } | null;
  applyPromo: (code: string) => boolean;
  removePromo: () => void;

  // Wishlist
  wishlist: Product[];
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;

  // Quick View
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;

  // Search Drawer
  isSearchOpen: boolean;
  setSearchOpen: (open: boolean) => void;

  // Toast Notifications
  toasts: ToastMessage[];
  addToast: (title: string, message: string, type?: 'success' | 'gold' | 'info') => void;
  removeToast: (id: string) => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      // Products
      products: PRODUCTS,
      addProduct: (product) => {
        set({ products: [...get().products, product] });
        get().addToast('Product Added', `${product.name} has been added to the catalog.`, 'success');
      },
      deleteProduct: (productId) => {
        set({ products: get().products.filter((p) => p.id !== productId) });
        get().addToast('Product Removed', 'The product has been removed.', 'info');
      },

      cart: [],
      isCartOpen: false,
      setCartOpen: (open) => set({ isCartOpen: open }),

      addToCart: (product, material, size, quantity = 1) => {
        const cartItemId = `${product.id}-${material}-${size || 'default'}`;
        const currentCart = get().cart;
        const existingIndex = currentCart.findIndex((item) => item.id === cartItemId);

        let newCart: CartItem[];
        if (existingIndex > -1) {
          newCart = [...currentCart];
          newCart[existingIndex].quantity += quantity;
        } else {
          newCart = [
            ...currentCart,
            {
              id: cartItemId,
              product,
              selectedMaterial: material,
              selectedSize: size,
              quantity,
            },
          ];
        }

        set({ cart: newCart, isCartOpen: true });
        get().addToast(
          'Added to Atelier Bag',
          `${product.name} (${material}${size ? `, ${size}` : ''})`,
          'gold'
        );
      },

      removeFromCart: (cartItemId) => {
        const item = get().cart.find((i) => i.id === cartItemId);
        set({
          cart: get().cart.filter((item) => item.id !== cartItemId),
        });
        if (item) {
          get().addToast('Removed from Bag', item.product.name, 'info');
        }
      },

      updateQuantity: (cartItemId, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(cartItemId);
          return;
        }
        set({
          cart: get().cart.map((item) =>
            item.id === cartItemId ? { ...item, quantity } : item
          ),
        });
      },

      clearCart: () => set({ cart: [], appliedPromo: null }),

      appliedPromo: null,
      applyPromo: (code) => {
        const clean = code.trim().toUpperCase();
        if (clean === 'AURA10' || clean === 'VIP10') {
          set({ appliedPromo: { code: clean, discountPercent: 10 } });
          get().addToast('VIP Privilege Applied', '10% privilege discount activated', 'gold');
          return true;
        } else if (clean === 'AURA15' || clean === 'PRIVATE15') {
          set({ appliedPromo: { code: clean, discountPercent: 15 } });
          get().addToast('Private Salon Privilege', '15% courtesy discount activated', 'gold');
          return true;
        } else {
          get().addToast('Invalid Code', 'The invitation code entered is unrecognized or expired.', 'info');
          return false;
        }
      },
      removePromo: () => set({ appliedPromo: null }),

      // Wishlist
      wishlist: [],
      toggleWishlist: (product) => {
        const currentWishlist = get().wishlist;
        const exists = currentWishlist.some((p) => p.id === product.id);

        if (exists) {
          set({
            wishlist: currentWishlist.filter((p) => p.id !== product.id),
          });
          get().addToast('Removed from Wishlist', product.name, 'info');
        } else {
          set({
            wishlist: [...currentWishlist, product],
          });
          get().addToast('Saved to Wishlist', product.name, 'gold');
        }
      },
      isInWishlist: (productId) => {
        return get().wishlist.some((p) => p.id === productId);
      },

      // Quick View
      quickViewProduct: null,
      setQuickViewProduct: (product) => set({ quickViewProduct: product }),

      // Search Drawer
      isSearchOpen: false,
      setSearchOpen: (open) => set({ isSearchOpen: open }),

      // Toast Notifications
      toasts: [],
      addToast: (title, message, type = 'gold') => {
        const id = Math.random().toString(36).substring(2, 9);
        set((state) => ({
          toasts: [...state.toasts, { id, title, message, type }],
        }));

        setTimeout(() => {
          get().removeToast(id);
        }, 4000);
      },
      removeToast: (id) => {
        set((state) => ({
          toasts: state.toasts.filter((t) => t.id !== id),
        }));
      },
    }),
    {
      name: 'aura-luxury-store',
      partialize: (state) => ({
        products: state.products, // Persist added products
        cart: state.cart,
        wishlist: state.wishlist,
        appliedPromo: state.appliedPromo,
      }),
    }
  )
);
