import React from "react";
import "./App.css";

/**
 * PUBLIC_INTERFACE
 * RoadmapProgressBar - Enhanced with interactive clickable milestones, each with an icon and title.
 * Modern, minimalist UI with responsive, visually integrated milestones along the progress bar/path.
 * 
 * Props:
 *   milestones (optional): Array of { icon: string, title: string, status: 'complete' | 'active' | 'upcoming' }
 *   If not provided, uses roadmap sample milestones (as per requirements).
 */
function RoadmapProgressBar({ milestones }) {
  // Default milestone data as per requirements
  const milestoneData =
    milestones ||
    [
      { icon: "📘", title: "Learn JavaScript", status: "complete" },
      { icon: "🚀", title: "Build My First Project", status: "active" },
      { icon: "💼", title: "Get Internship", status: "upcoming" }
    ];

  // Helper for styling circles based on status
  const getMilestoneDotClass = (status) => {
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

  // Helper for milestone card styling
  const getMilestoneCardClass = (status) => {
    let base = "roadmap-milestone-card";
    if (status === "complete") return base + " milestone-complete";
    if (status === "active") return base + " milestone-active";
    return base + " milestone-upcoming";
  };

  // PUBLIC_INTERFACE
  const handleMilestoneClick = (milestone, idx) => {
    // Placeholder for future expand/edit actions
    // eslint-disable-next-line no-alert
    alert(`Milestone: ${milestone.title}\n(Interactive details coming soon)`);
  };

  return (
    <div className="roadmap-progress-container" aria-label="Path of roadmap milestones">
      <div
        className="roadmap-bar-flex"
        style={{
          justifyContent: "space-between",
          alignItems: "flex-end",
          position: "relative"
        }}
      >
        {milestoneData.map((milestone, idx) => (
          <React.Fragment key={milestone.title}>
            <button
              className={getMilestoneCardClass(milestone.status)}
              tabIndex={0}
              aria-label={milestone.title}
              type="button"
              onClick={() => handleMilestoneClick(milestone, idx)}
              style={{
                background: "none",
                border: "none",
                outline: "none",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                minWidth: 54,
                flex: "1 1 0",
                margin: "0 3px",
                padding: 0,
                boxShadow: "none"
              }}
            >
              <span className={getMilestoneDotClass(milestone.status)} style={{ marginBottom: 4, transition: "all 0.2s" }}>
                <span role="img" aria-label="icon" style={{ fontSize: "1.26em", userSelect: "none" }}>
                  {milestone.icon}
                </span>
              </span>
              <span
                className={`milestone-label milestone-label-${milestone.status}`}
                style={{
                  fontSize: "0.97rem",
                  fontWeight: milestone.status === "active" ? 700 : 500,
                  color:
                    milestone.status === "complete"
                      ? "var(--primary)"
                      : milestone.status === "active"
                      ? "var(--secondary)"
                      : "var(--text-secondary)",
                  opacity: milestone.status === "upcoming" ? 0.68 : 1,
                  marginTop: 2,
                  textAlign: "center",
                  letterSpacing: "0.01em"
                }}
              >
                {milestone.title}
              </span>
            </button>
            {idx !== milestoneData.length - 1 && (
              <div
                className={
                  "roadmap-segment " +
                  ((milestoneData[idx + 1].status === "complete" ||
                    milestone.status === "complete")
                    ? "roadmap-segment-complete"
                    : "")
                }
                style={{ minWidth: 22, height: 6, margin: "0 0.9vw", alignSelf: "center" }}
              ></div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default RoadmapProgressBar;
