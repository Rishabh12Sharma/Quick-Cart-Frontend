import React, { createContext, useState } from "react";

export const CartContext = createContext(); // ✅ Named Export

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // ✅ Add product to cart (Handles Quantity)
  const addToCart = (product) => {
    console.log("Adding to cart:", product);
    if (!product || !product._id) return;

    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item._id === product._id);
      return existingProduct
        ? prevCart.map((item) =>
            item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
          )
        : [...prevCart, { ...product, quantity: 1 }];
    });
  };

  // ✅ Remove product from cart
  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item._id !== productId));
  };

  // ✅ Update quantity of a product in the cart
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    setCart((prevCart) =>
      prevCart.map((item) =>
        item._id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

export { CartProvider }; // ✅ Named Export
