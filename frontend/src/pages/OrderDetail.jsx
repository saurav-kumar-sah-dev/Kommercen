import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { useQuery } from 'react-query'
import { 
  FiArrowLeft, 
  FiPackage, 
  FiTruck, 
  FiCheckCircle, 
  FiClock, 
  FiXCircle, 
  FiRefreshCw,
  FiMapPin,
  FiCreditCard,
  FiDownload,
  FiPrinter
} from 'react-icons/fi'
import { useAuth } from '../context/AuthContext'
import { ordersAPI } from '../utils/api'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import toast from 'react-hot-toast'

const OrderDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { isAuthenticated, user } = useAuth()
  const [isPrinting, setIsPrinting] = useState(false)

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login')
    }
  }, [isAuthenticated, navigate])

  // Fetch order details
  const { data: orderData, isLoading, error, refetch } = useQuery(
    ['order', id],
    () => ordersAPI.getOrder(id),
    {
      enabled: isAuthenticated && !!id,
      retry: 1
    }
  )

  const order = orderData?.data?.order

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <FiClock className="w-6 h-6 text-yellow-600" />
      case 'confirmed':
        return <FiCheckCircle className="w-6 h-6 text-blue-600" />
      case 'processing':
        return <FiRefreshCw className="w-6 h-6 text-blue-600" />
      case 'shipped':
        return <FiTruck className="w-6 h-6 text-purple-600" />
      case 'delivered':
        return <FiCheckCircle className="w-6 h-6 text-green-600" />
      case 'cancelled':
        return <FiXCircle className="w-6 h-6 text-red-600" />
      case 'returned':
        return <FiRefreshCw className="w-6 h-6 text-orange-600" />
      default:
        return <FiPackage className="w-6 h-6 text-gray-600" />
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'confirmed':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'processing':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'shipped':
        return 'bg-purple-100 text-purple-800 border-purple-200'
      case 'delivered':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200'
      case 'returned':
        return 'bg-orange-100 text-orange-800 border-orange-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getPaymentStatusColor = (status) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'failed':
        return 'bg-red-100 text-red-800'
      case 'refunded':
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const handlePrint = () => {
    setIsPrinting(true)
    setTimeout(() => {
      window.print()
      setIsPrinting(false)
    }, 1000)
  }

  const handleDownloadInvoice = () => {
    toast.success('Invoice download feature coming soon!')
  }

  const handleCancel = async () => {
    const reason = window.prompt('Reason for cancellation (optional):') || ''
    try {
      await ordersAPI.cancelOrder(order._id, reason)
      toast.success('Order cancelled or request submitted')
      refetch()
    } catch (e) {
      toast.error(e?.response?.data?.message || 'Failed to cancel order')
    }
  }

  const handleRefund = async () => {
    const defaultAmount = order.total
    const amountStr = window.prompt('Refund amount (leave blank for full amount):', String(defaultAmount))
    if (amountStr === null) return
    const amount = amountStr.trim() === '' ? undefined : Number(amountStr)
    const reason = window.prompt('Reason for refund (optional):') || ''
    try {
      await ordersAPI.requestRefund(order._id, amount, reason)
      toast.success('Refund request submitted')
      refetch()
    } catch (e) {
      toast.error(e?.response?.data?.message || 'Failed to request refund')
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  if (error || !order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Order not found</h2>
          <p className="text-gray-600 mb-4">The order you're looking for doesn't exist or you don't have permission to view it.</p>
          <Link to="/orders" className="btn-primary">
            Back to Orders
          </Link>
        </div>
      </div>
    )
  }

  return (
    <>
      <Helmet>
        <title>Order #{order.orderNumber} - Kommercen</title>
      </Helmet>

      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <button
                onClick={() => navigate('/orders')}
                className="flex items-center text-gray-600 hover:text-blue-600 transition-colors mb-4"
              >
                <FiArrowLeft className="mr-2" />
                Back to Orders
              </button>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Order #{order.orderNumber}</h1>
                  <p className="text-gray-600 mt-2">Placed on {formatDate(order.createdAt)}</p>
                </div>
                <div className="flex items-center space-x-3 mt-4 sm:mt-0">
                  <button
                    onClick={handlePrint}
                    disabled={isPrinting}
                    className="flex items-center btn-outline text-sm"
                  >
                    <FiPrinter className="mr-2" />
                    {isPrinting ? 'Printing...' : 'Print'}
                  </button>
                  <button
                    onClick={handleDownloadInvoice}
                    className="flex items-center btn-outline text-sm"
                  >
                    <FiDownload className="mr-2" />
                    Invoice
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6">
                {/* Order Status */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
                >
                  <h2 className="text-xl font-semibold mb-4">Order Status</h2>
                  <div className="flex items-center space-x-4">
                    {getStatusIcon(order.status)}
                    <div>
                      <span className={`px-4 py-2 rounded-full text-sm font-medium border ${getStatusColor(order.status)}`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                      {(order.cancellationRequested || order.refundRequested) && (
                        <div className="mt-2 flex items-center gap-2">
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
                      )}
                      <p className="text-sm text-gray-600 mt-1">
                        {order.status === 'pending' && 'Your order is being processed'}
                        {order.status === 'confirmed' && 'Your order has been confirmed'}
                        {order.status === 'processing' && 'Your order is being prepared'}
                        {order.status === 'shipped' && 'Your order is on its way'}
                        {order.status === 'delivered' && 'Your order has been delivered'}
                        {order.status === 'cancelled' && 'Your order has been cancelled'}
                        {order.status === 'returned' && 'Your order has been returned'}
                      </p>
                    </div>
                  </div>

                  {order.trackingNumber && (
                    <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <h3 className="font-semibold text-blue-900 mb-2">Tracking Information</h3>
                      <p className="text-blue-800">
                        <strong>Tracking Number:</strong> {order.trackingNumber}
                      </p>
                      {order.estimatedDelivery && (
                        <p className="text-blue-800 mt-1">
                          <strong>Estimated Delivery:</strong> {formatDate(order.estimatedDelivery)}
                        </p>
                      )}
                    </div>
                  )}
                </motion.div>

                {/* Order Items */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
                >
                  <h2 className="text-xl font-semibold mb-4">Order Items</h2>
                  <div className="space-y-4">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
                        <img
                          src={item.image || '/api/placeholder/80/80'}
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{item.name}</h3>
                          <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                          <p className="text-sm text-gray-600">Price: ₹{item.price.toFixed(2)} each</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">
                            ₹{(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Shipping Address */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
                >
                  <h2 className="text-xl font-semibold mb-4 flex items-center">
                    <FiMapPin className="mr-2" />
                    Shipping Address
                  </h2>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="font-semibold text-gray-900">{order.shippingAddress.name}</p>
                    <p className="text-gray-700">{order.shippingAddress.street}</p>
                    <p className="text-gray-700">
                      {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
                    </p>
                    <p className="text-gray-700">{order.shippingAddress.country}</p>
                    {order.shippingAddress.phone && (
                      <p className="text-gray-700 mt-2">Phone: {order.shippingAddress.phone}</p>
                    )}
                  </div>
                </motion.div>

                {/* Payment Information */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
                >
                  <h2 className="text-xl font-semibold mb-4 flex items-center">
                    <FiCreditCard className="mr-2" />
                    Payment Information
                  </h2>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Payment Method</span>
                      <span className="font-medium capitalize">
                        {order.paymentMethod?.type || 'Razorpay'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Payment Status</span>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPaymentStatusColor(order.paymentStatus)}`}>
                        {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
                      </span>
                    </div>
                    {order.paymentIntentId && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Transaction ID</span>
                        <span className="font-medium text-sm">{order.paymentIntentId}</span>
                      </div>
                    )}
                  </div>
                </motion.div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Order Summary */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 sticky top-8"
                >
                  <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-medium">₹{order.subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Shipping</span>
                      <span className="font-medium">
                        {order.shipping === 0 ? (
                          <span className="text-green-600">Free</span>
                        ) : (
                          `₹${order.shipping.toFixed(2)}`
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">GST (18%)</span>
                      <span className="font-medium">₹{order.tax.toFixed(2)}</span>
                    </div>
                    {order.discount > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>Discount</span>
                        <span className="font-medium">-₹{order.discount.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="border-t pt-3">
                      <div className="flex justify-between text-lg font-semibold">
                        <span>Total</span>
                        <span>₹{order.total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-6 space-y-3">
                    {order.status === 'delivered' && (
                      <button className="w-full btn-primary">
                        Reorder Items
                      </button>
                    )}
                    
                    {(order.status === 'pending' || order.status === 'confirmed' || order.status === 'processing') && (
                      <button onClick={handleCancel} className="w-full btn-outline text-red-600 border-red-300 hover:bg-red-50">
                        Cancel Order
                      </button>
                    )}

                    {order.paymentStatus === 'paid' && (
                      <button onClick={handleRefund} className="w-full btn-outline">
                        Request Refund
                      </button>
                    )}

                    <Link
                      to="/products"
                      className="w-full btn-outline text-center block"
                    >
                      Continue Shopping
                    </Link>
                  </div>
                </motion.div>

                {/* Customer Support */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="bg-blue-50 p-6 rounded-lg border border-blue-200"
                >
                  <h3 className="text-lg font-semibold text-blue-900 mb-2">Need Help?</h3>
                  <p className="text-blue-800 text-sm mb-4">
                    If you have any questions about your order, our customer support team is here to help.
                  </p>
                  <div className="space-y-2 text-sm text-blue-800">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
                      <span>Email: sauravshubham903@gmail.com</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
                      <span>Phone: +91 (Available on request)</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
                      <span>Available 24/7</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default OrderDetail
