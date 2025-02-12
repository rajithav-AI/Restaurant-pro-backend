const Order = require('../models/Order');

exports.createOrder = async (req, res) => {
  const { items, totalPrice, orderType, paymentMethod, paymentDetails } = req.body;
  try {
    const order = new Order({
      user: req.userId,
      items,
      totalPrice,
      orderType,
      paymentMethod,
      paymentDetails
    });
    await order.save();
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.params.id });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


exports.getAllOrders = async (req, res) => {
  try {
    const { status, startDate, endDate, sortBy } = req.query;
    let query = {};
    
    if (status) query.status = status;
    if (startDate && endDate) {
      query.createdAt = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }

    const sortOptions = {};
    if (sortBy) {
      sortOptions[sortBy] = req.query.order === 'desc' ? -1 : 1;
    }

    const orders = await Order.find(query)
      .sort(sortOptions)
      .populate('user', 'name email');
      
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.updateOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const order = await Order.findByIdAndUpdate(id, { status }, { new: true });
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};