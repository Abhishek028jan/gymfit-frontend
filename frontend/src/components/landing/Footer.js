import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    {/* Brand Section */}
                    <div className="footer-section">
                        <h3 className="text-gradient">GYMFIT</h3>
                        <p className="footer-tagline">
                            Transform your body, elevate your mind, achieve your goals.
                        </p>
                        <div className="social-links">
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-link">📘</a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-link">📷</a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-link">🐦</a>
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-link">💼</a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="footer-section">
                        <h4>Quick Links</h4>
                        <ul className="footer-links">
                            <li><a href="#about">About Us</a></li>
                            <li><a href="#programs">Programs</a></li>
                            <li><a href="#classes">Classes</a></li>
                            <li><a href="#trainers">Trainers</a></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div className="footer-section">
                        <h4>Support</h4>
                        <ul className="footer-links">
                            <li><Link to="/login">Member Login</Link></li>
                            <li><a href="#contact">Contact Us</a></li>
                            <li><a href="#faq">FAQ</a></li>
                            <li><a href="#privacy">Privacy Policy</a></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="footer-section">
                        <h4>Contact</h4>
                        <ul className="footer-contact">
                            <li>📍 123 Fitness Street, NY 10001</li>
                            <li>📞 (555) 123-4567</li>
                            <li>✉️ info@gymfit.com</li>
                            <li>🕐 Mon-Sun: 5AM - 11PM</li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="footer-bottom">
                    <p>&copy; 2024 GymFit. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
