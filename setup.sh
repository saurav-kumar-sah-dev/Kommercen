#!/bin/bash

# Kommercen Setup Script
echo "🚀 Setting up Kommercen E-commerce Application..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js v16 or higher."
    exit 1
fi

# Check if MongoDB is installed
if ! command -v mongod &> /dev/null; then
    echo "❌ MongoDB is not installed. Please install MongoDB."
    exit 1
fi

echo "✅ Prerequisites check passed!"

# Install dependencies
echo "📦 Installing dependencies..."
npm run install-all

# Create backend .env file if it doesn't exist
if [ ! -f "backend/.env" ]; then
    echo "📝 Creating backend .env file..."
    cat > backend/.env << EOF
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/kommercen
JWT_SECRET=CHANGE_THIS_TO_A_SECURE_RANDOM_STRING_IN_PRODUCTION
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name_here
CLOUDINARY_API_KEY=your_cloudinary_api_key_here
CLOUDINARY_API_SECRET=your_cloudinary_api_secret_here
RAZORPAY_KEY_ID=your_razorpay_key_id_here
RAZORPAY_KEY_SECRET=your_razorpay_key_secret_here
FRONTEND_URL=http://localhost:5173
EOF
    echo "✅ Backend .env file created!"
    echo "⚠️  IMPORTANT: Update the API keys in backend/.env with your actual credentials!"
else
    echo "✅ Backend .env file already exists!"
fi

# Create frontend .env file if it doesn't exist
if [ ! -f "frontend/.env" ]; then
    echo "📝 Creating frontend .env file..."
    cat > frontend/.env << EOF
VITE_API_URL=http://localhost:5000/api
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id_here
EOF
    echo "✅ Frontend .env file created!"
    echo "⚠️  IMPORTANT: Update the Razorpay key in frontend/.env with your actual key!"
else
    echo "✅ Frontend .env file already exists!"
fi

echo ""
echo "🎉 Setup completed successfully!"
echo ""
echo "Next steps:"
echo "1. Make sure MongoDB is running"
echo "2. Update your API keys in the .env files (Cloudinary, Razorpay)"
echo "3. Run 'npm run dev' to start the development servers"
echo ""
echo "📚 For detailed setup instructions, see SETUP.md"
echo ""
echo "🌐 Application will be available at:"
echo "   Frontend: http://localhost:5173"
echo "   Backend:  http://localhost:5000"
