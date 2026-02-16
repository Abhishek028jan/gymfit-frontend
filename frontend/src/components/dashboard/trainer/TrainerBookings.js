import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import './TrainerBookings.css';

const API = 'http://localhost:5001/api';

const TrainerBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedClass, setSelectedClass] = useState(null);
    const [attendees, setAttendees] = useState([]);
    const [loadingAttendees, setLoadingAttendees] = useState(false);

    useEffect(() => {
        fetchTrainerBookings();
    }, []);

    const fetchTrainerBookings = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.get(`${API}/trainer/bookings`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setBookings(res.data.data);
        } catch (err) {
            console.error('Failed to load bookings', err);
        } finally {
            setLoading(false);
        }
    };

    const handleViewAttendees = async (cls) => {
        if (selectedClass === cls.id) {
            setSelectedClass(null);
            return;
        }

        setSelectedClass(cls.id);
        setLoadingAttendees(true);
        try {
            const token = localStorage.getItem('token');
            const res = await axios.get(`${API}/trainer/classes/${cls.id}/attendees`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setAttendees(res.data.data);
        } catch (err) {
            console.error('Failed to load attendees', err);
        } finally {
            setLoadingAttendees(false);
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
        <div className="trainer-bookings-container">
            <header className="page-header">
                <h1 className="page-title">My Schedule</h1>
                <p className="text-muted">Manage your upcoming classes and see attendee counts.</p>
            </header>

            <motion.div
                className="bookings-list"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
            >
                {loading ? (
                    <div className="text-center p-5">Loading schedule...</div>
                ) : bookings.length === 0 ? (
                    <div className="empty-state">
                        <div className="empty-icon">📅</div>
                        <h3>No Upcoming Classes</h3>
                        <p>You don't have any classes scheduled yet.</p>
                    </div>
                ) : (
                    bookings.map(cls => (
                        <div key={cls.id} className="booking-card card p-4 mb-3" style={{ background: 'var(--card-bg)' }}>
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <span className="badge bg-primary mb-2">{cls.program_name}</span>
                                    <h3 className="h4 mb-1">{cls.name}</h3>
                                    <p className="text-muted mb-0">
                                        {cls.day_of_week} • {formatTime(cls.start_time)} - {formatTime(cls.end_time)}
                                    </p>
                                </div>
                                <div className="text-end">
                                    <div className="h2 mb-0">{cls.confirmed_attendees}</div>
                                    <div className="small text-muted mb-2">Attendees</div>
                                    <div className="small text-muted">Capacity: {cls.capacity}</div>
                                    <button
                                        className="btn btn-sm btn-outline-primary mt-2"
                                        onClick={() => handleViewAttendees(cls)}
                                    >
                                        {selectedClass === cls.id ? 'Hide List' : 'View List'}
                                    </button>
                                </div>
                            </div>

                            {/* Attendees List */}
                            {selectedClass === cls.id && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    className="mt-3 pt-3 border-top border-secondary"
                                >
                                    <h5 className="mb-3">Registered Members</h5>
                                    {loadingAttendees ? (
                                        <p className="text-muted">Loading...</p>
                                    ) : attendees.length === 0 ? (
                                        <p className="text-muted">No one has booked this class yet.</p>
                                    ) : (
                                        <ul className="list-group list-group-flush bg-transparent">
                                            {attendees.map(att => (
                                                <li key={att.id} className="list-group-item bg-transparent text-light d-flex justify-content-between px-0">
                                                    <span>{att.first_name} {att.last_name}</span>
                                                    <small className="text-muted">{att.email}</small>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </motion.div>
                            )}
                        </div>
                    ))
                )}
            </motion.div>
        </div>
    );
};

export default TrainerBookings;
