import React from 'react';
import { useShop } from '../context/ShopContext';

export default function CartDrawer() {
  const { state, dispatch, subtotal, totalCartCount } = useShop();

  const shippingFee = state.cart.length > 0 ? 150 : 0;
  const grandTotal = subtotal + shippingFee;

  
  const handleCheckout = () => {
    alert('Thank you for your purchase! Your order has been placed and shipped out successfully. 🚀');
    dispatch({ type: 'CLEAR_CART' });
    dispatch({ type: 'TOGGLE_CART', payload: false });
  };

  if (!state.isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm">
      <div 
        className="flex-1" 
        onClick={() => dispatch({ type: 'TOGGLE_CART', payload: false })} 
      />

      <div className="w-full max-w-md bg-zinc-950 text-white h-full flex flex-col justify-between border-l border-zinc-800 p-6 shadow-2xl relative overflow-y-auto">
        <div>
          <div className="flex items-center justify-between pb-6 border-b border-pink-500/30">
            <div className="flex items-center gap-3">
              <div className="relative">
                <svg
                  className="w-8 h-8 text-pink-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z"
                  />
                </svg>
                {totalCartCount > 0 && (
                  <span className="absolute -top-1 -right-2 bg-pink-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                    {totalCartCount}
                  </span>
                )}
              </div>
              <h2 className="text-2xl font-bold text-white tracking-wide">My Cart</h2>
            </div>

            <button
              onClick={() => dispatch({ type: 'TOGGLE_CART', payload: false })}
              className="text-zinc-400 hover:text-white text-xl font-bold p-1"
            >
              ✕
            </button>
          </div>
          <div className="mt-6 flex flex-col divide-y divide-pink-500/30">
            {state.cart.length === 0 ? (
              <p className="text-zinc-500 text-center py-10">Your cart is empty.</p>
            ) : (
              state.cart.map((item) => (
                <div key={item.id} className="py-5 flex gap-4 items-center">
                  <div className="w-20 h-20 bg-white rounded-md p-1 flex items-center justify-center shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-lg text-white truncate">{item.name}</h3>
                    <p className="text-zinc-400 text-sm mt-0.5">
                      ₱{item.price.toLocaleString()}
                    </p>

                    <div className="flex items-center justify-end gap-3 mt-3">
                      <button
                        onClick={() =>
                          dispatch({
                            type: 'UPDATE_QUANTITY',
                            payload: { id: item.id, quantity: item.quantity - 1 },
                          })
                        }
                        className="w-6 h-6 rounded-full bg-pink-500 text-white flex items-center justify-center font-bold text-sm hover:bg-pink-600 transition-colors"
                      >
                        -
                      </button>

                      <span className="text-white font-semibold text-sm">{item.quantity}</span>

                      <button
                        onClick={() =>
                          dispatch({
                            type: 'UPDATE_QUANTITY',
                            payload: { id: item.id, quantity: item.quantity + 1 },
                          })
                        }
                        className="w-6 h-6 rounded-full bg-pink-500 text-white flex items-center justify-center font-bold text-sm hover:bg-pink-600 transition-colors"
                      >
                        +
                      </button>

                      <button
                        onClick={() =>
                          dispatch({ type: 'REMOVE_FROM_CART', payload: item.id })
                        }
                        className="ml-2 text-zinc-400 hover:text-pink-500 transition-colors"
                        title="Remove item"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="border-t border-pink-500/40 pt-4 mt-6">
          <div className="flex justify-between text-sm text-zinc-300 mb-1">
            <span>Subtotal</span>
            <span className="font-medium text-white">₱{subtotal.toLocaleString()}</span>
          </div>

          <div className="flex justify-between text-sm text-zinc-300 mb-6">
            <span>Shipping Fee</span>
            <span className="font-medium text-white">
              {shippingFee > 0 ? `₱${shippingFee.toLocaleString()}` : '₱0'}
            </span>
          </div>

          <div className="flex justify-between items-baseline mb-6">
            <span className="text-2xl font-bold text-white">Total</span>
            <span className="text-3xl font-extrabold text-white">
              ₱{grandTotal.toLocaleString()}
            </span>
          </div>

          <button
            onClick={handleCheckout}
            disabled={state.cart.length === 0}
            className="w-full bg-pink-500 hover:bg-pink-600 disabled:bg-zinc-800 disabled:text-zinc-500 text-white font-bold py-3.5 rounded-lg text-lg transition-all shadow-lg shadow-pink-500/20 active:scale-[0.99]"
          >
            Checkout
          </button>
        </div>

      </div>
    </div>
  );
}