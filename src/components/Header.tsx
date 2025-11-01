import React from "react";
import { FiLogOut, FiUser } from "react-icons/fi";

type Props = {
  currentUserName?: string;
  role?: "student" | "admin";
  onLogout?: () => void;
};

export default function Header({ currentUserName = "Demo User", role = "student", onLogout }: Props) {
  return (
    <header className="w-full bg-gradient-to-r from-gray-900/60 to-transparent backdrop-blur-sm border-b border-gray-800/60">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="px-3 py-1 rounded-lg bg-gradient-to-br from-accent/10 to-transparent">
            <span className="text-lg font-bold text-white tracking-tight">Joineazy</span>
          </div>
          <div className="text-sm text-gray-300 hidden sm:block">Assignment Dashboard</div>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right mr-2 hidden md:block">
            <div className="text-sm text-gray-200 font-medium">{currentUserName}</div>
            <div className="text-xs text-gray-400">{role}</div>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-gray-700/40 flex items-center justify-center text-white">
              <FiUser />
            </div>
            <button
              onClick={onLogout}
              className="px-3 py-1 rounded-full bg-white/6 hover:bg-white/10 text-sm text-white flex items-center gap-2"
            >
              <FiLogOut className="text-sm" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
