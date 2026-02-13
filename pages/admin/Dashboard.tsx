
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { DollarSign, ShoppingBag, Users, Package, TrendingUp, AlertCircle } from 'lucide-react';
import { SAMPLE_PRODUCTS } from '../../constants';
import { OrderStatus } from '../../types';

const Dashboard: React.FC = () => {
  const data = [
    { name: 'Mon', sales: 45000 },
    { name: 'Tue', sales: 52000 },
    { name: 'Wed', sales: 38000 },
    { name: 'Thu', sales: 65000 },
    { name: 'Fri', sales: 48000 },
    { name: 'Sat', sales: 95000 },
    { name: 'Sun', sales: 110000 },
  ];

  const recentOrders = [
    { id: '#ORD-9871', customer: 'John Doe', amount: 89000, status: OrderStatus.PROCESSING, date: '2 hours ago' },
    { id: '#ORD-9870', customer: 'Jane Smith', amount: 14000, status: OrderStatus.SHIPPED, date: '5 hours ago' },
    { id: '#ORD-9869', customer: 'Mike Ross', amount: 29000, status: OrderStatus.PENDING, date: '1 day ago' },
  ];

  const stats = [
    { label: 'Total Sales', value: '453,000 DA', icon: DollarSign, color: 'text-emerald-600', bg: 'bg-emerald-100', trend: '+12.5%' },
    { label: 'Total Orders', value: '1,248', icon: ShoppingBag, color: 'text-indigo-600', bg: 'bg-indigo-100', trend: '+5.2%' },
    { label: 'Customers', value: '892', icon: Users, color: 'text-purple-600', bg: 'bg-purple-100', trend: '+18.4%' },
    { label: 'Products', value: SAMPLE_PRODUCTS.length.toString(), icon: Package, color: 'text-amber-600', bg: 'bg-amber-100', trend: '0%' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-extrabold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-500">Welcome back, Admin. Here's what's happening with Visionary AR today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white p-8 rounded-3xl border shadow-sm flex flex-col items-start hover:shadow-lg transition">
            <div className={`p-3 rounded-2xl ${stat.bg} mb-6`}>
              <stat.icon className={`w-8 h-8 ${stat.color}`} />
            </div>
            <p className="text-gray-500 text-sm font-bold uppercase tracking-widest">{stat.label}</p>
            <div className="flex items-end justify-between w-full mt-2">
              <h3 className="text-2xl font-black text-gray-900">{stat.value}</h3>
              <span className={`text-xs font-bold px-2 py-1 rounded-lg ${stat.trend.startsWith('+') ? 'bg-emerald-50 text-emerald-600' : 'bg-gray-50 text-gray-400'}`}>
                {stat.trend}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Sales Chart */}
        <div className="lg:col-span-2 bg-white p-8 rounded-3xl border shadow-sm">
          <div className="flex justify-between items-center mb-10">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-indigo-600" /> Sales Trend
            </h3>
            <select className="text-xs font-bold uppercase tracking-widest text-gray-400 bg-transparent border-none focus:ring-0">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9ca3af' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9ca3af' }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  labelStyle={{ fontWeight: 'bold' }}
                />
                <Line type="monotone" dataKey="sales" stroke="#4f46e5" strokeWidth={4} dot={{ r: 6, strokeWidth: 2, fill: '#fff' }} activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Orders & Alerts */}
        <div className="space-y-8">
          <div className="bg-white p-8 rounded-3xl border shadow-sm">
            <h3 className="text-xl font-bold mb-8">Recent Orders</h3>
            <div className="space-y-6">
              {recentOrders.map((order, idx) => (
                <div key={idx} className="flex justify-between items-center">
                  <div>
                    <p className="font-bold text-gray-900">{order.customer}</p>
                    <p className="text-xs text-gray-400">{order.id} · {order.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-indigo-600">{order.amount.toLocaleString()} DA</p>
                    <span className="text-[10px] font-black uppercase text-indigo-400">{order.status}</span>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-8 py-3 border border-indigo-600 text-indigo-600 font-bold rounded-2xl hover:bg-indigo-50 transition text-sm">
              View All Orders
            </button>
          </div>

          <div className="bg-amber-50 p-8 rounded-3xl border border-amber-100">
            <h3 className="text-lg font-bold text-amber-900 mb-4 flex items-center gap-2">
              <AlertCircle className="w-5 h-5" /> Low Stock Alerts
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-amber-800">Modern Grey Sofa</span>
                <span className="font-bold text-amber-600">3 left</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-amber-800">Oak Coffee Table</span>
                <span className="font-bold text-amber-600">5 left</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
