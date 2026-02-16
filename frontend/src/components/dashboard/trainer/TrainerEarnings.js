import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import './TrainerEarnings.css';

const API = 'http://localhost:5001/api/trainer';

const TrainerEarnings = () => {
  const [earnings, setEarnings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState('month');

  useEffect(() => {
    fetchEarnings();
  }, [period]);

  const fetchEarnings = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${API}/earnings?period=${period}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEarnings(res.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching earnings:', err);
      setLoading(false);
    }
  };

  const formatCurrency = (amount) => {
    return `$${parseFloat(amount).toFixed(2)}`;
  };

  const getPeriodLabel = () => {
    const labels = {
      week: 'Last 7 Days',
      month: 'Last 30 Days',
      year: 'Last Year',
    };
    return labels[period] || period;
  };

  if (loading) {
    return (
      <div className="earnings-loading">
        <div className="spinner"></div>
      </div>
    );
  }

  const summary = earnings?.summary || {};
  const dailyData = earnings?.daily || [];

  return (
    <div className="trainer-earnings">
      <motion.div
        className="earnings-header"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1>💰 Earnings Overview</h1>
        <p>Track your income from training sessions</p>
      </motion.div>

      {/* Period Selector */}
      <motion.div
        className="period-selector"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        {['week', 'month', 'year'].map((p) => (
          <button
            key={p}
            className={`period-btn ${period === p ? 'active' : ''}`}
            onClick={() => setPeriod(p)}
          >
            {p.charAt(0).toUpperCase() + p.slice(1)}
          </button>
        ))}
      </motion.div>

      {/* Summary Cards */}
      <motion.div
        className="earnings-summary-grid"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="earning-card earnings-card-primary">
          <div className="card-icon">💵</div>
          <div className="card-content">
            <h3>Total Earnings</h3>
            <p className="card-value">{formatCurrency(summary.total_earnings || 0)}</p>
          </div>
        </div>

        <div className="earning-card earnings-card-secondary">
          <div className="card-icon">📊</div>
          <div className="card-content">
            <h3>Total Sessions</h3>
            <p className="card-value">{summary.total_sessions || 0}</p>
          </div>
        </div>

        <div className="earning-card earnings-card-tertiary">
          <div className="card-icon">📈</div>
          <div className="card-content">
            <h3>Avg Per Session</h3>
            <p className="card-value">{formatCurrency(summary.avg_per_session || 0)}</p>
          </div>
        </div>

        <div className="earning-card earnings-card-accent">
          <div className="card-icon">📅</div>
          <div className="card-content">
            <h3>Period</h3>
            <p className="card-value">{getPeriodLabel()}</p>
          </div>
        </div>
      </motion.div>

      {/* Daily Breakdown */}
      <motion.div
        className="earnings-breakdown"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h2>📋 Daily Breakdown</h2>
        {dailyData.length > 0 ? (
          <div className="daily-list">
            {dailyData.map((day, index) => (
              <motion.div
                key={index}
                className="daily-item"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <div className="daily-date">
                  <span className="date-label">
                    {new Date(day.booking_date).toLocaleDateString('en-US', {
                      weekday: 'short',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </span>
                </div>

                <div className="daily-stats">
                  <div className="stat-item">
                    <span className="stat-name">Sessions</span>
                    <span className="stat-val">{day.sessions}</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-name">Rate/Session</span>
                    <span className="stat-val">{formatCurrency(day.hourly_rate)}</span>
                  </div>
                </div>

                <div className="daily-earnings">
                  <span className="earnings-label">Earnings</span>
                  <span className="earnings-amount">{formatCurrency(day.daily_earnings || 0)}</span>
                </div>

                {/* Progress Bar */}
                <div className="earning-progress">
                  <div
                    className="progress-bar-fill"
                    style={{
                      width: `${Math.min((day.daily_earnings / (summary.total_earnings / 5)) * 100, 100)}%`,
                    }}
                  ></div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <p>📭 No earnings data available for this period</p>
          </div>
        )}
      </motion.div>

      {/* Tips Section */}
      <motion.div
        className="earnings-tips"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h3>💡 Tips to Increase Earnings</h3>
        <ul>
          <li>📅 Keep your availability updated regularly</li>
          <li>⭐ Ask satisfied clients for reviews to attract more bookings</li>
          <li>📱 Update your profile with certifications and specializations</li>
          <li>🎯 Set competitive hourly rates based on your experience</li>
          <li>📧 Respond promptly to client booking requests</li>
        </ul>
      </motion.div>
    </div>
  );
};

export default TrainerEarnings;
