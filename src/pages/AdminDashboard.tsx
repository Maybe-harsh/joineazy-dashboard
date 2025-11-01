// src/pages/AdminDashboard.tsx
import React, { useEffect, useMemo, useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import CreateAssignmentForm from "../components/CreateAssignmentForm";
import StudentListItem from "../components/StudentListItem";
import ProgressBar from "../components/ProgressBar";
import { loadAssignments, saveAssignments, loadUsers } from "../utils/localStorage";
import { Assignment, User } from "../data/mockData";
import { computeCompletionPercent } from "../utils/helpers";

const AdminDashboard: React.FC = () => {
  const currentUserId = localStorage.getItem("currentUser") || "admin1";

  const [users, setUsers] = useState<User[]>(loadUsers());
  const [assignments, setAssignments] = useState<Assignment[]>(loadAssignments());
  const [showCreate, setShowCreate] = useState(false);

  useEffect(() => {
    saveAssignments(assignments);
  }, [assignments]);

  // Assignments created by current admin
  const myAssignments = useMemo(
    () => assignments.filter((a) => a.createdBy === currentUserId),
    [assignments, currentUserId]
  );

  function handleCreate(newAssignment: Assignment) {
    setAssignments((prev) => [newAssignment, ...prev]);
    setShowCreate(false);
  }

  function toggleStudentSubmission(assignmentId: string, studentId: string, value: boolean) {
    setAssignments((prev) =>
      prev.map((a) => {
        if (a.id !== assignmentId) return a;
        const submissions = a.submissions.map((s) =>
          s.studentId === studentId ? { ...s, submitted: value, submittedAt: value ? new Date().toISOString() : undefined } : s
        );
        return { ...a, submissions };
      })
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header
        currentUserName={users.find((u) => u.id === currentUserId)?.name || "Admin (Demo)"}
        role="admin"
        onLogout={() => {
          localStorage.removeItem("currentUser");
          window.location.href = "/";
        }}
      />

      <div className="max-w-5xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-[240px_1fr] gap-6">
        <Sidebar role="admin" onCreate={() => setShowCreate(true)} />

        <main>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold">Assignments I Created</h1>
              <p className="text-gray-400 mt-1">Create assignments and track student submissions.</p>
            </div>

            <div className="hidden sm:flex items-center gap-3">
              <button
                onClick={() => setShowCreate(true)}
                className="px-4 py-2 rounded-full bg-accent text-white shadow hover:brightness-105"
              >
                + New Assignment
              </button>
            </div>
          </div>

          <div className="grid gap-5">
            {myAssignments.length === 0 && (
              <div className="rounded-2xl p-6 bg-white/3 border border-gray-800/30 text-gray-300">
                You haven’t created any assignments yet — click “New Assignment” to get started.
              </div>
            )}

            {myAssignments.map((a) => (
              <div key={a.id} className="rounded-2xl p-5 bg-gradient-to-b from-white/3 to-transparent border border-gray-800/40 shadow-md">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-semibold text-white">{a.title}</h3>
                      {a.driveLink && (
                        <a
                          href={a.driveLink}
                          target="_blank"
                          rel="noreferrer"
                          className="text-xs text-accent/90 flex items-center gap-1"
                        >
                          Drive
                        </a>
                      )}
                    </div>
                    <p className="text-sm text-gray-300 mt-2">{a.description}</p>
                    <div className="mt-3 text-xs text-gray-400">
                      Due: <span className="text-gray-200">{a.dueDate ?? "-"}</span>
                    </div>
                  </div>

                  <div className="w-48 flex flex-col items-end gap-3">
                    <div className="w-full">
                      <ProgressBar percent={computeCompletionPercent(a)} />
                    </div>
                    <div className="text-xs text-gray-400">{computeCompletionPercent(a)}% completed</div>
                  </div>
                </div>

                {/* Student list */}
                <div className="mt-4 border-t pt-3">
                  <div className="text-sm font-medium mb-2">Students</div>
                  <div className="bg-gray-800/20 rounded">
                    {a.submissions.map((s) => {
                      const user = users.find((u) => u.id === s.studentId);
                      if (!user) return null;
                      return (
                        <StudentListItem
                          key={s.studentId}
                          student={user}
                          submitted={s.submitted}
                          onToggle={(sid, val) => toggleStudentSubmission(a.id, sid, val)}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>

      {showCreate && (
        <CreateAssignmentForm
          users={users}
          creatorId={currentUserId}
          onCreate={handleCreate}
          onClose={() => setShowCreate(false)}
        />
      )}
    </div>
  );
};

export default AdminDashboard;
