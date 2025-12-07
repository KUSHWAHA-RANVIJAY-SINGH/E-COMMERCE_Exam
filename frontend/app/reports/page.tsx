'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

interface DailyRevenue {
         date: string;
         revenue: number;
         orderCount: number;
}

interface CategoryStat {
         _id: string;
         productCount: number;
         avgPrice: number;
}

export default function ReportsPage() {
         const [revenueData, setRevenueData] = useState<DailyRevenue[]>([]);
         const [categoryData, setCategoryData] = useState<CategoryStat[]>([]);
         const [loading, setLoading] = useState(true);
         const [error, setError] = useState('');
         const router = useRouter();

         useEffect(() => {
                  const fetchReports = async () => {
                           const token = localStorage.getItem('token');
                           if (!token) {
                                    router.push('/login');
                                    return;
                           }

                           try {
                                    // Backend URL (assuming proxy or CORS setup, using full URL to be safe or relative if setup)
                                    const res = await axios.get('http://localhost:5000/api/reports', {
                                             headers: { Authorization: `Bearer ${token}` }
                                    });

                                    setRevenueData(res.data.dailyRevenue || []);
                                    setCategoryData(res.data.categoryStats || []);
                           } catch (err: any) {
                                    console.error(err);
                                    setError('Failed to load reports. Are you an admin?');
                           } finally {
                                    setLoading(false);
                           }
                  };

                  fetchReports();
         }, [router]);

         if (loading) return <div className="p-8 text-center">Loading reports...</div>;
         if (error) return <div className="p-8 text-center text-red-500">{error}</div>;

         return (
                  <div className="container mx-auto px-4 py-8">
                           <h1 className="text-3xl font-bold mb-8 text-slate-800">Analytics Reports</h1>

                           <div className="grid md:grid-cols-2 gap-8">
                                    {/* SQL Aggregation: Daily Revenue */}
                                    <div className="bg-white p-6 rounded-xl shadow-md border border-slate-100">
                                             <h2 className="text-xl font-semibold mb-4 text-blue-600">Daily Revenue (Last 7 Days)</h2>
                                             <div className="overflow-x-auto">
                                                      <table className="w-full text-left border-collapse">
                                                               <thead>
                                                                        <tr className="border-b border-slate-200">
                                                                                 <th className="py-2 text-slate-600">Date</th>
                                                                                 <th className="py-2 text-slate-600">Orders</th>
                                                                                 <th className="py-2 text-slate-600 text-right">Revenue</th>
                                                                        </tr>
                                                               </thead>
                                                               <tbody>
                                                                        {revenueData.length === 0 ? (
                                                                                 <tr><td colSpan={3} className="py-4 text-center text-slate-500">No sales data yet.</td></tr>
                                                                        ) : (
                                                                                 revenueData.map((day, idx) => (
                                                                                          <tr key={idx} className="border-b border-slate-50 last:border-0 hover:bg-slate-50">
                                                                                                   <td className="py-3 text-slate-800">{new Date(day.date).toLocaleDateString()}</td>
                                                                                                   <td className="py-3 text-slate-800">{day.orderCount}</td>
                                                                                                   <td className="py-3 text-slate-800 text-right font-medium">${Number(day.revenue).toFixed(2)}</td>
                                                                                          </tr>
                                                                                 ))
                                                                        )}
                                                               </tbody>
                                                      </table>
                                             </div>
                                    </div>

                                    {/* MongoDB Aggregation: Category Stats */}
                                    <div className="bg-white p-6 rounded-xl shadow-md border border-slate-100">
                                             <h2 className="text-xl font-semibold mb-4 text-purple-600">Product Inventory by Category</h2>
                                             <div className="overflow-x-auto">
                                                      <table className="w-full text-left border-collapse">
                                                               <thead>
                                                                        <tr className="border-b border-slate-200">
                                                                                 <th className="py-2 text-slate-600">Category</th>
                                                                                 <th className="py-2 text-slate-600 text-center">Count</th>
                                                                                 <th className="py-2 text-slate-600 text-right">Avg Price</th>
                                                                        </tr>
                                                               </thead>
                                                               <tbody>
                                                                        {categoryData.length === 0 ? (
                                                                                 <tr><td colSpan={3} className="py-4 text-center text-slate-500">No product data found.</td></tr>
                                                                        ) : (
                                                                                 categoryData.map((cat, idx) => (
                                                                                          <tr key={idx} className="border-b border-slate-50 last:border-0 hover:bg-slate-50">
                                                                                                   <td className="py-3 text-slate-800 font-medium">{cat._id || 'Uncategorized'}</td>
                                                                                                   <td className="py-3 text-slate-800 text-center">{cat.productCount}</td>
                                                                                                   <td className="py-3 text-slate-800 text-right">${Number(cat.avgPrice).toFixed(2)}</td>
                                                                                          </tr>
                                                                                 ))
                                                                        )}
                                                               </tbody>
                                                      </table>
                                             </div>
                                    </div>
                           </div>
                  </div>
         );
}
