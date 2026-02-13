
import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, Product } from '../types';

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity: number, color: string) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const storedCart = localStorage.getItem('ar_retail_cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('ar_retail_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product, quantity: number, color: string) => {
    setCart(prev => {
      const existing = prev.find(item => item.productId === product.id && item.selectedColor === color);
      if (existing) {
        return prev.map(item =>
          item.productId === product.id && item.selectedColor === color
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { productId: product.id, quantity, selectedColor: color, product }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.productId !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev => prev.map(item => item.productId === productId ? { ...item, quantity } : item));
  };

  const clearCart = () => setCart([]);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = cart.reduce((acc, item) => acc + (item.product?.price || 0) * item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, cartCount, cartTotal }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
