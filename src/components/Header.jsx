import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { UserContext, CartContext } from "../context/AppContext";

function Header({ onShowLogin }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();
  
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setShowAccountMenu(false);
    navigate("/");
  };

  return (
    <header className="navbar">
      <Link to="/" className="logo">Tee Design Hub</Link>
      <button className="menu-toggler" onClick={toggleMenu}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="white"
          viewBox="0 0 16 16"
        >
          <path d="M0 2h16v2H0V2zm0 6h16v2H0V8zm0 6h16v2H0v-2z" />
        </svg>
      </button>
      <nav className={`menu ${menuOpen ? "open" : ""}`}>
        <ul>
          <li className="headerOptions">
            <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
          </li>
          <li className="headerOptions">
            <Link to="/about" onClick={() => setMenuOpen(false)}>About</Link>
          </li>
          <li className="headerOptions">
            <Link to="/products" onClick={() => setMenuOpen(false)}>Products</Link>
          </li>
          <li className="headerOptions">
            <Link to="/customize" onClick={() => setMenuOpen(false)}>Customize</Link>
          </li>
          <li className="headerOptions">
            <Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
          </li>
          <li className="headerOptions cart-icon">
            <Link to="/cart" onClick={() => setMenuOpen(false)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                className="bi bi-cart"
                viewBox="0 0 16 16"
              >
                <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4" />
              </svg>
              {cart && cart.length > 0 && <span className="cart-count">{cart.length}</span>}
            </Link>
          </li>
          <li
            className="account"
            onClick={() => setShowAccountMenu(!showAccountMenu)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              className="bi bi-person-circle"
              viewBox="0 0 16 16"
            >
              <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
              <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
            </svg>
            
            <AnimatePresence>
              {showAccountMenu && (
                <motion.div
                  className="account-menu"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {currentUser ? (
                    <>
                      <div className="account-menu-item">
                        <Link to="/orders" onClick={() => setShowAccountMenu(false)}>Orders</Link>
                      </div>
                      <div className="account-menu-item">
                        <button onClick={handleLogout}>Logout</button>
                      </div>
                    </>
                  ) : (
                    <div className="account-menu-item">
                      <button onClick={() => {onShowLogin(); setShowAccountMenu(false);}}>Login</button>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;