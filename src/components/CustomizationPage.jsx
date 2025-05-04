import React, { useState, useRef, useContext } from 'react';
import { motion } from 'framer-motion';
import { CartContext } from '../context/AppContext'; // Fixed import path

// Rest of the component stays the same

const CustomizationPage = () => {
  const { addToCart } = useContext(CartContext);
  const [tshirtColor, setTshirtColor] = useState('#ffffff');
  const [selectedText, setSelectedText] = useState('');
  const [textColor, setTextColor] = useState('#000000');
  const [fontSize, setFontSize] = useState(24);
  const [textPosition, setTextPosition] = useState({ x: 150, y: 150 });
  const [isDragging, setIsDragging] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const canvasRef = useRef(null);
  
  const colors = ['#ffffff', '#000000', '#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff', '#808080'];

  const handleTextChange = (e) => {
    setSelectedText(e.target.value);
  };

  const handleFontSizeChange = (e) => {
    setFontSize(parseInt(e.target.value));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddToCart = () => {
    // Create a custom product
    const customProduct = {
      id: `custom-${Date.now()}`,
      title: 'Custom T-Shirt Design',
      price: 599.99,
      imgSrc: '/assets/img1.png', // Placeholder image
      size: 'Medium',
      color: tshirtColor,
      description: `Custom design with text: "${selectedText}"`,
      isCustom: true
    };
    
    // Add to cart
    addToCart(customProduct);
    
    // Show success message
    alert('Design added to cart!');
  };

  return (
    <motion.div 
      className="customization-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1>Create Your Custom Design</h1>
      
      <div className="customization-container">
        <div className="design-options">
          <div className="option-group">
            <h3>T-Shirt Color</h3>
            <div className="color-picker">
              {colors.map((color) => (
                <div 
                  key={color} 
                  className={`color-option ${color === tshirtColor ? 'selected' : ''}`}
                  style={{ backgroundColor: color }}
                  onClick={() => setTshirtColor(color)}
                ></div>
              ))}
            </div>
          </div>
          
          <div className="option-group">
            <h3>Add Text</h3>
            <input 
              type="text" 
              value={selectedText} 
              onChange={handleTextChange} 
              placeholder="Enter your text"
              className="text-input"
            />
            
            <div className="text-controls">
              <div className="control-group">
                <label>Text Color:</label>
                <input 
                  type="color" 
                  value={textColor} 
                  onChange={(e) => setTextColor(e.target.value)}
                  className="color-input"
                />
              </div>
              
              <div className="control-group">
                <label>Font Size:</label>
                <input 
                  type="range" 
                  min="12" 
                  max="48" 
                  value={fontSize} 
                  onChange={handleFontSizeChange}
                  className="range-input"
                />
                <span>{fontSize}px</span>
              </div>
            </div>
          </div>
          
          <div className="option-group">
            <h3>Upload Image</h3>
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleImageUpload}
              className="file-input"
            />
          </div>
          
          <button className="add-to-cart-button" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
        
        <div className="design-preview">
          <div 
            className="tshirt-canvas" 
            style={{ backgroundColor: tshirtColor }}
            ref={canvasRef}
          >
            {imagePreview && (
              <img 
                src={imagePreview} 
                alt="Uploaded design" 
                className="uploaded-image"
              />
            )}
            {selectedText && (
              <div
                className="preview-text"
                style={{
                  color: textColor,
                  fontSize: `${fontSize}px`,
                }}
              >
                {selectedText}
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CustomizationPage;
