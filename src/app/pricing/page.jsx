'use client';

import React from 'react';
import Image from 'next/image';
import './price.css';

const PricingSection = () => {
  return (
  <center> <div className="pricing-container">
     

      <h2 className="pricing-title">Pricing</h2>

      <div className="price-box">
        <h3 className="price-box-heading">Cost per 3D video</h3>
        <div className="price-table">
          <div className="price-row">
            <span>Resolution</span>
            <span>Credits</span>
          </div>
          <div className="price-row">
            <span>1080p</span>
            <span>1</span>
          </div>
          <div className="price-row">
            <span>2.7K</span>
            <span>2</span>
          </div>
          <div className="price-row">
            <span>4K</span>
            <span>3</span>
          </div>
        </div>
      </div>

      <div className="pricing-buttons">
        <button>10 credits €9</button>
        <button>50 credits €39</button>
        <button>100 credits €69</button>
      </div>
    </div>
  </center> 
   );
};

export default PricingSection;
