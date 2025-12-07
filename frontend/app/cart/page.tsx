'use client';

import { useState } from 'react';
import Link from 'next/link';
import api from '../../lib/api';
import { useCart } from '../../hooks/useCart';
import { useToast } from '../../hooks/useToast';
import Toast from '../../components/ui/Toast';

// --- Icons ---
const TrashIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /></svg>
);

const EmptyCartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="#e2e8f0" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="21" r="1" /><circle cx="19" cy="21" r="1" /><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" /></svg>
);

const ArrowRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
);

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, clearCart, getTotal } = useCart();
  const { toast, showToast, hideToast } = useToast();
  const [loading, setLoading] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price * 83);
  };

  const handleCheckout = async () => {
    if (cart.length === 0) return;
    setLoading(true);
    try {
      const payload = {
        items: cart.map((c) => ({
          productId: c._id,
          quantity: c.quantity,
          priceAtPurchase: c.price // Keep original price for backend
        }))
      };
      await api.post('/orders', payload);
      showToast('Order placed successfully! 🎉', 'success');
      clearCart();
      setTimeout(() => window.location.href = '/products', 2000);
    } catch (err: any) {
      showToast(err.response?.data?.message || 'Checkout failed.', 'error');
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center bg-slate-50 p-4">
        <div className="bg-white p-12 rounded-3xl shadow-sm border border-slate-100 text-center max-w-md w-full">
          <div className="flex justify-center mb-6 animate-pulse">
            <EmptyCartIcon />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Your cart is empty</h2>
          <p className="text-slate-500 mb-8">Looks like you haven't added anything to your cart yet.</p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 bg-indigo-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200"
          >
            Start Shopping <ArrowRightIcon />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-900 mb-8">Shopping Cart</h1>

        <div className="flex flex-col lg:flex-row gap-8">

          {/* LEFT: Cart Items List */}
          <div className="flex-1 space-y-4">
            {cart.map((item) => (
              <div key={item._id} className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col sm:flex-row gap-6 items-center">

                {/* Product Image Placeholder */}
                <div className="w-24 h-24 bg-slate-100 rounded-xl flex items-center justify-center flex-shrink-0 text-3xl">
                  🛍️
                </div>

                {/* Product Details */}
                <div className="flex-1 w-full text-center sm:text-left">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-bold text-lg text-slate-800">{item.name}</h3>
                      <p className="text-sm text-slate-500 capitalize">{item.category}</p>
                    </div>
                    <p className="font-bold text-lg text-slate-900 hidden sm:block">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                  </div>

                  <div className="flex items-center justify-between sm:justify-start gap-6 mt-4">
                    {/* Quantity Controls */}
                    <div className="flex items-center bg-slate-50 rounded-lg border border-slate-200">
                      <button
                        onClick={() => updateQuantity(item._id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                        className="w-8 h-8 flex items-center justify-center text-slate-600 hover:bg-white rounded-l-lg transition disabled:opacity-50"
                      >
                        -
                      </button>
                      <span className="w-10 text-center text-sm font-semibold">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item._id, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center text-slate-600 hover:bg-white rounded-r-lg transition"
                      >
                        +
                      </button>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => removeFromCart(item._id)}
                      className="flex items-center gap-1 text-red-500 text-sm font-medium hover:text-red-600 transition"
                    >
                      <TrashIcon /> <span className="hidden sm:inline">Remove</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT: Order Summary */}
          <div className="lg:w-[380px] flex-shrink-0">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 sticky top-4">
              <h2 className="text-xl font-bold text-slate-900 mb-6">Order Summary</h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal</span>
                  <span>{formatPrice(Number(getTotal()))}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Shipping</span>
                  <span className="text-green-600 font-medium">Free</span>
                </div>
                <div className="border-t border-slate-100 pt-3 mt-3">
                  <div className="flex justify-between font-bold text-lg text-slate-900">
                    <span>Total</span>
                    <span>{formatPrice(Number(getTotal()))}</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1 text-right">Including taxes</p>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                disabled={loading}
                className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2"
              >
                {loading ? 'Processing...' : 'Checkout Now'}
              </button>

              <div className="mt-6 flex justify-center gap-4 opacity-50 grayscale">
                {/* Payment Icons Placeholder */}
                <div className="h-6 w-10 bg-slate-200 rounded"></div>
                <div className="h-6 w-10 bg-slate-200 rounded"></div>
                <div className="h-6 w-10 bg-slate-200 rounded"></div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {toast.show && <Toast message={toast.message} type={toast.type} onClose={hideToast} />}
    </div>
  );
}