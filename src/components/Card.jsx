import React from "react";
import { motion } from "framer-motion";

function Card({ product, onClick }) {
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300 } }
  };
  
  return (
    <motion.div 
      className="card" 
      onClick={onClick}
      variants={item}
      whileHover={{ 
        y: -15,
        boxShadow: "0 20px 40px rgba(0, 0, 0, 0.2)"
      }}
    >
      <div className="card-image-container">
        <img 
          src={product.imgSrc} 
          alt={product.title} 
          className="card-image"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/assets/placeholder.md"; // Fallback image
          }}
        />
      </div>
      <div className="card-content">
        <h3 className="card-title">{product.title}</h3>
        <p className="card-price">Rs.{product.price}</p>
        <motion.button 
          className="card-button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          View Details
        </motion.button>
      </div>
    </motion.div>
  );
}

export default Card;