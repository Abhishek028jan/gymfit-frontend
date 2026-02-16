import React from 'react';
import { motion } from 'framer-motion';
import './About.css';

const About = () => {
    const values = [
        {
            icon: '💪',
            title: 'Excellence',
            description: 'We strive for excellence in every aspect of fitness training and member experience.'
        },
        {
            icon: '🎯',
            title: 'Results-Driven',
            description: 'Your goals are our mission. We deliver measurable results through proven methods.'
        },
        {
            icon: '🤝',
            title: 'Community',
            description: 'Join a supportive community that motivates and inspires you every step of the way.'
        },
        {
            icon: '🔥',
            title: 'Innovation',
            description: 'Cutting-edge equipment and training techniques to keep you ahead of the curve.'
        }
    ];

    return (
        <section className="about section" id="about">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="about-header"
                >
                    <h2 className="text-center">
                        WHY CHOOSE <span className="text-gradient">GYMFIT</span>
                    </h2>
                    <p className="text-center text-muted">
                        More than just a gym - it's a lifestyle transformation
                    </p>
                </motion.div>

                <div className="grid grid-4 mt-4">
                    {values.map((value, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="card card-glass hover-lift"
                        >
                            <div className="value-icon">{value.icon}</div>
                            <h3 className="text-neon-green">{value.title}</h3>
                            <p>{value.description}</p>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="about-mission mt-4"
                >
                    <div className="card card-highlight">
                        <h3 className="text-gradient">Our Mission</h3>
                        <p>
                            At GymFit, we believe fitness is not just about physical transformation—it's about
                            building confidence, discipline, and a healthier lifestyle. Our state-of-the-art
                            facilities, expert trainers, and diverse programs are designed to help you achieve
                            your goals, whether you're a beginner or an elite athlete.
                        </p>
                        <div className="mission-stats">
                            <div className="mission-stat">
                                <span className="stat-value text-neon-green">10+</span>
                                <span className="stat-text">Years Experience</span>
                            </div>
                            <div className="mission-stat">
                                <span className="stat-value text-electric-blue">98%</span>
                                <span className="stat-text">Success Rate</span>
                            </div>
                            <div className="mission-stat">
                                <span className="stat-value text-vibrant-orange">24/7</span>
                                <span className="stat-text">Access Available</span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default About;
