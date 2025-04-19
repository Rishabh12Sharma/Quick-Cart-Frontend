import "./App.css";
import Navbar from "./components/NavbarComponent";
import Login from "./components/Login";
import { CartProvider } from "./context/CartContext";
import About from "./components/About";
import CartPage from "./components/CartPage";
import Footer from "./components/Footer";
import ProductList from "./components/ProductList";
import ProductDetail from "./components/ProductDetail";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import Signup from "./components/Signup";
import Checkout from "./components/Checkout";
import Profile from "./components/Profile";




function App() {
  return (
    
    <div id="root">
      <Navbar />
      <div className="main-content">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
          <Route path="/" element={<ProductList />} />
          <Route path="/product/:productId" element={<ProductDetail />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/profile" element={<Profile />} />  {/* Add Profile route */}
          
        </Routes>
      </div>
      <Footer />
    </div>
    
  );
}

export default App;
