@echo off
REM Kommercen Deployment Script for Windows
REM This script helps prepare your project for deployment

echo 🚀 Kommercen Deployment Preparation Script
echo ==========================================

REM Check if we're in the right directory
if not exist "package.json" (
    echo ❌ Error: Please run this script from the project root directory
    pause
    exit /b 1
)

echo ✅ Project root directory found

REM Create production environment templates
echo 📝 Creating production environment templates...

REM Backend production env template
(
echo # Backend Environment Variables for Render
echo NODE_ENV=production
echo PORT=10000
echo MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/kommercen?retryWrites=true^&w=majority
echo JWT_SECRET=your_super_secure_jwt_secret_key_here_change_this_in_production
echo CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
echo CLOUDINARY_API_KEY=your_cloudinary_api_key
echo CLOUDINARY_API_SECRET=your_cloudinary_api_secret
echo RAZORPAY_KEY_ID=your_razorpay_key_id
echo RAZORPAY_KEY_SECRET=your_razorpay_key_secret
echo FRONTEND_URL=https://your-frontend-domain.vercel.app
) > backend\.env.production.template

REM Frontend production env template
(
echo # Frontend Environment Variables for Vercel
echo VITE_API_URL=https://your-backend-name.onrender.com/api
echo VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
) > frontend\.env.production.template

echo ✅ Environment templates created

REM Create Vercel configuration
(
echo {
echo   "buildCommand": "npm run build",
echo   "outputDirectory": "dist",
echo   "framework": "vite",
echo   "rewrites": [
echo     {
echo       "source": "/(.*)",
echo       "destination": "/index.html"
echo     }
echo   ]
echo }
) > frontend\vercel.json

echo ✅ Vercel configuration created

REM Create Render configuration
(
echo services:
echo   - type: web
echo     name: kommercen-backend
echo     env: node
echo     plan: free
echo     buildCommand: npm install
echo     startCommand: npm start
echo     envVars:
echo       - key: NODE_ENV
echo         value: production
echo       - key: PORT
echo         value: 10000
) > backend\render.yaml

echo ✅ Render configuration created

echo.
echo 🎉 Deployment preparation complete!
echo.
echo Next steps:
echo 1. Update the environment variables in:
echo    - backend\.env.production.template
echo    - frontend\.env.production.template
echo.
echo 2. Push your code to GitHub
echo.
echo 3. Deploy backend to Render:
echo    - Go to https://dashboard.render.com
echo    - Create new Web Service
echo    - Connect your GitHub repo
echo    - Set root directory to 'backend'
echo    - Add environment variables from backend\.env.production.template
echo.
echo 4. Deploy frontend to Vercel:
echo    - Go to https://vercel.com/dashboard
echo    - Create new project
echo    - Connect your GitHub repo
echo    - Set root directory to 'frontend'
echo    - Add environment variables from frontend\.env.production.template
echo.
echo 5. Update CORS settings in backend\server.js with your Vercel domain
echo.
echo 📚 See DEPLOYMENT.md for detailed instructions
pause
