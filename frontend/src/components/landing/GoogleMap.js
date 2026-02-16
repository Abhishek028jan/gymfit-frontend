import React from 'react';
import { motion } from 'framer-motion';
import './GoogleMap.css';

const GoogleMap = () => {
    return (
        <section className="google-map-section section" id="location">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="map-header"
                >
                    <h2 className="text-center">
                        FIND <span className="text-gradient">OUR LOCATION</span>
                    </h2>
                    <p className="text-center text-muted">
                        Visit us and start your transformation today
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="map-container-small"
                >
                    <div className="map-wrapper card">
                        <iframe
                            title="GymFit Location"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d248849.90089943376!2d77.46612593299311!3d12.953945614011563!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9b44e6d%3A0xf8dfc3e8517e4fe0!2sBengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1770816651151!5m2!1sen!2sin"
                            width="100%"
                            height="300"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default GoogleMap;
