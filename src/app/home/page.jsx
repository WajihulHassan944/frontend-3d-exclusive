'use client';

import React from 'react';
import './home.css';
import Link from 'next/link';

const HeroSection = () => {
  return (
    <section className="hero-section">

      <div className="hero-content">
       <img src="/logo.png" className='banner-logo' alt="exclusive-3d" />
        <h1>Experience 3D Like Never Before</h1>
        <p>Convert your videos to stunning 3D automatically</p>
        <Link href="/signup">
          <button className="get-started-btn">Get Started</button>
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;
