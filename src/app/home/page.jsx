'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './home.css';

const HeroSection = () => {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // transform directly to MotionValues (strings for font/margin so units are preserved)
  const pY = useTransform(scrollYProgress, [0, 1], [0, 5]);           // 0px -> 20px
  const pFontSize = useTransform(scrollYProgress, [0, 1], ['1.8rem', '1.0rem']); // 1.5rem -> 1.0rem
  const pMarginTop = useTransform(scrollYProgress, [0, 1], ['0px', '100px']);   // 0px -> 100px

  return (
    <section className="hero-section" ref={ref}>
      <div className="hero-content">
        <h1>
          Start now with your <span className="animatedh1">immersive 3D</span> experience
        </h1>

        <motion.p
          style={{
            y: pY,
            fontSize: pFontSize,
            marginTop: pMarginTop,
            willChange: 'transform, font-size, margin-top',
          }}
        >
          Transform your 2D videos into stunning 3D content for Meta Quest and Apple <br />Vision Pro
        </motion.p>
      </div>
    </section>
  );
};

export default HeroSection;
