import Link from "next/link";

export default function AdminPage() {
  return (
    <section className="section">
      <div className="container">
        <div className="card card--hero">
          <p className="eyebrow">Restricted workspace</p>
          <h1>Admin access is disabled for the public launch build.</h1>
          <p>
            Clinical review, audit logs, role-based access, and patient records should only be exposed
            after secure authentication and backend persistence are connected.
          </p>
          <Link href="/" className="button button--primary">
            Return home
          </Link>
        </div>
      </div>
    </section>
  );
}
