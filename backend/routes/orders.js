const express = require('express');
const Order = require('../models/Order');
const Product = require('../models/Product');
const User = require('../models/User');
const { auth, adminAuth } = require('../middleware/auth');
const { validateOrder } = require('../middleware/validation');

const router = express.Router();

// @route   GET /api/orders
// @desc    Get user's orders or all orders (admin)
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    let filter = {};
    
    // If not admin, only show user's orders
    if (req.user.role !== 'admin') {
      filter.user = req.user._id;
    }
    
    if (status) {
      filter.status = status;
    }

    const orders = await Order.find(filter)
      .populate('user', 'name email')
      .populate('items.product', 'name images')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Order.countDocuments(filter);

    res.json({
      orders,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / parseInt(limit)),
        totalOrders: total
      }
    });
  } catch (error) {
    console.error('Get orders error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/orders/:id
// @desc    Get single order
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('user', 'name email')
      .populate('items.product', 'name images');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Check if user is admin or the order owner
    if (req.user.role !== 'admin' && order.user._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to view this order' });
    }

    res.json({ order });
  } catch (error) {
    console.error('Get order error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/orders
// @desc    Create new order
// @access  Private
router.post('/', auth, validateOrder, async (req, res) => {
  try {
    const { items, shippingAddress, billingAddress, paymentMethod } = req.body;

    // Validate products and calculate totals
    let subtotal = 0;
    const orderItems = [];

    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res.status(404).json({ message: `Product ${item.product} not found` });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({ 
          message: `Insufficient stock for ${product.name}` 
        });
      }

      const itemTotal = product.price * item.quantity;
      subtotal += itemTotal;

      orderItems.push({
        product: product._id,
        quantity: item.quantity,
        price: product.price,
        name: product.name,
        image: product.images[0]?.url || ''
      });
    }

    // Calculate tax (8% example)
    const tax = subtotal * 0.08;
    
    // Calculate shipping (free over $50, otherwise $5)
    const shipping = subtotal >= 50 ? 0 : 5;

    // Compute estimated delivery between 3-7 days from now
    const daysToAdd = Math.floor(Math.random() * 5) + 3; // 3..7
    const estimatedDelivery = new Date();
    estimatedDelivery.setDate(estimatedDelivery.getDate() + daysToAdd);

    const orderData = {
      user: req.user._id,
      items: orderItems,
      shippingAddress,
      billingAddress: billingAddress || shippingAddress,
      paymentMethod,
      subtotal,
      tax,
      shipping,
      total: subtotal + tax + shipping,
      // For COD, keep payment pending, but mark order confirmed so UI shows confirmation
      status: 'confirmed',
      estimatedDelivery
    };

    // Enforce COD eligibility rules (e.g., disable COD for high-value orders)
    const totalAmount = orderData.total;
    if (paymentMethod?.type === 'cash_on_delivery' && totalAmount > 10000) {
      return res.status(400).json({ message: 'Cash on Delivery is not available for orders above ₹10,000' });
    }

    const order = new Order(orderData);
    await order.save();

    // Update product stock
    for (const item of items) {
      await Product.findByIdAndUpdate(
        item.product,
        { $inc: { stock: -item.quantity } }
      );
    }

    // Clear user's cart
    await User.findByIdAndUpdate(req.user._id, { cart: [] });

    await order.populate('user', 'name email');
    await order.populate('items.product', 'name images');

    res.status(201).json({
      message: 'Order created successfully',
      order
    });
  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({ message: 'Server error during order creation' });
  }
});

// @route   PUT /api/orders/:id/status
// @desc    Update order status
// @access  Private (Admin)
router.put('/:id/status', auth, adminAuth, async (req, res) => {
  try {
    const { status, trackingNumber, notes } = req.body;

    const validStatuses = [
      'pending',
      'confirmed',
      'processing',
      'shipped',
      'delivered',
      'cancelled',
      'returned'
    ];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const updateData = { status };
    if (trackingNumber) updateData.trackingNumber = trackingNumber;
    if (notes) updateData.notes = notes;

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    ).populate('user', 'name email')
     .populate('items.product', 'name images');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json({
      message: 'Order status updated successfully',
      order
    });
  } catch (error) {
    console.error('Update order status error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/orders/:id/payment-status
// @desc    Update payment status
// @access  Private (Admin)
router.put('/:id/payment-status', auth, adminAuth, async (req, res) => {
  try {
    const { paymentStatus, paymentIntentId } = req.body;

    const validPaymentStatuses = [
      'pending',
      'paid',
      'failed',
      'refunded',
      'partially_refunded'
    ];

    if (!validPaymentStatuses.includes(paymentStatus)) {
      return res.status(400).json({ message: 'Invalid payment status' });
    }

    const updateData = { paymentStatus };
    if (paymentIntentId) updateData.paymentIntentId = paymentIntentId;

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    ).populate('user', 'name email')
     .populate('items.product', 'name images');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json({
      message: 'Payment status updated successfully',
      order
    });
  } catch (error) {
    console.error('Update payment status error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/orders/:id/approve-cancellation
// @desc    Admin approves user cancellation request, cancel and restock
// @access  Private (Admin)
router.post('/:id/approve-cancellation', auth, adminAuth, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('items.product', 'stock');
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    if (order.status === 'cancelled') {
      return res.json({ message: 'Order already cancelled', order });
    }

    // Restock products
    for (const item of order.items) {
      await Product.findByIdAndUpdate(item.product._id || item.product, { $inc: { stock: item.quantity } });
    }

    order.status = 'cancelled';
    order.cancellationRequested = false;
    await order.save();

    res.json({ message: 'Cancellation approved and order cancelled', order });
  } catch (error) {
    console.error('Approve cancellation error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/orders/:id/deny-cancellation
// @desc    Admin denies user cancellation request
// @access  Private (Admin)
router.post('/:id/deny-cancellation', auth, adminAuth, async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { $set: { cancellationRequested: false } },
      { new: true }
    );
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json({ message: 'Cancellation request denied', order });
  } catch (error) {
    console.error('Deny cancellation error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/orders/:id/clear-refund-request
// @desc    Admin marks refund request as handled (use Razorpay refund endpoint to actually refund)
// @access  Private (Admin)
router.post('/:id/clear-refund-request', auth, adminAuth, async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { $set: { refundRequested: false, refundRequestedAmount: undefined, refundRequestedReason: undefined } },
      { new: true }
    );
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json({ message: 'Refund request cleared', order });
  } catch (error) {
    console.error('Clear refund request error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/orders/:id/cancel
// @desc    User cancels own order (if eligible); if already paid, mark request
// @access  Private
router.post('/:id/cancel', auth, async (req, res) => {
  try {
    const { reason } = req.body;

    const order = await Order.findById(req.params.id).populate('items.product', 'name images stock');
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Must be owner
    if (order.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to cancel this order' });
    }

    const cancellableStatuses = ['pending', 'confirmed', 'processing'];
    const isCancellableStatus = cancellableStatuses.includes(order.status);

    // If not paid or COD, allow immediate cancellation and restock
    const isUnpaid = order.paymentStatus !== 'paid';
    const isCOD = order.paymentMethod?.type === 'cash_on_delivery';

    if (isCancellableStatus && (isUnpaid || isCOD)) {
      // Restock products
      for (const item of order.items) {
        await Product.findByIdAndUpdate(item.product._id || item.product, { $inc: { stock: item.quantity } });
      }

      order.status = 'cancelled';
      order.notes = reason || order.notes;
      await order.save();

      return res.json({ message: 'Order cancelled successfully', order });
    }

    // Otherwise, record a cancellation request
    order.cancellationRequested = true;
    order.cancellationReason = reason || 'User requested cancellation';
    order.cancellationRequestedAt = new Date();
    await order.save();

    return res.json({ message: 'Cancellation request submitted', order });
  } catch (error) {
    console.error('Cancel order error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/orders/:id/request-refund
// @desc    User requests a refund for a paid order
// @access  Private
router.post('/:id/request-refund', auth, async (req, res) => {
  try {
    const { amount, reason } = req.body;

    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Must be owner
    if (order.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to request refund for this order' });
    }

    if (order.paymentStatus !== 'paid') {
      return res.status(400).json({ message: 'Refunds are only available for paid orders' });
    }

    if (amount != null && (typeof amount !== 'number' || amount <= 0 || amount > order.total)) {
      return res.status(400).json({ message: 'Invalid refund amount' });
    }

    order.refundRequested = true;
    if (amount != null) order.refundRequestedAmount = amount;
    order.refundRequestedReason = reason || 'User requested refund';
    order.refundRequestedAt = new Date();
    await order.save();

    return res.json({ message: 'Refund request submitted', order });
  } catch (error) {
    console.error('Request refund error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/orders/stats/summary
// @desc    Get order statistics
// @access  Private (Admin)
router.get('/stats/summary', auth, adminAuth, async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();
    const totalRevenue = await Order.aggregate([
      { $match: { paymentStatus: 'paid' } },
      { $group: { _id: null, total: { $sum: '$total' } } }
    ]);

    const ordersByStatus = await Order.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);

    const recentOrders = await Order.find()
      .populate('user', 'name email')
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      totalOrders,
      totalRevenue: totalRevenue[0]?.total || 0,
      ordersByStatus,
      recentOrders
    });
  } catch (error) {
    console.error('Get order stats error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
