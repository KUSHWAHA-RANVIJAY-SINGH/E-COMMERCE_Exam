'use client';
import { useState, useEffect, useCallback } from 'react';

interface CartItem {
  _id: string;
  name: string;
  price: number;
  category: string;
  quantity: number;
}

export function useCart() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const loadCart = () => {
        try {
          const raw = localStorage.getItem('cart');
          const cartData = raw ? JSON.parse(raw) : [];
          setCart(cartData);
          setCartCount(cartData.reduce((sum: number, item: CartItem) => sum + (item.quantity || 0), 0));
        } catch (e) {
          setCart([]);
          setCartCount(0);
        }
      };

      loadCart();
      window.addEventListener('storage', loadCart);
      return () => window.removeEventListener('storage', loadCart);
    }
  }, []);

  const updateCart = useCallback((newCart: CartItem[]) => {
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
    setCartCount(newCart.reduce((sum, item) => sum + (item.quantity || 0), 0));
    window.dispatchEvent(new Event('storage'));
  }, []);

  const addToCart = useCallback((product: Omit<CartItem, 'quantity'>) => {
    const existing = cart.find(c => c._id === product._id);
    const newCart = existing
      ? cart.map(c => c._id === product._id ? { ...c, quantity: c.quantity + 1 } : c)
      : [...cart, { ...product, quantity: 1 }];
    updateCart(newCart);
  }, [cart, updateCart]);

  const removeFromCart = useCallback((id: string) => {
    updateCart(cart.filter(c => c._id !== id));
  }, [cart, updateCart]);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    if (quantity < 1) return;
    updateCart(cart.map(c => c._id === id ? { ...c, quantity } : c));
  }, [cart, updateCart]);

  const clearCart = useCallback(() => {
    updateCart([]);
  }, [updateCart]);

  const getTotal = useCallback(() => {
    return cart.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0).toFixed(2);
  }, [cart]);

  return { cart, cartCount, addToCart, removeFromCart, updateQuantity, clearCart, getTotal };
}

