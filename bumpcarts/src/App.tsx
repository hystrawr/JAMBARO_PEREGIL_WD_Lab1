import { ShopProvider } from './context/ShopContext';
import './App.css';
import Navbar from './components/Navbar';
import FilterBar from './components/FilterBar';
import CartDrawer from './components/CartDrawer';
import ProductGrid from './components/ProductGrid';


export default function App() {
  return (
    <ShopProvider>
      <div className="min-h-screen bg-black text-white">
        <Navbar />
        <main className="main-content">
          <ProductGrid />
        </main>
        <CartDrawer />
      </div>
    </ShopProvider>
  );
}