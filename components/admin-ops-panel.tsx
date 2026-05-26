"use client";

import { useEffect, useMemo, useState } from "react";

import { getSupabaseBrowserClient } from "@/lib/supabase-browser";

type CaseRow = {
  id: string;
  assigned_doctor_id: string | null;
  case_number: string;
  contact_email: string;
  contact_full_name: string;
  contact_phone: string;
  created_at: string;
  payment_status: string;
  priority: string;
  status: string;
  updated_at: string;
  vertical: string;
};

type DoctorRow = {
  user_id: string;
  display_name: string;
  active: boolean;
};

type AuditRow = {
  id: string;
  case_id: string | null;
  created_at: string;
  event_type: string;
};

export function AdminOpsPanel() {
  const [cases, setCases] = useState<CaseRow[]>([]);
  const [doctors, setDoctors] = useState<DoctorRow[]>([]);
  const [auditEvents, setAuditEvents] = useState<AuditRow[]>([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [verticalFilter, setVerticalFilter] = useState("all");
  const [doctorByCase, setDoctorByCase] = useState<Record<string, string>>({});
  const [noteByCase, setNoteByCase] = useState<Record<string, string>>({});
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const filteredCases = useMemo(
    () =>
      cases.filter((item) => {
        const statusMatch = statusFilter === "all" || item.status === statusFilter;
        const verticalMatch = verticalFilter === "all" || item.vertical === verticalFilter;
        return statusMatch && verticalMatch;
      }),
    [cases, statusFilter, verticalFilter],
  );

  async function loadData() {
    const supabase = getSupabaseBrowserClient();

    if (!supabase) {
      setMessage("Supabase is not configured.");
      setLoading(false);
      return;
    }

    setLoading(true);
    const [caseResult, doctorResult, auditResult] = await Promise.all([
      supabase
        .from("cases")
        .select("id, assigned_doctor_id, case_number, contact_email, contact_full_name, contact_phone, created_at, payment_status, priority, status, updated_at, vertical")
        .order("created_at", { ascending: false })
        .limit(50),
      supabase
        .from("doctor_profiles")
        .select("user_id, display_name, active")
        .eq("active", true)
        .order("created_at", { ascending: false }),
      supabase
        .from("audit_events")
        .select("id, case_id, created_at, event_type")
        .order("created_at", { ascending: false })
        .limit(20),
    ]);

    if (caseResult.error) {
      setMessage(caseResult.error.message);
    } else {
      setCases((caseResult.data || []) as CaseRow[]);
    }

    if (!doctorResult.error) {
      setDoctors((doctorResult.data || []) as DoctorRow[]);
    }

    if (!auditResult.error) {
      setAuditEvents((auditResult.data || []) as AuditRow[]);
    }

    setLoading(false);
  }

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void loadData();
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  async function invokeFunction(name: string, body: Record<string, unknown>) {
    const supabase = getSupabaseBrowserClient();

    if (!supabase) {
      return "Supabase is not configured.";
    }

    const { error } = await supabase.functions.invoke(name, { body });
    return error?.message || "";
  }

  async function assignCase(caseId: string) {
    const doctorId = doctorByCase[caseId];

    if (!doctorId) {
      setMessage("Select a doctor before assigning.");
      return;
    }

    const error = await invokeFunction("assign_case", { caseId, doctorId, reason: "admin_manual_assignment" });
    setMessage(error || "Doctor assigned and audit event created.");
    await loadData();
  }

  async function updateFulfilment(caseId: string) {
    const error = await invokeFunction("update_fulfilment", {
      caseId,
      orderType: "pharmacy_or_lab",
      partnerName: "Manual partner",
      status: "created",
      payload: { source: "admin_portal" },
    });
    setMessage(error || "Fulfilment update saved with audit event.");
    await loadData();
  }

  async function addSupportNote(caseId: string) {
    const note = noteByCase[caseId]?.trim();

    if (!note) {
      setMessage("Add a note before saving.");
      return;
    }

    const error = await invokeFunction("support_note", { caseId, note });
    setMessage(error || "Support note saved with audit event.");
    setNoteByCase((current) => ({ ...current, [caseId]: "" }));
    await loadData();
  }

  return (
    <section className="admin-page">
      <div className="admin-section-header">
        <div>
          <p className="eyebrow">Live data</p>
          <h2>Case operations</h2>
        </div>
        <button type="button" className="button button--secondary button--compact" onClick={loadData}>
          Refresh
        </button>
      </div>

      {message ? <p className="form-error">{message}</p> : null}

      <div className="admin-filter-grid">
        <label className="field">
          <span>Status</span>
          <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>
            <option value="all">All statuses</option>
            <option value="awaiting_assignment">Awaiting assignment</option>
            <option value="awaiting_review">Awaiting review</option>
            <option value="approved">Approved</option>
            <option value="declined">Declined</option>
            <option value="referred">Referred</option>
          </select>
        </label>
        <label className="field">
          <span>Vertical</span>
          <select value={verticalFilter} onChange={(event) => setVerticalFilter(event.target.value)}>
            <option value="all">All verticals</option>
            <option value="hair_care">Hair Care</option>
            <option value="health_tracking">Health Tracking</option>
            <option value="mens_health">Men&apos;s Health</option>
            <option value="womens_health">Women&apos;s Health</option>
          </select>
        </label>
      </div>

      {loading ? <p className="subtle">Loading cases through Supabase RLS...</p> : null}

      <div className="admin-queue-list">
        {filteredCases.map((item) => (
          <article key={item.id} className="admin-case-row">
            <div className="admin-case-row__top">
              <div>
                <p className="eyebrow">{item.case_number}</p>
                <h2>{item.contact_full_name || item.contact_email}</h2>
              </div>
              <span className={`status-badge status-badge--${item.status}`}>{item.status.replaceAll("_", " ")}</span>
            </div>
            <p>
              {item.vertical.replaceAll("_", " ")} · Payment {item.payment_status} · {item.contact_phone}
            </p>
            <div className="admin-filter-grid">
              <label className="field">
                <span>Assign doctor</span>
                <select
                  value={doctorByCase[item.id] || item.assigned_doctor_id || ""}
                  onChange={(event) => setDoctorByCase((current) => ({ ...current, [item.id]: event.target.value }))}
                >
                  <option value="">Select doctor</option>
                  {doctors.map((doctor) => (
                    <option key={doctor.user_id} value={doctor.user_id}>
                      {doctor.display_name}
                    </option>
                  ))}
                </select>
              </label>
              <button type="button" className="button button--primary button--compact" onClick={() => assignCase(item.id)}>
                Assign
              </button>
              <button type="button" className="button button--secondary button--compact" onClick={() => updateFulfilment(item.id)}>
                Add fulfilment
              </button>
            </div>
            <label className="field">
              <span>Support note</span>
              <textarea
                rows={2}
                value={noteByCase[item.id] || ""}
                onChange={(event) => setNoteByCase((current) => ({ ...current, [item.id]: event.target.value }))}
              />
            </label>
            <button type="button" className="button button--secondary button--compact" onClick={() => addSupportNote(item.id)}>
              Save note
            </button>
          </article>
        ))}
      </div>

      {!loading && !filteredCases.length ? (
        <article className="admin-metric-card admin-metric-card--wide">
          <h2>No cases visible.</h2>
          <p>Either no cases exist yet, or RLS is correctly preventing this account from reading them.</p>
        </article>
      ) : null}

      <article className="admin-metric-card admin-metric-card--wide">
        <p className="eyebrow">Audit events</p>
        <h2>Latest backend actions</h2>
        <div className="admin-queue-list">
          {auditEvents.map((event) => (
            <div key={event.id} className="admin-mini-row">
              <div>
                <strong>{event.event_type.replaceAll("_", " ")}</strong>
                <p>{event.case_id || "No case id"} · {new Date(event.created_at).toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      </article>
    </section>
  );
}
