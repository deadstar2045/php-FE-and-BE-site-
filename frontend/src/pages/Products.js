

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Products.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  // TODO: Replace with actual API call
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setProducts([
        { id: 1, name: 'Product 1', price: 29.99, image: 'https://via.placeholder.com/300x200', category: 'electronics' },
        { id: 2, name: 'Product 2', price: 39.99, image: 'https://via.placeholder.com/300x200', category: 'clothing' },
        { id: 3, name: 'Product 3', price: 19.99, image: 'https://via.placeholder.com/300x200', category: 'electronics' },
        { id: 4, name: 'Product 4', price: 49.99, image: 'https://via.placeholder.com/300x200', category: 'home' },
        { id: 5, name: 'Product 5', price: 24.99, image: 'https://via.placeholder.com/300x200', category: 'clothing' },
        { id: 6, name: 'Product 6', price: 34.99, image: 'https://via.placeholder.com/300x200', category: 'home' },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredProducts = filter === 'all' 
    ? products 
    : products.filter(product => product.category === filter);

  if (loading) {
    return (
      <div className="products-page">
        <div className="container">
          <div className="loading">Loading products...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="products-page">
      <div className="container">
        <h1>All Products</h1>
        
        {/* Filter */}
        <div className="filter-section">
          <label htmlFor="category-filter">Filter by category:</label>
          <select 
            id="category-filter"
            value={filter} 
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All Categories</option>
            <option value="electronics">Electronics</option>
            <option value="clothing">Clothing</option>
            <option value="home">Home & Garden</option>
          </select>
        </div>

        {/* Products Grid */}
        <div className="products-grid">
          {filteredProducts.map(product => (
            <div key={product.id} className="product-card">
              <Link to={`/product/${product.id}`}>
                <div className="product-image">
                  <img src={product.image} alt={product.name} />
                </div>
                <div className="product-info">
                  <h3>{product.name}</h3>
                  <p className="price">${product.price}</p>
                </div>
              </Link>
              <button className="btn btn-primary">Add to Cart</button>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="no-products">
            <p>No products found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
