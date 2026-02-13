
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Truck, RefreshCw, Check, Info } from 'lucide-react';
import { SAMPLE_PRODUCTS } from '../constants';
import ARViewer from '../components/ARViewer';
import { useCart } from '../context/CartContext';
import LoadingSpinner from '../components/LoadingSpinner';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(SAMPLE_PRODUCTS.find(p => p.id === id));
  const [selectedColor, setSelectedColor] = useState(product?.colors[0] || '');
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    if (!product) {
      const found = SAMPLE_PRODUCTS.find(p => p.id === id);
      if (found) {
        setProduct(found);
        setSelectedColor(found.colors[0]);
      }
    }
  }, [id, product]);

  if (!product) return <LoadingSpinner />;

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedColor);
    // Optional: show a toast notification
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <button 
        onClick={() => navigate(-1)} 
        className="flex items-center text-gray-500 hover:text-indigo-600 mb-8 font-medium transition"
      >
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Collection
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
        {/* Left: Visualization */}
        <div className="space-y-6">
          <ARViewer modelUrl={product.model3D} altText={product.name} />
          
          <div className="grid grid-cols-4 gap-4">
            {product.images.map((img, idx) => (
              <button 
                key={idx} 
                onClick={() => setActiveImage(idx)}
                className={`aspect-square rounded-xl overflow-hidden border-2 transition ${activeImage === idx ? 'border-indigo-600' : 'border-transparent'}`}
              >
                <img src={img} alt={`${product.name} ${idx}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>

          <div className="bg-blue-50 p-6 rounded-2xl flex items-start gap-4">
            <Info className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-blue-900 text-sm">Dimensions</h4>
              <p className="text-blue-700 text-sm">{product.dimensions}</p>
            </div>
          </div>
        </div>

        {/* Right: Info & Actions */}
        <div className="flex flex-col">
          <div className="mb-8 border-b pb-8">
            <span className="text-sm font-bold text-indigo-600 uppercase tracking-widest">{product.category}</span>
            <h1 className="text-4xl font-extrabold text-gray-900 mt-2 mb-4">{product.name}</h1>
            <p className="text-3xl font-bold text-gray-900 mb-6">{product.price.toLocaleString()} DA</p>
            <p className="text-gray-600 leading-relaxed text-lg">{product.description}</p>
          </div>

          <div className="space-y-8 mb-10">
            {/* Color Selection */}
            <div>
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-4">Select Color</h3>
              <div className="flex flex-wrap gap-3">
                {product.colors.map(color => (
                  <button 
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 rounded-xl text-sm font-semibold transition flex items-center gap-2 ${
                      selectedColor === color 
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {selectedColor === color && <Check className="w-4 h-4" />}
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-4">Quantity</h3>
              <div className="flex items-center space-x-4 border rounded-xl w-fit px-2 py-1 bg-white">
                <button 
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="w-10 h-10 flex items-center justify-center text-xl font-bold hover:bg-gray-100 rounded-lg"
                >-</button>
                <span className="w-12 text-center font-bold text-lg">{quantity}</span>
                <button 
                  onClick={() => setQuantity(q => Math.min(product.stock, q + 1))}
                  className="w-10 h-10 flex items-center justify-center text-xl font-bold hover:bg-gray-100 rounded-lg"
                >+</button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={handleAddToCart}
                className="flex-grow bg-indigo-600 hover:bg-indigo-700 text-white py-5 rounded-2xl font-bold text-lg transition flex items-center justify-center gap-3 shadow-xl shadow-indigo-600/30"
              >
                <ShoppingCart className="w-6 h-6" /> Add to Cart
              </button>
            </div>
          </div>

          {/* Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-gray-50 rounded-2xl">
            <div className="flex items-center gap-4">
              <Truck className="w-6 h-6 text-gray-600" />
              <div>
                <p className="text-sm font-bold text-gray-900">Free Delivery</p>
                <p className="text-xs text-gray-500">On orders over 10,000 DA</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <RefreshCw className="w-6 h-6 text-gray-600" />
              <div>
                <p className="text-sm font-bold text-gray-900">14-Day Returns</p>
                <p className="text-xs text-gray-500">Hassle-free money back</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
