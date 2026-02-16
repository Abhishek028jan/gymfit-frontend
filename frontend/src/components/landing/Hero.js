import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Hero.css';
import heroImage from '../../assets/hero_man_gym.png';

const Hero = () => {
    const [members, setMembers] = useState(0);
    const [trainers, setTrainers] = useState(0);
    const [classes, setClasses] = useState(0);

    const animateCounter = (target, setter, duration = 2000) => {
        const increment = target / (duration / 16);
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                setter(target);
                clearInterval(timer);
            } else {
                setter(Math.floor(current));
            }
        }, 16);
    };

    useEffect(() => {
        animateCounter(500, setMembers, 2000);
        animateCounter(20, setTrainers, 1800);
        animateCounter(50, setClasses, 1600);
    }, []);

    return (
        <section className="hero" id="home">

            {/* Background with Reference Image */}
            <div className="hero-background"></div>

            {/* Strong Left Dark Fade */}
            <div className="hero-overlay"></div>

            {/* Athlete Image */}
            <motion.div
                className="hero-image-wrapper"
                initial={{ opacity: 0, x: 80 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
            >
                <img
                    src={heroImage}
                    alt="Athletic male lifting dumbbells"
                    className="hero-athlete-image"
                />
            </motion.div>

            {/* Content */}
            <div className="hero-container">
                <motion.div
                    className="hero-content"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="hero-headline">
                        <span className="headline-white">TRANSFORM YOUR</span>
                        <span className="headline-gradient">BODY & MIND</span>
                    </h1>

                    <p className="hero-subtitle">
                        Train smarter. Get stronger. Join a community built to push your limits.
                    </p>

                    <div className="hero-cta-buttons">
                        <Link to="/register" className="hero-btn hero-btn-primary">
                            Join Now
                        </Link>

                        <a href="#programs" className="hero-btn hero-btn-secondary">
                            Explore Programs
                        </a>
                    </div>

                    <div className="hero-stats-row">
                        <div className="hero-stat-box">
                            <div className="stat-number stat-green">
                                {members.toLocaleString()}+
                            </div>
                            <div className="stat-label">ACTIVE MEMBERS</div>
                        </div>

                        <div className="hero-stat-box">
                            <div className="stat-number stat-cyan">
                                {trainers}+
                            </div>
                            <div className="stat-label">EXPERT TRAINERS</div>
                        </div>

                        <div className="hero-stat-box">
                            <div className="stat-number stat-orange">
                                {classes}+
                            </div>
                            <div className="stat-label">WEEKLY CLASSES</div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
