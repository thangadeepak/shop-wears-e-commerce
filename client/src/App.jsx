import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import OrdersPage from './pages/OrdersPage';
import ExtrasPage, { WishlistPage } from './pages/ExtrasPage';
import { MessageCircle } from 'lucide-react';
import { useCart } from './context/CartContext';

function App() {
  const { toast } = useCart();
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <main style={{ flexGrow: 1 }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/account" element={<OrdersPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/about" element={<ExtrasPage />} />
          <Route path="/contact" element={<ExtrasPage />} />
          <Route path="/faq" element={<ExtrasPage />} />
          <Route path="/shipping-returns" element={<ExtrasPage />} />
          <Route path="/size-guide" element={<ExtrasPage />} />
          <Route path="/privacy" element={<ExtrasPage />} />
          <Route path="/terms" element={<ExtrasPage />} />
        </Routes>
      </main>
      <Footer />
      {toast&&<div role="status" aria-live="polite" className="store-toast">{toast}</div>}
      <a className="whatsapp-support" href="https://wa.me/919876543210" aria-label="Chat with us on WhatsApp"><MessageCircle /></a>
    </div>
  );
}

export default App;
