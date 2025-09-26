'use client';
import React, { useState, useEffect, useRef } from 'react';
import './CustomerTestimonials.css';
import { FaStar } from 'react-icons/fa';
import { motion } from 'framer-motion';

const testimonials = [
  {
    img: '/testimonials/michael.jpg',
    name: 'Michael Johnson',
    role: 'Travel Content Creator',
    quote:
      "Incredible quality! My travel videos look absolutely stunning on my Quest 3. The depth perception makes viewers feel like they're actually there with me.",
  },
  {
    img: '/testimonials/sarah.jpg',
    name: 'Sarah Chen',
    role: 'Food Influencer',
    quote:
      'Game changer for my YouTube channel! My 3D cooking videos get 10x more engagement. The cloud processing is lightning fast too.',
  },
  {
    img: '/testimonials/david.jpg',
    name: 'David Rodriguez',
    role: 'Real Estate Agent',
    quote:
      'My real estate virtual tours are now incredibly immersive. Clients can truly experience properties before visiting. Sales increased by 40%!',
  },
];

// Counter component (unchanged)
const Counter = ({ start = 0, target, suffix = '', duration = 2000, decimals = 0 }) => {
  const [count, setCount] = useState(start);

  useEffect(() => {
    const startTime = performance.now();
    const step = (currentTime) => {
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const value = start + (target - start) * progress;
      setCount(Number(value.toFixed(decimals)));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration, decimals]);

  return (
    <span>
      {count.toLocaleString(undefined, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
      {suffix}
    </span>
  );
};

// Motion variants
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.25, // delay between cards
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const CustomerTestimonials = () => {
  const [animate, setAnimate] = useState(false);
  const statsRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setAnimate(true);
          observer.disconnect(); // run only once
        }
      },
      { threshold: 0.3 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};
  return (
    <div className="testimonial-wrapper">
      <div className="testimonails-main">
         <motion.h2
          className="testimonial-title"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          What our <span className="highlight">customers</span> say
        </motion.h2>

        <motion.p
          className="testimonial-subtitle"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          Join thousands of creators who transformed their content
        </motion.p>

        {/* Animated testimonials */}
        <motion.div
          className="testimonial-cards"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {testimonials.map((t, i) => (
            <motion.div key={i} className="testimonial-card" variants={itemVariants}>
              <div className="stars">
                {[...Array(5)].map((_, idx) => (
                  <FaStar key={idx} color="#FFD700" size={16} />
                ))}
              </div>
              <p className="quote">"{t.quote}"</p>
              <div className="user">
                <div className="avatar">
                  <img src={t.img} alt={t.name} className="avatar-img" />
                </div>
                <div>
                  <div className="username">{t.name}</div>
                  <div className="role">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats Section with Counter Animation */}
        <div className="stats-bar" ref={statsRef}>
          <div className="stat">
            <div className="value">
              {animate && <Counter target={15000} suffix="+" duration={2000} />}
            </div>
            <div className="label">Videos Converted</div>
          </div>
          <div className="stat">
            <div className="value">
              {animate && <Counter start={0.1} target={4.9} decimals={1} duration={2000} />}
              <span>★</span>
            </div>
            <div className="label">Average Rating</div>
          </div>
          <div className="stat">
            <div className="value">
              {animate && <Counter target={99.8} decimals={1} suffix="%" duration={2000} />}
            </div>
            <div className="label">Customer Satisfaction</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerTestimonials;
