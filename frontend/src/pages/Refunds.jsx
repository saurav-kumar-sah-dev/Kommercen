import { Helmet } from 'react-helmet-async'

function Refunds() {
  return (
    <div className="container-custom py-10">
      <Helmet>
        <title>Cancellation & Refunds — Kommercen</title>
        <meta name="description" content="Cancellation and refund policy for Kommercen" />
      </Helmet>

      <h1 className="mb-4 text-2xl font-bold">Cancellation & Refunds</h1>
      <p className="mb-6 text-gray-600">Last updated: {new Date().toLocaleDateString()}</p>

      <div className="prose max-w-none">
        <h2>Order Cancellation</h2>
        <p>
          Orders can be cancelled before they are shipped. To cancel, go to your orders page
          or contact us at the earliest. Once shipped, cancellation is no longer possible and
          the order may be eligible for a return after delivery subject to our return policy.
        </p>

        <h2>Returns & Eligibility</h2>
        <p>
          Returns are accepted for eligible items within 7 days of delivery in unused
          condition with original packaging. Certain items such as perishable goods or
          intimate products may be non‑returnable. Please check the product page for
          eligibility.
        </p>

        <h2>Refund Method & Timeline</h2>
        <p>
          Approved refunds are initiated to the original payment method within 5–7 business
          days after we receive and inspect the returned item or confirm cancellation.
          Bank processing times may vary.
        </p>

        <h2>Damaged or Wrong Items</h2>
        <p>
          If you receive a damaged, defective, or incorrect item, please raise a request
          within 48 hours of delivery with photos, and we will resolve it on priority.
        </p>

        <h2>How to Request</h2>
        <p>
          To request a cancellation, return, or refund, please use the <a href="/contact">Contact</a>
          page with your order ID and reason. Our team will guide you through the steps.
        </p>
      </div>
    </div>
  )
}

export default Refunds


