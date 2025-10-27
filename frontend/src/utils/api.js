import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

// Debug: Log the API URL being used
console.log('🔗 Frontend API URL:', API_URL)
console.log('🌍 Environment:', import.meta.env.MODE)
console.log('🕐 Cache bust timestamp:', new Date().toISOString())

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
})

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// Auth API
export const authAPI = {
  login: (email, password) => {
    console.log('🔐 Attempting login to:', `${API_URL}/auth/login`)
    return api.post('/auth/login', { email, password })
  },
  register: (name, email, password) => {
    console.log('📝 Attempting register to:', `${API_URL}/auth/register`)
    return api.post('/auth/register', { name, email, password })
  },
  getProfile: () => api.get('/auth/me'),
  updateProfile: (data) => api.put('/auth/profile', data),
  changePassword: (currentPassword, newPassword) => 
    api.put('/auth/change-password', { currentPassword, newPassword }),
}

// Products API
export const productsAPI = {
  getProducts: (params = {}) => api.get('/products', { params }),
  getProduct: (id) => api.get(`/products/${id}`),
  createProduct: (data) => api.post('/products', data),
  updateProduct: (id, data) => api.put(`/products/${id}`, data),
  deleteProduct: (id) => api.delete(`/products/${id}`),
  addReview: (id, data) => api.post(`/products/${id}/reviews`, data),
  getCategories: () => api.get('/products/categories/list'),
}

// Cart API
export const cartAPI = {
  getCart: () => api.get('/users/cart'),
  addToCart: (productId, quantity) => api.post('/users/cart', { productId, quantity }),
  updateCartItem: (productId, quantity) => api.put(`/users/cart/${productId}`, { quantity }),
  removeFromCart: (productId) => api.delete(`/users/cart/${productId}`),
  clearCart: () => api.delete('/users/cart'),
}

// Wishlist API
export const wishlistAPI = {
  getWishlist: () => api.get('/users/wishlist'),
  addToWishlist: (productId) => api.post('/users/wishlist', { productId }),
  removeFromWishlist: (productId) => api.delete(`/users/wishlist/${productId}`),
}

// Orders API
export const ordersAPI = {
  getOrders: (params = {}) => api.get('/orders', { params }),
  getOrder: (id) => api.get(`/orders/${id}`),
  createOrder: (data) => api.post('/orders', data),
  updateOrderStatus: (id, data) => api.put(`/orders/${id}/status`, data),
  updatePaymentStatus: (id, data) => api.put(`/orders/${id}/payment-status`, data),
  getOrderStats: () => api.get('/orders/stats/summary'),
}

// Upload API
export const uploadAPI = {
  uploadSingle: (formData) => api.post('/upload/single', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  uploadMultiple: (formData) => api.post('/upload/multiple', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  deleteImage: (publicId) => api.delete(`/upload/${publicId}`),
}

// Razorpay API (Indian payment gateway)
export const razorpayAPI = {
  createOrder: (data) => api.post('/razorpay/create-order', data),
  verifyPayment: (data) => api.post('/razorpay/verify-payment', data),
  getConfig: () => api.get('/razorpay/config'),
  processRefund: (data) => api.post('/razorpay/refund', data),
}

export default api