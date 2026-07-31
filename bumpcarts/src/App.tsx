import Navbar from './components/Navbar';
import CartDrawer from './components/CartDrawer';
import './App.css';

export default function App() {
  return (
    <div className="app">
      <Navbar />
      <main className="main-content">
      </main>
      <CartDrawer />
    </div>
  );
}