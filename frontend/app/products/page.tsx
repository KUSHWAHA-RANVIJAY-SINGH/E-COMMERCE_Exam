'use client';
import { useEffect, useState } from 'react';
import api from '../../lib/api';
import { useCart } from '../../hooks/useCart';
import { useToast } from '../../hooks/useToast';
import Toast from '../../components/ui/Toast';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ search: '', sort: 'desc' });
  const { addToCart } = useCart();
  const { toast, showToast, hideToast } = useToast();

  const formatPrice = (price: number) => {
    // Assuming DB is in USD, multiply by 83 for INR conversion
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price * 83);
  };

  // This function generates an image URL based on the product name
  const getDynamicImage = (name: string) => {
    return `https://image.pollinations.ai/prompt/${encodeURIComponent(name)}?width=400&height=400&nologo=true`;
  };

  useEffect(() => {
    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const { data } = await api.get(`/products?search=${filters.search}`);
        setProducts(data.products || []);
      } catch (err) { showToast('Failed to load products', 'error'); }
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [filters, showToast]);

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Latest Collection</h1>
            <p className="text-slate-500 text-sm mt-1">Premium items at the best prices.</p>
          </div>
          <div className="flex w-full md:w-auto gap-2">
            <input
              placeholder="Search..."
              className="flex-1 md:w-64 px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-600 outline-none"
              onChange={(e) => setFilters(p => ({ ...p, search: e.target.value }))}
            />
            <select
              className="px-4 py-2 rounded-lg border border-slate-200 bg-white cursor-pointer outline-none"
              onChange={(e) => setFilters(p => ({ ...p, sort: e.target.value }))}
            >
              <option value="desc">Price: High to Low</option>
              <option value="asc">Price: Low to High</option>
            </select>
          </div>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="text-center py-20 text-slate-400 animate-pulse">Loading collection...</div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product: any) => (
              <div key={product._id} className="bg-white rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col group">

                {/* Dynamic Image Area */}
                <div className="aspect-square bg-slate-100 relative overflow-hidden">
                  <img
                    // This line creates an image based on the Product Name!
                    src={product.image || getDynamicImage(product.name)}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                    onError={(e) => {
                      // Fallback if the generator fails
                      e.currentTarget.src = "https://placehold.co/400x400/e2e8f0/1e293b?text=No+Image";
                    }}
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                </div>

                <div className="p-4 flex flex-col flex-1">
                  <h3 className="font-semibold text-slate-900 line-clamp-1">{product.name}</h3>
                  <p className="text-xs text-slate-500 mb-3 capitalize">{product.category}</p>

                  <div className="flex justify-between items-center mt-auto">
                    <span className="text-lg font-bold text-blue-600">
                      {formatPrice(product.price)}
                    </span>
                    <button
                      onClick={() => { addToCart(product); showToast('Added to cart!', 'success'); }}
                      className="bg-slate-900 hover:bg-blue-600 text-white p-2.5 rounded-lg transition-colors shadow-lg shadow-slate-200"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="M12 5v14" /></svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-slate-500">No products found.</div>
        )}
      </div>
      {toast.show && <Toast message={toast.message} type={toast.type} onClose={hideToast} />}
    </div>
  );
}