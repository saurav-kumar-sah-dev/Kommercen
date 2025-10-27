import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { FiSettings, FiShield, FiClock, FiMail, FiPhone, FiMapPin, FiEye, FiCircle } from 'react-icons/fi'

const CookiePolicy = () => {
  return (
    <>
      <Helmet>
        <title>Cookie Policy - Kommercen</title>
        <meta name="description" content="Cookie Policy for Kommercen e-commerce platform" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 py-8 md:py-12">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-5xl mx-auto"
          >
            {/* Header Section */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-700 rounded-2xl shadow-2xl p-8 md:p-12 mb-8 text-white"
            >
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                  <FiCircle className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold mb-2">Cookie Policy</h1>
                  <div className="flex items-center space-x-2 text-green-100">
                    <FiClock className="w-4 h-4" />
                    <span className="text-sm">Last updated: {new Date().toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
              <p className="text-green-100 text-lg leading-relaxed">
                This Cookie Policy explains how Kommercen uses cookies and similar technologies to enhance your browsing experience and provide personalized services.
              </p>
            </motion.div>

            {/* Content Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 md:p-10"
            >
              <div className="space-y-8">
                <motion.section
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border-l-4 border-blue-500"
                >
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                    <span className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">1</span>
                    What Are Cookies?
                  </h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Cookies are small text files that are stored on your device when you visit our website. They help us provide you with a better experience by remembering your preferences and enabling certain website functions.
                  </p>
                  <div className="bg-white rounded-lg p-4 shadow-sm mt-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                      <FiEye className="w-5 h-5 text-blue-600 mr-2" />
                      Types of Data Stored
                    </h3>
                    <ul className="list-disc list-inside text-gray-700 space-y-2">
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
                  className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border-l-4 border-green-500"
                >
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                    <span className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">2</span>
                    Types of Cookies We Use
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                        <FiShield className="w-5 h-5 text-green-600 mr-2" />
                        Essential Cookies
                      </h3>
                      <p className="text-gray-700 mb-3">Required for basic website functionality</p>
                      <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
                        <li>Authentication and login</li>
                        <li>Shopping cart functionality</li>
                        <li>Security and fraud prevention</li>
                        <li>Load balancing</li>
                      </ul>
                    </div>
                    
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                        <FiSettings className="w-5 h-5 text-blue-600 mr-2" />
                        Preference Cookies
                      </h3>
                      <p className="text-gray-700 mb-3">Remember your settings and preferences</p>
                      <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
                        <li>Language selection</li>
                        <li>Currency preferences</li>
                        <li>Theme settings</li>
                        <li>Display preferences</li>
                      </ul>
                    </div>
                    
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                        <FiEye className="w-5 h-5 text-purple-600 mr-2" />
                        Analytics Cookies
                      </h3>
                      <p className="text-gray-700 mb-3">Help us understand website usage</p>
                      <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
                        <li>Page views and visits</li>
                        <li>User behavior tracking</li>
                        <li>Performance monitoring</li>
                        <li>Error reporting</li>
                      </ul>
                    </div>
                    
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                        <FiCircle className="w-5 h-5 text-orange-600 mr-2" />
                        Marketing Cookies
                      </h3>
                      <p className="text-gray-700 mb-3">Used for targeted advertising</p>
                      <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
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
                  className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border-l-4 border-purple-500"
                >
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                    <span className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">3</span>
                    Third-Party Cookies
                  </h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    We use third-party services that may set their own cookies. These services help us provide better functionality and analytics:
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <h3 className="font-semibold text-gray-800 mb-2">Payment Processing</h3>
                      <p className="text-gray-600 text-sm">Razorpay cookies for secure payment processing</p>
                    </div>
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <h3 className="font-semibold text-gray-800 mb-2">Image Storage</h3>
                      <p className="text-gray-600 text-sm">Cloudinary cookies for image optimization</p>
                    </div>
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <h3 className="font-semibold text-gray-800 mb-2">Analytics</h3>
                      <p className="text-gray-600 text-sm">Vercel analytics for performance monitoring</p>
                    </div>
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <h3 className="font-semibold text-gray-800 mb-2">Social Media</h3>
                      <p className="text-gray-600 text-sm">Social platform cookies for sharing features</p>
                    </div>
                  </div>
                </motion.section>

                <motion.section
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.9 }}
                  className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-6 border-l-4 border-orange-500"
                >
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                    <span className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">4</span>
                    Managing Your Cookie Preferences
                  </h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    You have control over cookies and can manage your preferences:
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <h3 className="text-lg font-semibold text-gray-800 mb-3">Browser Settings</h3>
                      <p className="text-gray-700 mb-3">Most browsers allow you to control cookies through settings:</p>
                      <ul className="list-disc list-inside text-gray-700 space-y-2 text-sm">
                        <li>Block all cookies</li>
                        <li>Block third-party cookies</li>
                        <li>Delete existing cookies</li>
                        <li>Set cookie expiration</li>
                      </ul>
                    </div>
                    
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <h3 className="text-lg font-semibold text-gray-800 mb-3">Cookie Consent</h3>
                      <p className="text-gray-700 mb-3">You can change your cookie preferences anytime:</p>
                      <ul className="list-disc list-inside text-gray-700 space-y-2 text-sm">
                        <li>Accept all cookies</li>
                        <li>Reject non-essential cookies</li>
                        <li>Customize preferences</li>
                        <li>Withdraw consent</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
                    <h4 className="font-semibold text-blue-900 mb-2">Important Note</h4>
                    <p className="text-blue-800 text-sm">
                      Disabling certain cookies may affect website functionality. Essential cookies are required for basic operations like login and shopping cart.
                    </p>
                  </div>
                </motion.section>

                <motion.section
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 1.0 }}
                  className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl p-6 border-l-4 border-indigo-500"
                >
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                    <span className="w-8 h-8 bg-indigo-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">5</span>
                    Cookie Retention Periods
                  </h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Different types of cookies are stored for different periods:
                  </p>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full bg-white rounded-lg shadow-sm">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Cookie Type</th>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Duration</th>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Purpose</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        <tr>
                          <td className="px-4 py-3 text-sm text-gray-700">Session Cookies</td>
                          <td className="px-4 py-3 text-sm text-gray-700">Until browser closes</td>
                          <td className="px-4 py-3 text-sm text-gray-700">Login sessions, shopping cart</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 text-sm text-gray-700">Preference Cookies</td>
                          <td className="px-4 py-3 text-sm text-gray-700">1 year</td>
                          <td className="px-4 py-3 text-sm text-gray-700">User settings, language</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 text-sm text-gray-700">Analytics Cookies</td>
                          <td className="px-4 py-3 text-sm text-gray-700">2 years</td>
                          <td className="px-4 py-3 text-sm text-gray-700">Usage statistics</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 text-sm text-gray-700">Marketing Cookies</td>
                          <td className="px-4 py-3 text-sm text-gray-700">6 months</td>
                          <td className="px-4 py-3 text-sm text-gray-700">Advertising, retargeting</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </motion.section>

                {/* Contact Section */}
                <motion.section
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.1 }}
                  className="bg-gradient-to-r from-gray-50 to-green-50 rounded-xl p-8 border border-gray-200"
                >
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                    <FiMail className="w-6 h-6 text-green-600 mr-3" />
                    Contact Us About Cookies
                  </h2>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    If you have any questions about our use of cookies or this Cookie Policy, please contact us:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                      <div className="flex items-center mb-3">
                        <FiMail className="w-5 h-5 text-green-600 mr-2" />
                        <h3 className="font-semibold text-gray-900">Email</h3>
                      </div>
                      <p className="text-gray-600">sauravshubham903@gmail.com</p>
                    </div>
                    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                      <div className="flex items-center mb-3">
                        <FiPhone className="w-5 h-5 text-blue-600 mr-2" />
                        <h3 className="font-semibold text-gray-900">Phone</h3>
                      </div>
                      <p className="text-gray-600">+91 (Available on request)</p>
                    </div>
                    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                      <div className="flex items-center mb-3">
                        <FiMapPin className="w-5 h-5 text-purple-600 mr-2" />
                        <h3 className="font-semibold text-gray-900">Address</h3>
                      </div>
                      <p className="text-gray-600">India<br />Remote Available<br />Global Services</p>
                    </div>
                  </div>
                </motion.section>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </>
  )
}

export default CookiePolicy
