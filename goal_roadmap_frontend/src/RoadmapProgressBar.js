import React from "react";
import "./App.css";

/**
 * PUBLIC_INTERFACE
 * RoadmapProgressBar - Visually prominent, responsive progress path/bar for the "My Goal Roadmap" section using brand colors.
 * Designed for modern, minimalist UI and accessibility.
 *
 * Props:
 *   steps (optional): Array of { label: string, status: 'complete' | 'active' | 'upcoming' }
 *   Default: sample ["Start", "Milestone 1", "Milestone 2", "Goal"]
 */
function RoadmapProgressBar({ steps }) {
  // Use default example steps for visual placeholder
  const stepData =
    steps ||
    [
      { label: "Start", status: "complete" },
      { label: "Organize", status: "complete" },
      { label: "Progress", status: "active" },
      { label: "Goal", status: "upcoming" },
    ];

  // Helper for styling based on status
  const getDotClass = (status) => {
    switch (status) {
      case "complete":
        return "roadmap-dot roadmap-dot-complete";
      case "active":
        return "roadmap-dot roadmap-dot-active";
      case "upcoming":
      default:
        return "roadmap-dot roadmap-dot-upcoming";
    }
  };

  return (
    <div className="roadmap-progress-container" aria-label="Path of roadmap goals">
      <div className="roadmap-bar-flex">
        {stepData.map((step, idx) => (
          <React.Fragment key={step.label}>
            <div className={getDotClass(step.status)} tabIndex={0} aria-label={step.label} />
            {idx !== stepData.length - 1 && (
              <div className={`roadmap-segment ${stepData[idx + 1].status === "complete" || step.status === "complete" ? "roadmap-segment-complete" : ""}`}></div>
            )}
          </React.Fragment>
        ))}
      </div>
      <div className="roadmap-labels-flex">
        {stepData.map((step, idx) => (
          <span
            key={step.label}
            className={`roadmap-label roadmap-label-${step.status}`}
          >
            {step.label}
          </span>
        ))}
      </div>
    </div>
  );
}

export default RoadmapProgressBar;
