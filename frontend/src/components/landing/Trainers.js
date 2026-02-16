import React from 'react';
import { motion } from 'framer-motion';
import './Trainers.css';

const Trainers = () => {
    const trainers = [
        {
            id: 1,
            name: 'Mike Johnson',
            specialty: 'Strength & Conditioning',
            experience: '12 Years',
            certifications: ['NASM-CPT', 'CSCS'],
            image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=400&fit=crop',
            rating: 4.9
        },
        {
            id: 2,
            name: 'Sarah Williams',
            specialty: 'Yoga & Wellness',
            experience: '8 Years',
            certifications: ['RYT-500', 'Wellness Coach'],
            image: 'https://images.unsplash.com/photo-1549995546-87cb41aa98a4?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            rating: 5.0
        },
        {
            id: 3,
            name: 'David Chen',
            specialty: 'CrossFit & HIIT',
            experience: '10 Years',
            certifications: ['CF-L3', 'NASM-PES'],
            image: 'https://images.unsplash.com/photo-1653587108842-58a9416a0ce9?q=80&w=765&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            rating: 4.8
        },
        {
            id: 4,
            name: 'Farkas Mario',
            specialty: 'Boxing & MMA',
            experience: '7 Years',
            certifications: ['Boxing Coach', 'MMA Instructor'],
            image: 'https://plus.unsplash.com/premium_photo-1672791845159-75cadf6e2e1d?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            rating: 4.9
        }
    ];

    return (
        <section className="trainers section" id="trainers">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="trainers-header"
                >
                    <h2 className="text-center">
                        MEET OUR <span className="text-gradient">EXPERT TRAINERS</span>
                    </h2>
                    <p className="text-center text-muted">
                        Certified professionals dedicated to your success
                    </p>
                </motion.div>

                <div className="grid grid-4 mt-4">
                    {trainers.map((trainer, index) => (
                        <motion.div
                            key={trainer.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="trainer-card card hover-lift"
                        >
                            <div className="trainer-image">
                                <img src={trainer.image} alt={trainer.name} />
                            </div>
                            <div className="trainer-rating">
                                <span className="rating-star">⭐</span>
                                <span className="rating-value">{trainer.rating}</span>
                            </div>
                            <h3 className="text-neon-green">{trainer.name}</h3>
                            <p className="trainer-specialty">{trainer.specialty}</p>
                            <div className="trainer-info">
                                <div className="info-item">
                                    <span className="info-label">Experience</span>
                                    <span className="info-value">{trainer.experience}</span>
                                </div>
                                <div className="trainer-certs">
                                    {trainer.certifications.map((cert, idx) => (
                                        <span key={idx} className="badge badge-success">{cert}</span>
                                    ))}
                                </div>
                            </div>
                            {/* <button className="btn btn-secondary mt-3">Book Session</button> */}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Trainers;
