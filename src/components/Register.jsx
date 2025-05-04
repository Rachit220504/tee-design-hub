import React, { useState, useContext, useEffect } from "react";
import { motion } from "framer-motion";
import ReCAPTCHA from "react-google-recaptcha";
import { UserContext } from '../context/AppContext';

function Register(props) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
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
    
    // Form validation
    if (!formData.username || !formData.email || !formData.password || !formData.confirmPassword) {
      setError("Please fill in all fields");
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    
    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address");
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
      // for verification along with the registration data
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock registration (would connect to backend in real app)
      const newUser = {
        id: `user-${Date.now()}`,
        username: formData.username,
        email: formData.email
      };
      
      // Set user in context and close modal
      setCurrentUser(newUser);
      
      // Show success toast
      const notification = document.createElement('div');
      notification.className = 'toast-notification success';
      notification.textContent = 'Registration successful!';
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
      setError("Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div 
      className="registerPage"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
    >
      <div>
        <h2 className="registerHeading">Register</h2>
        {error && (
          <motion.p 
            className="error-message"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {error}
          </motion.p>
        )}
        <form className="registerForm" onSubmit={handleSubmit}>
          <div>
            <label>Username</label>
            <input 
              type="text" 
              id="username" 
              name="username" 
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your username" 
              required 
              disabled={isLoading}
            />
          </div>
          <div>
            <label>Email</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email" 
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
          <div>
            <label>Confirm Password</label>
            <input 
              type="password" 
              id="confirmPassword" 
              name="confirmPassword" 
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password" 
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
              className="registerButton" 
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isLoading ? (
                <span className="spinner-container">
                  <span className="spinner"></span>
                  <span>Creating Account...</span>
                </span>
              ) : "Register"}
            </motion.button>
          </div>
        </form>
        <p className="exception">
          Already have an account?{" "}
          <motion.button 
            onClick={props.onLogin}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={isLoading}
          >
            Login here
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

export default Register;