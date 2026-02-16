import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

const API = `${process.env.REACT_APP_API_URL}/api/admin`;

const AdminDashboard = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStats();

        // Socket connection
        import('socket.io-client').then(({ io }) => {
            const socket = io(process.env.REACT_APP_API_URL);

            socket.on('newMember', (newMember) => {
                setStats(prevStats => ({
                    ...prevStats,
                    totalMembers: (prevStats?.totalMembers || 0) + 1,
                    recentMembers: [newMember, ...(prevStats?.recentMembers || [])].slice(0, 5)
                }));
            });

            return () => socket.disconnect();
        });
    }, []);

    const fetchStats = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.get(`${API}/stats`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setStats(res.data.data);
        } catch (err) {
            console.error('Failed to load stats', err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="admin-loading">
                <div className="spinner"></div>
            </div>
        );
    }

    const statCards = [
        { label: 'Total Members', value: stats?.totalMembers || 0, icon: '👥', color: 'green' },
        { label: 'Active Classes', value: stats?.activeClasses || 0, icon: '🏋️', color: 'blue' },
        { label: 'Total Bookings', value: stats?.totalBookings || 0, icon: '📅', color: 'orange' },
        { label: 'Revenue', value: `$${stats?.totalRevenue || 0}`, icon: '💰', color: 'purple' },
    ];

    return (
        <div>
            <motion.div
                className="admin-page-header"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <h1>Dashboard</h1>
                <p>Overview of your gym's performance</p>
            </motion.div>

            {/* Stats */}
            <motion.div
                className="admin-stats-grid"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
            >
                {statCards.map((card, i) => (
                    <div className="admin-stat-card" key={i}>
                        <div className={`admin-stat-icon ${card.color}`}>{card.icon}</div>
                        <div className="admin-stat-info">
                            <h3>{card.value}</h3>
                            <p>{card.label}</p>
                        </div>
                    </div>
                ))}
            </motion.div>

            {/* Recent activity */}
            <motion.div
                className="admin-recent-grid"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
            >
                {/* Recent Members */}
                <div className="admin-recent-card">
                    <div className="admin-recent-card-header">👥 Recent Members</div>
                    {stats?.recentMembers?.length > 0 ? (
                        stats.recentMembers.map((m) => (
                            <div className="admin-recent-item" key={m.id}>
                                <div>
                                    <div className="admin-recent-item-name">
                                        {m.first_name} {m.last_name}
                                    </div>
                                    <div className="admin-recent-item-sub">{m.email}</div>
                                </div>
                                <span className="badge badge-success">Member</span>
                            </div>
                        ))
                    ) : (
                        <div className="admin-empty">
                            <p>No members yet</p>
                        </div>
                    )}
                </div>

                {/* Recent Bookings */}
                <div className="admin-recent-card">
                    <div className="admin-recent-card-header">📅 Recent Bookings</div>
                    {stats?.recentBookings?.length > 0 ? (
                        stats.recentBookings.map((b) => (
                            <div className="admin-recent-item" key={b.id}>
                                <div>
                                    <div className="admin-recent-item-name">
                                        {b.first_name} {b.last_name}
                                    </div>
                                    <div className="admin-recent-item-sub">
                                        {b.class_name} <span style={{ opacity: 0.7 }}>• {b.trainer_name}</span>
                                    </div>
                                </div>
                                <span className={`badge ${b.status === 'confirmed' ? 'badge-success' : 'badge-warning'}`}>
                                    {b.status}
                                </span>
                            </div>
                        ))
                    ) : (
                        <div className="admin-empty">
                            <p>No bookings yet</p>
                        </div>
                    )}
                </div>
            </motion.div>
        </div>
    );
};

export default AdminDashboard;
