import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './BMIModal.css';

const BMIModal = ({ onClose }) => {
    const [gender, setGender] = useState('male');
    const [height, setHeight] = useState(170); // cm
    const [weight, setWeight] = useState(70); // kg
    const [age, setAge] = useState(25);
    const [result, setResult] = useState(null);

    const calculateBMI = () => {
        const heightInMeters = height / 100;
        const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(1);

        let status = '';
        let color = '';
        let percentage = 0; // For gauge position

        if (bmiValue < 18.5) {
            status = 'Underweight';
            color = '#0AFFFF';
            percentage = 20;
        } else if (bmiValue < 25) {
            status = 'Normal';
            color = '#39FF14';
            percentage = 50;
        } else if (bmiValue < 30) {
            status = 'Overweight';
            color = '#FFD700';
            percentage = 80;
        } else {
            status = 'Obese';
            color = '#FF6B35';
            percentage = 95;
        }

        setTimeout(() => {
            setResult({ bmi: bmiValue, status, color, percentage });
        }, 500); // Fake calculation delay for effect
    };

    const reset = () => {
        setResult(null);
    };

    return (
        <div className="bmi-modal-overlay" onClick={onClose}>
            <motion.div
                className="bmi-modal-content"
                onClick={e => e.stopPropagation()}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
            >
                {/* Header */}
                <div className="bmi-header">
                    <h2>BMI Calculator</h2>
                    <button className="close-btn" onClick={onClose}>&times;</button>
                </div>

                {!result ? (
                    <>
                        {/* Gender Selection */}
                        <div className="gender-selection">
                            <div
                                className={`gender-card ${gender === 'male' ? 'active' : ''}`}
                                onClick={() => setGender('male')}
                            >
                                <div className="gender-icon">♂️</div>
                                <span>MALE</span>
                            </div>
                            <div
                                className={`gender-card ${gender === 'female' ? 'active' : ''}`}
                                onClick={() => setGender('female')}
                            >
                                <div className="gender-icon">♀️</div>
                                <span>FEMALE</span>
                            </div>
                        </div>

                        {/* Height Slider */}
                        <div className="height-container">
                            <div className="label-row">
                                <span>Height</span>
                                <span>cm</span>
                            </div>
                            <div className="height-display">
                                <span className="height-value">{height}</span>
                                <span className="height-unit">cm</span>
                            </div>
                            <input
                                type="range"
                                min="100"
                                max="220"
                                value={height}
                                onChange={(e) => setHeight(parseInt(e.target.value))}
                                className="height-slider"
                            />
                        </div>

                        {/* Weight & Age Controls */}
                        <div className="controls-row">
                            <div className="control-card">
                                <span className="control-label">Weight</span>
                                <div className="control-value">{weight}</div>
                                <div className="btn-group">
                                    <button className="control-btn" onClick={() => setWeight(Math.max(30, weight - 1))}>-</button>
                                    <button className="control-btn" onClick={() => setWeight(weight + 1)}>+</button>
                                </div>
                            </div>
                            <div className="control-card">
                                <span className="control-label">Age</span>
                                <div className="control-value">{age}</div>
                                <div className="btn-group">
                                    <button className="control-btn" onClick={() => setAge(Math.max(10, age - 1))}>-</button>
                                    <button className="control-btn" onClick={() => setAge(age + 1)}>+</button>
                                </div>
                            </div>
                        </div>

                        {/* Show Result Button */}
                        <button className="calculate-btn" onClick={calculateBMI}>
                            Calculate BMI
                        </button>
                    </>
                ) : (
                    <div className="result-view">
                        <h3>Your Result</h3>
                        <div className="bmi-status" style={{ color: result.color }}>{result.status}</div>
                        <div className="bmi-score">{result.bmi}</div>

                        <div className="bmi-gauge">
                            <div
                                className="gauge-marker"
                                style={{ left: `${result.percentage}%`, borderColor: result.color }}
                            ></div>
                        </div>
                        <p className="text-muted text-center mb-4">Normal BMI range: 18.5 - 25 kg/m²</p>

                        <div className="diet-tips">
                            <h4>Diet & Nutrition Tips</h4>
                            <ul>
                                {result.status === 'Underweight' && <li>Focus on nutrient-rich foods and increase caloric intake with healthy fats and proteins.</li>}
                                {result.status === 'Normal' && <li>Maintain a balanced diet rich in whole foods, vegetables, and lean proteins.</li>}
                                {(result.status === 'Overweight' || result.status === 'Obese') && <li>Focus on portion control, reducing sugar, and increasing vegetable intake.</li>}
                                <li>Drink plenty of water and stay hydrated.</li>
                            </ul>
                        </div>

                        <button className="recalculate-btn" onClick={reset}>
                            Re-Calculate
                        </button>
                    </div>
                )}
            </motion.div>
        </div>
    );
};

export default BMIModal;
