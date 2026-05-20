import {
  AdminRole,
  CasePriority,
  CaseStatus,
  FulfilmentStatus,
  PrescriptionDecision,
  statusMeta,
  supportTagLabels,
} from "@/lib/admin/mock-data";

type StatusBadgeProps = {
  tone:
    | AdminRole
    | CaseStatus
    | FulfilmentStatus
    | CasePriority
    | PrescriptionDecision
    | keyof typeof supportTagLabels;
  label?: string;
};

export function StatusBadge({ tone, label }: StatusBadgeProps) {
  const resolvedLabel =
    label ??
    (tone in statusMeta
      ? statusMeta[tone as CaseStatus].label
      : tone in supportTagLabels
        ? supportTagLabels[tone as keyof typeof supportTagLabels]
        : tone.replaceAll("_", " "));

  return <span className={`status-badge status-badge--${tone}`}>{resolvedLabel}</span>;
}
