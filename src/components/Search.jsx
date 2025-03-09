import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const Search = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [priceFilter, setPriceFilter] = useState('');
  const [hasSearched, setHasSearched] = useState(false); // Tracks if user has searched at least once

  const handleSearch = async () => {
    if (!/^\w{2,}$/.test(query.trim())) {
      setError('Please enter a valid search term (at least two characters).');
      setResults([]); 
      setHasSearched(true); // Mark as searched so message logic works
      return;
    }

    setLoading(true);
    setError(null);
    setHasSearched(true); // User has searched at least once
    try {
      const response = await axios.get(`http://localhost:3000/search?query=${query}&price=${priceFilter}`);
      setResults(response.data);

      if (response.data.length === 0) {
        setError('No packages found for the requested search.');
      }
    } catch (err) {
      setError('Error fetching results');
      setResults([]);
    }
    setLoading(false);
  };

  return (
    <>
      <Header />
      <div className='h-[10vh] bg-white'></div>
      <div className="container mx-auto p-4 mt-10 flex">
        <div className="w-3/4">
          <input
            type="text"
            placeholder="Search for packages..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="border p-2 w-full"
          />
          <button onClick={handleSearch} className="bg-blue-600 text-white p-2 mt-2 rounded-md">Search</button>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {hasSearched && results.length === 0 && !loading && !error && (
              <p className="text-gray-500">No packages found for the requested search.</p>
            )}
            {results.map((item) => (
              <div key={item.slug} className="border p-4 rounded-lg shadow-lg">
                <img src={item.p_imageUrl} alt={item.p_title} className="w-full h-40 object-cover" />
                <h2 className="text-xl font-bold">{item.p_title}</h2>
                <p>{item.content_one ? item.content_one.substring(0, 100) + '...' : ''}</p>
                <p className="font-bold text-green-600">${item.price}</p>
                <Link to={`/package/${item.slug}`} className="text-blue-600">View More</Link>
              </div>
            ))}
          </div>
        </div>
        <div className="w-1/4 p-4 bg-gray-100 rounded-lg shadow-lg ml-4">
          <h2 className="text-xl font-bold">Filter by Price</h2>
          <input
            type="number"
            placeholder="Max Price"
            value={priceFilter}
            onChange={(e) => setPriceFilter(e.target.value)}
            className="border p-2 w-full mt-2"
          />
          <button onClick={handleSearch} className="bg-green-600 text-white p-2 mt-2 rounded-md w-full">Apply Filter</button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Search;
