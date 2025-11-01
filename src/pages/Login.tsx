// Login.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loadUsers } from "../utils/localStorage";

export default function Login() {
  const navigate = useNavigate();
  const users = loadUsers();

  const [selectedRole, setSelectedRole] = useState<"student" | "admin" | "">("");
  const [selectedUser, setSelectedUser] = useState<string>("");

  const handleLogin = () => {
    if (!selectedUser) {
      alert("Please select a user to continue");
      return;
    }

    // store selected user in localStorage
    localStorage.setItem("currentUser", selectedUser);

    // Redirect based on role
    if (selectedRole === "admin") {
      navigate("/admin");
    } else if (selectedRole === "student") {
      navigate("/student");
    } else {
      alert("Please select a role first");
    }
  };

  const roleUsers = users.filter((u) => u.role === selectedRole);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Joineazy Dashboard Login</h1>

        {/* Role Selection */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Role
          </label>
          <div className="flex gap-3">
            <button
              className={`flex-1 px-3 py-2 rounded border text-sm ${
                selectedRole === "student"
                  ? "bg-blue-600 text-white"
                  : "hover:bg-gray-50"
              }`}
              onClick={() => {
                setSelectedRole("student");
                setSelectedUser("");
              }}
            >
              Student
            </button>
            <button
              className={`flex-1 px-3 py-2 rounded border text-sm ${
                selectedRole === "admin"
                  ? "bg-blue-600 text-white"
                  : "hover:bg-gray-50"
              }`}
              onClick={() => {
                setSelectedRole("admin");
                setSelectedUser("");
              }}
            >
              Admin
            </button>
          </div>
        </div>

        {/* User Selection */}
        {selectedRole && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select User
            </label>
            <select
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
              className="w-full border rounded px-3 py-2"
            >
              <option value="">-- Choose a {selectedRole} --</option>
              {roleUsers.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.name}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Login Button */}
        <button
          onClick={handleLogin}
          className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium"
        >
          Continue
        </button>
      </div>

      <p className="text-xs text-gray-500 mt-6">
        *This is a simulated login for the Joineazy Frontend Internship Task
      </p>
    </div>
  );
}
