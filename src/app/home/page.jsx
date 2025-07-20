'use client';

import React from 'react';
import './home.css';
import Link from 'next/link';

const HeroSection = () => {
  return (
    <section className="hero-section">

      <div className="hero-content">
        <h1>Start now with your <span className='animatedh1'>immersive 3D</span> experience</h1>
        <p>Transform your 2D videos into stunning 3D content for Meta Quest and Apple Vision Pro</p>
        </div>
    </section>
  );
};

export default HeroSection;
