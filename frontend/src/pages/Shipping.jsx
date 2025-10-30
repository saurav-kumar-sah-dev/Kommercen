import { Helmet } from 'react-helmet-async'

function Shipping() {
  return (
    <div className="container-custom py-10">
      <Helmet>
        <title>Shipping Policy — Kommercen</title>
        <meta name="description" content="Shipping policy for Kommercen orders" />
      </Helmet>

      <h1 className="mb-4 text-2xl font-bold">Shipping Policy</h1>
      <p className="mb-6 text-gray-600">Last updated: {new Date().toLocaleDateString()}</p>

      <div className="prose max-w-none">
        <h2>Dispatch Time</h2>
        <p>
          Orders are typically processed within 24–48 business hours. You will receive an
          email/SMS with tracking details once your order is dispatched.
        </p>

        <h2>Delivery Timeline</h2>
        <p>
          Standard delivery is expected within 3–7 business days for most pin codes. Remote
          locations may take longer. Delivery timelines are estimates and can vary due to
          courier operations, weather, or other factors beyond our control.
        </p>

        <h2>Shipping Fees</h2>
        <p>
          We offer free shipping on orders above the threshold displayed at checkout. For
          orders below the threshold, a nominal shipping fee is applied and shown before
          payment.
        </p>

        <h2>Order Tracking</h2>
        <p>
          After dispatch, you can track your shipment using the tracking link sent to your
          registered email/phone. You can also view your order status from the orders section
          of your account.
        </p>

        <h2>Non‑Delivery</h2>
        <p>
          If a delivery attempt fails due to an incorrect address or unavailability, the
          courier may reattempt delivery. In case of returns to origin, we will contact you to
          reship the order. Additional charges may apply for reshipment.
        </p>

        <h2>Contact</h2>
        <p>
          For any shipping queries, please contact us via the form on the <a href="/contact">Contact</a>
          page.
        </p>
      </div>
    </div>
  )
}

export default Shipping


