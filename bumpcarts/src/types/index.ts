export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string; 
  inStock: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Filters {
  searchQuery: string;
  category: string;
  maxPrice: number;
  sortBy: 'default' | 'price-asc' | 'price-desc';
}

export interface State {
  products: Product[];
  cart: CartItem[];
  filters: Filters;
  isCartOpen: boolean;
}

export type Action =
  | { type: 'ADD_TO_CART'; payload: Product }
  | { type: 'REMOVE_FROM_CART'; payload: string } // id
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'SET_SEARCH_QUERY'; payload: string }
  | { type: 'SET_CATEGORY'; payload: string }
  | { type: 'SET_SORT'; payload: string }
  | { type: 'TOGGLE_CART'; payload?: boolean }
  | { type: 'SET_MAX_PRICE'; payload: number }; 