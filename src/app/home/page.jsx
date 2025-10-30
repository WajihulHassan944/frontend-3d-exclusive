'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import './home.css';
import { useRouter } from 'next/navigation';

const HeroSection = ({ sectionData }) => {
  const ref = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();

  // Detect screen width
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
        {/* ✅ Dynamic Title with HTML decoding */}
        <h1
          dangerouslySetInnerHTML={{
            __html: (sectionData?.title ||
              'Start now with your <span class="highlight">immersive 3D</span> experience')
              .replace(/\\u003C/g, '<')
              .replace(/\\u003E/g, '>')
              .replace(/className=/g, 'class='),
          }}
        />

        {/* ✅ Dynamic Description */}
        <motion.p
          style={{
            y,
            opacity,
            fontSize,
            willChange: 'transform, opacity, font-size',
          }}
          dangerouslySetInnerHTML={{
            __html: (sectionData?.description ||
              'Transform your 2D videos into stunning 3D content for Meta Quest and Apple <br /> Vision Pro, Samsung XR and Pico Ultra')
              .replace(/\\u003C/g, '<')
              .replace(/\\u003E/g, '>')
              .replace(/className=/g, 'class='),
          }}
        />
      </div>

      <button
        className="start-converting-btn"
        onClick={() => router.push('/upload')}
      >
        Start 3D converting Now
      </button>
    </section>
  );
};

export default HeroSection;
