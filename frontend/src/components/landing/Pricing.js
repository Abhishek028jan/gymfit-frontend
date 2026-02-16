import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './Pricing.css';

const Pricing = () => {
    const plans = [
        {
            name: 'Basic',
            price: '1999',
            period: 'month',
            description: 'Perfect for beginners',
            features: [
                'Access to gym equipment',
                'Locker room access',
                'Free fitness assessment',
                'Basic workout plan',
                'Mobile app access'
            ],
            popular: false
        },
        {
            name: 'Premium',
            price: '3999',
            period: 'month',
            description: 'Most popular choice',
            features: [
                'Everything in Basic',
                'Unlimited group classes',
                'Sauna & steam room',
                'Nutrition consultation',
                'Personal training (2x/month)',
                'Guest passes (2x/month)'
            ],
            popular: true
        },
        {
            name: 'Elite',
            price: '6999',
            period: 'month',
            description: 'Ultimate fitness experience',
            features: [
                'Everything in Premium',
                'Unlimited personal training',
                'Priority class booking',
                'Massage therapy (1x/week)',
                'Custom meal plans',
                'VIP lounge access',
                'Free merchandise'
            ],
            popular: false
        }
    ];

    return (
        <section className="pricing section" id="pricing">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="pricing-header"
                >
                    <h2 className="text-center">
                        MEMBERSHIP <span className="text-gradient">PLANS</span>
                    </h2>
                    <p className="text-center text-muted">
                        Choose the perfect plan for your fitness journey
                    </p>
                </motion.div>

                <div className="pricing-grid">
                    {plans.map((plan, index) => (
                        <motion.div
                            key={plan.name}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                            className={`pricing-card card ${plan.popular ? 'pricing-card-popular' : ''}`}
                            whileHover={{ y: -10, transition: { duration: 0.3 } }}
                        >
                            {plan.popular && (
                                <div className="popular-badge">
                                    <span>⭐ MOST POPULAR</span>
                                </div>
                            )}

                            <div className="pricing-header-card">
                                <h3 className="pricing-name">{plan.name}</h3>
                                <p className="pricing-description">{plan.description}</p>
                            </div>

                            <div className="pricing-price">
                                <span className="price-currency">₹</span>
                                <span className="price-amount">{plan.price}</span>
                                <span className="price-period">/{plan.period}</span>
                            </div>

                            <ul className="pricing-features">
                                {plan.features.map((feature, i) => (
                                    <li key={i} className="pricing-feature">
                                        <span className="feature-icon">✓</span>
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                            <Link
                                to="/register"
                                className="btn btn-primary btn-large pricing-btn"
                            >
                                Get Started
                            </Link>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="pricing-footer"
                >
                    <p className="text-center text-muted">
                        All plans include a <span className="text-neon-green">7-day free trial</span>. No credit card required.
                    </p>
                </motion.div>
            </div>
        </section >
    );
};

export default Pricing;
