import React from 'react';
import { useShop } from '../context/ShopContext';

export default function FilterBar() {
  const { state, dispatch } = useShop();
  const { filters, products } = state;

  const categories = ['All', ...Array.from(new Set(products.map((p) => p.category)))];

  return (
    <div className="flex flex-wrap items-center gap-4 p-4 bg-zinc-900 rounded-xl border border-zinc-800">
      {/* search bar */}
      <input
        type="text"
        placeholder="Search products..."
        value={filters.searchQuery}
        onChange={(e) => dispatch({ type: 'SET_SEARCH_QUERY', payload: e.target.value })}
        className="flex-1 min-w-[200px] bg-zinc-800 text-white px-3 py-2 rounded-md text-sm border border-zinc-700 focus:outline-none focus:border-pink-500"
      />

      {/* category */}
      <select
        value={filters.category}
        onChange={(e) =>
          dispatch({ type: 'SET_CATEGORY', payload: e.target.value === 'All' ? '' : e.target.value })
        }
        className="bg-zinc-800 text-white px-3 py-2 rounded-md text-sm border border-zinc-700 cursor-pointer focus:outline-none"
      >
        {categories.map((cat) => (
          <option key={cat} value={cat === 'All' ? '' : cat}>
            {cat}
          </option>
        ))}
      </select>

      {/* price */}
      <div className="flex items-center gap-2 text-xs text-zinc-400">
        <span>Max Price:</span>
        <input
          type="range"
          min="0"
          max="20000"
          step="500"
          value={filters.maxPrice === Infinity ? 20000 : filters.maxPrice}
          onChange={(e) => dispatch({ type: 'SET_MAX_PRICE', payload: Number(e.target.value) })}
          className="accent-pink-500 cursor-pointer"
        />
        <span className="font-bold text-white">
          {filters.maxPrice === Infinity ? 'Any' : `₱${filters.maxPrice}`}
        </span>
      </div>

      {/* sort */}
      <select
        value={filters.sortBy}
        onChange={(e) =>
          dispatch({
            type: 'SET_SORT',
            payload: e.target.value as 'default' | 'price-asc' | 'price-desc',
          })
        }
        className="bg-zinc-800 text-white px-3 py-2 rounded-md text-sm border border-zinc-700 cursor-pointer focus:outline-none"
      >
        <option value="default">Default</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
      </select>
    </div>
  );
}