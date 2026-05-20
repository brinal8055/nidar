import { AccountDashboard } from "@/components/account-dashboard";

export default function AccountPage() {
  return (
    <section className="section">
      <div className="container page-intro">
        <p className="eyebrow">Account</p>
        <h1>Status visibility matters as much as conversion.</h1>
        <p>
          Patients should be able to check review progress, support messages, and future refill prompts
          without needing to contact support for every update.
        </p>
      </div>

      <div className="container">
        <AccountDashboard />
      </div>
    </section>
  );
}
