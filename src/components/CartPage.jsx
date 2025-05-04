import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CartContext } from '../context/AppContext'; // Fixed import path

// Rest of the component stays the same

const CartPage = () => {
  const { cart, removeFromCart, updateCartItemQuantity } = useContext(CartContext);
  
  const calculateSubtotal = () => {
    return cart.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0);
  };
  
  const calculateTax = () => {
    return calculateSubtotal() * 0.18; // 18% tax
  };
  
  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax() + 99; // 99 is shipping cost
  };

  if (cart.length === 0) {
    return (
      <motion.div 
        className="cart-page empty-cart"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="empty-cart-container">
          <i className="fas fa-shopping-cart empty-cart-icon"></i>
          <h2>Your Cart is Empty</h2>
          <p>Looks like you haven't added any items to your cart yet.</p>
          <Link to="/products" className="shop-now-button">Shop Now</Link>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="cart-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h1>Your Shopping Cart</h1>
      
      <div className="cart-container">
        <div className="cart-items">
          {cart.map((item) => (
            <div className="cart-item" key={item.id}>
              <img src={item.imgSrc} alt={item.title} className="item-image" />
              
              <div className="item-details">
                <h3>{item.title}</h3>
                <p className="item-price">Rs.{item.price.toFixed(2)}</p>
                <p className="item-color">Color: {item.color}</p>
                {item.size && <p className="item-size">Size: {item.size}</p>}
                
                <div className="item-quantity">
                  <button 
                    onClick={() => updateCartItemQuantity(item.id, (item.quantity || 1) - 1)}
                    className="quantity-btn"
                  >
                    -
                  </button>
                  <span>{item.quantity || 1}</span>
                  <button 
                    onClick={() => updateCartItemQuantity(item.id, (item.quantity || 1) + 1)}
                    className="quantity-btn"
                  >
                    +
                  </button>
                </div>
                
                <button 
                  onClick={() => removeFromCart(item.id)}
                  className="remove-btn"
                >
                  Remove
                </button>
              </div>
              
              <div className="item-total">
                Rs.{((item.quantity || 1) * item.price).toFixed(2)}
              </div>
            </div>
          ))}
        </div>
        
        <div className="cart-summary">
          <h3>Order Summary</h3>
          
          <div className="summary-row">
            <span>Subtotal</span>
            <span>Rs.{calculateSubtotal().toFixed(2)}</span>
          </div>
          
          <div className="summary-row">
            <span>Tax (18%)</span>
            <span>Rs.{calculateTax().toFixed(2)}</span>
          </div>
          
          <div className="summary-row">
            <span>Shipping</span>
            <span>Rs.99.00</span>
          </div>
          
          <div className="summary-row total">
            <span>Total</span>
            <span>Rs.{calculateTotal().toFixed(2)}</span>
          </div>
          
          <button className="checkout-btn">Proceed to Checkout</button>
          
          <Link to="/products" className="continue-shopping">
            Continue Shopping
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default CartPage;
