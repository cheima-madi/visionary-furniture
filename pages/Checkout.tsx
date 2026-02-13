
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { ShieldCheck, Truck, CreditCard } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

interface CheckoutFormData {
  name: string;
  email: string;
  phone: string;
  street: string;
  city: string;
  postalCode: string;
  notes: string;
}

const Checkout: React.FC = () => {
  const { cart, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<CheckoutFormData>({
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
    }
  });

  const onSubmit = async (data: CheckoutFormData) => {
    // Simulate API call
    console.log('Order placed:', { data, cart, total: cartTotal });
    await new Promise(resolve => setTimeout(resolve, 2000));
    clearCart();
    navigate('/order-confirmation');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
        <div>
          <h2 className="text-3xl font-extrabold text-gray-900 mb-8">Shipping Information</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
                <input 
                  {...register('name', { required: 'Name is required' })}
                  className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" 
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Phone Number</label>
                <input 
                  {...register('phone', { required: 'Phone is required' })}
                  placeholder="+213..."
                  className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" 
                />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
              <input 
                {...register('email', { required: 'Email is required' })}
                className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" 
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Street Address</label>
              <input 
                {...register('street', { required: 'Street is required' })}
                className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" 
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">City</label>
                <input 
                  {...register('city', { required: 'City is required' })}
                  className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" 
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Postal Code</label>
                <input 
                  {...register('postalCode', { required: 'Postal code is required' })}
                  className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" 
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Delivery Notes (Optional)</label>
              <textarea 
                {...register('notes')}
                rows={3}
                className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" 
              />
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full bg-indigo-600 text-white py-5 rounded-2xl font-bold text-lg hover:bg-indigo-700 transition flex items-center justify-center gap-3 shadow-xl disabled:opacity-50"
            >
              {isSubmitting ? 'Processing Order...' : 'Place My Order'}
            </button>
          </form>
        </div>

        <div>
          <div className="bg-gray-900 rounded-[2rem] p-10 text-white shadow-2xl sticky top-24">
            <h3 className="text-2xl font-bold mb-8">Order Summary</h3>
            <div className="space-y-6 mb-10 max-h-60 overflow-y-auto pr-4 scrollbar-thin">
              {cart.map((item) => (
                <div key={`${item.productId}-${item.selectedColor}`} className="flex justify-between items-center">
                  <div className="flex gap-4 items-center">
                    <div className="w-12 h-12 bg-gray-800 rounded-lg overflow-hidden flex-shrink-0">
                      <img src={item.product?.images[0]} alt={item.product?.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="font-bold text-sm">{item.product?.name}</p>
                      <p className="text-xs text-gray-400">Qty: {item.quantity} · {item.selectedColor}</p>
                    </div>
                  </div>
                  {/* Fixed: Correctly calculating item total price by multiplying unit price by quantity */}
                  <p className="font-bold">{((item.product?.price || 0) * item.quantity).toLocaleString()} DA</p>
                </div>
              ))}
            </div>

            <div className="space-y-4 border-t border-gray-800 pt-8 mb-8">
              <div className="flex justify-between text-gray-400">
                <span>Subtotal</span>
                <span className="text-white">{cartTotal.toLocaleString()} DA</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Shipping</span>
                <span className="text-emerald-400 font-bold">FREE</span>
              </div>
              <div className="flex justify-between text-2xl font-extrabold pt-4 border-t border-gray-800">
                <span>Total</span>
                <span className="text-indigo-400">{cartTotal.toLocaleString()} DA</span>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-4 text-sm">
                <ShieldCheck className="w-6 h-6 text-indigo-400" />
                <span>Secure SSL encrypted payment processing</span>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <Truck className="w-6 h-6 text-indigo-400" />
                <span>Standard delivery in 3-5 business days</span>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <CreditCard className="w-6 h-6 text-indigo-400" />
                <span>Accepting Visa, Mastercard, and Cash on Delivery</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
