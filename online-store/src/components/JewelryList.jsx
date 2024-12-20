import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchProductsByCategory } from '../api';
import './Jewelry.css';
const JewelryList = () => {
    const [products, setProducts] = useState([]);
    const category = 'jewelery';

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const data = await fetchProductsByCategory(category);
                setProducts(data);
            } catch (error) {
                console.error(`Error loading products in category ${category}:`, error);
            }
        };
        loadProducts();
    }, []);

    return (
        <div className="jewelry-block container my-4">
        <h2 className="text-center mb-4">Jewelry Products</h2>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3>Explore Our Collection</h3>
          <Link to={`/product-list`} className="btn btn-primary">Show All</Link>
        </div>
        <div className="row">
          {products.map(product => (
            <div key={product.id} className="col-md-3 mb-3">
              <div className="card h-100">
                <img src={product.image} alt={product.title} className="card-img-top" style={{ height: '150px', objectFit: 'cover' }} />
                <div className="card-body">
                  <h5 className="card-title">{product.title}</h5>
                  <p className="card-text">Price: ${product.price}</p>
                  <Link to={`/product/${product.id}`} className="btn btn-outline-primary btn-sm">View Details</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>      
    );
};

export default JewelryList;
