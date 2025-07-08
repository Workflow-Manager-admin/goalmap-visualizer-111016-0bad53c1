import React, { useState } from "react";
import "./App.css";

/**
 * PUBLIC_INTERFACE
 * RoadmapProgressBar - Enhanced with interactive clickable milestones; clicking a milestone opens a minimalist modal with details.
 * Modern, minimalist UI with responsive, visually integrated milestones along the progress bar/path.
 *
 * Props:
 *   milestones (optional): Array of {
 *     icon: string, title: string, status: 'complete' | 'active' | 'upcoming',
 *     description?: string, targetDate?: string, currentStatus?: string
 *   }
 *   If not provided, uses roadmap sample milestones (with details).
 */
function RoadmapProgressBar({ milestones }) {
  // Default milestone data as per requirements, now with sample detail fields
  const milestoneData =
    milestones ||
    [
      {
        icon: "📘",
        title: "Learn JavaScript",
        status: "complete",
        description: "Completed an online JavaScript course and built small exercises.",
        targetDate: "2023-12-15",
        currentStatus: "Done",
      },
      {
        icon: "🚀",
        title: "Build My First Project",
        status: "active",
        description: "Currently developing a portfolio mini web app to apply JS skills.",
        targetDate: "2024-03-25",
        currentStatus: "In Progress",
      },
      {
        icon: "💼",
        title: "Get Internship",
        status: "upcoming",
        description: "Apply for internships at tech startups. Prepare a CV and GitHub portfolio.",
        targetDate: "2024-07-10",
        currentStatus: "Not Started",
      }
    ];

  const [modalOpen, setModalOpen] = useState(false);
  const [modalMilestone, setModalMilestone] = useState(null);

  // Helper for styling circles based on status
  const getMilestoneDotClass = (status) => {
    // We'll use semantic class names but drive color via new CSS styling (modern palette)
    switch (status) {
      case "complete":
        return "roadmap-dot milestone-dot-complete";
      case "active":
        return "roadmap-dot milestone-dot-active";
      case "upcoming":
      default:
        return "roadmap-dot milestone-dot-pending";
    }
  };

  // Helper for milestone card styling
  const getMilestoneCardClass = (status) => {
    const base = "roadmap-milestone-card";
    if (status === "complete") return `${base} milestone-complete`;
    if (status === "active") return `${base} milestone-inprogress`;
    return `${base} milestone-pending`;
  };

  // PUBLIC_INTERFACE
  const handleMilestoneClick = (milestone) => {
    setModalMilestone(milestone);
    setModalOpen(true);
  };

  // PUBLIC_INTERFACE
  const closeModal = () => {
    setModalOpen(false);
    setModalMilestone(null);
  };

  // Modal subcomponent
  const MilestoneModal = ({ milestone, onClose }) => {
    if (!milestone) return null;
    return (
      <div className="milestone-modal-overlay" tabIndex="-1" aria-modal="true" role="dialog" onClick={onClose}>
        <div className="milestone-modal"
          tabIndex="0"
          onClick={e => e.stopPropagation()}
          aria-label={`Milestone details for ${milestone.title}`}
        >
          <button className="milestone-modal-close" onClick={onClose} aria-label="Close details" tabIndex="0">
            &times;
          </button>
          <div className="milestone-modal-icon">
            <span role="img" aria-label="icon" style={{fontSize: "2.3em"}}>{milestone.icon}</span>
          </div>
          <h3 className="milestone-modal-title">{milestone.title}</h3>
          <div className="milestone-modal-desc">{milestone.description || <em>No description provided.</em>}</div>
          <div className="milestone-modal-metadata">
            <div><span className="milestone-modal-meta-label">Target Date:</span> {milestone.targetDate || <em>—</em>}</div>
            <div><span className="milestone-modal-meta-label">Status:</span> {milestone.currentStatus || milestone.status}</div>
          </div>
        </div>
      </div>
    );
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
              onClick={() => handleMilestoneClick(milestone)}
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
      {modalOpen && (
        <MilestoneModal milestone={modalMilestone} onClose={closeModal} />
      )}
    </div>
  );
}

export default RoadmapProgressBar;
