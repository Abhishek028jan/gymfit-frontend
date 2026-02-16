import React from 'react';
import Hero from '../components/landing/Hero';
import About from '../components/landing/About';
import Programs from '../components/landing/Programs';
import ClassSchedule from '../components/landing/ClassSchedule';
import Trainers from '../components/landing/Trainers';
import Testimonials from '../components/landing/Testimonials';
import Pricing from '../components/landing/Pricing';
import GoogleMap from '../components/landing/GoogleMap';
import Footer from '../components/landing/Footer';

const Home = () => {
    return (
        <div className="home-page">
            <Hero />
            <About />
            <Programs />
            <ClassSchedule />
            <Trainers />
            <Testimonials />
            <Pricing />
            <GoogleMap />
            <Footer />
        </div>
    );
};

export default Home;
