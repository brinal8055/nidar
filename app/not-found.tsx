import Link from "next/link";

export default function NotFound() {
  return (
    <section className="section">
      <div className="container">
        <div className="card card--hero">
          <p className="eyebrow">Not found</p>
          <h1>The page you were looking for does not exist.</h1>
          <p>The current routes are focused on the launch funnel, legal pages, and account status.</p>
          <Link href="/" className="button button--primary">
            Return home
          </Link>
        </div>
      </div>
    </section>
  );
}
