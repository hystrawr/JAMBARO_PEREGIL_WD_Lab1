import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Product } from '../types';

export default function ProductGrid() {
  const { state, dispatch } = useShop();
  // Simple state to store the currently selected product for the modal
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const filteredProducts = state.products
    .filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(state.filters.searchQuery.toLowerCase());
      const matchesCategory = state.filters.category
        ? product.category === state.filters.category
        : true;
      const matchesPrice = product.price <= state.filters.maxPrice;
      return matchesSearch && matchesCategory && matchesPrice;
    })
    .sort((a, b) => {
      if (state.filters.sortBy === 'price-asc') return a.price - b.price;
      if (state.filters.sortBy === 'price-desc') return b.price - a.price;
      return 0;
    });

  return (
    <div className="p-6 relative">
      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            onClick={() => setSelectedProduct(product)}
            className="flex flex-col justify-between bg-zinc-950 border border-zinc-800 p-4 rounded-xl shadow-lg hover:border-pink-500/50 hover:scale-[1.02] cursor-pointer transition-all duration-200"
          >
            <div className="w-full h-64 bg-white flex items-center justify-center overflow-hidden rounded-t-xl p-2">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-contain hover:scale-115 transition-transform duration-300"
              />
            </div>
            <div>
              <h3 className="text-white font-semibold text-sm line-clamp-1">{product.name}</h3>
              <p className="text-zinc-400 text-xs mt-1">{product.category}</p>
              <div className="flex justify-between items-center mt-3">
                <span className="text-pink-500 font-bold text-base">
                  ₱{product.price.toLocaleString()}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Prevents modal from popping up when clicking 'Add to Cart'
                    dispatch({ type: 'ADD_TO_CART', payload: product });
                  }}
                  className="bg-pink-500 hover:bg-pink-600 text-white font-bold px-3 py-1.5 rounded-md text-xs transition-colors"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pop-up Modal (Rendered right inside ProductGrid) */}
      {selectedProduct && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
          onClick={() => setSelectedProduct(null)} // Close when clicking backdrop
        >
          <div 
            className="bg-zinc-950 border border-zinc-800 p-6 rounded-2xl max-w-md w-full shadow-2xl relative"
            onClick={(e) => e.stopPropagation()} // Prevent close when clicking inside modal
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-white text-lg font-bold"
            >
            
            </button>

            {/* Modal Content */}
            <div className="bg-white p-4 rounded-xl mb-4 flex justify-center items-center h-60 w-full overflow-hidden">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="w-full h-full object-contain hover:scale-115 transition-transform duration-300"
              />
            </div>

            <span className="text-xs font-semibold text-pink-500 uppercase tracking-wider">
              {selectedProduct.category}
            </span>
            <h2 className="text-xl font-bold text-white mt-1">{selectedProduct.name}</h2>
            
            <div className="flex items-center justify-between mt-6 pt-4 border-t border-zinc-800">
              <span className="text-2xl font-bold text-pink-500">
                ₱{selectedProduct.price.toLocaleString()}
              </span>
              <button
                onClick={() => {
                  dispatch({ type: 'ADD_TO_CART', payload: selectedProduct });
                  setSelectedProduct(null);
                }}
                className="bg-pink-500 hover:bg-pink-600 text-white font-bold px-4 py-2 rounded-lg text-sm"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}