
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, MapPin, Phone } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div>
          <h2 className="text-2xl font-bold text-indigo-400 mb-4 tracking-tight">VISIONARY AR</h2>
          <p className="text-gray-400 text-sm leading-relaxed mb-6">
            Revolutionizing furniture shopping with Augmented Reality. Experience comfort and style in your space before you buy.
          </p>
          <div className="flex space-x-4">
            <Facebook className="w-5 h-5 cursor-pointer hover:text-indigo-400" />
            <Twitter className="w-5 h-5 cursor-pointer hover:text-indigo-400" />
            <Instagram className="w-5 h-5 cursor-pointer hover:text-indigo-400" />
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
          <ul className="space-y-3 text-gray-400 text-sm">
            <li><Link to="/" className="hover:text-white transition">Home</Link></li>
            <li><Link to="/products" className="hover:text-white transition">All Products</Link></li>
            <li><Link to="/cart" className="hover:text-white transition">View Cart</Link></li>
            <li><Link to="/profile" className="hover:text-white transition">My Account</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-6">Support</h3>
          <ul className="space-y-3 text-gray-400 text-sm">
            <li><a href="#" className="hover:text-white transition">Shipping Policy</a></li>
            <li><a href="#" className="hover:text-white transition">Returns & Exchanges</a></li>
            <li><a href="#" className="hover:text-white transition">FAQs</a></li>
            <li><a href="#" className="hover:text-white transition">Terms of Service</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-6">Contact Us</h3>
          <ul className="space-y-4 text-gray-400 text-sm">
            <li className="flex items-start">
              <MapPin className="w-5 h-5 mr-3 text-indigo-400 flex-shrink-0" />
              <span>123 Design Blvd, Algiers, DZ</span>
            </li>
            <li className="flex items-center">
              <Phone className="w-5 h-5 mr-3 text-indigo-400 flex-shrink-0" />
              <span>+213 (0) 555 12 34 56</span>
            </li>
            <li className="flex items-center">
              <Mail className="w-5 h-5 mr-3 text-indigo-400 flex-shrink-0" />
              <span>support@arretail.com</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 pt-8 border-t border-gray-800 text-center text-gray-500 text-xs">
        <p>&copy; {new Date().getFullYear()} Visionary AR Retail. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
