'use client';

import React from 'react';
import './FreeTrialHero.css';
import { Gift, Check } from 'lucide-react';

const FreeTrialHero = () => {
  return (
    <section className="ft-hero-wrapper">
      <div className="ft-hero-content">

        {/* Top badge */}
        <div className="ft-hero-badge" >
          <Gift size={18} />
          <span>Free Trial - No Credit Card Required</span>
        </div>

        {/* Main heading */}
        <h1 className="ft-hero-title">
          Try 3D Conversion <span>Free</span>
        </h1>

        {/* Subtitle */}
        <p className="ft-hero-subtitle">
          Experience the magic of 3D video conversion. Get 10 seconds
          converted free - just enter your email to start.
        </p>

        {/* Feature list */}
        <div className="ft-hero-features">
          <div className="ft-feature-item">
            <Check size={18} />
            <span>10 seconds free</span>
          </div>

          <div className="ft-feature-item">
            <Check size={18} />
            <span>No credit card</span>
          </div>

          <div className="ft-feature-item">
            <Check size={18} />
            <span>Instant preview</span>
          </div>
        </div>

      </div>
    </section>
  );
};

export default FreeTrialHero;
