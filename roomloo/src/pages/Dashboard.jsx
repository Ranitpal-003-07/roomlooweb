import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import "../styles/Dashboard.css"; // You'll need to create a corresponding CSS file

const Dashboard = () => {
  const { currentUser } = useAuth();
  const [stats, setStats] = useState({
    pgListings: 0,
    roommates: 0,
    recentActivity: []
  });

  // Sample data - replace with actual API calls
  useEffect(() => {
    // Simulated API fetch
    setTimeout(() => {
      setStats({
        pgListings: 12,
        roommates: 8,
        recentActivity: [
          { id: 1, type: "pg-view", message: "Someone viewed your PG listing", time: "2 hours ago" },
          { id: 2, type: "roommate-request", message: "New roommate request received", time: "Yesterday" },
          { id: 3, type: "message", message: "New message from potential roommate", time: "3 days ago" }
        ]
      });
    }, 1000);
  }, []);

  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>
      <p>Welcome back, {currentUser?.displayName || "User"}!</p>

      <div className="dashboard-stats">
        <div className="stat-card">
          <h3>PG Listings</h3>
          <p className="stat-number">{stats.pgListings}</p>
        </div>
        <div className="stat-card">
          <h3>Roommate Connections</h3>
          <p className="stat-number">{stats.roommates}</p>
        </div>
      </div>

      <div className="dashboard-section">
        <h2>Recent Activity</h2>
        {stats.recentActivity.length > 0 ? (
          <ul className="activity-list">
            {stats.recentActivity.map(activity => (
              <li key={activity.id} className="activity-item">
                <div className="activity-icon">
                  {activity.type === "pg-view" ? "🏠" : 
                   activity.type === "roommate-request" ? "👥" : "✉️"}
                </div>
                <div className="activity-details">
                  <p>{activity.message}</p>
                  <span className="activity-time">{activity.time}</span>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No recent activity to display.</p>
        )}
      </div>

      <div className="dashboard-section">
        <h2>Quick Actions</h2>
        <div className="quick-actions">
          <button className="action-btn">New PG Listing</button>
          <button className="action-btn">Find Roommate</button>
          <button className="action-btn">Update Profile</button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;