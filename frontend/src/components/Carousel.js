import React, { useState, useEffect, useRef } from 'react';
import './Carousel.css';

const Carousel = ({ children, itemsPerView = 3, autoPlay = true, interval = 5000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const timerRef = useRef(null);

  const totalItems = React.Children.count(children);
  const maxIndex = Math.max(0, totalItems - itemsPerView);

  const nextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex(prev => (prev >= maxIndex ? 0 : prev + 1));
    setTimeout(() => setIsTransitioning(false), 300);
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex(prev => (prev <= 0 ? maxIndex : prev - 1));
    setTimeout(() => setIsTransitioning(false), 300);
  };

  const goToSlide = (index) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
    setTimeout(() => setIsTransitioning(false), 300);
  };

  const startAutoPlay = () => {
    if (!autoPlay || totalItems <= itemsPerView) return;
    
    // Clear any existing timer
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    timerRef.current = setInterval(nextSlide, interval);
  };

  const stopAutoPlay = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  // Auto-play functionality
  useEffect(() => {
    startAutoPlay();
    
    // Cleanup on unmount
    return () => {
      stopAutoPlay();
    };
  }, [currentIndex, autoPlay, interval, totalItems, itemsPerView]);

  // Pause auto-play on hover
  const handleMouseEnter = () => {
    stopAutoPlay();
  };

  const handleMouseLeave = () => {
    startAutoPlay();
  };

  return (
    <div 
      className="carousel-container"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="carousel-wrapper">
        <div 
          className="carousel-track"
          style={{
            transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
            transition: isTransitioning ? 'transform 0.3s ease-in-out' : 'none'
          }}
        >
          {React.Children.map(children, (child, index) => (
            <div 
              key={index} 
              className="carousel-item"
              style={{ width: `${100 / itemsPerView}%` }}
            >
              {child}
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      {totalItems > itemsPerView && (
        <>
          <button 
            className="carousel-nav carousel-nav-prev"
            onClick={prevSlide}
            disabled={isTransitioning}
            aria-label="Previous products"
          >
            <span>‹</span>
          </button>
          <button 
            className="carousel-nav carousel-nav-next"
            onClick={nextSlide}
            disabled={isTransitioning}
            aria-label="Next products"
          >
            <span>›</span>
          </button>
        </>
      )}

      {/* Dots Indicator */}
      {totalItems > itemsPerView && (
        <div className="carousel-dots">
          {Array.from({ length: maxIndex + 1 }, (_, index) => (
            <button
              key={index}
              className={`carousel-dot ${currentIndex === index ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Carousel;
