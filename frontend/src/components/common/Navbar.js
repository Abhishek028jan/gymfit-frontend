import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import AuthContext from '../../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { isAuthenticated, logout, user } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    // Force check: if user object exists, we should treat as authenticated for UI purposes if isAuthenticated is lagging
    const isAuth = isAuthenticated || !!user;
    const dashboardPath =
        user?.role === 'admin' ? '/admin' :
            user?.role === 'trainer' ? '/trainer' :
                '/dashboard';

    const isDashboard = location.pathname.includes('/dashboard') || location.pathname.includes('/admin') || location.pathname.includes('/trainer') || location.pathname.includes('/book-class');

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <motion.nav
            className={`navbar ${isScrolled || isDashboard ? 'navbar-scrolled' : ''}`}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="container">
                <div className="navbar-content">
                    {/* Logo */}
                    <Link
                        to={isAuth ? dashboardPath : "/"}
                        className="navbar-logo"
                        onClick={(e) => {
                            if (!isAuth && location.pathname === '/') {
                                e.preventDefault();
                                window.location.reload();
                            }
                        }}
                    >
                        <span className="text-gradient">GYMFIT</span>
                    </Link>

                    {/* Desktop Navigation - Hide on Dashboard */}
                    {!isDashboard && (
                        <div className="navbar-links">
                            <a href="#home" className="navbar-link">Home</a>
                            <a href="#about" className="navbar-link">About</a>
                            <a href="#programs" className="navbar-link">Programs</a>
                            <a href="#classes" className="navbar-link">Classes</a>
                            <a href="#trainers" className="navbar-link">Trainers</a>
                            <a href="#contact" className="navbar-link">Contact</a>
                        </div>
                    )}

                    {/* Auth Buttons */}
                    <div className="navbar-actions">
                        {isAuth ? (
                            <>
                                <Link to={dashboardPath} className="btn btn-ghost btn-small">Dashboard</Link>
                                <button onClick={handleLogout} className="btn btn-primary btn-small">Logout</button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="btn btn-ghost btn-small">Login</Link>
                                <Link to="/register" className="btn btn-primary btn-small">Join Now</Link>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button - Hide on Dashboard if desired, or keep for logout */}
                    {!isDashboard && (
                        <button
                            className="mobile-menu-btn"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            <span></span>
                            <span></span>
                            <span></span>
                        </button>
                    )}
                </div>

                {/* Mobile Menu */}
                {!isDashboard && isMobileMenuOpen && (
                    <motion.div
                        className="mobile-menu"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                    >
                        <a href="#home" className="mobile-menu-link">Home</a>
                        <a href="#about" className="mobile-menu-link">About</a>
                        <a href="#programs" className="mobile-menu-link">Programs</a>
                        <a href="#classes" className="mobile-menu-link">Classes</a>
                        <a href="#trainers" className="mobile-menu-link">Trainers</a>
                        <a href="#contact" className="mobile-menu-link">Contact</a>
                        {isAuthenticated ? (
                            <>
                                <Link to={dashboardPath} className="mobile-menu-link">Dashboard</Link>
                                <button onClick={handleLogout} className="btn btn-primary btn-small mt-2" style={{ width: '100%' }}>Logout</button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="btn btn-ghost btn-small mt-2">Login</Link>
                                <Link to="/register" className="btn btn-primary btn-small mt-2">Join Now</Link>
                            </>
                        )}
                    </motion.div>
                )}
            </div>
        </motion.nav>
    );
};

export default Navbar;
