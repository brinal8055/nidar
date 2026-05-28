import { HealthTrackingQuiz } from "@/components/health-tracking-quiz";

export default function HealthTrackingUploadReportPage() {
  return (
    <section className="section">
      <div className="container page-intro">
        <p className="eyebrow">Upload existing report</p>
        <h1>Add a report for beta review.</h1>
        <p>
          Upload PDF or image reports privately for a beta request. AI can organize biomarkers, but
          clinical guidance requires doctor review.
        </p>
      </div>
      <div className="container">
        <HealthTrackingQuiz defaultMode="report_upload" />
      </div>
    </section>
  );
}
