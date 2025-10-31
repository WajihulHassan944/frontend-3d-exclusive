'use client';
import React, { useState, useEffect, useRef } from 'react';
import './CustomerTestimonials.css';
import { FaStar } from 'react-icons/fa';
import { motion } from 'framer-motion';

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

const CustomerTestimonials = ({ sectionData }) => {
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

  const cards = sectionData?.cards || [];


  return (
    <div className="testimonial-wrapper">
      <div className="testimonails-main">
          <motion.h2
          className="testimonial-title"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          dangerouslySetInnerHTML={{
            __html: sectionData?.title
              ?.replace(/\\u003C/g, "<")
              .replace(/\\u003E/g, ">")
              .replace(/className=/g, "class="),
          }}
        />


        {sectionData?.description && (
          <motion.p
            className="testimonial-subtitle"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            {sectionData?.description}
          </motion.p>
        )}

        {/* Animated testimonials */}
        <motion.div
          className="testimonial-cards"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
                    {cards.map((t, i) => (
            <motion.div key={t._id || i} className="testimonial-card" variants={itemVariants}>
              <div className="stars">
                {[...Array(5)].map((_, idx) => (
                  <FaStar key={idx} color="#FFD700" size={16} />
                ))}
              </div>
              <p className="quote">"{t.description}"</p>
              <div className="user">
                <div className="avatar">
                  {/* Optional: fallback image if you want */}
                    <img
                    src={`/testimonials/${t.title.toLowerCase().split(' ')[0]}.jpg`}
                    alt={t.title}
                    className="avatar-img"
                    onError={(e) => (e.target.src = '/testimonials/default.jpg')}
                  />
                </div>
                <div>
                  <div className="username">{t.title}</div>
                  <div className="role">{t.subDescription}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats Section with Counter Animation */}
        <div className="stats-bar" ref={statsRef}>
          <div className="stat">
            <div className="value">
              {animate && <>Join {''} <Counter target={3000} suffix="+" duration={2000} /></>}
            </div>
            <div className="label">Early Adopters</div>
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
