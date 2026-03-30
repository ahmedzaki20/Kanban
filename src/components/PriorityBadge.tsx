import { Priority } from "../types";
import type { Priority as PriorityType } from "../types";

interface Props {
  priority: PriorityType;
}

const PRIORITY_CONFIG: Record<
  PriorityType,
  { label: string; className: string; icon: string }
> = {
  [Priority.LOW]: {
    label: "Low",
    icon: "↓",
    className: "bg-gray-100 text-gray-600",
  },
  [Priority.MEDIUM]: {
    label: "Medium",
    icon: "→",
    className: "bg-blue-100 text-blue-600",
  },
  [Priority.HIGH]: {
    label: "High",
    icon: "↑",
    className: "bg-orange-100 text-orange-600",
  },
  [Priority.URGENT]: {
    label: "Urgent",
    icon: "⚑",
    className: "bg-red-100 text-red-600",
  },
};

export default function PriorityBadge({ priority }: Props) {
  const { label, className, icon } = PRIORITY_CONFIG[priority];

  return (
    <span
      className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${className}`}
    >
      <span>{icon}</span>
      {label}
    </span>
  );
}
