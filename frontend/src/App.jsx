import { Routes, Route } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

// Layout Components
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

// Page Components
import Home from '@/pages/Home'
import Products from '@/pages/Products'
import ProductDetail from '@/pages/ProductDetail'
import Cart from '@/pages/Cart'
import Checkout from '@/pages/Checkout'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Profile from '@/pages/Profile'
import Orders from '@/pages/Orders'
import OrderDetail from '@/pages/OrderDetail'
import AdminDashboard from '@/pages/admin/Dashboard'
import AdminProducts from '@/pages/admin/Products'
import AdminOrders from '@/pages/admin/Orders'
import AdminUsers from '@/pages/admin/Users'
import Terms from '@/pages/Terms'
import Privacy from '@/pages/Privacy'
import CookiePolicy from '@/pages/CookiePolicy'
import NotFound from '@/pages/NotFound'

// Protected Route Component
import ProtectedRoute from '@/components/auth/ProtectedRoute'
import AdminRoute from '@/components/auth/AdminRoute'

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Kommercen - Your Marketplace, Simplified</title>
        <meta name="description" content="Discover amazing products at great prices on Kommercen" />
      </Helmet>
      
      <Navbar />
      
      <main className="flex-grow">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/cookies" element={<CookiePolicy />} />
          
          {/* Protected Routes */}
          <Route path="/cart" element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          } />
          <Route path="/checkout" element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />
          <Route path="/orders" element={
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          } />
          <Route path="/orders/:id" element={
            <ProtectedRoute>
              <OrderDetail />
            </ProtectedRoute>
          } />
          
          {/* Admin Routes */}
          <Route path="/admin" element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          } />
          <Route path="/admin/products" element={
            <AdminRoute>
              <AdminProducts />
            </AdminRoute>
          } />
          <Route path="/admin/orders" element={
            <AdminRoute>
              <AdminOrders />
            </AdminRoute>
          } />
          <Route path="/admin/users" element={
            <AdminRoute>
              <AdminUsers />
            </AdminRoute>
          } />
          
          {/* 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      
      <Footer />
    </div>
  )
}

export default App
