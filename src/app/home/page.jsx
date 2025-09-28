'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import './home.css';

const HeroSection = () => {
  const ref = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  // detect screen width
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // font size shrinks more aggressively on mobile
  const fontSize = useTransform(
    scrollYProgress,
    [0, 1],
    isMobile ? ['1.3rem', '0.9rem'] : ['1.8rem', '1rem']
  );

  const y = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 110]),
    { stiffness: 60, damping: 30, restDelta: 0.001, restSpeed: 0.001 }
  );

  const opacity = useTransform(scrollYProgress, [0, 1], [2, 0.1]);

  return (
    <section className="hero-section" ref={ref}>
      <div className="hero-content">
        <h1>
           {isMobile ? (
            <>
               Start now <br /> with your <span className="animatedh1">immersive <br /> 3D</span><br /> experience
            </>
          ) : (
            <>
               Start now with your <span className="animatedh1">immersive 3D</span> experience
            </>
          )}
        </h1>

        <motion.p
          style={{
            y,
            opacity,
            fontSize,
            willChange: 'transform, opacity, font-size',
          }}
        >
          {isMobile ? (
            <>
              Transform your 2D videos into <br />
              stunning 3D content for Meta <br />
              Quest and Apple Vision Pro
            </>
          ) : (
            <>
              Transform your 2D videos into stunning 3D content for Meta Quest and Apple <br />
              Vision Pro
            </>
          )}
        </motion.p>
      </div>
    </section>
  );
};

export default HeroSection;
