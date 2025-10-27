# Kommercen Deployment Guide

## 🚀 Recommended: Vercel + Render Deployment

This guide will help you deploy your Kommercen e-commerce application using:
- **Frontend**: Vercel (React/Vite)
- **Backend**: Render (Node.js/Express)
- **Database**: MongoDB Atlas

## Prerequisites

1. **GitHub Repository**: Push your code to GitHub
2. **MongoDB Atlas Account**: [Sign up here](https://www.mongodb.com/atlas)
3. **Vercel Account**: [Sign up here](https://vercel.com)
4. **Render Account**: [Sign up here](https://render.com)
5. **Cloudinary Account**: [Sign up here](https://cloudinary.com)
6. **Razorpay Account**: [Sign up here](https://razorpay.com)

## Step 1: Database Setup (MongoDB Atlas)

1. **Create MongoDB Atlas Cluster**:
   - Go to [MongoDB Atlas](https://cloud.mongodb.com)
   - Create a new cluster (choose FREE tier)
   - Create a database user
   - Whitelist your IP (or use 0.0.0.0/0 for all IPs)

2. **Get Connection String**:
   ```
   mongodb+srv://username:password@cluster.mongodb.net/kommercen?retryWrites=true&w=majority
   ```

## Step 2: Backend Deployment (Render)

### 2.1 Prepare Backend for Production

Create these files in your `backend` directory:

**backend/package.json** (update scripts):
```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
       "build": "echo 'No build step required for Node.js'"
  }
}
```

**backend/render.yaml** (optional):
```yaml
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
```

### 2.2 Deploy to Render

1. **Connect GitHub**:
   - Go to [Render Dashboard](https://dashboard.render.com)
   - Click "New +" → "Web Service"
   - Connect your GitHub repository

2. **Configure Service**:
   - **Name**: `kommercen-backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Root Directory**: `backend`

3. **Environment Variables**:
   ```
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
   ```

4. **Deploy**: Click "Create Web Service"

## Step 3: Frontend Deployment (Vercel)

### 3.1 Prepare Frontend for Production

**frontend/package.json** (verify build script):
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

**frontend/vercel.json** (optional):
```json
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
```

### 3.2 Deploy to Vercel

1. **Connect GitHub**:
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import your GitHub repository

2. **Configure Project**:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

3. **Environment Variables**:
   ```
   VITE_API_URL=https://your-backend-name.onrender.com/api
   VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
   ```

4. **Deploy**: Click "Deploy"

## Step 4: Update CORS Configuration

Update your backend CORS settings to allow your Vercel domain:

**backend/server.js**:
```javascript
app.use(cors({
  origin: process.env.NODE_ENV === 'production'
    ? [process.env.FRONTEND_URL, 'https://your-app.vercel.app']
    : ['http://localhost:5173', 'http://localhost:5174'],
  credentials: true
}));
```

## Step 5: Domain Configuration (Optional)

### Custom Domain on Vercel:
1. Go to your Vercel project settings
2. Add your custom domain
3. Update DNS records as instructed

### Custom Domain on Render:
1. Go to your Render service settings
2. Add custom domain
3. Update DNS records

## Step 6: Environment Variables Checklist

### Backend (Render):
- [ ] `NODE_ENV=production`
- [ ] `PORT=10000`
- [ ] `MONGODB_URI` (MongoDB Atlas connection string)
- [ ] `JWT_SECRET` (strong secret key)
- [ ] `CLOUDINARY_CLOUD_NAME`
- [ ] `CLOUDINARY_API_KEY`
- [ ] `CLOUDINARY_API_SECRET`
- [ ] `RAZORPAY_KEY_ID`
- [ ] `RAZORPAY_KEY_SECRET`
- [ ] `FRONTEND_URL` (your Vercel app URL)

### Frontend (Vercel):
- [ ] `VITE_API_URL` (your Render backend URL)
- [ ] `VITE_RAZORPAY_KEY_ID`

## Step 7: Testing Your Deployment

1. **Test Backend**: Visit `https://your-backend.onrender.com/api/health`
2. **Test Frontend**: Visit your Vercel app URL
3. **Test Full Flow**: Register, login, add products to cart, checkout

## Troubleshooting

### Common Issues:

1. **CORS Errors**:
   - Check `FRONTEND_URL` in backend environment variables
   - Ensure CORS origin includes your Vercel domain

2. **Database Connection**:
   - Verify MongoDB Atlas connection string
   - Check IP whitelist in MongoDB Atlas

3. **Build Failures**:
   - Check build logs in Render/Vercel
   - Ensure all dependencies are in package.json

4. **Environment Variables**:
   - Double-check all environment variables are set
   - Restart services after adding new variables

## Alternative: Vercel + Vercel (Full Stack)

If you prefer using Vercel for both frontend and backend:

### Backend as Vercel Functions:

1. **Create API Directory**:
   ```
   frontend/
   ├── src/
   ├── api/
   │   ├── auth/
   │   ├── products/
   │   ├── orders/
   │   └── upload/
   ```

2. **Convert Express Routes to Vercel Functions**:
   Each route becomes a separate function file

3. **Deploy Both Together**:
   - Single Vercel project
   - Automatic deployments
   - Serverless scaling

### Pros of Vercel + Vercel:
- Single platform management
- Automatic deployments
- Built-in analytics
- Edge functions for better performance

### Cons of Vercel + Vercel:
- Serverless limitations (cold starts)
- More complex for traditional backend
- Execution time limits
- Higher costs for heavy usage

## Cost Comparison

### Vercel + Render (Recommended):
- **Vercel**: Free tier (100GB bandwidth)
- **Render**: Free tier (750 hours/month)
- **Total**: $0/month for small projects

### Vercel + Vercel:
- **Vercel**: Free tier + usage-based pricing
- **Total**: $0-$20/month depending on usage

## Next Steps After Deployment

1. **Set up monitoring** (Vercel Analytics, Render metrics)
2. **Configure backups** (MongoDB Atlas backups)
3. **Set up CI/CD** (automatic deployments on Git push)
4. **Add error tracking** (Sentry, LogRocket)
5. **Performance optimization** (CDN, caching)

Your Kommercen e-commerce app is now live! 🎉
