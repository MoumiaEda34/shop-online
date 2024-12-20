import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Card, Image } from 'react-bootstrap';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1); // For quantity control
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch product details by ID
    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching product details:', err);
        setLoading(false);
      });
  }, [id]);

  const handleBackToCategory = () => {
    if (product && product.category) {
      navigate(`/category/${product.category}`);
    } else {
      navigate('/'); // Navigate to home if no category found
    }
  };

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) setQuantity((prev) => prev - 1);
  };

  const handleOrderNow = () => {
    alert(`You have ordered ${quantity} ${product.title}(s) for $${quantity * product.price}`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Product not found.</div>;
  }

  return (
    <Container style={{ padding: '20px' }}>
      <Row>
        <Col md={6}>
          <Image
            src={product.thumbnail}
            alt={product.title}
            fluid
            style={{ marginBottom: '20px' }}
          />
        </Col>
        <Col md={6}>
          <h2>{product.title}</h2>
          <p>{product.description}</p>
          <p><strong>Price:</strong> ${product.price}</p>
          <p><strong>Brand:</strong> {product.brand}</p>
          <p><strong>Rating:</strong> {product.rating} / 5</p>
          <p><strong>Stock:</strong> {product.stock > 0 ? 'In Stock' : 'Out of Stock'}</p>
          <p><strong>Category:</strong> {product.category}</p>

          <div className="d-flex align-items-center my-3">
            <Button variant="outline-primary" onClick={handleDecrement} disabled={quantity === 1}>
              -
            </Button>
            <span className="mx-3">{quantity}</span>
            <Button variant="outline-primary" onClick={handleIncrement}>
              +
            </Button>
          </div>

          <Button
            variant="success"
            className="me-3"
            onClick={handleOrderNow}
            disabled={product.stock <= 0}
          >
            Order Now
          </Button>
          <Button variant="secondary" onClick={handleBackToCategory}>
            Back to Category
          </Button>
        </Col>
      </Row>

      {product.images && product.images.length > 0 && (
        <Row className="mt-4">
          <Col>
            <h5>Additional Images:</h5>
            <div className="d-flex gap-3">
              {product.images.map((img, index) => (
                <Image
                  key={index}
                  src={img}
                  alt={`Additional view ${index + 1}`}
                  roundedCircle
                  style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                />
              ))}
            </div>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default ProductDetails;
