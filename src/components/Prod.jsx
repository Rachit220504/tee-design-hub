import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ProductDetails from "./Proddetails";

function Prod() {
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Featured Products for homepage display
  const featuredProducts = [
    {
      id: "prod_1",
      imgSrc: "/assets/img1.png",
      title: "Classic White Tee",
      price: 299.99,
      size: "Medium",
      color: "White",
      description: "Our most popular classic white t-shirt made from 100% organic cotton.",
    },
    {
      id: "prod_2",
      imgSrc: "/assets/img2.png",
      title: "Urban Black Tee",
      price: 499.99,
      size: "Large",
      color: "Black",
      description: "Stylish black t-shirt with a modern fit and premium quality fabric.",
    },
    {
      id: "prod_3",
      imgSrc: "/assets/img3.png",
      title: "Casual Blue Tee",
      price: 399.99,
      size: "Small",
      color: "Blue",
      description: "Comfortable blue t-shirt perfect for casual outings.",
    },
    {
      id: "prod_4",
      imgSrc: "/assets/img1.png",
      title: "Classic White Tee",
      price: 299.99,
      size: "Medium",
      color: "White",
      description: "Our most popular classic white t-shirt made from 100% organic cotton.",
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300 } }
  };

  return (
    <>
      <motion.div 
        className="gallery"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {featuredProducts.map((product) => (
          <motion.div 
            className="card" 
            key={product.id}
            onClick={() => setSelectedProduct(product)}
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
                  e.target.src = "/assets/placeholder.png";
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
        ))}
      </motion.div>

      {/* Only render ProductDetails if a product is selected */}
      {selectedProduct && (
        <ProductDetails
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </>
  );
}

export default Prod;