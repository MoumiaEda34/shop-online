// src/components/CategoryNav.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Jewelry.css'

const CategoryNav = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                // Example API endpoint for categories
                const response = await fetch('https://fakestoreapi.com/products/categories');
                
                // Check for errors in response
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                setCategories(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <nav>
            <ul className='cat-all'>
                <li><Link to="/">All Products</Link></li>
                {categories.map(category => (
                    <li key={category}>
                        <Link to={`/category/${category}`}>{category}</Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default CategoryNav;
