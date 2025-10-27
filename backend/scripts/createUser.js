const mongoose = require('mongoose');
const User = require('../models/User');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/kommercen', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected successfully'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// Create user account
const createUser = async () => {
  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email: 'admin@kommercen.com' });
    if (existingUser) {
      console.log('ℹ️  User already exists:', existingUser.email);
      return;
    }

    // Create new user
    const user = new User({
      name: 'Admin User',
      email: 'admin@kommercen.com',
      password: 'CHANGE_THIS_PASSWORD_IN_PRODUCTION', // Default password
      role: 'admin', // Make him an admin
      address: {
        street: 'Your Street Address',
        city: 'Your City',
        state: 'Your State',
        zipCode: 'Your ZIP Code',
        country: 'India'
      },
      phone: '+91-XXXXXXXXXX',
      isEmailVerified: true
    });

    await user.save();
    console.log('✅ User created successfully:', {
      name: user.name,
      email: user.email,
      role: user.role
    });

  } catch (error) {
    console.error('❌ Error creating user:', error.message);
  } finally {
    mongoose.connection.close();
  }
};

createUser();
