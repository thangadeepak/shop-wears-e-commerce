import Order from '../models/Order.js';

// @desc    Create new order
// @route   POST /api/orders
export const addOrderItems = async (req, res) => {
  try {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    } = req.body;

    if (orderItems && orderItems.length === 0) {
      return res.status(400).json({ message: 'No order items found' });
    }

    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      isPaid: true, // Demo simulation
      paidAt: Date.now(),
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  } catch (error) {
    // If DB is offline in demo mode, return simulated created order
    const mockOrder = {
      _id: 'ORD' + Math.floor(100000 + Math.random() * 900000),
      orderItems: req.body.orderItems,
      shippingAddress: req.body.shippingAddress,
      totalPrice: req.body.totalPrice,
      isPaid: true,
      paidAt: new Date().toISOString(),
      orderStatus: 'Processing'
    };
    res.status(201).json(mockOrder);
  }
};

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort('-createdAt');
    res.json(orders);
  } catch (error) {
    res.json([]);
  }
};
