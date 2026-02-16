import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './ClassSchedule.css';

const ClassSchedule = () => {
    const [selectedDay, setSelectedDay] = useState('Monday');

    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    const schedule = {
        Monday: [
            { time: '6:00 AM', class: 'Morning Yoga', trainer: 'Emily Rodriguez', duration: '60 min', spots: 12 },
            { time: '9:00 AM', class: 'CrossFit', trainer: 'David Thompson', duration: '45 min', spots: 8 },
            { time: '5:00 PM', class: 'Strength Training', trainer: 'Michael Chen', duration: '60 min', spots: 15 },
            { time: '7:00 PM', class: 'Cardio Blast', trainer: 'Sarah Johnson', duration: '45 min', spots: 20 },
        ],
        Tuesday: [
            { time: '6:00 AM', class: 'HIIT Training', trainer: 'David Thompson', duration: '45 min', spots: 10 },
            { time: '10:00 AM', class: 'Pilates', trainer: 'Emily Rodriguez', duration: '60 min', spots: 12 },
            { time: '6:00 PM', class: 'Boxing', trainer: 'Robert Martinez', duration: '60 min', spots: 15 },
            { time: '8:00 PM', class: 'Yoga Flow', trainer: 'Emily Rodriguez', duration: '60 min', spots: 18 },
        ],
        Wednesday: [
            { time: '6:00 AM', class: 'Morning Run', trainer: 'Robert Martinez', duration: '45 min', spots: 25 },
            { time: '9:00 AM', class: 'Strength & Conditioning', trainer: 'Michael Chen', duration: '60 min', spots: 12 },
            { time: '5:00 PM', class: 'CrossFit', trainer: 'David Thompson', duration: '45 min', spots: 8 },
            { time: '7:00 PM', class: 'Zumba', trainer: 'Jessica Lee', duration: '60 min', spots: 30 },
        ],
        Thursday: [
            { time: '6:00 AM', class: 'Yoga', trainer: 'Emily Rodriguez', duration: '60 min', spots: 12 },
            { time: '10:00 AM', class: 'Functional Training', trainer: 'Michael Chen', duration: '45 min', spots: 10 },
            { time: '6:00 PM', class: 'Kickboxing', trainer: 'Robert Martinez', duration: '60 min', spots: 15 },
            { time: '8:00 PM', class: 'Spin Class', trainer: 'Sarah Johnson', duration: '45 min', spots: 20 },
        ],
        Friday: [
            { time: '6:00 AM', class: 'HIIT', trainer: 'David Thompson', duration: '45 min', spots: 10 },
            { time: '9:00 AM', class: 'Yoga', trainer: 'Emily Rodriguez', duration: '60 min', spots: 12 },
            { time: '5:00 PM', class: 'CrossFit', trainer: 'David Thompson', duration: '45 min', spots: 8 },
            { time: '7:00 PM', class: 'Dance Fitness', trainer: 'Jessica Lee', duration: '60 min', spots: 25 },
        ],
        Saturday: [
            { time: '8:00 AM', class: 'Boot Camp', trainer: 'Michael Chen', duration: '60 min', spots: 20 },
            { time: '10:00 AM', class: 'Yoga', trainer: 'Emily Rodriguez', duration: '60 min', spots: 15 },
            { time: '12:00 PM', class: 'Boxing', trainer: 'Robert Martinez', duration: '60 min', spots: 12 },
            { time: '4:00 PM', class: 'Strength Training', trainer: 'Michael Chen', duration: '60 min', spots: 15 },
        ],
        Sunday: [
            { time: '9:00 AM', class: 'Gentle Yoga', trainer: 'Emily Rodriguez', duration: '60 min', spots: 20 },
            { time: '11:00 AM', class: 'Family Fitness', trainer: 'Jessica Lee', duration: '45 min', spots: 30 },
            { time: '3:00 PM', class: 'Meditation', trainer: 'Emily Rodriguez', duration: '45 min', spots: 25 },
            { time: '5:00 PM', class: 'Stretch & Recover', trainer: 'Sarah Johnson', duration: '45 min', spots: 15 },
        ],
    };

    return (
        <section className="class-schedule section" id="classes">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="schedule-header"
                >
                    <h2 className="text-center">
                        WEEKLY <span className="text-gradient">CLASS SCHEDULE</span>
                    </h2>
                    <p className="text-center text-muted">
                        Choose from over 100+ classes per week
                    </p>
                </motion.div>

                {/* Day Selector */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="day-selector"
                >
                    {days.map((day) => (
                        <button
                            key={day}
                            className={`day-btn ${selectedDay === day ? 'active' : ''}`}
                            onClick={() => setSelectedDay(day)}
                        >
                            {day}
                        </button>
                    ))}
                </motion.div>

                {/* Schedule Grid */}
                <motion.div
                    key={selectedDay}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4 }}
                    className="schedule-grid"
                >
                    {schedule[selectedDay].map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            className="schedule-card card card-glass"
                            whileHover={{ y: -5, transition: { duration: 0.2 } }}
                        >
                            <div className="schedule-time">{item.time}</div>
                            <h4 className="schedule-class">{item.class}</h4>
                            <div className="schedule-details">
                                <span className="schedule-trainer">👤 {item.trainer}</span>
                                <span className="schedule-duration">⏱️ {item.duration}</span>
                            </div>
                            {/* <div className="schedule-footer">
                                <span className="schedule-spots">
                                    {item.spots} spots available
                                </span>
                                <button className="btn btn-primary btn-small">Book Now</button>
                            </div> */}
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default ClassSchedule;
