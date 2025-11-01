// src/pages/StudentDashboard.tsx
import React, { useEffect, useMemo, useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import AssignmentCard from "../components/AssignmentCard";
import ConfirmModal from "../components/ConfirmModal";
import { loadAssignments, saveAssignments, loadUsers } from "../utils/localStorage";
import { Assignment, User } from "../data/mockData";

const StudentDashboard: React.FC = () => {
  const currentUserId = localStorage.getItem("currentUser") || "u1";
  const [assignments, setAssignments] = useState<Assignment[]>(loadAssignments());
  const [users] = useState<User[]>(loadUsers());
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedAssignmentId, setSelectedAssignmentId] = useState<string | null>(null);

  // Persist on change
  useEffect(() => {
    saveAssignments(assignments);
  }, [assignments]);

  // Filter assignments assigned to current student
  const myAssignments = useMemo(
    () => assignments.filter((a) => a.studentsAssigned.includes(currentUserId)),
    [assignments, currentUserId]
  );

  function openConfirm(assignmentId: string) {
    setSelectedAssignmentId(assignmentId);
    setConfirmOpen(true);
  }

  function handleFinalConfirm() {
    if (!selectedAssignmentId) return;
    setAssignments((prev) =>
      prev.map((a) => {
        if (a.id !== selectedAssignmentId) return a;
        const submissions = a.submissions.map((s) =>
          s.studentId === currentUserId
            ? { ...s, submitted: true, submittedAt: new Date().toISOString() }
            : s
        );
        return { ...a, submissions };
      })
    );
    setSelectedAssignmentId(null);
    setConfirmOpen(false);
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header (polished) */}
      <Header
        currentUserName={users.find((u) => u.id === currentUserId)?.name}
        role="student"
        onLogout={() => {
          localStorage.removeItem("currentUser");
          window.location.href = "/";
        }}
      />

      {/* Main container: sidebar + content */}
      <div className="max-w-5xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-[240px_1fr] gap-6">
        {/* Sidebar (hidden on small screens) */}
        <Sidebar role="student" />

        {/* Content area */}
        <main>
          <div className="mb-6">
            <h1 className="text-3xl font-bold">My Assignments</h1>
            <p className="text-gray-400 mt-1">View and confirm your submissions.</p>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {myAssignments.length === 0 ? (
              <div className="rounded-2xl p-6 bg-white/3 border border-gray-800/30 text-gray-300">
                You have no assignments assigned.
              </div>
            ) : (
              myAssignments.map((a) => (
                <AssignmentCard
                  key={a.id}
                  assignment={a}
                  role="student"
                  userId={currentUserId}
                  onTriggerConfirm={() => openConfirm(a.id)}
                />
              ))
            )}
          </div>
        </main>
      </div>

      {/* Confirmation modal */}
      <ConfirmModal
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleFinalConfirm}
        title="Confirm submission"
        message="Have you uploaded your work to the Drive link (or submitted through the required channel)? This action is final."
      />
    </div>
  );
};

export default StudentDashboard;
