import React, { useContext, useEffect } from "react";
import { motion } from "framer-motion";
import { CartContext } from "../context/AppContext";

function ProductDetails({ product, onClose }) {
  const { addToCart } = useContext(CartContext);

  // Use effect to disable scrolling on body when modal is open
  useEffect(() => {
    // Store the original scroll position
    const scrollY = window.scrollY;
    
    // Add class to prevent scrolling
    document.body.classList.add('modal-open');
    document.body.style.top = `-${scrollY}px`;
    
    // Handle ESC key to close modal
    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    
    window.addEventListener('keydown', handleEsc);
    
    // Cleanup function when component unmounts
    return () => {
      // Remove the class that prevents scrolling
      document.body.classList.remove('modal-open');
      
      // Restore the scroll position
      document.body.style.top = '';
      window.scrollTo(0, scrollY);
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  // Add a safety check to prevent the error
  if (!product) {
    return null; // Don't render anything if product is undefined
  }

  const handleAddToCart = () => {
    addToCart(product);
    
    // Show a toast notification
    const notification = document.createElement('div');
    notification.className = 'toast-notification success';
    notification.textContent = 'Product added to cart!';
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.classList.add('show');
      setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
          document.body.removeChild(notification);
        }, 300);
      }, 2000);
    }, 100);
  };

  return (
    <motion.div 
      className="product-details-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={(e) => {
        if (e.target.classList.contains('product-details-overlay')) {
          onClose();
        }
      }}
    >
      <motion.div 
        className="product-details"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", damping: 25 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="Prod_title">
          <h2 className="product-title">{product.title}</h2>
          <button className="close-button" onClick={onClose}>
            &times;
          </button>
        </div>
      
        <motion.img 
          className="product-image" 
          src={product.imgSrc} 
          alt={product.title}
          whileHover={{ scale: 1.05 }}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/assets/placeholder.png";
          }}
        />
        
        <div className="product-info">
          <p className="product-price">Rs. {product.price}</p>
          
          {product.size && (
            <p className="product-size">
              <strong>Size:</strong> {product.size}
            </p>
          )}
          
          {product.color && (
            <p className="product-color">
              <strong>Color:</strong> {product.color}
            </p>
          )}
          
          <p className="product-description">
            {product.description || "This premium t-shirt features a unique design, made with high-quality fabric for comfort and durability. Perfect for casual wear or as a gift for someone special."}
          </p>
        </div>
        
        <div className="product-buttons">
          <motion.button 
            className="add-to-cart-button"
            onClick={handleAddToCart}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Add to Cart
          </motion.button>
          
          <motion.button 
            className="buy-now-button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Buy Now
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default ProductDetails;