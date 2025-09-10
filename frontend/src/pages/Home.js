import React from 'react';
import { Link } from 'react-router-dom';
import Carousel from '../components/Carousel';
import './Home.css';

const Home = () => {
  // Sample products data
  const featuredProducts = [
    {
      id: 1,
      name: "Wireless Headphones",
      category: "Electronics",
      price: 99.99,
      originalPrice: 129.99,
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop",
      badge: "Best Seller"
    },
    {
      id: 2,
      name: "Running Shoes",
      category: "Sports",
      price: 89.99,
      originalPrice: 120.00,
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop",
      badge: "Sale"
    },
    {
      id: 3,
      name: "Smart Watch",
      category: "Electronics",
      price: 199.99,
      originalPrice: null,
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop",
      badge: "New"
    },
    {
      id: 4,
      name: "Coffee Maker",
      category: "Home",
      price: 79.99,
      originalPrice: 99.99,
      rating: 4.6,
      image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop",
      badge: "Popular"
    },
    {
      id: 5,
      name: "Laptop Stand",
      category: "Accessories",
      price: 49.99,
      originalPrice: null,
      rating: 4.5,
      image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=300&fit=crop",
      badge: "Trending"
    },
    {
      id: 6,
      name: "Bluetooth Speaker",
      category: "Electronics",
      price: 59.99,
      originalPrice: 79.99,
      rating: 4.4,
      image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=300&fit=crop",
      badge: "Hot"
    }
  ];

  const ProductCard = ({ product }) => (
    <div className="product-card">
      <div className="product-image">
        <img src={product.image} alt={product.name} />
        <div className={`product-badge ${product.badge.toLowerCase().replace(' ', '-')}`}>
          {product.badge}
        </div>
        <div className="product-actions">
          <button className="btn btn-ghost btn-small">👁️</button>
          <button className="btn btn-primary btn-small">Add to Cart</button>
          <button className="btn btn-ghost btn-small">❤️</button>
        </div>
      </div>
      <div className="product-info">
        <div className="product-category">{product.category}</div>
        <h3 className="product-name">{product.name}</h3>
        <div className="product-rating">
          <span className="stars">⭐⭐⭐⭐⭐</span>
          <span className="rating-text">({product.rating})</span>
        </div>
        <div className="product-price">
          <span className="current-price">${product.price}</span>
          {product.originalPrice && (
            <span className="original-price">${product.originalPrice}</span>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-background">
          <div className="hero-pattern"></div>
        </div>
        <div className="container">
          <div className="hero-content">
            <div className="hero-badge">✨ New Collection Available ✨ </div>
            <h1 className="hero-title">
              Discover Amazing Products at 
              <span className="hero-highlight"> Unbeatable Prices</span>
            </h1>
            <p className="hero-description">
              Shop the latest trends in electronics, fashion, and home goods. 
              Free shipping on orders over $50 with our premium customer service.
            </p>
            <div className="hero-actions">
              <Link to="/products" className="btn btn-primary btn-large">
                <span>Shop Now</span>
                <span className="btn-icon">→</span>
              </Link>
              <Link to="/about" className="btn btn-secondary btn-large">
                Learn More
              </Link>
            </div>
            <div className="hero-stats">
              <div className="stat">
                <div className="stat-number">1m</div>
                <div className="stat-label">Happy Customers</div>
              </div>
              <div className="stat">
                <div className="stat-number">500+</div>
                <div className="stat-label">Products</div>
              </div>
              <div className="stat">
                <div className="stat-number">24/7</div>
                <div className="stat-label">Support</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Carousel */}
      <section className="featured-products">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Featured Products</h2>
            <p className="section-description">
              Handpicked items that our customers love
            </p>
          </div>
          
          <Carousel itemsPerView={3} autoPlay={true} interval={4000}>
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </Carousel>
          
          <div className="section-footer">
            <Link to="/products" className="btn btn-outline">
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="features">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Why Choose Us?</h2>
            <p className="section-description">
              We're committed to providing the best shopping experience
            </p>
          </div>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🚚</div>
              <h3 className="feature-title">Free Shipping</h3>
              <p className="feature-description">
                Free shipping on all orders over $50. Fast and reliable delivery to your doorstep.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔒</div>
              <h3 className="feature-title">Secure Payment</h3>
              <p className="feature-description">
                Your payment information is encrypted and secure. Shop with confidence.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">↩️</div>
              <h3 className="feature-title">Easy Returns</h3>
              <p className="feature-description">
                30-day return policy for all products. No questions asked.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💬</div>
              <h3 className="feature-title">24/7 Support</h3>
              <p className="feature-description">
                Our customer support team is available around the clock to help you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="newsletter">
        <div className="container">
          <div className="newsletter-content">
            <div className="newsletter-text">
              <h2>Stay Updated</h2>
              <p>Get the latest deals and product updates delivered to your inbox.</p>
            </div>
            <div className="newsletter-form">
              <input 
                type="email" 
                placeholder="Enter your email address"
                className="newsletter-input"
              />
              <button className="btn btn-primary">Subscribe</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
