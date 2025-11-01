export type Assignment = {
  id: string;
  title: string;
  description?: string;
  dueDate?: string; // ISO
  driveLink?: string;
  createdBy: string; // admin id
  studentsAssigned: string[]; // student ids
  submissions: { studentId: string; submitted: boolean; submittedAt?: string }[];
};

export type User = {
  id: string;
  name: string;
  role: "student" | "admin";
};

export const users: User[] = [
  { id: "u1", name: "Alice", role: "student" },
  { id: "u2", name: "Bob", role: "student" },
  { id: "admin1", name: "Prof. Kumar", role: "admin" },
];

export const assignments: Assignment[] = [
  {
    id: "a1",
    title: "DBMS Assignment 1",
    description: "ER Diagram + Relational design",
    dueDate: "2025-11-05",
    driveLink: "https://drive.google.com/drive/fake-link",
    createdBy: "admin1",
    studentsAssigned: ["u1", "u2"],
    submissions: [
      { studentId: "u1", submitted: false },
      { studentId: "u2", submitted: true, submittedAt: "2025-10-28T12:00:00Z" },
    ],
  },
];
