import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchPanel = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
  const navigate = useNavigate();

  // Debounce the search term to limit API calls
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300); // Adjust the debounce delay as needed

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  useEffect(() => {
    if (debouncedSearchTerm.trim()) {
      fetch(`https://dummyjson.com/products/search?q=${debouncedSearchTerm}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.products && data.products.length > 0) {
            const product = data.products[0];
            navigate(`/product/${product.id}`);
          } else {
            console.log('No products found');
          }
        })
        .catch((err) => console.error('Error fetching products:', err));
    }
  }, [debouncedSearchTerm, navigate]);

  return (
    <div className="search-panel bg-light p-3" style={{ width: '250px', height: '100vh', position: 'fixed', right: 0, top: 0 }}>
      <h5>Search Products</h5>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </form>
    </div>
  );
};

export default SearchPanel;
