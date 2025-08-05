'use client';

import React from 'react';
import './price.css';
import PricingSectionInPricing from './PricingSection/PricingSection';

const PricingSection = () => {
  return (
  <center> <div className="pricing-container">
     

      <h2 className="pricing-title">Pricing</h2>
      <p className='pricingSubTitle'>Choose the perfect plan for your 3D video conversion needs</p>
      <div className="free-minute-pricing">🎁 Get 1 minute of free conversion after registration</div>
      
      
      <PricingSectionInPricing />





    </div>
  </center> 
   );
};

export default PricingSection;
