import React from "react";
import "./ProgressBar.css";

const ProgressBar = ({ value = 0, label }) => {
  const pct = Math.max(0, Math.min(100, Math.round(value)));

  return (
    <div className="progress-container" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} role="progressbar">
      <div className="progress-bar" style={{ width: `${pct}%` }}>
        <span className="progress-text">{label ?? `${pct}%`}</span>
      </div>
    </div>
  );
};

export default ProgressBar;
