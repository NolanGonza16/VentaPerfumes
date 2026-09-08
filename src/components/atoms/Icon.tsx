export type IconName =
  | "arrow"
  | "home"
  | "grid"
  | "message"
  | "search"
  | "filters"
  | "close"
  | "plus"
  | "check";
const paths: Record<IconName, string> = {
  arrow: "M4 12h15m-6-6 6 6-6 6",
  home: "m3 10 9-7 9 7v10H3V10m7 10v-7h4v7",
  grid: "M3 3h7v7H3zm11 0h7v7h-7zM3 14h7v7H3zm11 0h7v7h-7z",
  message:
    "M21 11.5a8.5 8.5 0 0 1-12.6 7.4L3 21l2.1-5.4A8.5 8.5 0 1 1 21 11.5ZM8 11h8m-8 4h5",
  search: "M10.5 18a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15Zm5.5-2 5 5",
  filters: "M4 7h9m4 0h3M4 17h3m4 0h9M13 4v6M7 14v6",
  close: "m6 6 12 12M18 6 6 18",
  plus: "M12 5v14M5 12h14",
  check: "m5 12 4 4L19 6",
};
export default function Icon({
  name,
  className = "",
}: {
  name: IconName;
  className?: string;
}) {
  return (
    <svg
      className={`icon ${className}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={paths[name]} />
    </svg>
  );
}
