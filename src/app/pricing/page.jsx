'use client';

import React from 'react';
import './price.css';
import PricingSectionInPricing from './PricingSection/PricingSection';
import { useSelector } from 'react-redux';
import PaymentOptions from './PaymentOptions/PaymentOptions';

const PricingSection = () => {
   const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  return (
  <center> <div className="pricing-container">
     

      <h2 className="pricing-title">Pricing</h2>
      <p className='pricingSubTitle'>Choose the perfect plan for your 3D video conversion needs</p>
     
     {!isLoggedIn &&  <div className="free-minute-pricing">🎁 Get 1 minute of free conversion after registration
     <br /><span>Newsletter signup required • Excludes 8K content</span></div>}
      
      
      <PricingSectionInPricing />
<PaymentOptions />




    </div>
  </center> 
   );
};

export default PricingSection;
