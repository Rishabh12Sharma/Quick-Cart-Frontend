import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "./context/CartContext"; 
import { AuthProvider } from "./context/AuthContext";
import "./index.css";
import App from "./App";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CartProvider>
      <BrowserRouter>
      <AuthProvider>
          <App /> 
        </AuthProvider>
      </BrowserRouter>
    </CartProvider>
  </StrictMode>
);
