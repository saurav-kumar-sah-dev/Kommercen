# Kommercen - E-commerce Setup Guide

## Prerequisites

Before setting up the project, make sure you have the following installed:

- **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- **MongoDB** - [Download here](https://www.mongodb.com/try/download/community)
- **Git** - [Download here](https://git-scm.com/)

## Environment Setup

### 1. Backend Environment Variables

Create a `.env` file in the `backend` directory with the following content:

```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/kommercen
JWT_SECRET=your_super_secure_jwt_secret_key_here_change_this
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
FRONTEND_URL=http://localhost:5173
```

### 2. Frontend Environment Variables

Create a `.env` file in the `frontend` directory with the following content:

```env
VITE_API_URL=http://localhost:5000/api
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
```

## Installation Steps

### 1. Install Dependencies

Run the following command in the project root to install all dependencies:

```bash
npm run install-all
```

This will install dependencies for:
- Root project
- Backend (Express.js, MongoDB, Cloudinary, etc.)
- Frontend (React, Vite, Tailwind CSS, etc.)

### 2. Start MongoDB

Make sure MongoDB is running on your system:

**Windows:**
```bash
mongod
```

**macOS/Linux:**
```bash
sudo systemctl start mongod
# or
brew services start mongodb-community
```

### 3. Start the Development Servers

Run the following command to start both backend and frontend servers:

```bash
npm run dev
```

This will start:
- Backend server on `http://localhost:5000`
- Frontend server on `http://localhost:5173`

## Project Structure

```
kommercen/
├── backend/                 # Express.js backend
│   ├── controllers/         # Route controllers
│   ├── middleware/         # Custom middleware
│   ├── models/            # MongoDB models
│   ├── routes/            # API routes
│   ├── utils/             # Utility functions
│   └── server.js          # Main server file
├── frontend/              # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/         # Page components
│   │   ├── context/       # React context providers
│   │   ├── utils/         # Utility functions
│   │   └── App.jsx        # Main App component
│   └── package.json
├── package.json           # Root package.json
└── README.md
```

## Features Implemented

### ✅ Completed Features

1. **Project Structure** - MERN stack setup with proper organization
2. **Backend Setup** - Express.js server with MongoDB connection
3. **Frontend Setup** - Vite React with Tailwind CSS
4. **Cloudinary Integration** - Image upload and management
5. **User Authentication** - JWT-based auth with registration/login
6. **Product Management** - CRUD operations for products
7. **Shopping Cart** - Add/remove items, quantity management
8. **Order Management** - Order creation and tracking
9. **Responsive UI** - Modern, mobile-friendly design

### 🚧 Pending Features

1. **Payment Integration** - Stripe payment processing
2. **Admin Dashboard** - Complete admin interface

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update user profile
- `PUT /api/auth/change-password` - Change password

### Products
- `GET /api/products` - Get all products (with filtering)
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (Admin/Seller)
- `PUT /api/products/:id` - Update product (Admin/Seller)
- `DELETE /api/products/:id` - Delete product (Admin/Seller)
- `POST /api/products/:id/reviews` - Add product review

### Cart & Wishlist
- `GET /api/users/cart` - Get user's cart
- `POST /api/users/cart` - Add item to cart
- `PUT /api/users/cart/:productId` - Update cart item
- `DELETE /api/users/cart/:productId` - Remove from cart
- `GET /api/users/wishlist` - Get user's wishlist
- `POST /api/users/wishlist` - Add to wishlist
- `DELETE /api/users/wishlist/:productId` - Remove from wishlist

### Orders
- `GET /api/orders` - Get user's orders
- `GET /api/orders/:id` - Get single order
- `POST /api/orders` - Create new order
- `PUT /api/orders/:id/status` - Update order status (Admin)
- `PUT /api/orders/:id/payment-status` - Update payment status (Admin)

### Upload
- `POST /api/upload/single` - Upload single image
- `POST /api/upload/multiple` - Upload multiple images
- `DELETE /api/upload/:publicId` - Delete image

## Default Admin User

To create an admin user, you can either:

1. **Use MongoDB Compass/CLI** to manually update a user's role to 'admin'
2. **Add admin creation script** in the backend

## Cloudinary Configuration

The project is already configured with your Cloudinary credentials:
- Cloud Name: `your_cloudinary_cloud_name`
- API Key: `your_cloudinary_api_key`
- API Secret: `your_cloudinary_api_secret`

## Next Steps

1. **Set up Stripe** - Get your Stripe keys and add them to environment variables
2. **Complete Admin Dashboard** - Build the admin interface for managing products and orders
3. **Add Product Detail Page** - Complete the product detail view with image gallery
4. **Implement Cart Page** - Build the shopping cart interface
5. **Add Checkout Flow** - Complete the checkout process with Stripe integration
6. **Add Order Management** - Build order tracking and management features

## Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Make sure MongoDB is running
   - Check the connection string in `.env`

2. **Port Already in Use**
   - Change the PORT in backend `.env` file
   - Or kill the process using the port

3. **CORS Issues**
   - Check the FRONTEND_URL in backend `.env`
   - Make sure it matches your frontend URL

4. **Cloudinary Upload Issues**
   - Verify your Cloudinary credentials
   - Check if the cloud name is correct

## Support

If you encounter any issues, please check:
1. All environment variables are set correctly
2. MongoDB is running
3. All dependencies are installed
4. Ports are not conflicting

The project is now ready for development! 🚀
