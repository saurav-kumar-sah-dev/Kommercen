const express = require('express');
const Razorpay = require('razorpay');
const crypto = require('crypto');
const Order = require('../models/Order');
const Product = require('../models/Product');
const { auth } = require('../middleware/auth');

const router = express.Router();

// Initialize Razorpay only if keys are provided
let razorpay = null;
if (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET) {
  razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });
} else {
  console.warn('Razorpay keys not configured. Razorpay features will be disabled.');
}

// @route   POST /api/razorpay/create-order
// @desc    Create a Razorpay order
// @access  Private
router.post('/create-order', auth, async (req, res) => {
  try {
    if (!razorpay) {
      return res.status(503).json({ 
        message: 'Razorpay is not configured. Please add RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET to environment variables.' 
      });
    }

    const { items, shippingAddress } = req.body;
    console.log('[Razorpay] create-order request', {
      userId: req.user?._id?.toString(),
      itemsCount: Array.isArray(items) ? items.length : 0,
      origin: req.get('Origin'),
    });

    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'No items provided' });
    }

    // Calculate total amount
    let totalAmount = 0;
    const orderItems = [];

    for (const item of items) {
      if (!item?.productId || !item?.quantity) {
        return res.status(400).json({ message: 'Each item must include productId and quantity' });
      }
      const product = await Product.findById(item.productId);
      if (!product) {
        return res.status(404).json({ message: `Product ${item.productId} not found` });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({ 
          message: `Insufficient stock for ${product.name}. Available: ${product.stock}` 
        });
      }

      const itemTotal = product.price * item.quantity;
      totalAmount += itemTotal;

      orderItems.push({
        product: product._id,
        quantity: item.quantity,
        price: product.price,
        name: product.name,
        image: product.images[0]?.url || ''
      });
    }

    // Add shipping cost and tax
    const shippingCost = totalAmount > 100 ? 0 : 10; // Free shipping over ₹100
    const taxRate = 0.18; // 18% GST for India
    const taxAmount = totalAmount * taxRate;
    const finalAmount = Math.round((totalAmount + shippingCost + taxAmount) * 100); // Convert to paise

    // Create Razorpay order
    const razorpayOrder = await razorpay.orders.create({
      amount: finalAmount,
      currency: 'INR',
      receipt: `order_${Date.now()}`,
      notes: {
        userId: req.user._id.toString(),
        orderItems: JSON.stringify(orderItems),
        shippingAddress: JSON.stringify(shippingAddress)
      }
    });

    console.log('[Razorpay] order created', {
      orderId: razorpayOrder.id,
      amount: finalAmount,
      subtotal: totalAmount,
      tax: taxAmount,
      shipping: shippingCost,
    });

    res.json({
      orderId: razorpayOrder.id,
      amount: finalAmount,
      currency: 'INR',
      orderItems,
      subtotal: totalAmount,
      shipping: shippingCost,
      tax: taxAmount,
      total: finalAmount / 100
    });

  } catch (error) {
    console.error('Razorpay order creation error:', error?.message || error);
    res.status(500).json({ message: `Error creating payment order: ${error?.message || 'unknown error'}` });
  }
});

// @route   POST /api/razorpay/verify-payment
// @desc    Verify Razorpay payment and create order
// @access  Private
router.post('/verify-payment', auth, async (req, res) => {
  try {
    if (!razorpay) {
      return res.status(503).json({ 
        message: 'Razorpay is not configured. Please add RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET to environment variables.' 
      });
    }

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, shippingAddress, billingAddress } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ message: 'Payment verification data is required' });
    }

    // Verify payment signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ message: 'Invalid payment signature' });
    }

    // Get order details from Razorpay
    const razorpayOrder = await razorpay.orders.fetch(razorpay_order_id);
    
    // Parse order items and addresses from notes when present
    let orderItems = [];
    if (razorpayOrder.notes && razorpayOrder.notes.orderItems) {
      try {
        orderItems = JSON.parse(razorpayOrder.notes.orderItems);
      } catch (_) {
        return res.status(400).json({ message: 'Invalid order items data on payment' });
      }
    } else {
      return res.status(400).json({ message: 'Missing order items on payment' });
    }

    let parsedShippingAddress = req.body.shippingAddress;
    if ((!parsedShippingAddress || !parsedShippingAddress.street) && razorpayOrder.notes && razorpayOrder.notes.shippingAddress) {
      try {
        parsedShippingAddress = JSON.parse(razorpayOrder.notes.shippingAddress);
      } catch (_) {
        // keep body-provided address if exists; otherwise leave undefined
      }
    }

    // Ensure a complete shipping address is present (schema requires these fields)
    const hasCompleteAddress = parsedShippingAddress && parsedShippingAddress.name && parsedShippingAddress.street && parsedShippingAddress.city && parsedShippingAddress.state && parsedShippingAddress.zipCode && parsedShippingAddress.country;
    if (!hasCompleteAddress) {
      return res.status(400).json({ message: 'Shipping address is required with name, street, city, state, zipCode, and country' });
    }

    // Recompute amounts in rupees based on items for consistency
    const recomputedSubtotal = orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const recomputedShipping = recomputedSubtotal > 100 ? 0 : 10; // same rule as create-order
    const recomputedTax = +(recomputedSubtotal * 0.18).toFixed(2);
    const recomputedTotal = +(recomputedSubtotal + recomputedShipping + recomputedTax).toFixed(2);

    // Create order in database
    const daysToAdd = Math.floor(Math.random() * 5) + 3; // 3..7 days
    const estimatedDelivery = new Date();
    estimatedDelivery.setDate(estimatedDelivery.getDate() + daysToAdd);

    const order = new Order({
      user: req.user._id,
      items: orderItems,
      shippingAddress: shippingAddress || parsedShippingAddress,
      billingAddress: billingAddress || parsedShippingAddress,
      paymentMethod: {
        type: 'razorpay',
        details: {
          razorpayOrderId: razorpay_order_id,
          razorpayPaymentId: razorpay_payment_id,
          razorpaySignature: razorpay_signature
        }
      },
      paymentStatus: 'paid',
      paymentIntentId: razorpay_payment_id,
      subtotal: recomputedSubtotal,
      tax: recomputedTax,
      shipping: recomputedShipping,
      total: recomputedTotal,
      estimatedDelivery,
      status: 'confirmed'
    });

    await order.save();

    // Update product stock
    for (const item of orderItems) {
      await Product.findByIdAndUpdate(
        item.product,
        { $inc: { stock: -item.quantity } }
      );
    }

    // Clear user's cart
    req.user.cart = [];
    await req.user.save();

    res.json({
      message: 'Order created successfully',
      order: await Order.findById(order._id).populate('items.product', 'name price images')
    });

  } catch (error) {
    // Improve error logging for easier diagnosis
    const isValidation = error && error.name === 'ValidationError';
    if (isValidation) {
      console.error('Payment verification validation error:', error.message, error.errors || {});
      return res.status(400).json({ message: `Validation error creating order: ${error.message}` });
    }
    console.error('Payment verification error:', error?.message || error);
    res.status(500).json({ message: 'Error verifying payment' });
  }
});

// @route   GET /api/razorpay/config
// @desc    Get Razorpay configuration for frontend
// @access  Public
router.get('/config', (req, res) => {
  if (!razorpay) {
    return res.status(503).json({ 
      message: 'Razorpay is not configured',
      keyId: null,
      currency: 'INR'
    });
  }
  
  res.json({
    keyId: process.env.RAZORPAY_KEY_ID,
    currency: 'INR'
  });
});

// @route   POST /api/razorpay/refund
// @desc    Process refund for an order
// @access  Private (Admin only)
router.post('/refund', auth, async (req, res) => {
  try {
    if (!razorpay) {
      return res.status(503).json({ 
        message: 'Razorpay is not configured. Please add RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET to environment variables.' 
      });
    }

    const { orderId, amount, reason } = req.body;

    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Create refund in Razorpay
    const refund = await razorpay.payments.refund(order.paymentIntentId, {
      amount: amount * 100, // Convert to paise
      notes: {
        reason: reason || 'Refund requested by admin'
      }
    });

    // Update order status
    order.paymentStatus = 'refunded';
    order.refundAmount = amount;
    order.refundReason = reason;
    await order.save();

    res.json({
      message: 'Refund processed successfully',
      refund
    });

  } catch (error) {
    console.error('Refund error:', error);
    res.status(500).json({ message: 'Error processing refund' });
  }
});

module.exports = router;
