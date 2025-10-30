const express = require('express');
const User = require('../models/User');
const Product = require('../models/Product');
const { auth } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/users/cart
// @desc    Get user's cart
// @access  Private
router.get('/cart', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate('cart.product', 'name price images stock');

    res.json({ cart: user.cart });
  } catch (error) {
    console.error('Get cart error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/users/cart
// @desc    Add item to cart
// @access  Private
router.post('/cart', auth, async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;

    if (!productId) {
      return res.status(400).json({ message: 'Product ID is required' });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    if (product.stock < quantity) {
      return res.status(400).json({ message: 'Insufficient stock' });
    }

    const user = await User.findById(req.user._id);
    
    // Check if item already exists in cart
    const existingItem = user.cart.find(
      item => item.product.toString() === productId
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      user.cart.push({ product: productId, quantity });
    }

    await user.save();

    await user.populate('cart.product', 'name price images stock');

    res.json({
      message: 'Item added to cart successfully',
      cart: user.cart
    });
  } catch (error) {
    console.error('Add to cart error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/users/cart/:productId
// @desc    Update cart item quantity
// @access  Private
router.put('/cart/:productId', auth, async (req, res) => {
  try {
    const { productId } = req.params;
    const { quantity } = req.body;

    if (!quantity || quantity < 1) {
      return res.status(400).json({ message: 'Valid quantity is required' });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    if (product.stock < quantity) {
      return res.status(400).json({ message: 'Insufficient stock' });
    }

    const user = await User.findById(req.user._id);
    const cartItem = user.cart.find(
      item => item.product.toString() === productId
    );

    if (!cartItem) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    cartItem.quantity = quantity;
    await user.save();

    await user.populate('cart.product', 'name price images stock');

    res.json({
      message: 'Cart updated successfully',
      cart: user.cart
    });
  } catch (error) {
    console.error('Update cart error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/users/cart/:productId
// @desc    Remove item from cart
// @access  Private
router.delete('/cart/:productId', auth, async (req, res) => {
  try {
    const { productId } = req.params;

    const user = await User.findById(req.user._id);
    user.cart = user.cart.filter(
      item => item.product.toString() !== productId
    );

    await user.save();

    await user.populate('cart.product', 'name price images stock');

    res.json({
      message: 'Item removed from cart successfully',
      cart: user.cart
    });
  } catch (error) {
    console.error('Remove from cart error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/users/cart
// @desc    Clear entire cart
// @access  Private
router.delete('/cart', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    user.cart = [];
    await user.save();

    res.json({ message: 'Cart cleared successfully' });
  } catch (error) {
    console.error('Clear cart error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/users/wishlist
// @desc    Get user's wishlist
// @access  Private
router.get('/wishlist', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate('wishlist', 'name price images category');

    res.json({ wishlist: user.wishlist });
  } catch (error) {
    console.error('Get wishlist error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/users/wishlist
// @desc    Add item to wishlist
// @access  Private
router.post('/wishlist', auth, async (req, res) => {
  try {
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({ message: 'Product ID is required' });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const user = await User.findById(req.user._id);
    
    // Check if item already exists in wishlist
    const existsInWishlist = user.wishlist.includes(productId);
    if (existsInWishlist) {
      return res.status(400).json({ message: 'Item already in wishlist' });
    }

    user.wishlist.push(productId);
    await user.save();

    await user.populate('wishlist', 'name price images category');

    res.json({
      message: 'Item added to wishlist successfully',
      wishlist: user.wishlist
    });
  } catch (error) {
    console.error('Add to wishlist error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/users/wishlist/:productId
// @desc    Remove item from wishlist
// @access  Private
router.delete('/wishlist/:productId', auth, async (req, res) => {
  try {
    const { productId } = req.params;

    const user = await User.findById(req.user._id);
    user.wishlist = user.wishlist.filter(
      id => id.toString() !== productId
    );

    await user.save();

    await user.populate('wishlist', 'name price images category');

    res.json({
      message: 'Item removed from wishlist successfully',
      wishlist: user.wishlist
    });
  } catch (error) {
    console.error('Remove from wishlist error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/users/address
// @desc    Update user's default address
// @access  Private
router.put('/address', auth, async (req, res) => {
  try {
    const { street, city, state, zipCode, country, phone, name } = req.body || {};
    if (!street || !city || !state || !zipCode || !country) {
      return res.status(400).json({ message: 'Complete address is required' });
    }

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.address = { street, city, state, zipCode, country };
    if (phone) user.phone = phone;
    if (name && !user.name) user.name = name; // do not overwrite existing name unless empty
    await user.save();

    res.json({ message: 'Address updated', address: user.address, phone: user.phone });
  } catch (error) {
    console.error('Update address error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
