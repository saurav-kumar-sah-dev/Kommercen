import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { useQuery } from 'react-query'
import toast from 'react-hot-toast'
import { FiPackage, FiEye, FiTruck, FiCheckCircle, FiClock, FiXCircle, FiRefreshCw } from 'react-icons/fi'
import { useAuth } from '../context/AuthContext'
import { ordersAPI } from '../utils/api'
import LoadingSpinner from '../components/ui/LoadingSpinner'

const Orders = () => {
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const [statusFilter, setStatusFilter] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login')
    }
  }, [isAuthenticated, navigate])

  // Fetch orders
  const { data: ordersData, isLoading, error, refetch } = useQuery(
    ['orders', statusFilter, currentPage],
    () => ordersAPI.getOrders({ 
      status: statusFilter || undefined, 
      page: currentPage,
      limit: 10 
    }),
    {
      enabled: isAuthenticated,
      keepPreviousData: true
    }
  )
  const handleCancel = async (orderId) => {
    const reason = window.prompt('Reason for cancellation (optional):') || ''
    try {
      await ordersAPI.cancelOrder(orderId, reason)
      toast.success('Order cancelled or request submitted')
      refetch()
    } catch (e) {
      toast.error(e?.response?.data?.message || 'Failed to cancel order')
    }
  }

  const handleRefund = async (orderId, total) => {
    const amountStr = window.prompt('Refund amount (leave blank for full amount):', String(total))
    if (amountStr === null) return
    const amount = amountStr.trim() === '' ? undefined : Number(amountStr)
    const reason = window.prompt('Reason for refund (optional):') || ''
    try {
      await ordersAPI.requestRefund(orderId, amount, reason)
      toast.success('Refund request submitted')
      refetch()
    } catch (e) {
      toast.error(e?.response?.data?.message || 'Failed to request refund')
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <FiClock className="w-5 h-5 text-yellow-600" />
      case 'confirmed':
        return <FiCheckCircle className="w-5 h-5 text-blue-600" />
      case 'processing':
        return <FiRefreshCw className="w-5 h-5 text-blue-600" />
      case 'shipped':
        return <FiTruck className="w-5 h-5 text-purple-600" />
      case 'delivered':
        return <FiCheckCircle className="w-5 h-5 text-green-600" />
      case 'cancelled':
        return <FiXCircle className="w-5 h-5 text-red-600" />
      case 'returned':
        return <FiRefreshCw className="w-5 h-5 text-orange-600" />
      default:
        return <FiPackage className="w-5 h-5 text-gray-600" />
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'confirmed':
        return 'bg-blue-100 text-blue-800'
      case 'processing':
        return 'bg-blue-100 text-blue-800'
      case 'shipped':
        return 'bg-purple-100 text-purple-800'
      case 'delivered':
        return 'bg-green-100 text-green-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      case 'returned':
        return 'bg-orange-100 text-orange-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const statusOptions = [
    { value: '', label: 'All Orders' },
    { value: 'pending', label: 'Pending' },
    { value: 'confirmed', label: 'Confirmed' },
    { value: 'processing', label: 'Processing' },
    { value: 'shipped', label: 'Shipped' },
    { value: 'delivered', label: 'Delivered' },
    { value: 'cancelled', label: 'Cancelled' },
    { value: 'returned', label: 'Returned' }
  ]

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Something went wrong</h2>
          <p className="text-gray-600 mb-4">Failed to load your orders</p>
          <button onClick={() => refetch()} className="btn-primary">
            Try Again
          </button>
        </div>
      </div>
    )
  }

  const orders = ordersData?.data?.orders || []
  const pagination = ordersData?.data?.pagination || {}

  if (orders.length === 0) {
    return (
      <>
        <Helmet>
          <title>My Orders - Kommercen</title>
        </Helmet>

        <div className="min-h-screen bg-gray-50 py-8">
          <div className="container-custom">
            <div className="max-w-2xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white p-12 rounded-lg shadow-sm border border-gray-200"
              >
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FiPackage className="w-12 h-12 text-gray-400" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-4">No orders yet</h1>
                <p className="text-gray-600 mb-8">
                  You haven't placed any orders yet. Start shopping to see your orders here!
                </p>
                <Link to="/products" className="btn-primary text-lg px-8 py-3">
                  Start Shopping
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Helmet>
        <title>My Orders - Kommercen</title>
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-6 sm:py-10">
        <div className="container-custom">
          <div className="max-w-6xl mx-auto">
            <div className="mb-8">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">My Orders</h1>
              <p className="text-gray-600 mt-2">Track and manage your orders</p>
            </div>

            {/* Filters */}
            <div className="bg-white p-6 sm:p-7 rounded-2xl shadow-sm border border-gray-100 ring-1 ring-gray-100 mb-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex items-center space-x-4">
                  <label className="text-sm font-medium text-gray-700">Filter by status:</label>
                  <select
                    value={statusFilter}
                    onChange={(e) => {
                      setStatusFilter(e.target.value)
                      setCurrentPage(1)
                    }}
                    className="input-field text-sm"
                  >
                    {statusOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="text-sm text-gray-600">
                  {pagination.totalOrders} order{pagination.totalOrders !== 1 ? 's' : ''} found
                </div>
              </div>
            </div>

            {/* Orders List */}
            <div className="space-y-4">
              {orders.map((order, index) => (
                <motion.div
                  key={order._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white p-6 sm:p-7 rounded-2xl shadow-sm border border-gray-100 ring-1 ring-gray-100"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    {/* Order Info */}
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            Order #{order.orderNumber}
                          </h3>
                          <p className="text-sm text-gray-600">
                            Placed on {formatDate(order.createdAt)}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(order.status)}
                          <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(order.status)}`}>
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </span>
                          {order.cancellationRequested && (
                            <span className="px-2 py-0.5 rounded text-xs font-medium bg-red-50 text-red-700 border border-red-200">
                              Cancellation requested
                            </span>
                          )}
                          {order.refundRequested && (
                            <span className="px-2 py-0.5 rounded text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
                              Refund requested
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Order Items */}
                      <div className="space-y-3">
                        {order.items.slice(0, 3).map((item, itemIndex) => (
                          <div key={itemIndex} className="flex items-center space-x-3">
                            <img
                              src={item.image || '/api/placeholder/60/60'}
                              alt={item.name}
                              className="w-12 h-12 object-cover rounded-xl border border-gray-100"
                            />
                            <div className="flex-1">
                              <h4 className="font-medium text-gray-900">{item.name}</h4>
                              <p className="text-sm text-gray-600">
                                Qty: {item.quantity} × ₹{item.price.toFixed(2)}
                              </p>
                            </div>
                          </div>
                        ))}
                        {order.items.length > 3 && (
                          <p className="text-sm text-gray-600">
                            +{order.items.length - 3} more item{order.items.length - 3 !== 1 ? 's' : ''}
                          </p>
                        )}
                      </div>

                      {/* Order Summary */}
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <div className="flex justify-between items-center">
                          <div className="text-sm text-gray-600">
                            <p>Payment: <span className={`font-medium ${order.paymentStatus === 'paid' ? 'text-green-600' : 'text-yellow-600'}`}>
                              {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
                            </span></p>
                            {order.estimatedDelivery && (
                              <p>Est. Delivery: <span className="font-medium">{formatDate(order.estimatedDelivery)}</span></p>
                            )}
                            {order.trackingNumber && (
                              <p>Tracking: <span className="font-medium">{order.trackingNumber}</span></p>
                            )}
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-semibold text-gray-900">
                              ₹{order.total.toFixed(2)}
                            </p>
                            <p className="text-sm text-gray-600">
                              {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row gap-3 lg:flex-col">
                      <Link
                        to={`/orders/${order._id}`}
                        className="flex items-center justify-center btn-outline text-sm py-2"
                      >
                        <FiEye className="mr-2" />
                        View Details
                      </Link>
                      
                      {order.status === 'delivered' && (
                        <button className="btn-secondary text-sm py-2">
                          Reorder
                        </button>
                      )}
                      
                      {(order.status === 'pending' || order.status === 'confirmed' || order.status === 'processing') && (
                        <button onClick={() => handleCancel(order._id)} className="btn-outline text-red-600 border-red-300 hover:bg-red-50 text-sm py-2">
                          Cancel Order
                        </button>
                      )}

                      {order.paymentStatus === 'paid' && (
                        <button onClick={() => handleRefund(order._id, order.total)} className="btn-outline text-sm py-2">
                          Request Refund
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <div className="mt-8 flex justify-center">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  
                  {[...Array(pagination.totalPages)].map((_, index) => {
                    const page = index + 1
                    const isCurrentPage = page === currentPage
                    const shouldShow = 
                      page === 1 || 
                      page === pagination.totalPages ||
                      Math.abs(page - currentPage) <= 2

                    if (!shouldShow) {
                      if (page === 2 || page === pagination.totalPages - 1) {
                        return <span key={page} className="px-3 py-2 text-gray-500">...</span>
                      }
                      return null
                    }

                    return (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`px-3 py-2 text-sm font-medium rounded-lg ${
                          isCurrentPage
                            ? 'bg-blue-600 text-white'
                            : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        {page}
                      </button>
                    )
                  })}

                  <button
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage === pagination.totalPages}
                    className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}

            {/* Order Status Legend */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-8 bg-white p-6 rounded-lg shadow-sm border border-gray-200"
            >
              <h3 className="text-lg font-semibold mb-4">Order Status Guide</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center space-x-2">
                  <FiClock className="w-4 h-4 text-yellow-600" />
                  <span className="text-sm text-gray-700">Pending</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FiCheckCircle className="w-4 h-4 text-blue-600" />
                  <span className="text-sm text-gray-700">Confirmed</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FiRefreshCw className="w-4 h-4 text-blue-600" />
                  <span className="text-sm text-gray-700">Processing</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FiTruck className="w-4 h-4 text-purple-600" />
                  <span className="text-sm text-gray-700">Shipped</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FiCheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-gray-700">Delivered</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FiXCircle className="w-4 h-4 text-red-600" />
                  <span className="text-sm text-gray-700">Cancelled</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FiRefreshCw className="w-4 h-4 text-orange-600" />
                  <span className="text-sm text-gray-700">Returned</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Orders
