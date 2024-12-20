import React, { useEffect, useState } from 'react';
import { getCategories } from '../api';

const CategoryList = ({ onCategorySelect }) => {
  const [categories, setCategories] = useState([]);

  // Fetch categories when the component mounts
  useEffect(() => {
    getCategories().then((res) => {
      setCategories(res.data);
    }).catch((err) => {
      console.error('Failed to fetch categories:', err);
    });
  }, []);

  return (
    <div className="category-list">
      <h3>Product Categories</h3>
      <ul>
        {categories.map((category, index) => (
          <li key={index} onClick={() => onCategorySelect(category)}>
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;
