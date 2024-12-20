import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SideNav = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://dummyjson.com/products/categories')
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error('Error fetching categories:', err));
  }, []);

  const handleAllCategories = () => {
    navigate('/'); // Navigate to the main page (or adjust to your main categories page)
  };

  return (
    <div style={{
      width: '250px',
      height: '100vh',
      overflowY: 'auto',
      position: 'fixed',
      backgroundColor: '#007bff',
      color: 'white',
      padding: '1rem',
      boxShadow: '2px 0 5px rgba(0, 0, 0, 0.1)'
    }}>
      <button
        onClick={handleAllCategories}
        style={{
          backgroundColor: 'transparent',
          color: 'white',
          border: 'none',
          padding: '10px',
          textAlign: 'left',
          width: '100%',
          cursor: 'pointer',
          marginBottom: '10px',
          transition: 'background-color 0.3s'
        }}
        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'}
        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
      >
        Shop Online
      </button>
      <ul className="list-unstyled">
        {categories.map((category, index) => (
          <li key={index} className="mb-2">
            <Link to={`/category/${category.name}`} style={{
              color: 'white',
              textDecoration: 'none',
              display: 'block',
              padding: '10px',
              transition: 'background-color 0.3s'
            }} 
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'} 
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
              {category.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SideNav;
