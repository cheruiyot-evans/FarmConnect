const Product = require('../models/Product');

// Create product
exports.createProduct = async (req, res) => {
  try {
    const farmerId = req.user._id;
    const { name, description, category, price, quantity } = req.body;
    const images = req.files ? req.files.map((f) => f.path) : [];

    const product = new Product({
      farmerId,
      name,
      description,
      category,
      price,
      quantity,
      images,
    });
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({ isAvailable: true }).populate(
      'farmerId',
      'name email'
    );
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get products by farmer
exports.getFarmerProducts = async (req, res) => {
  try {
    const products = await Product.find({ farmerId: req.user._id });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update product
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    if (!product.farmerId.equals(req.user._id))
      return res.status(403).json({ message: 'Not allowed' });

    const updates = req.body;
    if (req.files && req.files.length)
      updates.images = req.files.map((f) => f.path);

    Object.assign(product, updates);
    await product.save();
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete product
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    if (!product.farmerId.equals(req.user._id))
      return res.status(403).json({ message: 'Not allowed' });

    await product.deleteOne();
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
