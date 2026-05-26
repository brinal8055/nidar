"use client";

import { useEffect, useMemo, useState } from "react";

import { getSupabaseBrowserClient } from "@/lib/supabase-browser";

type DoctorCase = {
  id: string;
  case_number: string;
  contact_full_name: string;
  created_at: string;
  status: string;
  vertical: string;
  case_intakes?: { eligibility_outcome: string | null; payload: Record<string, unknown> } | null;
  case_media?: { id: string; media_kind: string; object_path: string; required_angle: string | null }[];
};

const decisions = [
  { value: "approve", label: "Approve" },
  { value: "reject", label: "Reject" },
  { value: "request_more_info", label: "Request more info" },
  { value: "refer_in_person", label: "Refer in person" },
];

export function DoctorReviewPanel() {
  const [cases, setCases] = useState<DoctorCase[]>([]);
  const [selectedCaseId, setSelectedCaseId] = useState("");
  const [decision, setDecision] = useState("approve");
  const [notes, setNotes] = useState("");
  const [mediaUrls, setMediaUrls] = useState<Record<string, string>>({});
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const selectedCase = useMemo(
    () => cases.find((item) => item.id === selectedCaseId) || cases[0],
    [cases, selectedCaseId],
  );

  async function loadCases() {
    const supabase = getSupabaseBrowserClient();

    if (!supabase) {
      setMessage("Supabase is not configured.");
      setLoading(false);
      return;
    }

    setLoading(true);
    const { data, error } = await supabase
      .from("cases")
      .select("id, case_number, contact_full_name, created_at, status, vertical, case_intakes(eligibility_outcome, payload), case_media(id, media_kind, object_path, required_angle)")
      .order("created_at", { ascending: false })
      .limit(30);

    if (error) {
      setMessage(error.message);
    } else {
      const rows = (data || []) as unknown as DoctorCase[];
      setCases(rows);
      setSelectedCaseId((current) => current || rows[0]?.id || "");
    }

    setLoading(false);
  }

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void loadCases();
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  async function submitDecision() {
    const supabase = getSupabaseBrowserClient();

    if (!supabase || !selectedCase) {
      return;
    }

    const { error } = await supabase.functions.invoke("doctor_decision", {
      body: {
        caseId: selectedCase.id,
        decision,
        notes,
        payload: { source: "doctor_portal" },
      },
    });

    setMessage(error?.message || "Doctor decision submitted with audit event.");
    setNotes("");
    await loadCases();
  }

  async function loadMediaUrl(mediaId: string) {
    const supabase = getSupabaseBrowserClient();

    if (!supabase) {
      return;
    }

    const { data, error } = await supabase.functions.invoke<{ signedUrl: string }>("get_case_media_url", {
      body: { mediaId },
    });

    if (error || !data?.signedUrl) {
      setMessage(error?.message || "Unable to create signed media URL.");
      return;
    }

    setMediaUrls((current) => ({ ...current, [mediaId]: data.signedUrl }));
  }

  return (
    <section className="admin-page">
      <div className="admin-section-header">
        <div>
          <p className="eyebrow">Assigned cases only</p>
          <h2>Doctor review queue</h2>
        </div>
        <button type="button" className="button button--secondary button--compact" onClick={loadCases}>
          Refresh
        </button>
      </div>

      {message ? <p className="form-error">{message}</p> : null}
      {loading ? <p className="subtle">Loading assigned cases through Supabase RLS...</p> : null}

      <div className="admin-detail__grid">
        <aside className="admin-detail__side">
          <article className="admin-metric-card admin-metric-card--wide">
            <p className="eyebrow">Queue</p>
            <h2>Visible cases</h2>
            <div className="admin-queue-list">
              {cases.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className="admin-mini-row admin-mini-row--button"
                  onClick={() => setSelectedCaseId(item.id)}
                >
                  <div>
                    <strong>{item.case_number}</strong>
                    <p>{item.status.replaceAll("_", " ")} · {item.vertical.replaceAll("_", " ")}</p>
                  </div>
                </button>
              ))}
            </div>
          </article>
        </aside>

        <section className="admin-detail__main">
          {selectedCase ? (
            <>
              <article className="admin-case-row">
                <div className="admin-detail__header admin-section-header">
                  <div>
                    <p className="eyebrow">{selectedCase.case_number}</p>
                    <h1>{selectedCase.contact_full_name || "Patient"}</h1>
                    <p>
                      {selectedCase.vertical.replaceAll("_", " ")} · Eligibility{" "}
                      {selectedCase.case_intakes?.eligibility_outcome || "not recorded"}
                    </p>
                  </div>
                  <span className={`status-badge status-badge--${selectedCase.status}`}>
                    {selectedCase.status.replaceAll("_", " ")}
                  </span>
                </div>
              </article>

              <article className="admin-metric-card admin-metric-card--wide">
                <p className="eyebrow">Intake payload</p>
                <h2>AI-ready structured intake</h2>
                <pre className="admin-json-preview">
                  {JSON.stringify(selectedCase.case_intakes?.payload || {}, null, 2)}
                </pre>
              </article>

              <article className="admin-metric-card admin-metric-card--wide">
                <p className="eyebrow">Private media</p>
                <h2>Signed URLs only</h2>
                <div className="admin-queue-list">
                  {(selectedCase.case_media || []).map((media) => (
                    <div key={media.id} className="admin-mini-row">
                      <div>
                        <strong>{media.required_angle || media.media_kind}</strong>
                        <p>{media.object_path}</p>
                        {mediaUrls[media.id] ? (
                          <a href={mediaUrls[media.id]} target="_blank" rel="noreferrer">
                            Open short-lived URL
                          </a>
                        ) : null}
                      </div>
                      <button type="button" className="button button--secondary button--compact" onClick={() => loadMediaUrl(media.id)}>
                        View
                      </button>
                    </div>
                  ))}
                </div>
              </article>

              <article className="admin-metric-card admin-metric-card--wide">
                <p className="eyebrow">Decision</p>
                <h2>Submit doctor decision</h2>
                <label className="field">
                  <span>Decision</span>
                  <select value={decision} onChange={(event) => setDecision(event.target.value)}>
                    {decisions.map((item) => (
                      <option key={item.value} value={item.value}>
                        {item.label}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="field">
                  <span>Notes</span>
                  <textarea rows={4} value={notes} onChange={(event) => setNotes(event.target.value)} />
                </label>
                <button type="button" className="button button--primary" onClick={submitDecision}>
                  Submit decision
                </button>
              </article>
            </>
          ) : (
            <article className="admin-metric-card admin-metric-card--wide">
              <h2>No assigned cases visible.</h2>
              <p>Either no cases are assigned to this doctor, or RLS is preventing access as expected.</p>
            </article>
          )}
        </section>
      </div>
    </section>
  );
}
