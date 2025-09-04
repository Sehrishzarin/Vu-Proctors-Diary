import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const { getPendingUsers, approveUser } = useAuth();
  const [pending, setPending] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getPendingUsers();
        setPending(data);
      } catch (err) {
        console.error(err.message);
      }
    };
    fetchUsers();
  }, []);

  const handleApprove = async (id) => {
    try {
      await approveUser(id);
      setPending((prev) => prev.filter((u) => u._id !== id));
    } catch (err) {
      console.error(err.message);
    }
  };

  // Calculate metrics for the dashboard boxes
  const totalPending = pending.length;
  const pendingToday = pending.filter(user => {
    const today = new Date();
    const userDate = new Date(user.createdAt || Date.now());
    return userDate.toDateString() === today.toDateString();
  }).length;
  const pendingThisWeek = pending.filter(user => {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    const userDate = new Date(user.createdAt || Date.now());
    return userDate >= oneWeekAgo;
  }).length;

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      
      {/* Summary Metrics Boxes */}
      <div className="metrics-container">
        <div className="metric-box">
          <div className="metric-title">Total Pending</div>
          <div className="metric-value">{totalPending}</div>
          <div className="metric-icon">📋</div>
        </div>
        
        <div className="metric-box">
          <div className="metric-title">Pending Today</div>
          <div className="metric-value">{pendingToday}</div>
          <div className="metric-icon">📅</div>
        </div>
        
        <div className="metric-box">
          <div className="metric-title">This Week</div>
          <div className="metric-value">{pendingThisWeek}</div>
          <div className="metric-icon">🗓️</div>
        </div>
        
        <div className="metric-box">
          <div className="metric-title">Approval Rate</div>
          <div className="metric-value">{(totalPending > 0 ? ((totalPending - pending.length) / totalPending * 100).toFixed(1) : 0)}%</div>
          <div className="metric-icon">📊</div>
        </div>
      </div>
      
      {/* Pending Accounts Table */}
      <div className="table-container">
        <h3>Pending User Accounts</h3>
        {pending.length > 0 ? (
          <table className="classic-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Registration Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {pending.map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}</td>
                  <td><span className="status-badge pending">Pending</span></td>
                  <td>
                    <button 
                      className="approve-btn"
                      onClick={() => handleApprove(user._id)}
                    >
                      Approve
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="no-pending">No pending accounts to review.</div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;