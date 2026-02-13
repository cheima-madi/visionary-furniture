import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Package, ArrowRight, ShoppingBag } from 'lucide-react';
import { Order } from '../types';

const Orders: React.FC = () => {
    const [orders, setOrders] = useState<Order[]>([]);

    useEffect(() => {
        const storedOrders = localStorage.getItem('ar_retail_orders');
        if (storedOrders) {
            try {
                setOrders(JSON.parse(storedOrders));
            } catch (e) {
                console.error("Failed to parse orders", e);
            }
        }
    }, []);

    if (orders.length === 0) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="text-center py-16 bg-white rounded-3xl shadow-sm border border-gray-100">
                    <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Package className="w-10 h-10 text-gray-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">No orders found</h2>
                    <p className="text-gray-500 mb-8 max-w-md mx-auto">Looks like you haven't placed any orders yet. Start shopping to fill your home with beautiful furniture.</p>
                    <Link
                        to="/products"
                        className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-xl shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 transition"
                    >
                        <ShoppingBag className="w-5 h-5 mr-2" />
                        Start Shopping
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">My Orders</h1>
            <div className="space-y-6">
                {orders.map((order) => (
                    <div key={order.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-6">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <p className="text-sm text-gray-500">Order #{order.id}</p>
                                    <p className="text-sm text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</p>
                                </div>
                                <span className={`px-3 py-1 rounded-full text-xs font-semibold
                    ${order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                                        order.status === 'Processing' ? 'bg-blue-100 text-blue-800' :
                                            order.status === 'Shipped' ? 'bg-purple-100 text-purple-800' :
                                                'bg-gray-100 text-gray-800'}`}>
                                    {order.status}
                                </span>
                            </div>
                            <div className="border-t border-gray-100 pt-4">
                                {order.items.map((item, index) => (
                                    <div key={index} className="flex items-center justify-between py-2">
                                        <span className="text-gray-800 font-medium">{item.product?.name || 'Product'} (x{item.quantity})</span>
                                        <span className="text-gray-600">${((item.product?.price || 0) * item.quantity).toFixed(2)}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="border-t border-gray-100 mt-4 pt-4 flex justify-between items-center">
                                <span className="font-bold text-lg text-gray-900">Total: ${order.total.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Orders;
