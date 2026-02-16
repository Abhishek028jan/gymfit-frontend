import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import AuthContext from '../context/AuthContext';
import '../pages/Login.css';

const Register = () => {
    const navigate = useNavigate();
    const { register, isAuthenticated, error, clearErrors } = useContext(AuthContext);

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/dashboard'); // Redirect to dashboard
        }
        if (error) {
            const timer = setTimeout(() => clearErrors(), 3000);
            return () => clearTimeout(timer);
        }
    }, [isAuthenticated, error, navigate, clearErrors]);

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        agreeTerms: false
    });
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            alert("Passwords don't match");
            return;
        }

        const userData = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            password: formData.password
        };

        const result = await register(userData);
        if (result.success) {
            setShowSuccessModal(true);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-background">
                <div className="auth-gradient"></div>
            </div>

            <div className="auth-container">
                <motion.div
                    className="auth-card card"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    {/* Header */}
                    <div className="auth-header">
                        <Link to="/" className="auth-logo text-gradient">GYMFIT</Link>
                        <h2>Start Your Journey</h2>
                        <p className="text-muted">Create your account and transform your life</p>
                        {error && <div className="alert alert-danger" style={{ color: 'red', marginTop: '10px' }}>{error}</div>}
                    </div>

                    {/* Register Form */}
                    <form onSubmit={handleSubmit} className="auth-form">
                        <div className="form-row">
                            <div className="form-group">
                                <label className="form-label">First Name</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    className="form-input"
                                    placeholder="John"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Last Name</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    className="form-input"
                                    placeholder="Doe"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Email Address</label>
                            <input
                                type="email"
                                name="email"
                                className="form-input"
                                placeholder="your@email.com"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Password</label>
                            <input
                                type="password"
                                name="password"
                                className="form-input"
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Confirm Password</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                className="form-input"
                                placeholder="••••••••"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label className="checkbox-label">
                                <input
                                    type="checkbox"
                                    name="agreeTerms"
                                    checked={formData.agreeTerms}
                                    onChange={handleChange}
                                    required
                                />
                                <span>I agree to the Terms & Conditions</span>
                            </label>
                        </div>

                        <button type="submit" className="btn btn-primary btn-large">
                            Join Now
                        </button>
                    </form>

                    {/* Footer */}
                    <div className="auth-footer">
                        <p>
                            Already have an account?{' '}
                            <Link to="/login" className="auth-link">Sign in</Link>
                        </p>
                    </div>
                </motion.div>
            </div>
            {/* Success Modal */}
            {showSuccessModal && (
                <div className="admin-modal-overlay" style={{ zIndex: 2000 }}>
                    <motion.div
                        className="admin-modal"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        style={{ maxWidth: '500px', textAlign: 'center', padding: '40px' }}
                    >
                        <div style={{ fontSize: '48px', marginBottom: '20px' }}>🎉</div>
                        <h2 style={{ marginBottom: '15px' }}>Thank You for Joining!</h2>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '30px', lineHeight: '1.6' }}>
                            We have received your request to join GymFit. Your account is currently pending approval from our administrators.
                            <br /><br />
                            We will notify you once your account is confirmed. You can then log in via the login section.
                        </p>
                        <button
                            className="btn btn-primary"
                            onClick={() => navigate('/login')}
                            style={{ width: '100%' }}
                        >
                            Go to Login
                        </button>
                    </motion.div>
                </div>
            )}
        </div>
    );
};

export default Register;
