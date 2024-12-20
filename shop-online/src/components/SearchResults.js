import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const SearchResults = () => {
  const { term } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`https://dummyjson.com/products/search?q=${term}`)
      .then((res) => res.json())
      .then((data) => setProducts(data.products))
      .catch((err) => console.error('Error fetching search results:', err));
  }, [term]);

  return (
    <div>
      <h2>Search Results for: {term}</h2>
      <div className="row">
        {products.map((product) => (
          <div className="col-md-4" key={product.id}>
            <div className="card mb-4">
              <img src={product.image} className="card-img-top" alt={product.title} />
              <div className="card-body">
                <h5 className="card-title">{product.title}</h5>
                <p className="card-text">{product.description}</p>
                <p className="card-text"><strong>Price: ${product.price}</strong></p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
