
import React from 'react';
import { Link } from 'react-router-dom';
import { Eye, Box, ShoppingCart } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1, product.colors[0]);
  };

  return (
    <Link to={`/product/${product.id}`} className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full border border-gray-100">
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        <img 
          src={product.images[0]} 
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.featured && (
            <span className="bg-indigo-600 text-white text-[10px] font-bold uppercase px-2 py-1 rounded">Featured</span>
          )}
          <div className="bg-white/90 backdrop-blur-sm p-1.5 rounded-lg shadow-sm">
            <Box className="w-4 h-4 text-indigo-600" />
          </div>
        </div>
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
          <span className="bg-white text-gray-900 p-2 rounded-full shadow-lg hover:bg-indigo-600 hover:text-white transition">
            <Eye className="w-5 h-5" />
          </span>
        </div>
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-1">
          <span className="text-[10px] font-semibold text-indigo-600 uppercase tracking-wider">{product.category}</span>
          <span className="text-xs text-gray-400">{product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}</span>
        </div>
        <h3 className="font-semibold text-gray-900 group-hover:text-indigo-600 transition truncate">{product.name}</h3>
        <p className="text-sm text-gray-500 mt-1 line-clamp-2 h-10">{product.description}</p>
        
        <div className="mt-4 flex items-center justify-between">
          <span className="text-lg font-bold text-indigo-600">{product.price.toLocaleString()} DA</span>
          <button 
            onClick={handleQuickAdd}
            className="bg-gray-100 text-gray-700 p-2 rounded-lg hover:bg-indigo-600 hover:text-white transition-colors"
          >
            <ShoppingCart className="w-5 h-5" />
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
