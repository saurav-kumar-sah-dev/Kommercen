# 🛍️ Kommercen - Your Marketplace, Simplified

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18+-blue.svg)](https://reactjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green.svg)](https://www.mongodb.com/atlas)

A modern, full-stack e-commerce platform built with the MERN stack, featuring a sleek UI with Tailwind CSS, secure payment processing with Razorpay, and seamless image management with Cloudinary. Perfect for Indian market with optimized payment gateway integration.

> **Note**: This project has been cleaned up to contain only essential files for development and deployment. All unnecessary documentation and scripts have been removed for a streamlined experience.

## 📱 Live Demo

🚀 **[Try Kommercen Live](https://kommercen.vercel.app)** | 🔧 **[API Health Check](https://kommercen-backend.onrender.com/api/health)**

## ✨ Features

### 🔐 Authentication & Security
- JWT-based authentication
- Secure password hashing with bcrypt
- Role-based access control (Admin/User)
- Protected routes and middleware

### 🛍️ Product Management
- Complete CRUD operations for products
- Image upload with Cloudinary integration
- Product categories and filtering
- Search functionality
- Product reviews and ratings

### 🛒 Shopping Experience
- Add to cart functionality
- Wishlist management
- Real-time cart updates
- Order tracking and history
- Responsive design for all devices

### 💳 Payment Integration
- Razorpay payment gateway (Indian market optimized)
- Secure payment processing
- Order confirmation and receipts
- Payment status tracking

### 👨‍💼 Admin Dashboard
- Product management interface
- Order management system
- User management
- Analytics and reporting

### 🎨 Modern UI/UX
- Built with Tailwind CSS
- Responsive design
- Smooth animations with Framer Motion
- Loading states and error handling
- Mobile-first approach

## Tech Stack

- **Frontend**: React 18, Vite, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT
- **Image Storage**: Cloudinary
- **Payment**: Razorpay (Indian Gateway)

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB
- Cloudinary Account
- Razorpay Account (for Indian payments)

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm run install-all
   ```

3. Set up environment variables:
   - Create `.env` files in both `backend` and `frontend` directories
   - Fill in your configuration values (see Environment Variables section below)

4. Start the development server:
   ```bash
   npm run dev
   ```

The application will be available at:
- Frontend: http://localhost:5173
- Backend: http://localhost:5000

## Environment Variables

### Backend (.env)
```
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/kommercen
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:5000/api
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
```

## Project Structure

```
kommercen/
├── backend/
│   ├── middleware/
│   │   ├── auth.js
│   │   └── validation.js
│   ├── models/
│   │   ├── Order.js
│   │   ├── Product.js
│   │   └── User.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── orders.js
│   │   ├── products.js
│   │   ├── razorpay.js
│   │   ├── upload.js
│   │   └── users.js
│   ├── scripts/
│   │   └── createUser.js
│   ├── utils/
│   │   └── cloudinary.js
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── auth/
│   │   │   ├── layout/
│   │   │   ├── payments/
│   │   │   ├── products/
│   │   │   └── ui/
│   │   ├── pages/
│   │   │   ├── admin/
│   │   │   └── [various pages]
│   │   ├── context/
│   │   ├── utils/
│   │   └── App.jsx
│   ├── dist/
│   ├── vercel.json
│   └── package.json
├── package.json
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB Atlas account
- Cloudinary account
- Razorpay account

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/saurav-kumar-sah-dev/Kommercen.git
   cd Kommercen
   ```

2. **Install dependencies**
   ```bash
   npm run install-all
   ```

3. **Set up environment variables**
   - Create `.env` files in both `backend` and `frontend` directories
   - Fill in your configuration values (see Environment Variables section below)

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Access the application**
   - Frontend: http://localhost:5173
   - Backend: http://localhost:5000

## 🌐 Deployment

This project is optimized for deployment on:
- **Frontend**: Vercel (configured with `vercel.json`)
- **Backend**: Render or any Node.js hosting platform
- **Database**: MongoDB Atlas

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [React](https://reactjs.org/) for the amazing frontend framework
- [Express.js](https://expressjs.com/) for the robust backend framework
- [MongoDB](https://www.mongodb.com/) for the flexible database
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Razorpay](https://razorpay.com/) for payment processing
- [Cloudinary](https://cloudinary.com/) for image management

## 📞 Support

If you have any questions or need help, please:
- Open an issue on GitHub
- Contact us at [saurav-kumar-sah-dev@github.com](mailto:saurav-kumar-sah-dev@github.com)

---

⭐ **Star this repository if you found it helpful!**
