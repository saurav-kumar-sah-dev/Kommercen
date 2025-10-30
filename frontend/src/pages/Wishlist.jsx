import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { FiHeart, FiShoppingCart, FiTrash2 } from 'react-icons/fi'
import { wishlistAPI } from '../utils/api'
import { useCart } from '../context/CartContext'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import toast from 'react-hot-toast'

const Wishlist = () => {
  const [loading, setLoading] = useState(true)
  const [items, setItems] = useState([])
  const { addToCart } = useCart()
  const navigate = useNavigate()

  const fetchWishlist = async () => {
    try {
      const res = await wishlistAPI.getWishlist()
      setItems(res.data?.wishlist || [])
    } catch (e) {
      toast.error('Failed to load wishlist')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchWishlist()
  }, [])

  const handleRemove = async (productId) => {
    try {
      await wishlistAPI.removeFromWishlist(productId)
      setItems(prev => prev.filter(p => p._id !== productId))
      toast.success('Removed from wishlist')
    } catch (e) {
      toast.error('Failed to remove item')
    }
  }

  const handleAddToCart = async (productId) => {
    try {
      await addToCart(productId, 1)
      toast.success('Added to cart')
    } catch (e) {
      toast.error('Failed to add to cart')
    }
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
          <title>My Wishlist - Kommercen</title>
        </Helmet>
        <div className="min-h-screen bg-gray-50 py-8">
          <div className="container-custom">
            <div className="max-w-2xl mx-auto text-center">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-12 rounded-lg shadow-sm border border-gray-200">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FiHeart className="w-12 h-12 text-gray-400" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-4">Your wishlist is empty</h1>
                <p className="text-gray-600 mb-8">Save items to your wishlist to view them here.</p>
                <Link to="/products" className="btn-primary text-lg px-8 py-3">Browse Products</Link>
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
        <title>My Wishlist - Kommercen</title>
      </Helmet>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container-custom">
          <div className="max-w-6xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900">My Wishlist</h1>
              <p className="text-gray-600 mt-2">Save items and add them to your cart anytime</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((product, index) => (
                <motion.div key={product._id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                  <Link to={`/products/${product._id}`}>
                    <img src={product.images?.[0]?.url || '/api/placeholder/400/300'} alt={product.name} className="w-full h-48 object-cover" />
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 line-clamp-2">{product.name}</h3>
                      <p className="text-sm text-gray-600 mt-1">₹{product.price?.toFixed(2)}</p>
                    </div>
                  </Link>
                  <div className="p-4 border-t flex items-center justify-between gap-2">
                    <button onClick={() => handleAddToCart(product._id)} className="btn-primary flex-1 flex items-center justify-center">
                      <FiShoppingCart className="mr-2" /> Add to Cart
                    </button>
                    <button onClick={() => handleRemove(product._id)} className="btn-outline text-red-600 border-red-300 hover:bg-red-50">
                      <FiTrash2 className="mr-2" /> Remove
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Wishlist


