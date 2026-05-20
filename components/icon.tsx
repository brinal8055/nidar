type IconName =
  | "assignment"
  | "check_circle"
  | "clinical_notes"
  | "dermatology"
  | "event_repeat"
  | "fact_check"
  | "inventory_2"
  | "local_pharmacy"
  | "male"
  | "photo_camera"
  | "rule"
  | "science"
  | "stethoscope"
  | "timeline"
  | "verified"
  | "video_camera_front";

type IconProps = {
  name: IconName | string;
  className?: string;
  "aria-hidden"?: boolean;
};

const iconPaths: Record<IconName, string[]> = {
  assignment: [
    "M9 5h6",
    "M9 9h6",
    "M9 13h4",
    "M7 3h10a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z",
    "M9 3a3 3 0 0 1 6 0",
  ],
  check_circle: ["M8.8 12.2 11 14.4 15.5 9.6", "M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"],
  clinical_notes: [
    "M7 4h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z",
    "M9 8h6",
    "M9 12h6",
    "M9 16h3",
    "M14 15h4",
    "M16 13v4",
  ],
  dermatology: [
    "M12 3c3 3 6 6 6 10a6 6 0 0 1-12 0c0-4 3-7 6-10Z",
    "M9 13c1.4 1 4.6 1 6 0",
    "M9.5 9.5h.01",
    "M14.5 9.5h.01",
  ],
  event_repeat: [
    "M7 3v3",
    "M17 3v3",
    "M4 8h16",
    "M6 5h12a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z",
    "M9 14h6",
    "M13 12l2 2-2 2",
    "M15 18H9",
    "M11 16l-2 2 2 2",
  ],
  fact_check: ["M5 5h14v14H5Z", "M8 9h3", "M8 13h3", "M13 9l1.4 1.4L17 8", "M13 14l1.4 1.4L17 13"],
  inventory_2: ["M4 7h16", "M6 7v13h12V7", "M8 4h8l2 3H6l2-3Z", "M10 11h4"],
  local_pharmacy: ["M10 4h4v6h6v4h-6v6h-4v-6H4v-4h6Z"],
  male: ["M10 14a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z", "M13 7l6-6", "M15 1h4v4"],
  photo_camera: [
    "M4 8h3l1.5-2h7L17 8h3v11H4Z",
    "M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z",
    "M18 11h.01",
  ],
  rule: ["M5 4h14v16H5Z", "M8 8h5", "M8 12h8", "M8 16h3", "M14 15l1.5 1.5L19 13"],
  science: ["M9 3h6", "M10 3v5l-5 9a3 3 0 0 0 2.6 4.5h8.8A3 3 0 0 0 19 17l-5-9V3", "M8 15h8"],
  stethoscope: [
    "M6 4v5a4 4 0 0 0 8 0V4",
    "M4 4h4",
    "M12 4h4",
    "M10 15v1a4 4 0 0 0 8 0v-2",
    "M20 12a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z",
  ],
  timeline: ["M4 6h5", "M4 12h10", "M4 18h16", "M17 9l3 3-3 3", "M9 6a2 2 0 1 0 0 .01"],
  verified: ["M12 3l2 2 3-.5 1 2.8 2.5 1.7-1 3 1 3-2.5 1.7-1 2.8-3-.5-2 2-2-2-3 .5-1-2.8-2.5-1.7 1-3-1-3 2.5-1.7 1-2.8 3 .5 2-2Z", "M8.8 12.4l2 2 4.5-5"],
  video_camera_front: ["M5 7h10v10H5Z", "M15 10l4-2v8l-4-2", "M8 11h4", "M10 9v4"],
};

export function Icon({ name, className, "aria-hidden": ariaHidden = true }: IconProps) {
  const paths = iconPaths[name as IconName] ?? iconPaths.assignment;

  return (
    <svg
      aria-hidden={ariaHidden}
      className={className}
      fill="none"
      focusable="false"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      {paths.map((path) => (
        <path key={path} d={path} />
      ))}
    </svg>
  );
}
