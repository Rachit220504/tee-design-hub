import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { UserContext } from "../context/AppContext";

function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    // Simulate fetching orders from API
    setLoading(true);
    setTimeout(() => {
      // Mock orders data - in a real app, this would be from your API
      const mockOrders = currentUser ? [
        {
          id: "ord-001",
          orderNumber: "TDH-230501-7632",
          date: "2023-05-01",
          total: 1299.97,
          status: "delivered",
          items: [
            { id: "item1", title: "Classic White Tee", quantity: 2, price: 299.99 },
            { id: "item2", title: "Urban Black Tee", quantity: 1, price: 699.99 }
          ]
        },
        {
          id: "ord-002",
          orderNumber: "TDH-230612-3816",
          date: "2023-06-12",
          total: 399.99,
          status: "processing",
          items: [
            { id: "item3", title: "Casual Blue Tee", quantity: 1, price: 399.99 }
          ]
        }
      ] : [];
      setOrders(mockOrders);
      setLoading(false);
    }, 1500);
  }, [currentUser]);

  const getStatusClass = (status) => {
    switch(status) {
      case "delivered": return "status-delivered";
      case "processing": return "status-processing";
      case "shipped": return "status-shipped";
      case "cancelled": return "status-cancelled";
      default: return "status-pending";
    }
  };

  if (loading) {
    return (
      <div className="orders-page loading">
        <div className="loader-spinner"></div>
        <p>Loading your orders...</p>
      </div>
    );
  }

  return (
    <motion.div 
      className="orders-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h1>My Orders</h1>
      
      {orders.length === 0 ? (
        <div className="empty-orders">
          <i className="fas fa-box-open"></i>
          <h2>No Orders Yet</h2>
          <p>You haven't placed any orders yet. Start shopping to see your orders here!</p>
          <Link to="/products" className="shop-now-button">Shop Now</Link>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map(order => (
            <div className="order-card" key={order.id}>
              <div className="order-header">
                <div>
                  <h3>Order #{order.orderNumber}</h3>
                  <p className="order-date">Placed on {new Date(order.date).toLocaleDateString()}</p>
                </div>
                <div className={`order-status ${getStatusClass(order.status)}`}>
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </div>
              </div>
              
              <div className="order-items">
                {order.items.map(item => (
                  <div className="order-item" key={item.id}>
                    <p className="item-title">{item.title}</p>
                    <p className="item-quantity">Qty: {item.quantity}</p>
                    <p className="item-price">Rs. {item.price.toFixed(2)}</p>
                  </div>
                ))}
              </div>
              
              <div className="order-footer">
                <p className="order-total">Total: Rs. {order.total.toFixed(2)}</p>
                <button className="view-details-btn">View Details</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}

export default OrdersPage;