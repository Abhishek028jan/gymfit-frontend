import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import './TrainerDashboard.css';

const API = `${process.env.REACT_APP_API_URL}/api/trainer`;

const TrainerDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const token = localStorage.getItem('token');
      // Ensure the endpoint matches what we implemented: /api/trainer/dashboard
      const res = await axios.get(`${API}/dashboard`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDashboardData(res.data);
    } catch (err) {
      console.error('Failed to load dashboard', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="trainer-loading">
        <div className="spinner"></div>
      </div>
    );
  }

  const statCards = [
    {
      label: 'Upcoming Bookings',
      value: dashboardData?.upcomingBookings || 0,
      icon: '📅',
      color: 'blue'
    },
    {
      label: 'Total Earnings',
      value: `$${dashboardData?.totalEarnings || 0}`,
      icon: '💰',
      color: 'green'
    },
    {
      label: 'Active Clients',
      value: dashboardData?.uniqueClients || 0,
      icon: '👥',
      color: 'purple'
    },
    {
      label: 'Specialization',
      value: dashboardData?.trainer?.specialization || 'Certified Trainer',
      icon: '⭐',
      color: 'orange'
    },
  ];

  return (
    <div className="trainer-dashboard">
      <motion.div
        className="trainer-page-header"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div>
          <h1>Welcome, {dashboardData?.trainer?.first_name || 'Trainer'}!</h1>
          <p>Manage your sessions, availability, and earnings</p>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        className="trainer-stats-grid"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        {statCards.map((card, i) => (
          <div className={`trainer-stat-card ${card.color}`} key={i}>
            <div className="trainer-stat-icon">{card.icon}</div>
            <div className="trainer-stat-info">
              <p className="trainer-stat-label">{card.label}</p>
              <h3 className="trainer-stat-value">{card.value}</h3>
            </div>
          </div>
        ))}
      </motion.div>

      {/* Profile/Overview Section */}
      <motion.div
        className="trainer-overview-section"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="trainer-overview-card">
          <h2>🎯 Your Profile</h2>
          <div className="trainer-profile-info">
            <div className="info-row">
              <span>Experience:</span>
              <strong>{dashboardData?.trainer?.experience_years || 5} years</strong>
            </div>
            <div className="info-row">
              <span>Hourly Rate:</span>
              <strong>${dashboardData?.trainer?.hourly_rate || 50}/hr</strong>
            </div>
            <div className="info-row">
              <span>Rating:</span>
              <strong>⭐ {dashboardData?.trainer?.rating || 4.8} / 5</strong>
            </div>
            <div className="info-row">
              <span>Email:</span>
              <strong>{dashboardData?.trainer?.email || 'N/A'}</strong>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default TrainerDashboard;
