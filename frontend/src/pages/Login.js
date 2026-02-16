import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import AuthContext from '../context/AuthContext';
import './Login.css';

const Login = () => {
    const navigate = useNavigate();
    const { login, isAuthenticated, user, error, clearErrors } = useContext(AuthContext);

    useEffect(() => {
        if (isAuthenticated && user) {
            if (user.role === 'admin') {
                navigate('/admin');
            } else if (user.role === 'trainer') {
                navigate('/trainer');
            } else {
                navigate('/dashboard');
            }
        }
        if (error) {
            const timer = setTimeout(() => clearErrors(), 3000);
            return () => clearTimeout(timer);
        }
    }, [isAuthenticated, user, error, navigate, clearErrors]);

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false
    });
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login({ email: formData.email, password: formData.password });
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
                        <h2>Welcome Back</h2>
                        <p className="text-muted">Sign in to continue your fitness journey</p>
                        {error && <div className="alert alert-danger" style={{ color: 'red', marginTop: '10px' }}>{error}</div>}
                    </div>

                    {/* Login Form */}
                    <form onSubmit={handleSubmit} className="auth-form">
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
                            <div className="password-wrapper">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    className="form-input"
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                                <button
                                    type="button"
                                    className="password-toggle"
                                    onClick={() => setShowPassword(!showPassword)}
                                    tabIndex={-1}
                                >
                                    {showPassword ? (
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                                            <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                                            <line x1="1" y1="1" x2="23" y2="23" />
                                        </svg>
                                    ) : (
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                            <circle cx="12" cy="12" r="3" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>

                        <div className="form-options">
                            <label className="checkbox-label">
                                <input
                                    type="checkbox"
                                    name="rememberMe"
                                    checked={formData.rememberMe}
                                    onChange={handleChange}
                                />
                                <span>Remember me</span>
                            </label>
                            <Link to="/forgot-password" className="forgot-link">
                                Forgot password?
                            </Link>
                        </div>

                        <button type="submit" className="btn btn-primary btn-large">
                            Sign In
                        </button>
                    </form>

                    {/* Footer */}
                    <div className="auth-footer">
                        <p>
                            Don't have an account?{' '}
                            <Link to="/register" className="auth-link">Sign up</Link>
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Login;
