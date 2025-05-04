import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Prod from "./Prod";

function HomePage({ onGetStarted }) {
  const [scrollProgress, setScrollProgress] = useState(0);

  // Track scroll progress for background transition effect
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.body.scrollHeight - window.innerHeight;
      const progress = window.scrollY / totalHeight;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Calculate background gradient based on scroll position
  const backgroundGradient = `linear-gradient(
    rgba(0, 0, 0, ${scrollProgress * 0.9}), 
    rgba(0, 0, 0, ${scrollProgress * 0.9})
  ), url('/assets/BackgroundMain.png')`;

  return (
    <>
      {/* Hero Section with dynamic background */}
      <motion.section 
        className="hero-section first-page"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        style={{ 
          backgroundImage: backgroundGradient,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="text-content">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Design <br /> Your <br /> Dream T-Shirts
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Choose from stylish presets or create your own by uploading designs,
            adding text, or graphics.
          </motion.p>
          <motion.button 
            className="get-started" 
            onClick={onGetStarted}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get Started
          </motion.button>
        </div>
      </motion.section>

      {/* Products Section */}
      <section className="products-section" id="products-section">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Our Products
        </motion.h2>
        <div className="products">
          <Prod />
        </div>
        <motion.div 
          className="view-all-container"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Link to="/products" className="view-all-button">
            View All Products
          </Link>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Why Choose Tee Design Hub?
        </motion.h2>
        <div className="features-container">
          <motion.div 
            className="feature"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            whileHover={{ y: -10 }}
          >
            <div className="feature-icon">
              <i className="fas fa-tshirt"></i>
            </div>
            <h3>Quality Materials</h3>
            <p>Premium fabrics for comfort and durability</p>
          </motion.div>
          <motion.div 
            className="feature"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ y: -10 }}
          >
            <div className="feature-icon">
              <i className="fas fa-paint-brush"></i>
            </div>
            <h3>Custom Designs</h3>
            <p>Create your own unique style</p>
          </motion.div>
          <motion.div 
            className="feature"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            whileHover={{ y: -10 }}
          >
            <div className="feature-icon">
              <i className="fas fa-truck"></i>
            </div>
            <h3>Fast Delivery</h3>
            <p>Quick shipping to your doorstep</p>
          </motion.div>
        </div>
      </section>

      {/* Customization Section */}
      <section className="customizeOrder">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Create Your Own Design
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Unleash your creativity with our easy-to-use customization tool
        </motion.p>
        <motion.div 
          className="custom-cta"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Link to="/customize" className="customize-button">
            Start Designing Now
          </Link>
        </motion.div>
      </section>
    </>
  );
}

export default HomePage;