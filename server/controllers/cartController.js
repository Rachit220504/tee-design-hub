const { CartItem, Product } = require('../models');

// Get user's cart
exports.getCart = async (req, res) => {
  try {
    const cartItems = await CartItem.findAll({
      where: { UserId: req.user.id },
      include: [{ model: Product }]
    });

    res.status(200).json({
      success: true,
      count: cartItems.length,
      data: cartItems
    });
  } catch (error) {
    console.error('Get cart error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// Add item to cart
exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;

    // Check if product exists
    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Check if item is already in cart
    let cartItem = await CartItem.findOne({
      where: {
        UserId: req.user.id,
        ProductId: productId
      }
    });

    if (cartItem) {
      // Update quantity if already in cart
      cartItem.quantity = quantity;
      await cartItem.save();
    } else {
      // Add new item to cart
      cartItem = await CartItem.create({
        UserId: req.user.id,
        ProductId: productId,
        quantity,
        price: product.price
      });
    }

    res.status(200).json({
      success: true,
      data: cartItem
    });
  } catch (error) {
    console.error('Add to cart error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// Update cart item quantity
exports.updateCartItem = async (req, res) => {
  try {
    const { quantity } = req.body;

    // Find cart item
    const cartItem = await CartItem.findOne({
      where: {
        id: req.params.id,
        UserId: req.user.id
      }
    });

    if (!cartItem) {
      return res.status(404).json({
        success: false,
        message: 'Cart item not found'
      });
    }

    // Update quantity
    cartItem.quantity = quantity;
    await cartItem.save();

    res.status(200).json({
      success: true,
      data: cartItem
    });
  } catch (error) {
    console.error('Update cart item error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// Remove item from cart
exports.removeFromCart = async (req, res) => {
  try {
    // Find cart item
    const cartItem = await CartItem.findOne({
      where: {
        id: req.params.id,
        UserId: req.user.id
      }
    });

    if (!cartItem) {
      return res.status(404).json({
        success: false,
        message: 'Cart item not found'
      });
    }

    // Delete cart item
    await cartItem.destroy();

    res.status(200).json({
      success: true,
      message: 'Item removed from cart'
    });
  } catch (error) {
    console.error('Remove from cart error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// Clear cart
exports.clearCart = async (req, res) => {
  try {
    // Delete all items in user's cart
    await CartItem.destroy({
      where: {
        UserId: req.user.id
      }
    });

    res.status(200).json({
      success: true,
      message: 'Cart cleared'
    });
  } catch (error) {
    console.error('Clear cart error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};
