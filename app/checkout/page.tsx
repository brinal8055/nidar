import { CheckoutPanel } from "@/components/checkout-panel";

export default function CheckoutPage() {
  return (
    <section className="section">
      <div className="container page-intro">
        <p className="eyebrow">Checkout</p>
        <h1>Collect the consult fee with a simple, explainable handoff.</h1>
        <p>
          The first version should be straightforward enough to wire into Razorpay or a fallback gateway
          without reshaping the user journey.
        </p>
      </div>

      <div className="container">
        <CheckoutPanel />
      </div>
    </section>
  );
}
