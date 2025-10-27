import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { FiShoppingCart, FiPlus, FiMinus, FiTrash2, FiArrowRight, FiHeart } from 'react-icons/fi'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import toast from 'react-hot-toast'

const Cart = () => {
  const { items, totalItems, totalPrice, updateQuantity, removeFromCart, clearCart, loading } = useCart()
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const [isUpdating, setIsUpdating] = useState({})

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login')
    }
  }, [isAuthenticated, navigate])

  const handleQuantityChange = async (productId, newQuantity) => {
    if (newQuantity < 1) return

    setIsUpdating(prev => ({ ...prev, [productId]: true }))
    try {
      await updateQuantity(productId, newQuantity)
    } catch (error) {
      // Error updating quantity
    } finally {
      setIsUpdating(prev => ({ ...prev, [productId]: false }))
    }
  }

  const handleRemoveItem = async (productId) => {
    try {
      await removeFromCart(productId)
    } catch (error) {
      // Error removing item
    }
  }

  const handleClearCart = async () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      try {
        await clearCart()
        } catch (error) {
          // Error clearing cart
        }
    }
  }

  const calculateShipping = () => {
    return totalPrice > 100 ? 0 : 10
  }

  const calculateTax = () => {
    return totalPrice * 0.18 // 18% GST
  }

  const calculateTotal = () => {
    return totalPrice + calculateShipping() + calculateTax()
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <>
        <Helmet>
          <title>Shopping Cart - Kommercen</title>
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
                  <FiShoppingCart className="w-12 h-12 text-gray-400" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
                <p className="text-gray-600 mb-8">
                  Looks like you haven't added any items to your cart yet. Start shopping to fill it up!
                </p>
                <Link to="/products" className="btn-primary text-lg px-8 py-3">
                  Start Shopping
                  <FiArrowRight className="ml-2 inline" />
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
        <title>Shopping Cart - Kommercen</title>
      </Helmet>

      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container-custom">
          <div className="max-w-6xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
              <p className="text-gray-600 mt-2">{totalItems} item{totalItems !== 1 ? 's' : ''} in your cart</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {items.map((item, index) => (
                  <motion.div
                    key={item.product._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
                  >
                    <div className="flex items-center space-x-4">
                      {/* Product Image */}
                      <Link to={`/products/${item.product._id}`} className="flex-shrink-0">
                        <img
                          src={item.product.images[0]?.url || '/api/placeholder/120/120'}
                          alt={item.product.name}
                          className="w-24 h-24 object-cover rounded-lg"
                        />
                      </Link>

                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <Link to={`/products/${item.product._id}`}>
                          <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors">
                            {item.product.name}
                          </h3>
                        </Link>
                        <p className="text-gray-600 text-sm mt-1">
                          {item.product.category} • {item.product.brand || 'Generic'}
                        </p>
                        <p className="text-lg font-semibold text-gray-900 mt-2">
                          ₹{item.product.price.toFixed(2)}
                        </p>
                        {item.product.stock < 10 && (
                          <p className="text-orange-600 text-sm mt-1">
                            Only {item.product.stock} left in stock
                          </p>
                        )}
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center border border-gray-300 rounded-lg">
                          <button
                            onClick={() => handleQuantityChange(item.product._id, item.quantity - 1)}
                            disabled={item.quantity <= 1 || isUpdating[item.product._id]}
                            className="p-2 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <FiMinus className="w-4 h-4" />
                          </button>
                          <span className="px-4 py-2 font-medium min-w-[3rem] text-center">
                            {isUpdating[item.product._id] ? (
                              <LoadingSpinner size="sm" />
                            ) : (
                              item.quantity
                            )}
                          </span>
                          <button
                            onClick={() => handleQuantityChange(item.product._id, item.quantity + 1)}
                            disabled={item.quantity >= item.product.stock || isUpdating[item.product._id]}
                            className="p-2 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <FiPlus className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Remove Button */}
                        <button
                          onClick={() => handleRemoveItem(item.product._id)}
                          className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                          title="Remove from cart"
                        >
                          <FiTrash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Item Total */}
                      <div className="text-right">
                        <p className="text-lg font-semibold text-gray-900">
                          ₹{(item.product.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}

                {/* Clear Cart Button */}
                <div className="flex justify-end">
                  <button
                    onClick={handleClearCart}
                    className="text-red-600 hover:text-red-700 transition-colors"
                  >
                    Clear Cart
                  </button>
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 sticky top-8"
                >
                  <h2 className="text-xl font-semibold mb-6">Order Summary</h2>

                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal ({totalItems} items)</span>
                      <span className="font-medium">₹{totalPrice.toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-600">Shipping</span>
                      <span className="font-medium">
                        {calculateShipping() === 0 ? (
                          <span className="text-green-600">Free</span>
                        ) : (
                          `₹${calculateShipping().toFixed(2)}`
                        )}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-600">GST (18%)</span>
                      <span className="font-medium">₹{calculateTax().toFixed(2)}</span>
                    </div>

                    <div className="border-t pt-4">
                      <div className="flex justify-between text-lg font-semibold">
                        <span>Total</span>
                        <span>₹{calculateTotal().toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 space-y-3">
                    <Link
                      to="/checkout"
                      className="w-full btn-primary text-center block py-3"
                    >
                      Proceed to Checkout
                      <FiArrowRight className="ml-2 inline" />
                    </Link>

                    <Link
                      to="/products"
                      className="w-full btn-outline text-center block py-3"
                    >
                      Continue Shopping
                    </Link>
                  </div>

                  {/* Security Badge */}
                  <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-center text-green-800 text-sm">
                      <div className="w-2 h-2 bg-green-600 rounded-full mr-2"></div>
                      <span>Secure checkout with Razorpay</span>
                    </div>
                    <div className="mt-2 text-xs text-green-700">
                      ✓ SSL Encrypted ✓ UPI, Cards, Net Banking ✓ Digital Wallets
                    </div>
                  </div>

                  {/* Free Shipping Notice */}
                  {totalPrice <= 100 && (
                    <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <p className="text-blue-800 text-sm">
                        <strong>Free shipping</strong> on orders over ₹100. 
                        Add ₹{(100 - totalPrice).toFixed(2)} more to qualify!
                      </p>
                    </div>
                  )}
                </motion.div>
              </div>
            </div>

            {/* Recently Viewed / Recommendations */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-12"
            >
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold mb-4">You might also like</h3>
                <div className="text-center py-8">
                  <FiHeart className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-600">Recommendations will appear here</p>
                  <Link to="/products" className="text-blue-600 hover:text-blue-700 mt-2 inline-block">
                    Browse all products
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Cart
