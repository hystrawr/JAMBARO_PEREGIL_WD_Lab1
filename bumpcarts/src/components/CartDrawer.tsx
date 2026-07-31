import React from 'react';
import { useShop } from '../context/ShopContext';

export default function CartDrawer() {
  const { state, dispatch, subtotal } = useShop();
  const { cart, isCartOpen } = state;

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-md bg-zinc-950 border-l border-zinc-800 text-white h-full flex flex-col justify-between p-6 shadow-2xl">
        {/* header */}
        <div>
          <div className="flex justify-between items-center pb-4 border-b border-zinc-800">
            <h2 className="text-xl font-bold text-pink-500">Your Cart</h2>
            <button
              onClick={() => dispatch({ type: 'TOGGLE_CART', payload: false })}
              className="text-zinc-400 hover:text-white text-lg font-bold"
            >
              ✕
            </button>
          </div>

          {/* list */}
          <div className="mt-4 space-y-4 max-h-[60vh] overflow-y-auto pr-1">
            {cart.length === 0 ? (
              <p className="text-zinc-500 text-center py-8">Your cart is currently empty.</p>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between bg-zinc-900 p-3 rounded-lg border border-zinc-800"
                >
                  <div>
                    <h4 className="font-semibold text-sm line-clamp-1">{item.name}</h4>
                    <p className="text-pink-500 text-xs font-bold mt-0.5">
                      ₱{item.price.toLocaleString()}
                    </p>
                  </div>

                  {/* inc&decre */}
                  <div className="flex items-center gap-3">
                    <div className="flex items-center border border-zinc-700 rounded">
                      <button
                        onClick={() =>
                          dispatch({
                            type: 'UPDATE_QUANTITY',
                            payload: { id: item.id, quantity: item.quantity - 1 },
                          })
                        }
                        className="px-2 py-0.5 text-xs hover:bg-zinc-800"
                      >
                        -
                      </button>
                      <span className="px-2 text-xs font-bold">{item.quantity}</span>
                      <button
                        onClick={() =>
                          dispatch({
                            type: 'UPDATE_QUANTITY',
                            payload: { id: item.id, quantity: item.quantity + 1 },
                          })
                        }
                        className="px-2 py-0.5 text-xs hover:bg-zinc-800"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => dispatch({ type: 'REMOVE_FROM_CART', payload: item.id })}
                      className="text-red-400 hover:text-red-300 text-xs font-semibold"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* footer */}
        <div className="border-t border-zinc-800 pt-4">
          <div className="flex justify-between items-center mb-4">
            <span className="text-zinc-400 text-sm">Subtotal:</span>
            <span className="text-2xl font-black text-pink-500">
              ₱{subtotal.toLocaleString()}
            </span>
          </div>

          <div className="flex gap-2">
            <button
              disabled={cart.length === 0}
              onClick={() => dispatch({ type: 'CLEAR_CART' })}
              className="w-1/3 py-2 bg-zinc-800 hover:bg-zinc-700 disabled:opacity-50 text-xs font-bold rounded-md transition-colors"
            >
              Clear
            </button>
            <button
              disabled={cart.length === 0}
              onClick={() => {
                alert('Checkout processing!');
                dispatch({ type: 'CLEAR_CART' });
                dispatch({ type: 'TOGGLE_CART', payload: false });
              }}
              className="w-2/3 py-2 bg-pink-500 hover:bg-pink-600 disabled:opacity-50 text-xs font-bold rounded-md transition-colors"
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}