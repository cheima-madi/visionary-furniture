
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Loader2, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await login(email, password);
      navigate('/');
    } catch (err: any) {
      setError(err.message || 'Failed to login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-[2rem] shadow-2xl p-10 border border-gray-100">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-black text-gray-900 mb-2">Welcome Back</h1>
          <p className="text-gray-500 font-medium">Log in to your Visionary account</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl text-sm font-bold border border-red-100">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="you@example.com"
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 transition"
              />
            </div>
          </div>

          <div className="text-right">
            <a href="#" className="text-sm font-bold text-indigo-600 hover:underline">Forgot password?</a>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-5 rounded-2xl font-bold text-lg hover:bg-indigo-700 transition flex items-center justify-center gap-3 shadow-xl shadow-indigo-600/30 disabled:opacity-50"
          >
            {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : 'Sign In'}
          </button>
        </form>

        <div className="mt-10 text-center">
          <p className="text-gray-500 text-sm">
            Don't have an account? {' '}
            <Link to="/register" className="text-indigo-600 font-bold hover:underline">Create one &rarr;</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
