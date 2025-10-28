import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { FiSettings, FiShield, FiClock, FiMail, FiMapPin, FiEye, FiCircle, FiArrowLeft } from 'react-icons/fi'
import { Link } from 'react-router-dom'

const CookiePolicy = () => {
  return (
    <>
      <Helmet>
        <title>Cookie Policy - Kommercen</title>
        <meta name="description" content="Cookie Policy for Kommercen e-commerce platform" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
        {/* Mobile-friendly padding */}
        <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Back Button */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="mb-6"
              >
                <Link 
                  to="/" 
                  className="inline-flex items-center space-x-2 text-gray-600 hover:text-green-600 transition-colors duration-300"
                >
                  <FiArrowLeft className="w-4 h-4" />
                  <span className="text-sm font-medium">Back to Home</span>
                </Link>
              </motion.div>

              {/* Header Section */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-700 rounded-xl sm:rounded-2xl shadow-2xl p-6 sm:p-8 lg:p-12 mb-6 sm:mb-8 text-white"
              >
                <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/20 backdrop-blur-sm rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0">
                    <FiCircle className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">Cookie Policy</h1>
                    <div className="flex items-center space-x-2 text-green-100">
                      <FiClock className="w-4 h-4" />
                      <span className="text-sm">Last updated: {new Date().toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                <p className="text-green-100 text-base sm:text-lg leading-relaxed">
                  This Cookie Policy explains how Kommercen uses cookies and similar technologies to enhance your browsing experience and provide personalized services.
                </p>
              </motion.div>

              {/* Content Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-xl border border-white/20 p-4 sm:p-6 lg:p-10"
              >
                <div className="space-y-6 sm:space-y-8">
                  <motion.section
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg sm:rounded-xl p-4 sm:p-6 border-l-4 border-blue-500"
                  >
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 flex items-start sm:items-center">
                      <span className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs sm:text-sm font-bold mr-3 flex-shrink-0 mt-1 sm:mt-0">1</span>
                      <span>What Are Cookies?</span>
                    </h2>
                    <p className="text-gray-700 leading-relaxed mb-4 text-sm sm:text-base">
                      Cookies are small text files that are stored on your device when you visit our website. They help us provide you with a better experience by remembering your preferences and enabling certain website functions.
                    </p>
                    <div className="bg-white rounded-lg p-3 sm:p-4 shadow-sm mt-4">
                      <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 flex items-center">
                        <FiEye className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 mr-2" />
                        Types of Data Stored
                      </h3>
                      <ul className="list-disc list-inside text-gray-700 space-y-1 sm:space-y-2 text-sm sm:text-base">
                        <li>User preferences and settings</li>
                        <li>Login status and session information</li>
                        <li>Shopping cart contents</li>
                        <li>Website usage analytics</li>
                        <li>Language and region preferences</li>
                      </ul>
                    </div>
                  </motion.section>

                  <motion.section
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.7 }}
                    className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg sm:rounded-xl p-4 sm:p-6 border-l-4 border-green-500"
                  >
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 flex items-start sm:items-center">
                      <span className="w-6 h-6 sm:w-8 sm:h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-xs sm:text-sm font-bold mr-3 flex-shrink-0 mt-1 sm:mt-0">2</span>
                      <span>Types of Cookies We Use</span>
                    </h2>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mt-4 sm:mt-6">
                      <div className="bg-white rounded-lg p-3 sm:p-4 shadow-sm">
                        <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 flex items-center">
                          <FiShield className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 mr-2" />
                          Essential Cookies
                        </h3>
                        <p className="text-gray-700 mb-3 text-sm sm:text-base">Required for basic website functionality</p>
                        <ul className="list-disc list-inside text-gray-700 space-y-1 text-xs sm:text-sm">
                          <li>Authentication and login</li>
                          <li>Shopping cart functionality</li>
                          <li>Security and fraud prevention</li>
                          <li>Load balancing</li>
                        </ul>
                      </div>
                      
                      <div className="bg-white rounded-lg p-3 sm:p-4 shadow-sm">
                        <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 flex items-center">
                          <FiSettings className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 mr-2" />
                          Preference Cookies
                        </h3>
                        <p className="text-gray-700 mb-3 text-sm sm:text-base">Remember your settings and preferences</p>
                        <ul className="list-disc list-inside text-gray-700 space-y-1 text-xs sm:text-sm">
                          <li>Language selection</li>
                          <li>Currency preferences</li>
                          <li>Theme settings</li>
                          <li>Display preferences</li>
                        </ul>
                      </div>
                      
                      <div className="bg-white rounded-lg p-3 sm:p-4 shadow-sm">
                        <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 flex items-center">
                          <FiEye className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 mr-2" />
                          Analytics Cookies
                        </h3>
                        <p className="text-gray-700 mb-3 text-sm sm:text-base">Help us understand website usage</p>
                        <ul className="list-disc list-inside text-gray-700 space-y-1 text-xs sm:text-sm">
                          <li>Page views and visits</li>
                          <li>User behavior tracking</li>
                          <li>Performance monitoring</li>
                          <li>Error reporting</li>
                        </ul>
                      </div>
                      
                      <div className="bg-white rounded-lg p-3 sm:p-4 shadow-sm">
                        <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 flex items-center">
                          <FiCircle className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600 mr-2" />
                          Marketing Cookies
                        </h3>
                        <p className="text-gray-700 mb-3 text-sm sm:text-base">Used for targeted advertising</p>
                        <ul className="list-disc list-inside text-gray-700 space-y-1 text-xs sm:text-sm">
                          <li>Ad personalization</li>
                          <li>Campaign tracking</li>
                          <li>Social media integration</li>
                          <li>Retargeting</li>
                        </ul>
                      </div>
                  </div>
                </motion.section>

                  <motion.section
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg sm:rounded-xl p-4 sm:p-6 border-l-4 border-purple-500"
                  >
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 flex items-start sm:items-center">
                      <span className="w-6 h-6 sm:w-8 sm:h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-xs sm:text-sm font-bold mr-3 flex-shrink-0 mt-1 sm:mt-0">3</span>
                      <span>Third-Party Cookies</span>
                    </h2>
                    <p className="text-gray-700 leading-relaxed mb-4 text-sm sm:text-base">
                      We use third-party services that may set their own cookies. These services help us provide better functionality and analytics:
                    </p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      <div className="bg-white rounded-lg p-3 sm:p-4 shadow-sm">
                        <h3 className="font-semibold text-gray-800 mb-2 text-sm sm:text-base">Payment Processing</h3>
                        <p className="text-gray-600 text-xs sm:text-sm">Razorpay cookies for secure payment processing</p>
                      </div>
                      <div className="bg-white rounded-lg p-3 sm:p-4 shadow-sm">
                        <h3 className="font-semibold text-gray-800 mb-2 text-sm sm:text-base">Image Storage</h3>
                        <p className="text-gray-600 text-xs sm:text-sm">Cloudinary cookies for image optimization</p>
                      </div>
                      <div className="bg-white rounded-lg p-3 sm:p-4 shadow-sm">
                        <h3 className="font-semibold text-gray-800 mb-2 text-sm sm:text-base">Analytics</h3>
                        <p className="text-gray-600 text-xs sm:text-sm">Vercel analytics for performance monitoring</p>
                      </div>
                      <div className="bg-white rounded-lg p-3 sm:p-4 shadow-sm">
                        <h3 className="font-semibold text-gray-800 mb-2 text-sm sm:text-base">Social Media</h3>
                        <p className="text-gray-600 text-xs sm:text-sm">Social platform cookies for sharing features</p>
                      </div>
                    </div>
                  </motion.section>

                  <motion.section
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.9 }}
                    className="bg-gradient-to-r from-orange-50 to-red-50 rounded-lg sm:rounded-xl p-4 sm:p-6 border-l-4 border-orange-500"
                  >
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 flex items-start sm:items-center">
                      <span className="w-6 h-6 sm:w-8 sm:h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-xs sm:text-sm font-bold mr-3 flex-shrink-0 mt-1 sm:mt-0">4</span>
                      <span>Managing Your Cookie Preferences</span>
                    </h2>
                    <p className="text-gray-700 leading-relaxed mb-4 text-sm sm:text-base">
                      You have control over cookies and can manage your preferences:
                    </p>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                      <div className="bg-white rounded-lg p-3 sm:p-4 shadow-sm">
                        <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3">Browser Settings</h3>
                        <p className="text-gray-700 mb-3 text-sm sm:text-base">Most browsers allow you to control cookies through settings:</p>
                        <ul className="list-disc list-inside text-gray-700 space-y-1 sm:space-y-2 text-xs sm:text-sm">
                          <li>Block all cookies</li>
                          <li>Block third-party cookies</li>
                          <li>Delete existing cookies</li>
                          <li>Set cookie expiration</li>
                        </ul>
                      </div>
                      
                      <div className="bg-white rounded-lg p-3 sm:p-4 shadow-sm">
                        <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3">Cookie Consent</h3>
                        <p className="text-gray-700 mb-3 text-sm sm:text-base">You can change your cookie preferences anytime:</p>
                        <ul className="list-disc list-inside text-gray-700 space-y-1 sm:space-y-2 text-xs sm:text-sm">
                          <li>Accept all cookies</li>
                          <li>Reject non-essential cookies</li>
                          <li>Customize preferences</li>
                          <li>Withdraw consent</li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4 mt-4 sm:mt-6">
                      <h4 className="font-semibold text-blue-900 mb-2 text-sm sm:text-base">Important Note</h4>
                      <p className="text-blue-800 text-xs sm:text-sm">
                        Disabling certain cookies may affect website functionality. Essential cookies are required for basic operations like login and shopping cart.
                      </p>
                    </div>
                  </motion.section>

                  <motion.section
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 1.0 }}
                    className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg sm:rounded-xl p-4 sm:p-6 border-l-4 border-indigo-500"
                  >
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 flex items-start sm:items-center">
                      <span className="w-6 h-6 sm:w-8 sm:h-8 bg-indigo-500 text-white rounded-full flex items-center justify-center text-xs sm:text-sm font-bold mr-3 flex-shrink-0 mt-1 sm:mt-0">5</span>
                      <span>Cookie Retention Periods</span>
                    </h2>
                    <p className="text-gray-700 leading-relaxed mb-4 text-sm sm:text-base">
                      Different types of cookies are stored for different periods:
                    </p>
                    
                    {/* Mobile-friendly table with horizontal scroll */}
                    <div className="overflow-x-auto -mx-4 sm:mx-0">
                      <div className="min-w-full px-4 sm:px-0">
                        <table className="w-full bg-white rounded-lg shadow-sm">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold text-gray-900">Cookie Type</th>
                              <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold text-gray-900">Duration</th>
                              <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold text-gray-900">Purpose</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200">
                            <tr>
                              <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-700">Session Cookies</td>
                              <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-700">Until browser closes</td>
                              <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-700">Login sessions, shopping cart</td>
                            </tr>
                            <tr>
                              <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-700">Preference Cookies</td>
                              <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-700">1 year</td>
                              <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-700">User settings, language</td>
                            </tr>
                            <tr>
                              <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-700">Analytics Cookies</td>
                              <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-700">2 years</td>
                              <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-700">Usage statistics</td>
                            </tr>
                            <tr>
                              <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-700">Marketing Cookies</td>
                              <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-700">6 months</td>
                              <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-700">Advertising, retargeting</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </motion.section>

                  {/* Contact Section */}
                  <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.1 }}
                    className="relative overflow-hidden bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 border border-green-100 shadow-lg"
                  >
                    {/* decorative gradient blob */}
                    <div className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-gradient-to-br from-green-200/60 via-emerald-200/40 to-teal-200/30 blur-3xl" />

                    <div className="flex items-center justify-between flex-wrap gap-3 mb-4 sm:mb-6">
                      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center">
                        <FiMail className="w-5 h-5 sm:w-6 sm:h-6 text-green-600 mr-2 sm:mr-3" />
                        Contact Us About Cookies
                      </h2>
                      <span className="inline-flex items-center rounded-full bg-green-50 text-green-700 border border-green-200 px-2.5 py-1 text-xs sm:text-sm font-medium">
                        Typically responds within 24 hours
                      </span>
                    </div>

                    <p className="text-gray-700 leading-relaxed mb-4 sm:mb-6 text-sm sm:text-base">
                      Have questions about how we use cookies, analytics, or preferences? We’re here to help.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                      {/* Email card */}
                      <div className="group rounded-lg sm:rounded-xl p-4 sm:p-5 bg-white border border-gray-200 hover:border-green-300 shadow-sm hover:shadow-md transition-all">
                        <div className="flex items-center mb-2 sm:mb-3">
                          <FiMail className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 mr-2" />
                          <h3 className="font-semibold text-gray-900 text-sm sm:text-base">Email</h3>
                        </div>
                        <a
                          href="mailto:sauravshubham903@gmail.com"
                          className="inline-flex items-center text-green-700 hover:text-green-800 text-sm sm:text-base font-medium"
                        >
                          sauravshubham903@gmail.com
                        </a>
                      </div>

                      {/* Contact page card */}
                      <div className="group rounded-lg sm:rounded-xl p-4 sm:p-5 bg-white border border-gray-200 hover:border-green-300 shadow-sm hover:shadow-md transition-all">
                        <div className="flex items-center mb-2 sm:mb-3">
                          <FiMapPin className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 mr-2" />
                          <h3 className="font-semibold text-gray-900 text-sm sm:text-base">Contact Form</h3>
                        </div>
                        <p className="text-gray-600 text-xs sm:text-sm mb-3">
                          Prefer a form? Send us a message directly.
                        </p>
                        <Link
                          to="/contact"
                          className="inline-flex items-center justify-center px-3 py-2 sm:px-4 sm:py-2.5 rounded-md bg-green-600 text-white text-xs sm:text-sm font-medium shadow hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
                        >
                          Go to Contact Page
                        </Link>
                      </div>

                      {/* Location card */}
                      <div className="group rounded-lg sm:rounded-xl p-4 sm:p-5 bg-white border border-gray-200 hover:border-green-300 shadow-sm hover:shadow-md transition-all">
                        <div className="flex items-center mb-2 sm:mb-3">
                          <FiMapPin className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600 mr-2" />
                          <h3 className="font-semibold text-gray-900 text-sm sm:text-base">Location</h3>
                        </div>
                        <p className="text-gray-600 text-xs sm:text-sm">Online<br />Remote<br />Worldwide</p>
                      </div>

                    </div>
                  </motion.section>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CookiePolicy
