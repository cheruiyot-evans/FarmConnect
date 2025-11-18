const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const parser = require('../middleware/upload');
const productController = require('../controllers/productController');

// Public route
router.get('/', productController.getAllProducts);

// Farmer routes (protected)
router.post(
  '/',
  auth,
  parser.array('images', 5),
  productController.createProduct
);
router.get('/my', auth, productController.getFarmerProducts);
router.put(
  '/:id',
  auth,
  parser.array('images', 5),
  productController.updateProduct
);
router.delete('/:id', auth, productController.deleteProduct);

module.exports = router;
