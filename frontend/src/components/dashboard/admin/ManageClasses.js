import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

const API = 'http://localhost:5001/api/admin';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const emptyForm = {
    name: '',
    description: '',
    program_id: '',
    trainer_id: '',
    day_of_week: 'Monday',
    start_time: '09:00',
    end_time: '10:00',
    capacity: 20,
    is_active: true,
};

const ManageClasses = () => {
    const [classes, setClasses] = useState([]);
    const [programs, setPrograms] = useState([]);
    const [trainers, setTrainers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editId, setEditId] = useState(null);
    const [deleteId, setDeleteId] = useState(null);
    const [form, setForm] = useState(emptyForm);

    useEffect(() => {
        loadAll();
    }, []);

    const getAuthHeader = () => ({
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });

    const loadAll = async () => {
        try {
            const [classRes, progRes, trainerRes] = await Promise.all([
                axios.get(`${API}/classes`, getAuthHeader()),
                axios.get(`${API}/programs`, getAuthHeader()),
                axios.get(`${API}/trainers`, getAuthHeader()),
            ]);
            setClasses(classRes.data.data);
            setPrograms(progRes.data.data);
            setTrainers(trainerRes.data.data);
        } catch (err) {
            console.error('Failed to load data', err);
        } finally {
            setLoading(false);
        }
    };

    const openAdd = () => {
        setForm(emptyForm);
        setEditId(null);
        setShowModal(true);
    };

    const openEdit = (cls) => {
        setForm({
            name: cls.name || '',
            description: cls.description || '',
            program_id: cls.program_id || '',
            trainer_id: cls.trainer_id || '',
            day_of_week: cls.day_of_week || 'Monday',
            start_time: cls.start_time?.slice(0, 5) || '09:00',
            end_time: cls.end_time?.slice(0, 5) || '10:00',
            capacity: cls.capacity || 20,
            is_active: cls.is_active ?? true,
        });
        setEditId(cls.id);
        setShowModal(true);
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            ...form,
            program_id: form.program_id || null,
            trainer_id: form.trainer_id || null,
        };

        try {
            if (editId) {
                const res = await axios.put(`${API}/classes/${editId}`, payload, getAuthHeader());
                setClasses(classes.map(c => c.id === editId ? { ...c, ...res.data.data } : c));
            } else {
                const res = await axios.post(`${API}/classes`, payload, getAuthHeader());
                setClasses([res.data.data, ...classes]);
            }
            setShowModal(false);
            setEditId(null);
        } catch (err) {
            console.error('Save failed', err);
        }
    };

    const handleDelete = async () => {
        if (!deleteId) return;
        try {
            await axios.delete(`${API}/classes/${deleteId}`, getAuthHeader());
            setClasses(classes.filter(c => c.id !== deleteId));
            setDeleteId(null);
        } catch (err) {
            console.error('Delete failed', err);
        }
    };

    const formatTime = (t) => {
        if (!t) return '—';
        const [h, m] = t.split(':');
        const hour = parseInt(h, 10);
        const ampm = hour >= 12 ? 'PM' : 'AM';
        return `${hour % 12 || 12}:${m} ${ampm}`;
    };

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
                <h1>Manage Classes</h1>
                <p>Create, edit, and manage gym classes</p>
            </motion.div>

            <motion.div
                className="admin-table-wrapper"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
            >
                <div className="admin-table-header">
                    <h2>All Classes ({classes.length})</h2>
                    <button className="btn-add" onClick={openAdd}>+ Add Class</button>
                </div>

                <div className="admin-table-scroll">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Class Name</th>
                                <th>Day</th>
                                <th>Time</th>
                                <th>Trainer</th>
                                <th>Capacity</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {classes.length > 0 ? (
                                classes.map((cls) => (
                                    <tr key={cls.id}>
                                        <td style={{ color: 'var(--text-primary)', fontWeight: 500 }}>
                                            {cls.name}
                                        </td>
                                        <td>{cls.day_of_week}</td>
                                        <td>{formatTime(cls.start_time)} – {formatTime(cls.end_time)}</td>
                                        <td>{cls.trainer_name || '—'}</td>
                                        <td>{cls.current_bookings}/{cls.capacity}</td>
                                        <td>
                                            <span className={`badge ${cls.is_active ? 'badge-success' : 'badge-error'}`}>
                                                {cls.is_active ? 'Active' : 'Inactive'}
                                            </span>
                                        </td>
                                        <td>
                                            <button className="btn-icon edit" title="Edit" onClick={() => openEdit(cls)}>✏️</button>
                                            <button className="btn-icon delete" title="Delete" onClick={() => setDeleteId(cls.id)}>🗑️</button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7">
                                        <div className="admin-empty">
                                            <div className="admin-empty-icon">🏋️</div>
                                            <p>No classes yet — click "Add Class" to create one</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </motion.div>

            {/* Add/Edit Modal */}
            {showModal && (
                <div className="admin-modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="admin-modal-header">
                            <h2>{editId ? 'Edit Class' : 'Add New Class'}</h2>
                            <button className="admin-modal-close" onClick={() => setShowModal(false)}>✕</button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="admin-modal-body">
                                <div className="admin-form-group">
                                    <label>Class Name *</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={form.name}
                                        onChange={handleChange}
                                        required
                                        placeholder="e.g. Morning Yoga"
                                    />
                                </div>

                                <div className="admin-form-group">
                                    <label>Description</label>
                                    <textarea
                                        name="description"
                                        value={form.description}
                                        onChange={handleChange}
                                        placeholder="Optional description"
                                    />
                                </div>

                                <div className="admin-form-row">
                                    <div className="admin-form-group">
                                        <label>Program</label>
                                        <select name="program_id" value={form.program_id} onChange={handleChange}>
                                            <option value="">None</option>
                                            {programs.map(p => (
                                                <option key={p.id} value={p.id}>{p.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="admin-form-group">
                                        <label>Trainer</label>
                                        <select name="trainer_id" value={form.trainer_id} onChange={handleChange}>
                                            <option value="">None</option>
                                            {trainers.map(t => (
                                                <option key={t.id} value={t.id}>{t.first_name} {t.last_name}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="admin-form-group">
                                    <label>Day of Week *</label>
                                    <select name="day_of_week" value={form.day_of_week} onChange={handleChange} required>
                                        {DAYS.map(d => (
                                            <option key={d} value={d}>{d}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="admin-form-row">
                                    <div className="admin-form-group">
                                        <label>Start Time *</label>
                                        <input
                                            type="time"
                                            name="start_time"
                                            value={form.start_time}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="admin-form-group">
                                        <label>End Time *</label>
                                        <input
                                            type="time"
                                            name="end_time"
                                            value={form.end_time}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="admin-form-row">
                                    <div className="admin-form-group">
                                        <label>Capacity</label>
                                        <input
                                            type="number"
                                            name="capacity"
                                            value={form.capacity}
                                            onChange={handleChange}
                                            min="1"
                                        />
                                    </div>
                                    {editId && (
                                        <div className="admin-form-group" style={{ display: 'flex', alignItems: 'center', gap: 10, paddingTop: 24 }}>
                                            <input
                                                type="checkbox"
                                                name="is_active"
                                                checked={form.is_active}
                                                onChange={handleChange}
                                                id="is_active"
                                                style={{ width: 'auto' }}
                                            />
                                            <label htmlFor="is_active" style={{ margin: 0, textTransform: 'none', letterSpacing: 0 }}>Active</label>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="admin-modal-footer">
                                <button type="button" className="btn-cancel" onClick={() => setShowModal(false)}>Cancel</button>
                                <button type="submit" className="btn-save">{editId ? 'Save Changes' : 'Create Class'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Delete Confirmation */}
            {deleteId && (
                <div className="admin-modal-overlay" onClick={() => setDeleteId(null)}>
                    <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="admin-modal-header">
                            <h2>Confirm Delete</h2>
                            <button className="admin-modal-close" onClick={() => setDeleteId(null)}>✕</button>
                        </div>
                        <div className="admin-modal-body">
                            <div className="confirm-text">
                                Are you sure you want to delete this class?<br />
                                <span style={{ color: 'var(--error)', fontSize: '0.9rem' }}>
                                    All associated bookings will also be removed.
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

export default ManageClasses;
