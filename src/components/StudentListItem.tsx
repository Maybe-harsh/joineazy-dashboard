import React from "react";
import { User } from "../data/mockData";

type Props = {
  student: User;
  submitted: boolean;
  onToggle?: (studentId: string, newValue: boolean) => void;
};

const StudentListItem: React.FC<Props> = ({ student, submitted, onToggle }) => (
  <div className="flex items-center justify-between px-3 py-2 border-b">
    <div>
      <div className="font-medium text-sm">{student?.name}</div>
      <div className="text-xs text-gray-500">{student?.id}</div>
    </div>
    <div className="flex items-center gap-3">
      <div className={`text-sm ${submitted ? "text-green-600" : "text-red-600"}`}>
        {submitted ? "Submitted" : "Not Submitted"}
      </div>
      <input
        type="checkbox"
        checked={submitted}
        onChange={(e) => onToggle && onToggle(student.id, e.target.checked)}
        className="h-4 w-4"
      />
    </div>
  </div>
);

export default StudentListItem;
