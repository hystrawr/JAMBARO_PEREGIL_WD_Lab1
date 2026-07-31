export default function Navbar() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="relative w-full mx-auto">
        <div className="absolute -bottom-2 left-2 right-2 h-full bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-2xl opacity-70 blur-md pointer-events-none"></div>
        <nav className="relative flex items-center justify-between w-full px-4 py-4 bg-zinc-950">
          <h1 className="text-2xl font-bold text-white">WhatName</h1>

          <div className="relative flex-1 max-w-xl mx-6">
            <input
              type="text"
              className="w-full bg-white text-black pl-4 pr-10 py-1.5 rounded-md focus:outline-none text-sm font-medium"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-pink-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />

              </svg>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="text-sm font-medium text-white">Sort by:</span>

            <div className="relative">
              <select className="appearance-none bg-pink-500 text-white font-semibold text-xs px-4 py-1.5 pr-7 rounded-md cursor-pointer focus:outline-none">
                <option>Category</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none text-white text-[10px]">
                ▼
              </div>
            </div>

            <div className="relative">
              <select className="appearance-none bg-pink-500 text-white font-semibold text-xs px-4 py-1.5 pr-7 rounded-md cursor-pointer focus:outline-none">
                <option>Price</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none text-white text-[10px]">
                ▼
              </div>
            </div>

            <div className="relative ml-4 cursor-pointer">
              <svg
                className="w-7 h-7 text-pink-500"
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
              <span className="absolute -top-1.5 -right-2 bg-pink-500 text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                5
              </span>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}