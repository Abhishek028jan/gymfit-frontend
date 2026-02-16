import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

const API = 'http://localhost:5001/api/admin';

const ManageMembers = () => {
    const [members, setMembers] = useState([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);
    const [deleteId, setDeleteId] = useState(null);

    useEffect(() => {
        fetchMembers();

        // Socket connection
        import('socket.io-client').then(({ io }) => {
            const socket = io('http://localhost:5001');

            socket.on('newMember', (newMember) => {
                setMembers(prevMembers => [newMember, ...prevMembers]);
            });

            return () => socket.disconnect();
        });
    }, []);

    const getAuthHeader = () => ({
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });

    const fetchMembers = async () => {
        try {
            const res = await axios.get(`${API}/members`, getAuthHeader());
            setMembers(res.data.data);
        } catch (err) {
            console.error('Failed to load members', err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!deleteId) return;
        try {
            await axios.delete(`${API}/members/${deleteId}`, getAuthHeader());
            setMembers(members.filter(m => m.id !== deleteId));
            setDeleteId(null);
        } catch (err) {
            console.error('Failed to delete member', err);
        }
    };

    const filtered = members.filter(m => {
        const q = search.toLowerCase();
        return (
            m.first_name?.toLowerCase().includes(q) ||
            m.last_name?.toLowerCase().includes(q) ||
            m.email?.toLowerCase().includes(q)
        );
    });

    if (loading) {
        return (
            <div className="admin-loading">
                <div className="spinner"></div>
            </div>
        );
    }

    return (
        <div>
            <motion.div
                className="admin-page-header"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <h1>Manage Members</h1>
                <p>View and manage all gym members</p>
            </motion.div>

            <motion.div
                className="admin-table-wrapper"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
            >
                <div className="admin-table-header">
                    <h2>All Members ({filtered.length})</h2>
                    <input
                        type="text"
                        className="admin-search"
                        placeholder="Search members..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                <div className="admin-table-scroll">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Gender</th>
                                <th>Joined</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.length > 0 ? (
                                filtered.map((member) => (
                                    <tr key={member.id}>
                                        <td style={{ color: 'var(--text-primary)', fontWeight: 500 }}>
                                            {member.first_name} {member.last_name}
                                        </td>
                                        <td>{member.email}</td>
                                        <td>{member.phone || '—'}</td>
                                        <td>
                                            {member.gender ? (
                                                <span className="badge badge-info" style={{ textTransform: 'capitalize' }}>
                                                    {member.gender}
                                                </span>
                                            ) : '—'}
                                        </td>
                                        <td>{new Date(member.created_at).toLocaleDateString()}</td>
                                        <td>
                                            <button
                                                className="btn-icon delete"
                                                title="Delete"
                                                onClick={() => setDeleteId(member.id)}
                                            >
                                                🗑️
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6">
                                        <div className="admin-empty">
                                            <div className="admin-empty-icon">👥</div>
                                            <p>No members found</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </motion.div>

            {/* Delete Confirmation Modal */}
            {deleteId && (
                <div className="admin-modal-overlay" onClick={() => setDeleteId(null)}>
                    <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="admin-modal-header">
                            <h2>Confirm Delete</h2>
                            <button className="admin-modal-close" onClick={() => setDeleteId(null)}>✕</button>
                        </div>
                        <div className="admin-modal-body">
                            <div className="confirm-text">
                                Are you sure you want to delete this member?<br />
                                <span style={{ color: 'var(--error)', fontSize: '0.9rem' }}>
                                    This action cannot be undone.
                                </span>
                            </div>
                            <div className="confirm-actions">
                                <button className="btn-cancel" onClick={() => setDeleteId(null)}>Cancel</button>
                                <button className="btn-danger" onClick={handleDelete}>Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageMembers;
