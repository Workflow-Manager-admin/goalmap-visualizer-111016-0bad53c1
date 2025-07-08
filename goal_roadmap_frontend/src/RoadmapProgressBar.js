import React, { useState, useEffect, useRef } from "react";
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

  // Determine completed progress.
  const numComplete = milestoneData.filter(m => m.status === "complete").length;
  const progressPercent = Math.round((numComplete / milestoneData.length) * 100);

  // Animation state for progress bar
  const [animatedPercent, setAnimatedPercent] = useState(progressPercent);
  const animationRef = useRef();

  // Animate fill: when percent changes, animate a "filling" effect.
  useEffect(() => {
    const start = animatedPercent;
    const end = progressPercent;
    const duration = 680; // ms
    if (start === end) return;

    let startTs = null;
    cancelAnimationFrame(animationRef.current);

    function animate(ts) {
      if (!startTs) startTs = ts;
      const elapsed = ts - startTs;
      let newPercent;
      if (elapsed >= duration) {
        newPercent = end;
      } else {
        // EaseInOutQuad
        const t = elapsed / duration;
        const eased = t < 0.5
          ? 2 * t * t
          : -1 + (4 - 2 * t) * t;
        newPercent = Math.round(start + (end - start) * eased);
      }

      setAnimatedPercent(newPercent);

      if (elapsed < duration && newPercent !== end) {
        animationRef.current = requestAnimationFrame(animate);
      }
    }

    animationRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationRef.current);
  }, [progressPercent]);

  // Helper for styling circles based on status
  const getMilestoneDotClass = (status) => {
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
      {/* Animated percentage bar with label */}
      <div className="progressbar-outer-track" style={{
        width: "100%",
        maxWidth: 420,
        height: 17,
        marginBottom: 16,
        borderRadius: 9,
        background: "linear-gradient(90deg, var(--bg-secondary), #e9ecf1 80%)",
        boxShadow: "0 2px 11px rgba(41,121,255,0.055)",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "center"
      }}>
        <div
          className="progressbar-inner-fill"
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            height: "100%",
            borderRadius: 9,
            width: `${animatedPercent}%`,
            background: "linear-gradient(90deg,var(--primary) 10%,var(--accent) 60%,var(--secondary) 100%)",
            transition: "width 0.64s cubic-bezier(.61,1.38,.39,.82)",
            boxShadow: animatedPercent > 3 ? "0 2px 9px rgba(41,121,255,0.075)" : "none",
            zIndex: 2
          }}
          aria-valuenow={animatedPercent}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Progress bar for milestone completion"
          role="progressbar"
        />
        <span
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%,-50%)",
            color: "var(--text-primary)",
            fontWeight: 700,
            fontSize: "1.04em",
            opacity: 0.97,
            letterSpacing: "0.03em",
            zIndex: 5,
            userSelect: "none",
            pointerEvents: "none"
          }}
        >
          {animatedPercent}% Complete
        </span>
      </div>
      {/* Milestone Circles Row */}
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
