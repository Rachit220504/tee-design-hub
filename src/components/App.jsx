import React, { useState, useEffect, Suspense, lazy } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import NProgress from "nprogress";
import "nprogress/nprogress.css"; // Import NProgress styles
import { UserContext, CartContext, ThemeContext } from "../context/AppContext";
import Header from "./Header";
import Footer from './Footer';
import Loader from "./Loader";
import Register from "./Register";
import Login from "./Login";

// Lazy load components for better performance
const HomePage = lazy(() => import("./HomePage"));
const Gallery = lazy(() => import("./Gallery"));
const CustomizationPage = lazy(() => import("./CustomizationPage"));
const CartPage = lazy(() => import("./CartPage"));
const AboutPage = lazy(() => import("./AboutPage"));
const ContactPage = lazy(() => import("./ContactPage"));
const OrdersPage = lazy(() => import("./OrdersPage"));

export default function App() {
  const location = useLocation();
  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem('currentUser');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme || 'light';
  });
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Configure NProgress
  useEffect(() => {
    NProgress.configure({ 
      showSpinner: false,
      minimum: 0.1,
      easing: 'ease',
      speed: 500,
      trickleSpeed: 200,
      barColor: '#fca311',
      parent: 'body'
    });
  }, []);
  
  // Show progress bar on route change
  useEffect(() => {
    NProgress.start();
    setIsLoading(true);
    
    const timer = setTimeout(() => {
      NProgress.done();
      setIsLoading(false);
    }, 500);
    
    return () => {
      clearTimeout(timer);
      NProgress.done();
      setIsLoading(false);
    };
  }, [location]);
  
  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Save user to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
  }, [currentUser]);

  // Save theme to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  // Reset modal state when route changes
  useEffect(() => {
    closeRegisterOrLogin();
  }, [location.pathname]);

  const handleGetStarted = () => {
    setShowRegister(true);
    setShowLogin(false);
    document.body.classList.add("body-blurred");
  };

  const handleShowLogin = () => {
    setShowLogin(true);
    setShowRegister(false);
    document.body.classList.add("body-blurred");
  };

  const handleShowRegister = () => {
    setShowLogin(false);
    setShowRegister(true);
    document.body.classList.add("body-blurred");
  };

  const closeRegisterOrLogin = () => {
    setShowRegister(false);
    setShowLogin(false);
    document.body.classList.remove("body-blurred");
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const addToCart = (product, quantity = 1, customizations = {}) => {
    setIsLoading(true);
    
    // Simulate network delay for adding to cart
    setTimeout(() => {
      const productInCart = cart.find(item => 
        item.id === product.id && 
        JSON.stringify(item.customizations || {}) === JSON.stringify(customizations || {})
      );
      
      if (productInCart) {
        setCart(cart.map(item => 
          item.id === product.id && 
          JSON.stringify(item.customizations || {}) === JSON.stringify(customizations || {})
            ? { ...item, quantity: (item.quantity || 1) + quantity }
            : item
        ));
      } else {
        setCart([...cart, { ...product, quantity, customizations }]);
      }
      
      // Show toast notification
      const notification = document.createElement('div');
      notification.className = 'toast-notification success';
      notification.textContent = `${product.title} added to cart!`;
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
      
      setIsLoading(false);
    }, 600);
  };

  const removeFromCart = (productId, customizations = {}) => {
    setIsLoading(true);
    
    // Simulate network delay for removing from cart
    setTimeout(() => {
      setCart(cart.filter(item => {
        // If customizations are provided, only remove the specific customized item
        if (Object.keys(customizations).length > 0) {
          return !(item.id === productId && 
            JSON.stringify(item.customizations || {}) === JSON.stringify(customizations));
        }
        // Otherwise remove by product ID
        return item.id !== productId;
      }));
      
      setIsLoading(false);
    }, 300);
  };

  const updateCartItemQuantity = (productId, quantity, customizations = {}) => {
    setIsLoading(true);
    
    // Simulate network delay for updating cart
    setTimeout(() => {
      if (quantity <= 0) {
        removeFromCart(productId, customizations);
        return;
      }
      
      setCart(cart.map(item => {
        // Match both product ID and customizations if provided
        if (item.id === productId) {
          if (Object.keys(customizations).length > 0) {
            if (JSON.stringify(item.customizations || {}) === JSON.stringify(customizations)) {
              return { ...item, quantity: quantity };
            }
          } else {
            return { ...item, quantity: quantity };
          }
        }
        return item;
      }));
      
      setIsLoading(false);
    }, 300);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <UserContext.Provider value={{ currentUser, setCurrentUser }}>
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateCartItemQuantity }}>
          <div className={`app ${theme}`}>
            <Header onShowLogin={handleShowLogin} />
            
            <main>
              <Suspense fallback={<Loader />}>
                <AnimatePresence mode="wait">
                  <Routes location={location} key={location.pathname}>
                    <Route path="/" element={<HomePage onGetStarted={handleGetStarted} />} />
                    <Route path="/products" element={<Gallery />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="/customize" element={<CustomizationPage />} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/orders" element={<OrdersPage />} />
                  </Routes>
                </AnimatePresence>
              </Suspense>
            </main>

            <Footer />

            {/* Loading Overlay */}
            {isLoading && (
              <div className="loading-overlay">
                <div className="loader-spinner"></div>
              </div>
            )}

            <AnimatePresence>
              {(showRegister || showLogin) && (
                <div className="overlay">
                  {showRegister && <Register onClose={closeRegisterOrLogin} onLogin={handleShowLogin}/>}
                  {showLogin && <Login onClose={closeRegisterOrLogin} onRegister={handleShowRegister}/>}
                </div>
              )}
            </AnimatePresence>
          </div>
        </CartContext.Provider>
      </UserContext.Provider>
    </ThemeContext.Provider>
  );
}