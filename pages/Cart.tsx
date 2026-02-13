
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ArrowLeft, ShoppingBag, Plus, Minus } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Cart: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-32 text-center">
        <div className="bg-indigo-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8">
          <ShoppingBag className="w-12 h-12 text-indigo-600" />
        </div>
        <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Your cart is empty</h2>
        <p className="text-gray-500 mb-10 max-w-sm mx-auto">Looks like you haven't added any Visionary pieces to your collection yet.</p>
        <Link to="/products" className="bg-indigo-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-indigo-700 transition">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-12">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-6">
          {cart.map((item) => (
            <div key={`${item.productId}-${item.selectedColor}`} className="bg-white p-6 rounded-2xl shadow-sm border flex flex-col sm:flex-row gap-6 items-center">
              <div className="w-32 h-32 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
                <img src={item.product?.images[0]} alt={item.product?.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-grow text-center sm:text-left">
                <h3 className="font-bold text-xl text-gray-900">{item.product?.name}</h3>
                <p className="text-gray-500 text-sm mb-4">Color: <span className="font-semibold text-gray-900">{item.selectedColor}</span></p>
                <div className="flex items-center justify-center sm:justify-start gap-4">
                  <div className="flex items-center border rounded-lg bg-white overflow-hidden">
                    <button onClick={() => updateQuantity(item.productId, item.quantity - 1)} className="p-2 hover:bg-gray-100"><Minus className="w-4 h-4" /></button>
                    <span className="w-10 text-center font-bold">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.productId, item.quantity + 1)} className="p-2 hover:bg-gray-100"><Plus className="w-4 h-4" /></button>
                  </div>
                  <button onClick={() => removeFromCart(item.productId)} className="text-red-500 hover:text-red-600 p-2"><Trash2 className="w-5 h-5" /></button>
                </div>
              </div>
              <div className="text-right flex flex-col justify-center">
                <p className="text-2xl font-bold text-indigo-600">{((item.product?.price || 0) * item.quantity).toLocaleString()} DA</p>
                <p className="text-xs text-gray-400">{(item.product?.price || 0).toLocaleString()} DA each</p>
              </div>
            </div>
          ))}

          <Link to="/products" className="inline-flex items-center text-indigo-600 font-bold hover:underline">
            <ArrowLeft className="w-4 h-4 mr-2" /> Continue Shopping
          </Link>
        </div>

        {/* Order Summary */}
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 h-fit sticky top-24">
          <h3 className="text-xl font-bold text-gray-900 mb-8">Order Summary</h3>
          <div className="space-y-4 mb-8">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span className="font-semibold text-gray-900">{cartTotal.toLocaleString()} DA</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Shipping</span>
              <span className="text-emerald-600 font-bold">FREE</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Taxes</span>
              <span className="font-semibold text-gray-900">Included</span>
            </div>
            <hr />
            <div className="flex justify-between text-xl font-bold text-gray-900 pt-4">
              <span>Total</span>
              <span className="text-indigo-600">{cartTotal.toLocaleString()} DA</span>
            </div>
          </div>
          <button 
            onClick={() => navigate('/checkout')}
            className="w-full bg-indigo-600 text-white py-5 rounded-2xl font-bold text-lg hover:bg-indigo-700 transition shadow-xl shadow-indigo-600/30"
          >
            Proceed to Checkout
          </button>
          <div className="mt-8 flex flex-col items-center gap-4 opacity-50 grayscale scale-90">
            <p className="text-[10px] uppercase font-bold text-gray-400">Secure Payment Options</p>
            <div className="flex gap-4">
              <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" className="h-4" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" className="h-6" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
