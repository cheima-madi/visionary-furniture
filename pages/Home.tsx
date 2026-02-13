
import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Sparkles, Smartphone, Box, ArrowRight } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { SAMPLE_PRODUCTS } from '../constants';

const Home: React.FC = () => {
  const featured = SAMPLE_PRODUCTS.filter(p => p.featured);

  return (
    <div className="pb-20">
      {/* Immersive Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 scale-105">
          <img 
            src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1920&q=80" 
            alt="Interior Design" 
            className="w-full h-full object-cover brightness-[0.5] contrast-[1.1]"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-0"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center text-white">
          <div className="animate-in fade-in slide-in-from-bottom-12 duration-1000">
            <span className="inline-block px-5 py-2 bg-indigo-600 rounded-full text-[10px] font-black tracking-[0.3em] uppercase mb-8 border border-white/20">
              Augmented Reality E-Commerce
            </span>
            <h1 className="text-6xl md:text-9xl font-black leading-none mb-8 tracking-tighter">
              BEYOND THE <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-indigo-500">DIGITAL GAP.</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto font-light leading-relaxed">
              Visualize products in 3D, try them virtually, and interact with them in your real environment. Personalized shopping, redefined.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link to="/products" className="group bg-indigo-600 hover:bg-white hover:text-indigo-600 text-white px-10 py-5 rounded-full font-black text-sm uppercase tracking-widest transition-all duration-300 flex items-center shadow-2xl">
                Explore Collection <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a href="#vision" className="px-10 py-5 rounded-full font-black text-sm uppercase tracking-widest text-white border border-white/30 hover:bg-white/10 transition-all">
                The Vision
              </a>
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-px h-12 bg-gradient-to-b from-white to-transparent"></div>
        </div>
      </section>

      {/* Pillars Section */}
      <section id="vision" className="max-w-7xl mx-auto px-4 py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-sm font-black text-indigo-600 uppercase tracking-[0.4em] mb-4">Core Principles</h2>
            <h3 className="text-4xl md:text-6xl font-black text-gray-900 mb-8 leading-tight tracking-tighter">
              Visual Interaction, <br />Conversational Assistance.
            </h3>
            <p className="text-lg text-gray-600 mb-10 leading-relaxed">
              Our platform bridges the gap between digital convenience and the physical in-store experience. We prioritize speed, variety, and absolute personalization.
            </p>
            <div className="grid grid-cols-2 gap-8">
              <div className="border-l-4 border-indigo-600 pl-6">
                <span className="block text-3xl font-black text-gray-900">100%</span>
                <span className="text-sm text-gray-500 uppercase font-bold tracking-widest">Scale Accuracy</span>
              </div>
              <div className="border-l-4 border-indigo-600 pl-6">
                <span className="block text-3xl font-black text-gray-900">AI</span>
                <span className="text-sm text-gray-500 uppercase font-bold tracking-widest">Powered Help</span>
              </div>
            </div>
          </div>
          <div className="relative">
             <div className="aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl">
                <img src="https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=1000&q=80" className="w-full h-full object-cover" />
             </div>
             <div className="absolute -bottom-10 -left-10 bg-indigo-600 p-10 rounded-[2rem] text-white shadow-2xl max-w-xs hidden md:block">
                <Smartphone className="w-10 h-10 mb-4" />
                <h4 className="text-xl font-bold mb-2">AR-Integrated Journey</h4>
                <p className="text-indigo-100 text-sm">Interactive 3D layer integrated into every customer touchpoint.</p>
             </div>
          </div>
        </div>
      </section>

      {/* Featured Grid */}
      <section className="bg-gray-100 py-32">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20">
            <div>
              <h2 className="text-sm font-black text-indigo-600 uppercase tracking-[0.4em] mb-4">Curated Collection</h2>
              <h3 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter">Featured Visionary Pieces</h3>
            </div>
            <Link to="/products" className="mt-6 md:mt-0 font-black text-sm uppercase tracking-widest text-indigo-600 hover:translate-x-2 transition-transform inline-flex items-center">
              View Collection <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {featured.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 px-4">
        <div className="max-w-7xl mx-auto bg-gray-900 rounded-[3rem] overflow-hidden relative">
           <div className="absolute inset-0 opacity-20 pointer-events-none">
              <img src="https://images.unsplash.com/photo-1554034483-04fac697b481?auto=format&fit=crop&w=1920&q=80" className="w-full h-full object-cover" />
           </div>
           <div className="relative z-10 px-8 py-20 md:p-24 text-center">
              <h2 className="text-4xl md:text-7xl font-black text-white mb-8 tracking-tighter">BECOME A SYSTEM ACTOR.</h2>
              <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto font-light">Join the platform as a customer or administrator and experience the interactive e-commerce revolution.</p>
              <div className="flex flex-wrap justify-center gap-6">
                <Link to="/register" className="bg-white text-gray-900 px-12 py-5 rounded-full font-black text-sm uppercase tracking-widest hover:scale-105 transition-all shadow-xl">Join Now</Link>
                <Link to="/products" className="bg-indigo-600 text-white px-12 py-5 rounded-full font-black text-sm uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-xl">Shop Collection</Link>
              </div>
           </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
