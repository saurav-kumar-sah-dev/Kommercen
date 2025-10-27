@echo off
echo 🚀 Setting up Kommercen E-commerce Application...

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js v16 or higher.
    pause
    exit /b 1
)

REM Check if MongoDB is installed
mongod --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ MongoDB is not installed. Please install MongoDB.
    pause
    exit /b 1
)

echo ✅ Prerequisites check passed!

REM Install dependencies
echo 📦 Installing dependencies...
call npm run install-all

REM Create backend .env file if it doesn't exist
if not exist "backend\.env" (
    echo 📝 Creating backend .env file...
    (
        echo NODE_ENV=development
        echo PORT=5000
        echo MONGODB_URI=mongodb://localhost:27017/kommercen
        echo JWT_SECRET=CHANGE_THIS_TO_A_SECURE_RANDOM_STRING_IN_PRODUCTION
        echo CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name_here
        echo CLOUDINARY_API_KEY=your_cloudinary_api_key_here
        echo CLOUDINARY_API_SECRET=your_cloudinary_api_secret_here
        echo RAZORPAY_KEY_ID=your_razorpay_key_id_here
        echo RAZORPAY_KEY_SECRET=your_razorpay_key_secret_here
        echo FRONTEND_URL=http://localhost:5173
    ) > backend\.env
    echo ✅ Backend .env file created!
    echo ⚠️  IMPORTANT: Update the API keys in backend\.env with your actual credentials!
) else (
    echo ✅ Backend .env file already exists!
)

REM Create frontend .env file if it doesn't exist
if not exist "frontend\.env" (
    echo 📝 Creating frontend .env file...
    (
        echo VITE_API_URL=http://localhost:5000/api
        echo VITE_RAZORPAY_KEY_ID=your_razorpay_key_id_here
    ) > frontend\.env
    echo ✅ Frontend .env file created!
    echo ⚠️  IMPORTANT: Update the Razorpay key in frontend\.env with your actual key!
) else (
    echo ✅ Frontend .env file already exists!
)

echo.
echo 🎉 Setup completed successfully!
echo.
echo Next steps:
echo 1. Make sure MongoDB is running
echo 2. Update your API keys in the .env files (Cloudinary, Razorpay)
echo 3. Run 'npm run dev' to start the development servers
echo.
echo 📚 For detailed setup instructions, see SETUP.md
echo.
echo 🌐 Application will be available at:
echo    Frontend: http://localhost:5173
echo    Backend:  http://localhost:5000
pause
