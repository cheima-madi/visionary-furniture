
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingCart, User, Menu, X, LogOut, LayoutDashboard, Search } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Navbar: React.FC = () => {
  const { user, isAdmin, isAuthenticated, logout } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsProfileOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled || !isHome ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 flex items-center">
            <span className={`text-2xl font-black tracking-tighter transition-colors ${
              scrolled || !isHome ? 'text-indigo-600' : 'text-white'
            }`}>
              VISIONARY <span className="font-thin">AR</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-10 items-center">
            <Link to="/" className={`text-sm font-bold uppercase tracking-widest transition-colors ${
              scrolled || !isHome ? 'text-gray-900 hover:text-indigo-600' : 'text-white/80 hover:text-white'
            }`}>Home</Link>
            <Link to="/products" className={`text-sm font-bold uppercase tracking-widest transition-colors ${
              scrolled || !isHome ? 'text-gray-900 hover:text-indigo-600' : 'text-white/80 hover:text-white'
            }`}>Collection</Link>
            {isAdmin && (
              <Link to="/admin" className={`flex items-center text-sm font-black uppercase tracking-widest ${
                scrolled || !isHome ? 'text-indigo-600' : 'text-indigo-300'
              }`}>
                <LayoutDashboard className="w-4 h-4 mr-1.5" /> Admin
              </Link>
            )}
          </div>

          {/* Actions */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/cart" className={`relative transition-transform active:scale-95 ${
              scrolled || !isHome ? 'text-gray-900' : 'text-white'
            }`}>
              <ShoppingCart className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center border-2 border-white">
                  {cartCount}
                </span>
              )}
            </Link>

            {isAuthenticated ? (
              <div className="relative">
                <button 
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className={`flex items-center space-x-2 font-bold text-sm transition-colors ${
                    scrolled || !isHome ? 'text-gray-900' : 'text-white'
                  }`}
                >
                  <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white">
                    {user?.name.charAt(0)}
                  </div>
                  <span>{user?.name.split(' ')[0]}</span>
                </button>
                {isProfileOpen && (
                  <div className="absolute right-0 mt-3 w-48 bg-white border rounded-2xl shadow-2xl py-2 overflow-hidden animate-in fade-in zoom-in-95">
                    <Link to="/profile" className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition">Profile Settings</Link>
                    <Link to="/orders" className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition">Order History</Link>
                    <hr className="my-1 border-gray-100" />
                    <button onClick={handleLogout} className="flex items-center w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition font-bold">
                      <LogOut className="w-4 h-4 mr-2" /> Log Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className={`px-6 py-2 rounded-full text-sm font-black uppercase tracking-widest transition-all ${
                scrolled || !isHome 
                ? 'bg-indigo-600 text-white hover:bg-indigo-700' 
                : 'bg-white text-indigo-600 hover:bg-gray-100'
              }`}>
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center space-x-4">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className={`${
              scrolled || !isHome ? 'text-gray-900' : 'text-white'
            }`}>
              {isMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-white pt-24 px-8 flex flex-col space-y-8 animate-in slide-in-from-right">
          <Link to="/" className="text-3xl font-black text-gray-900" onClick={() => setIsMenuOpen(false)}>Home</Link>
          <Link to="/products" className="text-3xl font-black text-gray-900" onClick={() => setIsMenuOpen(false)}>Collection</Link>
          <Link to="/cart" className="text-3xl font-black text-gray-900" onClick={() => setIsMenuOpen(false)}>Cart ({cartCount})</Link>
          <hr className="border-gray-100" />
          {isAuthenticated ? (
            <>
              <Link to="/profile" className="text-xl font-bold text-gray-700" onClick={() => setIsMenuOpen(false)}>Profile</Link>
              <Link to="/orders" className="text-xl font-bold text-gray-700" onClick={() => setIsMenuOpen(false)}>Orders</Link>
              <button onClick={handleLogout} className="text-xl font-bold text-red-600 text-left">Logout</button>
            </>
          ) : (
            <Link to="/login" className="bg-indigo-600 text-white py-4 rounded-2xl text-center font-bold text-xl" onClick={() => setIsMenuOpen(false)}>Login</Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
