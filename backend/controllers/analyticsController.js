const Order = require('../models/Order');
const Product = require('../models/Product');

exports.getSalesAnalytics = async (req, res) => {
  try {
    const farmerId = req.user._id;

    // Aggregate orders by product
    const orders = await Order.find({ farmerId }).populate(
      'items.productId',
      'name price'
    );

    const productStats = {};

    orders.forEach((order) => {
      order.items.forEach((item) => {
        const name = item.productId.name;
        if (!productStats[name])
          productStats[name] = { quantity: 0, revenue: 0 };
        productStats[name].quantity += item.quantity;
        productStats[name].revenue += item.quantity * item.unitPrice;
      });
    });

    res.json(productStats);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
