import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { Container, Row, Col, Button, Image, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // ✅ Make sure this is imported
import Checkout from './Checkout';

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity } = useContext(CartContext);
  const navigate = useNavigate(); // ✅ Initialize navigate

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">Shopping Cart</h2>
      {cart.length === 0 ? (
        <p className="text-center">Your cart is empty.</p>
      ) : (
        <Row>
          {cart
            .filter((item) => item)
            .map((item) => (
              <Col key={item._id} xs={12} md={6} lg={4} className="mb-4">
                <div className="cart-item border p-3 rounded shadow-sm">
                  <Row>
                    <Col xs={4} className="d-flex justify-content-center">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fluid
                        style={{
                          maxWidth: "100px",
                          height: "100px",
                          objectFit: "cover",
                        }}
                      />
                    </Col>
                    <Col xs={8}>
                      <h5>{item.name}</h5>
                      <p>Price: ₹{item.price}</p>
                      <div className="d-flex align-items-center mb-2">
                        <Form.Control
                          type="number"
                          value={item.quantity}
                          onChange={(e) => {
                            const value = parseInt(e.target.value);
                            updateQuantity(
                              item._id,
                              isNaN(value) || value < 1 ? 1 : value
                            );
                          }}
                          onBlur={(e) => {
                            if (!e.target.value) updateQuantity(item._id, 1);
                          }}
                          min="1"
                          className="w-auto me-2"
                        />
                        <Button
                          variant="danger"
                          onClick={() => removeFromCart(item._id)}
                          className="btn-sm"
                        >
                          Remove
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </div>
              </Col>
            ))}
        </Row>
      )}
      <div className="d-flex justify-content-between mt-4">
        <h4>
          Total: ₹
          {cart.reduce((total, item) => total + item.price * item.quantity, 0)}
        </h4>
        <Button
          variant="primary"
          className="btn-lg"
          disabled={cart.length === 0}
          onClick={() => navigate("/checkout", { state: { cart } })}
        >
          Proceed to Checkout
        </Button>
      </div>
    </Container>
  );
};

export default CartPage;
