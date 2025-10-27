import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { FiShield, FiFileText, FiClock, FiMail, FiPhone, FiMapPin } from 'react-icons/fi'

const Terms = () => {
  return (
    <>
      <Helmet>
        <title>Terms and Conditions - Kommercen</title>
        <meta name="description" content="Terms and Conditions for Kommercen e-commerce platform" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50 py-8 md:py-12">
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
              className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 rounded-2xl shadow-2xl p-8 md:p-12 mb-8 text-white"
            >
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                  <FiFileText className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold mb-2">Terms and Conditions</h1>
                  <div className="flex items-center space-x-2 text-blue-100">
                    <FiClock className="w-4 h-4" />
                    <span className="text-sm">Last updated: {new Date().toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
              <p className="text-blue-100 text-lg leading-relaxed">
                Please read these terms carefully before using our service. By accessing Kommercen, you agree to be bound by these terms.
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
                    Acceptance of Terms
                  </h2>
                  <p className="text-gray-700 leading-relaxed">
                    By accessing and using Kommercen ("the Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                  </p>
                </motion.section>

                <motion.section
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                  className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border-l-4 border-green-500"
                >
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                    <span className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">2</span>
                    Use License
                  </h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Permission is granted to temporarily download one copy of Kommercen per device for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
                  </p>
                  <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                    <li>modify or copy the materials</li>
                    <li>use the materials for any commercial purpose or for any public display</li>
                    <li>attempt to reverse engineer any software contained on the website</li>
                    <li>remove any copyright or other proprietary notations from the materials</li>
                  </ul>
                </motion.section>

                <motion.section
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border-l-4 border-purple-500"
                >
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                    <span className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">3</span>
                    User Accounts
                  </h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    When you create an account with us, you must provide information that is accurate, complete, and current at all times. You are responsible for safeguarding the password and for all activities that occur under your account.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    You may not use as a username the name of another person or entity or that is not lawfully available for use, a name or trademark that is subject to any rights of another person or entity other than you without appropriate authorization.
                  </p>
                </motion.section>

                <motion.section
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.9 }}
                  className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-6 border-l-4 border-orange-500"
                >
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                    <span className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">4</span>
                    Product Information
                  </h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    We strive to provide accurate product descriptions, images, and pricing information. However, we do not warrant that product descriptions or other content is accurate, complete, reliable, current, or error-free.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    Product images are for illustrative purposes only and may not reflect the exact appearance of the product. Colors may vary depending on your device's display settings.
                  </p>
                </motion.section>

                <motion.section
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 1.0 }}
                  className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl p-6 border-l-4 border-indigo-500"
                >
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                    <span className="w-8 h-8 bg-indigo-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">5</span>
                    Pricing and Payment
                  </h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    All prices are displayed in Indian Rupees (INR) and are subject to change without notice. We reserve the right to modify prices at any time.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    Payment is processed securely through Razorpay. By making a purchase, you agree to the payment terms and conditions of our payment processor.
                  </p>
                </motion.section>

                <motion.section
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 1.1 }}
                  className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-xl p-6 border-l-4 border-teal-500"
                >
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                    <span className="w-8 h-8 bg-teal-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">6</span>
                    Shipping and Delivery
                  </h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    We aim to deliver products within 24-48 hours nationwide. Delivery times may vary based on location and product availability.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    Risk of loss and title for products purchased pass to you upon delivery to the carrier. We are not responsible for any loss or damage that occurs during shipping.
                  </p>
                </motion.section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Returns and Refunds</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We offer a 30-day return policy for most products. Items must be returned in their original condition with all tags and packaging intact.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Refunds will be processed within 5-7 business days after we receive the returned item. Refunds will be issued to the original payment method.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Prohibited Uses</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  You may not use our service:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                  <li>For any unlawful purpose or to solicit others to perform unlawful acts</li>
                  <li>To violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances</li>
                  <li>To infringe upon or violate our intellectual property rights or the intellectual property rights of others</li>
                  <li>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
                  <li>To submit false or misleading information</li>
                  <li>To upload or transmit viruses or any other type of malicious code</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Intellectual Property</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  The Service and its original content, features, and functionality are and will remain the exclusive property of Kommercen and its licensors. The Service is protected by copyright, trademark, and other laws.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Limitation of Liability</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  In no event shall Kommercen, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your use of the Service.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Governing Law</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  These Terms shall be interpreted and governed by the laws of India, without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">12. Changes to Terms</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days notice prior to any new terms taking effect.
                </p>
              </section>

                {/* Contact Section */}
                <motion.section
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.2 }}
                  className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-8 border border-gray-200"
                >
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                    <FiMail className="w-6 h-6 text-blue-600 mr-3" />
                    Contact Information
                  </h2>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    If you have any questions about these Terms and Conditions, please contact us:
                  </p>
                  {/* Unified Contact Section */}
                  <div className="bg-gradient-to-r from-blue-50 via-purple-50 to-indigo-50 rounded-3xl p-8 border border-gray-200 shadow-xl">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      {/* Email Section */}
                      <div className="flex flex-col lg:flex-row items-center lg:items-start space-y-4 lg:space-y-0 lg:space-x-6">
                        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                          <FiMail className="w-8 h-8 text-white" />
                        </div>
                        <div className="text-center lg:text-left">
                          <h3 className="text-xl font-bold text-gray-900 mb-2">Email Contact</h3>
                          <p className="text-gray-700 font-semibold text-lg mb-1">sauravshubham903@gmail.com</p>
                          <p className="text-gray-500 text-sm">Direct communication for any queries</p>
                        </div>
                      </div>

                      {/* Connect Section */}
                      <div className="space-y-4">
                        <div className="flex items-center justify-center lg:justify-start mb-4">
                          <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                            <FiMapPin className="w-8 h-8 text-white" />
                          </div>
                          <h3 className="text-xl font-bold text-gray-900 ml-4">Connect With Me</h3>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          {/* GitHub */}
                          <a 
                            href="https://github.com/saurav-kumar-sah-dev" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="group flex flex-col items-center p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
                          >
                            <div className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center mb-3 group-hover:bg-gray-900 transition-colors shadow-md">
                              <span className="text-white font-bold text-lg">GH</span>
                            </div>
                            <span className="text-gray-700 font-semibold text-sm text-center group-hover:text-gray-900">GitHub</span>
                            <span className="text-gray-500 text-xs text-center mt-1">Code & Projects</span>
                          </a>

                          {/* LinkedIn */}
                          <a 
                            href="https://www.linkedin.com/in/sauravkumarsah-dev/" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="group flex flex-col items-center p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
                          >
                            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mb-3 group-hover:bg-blue-700 transition-colors shadow-md">
                              <span className="text-white font-bold text-lg">LI</span>
                            </div>
                            <span className="text-gray-700 font-semibold text-sm text-center group-hover:text-gray-900">LinkedIn</span>
                            <span className="text-gray-500 text-xs text-center mt-1">Professional</span>
                          </a>

                          {/* Portfolio Contact */}
                          <a 
                            href="https://saurav-portfolio-dun.vercel.app/contact" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="group flex flex-col items-center p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
                          >
                            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mb-3 group-hover:from-green-600 group-hover:to-emerald-600 transition-all shadow-md">
                              <span className="text-white font-bold text-lg">PC</span>
                            </div>
                            <span className="text-gray-700 font-semibold text-sm text-center group-hover:text-gray-900">Portfolio</span>
                            <span className="text-gray-500 text-xs text-center mt-1">Contact Form</span>
                          </a>
                        </div>
                      </div>
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

export default Terms
