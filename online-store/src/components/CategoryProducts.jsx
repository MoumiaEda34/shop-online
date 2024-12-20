// src/components/CategoryProducts.js
import React, { useEffect, useState } from 'react';
import { fetchProductsByCategory } from '../api';
const CategoryProducts = ({ category }) => {
    const [categoryProducts, setCategoryProducts] = useState([]);

    useEffect(() => {
        const loadCategoryProducts = async () => {
            try {
                const products = await fetchProductsByCategory(category);
                setCategoryProducts(products);
            } catch (error) {
                console.error(`Error loading category products for ${category}:`, error);
            }
        };
        loadCategoryProducts();
    }, [category]);

    return (
        <div>
            <h2>Products in Category: {category}</h2>
            <div>
                {categoryProducts.map(product => (
                    <div key={product.id}>
                        <h3>{product.title}</h3>
                        <p>Price: ${product.price}</p>
                        
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CategoryProducts;
