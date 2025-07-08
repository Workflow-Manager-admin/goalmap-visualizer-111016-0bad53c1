import React, { useState, useEffect } from 'react';
import './App.css';

/**
 * PUBLIC_INTERFACE
 * Main App component providing the modern dashboard layout for the goal roadmap application.
 * - Sidebar for navigation/details
 * - Header for title/user actions
 * - Main area for interactive roadmap visualization
 * - Timeline/footer for roadmap progress
 */
function App() {
  const [theme, setTheme] = useState('light');

  // Effect to apply theme to document element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // PUBLIC_INTERFACE
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className="App dashboard-root">
      <aside className="dashboard-sidebar">
        <div className="sidebar-header">
          <span className="sidebar-logo" aria-label="Goal Map">🎯</span>
          <span className="sidebar-title">GoalMap</span>
        </div>
        <nav className="sidebar-nav">
          <ul>
            <li><button className="sidebar-nav-btn active">Roadmap</button></li>
            <li><button className="sidebar-nav-btn">Goals</button></li>
            <li><button className="sidebar-nav-btn">Progress</button></li>
            <li><button className="sidebar-nav-btn">Settings</button></li>
          </ul>
        </nav>
      </aside>
      <div className="dashboard-main-area">
        <header className="dashboard-header">
          <h1 className="dashboard-title">My Goal Roadmap</h1>
          <button 
            className="theme-toggle" 
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
          </button>
        </header>
        <main className="dashboard-content">
          {/* Replace with interactive roadmap in the future */}
          <div className="empty-roadmap-state">
            <span role="img" aria-label="map">🗺️</span>
            <p>Start building your goal roadmap.<br />Add, organize, and visualize your goals here.</p>
          </div>
        </main>
        <footer className="dashboard-timeline">
          {/* Replace with interactive timeline in the future */}
          <div className="timeline-bar">
            <span className="timeline-dot timeline-dot-accent" />
            <span className="timeline-segment" />
            <span className="timeline-dot timeline-dot-primary" />
            <span className="timeline-segment" />
            <span className="timeline-dot timeline-dot-secondary" />
          </div>
          <div className="timeline-labels">
            <span>Start</span>
            <span>Now</span>
            <span>Goal</span>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
