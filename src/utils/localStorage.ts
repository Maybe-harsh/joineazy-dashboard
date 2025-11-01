// src/utils/localStorage.ts
import { assignments as mockAssignments, users as mockUsers, Assignment, User } from "../data/mockData";

const ASSIGN_KEY = "joineazy_assignments_v1";
const USER_KEY = "joineazy_users_v1";

/**
 * Load all assignments from localStorage.
 * If none are found, seed from mockAssignments.
 */
export function loadAssignments(): Assignment[] {
  const raw = localStorage.getItem(ASSIGN_KEY);
  if (raw) return JSON.parse(raw) as Assignment[];
  localStorage.setItem(ASSIGN_KEY, JSON.stringify(mockAssignments));
  return mockAssignments;
}

/**
 * Save updated assignments array to localStorage.
 */
export function saveAssignments(data: Assignment[]): void {
  localStorage.setItem(ASSIGN_KEY, JSON.stringify(data));
}

/**
 * Load all users (students & admins) from localStorage.
 * If none are found, seed from mockUsers.
 */
export function loadUsers(): User[] {
  const raw = localStorage.getItem(USER_KEY);
  if (raw) return JSON.parse(raw) as User[];
  localStorage.setItem(USER_KEY, JSON.stringify(mockUsers));
  return mockUsers;
}
