import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './Contact.css';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // TODO: Connect to backend API
        console.log('Form submitted:', formData);
        alert('Thank you! We will get back to you soon.');
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    };

    const contactInfo = [
        {
            icon: '📍',
            title: 'Visit Us',
            details: ['Bengaluru, Karnataka', 'India']
        },
        {
            icon: '📞',
            title: 'Call Us',
            details: ['+91 98765 43210', 'Mon-Sat: 6AM - 10PM']
        },
        {
            icon: '✉️',
            title: 'Email Us',
            details: ['info@gymfit.com', 'support@gymfit.com']
        }
    ];

    return (
        <section className="contact section" id="contact">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="contact-header"
                >
                    <h2 className="text-center">
                        GET IN <span className="text-gradient">TOUCH</span>
                    </h2>
                    <p className="text-center text-muted">
                        Have questions? We'd love to hear from you
                    </p>
                </motion.div>

                <div className="contact-content">
                    {/* Contact Info Cards */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="contact-info"
                    >
                        {contactInfo.map((info, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: index * 0.1 }}
                                className="contact-info-card card card-glass"
                                whileHover={{ y: -5 }}
                            >
                                <div className="contact-icon">{info.icon}</div>
                                <h4 className="contact-info-title">{info.title}</h4>
                                {info.details.map((detail, i) => (
                                    <p key={i} className="contact-detail">{detail}</p>
                                ))}
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="contact-form-wrapper"
                    >
                        <form onSubmit={handleSubmit} className="contact-form card card-glass">
                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="name">Full Name *</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Email *</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        placeholder="john@example.com"
                                    />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="phone">Phone Number</label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="+91 98765 43210"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="subject">Subject *</label>
                                    <input
                                        type="text"
                                        id="subject"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        required
                                        placeholder="Membership Inquiry"
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="message">Message *</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows="5"
                                    placeholder="Tell us how we can help you..."
                                ></textarea>
                            </div>

                            <button type="submit" className="btn btn-primary btn-large">
                                Send Message
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
