import React from "react";
import { FiPlus, FiLayout, FiUsers } from "react-icons/fi";

type Props = {
  role?: "student" | "admin";
  onCreate?: () => void;
};

export default function Sidebar({ role = "student", onCreate }: Props) {
  return (
    <aside className="w-64 bg-transparent border-r border-gray-800/30 p-4 hidden md:block">
      <nav className="flex flex-col gap-2">
        <button className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-800/40 text-gray-200">
          <FiLayout /> <span>Dashboard</span>
        </button>

        {role === "admin" && (
          <>
            <button onClick={onCreate} className="flex items-center gap-3 px-3 py-2 rounded-lg bg-accent text-white hover:scale-[1.01] transform transition">
              <FiPlus /> <span>Create Assignment</span>
            </button>
            <button className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-800/40 text-gray-200">
              <FiUsers /> <span>Students</span>
            </button>
          </>
        )}

        {role === "student" && (
          <>
            <div className="mt-4 text-xs text-gray-400 px-3">Your panel</div>
            <button className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-800/40 text-gray-200">
              <FiUsers /> <span>My Assignments</span>
            </button>
          </>
        )}
      </nav>
    </aside>
  );
}
