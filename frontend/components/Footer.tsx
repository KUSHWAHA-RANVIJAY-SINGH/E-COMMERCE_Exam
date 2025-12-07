'use client';
import Link from 'next/link';

export default function Footer() {
  const links = [
    { title: "Shop", items: ["All Products", "New Arrivals", "Featured"] },
    { title: "Support", items: ["Help Center", "Order Status", "Returns"] },
    { title: "Legal", items: ["Privacy Policy", "Terms of Service", "Cookies"] },
  ];

  return (
    <footer className="bg-slate-950 text-slate-400 py-12 border-t border-slate-900 mt-20">
      <div className="container mx-auto px-6 grid md:grid-cols-4 gap-10">

        {/* Brand Section */}
        <div>
          <Link href="/" className="text-2xl font-bold text-white flex items-center gap-2 mb-4">
            🛍️ ShopHub
          </Link>
          <p className="text-sm leading-relaxed mb-6">
            Curated premium products for your lifestyle. Quality meets convenience.
          </p>
          <div className="flex gap-4">
            {[/* Twitter */ 'M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-12.7 12.5 4.1.6 7-1.4 7-1.4-4.2-.6-5.8-3.4-5.8-3.4s2.2.4 2.2.4c-4.6-1-5.5-5.5-5.5-5.5s1.2.6 2.3.6c-3-2.6-1.6-6-1.6-6s2.5 2.5 7 2.6c-1-4.8 6-6.4 8.3-2.6', /* FB */ 'M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z', /* Insta */ 'M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z M17.5 6.5h.01 M2 12a10 10 0 1 1 20 0 10 10 0 0 1-20 0'].map((d, i) => (
              <a key={i} href="#" className="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center hover:bg-blue-600 hover:text-white transition">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d={d} /></svg>
              </a>
            ))}
          </div>
        </div>

        {/* Dynamic Links Generation */}
        {links.map((section) => (
          <div key={section.title}>
            <h4 className="text-white font-bold mb-4">{section.title}</h4>
            <ul className="space-y-2 text-sm">
              {section.items.map((item) => (
                <li key={item}>
                  <Link href="#" className="hover:text-blue-400 transition-colors">{item}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="text-center text-xs text-slate-600 mt-12 pt-8 border-t border-slate-900">
        © {new Date().getFullYear()} ShopHub. All rights reserved.
      </div>
    </footer>
  );
}