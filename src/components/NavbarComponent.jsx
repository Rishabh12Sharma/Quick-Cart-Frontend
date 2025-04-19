import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext"; // Import AuthContext
import { CartContext } from "../context/CartContext";
import "./NavbarComponent.css"; // Custom CSS for styling

function NavbarComponent() {
  const { cart } = useContext(CartContext);
  const { user, logout } = useContext(AuthContext); // Access user and logout
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  const [searchTerm, setSearchTerm] = useState(""); // For search functionality
  const [isCartDropdownOpen, setCartDropdownOpen] = useState(false); // Cart dropdown state

  const navigate = useNavigate();

  // Handle search form submission
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchTerm)}`);
      setSearchTerm(""); // Clear the search input after submission
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-content">
        {/* Brand */}
        <Link to="/" className="navbar-brand">QuickCart</Link>

        {/* Search bar */}
        <form className="navbar-search" onSubmit={handleSearch}>
          <input
            type="text"
            className="navbar-search-input"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit" className="navbar-search-btn">
            🔍
          </button>
        </form>

        {/* Links */}
        <div className="navbar-links">
          <Link to="/" className="navbar-link">Home</Link>
          <Link to="/about" className="navbar-link">About</Link>
        </div>

        {/* Auth Links and Cart */}
        <div className="navbar-auth">
          {!user ? (
            <>
              <Link to="/signup" className="navbar-link">Signup</Link>
              <Link to="/login" className="navbar-link">Login</Link>
            </>
          ) : (
            <>
              <Link to="/profile" className="navbar-link">Hello, {user.name}</Link> {/* Profile link */}
              <button className="navbar-link" onClick={logout}>Logout</button> {/* Logout button */}
            </>
          )}

          {/* Cart with dropdown */}
          <div
            className="navbar-cart"
            onMouseEnter={() => setCartDropdownOpen(true)}
            onMouseLeave={() => setCartDropdownOpen(false)}
          >
            <Link to="/cart" className="navbar-link cart-link">
              Cart {cartItemCount > 0 && <span>({cartItemCount})</span>}
            </Link>

            {/* Display cart dropdown with item details */}
            {isCartDropdownOpen && cart.length > 0 && (
              <div className="cart-dropdown">
                <ul>
                  {cart.map((item, index) => (
                    <li key={index}>
                      {item.name} - {item.quantity} x ₹{item.price}
                    </li>
                  ))}
                </ul>
                <Link to="/cart" className="cart-dropdown-btn">View Cart</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavbarComponent;
