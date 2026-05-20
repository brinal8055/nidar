import Link from "next/link";

import { AdminQueueList } from "@/components/admin/admin-queue-list";
import { StatusBadge } from "@/components/admin/status-badge";
import {
  filterCases,
  getCaseStatuses,
  getOverviewMetrics,
  getQueueInsights,
  getRoleFilters,
  isAdminRole,
  isCaseStatus,
  roleMeta,
  statusMeta,
} from "@/lib/admin/mock-data";

type AdminPageProps = {
  searchParams: Promise<{
    status?: string;
    team?: string;
  }>;
};

export default async function AdminPage({ searchParams }: AdminPageProps) {
  const { status = "all", team = "all" } = await searchParams;
  const activeStatus: "all" | keyof typeof statusMeta =
    status === "all" || isCaseStatus(status) ? status : "all";
  const activeTeam: "all" | keyof typeof roleMeta =
    team === "all" || isAdminRole(team) ? team : "all";
  const cases = filterCases({ status: activeStatus, team: activeTeam });
  const metrics = getOverviewMetrics(cases);
  const statuses = getCaseStatuses();
  const roles = getRoleFilters();
  const insights = getQueueInsights();

  return (
    <div className="admin-page">
      <section className="card">
        <div className="admin-section-header">
          <div>
            <p className="eyebrow">Queue overview</p>
            <h2>Operational backbone for the public intake funnel</h2>
          </div>
          <div className="admin-chip-row">
            <StatusBadge
              tone={activeStatus === "all" ? "approved" : activeStatus}
              label={activeStatus === "all" ? "All statuses" : statusMeta[activeStatus].label}
            />
            <StatusBadge
              tone={activeTeam === "all" ? "approved" : activeTeam}
              label={activeTeam === "all" ? "All teams" : roleMeta[activeTeam].label}
            />
          </div>
        </div>

        <div className="admin-metrics-grid">
          {metrics.map((metric) => (
            <article key={metric.label} className="admin-metric-card">
              <span>{metric.label}</span>
              <strong>{metric.value}</strong>
              <p>{metric.helper}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="admin-filter-grid">
        <div className="card">
          <p className="eyebrow">Status filters</p>
          <div className="admin-chip-row">
            {statuses.map((entry) => (
              <Link
                key={entry}
                href={entry === "all" ? `/admin?team=${activeTeam}` : `/admin?status=${entry}&team=${activeTeam}`}
                className={`admin-filter-chip${activeStatus === entry ? " admin-filter-chip--active" : ""}`}
              >
                {entry === "all" ? "All" : statusMeta[entry].label}
              </Link>
            ))}
          </div>
        </div>

        <div className="card">
          <p className="eyebrow">Team filters</p>
          <div className="admin-chip-row">
            {roles.map((entry) => (
              <Link
                key={entry}
                href={
                  entry === "all"
                    ? activeStatus === "all"
                      ? "/admin"
                      : `/admin?status=${activeStatus}`
                    : activeStatus === "all"
                      ? `/admin?team=${entry}`
                      : `/admin?status=${activeStatus}&team=${entry}`
                }
                className={`admin-filter-chip${activeTeam === entry ? " admin-filter-chip--active" : ""}`}
              >
                {entry === "all" ? "All teams" : roleMeta[entry].label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="admin-two-col">
        <div className="card">
          <div className="admin-section-header">
            <div>
              <p className="eyebrow">Case queue</p>
              <h2>Review, triage, and handoff</h2>
            </div>
            <p className="subtle">{cases.length} cases in this filtered view.</p>
          </div>
          <AdminQueueList cases={cases} />
        </div>

        <div className="card">
          <p className="eyebrow">Operating notes</p>
          <div className="stack">
            {insights.map((item) => (
              <p key={item}>{item}</p>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
