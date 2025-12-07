import type { Metadata, Viewport } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// Load fonts with 'swap' strategy for better performance
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: 'swap'
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: 'swap'
});

// Separate Viewport export (Next.js 14+ best practice)
export const viewport: Viewport = {
  themeColor: '#4f46e5', // Matches your primary indigo color
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: "ShopHub - Premium E-Commerce",
    template: "%s | ShopHub Store", // Child pages will appear as "Product Name | ShopHub Store"
  },
  description: "Discover amazing products at unbeatable prices. Shop with confidence at ShopHub for fashion, electronics, and lifestyle essentials.",
  keywords: ["e-commerce", "fashion", "electronics", "shopping", "deals"],
  authors: [{ name: "ShopHub Team" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://shophub.com",
    title: "ShopHub - Premium E-Commerce",
    description: "Curated collection of premium products.",
    siteName: "ShopHub",
  },
  twitter: {
    card: "summary_large_image",
    title: "ShopHub",
    description: "Premium shopping experience.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // suppressHydrationWarning prevents errors from browser extensions (like the one you saw earlier)
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${inter.variable} ${outfit.variable} font-sans antialiased bg-slate-50 text-slate-900 selection:bg-indigo-500 selection:text-white`}>
        <div className="flex flex-col min-h-screen">
          <Navbar />

          <main className="flex-1 w-full max-w-[1920px] mx-auto">
            {children}
          </main>

          <Footer />
        </div>
      </body>
    </html>
  );
}