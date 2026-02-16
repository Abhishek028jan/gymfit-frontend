import React from 'react';
import { motion } from 'framer-motion';
import './Testimonials.css';

const Testimonials = () => {
    const testimonials = [
        {
            id: 1,
            name: 'Sarah Johnson',
            role: 'Weight Loss Transformation',
            image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
            text: 'GymFit completely transformed my life! Lost 30 pounds in 4 months with amazing trainers. The community is incredibly supportive.',
        },
        {
            id: 2,
            name: 'Michael Chen',
            role: 'Strength Training Expert',
            image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
            text: 'Best gym I\'ve ever joined! The equipment is top-notch and trainers are knowledgeable. Perfect atmosphere for serious training.',
        },
        {
            id: 3,
            name: 'Emily Rodriguez',
            role: 'Yoga & Wellness',
            image: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=400&h=400&fit=crop',
            text: 'The yoga classes are phenomenal! My flexibility and mental clarity improved tremendously. Instructors truly care about progress.',
        },
        {
            id: 4,
            name: 'David Thompson',
            role: 'CrossFit Enthusiast',
            image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop',
            text: 'GymFit\'s CrossFit program is intense and effective! Never felt stronger. Trainers push you to limits while keeping safety first.',
        },
        {
            id: 5,
            name: 'Jessica Lee',
            role: 'Fitness Transformation',
            image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop',
            text: 'Best decision I made this year! The personalized workout plans and nutrition guidance helped me achieve impossible goals.',
        },
        {
            id: 6,
            name: 'Robert Martinez',
            role: 'Marathon Runner',
            image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
            text: 'The cardio programs here are exceptional! Trained for my first marathon and crushed it. Couldn\'t have done it without GymFit.',
        }
    ];

    // Triple the testimonials for seamless infinite loop
    const extendedTestimonials = [...testimonials, ...testimonials, ...testimonials];

    return (
        <section className="testimonials section" id="testimonials">
            <div className="testimonials-bg-effect"></div>

            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="testimonials-header"
                >
                    <h2 className="text-center">
                        What Our <span className="text-gradient">Users are Saying</span>
                    </h2>
                    <p className="text-center text-muted">
                        Hear from satisfied members of the GymFit community
                    </p>
                </motion.div>
            </div>

            {/* Infinite Scroll Container */}
            <div className="testimonials-scroll-wrapper">
                <motion.div
                    className="testimonials-scroll-track"
                    animate={{
                        x: [0, -2400] // 6 cards * 400px width
                    }}
                    transition={{
                        x: {
                            repeat: Infinity,
                            repeatType: "loop",
                            duration: 40,
                            ease: "linear"
                        }
                    }}
                >
                    {extendedTestimonials.map((testimonial, index) => (
                        <div
                            key={`${testimonial.id}-${index}`}
                            className="testimonial-card-scroll card"
                        >
                            <div className="card-glow"></div>
                            <div className="testimonial-header">
                                <div className="testimonial-avatar">
                                    <img src={testimonial.image} alt={testimonial.name} />
                                </div>
                                <div className="testimonial-info">
                                    <h4 className="testimonial-name">{testimonial.name}</h4>
                                    <p className="testimonial-role">{testimonial.role}</p>
                                </div>
                            </div>
                            <p className="testimonial-text">"{testimonial.text}"</p>
                            <div className="testimonial-stars">
                                {[...Array(5)].map((_, i) => (
                                    <span key={i} className="star">⭐</span>
                                ))}
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Testimonials;
