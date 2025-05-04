import React, { useState, useContext, useEffect } from "react";
import { motion } from "framer-motion";
import ReCAPTCHA from "react-google-recaptcha";
import { UserContext } from '../context/AppContext';

function Login(props) {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [captchaValue, setCaptchaValue] = useState(null);
  const [captchaError, setCaptchaError] = useState(false);
  const { setCurrentUser } = useContext(UserContext);

  // Reset error when form values change
  useEffect(() => {
    if (error) setError("");
    if (captchaError) setCaptchaError(false);
  }, [formData, captchaValue]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleCaptchaChange = (value) => {
    setCaptchaValue(value);
    setCaptchaError(false);
  };

  const handleCaptchaExpired = () => {
    setCaptchaValue(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setCaptchaError(false);
    
    // Basic validation
    if (!formData.email || !formData.password) {
      setError("Please fill in all fields");
      return;
    }
    
    // Verify CAPTCHA
    if (!captchaValue) {
      setCaptchaError(true);
      setError("Please complete the CAPTCHA verification");
      return;
    }
    
    try {
      setIsLoading(true);
      
      // In a real app, you would send the captchaValue to your backend
      // for verification along with the login credentials
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock login functionality 
      const mockUser = {
        id: "user1",
        email: formData.email,
        username: formData.email.split("@")[0]
      };
      
      setCurrentUser(mockUser);
      
      // Show success toast
      const notification = document.createElement('div');
      notification.className = 'toast-notification success';
      notification.textContent = 'Login successful!';
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
      
      props.onClose();
    } catch (error) {
      setError("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div 
      className="loginPage"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
    >
      <div>
        <h2 className="loginHeading">Login</h2>
        {error && (
          <motion.p 
            className="error-message"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {error}
          </motion.p>
        )}
        <form className="loginForm" onSubmit={handleSubmit}>
          <div>
            <label>Email</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email" 
              required 
              disabled={isLoading}
            />
          </div>
          <div>
            <label>Password</label>
            <input 
              type="password" 
              id="password" 
              name="password" 
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password" 
              required 
              disabled={isLoading}
            />
          </div>
          
          <div className="captcha-container">
            <ReCAPTCHA
              sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI" // This is Google's test key - replace with your real key
              onChange={handleCaptchaChange}
              onExpired={handleCaptchaExpired}
              className={captchaError ? "captcha-error" : ""}
              theme="light"
            />
          </div>
          
          <div>
            <motion.button 
              className="loginButton" 
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isLoading ? (
                <span className="spinner-container">
                  <span className="spinner"></span>
                  <span>Logging in...</span>
                </span>
              ) : "Login"}
            </motion.button>
          </div>
        </form>
        <p className="exception">
          Don't have a registered account?{" "}
          <motion.button 
            onClick={props.onRegister}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={isLoading}
          >
            Register here
          </motion.button>
        </p>
        <motion.button 
          className="closeButton" 
          onClick={props.onClose}
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          disabled={isLoading}
        >
          &times;
        </motion.button>
      </div>
    </motion.div>
  );
}

export default Login;