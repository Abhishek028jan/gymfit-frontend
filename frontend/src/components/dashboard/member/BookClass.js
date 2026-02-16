import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { Link } from 'react-router-dom';

const API = 'http://localhost:5001/api';

const BookClass = () => {
    const [classes, setClasses] = useState([]);
    const [myBookings, setMyBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Modal States
    const [selectedClass, setSelectedClass] = useState(null);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const getAuthHeader = useCallback(() => ({
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    }), []);

    const fetchData = useCallback(async () => {
        try {
            const [classesRes, bookingsRes] = await Promise.all([
                axios.get(`${API}/bookings/schedule`, getAuthHeader()),
                axios.get(`${API}/bookings`, getAuthHeader())
            ]);
            setClasses(classesRes.data.data);
            setMyBookings(bookingsRes.data.data.map(b => b.class_id)); // Store CLASS IDs
        } catch (err) {
            console.error('Failed to load classes', err);
            setError('Failed to load schedule. Please try again.');
        } finally {
            setLoading(false);
        }
    }, [getAuthHeader]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const initiateBooking = (cls) => {
        setSelectedClass(cls);
        setShowConfirmModal(true);
    };

    const confirmBooking = async () => {
        if (!selectedClass) return;

        try {
            await axios.post(`${API}/bookings/${selectedClass.id}`, {}, getAuthHeader());
            setShowConfirmModal(false);
            setShowSuccessModal(true);
            fetchData(); // Refresh data
        } catch (err) {
            setError(err.response?.data?.error || 'Booking failed');
            setShowConfirmModal(false);
        }
    };

    const closeSuccess = () => {
        setShowSuccessModal(false);
        setSelectedClass(null);
    };

    const formatTime = (t) => {
        if (!t) return '—';
        const [h, m] = t.split(':');
        const hour = parseInt(h, 10);
        const ampm = hour >= 12 ? 'PM' : 'AM';
        return `${hour % 12 || 12}:${m} ${ampm}`;
    };

    if (loading) return <div className="p-5 text-center" style={{ color: 'var(--text-primary)', marginTop: '80px' }}>Loading schedule...</div>;

    return (
        <div className="container py-5" style={{ marginTop: '80px' }}>
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-5 d-flex justify-content-between align-items-center"
            >
                <div>
                    <h1 className="display-4 fw-bold" style={{ color: 'var(--text-primary)' }}>Book a Class</h1>
                    <p className="text-muted">Find your next workout and reserve your spot.</p>
                </div>
                <Link to="/dashboard" className="btn btn-outline-light">Back to Dashboard</Link>
            </motion.div>

            {error && <div className="alert alert-danger mb-4">{error}</div>}

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="row g-4"
            >
                {classes.length === 0 ? (
                    <div className="col-12 text-center text-muted">No classes scheduled yet.</div>
                ) : (
                    classes.map((cls) => {
                        const isBooked = myBookings.includes(cls.id);
                        const isFull = cls.current_bookings >= cls.capacity;

                        return (
                            <div key={cls.id} className="col-md-6 col-lg-4">
                                <div className="card h-100" style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)' }}>
                                    <div className="card-body">
                                        <div className="d-flex justify-content-between align-items-start mb-3">
                                            <span className="badge bg-primary">{cls.program_name || 'Class'}</span>
                                            <span className="text-muted small">{cls.day_of_week}</span>
                                        </div>
                                        <h3 className="card-title h4 mb-3" style={{ color: 'var(--text-primary)' }}>{cls.name}</h3>
                                        <p className="card-text text-muted small mb-4">{cls.description}</p>

                                        <div className="mb-4" style={{ color: 'var(--text-secondary)' }}>
                                            <div className="d-flex align-items-center mb-2">
                                                <span className="me-2">🕒</span>
                                                <span>{formatTime(cls.start_time)} - {formatTime(cls.end_time)}</span>
                                            </div>
                                            <div className="d-flex align-items-center">
                                                <span className="me-2">👤</span>
                                                <span>{cls.trainer_name}</span>
                                            </div>
                                        </div>

                                        <div className="d-flex justify-content-between align-items-center mt-auto">
                                            <span className={`small ${isFull ? 'text-danger' : 'text-success'}`}>
                                                {cls.current_bookings} / {cls.capacity} spots filled
                                            </span>

                                            {isBooked ? (
                                                <button disabled className="btn btn-secondary">Booked</button>
                                            ) : (
                                                <button
                                                    onClick={() => initiateBooking(cls)}
                                                    disabled={isFull}
                                                    className="btn btn-primary"
                                                >
                                                    {isFull ? 'Full' : 'Book Now'}
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                )}
            </motion.div>

            {/* Confirmation Modal */}
            {showConfirmModal && selectedClass && (
                <div style={modalOverlayStyle}>
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        style={modalContentStyle}
                    >
                        <h3 style={{ color: 'var(--text-primary)', marginBottom: '1rem' }}>Confirm Booking</h3>
                        <p style={{ color: 'var(--text-secondary)' }}>
                            Are you sure you want to book <strong>{selectedClass.name}</strong>?
                        </p>
                        <div style={{ display: 'flex', gap: '10px', marginTop: '20px', justifyContent: 'flex-end' }}>
                            <button onClick={() => setShowConfirmModal(false)} className="btn btn-ghost">Cancel</button>
                            <button onClick={confirmBooking} className="btn btn-primary">Confirm</button>
                        </div>
                    </motion.div>
                </div>
            )}

            {/* Success Animation Modal */}
            {showSuccessModal && (
                <div style={modalOverlayStyle}>
                    <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        style={{ ...modalContentStyle, textAlign: 'center' }}
                    >
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 260, damping: 20 }}
                            style={{ fontSize: '4rem', marginBottom: '1rem' }}
                        >
                            🎉
                        </motion.div>
                        <h2 style={{ color: 'var(--neon-green)', marginBottom: '10px' }}>Booking Confirmed!</h2>
                        <p style={{ color: 'var(--text-secondary)' }}>You are all set for your workout.</p>
                        <button onClick={closeSuccess} className="btn btn-primary mt-3">Awesome!</button>
                    </motion.div>
                </div>
            )}
        </div>
    );
};

// Simple inline styles for modals
const modalOverlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.8)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
    backdropFilter: 'blur(5px)'
};

const modalContentStyle = {
    backgroundColor: '#1a1a1a',
    padding: '30px',
    borderRadius: '15px',
    maxWidth: '400px',
    width: '90%',
    border: '1px solid rgba(255,255,255,0.1)',
    boxShadow: '0 20px 50px rgba(0,0,0,0.5)'
};

export default BookClass;
