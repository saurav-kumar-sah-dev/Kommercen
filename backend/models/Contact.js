const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
    maxlength: [50, 'First name cannot exceed 50 characters']
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true,
    maxlength: [50, 'Last name cannot exceed 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  phone: {
    type: String,
    trim: true,
    default: ''
  },
  subject: {
    type: String,
    required: [true, 'Subject is required'],
    enum: [
      'general',
      'support',
      'billing',
      'feedback',
      'partnership',
      'other'
    ]
  },
  message: {
    type: String,
    required: [true, 'Message is required'],
    trim: true,
    minlength: [10, 'Message must be at least 10 characters'],
    maxlength: [1000, 'Message cannot exceed 1000 characters']
  },
  status: {
    type: String,
    enum: ['new', 'read', 'replied', 'closed'],
    default: 'new'
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },
  adminNotes: {
    type: String,
    default: '',
    maxlength: [500, 'Admin notes cannot exceed 500 characters']
  },
  repliedAt: {
    type: Date
  },
  repliedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  emailSent: {
    type: Boolean,
    default: false
  },
  emailSentAt: {
    type: Date
  },
  ipAddress: {
    type: String,
    default: ''
  },
  userAgent: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

// Index for better query performance
contactSchema.index({ email: 1 });
contactSchema.index({ status: 1 });
contactSchema.index({ subject: 1 });
contactSchema.index({ createdAt: -1 });

// Virtual for full name
contactSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

// Virtual for formatted phone
contactSchema.virtual('formattedPhone').get(function() {
  if (!this.phone) return '';
  return this.phone.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
});

// Method to mark as read
contactSchema.methods.markAsRead = function() {
  this.status = 'read';
  return this.save();
};

// Method to mark as replied
contactSchema.methods.markAsReplied = function(adminId) {
  this.status = 'replied';
  this.repliedAt = new Date();
  this.repliedBy = adminId;
  return this.save();
};

// Method to close ticket
contactSchema.methods.closeTicket = function() {
  this.status = 'closed';
  return this.save();
};

// Static method to get contact statistics
contactSchema.statics.getStats = async function() {
  const stats = await this.aggregate([
    {
      $group: {
        _id: '$status',
        count: { $sum: 1 }
      }
    }
  ]);
  
  const result = {
    total: 0,
    new: 0,
    read: 0,
    replied: 0,
    closed: 0
  };
  
  stats.forEach(stat => {
    result[stat._id] = stat.count;
    result.total += stat.count;
  });
  
  return result;
};

// Static method to get recent contacts
contactSchema.statics.getRecent = async function(limit = 10) {
  return this.find()
    .sort({ createdAt: -1 })
    .limit(limit)
    .select('firstName lastName email subject status createdAt');
};

// Static method to search contacts
contactSchema.statics.search = async function(query, options = {}) {
  const {
    page = 1,
    limit = 20,
    status,
    subject,
    sortBy = 'createdAt',
    sortOrder = 'desc'
  } = options;

  const filter = {};
  
  if (query) {
    filter.$or = [
      { firstName: { $regex: query, $options: 'i' } },
      { lastName: { $regex: query, $options: 'i' } },
      { email: { $regex: query, $options: 'i' } },
      { message: { $regex: query, $options: 'i' } }
    ];
  }
  
  if (status) filter.status = status;
  if (subject) filter.subject = subject;

  const sort = {};
  sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

  const skip = (page - 1) * limit;

  const contacts = await this.find(filter)
    .sort(sort)
    .skip(skip)
    .limit(limit);

  const total = await this.countDocuments(filter);

  return {
    contacts,
    pagination: {
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalContacts: total,
      hasNext: skip + contacts.length < total,
      hasPrev: page > 1
    }
  };
};

module.exports = mongoose.model('Contact', contactSchema);
