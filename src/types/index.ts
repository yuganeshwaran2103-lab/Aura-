export type CategoryType = 'all' | 'rings' | 'necklaces' | 'bracelets' | 'earrings' | 'watches';
export type MaterialType = '18K Yellow Gold' | 'Platinum' | '18K Rose Gold';

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  category: 'rings' | 'necklaces' | 'bracelets' | 'earrings' | 'watches';
  collection: 'Celestial' | 'Dark Matter' | 'Solaris' | 'Éternel' | 'Haute Horlogerie';
  availableMaterials: MaterialType[];
  primaryImage: string;
  secondaryImage: string;
  gallery: string[];
  description: string;
  shortDescription: string;
  specifications: {
    metal: string;
    gemstone: string;
    caratWeight?: string;
    clarity?: string;
    colorGrade?: string;
    dimensions?: string;
    craftsmanship: string;
    origin: string;
    certification: string;
  };
  inStock: boolean;
  isFeatured?: boolean;
  isBestSeller?: boolean;
  isNew?: boolean;
  availableSizes?: string[];
  threeDType?: 'ring' | 'gem' | 'pendant';
}

export interface CartItem {
  id: string; // unique item key: productId + material + size
  product: Product;
  quantity: number;
  selectedMaterial: MaterialType;
  selectedSize?: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
}

export interface FilterState {
  category: CategoryType;
  material: string;
  collection: string;
  minPrice: number;
  maxPrice: number;
  inStockOnly: boolean;
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest';
  searchQuery: string;
}

export interface CollectionInfo {
  id: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
  heroImage: string;
  itemCount: number;
}
