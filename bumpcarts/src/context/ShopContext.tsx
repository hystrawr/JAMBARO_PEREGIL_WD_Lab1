import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { State, Action, Product } from '../types';
import { products as initialProducts } from '../data/products';

const initialState: State = {
  products: initialProducts,
  cart: [],
  filters: {
    searchQuery: '',
    category: '',
    maxPrice: 20000,
    sortBy: 'default',
  },
  isCartOpen: false,
};

function shopReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'ADD_TO_CART': {
  const existingItemIndex = state.cart.findIndex((item) => item.id === action.payload.id);

  if (existingItemIndex > -1) {
    const updatedCart = state.cart.map((item, index) =>
      index === existingItemIndex
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
    return { ...state, cart: updatedCart };
  }

  return {
    ...state,
    cart: [...state.cart, { ...action.payload, quantity: 1 }],
  };
}

    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload),
      };

    case 'UPDATE_QUANTITY': {
      const { id, quantity } = action.payload;
      if (quantity <= 0) {
        return {
          ...state,
          cart: state.cart.filter((item) => item.id !== id),
        };
      }
      return {
        ...state,
        cart: state.cart.map((item) => (item.id === id ? { ...item, quantity } : item)),
      };
    }

    case 'CLEAR_CART':
      return { ...state, cart: [] };

    case 'SET_SEARCH_QUERY':
      return {
        ...state,
        filters: { ...state.filters, searchQuery: action.payload },
      };

    case 'SET_CATEGORY':
      return {
        ...state,
        filters: { ...state.filters, category: action.payload },
      };

    case 'SET_SORT':
      return {
        ...state,
        filters: {
          ...state.filters,
          sortBy: action.payload as 'default' | 'price-asc' | 'price-desc',
        },
      };

    case 'SET_MAX_PRICE':
      return {
        ...state,
        filters: { ...state.filters, maxPrice: action.payload },
      };

    case 'TOGGLE_CART':
      return {
        ...state,
        isCartOpen: action.payload !== undefined ? action.payload : !state.isCartOpen,
      };

    default:
      return state;
  }
}

interface ShopContextType {
  state: State;
  dispatch: React.Dispatch<Action>;
  subtotal: number;
  totalCartCount: number;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(shopReducer, initialState);

  const subtotal = state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalCartCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <ShopContext.Provider value={{ state, dispatch, subtotal, totalCartCount }}>
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};