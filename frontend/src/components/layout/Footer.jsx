import { Link } from 'react-router-dom'
import { FiLinkedin, FiGlobe } from 'react-icons/fi'
import { FaGithub } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container-custom py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">K</span>
              </div>
              <span className="text-xl font-bold">Kommercen</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Your marketplace, simplified. Great products, smooth checkout, and fast delivery.
            </p>
            <div className="flex items-center gap-3" />
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-semibold text-white/90 tracking-wide mb-3">Links</h3>
              <ul className="space-y-2">
                <li><Link to="/" className="text-gray-400 hover:text-white transition-colors text-sm">Home</Link></li>
                <li><Link to="/products" className="text-gray-400 hover:text-white transition-colors text-sm">Products</Link></li>
                <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors text-sm">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white/90 tracking-wide mb-3">Legal</h3>
              <ul className="space-y-2">
                <li><Link to="/privacy" className="text-gray-400 hover:text-white transition-colors text-sm">Privacy Policy</Link></li>
                <li><Link to="/terms" className="text-gray-400 hover:text-white transition-colors text-sm">Terms</Link></li>
                <li><Link to="/cookies" className="text-gray-400 hover:text-white transition-colors text-sm">Cookie Policy</Link></li>
              </ul>
            </div>
          </div>

          {/* Contact / Social */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-white/90 tracking-wide mb-3">Contact</h3>
            <div className="flex items-center gap-3">
              <a
                href="https://github.com/saurav-kumar-sah-dev"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-3 py-2 rounded-md bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-colors text-sm"
              >
                <FaGithub className="w-4 h-4 mr-2" /> GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/sauravkumarsah-dev/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-3 py-2 rounded-md bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-colors text-sm"
              >
                <FiLinkedin className="w-4 h-4 mr-2" /> LinkedIn
              </a>
              <a
                href="https://saurav-portfolio-dun.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-3 py-2 rounded-md bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-colors text-sm"
              >
                <FiGlobe className="w-4 h-4 mr-2" /> Portfolio
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3">
            <p className="text-gray-400 text-xs md:text-sm">© 2025 Kommercen. All rights reserved.</p>
            <div className="text-gray-500 text-xs md:text-sm">Made with ❤️ in India</div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
