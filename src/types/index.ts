export const Status = {
  BACKLOG: "backlog",
  IN_PROGRESS: "in_progress",
  REVIEW: "review",
  DONE: "done",
} as const;

export type Status = (typeof Status)[keyof typeof Status];

export const Priority = {
  LOW: "low",
  MEDIUM: "medium",
  HIGH: "high",
  URGENT: "urgent",
} as const;

export type Priority = (typeof Priority)[keyof typeof Priority];

export const Mode = {
  CREATE: "create",
  EDIT: "edit",
} as const;

export type Mode = (typeof Mode)[keyof typeof Mode];

export interface Task {
  id: string;
  title: string;
  description: string;
  status: Status;
  priority: Priority;
}
