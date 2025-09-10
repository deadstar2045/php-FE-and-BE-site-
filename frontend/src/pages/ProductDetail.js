

import React from 'react';
import { useParams } from 'react-router-dom';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  // TODO: Fetch product data based on ID

  return (
    <div className="product-detail">
      <div className="container">
        <div className="product-detail-content">
          <div className="product-image">
            <img src="https://via.placeholder.com/500x400" alt="Product" />
          </div>
          <div className="product-info">
            <h1>Product {id}</h1>
            <p className="price">$29.99</p>
            <p className="description">
              This is a detailed description of the product. It includes all the features, 
              specifications, and benefits that customers need to know before making a purchase.
            </p>
            <div className="product-actions">
              <div className="quantity-selector">
                <label htmlFor="quantity">Quantity:</label>
                <input type="number" id="quantity" min="1" defaultValue="1" />
              </div>
              <button className="btn btn-primary btn-large">Add to Cart</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
