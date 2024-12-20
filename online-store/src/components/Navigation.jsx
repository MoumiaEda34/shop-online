// src/components/Navigation.js
import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const Navigation = () => {
    return (
        <Navbar bg="primary" expand="lg">
            <Navbar.Brand as={Link} to="/">Online Store</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link as={Link} to="/">Home</Nav.Link>
                    <Nav.Link as={Link} to="/category">Category</Nav.Link>
                    <Nav.Link as={Link} to="/jewelry">Jewelry</Nav.Link>
                    <Nav.Link as={Link} to="/category/electronics">Electronics</Nav.Link>
                    <Nav.Link as={Link} to="/category/men's clothing">Men's Clothing</Nav.Link>
                    <Nav.Link as={Link} to="/category/women's clothing">Women's Clothing</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default Navigation;
