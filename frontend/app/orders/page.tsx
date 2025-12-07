'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

interface Order {
         id: number;
         total: number;
         createdAt: string;
}

export default function OrdersPage() {
         const [orders, setOrders] = useState<Order[]>([]);
         const [loading, setLoading] = useState(true);
         const [error, setError] = useState('');
         const router = useRouter();

         useEffect(() => {
                  const fetchOrders = async () => {
                           const token = localStorage.getItem('token');
                           if (!token) {
                                    router.push('/login');
                                    return;
                           }

                           try {
                                    const res = await axios.get('http://localhost:5000/api/orders', {
                                             headers: { Authorization: `Bearer ${token}` }
                                    });
                                    setOrders(res.data.orders || []);
                           } catch (err) {
                                    console.error(err);
                                    setError('Failed to load orders.');
                           } finally {
                                    setLoading(false);
                           }
                  };

                  fetchOrders();
         }, [router]);

         if (loading) return <div className="p-8 text-center text-slate-600">Loading orders...</div>;
         if (error) return <div className="p-8 text-center text-red-500">{error}</div>;

         return (
                  <div className="container mx-auto px-4 py-8">
                           <h1 className="text-3xl font-bold mb-8 text-slate-800">My Orders</h1>

                           {orders.length === 0 ? (
                                    <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-slate-100">
                                             <p className="text-slate-500 mb-4">You haven't placed any orders yet.</p>
                                             <button
                                                      onClick={() => router.push('/products')}
                                                      className="text-blue-600 hover:text-blue-700 font-medium"
                                             >
                                                      Start Shopping &rarr;
                                             </button>
                                    </div>
                           ) : (
                                    <div className="space-y-4">
                                             {orders.map((order) => (
                                                      <div key={order.id} className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 flex justify-between items-center transition hover:shadow-md">
                                                               <div>
                                                                        <p className="text-sm text-slate-500 mb-1">Order #{order.id}</p>
                                                                        <p className="text-slate-800 font-medium date">
                                                                                 {new Date(order.createdAt).toLocaleDateString()} at {new Date(order.createdAt).toLocaleTimeString()}
                                                                        </p>
                                                               </div>
                                                               <div className="text-right">
                                                                        <p className="text-sm text-slate-500 mb-1">Total Amount</p>
                                                                        <p className="text-xl font-bold text-blue-600">${Number(order.total).toFixed(2)}</p>
                                                               </div>
                                                      </div>
                                             ))}
                                    </div>
                           )}
                  </div>
         );
}
