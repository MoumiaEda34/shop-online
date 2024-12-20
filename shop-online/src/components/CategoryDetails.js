import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';

const CategoryDetails = () => {
  const { name } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch products for the selected category
    fetch(`https://dummyjson.com/products/category/${name}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.products); // Check product data
        setProducts(data.products);
      })
      .catch((err) => console.error('Error fetching products:', err));
  }, [name]);

  return (
    <Container style={{ padding: '20px' }}>
      <h2 className="text-center mb-4">Category: {name}</h2>
      <Row className="justify-content-center">
        {products.map((product) => (
          <Col key={product.id} md={4} className="mb-4">
            <Card style={{ textAlign: 'center' }}>
              <Card.Img
                variant="top"
                src={product.thumbnail}
                alt={product.title}
                style={{ height: '200px', objectFit: 'cover' }}
              />
              <Card.Body>
                <Card.Title>{product.title}</Card.Title>
                <Link to={`/product/${product.id}`}>
                  <Button variant="primary">View Details</Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default CategoryDetails;
