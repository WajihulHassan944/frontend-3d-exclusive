'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import './home.css';

const HeroSection = () => {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const fontSize = useTransform(scrollYProgress, [0, 1], ['1.8rem', '1rem']);

  const y = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 110]),
    { stiffness: 60, damping: 30, restDelta: 0.001, restSpeed: 0.001 }
  );

  // keep linear for opacity so it starts at 1.0
  const opacity = useTransform(scrollYProgress, [0, 1], [2, 0.1]);

  return (
    <section className="hero-section" ref={ref}>
      <div className="hero-content">
        <h1>
          Start now with your <span className="animatedh1">immersive 3D</span> experience
        </h1>

        <motion.p
          style={{
            y,
            opacity,
            fontSize,
            willChange: 'transform, opacity, font-size',
          }}
        >
          Transform your 2D videos into stunning 3D content for Meta Quest and Apple <br />Vision Pro
        </motion.p>
      </div>
    </section>
  );
};

export default HeroSection;
