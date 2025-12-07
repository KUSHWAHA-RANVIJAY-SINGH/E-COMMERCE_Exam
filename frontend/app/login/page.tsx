'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import api from '../../lib/api';
import { useToast } from '../../hooks/useToast';
import Toast from '../../components/ui/Toast';

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const { toast, showToast, hideToast } = useToast();
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await api.post('/auth/login', form);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      window.dispatchEvent(new Event('user-updated'));
      router.push('/products');
    } catch (err: any) {
      showToast(err.response?.data?.message || 'Login failed', 'error');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
      {/* Card Container */}
      <div className="w-full max-w-sm bg-white p-8 rounded-2xl shadow-xl border border-slate-100">

        {/* Header */}
        <h1 className="text-2xl font-bold text-center mb-6 text-slate-900">Login</h1>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">

          {/* Email Field with Icon */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-600 ml-1">Email Address</label>
            <div className="relative">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full pl-4 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:bg-white transition-all placeholder:text-slate-400"
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
              {/* Mail Icon SVG */}
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
              </div>
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-600 ml-1">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:bg-white transition-all placeholder:text-slate-400"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
          </div>

          {/* Forgot Password Link - Aligned Left */}
          <div className="flex justify-start">
            <Link href="/forgot-password" className="text-xs font-medium text-blue-600 hover:text-blue-700">
              Forgot password?
            </Link>
          </div>

          {/* Submit Button */}
          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg transition-all shadow-md hover:shadow-lg mt-2 text-sm">
            Sign In
          </button>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center text-xs text-slate-500">
          Don't have an account?{' '}
          <Link href="/register" className="text-blue-600 font-bold hover:underline">
            Sign up now
          </Link>
        </div>
      </div>

      {toast.show && <Toast message={toast.message} type={toast.type} onClose={hideToast} />}
    </div>
  );
}