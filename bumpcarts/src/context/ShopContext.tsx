import { createContext, useContext, useReducer, type ReactNode } from 'react';
import type { State, Action, CartItem } from '../types';
import { products as productData } from '../data/products';

export type ShopState = State;

const initialState: ShopState = {
  products: productData,
  cart: [],
  filters: {
    searchQuery: '',
    category: '',
    maxPrice: Infinity,
    sortBy: 'default',
  },
  isCartOpen: false,
};

function shopReducer(state: ShopState, action: Action): ShopState {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const product = action.payload;
      const existing = state.cart.find((item: CartItem) => item.id === product.id);

      if (existing) {
        return {
          ...state,
          cart: state.cart.map((item: CartItem) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }

      return {
        ...state,
        cart: [...state.cart, { ...product, quantity: 1 }],
      };
    }

    case 'REMOVE_FROM_CART': {
      const id = action.payload;
      return {
        ...state,
        cart: state.cart.filter((item: CartItem) => item.id !== id),
      };
    }

    case 'UPDATE_QUANTITY': {
      const { id, quantity } = action.payload;
      if (quantity <= 0) {
        return {
          ...state,
          cart: state.cart.filter((item: CartItem) => item.id !== id),
        };
      }
      return {
        ...state,
        cart: state.cart.map((item: CartItem) =>
          item.id === id ? { ...item, quantity } : item
        ),
      };
    }

    case 'CLEAR_CART':
      return { ...state, cart: [] };

    case 'SET_SEARCH_QUERY':
      return { ...state, filters: { ...state.filters, searchQuery: action.payload } };

    case 'SET_CATEGORY':
      return { ...state, filters: { ...state.filters, category: action.payload } };

    case 'SET_SORT':
      return { ...state, filters: { ...state.filters, sortBy: action.payload as State['filters']['sortBy'] } };

    case 'TOGGLE_CART':
      return {
        ...state,
        isCartOpen: typeof action.payload === 'boolean' ? action.payload : !state.isCartOpen,
      };

    case 'SET_MAX_PRICE':
      return { ...state, filters: { ...state.filters, maxPrice: action.payload } };

    default:
      return state;
  }
}

interface ShopContextValue {
  state: ShopState;
  dispatch: React.Dispatch<Action>;
  totalCartItems: number;
  subtotal: number;
}

const ShopContext = createContext<ShopContextValue | null>(null);

export function ShopProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(shopReducer, initialState);

  const totalCartItems = state.cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <ShopContext.Provider value={{ state, dispatch, totalCartItems, subtotal }}>
      {children}
    </ShopContext.Provider>
  );
}

export function useShop(): ShopContextValue {
  const ctx = useContext(ShopContext);
  if (!ctx) {
    throw new Error('useShop must be used inside a ShopProvider');
  }
  return ctx;
}