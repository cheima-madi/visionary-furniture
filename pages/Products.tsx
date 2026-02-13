
import React, { useState, useMemo } from 'react';
import { Filter, Search, ChevronDown, Grid, List as ListIcon } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { SAMPLE_PRODUCTS, CATEGORIES } from '../constants';

const Products: React.FC = () => {
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('newest');

  const filteredProducts = useMemo(() => {
    return SAMPLE_PRODUCTS
      .filter(p => category === 'All' || p.category === category)
      .filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
      .sort((a, b) => {
        if (sort === 'price-low') return a.price - b.price;
        if (sort === 'price-high') return b.price - a.price;
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
  }, [category, search, sort]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">The Collection</h1>
          <p className="text-gray-500 mt-2">Discover our curated furniture and decor.</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-4 w-full md:w-auto">
          <div className="relative flex-grow md:flex-grow-0">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search products..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none w-full md:w-64"
            />
          </div>
          <div className="relative">
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <select 
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="appearance-none pl-4 pr-10 py-2 border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm font-medium"
            >
              <option value="newest">Newest Arrivals</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filters */}
        <aside className="w-full lg:w-64 space-y-8 flex-shrink-0">
          <div>
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-4 flex items-center">
              <Filter className="w-4 h-4 mr-2" /> Categories
            </h3>
            <div className="space-y-2">
              <button 
                onClick={() => setCategory('All')}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition ${category === 'All' ? 'bg-indigo-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                All Products
              </button>
              {CATEGORIES.map(cat => (
                <button 
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition ${category === cat ? 'bg-indigo-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-indigo-50 p-6 rounded-2xl">
            <h4 className="font-bold text-indigo-900 text-sm mb-2">Need help?</h4>
            <p className="text-xs text-indigo-700 leading-relaxed">Our designers are ready to assist you in finding the perfect match for your interior.</p>
            <button className="mt-4 text-xs font-bold text-indigo-600 underline">Chat with us</button>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-grow">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-gray-50 rounded-2xl">
              <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-gray-900">No products found</h3>
              <p className="text-gray-500">Try adjusting your filters or search terms.</p>
              <button onClick={() => { setCategory('All'); setSearch(''); }} className="mt-4 text-indigo-600 font-bold underline">Clear All Filters</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
