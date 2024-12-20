import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProductById } from '../api';
import 'bootstrap/dist/css/bootstrap.min.css';

const ProductDetail = () => {
    const { productId } = useParams(); // Get the productId from the URL
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [quantity, setQuantity] = useState(1); // Initial quantity set to 1

    useEffect(() => {
        const loadProduct = async () => {
            try {
                const data = await fetchProductById(productId);
                setProduct(data);
            } catch (error) {
                setError('Error fetching product details');
            } finally {
                setLoading(false);
            }
        };
        loadProduct();
    }, [productId]);

    const increaseQuantity = () => setQuantity(prev => prev + 1);
    const decreaseQuantity = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

    const handleOrderNow = () => {
        alert(`Order placed for ${quantity} ${product.title}(s) at $${(product.price * quantity).toFixed(2)}`);
    };

    if (loading) return <div className="text-center my-5">Loading...</div>;
    if (error) return <div className="alert alert-danger">{error}</div>;
    if (!product) return <div className="alert alert-warning">Product not found</div>;

    return (
        <div className="container my-5">
            <div className="row">
                <div className="col-md-6">
                    <img
                        src={product.image}
                        alt={product.title}
                        className="img-fluid rounded"
                        style={{ maxHeight: '400px' }}
                    />
                </div>
                <div className="col-md-6">
                    <h2 className="mb-3">{product.title}</h2>
                    <p className="text-muted"><strong>Price:</strong> ${product.price}</p>
                    <p className="mb-4"><strong>Description:</strong> {product.description}</p>
                    <div className="d-flex align-items-center mb-3">
                        <button
                            className="btn btn-outline-secondary me-2"
                            onClick={decreaseQuantity}
                        >
                            -
                        </button>
                        <span className="fs-5">{quantity}</span>
                        <button
                            className="btn btn-outline-secondary ms-2"
                            onClick={increaseQuantity}
                        >
                            +
                        </button>
                    </div>
                    <p className="mb-4"><strong>Total Price:</strong> ${(product.price * quantity).toFixed(2)}</p>
                    <button
                        className="btn btn-primary btn-lg"
                        onClick={handleOrderNow}
                    >
                        Order Now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
