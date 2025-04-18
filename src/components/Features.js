

// src/components/HomePage.js
import React from 'react';
import '../styles/Features.css'; // Import the CSS file for styling

const Features = () => {
  return (
    <div className="home-page-container">
      <h1 className="home-title">Our Platform Features</h1>
      <div className="features-container">
        
        {/* Task Assignment and Prioritization */}
        <div className="feature-card">
          <div className="feature-icon">&#128197;</div> {/* Calendar Icon */}
          <h3>Task Assignment and Prioritization</h3>
          <p>Assign tasks to team members with clear deadlines and priority levels.</p>
        </div>

        {/* Deadline Tracking and Notifications */}
        <div className="feature-card">
          <div className="feature-icon">&#x23F1;</div> {/* Alarm Clock Icon */}
          <h3>Deadline Tracking and Notifications</h3>
          <p>Set task deadlines and receive automated reminders to stay on schedule.</p>
        </div>

        {/* Progress Reporting */}
        <div className="feature-card">
          <div className="feature-icon">&#x1F4C8;</div> {/* Bar Chart Icon */}
          <h3>Progress Reporting</h3>
          <p>Generate reports on task completion and team performance with analytics for better decision-making.</p>
        </div>

        {/* Role-Based Permissions */}
        <div className="feature-card">
          <div className="feature-icon">&#x1F465;</div> {/* People Icon */}
          <h3>Role-Based Permissions</h3>
          <p>Control access levels by assigning roles like Admin, Editor, or Viewer to team members.</p>
        </div>

        {/* Real-Time Collaboration */}
        <div className="feature-card">
          <div className="feature-icon">&#x1F91D;</div> {/* Handshake Icon */}
          <h3>Real-Time Collaboration</h3>
          <p>Add comments, share files, and discuss tasks within the platform for seamless teamwork.</p>
        </div>

        {/* Secure Authentication and Authorization */}
        <div className="feature-card">
          <div className="feature-icon">&#x1F512;</div> {/* Lock Icon */}
          <h3>Secure Authentication and Authorization</h3>
          <p>Ensure only verified users can access the platform using secure login (authentication).</p>
        </div>
        
      </div>
    </div>
  );
};

export default Features;