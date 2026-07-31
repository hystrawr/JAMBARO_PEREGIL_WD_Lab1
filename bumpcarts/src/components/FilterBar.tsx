// src/components/FilterBar.tsx
import React from 'react';
import { useShop } from '../context/ShopContext';

export default function FilterBar() {
  const { state, dispatch } = useShop();
  const { filters, products } = state;

  const categories = ['All', ...Array.from(new Set(products.map((p) => p.category)))];

  return (
    <div className="flex flex-wrap items-center gap-4 p-4 bg-zinc-950">
      {/* Search Bar */}
      <div className="relative flex-1 min-w-[220px]">
        <input
          type="text"
          placeholder="Search products..."
          value={filters.searchQuery}
          onChange={(e) => dispatch({ type: 'SET_SEARCH_QUERY', payload: e.target.value })}
          className="w-full bg-zinc-900 text-white pl-4 pr-10 py-2 rounded-lg text-sm border border-zinc-800 focus:outline-none focus:border-pink-500 transition-colors"
        />
        <svg className="w-4 h-4 text-pink-500 absolute right-3 top-3 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>

      {/* Category Dropdown */}
      <select
        value={filters.category}
        onChange={(e) => dispatch({ type: 'SET_CATEGORY', payload: e.target.value === 'All' ? '' : e.target.value })}
        className="bg-zinc-900 text-white px-3 py-2 rounded-lg text-sm border border-zinc-800 cursor-pointer focus:outline-none focus:border-pink-500"
      >
        {categories.map((cat) => (
          <option key={cat} value={cat === 'All' ? '' : cat}>
            {cat === 'All' ? 'All Categories' : cat}
          </option>
        ))}
      </select>

      {/* Price Range Slider */}
      <div className="flex items-center gap-3 bg-zinc-900 px-3 py-1.5 rounded-lg border border-zinc-800 text-xs text-zinc-400">
        <span>Max Price:</span>
        <input
          type="range"
          min="0"
          max="20000"
          step="500"
          value={filters.maxPrice}
          onChange={(e) => dispatch({ type: 'SET_MAX_PRICE', payload: Number(e.target.value) })}
          className="accent-pink-500 cursor-pointer w-25"
        />
        <span className="font-bold text-white w-14 text-right">
          ₱{filters.maxPrice.toLocaleString()}
        </span>
      </div>

      {/* Price Sort Dropdown */}
      <select
        value={filters.sortBy}
        onChange={(e) => dispatch({ type: 'SET_SORT', payload: e.target.value as 'default' | 'price-asc' | 'price-desc' })}
        className="bg-zinc-900 text-white px-4 py-2 rounded-lg text-sm border border-zinc-800 cursor-pointer focus:outline-none focus:border-pink-500"
      >
        <option value="default">Sort: Default</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
      </select>
    </div>
  );
}