import Button from './Button';

interface Product {
  _id: string;
  name: string;
  price: number;
  category: string;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <div className="group relative bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">
      {/* Image Placeholder Area */}
      <div className="aspect-[4/3] bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center relative overflow-hidden">
        <span className="text-7xl group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 filter drop-shadow-sm">
          🛍️
        </span>

        {/* Quick Overlay */}
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        <div className="absolute top-3 right-3 z-10">
          <span className="bg-white/90 backdrop-blur-md text-slate-900 text-sm font-bold px-3 py-1 rounded-full shadow-sm border border-slate-100">
            {new Intl.NumberFormat('en-IN', {
              style: 'currency',
              currency: 'INR',
              maximumFractionDigits: 0,
            }).format(product.price * 83)}
          </span>
        </div>
      </div>

      <div className="p-5">
        <div className="mb-3">
          <span className="text-[10px] uppercase tracking-wider font-bold text-primary-600 bg-primary-50 px-2 py-1 rounded-full">
            {product.category || 'General'}
          </span>
        </div>

        <h3 className="font-bold text-lg text-slate-800 mb-2 line-clamp-2 leading-tight group-hover:text-primary-600 transition-colors">
          {product.name}
        </h3>

        <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
          <Button
            size="sm"
            onClick={() => onAddToCart(product)}
            className="w-full bg-slate-900 hover:bg-primary-600 shadow-none hover:shadow-lg hover:shadow-primary-500/20 transition-all duration-300"
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
}

