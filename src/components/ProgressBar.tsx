import React from "react";

type ProgressBarProps = {
  percent: number;
  className?: string;
};

const ProgressBar: React.FC<ProgressBarProps> = ({ percent, className = "" }) => {
  const pct = Math.max(0, Math.min(100, percent));
  return (
    <div className={`w-full bg-gray-200 h-3 rounded ${className}`}>
      <div
        style={{ width: `${pct}%` }}
        className="h-3 rounded bg-blue-600 transition-all"
      />
    </div>
  );
};

export default ProgressBar;
