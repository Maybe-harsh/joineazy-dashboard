import React from "react";
import ProgressBar from "./ProgressBar";
import { FiExternalLink } from "react-icons/fi";

type Props = {
  assignment: any;
  role?: "student" | "admin";
  userId?: string;
  onTriggerConfirm?: () => void;
};

export default function AssignmentCard({ assignment, role = "student", userId, onTriggerConfirm }: Props) {
  const studentSubmission = assignment.submissions?.find((s: any) => s.studentId === userId);
  const submitted = !!studentSubmission?.submitted;
  const completion = Math.round((assignment.submissions.filter((s: any) => s.submitted).length / (assignment.submissions.length || 1)) * 100);

  return (
    <div className="bg-gradient-to-b from-white/3 to-transparent border border-gray-800/40 p-5 rounded-2xl shadow-md hover:shadow-lg transition transform hover:-translate-y-0.5">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h3 className="text-lg font-semibold text-white">{assignment.title}</h3>
            {assignment.driveLink && (
              <a href={assignment.driveLink} rel="noreferrer" target="_blank" className="text-xs text-accent/90 flex items-center gap-1">
                <FiExternalLink /> <span>Drive</span>
              </a>
            )}
          </div>
          <p className="text-sm text-gray-300 mt-2">{assignment.description}</p>
          <div className="mt-3 text-xs text-gray-400">Due: <span className="text-gray-200">{assignment.dueDate ?? "-"}</span></div>
        </div>

        <div className="w-36 flex flex-col items-end gap-3">
          {role === "student" ? (
            <>
              <div className={`text-sm ${submitted ? "text-green-400" : "text-yellow-300"}`}>{submitted ? "Submitted" : "Not Submitted"}</div>
              <button onClick={onTriggerConfirm} disabled={submitted} className="px-3 py-1 rounded-full bg-accent text-white text-sm disabled:opacity-60">
                {submitted ? "View" : "Confirm"}
              </button>
            </>
          ) : (
            <>
              <div className="w-full"><ProgressBar percent={completion} /></div>
              <div className="text-xs text-gray-400">{completion}%</div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
