import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { FiMapPin, FiTruck, FiLock, FiArrowLeft, FiCreditCard } from 'react-icons/fi'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { razorpayAPI, ordersAPI } from '../utils/api'
import RazorpayCheckout from '../components/payments/RazorpayCheckout'
import toast from 'react-hot-toast'
import LoadingSpinner from '../components/ui/LoadingSpinner'

const Checkout = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { items, totalPrice, clearCart } = useCart()
  const { user } = useAuth()
  const [orderData, setOrderData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [shippingAddress, setShippingAddress] = useState({
    name: user?.name || '',
    email: user?.email || '',
    street: user?.address?.street || '',
    city: user?.address?.city || '',
    state: user?.address?.state || '',
    zipCode: user?.address?.zipCode || '',
    country: user?.address?.country || 'India',
    phone: user?.phone || ''
  })
  const [billingAddress, setBillingAddress] = useState({
    name: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'India',
    phone: ''
  })
  const [useSameAddress, setUseSameAddress] = useState(true)
  const [paymentMethod, setPaymentMethod] = useState('online') // 'online' | 'cod'

  const selectedProductIds = location.state?.selectedProductIds || items.map(i => i.product._id)
  const selectedItems = items.filter(i => selectedProductIds.includes(i.product._id))

  useEffect(() => {
    if (selectedItems.length === 0) {
      navigate('/cart')
    }
  }, [selectedItems, navigate])

  useEffect(() => {
    if (useSameAddress) {
      setBillingAddress(shippingAddress)
    }
  }, [useSameAddress, shippingAddress])

  const handleCreatePaymentIntent = async () => {
    if (!shippingAddress.name || !shippingAddress.street || !shippingAddress.city) {
      toast.error('Please fill in all required shipping address fields')
      return
    }

    setIsLoading(true)
    try {
      if (paymentMethod === 'cod') {
        // Create order directly as COD
        const orderItemsForCod = selectedItems.map(item => ({
          product: item.product._id,
          quantity: item.quantity
        }))
        const res = await ordersAPI.createOrder({
          items: orderItemsForCod,
          shippingAddress,
          billingAddress: useSameAddress ? shippingAddress : billingAddress,
          paymentMethod: { type: 'cash_on_delivery' }
        })
        clearCart()
        navigate(`/orders/${res.data.order._id}`, {
          state: { message: 'Order placed successfully with Cash on Delivery!' }
        })
      } else {
        const orderItems = selectedItems.map(item => ({
          productId: item.product._id,
          quantity: item.quantity
        }))

        const response = await razorpayAPI.createOrder({
          items: orderItems,
          shippingAddress
        })

        setOrderData({
          ...response.data,
          items: orderItems,
          shippingAddress,
          billingAddress: useSameAddress ? shippingAddress : billingAddress
        })
      }
    } catch (error) {
      // Error creating payment order
      toast.error(error?.response?.data?.message || 'Failed to initialize checkout. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleOrderSuccess = (order) => {
    clearCart()
    navigate(`/orders/${order._id}`, { 
      state: { message: 'Order placed successfully!' }
    })
  }

  if (selectedItems.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
          <button
            onClick={() => navigate('/products')}
            className="btn-primary"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    )
  }

  return (
    <>
      <Helmet>
        <title>Checkout - Kommercen</title>
      </Helmet>

      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container-custom">
          <div className="mb-6">
            <button
              onClick={() => navigate('/cart')}
              className="flex items-center text-gray-600 hover:text-blue-600 transition-colors"
            >
              <FiArrowLeft className="mr-2" />
              Back to Cart
            </button>
            <h1 className="text-3xl font-bold mt-4">Checkout</h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Forms */}
            <div className="space-y-6">
              {/* Shipping Address */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
              >
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <FiMapPin className="mr-2" />
                  Shipping Address
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={shippingAddress.name}
                      onChange={(e) => setShippingAddress({...shippingAddress, name: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      value={shippingAddress.email}
                      onChange={(e) => setShippingAddress({...shippingAddress, email: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Street Address *
                    </label>
                    <input
                      type="text"
                      value={shippingAddress.street}
                      onChange={(e) => setShippingAddress({...shippingAddress, street: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      value={shippingAddress.city}
                      onChange={(e) => setShippingAddress({...shippingAddress, city: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      State *
                    </label>
                    <input
                      type="text"
                      value={shippingAddress.state}
                      onChange={(e) => setShippingAddress({...shippingAddress, state: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      PIN Code *
                    </label>
                    <input
                      type="text"
                      value={shippingAddress.zipCode}
                      onChange={(e) => setShippingAddress({...shippingAddress, zipCode: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={shippingAddress.phone}
                      onChange={(e) => setShippingAddress({...shippingAddress, phone: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </motion.div>

              {/* Billing Address */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold flex items-center">
                    <FiCreditCard className="mr-2" />
                    Billing Address
                  </h2>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={useSameAddress}
                      onChange={(e) => setUseSameAddress(e.target.checked)}
                      className="mr-2"
                    />
                    Same as shipping
                  </label>
                </div>

                {!useSameAddress && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={billingAddress.name}
                        onChange={(e) => setBillingAddress({...billingAddress, name: e.target.value})}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Street Address
                      </label>
                      <input
                        type="text"
                        value={billingAddress.street}
                        onChange={(e) => setBillingAddress({...billingAddress, street: e.target.value})}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        City
                      </label>
                      <input
                        type="text"
                        value={billingAddress.city}
                        onChange={(e) => setBillingAddress({...billingAddress, city: e.target.value})}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        State
                      </label>
                      <input
                        type="text"
                        value={billingAddress.state}
                        onChange={(e) => setBillingAddress({...billingAddress, state: e.target.value})}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        PIN Code
                      </label>
                      <input
                        type="text"
                        value={billingAddress.zipCode}
                        onChange={(e) => setBillingAddress({...billingAddress, zipCode: e.target.value})}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone
                      </label>
                      <input
                        type="tel"
                        value={billingAddress.phone}
                        onChange={(e) => setBillingAddress({...billingAddress, phone: e.target.value})}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                )}
              </motion.div>

              {/* Payment Section */}
              {orderData && paymentMethod === 'online' ? (
                <RazorpayCheckout orderData={orderData} onSuccess={handleOrderSuccess} />
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
                >
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Payment Method</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <label className={`border rounded-lg p-4 cursor-pointer ${paymentMethod === 'online' ? 'ring-2 ring-blue-500 border-blue-200' : 'border-gray-200'}`}>
                        <input
                          type="radio"
                          name="payment"
                          className="mr-2"
                          checked={paymentMethod === 'online'}
                          onChange={() => setPaymentMethod('online')}
                        />
                        Online (Razorpay)
                        <p className="text-sm text-gray-500 mt-1">UPI, Cards, Net Banking, Wallets</p>
                      </label>
                      <label className={`border rounded-lg p-4 cursor-pointer ${paymentMethod === 'cod' ? 'ring-2 ring-blue-500 border-blue-200' : 'border-gray-200'}`}>
                        <input
                          type="radio"
                          name="payment"
                          className="mr-2"
                          checked={paymentMethod === 'cod'}
                          onChange={() => setPaymentMethod('cod')}
                        />
                        Cash on Delivery
                        <p className="text-sm text-gray-500 mt-1">Pay with cash upon delivery</p>
                      </label>
                    </div>

                    <div className="pt-2">
                      <button
                        onClick={handleCreatePaymentIntent}
                        disabled={isLoading}
                        className="btn-primary w-full"
                      >
                        {isLoading ? (
                          <div className="flex items-center justify-center">
                            <LoadingSpinner size="sm" />
                            <span className="ml-2">{paymentMethod === 'cod' ? 'Placing Order...' : 'Preparing Payment...'}</span>
                          </div>
                        ) : (
                          paymentMethod === 'cod' ? 'Place Order (COD)' : 'Continue to Payment'
                        )}
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Right Column - Order Summary */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-6"
            >
              {/* Order Summary */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 sticky top-8">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <FiTruck className="mr-2" />
                  Order Summary
                </h2>

                <div className="space-y-4">
                  {selectedItems.map((item) => (
                    <div key={item.product._id} className="flex items-center space-x-4">
                      <img
                        src={item.product.images[0]?.url || '/api/placeholder/80/80'}
                        alt={item.product.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{item.product.name}</h4>
                        <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">₹{(item.product.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4 mt-4 space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹{selectedItems.reduce((s,i)=>s+i.product.price*i.quantity,0).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>{selectedItems.reduce((s,i)=>s+i.product.price*i.quantity,0) > 100 ? 'Free' : '₹10.00'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>GST (18%)</span>
                    <span>₹{(selectedItems.reduce((s,i)=>s+i.product.price*i.quantity,0) * 0.18).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-semibold text-lg border-t pt-2">
                    <span>Total</span>
                    <span>₹{(() => { const sub = selectedItems.reduce((s,i)=>s+i.product.price*i.quantity,0); return (sub + (sub > 100 ? 0 : 10) + (sub * 0.18)).toFixed(2) })()}</span>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">Payment Methods</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm text-blue-800">
                    <div>✓ UPI (PhonePe, GPay)</div>
                    <div>✓ Credit/Debit Cards</div>
                    <div>✓ Net Banking</div>
                    <div>✓ Digital Wallets</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Checkout