const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const orderController = require('../controllers/orderController');

// Create a new order
router.post('/', auth, orderController.createOrder);

// Get buyer orders
router.get('/buyer', auth, orderController.getBuyerOrders);

// Get farmer orders
router.get('/farmer', auth, orderController.getFarmerOrders);

// Update order status
router.put('/:id/status', auth, orderController.updateOrderStatus);

module.exports = router;
