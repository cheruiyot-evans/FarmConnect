const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const adminController = require('../controllers/adminController');

// Middleware to ensure admin
const isAdmin = (req, res, next) => {
  if (req.user.role !== 'admin')
    return res.status(403).json({ message: 'Not allowed' });
  next();
};

router.use(auth, isAdmin);

// Users
router.get('/users', adminController.getUsers);
router.delete('/users/:id', adminController.deleteUser);

// Products
router.get('/products', adminController.getProducts);
router.delete('/products/:id', adminController.deleteProduct);

// Orders
router.get('/orders', adminController.getOrders);
router.put('/orders/:id/status', adminController.updateOrderStatus);

module.exports = router;
