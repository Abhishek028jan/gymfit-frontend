import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import './TrainerClients.css';

const API = `${process.env.REACT_APP_API_URL}/api/trainer`;

const TrainerClients = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredClients, setFilteredClients] = useState([]);

  useEffect(() => {
    fetchClients();
  }, []);

  useEffect(() => {
    const filtered = clients.filter(
      (client) =>
        client.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredClients(filtered);
  }, [searchTerm, clients]);

  const fetchClients = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${API}/clients`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setClients(res.data);
      setFilteredClients(res.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching clients:', err);
      setLoading(false);
    }
  };

  const getCompletionRate = (completed, total) => {
    if (total === 0) return 0;
    return Math.round((completed / total) * 100);
  };

  if (loading) {
    return (
      <div className="clients-loading">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="trainer-clients">
      <motion.div
        className="clients-header"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1>👥 Your Clients</h1>
        <p>Manage your training clients and sessions</p>
      </motion.div>

      {/* Search Bar */}
      <motion.div
        className="clients-search"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <input
          type="text"
          placeholder="🔍 Search clients by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <span className="search-count">{filteredClients.length} client{filteredClients.length !== 1 ? 's' : ''}</span>
      </motion.div>

      {/* Clients Grid */}
      <motion.div
        className="clients-grid"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {filteredClients.length > 0 ? (
          filteredClients.map((client, index) => (
            <motion.div
              key={client.id}
              className="client-card"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -5 }}
            >
              {/* Client Avatar */}
              <div className="client-avatar">
                {client.profile_image ? (
                  <img src={client.profile_image} alt={client.first_name} />
                ) : (
                  <div className="avatar-placeholder">
                    {client.first_name.charAt(0)}{client.last_name.charAt(0)}
                  </div>
                )}
              </div>

              {/* Client Info */}
              <div className="client-info">
                <h3 className="client-name">{client.first_name} {client.last_name}</h3>
                <p className="client-email">📧 {client.email}</p>
              </div>

              {/* Sessions Stats */}
              <div className="sessions-stats">
                <div className="stat-box">
                  <span className="stat-label">Total Sessions</span>
                  <span className="stat-value">{client.total_sessions || 0}</span>
                </div>
                <div className="stat-box">
                  <span className="stat-label">Completed</span>
                  <span className="stat-value">{client.completed_sessions || 0}</span>
                </div>
                <div className="stat-box">
                  <span className="stat-label">Completion</span>
                  <span className="stat-value">
                    {getCompletionRate(client.completed_sessions, client.total_sessions)}%
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="progress-section">
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{
                      width: `${getCompletionRate(client.completed_sessions, client.total_sessions)}%`,
                    }}
                  ></div>
                </div>
                <span className="progress-text">Session Completion Progress</span>
              </div>

              {/* Action Button */}
              <button className="view-btn">👁️ View Details</button>
            </motion.div>
          ))
        ) : (
          <div className="empty-state">
            <p className="empty-icon">👥</p>
            <p className="empty-text">No clients found</p>
            {searchTerm && (
              <p className="empty-subtitle">Try adjusting your search terms</p>
            )}
          </div>
        )}
      </motion.div>

      {/* Summary Stats */}
      {filteredClients.length > 0 && (
        <motion.div
          className="clients-summary"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="summary-card">
            <span className="summary-icon">👥</span>
            <div className="summary-content">
              <h4>Total Clients</h4>
              <p>{clients.length}</p>
            </div>
          </div>
          <div className="summary-card">
            <span className="summary-icon">📅</span>
            <div className="summary-content">
              <h4>Total Sessions</h4>
              <p>{clients.reduce((sum, c) => sum + (c.total_sessions || 0), 0)}</p>
            </div>
          </div>
          <div className="summary-card">
            <span className="summary-icon">✅</span>
            <div className="summary-content">
              <h4>Completed Sessions</h4>
              <p>{clients.reduce((sum, c) => sum + (c.completed_sessions || 0), 0)}</p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default TrainerClients;
