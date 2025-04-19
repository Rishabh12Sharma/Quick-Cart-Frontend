import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getProducts } from "../api/api";
import "./ProductList.css";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const ProductList = () => {
  const query = useQuery();
  const navigate = useNavigate();

  const categoryFromQuery = query.get("category") || "All";
  const searchQuery = query.get("search") || "";

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState(categoryFromQuery);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const data = await getProducts(selectedCategory);
      setProducts(data);
      setLoading(false);
    };
    fetchProducts();
  }, [selectedCategory]);

  useEffect(() => {
    const filtered = products.filter((product) => {
      const price = Number(product.price);
      const min = minPrice ? Number(minPrice) : 0;
      const max = maxPrice ? Number(maxPrice) : Infinity;
      const isWithinPriceRange = price >= min && price <= max;
      const isMatchingSearchQuery =
        searchQuery === "" ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase());
      return isWithinPriceRange && isMatchingSearchQuery;
    });
    setFilteredProducts(filtered);
  }, [products, minPrice, maxPrice, searchQuery]);

  const handleCategoryChange = (e) => {
    const newCategory = e.target.value;
    setSelectedCategory(newCategory);
    navigate(`/?category=${newCategory}`);
  };

  return (
    <div className="product-list-container">
      <div className="sidebar">
        <h3>Filters</h3>
        <div className="filter-group">
          <label>Category:</label>
          <select value={selectedCategory} onChange={handleCategoryChange}>
            <option value="All">All</option>
            <option value="electronic">Electronics</option>
            <option value="clothing">Clothing</option>
            <option value="beauty">Beauty</option>
            <option value="shoes">Shoes</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Min Price:</label>
          <input
            type="number"
            placeholder="₹ Min"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />
        </div>

        <div className="filter-group">
          <label>Max Price:</label>
          <input
            type="number"
            placeholder="₹ Max"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
        </div>
      </div>

      <div className="product-list">
        <h2 className="title">
          {selectedCategory === "All"
            ? "All Products"
            : `Category: ${selectedCategory}`}
        </h2>

        {loading ? (
          <p className="loading">Loading products...</p>
        ) : filteredProducts.length === 0 ? (
          <p className="no-products">No products found in this filter.</p>
        ) : (
          <div className="product-grid">
            {filteredProducts.map((product) => (
              <Link
                to={`/product/${product._id}`}
                key={product._id}
                className="product-card-link"
              >
                <div className="product-card">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="product-img"
                  />
                  <div className="product-info">
                    <h3 className="product-name">{product.name}</h3>
                    <p className="product-description">{product.description}</p>
                    <p className="product-price">₹{product.price}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;
