import React, { createContext, useState, useEffect, useContext } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('ecom_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [wishlistItems, setWishlistItems] = useState(() => {
    const saved = localStorage.getItem('ecom_wishlist');
    return saved ? JSON.parse(saved) : [];
  });
  const [toast, setToast] = useState('');

  useEffect(() => {
    localStorage.setItem('ecom_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => { localStorage.setItem('ecom_wishlist', JSON.stringify(wishlistItems)); }, [wishlistItems]);
  useEffect(() => { if (!toast) return undefined; const timer = setTimeout(() => setToast(''), 2600); return () => clearTimeout(timer); }, [toast]);

  const addToCart = (product, quantity = 1) => {
    const cartKey = `${product._id || product.slug}-${product.selectedSize || ''}-${product.selectedColor || ''}`;
    setCartItems(prev => {
      const exist = prev.find(item => item._cartKey === cartKey || (!item._cartKey && (item._id === product._id || item.slug === product.slug) && item.selectedSize === product.selectedSize));
      if (exist) {
        return prev.map(item =>
          (item._cartKey === cartKey || item === exist)
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...product, _cartKey: cartKey, quantity }];
    });
    setToast(`${product.title} added to your bag`);
  };

  const removeFromCart = (id) => {
    setCartItems(prev => prev.filter(item => (item._cartKey || item._id || item.slug) !== id));
  };

  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        (item._cartKey || item._id || item.slug) === id ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const toggleWishlist = (product) => {
    const id = product._id || product.slug;
    const saved = wishlistItems.some(item => (item._id || item.slug) === id);
    setWishlistItems(prev => saved ? prev.filter(item => (item._id || item.slug) !== id) : [...prev, product]);
    setToast(saved ? 'Removed from your wishlist' : 'Saved to your wishlist');
  };

  const cartTotal = cartItems.reduce((acc, item) => acc + (item.discountPrice || item.price) * item.quantity, 0);
  const cartItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        wishlistItems,
        toggleWishlist,
        toast,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        cartItemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
