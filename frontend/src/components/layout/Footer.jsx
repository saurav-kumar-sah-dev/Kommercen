import { Link } from 'react-router-dom'
import { FiLinkedin, FiGlobe } from 'react-icons/fi'
import { FaGithub } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className="relative overflow-hidden bg-gray-900 text-white">
      {/* Accent top border */}
      <div className="h-px w-full bg-gradient-to-r from-blue-600/60 via-purple-500/60 to-pink-500/60" />
      {/* Decorative background blur */}
      <div className="pointer-events-none absolute -top-24 right-[-10%] h-64 w-64 rounded-full bg-gradient-to-tr from-blue-600/20 to-purple-600/20 blur-3xl" />
      <div className="container-custom py-12 md:py-14">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 shadow-sm">
                <span className="text-white text-base font-bold">K</span>
              </div>
              <span className="text-xl font-bold tracking-tight">Kommercen</span>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-gray-400">
              Your marketplace, simplified. Great products, smooth checkout, and fast delivery.
            </p>
            <div className="flex items-center gap-3" />
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h3 className="mb-3 text-sm font-semibold tracking-wide text-white/90">Links</h3>
              <ul className="space-y-2">
                <li><Link to="/" className="text-sm text-gray-400 transition-colors hover:text-white">Home</Link></li>
                <li><Link to="/products" className="text-sm text-gray-400 transition-colors hover:text-white">Products</Link></li>
                <li><Link to="/contact" className="text-sm text-gray-400 transition-colors hover:text-white">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="mb-3 text-sm font-semibold tracking-wide text-white/90">Legal</h3>
              <ul className="space-y-2">
                <li><Link to="/privacy" className="text-sm text-gray-400 transition-colors hover:text-white">Privacy Policy</Link></li>
                <li><Link to="/terms" className="text-sm text-gray-400 transition-colors hover:text-white">Terms</Link></li>
                <li><Link to="/cookies" className="text-sm text-gray-400 transition-colors hover:text-white">Cookie Policy</Link></li>
                <li><Link to="/shipping" className="text-sm text-gray-400 transition-colors hover:text-white">Shipping Policy</Link></li>
                <li><Link to="/refunds" className="text-sm text-gray-400 transition-colors hover:text-white">Cancellation & Refunds</Link></li>
              </ul>
            </div>
          </div>

          {/* Contact / Social */}
          <div className="space-y-3">
            <h3 className="mb-3 text-sm font-semibold tracking-wide text-white/90">Contact</h3>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="https://github.com/saurav-kumar-sah-dev"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-300 backdrop-blur transition-all hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/10 hover:text-white"
              >
                <FaGithub className="h-4 w-4" /> GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/sauravkumarsah-dev/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-300 backdrop-blur transition-all hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/10 hover:text-white"
              >
                <FiLinkedin className="h-4 w-4" /> LinkedIn
              </a>
              <a
                href="https://saurav-portfolio-dun.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-300 backdrop-blur transition-all hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/10 hover:text-white"
              >
                <FiGlobe className="h-4 w-4" /> Portfolio
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 border-t border-white/10 pt-6">
          <div className="flex flex-col items-center justify-between gap-3 md:flex-row">
            <p className="text-xs text-gray-400 md:text-sm">© 2025 Kommercen. All rights reserved.</p>
            <div className="text-xs text-gray-500 md:text-sm">Made with ❤️ in India</div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
