import { Link } from 'react-router-dom'
import { FiFacebook, FiTwitter, FiInstagram, FiLinkedin, FiMail, FiPhone, FiMapPin } from 'react-icons/fi'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">K</span>
              </div>
              <span className="text-xl font-bold">Kommercen</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Your marketplace, simplified. Discover amazing products at great prices with fast, reliable delivery.
            </p>
            <div className="flex space-x-4">
              <a href="https://github.com/saurav-kumar-sah-dev" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <FiFacebook className="w-5 h-5" />
              </a>
              <a href="https://www.linkedin.com/in/sauravkumarsah-dev/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <FiTwitter className="w-5 h-5" />
              </a>
              <a href="https://saurav-portfolio-dun.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <FiInstagram className="w-5 h-5" />
              </a>
              <a href="https://www.linkedin.com/in/sauravkumarsah-dev/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <FiLinkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/products" className="text-gray-400 hover:text-white transition-colors text-sm">
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/products?category=Electronics" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Electronics
                </Link>
              </li>
              <li>
                <Link to="/products?category=Clothing" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Clothing
                </Link>
              </li>
              <li>
                <Link to="/products?category=Home & Garden" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Home & Garden
                </Link>
              </li>
              <li>
                <Link to="/products?category=Sports" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Sports
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/help" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link to="/returns" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-400 hover:text-white transition-colors text-sm">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <FiMail className="w-4 h-4 text-gray-400" />
                <span className="text-gray-400 text-sm">sauravshubham903@gmail.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <FiPhone className="w-4 h-4 text-gray-400" />
                <span className="text-gray-400 text-sm">+91 (Available on request)</span>
              </div>
              <div className="flex items-start space-x-3">
                <FiMapPin className="w-4 h-4 text-gray-400 mt-1" />
                <span className="text-gray-400 text-sm">
                  India<br />
                  Remote Available<br />
                  Global Services
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © 2025 Kommercen. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors text-sm">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-white transition-colors text-sm">
                Terms of Service
              </Link>
              <Link to="/cookies" className="text-gray-400 hover:text-white transition-colors text-sm">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
