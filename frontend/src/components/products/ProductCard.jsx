import { Link } from 'react-router-dom'
import { FiHeart, FiShoppingCart, FiStar } from 'react-icons/fi'
import { useAuth } from '../../context/AuthContext'
import { useCart } from '../../context/CartContext'
import toast from 'react-hot-toast'
import { wishlistAPI } from '../../utils/api'

const ProductCard = ({ product }) => {
  const { isAuthenticated } = useAuth()
  const { addToCart } = useCart()

  const handleAddToCart = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (!isAuthenticated) {
      toast.error('Please login to add items to cart')
      return
    }

    await addToCart(product._id, 1)
  }

  const handleAddToWishlist = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (!isAuthenticated) {
      toast.error('Please login to add items to wishlist')
      return
    }

    try {
      await wishlistAPI.addToWishlist(product._id)
      toast.success('Added to wishlist')
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed to add to wishlist')
    }
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price)
  }

  const discountedPrice = product.discount?.percentage > 0 && 
    (!product.discount?.validUntil || new Date(product.discount.validUntil) > new Date())
    ? product.price * (1 - product.discount.percentage / 100)
    : product.price

  return (
    <div className="product-card group">
      <Link to={`/products/${product._id}`} className="block">
        {/* Product Image */}
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          {product.images && product.images.length > 0 ? (
            <img
              src={product.images[0].url}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              <span className="text-4xl">📦</span>
            </div>
          )}
          
          {/* Discount Badge */}
          {product.discount?.percentage > 0 && (
            <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
              -{product.discount.percentage}%
            </div>
          )}
          
          {/* Featured Badge */}
          {product.isFeatured && (
            <div className="absolute top-2 right-2 bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded">
              Featured
            </div>
          )}
          
          {/* Action Buttons */}
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 space-y-2">
            <button
              onClick={handleAddToWishlist}
              className="w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-red-50 hover:text-red-500 transition-colors"
              title="Add to wishlist"
            >
              <FiHeart className="w-4 h-4" />
            </button>
            <button
              onClick={handleAddToCart}
              className="w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-blue-50 hover:text-blue-500 transition-colors"
              title="Add to cart"
            >
              <FiShoppingCart className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-4">
          {/* Category */}
          <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
            {product.category}
          </p>
          
          {/* Product Name */}
          <h3 className="font-medium text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
            {product.name}
          </h3>
          
          {/* Rating */}
          {product.rating && product.rating.count > 0 && (
            <div className="flex items-center space-x-1 mb-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <FiStar
                    key={i}
                    className={`w-3 h-3 ${
                      i < Math.floor(product.rating.average)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-gray-500">
                ({product.rating.count})
              </span>
            </div>
          )}
          
          {/* Price */}
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-gray-900">
              {formatPrice(discountedPrice)}
            </span>
            {discountedPrice < product.price && (
              <span className="text-sm text-gray-500 line-through">
                {formatPrice(product.price)}
              </span>
            )}
          </div>
          
          {/* Stock Status */}
          <div className="mt-2">
            {product.stock > 0 ? (
              <span className="text-xs text-green-600 font-medium">
                In Stock ({product.stock} available)
              </span>
            ) : (
              <span className="text-xs text-red-600 font-medium">
                Out of Stock
              </span>
            )}
          </div>
        </div>
      </Link>
    </div>
  )
}

export default ProductCard
