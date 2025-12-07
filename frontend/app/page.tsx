import Link from 'next/link';
import Button from '../components/ui/Button';

export default function Home() {
  const products = [
    { id: 1, name: "Urban Backpack", price: "₹12,999", img: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=400&q=80" },
    { id: 2, name: "Minimalist Watch", price: "₹8,500", img: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=400&q=80" },
    { id: 3, name: "Leather Sneakers", price: "₹15,400", img: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=400&q=80" },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="py-32 px-4 text-center bg-white border-b border-slate-100">
        <h1 className="text-5xl font-black text-slate-900 mb-6 tracking-tight">
          Elevate Your <span className="text-indigo-600">Everyday Style</span>
        </h1>
        <p className="text-xl text-slate-500 mb-10 max-w-2xl mx-auto">
          Premium products curated for the modern visionary. Quality you can trust.
        </p>
        <div className="flex justify-center gap-4">
          <Link href="/products">
            <Button size="lg" className="px-8 shadow-xl bg-slate-600 shadow-indigo-200">Shop Now</Button>
          </Link>
          <Link href="/about">
            <Button variant="outline" size="lg" className="px-8">Learn More</Button>
          </Link>
        </div>
      </section>

      {/* Trending Grid */}
      <section className="py-24 px-4 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-10">
          <h2 className="text-2xl font-bold text-slate-900">Trending Now</h2>
          <Link href="/products" className="text-indigo-600 font-medium hover:underline">View All &rarr;</Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {products.map((item) => (
            <div key={item.id} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
              <div className="aspect-[4/3] overflow-hidden bg-slate-100">
                <img src={item.img} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-lg text-slate-900">{item.name}</h3>
                  <span className="font-medium text-slate-600">{item.price}</span>
                </div>
                <button className="mt-4 w-full py-2.5 rounded-xl bg-slate-900 text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 px-4 bg-slate-900 text-center">
        <div className="max-w-md mx-auto">
          <h2 className="text-3xl font-bold text-white mb-4">Don't Miss the Drop</h2>
          <p className="text-slate-400 mb-8">Join our community for exclusive access.</p>
          <form className="flex gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-xl bg-white/10 text-white placeholder-white/50 border border-white/10 focus:outline-none focus:ring-2 focus:ring-white/30"
              suppressHydrationWarning={true}
            />
            <Button className="bg-slate-700 text-white hover:bg-slate-800">Join</Button>
          </form>
        </div>
      </section>
    </div>
  );
}