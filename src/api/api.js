import axios from "axios";

const API_BASE_URL = "http://localhost:5000"; // Using env variable for flexibility

// Fetch all or filtered products
export const getProducts = async (category = "All") => {
  try {
    // Build the URL with category query if necessary
    const url = category && category !== "All"
      ? `${API_BASE_URL}/api/products?category=${encodeURIComponent(category)}`
      : `${API_BASE_URL}/api/products`;  // Default to all products if no category

    const response = await axios.get(url);
    return response.data; // Return fetched data
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

// Fetch a single product by ID
export const getProductById = async (productId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/products/${productId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching product with ID ${productId}:`, error);
    return null;
  }
};

// Add a review to a product
export const addReview = async (productId, reviewData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/products/${productId}/reviews`,
      newReview
    );
    return response.data;
  } catch (error) {
    console.error("Error adding review:", error.response?.data || error.message);
    throw error;
  }
};
