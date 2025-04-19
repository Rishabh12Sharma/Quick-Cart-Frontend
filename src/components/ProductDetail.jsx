import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById, addReview } from "../api/api";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import { Container, Row, Col, Button, Alert, Spinner, Form, ListGroup } from "react-bootstrap";

const ProductDetail = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState("");
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const data = await getProductById(productId);
        if (!data || Object.keys(data).length === 0) {
          setProduct(null);
        } else {
          setProduct(data);
          setReviews(data.reviews || []);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
        setProduct(null);
      }
      setLoading(false);
    };
    fetchProduct();
  }, [productId]);

  const handleAddToCart = () => {
    if (!user) {
      alert("Please log in to add items to your cart.");
      navigate("/login");
      return;
    }
    addToCart(product);
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert("Please log in to add a review.");
      navigate("/login");
      return;
    }
  
    try {
      const newReview = {
        rating,
        comment,
        userId: user._id, // Pass user ID
        name: user.name,   // Pass user name
      };
      const data = await addReview(productId, newReview);
      setReviews([data, ...reviews]);
      setRating(1);
      setComment("");
      setError("");
    } catch (error) {
      setError("Failed to submit review. Please try again.");
    }
  };
  

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
        <p>Loading product details...</p>
      </Container>
    );
  }

  if (!product) {
    return (
      <Container className="text-center mt-5">
        <Alert variant="danger">Product not found!</Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <Row className="align-items-center">
        <Col xs={12} md={6} className="text-center">
          <img
            src={product.image}
            alt={product.name}
            className="img-fluid rounded shadow"
            style={{ maxHeight: "400px", objectFit: "cover" }}
          />
        </Col>

        <Col xs={12} md={6}>
          <h2 className="fw-bold">{product.name}</h2>
          <p className="text-muted">{product.description}</p>
          <h4 className="text-success">₹{product.price}</h4>
          <Button
            variant={user ? "success" : "secondary"}
            size="lg"
            className="mt-3 w-100"
            onClick={handleAddToCart}
            disabled={!user}
          >
            {user ? "Add to Cart" : "Login to Add"}
          </Button>
        </Col>
      </Row>

      <Row className="mt-5">
        <Col>
          <h3>Customer Reviews</h3>
          {reviews.length === 0 ? (
            <Alert variant="info">No reviews yet. Be the first to review!</Alert>
          ) : (
            <ListGroup>
              {reviews.map((review, index) => (
                <ListGroup.Item key={index}>
                  <strong>{review.name || "Anonymous"} - Rating: {review.rating}</strong>
                  <p>{review.comment}</p>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
      </Row>

      {user && (
        <Row className="mt-5">
          <Col>
            <h4>Add a Review</h4>
            <Form onSubmit={handleReviewSubmit}>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form.Group controlId="formRating">
                <Form.Label>Rating</Form.Label>
                <Form.Control
                  as="select"
                  value={rating}
                  onChange={(e) => setRating(Number(e.target.value))}
                >
                  {[1, 2, 3, 4, 5].map((star) => (
                    <option key={star} value={star}>
                      {star} Star{star > 1 ? "s" : ""}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="formComment" className="mt-3">
                <Form.Label>Comment</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  required
                />
              </Form.Group>
              <Button
                variant="primary"
                type="submit"
                className="mt-3"
                disabled={!comment || !rating}
              >
                Submit Review
              </Button>
            </Form>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default ProductDetail;
