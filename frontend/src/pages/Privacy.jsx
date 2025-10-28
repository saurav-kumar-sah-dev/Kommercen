import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { FiShield, FiLock, FiClock, FiMail, FiPhone, FiMapPin, FiEye, FiArrowLeft } from 'react-icons/fi'
import { Link } from 'react-router-dom'

const Privacy = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy - Kommercen</title>
        <meta name="description" content="Privacy Policy for Kommercen e-commerce platform" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 py-8 md:py-12">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-5xl mx-auto"
          >
            {/* Back Button */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-6 px-4 md:px-0"
            >
              <Link 
                to="/" 
                className="inline-flex items-center space-x-2 text-gray-600 hover:text-purple-700 transition-colors duration-300"
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
              className="bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-700 rounded-2xl shadow-2xl p-6 sm:p-8 md:p-12 mb-6 md:mb-8 text-white"
            >
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                  <FiShield className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">Privacy Policy</h1>
                  <div className="flex items-center space-x-2 text-purple-100">
                    <FiClock className="w-4 h-4" />
                    <span className="text-sm">Last updated: {new Date().toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
              <p className="text-purple-100 text-base sm:text-lg leading-relaxed">
                Your privacy is important to us. This policy explains how we collect, use, and protect your personal information when you use Kommercen.
              </p>
            </motion.div>

            {/* Content Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-4 sm:p-6 md:p-10"
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
                    Information We Collect
                  </h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    We collect information you provide directly to us, such as when you create an account, make a purchase, or contact us for support.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                        <FiEye className="w-5 h-5 text-blue-600 mr-2" />
                        Personal Information
                      </h3>
                      <ul className="list-disc list-inside text-gray-700 space-y-2">
                        <li>Name and email address</li>
                        <li>Phone number and shipping address</li>
                        <li>Payment information (processed securely through Razorpay)</li>
                        <li>Account preferences and settings</li>
                      </ul>
                    </div>
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                        <FiLock className="w-5 h-5 text-green-600 mr-2" />
                        Usage Information
                      </h3>
                      <ul className="list-disc list-inside text-gray-700 space-y-2">
                        <li>Pages visited and time spent on our website</li>
                        <li>Products viewed and purchased</li>
                        <li>Device information and browser type</li>
                        <li>IP address and location data</li>
                      </ul>
                    </div>
                  </div>
                </motion.section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. How We Use Your Information</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We use the information we collect to provide, maintain, and improve our services:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                  <li>Process and fulfill your orders</li>
                  <li>Send you order confirmations and shipping updates</li>
                  <li>Provide customer support</li>
                  <li>Improve our website and services</li>
                  <li>Send marketing communications (with your consent)</li>
                  <li>Prevent fraud and ensure security</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Information Sharing</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We do not sell, trade, or otherwise transfer your personal information to third parties except in the following circumstances:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                  <li><strong>Service Providers:</strong> We share information with trusted third parties who assist us in operating our website and conducting our business (e.g., payment processors, shipping companies)</li>
                  <li><strong>Legal Requirements:</strong> We may disclose information when required by law or to protect our rights and safety</li>
                  <li><strong>Business Transfers:</strong> In the event of a merger or acquisition, user information may be transferred as part of the business assets</li>
                  <li><strong>Consent:</strong> We may share information with your explicit consent</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Data Security</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                  <li>SSL encryption for data transmission</li>
                  <li>Secure payment processing through Razorpay</li>
                  <li>Regular security audits and updates</li>
                  <li>Access controls and authentication</li>
                  <li>Secure data storage and backup systems</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Cookies and Tracking</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We use cookies and similar tracking technologies to enhance your experience on our website:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                  <li><strong>Essential Cookies:</strong> Required for basic website functionality</li>
                  <li><strong>Analytics Cookies:</strong> Help us understand how visitors use our website</li>
                  <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
                  <li><strong>Marketing Cookies:</strong> Used to deliver relevant advertisements</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-4">
                  You can control cookie settings through your browser preferences. However, disabling certain cookies may affect website functionality.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Third-Party Services</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Our website integrates with third-party services that have their own privacy policies:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                  <li><strong>Razorpay:</strong> Payment processing and fraud prevention</li>
                  <li><strong>Cloudinary:</strong> Image storage and optimization</li>
                  <li><strong>MongoDB Atlas:</strong> Secure database hosting</li>
                  <li><strong>Vercel:</strong> Website hosting and analytics</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We encourage you to review the privacy policies of these third-party services.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Your Rights</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  You have the following rights regarding your personal information:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                  <li><strong>Access:</strong> Request a copy of your personal information</li>
                  <li><strong>Correction:</strong> Update or correct inaccurate information</li>
                  <li><strong>Deletion:</strong> Request deletion of your personal information</li>
                  <li><strong>Portability:</strong> Receive your data in a structured format</li>
                  <li><strong>Objection:</strong> Object to processing of your personal information</li>
                  <li><strong>Withdrawal:</strong> Withdraw consent for marketing communications</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-4">
                  To exercise these rights, please contact us using the information provided below.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Data Retention</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We retain your personal information for as long as necessary to provide our services and fulfill the purposes outlined in this privacy policy:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                  <li>Account information: Until you delete your account</li>
                  <li>Order information: 7 years for tax and legal compliance</li>
                  <li>Marketing data: Until you unsubscribe or withdraw consent</li>
                  <li>Analytics data: Aggregated and anonymized after 2 years</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Children's Privacy</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Our services are not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If we become aware that we have collected personal information from a child under 13, we will take steps to delete such information.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. International Data Transfers</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Your information may be transferred to and processed in countries other than your country of residence. We ensure that such transfers comply with applicable data protection laws and implement appropriate safeguards to protect your information.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Changes to This Privacy Policy</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We may update this privacy policy from time to time. We will notify you of any changes by posting the new privacy policy on this page and updating the "Last updated" date. We encourage you to review this privacy policy periodically for any changes.
                </p>
              </section>

                <motion.section
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                  className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border-l-4 border-green-500"
                >
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                    <span className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">2</span>
                    How We Use Your Information
                  </h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    We use the information we collect to provide, maintain, and improve our services:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <ul className="list-disc list-inside text-gray-700 space-y-2">
                      <li>Process and fulfill your orders</li>
                      <li>Send you order confirmations and shipping updates</li>
                      <li>Provide customer support</li>
                      <li>Improve our website and services</li>
                    </ul>
                    <ul className="list-disc list-inside text-gray-700 space-y-2">
                      <li>Send marketing communications (with your consent)</li>
                      <li>Prevent fraud and ensure security</li>
                      <li>Comply with legal obligations</li>
                    </ul>
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
                    Data Security
                  </h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <ul className="list-disc list-inside text-gray-700 space-y-2">
                      <li>SSL encryption for data transmission</li>
                      <li>Secure payment processing through Razorpay</li>
                      <li>Regular security audits and updates</li>
                    </ul>
                    <ul className="list-disc list-inside text-gray-700 space-y-2">
                      <li>Access controls and authentication</li>
                      <li>Secure data storage and backup systems</li>
                    </ul>
                  </div>
                </motion.section>

                {/* Contact Section (styled like Cookie Policy) */}
                <motion.section
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.9 }}
                  className="relative overflow-hidden bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 border border-green-100 shadow-lg"
                >
                  {/* decorative gradient blob */}
                  <div className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-gradient-to-br from-green-200/60 via-emerald-200/40 to-teal-200/30 blur-3xl" />

                  <div className="flex items-center justify-between flex-wrap gap-3 mb-4 sm:mb-6">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center">
                      <FiMail className="w-5 h-5 sm:w-6 sm:h-6 text-green-600 mr-2 sm:mr-3" />
                      Contact Us
                    </h2>
                    <span className="inline-flex items-center rounded-full bg-green-50 text-green-700 border border-green-200 px-2.5 py-1 text-xs sm:text-sm font-medium">
                      Typically responds within 24 hours
                    </span>
                  </div>

                  <p className="text-gray-700 leading-relaxed mb-4 sm:mb-6 text-sm sm:text-base">
                    If you have any questions about this privacy policy or our privacy practices, please reach out:
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
                      <a
                        href="/contact"
                        className="inline-flex items-center justify-center px-3 py-2 sm:px-4 sm:py-2.5 rounded-md bg-green-600 text-white text-xs sm:text-sm font-medium shadow hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
                      >
                        Go to Contact Page
                      </a>
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
    </>
  )
}

export default Privacy
