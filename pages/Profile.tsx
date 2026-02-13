import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { User, Package, LogOut } from 'lucide-react';

const Profile: React.FC = () => {
    const { user, logout } = useAuth();

    if (!user) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
                <h2 className="text-2xl font-bold mb-4">Please log in to view your profile</h2>
                <Link to="/login" className="text-indigo-600 font-medium hover:text-indigo-500">
                    Go to Login
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="bg-indigo-600 px-6 py-8 text-white">
                    <div className="flex items-center space-x-4">
                        <div className="bg-white/20 p-3 rounded-full">
                            <User className="w-8 h-8 text-white" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold">{user.name}</h1>
                            <p className="text-indigo-100">{user.email}</p>
                        </div>
                    </div>
                </div>

                <div className="p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition">
                            <h3 className="font-semibold text-gray-900 mb-2">Account Type</h3>
                            <p className="text-gray-600 capitalize">{user.role}</p>
                        </div>
                        <div className="p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition">
                            <h3 className="font-semibold text-gray-900 mb-2">Member Since</h3>
                            <p className="text-gray-600">{new Date().toLocaleDateString()}</p>
                        </div>
                    </div>

                    <div className="border-t border-gray-100 pt-6">
                        <Link to="/orders" className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition">
                            <div className="flex items-center space-x-3">
                                <Package className="w-5 h-5 text-indigo-600" />
                                <span className="font-medium text-gray-900">My Orders</span>
                            </div>
                            <span className="text-gray-400">View History &rarr;</span>
                        </Link>
                    </div>

                    <div className="border-t border-gray-100 pt-6">
                        <button
                            onClick={logout}
                            className="flex items-center text-red-600 font-medium hover:text-red-700 transition"
                        >
                            <LogOut className="w-5 h-5 mr-2" />
                            Sign Out
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
