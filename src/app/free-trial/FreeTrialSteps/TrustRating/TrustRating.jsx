'use client';

import React from 'react';
import './TrustRating.css';

const TrustRating = () => {
  return (
    <div className="tr-wrapper">
      <p className="tr-text">
        Trusted by <span>3,000+</span> creators worldwide
      </p>

      <div className="tr-rating">
        <div className="tr-stars">
          ★★★★★
        </div>
        <span className="tr-score">4.9/5 rating</span>
      </div>
    </div>
  );
};

export default TrustRating;
