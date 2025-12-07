'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '../hooks/useCart';

// Simple Icons
const SearchIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>;
const CartIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="21" r="1" /><circle cx="19" cy="21" r="1" /><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" /></svg>;
const UserIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>;

export default function Navbar() {
  const [user, setUser] = useState<{ name: string } | null>(null);
  const [query, setQuery] = useState('');
  const { cartCount } = useCart();
  const router = useRouter();

  useEffect(() => {
    const updateUser = () => setUser(JSON.parse(localStorage.getItem('user') || 'null'));
    updateUser();
    window.addEventListener('user-updated', updateUser);
    return () => window.removeEventListener('user-updated', updateUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.dispatchEvent(new Event('user-updated'));
    setUser(null);
    router.push('/login');
  };

  const onSearch = (e: any) => {
    if (e.key === 'Enter') router.push(`/products?search=${query}`);
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-slate-900 tracking-tight">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">S</div>
          ShopHub
        </Link>

        {/* Search Bar - Hidden on mobile */}
        <div className="hidden md:flex flex-1 max-w-md relative">
          <input
            className="w-full bg-slate-100 border border-transparent rounded-full pl-4 pr-10 py-2 text-sm focus:bg-white focus:border-blue-500 focus:outline-none transition-all"
            placeholder="Search products..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onSearch}
          />
          <button onClick={() => router.push(`/products?search=${query}`)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-600">
            <SearchIcon />
          </button>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-6">
          <Link href="/products" className="text-sm font-medium text-slate-600 hover:text-blue-600 hidden sm:block">Products</Link>
          {user && (
            <Link href="/orders" className="text-sm font-medium text-slate-600 hover:text-blue-600 hidden sm:block">My Orders</Link>
          )}
          {user && (user as any).role === 'admin' && (
            <Link href="/reports" className="text-sm font-medium text-purple-600 hover:text-purple-700 font-semibold hidden sm:block">Reports</Link>
          )}

          <Link href="/cart" className="relative text-slate-700 hover:text-blue-600 transition">
            <CartIcon />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold h-5 w-5 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

          {user ? (
            <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
              <span className="text-sm font-medium text-slate-900 hidden sm:block">{user.name}</span>
              <button onClick={handleLogout} className="text-sm text-red-500 hover:bg-red-50 px-3 py-1.5 rounded-md font-medium transition">
                Logout
              </button>
            </div>
          ) : (
            <Link href="/login" className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full text-sm font-semibold transition shadow-md shadow-blue-200">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}