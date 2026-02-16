import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const API = 'http://localhost:5001/api/admin';

const PendingRequests = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [successMsg, setSuccessMsg] = useState('');

    useEffect(() => {
        fetchRequests();
    }, []);

    const fetchRequests = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.get(`${API}/pending-members`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setRequests(res.data.data);
        } catch (err) {
            setError('Failed to load. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleAction = async (id, status) => {
        setSuccessMsg('');
        setError(null);

        try {
            const token = localStorage.getItem('token');
            await axios.put(
                `${API}/members/${id}/status`,
                { status },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setSuccessMsg(
                `Member ${status === 'active' ? 'approved' : 'rejected'} successfully.`
            );
            fetchRequests();
            setTimeout(() => setSuccessMsg(''), 3000);
        } catch (err) {
            setError('Action failed. Please try again.');
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            {/* Header */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h2 className="text-light" style={{ fontWeight: 600 }}>
                        Member Requests
                    </h2>
                    <p className="text-muted" style={{ marginBottom: 0 }}>
                        Manage incoming registration requests
                    </p>
                </div>

                <div
                    style={{
                        background: 'rgba(254, 243, 199, 0.1)',
                        color: '#FCD34D',
                        border: '1px solid rgba(254, 243, 199, 0.2)',
                        padding: '8px 18px',
                        borderRadius: '999px',
                        fontWeight: 500
                    }}
                >
                    {requests.length} Pending
                </div>
            </div>

            {error && (
                <div className="alert alert-danger rounded-3">{error}</div>
            )}

            {successMsg && (
                <div className="alert alert-success rounded-3">
                    {successMsg}
                </div>
            )}

            {/* Loading */}
            {loading ? (
                <div className="text-center py-5">
                    <div className="spinner-border text-primary"></div>
                </div>
            ) : requests.length === 0 ? (
                <div
                    className="text-center py-5"
                    style={{
                        background: '#1a1a1a',
                        borderRadius: '12px',
                        border: '1px solid #333'
                    }}
                >
                    <h4 className="text-muted">
                        No pending requests
                    </h4>
                </div>
            ) : (
                <div className="d-flex flex-column gap-3">

                    {/* Table Header */}
                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: '80px 2fr 2fr 1.5fr 1fr 200px',
                            padding: '14px 20px',
                            fontSize: '14px',
                            fontWeight: 600,
                            color: '#9CA3AF'
                        }}
                    >
                        <div>ID</div>
                        <div>Name</div>
                        <div>Email</div>
                        <div>Registered</div>
                        <div>Status</div>
                        <div className="text-center">Action</div>
                    </div>

                    {requests.map((user, index) => (
                        <motion.div
                            key={user.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            style={{
                                background: '#1e1e1e',
                                borderRadius: '12px',
                                padding: '18px 20px',
                                border: '1px solid #333',
                                display: 'grid',
                                gridTemplateColumns:
                                    '80px 2fr 2fr 1.5fr 1fr 200px',
                                alignItems: 'center',
                                transition: 'all 0.2s ease'
                            }}
                            className="approval-row"
                        >
                            {/* ID */}
                            <div style={{ fontWeight: 600, color: '#6B7280' }}>
                                #{user.id}
                            </div>

                            {/* Name */}
                            <div style={{ color: '#F9FAFB', fontWeight: 500 }}>
                                {user.first_name} {user.last_name}
                            </div>

                            {/* Email */}
                            <div style={{ color: '#9CA3AF' }}>
                                {user.email}
                            </div>

                            {/* Date */}
                            <div style={{ color: '#9CA3AF' }}>
                                {new Date(
                                    user.created_at
                                ).toLocaleDateString()}
                            </div>

                            {/* Status */}
                            <div>
                                <span
                                    style={{
                                        background: 'rgba(254, 243, 199, 0.1)',
                                        color: '#FCD34D',
                                        padding: '6px 14px',
                                        borderRadius: '999px',
                                        fontSize: '13px',
                                        fontWeight: 500,
                                        border: '1px solid rgba(254, 243, 199, 0.2)'
                                    }}
                                >
                                    In Progress
                                </span>
                            </div>

                            {/* Actions */}
                            <div className="d-flex justify-content-center gap-2">
                                <button
                                    onClick={() =>
                                        handleAction(user.id, 'active')
                                    }
                                    style={{
                                        background: '#22C55E',
                                        border: 'none',
                                        padding: '6px 18px',
                                        borderRadius: '999px',
                                        color: '#fff',
                                        fontWeight: 500,
                                        transition: '0.2s'
                                    }}
                                    className="approve-btn"
                                >
                                    Approve
                                </button>

                                <button
                                    onClick={() =>
                                        handleAction(user.id, 'rejected')
                                    }
                                    style={{
                                        background: 'transparent',
                                        border: '1px solid #EF4444',
                                        padding: '6px 18px',
                                        borderRadius: '999px',
                                        color: '#EF4444',
                                        fontWeight: 500,
                                        transition: '0.2s'
                                    }}
                                    className="reject-btn"
                                >
                                    Reject
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}

            {/* Hover Effects */}
            <style>
                {`
                .approval-row:hover {
                    transform: translateY(-2px);
                    background: #252525 !important;
                    border-color: #444 !important;
                }

                .approve-btn:hover {
                    background: #16A34A !important;
                }

                .reject-btn:hover {
                    background: #EF4444 !important;
                    color: white !important;
                }
                `}
            </style>
        </div>
    );
};

export default PendingRequests;
