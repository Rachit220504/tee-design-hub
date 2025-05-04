const { sequelize } = require('../config/db');
const User = require('./user');
const Product = require('./product');
const Category = require('./category');
const Order = require('./order');
const OrderItem = require('./orderItem');
const CartItem = require('./cartItem');
const Review = require('./review');

// Define associations
User.hasMany(Order);
Order.belongsTo(User);

User.hasMany(CartItem);
CartItem.belongsTo(User);

User.hasMany(Review);
Review.belongsTo(User);

Product.hasMany(CartItem);
CartItem.belongsTo(Product);

Product.hasMany(OrderItem);
OrderItem.belongsTo(Product);

Product.hasMany(Review);
Review.belongsTo(Product);

Product.belongsTo(Category);
Category.hasMany(Product);

Order.hasMany(OrderItem);
OrderItem.belongsTo(Order);

// Export models
module.exports = {
  sequelize,
  User,
  Product,
  Category,
  Order,
  OrderItem,
  CartItem,
  Review
};
