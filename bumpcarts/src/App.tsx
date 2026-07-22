import React, { useState } from 'react';

export default function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black">
      <h1 className="text-4xl font-bold text-white">Grid of products</h1>
      <p className="text-lg text-gray-300">blablabla</p>
    </div>
  );
}