import { CheckoutPanel } from "@/components/checkout-panel";

export default function CheckoutPage() {
  return (
    <section className="section">
      <div className="container page-intro">
        <p className="eyebrow">Consult request</p>
        <h1>Submit the request with a simple, explainable handoff.</h1>
        <p>
          The launch flow keeps the handoff clear: contact details, doctor-review expectation,
          and payment collection only after the payment gateway is ready.
        </p>
      </div>

      <div className="container">
        <CheckoutPanel />
      </div>
    </section>
  );
}
