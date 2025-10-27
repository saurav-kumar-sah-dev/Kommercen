#!/bin/bash

# Kommercen Deployment Script
# This script helps prepare your project for deployment

echo "🚀 Kommercen Deployment Preparation Script"
echo "=========================================="

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Please run this script from the project root directory"
    exit 1
fi

echo "✅ Project root directory found"

# Create production environment templates
echo "📝 Creating production environment templates..."

# Backend production env template
cat > backend/.env.production.template << 'EOF'
# Backend Environment Variables for Render
NODE_ENV=production
PORT=10000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/kommercen?retryWrites=true&w=majority
JWT_SECRET=your_super_secure_jwt_secret_key_here_change_this_in_production
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
FRONTEND_URL=https://your-frontend-domain.vercel.app
EOF

# Frontend production env template
cat > frontend/.env.production.template << 'EOF'
# Frontend Environment Variables for Vercel
VITE_API_URL=https://your-backend-name.onrender.com/api
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
EOF

echo "✅ Environment templates created"

# Create Vercel configuration
cat > frontend/vercel.json << 'EOF'
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
EOF

echo "✅ Vercel configuration created"

# Create Render configuration
cat > backend/render.yaml << 'EOF'
services:
  - type: web
    name: kommercen-backend
    env: node
    plan: free
    buildCommand: npm install
    startCommand: npm start
    envVars:
      - key: NODE_ENV
        value: production
      - key: PORT
        value: 10000
EOF

echo "✅ Render configuration created"

# Update package.json scripts for production
echo "📦 Updating package.json scripts..."

# Update backend package.json
if [ -f "backend/package.json" ]; then
    # Add production script if not exists
    if ! grep -q '"build"' backend/package.json; then
        sed -i 's/"start": "node server.js",/"start": "node server.js",\n    "build": "echo '\''No build step required for Node.js'\''",/' backend/package.json
    fi
    echo "✅ Backend package.json updated"
fi

echo ""
echo "🎉 Deployment preparation complete!"
echo ""
echo "Next steps:"
echo "1. Update the environment variables in:"
echo "   - backend/.env.production.template"
echo "   - frontend/.env.production.template"
echo ""
echo "2. Push your code to GitHub"
echo ""
echo "3. Deploy backend to Render:"
echo "   - Go to https://dashboard.render.com"
echo "   - Create new Web Service"
echo "   - Connect your GitHub repo"
echo "   - Set root directory to 'backend'"
echo "   - Add environment variables from backend/.env.production.template"
echo ""
echo "4. Deploy frontend to Vercel:"
echo "   - Go to https://vercel.com/dashboard"
echo "   - Create new project"
echo "   - Connect your GitHub repo"
echo "   - Set root directory to 'frontend'"
echo "   - Add environment variables from frontend/.env.production.template"
echo ""
echo "5. Update CORS settings in backend/server.js with your Vercel domain"
echo ""
echo "📚 See DEPLOYMENT.md for detailed instructions"
