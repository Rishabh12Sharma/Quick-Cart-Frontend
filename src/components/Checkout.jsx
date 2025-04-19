import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Row, Col, Card, Image, Form, Button, Alert } from 'react-bootstrap';

const Checkout = () => {
  const location = useLocation();
  const cart = location.state?.cart || [];

  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [submitted, setSubmitted] = useState(false);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Order submitted with payment:", paymentMethod);
    console.log("Cart:", cart);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <Container className="mt-5 text-center">
        <Alert variant="success">✅ Order placed successfully!</Alert>
        <p>Payment Method: <strong>{paymentMethod === 'cod' ? 'Cash on Delivery' : 'Online Payment'}</strong></p>
        <p>Total Paid: ₹{total}</p>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">Checkout Page</h2>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <Row>
            {cart.map((item) => (
              <Col key={item._id} xs={12} md={6} lg={4} className="mb-4">
                <Card className="h-100 shadow-sm">
                  <Card.Body>
                    <Image
                      src={item.image}
                      alt={item.name}
                      fluid
                      className="mb-3"
                      style={{ height: "150px", objectFit: "cover", borderRadius: "10px" }}
                    />
                    <Card.Title>{item.name}</Card.Title>
                    <Card.Text>
                      Quantity: {item.quantity} <br />
                      Price per item: ₹{item.price} <br />
                      <strong>Total: ₹{item.price * item.quantity}</strong>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          <hr />
          <h4 className="text-end">Grand Total: ₹{total}</h4>

          <Form onSubmit={handleSubmit} className="mt-4">
            <h5>Select Payment Method</h5>

            <Form.Check
              type="radio"
              label="Cash on Delivery (COD)"
              name="paymentMethod"
              value="cod"
              checked={paymentMethod === 'cod'}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="mb-2"
            />

            <Form.Check
              type="radio"
              label="Online Payment"
              name="paymentMethod"
              value="online"
              checked={paymentMethod === 'online'}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="mb-3"
            />

            <Button variant="success" type="submit" className="w-100">
              Place Order
            </Button>
          </Form>
        </>
      )}
    </Container>
  );
};

export default Checkout;
