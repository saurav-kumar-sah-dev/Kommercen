import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { useQuery } from 'react-query'
import { 
  FiArrowLeft, 
  FiShoppingCart, 
  FiHeart, 
  FiStar, 
  FiTruck, 
  FiShield, 
  FiRefreshCw,
  FiPlus,
  FiMinus,
  FiShare2,
  FiEye
} from 'react-icons/fi'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'
import { productsAPI } from '../utils/api'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import toast from 'react-hot-toast'

const ProductDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()
  const { addToCart } = useCart()
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  const [activeTab, setActiveTab] = useState('description')

  // Fetch product details
  const { data: productData, isLoading, error } = useQuery(
    ['product', id],
    () => productsAPI.getProduct(id),
    {
      enabled: !!id,
      retry: 1
    }
  )

  const product = productData?.data?.product

  useEffect(() => {
    if (product && product.images.length > 0) {
      setSelectedImage(0)
    }
  }, [product])

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      toast.error('Please login to add items to cart')
      navigate('/login')
      return
    }

    setIsAddingToCart(true)
    try {
      const result = await addToCart(product._id, quantity)
      if (result.success) {
        toast.success('Item added to cart!')
      }
        } catch (error) {
          // Error adding to cart
        } finally {
      setIsAddingToCart(false)
    }
  }

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1 && newQuantity <= product.stock) {
      setQuantity(newQuantity)
    }
  }

  const renderStars = (rating) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FiStar key={i} className="w-4 h-4 text-yellow-400 fill-current" />)
    }

    if (hasHalfStar) {
      stars.push(<FiStar key="half" className="w-4 h-4 text-yellow-400 fill-current opacity-50" />)
    }

    const emptyStars = 5 - Math.ceil(rating)
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FiStar key={`empty-${i}`} className="w-4 h-4 text-gray-300" />)
    }

    return stars
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Product not found</h2>
          <p className="text-gray-600 mb-4">The product you're looking for doesn't exist.</p>
          <button onClick={() => navigate('/products')} className="btn-primary">
            Back to Products
          </button>
        </div>
      </div>
    )
  }

  return (
    <>
      <Helmet>
        <title>{product.name} - Kommercen</title>
        <meta name="description" content={product.description} />
      </Helmet>

      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container-custom">
          <div className="max-w-7xl mx-auto">
            {/* Breadcrumb */}
            <div className="mb-6">
              <button
                onClick={() => navigate('/products')}
                className="flex items-center text-gray-600 hover:text-blue-600 transition-colors"
              >
                <FiArrowLeft className="mr-2" />
                Back to Products
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Product Images */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-4"
              >
                {/* Main Image */}
                <div className="aspect-square bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                  <img
                    src={product.images[selectedImage]?.url || '/api/placeholder/600/600'}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Thumbnail Images */}
                {product.images.length > 1 && (
                  <div className="grid grid-cols-4 gap-2">
                    {product.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`aspect-square bg-white rounded-lg border-2 overflow-hidden transition-colors ${
                          selectedImage === index 
                            ? 'border-blue-500' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <img
                          src={image.url}
                          alt={`${product.name} ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </motion.div>

              {/* Product Info */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="space-y-6"
              >
                {/* Product Title & Rating */}
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="flex items-center space-x-1">
                      {renderStars(product.rating.average)}
                      <span className="text-sm text-gray-600 ml-2">
                        {product.rating.average} ({product.rating.count} reviews)
                      </span>
                    </div>
                    <span className="text-sm text-gray-500">•</span>
                    <span className="text-sm text-gray-500">{product.category}</span>
                  </div>
                </div>

                {/* Price */}
                <div className="flex items-center space-x-4">
                  <span className="text-3xl font-bold text-gray-900">₹{product.price.toFixed(2)}</span>
                  {product.originalPrice && product.originalPrice > product.price && (
                    <span className="text-xl text-gray-500 line-through">₹{product.originalPrice.toFixed(2)}</span>
                  )}
                  {product.discount.percentage > 0 && (
                    <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-sm font-medium">
                      {product.discount.percentage}% OFF
                    </span>
                  )}
                </div>

                {/* Stock Status */}
                <div className="flex items-center space-x-2">
                  {product.stock > 0 ? (
                    <>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-green-600 font-medium">
                        {product.stock > 10 ? 'In Stock' : `Only ${product.stock} left in stock`}
                      </span>
                    </>
                  ) : (
                    <>
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <span className="text-red-600 font-medium">Out of Stock</span>
                    </>
                  )}
                </div>

                {/* Quantity Selector */}
                {product.stock > 0 && (
                  <div className="flex items-center space-x-4">
                    <span className="text-sm font-medium text-gray-700">Quantity:</span>
                    <div className="flex items-center border border-gray-300 rounded-lg">
                      <button
                        onClick={() => handleQuantityChange(quantity - 1)}
                        disabled={quantity <= 1}
                        className="p-2 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <FiMinus className="w-4 h-4" />
                      </button>
                      <span className="px-4 py-2 font-medium min-w-[3rem] text-center">
                        {quantity}
                      </span>
                      <button
                        onClick={() => handleQuantityChange(quantity + 1)}
                        disabled={quantity >= product.stock}
                        className="p-2 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <FiPlus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={handleAddToCart}
                    disabled={product.stock === 0 || isAddingToCart}
                    className="flex-1 flex items-center justify-center btn-primary py-3"
                  >
                    {isAddingToCart ? (
                      <LoadingSpinner size="sm" />
                    ) : (
                      <>
                        <FiShoppingCart className="mr-2" />
                        Add to Cart
                      </>
                    )}
                  </button>
                  <button className="flex items-center justify-center btn-outline py-3 px-6">
                    <FiHeart className="mr-2" />
                    Wishlist
                  </button>
                  <button className="flex items-center justify-center btn-outline py-3 px-6">
                    <FiShare2 className="mr-2" />
                    Share
                  </button>
                </div>

                {/* Features */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <FiTruck className="w-4 h-4 text-blue-600" />
                    <span>Free shipping over ₹100</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <FiRefreshCw className="w-4 h-4 text-green-600" />
                    <span>Easy returns</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <FiShield className="w-4 h-4 text-purple-600" />
                    <span>Secure payment</span>
                  </div>
                </div>

                {/* Product Details Tabs */}
                <div className="border-t pt-6">
                  <div className="flex space-x-6 mb-4">
                    <button
                      onClick={() => setActiveTab('description')}
                      className={`pb-2 border-b-2 font-medium ${
                        activeTab === 'description'
                          ? 'border-blue-500 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      Description
                    </button>
                    <button
                      onClick={() => setActiveTab('specifications')}
                      className={`pb-2 border-b-2 font-medium ${
                        activeTab === 'specifications'
                          ? 'border-blue-500 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      Specifications
                    </button>
                    <button
                      onClick={() => setActiveTab('reviews')}
                      className={`pb-2 border-b-2 font-medium ${
                        activeTab === 'reviews'
                          ? 'border-blue-500 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      Reviews ({product.reviews.length})
                    </button>
                  </div>

                  <div className="min-h-[200px]">
                    {activeTab === 'description' && (
                      <div className="prose max-w-none">
                        <p className="text-gray-700 leading-relaxed">{product.description}</p>
                        {product.tags && product.tags.length > 0 && (
                          <div className="mt-4">
                            <span className="text-sm font-medium text-gray-700">Tags: </span>
                            <div className="flex flex-wrap gap-2 mt-2">
                              {product.tags.map((tag, index) => (
                                <span
                                  key={index}
                                  className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {activeTab === 'specifications' && (
                      <div className="space-y-3">
                        {product.specifications && Object.keys(product.specifications).length > 0 ? (
                          Object.entries(product.specifications).map(([key, value]) => (
                            <div key={key} className="flex justify-between py-2 border-b border-gray-200">
                              <span className="font-medium text-gray-700 capitalize">
                                {key.replace(/([A-Z])/g, ' $1').trim()}
                              </span>
                              <span className="text-gray-600">{value}</span>
                            </div>
                          ))
                        ) : (
                          <p className="text-gray-500">No specifications available</p>
                        )}
                      </div>
                    )}

                    {activeTab === 'reviews' && (
                      <div className="space-y-4">
                        {product.reviews.length > 0 ? (
                          product.reviews.map((review, index) => (
                            <div key={index} className="border-b border-gray-200 pb-4">
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center space-x-2">
                                  <span className="font-medium text-gray-900">
                                    {review.user?.name || 'Anonymous'}
                                  </span>
                                  <div className="flex items-center space-x-1">
                                    {renderStars(review.rating)}
                                  </div>
                                </div>
                                <span className="text-sm text-gray-500">
                                  {formatDate(review.createdAt)}
                                </span>
                              </div>
                              {review.comment && (
                                <p className="text-gray-700">{review.comment}</p>
                              )}
                            </div>
                          ))
                        ) : (
                          <div className="text-center py-8">
                            <FiEye className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                            <p className="text-gray-500">No reviews yet</p>
                            <p className="text-sm text-gray-400">Be the first to review this product!</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductDetail
