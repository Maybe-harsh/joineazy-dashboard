// helpers.ts
import { Assignment, User } from "../data/mockData";

/** Format an ISO date to a human readable string */
export function formatDate(iso?: string) {
  if (!iso) return "-";
  const d = new Date(iso);
  return d.toLocaleDateString();
}

/** Generate a reasonably-unique id (sufficient for demo) */
export function generateId(prefix = "") {
  return prefix + Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

/** Find a user in the user list */
export function getUserById(users: User[], id: string) {
  return users.find((u) => u.id === id) ?? null;
}

/** Compute completion percent for an assignment (0..100) */
export function computeCompletionPercent(assignment: Assignment) {
  const total = assignment.submissions?.length ?? 0;
  if (total === 0) return 0;
  const done = assignment.submissions.filter((s) => s.submitted).length;
  return Math.round((done / total) * 100);
}
