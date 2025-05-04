const express = require('express');
const { getOrders, getOrder, createOrder, updateOrderStatus, cancelOrder } = require('../controllers/orderController');
const { authenticate, authorize } = require('../middleware/auth');

const router = express.Router();

// All orders routes are protected
router.use(authenticate);

router.get('/', getOrders);
router.get('/:id', getOrder);
router.post('/', createOrder);

// Only admin can update order status
router.put('/:id/status', authorize('admin'), updateOrderStatus);

// Both admin and customer can cancel order
router.put('/:id/cancel', cancelOrder);

module.exports = router;
