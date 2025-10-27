import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { 
  FiShoppingBag, 
  FiUsers, 
  FiDollarSign, 
  FiTrendingUp,
  FiPackage,
  FiClock,
  FiCheckCircle,
  FiAlertCircle,
  FiEye,
  FiEdit,
  FiTrash2,
  FiPlus
} from 'react-icons/fi'
import { useQuery } from 'react-query'
import { productsAPI, ordersAPI } from '../../utils/api'
import LoadingSpinner from '../../components/ui/LoadingSpinner'
import { Link } from 'react-router-dom'

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    pendingOrders: 0
  })

  const [recentOrders, setRecentOrders] = useState([])
  const [recentProducts, setRecentProducts] = useState([])

  // Fetch dashboard data
  const { data: productsData, isLoading: productsLoading } = useQuery(
    'admin-products',
    () => productsAPI.getProducts({ limit: 100 }),
    {
      onSuccess: (data) => {
        setRecentProducts(data.data.products.slice(0, 5))
        setStats(prev => ({ ...prev, totalProducts: data.data.totalProducts }))
      }
    }
  )

  const { data: ordersData, isLoading: ordersLoading } = useQuery(
    'admin-orders',
    () => ordersAPI.getOrders({ limit: 100 }),
    {
      onSuccess: (data) => {
        const orders = data.data.orders || []
        setRecentOrders(orders.slice(0, 5))
        
        const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0)
        const pendingOrders = orders.filter(order => order.status === 'pending').length
        
        setStats(prev => ({
          ...prev,
          totalOrders: orders.length,
          totalRevenue,
          pendingOrders
        }))
      }
    }
  )

  const statCards = [
    {
      title: 'Total Products',
      value: stats.totalProducts,
      icon: <FiPackage className="w-8 h-8" />,
      color: 'blue',
      change: '+12%',
      changeType: 'positive'
    },
    {
      title: 'Total Orders',
      value: stats.totalOrders,
      icon: <FiShoppingBag className="w-8 h-8" />,
      color: 'green',
      change: '+8%',
      changeType: 'positive'
    },
    {
      title: 'Total Revenue',
      value: `$${stats.totalRevenue.toFixed(2)}`,
      icon: <FiDollarSign className="w-8 h-8" />,
      color: 'purple',
      change: '+15%',
      changeType: 'positive'
    },
    {
      title: 'Pending Orders',
      value: stats.pendingOrders,
      icon: <FiClock className="w-8 h-8" />,
      color: 'orange',
      change: '-5%',
      changeType: 'negative'
    }
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'confirmed': return 'bg-blue-100 text-blue-800'
      case 'processing': return 'bg-purple-100 text-purple-800'
      case 'shipped': return 'bg-indigo-100 text-indigo-800'
      case 'delivered': return 'bg-green-100 text-green-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return <FiClock className="w-4 h-4" />
      case 'confirmed': return <FiCheckCircle className="w-4 h-4" />
      case 'processing': return <FiPackage className="w-4 h-4" />
      case 'shipped': return <FiTrendingUp className="w-4 h-4" />
      case 'delivered': return <FiCheckCircle className="w-4 h-4" />
      case 'cancelled': return <FiAlertCircle className="w-4 h-4" />
      default: return <FiClock className="w-4 h-4" />
    }
  }

  return (
    <>
      <Helmet>
        <title>Admin Dashboard - Kommercen</title>
      </Helmet>

      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container-custom">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600 mt-2">Welcome back! Here's what's happening with your store.</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {statCards.map((card, index) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{card.title}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{card.value}</p>
                    <div className="flex items-center mt-2">
                      <span className={`text-sm font-medium ${
                        card.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {card.change}
                      </span>
                      <span className="text-sm text-gray-500 ml-1">from last month</span>
                    </div>
                  </div>
                  <div className={`p-3 rounded-lg ${
                    card.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                    card.color === 'green' ? 'bg-green-100 text-green-600' :
                    card.color === 'purple' ? 'bg-purple-100 text-purple-600' :
                    'bg-orange-100 text-orange-600'
                  }`}>
                    {card.icon}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Recent Orders */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-lg shadow-sm border border-gray-200"
            >
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900">Recent Orders</h2>
                  <Link
                    to="/admin/orders"
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    View all
                  </Link>
                </div>
              </div>
              
              <div className="p-6">
                {ordersLoading ? (
                  <div className="flex justify-center py-8">
                    <LoadingSpinner />
                  </div>
                ) : recentOrders.length === 0 ? (
                  <div className="text-center py-8">
                    <FiShoppingBag className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">No orders yet</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {recentOrders.map((order) => (
                      <div key={order._id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className={`p-2 rounded-full ${getStatusColor(order.status)}`}>
                            {getStatusIcon(order.status)}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">#{order.orderNumber}</p>
                            <p className="text-sm text-gray-600">{order.user?.name || 'Guest'}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-gray-900">${order.total.toFixed(2)}</p>
                          <p className="text-sm text-gray-600">{order.items.length} items</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>

            {/* Recent Products */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-lg shadow-sm border border-gray-200"
            >
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900">Recent Products</h2>
                  <Link
                    to="/admin/products"
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    View all
                  </Link>
                </div>
              </div>
              
              <div className="p-6">
                {productsLoading ? (
                  <div className="flex justify-center py-8">
                    <LoadingSpinner />
                  </div>
                ) : recentProducts.length === 0 ? (
                  <div className="text-center py-8">
                    <FiPackage className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-4">No products yet</p>
                    <Link
                      to="/admin/products"
                      className="btn-primary inline-flex items-center"
                    >
                      <FiPlus className="w-4 h-4 mr-2" />
                      Add Product
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {recentProducts.map((product) => (
                      <div key={product._id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                        <img
                          src={product.images[0]?.url || '/api/placeholder/60/60'}
                          alt={product.name}
                          className="w-12 h-12 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">{product.name}</p>
                          <p className="text-sm text-gray-600">{product.category}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-gray-900">${product.price.toFixed(2)}</p>
                          <p className="text-sm text-gray-600">Stock: {product.stock}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link
                to="/admin/products"
                className="flex items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
              >
                <FiPlus className="w-6 h-6 text-blue-600 mr-3" />
                <div>
                  <p className="font-medium text-blue-900">Add Product</p>
                  <p className="text-sm text-blue-700">Create a new product</p>
                </div>
              </Link>
              
              <Link
                to="/admin/orders"
                className="flex items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
              >
                <FiEye className="w-6 h-6 text-green-600 mr-3" />
                <div>
                  <p className="font-medium text-green-900">View Orders</p>
                  <p className="text-sm text-green-700">Manage all orders</p>
                </div>
              </Link>
              
              <Link
                to="/admin/users"
                className="flex items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
              >
                <FiUsers className="w-6 h-6 text-purple-600 mr-3" />
                <div>
                  <p className="font-medium text-purple-900">Manage Users</p>
                  <p className="text-sm text-purple-700">View user accounts</p>
                </div>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  )
}

export default AdminDashboard