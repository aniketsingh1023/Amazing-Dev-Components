import React, { useState } from 'react';
import { Search, X } from 'lucide-react';

const SearchBar = ({ 
  data = [], 
  searchKeys = ['name'], 
  placeholder = 'Search...',
  onFilteredResults,
  renderItem,
  className = ''
}) => {
  const [query, setQuery] = useState('');

  const filterData = (searchQuery) => {
    if (!searchQuery.trim()) return data;

    return data.filter(item => {
      return searchKeys.some(key => {
        const value = getNestedValue(item, key);
        return value?.toString().toLowerCase().includes(searchQuery.toLowerCase());
      });
    });
  };

  const getNestedValue = (obj, path) => {
    return path.split('.').reduce((current, key) => current?.[key], obj);
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);
    const filtered = filterData(value);
    onFilteredResults?.(filtered);
  };

  const clearSearch = () => {
    setQuery('');
    onFilteredResults?.(data);
  };

  const filteredResults = filterData(query);

  return (
    <div className={`w-full max-w-2xl mx-auto ${className}`}>
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          value={query}
          onChange={handleSearch}
          placeholder={placeholder}
          className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        {query && (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {query && (
        <p className="text-sm text-gray-600 mb-4">
          Found {filteredResults.length} result{filteredResults.length !== 1 ? 's' : ''}
        </p>
      )}

      <div className="space-y-3">
        {filteredResults.length > 0 ? (
          filteredResults.map((item, idx) => (
            <div key={idx}>
              {renderItem ? renderItem(item) : (
                <div className="p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                  <pre className="text-sm">{JSON.stringify(item, null, 2)}</pre>
                </div>
              )}
            </div>
          ))
        ) : query ? (
          <div className="text-center py-8 text-gray-500">
            No results found for "{query}"
          </div>
        ) : null}
      </div>
    </div>
  );
};

// Demo component
const SearchBarDemo = () => {
  const sampleData = [
    { id: 1, name: 'Apple iPhone 15', category: 'Electronics', price: 999 },
    { id: 2, name: 'Samsung Galaxy S24', category: 'Electronics', price: 899 },
    { id: 3, name: 'Nike Air Max', category: 'Footwear', price: 150 },
    { id: 4, name: 'Adidas Ultraboost', category: 'Footwear', price: 180 },
    { id: 5, name: 'Sony WH-1000XM5', category: 'Audio', price: 399 },
    { id: 6, name: 'Apple AirPods Pro', category: 'Audio', price: 249 },
    { id: 7, name: 'Dell XPS 13', category: 'Computers', price: 1299 },
    { id: 8, name: 'MacBook Pro 14', category: 'Computers', price: 1999 },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Search Bar Component</h1>
        <p className="text-gray-600 mb-8">Live filtering demo with product data</p>

        <SearchBar
          data={sampleData}
          searchKeys={['name', 'category']}
          placeholder="Search by product name or category..."
          renderItem={(item) => (
            <div className="p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-gray-900">{item.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">{item.category}</p>
                </div>
                <span className="text-lg font-bold text-blue-600">${item.price}</span>
              </div>
            </div>
          )}
        />
      </div>
    </div>
  );
};

export default SearchBarDemo;