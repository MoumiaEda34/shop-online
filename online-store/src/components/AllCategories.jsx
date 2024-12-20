// src/components/AllCategories.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const AllCategories = () => {
    const [categories, setCategories] = useState([]);
    const [productsByCategory, setProductsByCategory] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAllProducts = async () => {
            try {
                const response = await fetch('https://fakestoreapi.com/products');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                const uniqueCategories = [...new Set(data.map(product => product.category))];
                setCategories(uniqueCategories);

                const categoryProducts = await Promise.all(
                    uniqueCategories.map(async (category) => {
                        const categoryResponse = await fetch(`https://fakestoreapi.com/products/category/${category}`);
                        if (!categoryResponse.ok) {
                            throw new Error('Network response was not ok');
                        }
                        return categoryResponse.json();
                    })
                );

                const productsMap = uniqueCategories.reduce((acc, category, index) => {
                    acc[category] = categoryProducts[index];
                    return acc;
                }, {});

                setProductsByCategory(productsMap);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchAllProducts();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="all-cat container my-4">
        <h1 className="text-center mb-4">All Products by Category</h1>
        <div className="row">
          {categories.map(category => (
            <div key={category} className="col-md-3 mb-3">
              <div className="card text-center h-100">
                <div className="card-body">
                  <h2 className="card-title">
                    <Link to={`/category/${category}`} className="category-d text-decoration-none">
                      {category}
                    </Link>
                  </h2>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>      
    );
};

export default AllCategories;
