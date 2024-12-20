// src/components/ProductList.js
import React, { useEffect, useState } from 'react';
import { fetchProducts } from '../api';
import './Jewelry.css';

const ProductList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const allProducts = await fetchProducts();
                setProducts(allProducts);
            } catch (error) {
                console.error("Error loading products:", error);
            }
        };
        loadProducts();
    }, []);

    return (
        <div className="all-pro container my-4">
        <h2 className="text-center mb-4">All Products</h2>
        <div className="row">
          {products.map(product => (
            <div key={product.id} className="col-md-4 mb-4">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">{product.title}</h5>
                  <p className="card-text">Price: ${product.price}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
    );
};

export default ProductList;
