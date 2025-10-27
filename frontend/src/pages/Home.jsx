import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from 'react-query'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { FiArrowRight, FiStar, FiTruck, FiShield, FiHeadphones } from 'react-icons/fi'
import { productsAPI } from '@/utils/api'
import ProductCard from '@/components/products/ProductCard'
import LoadingSpinner from '@/components/ui/LoadingSpinner'

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([])

  // Fetch featured products
  const { data: productsData, isLoading } = useQuery(
    'featured-products',
    () => productsAPI.getProducts({ featured: 'true', limit: 8 }),
    {
      onSuccess: (data) => {
        setFeaturedProducts(data.data.products)
      }
    }
  )

  const features = [
    {
      icon: <FiTruck className="w-8 h-8 text-blue-600" />,
      title: "Fast Delivery",
      description: "Get your orders delivered within 24-48 hours"
    },
    {
      icon: <FiShield className="w-8 h-8 text-green-600" />,
      title: "Secure Payment",
      description: "Your payment information is safe and encrypted"
    },
    {
      icon: <FiHeadphones className="w-8 h-8 text-purple-600" />,
      title: "24/7 Support",
      description: "Our support team is always here to help you"
    }
  ]

  const categories = [
    { name: 'Electronics', image: '/api/placeholder/300/200', link: '/products?category=Electronics' },
    { name: 'Clothing', image: '/api/placeholder/300/200', link: '/products?category=Clothing' },
    { name: 'Home & Garden', image: '/api/placeholder/300/200', link: '/products?category=Home & Garden' },
    { name: 'Sports', image: '/api/placeholder/300/200', link: '/products?category=Sports' },
    { name: 'Books', image: '/api/placeholder/300/200', link: '/products?category=Books' },
    { name: 'Beauty', image: '/api/placeholder/300/200', link: '/products?category=Beauty' }
  ]

  return (
    <>
      <Helmet>
        <title>Kommercen - Your Marketplace, Simplified</title>
        <meta name="description" content="Discover amazing products at great prices on Kommercen. Fast delivery, secure payments, and excellent customer service." />
      </Helmet>

      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-6"
              >
                <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                  Your Marketplace,
                  <span className="block text-yellow-300">Simplified</span>
                </h1>
                <p className="text-xl text-blue-100 leading-relaxed">
                  Discover amazing products at great prices with fast, reliable delivery. 
                  Shop with confidence on Kommercen.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/products" className="btn-primary bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-3">
                    Shop Now
                    <FiArrowRight className="ml-2 inline" />
                  </Link>
                  <Link to="/products?featured=true" className="btn-outline border-white text-white hover:bg-white hover:text-blue-600 text-lg px-8 py-3">
                    Featured Products
                  </Link>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
              >
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                      <FiStar className="w-6 h-6 text-yellow-300" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">4.8/5 Rating</h3>
                      <p className="text-blue-100">From 10,000+ customers</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                      <FiTruck className="w-6 h-6 text-green-300" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">Fast Delivery</h3>
                      <p className="text-blue-100">24-48 hours nationwide</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                      <FiShield className="w-6 h-6 text-blue-300" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">Secure Payment</h3>
                      <p className="text-blue-100">SSL encrypted transactions</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-white">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center space-y-4"
                >
                  <div className="flex justify-center">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-16 bg-gray-50">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Shop by Category</h2>
              <p className="text-gray-600 text-lg">Find exactly what you're looking for</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {categories.map((category, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link
                    to={category.link}
                    className="block bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 p-6 text-center group"
                  >
                    <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                      <span className="text-2xl font-bold text-gray-600 group-hover:text-blue-600">
                        {category.name.charAt(0)}
                      </span>
                    </div>
                    <h3 className="font-medium text-gray-900">{category.name}</h3>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Products Section */}
        <section className="py-16 bg-white">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Products</h2>
              <p className="text-gray-600 text-lg">Handpicked items just for you</p>
            </div>

            {isLoading ? (
              <div className="flex justify-center">
                <LoadingSpinner size="lg" />
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {featuredProducts.map((product, index) => (
                  <motion.div
                    key={product._id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </div>
            )}

            <div className="text-center mt-12">
              <Link to="/products?featured=true" className="btn-primary text-lg px-8 py-3">
                View All Featured Products
                <FiArrowRight className="ml-2 inline" />
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="container-custom text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Start Shopping?</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied customers and discover amazing products at unbeatable prices.
            </p>
            <Link to="/register" className="btn-primary bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-3">
              Get Started Today
            </Link>
          </div>
        </section>
      </div>
    </>
  )
}

export default Home