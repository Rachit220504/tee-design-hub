import React, { useState } from "react";
import { motion } from "framer-motion";
import ProductDetails from "./Proddetails";
import Card from "./Card";

// Gallery Component to Display Multiple Cards
function Gallery() {
    const [selectedProduct, setSelectedProduct] = useState(null);
  
    // Array of Products (adding unique IDs and extended product list)
    const products = [
      {
        id: "prod_1",
        imgSrc: "/assets/img1.png",
        title: "Classic White Tee",
        price: 299.99,
        size: "Medium",
        color: "White",
        description: "Our most popular classic white t-shirt made from 100% organic cotton. Perfect for everyday wear and highly comfortable.",
      },
      {
        id: "prod_2",
        imgSrc: "/assets/img2.png",
        title: "Urban Black Tee",
        price: 499.99,
        size: "Large",
        color: "Black",
        description: "Stylish black t-shirt with a modern fit. Made from premium quality fabric that maintains its color and shape wash after wash.",
      },
      {
        id: "prod_3",
        imgSrc: "/assets/img3.png",
        title: "Casual Blue Tee",
        price: 399.99,
        size: "Small",
        color: "Blue",
        description: "Comfortable blue t-shirt perfect for casual outings. Features a relaxed fit and soft fabric for all-day comfort.",
      },
      {
        id: "prod_4",
        imgSrc: "/assets/img4.png",
        title: "Premium Grey Tee",
        price: 599.99,
        size: "Extra Large",
        color: "Grey",
        description: "Premium quality grey t-shirt with exceptional durability. Made from a blend of cotton and polyester for the perfect balance of comfort and longevity.",
      },
      {
        id: "prod_5",
        imgSrc: "/assets/img1.png",
        title: "Red Graphic Tee",
        price: 349.99,
        size: "Medium",
        color: "Red",
        description: "Eye-catching red t-shirt with a subtle graphic design. Perfect for making a statement while maintaining a clean look.",
      },
      {
        id: "prod_6",
        imgSrc: "/assets/img2.png",
        title: "Navy Blue Tee",
        price: 450.00,
        size: "Large",
        color: "Navy Blue",
        description: "Classic navy blue t-shirt that goes with almost anything. A wardrobe essential crafted for comfort and style.",
      },
      {
        id: "prod_7",
        imgSrc: "/assets/img3.png",
        title: "Green Eco Tee",
        price: 399.99,
        size: "Medium",
        color: "Green",
        description: "Environmentally friendly t-shirt made from sustainable materials. Look good while doing good for the planet.",
      },
      {
        id: "prod_8",
        imgSrc: "/assets/img4.png",
        title: "Yellow Summer Tee",
        price: 299.99,
        size: "Small",
        color: "Yellow",
        description: "Bright and cheerful yellow t-shirt perfect for summer days. Lightweight fabric keeps you cool when temperatures rise.",
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
  
    return (
      <div className="gallery-container">
        <motion.div 
          className="gallery"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {products.map((product, index) => (
            <Card
              key={product.id}
              product={product}
              onClick={() => setSelectedProduct(product)}
            />
          ))}
        </motion.div>
  
        {/* Render Product Details if a product is selected */}
        {selectedProduct && (
          <ProductDetails
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
          />
        )}
      </div>
    );
}
  
export default Gallery;
