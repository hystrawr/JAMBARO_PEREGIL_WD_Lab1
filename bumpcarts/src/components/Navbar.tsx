import React from 'react';
import { useShop } from '../context/ShopContext';
import FilterBar from './FilterBar';

export default function Navbar() {
  const { dispatch, totalCartCount } = useShop();

  return (
    <div className="relative w-full mx-auto">
      <div className="absolute -bottom-2 left-2 right-2 h-full bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-2xl opacity-70 blur-md pointer-events-none" />
      
      <nav className="relative flex items-center justify-between w-full px-6 py-4 bg-zinc-950 rounded-xl">
        <h1 className="text-2xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-500 cursor-pointer select-none">GearHub</h1>

        <div className="flex-1 w-full max-1-3xl mx-6">
          <FilterBar />
        </div>
        
        {/* Cart Icon Button */}
        <button
          onClick={() => dispatch({ type: 'TOGGLE_CART' })}
          className="relative cursor-pointer p-2 rounded-lg hover:bg-zinc-900 transition-colors focus:outline-none"
          aria-label="Open Shopping Cart"
        >
          <svg className="w-7 h-7 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
          </svg>
          {totalCartCount > 0 && (
            <span className="absolute top-0 right-0 transform translate-x-1/3 -translate-y-1/3 bg-pink-500 text-white text-[10px] font-black px-1.5 py-0.5 rounded-full animate-pulse">
              {totalCartCount}
            </span>
          )}
        </button>
      </nav>
    </div>
  );
}