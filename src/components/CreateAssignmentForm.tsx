// CreateAssignmentForm.tsx
import React, { useEffect, useState } from "react";
import { User } from "../data/mockData";
import { generateId } from "../utils/helpers";

type NewAssignment = {
  title: string;
  description?: string;
  dueDate?: string;
  driveLink?: string;
  studentsAssigned: string[];
};

type Props = {
  users: User[]; // all users to assign to (students)
  onCreate: (payload: any) => void;
  onClose: () => void;
  creatorId: string;
};

export default function CreateAssignmentForm({ users, onCreate, onClose, creatorId }: Props) {
  const studentList = users.filter((u) => u.role === "student");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [driveLink, setDriveLink] = useState("");
  const [selected, setSelected] = useState<string[]>(studentList.map((s) => s.id).slice(0, 1));

  useEffect(() => {
    if (studentList.length && selected.length === 0) {
      setSelected([studentList[0].id]);
    }
  }, [studentList]);

  function toggleStudent(id: string) {
    setSelected((prev) => (prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return alert("Please add a title");
    const id = generateId("a_");
    const submissions = selected.map((sid) => ({ studentId: sid, submitted: false }));
    const payload = {
      id,
      title: title.trim(),
      description: description.trim(),
      dueDate: dueDate || undefined,
      driveLink: driveLink || undefined,
      createdBy: creatorId,
      studentsAssigned: selected,
      submissions,
    };
    onCreate(payload);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-2xl p-6 rounded shadow"
      >
        <h3 className="text-xl font-semibold mb-4">Create Assignment</h3>

        <div className="grid grid-cols-1 gap-3">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="border px-3 py-2 rounded"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Short description"
            className="border px-3 py-2 rounded h-24"
          />
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="border px-3 py-2 rounded"
          />
          <input
            value={driveLink}
            onChange={(e) => setDriveLink(e.target.value)}
            placeholder="Google Drive link (optional)"
            className="border px-3 py-2 rounded"
          />

          <div>
            <div className="text-sm font-medium mb-2">Assign to students</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-36 overflow-auto border rounded p-2">
              {studentList.map((s) => (
                <label key={s.id} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selected.includes(s.id)}
                    onChange={() => toggleStudent(s.id)}
                  />
                  <span className="text-sm">{s.name}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-3">
            <button type="button" onClick={onClose} className="px-3 py-1 rounded border">
              Cancel
            </button>
            <button type="submit" className="px-3 py-1 rounded bg-blue-600 text-white">
              Create
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
