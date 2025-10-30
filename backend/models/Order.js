const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderNumber: {
    type: String,
    unique: true,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 1
    },
    price: {
      type: Number,
      required: true,
      min: 0
    },
    name: String,
    image: String
  }],
  shippingAddress: {
    name: {
      type: String,
      required: true
    },
    street: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: true
    },
    zipCode: {
      type: String,
      required: true
    },
    country: {
      type: String,
      required: true
    },
    phone: String
  },
  billingAddress: {
    name: String,
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String,
    phone: String
  },
  paymentMethod: {
    type: {
      type: String,
      enum: ['card', 'paypal', 'bank_transfer', 'cash_on_delivery'],
      required: true
    },
    details: {
      last4: String,
      brand: String,
      expMonth: String,
      expYear: String
    }
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'failed', 'refunded', 'partially_refunded'],
    default: 'pending'
  },
  paymentIntentId: String,
  subtotal: {
    type: Number,
    required: true,
    min: 0
  },
  tax: {
    type: Number,
    default: 0,
    min: 0
  },
  shipping: {
    type: Number,
    default: 0,
    min: 0
  },
  discount: {
    type: Number,
    default: 0,
    min: 0
  },
  total: {
    type: Number,
    required: true,
    min: 0
  },
  status: {
    type: String,
    enum: [
      'pending',
      'confirmed',
      'processing',
      'shipped',
      'delivered',
      'cancelled',
      'returned'
    ],
    default: 'pending'
  },
  trackingNumber: String,
  estimatedDelivery: Date,
  notes: String,
  refundReason: String,
  refundAmount: {
    type: Number,
    min: 0
  },
  // User-driven lifecycle requests
  cancellationRequested: {
    type: Boolean,
    default: false
  },
  cancellationReason: String,
  cancellationRequestedAt: Date,
  refundRequested: {
    type: Boolean,
    default: false
  },
  refundRequestedAmount: {
    type: Number,
    min: 0
  },
  refundRequestedReason: String,
  refundRequestedAt: Date
}, {
  timestamps: true
});

// Generate order number before saving
orderSchema.pre('validate', async function(next) {
  if (!this.orderNumber) {
    const count = await mongoose.model('Order').countDocuments();
    this.orderNumber = `ORD-${Date.now()}-${String(count + 1).padStart(4, '0')}`;
  }
  next();
});

// Calculate total before validation to satisfy required constraints
orderSchema.pre('validate', function(next) {
  this.total = this.subtotal + this.tax + this.shipping - this.discount;
  next();
});

module.exports = mongoose.model('Order', orderSchema);
