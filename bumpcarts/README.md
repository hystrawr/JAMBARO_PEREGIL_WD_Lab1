# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is enabled on this template. See [this documentation](https://react.dev/learn/react-compiler) for more information.

Note: This will impact Vite dev & build performances.

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

'import React, { useState } from 'react';

export default function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <body className="bg-black text-white">

        <div className="relative w-full max-w-7xl mx-auto">
          <div className="absolute -bottom-1 left-2 right-2 h-full bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-2xl opacity-70 blur-md pointer-events-none"></div>
          <nav className="relative flex items-center justify-between w-full px-4 py-4 bg-zinc-950"> </nav>
        </div>
      
    </body>
  );
}'
