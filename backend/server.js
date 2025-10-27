const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();

// Security middleware
app.use(helmet());
app.use(cors({
  origin: [
    'https://kommercen.vercel.app',
    'https://kommercen-git-main-saurav-kumar-sah-dev.vercel.app',
    'http://localhost:5173',
    'http://localhost:5174',
    'http://localhost:5175',
    'http://localhost:5176'
  ],
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/kommercen', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.error('MongoDB connection error:', err));

// Routes
console.log('Loading routes...');
try {
  app.use('/api/auth', require('./routes/auth'));
  console.log('✅ Auth routes loaded');
} catch (error) {
  console.error('❌ Error loading auth routes:', error);
}

try {
  app.use('/api/products', require('./routes/products'));
  console.log('✅ Products routes loaded');
} catch (error) {
  console.error('❌ Error loading products routes:', error);
}

try {
  app.use('/api/users', require('./routes/users'));
  console.log('✅ Users routes loaded');
} catch (error) {
  console.error('❌ Error loading users routes:', error);
}

try {
  app.use('/api/orders', require('./routes/orders'));
  console.log('✅ Orders routes loaded');
} catch (error) {
  console.error('❌ Error loading orders routes:', error);
}

try {
  app.use('/api/upload', require('./routes/upload'));
  console.log('✅ Upload routes loaded');
} catch (error) {
  console.error('❌ Error loading upload routes:', error);
}

try {
  app.use('/api/razorpay', require('./routes/razorpay'));
  console.log('✅ Razorpay routes loaded');
} catch (error) {
  console.error('❌ Error loading razorpay routes:', error);
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Kommercen API is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    hasJWTSecret: !!process.env.JWT_SECRET,
    hasMongoURI: !!process.env.MONGODB_URI
  });
});

// Test endpoint to check if auth routes are working
app.get('/api/test', (req, res) => {
  res.json({ 
    message: 'Test endpoint working',
    routes: ['/api/auth/login', '/api/auth/register', '/api/auth/me'],
    timestamp: new Date().toISOString()
  });
});

// Test auth endpoint directly
app.post('/api/auth/test', (req, res) => {
  res.json({ 
    message: 'Auth test endpoint working',
    body: req.body,
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : {}
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Kommercen server running on port ${PORT}`);
  console.log(`📱 Environment: ${process.env.NODE_ENV || 'development'}`);
});
