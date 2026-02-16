import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './Programs.css';

const Programs = () => {
    const [activeFilter, setActiveFilter] = useState('all');

    const programs = [
        {
            id: 1,
            title: 'Strength Training',
            category: 'strength',
            description: 'Build muscle and increase strength with our comprehensive weightlifting programs.',
            icon: '🏋️',
            features: ['Free Weights', 'Machines', 'Personal Training']
        },
        {
            id: 2,
            title: 'Cardio Fitness',
            category: 'cardio',
            description: 'Improve endurance and burn calories with high-intensity cardio workouts.',
            icon: '🏃',
            features: ['Treadmills', 'Bikes', 'Rowing']
        },
        {
            id: 3,
            title: 'Yoga & Flexibility',
            category: 'wellness',
            description: 'Enhance flexibility, balance, and mental clarity through yoga and stretching.',
            icon: '🧘',
            features: ['Hatha Yoga', 'Vinyasa', 'Meditation']
        },
        {
            id: 4,
            title: 'CrossFit',
            category: 'strength',
            description: 'High-intensity functional training for overall fitness and athleticism.',
            icon: '⚡',
            features: ['WODs', 'Olympic Lifts', 'Gymnastics']
        },
        {
            id: 5,
            title: 'Boxing & MMA',
            category: 'combat',
            description: 'Learn self-defense while getting an incredible full-body workout.',
            icon: '🥊',
            features: ['Bag Work', 'Sparring', 'Technique']
        },
        {
            id: 6,
            title: 'Group Classes',
            category: 'group',
            description: 'Join energetic group sessions for motivation and community support.',
            icon: '👥',
            features: ['Zumba', 'Spin', 'HIIT']
        }
    ];

    const filters = [
        { id: 'all', label: 'All Programs' },
        { id: 'strength', label: 'Strength' },
        { id: 'cardio', label: 'Cardio' },
        { id: 'wellness', label: 'Wellness' },
        { id: 'combat', label: 'Combat' },
        { id: 'group', label: 'Group' }
    ];

    const filteredPrograms = activeFilter === 'all'
        ? programs
        : programs.filter(p => p.category === activeFilter);

    return (
        <section className="programs section" id="programs">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="programs-header"
                >
                    <h2 className="text-center">
                        OUR <span className="text-gradient">PROGRAMS</span>
                    </h2>
                    <p className="text-center text-muted">
                        Discover the perfect program to match your fitness goals
                    </p>
                </motion.div>

                {/* Filters */}
                <div className="program-filters">
                    {filters.map(filter => (
                        <button
                            key={filter.id}
                            className={`filter-btn ${activeFilter === filter.id ? 'active' : ''}`}
                            onClick={() => setActiveFilter(filter.id)}
                        >
                            {filter.label}
                        </button>
                    ))}
                </div>

                {/* Programs Grid */}
                <div className="grid grid-3 mt-4">
                    {filteredPrograms.map((program, index) => (
                        <motion.div
                            key={program.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="program-card card hover-lift"
                        >
                            <div className="program-icon">{program.icon}</div>
                            <h3 className="text-neon-green">{program.title}</h3>
                            <p>{program.description}</p>
                            <div className="program-features">
                                {program.features.map((feature, idx) => (
                                    <span key={idx} className="badge badge-info">{feature}</span>
                                ))}
                            </div>

                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Programs;
