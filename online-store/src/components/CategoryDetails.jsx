import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Jewelry.css';

const CategoryDetails = () => {
    const { categoryName } = useParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const fetchCategoryProducts = async () => {
            try {
                const response = await fetch(`https://fakestoreapi.com/products/category/${categoryName}`);
                if (!response.ok) {
                    throw new Error(`Network response was not ok. Status: ${response.status}`);
                }
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCategoryProducts();
    }, [categoryName]);

    const addToCart = (product) => {
        setCart(prevCart => {
            const existingProduct = prevCart.find(item => item.id === product.id);
            if (existingProduct) {
                return prevCart.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                return [...prevCart, { ...product, quantity: 1 }];
            }
        });
    };

    const removeFromCart = (productId) => {
        setCart(prevCart => {
            const product = prevCart.find(item => item.id === productId);
            if (product && product.quantity > 1) {
                return prevCart.map(item =>
                    item.id === productId
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                );
            } else {
                return prevCart.filter(item => item.id !== productId);
            }
        });
    };

    const totalItemsInCart = cart.reduce((total, item) => total + item.quantity, 0);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="category-all container my-4">
            {/* Cart Section moved to the top with total count */}
            <div className="cart-section mt-4 d-flex justify-content-between">
                <div>
                    <h2>Your Cart</h2>
                    {cart.length === 0 ? (
                        <p>Your cart is empty.</p>
                    ) : (
                        <div>
                            {cart.map(item => (
                                <div key={item.id} className="cart-item">
                                    <h5>{item.title}</h5>
                                    <p>Price: ${item.price}</p>
                                    <p>Quantity: {item.quantity}</p>
                                    <button className="btn btn-danger" onClick={() => removeFromCart(item.id)}>-</button>
                                    <button className="btn btn-success" onClick={() => addToCart(item)}>+</button>
                                </div>
                            ))}
                            <div>
                                <h3>
                                    Total Price: $
                                    {cart.reduce((total, item) => total + item.price * item.quantity, 0)}
                                </h3>
                            </div>
                        </div>
                    )}
                </div>
                {/* Total Cart Count */}
                <div className="cart-count d-flex align-items-center">
                    <h3>Total Items: {totalItemsInCart}</h3>
                </div>
            </div>

            <h1 className="text-center mb-4">Products in {categoryName}</h1>
            <div className="row">
                {products.length > 0 ? (
                    products.map(product => (
                        <div key={product.id} className="col-md-4 mb-4">
                            <div className="card h-100">
                                <img
                                    src={product.image}
                                    alt={product.title}
                                    className="card-img-top"
                                    style={{ height: '150px', objectFit: 'cover' }}
                                />
                                <div className="card-body">
                                    <h5 className="card-title">{product.title}</h5>
                                    <p className="card-text">
                                        <strong>Price:</strong> ${product.price}
                                    </p>
                                    {/* <p className="card-text">{product.description}</p> */}
                                    <button className="btn btn-primary" onClick={() => addToCart(product)}>
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-12">
                        <p className="text-center">No products available</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CategoryDetails;
