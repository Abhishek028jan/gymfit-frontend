import React, { useContext, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../../../context/AuthContext';
import BMIModal from './BMIModal';
import './MemberDashboard.css';

const MemberDashboard = () => {
    const { user } = useContext(AuthContext);
    const [showBMIModal, setShowBMIModal] = useState(false);

    const [upcomingClasses, setUpcomingClasses] = useState([]);
    const [loading, setLoading] = useState(true);

    const stats = [
        { title: 'Workouts', value: '12', icon: '💪', label: 'This Month' },
        { title: 'Calories', value: '12.5k', icon: '🔥', label: 'Burned' },
        { title: 'Active', value: '4', icon: '📅', label: 'Days Streak' },
        { title: 'Weight', value: '75kg', icon: '⚖️', label: 'Current' },
    ];

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/bookings`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUpcomingClasses(res.data.data);
        } catch (err) {
            console.error('Failed to load bookings', err);
        } finally {
            setLoading(false);
        }
    };

    const formatTime = (t) => {
        if (!t) return '';
        const [h, m] = t.split(':');
        const hour = parseInt(h, 10);
        const ampm = hour >= 12 ? 'PM' : 'AM';
        return `${hour % 12 || 12}:${m} ${ampm}`;
    };

    return (
        <div className="dashboard-container">
            <div className="container">
                {/* Header */}
                <header className="dashboard-header">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <h1 className="dashboard-welcome">
                            Welcome back, <span className="text-gradient">{user?.first_name || user?.name?.split(' ')[0] || 'Member'}</span>!
                        </h1>
                        <p className="text-muted">Ready to crush your goals today?</p>
                    </motion.div>
                </header>

                {/* Stats Grid */}
                <motion.div
                    className="dashboard-stats"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    {stats.map((stat, index) => (
                        <div key={index} className="stat-card">
                            <div className="stat-icon">{stat.icon}</div>
                            <div className="stat-info">
                                <h3>{stat.value}</h3>
                                <p>{stat.title}</p>
                                <span className="text-xs text-muted">{stat.label}</span>
                            </div>
                        </div>
                    ))}
                </motion.div>

                {/* Quick Actions */}
                <section className="dashboard-section">
                    <div className="section-header">
                        <h2 className="section-title">Quick Actions</h2>
                    </div>
                    <div className="quick-actions">
                        <Link to="/book-class" className="action-card">
                            <span className="action-icon">📅</span>
                            <h3>Book Class</h3>
                        </Link>
                        <Link to="/workout-log" className="action-card">
                            <span className="action-icon">📝</span>
                            <h3>Log Workout</h3>
                        </Link>
                        <Link to="/progress" className="action-card">
                            <span className="action-icon">📸</span>
                            <h3>Progress Photos</h3>
                        </Link>
                        <div onClick={() => setShowBMIModal(true)} className="action-card">
                            <span className="action-icon">⚖️</span>
                            <h3>Calculate BMI</h3>
                        </div>
                    </div>
                </section>

                {/* BMI Modal */}
                {showBMIModal && <BMIModal onClose={() => setShowBMIModal(false)} />}

                {/* Upcoming Classes */}
                <section className="dashboard-section">
                    <div className="section-header">
                        <h2 className="section-title">Your Schedule</h2>
                        <Link to="/book-class" className="btn btn-ghost btn-small">Book New</Link>
                    </div>
                    <div className="upcoming-classes">
                        {loading ? <p>Loading...</p> : upcomingClasses.length === 0 ? (
                            <div className="text-center p-3 text-muted">
                                <p>No upcoming classes booked.</p>
                            </div>
                        ) : (
                            upcomingClasses.map(cls => (
                                <div key={cls.booking_id} className="card p-3 mb-3 d-flex flex-row justify-content-between align-items-center" style={{ background: 'rgba(255,255,255,0.05)' }}>
                                    <div>
                                        <h4 className="mb-1">{cls.name}</h4>
                                        <p className="mb-0 text-muted">
                                            <small>{cls.day_of_week} • {formatTime(cls.start_time)} • with {cls.trainer_name || 'Staff'}</small>
                                        </p>
                                    </div>
                                    <span className="badge badge-primary">Confirmed</span>
                                </div>
                            ))
                        )}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default MemberDashboard;
