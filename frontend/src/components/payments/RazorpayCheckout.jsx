import { useState, useEffect } from 'react'
import { razorpayAPI } from '../../utils/api'
import toast from 'react-hot-toast'
import LoadingSpinner from '../ui/LoadingSpinner'

const RazorpayCheckout = ({ orderData, onSuccess }) => {
  const [isProcessing, setIsProcessing] = useState(false)
  const [razorpayConfig, setRazorpayConfig] = useState(null)

  useEffect(() => {
    // Load Razorpay configuration
    const loadConfig = async () => {
      try {
        const response = await razorpayAPI.getConfig()
        if (response.data.keyId) {
          setRazorpayConfig(response.data)
        } else {
          toast.error('Razorpay is not configured. Please contact administrator.')
        }
      } catch (error) {
        toast.error('Failed to load payment configuration')
      }
    }
    loadConfig()
  }, [])

  const handlePayment = async () => {
    if (!orderData || !razorpayConfig) {
      toast.error('Payment data not ready')
      return
    }
    if (!orderData.items || orderData.items.length === 0) {
      toast.error('Your cart is empty. Please add items before paying.')
      return
    }

    setIsProcessing(true)

    try {
      // Create Razorpay order
      const response = await razorpayAPI.createOrder({
        items: orderData.items,
        shippingAddress: orderData.shippingAddress
      })

      const { orderId, amount, currency } = response.data

      // Load Razorpay script
      const script = document.createElement('script')
      script.src = 'https://checkout.razorpay.com/v1/checkout.js'
      script.onload = () => {
        const options = {
          key: razorpayConfig.keyId,
          amount: amount,
          currency: currency,
          name: 'Kommercen',
          description: 'Order Payment',
          order_id: orderId,
          handler: async function (response) {
            try {
              // Verify payment
              const verifyResponse = await razorpayAPI.verifyPayment({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                shippingAddress: orderData.shippingAddress,
                billingAddress: orderData.billingAddress
              })

              if (verifyResponse.data) {
                toast.success('Payment successful! Order placed.')
                onSuccess(verifyResponse.data.order)
              }
            } catch (error) {
              toast.error('Payment verification failed')
            }
          },
          prefill: {
            name: orderData.shippingAddress.name,
            email: orderData.shippingAddress.email,
            contact: orderData.shippingAddress.phone || ''
          },
          notes: {
            address: orderData.shippingAddress.street
          },
          theme: {
            color: '#2563eb'
          },
          modal: {
            ondismiss: function() {
              setIsProcessing(false)
            }
          }
        }

        const rzp = new window.Razorpay(options)
        rzp.open()
      }
      script.onerror = () => {
        toast.error('Failed to load payment gateway')
        setIsProcessing(false)
      }
      document.body.appendChild(script)

    } catch (error) {
      const msg = error?.response?.data?.message || 'Payment failed. Please try again.'
      toast.error(msg)
      setIsProcessing(false)
    }
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <div className="text-center">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
        </div>
        <h3 className="text-lg font-semibold mb-2">Secure Payment</h3>
        <p className="text-gray-600 mb-6">
          Pay securely with Razorpay. Supports UPI, Cards, Net Banking, and Wallets.
        </p>
        
        <div className="space-y-4 mb-6">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <span className="text-sm font-medium">Subtotal</span>
            <span className="font-semibold">₹{orderData?.subtotal?.toFixed(2) || '0.00'}</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <span className="text-sm font-medium">Shipping</span>
            <span className="font-semibold">
              {orderData?.subtotal > 100 ? 'Free' : '₹10.00'}
            </span>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <span className="text-sm font-medium">GST (18%)</span>
            <span className="font-semibold">₹{orderData?.tax?.toFixed(2) || '0.00'}</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
            <span className="text-sm font-medium text-blue-900">Total</span>
            <span className="font-bold text-blue-900">₹{orderData?.total?.toFixed(2) || '0.00'}</span>
          </div>
        </div>

        <button
          onClick={handlePayment}
          disabled={isProcessing || !orderData}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isProcessing ? (
            <div className="flex items-center justify-center">
              <LoadingSpinner size="sm" />
              <span className="ml-2">Processing...</span>
            </div>
          ) : (
            `Pay ₹${orderData?.total?.toFixed(2) || '0.00'}`
          )}
        </button>

        <div className="mt-4 text-xs text-gray-500">
          <p>✓ Secure payment powered by Razorpay</p>
          <p>✓ Supports UPI, Cards, Net Banking, Wallets</p>
        </div>
      </div>
    </div>
  )
}

export default RazorpayCheckout
