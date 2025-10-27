import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useCart } from '../../context/CartContext'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FiShoppingCart, 
  FiUser, 
  FiSearch, 
  FiMenu, 
  FiX,
  FiHeart,
  FiLogOut,
  FiSettings,
  FiPlus,
  FiHome,
  FiStar,
  FiTrendingUp
} from 'react-icons/fi'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  
  const { isAuthenticated, user, logout } = useAuth()
  const { totalItems } = useCart()
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`)
      setSearchQuery('')
    }
  }

  const handleLogout = () => {
    logout()
    setIsProfileOpen(false)
    navigate('/')
  }

  return (
    <nav className="bg-gray-900 shadow-navbar backdrop-blur-navbar sticky top-0 z-50 border-b border-gray-800">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">K</span>
              </div>
              <span className="text-xl font-bold text-white animate-bounce-gentle">
                Kommercen
              </span>
            </Link>
          </motion.div>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md mx-6">
            <div className="relative w-full">
              <motion.div
                whileFocus={{ scale: 1.01 }}
                className="relative"
              >
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-800 backdrop-blur-sm border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-300 text-white placeholder-gray-400 text-sm"
                />
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              </motion.div>
            </div>
          </form>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link 
                to="/products" 
                className="flex items-center space-x-1 px-3 py-2 bg-gray-800 rounded-lg text-white hover:bg-gray-700 transition-all duration-300 text-sm font-medium"
              >
                <FiTrendingUp className="w-4 h-4" />
                <span>Products</span>
              </Link>
            </motion.div>
            
            {/* Admin Links */}
            {isAuthenticated && user?.role === 'admin' && (
              <>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link 
                    to="/admin" 
                    className="flex items-center space-x-1 px-3 py-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg text-white hover:from-orange-600 hover:to-red-600 transition-all duration-300 text-sm font-medium"
                  >
                    <FiStar className="w-4 h-4" />
                    <span>Admin</span>
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link 
                    to="/admin/products" 
                    className="flex items-center space-x-1 px-3 py-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg text-white hover:from-green-600 hover:to-emerald-600 transition-all duration-300 text-sm font-medium"
                  >
                    <FiPlus className="w-4 h-4" />
                    <span>Add</span>
                  </Link>
                </motion.div>
              </>
            )}
            
            {isAuthenticated ? (
              <>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link to="/cart" className="relative p-2 text-white hover:text-gray-300 transition-colors duration-300">
                    <FiShoppingCart className="w-5 h-5" />
                    {totalItems > 0 && (
                      <motion.span 
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        className="absolute -top-1 -right-1 bg-gradient-to-r from-pink-500 to-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold animate-bounce-gentle"
                      >
                        {totalItems}
                      </motion.span>
                    )}
                  </Link>
                </motion.div>

                <div className="relative">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center space-x-1 px-3 py-2 bg-gray-800 rounded-lg text-white hover:bg-gray-700 transition-all duration-300 text-sm font-medium"
                  >
                    <FiUser className="w-5 h-5" />
                    <span className="hidden lg:block font-medium">{user?.name}</span>
                  </motion.button>

                  <AnimatePresence>
                    {isProfileOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 mt-2 w-56 bg-gray-800 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-700 py-2 z-50"
                      >
                        <Link
                          to="/profile"
                          className="flex items-center px-4 py-3 text-gray-300 hover:bg-gray-700 hover:text-white transition-all duration-300"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          <FiSettings className="w-4 h-4 mr-3 text-blue-400" />
                          <span className="font-medium">Profile</span>
                        </Link>
                        <Link
                          to="/orders"
                          className="flex items-center px-4 py-3 text-gray-300 hover:bg-gray-700 hover:text-white transition-all duration-300"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          <FiUser className="w-4 h-4 mr-3 text-green-400" />
                          <span className="font-medium">Orders</span>
                        </Link>
                        <div className="border-t border-gray-700 my-1"></div>
                        <button
                          onClick={handleLogout}
                          className="flex items-center w-full px-4 py-3 text-gray-300 hover:bg-gray-700 hover:text-white transition-all duration-300"
                        >
                          <FiLogOut className="w-4 h-4 mr-3 text-red-400" />
                          <span className="font-medium">Logout</span>
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link 
                    to="/login" 
                    className="px-3 py-2 text-gray-300 hover:text-white transition-colors text-sm font-medium"
                  >
                    Login
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link 
                    to="/register" 
                    className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 text-sm font-medium"
                  >
                    Sign Up
                  </Link>
                </motion.div>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 bg-gray-800 rounded-lg text-white hover:bg-gray-700 transition-all duration-300"
          >
            <AnimatePresence mode="wait">
              {isMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <FiX className="w-6 h-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <FiMenu className="w-6 h-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden border-t border-gray-800 py-6"
            >
              {/* Mobile Search */}
              <motion.form 
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                onSubmit={handleSearch} 
                className="mb-6"
              >
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-300 text-white placeholder-gray-400 text-sm"
                  />
                  <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                </div>
              </motion.form>

              {/* Mobile Navigation Links */}
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="space-y-3"
              >
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    to="/"
                    className="flex items-center space-x-2 px-3 py-2 bg-gray-800 rounded-lg text-white hover:bg-gray-700 transition-all duration-300 text-sm"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <FiHome className="w-5 h-5" />
                    <span className="font-medium">Home</span>
                  </Link>
                </motion.div>

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    to="/products"
                    className="flex items-center space-x-2 px-3 py-2 bg-gray-800 rounded-lg text-white hover:bg-gray-700 transition-all duration-300 text-sm"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <FiTrendingUp className="w-5 h-5" />
                    <span className="font-medium">Products</span>
                  </Link>
                </motion.div>

                {/* Admin Links - Mobile */}
                {isAuthenticated && user?.role === 'admin' && (
                  <>
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Link
                        to="/admin"
                        className="flex items-center space-x-2 px-3 py-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg text-white hover:from-orange-600 hover:to-red-600 transition-all duration-300 text-sm"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <FiStar className="w-5 h-5" />
                        <span className="font-medium">Admin Dashboard</span>
                      </Link>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Link
                        to="/admin/products"
                        className="flex items-center space-x-2 px-3 py-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg text-white hover:from-green-600 hover:to-emerald-600 transition-all duration-300 text-sm"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <FiPlus className="w-5 h-5" />
                        <span className="font-medium">Add Product</span>
                      </Link>
                    </motion.div>
                  </>
                )}

                {isAuthenticated ? (
                  <>
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Link
                        to="/cart"
                        className="flex items-center space-x-3 px-4 py-3 text-white hover:text-gray-300 transition-colors duration-300"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <div className="relative">
                          <FiShoppingCart className="w-5 h-5" />
                          {totalItems > 0 && (
                            <motion.span 
                              initial={{ scale: 0, rotate: -180 }}
                              animate={{ scale: 1, rotate: 0 }}
                              className="absolute -top-1 -right-1 bg-gradient-to-r from-pink-500 to-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold animate-bounce-gentle"
                            >
                              {totalItems}
                            </motion.span>
                          )}
                        </div>
                        <span className="font-medium">Cart ({totalItems})</span>
                      </Link>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Link
                        to="/profile"
                        className="flex items-center space-x-2 px-3 py-2 bg-gray-800 rounded-lg text-white hover:bg-gray-700 transition-all duration-300 text-sm"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <FiSettings className="w-5 h-5" />
                        <span className="font-medium">Profile</span>
                      </Link>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Link
                        to="/orders"
                        className="flex items-center space-x-2 px-3 py-2 bg-gray-800 rounded-lg text-white hover:bg-gray-700 transition-all duration-300 text-sm"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <FiUser className="w-5 h-5" />
                        <span className="font-medium">Orders</span>
                      </Link>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <button
                        onClick={() => {
                          handleLogout()
                          setIsMenuOpen(false)
                        }}
                        className="flex items-center space-x-2 w-full px-3 py-2 bg-gradient-to-r from-red-500 to-pink-500 rounded-lg text-white hover:from-red-600 hover:to-pink-600 transition-all duration-300 text-sm"
                      >
                        <FiLogOut className="w-5 h-5" />
                        <span className="font-medium">Logout</span>
                      </button>
                    </motion.div>
                  </>
                ) : (
                  <>
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Link
                        to="/login"
                        className="flex items-center space-x-2 px-3 py-2 bg-gray-800 rounded-lg text-white hover:bg-gray-700 transition-all duration-300 text-sm"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <FiUser className="w-5 h-5" />
                        <span className="font-medium">Login</span>
                      </Link>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Link
                        to="/register"
                        className="flex items-center space-x-2 px-3 py-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg text-white hover:from-blue-600 hover:to-purple-700 transition-all duration-300 text-sm"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <FiPlus className="w-5 h-5" />
                        <span className="font-medium">Sign Up</span>
                      </Link>
                    </motion.div>
                  </>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  )
}

export default Navbar
