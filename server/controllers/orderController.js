const { Order, OrderItem, CartItem, Product } = require('../models');
const { sequelize } = require('../config/db');

// Get user's orders
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      where: { UserId: req.user.id },
      include: [
        {
          model: OrderItem,
          include: [Product]
        }
      ],
      order: [['createdAt', 'DESC']]
    });

    res.status(200).json({
      success: true,
      count: orders.length,
      data: orders
    });
  } catch (error) {
    console.error('Get orders error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// Get single order
exports.getOrder = async (req, res) => {
  try {
    const order = await Order.findOne({
      where: {
        id: req.params.id,
        UserId: req.user.id
      },
      include: [
        {
          model: OrderItem,
          include: [Product]
        }
      ]
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    res.status(200).json({
      success: true,
      data: order
    });
  } catch (error) {
    console.error('Get order error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// Create new order from cart
exports.createOrder = async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    const { shippingAddress, paymentMethod } = req.body;

    // Check if cart is empty
    const cartItems = await CartItem.findAll({
      where: { UserId: req.user.id },
      include: [Product],
      transaction
    });

    if (cartItems.length === 0) {
      await transaction.rollback();
      return res.status(400).json({
        success: false,
        message: 'Cart is empty'
      });
    }

    // Calculate total amount
    const totalAmount = cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    // Create order
    const order = await Order.create(
      {
        UserId: req.user.id,
        totalAmount,
        shippingAddress,
        paymentMethod,
        status: 'pending',
        paymentStatus: 'pending'
      },
      { transaction }
    );

    // Create order items
    const orderItems = await Promise.all(
      cartItems.map(async (item) => {
        return OrderItem.create(
          {
            OrderId: order.id,
            ProductId: item.ProductId,
            quantity: item.quantity,
            price: item.price
          },
          { transaction }
        );
      })
    );

    // Clear cart
    await CartItem.destroy({
      where: { UserId: req.user.id },
      transaction
    });

    await transaction.commit();

    res.status(201).json({
      success: true,
      data: {
        order,
        orderItems
      }
    });
  } catch (error) {
    await transaction.rollback();
    console.error('Create order error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// Update order status (admin only)
exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    // Find order
    const order = await Order.findByPk(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    // Update status
    order.status = status;
    await order.save();

    res.status(200).json({
      success: true,
      data: order
    });
  } catch (error) {
    console.error('Update order status error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// Cancel order
exports.cancelOrder = async (req, res) => {
  try {
    // Find order
    const order = await Order.findOne({
      where: {
        id: req.params.id,
        ...(req.user.role !== 'admin' && { UserId: req.user.id })
      }
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    // Check if order can be cancelled
    if (order.status !== 'pending' && order.status !== 'processing') {
      return res.status(400).json({
        success: false,
        message: 'Order cannot be cancelled'
      });
    }

    // Update status
    order.status = 'cancelled';
    await order.save();

    res.status(200).json({
      success: true,
      data: order
    });
  } catch (error) {
    console.error('Cancel order error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};
