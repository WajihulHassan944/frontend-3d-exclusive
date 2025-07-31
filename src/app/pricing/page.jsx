'use client';

import React from 'react';
import Image from 'next/image';
import './price.css';
import PricingSectionInPricing from './PricingSection/PricingSection';

const PricingSection = () => {
  return (
  <center> <div className="pricing-container">
     

      <h2 className="pricing-title">Pricing</h2>
      <p className='pricingSubTitle'>Choose the perfect plan for your 3D video conversion needs</p>
      <div className="free-minute-pricing">🎁 Get 1 minute of free conversion after registration</div>
      <div className="price-box">
        <h3 className="price-box-heading">Credit Usage per minute</h3>
        <div className="price-table">
          <div className="price-row">
            <span style={{fontWeight:'600'}}>Resolution</span>
            <span style={{color:'#fa8938', fontWeight:'600'}}>Credits</span>
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

      
      <PricingSectionInPricing />





    </div>
  </center> 
   );
};

export default PricingSection;
