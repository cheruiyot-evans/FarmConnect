const Order = require('../models/Order');
const Product = require('../models/Product');
const socket = require('../utils/socket');

// Create a new order
const createOrder = async (req, res) => {
  try {
    const buyerId = req.user._id;
    const { items } = req.body;

    if (!items || !items.length) {
      return res.status(400).json({ message: 'Order must have items' });
    }

    let totalAmount = 0;
    let farmerId = null;
    const orderItems = [];

    // Validate and build order items
    for (const item of items) {
      const product = await Product.findById(item.productId);
      if (!product || !product.isAvailable) {
        return res
          .status(400)
          .json({ message: `Product ${item.productId} not available` });
      }

      if (!farmerId) farmerId = product.farmerId.toString();
      if (farmerId !== product.farmerId.toString()) {
        return res
          .status(400)
          .json({ message: 'All items must be from the same farmer' });
      }

      const orderItem = {
        productId: product._id,
        name: product.name, // Use product document for name
        quantity: item.quantity,
        unitPrice: product.price,
      };

      totalAmount += product.price * item.quantity;
      orderItems.push(orderItem);
    }

    // Save order
    const order = new Order({
      buyerId,
      farmerId,
      items: orderItems,
      totalAmount,
    });
    await order.save();

    // Emit notifications via Socket.io
    const io = socket.getIO();

    // Notify farmer
    io.to(farmerId).emit('notification', {
      type: 'order',
      message: `New order ${order._id} placed by buyer`,
      orderId: order._id,
    });

    // Analytics update
    io.to(farmerId).emit('analyticsUpdate', {
      type: 'newOrder',
      orderId: order._id,
      items: orderItems.map((i) => ({ name: i.name, quantity: i.quantity })),
      totalAmount,
    });

    res.status(201).json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

// Get orders for the logged-in buyer
const getBuyerOrders = async (req, res) => {
  try {
    const orders = await Order.find({ buyerId: req.user._id });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get orders for the logged-in farmer
const getFarmerOrders = async (req, res) => {
  try {
    const orders = await Order.find({ farmerId: req.user._id }).populate(
      'buyerId',
      'name email'
    );
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update order status (farmer only)
const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });

    if (order.farmerId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not allowed' });
    }

    const { status } = req.body;
    const validStatuses = [
      'pending',
      'confirmed',
      'dispatched',
      'delivered',
      'cancelled',
    ];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    order.status = status;
    await order.save();

    // Notify buyer
    const io = socket.getIO();
    io.to(order.buyerId.toString()).emit('notification', {
      type: 'order',
      message: `Your order ${order._id} status is now ${order.status}`,
      orderId: order._id,
    });

    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createOrder,
  getBuyerOrders,
  getFarmerOrders,
  updateOrderStatus,
};
