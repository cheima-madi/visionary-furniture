
import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Package, ArrowRight, Smartphone } from 'lucide-react';

const OrderConfirmation: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-24 text-center">
      <div className="bg-emerald-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-10 animate-bounce">
        <CheckCircle className="w-12 h-12 text-emerald-600" />
      </div>
      <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Order Confirmed!</h1>
      <p className="text-xl text-gray-500 mb-12">Your Visionary furniture is on its way. We've sent a confirmation email to your inbox.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <div className="bg-white p-8 rounded-[2rem] shadow-sm border text-left">
          <Package className="w-8 h-8 text-indigo-600 mb-4" />
          <h3 className="font-bold text-lg mb-2">Track Your Order</h3>
          <p className="text-gray-500 text-sm mb-6">Stay updated on your delivery status in real-time from your account.</p>
          <Link to="/orders" className="text-indigo-600 font-bold flex items-center gap-2">
            View My Orders <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="bg-indigo-600 p-8 rounded-[2rem] shadow-xl text-left text-white">
          <Smartphone className="w-8 h-8 text-indigo-200 mb-4" />
          <h3 className="font-bold text-lg mb-2">Get the App</h3>
          <p className="text-indigo-100 text-sm mb-6">For the best AR experience, try our mobile app on iOS and Android.</p>
          <button className="bg-white text-indigo-600 px-4 py-2 rounded-lg text-xs font-bold">
            Learn More
          </button>
        </div>
      </div>

      <Link to="/" className="text-gray-500 font-medium hover:text-indigo-600">
        Back to Home
      </Link>
    </div>
  );
};

export default OrderConfirmation;
