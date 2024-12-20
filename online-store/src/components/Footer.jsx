import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <div className="footer-main bg-primary text-white py-4">
      <div className="container">
        <ul className="list-unstyled d-flex justify-content-center mb-0">
          <li className="mx-3">
            <Link to="/" className="text-white text-decoration-none">Home</Link>
          </li>
          <li className="mx-3">
            <Link to="/category" className="text-white text-decoration-none">Category</Link>
          </li>
          <li className="mx-3">
            <Link to="/category/jewelry" className="text-white text-decoration-none">Jewelry</Link>
          </li>
          <li className="mx-3">
            <Link to="/category/electronics" className="text-white text-decoration-none">Electronics</Link>
          </li>
          <li className="mx-3">
            <Link to="/category/men's clothing" className="text-white text-decoration-none">Men's Clothing</Link>
          </li>
          <li className="mx-3">
            <Link to="/category/women's clothing" className="text-white text-decoration-none">Women's Clothing</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Footer;
